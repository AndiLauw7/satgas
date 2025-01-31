/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import Label from "./Label";
import Input from "./Input";

const InputForm = (props) => {
  const { label, name, type, placeholder } = props;
  return (
    <div className="mb-3">
      <Label htmlFor={name}>{label}</Label>
      <Input name={name} type={type} placeholder={placeholder}></Input>
    </div>
  );
};
export default InputForm;
