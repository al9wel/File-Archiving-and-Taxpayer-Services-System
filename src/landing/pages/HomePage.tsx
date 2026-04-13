import { NavLink } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
    FileArchive,
    ShieldCheck,
    Clock,
    Users,
    ArrowLeft,
    ChevronLeft,
    BarChart3,
    FileSearch,
    Landmark,
} from "lucide-react"

const stats = [
    { value: "+٢٠٠٠", label: "دافع ضرائب مسجّل", icon: Users },
    { value: "+٥٠٠٠", label: "ملف مؤرشف", icon: FileArchive },
    { value: "٩٩٪", label: "نسبة الدقة", icon: ShieldCheck },
    { value: "٢٤/٧", label: "خدمة مستمرة", icon: Clock },
]

const features = [
    {
        icon: FileSearch,
        title: "أرشفة ذكية للملفات",
        desc: "نظام متكامل لحفظ وتنظيم وفهرسة جميع الوثائق والملفات الضريبية بكل سهولة.",
    },
    {
        icon: BarChart3,
        title: "تقارير وإحصاءات",
        desc: "لوحة تحكم تفاعلية توفر رؤى لحظية عن الأداء المالي ومعدلات التحصيل.",
    },
    {
        icon: Landmark,
        title: "خدمات دافعي الضرائب",
        desc: "بوابة إلكترونية تمكّن دافعي الضرائب من متابعة ملفاتهم وتقديم طلباتهم بيسر.",
    },
    {
        icon: ShieldCheck,
        title: "حماية وأمان البيانات",
        desc: "تشفير متقدم وصلاحيات دقيقة لضمان سرية المعلومات وسلامة السجلات.",
    },
]

const HomePage = () => {
    return (
        <div className="w-full" dir="rtl">

            {/* ═══════════════ HERO SECTION ═══════════════ */}
            <section className="relative overflow-hidden min-h-[85vh] flex items-center">
                {/* Background gradient blobs */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-primary/20 blur-3xl" />
                    <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-primary/10 blur-3xl" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Text Content */}
                        <div className="flex flex-col gap-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 w-fit text-primary text-sm font-medium">
                                <FileArchive className="w-4 h-4" />
                                <span>نظام أرشفة الملفات الإلكترونية</span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight">
                                نظام متكامل لـ
                                <span className="text-primary"> أرشفة الملفات</span>
                                {" "}وخدمات
                                <span className="text-primary"> دافعي الضرائب</span>
                            </h1>

                            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg">
                                منصة حكومية حديثة تجمع بين الكفاءة والشفافية، تتيح لك إدارة الملفات الضريبية ومتابعة الطلبات بكل سهولة وأمان.
                            </p>

                            <div className="flex flex-wrap items-center gap-3 mt-2">
                                <NavLink to="/auth">
                                    <Button size="lg" className="cursor-pointer hover:bg-primary-hover transition-all duration-200 rounded-xl gap-2">
                                        تسجيل الدخول
                                        <ChevronLeft className="w-4 h-4" />
                                    </Button>
                                </NavLink>
                                <NavLink to="/about">
                                    <Button size="lg" variant="outline" className="cursor-pointer rounded-xl gap-2">
                                        تعرف على النظام
                                        <ArrowLeft className="w-4 h-4" />
                                    </Button>
                                </NavLink>
                            </div>
                        </div>

                        {/* Decorative Card */}
                        <div className="hidden md:flex justify-center items-center">
                            <div className="relative w-full max-w-sm">
                                <div className="bg-card border border-border rounded-2xl shadow-xl p-6 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                            <FileArchive className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm">نظام الأرشفة الذكي</p>
                                            <p className="text-xs text-muted-foreground">آخر تحديث: اليوم</p>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        {["ملف ضريبي #٢٠٢٤-٠٠١", "ملف ضريبي #٢٠٢٤-٠٠٢", "ملف ضريبي #٢٠٢٤-٠٠٣"].map((f, i) => (
                                            <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/60 hover:bg-muted transition-colors">
                                                <div className={`w-2 h-2 rounded-full ${i === 0 ? "bg-green-500" : i === 1 ? "bg-yellow-500" : "bg-primary"}`} />
                                                <span className="text-sm text-foreground/80">{f}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="pt-2 border-t border-border">
                                        <div className="flex justify-between items-center text-xs text-muted-foreground">
                                            <span>نسبة الإنجاز</span>
                                            <span className="text-primary font-bold">٧٨٪</span>
                                        </div>
                                        <div className="mt-1.5 h-1.5 bg-muted rounded-full overflow-hidden">
                                            <div className="h-full w-[78%] bg-primary rounded-full transition-all duration-700" />
                                        </div>
                                    </div>
                                </div>

                                {/* Floating badge */}
                                <div className="absolute -top-4 -left-4 bg-primary text-primary-foreground px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                                    ✓ آمن ومشفّر
                                </div>
                                <div className="absolute -bottom-4 -right-4 bg-card border border-border px-3 py-1.5 rounded-full text-xs font-medium shadow-md text-foreground">
                                    🏛️ جهة حكومية رسمية
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════ STATS ═══════════════ */}
            <section className="bg-primary py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map(({ value, label, icon: Icon }) => (
                            <div key={label} className="flex flex-col items-center gap-2 text-center text-primary-foreground">
                                <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center">
                                    <Icon className="w-6 h-6" />
                                </div>
                                <p className="text-3xl font-bold">{value}</p>
                                <p className="text-sm opacity-80">{label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════ FEATURES ═══════════════ */}
            <section className="py-20 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-foreground mb-3">مميزات النظام</h2>
                        <p className="text-muted-foreground max-w-xl mx-auto text-base">
                            تقنية متقدمة تضع بين يديك كل ما تحتاجه لإدارة الشؤون الضريبية بكفاءة واحترافية.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map(({ icon: Icon, title, desc }) => (
                            <div
                                key={title}
                                className="group p-6 bg-card border border-border rounded-2xl hover:border-primary/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                                    <Icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                                </div>
                                <h3 className="font-bold text-foreground mb-2">{title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════ CTA ═══════════════ */}
            <section className="py-16 bg-primary/5 border-t border-border">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-foreground mb-4">هل أنت مستعد للبدء؟</h2>
                    <p className="text-muted-foreground mb-8 text-base leading-relaxed">
                        سجّل دخولك الآن للوصول إلى لوحة التحكم وإدارة ملفاتك الضريبية بكل سهولة.
                    </p>
                    <NavLink to="/auth">
                        <Button size="lg" className="cursor-pointer hover:bg-primary-hover transition-all duration-200 rounded-xl px-8">
                            دخول النظام
                        </Button>
                    </NavLink>
                </div>
            </section>

        </div>
    )
}

export default HomePage
