import React, { useState } from "react";
import { View, Button, StyleSheet, Text, TouchableOpacity } from "react-native";
import Profile from "./Profile";
import Colors from "../../constants/Colors";
import Details from "../../components/Details";
const Show = () => {
  const [show, setshow] = useState(true);
  const load = () => {
    setshow((prevstate) => !prevstate);
  };
  return (
    <View>
      <TouchableOpacity onPress={load}>
        <View style={styles.touch}>
          {show ? (
            <Text
              style={{
                textAlign: "center",
                fontSize: 15,
                color: "white",
                fontWeight: "bold",
              }}
            >
              Show details
            </Text>
          ) : (
            <Text
              style={{
                textAlign: "center",
                fontSize: 15,
                color: "white",
                fontWeight: "bold",
              }}
            >
              Hide details
            </Text>
          )}
        </View>
      </TouchableOpacity>
      {show ? <Profile /> : <Details />}
    </View>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  touch: {
    alignItems: "center",
    width: 100,
    height: 40,
    marginTop: 25,
    marginLeft: 120,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    borderRadius: 10,
  },
});
export default Show;
