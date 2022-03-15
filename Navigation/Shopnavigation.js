import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Productoverview from "../screens/shop/Productsoverview";
import Productdetail from "../screens/shop/Productsdetail";
import Colors from "../constants/Colors";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import Headerbuttons from "../components/shop/Headerbuttons";
import Cartscreen from "../screens/shop/Cartscreen";
import Orderscreen from "../screens/shop/Ordersscreen";
import { Ionicons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Auth from "../screens/shop/Auth";
import Login from "../screens/shop/Authlogin";
import Startscreen from "../screens/shop/Startscreen";
import Show from "../screens/shop/Show";

// import Profile from "../screens/shop/Profile";
import Customdrawer from "../components/Customdrawer";
// import Profile from "../screens/shop/Profile";

const Stack = createStackNavigator();
const Detailstack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen name="Profile" component={Show} />
    </Stack.Navigator>
  );
};

const detailoptions = (props) => {
  const title = props.route.params.title;

  return {
    title: title,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={Headerbuttons}>
        <Item
          title="Cart"
          iconName="ios-cart"
          onPress={() => {
            props.navigation.navigate("Cart");
          }}
        />
      </HeaderButtons>
    ),
  };
};
const productsoptions = (props) => {
  return {
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={Headerbuttons}>
        <Item
          title="Cart"
          iconName="ios-menu"
          onPress={() => {
            props.navigation.openDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};
const cartoptions = (props) => {
  return {
    title: "Cart",
  };
};

// const Authstack = () => {
//   return;
// };
const StackNavigator = () => {
  const orders = useSelector((state) => state.orders.orderserver);
  const fetchorders = useSelector((state) => state.orders.fetchorders);
  const token = useSelector((state) => state.auth.token);
  const userid = useSelector((state) => state.auth.userid);

  // console.log(fetchorders);
  // const [loading,setisloading]=useState(false)
  // console.log(orders);
  useEffect(() => {
    const sendorders = async () => {
      const response = await fetch(
        `https://e-shop-28a82-default-rtdb.firebaseio.com/orders/${userid}.json?auth=${token}`,
        {
          method: "POST",
          body: JSON.stringify(orders),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("sending order failed!");
      }
      const data = await response.json();
      // console.log(data,"gggg")
    };
    sendorders().catch((err) => {});
  }, [orders]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="All Products"
        component={Productoverview}
        options={productsoptions}
      />
      <Stack.Screen
        name="Productdetails"
        component={Productdetail}
        options={detailoptions}
      />
      <Stack.Screen name="Cart" component={Cartscreen} options={cartoptions} />
    </Stack.Navigator>
  );
};
const ordersoption = (props) => {
  return {
    title: "Orders",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={Headerbuttons}>
        <Item
          title="Orders"
          iconName="ios-menu"
          onPress={() => {
            props.navigation.openDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};
const Nowstack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="Orders"
        component={Orderscreen}
        options={ordersoption}
      />
    </Stack.Navigator>
  );
};


const Drawer = createDrawerNavigator();
const DrawerNav = () => {
  // const dispatch = useDispatch();
  const signingin = useSelector((state) => state.auth.signingin);
  return (
    <NavigationContainer>
      {signingin ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Startscreen" component={Startscreen} />
          <Stack.Screen name="Authcreate" component={Auth} />
          <Stack.Screen name="Authlogin" component={Login} />
        </Stack.Navigator>
      ) : (
        <Drawer.Navigator
          screenOptions={{ headerShown: false }}
          drawerContent={(props) => <Customdrawer {...props} />}
        >
          <Drawer.Screen
            name="Products"
            component={StackNavigator}
            options={{
              title: "Home",
              drawerIcon: ({ focused, size }) => (
                <AntDesign name="shoppingcart" size={24} color="black" />
              ),
            }}
          />
          <Drawer.Screen
            name="Orders"
            component={Nowstack}
            options={{
              title: "Orders",
              drawerIcon: ({ focused, size }) => (
                <Ionicons name="ios-list-outline" size={24} color="black" />
              ),
            }}
          />
          <Drawer.Screen
            name="Profile"
            component={Detailstack}
            options={{
              drawerLabel: ({ focused, size }) => (
                <AntDesign name="profile" size={24} color="black" />
              ),
            }}
          />
        </Drawer.Navigator>
      )}
    </NavigationContainer>
  );
};
export default DrawerNav;
