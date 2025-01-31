import React from "react";
import DetailProfil from "../../components/dashboard/detail/DetailProfil";
import DashboardLayouts from "./DashboardLayouts";

const DetaillLaporlayouts = () => {
  return (
    <DashboardLayouts>
      <section className="dashboardLayouts">
        <div className="container">
          <h1 className="justify-center text-start px-3 mb-4 mt-4">
            Profil Satgas
          </h1>
          <DetailProfil />
        </div>
      </section>
    </DashboardLayouts>
  );
};
export default DetaillLaporlayouts;
