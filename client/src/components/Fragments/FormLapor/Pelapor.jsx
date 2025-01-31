/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import FormTerlapor from "./Terlapor";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addPelaporAnonim } from "../../../features/pelapor";

const FormPelapor = () => {
  // const [formData, setFormData] = useState(new FormData());
  const [formData, setFormData] = useState({
    nama_pelapor: "",
    jenis_identitas: "",
    no_identitas: "",
    file_identitas: null,
    alamat_pelapor: "",
    no_hp_pelapor: "",
    email: "",
    unit_kerja: "",
    status_pelapor: "",
    kategori_pelapor: "",
    tgl_peristiwa: "",
    lokasi_peristiwa: "",
    kronologi_peristiwa: "",
    bukti_peristiwa: null,
  });

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
    // formData.set(e.target.name, e.target.value);
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleFileChange = (e) => {
    // formData.append(e.target.name, e.target.files[0]);
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files[0],
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const formDataObject = Object.fromEntries(formData.entries());

    const combineData = {
      // ...formDataObject,
      ...formData,
      ...terlaporData,
    };

    dispatch(addPelaporAnonim(combineData));
  };

  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        setFormData({
          nama_pelapor: "",
          jenis_identitas: "",
          no_identitas: "",
          file_identitas: null,
          alamat_pelapor: "",
          no_hp_pelapor: "",
          email: "",
          unit_kerja: "",
          status_pelapor: "",
          kategori_pelapor: "",
          tgl_peristiwa: "",
          lokasi_peristiwa: "",
          kronologi_peristiwa: "",
          bukti_peristiwa: null,
        });
        setTerlaporData({
          nama_terlapor: "",
          no_hp_terlapor: "",
          status_terlapor: "",
        });
        navigate("/form-data-lapor");
      }, 2000);
    }
  }, [successMessage, navigate]);

  return (
    <div className="mb-5">
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="card py-3 px-3 bg-slate-500"
      >
        <h1>Identitas Pelapor</h1>

        <div className="row ">
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Nama Pelapor</label>
              <input
                type="text"
                name="nama_pelapor"
                className="form-control"
                value={formData.nama_pelapor || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              {/* <label className="form-label">Jenis Identitas</label>
              <input
                type="text"
                name="jenis_identitas"
                className="form-control"
            
                onChange={handleChange}
                required
              ></input> */}
              <label className="form-label">Jenis Identitas</label>
              <select
                name="jenis_identitas"
                className="form-control"
                value={formData.jenis_identitas || ""}
                onChange={handleChange}
                required
              >
                <option value="">Pilih Jenis Identitas</option>
                <option value="KTP">KTP</option>
                <option value="KTM">KTM</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label"> No Identitas</label>
              <input
                type="tetx"
                name="no_identitas"
                className="form-control"
                value={formData.no_identitas || ""}
                onChange={handleChange}
                required
              ></input>
            </div>
            <div className="mb-3">
              <label className="form-label">File Identitas</label>
              <input
                type="file"
                name="file_identitas"
                // value={}
                className="form-control"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Alamat Pelapor</label>
              <input
                type="text"
                name="alamat_pelapor"
                className="form-control"
                value={formData.alamat_pelapor || ""}
                onChange={handleChange}
                required
              ></input>
            </div>
            <div className="mb-3">
              <label className="form-label">No Hp Pelapor</label>
              <input
                type="number"
                name="no_hp_pelapor"
                className="form-control"
                value={formData.no_hp_pelapor || ""}
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
                value={formData.email || ""}
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
                value={formData.unit_kerja || ""}
                onChange={handleChange}
                required
              ></input>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <h1>Status Pelapor</h1>
            <div className="mb-3">
              <label className="form-label">Status Pelapor</label>
              <select
                name="status_pelapor"
                className="form-control"
                value={formData.status_pelapor || ""}
                onChange={handleChange}
                required
              >
                <option value="">Pilih Status</option>
                <option value="MAHASISWA">Mahasiswa</option>
                <option value="DOSEN">Dosen</option>
                <option value="TENAGA PENDIDIK">Tenaga Pendidik</option>
                <option value="TENAGA PENDIDIK">Masyarakat Umum</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Pilih Kategori</label>
              <select
                name="kategori_pelapor"
                className="form-control"
                value={formData.kategori_pelapor || ""}
                onChange={handleChange}
                required
              >
                <option value="">Pilih Jenis Identitas</option>
                <option value="KORBAN">Korban</option>
                <option value="SAKSI">Saksi</option>
              </select>
            </div>
            <div className="col-md-6"> </div>
          </div>
          <div className="col-md-6">
            <h1>Status Terlapor</h1>
            <FormTerlapor
              setTerlaporData={setTerlaporData}
              terlaporData={terlaporData}
            />
          </div>
        </div>
        <div className="row">
          <h1>Peristiwa</h1>
          <div className="mb-3">
            <label className="form-label">Tgl Peristiwa</label>
            <input
              type="date"
              name="tgl_peristiwa"
              className="form-control"
              value={formData.tgl_peristiwa || ""}
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
              value={formData.lokasi_peristiwa || ""}
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
              value={formData.kronologi_peristiwa || ""}
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
              // value={formData.bukti_peristiwa || ""}
              onChange={handleFileChange}
              required
            ></input>
          </div>
        </div>
        {error && (
          <div className="alert alert-danger flex justify-center">{error}</div>
        )}
        <button
          type="submit"
          className="btn btn-primary mt-3 mb-2"
          disabled={loading}
        >
          {loading ? "Menambahkan..." : "Tambah Pelapor"}
        </button>
        {successMessage && (
          <div className="alert alert-success flex justify-center">
            {successMessage}
          </div>
        )}
      </form>
    </div>
  );
};

export default FormPelapor;
