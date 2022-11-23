import React from "react";
import UserDashboard from "../../components/users/profile/user-dashboard/dashboard";
import UserSection from "../../components/users/profile/user-section/user-section";

const UserDashboardPage = () => {
  return (
    <>
      <UserSection title={"User Dashboard"} />
      <UserDashboard />
    </>
  );
};

export default UserDashboardPage;
