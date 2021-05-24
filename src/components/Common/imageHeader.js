// import SpinnerLoader from 'components/common/spinnerLoader';
import * as Images from 'assets';
import React, {memo} from 'react';
import {Image, View} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';

const ImageHeader = (props) => {
  const {colorBackground} = props;
  return (
    <View
      style={[
        {
          height: RFPercentage(20),
          flexDirection: 'row',
        },
        colorBackground,
      ]}>
      <View
        style={{
          flex: 0.15,
          justifyContent: 'center',
          alignItems: 'center',
        }}></View>
      <View style={{flex: 0.7, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          resizeMode={'contain'}
          source={Images.Logo}
          style={{flex: 1}}

          // style={{height:RFValue()}}
        />
      </View>
      <View style={{flex: 0.15}}></View>
    </View>
  );
};

export default memo(ImageHeader);
