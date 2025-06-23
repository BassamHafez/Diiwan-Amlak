import {
  useEffect,
  useNavigate,
  useSignOut,
} from "../shared/hooks";
import axiosInstance from "../Components/Logic/LogicFun";

const useAxiosInterceptor = () => {
  const navigate = useNavigate();
  const signOut = useSignOut();

  useEffect(() => {
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
  }, [navigate, signOut]);
};

export default useAxiosInterceptor;
