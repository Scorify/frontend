import { ReactElement, ReactNode, Suspense, useEffect, useState } from "react";

import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { Main } from "./components";
import { Home, Login } from "./pages";

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
        <LazyComponent element={<Main theme={theme} setTheme={setTheme} />} />
      ),
      children: [
        {
          index: true,
          element: <LazyComponent element={<Home />} />,
        },
        {
          path: "login",
          element: <LazyComponent element={<Login />} />,
        },
      ],
    },
  ]);

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
