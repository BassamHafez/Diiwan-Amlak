import { accountActions } from "./accountInfo-slice";
import axiosInstance from "../Components/Logic/LogicFun";

const baseServerUrl = import.meta.env.VITE_Base_API_URL;

const fetchAccountData = (token) => {
  return async (dispatch) => {
      try {
        const response = await axiosInstance.get(`${baseServerUrl}accounts/my-account`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const res = response.data;
        dispatch(accountActions.setAccountInfo(res.data));
      } catch (error) {
        console.error(error);
      }
  };
};

export default fetchAccountData;
