import React from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { useSelector } from "react-redux";
import Productitem from "../../components/shop/Productitem";

const Productoverview = (props) => {
  const overview = (itemdata) => {
    return (
      <Productitem
        title={itemdata.item.title}
        image={itemdata.item.imageUrl}
        price={itemdata.item.price}
        onviewdetail={() => {
          props.navigation.navigate("Productdetails", {
            productid: itemdata.item.id,
            title: itemdata.item.title,
          });
        }}
        oncart={() => {props.navigation.navigate("Cart")}}
      />
    );
  };
  const products = useSelector((state) => state.items.availableproducts);
//  console.log(products);
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={overview}
    />
  );
};
const styles = StyleSheet.create({});
export default Productoverview;
