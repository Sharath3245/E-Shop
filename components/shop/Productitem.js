import React from "react";
import { Button, View, Image, Text, StyleSheet,TouchableNativeFeedback } from "react-native";
import Colors from "../../constants/Colors";

const Productitem = (props) => {
  return (
    <View style={styles.product}>
        <View style={styles.touchable}>
        <TouchableNativeFeedback onPress={props.onviewdetail} useForeground>
            <View>
        <View style={styles.imagecontainer}>
        <Image style={styles.image} source={{uri:props.image}} />
        </View>

      <View style={styles.detail}>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.price}>Rs.{props.price}</Text>
      </View>
    
      <View style={styles.actions}>
        <Button  color={Colors.primary}title="View details" onPress={props.onviewdetail} />
        <Button  color={Colors.primary}title="To cart" onPress={props.oncart} />
      </View>
      </View>
      </TouchableNativeFeedback>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
    product:{
        shadowColor:"black",
        shadowOffset:{width:0,height:2},
        shadowOpacity:0.26,
        shadowRadius:8,
        elevation:5,
        borderRadius:10,
        backgroundColor:"white",
        height:300,
        margin:20
    },
    touchable:{
        overflow:"hidden",
        borderRadius:10
    },
    image:{
        width:"100%",
        height:"100%",
        overflow:"hidden"
    },
    imagecontainer:{
        width:"100%",
        height:"60%",
        borderTopLeftRadius:10,
        borderBottomRightRadius:10,
        overflow:"hidden"

    },
    title:{
        marginVertical:4,
        fontSize:18
    },
    price:{
        color:"#888",
        fontSize:14
    },
    actions:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        height:"20%",
        paddingHorizontal:20
    },
    detail:{
        alignItems:"center",
        height:"18%",
        padding:10,
        
    }
});
export default Productitem;
