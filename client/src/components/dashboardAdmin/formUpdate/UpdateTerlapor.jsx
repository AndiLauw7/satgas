/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const UpdateTerlapor = ({ data, onChange }) => {
  return (
    <div className="container">
      <h3>Tambah Terlapor</h3>
      <div className="mb-3">
        <label className="form-label">Nama Terlapor</label>
        <input
          type="text"
          name="nama_terlapor"
          className="form-control"
          value={data.nama_terlapor}
          onChange={onChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">No Hp Terlapor</label>
        <input
          type="text"
          name="no_hp_terlapor"
          className="form-control"
          value={data.no_hp_terlapor}
          onChange={onChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Status Pelapor</label>
        <input
          type="text"
          name="status_terlapor"
          className="form-control"
          value={data.status_terlapor}
          onChange={onChange}
          required
        />
      </div>
    </div>
  );
};
export default UpdateTerlapor;
