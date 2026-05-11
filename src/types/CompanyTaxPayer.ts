
export interface CompanyTaxPayer {
    companyInfo: {
        id: string | number;
        tax_payer_id: string | number;
        articlesOfIncorporation: string;
        govemorLicense: string;
        partnersIDCards: string;
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
    };
}

