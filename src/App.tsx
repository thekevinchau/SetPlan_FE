import { useQuery } from "@tanstack/react-query";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import { getMyProfile } from "./api/users";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, setUser } from "./redux/currentUserSlice";
import type { RootState } from "./redux/store";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn: boolean = useSelector(
    (state: RootState) => state.currentUser.isLoggedIn
  );
  const { data } = useQuery({
    queryKey: ["current-user"],
    queryFn: getMyProfile,
    enabled: isLoggedIn,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
  useEffect(() => {
    if (!isLoggedIn && !data) {
      dispatch(clearUser());
    } else if (isLoggedIn && data) {
      dispatch(setUser(data));
    }
  }, [isLoggedIn, data, dispatch]);
  return (
    <>
      <LandingPage />
    </>
  );
}

export default App;
