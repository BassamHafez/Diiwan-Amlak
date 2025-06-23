import { accountActions } from "./accountInfo-slice";
import axiosInstance from "../Components/Logic/LogicFun";
import { toast } from "react-toastify";

const baseServerUrl = import.meta.env.VITE_Base_API_URL;

const fetchAccountData = (token) => {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.get(
        `${baseServerUrl}accounts/my-account`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const res = response.data;
      dispatch(accountActions.setAccountInfo(res.data));
    } catch (error) {
      if (error?.response?.status === 401) {
        toast.error("Session expired. Please login again.");
      } else {
        console.log(error);
      }
    }
  };
};

export default fetchAccountData;
