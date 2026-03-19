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
import { Home, LogOut, Settings, } from "lucide-react"
import TaxLogo from "@/assets/TaxLogo.png"
import TaxLogoDark from "@/assets/TaxLogoDark.png"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader } from "../ui/card"
import { NavLink } from "react-router-dom"
import { useTheme } from "@/app/providers/ThemeProvider"

export default function SideBar() {
    const { open } = useSidebar()
    const { theme } = useTheme()
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
                                <NavLink to="/" end>
                                    {({ isActive }) => (
                                        <SidebarMenuButton isActive={isActive} className=" text-[17px] font-medium cursor-pointer">
                                            <Home className="-mr-0.5" style={{ width: "20px", height: "20px" }} />
                                            <h1> الرئيسيه </h1>
                                        </SidebarMenuButton>
                                    )}
                                </NavLink>
                            </SidebarMenuItem>
                            {/* <SidebarMenuItem>
                                <SidebarMenuButton className=" mt-2 text-[17px] font-medium">
                                    <FileArchive className="-mr-0.5" style={{ width: "20px", height: "20px" }} />
                                    <h1> الملفات </h1>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton className=" mt-2 text-[17px] font-medium">
                                    <ArrowUpRightFromSquare className="-mr-0.5" style={{ width: "20px", height: "20px" }} />
                                    <h1> حركة الملفات </h1>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton className=" mt-2 text-[17px] font-medium">
                                    <ArrowUpRightFromSquare className="-mr-0.5" style={{ width: "20px", height: "20px" }} />
                                    <h1> الطلبات </h1>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton className=" mt-2 text-[17px] font-medium">
                                    <Home className="-mr-0.5" style={{ width: "20px", height: "20px" }} />
                                    <h1> الرئيسيه </h1>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton className=" mt-2 text-[17px] font-medium">
                                    <FileArchive className="-mr-0.5" style={{ width: "20px", height: "20px" }} />
                                    <h1> الملفات </h1>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton className=" mt-2 text-[17px] font-medium">
                                    <ArrowUpRightFromSquare className="-mr-0.5" style={{ width: "20px", height: "20px" }} />
                                    <h1> حركة الملفات </h1>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton className=" mt-2 text-[17px] font-medium">
                                    <ArrowUpRightFromSquare className="-mr-0.5" style={{ width: "20px", height: "20px" }} />
                                    <h1> الطلبات </h1>
                                </SidebarMenuButton>
                            </SidebarMenuItem> */}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupContent className="border-t-2">
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <NavLink to="/settings">
                                    {({ isActive }) => (
                                        <SidebarMenuButton isActive={isActive} className=" mt-2 text-[17px] font-medium cursor-pointer">
                                            <Settings className="-mr-0.5" style={{ width: "20px", height: "20px" }} />
                                            <h1> الاعدادت </h1>
                                        </SidebarMenuButton>
                                    )}
                                </NavLink>
                            </SidebarMenuItem>
                            {/* <SidebarMenuItem>
                                <SidebarMenuButton className=" mt-2 text-[17px] font-medium">
                                    <FileArchive className="-mr-0.5" style={{ width: "20px", height: "20px" }} />
                                    <h1> الملفات </h1>
                                </SidebarMenuButton>
                            </SidebarMenuItem> */}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className={`${open ? "p-2" : "p-1"} transition-all duration-300`}>
                <SidebarMenu >
                    <SidebarMenuItem >
                        <Card>
                            <CardHeader className={`flex  items-center gap-2 p-1 ${open ? "justify-start" : "  justify-center"} transition-all duration-300`}>
                                <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                                {open && <div className={` transition-all duration-300 flex flex-col justify-center items-start`}>
                                    <h1 className="font-bold">حمزه الوجيه</h1>
                                    <p>مدير</p>
                                </div>}
                            </CardHeader>
                            <CardContent className={`${open ? "" : "flex justify-center items-start -mr-3.5"} transition-all duration-200 flex-col gap-2`}>
                                <NavLink to={"/signin"}>
                                    <Button variant={"destructive"} size={"lg"} className={`${open ? "w-full" : "w-fit"} cursor-pointer`}>
                                        <LogOut></LogOut>
                                        {open && "تسجيل الخروج"}
                                    </Button>
                                </NavLink>
                            </CardContent>
                        </Card>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}