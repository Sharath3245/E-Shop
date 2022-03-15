import React, { useState, useEffect } from "react";
import {
  Button,
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useSelector } from "react-redux";
import Colors from "../../constants/Colors";

const Profile = () => {
  //   let details = [];
  const [full, setfull] = useState();
  const [phone, setphone] = useState();
  const [address, setaddress] = useState();
  const [city, setcity] = useState();
  const [pincode, setpincode] = useState();
  const token = useSelector((state) => state.auth.token);
  const userid = useSelector((state) => state.auth.userid);
  const [loading, setloading] = useState(false);

  const submit = () => {
    console.log(full, address, phone, city, pincode);
    const options = {
      method: "POST",
      body: JSON.stringify({
        Fullname: full,
        PhoneNo: phone,
        Address: address,
        City: city,
        Pincode: pincode,
      }),
      headers: {
        "Content-type": "application/json",
      },
    };
    fetch(
      `https://e-shop-28a82-default-rtdb.firebaseio.com/details/${userid}.json?auth=${token}`,
      options
    )
      .then(async (res) => {
        if (res.ok) {
          return res.json().then((data) => {
            console.log(data);
          });
        } else {
          const data = await res.json();
          console.log(data, "data");
          let message = "sending details failed";
          throw new Error(message);
        }
      })
      .catch((err) => console.log(err));
      setloading(false)
    setaddress(), setphone(), setcity(), setfull(), setpincode();

    // const details = async () => {
    //   setloading(true);
    //   const response = await fetch(

    //   );
    //   if(response.ok) {
    //     setloading(false);
    //     const data = await response.json();
    //     console.log(data);
    //   } else {
    //     setloading(false);
    //     throw new Error("sending profile details failed!");
    //   }

    // };
    // details().catch((err) => console.log(err));

    // setshow((prevstate) => !prevstate);
  };

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.box}>
          <TextInput
            placeholder="Full Name"
            autoComplete="off"
            value={full}
            onChangeText={(e) => {
              setfull(e);
            }}
          />
        </View>
        <View style={styles.box}>
          <TextInput
            placeholder="Phone No."
            keyboardType="numeric"
            autoComplete="off"
            value={phone}
            onChangeText={(e) => {
              setphone(e);
            }}
          />
        </View>
        <View style={styles.box}>
          <TextInput
            placeholder="Address"
            autoComplete="off"
            value={address}
            onChangeText={(e) => {
              setaddress(e);
            }}
          />
        </View>
        <View style={styles.box}>
          <TextInput
            placeholder="City"
            autoComplete="off"
            value={city}
            onChangeText={(e) => {
              setcity(e);
            }}
          />
        </View>
        <View style={styles.box}>
          <TextInput
            placeholder="Pincode"
            keyboardType="numeric"
            value={pincode}
            onChangeText={(e) => {
              setpincode(e);
            }}
          />
        </View>
        <View style={styles.button}>
          {loading ? (
            <ActivityIndicator size="small" color={Colors.primary} />
          ) : (
            <TouchableOpacity onPress={submit}>
              <View style={styles.touch}>
                <Text style={{ color: "white", fontWeight: "bold" }}>Add</Text>
              </View>
            </TouchableOpacity>
          )}
          {/* <TouchableOpacity style={styles.edit}>
              <Text style={{ fontWeight: "bold" }}>Edit details</Text>
            </TouchableOpacity> */}
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  thanks: {
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
    alignItems: "center",
  },
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
  button: {
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  touch: {
    width: 70,
    height: 30,
    backgroundColor: Colors.primary,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    borderRadius: 5,
  },
});
export default Profile;
