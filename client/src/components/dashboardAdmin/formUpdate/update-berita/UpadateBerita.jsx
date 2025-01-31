/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  fetchberitabyId,
  updateBerita,
} from "../../../../features/beritaSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const UpdateBerita = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { berita, loading, successMessage, error } = useSelector(
    (state) => state.berita
  );

  const [formData, setFormData] = useState({
    tittle: "",
    content_berita: "",
    image: null,
    tgl: "",
  });

  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    if (id) {
      dispatch(fetchberitabyId(id));
    }
  }, [dispatch, id]);

  // Update form data when berita is fetched
  useEffect(() => {
    if (berita && berita.length > 0 && `${berita[0].id}` === id) {
      console.log("Data Berita Fetched:", berita);
      setFormData({
        tittle: berita[0].tittle,
        content_berita: berita[0].content_berita,
        image: berita[0].image || null,
        tgl: berita[0].tgl ? berita[0].tgl.split("T")[0] : "", // Format the date correctly
      });
    }
  }, [berita, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const maxFileSize = 5 * 1024 * 1024; // 5MB
    if (files[0].size > maxFileSize) {
      return alert("Ukuran file melebihi 5 MB");
    }
    setFormData((prevState) => ({ ...prevState, [name]: files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = new FormData();
    updatedData.append("tittle", formData.tittle);
    updatedData.append("content_berita", formData.content_berita);
    updatedData.append("tgl", formData.tgl);
    if (formData.image instanceof File) {
      updatedData.append("image", formData.image);
    }
    try {
      const response = await dispatch(
        updateBerita({ id, data: updatedData })
      ).unwrap();
      navigate("/dashboard-admin");
    } catch (error) {
      console.error(error);
    }
  };

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
        maxHeight: "80vh",
        overflowY: "auto",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <h2>Update Berita</h2>
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
            onChange={handleFileChange}
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Menambahkan..." : "Update Berita"}
        </button>
      </form>
    </div>
  );
};

export default UpdateBerita;
