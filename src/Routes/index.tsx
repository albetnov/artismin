import { createBrowserRouter, Navigate } from "react-router-dom";
import Authed from "../Components/Auth/Authed";
import Logout from "../Components/Auth/Logout";
import Channels from "../Pages/Channels";
import Dashboard from "../Pages/Dashboard";
import Login from "../Pages/Login";
import Roadmap from "../Pages/Roadmap";
import Roles from "../Pages/Roles";

export default createBrowserRouter([
  {
    path: "*",
    element: <Authed />,
    children: [
      {
        path: "",
        element: <Navigate to="/dashboard" />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "channels",
        element: <Channels />,
      },
      {
        path: "roadmap",
        element: <Roadmap />,
      },
      {
        path: "roles",
        element: <Roles />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
]);
