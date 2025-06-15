import { Outlet, ScrollRestoration } from "react-router-dom";
import MainNav from "../Components/MainNav/MainNav";
import MainFooter from "../Components/Footer/MainFooter";
import { useDispatch, useSelector } from "react-redux";
import useIsOnline from "../hooks/useIsOnline";
import AdminMainContainer from "./Admin/AdminMainContainer/AdminMainContainer";
import NetworkError from "./Error/NetworkError";
import { useEffect } from "react";
import {
  calculateRemainingTime,
  showPhoneAlertNotification,
} from "../Components/Logic/LogicFun";
import { mainAlertTime } from "../Components/Logic/StaticLists";
import Toaster from "../Components/Toaster/Toaster";
import { packageTimeActions } from "../Store/packageTime-slice";
import useAxiosInterceptor from "../hooks/useAxiosInterceptor";

const USER_ROLES = {
  ADMIN: "admin",
  USER: "user",
};

const Root = () => {
  const isOnline = useIsOnline();
  const profileInfo = useSelector((state) => state.profileInfo.data);
  const accountInfo = useSelector((state) => state.accountInfo.data);
  const isPhoneVerified = profileInfo?.phoneVerified;
  const token = useSelector((state) => state.userInfo.token);
  const role = useSelector((state) => state.userInfo.role);
  const mainColor = useSelector((state) => state.configs.mainColor);
  const subColor = useSelector((state) => state.configs.subColor);
  let subscriptionEndDate = accountInfo?.account?.subscriptionEndDate;
  const dispatch = useDispatch();
  useAxiosInterceptor();

  //phone notifications
  useEffect(() => {
    let interval;
    if (token && isPhoneVerified === false) {
      showPhoneAlertNotification();
      interval = setInterval(showPhoneAlertNotification, mainAlertTime);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [token, isPhoneVerified]);

  useEffect(() => {
    if (mainColor) {
      document.documentElement.style.setProperty("--main_color", mainColor);
    }
    if (subColor) {
      document.documentElement.style.setProperty("--deep_navy", subColor);
    }
  }, [mainColor, subColor]);

  //package's remaining time
  useEffect(() => {
    if (subscriptionEndDate && token && role !== "admin") {
      const remainingTime = calculateRemainingTime(subscriptionEndDate);
      const isExpired = remainingTime === 0;
      dispatch(packageTimeActions.setIsPackageTimeExpired(isExpired));
    }
  }, [subscriptionEndDate, dispatch, token, role]);

  if (!isOnline) {
    return <NetworkError />;
  }

  if (role === USER_ROLES.ADMIN) {
    return (
      <>
        <Toaster />
        <AdminMainContainer>
          <Outlet />
        </AdminMainContainer>
      </>
    );
  }

  return (
    <>
      <Toaster />
      <MainNav />
      <Outlet />
      <MainFooter />
      <ScrollRestoration />
    </>
  );
};

export default Root;
