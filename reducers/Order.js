import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Order from "../../models/Ordersmodel";
// import { v4 as uuidv4 } from "uuid";
const state = {
  orderitems: [],
  isloading: false,
  serverdata: null,
  orderserver: {},
  fetchorders: [],
};
export const fetchorder = createAsyncThunk(
  "orders/fetchorder",
  async ({ rejectWithValue }) => {
    console.log("recieved");

    try {
      const response = await fetch(
        "https://e-shop-28a82-default-rtdb.firebaseio.com/orders.json",
        {
          method: "GET",
        }
      );
      const data = await response.json();
      return data;
    } catch (err) {
      return rejectWithValue("some error");
    }
  }
);

const Orders = createSlice({
  name: "orders",
  initialState: state,
  reducers: {
    orderitems(state, action) {
      // console.log(state.orderitems);
      // console.log("recieved yes");
      const items = action.payload;
      // console.log(items)
      const totalamount = items.totalamount;
      const products = items.item;
      // console.log(typeof new Date().toString());
      // console.log(totalamount);
      // console.log(products)
      var id = Math.floor(Math.random() * 1000) + 1;
      const neworder = new Order(
        id,
        products,
        totalamount,
        new Date().toLocaleString()
      );
      state.orderserver = neworder;
      state.orderitems.push(neworder);
    },
    fetchorders(state, action) {
      const orders = action.payload;
      state.fetchorders = orders;
    },
  },

  extraReducers: {
    [fetchorder.pending]: (state) => {
      state.isloading = true;
    },
    [fetchorder.fulfilled]: (state, action) => {
      state.serverdata = action.payload;
      console.log(state.serverdata,"serverdata");
      state.isloading = false;
    },
    [fetchorder.rejected]: (state, action) => {
      state.isloading = true;
    },
  },
});
export const orderactions = Orders.actions;
export default Orders;
