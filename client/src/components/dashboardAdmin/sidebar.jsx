import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("");

  const user = localStorage.getItem("userSession")
    ? JSON.parse(localStorage.getItem("userSession"))
    : null;

  const level = (user && user.level) || ""; // Ambil level user (admin/ketua)
  console.log(user);

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleMenuClick = (menuName, route) => {
    setActiveMenu(menuName);
    navigate(route);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("user");
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
      className="sidebar"
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
        {level && level === "admin" && (
          <>
            <li>
              <button
                onClick={() => {
                  handleMenuClick("dataMaster", "/dashboard-admin/data-master"); // Example route for Data Master
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
            <ul>
              <li>
                <button
                  onClick={
                    () =>
                      handleMenuClick(
                        "laporan",
                        "/dashboard-admin/data-laporan"
                      )
                    // navigate("/dashboard-admin/data-master-laporan")
                  }
                >
                  Laporan
                </button>
              </li>
            </ul>
          </>
        )}

        {level && level === "ketua" && (
          <>
            <ul>
              <li>
                <button
                  onClick={
                    () =>
                      handleMenuClick(
                        "laporan",
                        "/dashboard-admin/data-laporan"
                      )
                    // navigate("/dashboard-admin/data-master-laporan")
                  }
                >
                  Laporan
                </button>
              </li>
            </ul>
          </>
        )}

        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
