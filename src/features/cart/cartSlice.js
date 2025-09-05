// src/features/cart/cartSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../app/api";

// ----------------- Async Thunks -----------------
export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const res = await api.get("cart/");
  return res.data;
});

export const addToCartBackend = createAsyncThunk(
  "cart/addToCartBackend",
  async (payload) => {
    const res = await api.post("cart/add_item/", payload);
    return res.data;
  }
);

export const updateCartItemBackend = createAsyncThunk(
  "cart/updateCartItemBackend",
  async (payload) => {
    const res = await api.post("cart/update_item/", payload);
    return res.data;
  }
);

export const removeCartItemBackend = createAsyncThunk(
  "cart/removeCartItemBackend",
  async (payload) => {
    const res = await api.post("cart/remove_item/", payload);
    return res.data;
  }
);

export const clearCartBackend = createAsyncThunk(
  "cart/clearCartBackend",
  async () => {
    const res = await api.post("cart/clear/");
    return res.data.cart;
  }
);

// ----------------- Initial State -----------------
const initialState = {
  cart: null,
  loading: false,
  error: null,
};

// ----------------- Slice -----------------
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { productId, variantId, price, maxQuantity } = action.payload;
      const existing = state.cart?.items.find(
        (item) =>
          item.productId === productId &&
          (variantId ? item.variantId === variantId : !item.variantId)
      );

      if (existing) {
        existing.quantity = Math.min(existing.quantity + 1, maxQuantity);
      } else if (state.cart) {
        state.cart.items.push({ ...action.payload, quantity: 1 });
      }

      if (state.cart) {
        state.cart.cart_total = state.cart.items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        state.cart.item_count = state.cart.items.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
      }
    },

    updateQuantity: (state, action) => {
      const { productId, variantId, quantity } = action.payload;
      const item = state.cart?.items.find(
        (i) =>
          i.productId === productId &&
          (variantId ? i.variantId === variantId : !i.variantId)
      );

      if (item) item.quantity = Math.min(quantity, item.maxQuantity);

      if (state.cart) {
        state.cart.cart_total = state.cart.items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        state.cart.item_count = state.cart.items.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
      }
    },

    removeFromCart: (state, action) => {
      const { item_id } = action.payload;
      if (state.cart) {
        state.cart.items = state.cart.items.filter((i) => i.item_id !== item_id);
        state.cart.cart_total = state.cart.items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        state.cart.item_count = state.cart.items.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
      }
    },

    clearCart: (state) => {
      if (state.cart) {
        state.cart.items = [];
        state.cart.cart_total = 0;
        state.cart.item_count = 0;
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch cart";
      })
      .addCase(addToCartBackend.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(updateCartItemBackend.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(removeCartItemBackend.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(clearCartBackend.fulfilled, (state, action) => {
        state.cart = action.payload;
      });
  },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
