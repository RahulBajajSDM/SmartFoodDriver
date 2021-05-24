/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable module-resolver/use-alias */
import * as Images from 'assets';
import Button from 'components/Common/buttonComponent';
import PictureHolder from 'components/Common/pictureHolder';
import TextInputComponent from 'components/Common/textInput';
import colors from 'constants/colors';
import Fonts from 'constants/fonts';
import React, {useEffect, useState} from 'react';
import {Dimensions, Text, View, Image, TouchableOpacity} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import Toast from 'react-native-simple-toast';
import stripe from 'tipsi-stripe';
import DatePicker from '../../../../components/Common/datePicker';
import MapField from '../../../../components/Common/mapField';
import idx from 'idx';
import DropDownList from '../../../../components/Common/dropDown';
import Icon from 'react-native-vector-icons/FontAwesome';
import {getStyles} from 'helpers/themeStyles';

const {height} = Dimensions.get('window');

function BankDetails(props) {
  const {
    setPhoto,
    profilePicture,
    addBankAccount,
    openMapModal,
    bankDetails,
    deleteAcc,
    theme,
  } = props;

  const [dob, setDob] = useState('');
  const [formatted, setUnformatted] = useState('');
  let defaultStyles = getStyles(theme);

  const [country, setCountry] = useState('Canada');
  const [curency, setCurrency] = useState('CAD');
  const [ssn, setSsn] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [routingNumber, setRoutingNumber] = useState('');
  const [accountHolder, setAccountHolder] = useState('');
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [zipCode, setZipCode] = useState(null);
  const [type, setType] = useState(null);
  const [address, setAddress] = useState(null);

  const [buttonStatus, setButtonStatus] = useState('');
  const [dropOpen, setDropOpen] = useState(false);
  const [loader, setLoader] = useState(false);

  const {addingBank} = props;
  useEffect(() => {
    stripe.setOptions({
      publishableKey: 'pk_test_e8KEEseg5w947K4Tm7WXGyP300QOFZc2yL',
      androidPayMode: 'test', // Android only
    });

    // dummy();
  }, []);
  const {colorBackground, blackTextColor} = getStyles(theme);

  // const dummy = async () => {
  //   let params = {
  //     // accountNumber: accountNumber,
  //     // routingNumber: routingNumber, // 9 digits\
  //     accountNumber: '000123456789',
  //     routingNumber: '11000000', // 9 digits
  //     countryCode: 'ca',
  //     currency: 'cad',
  //   };

  //   const token = await stripe.createTokenWithBankAccount(params);
  //   console.log(token, 'tokentokentokentoken');
  // };

  const generateBankToken = async () => {
    const {profilePicture} = props;
    setLoader(true);
    if (!profilePicture) {
      Toast.show('Please enter a valid id image.');
      setLoader(false);
    } else if (idx(accountNumber, (_) => _.length < 6)) {
      setLoader(false);

      Toast.show('Account number must be 7-12 digit long.');
    } else if (idx(routingNumber, (_) => _.length != 9)) {
      setLoader(false);

      Toast.show('Routing number must be of 9 digits.');
    } else if ((city && city.length) <= 2) {
      setLoader(false);

      Toast.show('Please enter a valid city name.');
    } else if ((zipCode && zipCode.length) < 3) {
      setLoader(false);

      Toast.show('Please enter a valid zipcode.');
    } else if ((state && state.length) <= 2) {
      setLoader(false);

      Toast.show('Please enter a valid state name.');
    } else if ((address && state.address) <= 2) {
      setLoader(false);

      Toast.show('Please enter a valid address.');
    } else if (!dob) {
      setLoader(false);
      Toast.show('Please enter a valid DOB.');
    } else {
      setLoader(false);

      let params = {
        // accountNumber: accountNumber,
        // routingNumber: routingNumber, // 9 digits\
        accountNumber: '000123456789',
        routingNumber: '11000000', // 9 digits
        countryCode: 'ca',
        currency: 'cad',
      };

      try {
        const token = await stripe.createTokenWithBankAccount(params);
        addBankAccount({
          token,
          dob,
          country,
          state,
          city,
          ssn,
          zipCode,
          formatted,
          address,
        });
        setLoader(false);
      } catch (error) {
        Toast.show(`${error}`);
        setLoader(false);
      }
    }

    // console.log(
    //   idx(city, (_) => _.length),
    //   'citycitycity',
    //   city && city.length,
    // );
    // setLoader(true);
    // if (idx(accountNumber, (_) => _.length) < 6) {
    //   setLoader(false);
    //   Toast.show('Please enter a valid account number.');
    // } else if (idx(routingNumber, (_) => _.length) != 9) {
    //   setLoader(false);
    //   Toast.show('Routing number must be of 9 digits.');
    // } else if (city && city.length <= 2) {
    //   setLoader(false);
    //   Toast.show('Please enter a valid city name.');
    // } else if (idx(zipCode, (_) => _.length) < 3) {
    //   setLoader(false);
    //   Toast.show('Please enter a valid zipcode.');
    // } else if (idx(state, (_) => _.length) <= 2) {
    //   setLoader(false);
    //   Toast.show('Please enter a valid state name.');
    // } else if (idx(address, (_) => _.length) <= 2) {
    //   setLoader(false);
    //   Toast.show('Please enter a valid address.');
    // } else {
    //   setLoader(false);

    //   let params = {
    //     // accountNumber: accountNumber,
    //     // routingNumber: routingNumber, // 9 digits\
    //     accountNumber: '000123456789',
    //     routingNumber: '11000000', // 9 digits
    //     countryCode: 'ca',
    //     currency: 'cad',
    //   };

    //   try {
    //     const token = await stripe.createTokenWithBankAccount(params);
    //     addBankAccount({
    //       token,
    //       dob,
    //       country,
    //       state,
    //       city,
    //       ssn,
    //       zipCode,
    //       formatted,
    //       address,
    //     });
    //     setLoader(false);
    //   } catch (error) {
    //     Toast.show(`${error}`);
    //     setLoader(false);
    //   }
    // }
  };

  if (bankDetails.id) {
    return (
      <View
        style={[
          {flex: 1, paddingHorizontal: RFValue(20)},
          defaultStyles.colorBackground,
        ]}>
        <View style={{height: RFPercentage(10), justifyContent: 'center'}}>
          <Text
            style={[
              {
                fontFamily: Fonts.Medium,
                fontSize: RFValue(17),
              },
              defaultStyles.blackTextColor,
            ]}>
            Remove previous account to add a new one
          </Text>
        </View>
        <View
          style={{
            height: RFPercentage(15),
            flexDirection: 'row',
            borderRadius: RFValue(5),
            borderWidth: 1,
            borderColor: colors.Lgrey,
          }}>
          <View
            style={{flex: 0.2, justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={Images.Bank}
              resizeMode="contain"
              style={{
                height: RFValue(25),
                width: RFValue(25),
                tintColor: theme == 'dark' ? 'white' : 'black',
              }}
            />
          </View>
          <View style={{flex: 0.6, justifyContent: 'center'}}>
            <Text
              style={[{fontSize: RFValue(15)}, defaultStyles.blackTextColor]}>
              XXXXXXXXXX
              {idx(bankDetails, (_) => _.external_accounts.data[0].last4)}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              deleteAcc();
            }}
            style={{
              flex: 0.2,
              backgroundColor: colors.Red,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon name={'trash'} color={'white'} size={RFValue(30)} />
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return (
      <KeyboardAwareScrollView
        style={[
          {
            flexGrow: 1,
            paddingHorizontal: RFValue(20),
          },
          defaultStyles.colorBackground,
        ]}
        keyboardShouldPersistTaps="handled">
        <View style={{height: RFPercentage(10), justifyContent: 'center'}}>
          <Text
            style={[
              {
                fontFamily: Fonts.Medium,
                fontSize: RFValue(18),
              },
              defaultStyles.blackTextColor,
            ]}>
            Add Bank Details
          </Text>
        </View>
        <Text
          style={[
            {
              fontFamily: Fonts.Bold,
              fontSize: RFValue(14),
              color: colors.Yellow,
              paddingVertical: RFValue(10),
            },
            defaultStyles.blackTextColor,
          ]}>
          Upload Id image
        </Text>
        <PictureHolder
          setPhoto={setPhoto}
          loading={loader}
          profilePicture={profilePicture}
        />
        <TextInputComponent
          placeholder={'Account Number'}
          onChangeText={setAccountNumber}
          value={accountNumber}
          validationType={'name'}
          buttonStatus={setButtonStatus}
          autoCapitalize={'none'}
          disabled={loader || addingBank}
          keyboardType={'numeric'}
          icon={Images.Bnk}
          blackTextColor={blackTextColor}
          theme={theme}
        />
        {/* <TextInputComponent
          placeholder={'Last 4 digit of SSN'}
          onChangeText={setSsn}
          value={ssn}
          validationType={'ssn'}
          buttonStatus={setButtonStatus}
          autoCapitalize={'none'}
          disabled={loader || addingBank}
          keyboardType={'numeric'}
          icon={Images.Bnk}
          maxLength={4}
        /> */}
        <TextInputComponent
          placeholder={'Routing Number'}
          onChangeText={setRoutingNumber}
          value={routingNumber}
          validationType={'name'}
          buttonStatus={setButtonStatus}
          autoCapitalize={'none'}
          disabled={loader || addingBank}
          keyboardType={'numeric'}
          icon={Images.Bnk}
          maxLength={9}
          blackTextColor={blackTextColor}
        />

        {/* <TextInputComponent
          placeholder={'Account Holder Name'}
          onChangeText={setAccountHolder}
          value={accountHolder}
          validationType={'name'}
          buttonStatus={setButtonStatus}
          autoCapitalize={'none'}
          //   disabled={loading}
          icon={Images.User}
        /> */}
        <TextInputComponent
          placeholder={'City'}
          onChangeText={setCity}
          value={city}
          validationType={'name'}
          buttonStatus={setButtonStatus}
          autoCapitalize={'words'}
          disabled={loader || addingBank}
          icon={Images.Bnk}
        />
        <TextInputComponent
          placeholder={'Zip Code'}
          onChangeText={setZipCode}
          value={zipCode}
          validationType={'name'}
          buttonStatus={setButtonStatus}
          autoCapitalize={'characters'}
          disabled={loader || addingBank}
          icon={Images.Bnk}
        />
        <TextInputComponent
          placeholder={'State'}
          onChangeText={setState}
          value={state}
          validationType={'name'}
          buttonStatus={setButtonStatus}
          autoCapitalize={'words'}
          disabled={loader || addingBank}
          icon={Images.Bnk}
        />
        <TextInputComponent
          placeholder={'Adress Line 1'}
          onChangeText={setAddress}
          value={address}
          validationType={'name'}
          buttonStatus={setButtonStatus}
          autoCapitalize={'words'}
          disabled={loader || addingBank}
          icon={Images.Bnk}
        />
        <DatePicker settinDate={setDob} setUnformatted={setUnformatted} />
        {/* <DropDownList
        data={[{item: 'CA'}]}
        selected={country}
        onSelect={(value) => {
          setCountry(value);
        }}
        openDrop={(value) => {
          setDropOpen(value);
        }}
        style={{
          height: RFValue(63),
          width: '100%',
          borderBottomWidth: 1,
          borderColor: colors.Yellow,
          borderRadius: RFValue(5),
        }}
        icon={Images.Pin2}
      /> */}
        {/* <DropDownList
        data={[{item: 'CAD'}]}
        selected={curency}
        onSelect={(value) => {
          setCurrency(value);
        }}
        openDrop={(value) => {
          setDropOpen(value);
        }}
        style={{
          height: RFValue(65),
          width: '100%',
          borderBottomWidth: 1,
          borderColor: colors.Yellow,
          borderRadius: RFValue(5),
        }}
        icon={Images.Dollar}
      /> */}
        <Button
          title={'Add Bank Account'}
          loading={loader || addingBank}
          disabled={loader || addingBank}
          onPress={() => {
            generateBankToken();
          }}
          containerHeight={RFValue(80)}
          justifyContent={'flex-end'}
        />
      </KeyboardAwareScrollView>
    );
  }
}
export default BankDetails = React.memo(BankDetails);
