/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import NavbarComponent from "../Fragments/Header/Navbar";
import Footer from "../Fragments/Footer/Footer";

const DashboardLayouts = (props) => {
  const { children } = props;
  return (
    <div>
      <NavbarComponent />
      {children}
      <Footer />
    </div>
  );
};
export default DashboardLayouts;
