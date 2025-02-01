/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import GlobalTable from "../components/table/GlobalTable";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import {
  addTindakLanjut,
  fetchTindakLanjut,
  updateTindakLanjutStatus,
} from "../features/tindakLanjut";
import { fetchPelapor } from "../features/pelapor";
import { Input } from "postcss";

const DataTindakLanjut = () => {
  const navigate = useNavigate();
const date = new Date();
const dispatch = useDispatch();
const { tindakLanjut, loading, error } = useSelector(
  (state) => state.tindakLanjut
);
const { pelapor } = useSelector((state) => state.pelapor);

const columns = ["Status Laporan", "Keterangan", "Tgl"];
const formattedData = tindakLanjut.map((item) => ({
  id: item.id,
  "Status Laporan": item.status_laporan,
  Keterangan: item.keterangan.substring(0, 200) + "...",
  Tgl: new Date(item.tgl).toLocaleDateString("id-ID"),
}));

useEffect(() => {
  dispatch(fetchTindakLanjut());
}, [dispatch]);

const [showModal, setShowModal] = useState(false);
const [showModalAdd, setModalAdd] = useState(false);
const [selectId, setSelectId] = useState(null);
const [statusLaporan, setStatusLaporan] = useState("");
const [pelaporId, setPelaporId] = useState("");
const [keterangan, setKeterangan] = useState("");
const [statusLaporanAdd, setStatusLaporanAdd] = useState("Diterima");
const [tgl, setTgl] = useState("");
const [tglEdit, setTglEdit] = useState("");
const handleSubmit = (e) => {
  e.preventDefault();
  const data = {
    status_laporan: statusLaporanAdd,
    pelapor_id: pelaporId,
    keterangan,
    tgl,
  };
  dispatch(addTindakLanjut(data));
};

useEffect(() => {
  dispatch(fetchPelapor());
}, [dispatch]);

const handleEdit = (row) => {
  const id = row.id;
  setSelectId(id);
  setStatusLaporan(row["Status Laporan"]);
  setShowModal(true);
};

const handleDelete = (row) => {
  const id = row.id;
  console.log("Delete ID:", id);
};

const handleUpdateStatus = async () => {
  if (!selectId || !statusLaporan) return;

  await dispatch(
    updateTindakLanjutStatus({
      id: selectId,
      status_laporan: statusLaporan,
      keterangan: keterangan,
      tgl: tglEdit,
    })
  );
  setShowModal(false);
  dispatch(fetchTindakLanjut());
};

const actions = (row) => (
  <>
    <Button
      variant="warning"
      size="sm"
      onClick={() => handleEdit(row)}
      style={{ marginRight: "5px" }}
    >
      Edit
    </Button>
    {/* <Button variant="danger" size="sm" onClick={() => handleDelete(row)}>
      Hapus
    </Button> */}
  </>
);
const itemsPerPage = 5;
if (loading) return <Spinner animation="border" />;
if (error) return <p className="text-danger">Error: {error}</p>;
return (
  <div>
    <div className="container mt-4">
      <Button
        className="mb-3"
        onClick={() => setModalAdd(true)}
        // onClick={() =>
        //   navigate(
        //     "/dashboard-admin/data-master-tindak-lanjut/tambah-data-tindak-lanjut"
        //   )
        // }
      >
        Tambah
      </Button>
      <GlobalTable
        columns={columns}
        data={formattedData}
        actions={actions}
        itemsPerPage={itemsPerPage}
      />
    </div>
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Update Status Laporan</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label className="">Input Tanggal</Form.Label>

          <Form.Control
            type="date"
            placeholder="Tanggal"
            value={tglEdit}
            onChange={(e) => setTglEdit(e.target.value)}
            className=" mb-3"
            max={date}
          />
          <Form.Label>Status Laporan</Form.Label>
          <Form.Select
            type="text"
            value={statusLaporan}
            onChange={(e) => setStatusLaporan(e.target.value)}
          >
            <option value="">Pilih Status</option>
            <option value="Diproses">Diproses</option>
            <option value="Selesai">Selesai</option>
          </Form.Select>

          <Form.Label className="">Input Keterangan</Form.Label>
          <Form.Control
            type="text"
            placeholder="Keterangan"
            value={keterangan}
            onChange={(e) => setKeterangan(e.target.value)}
            className=" mb-3"
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Batal
        </Button>
        <Button variant="primary" onClick={handleUpdateStatus}>
          Simpan Perubahan
        </Button>
      </Modal.Footer>
    </Modal>

    <Modal show={showModalAdd} onHide={() => setModalAdd(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Tambah Tindak Lanjut</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Label className="">Status Laporan</Form.Label>

            <Form.Control
              type="text"
              className=" mb-3"
              readOnly
              value={statusLaporanAdd}
              onChange={(e) => setStatusLaporanAdd(e.target.value)}
              placeholder="Status Laporan"
            />
            <Form.Label>Pilih Pelapor</Form.Label>
            <Form.Select
              className="mb-3"
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
            </Form.Select>
            <Form.Label className="">Input Tanggal</Form.Label>

            <Form.Control
              type="date"
              placeholder="Tanggal"
              value={tgl}
              onChange={(e) => setTgl(e.target.value)}
              className=" mb-3"
              max={date}
            />
            <Form.Label className="">Input Keterangan</Form.Label>

            <Form.Control
              type="text"
              placeholder="Keterangan"
              value={keterangan}
              onChange={(e) => setKeterangan(e.target.value)}
              className=" mb-3"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit">
            Simpan Tindak Lanjut
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  </div>
);
};

export default DataTindakLanjut;
