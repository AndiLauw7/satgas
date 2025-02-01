import React, { useEffect } from "react";
import GlobalTable from "../components/table/GlobalTable";
import { data, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Table } from "react-bootstrap";
import { fetchTindakLanjut } from "../features/tindakLanjut";

const ReportData = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { tindakLanjut, error, loading } = useSelector(
    (state) => state.tindakLanjut
  );
  console.log(tindakLanjut);

  useEffect(() => {
    dispatch(fetchTindakLanjut());
  }, [dispatch]);

  const itemsPerPage = 5;
  const columns = [
    "Nama Pelapor",
    "Status Pelapor",
    "Nama Terlapor",
    "Status Terlapor",
    "Status Laporan",
  ];

  const formattedData = tindakLanjut.map((item) => ({
    id: item.id,
    "Nama Pelapor": item.pelapor ? item.pelapor.nama_pelapor : "",
    "Status Pelapor": item.pelapor.status_pelapor,
    "Nama Terlapor": item.pelapor.nama_terlapor,
    "Status Terlapor": item.pelapor.status_terlapor,
    "Status Laporan": item.status_laporan,
  }));

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="report-container">
      <div className="d-flex justify-content-between mb-3">
        <h3>Data Laporan</h3>
        <Button className="btn-print" variant="primary" onClick={handlePrint}>
          Cetak Laporan
        </Button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Pelapor</th>
              <th>Status Pelapor</th>
              <th>Nama Terlapor</th>
              <th>Status Terlapor</th>
              <th>Status Laporan</th>
            </tr>
          </thead>
          <tbody>
            {tindakLanjut && tindakLanjut.length > 0 ? (
              tindakLanjut.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.pelapor ? item.pelapor.nama_pelapor : "-"}</td>
                  <td>{item.pelapor ? item.pelapor.status_pelapor : "-"}</td>
                  <td>{item.pelapor ? item.pelapor.nama_terlapor : "-"}</td>
                  <td>{item.pelapor ? item.pelapor.status_terlapor : "-"}</td>
                  <td>{item.status_laporan || "-"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  Tidak ada data tersedia.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default ReportData;
