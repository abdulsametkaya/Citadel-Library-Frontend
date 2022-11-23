import React from "react";
import "./admin-section.scss";

const AdminSection = (props) => {
  const { title } = props;

  return (
    <div className="admin-section-header">
      <div></div>
      <p>{title}</p>
      <div></div>
    </div>
  );
};

export default AdminSection;
