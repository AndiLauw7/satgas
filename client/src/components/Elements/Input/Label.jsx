/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const Label = (props) => {
  const { htmlFor, children } = props;
  return (
    <label
      htmlFor={htmlFor}
      className="block text-slate-700 text-lg font-bold mb-2"
    >
      {children}
    </label>
  );
};
export default Label;
