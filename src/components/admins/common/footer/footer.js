import React from "react";
import { Container, Row } from "react-bootstrap";
import "./footer.scss";

const Footer = () => {
  return (
    <div>
      <Container>
        <Row>
          <p className="admin-footer">
            All rights reserved © 2022 | This site has been prepared by the <b>Cosmos </b>Developer Team.
            
          </p>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
