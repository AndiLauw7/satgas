/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import CardComponents from "../Fragments/Card";
import logo from "../../../public/img/ppks.jpg";
import Button from "../../components/Elements/Button";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchBerita } from "../../features/beritaSlice";
export default function Materi() {
  const dispatch = useDispatch();
  const { berita, loading, message, error } = useSelector(
    (state) => state.berita
  );
  useEffect(() => {
    dispatch(fetchBerita());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!Array.isArray(berita)) return <p>Data tidak valid!</p>;
  return (
    <div className="materi ">
      {berita.length === 0 ? (
        <div>
          <p>kosong</p>
        </div>
      ) : (
        <div className="container-fluid d-flex justify-content-start flex-wrap gap-4 px-5 py-5">
          {berita.slice(0, 4).map((item, index) => (
            <Card
              key={index}
              border="primary"
              className="rounded-sm"
              style={{ width: "17em" }}
            >
              <Card.Img
                variant="top"
                style={{ height: "12rem" }}
                src={`http://localhost:5000/uploads/${item.image}`}
              />
              <Card.Body>
                <Card.Title className="font-semibold text-3xl">
                  {item.tittle}...
                </Card.Title>

                {/* <Button classname="bg-blue-600">Go somewhere</Button> */}
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
