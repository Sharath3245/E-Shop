import React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../../store/reducers/Cart";
const Cartitem = (props) => {
  const dispatch = useDispatch();
  const additem = () => {
    // console.log("recieved");
    // const actualprice=(props.price-(props.quantity-1*props.price))
    dispatch(
      actions.addtocart({
        id: props.id,
        title: props.title,
        price: props.price,
        updatedprice: props.updatedprice,
      })
    );
  };

  const removeitem = () => {
    dispatch(
      actions.removefromcart({
        id: props.id,
        price: props.price,
        quantity: props.quantity,
        updatedprice:props.updatedprice
      })
    );
  };
  return (
    <View style={styles.cartitem}>
      <View style={styles.col}>
        <Text style={styles.title}>{props.title}</Text>
        <View>
          <Text>X {props.quantity}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.price}>Rs.{props.updatedprice}</Text>
      </View>
      <View style={styles.icons}>
        <TouchableOpacity style={styles.box} onPress={additem}>
          <Ionicons name="add" size={26} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.box}>
          <AntDesign
            name="minus"
            size={26}
            color="black"
            onPress={removeitem}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  cartitem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    flex: 1,
    marginVertical: 13,
    textAlign: "center",
  },
  col: {
    flexDirection: "column",
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  price: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  title: {
    fontSize: 18,
    width: 100,
    textAlign: "center",
  },
  icons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    // backgroundColor:"black"
  },
  box: {
    backgroundColor: "#ccc",
    marginRight: 8,
  },
});
export default Cartitem;
