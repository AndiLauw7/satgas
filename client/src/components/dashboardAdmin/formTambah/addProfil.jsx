/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProfil, clearMessages } from "../../../features/profilSlice";
import { useNavigate } from "react-router-dom";

const AddProfil = () => {
  const [formData, setFormData] = useState({
    tittle_profil: "",
    content_profil: "",
    tgl: "",
    image: null,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, successMessage } = useSelector(
    (state) => state.profil
  );

  // Mengosongkan pesan saat pertama kali render
  useEffect(() => {
    dispatch(clearMessages());
  }, [dispatch]);

  // Handle input perubahan data
  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("tittle_profil", formData.tittle_profil);
    formDataToSend.append("content_profil", formData.content_profil);
    formDataToSend.append("tgl", formData.tgl);
    formDataToSend.append("image", formData.image);

    // Dispatch action addProfil
    dispatch(addProfil(formDataToSend));
  };

  // Redirect setelah sukses
  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        navigate("/dashboard-admin");
      }, 2000);
    }
  }, [successMessage, navigate]);

  return (
    <div
      className="container mt-5"
      style={{
        maxHeight: "80vh", // Scrollable area
        overflowY: "auto", // Enable vertical scrolling
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <h2>Tambah Profil</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">Judul Profil</label>
          <input
            type="text"
            name="tittle_profil"
            className="form-control"
            value={formData.tittle_profil}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Konten Profil</label>
          <textarea
            name="content_profil"
            className="form-control"
            value={formData.content_profil}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Tanggal</label>
          <input
            type="date"
            name="tgl"
            className="form-control"
            value={formData.tgl}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Gambar</label>
          <input
            type="file"
            name="image"
            className="form-control"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Menambahkan..." : "Tambah Profil"}
        </button>
      </form>
    </div>
  );
};

export default AddProfil;
