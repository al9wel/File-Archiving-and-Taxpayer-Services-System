import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import {
    Home,
    LogOut,
    Settings,
    FileArchive,
    ArrowUpRightFromSquare,
    ClipboardList,
    Users,
    UserCheck,
    UserCog,
    FileBarChart,
    Info,
    Bell
} from "lucide-react"
import TaxLogo from "@/assets/images/TaxLogo.png"
import TaxLogoDark from "@/assets/images/TaxLogoDark.png"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { NavLink } from "react-router-dom"
import { useTheme } from "@/hooks/useTheme"
import { useAuth } from "@/hooks/useAuth"
import { useLogout } from "@/features/auth/hooks/useLogout"
import { ROUTES } from "@/constants/routes"

export default function SideBar() {
    const { open } = useSidebar()
    const { theme } = useTheme()
    const { user } = useAuth()
    const logout = useLogout()
    return (
        <Sidebar side="right" variant="floating" collapsible="icon" className="z-101">
            <SidebarHeader className="border-b-2  flex justify-center items-start overflow-hidden">
                <div className={`${open ? "w-50" : "w-42 -mr-1.5"} transition-all duration-200  flex items-center`}>
                    <img src={theme === "light" ? TaxLogo : TaxLogoDark} alt="logo" className="w-full h-full" />
                </div>
            </SidebarHeader>
            <SidebarContent >
                <SidebarGroup>
                    <SidebarGroupContent >
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <NavLink to={ROUTES.DASHBOARD.MAIN}>
                                    {({ isActive }) => (
                                        <SidebarMenuButton isActive={isActive} className=" text-[17px] font-medium cursor-pointer">
                                            <Home className="-mr-0.5" style={{ width: "20px", height: "20px" }} />
                                            <h1> الرئيسية </h1>
                                        </SidebarMenuButton>
                                    )}
                                </NavLink>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <NavLink to={ROUTES.DASHBOARD.FILES}>
                                    {({ isActive }) => (
                                        <SidebarMenuButton isActive={isActive} className=" mt-2 text-[17px] font-medium cursor-pointer">
                                            <FileArchive className="-mr-0.5" style={{ width: "20px", height: "20px" }} />
                                            <h1> الملفات </h1>
                                        </SidebarMenuButton>
                                    )}
                                </NavLink>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <NavLink to={ROUTES.DASHBOARD.FILE_MOVEMENTS}>
                                    {({ isActive }) => (
                                        <SidebarMenuButton isActive={isActive} className=" mt-2 text-[17px] font-medium cursor-pointer">
                                            <ArrowUpRightFromSquare className="-mr-0.5" style={{ width: "20px", height: "20px" }} />
                                            <h1> حركة الملفات </h1>
                                        </SidebarMenuButton>
                                    )}
                                </NavLink>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <NavLink to={ROUTES.DASHBOARD.REQUESTS}>
                                    {({ isActive }) => (
                                        <SidebarMenuButton isActive={isActive} className=" mt-2 text-[17px] font-medium cursor-pointer">
                                            <ClipboardList className="-mr-0.5" style={{ width: "20px", height: "20px" }} />
                                            <h1> الطلبات </h1>
                                        </SidebarMenuButton>
                                    )}
                                </NavLink>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <NavLink to={ROUTES.DASHBOARD.BASIC_INFO}>
                                    {({ isActive }) => (
                                        <SidebarMenuButton isActive={isActive} className=" mt-2 text-[17px] font-medium cursor-pointer">
                                            <Info className="-mr-0.5" style={{ width: "20px", height: "20px" }} />
                                            <h1> معلومات أساسية </h1>
                                        </SidebarMenuButton>
                                    )}
                                </NavLink>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <NavLink to={ROUTES.DASHBOARD.NOTIFICATIONS}>
                                    {({ isActive }) => (
                                        <SidebarMenuButton isActive={isActive} className=" mt-2 text-[17px] font-medium cursor-pointer">
                                            <Bell className="-mr-0.5" style={{ width: "20px", height: "20px" }} />
                                            <h1> الإشعارات </h1>
                                        </SidebarMenuButton>
                                    )}
                                </NavLink>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <NavLink to={ROUTES.DASHBOARD.TAXPAYERS}>
                                    {({ isActive }) => (
                                        <SidebarMenuButton isActive={isActive} className=" mt-2 text-[17px] font-medium cursor-pointer">
                                            <Users className="-mr-0.5" style={{ width: "20px", height: "20px" }} />
                                            <h1> المكلفين </h1>
                                        </SidebarMenuButton>
                                    )}
                                </NavLink>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <NavLink to={ROUTES.DASHBOARD.OFFICERS}>
                                    {({ isActive }) => (
                                        <SidebarMenuButton isActive={isActive} className=" mt-2 text-[17px] font-medium cursor-pointer">
                                            <UserCheck className="-mr-0.5" style={{ width: "20px", height: "20px" }} />
                                            <h1> المأمورين </h1>
                                        </SidebarMenuButton>
                                    )}
                                </NavLink>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <NavLink to={ROUTES.DASHBOARD.USERS}>
                                    {({ isActive }) => (
                                        <SidebarMenuButton isActive={isActive} className=" mt-2 text-[17px] font-medium cursor-pointer">
                                            <UserCog className="-mr-0.5" style={{ width: "20px", height: "20px" }} />
                                            <h1> المستخدمين </h1>
                                        </SidebarMenuButton>
                                    )}
                                </NavLink>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupContent className="border-t-2">
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <NavLink to={ROUTES.DASHBOARD.OPERATION_REPORTS}>
                                    {({ isActive }) => (
                                        <SidebarMenuButton isActive={isActive} className=" mt-2 text-[17px] font-medium cursor-pointer">
                                            <FileBarChart className="-mr-0.5" style={{ width: "20px", height: "20px" }} />
                                            <h1> تقرير العمليات </h1>
                                        </SidebarMenuButton>
                                    )}
                                </NavLink>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <NavLink to={ROUTES.DASHBOARD.SETTINGS}>
                                    {({ isActive }) => (
                                        <SidebarMenuButton isActive={isActive} className=" mt-2 text-[17px] font-medium cursor-pointer">
                                            <Settings className="-mr-0.5" style={{ width: "20px", height: "20px" }} />
                                            <h1> الإعدادات </h1>
                                        </SidebarMenuButton>
                                    )}
                                </NavLink>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className={`${open ? "p-2" : "p-1"} transition-all duration-300`}>
                <SidebarMenu >
                    <SidebarMenuItem >
                        <Card>
                            <CardHeader className={`flex  items-center gap-2 p-1 ${open ? "justify-start" : "  justify-center"} transition-all duration-300`}>
                                {user?.image ? (
                                    <img src={user.image} alt="User profile" className="w-8 h-8 rounded-full object-cover" />
                                ) : (
                                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                        {user?.firstName?.charAt(0) || 'U'}
                                    </div>
                                )}
                                {open && <div className={` transition-all duration-300 flex flex-col justify-center items-start`}>
                                    <h1 className="font-bold text-sm truncate w-32">{user?.firstName} {user?.lastName}</h1>
                                    <p className="text-xs text-muted-foreground truncate w-32">{user?.role || 'Guest'}</p>
                                </div>}
                            </CardHeader>
                            <CardContent className={`${open ? "" : "flex justify-center items-start -mr-3.5"} transition-all duration-200 flex-col gap-2`}>
                                <Button
                                    variant={"destructive"}
                                    size={"lg"}
                                    onClick={() => logout.mutate()}
                                    disabled={logout.isPending}
                                    className={`${open ? "w-full" : "w-fit"} cursor-pointer`}
                                >
                                    <LogOut />
                                    {open && (logout.isPending ? "جاري الخروج..." : "تسجيل الخروج")}
                                </Button>
                            </CardContent>
                        </Card>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}