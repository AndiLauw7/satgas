/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Dropdown, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const sideBar = () => {
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("");

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };
  const handleMenuClick = (menuName, route) => {
    setActiveMenu(menuName); // Set active menu
    navigate(route); // Navigate to the selected route
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div
      style={{
        width: "250px",
        height: "100vh",
        background: "#0a6370",
        color: "#fdcb2c",
      }}
    >
      <ul
        style={{
          listStyleType: "none",
          padding: "10px",
          textDecoration: "none",
        }}
      >
        <li>
          <button
            onClick={() => handleMenuClick("dashboard", "/dashboard-admin")}
            style={{
              backgroundColor:
                activeMenu === "dashboard"
                  ? "rgba(255, 255, 255, 0.2)"
                  : "transparent",
              color: "#fdcb2c",
              border: "none",
              textAlign: "left",
              padding: "10px 20px",
              width: "100%",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Dashboard
          </button>
        </li>

        {/* Dropdown Menu */}
        <li>
          <button
            onClick={() => {
              handleMenuClick("dataMaster", "/dashboard-admin"); // Example route for Data Master
              handleDropdownToggle();
            }}
            style={{
              backgroundColor:
                activeMenu === "dataMaster"
                  ? "rgba(255, 255, 255, 0.2)"
                  : "transparent",
              color: "#fdcb2c",
              border: "none",
              textAlign: "left",
              padding: "10px 20px",
              width: "100%",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Data Master
          </button>
          {/* Show/Hide Dropdown Menu */}
          {isDropdownOpen && (
            <ul style={{ listStyleType: "none", paddingLeft: "20px" }}>
              <li>
                <button
                  style={{
                    backgroundColor:
                      activeMenu === "profil"
                        ? "rgba(255, 255, 255, 0.2)"
                        : "transparent",
                    color: "#fdcb2c",
                    border: "none",
                    textAlign: "left",
                    padding: "10px 20px",
                    width: "100%",
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                  onClick={
                    () =>
                      handleMenuClick(
                        "profil",
                        "/dashboard-admin/data-master-profil"
                      )
                    // navigate("/dashboard-admin/data-master-profil")
                  }
                >
                  Data Master Profil
                </button>
              </li>
              <li>
                <button
                  style={{
                    backgroundColor:
                      activeMenu === "berita"
                        ? "rgba(255, 255, 255, 0.2)"
                        : "transparent",
                    color: "#fdcb2c",
                    border: "none",
                    textAlign: "left",
                    padding: "10px 20px",
                    width: "100%",
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    handleMenuClick(
                      "berita",
                      "/dashboard-admin/data-master-berita"
                    )
                  }
                >
                  Data Master Berita
                </button>
              </li>
              <li>
                <button
                  style={{
                    backgroundColor:
                      activeMenu === "pelapor"
                        ? "rgba(255, 255, 255, 0.2)"
                        : "transparent",
                    color: "#fdcb2c",
                    border: "none",
                    textAlign: "left",
                    padding: "10px 20px",
                    width: "100%",
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    handleMenuClick(
                      "pelapor",
                      "/dashboard-admin/data-master-pelapor"
                    )
                  }
                >
                  Data Master Lapor
                </button>
              </li>
              <li>
                <button
                  style={{
                    backgroundColor:
                      activeMenu === "tindak-lanjut"
                        ? "rgba(255, 255, 255, 0.2)"
                        : "transparent",
                    color: "#fdcb2c",
                    border: "none",
                    textAlign: "left",
                    padding: "10px 20px",
                    width: "100%",
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    handleMenuClick(
                      "tindak-lanjut",
                      "/dashboard-admin/data-master-tindak-lanjut"
                    )
                  }
                >
                  Data Master Tindak Lanjut
                </button>
              </li>
            </ul>
          )}
        </li>

        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </div>
  );
};
export default sideBar;
