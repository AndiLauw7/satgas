/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

const Input = (props) => {
  const {
    type,
    placeholder,
    name,
    classname,
    onChange,
    value,
    autoComplete,
    readOnly,
  } = props;
  return (
    <input
      className={`text-lg border rounded py-2 px-3 text-slate-700 placeholder:opacity-100 w-full my-2  ${classname}`}
      type={type}
      min="0"
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      autoComplete={autoComplete}
      readOnly={readOnly}
    />
  );
};

export default Input;
