import React from "react";
import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import AdminSection from "../../components/admins/common/admin-section/admin-section";
import AdminPublisher from "../../components/admins/publishers/admin-publisher";
import AdminPublisherAdd from "../../components/admins/publishers/admin-publisher-add";
import Spacer from "../../components/common/spacer/spacer";

const AdminPublishersPage = () => {
  return (
    <div>
      <Spacer height={"5vh"} />
      <AdminSection title={"All Publishers"} />
      <AdminPublisherAdd />
      <AdminPublisher />
    </div>
  );
};

export default AdminPublishersPage;
