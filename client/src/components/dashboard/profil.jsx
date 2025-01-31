/* eslint-disable react/display-name */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import React from "react";
import Button from "../Elements/Button";
import CardComponents from "../Fragments/Card";
import logo from "../../../public/img/anggota.jpg";
import "./css/index.css";
import { useNavigate } from "react-router-dom";
export default function Profil() {
  const navigate = useNavigate();
  return (
    <div>
      <CardComponents>
        <div className=" container-fluid row px-5 py-4">
          <div className="col-md-6">
            <CardComponents.CardImage image={logo} />
          </div>
          <div className="col-md-6">
            <CardComponents.CardContent>
              <div className="text-dark">
                <h3>Satgas PPKS UNIPI</h3>
                {/* <hr  /> */}
                <div className="garis-hijau mb-5 mt-5 "></div>
                <p className="mb-5">
                  Fenomena terjadinya kasus kekerasan seksual di perguruan
                  tinggi telah menjadi perhatian bersama para sivitas akademika
                  di tingkat global dan di Indonesia. Secara global, universitas
                  merupakan tempat kedua terbanyak terjadinya kekerasan seksual.
                  Untuk menanggulangi hal ini, pada tahun 2021, Kementerian
                  Pendidikan, Kebudayaan, Riset, dan Teknologi RI mengeluarkan
                  Permendikbudristek Nomor 30 Tahun 2021 tentang Pencegahan dan
                  Penanganan Kekerasan Seksual di Lingkungan Perguruan Tinggi.
                </p>
              </div>
              <Button
                onClick={() => navigate("/detail-profil-satgas")}
                classname="bg-blue-600 flex items-center text-sm"
              >
                Baca Selengkapnya
              </Button>
            </CardComponents.CardContent>
          </div>
        </div>
      </CardComponents>
    </div>
  );
}
