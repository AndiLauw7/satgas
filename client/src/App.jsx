/* eslint-disable no-unused-vars */

import React, { useEffect } from "react";
import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";
import { Routes, Route, Router, BrowserRouter } from "react-router-dom";
import LoginPage from "./pages/login";
import DataLaporPage from "./components/Layouts/LaporLayouts";
import { Provider } from "react-redux";
import store from "./store/store";
import PrivateRoute from "./pages/privateRoute/privateRoute";
import DashboardAdmin from "./components/dashboardAdmin/DashboardAdmin";
import DetaillLaporlayouts from "./components/Layouts/DetailProfilLayouts";
import DetailBeritaLayouts from "./components/Layouts/DetailBeritaLayouts";
function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/form-data-lapor" element={<DataLaporPage />} />
            <Route
              path="/detail-profil-satgas"
              element={<DetaillLaporlayouts />}
            />
            <Route
              path="/detail-berita-satgas"
              element={<DetailBeritaLayouts />}
            />

            <Route element={<PrivateRoute />}>
              <Route path="/dashboard-admin/*" element={<DashboardAdmin />} />
            </Route>

            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
