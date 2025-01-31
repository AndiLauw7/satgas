import React from "react";
import DashboardLayouts from "./DashboardLayouts";
import DetailBerita from "../../components/dashboard/detail/DetailBerita";

const DetailBeritaLayouts = () => {
  return (
    <DashboardLayouts>
      <section className="dashboardLayouts">
        <div className="container">
          <h1 className="justify-center text-start px-3 mb-4 mt-4">
            Profil Satgas
          </h1>
          <DetailBerita />
        </div>
      </section>
    </DashboardLayouts>
  );
};
export default DetailBeritaLayouts;
