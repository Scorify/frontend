import { ReactElement, ReactNode, Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./components/Main";
import "./index.css";
import Index from "./pages/Index";

const LazyComponent = ({ element }: { element: ReactNode }): ReactElement => {
  return <Suspense fallback={<>Loading...</>}>{element}</Suspense>;
};

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LazyComponent element={<Main />} />,
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

  return <RouterProvider router={router} />;
}
