/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable module-resolver/use-alias */
import ToggleSwitch from '../../../Common/ToggleSwitch'; // Update your component path
import colors from 'constants/colors';
import Fonts from 'constants/fonts';
import React, {useState, useEffect} from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import idx from 'helpers/Idx';
import * as Images from './assets';
import {getStyles} from 'helpers/themeStyles';

function AppInformation(props) {
  const {theme} = props;
  let defaultStyles = getStyles(theme);
  return (
    <View
      style={[
        {flex: 1, paddingHorizontal: RFValue(20)},
        defaultStyles.colorBackground,
      ]}>
      <View style={{paddingTop: 10, paddingBottom: 40}}>
        <Text
          style={[
            {
              color: colors.DarkBlue,
              fontSize: RFValue(17),
              fontWeight: '500',
            },
            defaultStyles.blackTextColor,
          ]}>
          Back to settings
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 0,
          paddingVertical: 10,
          borderTopColor: colors.BorderGrey,
          borderTopWidth: 1,
        }}>
        <Text
          style={{
            color: colors.TextGreyTitle,
            fontSize: RFValue(14),
          }}>
          Software Version
        </Text>
        <Text
          style={{
            color: colors.Lgrey,
            fontSize: RFValue(14),
          }}>
          1.0.0
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 0,
          paddingVertical: 10,
          borderTopColor: colors.BorderGrey,
          borderTopWidth: 1,
        }}>
        <Text
          style={{
            color: colors.TextGreyTitle,
            fontSize: RFValue(14),
          }}>
          Last Updated
        </Text>
        <Text
          style={{
            color: colors.Lgrey,
            fontSize: RFValue(14),
          }}>
          Feb 12, 2020
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 0,
          paddingVertical: 10,
          borderTopColor: colors.BorderGrey,
          borderTopWidth: 1,
        }}>
        <Text
          style={{
            color: colors.TextGreyTitle,
            fontSize: RFValue(14),
          }}>
          Device Type
        </Text>
        <Text
          style={{
            color: colors.Lgrey,
            fontSize: RFValue(14),
          }}>
          iPhone Xs
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 0,
          paddingVertical: 40,
          borderTopColor: colors.BorderGrey,
          borderTopWidth: 1,
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image source={Images.StartUp} resizeMode="contain" />
          <View style={{paddingLeft: 10}}>
            <Text
              style={[
                {
                  color: colors.DarkBlue,
                  fontSize: RFValue(17),
                  fontWeight: 'bold',
                },
                defaultStyles.blackTextColor,
              ]}>
              Version 1.03
            </Text>

            <Text
              style={[
                {
                  color: colors.BorderGrey,
                  fontSize: RFValue(14),
                },
                defaultStyles.blackTextColor,
              ]}>
              Up to date
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: colors.SkyBlue,
            borderRadius: 5,
          }}>
          <Text
            style={{
              color: colors.White,
              fontSize: RFValue(12),
            }}>
            Check for update
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default AppInformation;
