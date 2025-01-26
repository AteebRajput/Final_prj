import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const ORDER_API = "http://localhost:5000/api/order"

export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  const response = await axios.get(`${ORDER_API}/get-orders`);
  return response.data;
});

export const fetchFarmerOrders = createAsyncThunk(
  "farmerOrders/fetchFarmerOrders",
  async (_, { rejectWithValue }) => {
    const farmerId = JSON.parse(localStorage.getItem("userId"))?.userId;
    try {
      const response = await axios.get(`${ORDER_API}/get-orders/${farmerId}`);
      return response.data.orders;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Failed to fetch orders.");
    }
  }
);


export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${ORDER_API}/${orderId}/status`, { status });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Failed to update order status.");
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState: { orders: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const updatedOrder = action.payload.order;
        const index = state.orders.findIndex((order) => order._id === updatedOrder._id);
        if (index !== -1) {
          state.orders[index] = updatedOrder;
        }
      })
      .addCase(fetchFarmerOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFarmerOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchFarmerOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const orderReducer =  ordersSlice.reducer;
export default orderReducer