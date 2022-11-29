import React from "react";
import AdminCategories from "../../components/admins/categories/admin-categories";
import AdminSection from "../../components/admins/common/admin-section/admin-section";
import Spacer from "../../components/common/spacer/spacer";

const AdminCategoriesPage = () => {
  return (
    <div>
      <Spacer height={"5vh"} />
      <AdminSection title={"All Categories"} />
      <AdminCategories />
    </div>
  );
};

export default AdminCategoriesPage;
