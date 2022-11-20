import React, { useEffect, useState } from "react";
import "./counter-part.scss";
import { Col, Container, Row, Toast } from "react-bootstrap";
import Counter from "../../common/counter/counter";
import { getReportAll } from "../../../../api/report-service";

const CounterPart = () => {
  const [count, setCount] = useState({});
  const loadData = async () => {
    try {
      const resp = await getReportAll();
      setCount(resp.data);
    } catch (err) {
      console.log(err.message);
    } finally {
    }
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="counter-part">
      <Container>
        <Row>
          <Col className="counter-col" sm={12} md={6} lg={3}>
            <Counter start={0} end={count.membersNumber} text="Member" />
          </Col>
          <Col className="counter-col" sm={12} md={6} lg={3}>
            <Counter start={0} end={count.booksNumber} text="Book" />
          </Col>
          <Col className="counter-col" sm={12} md={6} lg={3}>
            <Counter start={0} end={count.authorNumber} text="Author" />
          </Col>
          <Col className="counter-col" sm={12} md={6} lg={3}>
            <Counter start={0} end={count.publisherNumber} text="Publisher" />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CounterPart;
