import { createSlice } from "@reduxjs/toolkit";

export const publisherBookSlice = createSlice({
  name: "publisherBook",

  initialState: {
    id: null,
    name: "",
    isPublisher: false,
  },

  reducers: {
    publisherBook: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.isPublisher = true;
    },
    emptyPublisherBook: (state) => {
      state.id = null;
      state.name = "";
      state.isPublisher = false;
    },
  },
});

export const { publisherBook, emptyPublisherBook } = publisherBookSlice.actions;
export default publisherBookSlice.reducer;
