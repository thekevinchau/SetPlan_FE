import { MdOutlineFestival } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import { FaBullhorn } from "react-icons/fa6";
import { Link } from "react-router-dom";


export default function MainSideBar() {
  return (
    <div className=" mt-4 rounded-lg h-1/4 text-white bg-gradient-to-b from-gray-800 to-gray-900 border border-gray-600/20">
      <div className="flex justify-between px-4 py-3 border-b border-gray-700/50">
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
          <li className="rounded-md hover:bg-gray-700/50 transition-colors cursor-pointer">
            <Link to="/festivals" className="flex items-center p-2">
              <MdOutlineFestival className="mr-3 text-xl text-indigo-400" />
              <span className="text-gray-200">Festivals</span>
            </Link>
          </li>
          <li className="rounded-md hover:bg-gray-700/50 transition-colors cursor-pointer">
            <Link to="/past-festivals" className="flex items-center p-2">
              <IoMdTime className="mr-3 text-xl text-indigo-400" />
              <span className="text-gray-200">Past Festivals</span>
            </Link>
          </li>
          <li className="rounded-md hover:bg-gray-700/50 transition-colors cursor-pointer">
            <Link to="/announcements" className="flex items-center p-2">
              <FaBullhorn className="mr-3 text-xl text-indigo-400" />
              <span className="text-gray-200">Announcements</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
