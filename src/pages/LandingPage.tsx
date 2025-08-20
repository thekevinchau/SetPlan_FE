import React from "react";
import Shortcuts from "../components/Shortcuts";
import MainSideBar from "../components/MainSideBar";
import MainComponent from "../components/PrimaryComponents/MainComponent";
import { useQuery } from "@tanstack/react-query";
import { getFutureEvents } from "@/api/events";

export default function LandingPage() {
  const [selected, setSelected] = React.useState<number>(
    Number(localStorage.getItem("sidebar-selected"))
  );
  const { data, isPending } = useQuery({
    queryKey: ["events"],
    queryFn: getFutureEvents,
    staleTime: 300000,
  });

  return (
    <div className="min-h-screen w-full bg-slate-950 flex flex-col md:flex-row items-start pl-3 pr-3 overflow-hidden">
      <div className="w-full md:w-1/5 lg:w-1/6 md:mr-3">
        <MainSideBar selected={selected} setSelected={setSelected} />
        <Shortcuts />
      </div>
      <div className="w-full md:w-3/5 md:flex-1">
        <MainComponent events={data} isPending={isPending} isFuture={true} />
      </div>
    </div>
  );
}
