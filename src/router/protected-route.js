import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, admin, staff }) => {
  const { isUserLogin, user } = useSelector((state) => state.auth);

  if (!isUserLogin) return <Navigate to="/" />;
  if (
    admin &&
    !user.roles.includes("Administrator") &&
    staff &&
    !user.roles.includes("Staff")
  )
    return <Navigate to="/unauthorized" />;

  return children;
};

export default ProtectedRoute;
