import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { getReportAll } from "../../../api/report-service";
import Loading from "../../common/loading/loading";
import MostBorrowersChartBar from "../reports/most-barrawor-chartBar";
import MostPopularChartBar from "../reports/most-popular-chartBar";
import DashboardItem from "./dashboard-item";
import "./dashboard.scss";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(0);

  const loadData = async () => {
    setLoading(true);
    try {
      const resp = await getReportAll();
      setData(resp.data);
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
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Container className="dash-container">
            <Row className="dash-row">
              <Col sm={6} md={4} lg={3} className="dash-col">
                <DashboardItem
                  icon="member"
                  color="rgba(255, 99, 132, 0.2)"
                  title="Members"
                  data={data.membersNumber ? data.membersNumber : 0}
                />
              </Col>
              <Col sm={6} md={4} lg={3} className="dash-col">
                <DashboardItem
                  icon="author"
                  color="rgba(54, 162, 235, 0.2)"
                  title="Authors"
                  data={data.authorNumber ? data.authorNumber : 0}
                />
              </Col>
              <Col sm={6} md={4} lg={3} className="dash-col">
                <DashboardItem
                  icon="book"
                  color="rgba(255, 206, 86, 0.2)"
                  title="Books"
                  data={data.booksNumber ? data.booksNumber : 0}
                />
              </Col>
              <Col sm={6} md={4} lg={3} className="dash-col">
                <DashboardItem
                  icon="publisher"
                  color="rgba(75, 192, 192, 0.2)"
                  title="Publishers"
                  data={data.publisherNumber ? data.publisherNumber : 0}
                />
              </Col>
              <Col sm={6} md={4} lg={3} className="dash-col">
                <DashboardItem
                  icon="category"
                  color="rgba(153, 102, 255, 0.2)"
                  title="Categories"
                  data={data.categoryNumber ? data.categoryNumber : 0}
                />
              </Col>
              <Col sm={6} md={4} lg={3} className="dash-col">
                <DashboardItem
                  icon="loan"
                  color="rgba(255, 159, 64, 0.2)"
                  title="Loans"
                  data={data.loansNumber ? data.loansNumber : 0}
                />
              </Col>
              <Col sm={6} md={4} lg={3} className="dash-col">
                <DashboardItem
                  icon="unreturn"
                  color="rgba(255, 99, 132, 0.2)"
                  title="Unreturn"
                  data={data.bookNotReturnNumber ? data.bookNotReturnNumber : 0}
                />
              </Col>
              <Col sm={6} md={4} lg={3} className="dash-col">
                <DashboardItem
                  icon="expire"
                  color="rgba(54, 162, 235, 0.2)"
                  title="Expired"
                  data={data.expiredBookNumber ? data.expiredBookNumber : 0}
                />
              </Col>
            </Row>
          </Container>
        </>
      )}
    </div>
  );
};

export default Dashboard;
