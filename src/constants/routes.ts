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
        INDIVIDUAL: {
          ROOT: "/dashboard/tax-payers/payers/individual",
          CREATE: "/dashboard/tax-payers/payers/individual/create",
          EDIT: "/dashboard/tax-payers/payers/individual/:id/edit",
          SHOW: "/dashboard/tax-payers/payers/individual/:id",
        },
        COMPANY: {
          ROOT: "/dashboard/tax-payers/payers/company",
          CREATE: "/dashboard/tax-payers/payers/company/create",
          EDIT: "/dashboard/tax-payers/payers/company/:id/edit",
          SHOW: "/dashboard/tax-payers/payers/company/:id",
        },
        CHARITABLE_COMPANY: {
          ROOT: "/dashboard/tax-payers/payers/charitable-company",
          CREATE: "/dashboard/tax-payers/payers/charitable-company/create",
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
