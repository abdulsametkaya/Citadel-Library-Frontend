import React from "react";
import NewBookCreate from "../../components/admins/books/create/new-book-create";
import AdminSection from "../../components/admins/common/admin-section/admin-section";
import Spacer from "../../components/common/spacer/spacer";

const AdminNewBook = () => {
  return (
    <>
      <Spacer height={"5vh"} />
      <AdminSection title={"Book Creation"} />
      <NewBookCreate />
    </>
  );
};

export default AdminNewBook;
