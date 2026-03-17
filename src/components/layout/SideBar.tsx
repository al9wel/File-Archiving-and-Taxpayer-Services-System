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
import { Home, FileArchive, ArrowUpRightFromSquare, LogOut, } from "lucide-react"
import TaxLogo from "@/assets/TaxLogo.png"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader } from "../ui/card"

export default function SideBar() {
    const { open } = useSidebar()
    return (
        <Sidebar side="right" variant="floating" collapsible="icon">
            <SidebarHeader className="border-b-2  flex justify-center items-start overflow-hidden">
                <div className={`${open ? "w-50" : "w-42 -mr-1.5"} transition-all duration-200  flex items-center`}>
                    <img src={TaxLogo} alt="logo" className="w-full h-full" />
                </div>
            </SidebarHeader>
            <SidebarContent >
                <SidebarGroup>
                    <SidebarGroupContent >
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton isActive className=" text-[17px] font-medium">
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
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupContent className="border-t-2">
                        <SidebarMenu>
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
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <Card>
                            <CardHeader className={`flex justify-start items-center gap-2 ${open ? "" : "p-0"} transition-all duration-300`}>
                                <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                                {open && <div className="flex flex-col justify-center items-start">
                                    <h1 className="font-bold">حمزه الوجيه</h1>
                                    <p>مدير</p>
                                </div>}
                            </CardHeader>
                            <CardContent className={`${open ? "" : "flex justify-start items-start -mr-4"} transition-all duration-200 flex-col gap-2`}>
                                <Button variant={"destructive"} size={"lg"} className={`${open ? "w-full" : "w-fit"}`}>
                                    <LogOut></LogOut>
                                    {open && "تسجيل الخروج"}
                                </Button>
                            </CardContent>
                        </Card>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}