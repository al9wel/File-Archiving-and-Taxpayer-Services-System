import { NavLink, Outlet } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { Users, FileText, Settings2, ChevronLeft, } from "lucide-react";
import { Card } from "@/components/ui/card";
import DashboardHeader from "@/components/layout/DahsboardHeader";
import { TaxPayerStatisticsCards } from "../components/TaxPayerStatisticsCards";
import { useSectionStatistics } from "@/hooks/useSectionStatistics";

const TaxPayersLayout = () => {
    const { data: statisticsData, isPending: statisticsIsPending } = useSectionStatistics();
    const mainLinks = [
        { title: "المكلفين", path: ROUTES.DASHBOARD.TAXPAYERS.PAYERS.ROOT, icon: Users },
        { title: "نوع الضريبة", path: ROUTES.DASHBOARD.TAXPAYERS.TYPES, icon: Settings2 },
        { title: "البيانات الضريبية", path: ROUTES.DASHBOARD.TAXPAYERS.INFO, icon: FileText },
    ];

    return (
        <>
            <div className="w-full px-3 pt-3">
                <DashboardHeader
                    title=" إدارة المكلفين "
                    desc="إدارة المكلفين وأنواع الضرائب والبيانات الضريبية"
                />
            </div>
            <div className=" mx-auto px-3 mt-4" dir="rtl">
                {/* show the cards here */}
                <TaxPayerStatisticsCards statistics={statisticsData?.data?.tax_payers} isPending={statisticsIsPending} />

                <div className="flex flex-col xl:flex-row gap-3">
                    {/* Internal Sidebar */}
                    <Card className="w-full xl:w-[240px] h-fit p-3 border shadow-sm rounded-3xl overflow-hidden bg-card">
                        <div className="flex flex-col gap-1">
                            {/* Main Navigation Links */}
                            {mainLinks.map((link) => (
                                <NavLink
                                    key={link.path}
                                    to={link.path}
                                    className={({ isActive }) =>
                                        `flex items-center justify-between px-4 py-3 rounded-2xl transition-all ${isActive
                                            ? "bg-destructive/10 text-destructive font-bold"
                                            : "hover:bg-muted/50 text-muted-foreground"
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            <div className="flex items-center gap-3">
                                                <div className={`p-2 rounded-xl ${isActive ? "bg-card shadow-sm" : "bg-muted/30"}`}>
                                                    <link.icon className="size-5" />
                                                </div>
                                                <span className="text-[15px]">{link.title}</span>
                                            </div>
                                            {isActive && <ChevronLeft className="size-4" />}
                                        </>
                                    )}
                                </NavLink>
                            ))}
                        </div>
                    </Card>

                    {/* Viewport for sub-routes */}
                    <div className="flex-1">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
};

export default TaxPayersLayout;
