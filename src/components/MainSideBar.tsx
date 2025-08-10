import { useEffect } from "react";
import { MdOutlineFestival } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import { FaBullhorn } from "react-icons/fa6";
import { Link } from "react-router-dom";

interface MainSideBarProps {
  selected?: number;
  setSelected: (value: number) => void;
}

export default function MainSideBar({ selected, setSelected }: MainSideBarProps) {
  useEffect(() => {
    const savedSelected = localStorage.getItem("sidebar-selected");
    if (savedSelected) {
      setSelected(Number(savedSelected));
    }
  }, [setSelected]);

  const handleSelection = (value: number) => {
    localStorage.setItem("sidebar-selected", value.toString());
    setSelected(value);
  };

  return (
    <div className="mt-0 md:mt-4 rounded-lg text-white bg-gradient-to-b from-gray-900 to-slate-900 border border-gray-700/20">
      <div className="flex justify-between px-2 sm:px-4 py-3 border-gray-700/50">
        <Link to={"/"} className="flex items-center gap-3" onClick={() => handleSelection(1)}>
          <img
            className="w-8 h-8 rounded-full"
            src="src/assets/SetPlan.png"
            alt="SetPlan Logo"
          />
          <h1 className="font-semibold">SetPlan</h1>
        </Link>
        <Link to={"/users"}>
          <img
            className="w-8 h-8 rounded-full"
            src="src/assets/SetPlan.png"
            alt="SetPlan Logo"
          />
        </Link>
      </div>

      <div className="px-2 mt-3 font-light text-sm">
        <ul className="flex flex-col gap-1 pb-2">
          <li>
            <Link
              to="/"
              className={`flex items-center p-2 rounded-md transition-all duration-300 cursor-pointer group ${
                selected === 1 ? "bg-gray-800" : ""
              }`}
              onClick={() => handleSelection(1)}
            >
              <MdOutlineFestival className="mr-3 text-lg" />
              <span className="text-gray-400 group-hover:text-white">Events</span>
            </Link>
          </li>
          <li>
            <Link
              to="/past-events"
              className={`flex items-center p-2 rounded-md transition-all duration-300 cursor-pointer group ${
                selected === 2 ? "bg-gray-800" : ""
              }`}
              onClick={() => handleSelection(2)}
            >
              <IoMdTime className="mr-3 text-lg" />
              <span className="text-gray-400 group-hover:text-white">Past Events</span>
            </Link>
          </li>
          <li>
            <Link
              to="/announcements"
              className={`flex items-center p-2 rounded-md transition-all duration-300 cursor-pointer group ${
                selected === 3 ? "bg-gray-800" : ""
              }`}
              onClick={() => handleSelection(3)}
            >
              <FaBullhorn className="mr-3 text-lg" />
              <span className="text-gray-400 group-hover:text-white">Updates</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
