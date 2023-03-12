import { Home, Login, Join } from "./pages";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/join",
      element: <Join />,
    },
    {
      path: "/home",
      element: <Home />,
    },
  ]);

  return <RouterProvider router={router} />;
}
export default App;
