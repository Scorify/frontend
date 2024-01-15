import React, { Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./index.css";

const LazyComponent = ({
  element,
}: {
  element: React.ReactNode;
}): React.ReactElement => {
  return <Suspense fallback={<>Loading...</>}>{element}</Suspense>;
};

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <LazyComponent
          element={
            <>
              <Navbar />
              <div className='container mx-auto p-4'>
                <h1 className='text-4xl font-bold mb-4'>Hello, DaisyUI!</h1>
                <button className='btn btn-primary'>Click me</button>
              </div>
            </>
          }
        />
      ),
    },
    {
      path: "/home",
      element: (
        <LazyComponent
          element={
            <>
              <Navbar />
              <div className='container mx-auto p-4'>
                <h1 className='text-4xl font-bold mb-4'>Home</h1>
              </div>
            </>
          }
        />
      ),
    },
    {
      path: "/about",
      element: (
        <LazyComponent
          element={
            <>
              <Navbar />
              <div className='container mx-auto p-4'>
                <h1 className='text-4xl font-bold mb-4'>About</h1>
              </div>
            </>
          }
        />
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}
