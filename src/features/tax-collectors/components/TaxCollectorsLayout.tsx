import { NavLink, Outlet, useLocation } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { Users, Briefcase, ChevronLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import DashboardHeader from "@/components/layout/DahsboardHeader";
import { CreateTaxCollectorDialog } from "./tax-collectors/CreateTaxCollectorDialog";
import { CreateEmploymentTypeDialog } from "./employment-types/CreateEmploymentTypeDialog";

const sidebarLinks = [
    { title: "المأمورين", path: ROUTES.DASHBOARD.TAX_COLLECTORS.COLLECTORS, icon: Users },
    { title: "نوع التوظيف", path: ROUTES.DASHBOARD.TAX_COLLECTORS.EMPLOYMENT_TYPES, icon: Briefcase },
];

const TaxCollectorsLayout = () => {
    const location = useLocation();

    // Determine which action button to show based on the route
    const renderAction = () => {
        if (location.pathname === ROUTES.DASHBOARD.TAX_COLLECTORS.COLLECTORS) {
            return <CreateTaxCollectorDialog />;
        }
        if (location.pathname === ROUTES.DASHBOARD.TAX_COLLECTORS.EMPLOYMENT_TYPES) {
            return <CreateEmploymentTypeDialog />;
        }
        return null;
    };

    return (
        <>
            <div className="w-full px-3 pt-3">
                <DashboardHeader
                    title=" ادارة المأمورين  "
                    desc="إدارة محصلي الضرائب وأنواع التوظيف"
                />
            </div>

            <div className="container mx-auto px-3" dir="rtl">
                {/* Actions Row - Above both sidebar and content */}
                <div className="hidden lg:flex justify-end mb-6">
                    {renderAction()}
                </div>

                {/* Internal Sidebar (Right side in RTL) */}
                <div className="flex flex-col lg:flex-row gap-6">
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
                    <div className="lg:hidden flex justify-end">
                        {renderAction()}
                    </div>
                    {/* Main Content (Left side in RTL) */}
                    <div className="flex-1 min-w-0">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
};

export default TaxCollectorsLayout;
