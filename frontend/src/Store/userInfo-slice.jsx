import { createSlice } from "@reduxjs/toolkit";

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: {
    data: null,
    role: "",
    token: "",
    isAuthInitialized: false, 
  },
  reducers: {
    setUserInfo(state, action) {
      state.data = action.payload;
    },
    setRole(state, action) {
      state.role = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    
    setAuthInitialized(state) {
      state.isAuthInitialized = true;
    },

    clearAuth(state) {
      state.token = "";
      state.role = "";
      state.data = null;
      state.isAuthInitialized = true;
    },
  },
});

export default userInfoSlice;
export const userActions = userInfoSlice.actions;
