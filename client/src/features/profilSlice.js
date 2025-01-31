import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk untuk menambahkan profil
export const addProfil = createAsyncThunk(
  "profil/addProfil",
  async (formData, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.post(
        // "http://localhost:5000/api/v1/data-profil",
        "http://localhost:5000/api/v1/data-profil",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchProfil = createAsyncThunk("profil/fetchProfil", async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/v1/get-data-profil"
    );

    return response.data.data;
  } catch (error) {
    return error.message;
  }
});

export const fetchProfilbyid = createAsyncThunk(
  "profil.fetchProfilbyid",
  async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/get-data-profilid/${id}`
      );
      console.log("API Response:", response.data);

      return response.data.data || null;
    } catch (error) {
      console.error("API Error:", error.message);
      return error.message;
    }
  }
);
export const deleteProfil = createAsyncThunk(
  "profil/deleteProfil",
  async ({ id }, { dispatch }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:5000/api/v1/delete-profil/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data);
      dispatch(fetchProfil());
      return id;
    } catch (error) {
      console.log(error);
      return error.response?.data?.message || error.message || "Error delete";
    }
  }
);
export const updateProfil = createAsyncThunk(
  "profil/updateProfil",
  async ({ id, data }, rejectWithValue) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `http://localhost:5000/api/v1/update-profil/${id}`,
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
// Slice profil
const profilSlice = createSlice({
  name: "profil",
  initialState: {
    loading: false,
    profil: [],
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
      .addCase(addProfil.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProfil.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(addProfil.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(fetchProfil.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfil.fulfilled, (state, action) => {
        state.loading = false;
        state.profil = action.payload;
      })
      .addCase(fetchProfil.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(fetchProfilbyid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfilbyid.fulfilled, (state, action) => {
        state.profil = action.payload;
        state.loading = false;
      })
      .addCase(fetchProfilbyid.rejected, (state, action) => {
        state.error = action.error?.message;
        state.loading = false;
      })
      .addCase(updateProfil.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfil.fulfilled, (state, action) => {
        state.pelapor = Array.isArray(action.payload) ? action.payload : [];
        state.loading = false;
      })
      .addCase(updateProfil.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearMessages } = profilSlice.actions;

export default profilSlice.reducer;
