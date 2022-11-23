import React from "react";
import "./user-section.scss";

const UserSection = (props) => {
  const { title } = props;

  return (
    <div className="admin-section-header">
      <div></div>
      <p>{title}</p>
      <div></div>
    </div>
  );
};

export default UserSection;
