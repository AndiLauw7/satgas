/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { Button, Spinner } from "react-bootstrap";
import GlobalTable from "../components/table/GlobalTable";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePelapor, fetchPelapor } from "../features/pelapor";
import { Link, useNavigate } from "react-router-dom";

const dataLaporPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pelapor, loading, error, message } = useSelector(
    (state) => state.pelapor
  );

  const columns = [
    "Nama",
    "Jenis Identitas",
    "No Identitas",
    "No HP",
    "Alamat",
    "Email",
  ];
  const [showMessage, setShowMessage] = useState(false);
  useEffect(() => {
    if (message) {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);
  useEffect(() => {
    dispatch(fetchPelapor());
  }, [dispatch]);

  const formattedData = Array.isArray(pelapor)
    ? pelapor.map((item) => ({
        id: item.id,
        Nama: item.nama_pelapor,
        "Jenis Identitas": item.jenis_identitas,
        "No Identitas": item.no_identitas,
        "No HP": item.no_hp_pelapor,
        Alamat: item.alamat_pelapor,
        Email: item.email,
      }))
    : [];
  const itemsPerPage = 5;
  if (loading) return <Spinner animation="border" />;
  // if (!Array.isArray(pelapor) || pelapor.length === 0) {
  //   return <div>Data tidak tersedia</div>;
  // }
  const handleEdit = (row) => {
    const id = row.id;
    navigate(`/dashboard-admin/data-master-pelapor/update-data-lapor/${id}`);
  };

  const handleDelete = (row) => {
    const id = row.id;
    if (!id) {
      return;
    }
    dispatch(deletePelapor({ id }))
      .unwrap()
      .then(() => {
        dispatch(fetchPelapor());
      })
      .catch((error) => {
        console.error("Error:", error);
        dispatch(setErrorMessage(error.message));
      });
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
      <Button variant="danger" size="sm" onClick={() => handleDelete(row)}>
        Hapus
      </Button>
    </>
  );
  return (
    <div>
      <div className="container mt-4">
        <h1 className="mb-4">Data Master Pelapor</h1>
        <Button
          className="mb-3"
          onClick={() =>
            navigate("/dashboard-admin/data-master-pelapor/tambah-data-lapor")
          }
        >
          Tambah
        </Button>
        {showMessage && <div className="alert alert-danger">{message}</div>}
        <GlobalTable
          columns={columns}
          data={formattedData}
          actions={actions}
          itemsPerPage={itemsPerPage}
        />
      </div>
    </div>
  );
};
export default dataLaporPage;
