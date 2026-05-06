
export interface IndividualTaxPayer {
    taxPayer: {
        id: string | number;
        userId: number;
        commercialRecord?: string;
        activityLicense?: string;
        tradePict?: string;
        insuranceCard?: string;
        propertyDocPict?: string;
        fileType: "Individual" | "Company" | "CharitableCompany";
    };
    userInfo: {
        id: string | number;
        fullName: string;
        userName: string;
        phone: string;
        role: string;
        idCard?: string;
        image?: string;
        department?: {
            id: number;
            name: string;
        };
    };
}

export interface test {
            "taxPayer": {
                "id": 2,
                "userId": 7,
                "commercialRecord": "http://127.0.0.1:8000/storage/commercial-records/795477aa-4e27-4ce9-bc34-033aeb716925.pdf",
                "activityLicense": "http://127.0.0.1:8000/storage/activity-licenses/3c1795f4-13d8-42fd-9b33-a9222db02b30.pdf",
                "tradePict": "http://127.0.0.1:8000/storage/trade-picts/9faaa8a9-9136-4e72-8edb-1bfbc02ea348.pdf",
                "insuranceCard": "http://127.0.0.1:8000/storage/insurance-cards/6a441ed0-9f84-4b62-a5bd-1e9c5e111f39.pdf",
                "propertyDocPict": "http://127.0.0.1:8000/storage/property-docs-picts/c6faa633-323d-4398-bd14-ac8a6a95f945.pdf",
                "fileType": "Individual"
            },
            "userInfo": {
                "id": 7,
                "fullName": "سالم الصويل",
                "userName": "987654321",
                "phone": "987654321",
                "role": "Tax_Payer"
            }
}

