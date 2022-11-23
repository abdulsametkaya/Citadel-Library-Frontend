import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { getLoanAmountOfCategory } from "../../../../api/loan-service";
import Loading from "../../../common/loading/loading";
import "./dashboard.scss";
import UserActiveLoansList from "./user-active-loans-list";
import UserDashboardChartBar from "./user-dashboard-chartbar";

const UserDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  
      const loadData = async () => {
        setLoading(true);
        try {
          const resp = await getLoanAmountOfCategory();
          setData(resp.data.content);
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      };

        useEffect(() => {
          loadData();
        }, []);

  return (
    <>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Container className="dash-container">
              <Row className="mb-5 p-5 gap-3">
                <Col sm={9} xs={12} className="reports-col-bar">
                  <UserDashboardChartBar />
                </Col>
              </Row>
              <Row>
                <Col sm={7}>
                  <UserActiveLoansList />
                </Col>
              </Row>
            </Container>
          </>
        )}
    </>
  );
};

export default UserDashboard;
