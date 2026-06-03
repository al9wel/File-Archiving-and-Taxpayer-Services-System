export interface RecycleBin {
    user: {
            id: string|number,
            name: string,
            role: "Admin"|"Employee"|"Collectors_Manager"|"Manager"
        },
    action: string,
    deleted_record_id: string|number,
    recycle_pin_id: string|number,
    model: string,
    datetime: string
        
}


// use this for the "model" names in the recycle bin to be more user friendly
// const getName: Record<string, string> = {
//     UserModel: "المستخدمين",
//     ActivityTypeModel: "نوع النشاط",
//     DepartmentModel: "الأقسام",
//     DistrictModel: "الأحياء",
//     PaymentTypeModel: "أنواع السداد",
//     RegionModel: "المناطق",
//     FileModel: "الملفات",
//     FileMovementModel: "حركة الملفات",
//     RequestModel: "الطلبات",
//     TaxPayerModel: "المكلفين",
//     TaxCollectorModel: "المأمورين",
//     NotificationModel: "الإشعارات",
//     JobTypeModel: "نوع التوظيف",
//     TaxInformationModel: "معلومات الضريبة",
//     TaxTypeModel: "أنواع الضريبة",
//     IndividualModel: "الأفراد",
//     CompanyModel: "الشركات",
//     CharitableCompanyModel: "الشركات الخيرية",
// }
