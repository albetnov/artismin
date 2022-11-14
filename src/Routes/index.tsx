import { createBrowserRouter } from "react-router-dom";
import Authed from "../Components/Auth/Authed";
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
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
