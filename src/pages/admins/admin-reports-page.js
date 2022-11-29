import React from "react";
import AdminSection from "../../components/admins/common/admin-section/admin-section";
import Reports from "../../components/admins/reports/reports";
import Spacer from "../../components/common/spacer/spacer";

const AdminReportsPage = () => {
  return (
    <div>
      <Spacer height={"5vh"} />
      <AdminSection title={"Reports"} />
      <Reports />
    </div>
  );
};

export default AdminReportsPage;
