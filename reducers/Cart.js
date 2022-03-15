import { createSlice } from "@reduxjs/toolkit";

const state = {
  products: [],
  totalquantity: 0,
  totalamount: 0,
};
const Cart = createSlice({
  name: "cart",
  initialState: state,
  reducers: {
    addtocart(state, action) {
      const item = action.payload;
      // console.log(item,"sss")
      state.totalquantity++;
      //   console.log(item);
      const existing = state.products.find((pro) => pro.id === item.id);
      // console.log(existing,"ddd")

      if (existing) {
        const exisitingindex = state.products.findIndex(
          (pro) => pro.id === existing.id
        );
        // console.log(exisitingindex);
        state.products[exisitingindex].quantity++;
        state.products[exisitingindex].updatedprice += item.price;
        //  console.log(state.totalamount)
        //  console.log(state)
        // console.log( state.products[exisitingindex].updatedprice)
        state.totalamount += item.price;
        //  console.log(state.totalamount)

        // console.log(state.totalamount)
      } else {
        state.products.push({
          id: item.id,
          title: item.title,
          quantity: 1,
          price: item.price,
          updatedprice: item.price,
        });
        state.totalamount += item.price;
        // console.log(state.products)
      }
    },
    removefromcart(state, action) {
      // console.log("remove");
      const item = action.payload;
      // console.log(item);
      state.totalquantity--;
      if (item.quantity === 1) {
        state.products = state.products.filter((pro) => pro.id !== item.id);
        state.totalamount -= item.price;
      } else {
        const existing = state.products.find((pro) => pro.id === item.id);
        const exisitingindex = state.products.findIndex(
          (pro) => pro.id === existing.id
        );
        state.products[exisitingindex].quantity--;
        state.products[exisitingindex].updatedprice -= item.price;
        state.totalamount -= item.price;
      }
    },
    ordernow(state, action) {
      // console.log("order empty cart");
      state.products.length = 0;
      // state.totalamount=0;
      // console.log(state.totalamount)
      
      state.totalamount = 0;
      state.totalquantity = 0;
      // console.log(state.totalamount);
      // console.log(state.totalquantity);
    },
  },
});

export const actions = Cart.actions;
export default Cart;
