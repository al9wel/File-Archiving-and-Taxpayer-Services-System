import DashboardLayout from "@/components/layout/DashboardLayout";
import Auth from "@/features/auth/pages/Auth";
import Main from "@/features/main/pages/Main";
import Settings from "@/features/settings/pages/Settings";
import Files from "@/features/files/pages/Files";
import FileMovements from "@/features/file-movements/pages/FileMovements";
import Requests from "@/features/requests/pages/Requests";
import BasicInfo from "@/features/basic-info/pages/BasicInfo";
import Notifications from "@/features/notifications/pages/Notifications";
import Taxpayers from "@/features/taxpayers/pages/Taxpayers";
import Officers from "@/features/officers/pages/Officers";
import Users from "@/features/users/pages/Users";
import OperationReports from "@/features/operation-reports/pages/OperationReports";
import { createBrowserRouter, Navigate } from "react-router-dom"
import LandingLayout from "@/components/layout/LandingLayout";
import HomePage from "@/landing/pages/HomePage";
import AboutPage from "@/landing/pages/AboutPage";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import Unauthorized from "@/app/pages/Unauthorized";
import { ROLES } from "@/constants/roles";
import { ROUTES } from "@/constants/routes";

export const router = createBrowserRouter([

    {
        path: ROUTES.PUBLIC.HOME,
        element: <LandingLayout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: ROUTES.PUBLIC.ABOUT.split("/").pop(), element: <AboutPage /> },
        ]
    },
    {
        path: ROUTES.PUBLIC.UNAUTHORIZED,
        element: <Unauthorized />,
    },
    {
        element: <PublicRoute />,
        children: [
            {
                path: ROUTES.PUBLIC.AUTH.split("/").pop(),
                element: <Auth />,
            }
        ]
    },
    {
        path: ROUTES.DASHBOARD.ROOT,
        // Only allow these roles into the dashboard
        element: <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.MANAGER, ROLES.EMPLOYEE]} />,
        children: [
            {
                path: "",
                element: <DashboardLayout />,
                children: [
                    { index: true, element: <Navigate to={ROUTES.DASHBOARD.MAIN.split("/").pop() || ""} replace /> },
                    { path: ROUTES.DASHBOARD.MAIN.split("/").pop(), element: <Main /> },
                    { path: ROUTES.DASHBOARD.FILES.split("/").pop(), element: <Files /> },
                    { path: ROUTES.DASHBOARD.FILE_MOVEMENTS.split("/").pop(), element: <FileMovements /> },
                    { path: ROUTES.DASHBOARD.REQUESTS.split("/").pop(), element: <Requests /> },
                    { path: ROUTES.DASHBOARD.BASIC_INFO.split("/").pop(), element: <BasicInfo /> },
                    { path: ROUTES.DASHBOARD.NOTIFICATIONS.split("/").pop(), element: <Notifications /> },
                    { path: ROUTES.DASHBOARD.TAXPAYERS.split("/").pop(), element: <Taxpayers /> },
                    { path: ROUTES.DASHBOARD.OFFICERS.split("/").pop(), element: <Officers /> },
                    { path: ROUTES.DASHBOARD.USERS.split("/").pop(), element: <Users /> },
                    {
                        path: "",
                        element: <ProtectedRoute allowedRoles={[ROLES.ADMIN]} />,
                        children: [
                            { path: ROUTES.DASHBOARD.SETTINGS.split("/").pop(), element: <Settings /> },
                        ]
                    },
                    {
                        path: "",
                        element: <ProtectedRoute allowedRoles={[ROLES.ADMIN]} />,
                        children: [
                            { path: ROUTES.DASHBOARD.OPERATION_REPORTS.split("/").pop(), element: <OperationReports /> },
                        ]
                    },
                ]
            }
        ]
    },

]);