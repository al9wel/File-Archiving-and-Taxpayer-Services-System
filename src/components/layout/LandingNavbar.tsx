import { useState } from "react"
import { NavLink } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Menu, X, Moon, Sun } from "lucide-react"
import TaxLogo from "@/assets/images/TaxLogo.png"
import { useIsMobile } from "@/hooks/use-mobile"
import { useTheme } from "@/hooks/useTheme"

const navLinks = [
    { label: "الرئيسية", to: "/" },
    { label: "عن النظام", to: "/about" },
]

export default function LandingNavbar() {
    const [mobileOpen, setMobileOpen] = useState(false)
    const isMobile = useIsMobile()
    const { theme, setTheme } = useTheme()

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light")
    }

    return (
        <header className="w-full sticky top-0 z-50 bg-white/80 dark:bg-[#1a2236]/80 backdrop-blur-md border-b border-border shadow-sm">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between" dir="rtl">

                {/* Logo */}
                <NavLink to="/" className="flex items-center gap-2 shrink-0">
                    <img src={TaxLogo} alt="شعار نظام الضرائب" className="h-10 w-auto object-contain" />
                </NavLink>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            end={link.to === "/"}
                            className={({ isActive }) =>
                                `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                                    ? "bg-primary text-primary-foreground"
                                    : "text-foreground/70 hover:text-foreground hover:bg-accent"
                                }`
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </div>

                {/* CTA + Theme Toggle + Mobile Toggle */}
                <div className="flex items-center gap-3">
                    {/* Theme Toggle Button */}
                    <Button
                        onClick={toggleTheme}
                        className="rounded-full p-5 duration-300 cursor-pointer"
                        variant="outline"
                        size="icon"
                    >
                        {theme === "light"
                            ? <Moon className="size-5 text-foreground/90" />
                            : <Sun className="size-5 text-foreground/90" />
                        }
                    </Button>

                    <NavLink to="/auth" className="hidden md:block">
                        <Button className="cursor-pointer hover:bg-primary-hover transition-all duration-200 rounded-xl">
                            تسجيل الدخول
                        </Button>
                    </NavLink>

                    {/* Mobile menu button */}
                    {isMobile && (
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="p-2 rounded-lg text-foreground/70 hover:text-foreground hover:bg-accent transition-colors"
                            aria-label="القائمة"
                        >
                            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    )}
                </div>
            </nav>

            {/* Mobile Menu */}
            {isMobile && mobileOpen && (
                <div className="border-t border-border bg-background px-4 pb-4 pt-2 space-y-1" dir="rtl">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            end={link.to === "/"}
                            onClick={() => setMobileOpen(false)}
                            className={({ isActive }) =>
                                `block px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                                    ? "bg-primary text-primary-foreground"
                                    : "text-foreground/70 hover:text-foreground hover:bg-accent"
                                }`
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}
                    <NavLink to="/auth" onClick={() => setMobileOpen(false)}>
                        <Button className="w-full mt-2 cursor-pointer hover:bg-primary-hover">
                            تسجيل الدخول
                        </Button>
                    </NavLink>
                </div>
            )}
        </header>
    )
}
