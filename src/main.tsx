import React from 'react'
import ReactDOM from 'react-dom/client'
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from "./Pages/Login";

const darkTheme = createTheme({
    palette: {
        mode: "dark"
    }
})

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login/>
    }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <RouterProvider router={router}/>
        </ThemeProvider>
    </React.StrictMode>,
)
