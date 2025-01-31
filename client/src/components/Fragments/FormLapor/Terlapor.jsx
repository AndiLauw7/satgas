/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import InputForm from "../../../components/Elements/Input";
import SelectComponent from "../../../components/Elements/select";
import React from "react";

const FormTerlapor = ({ setTerlaporData, terlaporData }) => {
  const handleTerlaporChange = (e) => {
    const { name, value } = e.target;
    setTerlaporData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <div className="">
      <div className="mb-3">
        <label className="form-label">Nama Terlapor</label>
        <input
          type="text"
          name="nama_terlapor"
          className="form-control"
          value={terlaporData.nama_terlapor}
          onChange={handleTerlaporChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">No Hp Terlapor</label>
        <input
          type="text"
          name="no_hp_terlapor"
          className="form-control"
          value={terlaporData.no_hp_terlapor}
          onChange={handleTerlaporChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Status Terlapor</label>
        {/* <input
          type="text"
          name="status_terlapor"
          className="form-control"
          value={terlaporData.status_terlapor}
          onChange={handleTerlaporChange}
          required
        /> */}
        <select
          name="status_terlapor"
          className="form-control"
          onChange={handleTerlaporChange}
          required
        >
          <option value="">Pilih Status</option>
          <option value="MAHASISWA">Mahasiswa</option>
          <option value="DOSEN">Dosen</option>
          <option value="TENAGA PENDIDIK">Tenaga Pendidik</option>
          <option value="TENAGA PENDIDIK">Masyarakat Umum</option>
        </select>
      </div>
    </div>
  );
};

export default FormTerlapor;
