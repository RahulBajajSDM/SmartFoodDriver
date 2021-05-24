/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable module-resolver/use-alias */
import * as Images from 'components/Dashboard/Profile/Settings/SettingBody/assets';
import colors from 'constants/colors';
import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/FontAwesome';

const {height} = Dimensions.get('window');

function Settings(props) {
  const {
    goToAbout,
    goToSettings,
    goToHelp,
    gotToTerms,
    logout,
    deaultStyles,
    theme,
  } = props;

  const Cards = (value) => {
    return (
      <TouchableOpacity
        onPress={() => value.onPress()}
        style={{
          height: RFValue(60),
          flexDirection: 'row',
          paddingVertical: RFValue(5),
        }}>
        <View
          style={{
            flex: 0.15,
            alignItems: 'center',
            paddingVertical: RFValue(5),
          }}>
          <Image
            source={value.icon}
            resizeMode="contain"
            style={{tintColor: theme == 'dark' ? 'white' : 'black'}}
          />
        </View>
        <View style={{flex: 0.8}}>
          <Text
            style={[
              {fontSize: RFValue(17), color: colors.Setting},
              deaultStyles.blackTextColor,
            ]}>
            {value.title}
          </Text>
          <Text
            style={[
              {fontSize: RFValue(12), color: colors.Grey},
              deaultStyles.blackTextColor,
            ]}>
            {value.subtitile}
          </Text>
        </View>
        <View style={{flex: 0.05, justifyContent: 'center'}}>
          <Icon
            name={'chevron-right'}
            size={RFValue(15)}
            color={theme == 'dark' ? 'white' : colors.Black}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const Header = (value) => {
    return (
      <View style={[{height: RFValue(45)}]}>
        <Text
          style={[
            {fontSize: RFValue(17), color: colors.Setting},
            deaultStyles.blackTextColor,
          ]}>
          {value.title}
        </Text>
        <Text
          style={[
            {fontSize: RFValue(12), color: colors.Grey},
            deaultStyles.blackTextColor,
          ]}>
          {value.subtitile}
        </Text>
      </View>
    );
  };

  return (
    <View
      style={[
        {
          flex: 1,

          borderTopLeftRadius: 25,
          borderTopEndRadius: 25,
          paddingHorizontal: 10,
          paddingTop: 50,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,
          elevation: 5,
        },
        deaultStyles.colorBackground,
      ]}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: RFValue(20),
        }}
        showsVerticalScrollIndicator={false}>
        <Header
          title={'Account Settings'}
          subtitile={'Manage general settings, and payout options.'}
        />
        <Cards
          title={'About'}
          subtitile={
            'Information about the application version, and available updates.'
          }
          icon={Images.Info}
          onPress={goToAbout}
        />
        <Cards
          title={'General Settings'}
          subtitile={'General Notification settings & Appearance settings.'}
          icon={Images.Settings}
          onPress={goToSettings}
        />
        <Header
          title={'Payout Account'}
          subtitile={'Manage general payment account options.'}
        />
        <Cards
          title={'Account details.'}
          subtitile={'Account Details for commissions payouts.'}
          icon={Images.Bank}
          onPress={goToHelp}
        />
        <Header
          title={'Legal Documents'}
          subtitile={'General Legal Documentation.'}
        />
        <Cards
          title={'Legal'}
          subtitile={'Legal Information.'}
          icon={Images.Board}
          onPress={() => gotToTerms(0)}
        />
        <Cards
          title={'Terms of use'}
          subtitile={'General Terms of use for the application(s).'}
          icon={Images.Accept}
          onPress={() => gotToTerms(1)}
        />
        <Cards
          title={'Privacy Policy'}
          subtitile={'Application(s) Privacy Policy for Turbo2go.'}
          icon={Images.Terms}
          onPress={() => gotToTerms(2)}
        />
        <TouchableOpacity
          style={{alignItems: 'flex-end', paddingBottom: 10}}
          onPress={props.logoutUser}>
          <Image source={Images.Logout} resizeMode="contain" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
export default Settings;
