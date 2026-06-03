import DashboardLayout from "@/components/layout/DashboardLayout";
import Auth from "@/features/auth/pages/Auth";
import ResetPasswordPage from "@/features/auth/pages/ResetPasswordPage";
import ForgotPasswordPage from "@/features/auth/pages/ForgotPasswordPage";
import VerifyOtpPage from "@/features/auth/pages/VerifyOtpPage";
import Main from "@/features/main/pages/Main";
import Settings from "@/features/settings/pages/Settings";
import FilesLayout from "@/features/files/layouts/FilesLayout";
import FilesPage from "@/features/files/pages/files/FilesPage";
import CreateFilePage from "@/features/files/pages/files/CreateFilePage";
import EditFilePage from "@/features/files/pages/files/EditFilePage";
import ViewFilePage from "@/features/files/pages/files/ViewFilePage";
import AttachmentsPage from "@/features/files/pages/attachment/AttachmentsPage";
import FileMovements from "@/features/file-movements/pages/FileMovements";
import CreateFileMovement from "@/features/file-movements/pages/CreateFileMovement";
import UpdateFileMovement from "@/features/file-movements/pages/UpdateFileMovement";
import ShowFileMovement from "@/features/file-movements/pages/ShowFileMovement";
import RequestsLayout from "@/features/requests/layouts/RequestsLayout";
import PendingRequestsPage from "@/features/requests/pages/PendingRequestsPage";
import ConfirmedRequestsPage from "@/features/requests/pages/ConfirmedRequestsPage";
import ArchivedRequestsPage from "@/features/requests/pages/ArchivedRequestsPage";
import RejectedRequestsPage from "@/features/requests/pages/RejectedRequestsPage";
import RequestDetailsPage from "@/features/requests/pages/RequestDetailsPage";
import BasicInfoPage from "@/features/basic-info/pages/BasicInfoPage";
import BasicInfoLayout from "@/features/basic-info/layouts/BasicInfoLayout";
import DepartmentsPage from "@/features/basic-info/pages/DepartmentsPage";
import ActivityTypesPage from "@/features/basic-info/pages/ActivityTypesPage";
import PaymentTypesPage from "@/features/basic-info/pages/PaymentTypesPage";
import RegionsPage from "@/features/basic-info/pages/RegionsPage";
import DistrictsPage from "@/features/basic-info/pages/DistrictsPage";
import FileStatusPage from "@/features/basic-info/pages/FileStatusPage";

import TaxPayersLayout from "@/features/tax-payers/layouts/TaxPayersLayout";
import TaxTypesPage from "@/features/tax-payers/pages/tax-types/TaxTypesPage";
import TaxInfoPage from "@/features/tax-payers/pages/tax-info/TaxInfoPage";
import TaxCollectorsLayout from "@/features/tax-collectors/layouts/TaxCollectorsLayout";
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
import AppErrorBoundary from "@/app/pages/AppErrorBoundary";
import { ROLES } from "@/constants/roles";
import { ROUTES } from "@/constants/routes";

import EditIndividualTaxPayerPage from "@/features/tax-payers/pages/tax-payers/individual/EditIndividualTaxPayerPage";
import ViewIndividualTaxPayerPage from "@/features/tax-payers/pages/tax-payers/individual/ViewIndividualTaxPayerPage";

import EditCompanyTaxPayerPage from "@/features/tax-payers/pages/tax-payers/company/EditCompanyTaxPayerPage";
import ViewCompanyTaxPayerPage from "@/features/tax-payers/pages/tax-payers/company/ViewCompanyTaxPayerPage";

import EditCharitableCompanyTaxPayerPage from "@/features/tax-payers/pages/tax-payers/charitable-company/EditCharitableCompanyTaxPayerPage";
import ViewCharitableCompanyTaxPayerPage from "@/features/tax-payers/pages/tax-payers/charitable-company/ViewCharitableCompanyTaxPayerPage";

import TaxPayersPage from "@/features/tax-payers/pages/tax-payers/TaxPayersPage";
import CreateTaxPayerPage from "@/features/tax-payers/pages/tax-payers/CreateTaxPayerPage";

import NotificationsPage from "@/features/notifications/pages/Notifications";
import CreateNotificationPage from "@/features/notifications/pages/CreateNotification";
import UpdateNotificationPage from "@/features/notifications/pages/UpdateNotification";
import ShowNotificationPage from "@/features/notifications/pages/ShowNotification";
import TrashBinPage from "@/features/trash-bin/pages/TrashBinPage";

// dont use it just read it to understand the structure of tax payers routes
// const taxPayersFeaturesRoutes = [
//     { title: "المكلفين", path: ROUTES.DASHBOARD.TAXPAYERS.PAYERS.ROOT, element: <AllTaxPayersPage /> },
//     { title: "اضافه مكلف", path: ROUTES.DASHBOARD.TAXPAYERS.PAYERS.ROOT, element: <CreateTaxPayerPage /> },
//     { title: "تعديل مكلف فردي", path: ROUTES.DASHBOARD.TAXPAYERS.PAYERS.INDIVIDUAL.EDIT, element: <EditIndividualTaxPayerPage /> },
//     { title: "تعديل مكلف شركة", path: ROUTES.DASHBOARD.TAXPAYERS.PAYERS.COMPANY.EDIT, element: <EditCompanyTaxPayerPage /> },
//     { title: "تعديل مكلف شركة خيرية", path: ROUTES.DASHBOARD.TAXPAYERS.PAYERS.CHARITABLE_COMPANY.EDIT, element: <EditCharitableCompanyTaxPayerPage /> },
//     { title: "عرض مكلف فردي", path: ROUTES.DASHBOARD.TAXPAYERS.PAYERS.INDIVIDUAL.SHOW, element: <ViewIndividualTaxPayerPage /> },
//     { title: "عرض مكلف شركة", path: ROUTES.DASHBOARD.TAXPAYERS.PAYERS.COMPANY.SHOW, element: <ViewCompanyTaxPayerPage /> },
//     { title: "عرض مكلف شركة خيرية", path: ROUTES.DASHBOARD.TAXPAYERS.PAYERS.CHARITABLE_COMPANY.SHOW, element: <ViewCharitableCompanyTaxPayerPage /> },
//     { title: "نوع الضريبة", path: ROUTES.DASHBOARD.TAXPAYERS.TYPES, element: <TaxTypesPage /> },
//     { title: "البيانات الضريبية", path: ROUTES.DASHBOARD.TAXPAYERS.INFO, element: <TaxInfoPage /> },
// ]
export const router = createBrowserRouter([

    {
        path: ROUTES.PUBLIC.HOME,
        element: <LandingLayout />,
        errorElement: <AppErrorBoundary />,
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
                path: ROUTES.PUBLIC.FORGOT_PASSWORD.split("/").pop(),
                element: <ForgotPasswordPage />,
            },
            {
                path: ROUTES.PUBLIC.VERIFY_OTP.split("/").pop(),
                element: <VerifyOtpPage />,
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
        errorElement: <AppErrorBoundary />,
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
                        path: ROUTES.DASHBOARD.FILES.ROOT.split("/").pop(),
                        element: <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.MANAGER, ROLES.EMPLOYEE]} />,
                        children: [
                            {
                                element: <FilesLayout />,
                                children: [
                                    { index: true, element: <FilesPage /> },
                                    { path: ":id", element: <ViewFilePage /> },
                                    { path: "create", element: <CreateFilePage /> },
                                    { path: ":id/edit", element: <EditFilePage /> },
                                    { path: ROUTES.DASHBOARD.FILES.ATTACHMENTS.split("/").pop(), element: <AttachmentsPage /> },
                                ]
                            },
                        ]
                    },

                    // ── File Movements (ADMIN, MANAGER, COLLECTOR_MANAGER) ──
                    {
                        path: ROUTES.DASHBOARD.FILE_MOVEMENTS.split("/").pop(),
                        element: <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.MANAGER, ROLES.COLLECTOR_MANAGER]} />,
                        children: [
                            { index: true, element: <FileMovements /> },
                            { path: ":id", element: <ShowFileMovement /> },
                            { path: "create", element: <CreateFileMovement /> },
                            { path: ":id/edit", element: <UpdateFileMovement /> }
                        ]
                    },

                    // ── Requests, Basic Info, Taxpayers (ADMIN, MANAGER) ────
                    {
                        path: "",
                        element: <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.MANAGER]} />,
                        children: [
                            {
                                path: ROUTES.DASHBOARD.REQUESTS.ROOT.split("/").pop(),
                                element: <RequestsLayout />,
                                children: [
                                    { index: true, element: <Navigate to="pending" replace /> },
                                    { path: "pending", element: <PendingRequestsPage /> },
                                    { path: "pending/:requestId", element: <RequestDetailsPage /> },
                                    { path: "confirmed", element: <ConfirmedRequestsPage /> },
                                    { path: "confirmed/:requestId", element: <RequestDetailsPage /> },
                                    { path: "archived", element: <ArchivedRequestsPage /> },
                                    { path: "archived/:requestId", element: <RequestDetailsPage /> },
                                    { path: "rejected", element: <RejectedRequestsPage /> },
                                    { path: "rejected/:requestId", element: <RequestDetailsPage /> },
                                ]
                            },
                            {
                                path: ROUTES.DASHBOARD.TAXPAYERS.ROOT.split("/").pop(),
                                element: <TaxPayersLayout />,
                                children: [
                                    { index: true, element: <Navigate to={ROUTES.DASHBOARD.TAXPAYERS.PAYERS.ROOT.split("/").pop()!} replace /> },
                                    {
                                        path: ROUTES.DASHBOARD.TAXPAYERS.PAYERS.ROOT.split("/").pop(),
                                        children: [
                                            { index: true, element: <TaxPayersPage /> },
                                            { path: "create", element: <CreateTaxPayerPage /> },
                                            {
                                                path: "individual",
                                                children: [
                                                    { path: ":id", element: <ViewIndividualTaxPayerPage /> },
                                                    { path: ":id/edit", element: <EditIndividualTaxPayerPage /> },
                                                ]
                                            },
                                            {
                                                path: "company",
                                                children: [
                                                    { path: ":id", element: <ViewCompanyTaxPayerPage /> },
                                                    { path: ":id/edit", element: <EditCompanyTaxPayerPage /> },
                                                ]
                                            },
                                            {
                                                path: "charitable-company",
                                                children: [
                                                    { path: ":id", element: <ViewCharitableCompanyTaxPayerPage /> },
                                                    { path: ":id/edit", element: <EditCharitableCompanyTaxPayerPage /> },
                                                ]
                                            },
                                        ]
                                    },
                                    { path: ROUTES.DASHBOARD.TAXPAYERS.TYPES.split("/").pop(), element: <TaxTypesPage /> },
                                    { path: ROUTES.DASHBOARD.TAXPAYERS.INFO.split("/").pop(), element: <TaxInfoPage /> },
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
                                    { path: ROUTES.DASHBOARD.BASIC_INFO.FILE_STATUS.split("/").pop(), element: <FileStatusPage /> },
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
                            { path: ROUTES.DASHBOARD.TRASH_BIN.split("/").pop(), element: <TrashBinPage /> },
                            {
                                path: ROUTES.DASHBOARD.NOTIFICATIONS.split("/").pop(),
                                children: [
                                    { index: true, element: <NotificationsPage /> },
                                    { path: "create", element: <CreateNotificationPage /> },
                                    { path: ":id/edit", element: <UpdateNotificationPage /> },
                                    { path: ":id", element: <ShowNotificationPage /> },
                                ]
                            },
                        ]
                    },
                ]
            }
        ]
    },

]);
