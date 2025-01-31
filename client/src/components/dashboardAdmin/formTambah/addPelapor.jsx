/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPelapor, clearMessages } from "../../../features/pelapor";
import { useNavigate } from "react-router-dom";
import AddTerlapor from "./addTerlapor";

const AddPelapor = () => {
  const [formData, setFormData] = useState(new FormData());
  const [terlaporData, setTerlaporData] = useState({
    nama_terlapor: "",
    no_hp_terlapor: "",
    status_terlapor: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, successMessage } = useSelector(
    (state) => state.pelapor
  );

  const handleChange = (e) => {
    formData.set(e.target.name, e.target.value);
  };
  const handleFileChange = (e) => {
    formData.append(e.target.name, e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObject = Object.fromEntries(formData.entries());

    console.log("Pelapor Data:", formDataObject);
    console.log("Terlapor Data:", terlaporData);
    const combinedData = {
      ...formDataObject, // Menggabungkan data pelapor
      ...terlaporData, // Menambahkan data terlapor
    };
    console.log(combinedData, "ini combine");

    dispatch(addPelapor(combinedData));
  };

  // Redirect setelah sukses
  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        navigate("/dashboard-admin");
      }, 2000);
    }
  }, [successMessage, navigate]);

  useEffect(() => {
    console.log("Terlapor Data Updated:", terlaporData);
  }, [terlaporData]);

  return (
    <div
      className="container mt-5"
      style={{
        maxHeight: "80vh",
        overflowY: "auto",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <div className="d-flex justify-evenly">
        <h2>Tambah Pelapor</h2>
        <h2></h2>
        <h2>Terlapor</h2>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Nama Pelapor</label>
              <input
                type="text"
                name="nama_pelapor"
                className="form-control"
                // value={formData.nama_pelapor}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Jenis Identitas</label>
              <input
                type="text"
                name="jenis_identitas"
                className="form-control"
                // value={formData.content_profil}
                onChange={handleChange}
                required
              ></input>
            </div>
            <div className="mb-3">
              <label className="form-label"> No Identitas</label>
              <input
                type="tetx"
                name="no_identitas"
                className="form-control"
                // value={formData.content_profil}
                onChange={handleChange}
                required
              ></input>
            </div>
            <div className="mb-3">
              <label className="form-label">File Identitas</label>
              <input
                type="file"
                name="file_identitas"
                className="form-control"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Alamat Pelapor</label>
              <textarea
                name="alamat_pelapor"
                className="form-control"
                // value={formData.content_profil}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">No Hp Pelapor</label>
              <input
                type="number"
                name="no_hp_pelapor"
                className="form-control"
                // value={formData.content_profil}
                onChange={handleChange}
                required
              ></input>
            </div>
            <div className="mb-3">
              <label className="form-label">email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                // value={formData.content_profil}
                onChange={handleChange}
                required
              ></input>
            </div>
            <div className="mb-3">
              <label className="form-label">Unit Kerja</label>
              <input
                type="text"
                name="unit_kerja"
                className="form-control"
                // value={formData.content_profil}
                onChange={handleChange}
                required
              ></input>
            </div>
            <div className="mb-3">
              <label className="form-label">Kategori Pelapor</label>
              <input
                type="text"
                name="kategori_pelapor"
                className="form-control"
                // value={formData.content_profil}
                onChange={handleChange}
                required
              ></input>
            </div>
            <div className="mb-3">
              <label className="form-label">Status Pelapor</label>
              <input
                type="text"
                name="status_pelapor"
                className="form-control"
                // value={formData.content_profil}
                onChange={handleChange}
                required
              ></input>
            </div>
            <div className="mb-3">
              <label className="form-label">Tgl Peristiwa</label>
              <input
                type="date"
                name="tgl_peristiwa"
                className="form-control"
                // value={formData.content_profil}
                onChange={handleChange}
                required
              ></input>
            </div>
            <div className="mb-3">
              <label className="form-label">Lokasi Peristiwa</label>
              <input
                type="text"
                name="lokasi_peristiwa"
                className="form-control"
                // value={formData.content_profil}
                onChange={handleChange}
                required
              ></input>
            </div>
            <div className="mb-3">
              <label className="form-label">Kronologi Peristiwa</label>
              <input
                type="text"
                name="kronologi_peristiwa"
                className="form-control"
                // value={formData.content_profil}
                onChange={handleChange}
                required
              ></input>
            </div>
            <div className="mb-3">
              <label className="form-label">Bukti Peristiwa</label>
              <input
                type="file"
                name="bukti_peristiwa"
                className="form-control"
                // value={formData.content_profil}
                onChange={handleFileChange}
                required
              ></input>
            </div>
          </div>
          <div className="col-md-6">
            <AddTerlapor
              setTerlaporData={setTerlaporData}
              terlaporData={terlaporData}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Menambahkan..." : "Tambah Pelapor"}
        </button>
      </form>
    </div>
  );
};

export default AddPelapor;
