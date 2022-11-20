import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { settings } from "../../../../utils/settings";
import "./library-part.scss";

const LibraryPart = () => {
  return (
    <div className="library-part">
      <div className="library-part-img">
        <div className="golge"></div>
      </div>
      <div className="library-part-section">
        <div className="quote">" {settings.quotes}"</div>
        <span>- {settings.quotesWriter} -</span>
      </div>
    </div>
  );
};

export default LibraryPart;
