/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Children } from "react";
import { Card, CardBody, Image } from "react-bootstrap";
const CardComponents = (props) => {
  const { children, classname } = props;
  return <div>{children}</div>;
};

const CardImage = (props) => {
  const { image, classname } = props;
  return (
    <img
      src={image}
      alt=""
      className={`p-1 rounded-t-lg h-full w-full object-cover  ${classname}`}
    />
  );
};

const CardContent = (props) => {
  const { classname, children } = props;
  return (
    <div>
      <CardBody
        className={`h-full w-full text-justify text-white ${classname}`}
      >
        {children}
      </CardBody>
    </div>
  );
};

CardComponents.CardImage = CardImage;
CardComponents.CardContent = CardContent;
export default CardComponents;
