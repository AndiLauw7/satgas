import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import profilReducer from "../features/profilSlice";
import beritaReducer from "../features/beritaSlice";
import pelaporReducer from "../features/pelapor";
import tindakLanjutReducer from "../features/tindakLanjut";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profil: profilReducer,
    berita: beritaReducer,
    pelapor: pelaporReducer,
    tindakLanjut: tindakLanjutReducer,
  },
});
export default store;
