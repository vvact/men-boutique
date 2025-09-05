import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../app/api";

// --- Fetch products (list) ---
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (params = {}, { rejectWithValue }) => {
    try {
      const query = {};
      if (params.category && params.category !== "all") query.category = params.category;
      if (params.sort) query.sort = params.sort;

      const response = await api.get("/products/", { params: query });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// --- Fetch single product (detail) ---
export const fetchProductBySlug = createAsyncThunk(
  "products/fetchProductBySlug",
  async (slug, { rejectWithValue }) => {
    try {
      const response = await api.get(`/products/${slug}/`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const initialState = {
  products: [],
  product: null,
  listLoading: false,
  detailLoading: false,
  listError: null,
  detailError: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // --- Clear single product ---
    clearProduct(state) {
      state.product = null;
      state.detailError = null;
      state.detailLoading = false;
    },
  },
  extraReducers: (builder) => {
    // --- Product list ---
    builder.addCase(fetchProducts.pending, (state) => {
      state.listLoading = true;
      state.listError = null;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.listLoading = false;
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.listLoading = false;
      state.listError = action.payload || "Something went wrong";
    });

    // --- Product detail ---
    builder.addCase(fetchProductBySlug.pending, (state) => {
      state.detailLoading = true;
      state.detailError = null;
      state.product = null; // clear previous product while loading new one
    });
    builder.addCase(fetchProductBySlug.fulfilled, (state, action) => {
      state.detailLoading = false;
      state.product = action.payload;
    });
    builder.addCase(fetchProductBySlug.rejected, (state, action) => {
      state.detailLoading = false;
      state.detailError = action.payload || "Something went wrong";
    });
  },
});

export const { clearProduct } = productSlice.actions;
export default productSlice.reducer;
