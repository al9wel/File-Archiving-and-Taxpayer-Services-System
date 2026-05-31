
export interface TaxInfo {
    taxInfo: {
        id: string | number;
        taxTypeId: string | number;
        taxPayerId: string | number;
        taxAmount: string | number,
        lastPayment: string | number,
        attachment: string,
        taxType: {
            id: string | number;
            name: string;
        },
        taxPayer: {
            id: number | string;
            userId: number | string;
            tradeName: string;
            commercialRecord?: string;
            activityLicense?: string;
            tradePict?: string;
            insuranceCard?: string;
            propertyDocPict?: string;
            fileType?: "Individual" | "Company" | "CharitableCompany";
        }
    };
    taxPayerInfo?: {
        id: string | number;
        userId: number;
        tradeName?: string;
        commercialRecord?: string;
        activityLicense?: string;
        tradePict?: string;
        insuranceCard?: string;
        propertyDocPict?: string;
        fileType: "Individual" | "Company" | "CharitableCompany";
    } | null;
    userInfo?: {
        id: string | number;
        firstName?: string;
        lastName?: string;
        fullName: string;
        userName: string;
        phone: string;
        role: string;
        idCard?: string;
        image?: string;
        department?: {
            id: number | string;
            name: string;
        };
        mustChangePassword?: boolean;
        createdBy?: number | string;
    } | null;
}
