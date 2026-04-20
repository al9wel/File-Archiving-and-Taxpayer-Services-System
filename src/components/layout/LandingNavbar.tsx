import { useState } from "react"
import { NavLink } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Menu, X, Moon, Sun } from "lucide-react"
import TaxLogo from "@/assets/images/TaxLogo.png"
import { useIsMobile } from "@/hooks/use-mobile"
import { useTheme } from "@/hooks/useTheme"
import { useAuth } from "@/hooks/useAuth"

const navLinks = [
    { label: "الرئيسية", to: "/" },
    { label: "عن النظام", to: "/about" },
]

export default function LandingNavbar() {
    const [mobileOpen, setMobileOpen] = useState(false)
    const isMobile = useIsMobile()
    const { theme, setTheme } = useTheme()
    const { isAuthenticated, user, logout } = useAuth()

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

                    {isAuthenticated && user ? (
                        <div className="hidden md:flex items-center gap-2">
                            <NavLink to="/dashboard" className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-accent transition-colors border border-transparent hover:border-border">
                                {user.image ? (
                                    <img src={user.image} alt={user.firstName} className="w-8 h-8 rounded-full object-cover border border-border" />
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                                        {user.firstName?.charAt(0)}
                                    </div>
                                )}
                                <span className="text-sm font-medium text-foreground max-w-[100px] truncate">
                                    {user.firstName} {user.lastName}
                                </span>
                            </NavLink>
                            <Button onClick={logout} variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl cursor-pointer">
                                تسجيل خروج
                            </Button>
                        </div>
                    ) : (
                        <NavLink to="/auth" className="hidden md:block">
                            <Button className="cursor-pointer hover:bg-primary-hover transition-all duration-200 rounded-xl">
                                تسجيل الدخول
                            </Button>
                        </NavLink>
                    )}

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
                    {isAuthenticated && user ? (
                        <div className="pt-2 mt-2 border-t border-border space-y-2">
                            <div className="flex items-center gap-3 px-4 py-2">
                                {user.image ? (
                                    <img src={user.image} alt={user.firstName} className="w-10 h-10 rounded-full object-cover border border-border" />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                                        {user.firstName?.charAt(0)}
                                    </div>
                                )}
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-foreground">{user.firstName} {user.lastName}</span>
                                    <span className="text-xs text-muted-foreground">{user.role}</span>
                                </div>
                            </div>
                            <NavLink to="/dashboard" onClick={() => setMobileOpen(false)}>
                                <Button variant="outline" className="w-full justify-start cursor-pointer">لوحة التحكم</Button>
                            </NavLink>
                            <Button onClick={() => { logout(); setMobileOpen(false); }} variant="ghost" className="w-full justify-start cursor-pointer text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30">
                                تسجيل خروج
                            </Button>
                        </div>
                    ) : (
                        <NavLink to="/auth" onClick={() => setMobileOpen(false)}>
                            <Button className="w-full mt-2 cursor-pointer hover:bg-primary-hover">
                                تسجيل الدخول
                            </Button>
                        </NavLink>
                    )}
                </div>
            )}
        </header>
    )
}
