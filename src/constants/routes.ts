export const ROUTES = {
  PUBLIC: {
    HOME: "/",
    ABOUT: "/about",
    AUTH: "/auth",
    UNAUTHORIZED: "/unauthorized",
  },
  DASHBOARD: {
    ROOT: "/dashboard",
    MAIN: "/dashboard/main",
    FILES: "/dashboard/files",
    FILE_MOVEMENTS: "/dashboard/file-movements",
    REQUESTS: "/dashboard/requests",
    BASIC_INFO: "/dashboard/basic-info",
    NOTIFICATIONS: "/dashboard/notifications",
    TAXPAYERS: "/dashboard/taxpayers",
    OFFICERS: "/dashboard/officers",
    USERS: "/dashboard/users",
    OPERATION_REPORTS: "/dashboard/operation-reports",
    SETTINGS: "/dashboard/settings",
  },
} as const;
