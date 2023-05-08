import { createAction, createSlice } from "@reduxjs/toolkit";

export const login = createAction("auth/login");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    logged: false,
    accessToken: null,
  },
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      localStorage.removeItem("accessToken");
    },
    setLoginSuccess: (state, action) => {
      state.logged = true;
      state.accessToken = action.payload;
    },
  },
});

//các action
export const { setLoginSuccess } = authSlice.actions;

//selector
export const authSelector = (state) => state.auth;

export default authSlice.reducer;
