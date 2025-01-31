/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import GlobalTable from "../components/table/GlobalTable";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Spinner } from "react-bootstrap";
import { deleteProfil, fetchProfil } from "../features/profilSlice";

const DataProfill = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { profil, loading, error } = useSelector((state) => state.profil);

  useEffect(() => {
    dispatch(fetchProfil());
  }, [dispatch]);

  const columns = ["Judul Profil", "Content Profil", "Image", "Tgl"];
  const formattedData = profil.map((item) => ({
    id: item.id,
    "Judul Profil": item.tittle_profil,
    "Content Profil": item.content_profil.substring(0, 200) + "...",
    Image: `http://localhost:5000/uploads/${item.image}`,
    Tgl: new Date(item.tgl).toLocaleDateString("id-ID"),
  }));

  const itemsPerPage = 5;
  if (loading) return <Spinner animation="border" />;
  if (error) return <p className="text-danger">Error: {error}</p>;

  const handleEdit = (row) => {
    const id = row.id;
    navigate(`/dashboard-admin/data-master-profil/update-data-profil/${id}`);
  };

  const handleDelete = (row) => {
    const id = row.id;
    console.log(id);

    dispatch(deleteProfil({ id }))
      .unwrap()
      .then(() => {
        dispatch(fetchProfil());
      })
      .catch((error) => {
        console.log(error);

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
        <Button
          className="mb-3"
          onClick={() =>
            navigate("/dashboard-admin/data-master-profil/tambah-data-profil")
          }
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
    </div>
  );
};

export default DataProfill;
