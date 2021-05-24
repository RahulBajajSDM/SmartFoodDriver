import {
  checkMultiple,
  requestMultiple,
  PERMISSIONS,
  openSettings,
} from 'react-native-permissions';
import {Platform} from 'react-native';

const PermissionManager = (permissionGranted) => {
  const checkPermissionsAndroid = () => {
    checkMultiple([
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.RECORD_AUDIO,
    ]).then((statuses) => {
      if (
        statuses[PERMISSIONS.ANDROID.CAMERA] == 'granted' ||
        statuses[PERMISSIONS.ANDROID.RECORD_AUDIO] == 'granted'
      ) {
        permissionGranted(true);
      } else {
        requestPermissionsAndroid();
      }
    });
  };

  const checkPermissionsIos = () => {
    checkMultiple([PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.MICROPHONE]).then(
      (statuses) => {
        if (
          statuses[PERMISSIONS.IOS.CAMERA] == 'granted' ||
          statuses[PERMISSIONS.IOS.MICROPHONE] == 'granted'
        ) {
          permissionGranted(true);
        } else {
          requestPermissionsIos();
        }
      },
    );
  };

  const requestPermissionsAndroid = () => {
    requestMultiple([
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.RECORD_AUDIO,
    ]).then((statuses) => {
      if (
        statuses[PERMISSIONS.ANDROID.CAMERA] == 'granted' ||
        statuses[PERMISSIONS.ANDROID.RECORD_AUDIO] == 'granted'
      ) {
        permissionGranted(true);
      } else if (
        statuses[PERMISSIONS.ANDROID.CAMERA] == 'denied' ||
        statuses[PERMISSIONS.ANDROID.RECORD_AUDIO] == 'denied'
      ) {
        PermissionManager(); //Re requesting
      } else if (
        statuses[PERMISSIONS.ANDROID.CAMERA] == 'blocked' ||
        statuses[PERMISSIONS.ANDROID.RECORD_AUDIO] == 'blocked'
      ) {
        openSettings().catch(() => console.log('cannot open settings'));
      }
    });
  };

  const requestPermissionsIos = () => {
    requestMultiple([PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.MICROPHONE]).then(
      (statuses) => {
        if (
          statuses[PERMISSIONS.IOS.CAMERA] == 'granted' ||
          statuses[PERMISSIONS.IOS.MICROPHONE] == 'granted'
        ) {
          permissionGranted(true);
        } else if (
          statuses[PERMISSIONS.IOS.CAMERA] == 'denied' ||
          statuses[PERMISSIONS.IOS.MICROPHONE] == 'denied'
        ) {
          PermissionManager(); //Re requesting
        } else if (
          statuses[PERMISSIONS.IOS.CAMERA] == 'blocked' ||
          statuses[PERMISSIONS.IOS.MICROPHONE] == 'blocked'
        ) {
          openSettings().catch(() => console.log('cannot open settings'));
        }
      },
    );
  };

  if (Platform.os == 'ios') {
    checkPermissionsIos();
  } else {
    checkPermissionsAndroid();
  }
};

export default PermissionManager;
