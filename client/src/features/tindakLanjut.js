/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTindakLanjut = createAsyncThunk(
  "tindakLanjut/fetchTindakLanjut",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/getall-tindaklanjut"
      );
      return response.data.data;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
);
export const addTindakLanjut = createAsyncThunk(
  "tindakLanjut/addTindakLanjut",
  async (data, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/v1/add-tindaklanjut",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      console.log(error.message);

      return rejectWithValue(error.response.data);
    }
  }
);

export const updateTindakLanjutStatus = createAsyncThunk(
  "tindakLanjut/updateStatus",
  async ({ id, status_laporan }) => {
    const response = await axios.put(
      `http://localhost:5000/api/v1/update-tindak-lanjut/${id}`,
      {
        status_laporan,
      }
    );
    return response.data;
  }
);

const tindakLanjutSlice = createSlice({
  name: "tindakLanjut",
  initialState: {
    loading: false,
    tindakLanjut: [],
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
      .addCase(addTindakLanjut.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTindakLanjut.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(addTindakLanjut.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(fetchTindakLanjut.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTindakLanjut.fulfilled, (state, action) => {
        state.loading = false;
        state.tindakLanjut = action.payload;
      })
      .addCase(fetchTindakLanjut.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(updateTindakLanjutStatus.fulfilled, (state, action) => {
        state.tindakLanjut = state.tindakLanjut.map((item) =>
          item.id === action.payload.tindakLanjuts.id
            ? action.payload.tindakLanjuts
            : item
        );
      });
  },
});

export const { clearMessages } = tindakLanjutSlice.actions;
export default tindakLanjutSlice.reducer;
