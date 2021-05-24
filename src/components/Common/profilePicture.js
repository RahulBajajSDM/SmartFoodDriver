import colors from 'constants/colors';
import Fonts from 'constants/fonts';
// import SpinnerLoader from 'components/common/spinnerLoader';
import _ from 'lodash';
import React, {memo} from 'react';
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {RFValue, RFPercentage} from 'react-native-responsive-fontsize';
import * as Images from 'assets';
import IconsFa from 'react-native-vector-icons/FontAwesome';

const ProfilePicture = (props) => {
  const {editable, profile_image} = props;
  return (
    <View
      style={{
        height: RFValue(60),
        width: RFValue(60),
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          height: RFValue(60),
          width: RFValue(60),
          borderRadius: RFPercentage(100),
          overflow: 'hidden',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.White,
          borderColor: '#dadada',
          borderWidth: 1,
        }}>
        <Image
          source={{
            uri:
              'https://mean.stagingsdei.com:6047/uploads/attachment/user/2020-08-07T07-00-30.897Z-images.jpg',
          }}
          // source={profile_image ? {uri: profile_image} : Images.Profile}
          resizeMode="contain"
          style={{height: RFValue(60), width: RFValue(60)}}
        />
      </View>
      {editable && (
        <View
          style={{
            height: RFValue(20),
            width: RFValue(20),
            borderRadius: RFPercentage(100),
            backgroundColor: colors.White,
            position: 'absolute',
            bottom: RFValue(0),
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 0.5,
          }}>
          <IconsFa name={'pencil'} size={RFValue(10)} />
        </View>
      )}

      <View
        style={{
          height: RFValue(20),
          width: RFValue(20),
          borderRadius: RFPercentage(100),
          backgroundColor: 'green',
          position: 'absolute',
          top: RFValue(0),
          alignSelf: 'center',
          right: RFValue(0),
          borderWidth: 3,
          borderColor: colors.White,
        }}></View>
    </View>
  );
};
export default ProfilePicture;
