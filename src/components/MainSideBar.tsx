import { MdOutlineFestival } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import { FaBullhorn } from "react-icons/fa6";
import { Link } from "react-router-dom";


export default function MainSideBar() {
  return (
    <div className="mt-0 md:mt-4 rounded-lg text-white bg-gradient-to-b from-gray-800 to-gray-900 border border-gray-600/20">
      <div className="flex justify-between px-2 sm:px-4 py-3 border-b border-gray-700/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
            SP
          </div>
          <h1 className="font-semibold">SetPlan</h1>
        </div>
        <div className="w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors cursor-pointer" />
      </div>

      <div className="px-2 mt-3">
        <ul className="flex flex-col gap-1 pb-2">
          <li>
            <Link to="/festivals" className="flex items-center p-2 rounded-md transition-all duration-300 cursor-pointer group">
              <MdOutlineFestival className="mr-3 text-xl text-indigo-400" />
              <span className="text-gray-400 transition-colors duration-300 group-hover:text-white">Festivals</span>
            </Link>
          </li>
          <li>
            <Link to="/past-festivals" className="flex items-center p-2 rounded-md transition-all duration-300 cursor-pointer group">
              <IoMdTime className="mr-3 text-xl text-indigo-400" />
              <span className="text-gray-400 transition-colors duration-300 group-hover:text-white">Past Festivals</span>
            </Link>
          </li>
          <li>
            <Link to="/announcements" className="flex items-center p-2 rounded-md transition-all duration-300 cursor-pointer group">
              <FaBullhorn className="mr-3 text-xl text-indigo-400" />
              <span className="text-gray-400 transition-colors duration-300 group-hover:text-white">Announcements</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
