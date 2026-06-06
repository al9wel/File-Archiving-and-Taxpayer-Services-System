import { RouterProvider } from "react-router-dom"
import AppProviders from "@/app/providers/AppProviders"
import { router } from "@/app/router"
// import { useUser } from "@/features/auth/hooks/useUser"
// import { Loader2 } from "lucide-react"
// import ErrorState from "./pages/ErrorState"
import NoiseOverlay from "@/landing/components/fx/NoiseOverlay"

const AppContent = () => {
    // isLoading is true while fetching the initial session, false otherwise.
    return (
        <div className="realtive">
            <NoiseOverlay opacity={0.09} />
            <RouterProvider router={router} />
        </div>
    )
}

const App = () => {
    return (
        <AppProviders>
            <AppContent />
        </AppProviders>
    )
}
export default App




