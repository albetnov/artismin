import { createBrowserRouter } from "react-router-dom";
import Authed from "../Components/Auth/Authed";
import Logout from "../Components/Auth/Logout";
import Channels from "../Pages/Channels";
import Dashboard from "../Pages/Dashboard";
import Login from "../Pages/Login";

export default createBrowserRouter([
  {
    path: "*",
    element: <Authed />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "channels",
        element: <Channels />,
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
