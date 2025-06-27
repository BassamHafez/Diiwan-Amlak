import { useEffect, useRef } from "react";
import { useNavigate, useSignOut, useTranslation } from "../shared/hooks";
import axiosInstance from "../Components/Logic/LogicFun";
import { toast } from "../shared/constants";

const useAxiosInterceptor = () => {
  const navigate = useNavigate();
  const signOut = useSignOut();
  const { t } = useTranslation();
  const hasHandledExpiration = useRef(false);

  useEffect(() => {
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        const isExpired =
          error?.response?.data?.message ===
            "Your token has expired! Please log in again." ||
          error?.response?.data?.message?.includes("token has expired");

        if (isExpired && !hasHandledExpiration.current) {
          hasHandledExpiration.current = true;

          signOut();
          toast.error(t("tokenExpired"));
          navigate("/login");
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.response.eject(responseInterceptor);
      hasHandledExpiration.current = false;
    };
  }, [navigate, signOut, t]);
};

export default useAxiosInterceptor;
