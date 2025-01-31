/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";

export const addPelapor = createAsyncThunk(
  "pelapor/addPelapor",
  async (combinedData, { rejectWithValue }) => {
    try {
      //   const token = sessionStorage.getItem("token");
      const token = sessionStorage.getItem("token");
      const formData = new FormData();

      Object.keys(combinedData).forEach((key) => {
        formData.append(key, combinedData[key]);
      });
      const response = await axios.post(
        // "http://localhost:5000/api/v1/get-all-pelapor",
        "http://localhost:5000/api/v1/addpelapor",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addPelaporAnonim = createAsyncThunk(
  "pelapor/addpelaporAnonim",
  async (combineData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      Object.keys(combineData).forEach((key) => {
        formData.append(key, combineData[key]);
      });
      const response = await axios.post(
        "http://localhost:5000/api/v1/addpelapor-anonim",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchPelapor = createAsyncThunk(
  "pelapor/fetchPelapor",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/get-all-pelapor"
      );
      return response.data.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const fetchPelaporbyId = createAsyncThunk(
  "pelapor/fetchPelaporbyId",
  async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/pelaporbyid/${id}`
      );

      console.log(response.data);
      return response.data.data || null;
    } catch (error) {
      return error.message;
    }
  }
);

export const updatePelapor = createAsyncThunk(
  "pelapor/updatePelapor",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.patch(
        `http://localhost:5000/api/v1/update-pelapor/${id}`,
        formData,
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
        error.response?.data?.message || "Kesalahan saat memperbarui data"
      );
    }
  }
);

export const deletePelapor = createAsyncThunk(
  "pelapor/deletePelapor",
  async ({ id }, { dispatch }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:5000/api/v1/hapuspelapor/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(fetchPelapor());
      return id;
    } catch (error) {
      console.log(error);
      return (
        error.response?.data?.message || error.message || "Something went wrong"
      );
    }
  }
);
// Slice profil
const pelaporSlice = createSlice({
  name: "pelapor",
  initialState: {
    pelapor: [],
    loading: false,
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
      .addCase(addPelapor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPelapor.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(addPelapor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(addPelaporAnonim.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPelaporAnonim.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(addPelaporAnonim.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(fetchPelapor.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPelapor.fulfilled, (state, action) => {
        state.loading = false;
        state.pelapor = action.payload;
      })
      .addCase(fetchPelapor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(fetchPelaporbyId.pending, (state) => {
        state.loading = true; // Menandakan bahwa data sedang dimuat
        state.error = null; // Reset error
      })
      .addCase(fetchPelaporbyId.fulfilled, (state, action) => {
        state.loading = false; // Data telah dimuat
        state.pelapor = action.payload; // Menyimpan data pelapor yang diterima
      })
      .addCase(fetchPelaporbyId.rejected, (state, action) => {
        state.loading = false; // Pengambilan data selesai
        state.error = action.error.message; // Menyimpan pesan error jika ada
      })
      .addCase(updatePelapor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePelapor.fulfilled, (state, action) => {
        state.pelapor = Array.isArray(action.payload) ? action.payload : [];
        state.loading = false;
      })
      .addCase(updatePelapor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(deletePelapor.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePelapor.fulfilled, (state, action) => {
        state.loading = false;
        state.pelapor = state.pelapor.filter(
          (pelapor) => pelapor.id !== action.payload
        );

        state.message = action.payload || "Pelapor berhasil dihapus";
      })
      .addCase(deletePelapor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        state.message =
          "Data ini ditambahkan oleh pelapor bukan oleh admin, tidak dapat dihapus";
      });
  },
});

export const { clearMessages } = pelaporSlice.actions;

export default pelaporSlice.reducer;
