import React, {useState} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import {RFValue, RFPercentage} from 'react-native-responsive-fontsize';
import Colors from 'constants/colors';
import * as Images from 'assets';
import Fonts from 'constants/fonts';
import {Tab} from 'components/Common/tabSwitcher';
import IconsFa from 'react-native-vector-icons/FontAwesome';

const Home = (props) => {
  const {onTabPress, userPresent, completedServiceStatus} = props;
  const [selectedTab, setSelectedTab] = useState('Search');
  const homeTab = selectedTab == 'Home';
  const orderTab = selectedTab == 'Order';
  const checkoutTab = selectedTab == 'Checkout';
  const profileTab = selectedTab == 'Profile';
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.tabs,
          {
            backgroundColor: homeTab ? Colors.Lblue : Colors.White,
          },
        ]}>
        <Tab
          userPresent={userPresent}
          onTabPress={onTabPress}
          id="Home"
          tabSelected={() => {
            setSelectedTab('Home');
          }}>
          <View
            style={[
              styles.selectedTab,
              {
                width: homeTab ? RFValue(45) : '100%',
                borderRadius: homeTab ? RFPercentage(20) : 0,
              },
            ]}>
            <IconsFa
              name={'home'}
              size={RFValue(20)}
              color={homeTab ? Colors.Primary : 'black'}
            />

            <Text
              style={{
                fontSize: RFValue(10),
                color: homeTab ? Colors.Primary : 'black',
                fontFamily: Fonts.REGULAR,
              }}>
              Home
            </Text>
          </View>
        </Tab>
      </View>
      <View
        style={[
          styles.tabs,
          {
            backgroundColor: checkoutTab ? Colors.Lblue : Colors.White,
          },
        ]}>
        <Tab
          userPresent={userPresent}
          onTabPress={onTabPress}
          id="Checkout"
          tabSelected={() => {
            setSelectedTab('Checkout');
          }}>
          <View
            style={[
              styles.selectedTab,
              {
                width: checkoutTab ? RFValue(45) : '100%',
                borderRadius: checkoutTab ? RFPercentage(20) : 0,
              },
            ]}>
            <IconsFa
              name={'bookmark'}
              size={RFValue(20)}
              color={checkoutTab ? Colors.Primary : 'black'}
            />

            <Text
              style={{
                fontSize: RFValue(10),
                color: checkoutTab ? Colors.Primary : 'black',
                fontFamily: Fonts.REGULAR,
              }}>
              Checkout
            </Text>
          </View>
        </Tab>
      </View>

      <View
        style={[
          styles.tabs,
          {
            backgroundColor: orderTab ? Colors.Lblue : Colors.White,
          },
        ]}>
        <Tab
          userPresent={userPresent}
          onTabPress={onTabPress}
          completedServiceStatus={completedServiceStatus}
          id="Order"
          tabSelected={() => {
            setSelectedTab('Order');
          }}>
          <View
            style={[
              styles.selectedTab,
              {
                width: orderTab ? RFValue(45) : '100%',
                borderRadius: orderTab ? RFPercentage(20) : 0,
              },
            ]}>
            <IconsFa
              name={'user'}
              size={RFValue(20)}
              color={orderTab ? Colors.Primary : 'black'}
            />

            <Text
              style={{
                fontSize: RFValue(10),
                color: orderTab ? Colors.Primary : 'black',
                fontFamily: Fonts.REGULAR,
              }}>
              Orders
            </Text>
          </View>
        </Tab>
      </View>
      <View
        style={[
          styles.tabs,
          {
            backgroundColor: profileTab ? Colors.Lblue : Colors.White,
          },
        ]}>
        <Tab
          userPresent={userPresent}
          onTabPress={onTabPress}
          id="Profile"
          tabSelected={() => {
            setSelectedTab('Profile');
          }}>
          <View
            style={[
              styles.selectedTab,
              {
                width: profileTab ? RFValue(45) : '100%',
                borderRadius: profileTab ? RFPercentage(20) : 0,
              },
            ]}>
            <IconsFa
              name={'user'}
              size={RFValue(20)}
              color={profileTab ? Colors.Primary : 'black'}
            />
            <Text
              style={{
                fontSize: RFValue(10),
                color: profileTab ? Colors.Primary : 'black',
                fontFamily: Fonts.REGULAR,
              }}>
              Profile
            </Text>
          </View>
        </Tab>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: RFPercentage(10),
    flexDirection: 'row',
    backgroundColor: Colors.White,

    justifyContent: 'center',
  },
  selectedTab: {
    height: RFValue(45),
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {tintColor: Colors.Black},
  tabs: {
    flex: 0.25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Home;
