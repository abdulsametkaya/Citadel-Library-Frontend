import React from "react";
import "./section-header.scss";

const SectionHeader = (props) => {
  const { title, image } = props;
  return (
    <div className="section-header">
      <img
        src={require(`../../../../assets/img/section-header/${image}`)}
        alt="title"
      />
      <div className="section-content">
        <h1>{title}</h1>
      </div>
    </div>
  );
};

export default SectionHeader;
