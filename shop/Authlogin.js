import React, { useState } from "react";
import {
  Button,
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import logo from "../../components/images/Cart.png";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../constants/Colors";
import { authactions } from "../../store/reducers/Authenticate";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = (props) => {
  // const [auth,setauth]=useState({Email:"",Password:""})
  const navigation = useNavigation();
  const [isloading, setisloading] = useState(false);
  const [Email, setEmail] = useState();
  const [Password, setPassword] = useState();
  const dispatch = useDispatch();
  // const tokens=useSelector(state=>state.auth.token)
  // console.log(tokens,"tokens");

  const Submit = async () => {
    // console.log("login sharath");
    const date = new Date().getTime();
    // console.log(date);
 setisloading(true);
    await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCmvp3oT5_K82HUaNPsIQ9S4E7_r0M2gfU",
      {
        method: "POST",
        body: JSON.stringify({
          email: Email,
          password: Password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-type": "application/json",
        },
      }
    )
      .then(async (res) => {
        if (res.ok) {
          return res.json().then((data) => {
            console.log(data),
              dispatch(authactions.SignIn(data)),
              dispatch(authactions.navigate()),
              savedatatostorage(
                data.email,
                data.idToken,
                data.localId,
                new Date(date + parseInt(data.expiresIn) * 100000)
              ); //Milliseconds conversion for new date object for expiration of async token in storage
          });
        } else {
          const data = await res.json();
          console.log(data, "data");
          let error = "authentication failed";
          throw new Error(error);
        }
      })
      .then((data) => console.log(data, "data"))
      .catch((err) => console.log(err,"netwrok"));
    setisloading(false);
    setEmail(), setPassword();
  };
  const savedatatostorage = (email,token, userid, expiredate) => {
    console.log("recievd async");
    AsyncStorage.setItem(
      "userdata",
      JSON.stringify({
        email:email,
        token: token,
        userid: userid,
        expiredate: expiredate.toISOString(),
      })
    );
  };
  return (
    <View style={styles.auth}>
      <Image style={styles.image} source={logo} resizeMode="contain" />
      <View>
        <Text style={styles.text}>SignIn</Text>
      </View>
      <View style={styles.container}>
        <TextInput
          placeholder="Email"
          value={Email}
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.container}>
        <TextInput
          placeholder="Password"
          value={Password}
          secureTextEntry={true}
          style={styles.input}
          autoComplete="false"
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View style={styles.buttons}>
        {isloading ? (
          <ActivityIndicator size="small" color={Colors.primary} />
        ) : (
          <Button title="SignIn" color={Colors.primary} onPress={Submit} />
        )}
        <TouchableOpacity
          style={styles.signin}
          onPress={() => {
            navigation.navigate("Authcreate");
          }}
        >
          <View>
            <Text style={{ color: "#D4AF37", fontSize: 15 }}>
              Create account
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  auth: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    width: "70%",
    maxWidth: 300,
    maxHeight: 200,
    marginLeft: -60,
  },
  container: {
    backgroundColor: "white",
    width: "80%",
    height: 40,
    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    paddingHorizontal: 7,
    marginVertical: 10,
  },

  press: {
    backgroundColor: "#ccc",
    padding: 10,
    textAlign: "center",
  },
  buttons: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  signin: {
    marginTop: 15,
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
  },
});
export default Login;
