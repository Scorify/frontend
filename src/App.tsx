import {
  ReactElement,
  ReactNode,
  Suspense,
  useMemo,
  useState,
  useEffect,
} from "react";
import { useCookies } from "react-cookie";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  split,
} from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { ThemeProvider } from "@emotion/react";
import { CircularProgress, CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { createClient } from "graphql-ws";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

import { Admin, Error, Main, User } from "./components";
import { useJWT } from "./hooks";
import {
  AdminChecks,
  AdminPanel,
  ChangePassword,
  Home,
  Login,
  Me,
  UserChecks,
  Users,
} from "./pages";
import {
  useEngineStateSubscription,
  useGlobalNotificationSubscription,
  useMeQuery,
} from "./graph";

const LazyComponent = ({ element }: { element: ReactNode }): ReactElement => {
  return <Suspense fallback={<CircularProgress />}>{element}</Suspense>;
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

type props = {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  apolloClient: ApolloClient<NormalizedCacheObject>;
};

function Router({ theme, setTheme, apolloClient }: props) {
  const [cookies, setCookie, removeCookie] = useCookies(["auth"]);
  const jwt = useJWT(cookies.auth);

  useGlobalNotificationSubscription({
    onData: (data) => {
      if (data.data.data?.globalNotification) {
        enqueueSnackbar(data.data.data.globalNotification.message, {
          variant: data.data.data.globalNotification.type,
        });
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const { data: engineState } = useEngineStateSubscription({
    onError: (error) => {
      console.error(error);
    },
  });

  const { data: me, refetch } = useMeQuery({
    onError: (error) => {
      console.error(error);
    },
  });

  useEffect(() => {
    refetch();
  }, [cookies]);

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
              me={me}
              setCookie={setCookie}
              removeCookie={removeCookie}
              apolloClient={apolloClient}
              engineState={engineState?.engineState}
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
              element={<ChangePassword removeCookie={removeCookie} />}
            />
          ),
        },
        {
          path: "admin",
          element: <LazyComponent element={<Admin me={me} />} />,
          children: [
            {
              index: true,
              element: (
                <LazyComponent
                  element={
                    <AdminPanel engineState={engineState?.engineState} />
                  }
                />
              ),
            },
            {
              path: "checks",
              element: <LazyComponent element={<AdminChecks />} />,
            },
            {
              path: "users",
              element: (
                <LazyComponent
                  element={<Users me={me} setCookie={setCookie} />}
                />
              ),
            },
          ],
        },
        {
          element: <LazyComponent element={<User me={me} />} />,
          children: [
            {
              path: "checks",
              element: <LazyComponent element={<UserChecks />} />,
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

  return <RouterProvider router={router} />;
}
