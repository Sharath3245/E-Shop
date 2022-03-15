import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import Productreducer from "./store/reducers/Product reducer";
import StackNavigator from "./Navigation/Shopnavigation";
import store from "./store/reducers";


export default function App() {
  
  return (
    
        <Provider store={store}>
<StackNavigator/>
   </Provider>
    
 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
  },
  // root:{
  //   backgroundColor:"white"
  // }
});
