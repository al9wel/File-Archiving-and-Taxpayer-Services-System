import { NavLink, Outlet, useLocation } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { Users, FileText, Settings2, ChevronLeft, ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import DashboardHeader from "@/components/layout/DahsboardHeader";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";

const TaxPayersLayout = () => {
    const location = useLocation();
    console.log(ROUTES.DASHBOARD.TAXPAYERS.PAYERS.INDIVIDUAL.ROOT.split("/").slice(-2).join("/"));
    console.log(ROUTES.DASHBOARD.TAXPAYERS.ROOT.split("/").pop())
    console.log(ROUTES.DASHBOARD.TAXPAYERS.ROOT)

    // Check if current path matches the payers section using the ROUTES constant
    const payersRootPath = ROUTES.DASHBOARD.TAXPAYERS.PAYERS.ROOT;
    const isPayerActive = location.pathname.includes(payersRootPath);

    const payerSubLinks = [
        { title: "فرد", path: ROUTES.DASHBOARD.TAXPAYERS.PAYERS.INDIVIDUAL.ROOT },
        { title: "شركة", path: ROUTES.DASHBOARD.TAXPAYERS.PAYERS.COMPANY.ROOT },
        { title: "شركة خيرية", path: ROUTES.DASHBOARD.TAXPAYERS.PAYERS.CHARITABLE_COMPANY.ROOT },
    ];

    const mainLinks = [
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
            <div className="container mx-auto px-3 mt-4" dir="rtl">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Internal Sidebar */}
                    <Card className="w-full lg:w-[300px] h-fit p-3 border shadow-sm rounded-3xl overflow-hidden bg-white dark:bg-[#0b0f1a]">
                        <div className="flex flex-col gap-1">

                            {/* Taxpayers Section (Collapsible) */}
                            <Collapsible defaultOpen={isPayerActive} className="w-full group">
                                <CollapsibleTrigger asChild>
                                    <button className={`flex items-center justify-between w-full px-4 py-3 rounded-2xl transition-all cursor-pointer ${isPayerActive ? "bg-[#911111]/5 text-[#911111] font-bold" : "hover:bg-gray-50 text-muted-foreground"}`}>
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-xl ${isPayerActive ? "bg-white shadow-sm" : "bg-muted/30"}`}>
                                                <Users className="size-5" />
                                            </div>
                                            <span className="text-[15px]">المكلفين</span>
                                        </div>
                                        <ChevronDown className="size-4 opacity-50 group-data-[state=open]:rotate-180 transition-transform" />
                                    </button>
                                </CollapsibleTrigger>
                                <CollapsibleContent className="pt-1 overflow-hidden data-[state=closed]:animate-collapse-up data-[state=open]:animate-collapse-down">
                                    <div className="flex flex-col gap-1 pr-10">
                                        {payerSubLinks.map((sub) => (
                                            <NavLink
                                                key={sub.path}
                                                to={sub.path}
                                                className={({ isActive }) =>
                                                    `flex items-center px-4 py-2.5 rounded-xl text-sm transition-all ${isActive
                                                        ? "text-[#911111] font-bold bg-[#911111]/10"
                                                        : "text-muted-foreground hover:text-[#911111] hover:bg-gray-50"
                                                    }`
                                                }
                                            >
                                                {sub.title}
                                            </NavLink>
                                        ))}
                                    </div>
                                </CollapsibleContent>
                            </Collapsible>

                            {/* Main Navigation Links */}
                            {mainLinks.map((link) => (
                                <NavLink
                                    key={link.path}
                                    to={link.path}
                                    className={({ isActive }) =>
                                        `flex items-center justify-between px-4 py-3 rounded-2xl transition-all ${isActive
                                            ? "bg-[#911111]/5 text-[#911111] font-bold"
                                            : "hover:bg-gray-50 text-muted-foreground"
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            <div className="flex items-center gap-3">
                                                <div className={`p-2 rounded-xl ${isActive ? "bg-white shadow-sm" : "bg-muted/30"}`}>
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
