import React from "react";
import BookList from "../../components/admins/books/list/book-list";
import AdminSection from "../../components/admins/common/admin-section/admin-section";
import Spacer from "../../components/common/spacer/spacer";

const AdminBooksPage = () => {
  return (
    <>
      <Spacer height={"5vh"} />
      <AdminSection title={"All Books"} />
      <BookList />
    </>
  );
};

export default AdminBooksPage;
