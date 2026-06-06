import { NavLink, Outlet } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { Building2, Activity, CreditCard, Navigation, Map, ChevronLeft, FileCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import DashboardHeader from "@/components/layout/DahsboardHeader";

import { BasicInfoStatisticsCards } from "../components/BasicInfoStatisticsCards";

const sidebarLinks = [
    { title: "الأقسام", path: ROUTES.DASHBOARD.BASIC_INFO.DEPARTMENTS, icon: Building2 },
    { title: "حالة الملف", path: ROUTES.DASHBOARD.BASIC_INFO.FILE_STATUS, icon: FileCheck },
    { title: "نوع النشاط", path: ROUTES.DASHBOARD.BASIC_INFO.ACTIVITY_TYPES, icon: Activity },
    { title: "نوع السداد", path: ROUTES.DASHBOARD.BASIC_INFO.PAYMENT_TYPES, icon: CreditCard },
    { title: "المناطق", path: ROUTES.DASHBOARD.BASIC_INFO.REGIONS, icon: Navigation },
    { title: "الأحياء", path: ROUTES.DASHBOARD.BASIC_INFO.DISTRICTS, icon: Map },
];

const BasicInfoLayout = () => {
    return (
        <>
            <div className="w-full px-3 pt-3">
                <DashboardHeader
                    title=" معلومات أساسية "
                    desc="إدارة الأقسام والعناوين ونوع النشاط"
                />
            </div>
            <div className=" mx-auto px-3" dir="rtl">
                {/* Statistics Cards */}
                <BasicInfoStatisticsCards />

                {/* Internal Sidebar (Right side in RTL) */}
                <div className="flex flex-col lg:flex-row gap-3">
                    <Card className="w-full lg:w-[240px] h-fit p-4">
                        <div className="flex flex-col gap-2">
                            {sidebarLinks.map((link) => (
                                <NavLink
                                    key={link.path}
                                    to={link.path}
                                    className={({ isActive }) =>
                                        `flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                                            ? "bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive/80"
                                            : "hover:bg-muted/50 text-muted-foreground"
                                        }`
                                    }
                                >
                                    {({ isActive }) => {
                                        const Icon = link.icon;
                                        return (
                                            <>
                                                <div className="flex items-center gap-3">
                                                    <div className={`p-2 rounded-lg ${isActive ? "bg-card dark:bg-transparent shadow-sm" : ""}`}>
                                                        <Icon className={`size-5 ${isActive ? "text-destructive dark:text-destructive/80" : "text-muted-foreground"}`} />
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
                    <div className="flex-1 ">
                        <Outlet />
                    </div>
                </div>
            </div>

        </>
    );
};

export default BasicInfoLayout;

