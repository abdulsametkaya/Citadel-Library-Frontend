import React from "react";
import { Card } from "react-bootstrap";
import "./dashboard-item.scss";

const DashboardItem = (props) => {
  const { icon, color, title, data } = props;
  return (
    <div className="dashboard-item">
      <Card
        className="dashboard-item-card"
        style={{ backgroundColor: `${color}` }}
      >
        <Card.Img
          variant="top"
          src={require(`../../../assets/img/dashboard-icon/${icon}.png`)}
          className="dashboard-item-card-img"
        ></Card.Img>
        <Card.Body className="dashboard-item-card-body">
          <Card.Title>{title}</Card.Title>
          <Card.Text>{data}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DashboardItem;
