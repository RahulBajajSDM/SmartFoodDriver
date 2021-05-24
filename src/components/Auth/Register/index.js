/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable module-resolver/use-alias */
import Button from 'components/Common/buttonComponent';
import PhoneInputComponent from 'components/Common/phoneInput';
import TextInputComponent from 'components/Common/textInput';
import Colors from 'constants/colors';
import React, {useState} from 'react';
import {Dimensions, Text, View, TouchableOpacity} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {useSelector} from 'react-redux';
import * as Images from 'assets';
import PictureHolder from 'components/Common/pictureHolder';
import {getStyles} from 'helpers/themeStyles';

const {height} = Dimensions.get('window');

function Register(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [buttonStatus, setButtonStatus] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('1');
  const [countryInitials, setCountryInitials] = useState('CA');
  const authReducer = useSelector((state) => state.authReducer);
  const {
    loading,
    submitLoginForm,
    goToSignIn,
    setPhoto,
    profilePicture,
    theme,
  } = props;
  const {colorBackground, blackTextColor} = getStyles(theme);

  return (
    <KeyboardAwareScrollView
      style={[{flexGrow: 1, paddingHorizontal: RFValue(20)}, colorBackground]}
      keyboardShouldPersistTaps="handled">
      <View
        style={{
          height: RFPercentage(20),
          justifyContent: 'center',
        }}>
        <Text
          style={[
            {
              fontSize: RFValue(14),
              paddingBottom: RFValue(5),
              color: Colors.TextGrey,
            },
            blackTextColor,
          ]}>
          Welcome
        </Text>
        <Text
          style={[
            {fontSize: RFValue(24), color: Colors.TextGrey},
            blackTextColor,
          ]}>
          Sign Up
        </Text>
      </View>
      <PictureHolder
        setPhoto={setPhoto}
        loading={loading}
        profilePicture={profilePicture}
      />
      <TextInputComponent
        placeholder={'Full Name'}
        onChangeText={setFullName}
        value={fullName}
        validationType={'name'}
        buttonStatus={setButtonStatus}
        autoCapitalize={'none'}
        disabled={loading}
        icon={Images.Luser}
        blackTextColor={blackTextColor}
      />
      <TextInputComponent
        placeholder={'Email'}
        onChangeText={setEmail}
        value={email}
        validationType={'email'}
        buttonStatus={setButtonStatus}
        autoCapitalize={'none'}
        disabled={loading}
        keyboardType={'email-address'}
        icon={Images.Mail}
        blackTextColor={blackTextColor}
      />
      <PhoneInputComponent
        placeholder={'PhoneNumber'}
        onChangeText={setPhone}
        value={phone}
        countryCode={countryCode}
        countryInitials={countryInitials}
        validationType={'phone'}
        buttonStatus={setButtonStatus}
        autoCapitalize={'none'}
        disabled={loading}
        // setCountryCode={setCountryCode}
        setCountryCode={(text) => {
          setCountryCode(text && text.callingCode[0]);
          setCountryInitials(text && text.cca2);
        }}
        keyboardType={'phone-pad'}
        icon={Images.Phone}
        blackTextColor={blackTextColor}
        theme={theme}
      />
      <TextInputComponent
        placeholder={'Password'}
        onChangeText={setPassword}
        value={password}
        validationType={'password'}
        buttonStatus={setButtonStatus}
        autoCapitalize={'none'}
        disabled={loading}
        icon={Images.Pass}
        secureTextEntry={true}
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
        icon={Images.Pass}
        secureTextEntry={true}
        blackTextColor={blackTextColor}
      />
      <Button
        title={'SignUp'}
        loading={loading}
        disabled={loading}
        onPress={() =>
          submitLoginForm({
            fullName,
            email,
            countryCode,
            countryInitials,
            phone,
            password,
            confirmPassword,
          })
        }
      />
      <TouchableOpacity onPress={() => goToSignIn()} disabled={loading}>
        <Text
          style={[
            {alignSelf: 'center', paddingVertical: RFValue(15)},
            blackTextColor,
          ]}>
          Already have account?
          <Text style={{color: Colors.Primary, alignSelf: 'center'}}>
            {' '}
            SignIn
          </Text>
        </Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
}
export default Register = React.memo(Register);
