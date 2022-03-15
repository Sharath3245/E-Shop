import React, { useEffect } from "react"; //Startscreen is for autologin for the user in the same device
import {
  View,
  Button,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../../constants/Colors";
import { useDispatch } from "react-redux";
import { authactions } from "../../store/reducers/Authenticate";
const Startscreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    const login = async () => {
      const userdata = await AsyncStorage.getItem("userdata");
      console.log(userdata, "userdata");
      if (!userdata) {
        navigation.navigate("Authcreate");
        return;
      }
      const data = JSON.parse(userdata); //parse is method converts strings to javascript objecct {}JSON.parse//
      // console.log(data)
      const expiredate = new Date(data.expiredate);
      console.log(data.expiredate,"sharath");
      console.log(expiredate <= new Date());
      if (expiredate <= new Date() || !data.token || !data.userid) {
        navigation.navigate("Authcreate");
        return;
      }
      dispatch(authactions.autologin(data))
      dispatch(authactions.navigate());
    };
    login().catch((err) => console.log(err));
  }, []);
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Startscreen;
