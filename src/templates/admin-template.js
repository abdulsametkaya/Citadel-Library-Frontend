import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import Footer from "../components/admins/common/footer/footer";
import AdminSideMenu from "../components/admins/common/sidebar/side-bar";
import Topbar from "../components/admins/common/topbar/topbar";
import Spacer from "../components/common/spacer/spacer";
import "./admin-template.scss";

const AdminTemplate = (props) => {
  const { toggleStatus } = useSelector((state) => state.adminsidebar);

  const { children } = props;
  return (
    <>
      <Topbar />
      <Container fluid>
        <Row>
          <Col
            lg={`${toggleStatus ? 1 : 2}`}
            style={{ padding: 0 }}
            className="admin-template-side"
          >
            <AdminSideMenu />
          </Col>
          <Col lg={`${toggleStatus ? 11 : 10}`}>
            <Container
              className="pt-3 "
              style={{ marginLeft: "auto", marginRight: "auto" }}
            >
              {children}
            </Container>
          </Col>
        </Row>
      </Container>
      <Spacer />
      <Footer />
      <Spacer />
    </>
  );
};

export default AdminTemplate;
