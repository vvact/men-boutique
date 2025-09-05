import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../app/api";

// Initial state
const initialState = {
  products: [],
  loading: false,
  error: null,
};

// --- Fetch New Arrivals ---
export const fetchNewArrivals = createAsyncThunk(
  "newArrivals/fetchNewArrivals",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/products/new-arrivals/");
      return response.data; // array of products
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const newArrivalsSlice = createSlice({
  name: "newArrivals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewArrivals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewArrivals.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchNewArrivals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default newArrivalsSlice.reducer;
