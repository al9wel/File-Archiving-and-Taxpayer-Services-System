import { RouterProvider } from "react-router-dom"
import AppProviders from "@/app/providers/AppProviders"
import { router } from "@/app/router"
import { useAuthMe } from "@/features/auth/hooks/useAuthMe"
import { Loader2 } from "lucide-react"

const AppContent = () => {
    // isLoading is true while fetching the initial session, false otherwise.
    const { isLoading } = useAuthMe()

    if (isLoading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-background">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
        )
    }

    return <RouterProvider router={router} />
}

const App = () => {
    return (
        <AppProviders>
            <AppContent />
        </AppProviders>
    )
}
export default App




