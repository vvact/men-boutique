import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../app/api";

// Initial state
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

// Async thunk for registration
export const registerUser = createAsyncThunk(
  "register/registerUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post("/accounts/register/", credentials);
      return response.data; // { message, user, access, refresh }
    } catch (err) {
      return rejectWithValue(err.response?.data || { detail: "Registration failed" });
    }
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    clearRegisterState: (state) => {
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.access = action.payload.access;
        state.refresh = action.payload.refresh;
        state.message = action.payload.message;

        // Persist in localStorage
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("access", action.payload.access);
        localStorage.setItem("refresh", action.payload.refresh);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.detail || "Registration failed";
      });
  },
});

export const { clearRegisterState } = registerSlice.actions;
export default registerSlice.reducer;
