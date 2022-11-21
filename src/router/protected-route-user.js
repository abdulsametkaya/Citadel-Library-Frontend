import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRouteUser = ({ children, admin, staff, member }) => {
  const { isUserLogin, user } = useSelector((state) => state.auth);

  if (!isUserLogin) return <Navigate to="/" />;
  if (
    admin &&
    !user.roles.includes("Administrator") &&
    staff &&
    !user.roles.includes("Staff") &&
    member &&
    !user.roles.includes("Member")
  )
    return <Navigate to="/unauthorized" />;

  return children;
};

export default ProtectedRouteUser;
