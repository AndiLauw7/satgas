/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { useState } from "react";
import { Carousel } from "react-bootstrap";
import ppks from "../../../../public/img/ppks.jpg";
import "./css/index.css";

const CarouselComponents = (props) => {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectIndex) => {
    setIndex(selectIndex);
  };
  const { children, img } = props;
  return (
    <Carousel
      className="container-fluid px-5 py-4"
      activeIndex={index}
      onSelect={handleSelect}
    >
      <Carousel.Item>
        <img className="d-block w-100" src={ppks} alt="First Slide" />
        <Carousel.Caption>
          <h3>Satgas PPKS</h3>
          <h1>Universitas Insan Pembangunan Indonesia</h1>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselComponents;
