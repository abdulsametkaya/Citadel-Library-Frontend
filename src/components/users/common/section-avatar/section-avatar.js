import React from "react";
import "./section-avatar.scss";

const SectionAvatar = (props) => {
  const { id, name, image } = props;

  return (
    <div className="section-avatar">
      <div>
        <img
          src={require(`../../../../assets/img/section-header/${image}`)}
          alt="avatar"
        />
      </div>
      <div className="section-name">{name}</div>
    </div>
  );
};

export default SectionAvatar;
