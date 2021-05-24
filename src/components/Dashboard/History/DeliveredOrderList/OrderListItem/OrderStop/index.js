/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import IconsFe from 'react-native-vector-icons/Feather';
import {RFValue} from 'react-native-responsive-fontsize';
import _ from 'lodash';
import colors from 'constants/colors';

function OrderStop(props) {
  const {item, defaultStyles, theme} = props;
  let dropPoints = _.get(item, 'item.dropPoints', []);

  return (
    <View style={[styles.container, defaultStyles.contiainer]}>
      <View>
        <Text
          style={{
            color: theme == 'dark' ? colors.White : colors.Lgrey,
            fontSize: RFValue(8),
          }}>
          {dropPoints.length} Stops
        </Text>
      </View>
      {dropPoints.map((dropLocation, index) => {
        return (
          <View style={{flexDirection: 'row'}}>
            <View style={{paddingRight: 5, flex: 0.15}}>
              <IconsFe
                name={'navigation'}
                size={RFValue(15)}
                color={'#6A6A6A'}
              />
            </View>
            <View style={{flex: 0.8}}>
              <Text
                style={{
                  color: theme == 'dark' ? colors.White : colors.Lgrey,
                  flexWrap: 'wrap',
                }}>
                {index + 1}. {dropLocation.address}
              </Text>
            </View>
          </View>
        );
      })}
      {/* <View style={{flexDirection: 'row'}}>
        <View style={{paddingRight: 5}}>
          <IconsFe name={'navigation'} size={RFValue(15)} color={'#6A6A6A'} />
        </View>
        <Text style={{color: '#1932F4', flexWrap: 'wrap'}}>
          1. KFC: Order No. 5487
        </Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={{paddingRight: 5}}>
          <IconsFe name={'navigation'} size={RFValue(15)} color={'#6A6A6A'} />
        </View>
        <Text style={{color: '#1932F4'}}>1. KFC: Order No. 5487</Text>
      </View> */}
    </View>
  );
}
export default OrderStop = React.memo(OrderStop);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
