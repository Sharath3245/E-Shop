import React, { useState, useEffect } from "react";
import { View, Button, Text, StyleSheet, FlatList } from "react-native";
import Colors from "../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import { detailactions } from "../store/reducers/Details";

const Details = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const userid = useSelector((state) => state.auth.userid);
  console.log(userid,"userid");
  const getdetails = useSelector((state) => state.details.details);

  let details = [];

  useEffect(() => {
    const fetchdetails = async () => {
      const response = await fetch(
        `https://e-shop-28a82-default-rtdb.firebaseio.com/details/${userid}.json`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (data) {
          for (const key in data) {
            details.push({
              Fullname: data[key].Fullname,
              PhoneNo: data[key].PhoneNo,
              Address: data[key].Address,
              City: data[key].City,
              Pincode: data[key].Pincode,
            });
          }
          dispatch(detailactions.getdetails(details));
        }
      } else {
        throw Error("fetching details failed!");
      }
    };
    fetchdetails().catch((err) => {
      console.log(err);
    });
  });
  const render = (itemdata) => {
    return (
      <View style={styles.container}>
        <View style={styles.box}>
          <Text>{itemdata.item.Fullname}</Text>
        </View>
        <View style={styles.box}>
          <Text>{itemdata.item.PhoneNo}</Text>
        </View>
        <View style={styles.box}>
          <Text>{itemdata.item.Address}</Text>
        </View>
        <View style={styles.box}>
          <Text>{itemdata.item.City}</Text>
        </View>
        <View style={styles.box}>
          <Text>{itemdata.item.Pincode}</Text>
        </View>
      </View>
    );
  };
  let check = getdetails.length > 0;
  return (
    <View>
      {check && (
        <FlatList
          data={getdetails}
          keyExtractor={(item) => item.PhoneNo}
          renderItem={render}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",

    margin: 20,
    padding: 10,
    paddingBottom: 15,
    maxHeight: 330,
  },
  box: {
    padding: 7,
    borderBottomWidth: 1.5,
    borderColor: "#C0C0C0",
  },
});
export default Details;
