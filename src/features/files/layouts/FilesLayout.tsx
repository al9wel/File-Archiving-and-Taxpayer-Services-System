import { NavLink, Outlet } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { FileText, Paperclip, ChevronLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import DashboardHeader from "@/components/layout/DahsboardHeader";

const FilesLayout = () => {
    const mainLinks = [
        { title: "الملفات", path: ROUTES.DASHBOARD.FILES.ROOT, icon: FileText },
        { title: "الملحقات", path: ROUTES.DASHBOARD.FILES.ATTACHMENTS, icon: Paperclip },
    ];

    return (
        <>
            <div className="w-full px-3 pt-3">
                <DashboardHeader
                    title="إدارة الملفات"
                    desc="إدارة الملفات والملحقات"
                />
            </div>
            <div className="container mx-auto px-3 mt-4" dir="rtl">
                <div className="flex flex-col xl:flex-row gap-6">
                    {/* Internal Sidebar */}
                    <Card className="w-full xl:w-[300px] h-fit p-3 border shadow-sm rounded-3xl overflow-hidden bg-white dark:bg-[#0b0f1a]">
                        <div className="flex flex-col gap-1">
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

export default FilesLayout;