/* eslint-disable no-unused-vars */
import React from "react";
import DashboardLayouts from "./DashboardLayouts";
import FormLapor from "../Fragments/FormLapor";

const LaporLayouts = () => {
  return (
    <DashboardLayouts>
      <section className="dashboardLayouts">
        <div className="container">
          <h1 className="justify-center text-center mb-4 mt-4">Lapor Satgas</h1>
          <FormLapor />
        </div>
      </section>
    </DashboardLayouts>
  );
};
export default LaporLayouts;
