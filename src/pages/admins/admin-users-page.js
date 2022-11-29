import React from "react";
import AdminSection from "../../components/admins/common/admin-section/admin-section";
import AdminUsers from "../../components/admins/users/admin-users";
import Spacer from "../../components/common/spacer/spacer";

const AdminUsersPage = () => {
  return (
    <>
      <Spacer height={"5vh"} />
      <AdminSection title={"Users"} />
      <AdminUsers />
    </>
  );
};

export default AdminUsersPage;
