import { Link } from "react-router-dom";
import { TfiCommentAlt } from "react-icons/tfi";
import { IoArrowUpCircleSharp } from "react-icons/io5";
import type { AnnouncementDetails } from "../types/announcementTypes";
import { useState } from "react";
import React from 'react';
import { isWithinWeek, getWeeksBetweenDates } from "../utils/dateUtils";

interface AnnouncementProps {
  announcement: AnnouncementDetails;
}

export default function Announcement({ announcement }: AnnouncementProps) {
  const [comment, setComment] = useState('');
  const handleCommentInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
    console.log(comment);
  }

  return (
    <div className="w-full flex flex-col p-3 rounded-lg mb-4 border-gray-600 border">
      <div className="border-b-1 border-b-gray-700">
        <div id="header" className="mb-2 flex">
          <Link to={"/users"} className="flex items-center gap-3">
            <img
              className="w-7 h-7 rounded-full mr-2"
              src="src/assets/SetPlan.png"
              alt="SetPlan Logo"
            />
          </Link>
          <div className="text-[0.75rem]">
            <p>{announcement.announcer.name}</p>
            {isWithinWeek(new Date(), new Date(announcement.createdAt)) ? (
              <p className="text-gray-400 pb-[0.1rem]">
                {new Date(announcement.createdAt).toLocaleDateString()}
              </p>
            ) : (
              <p className="text-gray-400 pb-[0.1rem]">
                {getWeeksBetweenDates(
                  new Date(),
                  new Date(announcement.createdAt)
                )}
                w
              </p>
            )}
          </div>
        </div>
        <h2 className="font-extrabold text-gray-100 mb-2">
          {" "}
          {announcement.header}
        </h2>
        <p id="content" className="text-sm font-light text-gray-300 mb-3">
          {" "}
          {announcement.content}
        </p>
      </div>

      <p className="flex items-center text-sm mt-3 w-1/2 text-gray-400">
        <TfiCommentAlt className="mr-2" />
        <span className="pb-1">Show 4 comments</span>
      </p>

      <div className="flex items-center gap-2 mt-2">
        <input
          className="flex-1 border border-gray-400 rounded-md p-3 text-xs"
          placeholder="Write a comment..."
          value={comment}
          onChange={handleCommentInput}
        />
        <button className="text-blue-500 hover:text-blue-600 transition duration-200 cursor-pointer">
          <IoArrowUpCircleSharp className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
}
