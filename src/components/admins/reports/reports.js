import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Spacer from "../../common/spacer/spacer";
import ChartPie from "./chartPie";
import MostBorrowersChartBar from "./most-barrawor-chartBar";
import MostPopularChartBar from "./most-popular-chartBar";
import "./reports.scss";
import UnreturnTable from "./unreturn-table";

const Reports = () => {
  return (
    <div>
      <Container className="reports-container">
        <Row>
          <UnreturnTable />
        </Row>
        <Spacer height={"4vh"} />
        <Row className="reports-row">
          <Col sm={8} className="reports-col-pie">
            <span>MOST POPULAR BOOKS</span>
            <MostPopularChartBar />
          </Col>
        </Row>
        <Spacer height={"4vh"} />
        <Row className="reports-row">
          <Col sm={8} className="reports-col-bar">
            <span>MOST BORROWERS</span>
            <MostBorrowersChartBar />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Reports;
