/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPelaporbyId, updatePelapor } from "../../../features/pelapor";

const UpdatePelapor = () => {
  const dispatch = useDispatch();
  const { pelapor, loading, successMessage, error } = useSelector(
    (state) => state.pelapor
  );

  const [formData, setFormData] = useState({
    nama_pelapor: "",
    jenis_identitas: "",
    no_identitas: "",
    file_identitas: null,
    alamat_pelapor: "",
    no_hp_pelapor: "",
    email: "",
    unit_kerja: "",
    kategori_pelapor: "",
    status_pelapor: "",
    tgl_peristiwa: "",
    lokasi_peristiwa: "",
    kronologi_peristiwa: "",
    bukti_peristiwa: null,
    nama_terlapor: "",
    no_hp_terlapor: "",
    status_terlapor: "",
  });

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(fetchPelaporbyId(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (pelapor) {
      setFormData({
        ...pelapor,
        nama_pelapor: pelapor.nama_pelapor,
        jenis_identitas: pelapor.jenis_identitas || "",
        no_identitas: pelapor.no_identitas || "",
        file_identitas: pelapor.file_identitas || null,
        alamat_pelapor: pelapor.alamat_pelapor || "",
        no_hp_pelapor: pelapor.no_hp_pelapor || "",
        email: pelapor.email || "",
        unit_kerja: pelapor.unit_kerja || "",
        kategori_pelapor: pelapor.kategori_pelapor || "",
        status_pelapor: pelapor.status_pelapor || "",
        tgl_peristiwa: pelapor.tgl_peristiwa || "",
        lokasi_peristiwa: pelapor.lokasi_peristiwa || "",
        kronologi_peristiwa: pelapor.kronologi_peristiwa || "",
        bukti_peristiwa: pelapor.bukti_peristiwa || null,
        nama_terlapor: pelapor.nama_terlapor || "",
        no_hp_terlapor: pelapor.no_hp_terlapor || "",
        status_terlapor: pelapor.status_terlapor || "",
      });
    }
  }, [pelapor, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const maxFileSize = 5 * 1024 * 1024;
    if (files[0].size > maxFileSize) {
      alert("Ukuran file melebihi 5 MB");
      return;
    }
    setFormData((prevState) => ({ ...prevState, [name]: files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== "") {
        formDataToSubmit.append(key, formData[key]);
      }
      //   formDataToSubmit.append(key, formData[key]);
    });

    try {
      const response = await dispatch(
        updatePelapor({ id, formData: formDataToSubmit })
      ).unwrap(); // Unwrap lifecycle untuk handling hasil thunk
      console.log("Update berhasil:", response);
    } catch (err) {
      console.error("Update gagal:", err);
    }
  };

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
      <h2>UPDATE Pelapor</h2>
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
                value={formData.nama_pelapor}
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
                value={formData.jenis_identitas}
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
                value={formData.no_identitas}
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
                value={formData.alamat_pelapor}
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
                value={formData.no_hp_pelapor}
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
                value={formData.email}
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
                value={formData.unit_kerja}
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
                value={formData.kategori_pelapor}
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
                value={formData.status_pelapor}
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
                value={formData.tgl_peristiwa}
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
                value={formData.lokasi_peristiwa}
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
                value={formData.kronologi_peristiwa}
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
                accept="image/*"
                // value={formData.content_profil}
                onChange={handleFileChange}
                required
              ></input>
            </div>
          </div>
          <div className="col-md-6">
            {/* <UpdateTerlapor
              //   data={setTerlaporData}
              onChange={handleTerlaporChange}
              data={terlaporData}
            /> */}
            <h3>Tambah Terlapor</h3>
            <div className="mb-3">
              <label className="form-label">Nama Terlapor</label>
              <input
                type="text"
                name="nama_terlapor"
                className="form-control"
                value={formData.nama_terlapor}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">No Hp Terlapor</label>
              <input
                type="text"
                name="no_hp_terlapor"
                className="form-control"
                value={formData.no_hp_terlapor}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Status Pelapor</label>
              <input
                type="text"
                name="status_terlapor"
                className="form-control"
                value={formData.status_terlapor}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? (
            <>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Memperbarui...
            </>
          ) : (
            "Update Pelapor"
          )}
        </button>
      </form>
    </div>
  );
};
export default UpdatePelapor;
