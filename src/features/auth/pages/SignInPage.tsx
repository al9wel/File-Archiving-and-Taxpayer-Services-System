import { NavLink } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { FileArchive, Eye, EyeOff, ArrowRight, LayoutDashboard } from "lucide-react"
import { useState } from "react"
import TaxLogo from "@/assets/images/TaxLogo.png"

const SignInPage = () => {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="min-h-screen flex" dir="rtl">

            {/* Left Panel - Decorative */}
            <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden flex-col justify-between p-10">
                {/* Background blobs */}
                <div className="absolute inset-0">
                    <div className="absolute top-[-10%] right-[-10%] w-80 h-80 rounded-full bg-white/10 blur-3xl" />
                    <div className="absolute bottom-[-5%] left-[-5%] w-60 h-60 rounded-full bg-white/10 blur-3xl" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
                </div>

                {/* Logo */}
                <div className="relative z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                            <FileArchive className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-white font-bold text-lg">نظام الأرشفة الضريبية</span>
                    </div>
                </div>

                {/* Center Content */}
                <div className="relative z-10 space-y-6">
                    <h2 className="text-4xl font-bold text-white leading-tight">
                        مرحباً بك في<br />
                        نظام خدمات<br />
                        دافعي الضرائب
                    </h2>
                    <p className="text-white/70 text-base leading-relaxed max-w-sm">
                        منصة حكومية رقمية متكاملة لأرشفة الملفات وإدارة الخدمات الضريبية باحترافية وأمان.
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mt-8">
                        {[
                            { value: "+٢٠٠٠", label: "مستخدم مسجل" },
                            { value: "+٥٠٠٠", label: "ملف مؤرشف" },
                            { value: "٩٩٪", label: "نسبة الدقة" },
                            { value: "٢٤/٧", label: "دعم مستمر" },
                        ].map(({ value, label }) => (
                            <div key={label} className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                                <p className="text-2xl font-bold text-white">{value}</p>
                                <p className="text-white/60 text-xs mt-0.5">{label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="relative z-10 text-white/40 text-xs">
                    © {new Date().getFullYear()} جميع الحقوق محفوظة
                </div>
            </div>

            {/* Right Panel - Sign In Form */}
            <div className="flex-1 flex items-center justify-center bg-background px-4 sm:px-8 py-12">
                <div className="w-full max-w-md space-y-8">

                    {/* Mobile logo */}
                    <div className="lg:hidden flex justify-center">
                        <img src={TaxLogo} alt="شعار النظام" className="h-12 w-auto object-contain" />
                    </div>

                    {/* Heading */}
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">تسجيل الدخول</h1>
                        <p className="text-muted-foreground mt-2 text-sm">
                            أدخل بياناتك للوصول إلى لوحة التحكم
                        </p>
                    </div>

                    {/* Form (UI only - no logic) */}
                    <div className="space-y-5">

                        {/* Username field */}
                        <div className="space-y-1.5">
                            <label htmlFor="username" className="text-sm font-medium text-foreground">
                                اسم المستخدم
                            </label>
                            <input
                                id="username"
                                type="text"
                                placeholder="أدخل اسم المستخدم"
                                className="w-full border border-border rounded-xl px-4 py-3 text-sm bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-200"
                            />
                        </div>

                        {/* Password field */}
                        <div className="space-y-1.5">
                            <label htmlFor="password" className="text-sm font-medium text-foreground">
                                كلمة المرور
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="أدخل كلمة المرور"
                                    className="w-full border border-border rounded-xl px-4 py-3 pl-12 text-sm bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                    aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Remember me + Forgot */}
                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" id="remember" className="w-4 h-4 accent-primary rounded" />
                                <span className="text-muted-foreground">تذكرني</span>
                            </label>
                            <button type="button" className="text-primary hover:underline text-sm font-medium">
                                نسيت كلمة المرور؟
                            </button>
                        </div>

                        {/* Dashboard Button */}
                        <NavLink to="/dashboard">
                            <Button
                                size="lg"
                                className="w-full cursor-pointer hover:bg-primary-hover transition-all duration-200 rounded-xl gap-2 mt-2"
                                id="goto-dashboard-btn"
                            >
                                <LayoutDashboard className="w-4 h-4" />
                                دخول لوحة التحكم
                            </Button>
                        </NavLink>

                        {/* Divider */}
                        <div className="relative mt-4">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-border" />
                            </div>
                            <div className="relative flex justify-center text-xs">
                                <span className="px-3 bg-background text-muted-foreground">أو</span>
                            </div>
                        </div>

                        {/* Back to Home Button */}
                        <NavLink to="/">
                            <Button
                                size="lg"
                                variant="outline"
                                className="w-full cursor-pointer rounded-xl gap-2"
                                id="goto-home-btn"
                            >
                                <ArrowRight className="w-4 h-4" />
                                العودة إلى الرئيسية
                            </Button>
                        </NavLink>
                    </div>

                    {/* Footer note */}
                    <p className="text-center text-xs text-muted-foreground">
                        هذا النظام مخصص للموظفين والمختصين المعتمدين فقط.
                        <br />
                        في حال وجود مشكلة تواصل مع فريق الدعم الفني.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignInPage
