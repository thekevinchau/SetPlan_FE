import React, { useState } from "react";
import Shortcuts from "../components/Shortcuts";
import MainSideBar from "../components/MainSideBar";
import AnnouncementStorage from "../components/AnnouncementStorage";

export default function Announcements() {
  const [selected, setSelected] = useState<number>(
    Number(localStorage.getItem("sidebar-selected"))
  );
  return (
    <div className="min-h-screen w-full bg-slate-950 flex flex-col md:flex-row items-start pl-3 pr-3 overflow-hidden">
      <div className="w-full md:w-1/5 lg:w-1/6 md:mr-3">
        <MainSideBar selected={selected} setSelected={setSelected} />
        <Shortcuts />
      </div>
      <div className="w-full sm:w-3/5 md:w-3/5 md:flex-1">
        <AnnouncementStorage/>
      </div>
    </div>
  );
}
