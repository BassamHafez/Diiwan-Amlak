import { profileActions } from "./profileInfo-slice";
import axiosInstance from "../Components/Logic/LogicFun";

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
      console.error(error);
    }
  };
};

export default fetchProfileData;
