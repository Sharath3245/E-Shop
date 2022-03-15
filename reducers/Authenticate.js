import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useDispatch} from "react-redux"
import { detailactions } from "./Details";
const initialState = {
  email: null,
  userid: null,
  token: null,
  signingin:true
};

const Auth = createSlice({
  name: "Auth",
  initialState: initialState,
  reducers: {
    SignIn(state, action) {
        const data = action.payload;
        console.log(data,"at redux");
        state.email=data.email,
        state.token=data.idToken,
        state.userid=data.localId
       },
    SignUp(state, action) {
      const data = action.payload;
      state.email=data.email,
      state.token=data.idToken,
      state.userid=data.localId
    },
 navigate(state,action){
   console.log("auth rdux");
     state.signingin=false;
     
 },
 autologin(state,action){
    const data=action.payload
    state.email=data.email
    state.token=data.token,
    state.userid=data.userid
 },
 logout(state,action){
  
   console.log("logut recieved");
     state.email= null,
     state.userid= null,
      state.token=null,
     state.signingin=true
      AsyncStorage.removeItem("userdata")
      
  console.log(AsyncStorage.getItem("userdata"),"12333333");
 }
  },
});
export const authactions = Auth.actions;
export default Auth;
