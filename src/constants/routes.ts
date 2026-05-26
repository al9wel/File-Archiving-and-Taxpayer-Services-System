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
    FILES_CREATE: "/dashboard/files/create",
    FILES_EDIT: "/dashboard/files/:id/edit",
    FILES_SHOW: "/dashboard/files/:id",
    FILE_MOVEMENTS: "/dashboard/file-movements",
    REQUESTS: {
      ROOT: "/dashboard/requests",
      PENDING: "/dashboard/requests/pending",
      CONFIRMED: "/dashboard/requests/confirmed",
      ARCHIVED: "/dashboard/requests/archived",
      REJECTED: "/dashboard/requests/rejected",
      SHOW: "/dashboard/requests/:id",
    },
    BASIC_INFO: {
      ROOT: "/dashboard/basic-info",
      DEPARTMENTS: "/dashboard/basic-info/departments",
      ACTIVITY_TYPES: "/dashboard/basic-info/activity-types",
      PAYMENT_TYPES: "/dashboard/basic-info/payment-types",
      REGIONS: "/dashboard/basic-info/regions",
      DISTRICTS: "/dashboard/basic-info/districts",
      FILE_STATUS: "/dashboard/basic-info/file-status",
    },
    NOTIFICATIONS: "/dashboard/notifications",
    TAXPAYERS: {
      ROOT: "/dashboard/tax-payers",
      PAYERS: {
        ROOT: "/dashboard/tax-payers/payers",
        CREATE: "/dashboard/tax-payers/payers/create",
        INDIVIDUAL: {
          EDIT: "/dashboard/tax-payers/payers/individual/:id/edit",
          SHOW: "/dashboard/tax-payers/payers/individual/:id",
        },
        COMPANY: {
          EDIT: "/dashboard/tax-payers/payers/company/:id/edit",
          SHOW: "/dashboard/tax-payers/payers/company/:id",
        },
        CHARITABLE_COMPANY: {
          EDIT: "/dashboard/tax-payers/payers/charitable-company/:id/edit",
          SHOW: "/dashboard/tax-payers/payers/charitable-company/:id",
        }
      },
      TYPES: "/dashboard/tax-payers/types",
      INFO: "/dashboard/tax-payers/info",
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
