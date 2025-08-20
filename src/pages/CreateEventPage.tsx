import CreateEvent from "@/components/CreateEvent";
import MainSideBar from "@/components/MainSideBar";
import Shortcuts from "@/components/Shortcuts";
import React from "react";

export default function CreateEventPage() {
  const [selected, setSelected] = React.useState<number>(
    Number(localStorage.getItem("sidebar-selected"))
  );
  return (
    <div className="min-h-screen w-full bg-slate-950 flex flex-col md:flex-row items-start pl-3 pr-3 overflow-hidden">
      <div className="w-full md:w-1/5 lg:w-1/6 md:mr-3">
        <MainSideBar selected={selected} setSelected={setSelected} />
        <Shortcuts />
      </div>
            <div className="w-full md:w-3/5 md:flex-1">
            <CreateEvent/>
            </div>
    </div>
  );
}
