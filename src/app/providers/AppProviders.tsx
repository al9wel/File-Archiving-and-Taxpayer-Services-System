import React from 'react'
import { DirectionProvider } from "@/app/providers/direction.tsx"
import { ThemeProvider } from "@/app/providers/ThemeProvider.tsx"
const AppProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <DirectionProvider dir="rtl" direction="rtl">
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                {children}
            </ThemeProvider>
        </DirectionProvider>
    )
}

export default AppProviders
