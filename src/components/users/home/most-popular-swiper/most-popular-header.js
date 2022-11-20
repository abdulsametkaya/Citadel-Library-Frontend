import React from "react";
import "./most-popular-header.scss";

const MostPopularHeader = (props) => {
  const { title,subTitle, alignment } = props;
  
  return (
    <div
      className="most-popular-header"
      style={{ textAlign: alignment || "center" }}
    >
      <h4>{title}</h4>
      <h5>{subTitle}</h5>
    </div>
  );
};

export default MostPopularHeader;
