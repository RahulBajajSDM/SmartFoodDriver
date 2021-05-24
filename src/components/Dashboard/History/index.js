import ProfilePicture from 'components/Common/profilePicture';
import colors from 'constants/colors';
import Fonts from 'constants/fonts';
import {getStyles} from 'helpers/themeStyles';
import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useSelector} from 'react-redux';
import DeliveredOrderList from './DeliveredOrderList';

export default function History(props) {
  const {
    onItemPress,
    fetchOrderHistory,
    isLoading,
    orderHistory,
    theme,
  } = props;
  let defaultStyles = getStyles(theme);

  const loginData = useSelector((state) => state.authReducer.loginData);
  if (!loginData) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <View style={[styles.container, defaultStyles.container]}>
      <View style={{flex: 0.14, flexDirection: 'row'}}>
        <View style={{flex: 0.2, justifyContent: 'center'}}>
          {loginData && loginData.profile_image && (
            <ProfilePicture profile_image={loginData.profile_image} />
          )}
        </View>
        <View
          style={{flex: 0.6, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              fontSize: RFValue(24),
              fontFamily: Fonts.Bold,
              color: '#1ECB40',
            }}>
            History
          </Text>
        </View>
      </View>

      <View style={{flex: 0.8}}>
        {isLoading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator />
          </View>
        ) : (
          <DeliveredOrderList
            onItemPress={onItemPress}
            onRetry={fetchOrderHistory}
            defaultStyles={defaultStyles}
            theme={theme}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: RFValue(10),
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: colors.White,
    borderRadius: RFValue(10),
    justifyContent: 'center',
    height: RFValue(77),
    marginBottom: RFValue(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 1,
  },
  rowBack: {
    alignItems: 'center',
    height: RFValue(77),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    marginBottom: RFValue(10),
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: RFValue(40),
  },
  backRightBtnLeft: {
    backgroundColor: colors.White,
    right: RFValue(40),
    elevation: 1,
  },
  backRightBtnRight: {
    backgroundColor: '#EC3237',
    right: 0,
    borderTopRightRadius: RFValue(10),
    borderBottomRightRadius: RFValue(10),
  },

  moreRightBtnRight: {
    backgroundColor: colors.White,
    right: RFValue(81),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 1,
  },
});
