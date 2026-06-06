import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import TaxLogo from "@/assets/images/TaxLogo.png";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/constants/routes";

const navLinks = [
    { label: "الرئيسية", to: ROUTES.PUBLIC.HOME },
    { label: "عن النظام", to: ROUTES.PUBLIC.ABOUT },
];

export default function LandingNavbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (mobileOpen) {
            setMobileOpen(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                ? "backdrop-blur-xl border-b"
                : "bg-transparent"
                }`}
            style={
                scrolled
                    ? { backgroundColor: "rgba(212,205,195,0.9)", borderColor: "var(--landing-line)" }
                    : {}
            }
        >
            <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between" dir="rtl">
                {/* Logo */}
                <NavLink to={ROUTES.PUBLIC.HOME} className="flex items-center gap-2 shrink-0">
                    <img src={TaxLogo} alt="الشعار" className="h-9 w-auto object-contain" />
                </NavLink>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            end={link.to === ROUTES.PUBLIC.HOME}
                            className={({ isActive }) =>
                                `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                                    ? "text-[var(--landing-accent)]"
                                    : "text-[var(--landing-text-muted)] hover:text-[var(--landing-text)]"
                                }`
                            }
                            style={({ isActive }) =>
                                isActive ? { backgroundColor: "color-mix(in srgb, var(--landing-accent) 8%, transparent 92%)" } : {}
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </div>

                {/* CTA + Mobile Toggle */}
                <div className="flex items-center gap-3">
                    {isAuthenticated ? (
                        <NavLink
                            to={ROUTES.DASHBOARD.MAIN}
                            className="hidden md:inline-flex bg-primary/90 items-center px-5 py-2 rounded-xl text-[var(--primary-foreground)] text-sm font-medium transition-all duration-300 hover:shadow-md"
                            style={{ backgroundColor: "var(--landing-accent)" }}
                        >
                            لوحة التحكم
                        </NavLink>
                    ) : (
                        <NavLink
                            to={ROUTES.PUBLIC.AUTH}
                            className="hidden md:inline-flex items-center px-5 py-2 rounded-xl text-[var(--primary-foreground)] text-sm font-medium transition-all duration-300 hover:shadow-md"
                            style={{ backgroundColor: "var(--landing-accent)" }}
                        >
                            تسجيل الدخول
                        </NavLink>
                    )}

                    {/* Mobile toggle */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden p-2 rounded-lg transition-colors"
                        style={{ color: "var(--landing-text-muted)" }}
                        aria-label="القائمة"
                    >
                        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="md:hidden border-t px-6 pb-4 pt-2 space-y-1" style={{ borderColor: "var(--landing-line)", backgroundColor: "var(--landing-bg-soft)" }}>
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            end={link.to === ROUTES.PUBLIC.HOME}
                            onClick={() => setMobileOpen(false)}
                            className={({ isActive }) =>
                                `block px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                                    ? "text-[var(--landing-accent)]"
                                    : "text-[var(--landing-text-muted)] hover:text-[var(--landing-text)]"
                                }`
                            }
                            style={({ isActive }) =>
                                isActive ? { backgroundColor: "color-mix(in srgb, var(--landing-accent) 8%, transparent 92%)" } : {}
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}
                    <div className="pt-2 mt-2 border-t" style={{ borderColor: "var(--landing-line)" }}>
                        {isAuthenticated ? (
                            <NavLink
                                to={ROUTES.DASHBOARD.MAIN}
                                onClick={() => setMobileOpen(false)}
                                className="block w-full text-center px-4 py-2.5 rounded-xl text-[var(--primary-foreground)] text-sm font-medium"
                                style={{ backgroundColor: "var(--landing-accent)" }}
                            >
                                لوحة التحكم
                            </NavLink>
                        ) : (
                            <NavLink
                                to={ROUTES.PUBLIC.AUTH}
                                onClick={() => setMobileOpen(false)}
                                className="block w-full text-center px-4 py-2.5 rounded-xl text-[var(--primary-foreground)] text-sm font-medium"
                                style={{ backgroundColor: "var(--landing-accent)" }}
                            >
                                تسجيل الدخول
                            </NavLink>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}