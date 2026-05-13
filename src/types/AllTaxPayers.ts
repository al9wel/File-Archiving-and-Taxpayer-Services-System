export interface AllTaxPayers {
    taxPayerId: string | number;
    taxPayerName: string;
    taxPayerFileType: string;
    tradeName: string;
    phone: string;
    userId: string | number;
    companyId: string | number | null;
    charitableCompanyId: string | number | null;
}
