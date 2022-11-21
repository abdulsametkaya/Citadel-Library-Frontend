import { createSlice } from "@reduxjs/toolkit";

export const searchBookSlice = createSlice({
  name: "book",

  initialState: {
    id: null,
    name: "",
    isBook: false,
  },

  reducers: {
    searchBook: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.isBook = true;
    },
    emptySearchBook: (state) => {
      state.id = null;
      state.name = "";
      state.isBook = false;
    },
  },
});

export const { searchBook, emptySearchBook } = searchBookSlice.actions;
export default searchBookSlice.reducer;
