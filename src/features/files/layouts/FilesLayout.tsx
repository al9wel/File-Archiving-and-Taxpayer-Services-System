import { NavLink, Outlet, useLocation } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { FileText, Paperclip, ChevronLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import DashboardHeader from "@/components/layout/DahsboardHeader";
import { FileStatisticsCards } from "../components/FileStatisticsCards";
import { useSectionStatistics } from "@/hooks/useSectionStatistics";

const FilesLayout = () => {
    const { pathname } = useLocation();
    const { data: statisticsData, isPending: statisticsIsPending } = useSectionStatistics();

    const isFilesActive = pathname.startsWith(ROUTES.DASHBOARD.FILES.ROOT) &&
        !pathname.startsWith(ROUTES.DASHBOARD.FILES.ATTACHMENTS);

    const isAttachmentsActive = pathname.startsWith(ROUTES.DASHBOARD.FILES.ATTACHMENTS);

    const mainLinks = [
        { title: "الملفات", path: ROUTES.DASHBOARD.FILES.ROOT, icon: FileText, isActive: isFilesActive },
        { title: "الملحقات", path: ROUTES.DASHBOARD.FILES.ATTACHMENTS, icon: Paperclip, isActive: isAttachmentsActive },
    ];

    return (
        <>
            <div className="w-full px-3 pt-3">
                <DashboardHeader
                    title=" ادارة الملفات  "
                    desc="إدارة الملفات والملحقات"
                />
            </div>
            <div className=" mx-auto px-3 mt-4" dir="rtl">
                {/* Statistics Cards */}
                <FileStatisticsCards statistics={statisticsData?.data?.files} isPending={statisticsIsPending} />

                <div className="flex flex-col xl:flex-row gap-3">
                    {/* Internal Sidebar */}
                    <Card className="w-full xl:w-[240px] h-fit p-3 border shadow-sm rounded-3xl overflow-hidden bg-card">
                        <div className="flex flex-col gap-1">
                            {/* Main Navigation Links */}
                            {mainLinks.map((link) => (
                                <NavLink
                                    key={link.path}
                                    to={link.path}
                                    className={`flex items-center justify-between px-4 py-3 rounded-2xl transition-all ${link.isActive
                                        ? "bg-destructive/10 text-destructive font-bold"
                                        : "hover:bg-muted/50 text-muted-foreground"
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-xl ${link.isActive ? "bg-card shadow-sm" : "bg-muted/30"}`}>
                                            <link.icon className="size-5" />
                                        </div>
                                        <span className="text-[15px]">{link.title}</span>
                                    </div>
                                    {link.isActive && <ChevronLeft className="size-4" />}
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
