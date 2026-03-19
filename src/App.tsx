import { RouterProvider } from "react-router-dom"
import { router } from "@/app/router/routes"

const App = () => {

    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}
export default App




