import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../app/api";

// Initial state
const initialState = {
  products: [],
  loading: false,
  error: null,
};

// --- Fetch Featured Products ---
export const fetchFeaturedProducts = createAsyncThunk(
  "featured/fetchFeaturedProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/products/featured/");
      return response.data; // already an array of products
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const featuredSlice = createSlice({
  name: "featured",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeaturedProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchFeaturedProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default featuredSlice.reducer;
