/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import IconsFa from 'react-native-vector-icons/FontAwesome';
import {RFValue} from 'react-native-responsive-fontsize';
import _ from 'lodash';
import moment from 'moment';
import idx from 'idx';
function OrderShippingDetails(props) {
  const {item} = props;
  let dropPoints = _.get(item, 'item.dropPoints', []);
  let userAddress =
    dropPoints.length > 0 ? dropPoints[dropPoints.length - 1].address : '';

  const diffDuration = moment.duration(item.item.estimatedTime);

  let expectedDeliveryTime = `${diffDuration.hours()}:${diffDuration.minutes()}:${diffDuration.seconds()}`;
  return (
    <View style={styles.container}>
      <View style={{paddingVertical: 3}}>
        <Text style={{color: '#39B54A', fontSize: RFValue(14)}}>
          Order No. {item.item.receiptId}
        </Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{paddingRight: 5}}>
          <IconsFa name={'clock-o'} size={RFValue(20)} color={'#4DBC5C'} />
        </View>
        <View>
          <Text>{expectedDeliveryTime}</Text>
        </View>
      </View>
      <View style={{justifyContent: 'flex-end'}}>
        <Text style={{color: '#F41943'}}>{'       '}0:34:15</Text>
      </View>
      <View style={{paddingVertical: 3}}>
        <Text style={{color: '#B4B4B4'}}>
          {' '}
          {idx(item, (_) => _.item.driverId.name)}
        </Text>
      </View>
      <View>
        <Text style={{color: '#231F20', fontWeight: 'bold'}}>
          {userAddress}
        </Text>
      </View>
    </View>
  );
}
export default OrderShippingDetails = React.memo(OrderShippingDetails);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
  },
});
