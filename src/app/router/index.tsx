import DashboardLayout from "@/components/layout/DashboardLayout";
import SignInPage from "@/features/auth/pages/SignInPage";
import Dashboard from "@/features/home/pages/Dashboard";
import Settings from "@/features/settings/pages/Settings";
import { createBrowserRouter } from "react-router-dom"
import LandingLayout from "@/components/layout/LandingLayout";
import HomePage from "@/landing/pages/HomePage";
import AboutPage from "@/landing/pages/AboutPage";

export const router = createBrowserRouter([

    {
        path: "/",
        element: <LandingLayout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "about", element: <AboutPage /> },
        ]
    },
    {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
            { index: true, element: <Dashboard /> },
            { path: "settings", element: <Settings /> },
        ]
    },
    {
        path: "auth",
        element: <SignInPage />,
    },
]);