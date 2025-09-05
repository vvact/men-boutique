import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../app/api";

// --- Initial State ---
const initialState = {
  categories: [],
  categoryDetail: null,
  loading: false,
  error: null,
};

// --- Async Thunks ---

// Fetch all categories
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/categories/");
      return response.data; // array of categories
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Fetch single category detail by slug
export const fetchCategoryDetail = createAsyncThunk(
  "categories/fetchCategoryDetail",
  async (slug, { rejectWithValue }) => {
    try {
      const response = await api.get(`/categories/${slug}/`);
      return response.data; // single category object
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// --- Slice ---
const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    clearCategoryDetail(state) {
      state.categoryDetail = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch categories
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });

    // Fetch category detail
    builder
      .addCase(fetchCategoryDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoryDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryDetail = action.payload;
      })
      .addCase(fetchCategoryDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { clearCategoryDetail } = categorySlice.actions;
export default categorySlice.reducer;
