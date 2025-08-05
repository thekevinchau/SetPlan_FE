import { HiOutlineArrowLongRight } from "react-icons/hi2";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
interface SideBarEventProps {
  id: string,
  name: string;
  startDate: string; // ISO format: YYYY-MM-DD
  endDate: string;
}

export default function SideBarEvent({
  id,
  name,
  startDate,
  endDate,
}: SideBarEventProps) {
  const startDay: Date = new Date(startDate);
  const endDay: Date = new Date(endDate);
  const [isFavorited, setIsFavorited] = useState(false);
  return (
    <div className="group flex items-center gap-2 text-xs w-full transition-colors duration-300 cursor-pointer mt-1 rounded-md h-12">
      {isFavorited ? (
        <FaHeart className="text-lg text-pink-500 transition-colors" onClick={() => setIsFavorited(false)} />
      ) : (
        <CiHeart className="text-lg hover:text-pink-500 transition-colors" onClick={() => setIsFavorited(true)} />
      )}
      <Link to={`/events/${id}`} className="flex flex-col justify-center font-light">
        <h1 className="text-xs text-gray-400 group-hover:text-white transition-colors truncate">
          {name}
        </h1>
        <p className="text-xs text-gray-400 group-hover:text-gray-300 truncate">
          {startDay.toDateString()} - {endDay.toDateString()}
        </p>
      </Link>
      <HiOutlineArrowLongRight className="ml-auto text-gray-400 text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}
