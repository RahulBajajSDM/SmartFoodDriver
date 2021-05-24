import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input} from 'react-native-elements';
import {RFValue, RFPercentage} from 'react-native-responsive-fontsize';
import {View, NativeModules, LayoutAnimation, Image} from 'react-native';
import Validator from 'helpers/validationChecker';
import Colors from 'constants/colors';
import CountryPicker from 'react-native-country-picker-modal';

const {UIManager} = NativeModules;
const CustomLayoutAnimation = {
  duration: 500,
  create: {
    type: LayoutAnimation.Types.linear,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.linear,
  },
};
let phoneRef = React.createRef();

const TextInputField = (props) => {
  const {
    placeholder,
    keyboardType,
    secureTextEntry,
    onChangeText,
    value,
    validationType,
    buttonStatus,
    maxLength,
    disabled,
    autoCapitalize,
    autoFocus,
    editable,
    setCountryCode,
    countryCode,
    countryInitials,
    icon,
    blackTextColor,
    theme,
  } = props;
  const [validation, setValidation] = useState(null);
  const [labelVisible, setLabelVisible] = useState(true);
  const [phoneModal, setPhoneModal] = useState(false);

  useEffect(() => {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }, []);
  const changingText = (text) => {
    onChangeText(text);
    let validationCheck = Validator(
      text,
      validationType ? validationType : 'none',
    );
    setValidation(!validationCheck);
    buttonStatus(!validationCheck);
  };
  return (
    <View style={{height: RFValue(80)}}>
      <Input
        label={labelVisible ? placeholder : ''}
        placeholder={placeholder}
        leftIcon={
          <View
            style={{
              height: RFValue(40),
              width: RFValue(65),
              flexDirection: 'row',
            }}>
            <View
              style={{
                flex: 0.3,
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
              <View
                style={{
                  height: RFValue(30),
                  width: RFValue(30),
                  borderRadius: 200,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'white',
                }}>
                <Image source={icon} resizeMode="contain" />
              </View>
            </View>
            <View
              style={{
                flex: 0.7,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <CountryPicker
                theme={{
                  onBackgroundTextColor: theme == 'dark' ? 'white' : 'black',
                }}
                onOpen={() => setPhoneModal(true)}
                onClose={() => setPhoneModal(false)}
                visible={phoneModal}
                withCallingCode={true}
                withCallingCodeButton={true}
                countryCode={countryInitials}
                withFlag={false}
                withFlagButton={false}
                value={countryCode}
                onSelect={(data) => {
                  setCountryCode(data);
                }}
              />
            </View>
          </View>
        }
        inputStyle={[
          {
            height: RFValue(50),
            paddingHorizontal: RFValue(10),
            fontSize: RFValue(14),
          },
          blackTextColor,
        ]}
        inputContainerStyle={{
          borderBottomColor: validation ? Colors.Red : Colors.Yellow,
          height: RFValue(50),
        }}
        onFocus={() => {
          LayoutAnimation.configureNext(CustomLayoutAnimation);
          setLabelVisible(false);
        }}
        onBlur={() => {
          LayoutAnimation.configureNext(CustomLayoutAnimation);
          setLabelVisible(true);
        }}
        labelStyle={{fontSize: RFValue(14)}}
        // containerStyle={{height: RFValue(50)}}
        autoCapitalize={autoCapitalize}
        disabled={disabled}
        autoFocus={autoFocus}
        editable={editable}
        maxLength={maxLength}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={(text) => {
          onChangeText(text, phoneRef);
        }}
      />
    </View>
  );
};
export default TextInputField;
