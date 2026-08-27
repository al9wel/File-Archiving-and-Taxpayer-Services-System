

import type { ActivityType } from "./ActivityType"
import type { Department } from "./Department"
import type { District } from "./District"
import type { FileStatus } from "./FileStatus"
import type { PaymentType } from "./PaymentType"
import type { Region } from "./Region"
import type { User } from "./User"

export interface TaxPayerActivity {
    id: number | string
    fileId?: number | string
    tradeName: string
    commercialRecord?: string | null
    activityLicense?: string | null
    tradePict?: string | null
    insuranceCard?: string | null
    propertyDocPict?: string | null
    fileType: "Individual" | "Company" | "CharitableCompany"
    source?: string | null
    region?: Region | null
    district?: District | null
    companies?: any[]
    charitableCompanies?: any[]
    companyInfo?: {
        id: number | string
        tax_payer_id?: number | string
        articlesOfIncorporation?: string
        govemorLicense?: string
        partnersIDCards?: string
    } | null
    charitableCompanyInfo?: {
        id: number | string
        tax_payer_id?: number | string
        byLawsCopy?: string
    } | null
}

export interface File {
    fileInfo: {
        id: number | string
        taxNumber: string | number | null
        inventoryNumber: string | number
        activityStartDate: string | null
        docsCount: number | string
        note: string | null
        fullAddress?: string | null
        user: User
        taxPayers?: TaxPayerActivity[]
        taxPayer?: TaxPayerActivity | null
        taxInformation?: {
            id: number | string
            taxTypeId: number | string
            fileId: number | string
            taxAmount: number | string
            lastPayment: number | string
            attachment?: string | null
            taxType?: {
                id: number | string
                name: string
            }
        } | null
        department: Department
        fileStatus: FileStatus
        activityType: ActivityType
        paymentType: PaymentType
        region?: Region | null
        district?: District | null
        creator?: User | null
    }
}

