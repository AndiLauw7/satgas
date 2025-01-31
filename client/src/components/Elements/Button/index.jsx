/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

const Button = (props) => {
  const { children, classname, type = "button", onClick = () => {} } = props;
  return (
    <button
      type={type}
      onClick={onClick}
      className={`h-10 px-6 font-semibold rounded ${classname} text-white`}
    >
      {children}
    </button>
  );
};

export default Button;
