import { useTheme } from "@/app/providers/ThemeProvider"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Separator } from "../ui/separator"
import { Moon, Sun } from "lucide-react"

export default function NavBar() {
    const { theme, setTheme } = useTheme()
    const toggleTheme = () => {
        if (theme === "light") {
            setTheme("dark")
        } else {
            setTheme("light")
        }
    }
    return (
        <header className="flex w-full">
            <nav className="w-full m-2 px-4 py-4 border bg-sidebar rounded-md flex flex-col sm:flex-row justify-center sm:justify-between items-start sm:items-center gap-2 sm:gap-0">
                <div className="flex items-center">
                    <SidebarTrigger className=" cursor-pointer text-foreground/90" />
                    <Separator orientation="vertical" className="mx-2 h-12" />
                    <div>
                        <h1 className="font-bold">مرحباً حمزة 👋</h1>
                        <h1>
                            نتمنى لك يوماً سعيداً
                        </h1>
                    </div>
                </div>
                <div className="flex flex-row-reverse -mr-1 sm:flex-row sm:-mr-0 items-center  justify-end gap-2 w-full max-w-sm md:max-w-70 lg:max-w-md">
                    <input type="text" placeholder="البحث عن ملف..." className="border w-full dark:border-input rounded-3xl p-3 text-xs bg-muted dark:bg-[#393f4d]/50" />
                    <Button onClick={toggleTheme} className="rounded-full p-5 duration-300 cursor-pointer" variant="outline" size="icon">
                        {theme === "light" ? <Moon className="size-5 text-foreground/90" /> : <Sun className="size-5 text-foreground/90" />}
                    </Button>
                </div>
            </nav>
        </header>
    )
}