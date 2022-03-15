import {configureStore} from "@reduxjs/toolkit";
import Items from "./Product reducer";
import Cart from "./Cart";
import Orders from "./Order";
import Auth from "./Authenticate";
import Details from "./Details";

const store=configureStore({
    reducer:{items:Items.reducer,cart:Cart.reducer,orders:Orders.reducer,auth:Auth.reducer,details:Details.reducer},
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;