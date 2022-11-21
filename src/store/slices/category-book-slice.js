import { createSlice } from "@reduxjs/toolkit";

export const categoryBookSlice = createSlice({
  name: "categoryBook",

  initialState: {
    id: null,
    name: "",
    isCategory: false,
  },

  reducers: {
    categoryBook: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.isCategory = true;
    },
    emptyCategoryBook: (state) => {
      state.id = null;
      state.name = "";
      state.isCategory = false;
    },
  },
});

export const { categoryBook, emptyCategoryBook } = categoryBookSlice.actions;
export default categoryBookSlice.reducer;
