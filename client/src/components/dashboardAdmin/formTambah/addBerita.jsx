/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBerita, clearMessages } from "../../../features/beritaSlice";
import { useNavigate } from "react-router-dom";

const AddBerita = () => {
  const [formData, setFormData] = useState({
    tittle: "",
    content_berita: "",
    image: null,
    tgl: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, successMessage } = useSelector(
    (state) => state.berita
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
    formDataToSend.append("tittle", formData.tittle);
    formDataToSend.append("content_berita", formData.content_berita);
    formDataToSend.append("tgl", formData.tgl);
    formDataToSend.append("image", formData.image);

    // Dispatch action AddBerita
    dispatch(addBerita(formDataToSend));
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
      <h2>Tambah Berita</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">Judul Berita</label>
          <input
            type="text"
            name="tittle"
            className="form-control"
            value={formData.tittle}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Konten Berita</label>
          <textarea
            name="content_berita"
            className="form-control"
            value={formData.content_berita}
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
          {loading ? "Menambahkan..." : "Tambah Berita"}
        </button>
      </form>
    </div>
  );
};

export default AddBerita;
