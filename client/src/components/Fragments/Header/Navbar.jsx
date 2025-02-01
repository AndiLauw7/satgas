/* eslint-disable no-unused-vars */
import React from "react";
import Button from "../../Elements/Button";
import { Container, Nav, Navbar } from "react-bootstrap";
import viteSvg from "../../../../public/img/logosatgasppksunipi.png";
import "./css/index.css";

export default function NavbarComponent() {
  return (
    <div>
      <Navbar className="bg-nav fixed-top" data-bs-theme="dark">
        <Container>
          <Navbar.Brand className="d-flex " href="#home">
            <img
              alt=""
              src={viteSvg}
              width="75"
              height="40"
              className="d-inline-block align-top ml-3 mr-3"
            />
            <span className="">
              Satuan tugas
              <div className="title-img-nav">
                Pencegahan & Penanganan
                <br />
                Kekerasan Seksual
              </div>
              Universitas Insan Pembangunan Indonesia
            </span>
          </Navbar.Brand>
        </Container>
        <Container className="nav-content fluid">
          <Nav className="me-auto link-content ">
            <Nav.Link href="/">Beranda</Nav.Link>
            <Nav.Link href="/">Profil</Nav.Link>
            <Nav.Link href="">Berita</Nav.Link>
            <Nav.Link href="/form-data-lapor">Lapor</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
