import { Users, FileArchive, ArrowRightLeft, FileText, UserCheck, Bell, BarChart3, Settings } from "lucide-react";

export interface EcosystemModule {
    icon: typeof FileArchive;
    label: string;
    desc: string;
    purpose: string;
}

export const ECOSYSTEM_MODULES: EcosystemModule[] = [
    { icon: Users, label: "المستخدمين", desc: "إدارة المستخدمين والصلاحيات", purpose: "تحديد أدوار الفريق وصلاحيات الوصول." },
    { icon: FileArchive, label: "الملفات", desc: "أرشفة الملفات الضريبية", purpose: "حفظ وتنظيم وفهرسة جميع الملفات إلكترونياً." },
    { icon: ArrowRightLeft, label: "حركات الملفات", desc: "تتبع انتقال الملفات", purpose: "متابعة تنقل الملفات بين الأقسام والموظفين." },
    { icon: FileText, label: "الطلبات", desc: "إدارة طلبات المكلفين", purpose: "معالجة طلبات الخدمة من التقديم إلى الاعتماد." },
    { icon: UserCheck, label: "المكلفين", desc: "سجل المكلفين الموحد", purpose: "إدارة بيانات المكلفين وتصنيف أنشطتهم." },
    { icon: Bell, label: "الإشعارات", desc: "التنبيهات التلقائية", purpose: "إشعار المستخدمين بالأحداث والتحديثات الهامة." },
    { icon: BarChart3, label: "التقارير", desc: "تحليلات الأداء", purpose: "تقارير وإحصائيات لحظية عن أداء المنصة." },
    { icon: Settings, label: "الإعدادات", desc: "إعدادات النظام", purpose: "تهيئة النظام وإدارة سجلات التدقيق." },
];