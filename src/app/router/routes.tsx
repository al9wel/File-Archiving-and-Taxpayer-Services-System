import MainLayout from "@/components/layout/MainLayout";
import SignInPage from "@/features/auth/pages/SignInPage";
import HomePage from "@/features/home/pages/HomePage";
import Settings from "@/features/settings/pages/Settings";
import { createBrowserRouter } from "react-router-dom"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "settings", element: <Settings /> },
        ]
    },
    {
        path: "signin",
        element: <SignInPage />,
    },
]);