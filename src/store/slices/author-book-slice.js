import { createSlice } from "@reduxjs/toolkit";

export const authorBookSlice = createSlice({
  name: "authorBook",

  initialState: {
    id: null,
    name: "",
    isAuthor: false,
  },

  reducers: {
    authorBook: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.isAuthor = true;
    },
    emptyAuthorBook: (state) => {
      state.id = null;
      state.name = "";
      state.isAuthor = false;
    },
  },
});

export const { authorBook, emptyAuthorBook } = authorBookSlice.actions;
export default authorBookSlice.reducer;
