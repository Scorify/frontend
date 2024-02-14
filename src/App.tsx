import { ReactElement, ReactNode, Suspense, useMemo, useState } from "react";

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
import { useCookies } from "react-cookie";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { Admin, Error, Main, User } from "./components";
import { useJWT } from "./hooks";
import {
  AdminPanel,
  ChangePassword,
  Checks,
  Home,
  Login,
  Me,
  Users,
} from "./pages";

const LazyComponent = ({ element }: { element: ReactNode }): ReactElement => {
  return <Suspense fallback={<>Loading...</>}>{element}</Suspense>;
};

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
  const [cookies, setCookie, removeCookie] = useCookies(["auth", "admin"]);
  const jwt = useJWT(cookies.auth);

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
      url: "ws://localhost:8080/query",
    })
  );

  const httpLink = new HttpLink({
    uri: "http://localhost:8080/query",
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
    cache: new InMemoryCache(),
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <LazyComponent
          element={
            <Main
              theme={theme}
              setTheme={setTheme}
              jwt={jwt}
              cookies={cookies}
              setCookie={setCookie}
              removeCookie={removeCookie}
              apolloClient={client}
            />
          }
        />
      ),
      children: [
        {
          index: true,
          element: <LazyComponent element={<Home />} />,
        },
        {
          path: "login",
          element: <LazyComponent element={<Login setCookie={setCookie} />} />,
        },
        {
          path: "me",
          element: <LazyComponent element={<Me />} />,
        },
        {
          path: "password",
          element: (
            <LazyComponent
              element={<ChangePassword removeCookies={removeCookie} />}
            />
          ),
        },
        {
          path: "admin",
          element: <LazyComponent element={<Admin jwt={jwt} />} />,
          children: [
            {
              index: true,
              element: <LazyComponent element={<AdminPanel />} />,
            },
            {
              path: "checks",
              element: <LazyComponent element={<Checks />} />,
            },
            {
              path: "users",
              element: (
                <LazyComponent
                  element={
                    <Users jwt={jwt} cookies={cookies} setCookie={setCookie} />
                  }
                />
              ),
            },
          ],
        },
        {
          element: <LazyComponent element={<User jwt={jwt} />} />,
          children: [
            {
              path: "checks",
              element: <LazyComponent element={<div>Checks are here</div>} />,
            },
          ],
        },
        {
          path: "*",
          element: (
            <LazyComponent
              element={<Error code={404} message={"Page Not Found"} />}
            />
          ),
        },
      ],
    },
  ]);

  return (
    <ThemeProvider theme={muiTheme}>
      <ApolloProvider client={client}>
        <CssBaseline />
        <SnackbarProvider maxSnack={3}>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </ApolloProvider>
    </ThemeProvider>
  );
}
