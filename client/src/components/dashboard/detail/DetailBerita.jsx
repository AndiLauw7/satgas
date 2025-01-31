/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { fetchBerita } from "../../../features/beritaSlice";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "react-bootstrap";

const DetailBerita = () => {
  const dispatch = useDispatch();
  const { berita, error, loading, message } = useSelector((state) => {
    return state.berita;
  });

  useEffect(() => {
    dispatch(fetchBerita());
  }, [dispatch]);
  return (
    <div className="container">
      {berita.length === 0 ? (
        <div>
          <p>kosong</p>
        </div>
      ) : (
        <div className="row flex">
          {berita.map((item, index) => (
            <div key={index}>
              <div className="col-md-12 mb-3">
                <Card className="d-flex flex-column align-items-start">
                  <Card.Body className="w-100">
                    {/* Tanggal */}
                    <p>
                      {new Date(item.tgl).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>

                    {/* Judul - di bawah gambar */}

                    {/* Konten Profil */}
                    <Card.Text className="text-justify">
                      {item.content_berita}
                    </Card.Text>
                  </Card.Body>

                  <Card.Img
                    className="mb-3 px-3"
                    style={{
                      width: "100%",
                      height: "auto", // Menyesuaikan tinggi gambar agar proporsional
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                    variant="bottom"
                    src={`http://localhost:5000/uploads/${item.image}`}
                  />
                  <Card.Title className="px-3 text-3xl">
                    {item.tittle}
                  </Card.Title>
                </Card>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default DetailBerita;
