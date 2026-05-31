import type { Department } from "./Department";

export interface Request {
    RequestInfo: {
        id: number;
        userId: number;
        tradeName: string;
        commercialRecord: string;
        activityLicense: string;
        tradePict: string;
        insuranceCard: string;
        propertyDocPict: string;
        fileType: "Individual" | "Company" | "CharitableCompany";
        articlesOfIncorporation?: string | null;
        govemorLicense?: string | null;
        partnersIDCards?: string | null;
        byLawsCopy?: string | null;
        source?: string;
        requestStatus: "Archived" | "Pending" | "Confirmed" | "Rejected";
        note?: string | null;
    },
    UserInfo: {
        id: number;
        firstName: string;
        lastName: string;
        idCard: string;
        userName: string;
        phone: string;
        image: string;
        createdBy: number;
        department: Department;
        role: string;
        mustChangePassword: boolean;
    },
    taxPayerId?: string | number | null;
}
