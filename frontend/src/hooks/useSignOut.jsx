import { useDispatch } from "react-redux";
import { userActions } from "../Store/userInfo-slice";
import { profileActions } from "../Store/profileInfo-slice";

const useSignOut = () => {
  const dispatch = useDispatch();

  const signOut = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("lastNotificationTime");

    dispatch(userActions.clearAuth());
    dispatch(profileActions.setProfileInfo(null));
  };

  return signOut;
};

export default useSignOut;
