/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import IconsFa from 'react-native-vector-icons/FontAwesome';
import {RFValue} from 'react-native-responsive-fontsize';
import _ from 'lodash';
import moment from 'moment';
import idx from 'idx';
import {getGreyColor, getAddressColor} from 'helpers/themeStyles';
import {useSelector} from 'react-redux';

function OrderShippingDetails(props) {
  const {item} = props;
  const theme = useSelector((state) => state.themeReducer.theme);

  let dropPoints = _.get(item, 'item.dropPoints', []);
  let userAddress =
    dropPoints.length > 0 ? dropPoints[dropPoints.length - 1].address : '';

  const diffDuration = moment.duration(item.item.estimatedTime);

  let expectedDeliveryTime = `${diffDuration.hours()}:${diffDuration.minutes()}:${diffDuration.seconds()}`;
  return (
    <View style={styles.container}>
      <View style={{paddingVertical: 3}}>
        <Text
          style={{
            color: '#39B54A',
            fontSize: RFValue(14),
          }}>
          Order No. {item.item.receiptId}
        </Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{paddingRight: 5}}>
          <IconsFa name={'clock-o'} size={RFValue(20)} color={'#F41943'} />
        </View>
        <View>
          <Text style={{color: getGreyColor(theme)}}>Cancled</Text>
        </View>
      </View>
      {/* <View style={{justifyContent: 'flex-end'}}>
        <Text style={{color: '#F41943'}}>{'       '}Cancled</Text>
      </View> */}
      <View style={{paddingVertical: 3}}>
        <Text style={{color: getGreyColor(theme)}}>
          {' '}
          {idx(item, (_) => _.item.driverId.name)}
        </Text>
      </View>
      <View>
        <Text style={{color: getGreyColor(theme)}}>{userAddress}</Text>
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
