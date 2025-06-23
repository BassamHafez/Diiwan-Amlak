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

export const initializeAuth = () => (dispatch) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const role = JSON.parse(localStorage.getItem("role"));
  dispatch(userActions.setToken(token));
  dispatch(userActions.setRole(role));
  dispatch(userActions.setAuthInitialized());
};
