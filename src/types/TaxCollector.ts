import type { Department } from "./Department"
import type { EmploymentType } from "./EmploymentType"

export interface TaxCollector {
    id: number | string
    fullName: string
    idCard: string
    phone: string
    jobTypeId: number | string
    deptID: number | string
    jobType?: EmploymentType
    department?: Department
}
