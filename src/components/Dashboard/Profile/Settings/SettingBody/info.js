/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable module-resolver/use-alias */
import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import {useSelector} from 'react-redux';
import {RFValue} from 'react-native-responsive-fontsize';
import * as Images from './assets';
import colors from 'constants/colors';
import {setPassword} from 'actions/authActions';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const {height} = Dimensions.get('window');

function Info(props) {
  const {
    saveDriverDetails,
    changePassword,
    uploadingDetails,
    driverDetails,
    changingPassword,
    deaultStyles,
    theme,
  } = props;
  // const [value, onChangeText] = React.useState('Useless Placeholder');
  const [address, setAddress] = useState('');
  const [address1, setAddress1] = useState('');
  const [city, setcity] = useState('');
  const [state, setstate] = useState('');
  const [zip, setzip] = useState('');
  const [vyear, setvyear] = useState('');
  const [vcolor, setvcolor] = useState('');
  const [vtype, setvtype] = useState('');
  const [licenceplate, setlicenceplate] = useState('');
  const [drivingLicence, setdrivingLicence] = useState('');
  const [insuranceNumber, setinsuranceNumber] = useState('');
  const [oldpass, setoldpass] = useState('');
  const [newPass, setnewPass] = useState('');

  useEffect(() => {
    if (driverDetails) {
      setAddress(driverDetails.address || ''),
        setAddress1(driverDetails.address2 || ''),
        setcity(driverDetails.city || ''),
        setstate(driverDetails.state || ''),
        setzip(driverDetails.zip || ''),
        setvyear(driverDetails.vehicleYear || ''),
        setvcolor(driverDetails.color || ''),
        setvtype(driverDetails.vehicleType || ''),
        setlicenceplate(driverDetails.vehicleNo || ''),
        setdrivingLicence(driverDetails.licenseNo || ''),
        setinsuranceNumber(driverDetails.insuranceNo || '');
    }
  }, [driverDetails]);
  return (
    <View
      style={[styles.container, styles.shadow, deaultStyles.colorBackground]}>
      <View style={{flex: 0.07}} />
      <View style={{flex: 0.93}}>
        <ScrollView
          contentContainerStyle={[
            {
              paddingBottom: 10,
            },
          ]}
          showsVerticalScrollIndicator={false}>
          {/* Address details */}
          <View style={{flexDirection: 'row', paddingVertical: 10}}>
            <View
              style={{
                flex: 0.2,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image source={Images.Address} resizeMode="contain" />
            </View>
            <View style={{flex: 0.8}}>
              <View style={styles.inputTextContainer}>
                <TextInput
                  style={[styles.inputBox, deaultStyles.blackTextColor]}
                  placeholder={'Address*'}
                  onChangeText={(text) => setAddress(text)}
                  value={address}
                  placeholderTextColor={
                    theme == 'dark' ? colors.White : colors.DarkGray
                  }
                />
              </View>
              <View style={styles.inputTextContainer}>
                <TextInput
                  style={[styles.inputBox, deaultStyles.blackTextColor]}
                  placeholder={'Address 2'}
                  onChangeText={(text) => setAddress1(text)}
                  value={address1}
                  placeholderTextColor={
                    theme == 'dark' ? colors.White : colors.DarkGray
                  }
                />
              </View>
              <View style={styles.inputTextContainer}>
                <TextInput
                  style={[styles.inputBox, deaultStyles.blackTextColor]}
                  placeholder={'City*'}
                  onChangeText={(text) => setcity(text)}
                  value={city}
                  placeholderTextColor={
                    theme == 'dark' ? colors.White : colors.DarkGray
                  }
                />
              </View>
              <View style={[styles.inputTextContainerRow]}>
                <View style={{flex: 0.5, paddingRight: 5}}>
                  <TextInput
                    style={[styles.inputBox, deaultStyles.blackTextColor]}
                    placeholder={'State*'}
                    onChangeText={(text) => setstate(text)}
                    value={state}
                    placeholderTextColor={
                      theme == 'dark' ? colors.White : colors.DarkGray
                    }
                  />
                </View>
                <View style={{flex: 0.5, paddingLeft: 5}}>
                  <TextInput
                    style={[styles.inputBox, deaultStyles.blackTextColor]}
                    placeholder={'Province*'}
                    onChangeText={(text) => setzip(text)}
                    value={zip}
                    placeholderTextColor={
                      theme == 'dark' ? colors.White : colors.DarkGray
                    }
                  />
                </View>
              </View>
            </View>
          </View>

          {/* Vehicle details */}
          <View style={{flexDirection: 'row', paddingVertical: 10}}>
            <View
              style={{
                flex: 0.2,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image source={Images.Vehicle} resizeMode="contain" />
            </View>
            <View style={{flex: 0.8}}>
              <View style={styles.inputTextContainerRow}>
                <View style={{flex: 0.3, paddingRight: 5}}>
                  <TextInput
                    style={[styles.inputBox, deaultStyles.blackTextColor]}
                    placeholder={'Year*'}
                    value={vyear}
                    onChangeText={(text) => setvyear(text)}
                    maxLength={4}
                    placeholderTextColor={
                      theme == 'dark' ? colors.White : colors.DarkGray
                    }
                  />
                </View>
                <View style={{flex: 0.7, paddingLeft: 5}}>
                  <TextInput
                    style={[styles.inputBox, deaultStyles.blackTextColor]}
                    placeholder={'Vehicle Type*'}
                    onChangeText={(text) => setvtype(text)}
                    value={vtype}
                    placeholderTextColor={
                      theme == 'dark' ? colors.White : colors.DarkGray
                    }
                  />
                </View>
              </View>
              <View style={styles.inputTextContainerRow}>
                <View style={{flex: 0.4, paddingRight: 5}}>
                  <TextInput
                    style={[styles.inputBox, deaultStyles.blackTextColor]}
                    placeholder={'Color*'}
                    onChangeText={(text) => setvcolor(text)}
                    value={vcolor}
                    placeholderTextColor={
                      theme == 'dark' ? colors.White : colors.Grey
                    }
                    placeholderTextColor={
                      theme == 'dark' ? colors.White : colors.DarkGray
                    }
                  />
                </View>
                <View style={{flex: 0.6, paddingLeft: 5}}>
                  <TextInput
                    style={[styles.inputBox, deaultStyles.blackTextColor]}
                    placeholder={'Licence Plat*'}
                    onChangeText={(text) => setlicenceplate(text)}
                    value={licenceplate}
                    placeholderTextColor={
                      theme == 'dark' ? colors.White : colors.DarkGray
                    }
                  />
                </View>
              </View>
            </View>
          </View>

          {/* Document details */}
          <View style={{flexDirection: 'row', paddingVertical: 10}}>
            <View
              style={{
                flex: 0.2,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image source={Images.IdKey} resizeMode="contain" />
            </View>
            <View style={{flex: 0.8}}>
              <View style={styles.inputTextContainer}>
                <TextInput
                  style={[styles.inputBox, deaultStyles.blackTextColor]}
                  placeholder={'Driving Licence*'}
                  onChangeText={(text) => setdrivingLicence(text)}
                  value={drivingLicence}
                  placeholderTextColor={
                    theme == 'dark' ? colors.White : colors.DarkGray
                  }
                />
              </View>
              <View style={styles.inputTextContainer}>
                <TextInput
                  style={[styles.inputBox, deaultStyles.blackTextColor]}
                  placeholder={'Insurance Caverage*'}
                  onChangeText={(text) => setinsuranceNumber(text)}
                  value={insuranceNumber}
                  placeholderTextColor={
                    theme == 'dark' ? colors.White : colors.DarkGray
                  }
                />
              </View>
            </View>
          </View>

          {/* Reset password details */}
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 0.2}}></View>
            <View style={{flex: 0.8, paddingHorizontal: 15}}>
              <TextInput
                style={[styles.inputBox, deaultStyles.blackTextColor]}
                placeholder={'Old Password*'}
                placeholderTextColor={
                  theme == 'dark' ? colors.White : colors.DarkGray
                }
                onChangeText={(text) => setoldpass(text)}
                value={oldpass}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 10,
            }}>
            <View
              style={{
                flex: 0.2,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image source={Images.Key} resizeMode="contain" />
            </View>
            <View style={{flex: 0.8}}>
              <View
                style={[styles.inputTextContainerRow, {alignItems: 'center'}]}>
                <View style={{flex: 0.5}}>
                  <TextInput
                    style={[styles.inputBox, deaultStyles.blackTextColor]}
                    placeholder={'Password*'}
                    onChangeText={(text) => setPassword(text)}
                    placeholderTextColor={
                      theme == 'dark' ? colors.White : colors.DarkGray
                    }
                    value={newPass}
                  />
                </View>
                <View style={{flex: 0.5, paddingLeft: 10}}>
                  <TouchableOpacity
                    disabled={uploadingDetails || changingPassword}
                    onPress={() => {
                      changePassword(oldpass, newPass);
                    }}
                    style={{
                      backgroundColor: '#4C84FF',
                      paddingHorizontal: 10,
                      paddingVertical: 8,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: RFValue(5),
                      height: RFValue(38),
                    }}>
                    {changingPassword ? (
                      <ActivityIndicator />
                    ) : (
                      <Text
                        style={{
                          color: colors.White,
                          fontWeight: 'bold',
                          fontSize: RFValue(10),
                        }}>
                        Change Password
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <TouchableOpacity
            disabled={uploadingDetails || changingPassword}
            onPress={() => {
              saveDriverDetails(
                address,
                address1,
                city,
                state,
                zip,
                vyear,
                vcolor,
                vtype,
                licenceplate,
                drivingLicence,
                insuranceNumber,
              );
            }}
            style={{
              backgroundColor: '#77C50A',
              marginHorizontal: RFValue(120),
              paddingHorizontal: 10,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 8,
              marginTop: 10,
              borderRadius: 5,
            }}>
            {uploadingDetails ? (
              <ActivityIndicator />
            ) : (
              <Text style={{color: colors.White, fontWeight: 'bold'}}>
                Save
              </Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}
export default Info;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    borderTopLeftRadius: 25,
    borderTopEndRadius: 25,
  },

  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  inputBox: {
    height: 40,
    borderColor: '#70707064',
    borderWidth: 1,
    paddingHorizontal: 5,
    color: colors.Black,
  },
  inputTextContainer: {paddingHorizontal: 10, paddingTop: 10},
  inputTextContainerRow: {
    paddingHorizontal: 10,
    paddingTop: 10,
    flexDirection: 'row',
  },
});
