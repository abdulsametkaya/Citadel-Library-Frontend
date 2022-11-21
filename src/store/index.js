import { configureStore } from "@reduxjs/toolkit";
import adminSidebarToggleSlice from "./slices/admin-sidebar-toggle";
import authSlice from "./slices/auth-slice";
import authorBookSlice from "./slices/author-book-slice";
import bookSlice from "./slices/book-slice";
import categoryBookSlice from "./slices/category-book-slice";
import publisherBookSlice from "./slices/publisher-book-slice";
import toggleSlice from "./slices/toggle-name-slice";

export default configureStore({
  reducer: {
    auth: authSlice,
    toggle: toggleSlice,
    adminsidebar: adminSidebarToggleSlice,
    authorBook: authorBookSlice,
    publisherBook: publisherBookSlice,
    categoryBook: categoryBookSlice,
    book: bookSlice,
  },
});
