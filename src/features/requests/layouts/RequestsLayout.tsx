import { NavLink, Outlet, useLocation } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { Clock, CheckCircle2, Archive, XCircle, ChevronLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import DashboardHeader from "@/components/layout/DahsboardHeader";

const sidebarLinks = [
    { title: "الطلبات المعلقة", path: ROUTES.DASHBOARD.REQUESTS.PENDING, icon: Clock },
    { title: "الطلبات المؤكدة", path: ROUTES.DASHBOARD.REQUESTS.CONFIRMED, icon: CheckCircle2 },
    { title: "الطلبات المرحلة", path: ROUTES.DASHBOARD.REQUESTS.ARCHIVED, icon: Archive },
    { title: "الطلبات المرفوضة", path: ROUTES.DASHBOARD.REQUESTS.REJECTED, icon: XCircle },
];

const RequestsLayout = () => {
    const { pathname } = useLocation();

    return (
        <>
            <div className="w-full px-3 pt-3">
                <DashboardHeader
                    title=" طلبات فتح ملف ضريبي "
                    desc="إدارة ومراجعة طلبات المكلفين الواردة من تطبيق الهاتف المحمول"
                />
            </div>
            <div className="container mx-auto px-3 pb-10" dir="rtl">
                {/* Internal Sidebar (Right side in RTL) */}
                <div className="flex flex-col lg:flex-row gap-6">
                    <Card className="w-full lg:w-[300px] h-fit p-4 shrink-0">
                        <div className="flex flex-col gap-2">
                            {sidebarLinks.map((link) => {
                                const isActive = pathname.startsWith(link.path);
                                return (
                                    <NavLink
                                        key={link.path}
                                        to={link.path}
                                        className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                                            ? "bg-[#FDF2F2] text-[#911111] dark:bg-[#911111]/10 dark:text-[#fca5a5]"
                                            : "hover:bg-gray-50 dark:hover:bg-white/5 text-muted-foreground"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-lg ${isActive ? "bg-white dark:bg-transparent shadow-sm" : ""}`}>
                                                <link.icon className={`size-5 ${isActive ? "text-[#911111] dark:text-[#fca5a5]" : "text-muted-foreground"}`} />
                                            </div>
                                            <span className="font-bold">{link.title}</span>
                                        </div>
                                        {isActive && <ChevronLeft className="size-4" />}
                                    </NavLink>
                                );
                            })}
                        </div>
                    </Card>

                    {/* Main Content (Left side in RTL) */}
                    <div className="flex-1 min-w-0">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
};

export default RequestsLayout;