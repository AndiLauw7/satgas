import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk untuk menambahkan profil
export const addTerlapor = createAsyncThunk(
  "terlapor/addTerlapor",
  async (formData, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/v1/add-terlapor",
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

// Slice profil
const terlaporSlice = createSlice({
  name: "terlapor",
  initialState: {
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
      .addCase(addTerlapor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTerlapor.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(addTerlapor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { clearMessages } = terlaporSlice.actions;

export default addTerlapor.reducer;
