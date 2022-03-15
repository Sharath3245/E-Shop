import { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import Colors from "../constants/Colors";

const Orderitems = (props) => {
  const [showdetails, setshowdetails] = useState(false);
  const details = showdetails ? "Hide details" : "Show details";
  return (
    <View style={styles.orderitem}>
      <View style={styles.detail}>
        <Text style={styles.totalamount}>Rs.{props.totalamount}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <Button
        color={Colors.primary}
        title={details}
        onPress={() => {
          setshowdetails((prevsate) => !prevsate);
        }}
      />
      <View>
        {showdetails &&
          props.items.map((item) => (
            <View key={item.id} style={styles.detailsmap}>
              <View style={styles.text}>
                <Text>
                  {item.quantity}x
                  <Text style={styles.title} numberOfLines={2}>
                    {item.title}
                  </Text>
                </Text>
              </View>

              <Text style={styles.totalamount}>Rs.{item.updatedprice}</Text>
            </View>
          ))}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  orderitem: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    // height: 300,
    margin: 20,
    padding: 10,
    paddingBottom: 15,
    flex: 1,
    
  },
  detail: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  totalamount: {
    fontWeight: "bold",
  },
  date: {
    color: "#888",
  },
  detailsmap: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 10,
    marginVertical: 8,
  },
  title: {
    color: Colors.primary,
    alignItems: "center",
    textAlign: "center",
    width: 50,
  },
  text:{
      width:105
  }
});
export default Orderitems;
