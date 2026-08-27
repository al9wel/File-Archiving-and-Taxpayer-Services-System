
import type { File } from "./File";
import type { User } from "./User";

export interface TaxInfo {
    taxInfo: {
        id: string | number;
        taxTypeId: string | number;
        fileId: string | number;
        taxPayerId?: string | number;
        taxAmount: string | number;
        lastPayment: string | number;
        attachment?: string | null;
        taxType: {
            id: string | number;
            name: string;
        };
        file?: File['fileInfo'] | null;
        taxPayer?: {
            id: number | string;
            userId?: number | string;
            tradeName?: string;
            commercialRecord?: string;
            activityLicense?: string;
            tradePict?: string;
            insuranceCard?: string;
            propertyDocPict?: string;
            fileType?: "Individual" | "Company" | "CharitableCompany";
        };
    };
    fileInfo?: File['fileInfo'] | null;
    taxPayerInfo?: {
        id: string | number;
        userId?: number;
        tradeName?: string;
        commercialRecord?: string;
        activityLicense?: string;
        tradePict?: string;
        insuranceCard?: string;
        propertyDocPict?: string;
        fileType?: "Individual" | "Company" | "CharitableCompany";
    } | null;
    userInfo?: User | null;
}

