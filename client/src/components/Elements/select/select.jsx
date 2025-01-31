/* eslint-disable no-unused-vars */
import React from "react";
import Label from "../Input/Label";

const selectForm = (props) => {
  const { children, classname } = props;
  return (
    <select
      className={`text-lg border rounded py-2 px-3 text-slate-700 placeholder:opacity-50 w-full  ${classname} `}
      aria-label="Default select example"
    >
      {children}
    </select>
  );
};

export default selectForm;
