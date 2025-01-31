/* eslint-disable no-unused-vars */
import React from "react";
import FormLogin from "../components/Fragments/FormLogin";
import AuthLayuts from "../components/Layouts/AuthLayouts";

const LoginPage = () => {
  return (
    <>
      <AuthLayuts title="Login Satgas PPKS">
        <FormLogin />
      </AuthLayuts>
    </>
  );
};
export default LoginPage;
