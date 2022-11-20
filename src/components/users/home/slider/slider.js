import React from "react";
import { Carousel } from "react-bootstrap";
import { useSelector } from "react-redux";
import sliderData from "./slider.json";
import "./slider.scss";

const Slider = () => {
  const toggleName = useSelector((state) => state.toggle);

  return (
    <div
      className={
        toggleName.toggleNames === "navbar-toggler collapsed"
          ? "slider position-relative"
          : "slider"
      }
    >
      <Carousel>
        {sliderData.map((item, index) => (
          <Carousel.Item key={index} interval={2000}>
            <img
              src={require(`../../../../assets/img/slider/${item.image}`)}
              alt={item.title}
            />
            <Carousel.Caption>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Slider;
