import React, { useState, useEffect } from "react";
import { StyleSheet, Text, Button, View, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Orderitems from "../../components/orderitems";
import Colors from "../../constants/Colors";
import { orderactions } from "../../store/reducers/Order";
const Orderscreen = (props) => {
  // const orderdepend=useSelector((state)=>state.orders.orderitems)
  const[loading,setloading]=useState();
  const fetchorders = useSelector((state) => state.orders.fetchorders);

  const dispatch = useDispatch();
  let orderdata = [];
  const userid=useSelector(state=>state.auth.userid)

  useEffect(() => {
    const fetchorders = async () => {
      const response = await fetch(
        `https://e-shop-28a82-default-rtdb.firebaseio.com/orders/${userid}.json`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      // console.log(data,"data");
      // console.log(orderdata,"tell");
      for (const key in data) {
        orderdata.push({
          id: data[key].id,
          date: data[key].date,
          totalamount: data[key].totalamount,
          items: data[key].items,
        });
      }
      dispatch(orderactions.fetchorders(orderdata));
      // console.log(orderdata,"orderdata");
    };

    fetchorders().catch((error) => console.log(error));
  });

  let check = fetchorders.length > 0;
  // console.log(check);
  const orderrender = (itemdata) => {
    // console.log(itemdata);
    return (
      <Orderitems
        totalamount={itemdata.item.totalamount}
        date={itemdata.item.date}
        items={itemdata.item.items}
      />
    );
  };
  const Empty = (
    <View style={styles.empty}>
      <Text style={styles.please}>No orders Yet...</Text>
    </View>
  );

  return (
    <View>
      {!check && Empty}
      <FlatList
        data={fetchorders}
        keyExtractor={(item) => item.id}
        renderItem={orderrender}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  orders: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  please: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  empty: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    height: 50,
    margin: 20,
    marginTop: 30,
    justifyContent: "center",
  },
});

export default Orderscreen;
