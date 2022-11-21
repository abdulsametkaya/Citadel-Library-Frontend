import { createSlice } from "@reduxjs/toolkit";

export const toggleSlice = createSlice({
  name: "toggle",
  initialState: {
    toggleNames: "",
  },
  reducers: {
    toggleName: (state, action) => {
      state.toggleNames = action.payload;
    },
  },
});

export const { toggleName } = toggleSlice.actions;
export default toggleSlice.reducer;
