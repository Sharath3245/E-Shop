import React from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  Button,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/Colors";
import { actions } from "../../store/reducers/Cart";
import { itemsactions } from "../../store/reducers/Product reducer";

const Productdetail = (props) => {
 
  const ID = props.route.params.productid;
  //getitng params from props
  // console.log(ID);
  const selectedproducts = useSelector((state) =>
    state.items.availableproducts.find((pro) => pro.id === ID)
  );
  //   console.log(selectedproducts);
  const dispatch = useDispatch();
  const addtocart = () => {
    dispatch(actions.addtocart({id:selectedproducts.id,title:selectedproducts.title,price:selectedproducts.price}));
  };

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedproducts.imageUrl }} />
      <View style={styles.action}>
        <Button
          title="Add to cart"
          color={Colors.primary}
          onPress={addtocart}
        />
      </View>

      <Text style={styles.price}>Rs.{selectedproducts.price}</Text>
      <Text style={styles.description}>{selectedproducts.description}</Text>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  price: {
    fontSize: 20,
    textAlign: "center",
    color: "#888",
    marginVertical: 20,
  },
  description: {
    textAlign: "center",
    fontSize: 15,
    marginHorizontal: 20,
  },
  action: {
    marginVertical: 10,
    textAlign: "center",
    alignItems: "center",
  },
});
export default Productdetail;
