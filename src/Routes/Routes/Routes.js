import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "../../Pages/Home/Home";
import Main from "../../Layout/Main/Main";
import Login from "../../Pages/Login/Login";
import NotFound from "../../Pages/shared/NotFound.js/NotFound";
import ApnmntPage from "../../Pages/Appointment/ApnmntPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Navigate to="/home" />
            },
            {
                path: '/home',
                element: <Home />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/appointment',
                element: <ApnmntPage />
            }
        ]
    },
    {
        path: '*',
        element: <NotFound />
    }
]);

export default router;