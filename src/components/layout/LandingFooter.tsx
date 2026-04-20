import { NavLink } from "react-router-dom"
import { FileArchive, Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from "lucide-react"
import TaxLogo from "@/assets/images/TaxLogo.png"
import { useAuth } from "@/hooks/useAuth"

export default function LandingFooter() {
    const { isAuthenticated } = useAuth()

    return (
        <footer className="bg-foreground/5 border-t border-border pt-12 pb-6" dir="rtl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

                    {/* Brand */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <img src={TaxLogo} alt="شعار نظام الضرائب" className="h-10 w-auto object-contain" />
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            نظام متكامل لأرشفة الملفات وخدمات دافعي الضرائب، يهدف إلى تسهيل الإجراءات الضريبية وتحقيق الشفافية والكفاءة في الخدمات الحكومية.
                        </p>
                        <div className="flex items-center gap-3 mt-1">
                            <a href="#" className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200">
                                <Facebook className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200">
                                <Twitter className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200">
                                <Linkedin className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col gap-4">
                        <h3 className="font-bold text-foreground">روابط سريعة</h3>
                        <nav className="flex flex-col gap-2">
                            {[
                                { label: "الرئيسية", to: "/" },
                                { label: "عن النظام", to: "/about" },
                                { label: isAuthenticated ? "لوحة التحكم" : "تسجيل الدخول", to: isAuthenticated ? "/dashboard" : "/auth" },
                            ].map((link) => (
                                <NavLink
                                    key={link.to}
                                    to={link.to}
                                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 w-fit"
                                >
                                    {link.label}
                                </NavLink>
                            ))}
                        </nav>
                    </div>

                    {/* Contact */}
                    <div className="flex flex-col gap-4">
                        <h3 className="font-bold text-foreground">تواصل معنا</h3>
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <MapPin className="w-4 h-4 text-primary shrink-0" />
                                <span>صنعاء، الجمهورية اليمنية</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <Phone className="w-4 h-4 text-primary shrink-0" />
                                <span dir="ltr">+967 1 234 567</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <Mail className="w-4 h-4 text-primary shrink-0" />
                                <span>info@tax.gov.ye</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} نظام أرشفة الملفات وخدمات دافعي الضرائب. جميع الحقوق محفوظة.</p>
                    <div className="flex items-center gap-1">
                        <FileArchive className="w-4 h-4 text-primary" />
                        <span>نظام الضرائب الإلكتروني</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
