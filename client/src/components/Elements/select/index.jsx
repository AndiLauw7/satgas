/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import Label from "../Input/Label";
import SelectForm from "./select";
const SelectComponent = (props) => {
  const { name, label, children } = props;
  return (
    <div className="mb-3">
      <Label htmlFor={name}>{label}</Label>
      <SelectForm>{children}</SelectForm>
    </div>
  );
};
export default SelectComponent;
