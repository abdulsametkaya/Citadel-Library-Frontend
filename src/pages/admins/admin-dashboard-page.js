import React from "react";
import AdminSection from "../../components/admins/common/admin-section/admin-section";
import Dashboard from "../../components/admins/dashboard/dashboard";
import Spacer from "../../components/common/spacer/spacer";

const AdminDashboardPage = () => {
  return (
    <div>
      <Spacer height={"5vh"} />
      <AdminSection title={"Dashboard"} />
      <Spacer height={"5vh"} />
      <Dashboard />
    </div>
  );
};

export default AdminDashboardPage;
