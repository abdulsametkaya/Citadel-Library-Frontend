import React from "react";
import { Col, Container, Row } from "react-bootstrap";

import Spacer from "../components/common/spacer/spacer";
import Footer from "../components/users/common/footer/footer";
import { useSelector } from "react-redux";
import UserProfileTopbar from "../components/users/profile/user-profile-topbar/user-profile-topbar";
import UserSideMenu from "../components/users/profile/user-profile-sidebar/userprofilesidebar";
import "./user-profile-template.scss";


const UserProfileTemplate = (props) => {
  const { toggleStatus } = useSelector((state) => state.adminsidebar);
  const { children } = props;
  return (
    <>
     <UserProfileTopbar/>
      <Container fluid>
        <Row>
          <Col 
          lg={2}
            style={{ padding: 0 }}
            className="user-template-side"
          >
            <UserSideMenu/>
          </Col>
          <Col lg={10}>
            <Container
              className="pt-5 "
              style={{ marginLeft: "auto", marginRight: "auto" }}
            >
              {children}
            </Container>
          </Col>
        </Row>
      </Container>
      <Spacer />
      <Footer />
    </>
  );
};

export default UserProfileTemplate;
