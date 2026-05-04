export const ROLES = {
  ADMIN: 'Admin',
  MANAGER: 'Manager',
  EMPLOYEE: 'Employee',
  COLLECTOR_MANAGER: 'Collectors_Manager',
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];
