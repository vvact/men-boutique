// src/features/cart/cartSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../app/api";

// ----------------- Async Thunks -----------------

export const fetchCart = createAsyncThunk("cart/fetchCart", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get("cart/");
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

export const addToCartBackend = createAsyncThunk(
  "cart/addToCartBackend",
  async ({ productId, variantId, quantity }, { rejectWithValue }) => {
    try {
      const payload = { product_id: productId, quantity: quantity ?? 1 };
      if (variantId) payload.variant_id = variantId;
      const res = await api.post("cart/add_item/", payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const updateCartItemBackend = createAsyncThunk(
  "cart/updateCartItemBackend",
  async ({ itemId, quantity }, { rejectWithValue }) => {
    try {
      const res = await api.post("cart/update_item/", { item_id: itemId, quantity });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const removeCartItemBackend = createAsyncThunk(
  "cart/removeCartItemBackend",
  async ({ itemId }, { rejectWithValue }) => {
    try {
      const res = await api.post("cart/remove_item/", { item_id: itemId });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const clearCartBackend = createAsyncThunk(
  "cart/clearCartBackend",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.post("cart/clear/");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ----------------- Initial State -----------------
const initialState = {
  cart: { items: [], cart_total: 0, item_count: 0 },
  loading: false,           // for fetching the whole cart
  operationLoading: false,  // for add/update/remove/clear
  error: null,
  previousCart: null,       // for rollback
};

// ----------------- Helpers -----------------
function recalcTotals(cart) {
  cart.cart_total = cart.items.reduce((sum, i) => sum + i.line_total, 0);
  cart.item_count = cart.items.reduce((sum, i) => sum + i.quantity, 0);
}

// ----------------- Slice -----------------
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    saveCartSnapshot: (state) => {
      state.previousCart = JSON.parse(JSON.stringify(state.cart));
    },

    addToCart: (state, action) => {
      const { productId, variantId, unit_price, max_quantity } = action.payload;
      const existing = state.cart?.items.find(
        (item) =>
          item.product === productId &&
          (variantId ? item.variant_id === variantId : !item.variant_id)
      );

      if (existing) {
        existing.quantity = Math.min(existing.quantity + 1, max_quantity || existing.quantity + 1);
        existing.line_total = existing.quantity * existing.unit_price;
      } else {
        state.cart.items.push({
          item_id: Date.now(), // temp ID
          product: productId,
          variant_id: variantId || null,
          quantity: 1,
          unit_price,
          line_total: unit_price,
        });
      }

      recalcTotals(state.cart);
    },

    updateQuantity: (state, action) => {
      const { itemId, quantity } = action.payload;
      const item = state.cart?.items.find((i) => i.item_id === itemId);
      if (item) {
        item.quantity = quantity;
        item.line_total = item.unit_price * quantity;
      }
      recalcTotals(state.cart);
    },

    removeFromCart: (state, action) => {
      const { itemId } = action.payload;
      state.cart.items = state.cart.items.filter((i) => i.item_id !== itemId);
      recalcTotals(state.cart);
    },

    clearCart: (state) => {
      state.cart.items = [];
      recalcTotals(state.cart);
    },

    rollbackCart: (state) => {
      if (state.previousCart) {
        state.cart = state.previousCart;
        state.previousCart = null;
      }
    },
  },

  extraReducers: (builder) => {
    // ---------- Fetch ----------
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
        state.error = action.payload || "Failed to fetch cart";
      })

      // ---------- Backend success ----------
      .addCase(addToCartBackend.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.previousCart = null;
      })
      .addCase(updateCartItemBackend.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.previousCart = null;
      })
      .addCase(removeCartItemBackend.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.previousCart = null;
      })
      .addCase(clearCartBackend.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.previousCart = null;
      })

      // ---------- Backend error → rollback ----------
      .addCase(addToCartBackend.rejected, (state, action) => {
        state.error = action.payload || "Add failed";
        if (state.previousCart) state.cart = state.previousCart;
      })
      .addCase(updateCartItemBackend.rejected, (state, action) => {
        state.error = action.payload || "Update failed";
        if (state.previousCart) state.cart = state.previousCart;
      })
      .addCase(removeCartItemBackend.rejected, (state, action) => {
        state.error = action.payload || "Remove failed";
        if (state.previousCart) state.cart = state.previousCart;
      })
      .addCase(clearCartBackend.rejected, (state, action) => {
        state.error = action.payload || "Clear failed";
        if (state.previousCart) state.cart = state.previousCart;
      })

      // ---------- Matchers (MUST come last) ----------
      .addMatcher(
        (action) =>
          action.type.startsWith("cart/") && action.type.endsWith("/pending"),
        (state) => {
          state.operationLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("cart/") &&
          (action.type.endsWith("/fulfilled") || action.type.endsWith("/rejected")),
        (state) => {
          state.operationLoading = false;
        }
      );
  },
});

export const {
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
  saveCartSnapshot,
  rollbackCart,
} = cartSlice.actions;

export default cartSlice.reducer;
