import PRODUCTS from "../../data/dummydata.js";
import {createSlice} from "@reduxjs/toolkit";
const state={
    availableproducts:PRODUCTS,
    userproducts:PRODUCTS.filter(pro=>pro.ownerId==="u1")
};


const Items=createSlice({
name:"Items",
initialState:state,
reducers:{
    productreducer(state){
        // console.log("sans sharaht");
        return state
    }
}
});




// const Productreducer=(state=initialstate,action)=>{
//     return state
// };
export const itemsactions=Items.actions
export default Items;