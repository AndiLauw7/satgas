/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Button from "../../../components/Elements/Button";
import InputForm from "../../Elements/Input/index";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../features/authSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import Input from "../../Elements/Input/Input";
import Label from "../../Elements/Input/Label";
const FormLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [displayValidationError, setDisplayValidationError] = useState(false);
  const [validationError, setValidationError] = useState("");
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      setValidationError("Kolom email dan kata sandi tidak Boleh Kosong.");
      return;
    }
    try {
      const resultAction = await dispatch(loginUser(formData));

      const result = unwrapResult(resultAction);

      const token = result.data.user.token;

      if (token) {
        sessionStorage.setItem("token", token);
        localStorage.setItem("userSession", JSON.stringify(result.data.user));
      } else {
        return;
      }
      navigate("/dashboard-admin");
    } catch (err) {
      setValidationError("Login failed. Please try again.");
    }
  };

  useEffect(() => {
    if (validationError || error) {
      const timer = setTimeout(() => {
        setValidationError("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [validationError, displayValidationError, error]);
  useEffect(() => {}, [formData]);
  return (
    <form onSubmit={handleSubmit}>
      <Label>
        Username
        <Input
          classname=""
          label="username"
          type="text"
          placeholder="enter your username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </Label>
      <Label>
        Password
        <Input
          classname=""
          label="password"
          type="password"
          placeholder="enter your password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </Label>

      <Button classname="bg-blue-600 mt-3" type="submit" disabled={loading}>
        {loading ? "loading..." : "Login"}
      </Button>
      {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
    </form>
  );
};

export default FormLogin;
