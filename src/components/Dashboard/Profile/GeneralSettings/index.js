/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable module-resolver/use-alias */
import ToggleSwitch from '../../../../components/Common/ToggleSwitch'; // Update your component path
import colors from 'constants/colors';
import Fonts from 'constants/fonts';
import React, {useState, useEffect} from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import idx from 'helpers/Idx';
import {getStyles} from 'helpers/themeStyles';
import * as Images from 'assets';

function GeneralSettings(props) {
  const [notification, setNotification] = useState(true);
  const [order, setNewOrder] = useState(true);
  const [cancelOrder, setCancelOrder] = useState(true);
  const [ready, setReady] = useState(true);
  const [driverHere, setDriverHere] = useState(true);
  const [newMessage, setNewMessage] = useState(true);
  const {
    notificationStatus,
    updateNotification,
    manageThemeSelection,
    theme,
  } = props;
  let defaultStyle = getStyles(theme);

  useEffect(() => {
    setNotification(idx(notificationStatus, (_) => _.isPushNotification));
    setNewOrder(idx(notificationStatus, (_) => _.userNotifications.newOrder));
    setCancelOrder(
      idx(notificationStatus, (_) => _.userNotifications.cancelledOrder),
    );
    setReady(idx(notificationStatus, (_) => _.userNotifications.orderReady));
    setNewMessage(
      idx(notificationStatus, (_) => _.userNotifications.newMessage),
    );
    setDriverHere(
      idx(notificationStatus, (_) => _.userNotifications.driverHere),
    );
  }, [notificationStatus]);
  const changeNotification = (value) => {
    if (value.title == 'Notifications') {
      let notificationBody = {
        isPushNotification: !notification,
        userNotifications: {
          newOrder: !notification,
          cancelledOrder: !notification,
          orderReady: !notification,
          driverHere: !notification,
          newMessage: !notification,
        },
      };
      setNotification(!notification);
      setNewOrder(!notification);
      setCancelOrder(!notification);
      setReady(!notification);
      setNewMessage(!notification);
      setDriverHere(!notification);
      updateNotification(notificationBody);
    } else if (value.title == 'New Order') {
      let notificationBody = {
        isPushNotification: notification,
        userNotifications: {
          newOrder: !order,
          cancelledOrder: cancelOrder,
          orderReady: ready,
          driverHere: driverHere,
          newMessage: newMessage,
        },
      };
      updateNotification(notificationBody);

      setNewOrder(!notification);
    } else if (value.title == 'Cancelled Order') {
      let notificationBody = {
        isPushNotification: notification,
        userNotifications: {
          newOrder: order,
          cancelledOrder: !cancelOrder,
          orderReady: ready,
          driverHere: driverHere,
          newMessage: newMessage,
        },
      };
      setCancelOrder(!cancelOrder);
      updateNotification(notificationBody);
    } else if (value.title == 'Order Ready') {
      let notificationBody = {
        isPushNotification: notification,
        userNotifications: {
          newOrder: order,
          cancelledOrder: cancelOrder,
          orderReady: !ready,
          driverHere: driverHere,
          newMessage: newMessage,
        },
      };
      setReady(!ready);
      updateNotification(notificationBody);
    } else if (value.title == 'Driver Here') {
      let notificationBody = {
        isPushNotification: notification,
        userNotifications: {
          newOrder: order,
          cancelledOrder: cancelOrder,
          orderReady: ready,
          driverHere: !driverHere,
          newMessage: newMessage,
        },
      };
      setDriverHere(!driverHere);
      updateNotification(notificationBody);
    } else if (value.title == 'New Message') {
      let notificationBody = {
        isPushNotification: notification,
        userNotifications: {
          newOrder: order,
          cancelledOrder: cancelOrder,
          orderReady: ready,
          driverHere: driverHere,
          newMessage: !newMessage,
        },
      };
      setNewMessage(!newMessage);
      updateNotification(notificationBody);
    }
  };

  const ToggleBody = (value) => {
    return (
      <View
        style={{
          height: RFValue(45),
          flexDirection: 'row',
        }}>
        <View
          style={{flex: 0.15, justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              height: RFValue(25),
              width: RFValue(25),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={value.icon}
              resizeMode="contain"
              style={{height: RFValue(22), width: RFValue(22)}}
            />
          </View>
        </View>
        <View
          style={{
            flex: 0.55,
            borderBottomWidth: value.title != 'New Message' ? 0.4 : 0,
            borderBottomColor: colors.Lgrey,
            justifyContent: 'center',
          }}>
          <Text style={[value.textStyle, defaultStyle.blackTextColor]}>
            {value.title}
          </Text>
        </View>
        <View
          style={{
            flex: 0.3,
            borderBottomWidth: value.title != 'New Message' ? 0.4 : 0,
            borderBottomColor: colors.Lgrey,
            justifyContent: 'center',
            alignItems: 'flex-end',
            paddingRight: RFValue(10),
          }}>
          <ToggleSwitch
            isOn={value.value} // There should be a state like this.state.isOn(Set default value)
            onColor="#77C50A"
            offColor={colors.Lgrey}
            labelStyle={{color: '#B4B4B4', fontWeight: '900'}}
            size="medium"
            onToggle={() => {
              value.setValue(!value.value);
              changeNotification(value);
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <View
      style={[
        {flex: 1, backgroundColor: colors.Background},
        defaultStyle.container,
      ]}>
      <View
        style={{
          flex: 0.5,
          borderColor: colors.Lgrey,
          justifyContent: 'space-between',
          backgroundColor: theme == 'dark' ? colors.Grey : colors.Background,
          borderTopWidth: theme == 'dark' ? 0.4 : 0.5,
          borderBottomWidth: theme == 'dark' ? 0.4 : 0.5,
        }}>
        <ToggleBody
          title={'Notifications'}
          textStyle={{color: colors.Black, fontSize: RFValue(17)}}
          value={notification}
          // value={idx(notificationStatus, (_) => _.isPushNotification)}
          setValue={setNotification}
          icon={Images.Notif}
        />
        <ToggleBody
          title={'New Order'}
          textStyle={{color: colors.Lgrey, fontSize: RFValue(15)}}
          value={order}
          setValue={setNewOrder}
          icon={Images.NewOrd}
        />
        <ToggleBody
          title={'Cancelled Order'}
          textStyle={{color: colors.Lgrey, fontSize: RFValue(15)}}
          value={cancelOrder}
          setValue={setCancelOrder}
          icon={Images.CanOrd}
        />
        <ToggleBody
          title={'Work Ready'}
          textStyle={{color: colors.Lgrey, fontSize: RFValue(15)}}
          value={ready}
          setValue={setReady}
          icon={Images.OrdRdy}
        />
        <ToggleBody
          title={'New Message'}
          textStyle={{color: colors.Lgrey, fontSize: RFValue(15)}}
          value={newMessage}
          setValue={setNewMessage}
          icon={Images.NewMsg}
        />
      </View>
      <View
        style={{
          flex: 0.05,
          justifyContent: 'center',
          paddingHorizontal: RFValue(20),
        }}>
        <Text
          style={[
            {
              color: colors.Black,
              fontSize: RFValue(17),
              fontFamily: Fonts.Medium,
            },
            defaultStyle.blackTextColor,
          ]}>
          Appearence
        </Text>
      </View>
      <View
        style={{
          flex: 0.3,
          flexDirection: 'row',
          borderColor: colors.Lgrey,
          backgroundColor: theme == 'dark' ? colors.Grey : colors.Background,
          borderBottomWidth: theme == 'dark' ? 1 : 0.5,
          borderTopWidth: theme == 'dark' ? 1 : 0.5,
          // justifyContent: 'space-evenly',
          // alignItems: 'center',
        }}>
        <View
          style={{flex: 0.45, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              manageThemeSelection('default');
            }}
            style={{
              height: RFValue(85),
              width: RFValue(55),
              borderRadius: RFValue(5),
              borderWidth: 1,
              borderColor: colors.Lgrey,
              backgroundColor: colors.White,
              borderWidth: 1,
            }}
          />
          <Text
            style={[
              {
                fontSize: RFValue(17),
                fontFamily: Fonts.Regular,
                paddingVertical: RFValue(10),
              },
              defaultStyle.blackTextColor,
            ]}>
            Light
          </Text>
          <View
            style={{
              height: RFValue(10),
              width: RFValue(10),
              borderRadius: 100,
              borderWidth: 1,
              backgroundColor:
                theme === 'default' ? colors.Lgrey : colors.White,
            }}></View>
        </View>

        <View
          style={{flex: 0.1, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={[
              {color: colors.Lgrey, fontSize: RFValue(17)},
              defaultStyle.blackTextColor,
            ]}>
            VS
          </Text>
        </View>
        <View
          style={{flex: 0.45, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              manageThemeSelection('dark');
            }}
            style={{
              height: RFValue(85),
              width: RFValue(55),
              borderRadius: RFValue(5),
              borderWidth: 1,
              borderColor: colors.Lgrey,
              backgroundColor: colors.Lgrey,
            }}
          />
          <Text
            style={[
              {
                fontSize: RFValue(17),
                fontFamily: Fonts.Regular,
                paddingVertical: RFValue(10),
              },
              defaultStyle.blackTextColor,
            ]}>
            Dark
          </Text>
          <View
            style={{
              height: RFValue(10),
              width: RFValue(10),
              borderRadius: 100,
              borderWidth: 1,
              backgroundColor: theme === 'dark' ? colors.Lgrey : colors.White,
            }}></View>
        </View>
      </View>
    </View>
  );
}
export default GeneralSettings;
