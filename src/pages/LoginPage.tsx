import { UserSignUp } from "@/components/UserSignUp";
import { UserLogin } from "@/components/UserLogin";
import SetPlanLogin from '../assets/SetPlanLogin.jpg'
import {useState, type JSX } from "react";

export default function LoginPage(): JSX.Element {
  const [pageType, setPageType] = useState<string>("login");
  return (
    <div className="flex h-screen w-screen bg-white text-black">
      <div className="flex flex-col justify-center items-center h-1-6 w-2/5">
        {pageType === "login" ? (
          <UserLogin setPageType={setPageType} />
        ) : (
          <UserSignUp setPageType={setPageType} />
        )}
      </div>
      <div className="w-3/5">
        <img
          src={SetPlanLogin}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
