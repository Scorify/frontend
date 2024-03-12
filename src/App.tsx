import { useMemo, useState } from "react";

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { createClient } from "graphql-ws";
import { SnackbarProvider } from "notistack";

import { Router } from "./Router";
import { gql_endpoint, ws_endpoint } from "./config";

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App() {
  let savedTheme = localStorage.getItem("theme");
  if (!savedTheme) {
    savedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  const [theme, setTheme] = useState(savedTheme);
  const muiTheme = useMemo(() => {
    localStorage.setItem("theme", theme);

    return theme === "dark" ? darkTheme : lightTheme;
  }, [theme]);

  const wsLink = new GraphQLWsLink(
    createClient({
      url: ws_endpoint,
    })
  );

  const httpLink = new HttpLink({
    uri: gql_endpoint,
    credentials: "include",
  });

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    httpLink
  );

  const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache({
      typePolicies: {
        Subscription: {
          fields: {
            statusStream: {
              merge(existing = [], incoming: any[]) {
                return [...incoming, ...existing].splice(0, 500);
              },
            },
          },
        },
      },
    }),
  });

  return (
    <ThemeProvider theme={muiTheme}>
      <ApolloProvider client={client}>
        <CssBaseline />
        <SnackbarProvider maxSnack={3}>
          <Router theme={theme} setTheme={setTheme} apolloClient={client} />
        </SnackbarProvider>
      </ApolloProvider>
    </ThemeProvider>
  );
}
