import { MdOutlineFestival } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import { FaBullhorn } from "react-icons/fa6";


export default function MainSideBar() {
  return (
    <div className="ml-4 mr-4 mt-4 rounded-lg h-1/4 text-white bg-gradient-to-b from-gray-800 to-gray-900 border border-gray-600/20">
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
        <ul className="flex flex-col gap-1">
          <li className="rounded-md hover:bg-gray-700/50 transition-colors cursor-pointer">
            <p className="flex items-center p-2">
              <MdOutlineFestival className="mr-3 text-xl text-indigo-400" />
              <span className="text-gray-200">Festivals</span>
            </p>
          </li>
          <li className="rounded-md hover:bg-gray-700/50 transition-colors cursor-pointer">
            <p className="flex items-center p-2">
              <IoMdTime className="mr-3 text-xl text-indigo-400" />
              <span className="text-gray-200">Past Festivals</span>
            </p>
          </li>
          <li className="rounded-md hover:bg-gray-700/50 transition-colors cursor-pointer">
            <p className="flex items-center p-2">
              <FaBullhorn className="mr-3 text-xl text-indigo-400" />
              <span className="text-gray-200">Announcements</span>
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}
