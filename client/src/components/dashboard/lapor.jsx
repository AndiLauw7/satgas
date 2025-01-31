/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from "react";
import Button from "../Elements/Button";
import CardComponents from "../Fragments/Card";
import logo from "../../../public/img/ppks.jpg";
import "./css/index.css";
import { useNavigate } from "react-router-dom";

export default function Lapor() {
  const navigate = useNavigate();
  return (
    <div className="lapor">
      <CardComponents>
        <div className=" container-fluid row px-5 py-4">
          <div className="col-md-6">
            <CardComponents.CardContent>
              <h3>Lapor Satgas PPKS UNIPI</h3>
              {/* <hr className=" garis-kuning mb-5 mt-5" /> */}
              <div className=" garis-kuning mb-5 mt-5"></div>
              <p className="mb-5 ">
                Universitas Gadjah Mada berkomitmen untuk melakukan pencegahan
                dan penanganan segala bentuk kekerasan seksual yang terjadi di
                lingkungan kampus UGM. Laporkan segala bentuk tindak kekerasan
                seksual ke Tim Satgas PPKS UGM melalui link dibawah ini.
              </p>
              <Button
                onClick={() => navigate("/form-data-lapor")}
                classname="bg-blue-600 flex items-center text-sm"
              >
                Lapor Satgas
              </Button>
            </CardComponents.CardContent>
          </div>
          <div className="col-md-6">
            <CardComponents.CardImage image={logo} />
          </div>
        </div>
      </CardComponents>
    </div>
  );
}
