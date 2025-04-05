import { useState, useEffect } from "react";
import {
  createBrowserRouter,
  Navigate,
  redirect,
  RouterProvider,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("Running..");
    fetch("http://localhost:3000/api/checkAuth", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoggedIn(data.loggedIn);
        setIsLoading(false);
      });
  }, []);

  console.log(isLoggedIn);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-lg font-semibold text-gray-700">
          Checking login...
        </span>
      </div>
    );
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: isLoggedIn ? (
        <Home />
      ) : (
        // <Login loginUpdater={(value) => setIsLoggedIn(value)} />
        <Navigate to="/login" />
      ),
    },
    {
      path: "/login",
      element: <Login loginUpdater={(value) => setIsLoggedIn(value)} />,
    },
    {
      path: "/register",
      element: isLoggedIn ? <Navigate to="/" /> : <Register />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
