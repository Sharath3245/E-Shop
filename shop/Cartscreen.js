import {
  View,
  Text,
  ScrollView,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Orders, { orderactions } from "../../store/reducers/Order";
import { actions } from "../../store/reducers/Cart";
import Cartitem from "../../components/shop/Cartitem";
import Colors from "../../constants/Colors";
import Ordermodal from "../../components/Modal";
import { useState } from "react";
const Cartscreen = (props) => {
  const [isloading, setisloading] = useState(false);
  const cartproducts = useSelector((state) => state.cart.products);
  // console.log(typeof cartproducts)
  const totalamount = useSelector((state) => state.cart.totalamount);
  const totalquantity = useSelector((state) => state.cart.totalquantity);
  let check = cartproducts.length > 0;
  //  console.log(cartproducts,"cart");
  const senddata =async () => {
    setisloading(true);
   dispatch(
      orderactions.orderitems({
        item: cartproducts,
        totalamount: totalamount,
      }),
      setisloading(false),
      dispatch(actions.ordernow())
    );
  };
  const cartrender = (itemdata) => {
    return (
      <Cartitem
        title={itemdata.item.title}
        updatedprice={itemdata.item.updatedprice}
        price={itemdata.item.price}
        quantity={itemdata.item.quantity}
        id={itemdata.item.id}
      />
    );
  };
  const dispatch = useDispatch();

  const Order = (
    <View style={styles.container}>
      <View style={styles.totalamount}>
        <Text style={styles.total}>Total:</Text>
        <Text style={styles.amount}>{totalamount}/-</Text>
      </View>

      {isloading ? 
        <ActivityIndicator size="small" color={Colors.primary} />
       : 
        <TouchableOpacity onPress={senddata}>
          
          <Text style={styles.ordernow}>Order Now</Text>
        </TouchableOpacity>
      }
    </View>
  );

  const Empty = (
    <View style={styles.empty}>
      <Text style={styles.please}>Please add items to your cart</Text>
    </View>
  );
  return (
    <View>
      {check ? Order : Empty}
      <FlatList
        data={cartproducts}
        keyExtractor={(item) => item.id}
        renderItem={cartrender}
      />
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
    height: 50,
    margin: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  totalamount: {
    flexDirection: "row",
    flex: 1,
    marginLeft: 5,
    marginTop: 10,
  },
  total: {
    fontSize: 18,
    fontWeight: "bold",
  },
  amount: {
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: "bold",
    color: Colors.primary,
  },
  ordernow: {
    textAlign: "center",
    marginRight: 7,
    color: "orange",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
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
  please: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  modal: {
    flex: 1,
    justifyContent: "center",
  },
});
export default Cartscreen;
