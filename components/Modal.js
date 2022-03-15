import React from "react";
import { View, Modal, Text, StyleSheet } from "react-native";

const Ordermodal = (props) => {
  return (
    
      <Modal transparent={true} visible={props.modal}>
        <View styles={styles.modal}>
          <Text>Hello Modal</Text>
        </View>
      </Modal>
    
  );
};
const styles = StyleSheet.create({
  modal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Ordermodal;
