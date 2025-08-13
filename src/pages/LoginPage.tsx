
import { UserLogin } from "@/components/UserLogin";
import type { JSX } from "react";


export default function LoginPage(): JSX.Element {
    return <div className="flex h-screen w-screen bg-white text-black">
        <div className="flex flex-col justify-center items-center h-1-6 w-2/5">
        <UserLogin/>
        </div>
        <div className="w-3/5">
        <img src="src/assets/SetPlanLogin.jpg" className="h-full w-full object-cover"/>
        </div>
    </div>

}