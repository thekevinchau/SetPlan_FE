import MainSideBar from "@/components/MainSideBar";
import Shortcuts from "@/components/Shortcuts";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { UserProfile } from "@/types/userTypes";
import type { RootState } from "@/redux/store";
import ProfileComponent from "@/components/ProfileComponent";
import ProfileEdit from "@/components/ProfileEdit";

export default function UserPage() {
  const [selected, setSelected] = React.useState<number>(4);
  const [isEditMode, setEditMode] = useState<boolean>(false);
  localStorage.setItem("sidebar-selected", "4");
  const navigate = useNavigate();
  const currentUser: UserProfile | null = useSelector(
    (state: RootState) => state.currentUser.userProfile
  );
  useEffect(() => {
    if (currentUser === null || currentUser === undefined) {
      navigate("/");
    }
  }, [currentUser, navigate]);
  return (
    <div className="min-h-screen w-full bg-slate-950 flex flex-col md:flex-row items-start pl-3 pr-3">
      {/* Sidebar */}
      <div className="w-full md:w-1/5 lg:w-1/6 md:mr-3">
        <MainSideBar selected={selected} setSelected={setSelected} />
        <Shortcuts />
      </div>

      {/* Main content */}
      <div className="w-full md:w-3/5 md:flex-1">
        {isEditMode ? (
          <ProfileEdit currentUser={currentUser} setEditMode={() => setEditMode(!isEditMode)} isEditMode={isEditMode} />
        ) : (
          <ProfileComponent
            currentUser={currentUser}
            isEditMode={isEditMode}
            setEditMode={() => setEditMode(!isEditMode)}
          />
        )}
      </div>
    </div>
  );
}
