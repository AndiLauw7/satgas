/* eslint-disable no-unused-vars */
import React from "react";
import "./css/index.css";
import DashboardLayouts from "../Layouts/DashboardLayouts";
import CarouselComponents from "../Fragments/Carousel";
import Profil from "./profil";
import Lapor from "./lapor";
import Materi from "./materi";
export default function Dashboard() {
  return (
    <div>
      <DashboardLayouts className="dashboardLayouts">
        <section className="corousel">
          <CarouselComponents />
        </section>
        <section>
          <Profil />
        </section>
        <section>
          <Lapor />
        </section>
        <section>
          <Materi />
        </section>
      </DashboardLayouts>
    </div>
  );
}
