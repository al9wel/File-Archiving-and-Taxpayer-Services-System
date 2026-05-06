import { NavLink, Outlet } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { Users, FileText, Settings2, ChevronLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import DashboardHeader from "@/components/layout/DahsboardHeader";

const sidebarLinks = [
    { title: "المكلفين", path: ROUTES.DASHBOARD.TAXPAYERS.PAYERS.ROOT, icon: Users },
    { title: "نوع الضريبة", path: ROUTES.DASHBOARD.TAXPAYERS.TYPES, icon: Settings2 },
    { title: "البيانات الضريبية", path: ROUTES.DASHBOARD.TAXPAYERS.INFO.ROOT, icon: FileText },
];

const TaxPayersLayout = () => {
    return (
        <>
            <div className="w-full px-3 pt-3">
                <DashboardHeader
                    title=" إدارة المكلفين "
                    desc="إدارة المكلفين وأنواع الضرائب والبيانات الضريبية"
                />
            </div>
            <div className="container mx-auto px-3" dir="rtl">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Internal Sidebar (Right side in RTL) */}
                    <Card className="w-full lg:w-[300px] h-fit p-4">
                        <div className="flex flex-col gap-2">
                            {sidebarLinks.map((link) => (
                                <NavLink
                                    key={link.path}
                                    to={link.path}
                                    className={({ isActive }) =>
                                        `flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                                            ? "bg-[#FDF2F2] text-[#911111] dark:bg-[#911111]/10 dark:text-[#fca5a5]"
                                            : "hover:bg-gray-50 dark:hover:bg-white/5 text-muted-foreground"
                                        }`
                                    }
                                >
                                    {({ isActive }) => {
                                        const Icon = link.icon;
                                        return (
                                            <>
                                                <div className="flex items-center gap-3">
                                                    <div className={`p-2 rounded-lg ${isActive ? "bg-white dark:bg-transparent shadow-sm" : ""}`}>
                                                        <Icon className={`size-5 ${isActive ? "text-[#911111] dark:text-[#fca5a5]" : "text-muted-foreground"}`} />
                                                    </div>
                                                    <span className="font-bold">{link.title}</span>
                                                </div>
                                                {isActive && <ChevronLeft className="size-4" />}
                                            </>
                                        );
                                    }}
                                </NavLink>
                            ))}
                        </div>
                    </Card>

                    {/* Main Content (Left side in RTL) */}
                    <div className="flex-1">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
};

export default TaxPayersLayout;
