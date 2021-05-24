import {Platform, AppState} from 'react-native';
import firebase, {NotificationOpen} from 'react-native-firebase';
import {store} from '../store/setup';
import idx from 'idx';
import {notificationDetails} from '../actions/authActions';

/*
Get the Fcm token of the device
*/
const getToken = async () => {
  const fcmToken = await firebase.messaging().getToken();

  if (fcmToken) {
    let deviceType = Platform.OS;
    // console.log(fcmToken, 'fcmTokenfcmTokenfcmTokenfcmToken');
    store.dispatch(notificationDetails({fcmToken, deviceType}));
  } else {
    // user doesn't have a device token yet
  }
};

/*
All Listeners related to Firebase
*/
let lastId = 0;
export const listeners = async (response) => {
  const channel = new firebase.notifications.Android.Channel(
    'channel1',
    'Lease Tour',
    firebase.notifications.Android.Importance.High,
  )
    .setDescription('Lease Tour')
    .setSound('default');

  firebase.notifications().android.createChannel(channel);
  this.notificationListener = firebase
    .notifications()
    .onNotification((notification) => {
      response(notification);
      const localNotification = new firebase.notifications.Notification({
        sound: 'default',
        show_in_foreground: true,
      })
        .setSound('default')
        .setNotificationId(notification && notification.notificationId)
        .setTitle(notification && notification.title)
        .setBody(notification && notification.body)
        .android.setChannelId('channel1') // e.g. the id you chose above
        .android.setSmallIcon('@drawable/icon') // create this icon in Android Studio
        .android.setPriority(firebase.notifications.Android.Priority.High)
        .android.setAutoCancel(true);

      if (lastId != notification.notificationId) {
        lastId = notification.notificationId;
        firebase
          .notifications()
          .displayNotification(localNotification)
          .catch((err) => console.error(err));
      }
    });

  /*
   * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
   * */
};
/*
when app is killed or not in memory push noptification come then cick on the push notification will call that function
*/

export const onTapped = (call) => {
  firebase.notifications().onNotificationOpened((notificationOpen) => {
    call(notificationOpen.notification);
  });
};

export const getInitialNotification = async (cb) => {
  const notificationOpen: NotificationOpen = await firebase
    .notifications()
    .getInitialNotification();

  if (notificationOpen) {
    cb(notificationOpen);
    firebase.notifications().removeAllDeliveredNotifications();

    //When the app is killed and tapping on the push will call this function
  }
};
/**
 * Checking the app has permission for using firebase in ios
 */
const checkPermision = async () => {
  const enabled = await firebase.messaging().hasPermission();
  if (enabled) {
    trigerAllEvents();
  } else {
    requestpermission();
  }
};
/**
 * Requesting the app permission for firebase in ios
 */
const requestpermission = async () => {
  try {
    await firebase.messaging().requestPermission();
    const enabled2 = await firebase.messaging().hasPermission();
    await firebase.messaging().ios.registerForRemoteNotifications();

    if (enabled2) {
      trigerAllEvents();
    } else {
      trigerAllEvents();
      requestpermission();
    }
  } catch (error) {
    alert(error);

    // User has rejected permissions
  }
};

const trigerAllEvents = () => {
  getToken();
  getInitialNotification(() => {});
  listeners((response) => {});
  onTapped(() => {});
};
/*
Remove All Listeners
*/
export const removeListeners = () => {
  this.notificationDisplayedListener();
  this.notificationListener();
  this.notificationOpenedListener();
};
/**
 It loads the fcm
 */
export const pushNotifificationInit = async () => {
  console.log('fcmTokenfcmToken11');

  if (Platform.OS === 'ios') {
    checkPermision();
  } else {
    trigerAllEvents();
  }
};
