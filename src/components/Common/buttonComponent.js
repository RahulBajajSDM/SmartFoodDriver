import Colors from 'constants/colors';
import Fonts from 'constants/fonts';
// import SpinnerLoader from 'components/common/spinnerLoader';
import _ from 'lodash';
import React, {memo} from 'react';
import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

const Button = (props) => {
  const {
    loading,
    disabled,
    onPress,
    title,
    containerHeight,
    justifyContent,
  } = props;
  return (
    <View
      style={{
        height: containerHeight ? containerHeight : RFValue(60),
        justifyContent: justifyContent ? justifyContent : 'center',
      }}>
      <TouchableOpacity
        onPress={_.debounce(() => onPress(), 1000)}
        disabled={disabled}
        style={{
          height: RFValue(50),
          width: '100%',
          backgroundColor: Colors.Primary,
          justifyContent: 'center',
          borderRadius: RFValue(5),
          alignItems: 'center',
        }}>
        {loading ? (
          <ActivityIndicator color={'white'} />
        ) : (
          <Text
            style={{
              color: Colors.White,
              fontSize: RFValue(14),
              fontFamily: Fonts.Bold,
            }}>
            {title}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default memo(Button);
