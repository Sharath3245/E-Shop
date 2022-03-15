import { createSlice } from "@reduxjs/toolkit";
const initialState={
    details:[],
    hide:true
}
const Details=createSlice({
    name:"Details",
    initialState:initialState,
    reducers:{
        getdetails(state,action){
            state.details=action.payload
            if(action.payload){
                state.hide=false
            }
        },
        removedetails(state){
            state.details=[]
        }
    }

})
export const detailactions=Details.actions
export default Details;