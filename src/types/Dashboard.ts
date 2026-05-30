export type DashboardStatisticsResponse = {
  message: string
  data: DashboardStatistics
}

export type DashboardStatistics = {
  overview?: DashboardOverview
  files_statistics?: FilesStatistics
  users_statistics?: UsersStatistics
  file_movements_statistics?: FileMovementsStatistics
  weekly_activity_statistics?: WeeklyActivityStatistics
  departments_statistics?: DepartmentStatistics[]
}

export type DashboardOverview = {
  departments_count?: number
  activities_types_count?: number
  payments_types_count?: number
  regions_count?: number
  districts_count?: number
  file_status_count?: number
}

export type FilesStatistics = {
  total_files_count?: number
  individual_files_count?: number
  company_files_count?: number
  charitable_company_files_count?: number
}

export type UsersStatistics = {
  total_users_count?: UsersCount
}

export type UsersCount = {
  total_users?: number
  admin_count?: number
  manager_count?: number
  employee_count?: number
  tax_payer_count?: number
  collectors_manager_count?: number
  tax_collector_count?: number
  tax_collectors_count?: number
}

export type FileMovementsStatistics = {
  file_movement_count?: number
  last_6_months_statistics?: LastSixMonthsStatistics
  top_departments_statistics?: TopDepartmentStatistic[]
}

export type LastSixMonthsStatistics = {
  period?: {
    from?: string
    to?: string
  }
  status_totals?: FileMovementStatusTotals
  monthly_breakdown?: MonthlyFileMovement[]
}

export type FileMovementStatusTotals = {
  inside_archive?: number
  outside_archive?: number
  missing?: number
  total?: number
}

export type MonthlyFileMovement = {
  month?: string
  month_name?: string
  inside_archive?: number
  outside_archive?: number
  missing?: number
  total?: number
}

export type TopDepartmentStatistic = {
  date: string,
  dept1: TopDepartmentMovement,
  dept2?: TopDepartmentMovement,
}

export type TopDepartmentMovement = {
  name?: string
  value?: number
}

export type WeeklyActivityStatistics = {
  week_start?: string
  week_end?: string
  days?: WeeklyActivityDay[]
  week_total?: number
}

export type WeeklyActivityDay = {
  day?: string
  date?: string
  created?: number
  updated?: number
  deleted?: number
  total?: number
}

export type DepartmentStatistics = {
  department_id?: number
  department_name?: string
  users_statistics?: UsersCount
  files_statistics?: DepartmentFilesStatistics
  file_movements_statistics?: {
    total_file_movements?: number
  }
}

export type DepartmentFilesStatistics = {
  total_files?: number
  individual_files_count?: number
  company_files_count?: number
  charitable_company_files_count?: number
}
