import React from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import Colors from "../constants/Colors";
import logo from "../components/images/Cart.png";
import { SimpleLineIcons } from "@expo/vector-icons";
import { authactions } from "../store/reducers/Authenticate";
import { useDispatch, useSelector } from "react-redux";
const Customdrawer = (props) => {
  const dispatch = useDispatch();
  const useremail = useSelector((state) => state.auth.email);
  // console.log(useremail);
  const logout = () => {
    // console.log("logout recieved");
    dispatch(authactions.logout());
  };
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View>
          <Image source={logo} style={styles.image} />
          <View style={{marginLeft:30,marginBottom:10}}>
            <Text>{useremail}</Text>
          </View>
        
        </View>

        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={styles.down}>
     
        <View>
          <TouchableOpacity style={styles.logout} onPress={logout}>
            <SimpleLineIcons
              name="logout"
              size={24}
              color="black"
              style={styles.icon}
            />
            <Text
              style={{ color: Colors.primary, fontSize: 18, marginLeft: 10 }}
            >
              Logout
            </Text>
          </TouchableOpacity>
         
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 110,
    height: 110,
    marginLeft: 50,
  },
  icon: {
    marginLeft: 10,
  },
  logout: {
    flexDirection: "row",
    marginTop: 30,
  },
  down: {
    marginBottom: 70,
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
});
export default Customdrawer;
