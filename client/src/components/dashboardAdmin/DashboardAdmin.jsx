/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Sidebar from "./sidebar";
import { Route, Routes, useNavigate } from "react-router-dom";
import DataLaporPage from "../../pages/dataLapor";
import AddPelapor from "./formTambah/addPelapor";
import DataProfill from "../../pages/dataProfil";
import AddProfil from "./formTambah/addProfil";
import DataBerita from "../../pages/dataBerita";
import AddBerita from "./formTambah/addBerita";
import UpdatePelaporForm from "./formUpdate/UpdatePelapor";
import UpdateBerita from "./formUpdate/update-berita/UpadateBerita";
import UpdateProfil from "./formUpdate/update-profil/UpdateProfil";
import AddTindakLanjut from "./formTambah/addTindakLanjut";
import DataTindakLanjut from "../../pages/dataTindakLanjut";

export default function dashboardAdmin() {
  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Content */}
      <div style={{ flexGrow: 1, padding: "20px" }}>
        <Routes>
          <Route path="/" element={<h1>Dashboard Admin</h1>} />
          <Route path="data-master-pelapor" element={<DataLaporPage />} />
          <Route
            path="data-master-pelapor/tambah-data-lapor"
            element={<AddPelapor />}
          />
          <Route
            path="data-master-pelapor/update-data-lapor/:id"
            element={<UpdatePelaporForm />}
          />
          <Route path="data-master-profil" element={<DataProfill />} />
          <Route
            path="data-master-profil/tambah-data-profil"
            element={<AddProfil />}
          />
          <Route
            path="data-master-profil/update-data-profil/:id"
            element={<UpdateProfil />}
          />
          <Route path="data-master-berita" element={<DataBerita />} />
          <Route
            path="data-master-berita/tambah-data-berita"
            element={<AddBerita />}
          />

          <Route
            path="data-master-berita/update-data-berita/:id"
            element={<UpdateBerita />}
          />

          <Route
            path="data-master-tindak-lanjut"
            element={<DataTindakLanjut />}
          />

          <Route
            path="data-master-tindak-lanjut/tambah-data-tindak-lanjut"
            element={<AddTindakLanjut />}
          />
        </Routes>
      </div>
    </div>
  );
}
