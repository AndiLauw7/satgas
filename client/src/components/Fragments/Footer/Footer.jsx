/* eslint-disable no-unused-vars */
import React from "react";
import "./css/index.css";
import viteSvg from "../../../../public/vite.svg";
import tiktok from "../../../../public/img/tiktok.png";
import instagram from "../../../../public/img/instagram.png";
import youtube from "../../../../public/img/youtube.png";
import logoPPks from "../../../../public/img/logosatgasppksunipi.png";

export default function Footer() {
  return (
    <div className="">
      <footer className="footer container-fluid ">
        <div className="container row">
          <div className="col md-4 block mt-3">
            <img
              alt=""
              src={logoPPks}
              width="60"
              height="60"
              className="d-inline-block align-top mb-3"
            />
            <p> Satuan Tugas</p>
            <div className="title-img-footer">
              Pencegahan & Penanganan Kekerasan Seksual
            </div>
            <p>
              Universitas Insan Pembangunan Indonesia <br />
              Bitung, Tangerang, Banten
              <br />
              Email satgas
            </p>
          </div>
          <div className="col md-4 block mt-3">
            <h3 className="mb-3">Follow Kami</h3>
            <span className="flex items-center space-x-2 mb-2">
              <img src={tiktok} alt="" className="w-6" />
              <p className="text-white-900 "> Tiktok</p>
            </span>
            <span className="flex items-center space-x-2 mb-2">
              <img src={instagram} alt="" className="w-6" />
              <p className="text-white-900 "> Instagram</p>
            </span>
            <span className="flex items-center space-x-2 mb-2">
              <img src={youtube} alt="" className="w-6" />
              <p className="text-white-900 "> Youtube</p>
            </span>
          </div>
          <div className="col md-4 block mt-3 ">
            <img
              alt=""
              src={logoPPks}
              width="60"
              height="60"
              className="d-inline-block align-top ml-3 mr-3 mb-3"
            />
            <p> Satuan Tugas</p>
            <div className="title-img-footer">
              Pencegahan & Penanganan Kekerasan Seksual
            </div>
            <p className="mb-5">
              Universitas Insan Pembangunan Indonesia <br />
              Bitung, Tangerang, Banten
              <br />
              Email satgas
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
