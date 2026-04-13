import { NavLink } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
    FileArchive,
    ShieldCheck,
    Users,
    Target,
    Eye,
    Award,
    ArrowLeft,
    CheckCircle2,
} from "lucide-react"

const team = [
    { name: "أ. محمد العمري", role: "مدير النظام", initials: "م.ع" },
    { name: "أ. فاطمة السالم", role: "مختصة ضريبية", initials: "ف.س" },
    { name: "م. خالد الحربي", role: "مهندس البرمجيات", initials: "خ.ح" },
]

const values = [
    { icon: ShieldCheck, title: "الشفافية", desc: "نلتزم بالوضوح والصدق في جميع معاملاتنا ومعلوماتنا المقدمة." },
    { icon: Target, title: "الكفاءة", desc: "نسعى دائماً لتقديم الخدمات بأعلى مستويات السرعة والجودة." },
    { icon: Users, title: "خدمة المواطن", desc: "دافع الضرائب في صميم أولوياتنا، نعمل لراحته وسهولة تعاملاته." },
    { icon: Award, title: "التميز", desc: "نسعى للتطوير المستمر وتبني أحدث التقنيات لرفع مستوى الخدمة." },
]

const AboutPage = () => {
    return (
        <div className="w-full" dir="rtl">

            {/* ═══════════════ PAGE HEADER ═══════════════ */}
            <section className="relative py-20 bg-primary overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-white blur-3xl -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white blur-3xl translate-x-1/3 translate-y-1/3" />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 text-white text-sm font-medium mb-6">
                        <FileArchive className="w-4 h-4" />
                        <span>تعرّف علينا</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                        عن النظام
                    </h1>
                    <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
                        نظام أرشفة الملفات وخدمات دافعي الضرائب — منصة حكومية رقمية متكاملة تهدف إلى رفع كفاءة الخدمات الضريبية وتيسيرها للمواطنين.
                    </p>
                </div>
            </section>

            {/* ═══════════════ VISION & MISSION ═══════════════ */}
            <section className="py-20 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Vision */}
                        <div className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                                <Eye className="w-6 h-6 text-primary" />
                            </div>
                            <h2 className="text-2xl font-bold mb-3">رؤيتنا</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                أن نكون النظام الضريبي الإلكتروني الأكثر كفاءة وموثوقية في المنطقة، بما يعزز الامتثال الضريبي ويرفع مستوى الخدمات الحكومية للمواطنين.
                            </p>
                        </div>

                        {/* Mission */}
                        <div className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                                <Target className="w-6 h-6 text-primary" />
                            </div>
                            <h2 className="text-2xl font-bold mb-3">مهمتنا</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                تقديم منصة رقمية متكاملة وآمنة تمكّن دافعي الضرائب من إدارة ملفاتهم الضريبية بسهولة ويُسر، مع ضمان الدقة والشفافية والسرعة في تقديم الخدمات.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════ VALUES ═══════════════ */}
            <section className="py-16 bg-muted/40 border-y border-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-foreground mb-3">قيمنا</h2>
                        <p className="text-muted-foreground max-w-xl mx-auto text-base">
                            المبادئ التي تقود كل قرار نتخذه وكل خدمة نقدمها.
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map(({ icon: Icon, title, desc }) => (
                            <div
                                key={title}
                                className="group bg-card border border-border rounded-2xl p-6 text-center hover:border-primary/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary transition-all duration-300">
                                    <Icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                                </div>
                                <h3 className="font-bold text-foreground mb-2">{title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* ═══════════════ ABOUT SYSTEM ═══════════════ */}
            <section className="py-20 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">لماذا هذا النظام؟</h2>
                            <p className="text-muted-foreground mb-8 leading-relaxed text-base">
                                في ظل التحول الرقمي المتسارع، جاء هذا النظام ليحلّ محل الإجراءات الورقية التقليدية، ويقدم حلاً شاملاً وعصرياً لإدارة الملفات الضريبية والتواصل مع الجهات الحكومية.
                            </p>
                            <div className="space-y-3">
                                {[
                                    "تقليل الوقت اللازم لمعالجة الملفات الضريبية",
                                    "ضمان دقة البيانات وتقليل الأخطاء البشرية",
                                    "توفير سجل إلكتروني موثوق وقابل للمراجعة",
                                    "تسهيل التواصل بين دافعي الضرائب والجهات المعنية",
                                    "توفير تقارير وإحصاءات فورية لدعم اتخاذ القرار",
                                ].map((item) => (
                                    <div key={item} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                                        <span className="text-sm text-foreground/80">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-card border border-border rounded-2xl p-8">
                            <h3 className="text-xl font-bold mb-6 text-center">فريق العمل</h3>
                            <div className="space-y-4">
                                {team.map(({ name, role, initials }) => (
                                    <div key={name} className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted transition-colors">
                                        <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm shrink-0">
                                            {initials}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-sm">{name}</p>
                                            <p className="text-xs text-muted-foreground">{role}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════ CTA ═══════════════ */}
            <section className="py-16 bg-primary/5 border-t border-border">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-foreground mb-4">انضم إلى النظام اليوم</h2>
                    <p className="text-muted-foreground mb-8 text-base leading-relaxed">
                        استفد من منظومة الخدمات الضريبية الإلكترونية المتكاملة وسجّل دخولك الآن.
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center">
                        <NavLink to="/auth">
                            <Button size="lg" className="cursor-pointer hover:bg-primary-hover transition-all duration-200 rounded-xl gap-2">
                                تسجيل الدخول
                                <ArrowLeft className="w-4 h-4" />
                            </Button>
                        </NavLink>
                        <NavLink to="/">
                            <Button size="lg" variant="outline" className="cursor-pointer rounded-xl">
                                العودة للرئيسية
                            </Button>
                        </NavLink>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default AboutPage
