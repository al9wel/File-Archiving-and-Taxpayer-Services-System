
export interface CharitableCompanyTaxPayer {
    charitableCompanyInfo: {
        id: string | number;
        tax_payer_id: string | number;
        byLawsCopy?: string;
    },
    taxPayerInfo: {
        id: string | number;
        userId: number;
        tradeName?: string;
        commercialRecord?: string;
        activityLicense?: string;
        tradePict?: string;
        insuranceCard?: string;
        propertyDocPict?: string;
        fileType: "Individual" | "Company" | "CharitableCompany";
    }
    userInfo: {
        id: string | number;
        firstName?: string;
        lastName?: string;
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
    };
}


