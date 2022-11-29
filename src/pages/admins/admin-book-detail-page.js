import React from "react";
import BookDetail from "../../components/admins/books/detail/book-detail";
import AdminSection from "../../components/admins/common/admin-section/admin-section";
import Spacer from "../../components/common/spacer/spacer";

const AdminBookDetailPage = () => {
  return (
    <>
      <Spacer height={"5vh"} />
      <AdminSection title={"Books Details"} />
      <BookDetail />
    </>
  );
};

export default AdminBookDetailPage;
