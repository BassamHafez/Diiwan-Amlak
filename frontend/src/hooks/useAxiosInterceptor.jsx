import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Components/Logic/LogicFun";
import { userActions } from "../Store/userInfo-slice";
import { profileActions } from "../Store/profileInfo-slice";

const useAxiosInterceptor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const signOut = () => {
      localStorage.removeItem("role");
      localStorage.removeItem("token");
      localStorage.removeItem("lastNotificationTime");
      dispatch(userActions.setToken(null));
      dispatch(userActions.setRole(""));
      dispatch(profileActions.setProfileInfo(null));
    };

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        const isExpired =
          error?.response?.data?.message ===
            "Your token has expired! Please log in again." ||
          error?.response?.data?.message?.includes("token has expired") ||
          error?.response?.status === 401;

        if (isExpired) {
          signOut();
          navigate("/");
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [dispatch, navigate]);
};

export default useAxiosInterceptor;
