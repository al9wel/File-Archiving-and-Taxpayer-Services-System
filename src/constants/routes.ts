export const ROUTES = {
  PUBLIC: {
    HOME: "/",
    ABOUT: "/about",
    AUTH: "/auth",
    RESET_PASSWORD: "/reset-password",
    UNAUTHORIZED: "/unauthorized",
  },
  DASHBOARD: {
    ROOT: "/dashboard",
    MAIN: "/dashboard/main",
    FILES: "/dashboard/files",
    FILE_MOVEMENTS: "/dashboard/file-movements",
    REQUESTS: "/dashboard/requests",
    BASIC_INFO: {
      ROOT: "/dashboard/basic-info",
      DEPARTMENTS: "/dashboard/basic-info/departments",
      ACTIVITY_TYPES: "/dashboard/basic-info/activity-types",
      PAYMENT_TYPES: "/dashboard/basic-info/payment-types",
      REGIONS: "/dashboard/basic-info/regions",
      DISTRICTS: "/dashboard/basic-info/districts",
    },
    NOTIFICATIONS: "/dashboard/notifications",
    TAXPAYERS: {
      ROOT: "/dashboard/tax-payers",
      PAYERS: {
        ROOT: "/dashboard/tax-payers/payers",
        CREATE: "/dashboard/tax-payers/payers/create",
        EDIT: "/dashboard/tax-payers/payers/:id/edit",
        SHOW: "/dashboard/tax-payers/payers/:id",
      },
      TYPES: "/dashboard/tax-payers/types",
      INFO: {
        ROOT: "/dashboard/tax-payers/info",
        CREATE: "/dashboard/tax-payers/info/create",
        EDIT: "/dashboard/tax-payers/info/:id/edit",
        SHOW: "/dashboard/tax-payers/info/:id",
      }
    },
    TAX_COLLECTORS: {
      ROOT: "/dashboard/tax-collectors",
      COLLECTORS: "/dashboard/tax-collectors/collectors",
      EMPLOYMENT_TYPES: "/dashboard/tax-collectors/employment-types",
    },
    USERS: "/dashboard/users",
    USERS_CREATE: "/dashboard/users/create",
    USERS_EDIT: "/dashboard/users/:id/edit",
    USERS_SHOW: "/dashboard/users/:id",
    OPERATION_REPORTS: "/dashboard/operation-reports",
    SETTINGS: "/dashboard/settings",
  },
} as const;
