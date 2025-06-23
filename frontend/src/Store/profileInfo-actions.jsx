import { profileActions } from "./profileInfo-slice";
import axiosInstance from "../Components/Logic/LogicFun";
import { toast } from "react-toastify";

const baseServerUrl = import.meta.env.VITE_Base_API_URL;

const fetchProfileData = (token) => {

  return async (dispatch) => {
    try {
      const response = await axiosInstance.get(`${baseServerUrl}users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const res = response.data;
      dispatch(profileActions.setProfileInfo(res.data));
    } catch (error) {
      if(error?.response?.status === 401){
        toast.error("Session expired. Please login again.");
      }else{
        console.log(error)
      }
    }
  };
};

export default fetchProfileData;
