// src/features/moments/momentSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../app/api";

const initialState = {
  moments: [],
  loading: false,
  error: null,
};

// --- Async thunk to fetch moments ---
export const fetchMoments = createAsyncThunk(
  "moments/fetchMoments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/moments/");
      return response.data.results; // use results array
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// --- Slice ---
const momentSlice = createSlice({
  name: "moments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMoments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMoments.fulfilled, (state, action) => {
        state.loading = false;
        state.moments = action.payload;
      })
      .addCase(fetchMoments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default momentSlice.reducer;
