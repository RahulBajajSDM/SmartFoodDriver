/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import * as AppImages from "assets";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import _ from "lodash";
import idx from "idx";
import { getGreyColor } from "helpers/themeStyles";

function OrderPaymentDetails(props) {
  const {
    item: { item },
  } = props;
  const {
    totalAmount,
    taxFee,
    subTotalAmount,
    riderTip,
    driverComission,
    deleiveryFee,
  } = item;
  console.log("ItemDetail", JSON.stringify(props));
  let theme = "default";
  let totalStopPrice =
    idx(item, (_) => _.firstStop) + idx(item, (_) => _.secondStop) || 0;
  let tax = item && item.taxFee;
  let finalAmount =
    subTotalAmount + riderTip + deleiveryFee + totalStopPrice + tax;

  console.log(item, "itemitemitemitem");
  return (
    <View style={styles.container}>
      <View>
        <Image
          // style={{height: 10, width: 10}}
          source={AppImages.PaymentMethod} //TODO UPDATE WITH YOUR CHECK IMGAE
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ paddingRight: 5 }}>
          <Text style={{ color: "#66666e", fontSize: RFValue(9) }}>Total</Text>
        </View>
        <View>
          <Text
            style={{
              color: "#39B54A",
              fontWeight: "bold",
              fontSize: RFValue(12),
            }}
          >
            ${(subTotalAmount && subTotalAmount.toFixed(2)) || 0}
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ paddingRight: 5 }}>
          <Text style={{ color: "#66666e", fontSize: RFValue(9) }}>Tip</Text>
        </View>
        <View>
          <Text
            style={{
              color: "#39B54A",
              fontWeight: "bold",
              fontSize: RFValue(12),
            }}
          >
            ${(riderTip && riderTip.toFixed(2)) || 0}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ paddingRight: 5 }}>
          <Text style={{ color: "#66666e", fontSize: RFValue(9) }}>Del</Text>
        </View>
        <View>
          <Text
            style={{
              color: "#39B54A",
              fontWeight: "bold",
              fontSize: RFValue(12),
            }}
          >
            ${(deleiveryFee && deleiveryFee.toFixed(2)) || 0}
          </Text>
        </View>
      </View>
      {totalStopPrice ? (
        <>
          <View>
            <Text style={{ color: getGreyColor(theme), fontSize: RFValue(9) }}>
              Stop charge{" "}
            </Text>
          </View>
          <View>
            <Text
              style={{
                color: "#39B54A",
                fontWeight: "bold",
                fontSize: RFValue(12),
              }}
            >
              ${totalStopPrice.toFixed(2)}
            </Text>
          </View>
        </>
      ) : null}
      <View>
        <Text style={{ color: "#66666e", fontSize: RFValue(9) }}>
          Total Order
        </Text>
      </View>
      <View>
        <Text
          style={{
            color: "#39B54A",
            fontWeight: "bold",
            fontSize: RFValue(18),
          }}
        >
          ${finalAmount && finalAmount.toFixed(2)}
        </Text>
      </View>
    </View>
  );
}
export default OrderPaymentDetails = React.memo(OrderPaymentDetails);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
});
