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
import Fonts from 'constants/fonts';
import {getStyles} from 'helpers/themeStyles';

function EnterOTP(props) {
  const [code, setCode] = useState('');
  const {loading, goToNext, componentId, theme} = props;
  const {colorBackground, blackTextColor} = getStyles(theme);

  return (
    <>
      <ImageHeader
        enableBack={true}
        componentId={componentId}
        disabled={loading}
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
            Forgot Password
          </Text>
          <Text
            style={[
              {
                fontSize: RFValue(17),
                color: Colors.TextGrey,
              },
              blackTextColor,
            ]}>
            Enter Security Code
          </Text>
          <Text
            style={[
              {
                fontSize: RFValue(11),
                color: Colors.TextGrey,
                fontFamily: Fonts.Light,
              },
              blackTextColor,
            ]}>
            Please check your email for a message with your code.
          </Text>
        </View>
        <View
          style={{
            height: RFPercentage(15),
            width: '100%',
            justifyContent: 'center',
            // alignItems: 'center',
          }}>
          <Text
            style={[
              {
                textAlign: 'left',
                fontSize: RFValue(13),
                color: Colors.Yellow,
              },
              blackTextColor,
            ]}>
            Code
          </Text>
          <OTPInputView
            style={{width: '100%', height: RFValue(90)}}
            pinCount={4}
            // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
            // onCodeChanged = {code => { this.setState({code})}}
            autoFocusOnLoad
            codeInputFieldStyle={[styles.underlineStyleBase, blackTextColor]}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            keyboardType={'number-pad'}
            onCodeFilled={(code) => {
              setCode(code);
              if (code.length == 4) {
                goToNext(code);
              }
            }}
          />
        </View>

        <Button
          title={'Done'}
          loading={loading}
          disabled={loading}
          onPress={() => {
            goToNext(code);
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

export default EnterOTP;
