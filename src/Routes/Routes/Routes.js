import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "../../Pages/Home/Home";
import Main from "../../Layout/Main/Main";
import Login from "../../Pages/Login/Login";
import NotFound from "../../Pages/shared/NotFound.js/NotFound";
import ApnmntPage from "../../Pages/Appointment/ApnmntPage";
import Register from "../../Pages/Register/Register";
import DashboardLayout from "../../Layout/Dashboard/DashboardLayout";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import MyAppointments from "../../Pages/Dashboard/MyAppointments";
import AllUsers from "../../Pages/Dashboard/AllUsers";
import AdminRoute from "../AdminRoute/AdminRoute";
import AddDoctor from "../../Pages/Dashboard/AddDoctor";
import ManageDoctors from "../../Pages/Dashboard/ManageDoctors";
import Payment from "../../Pages/Payment/Payment";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/appointment',
                element: <ApnmntPage />
            },
            {
                path: '/dashboard',
                element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
                children: [
                    {
                        path: '/dashboard',
                        element: <Navigate to="/dashboard/my-appointments" />
                    },
                    {
                        path: '/dashboard/my-appointments',
                        element: <MyAppointments />
                    },
                    {
                        path: '/dashboard/all-users',
                        element: <AdminRoute><AllUsers /></AdminRoute>
                    },
                    {
                        path: '/dashboard/add-doctor',
                        element: <AdminRoute><AddDoctor /></AdminRoute>
                    },
                    {
                        path: '/dashboard/manage-doctors',
                        element: <AdminRoute><ManageDoctors /></AdminRoute>
                    },
                    {
                        path: '/dashboard/payment/:id',
                        element: <PrivateRoute><Payment /></PrivateRoute>,
                        loader: ({ params: { id } }) => id
                    }
                ]
            }
        ]
    },
    {
        path: '*',
        element: <NotFound />
    }
]);

export default router;