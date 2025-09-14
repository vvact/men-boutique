import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../app/api";
import { fetchCart } from "../cart/cartSlice";

// ----------------- Initial state -----------------
const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  access: localStorage.getItem("access") || null,
  refresh: localStorage.getItem("refresh") || null,
  message: null,
  loading: false,
  error: null,
};

// ----------------- Async Thunks -----------------

// Email/password login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.post("/accounts/login/", credentials);
      // Merge guest cart if necessary
      await dispatch(mergeCartAfterLogin());
      return response.data; // { message, user, access, refresh }
    } catch (err) {
      return rejectWithValue(err.response?.data || { detail: "Login failed" });
    }
  }
);

// Google login
export const loginWithGoogle = createAsyncThunk(
  "auth/loginWithGoogle",
  async (access_token, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.post("/accounts/google/", { access_token });
      await dispatch(mergeCartAfterLogin());
      return response.data; // { message, user, access, refresh }
    } catch (err) {
      return rejectWithValue(err.response?.data || { detail: "Google login failed" });
    }
  }
);

// Merge guest cart into user cart
export const mergeCartAfterLogin = createAsyncThunk(
  "auth/mergeCartAfterLogin",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await api.post("/cart/merge/");
      await dispatch(fetchCart());
      return true;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ----------------- Slice -----------------
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.access = null;
      state.refresh = null;
      state.message = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("user");
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Email/password login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.access = action.payload.access;
        state.refresh = action.payload.refresh;
        state.message = action.payload.message;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("access", action.payload.access);
        localStorage.setItem("refresh", action.payload.refresh);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.detail || "Login failed";
      })

      // Google login
      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.access = action.payload.access;
        state.refresh = action.payload.refresh;
        state.message = action.payload.message;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("access", action.payload.access);
        localStorage.setItem("refresh", action.payload.refresh);
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.detail || "Google login failed";
      })

      // Merge guest cart after login
      .addCase(mergeCartAfterLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(mergeCartAfterLogin.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(mergeCartAfterLogin.rejected, (state, action) => {
        state.loading = false;
        console.error("Cart merge failed:", action.payload);
      });
  },
});

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
