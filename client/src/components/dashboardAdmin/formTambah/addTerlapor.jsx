/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTerlapor, clearMessages } from "../../../features/terlaporSlice";
import { useNavigate } from "react-router-dom";

const AddTerlapor = ({ setTerlaporData, terlaporData }) => {
  const handleTerlaporChange = (e) => {
    const { name, value } = e.target;
    setTerlaporData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // Handle submit form

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
        <label className="form-label">Status Pelapor</label>
        <input
          type="text"
          name="status_terlapor"
          className="form-control"
          value={terlaporData.status_terlapor}
          onChange={handleTerlaporChange}
          required
        />
      </div>
    </div>
  );
};

export default AddTerlapor;
