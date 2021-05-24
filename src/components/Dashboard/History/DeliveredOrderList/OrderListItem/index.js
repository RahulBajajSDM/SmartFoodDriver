/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable module-resolver/use-alias */
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import OrderPaymentDetails from "./OrderPaymentDetails";
import OrderShippingDetails from "./OrderShippingDetails";
import OrderStop from "./OrderStop";
import { getStyles } from "helpers/themeStyles";

function OrderListItem(props) {
  const {
    props: { onItemPress },
    item,
    defaultStyles,
    // theme,
  } = props;
  let theme = "default";
  console.log("theme is ", theme);
  console.log(getStyles(theme).container, "sasdfasdfasdf");
  return (
    <TouchableOpacity
      style={getStyles(theme).container}
      onPress={() => onItemPress(item)}
    >
      <View
        style={[
          styles.item,
          styles.shadowStyle,
          // defaultStyles.colorBackground,
          {
            flexDirection: "row",
            backgroundColor: theme == "dark" ? "#393b3b" : "white",
          },
        ]}
      >
        <View
          style={[
            {
              flex: 0.4,
              alignItems: "flex-start",
            },
          ]}
        >
          <OrderShippingDetails item={item} defaultStyles={defaultStyles} />
        </View>
        {/* Section 2 */}
        <View style={{ flex: 0.4 }}>
          <OrderStop item={item} defaultStyles={defaultStyles} theme={theme} />
        </View>
        {/* Section 2 */}
        <View style={{ flex: 0.2, justifyContent: "space-between" }}>
          <OrderPaymentDetails item={item} defaultStyles={defaultStyles} />
        </View>
      </View>
    </TouchableOpacity>
  );
}
export default OrderListItem = React.memo(OrderListItem);

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

    elevation: 3,
  },
});
