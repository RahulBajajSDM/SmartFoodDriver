/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import * as AppImages from 'assets';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import _ from 'lodash';
import idx from 'idx';
function OrderPaymentDetails(props) {
  const {
    item: {item},
    defaultStyles,
  } = props;
  const {
    totalAmount,

    riderTip,
    deleiveryFee,
  } = item;

  let finalAmount = totalAmount + riderTip + deleiveryFee;
  return (
    <View style={[styles.container]}>
      <View>
        <Image
          // style={{height: 10, width: 10}}
          source={AppImages.PaymentMethod} //TODO UPDATE WITH YOUR CHECK IMGAE
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{paddingRight: 5}}>
          <Text style={{color: '#66666e', fontSize: RFValue(9)}}>Total</Text>
        </View>
        <View>
          <Text
            style={{
              color: '#39B54A',
              fontWeight: 'bold',
              fontSize: RFValue(12),
            }}>
            ${totalAmount}
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{paddingRight: 5}}>
          <Text style={{color: '#66666e', fontSize: RFValue(9)}}>Tip</Text>
        </View>
        <View>
          <Text
            style={{
              color: '#39B54A',
              fontWeight: 'bold',
              fontSize: RFValue(12),
            }}>
            ${riderTip}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{paddingRight: 5}}>
          <Text style={{color: '#66666e', fontSize: RFValue(9)}}>Del</Text>
        </View>
        <View>
          <Text
            style={{
              color: '#39B54A',
              fontWeight: 'bold',
              fontSize: RFValue(12),
            }}>
            ${deleiveryFee}
          </Text>
        </View>
      </View>

      <View>
        <Text style={{color: '#66666e', fontSize: RFValue(9)}}>
          Total Order
        </Text>
      </View>
      <View>
        <Text
          style={{color: '#39B54A', fontWeight: 'bold', fontSize: RFValue(18)}}>
          ${finalAmount}
        </Text>
      </View>
    </View>
  );
}
export default OrderPaymentDetails = React.memo(OrderPaymentDetails);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
