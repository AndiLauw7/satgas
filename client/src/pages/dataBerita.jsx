/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import GlobalTable from "../components/table/GlobalTable";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Spinner } from "react-bootstrap";
import { deleteBerita, fetchBerita } from "../features/beritaSlice";

const DataBerita = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { berita, loading, error, message } = useSelector(
    (state) => state.berita
  );

  useEffect(() => {
    console.log(berita);
  }, [berita]);

  useEffect(() => {
    dispatch(fetchBerita());
  }, [dispatch]);

  const columns = ["Judul Berita", "Content Berita", "Image", "Tgl"];
  const formattedData =
    berita && berita.length > 0
      ? berita.map((item) => ({
          id: item.id,
          "Judul Berita": item.tittle,
          "Content Berita": item.content_berita.substring(0, 150) + "....",
          Image: `http://localhost:5000/uploads/${item.image}`,
          Tgl: new Date(item.tgl).toLocaleDateString("id-ID"),
        }))
      : [];

  const itemsPerPage = 5;

  if (loading) return <Spinner animation="border" />;
  if (error)
    return (
      <p className="text-danger">
        Error: {error.message || "Kesalahan Error dari server"}
      </p>
    );

  const handleEdit = (row) => {
    const id = row.id;
    console.log(id);
    navigate(`/dashboard-admin/data-master-berita/update-data-berita/${id}`);
  };

  const handleDelete = (row) => {
    const id = row.id;

    dispatch(deleteBerita({ id }))
      .unwrap()
      .then(() => {
        dispatch(fetchBerita());
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
        <Button
          className="mb-3"
          onClick={() =>
            navigate("/dashboard-admin/data-master-berita/tambah-data-berita")
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

export default DataBerita;
