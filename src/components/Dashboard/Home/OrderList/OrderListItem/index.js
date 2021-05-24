/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable module-resolver/use-alias */
import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import OrderPaymentDetails from "./OrderPaymentDetails";
import OrderShippingDetails from "./OrderShippingDetails";
import OrderStop from "./OrderStop";
import { getStyles } from "helpers/themeStyles";

function OrderListItem(props) {
  const {
    props: { onItemPress },
    item,
    theme,
  } = props;
  console.log("My defined", JSON.stringify(props.theme));
  return (
    <TouchableOpacity
      style={getStyles(theme).container}
      onPress={() => onItemPress(item)}
    >
      <View
        style={[
          styles.item,
          styles.shadowStyle,
          {
            flexDirection: "row",
            backgroundColor: theme == "dark" ? "#393b3b" : "white",
          },
        ]}
      >
        <View
          style={{
            flex: 0.4,
            alignItems: "flex-start",
          }}
        >
          <OrderShippingDetails item={item} theme={theme} />
        </View>
        {/* Section 2 */}
        <View style={{ flex: 0.4 }}>
          <OrderStop item={item} theme={theme} />
        </View>
        {/* Section 2 */}
        <View style={{ flex: 0.2, justifyContent: "space-between" }}>
          <OrderPaymentDetails item={item} theme={theme} />
        </View>
      </View>
    </TouchableOpacity>
  );
}
export default OrderListItem = React.memo(OrderListItem);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  item: {
    flex: 1,
    // backgroundColor: '#FFFDFD',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    // borderColor: '#F80606',
    // borderWidth: 2,
    borderRadius: 10,
  },
  shadowStyle: {
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 1,
  },
});
