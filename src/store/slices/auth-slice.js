import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    isUserLogin: false,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    loginFailed: (state) => {
      state.user = {};
      state.isLoggedIn = false;
    },
    logout: (state) => {
      state.user = {};
      state.isLoggedIn = false;
    },
    userUpdate: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { loginSuccess, loginFailed, logout, userUpdate } =
  authSlice.actions;
export default authSlice.reducer;
