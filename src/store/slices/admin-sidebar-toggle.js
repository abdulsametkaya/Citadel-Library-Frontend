import { createSlice } from "@reduxjs/toolkit";

export const adminSidebarToggleSlice = createSlice({
  name: "adminsidebar",
  initialState: {
    toggleStatus: false,
  },
  reducers: {
    setToggleStatus: (state) => {
      if (state.toggleStatus) {
        state.toggleStatus = false;
      } else {
        state.toggleStatus = true;
      }
    },
  },
});

export const { setToggleStatus } = adminSidebarToggleSlice.actions;
export default adminSidebarToggleSlice.reducer;
