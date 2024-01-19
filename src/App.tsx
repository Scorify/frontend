import { ReactElement, ReactNode, Suspense, useEffect, useState } from "react";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import { useCookies } from "react-cookie";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { Main } from "./components";
import { Home, Login, Me, NotFound } from "./pages";
import { useJWT } from "./hooks";

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
  const [cookies, setCookie, removeCookie] = useCookies(["auth"]);
  const jwt = useJWT(cookies.auth);

  let savedTheme = localStorage.getItem("theme");
  if (!savedTheme) {
    savedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  const [theme, setTheme] = useState(savedTheme);
  const [muiTheme, setMuiTheme] = useState(
    theme === "dark" ? darkTheme : lightTheme
  );
  localStorage.setItem("theme", theme);

  useEffect(() => {
    if (theme === "dark") {
      setMuiTheme(darkTheme);
    } else {
      setMuiTheme(lightTheme);
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

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
              removeCookie={removeCookie}
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
          path: "*",
          element: <LazyComponent element={<NotFound />} />,
        },
      ],
    },
  ]);

  const client = new ApolloClient({
    uri: "http://localhost:8080/query",
    cache: new InMemoryCache(),
    credentials: "include",
  });

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
