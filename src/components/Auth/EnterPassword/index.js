/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable module-resolver/use-alias */
import OTPInputView from '@twotalltotems/react-native-otp-input';
import Button from 'components/Common/buttonComponent';
import ImageHeader from 'components/Common/imageHeader';
import Colors from 'constants/colors';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import TextInputComponent from 'components/Common/textInput';
import * as Images from 'assets';
import {getStyles} from 'helpers/themeStyles';

function EnterPassword(props) {
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [passwordSecure, setPasswordSecure] = useState(true);

  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordSecure, setConfirmPasswordSecure] = useState(true);

  const [buttonStatus, setButtonStatus] = useState('');

  const {loading, goToNext, componentId, theme} = props;
  const {colorBackground, blackTextColor} = getStyles(theme);

  return (
    <>
      <ImageHeader
        enableBack={true}
        componentId={componentId}
        colorBackground={colorBackground}
      />
      <KeyboardAwareScrollView
        style={[
          {
            flexGrow: 1,
            paddingHorizontal: RFValue(20),
          },
          colorBackground,
        ]}
        keyboardShouldPersistTaps="handled">
        <View
          style={{
            height: RFPercentage(20),
            justifyContent: 'space-evenly',
          }}>
          <Text
            style={[
              {
                fontSize: RFValue(24),
                color: Colors.TextGrey,
              },
              blackTextColor,
            ]}>
            Reset Password
          </Text>
          <Text
            style={[
              {
                fontSize: RFValue(17),
                color: Colors.TextGrey,
              },
              blackTextColor,
            ]}>
            Please enter a new password{' '}
          </Text>
        </View>

        <TextInputComponent
          placeholder={'Password'}
          onChangeText={setPassword}
          value={password}
          validationType={'password'}
          buttonStatus={setButtonStatus}
          autoCapitalize={'none'}
          disabled={loading}
          icon={passwordSecure ? Images.Eye : Images.NoEye}
          secureTextEntry={passwordSecure}
          rightIcon={true}
          toggleSecure={() => setPasswordSecure(!passwordSecure)}
          blackTextColor={blackTextColor}
        />

        <TextInputComponent
          placeholder={'Confirm Password'}
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          validationType={'password'}
          buttonStatus={setButtonStatus}
          autoCapitalize={'none'}
          disabled={loading}
          icon={passwordSecure ? Images.Eye : Images.NoEye}
          secureTextEntry={confirmPasswordSecure}
          rightIcon={true}
          toggleSecure={() => setConfirmPasswordSecure(!confirmPasswordSecure)}
          blackTextColor={blackTextColor}
        />
        <Button
          title={'Reset Password'}
          loading={loading}
          disabled={loading}
          onPress={() => {
            goToNext({password, confirmPassword});
          }}
          containerHeight={RFValue(80)}
          justifyContent={'flex-end'}
        />
      </KeyboardAwareScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    height: 45,
    borderWidth: 2,
    borderBottomWidth: 2,
    width: RFValue(35),
    color: Colors.Black,
  },

  underlineStyleHighLighted: {
    borderColor: Colors.Yellow,
    borderWidth: 1,
    width: RFValue(35),
    color: Colors.Black,
  },
});

export default EnterPassword;
