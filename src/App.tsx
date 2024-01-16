import { ReactElement, ReactNode, Suspense, useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./components/Main";
import "./index.css";
import Index from "./pages/Index";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";

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
          element: <LazyComponent element={<Index />} />,
        },
        {
          path: "/home",
          element: <LazyComponent element={<div>Home</div>} />,
        },
        {
          path: "/about",
          element: <LazyComponent element={<div>About</div>} />,
        },
        {},
      ],
    },
  ]);

  return (
    <ThemeProvider theme={muiTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
