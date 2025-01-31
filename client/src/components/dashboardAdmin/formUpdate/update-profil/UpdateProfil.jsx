/* eslint-disable no-unused-vars */
import {
  fetchProfilbyid,
  updateProfil,
} from "../../../../features/profilSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProfil = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { profil, loading, successMessage, error } = useSelector(
    (state) => state.profil
  );
  const [formData, setFormData] = useState({
    tittle_profil: "",
    content_profil: "",
    image: null,
    tgl: "",
  });
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      dispatch(fetchProfilbyid(id));
    }
  }, [dispatch, id]);
  useEffect(() => {
    if (profil && profil.length > 0 && `${profil[0].id}` === id) {
      setFormData({
        tittle_profil: profil[0].tittle_profil,
        content_profil: profil[0].content_profil,
        image: profil[0].image,
        tgl: profil[0].tgl,
      });
    }
  }, [profil, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
    updatedData.append("tittle_profil", formData.tittle_profil);
    updatedData.append("content_profil", formData.content_profil);
    updatedData.append("tgl", formData.tgl);
    if (formData.image instanceof File) {
      updatedData.append("image", formData.image);
    }
    try {
      const response = await dispatch(
        updateProfil({ id, data: updatedData })
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
      <h2>Update Profil</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">Judul Berita</label>
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
          <label className="form-label">Konten Berita</label>
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

export default UpdateProfil;
