import { logout } from "@/api/users";
import MainSideBar from "@/components/MainSideBar";
import Shortcuts from "@/components/Shortcuts";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useDispatch } from "react-redux";
import { clearUser } from "@/redux/currentUserSlice";
import { useNavigate } from "react-router-dom";

export default function UserPage() {
  const [selected, setSelected] = React.useState<number>(
    Number(localStorage.getItem("sidebar-selected"))
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {data, isPending} = useQuery({
    queryKey: ["currentUser"],
  })
  const logoutFn  = async () => {
    await logout();
    dispatch(clearUser())
    navigate('/')
  }
  return (
    <div className="min-h-screen w-full bg-slate-950 flex flex-col md:flex-row items-start pl-3 pr-3 overflow-hidden">
      <div className="w-full md:w-1/5 lg:w-1/6 md:mr-3">
        <MainSideBar selected={selected} setSelected={setSelected} />
        <Shortcuts />
      </div>
      <div className="w-full sm:w-3/5 md:w-3/5 md:flex-1">
        <div className="w-full h-[95.75vh] rounded-lg mt-4 text-white bg-gradient-to-b from-gray-900 to-slate-900 border border-gray-700/20 p-3 overflow-scroll">
        <Button onClick={logoutFn}>Log out</Button>
        </div>
      </div>
    </div>
  );
}
