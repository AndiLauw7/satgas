/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk untuk menambahkan profil
export const addBerita = createAsyncThunk(
  "berita/addBerita",
  async (formData, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/v1/addberita",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data; // Mengembalikan data dari server
    } catch (error) {
      return rejectWithValue(error.response.data); // Menangani error
    }
  }
);

export const fetchBerita = createAsyncThunk("berita/fetchBerita", async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/v1/get-data-berita"
    );
    return response.data.data;
  } catch (error) {
    return error.message;
  }
});

export const fetchberitabyId = createAsyncThunk(
  "berita/fetchberitabyId",
  async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/getberitaid/${id}`
      );
      return response.data.data || null;
    } catch (error) {
      return error.message;
    }
  }
);

export const updateBerita = createAsyncThunk(
  "berita/updateBerita",
  async ({ id, data }, rejectWithValue) => {
    try {
      const token = localStorage.getItem("token");
      console.log("Toen", token);
      const response = await axios.patch(
        `http://localhost:5000/api/v1/update-berita/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Kesalahan saat update data"
      );
    }
  }
);

export const deleteBerita = createAsyncThunk(
  "berita/deleteBerita",
  async ({ id }, { dispatch }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:5000/api/v1/delete-berita/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      dispatch(fetchBerita());
      return id;
    } catch (error) {
      console.log(error);
      return error.response?.data?.message || error.message || "Error delete";
    }
  }
);
// Slice profil
const beritaSlice = createSlice({
  name: "berita",
  initialState: {
    loading: false,
    berita: [],
    error: null,
    successMessage: "",
  },
  reducers: {
    clearMessages(state) {
      state.successMessage = "";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addBerita.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBerita.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(addBerita.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(fetchBerita.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBerita.fulfilled, (state, action) => {
        state.loading = false;
        state.berita = action.payload;
      })
      .addCase(fetchBerita.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(fetchberitabyId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchberitabyId.fulfilled, (state, action) => {
        state.berita = action.payload;
        state.loading = false;
      })
      .addCase(fetchberitabyId.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(updateBerita.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBerita.fulfilled, (state, action) => {
        state.pelapor = Array.isArray(action.payload) ? action.payload : [];
        state.loading = false;
      })
      .addCase(updateBerita.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(deleteBerita.pending, (state) => {
        console.log("Delete pending");
        state.loading = true;
      })
      .addCase(deleteBerita.fulfilled, (state, action) => {
        console.log("Delete berhasil:", action.payload);
        state.loading = false;
        state.berita = state.berita.filter(
          (berita) => berita.id !== action.payload
        );
        state.message = action.payload || "Berita berhasil dihapus";
      })
      .addCase(deleteBerita.rejected, (state, action) => {
        console.log("Delete gagal:", action.payload || action.error.message);
        state.loading = false;
        state.error = action.payload || action.error.message;
        state.message = "Gagal menghapus berita";
      });
  },
});

export const { clearMessages } = beritaSlice.actions;

export default beritaSlice.reducer;
