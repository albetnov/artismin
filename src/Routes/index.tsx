import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Settings from "../Pages/Settings";
const Authed = React.lazy(() => import("../Components/Auth/Authed"));
const Logout = React.lazy(() => import("../Components/Auth/Logout"));
const Channels = React.lazy(() => import("../Pages/Channels"));
const Dashboard = React.lazy(() => import("../Pages/Dashboard"));
const Login = React.lazy(() => import("../Pages/Login"));
const Roadmap = React.lazy(() => import("../Pages/Roadmap"));
const Roles = React.lazy(() => import("../Pages/Roles"));
const Rules = React.lazy(() => import("../Pages/Rules"));
const Scheduler = React.lazy(() => import("../Pages/Scheduler"));
const Webhook = React.lazy(() => import("../Pages/Webhook"));
const WebSocket = React.lazy(() => import("../Pages/WebSocket"));

export default createBrowserRouter([
  {
    path: "*",
    element: <Authed />,
    children: [
      {
        path: "",
        element: <Authed redirect={true} />,
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
      {
        path: "rules",
        element: <Rules />,
      },
      {
        path: "schedules",
        element: <Scheduler />,
      },
      {
        path: "webhook",
        element: <Webhook />,
      },
      {
        path: "websocket",
        element: <WebSocket />,
      },
      {
        path: "settings",
        element: <Settings />,
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
