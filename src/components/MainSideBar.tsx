import { MdOutlineFestival } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import { FaBullhorn } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function MainSideBar() {
  const [selected, setSelected] = useState<number>(1);
  return (
    <div className="mt-0 md:mt-4 rounded-lg text-white bg-gradient-to-b from-gray-900 to-slate-900 border border-gray-700/20">
      <div className="flex justify-between px-2 sm:px-4 py-3 border-b border-gray-700/50">
        <div className="flex items-center gap-3">
          <img
            className="w-8 h-8 rounded-full flex items-center justify-center"
            src="src/assets/SetPlan.png"
            alt="SetPlan Logo"
          ></img>
          <h1 className="font-semibold">SetPlan</h1>
        </div>
        <img
          className="w-8 h-8 rounded-full flex items-center justify-center"
          src="src/assets/SetPlan.png"
          alt="SetPlan Logo"
        ></img>
      </div>

      <div className="px-2 mt-3 font-light">
        <ul className="flex flex-col gap-1 pb-2">
          <li>
            <Link
              to="/"
              className={`flex items-center p-2 rounded-md transition-all duration-300 cursor-pointer group ${selected === 1 ? "bg-gray-800" : ""}`}
              onClick={() => setSelected(1)}
            >
              <MdOutlineFestival className="mr-3 text-lg text-indigo-400" />
              <span className="text-gray-400 transition-colors duration-300 group-hover:text-white">
                Festivals
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/past-festivals"
              className={`flex items-center p-2 rounded-md transition-all duration-300 cursor-pointer group ${selected === 2 ? "bg-gray-800" : ""}`}
              onClick={() => setSelected(2)}
            >
              <IoMdTime className="mr-3 text-lg text-indigo-400" />
              <span className="text-gray-400 transition-colors duration-300 group-hover:text-white">
                Past Festivals
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/announcements"
              className={`flex items-center p-2 rounded-md transition-all duration-300 cursor-pointer group ${selected === 3 ? "bg-gray-800" : ""}`}
              onClick={() => setSelected(3)}
            >
              <FaBullhorn className="mr-3 text-lg text-indigo-400" />
              <span className="text-gray-400 transition-colors duration-300 group-hover:text-white">
                Announcements
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
