import DashboardHeader from "@/components/layout/DahsboardHeader"
import { useUser } from "../hooks/useUser"
import { useParams, useNavigate } from "react-router-dom"
import { Loader2, User as UserIcon, Phone, Shield, Briefcase, Mail, ArrowLeft, Pencil, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ROUTES } from "@/constants/routes"

/**
 * Page component to display detailed information about a specific user.
 * Supports handling complex date objects and file links from the backend.
 */
const ShowUser = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { data: user, isLoading } = useUser(id!)

    if (isLoading) {
        return (
            <div className="flex h-[400px] w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }



    // Configuration for the information grid items
    const infoItems = [
        { label: "رقم المستخدم", value: user?.id, icon: Shield },
        { label: "رقم الهاتف", value: user?.phone, icon: Phone },
        { label: "إسم المستخدم", value: user?.userName, icon: Mail },
        { label: "الدور الوظيفي", value: user?.role, icon: Briefcase },
        { label: "القسم", value: user?.departmentName, icon: Briefcase },
    ]

    return (
        <>
            <div className="w-full px-3 pt-3">
                <DashboardHeader
                    title=" تفاصيل المستخدم "
                    desc={`عرض بيانات الموظف: ${user?.firstName} ${user?.lastName}`}
                />
            </div>

            <div className="container mx-auto px-3 space-y-6" dir="rtl">
                <div className="flex justify-end gap-3">
                    <Button
                        variant="secondary"
                        onClick={() => navigate(-1)}
                        className="rounded-xl hover:bg-accent cursor-pointer h-12 px-6"
                    >
                        <ArrowLeft className="ml-2 h-4 w-4" />
                        رجوع
                    </Button>
                    <Button
                        onClick={() => navigate(ROUTES.DASHBOARD.USERS_EDIT.replace(":id", id!))}
                        className="rounded-xl hover:bg-primary-hover cursor-pointer h-12 px-6 shadow-lg shadow-primary/20"
                    >
                        <Pencil className="ml-2 h-4 w-4" />
                        تعديل البيانات
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
                    {/* Profile Card */}
                    <Card className="lg:col-span-1 rounded-2xl overflow-hidden border shadow-sm ">
                        <div className="h-32 bg-primary/10 w-full" />
                        <CardContent className="px-6 pb-8 -mt-16 flex flex-col items-center text-center space-y-4">
                            <div className="w-32 h-32 rounded-full border-4 border-background bg-muted overflow-hidden shadow-lg">
                                {user?.image ? (
                                    <img src={user.image} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-primary/5 text-primary">
                                        <UserIcon size={64} />
                                    </div>
                                )}
                            </div>
                            <div className="space-y-1">
                                <h2 className="text-2xl font-bold">{user?.firstName} {user?.lastName}</h2>
                                <p className="text-primary font-medium">{user?.role}</p>
                            </div>
                        </CardContent>
                    </Card>
                    {/* Details Section */}
                    <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {infoItems.map((item, index) => (
                            <Card key={index} className="rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
                                <CardContent className="p-6 flex items-center gap-4 text-right">
                                    <div className="w-12 h-12 rounded-xl bg-primary/5 text-primary flex items-center justify-center shrink-0">
                                        <item.icon size={24} />
                                    </div>
                                    <div className="space-y-1 overflow-hidden">
                                        <p className="text-sm text-muted-foreground">{item.label}</p>
                                        <p className="text-lg font-bold truncate">
                                            {item.value || "غير متوفر"}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}

                        {/* ID Card Card */}
                        <Card className="rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
                            <CardContent className="p-6 flex items-center gap-4 text-right">
                                <div className="w-12 h-12 rounded-xl bg-primary/5 text-primary flex items-center justify-center shrink-0">
                                    <FileText size={24} />
                                </div>
                                <div className="space-y-1 overflow-hidden">
                                    <p className="text-sm text-muted-foreground">نسخة بطاقة الهوية</p>
                                    {user?.idCard ? (
                                        <Button
                                            variant="link"
                                            className="p-0 h-auto font-bold text-lg text-primary hover:text-primary-hover cursor-pointer"
                                            onClick={() => window.open(user.idCard, '_blank')}
                                        >
                                            عرض الملف
                                        </Button>
                                    ) : (
                                        <p className="text-lg font-bold truncate">غير متوفر</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>


                </div>
            </div>
        </>
    )
}

export default ShowUser
