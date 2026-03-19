import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import App from "./App.tsx"

import { DirectionProvider } from "@/app/providers/direction.tsx"
import { ThemeProvider } from "./app/providers/ThemeProvider.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>

    <DirectionProvider dir="rtl" direction="rtl">
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <App />
      </ThemeProvider>
    </DirectionProvider>
  </StrictMode>
)
