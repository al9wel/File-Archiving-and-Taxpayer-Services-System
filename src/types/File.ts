

import type { ActivityType } from "./ActivityType"
import type { Department } from "./Department"
import type { District } from "./District"
import type { FileStatus } from "./FileStatus"
import type { PaymentType } from "./PaymentType"
import type { Region } from "./Region"
import type { User } from "./User"

// response type for getting all files for the table and for viewing details
// dont use it when create file or update use formdata like the other features
export interface File {
    fileInfo: {
        id: number | string,
        taxNumber: string | number,
        inventoryNumber: string | number,
        activityStartDate: string,
        docsCount: number | string,
        note: string | null,
        fullAddress?: string | null,
        taxPayer: {
            id: number | string,
            userId: number | string,
            tradeName: string,
            commercialRecord: string,
            activityLicense: string,
            tradePict: string,
            insuranceCard: string,
            propertyDocPict: string,
            fileType: "Individual" | "Company" | "CharitableCompany",
            source?: string|null
        },
        department: Department,
        fileStatus: FileStatus,
        activityType: ActivityType,
        paymentType: PaymentType,
        region: Region,
        district: District,
        creator: User
    }
}
