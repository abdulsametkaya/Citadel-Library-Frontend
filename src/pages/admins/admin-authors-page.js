import React from "react";
import AdminAuthor from "../../components/admins/author/admin-author";
import AdminSection from "../../components/admins/common/admin-section/admin-section";
import Spacer from "../../components/common/spacer/spacer";

const AdminAuthorsPage = () => {
  return (
    <>
      <Spacer height={"5vh"} />
      <AdminSection title={"All Authors"} />
      <AdminAuthor />
    </>
  );
};

export default AdminAuthorsPage;
