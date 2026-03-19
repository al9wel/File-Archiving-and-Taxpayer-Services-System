import { Button } from "@/components/ui/button"
import { NavLink } from "react-router-dom"

const SignInPage = () => {
    return (
        <div className='w-full h-100 flex justify-center items-center flex-col gap-4'>
            <h1 className='text-2xl font-bold'>صفحة تسجيل الدخول</h1>
            <NavLink to={"/"}>
                <Button className="hover:bg-primary-hover cursor-pointer">دخول</Button>
            </NavLink>
        </div>
    )
}

export default SignInPage
