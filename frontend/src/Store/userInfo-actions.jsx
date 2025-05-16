import { userActions } from "./userInfo-slice";

export const saveRoleState = (role) => {
  return () => {
    localStorage.setItem("role", JSON.stringify(role));
  };
};

export const saveTokenState = (token) => {
  return () => {
    localStorage.setItem("token", JSON.stringify(token));
  };
};

export const getToken = () => {
  return (dispatch) => {
    const token = JSON.parse(localStorage.getItem("token"));
    dispatch(userActions.setToken(token));
  };
};

export const getRoleState = () => {
  return (dispatch) => {
    const role = JSON.parse(localStorage.getItem("role"));
    dispatch(userActions.setRole(role));
  };
};
