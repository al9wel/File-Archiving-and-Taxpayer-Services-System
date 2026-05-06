import DashboardLayout from "@/components/layout/DashboardLayout";
import Auth from "@/features/auth/pages/Auth";
import ResetPasswordPage from "@/features/auth/pages/ResetPasswordPage";
import Main from "@/features/main/pages/Main";
import Settings from "@/features/settings/pages/Settings";
import Files from "@/features/files/pages/Files";
import FileMovements from "@/features/file-movements/pages/FileMovements";
import Requests from "@/features/requests/pages/Requests";
import BasicInfoPage from "@/features/basic-info/pages/BasicInfoPage";
import BasicInfoLayout from "@/features/basic-info/components/BasicInfoLayout";
import DepartmentsPage from "@/features/basic-info/pages/DepartmentsPage";
import ActivityTypesPage from "@/features/basic-info/pages/ActivityTypesPage";
import PaymentTypesPage from "@/features/basic-info/pages/PaymentTypesPage";
import RegionsPage from "@/features/basic-info/pages/RegionsPage";
import DistrictsPage from "@/features/basic-info/pages/DistrictsPage";
import Notifications from "@/features/notifications/pages/Notifications";
import TaxPayersLayout from "@/features/tax-payers/components/TaxPayersLayout";
import TaxTypesPage from "@/features/tax-payers/pages/tax-types/TaxTypesPage";
import TaxInfoPage from "@/features/tax-payers/pages/tax-info/TaxInfoPage";
import CreateTaxInfoPage from "@/features/tax-payers/pages/tax-info/CreateTaxInfoPage";
import EditTaxInfoPage from "@/features/tax-payers/pages/tax-info/EditTaxInfoPage";
import ViewTaxInfoPage from "@/features/tax-payers/pages/tax-info/ViewTaxInfoPage";
import TaxCollectorsLayout from "@/features/tax-collectors/components/TaxCollectorsLayout";
import TaxCollectorsPage from "@/features/tax-collectors/pages/TaxCollectorsPage";
import EmploymentTypesPage from "@/features/tax-collectors/pages/EmploymentTypesPage";
import Users from "@/features/users/pages/Users";
import CreateUser from "@/features/users/pages/CreateUser";
import UpdateUser from "@/features/users/pages/UpdateUser";
import ShowUser from "@/features/users/pages/ShowUser";
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
import IndividualTaxPayersPage from "@/features/tax-payers/pages/tax-payers/individual/IndividualTaxPayersPage";
import EditIndividualTaxPayerPage from "@/features/tax-payers/pages/tax-payers/individual/EditIndividualTaxPayerPage";
import ViewIndividualTaxPayerPage from "@/features/tax-payers/pages/tax-payers/individual/ViewIndividualTaxPayerPage";
import CreateIndividualTaxPayerPage from "@/features/tax-payers/pages/tax-payers/individual/CreateIndividualTaxPayerPage";

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
            },
            {
                path: ROUTES.PUBLIC.RESET_PASSWORD.split("/").pop(),
                element: <ResetPasswordPage />,
            },
        ]
    },
    {
        path: ROUTES.DASHBOARD.ROOT,
        element: <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.MANAGER, ROLES.EMPLOYEE, ROLES.COLLECTOR_MANAGER]} />,
        children: [
            {
                path: "",
                element: <DashboardLayout />,
                children: [
                    // ── Dashboard (ALL ROLES) ───────────────────────────────
                    { index: true, element: <Navigate to={ROUTES.DASHBOARD.MAIN.split("/").pop() || ""} replace /> },
                    { path: ROUTES.DASHBOARD.MAIN.split("/").pop(), element: <Main /> },

                    // ── Files (ADMIN, MANAGER, EMPLOYEE) ────────────────────
                    {
                        path: "",
                        element: <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.MANAGER, ROLES.EMPLOYEE]} />,
                        children: [
                            { path: ROUTES.DASHBOARD.FILES.split("/").pop(), element: <Files /> },
                        ]
                    },

                    // ── File Movements (ADMIN, MANAGER, COLLECTOR_MANAGER) ──
                    {
                        path: "",
                        element: <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.MANAGER, ROLES.COLLECTOR_MANAGER]} />,
                        children: [
                            { path: ROUTES.DASHBOARD.FILE_MOVEMENTS.split("/").pop(), element: <FileMovements /> },
                        ]
                    },

                    // ── Requests, Basic Info, Taxpayers (ADMIN, MANAGER) ────
                    {
                        path: "",
                        element: <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.MANAGER]} />,
                        children: [
                            { path: ROUTES.DASHBOARD.REQUESTS.split("/").pop(), element: <Requests /> },
                            {
                                path: ROUTES.DASHBOARD.TAXPAYERS.ROOT.split("/").pop(),
                                element: <TaxPayersLayout />,
                                children: [
                                    { index: true, element: <Navigate to={ROUTES.DASHBOARD.TAXPAYERS.PAYERS.ROOT.split("/").pop() || ""} replace /> },
                                    {
                                        path: ROUTES.DASHBOARD.TAXPAYERS.PAYERS.ROOT.split("/").pop(),
                                        children: [
                                            { index: true, element: <IndividualTaxPayersPage /> },
                                            { path: "create", element: <CreateIndividualTaxPayerPage /> },
                                            { path: ":id", element: <ViewIndividualTaxPayerPage /> },
                                            { path: ":id/edit", element: <EditIndividualTaxPayerPage /> },
                                        ]
                                    },
                                    { path: ROUTES.DASHBOARD.TAXPAYERS.TYPES.split("/").pop(), element: <TaxTypesPage /> },
                                    {
                                        path: ROUTES.DASHBOARD.TAXPAYERS.INFO.ROOT.split("/").pop(),
                                        children: [
                                            { index: true, element: <TaxInfoPage /> },
                                            { path: "create", element: <CreateTaxInfoPage /> },
                                            { path: ":id", element: <ViewTaxInfoPage /> },
                                            { path: ":id/edit", element: <EditTaxInfoPage /> },
                                        ]
                                    },
                                ]
                            },
                            {
                                path: ROUTES.DASHBOARD.BASIC_INFO.ROOT.split("/").pop(),
                                element: <BasicInfoLayout />,
                                children: [
                                    { index: true, element: <BasicInfoPage /> },
                                    { path: ROUTES.DASHBOARD.BASIC_INFO.DEPARTMENTS.split("/").pop(), element: <DepartmentsPage /> },
                                    { path: ROUTES.DASHBOARD.BASIC_INFO.ACTIVITY_TYPES.split("/").pop(), element: <ActivityTypesPage /> },
                                    { path: ROUTES.DASHBOARD.BASIC_INFO.PAYMENT_TYPES.split("/").pop(), element: <PaymentTypesPage /> },
                                    { path: ROUTES.DASHBOARD.BASIC_INFO.REGIONS.split("/").pop(), element: <RegionsPage /> },
                                    { path: ROUTES.DASHBOARD.BASIC_INFO.DISTRICTS.split("/").pop(), element: <DistrictsPage /> },
                                ]
                            },
                        ]
                    },

                    // ── Tax Collectors (ADMIN, MANAGER, COLLECTOR_MANAGER) ──
                    {
                        path: "",
                        element: <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.MANAGER, ROLES.COLLECTOR_MANAGER]} />,
                        children: [
                            {
                                path: ROUTES.DASHBOARD.TAX_COLLECTORS.ROOT.split("/").pop(),
                                element: <TaxCollectorsLayout />,
                                children: [
                                    { index: true, element: <Navigate to={ROUTES.DASHBOARD.TAX_COLLECTORS.COLLECTORS.split("/").pop() || ""} replace /> },
                                    { path: ROUTES.DASHBOARD.TAX_COLLECTORS.COLLECTORS.split("/").pop(), element: <TaxCollectorsPage /> },
                                    { path: ROUTES.DASHBOARD.TAX_COLLECTORS.EMPLOYMENT_TYPES.split("/").pop(), element: <EmploymentTypesPage /> },
                                ]
                            },
                        ]
                    },

                    // ── Users (ADMIN, MANAGER) ──────────────────────────────
                    {
                        path: ROUTES.DASHBOARD.USERS.split("/").pop(),
                        element: <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.MANAGER]} />,
                        children: [
                            { index: true, element: <Users /> },
                            { path: ":id", element: <ShowUser /> },
                            { path: "create", element: <CreateUser /> },
                            { path: ":id/edit", element: <UpdateUser /> }
                        ]
                    },

                    // ── Admin Only (Settings, Reports, Notifications) ───────
                    {
                        path: "",
                        element: <ProtectedRoute allowedRoles={[ROLES.ADMIN]} />,
                        children: [
                            { path: ROUTES.DASHBOARD.SETTINGS.split("/").pop(), element: <Settings /> },
                            { path: ROUTES.DASHBOARD.OPERATION_REPORTS.split("/").pop(), element: <OperationReports /> },
                            { path: ROUTES.DASHBOARD.NOTIFICATIONS.split("/").pop(), element: <Notifications /> },
                        ]
                    },
                ]
            }
        ]
    },

]);