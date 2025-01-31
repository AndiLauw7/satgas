/* eslint-disable no-unused-vars */
import { fetchPelapor } from "../../../features/pelapor";
import { addTindakLanjut } from "../../../features/tindakLanjut";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AddTindakLanjut = () => {
  const dispatch = useDispatch();
  const { tindakLanjut, loading, error } = useSelector(
    (state) => state.tindakLanjut
  );
  const { pelapor } = useSelector((state) => state.pelapor);

  const [pelaporId, setPelaporId] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [statusLaporan, setStatusLaporan] = useState("Diterima");
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      status_laporan: statusLaporan,
      pelapor_id: pelaporId,
      keterangan,
    };
    dispatch(addTindakLanjut(data));
  };
  useEffect(() => {
    dispatch(fetchPelapor());
  }, [dispatch]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Status Laporan</label>
          <input
            type="text"
            value={statusLaporan}
            onChange={(e) => setStatusLaporan(e.target.value)}
            required
            readOnly
          />
        </div>
        <div>
          <label htmlFor="">Pelapor</label>
          <select
            name=""
            id=""
            value={pelaporId}
            onChange={(e) => setPelaporId(e.target.value)}
          >
            <option value="">Pilih Pelapor</option>
            {Array.isArray(pelapor) && pelapor.length > 0 ? (
              pelapor.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nama_pelapor}
                </option>
              ))
            ) : (
              <option value="">Tidak ada pelapor</option>
            )}
          </select>
        </div>
        <div>
          <label>Keterangan</label>
          <textarea
            value={keterangan}
            onChange={(e) => setKeterangan(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Menambahkan..." : "Tambah Tindak Lanjut"}
        </button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default AddTindakLanjut;
