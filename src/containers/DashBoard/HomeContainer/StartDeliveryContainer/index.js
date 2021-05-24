/* eslint-disable module-resolver/use-alias */
import {logout} from 'actions/authActions';
import React, {Component, lazy} from 'react';
import {
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Alert,
  Linking,
  ToastAndroid,
} from 'react-native';
import {connect} from 'react-redux';
import Constants from '../../../../constants';
// import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
import Geolocation from 'react-native-geolocation-service';
import Toast from 'react-native-simple-toast';

import appConfig from './../../../../../app.json';
import idx from 'idx';
import OrderCompletion from 'components/Modals/OrderCompletion';
const StartOrderComponent = lazy(() =>
  import('components/Dashboard/Home/StartOrder'),
);

import {
  updateUserLiveLocation,
  updateUserCurrentLocation,
} from 'actions/appConfigActions';

import {
  updateSelectedOrderStatus,
  tggleAvailability,
  openPaymentSucessModal,
  customOrderStatus,
} from 'actions/serviceRequestActions';

class StartDeliveryContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {isLoading: true, completionModal: false};
  }

  componentDidMount = () => {
    const {currentSelectedOrder} = this.props;
    if (
      currentSelectedOrder &&
      currentSelectedOrder.driverStatus !== '' &&
      currentSelectedOrder.driverStatus !== 'Completed'
    ) {
      this.getLocationUpdates();
    }
    this.getLocation();
  };

  logout = () => {
    const {logout} = this.props;
    logout();
  };

  hasLocationPermissionIOS = async () => {
    const openSetting = () => {
      Linking.openSettings().catch(() => {
        Alert.alert('Unable to open settings');
      });
    };
    const status = await Geolocation.requestAuthorization('whenInUse');

    if (status === 'granted') {
      return true;
    }

    if (status === 'denied') {
      Alert.alert('Location permission denied');
    }

    if (status === 'disabled') {
      Alert.alert(
        `Turn on Location Services to allow "${appConfig.displayName}" to determine your location.`,
        '',
        [
          {text: 'Go to Settings', onPress: openSetting},
          {text: "Don't Use Location", onPress: () => {}},
        ],
      );
    }

    return false;
  };

  hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await this.hasLocationPermissionIOS();
      return hasPermission;
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  };

  getLocationUpdates = async () => {
    const {updateUserLiveLocation, updateUserCurrentLocation} = this.props;
    const hasLocationPermission = await this.hasLocationPermission();

    if (!hasLocationPermission) {
      return;
    }

    this.setState({updatesEnabled: true}, () => {
      this.watchId = Geolocation.watchPosition(
        (position) => {
          let sourceLatitude = idx(position, (_) => _.coords.latitude);
          let sourceLongitude = idx(position, (_) => _.coords.longitude);
          this.setState({latitude: sourceLatitude, longitude: sourceLongitude});
          this.setState({location: position, loading: false});
          updateUserCurrentLocation(position);
          updateUserLiveLocation(position);
        },
        (error) => {
          this.setState({location: error});
        },
        {
          enableHighAccuracy: this.state.highAccuracy,
          distanceFilter: 50,
          interval: 5000,
          fastestInterval: 2000,
          forceRequestLocation: this.state.forceLocation,
          showLocationDialog: this.state.showLocationDialog,
          useSignificantChanges: this.state.significantChanges,
        },
      );
    });
  };

  getLocation = async () => {
    const {updateUserLiveLocation, updateUserCurrentLocation} = this.props;
    const hasLocationPermission = await this.hasLocationPermission();
    if (!hasLocationPermission) {
      return;
    }

    this.setState({loading: true}, () => {
      Geolocation.getCurrentPosition(
        (position) => {
          let sourceLatitude = idx(position, (_) => _.coords.latitude);
          let sourceLongitude = idx(position, (_) => _.coords.longitude);
          this.setState({latitude: sourceLatitude, longitude: sourceLongitude});
          this.setState({location: position, loading: false});
          updateUserCurrentLocation(position);
          updateUserLiveLocation(position);
        },
        (error) => {
          this.setState({location: error, loading: false});
        },
        {
          enableHighAccuracy: this.state.highAccuracy,
          timeout: 15000,
          // maximumAge: 10000,
          distanceFilter: 0,
          forceRequestLocation: this.state.forceLocation,
          showLocationDialog: this.state.showLocationDialog,
        },
      );
    });
  };

  removeLocationUpdates = () => {
    if (this.watchId !== null) {
      Geolocation.clearWatch(this.watchId);
      this.setState({updatesEnabled: false});
    }
  };

  startTracking = () => {};

  stopTracking = () => {
    // BackgroundGeolocation.stop();
  };

  manageOrderStatus = (status) => {
    const {
      item,
      updateSelectedOrderStatus,
      tggleAvailability,
      openPaymentSucessModal,
      userData,
      customOrderStatus,
      currentSelectedOrder,
    } = this.props;
    console.log(this.props, '========', status);

    let stopStatus = idx(currentSelectedOrder, (_) => _.currentLocation);
    if (status === 'Delivered') {
      Toast.show(`This order is already delivered successfully!`);
    } else if (status === 'Canceled') {
      Toast.show(`This order has been cancled by user or merchant!`);
    } else {
      if (status === 'Completed') {
        this.setState({
          completionModal: true,
        });
        this.removeLocationUpdates();
      } else {
        let data = {
          status: status, //'On the Way to merchant'
          id: item._id,
        };

        let customData = {
          status: status, //'On the Way to merchant'
          id: item._id,
          type:
            stopStatus == 'initial'
              ? 'stop1'
              : stopStatus == 'stop1'
              ? 'stop2'
              : stopStatus == 'stop2'
              ? 'customer'
              : 'initial',
        };
        this.getLocationUpdates();
        if (idx(currentSelectedOrder, (_) => _.merchantId)) {
          console.log(status, 'statusstatusstatusstatus');
          updateSelectedOrderStatus(data);
        } else {
          if (stopStatus == 'stop2') {
            this.setState({
              completionModal: true,
            });
          } else {
            customOrderStatus(customData);
          }
        }
      }
    }
  };

  manageOrderCurrentStatus = () => {
    const {currentSelectedOrder} = this.props;
    const {driverStatus, status, currentLocation} = currentSelectedOrder;
    if (idx(this.props, (_) => _.currentSelectedOrder.merchantId)) {
      if (driverStatus && status === 'Approved') {
        return driverStatus === 'On the Way to merchant'
          ? 'Reached'
          : driverStatus === 'Reached'
          ? 'Pickedup'
          : driverStatus === 'Pickedup'
          ? 'On the Way to Customer'
          : driverStatus === 'On the Way to Customer'
          ? 'Completed'
          : driverStatus === 'Completed'
          ? 'Delivered'
          : 'Delivered';
      } else if (status === 'Canceled') {
        return 'Canceled';
      } else {
        return 'On the Way to merchant';
      }
    } else {
      //For custom Order

      if (status == 'Approved' || status == 'On the Way') {
        return 'On the Way';
      } else if (status === 'Completed') {
        return 'Completed';
      } else if (status === 'Canceled') {
        return 'Canceled';
      } else {
        return 'On the Way';
      }
    }
  };

  manageOrderCurrentStatusText = () => {
    const {currentSelectedOrder} = this.props;
    const {driverStatus, status, currentLocation} = currentSelectedOrder;

    if (idx(this.props, (_) => _.currentSelectedOrder.merchantId)) {
      if (driverStatus && status === 'Approved') {
        return driverStatus === 'On the Way to merchant'
          ? 'On the Way to merchant'
          : driverStatus === 'Reached'
          ? 'Pick up the order'
          : driverStatus === 'Pickedup'
          ? 'On the Way to Customer'
          : driverStatus === 'On the Way to Customer'
          ? 'Complete Delivery'
          : driverStatus === 'Completed'
          ? 'Order Delivered'
          : 'Order Delivered';
      } else if (status === 'Canceled') {
        return 'Order Canceled';
      } else {
        return 'Start Delivery';
      }
    } else {
      //For custom Order
      if (status == 'Approved' || status == 'On the Way') {
        if (currentLocation == 'stop1') {
          return 'On the way to stop 2';
        } else if (currentLocation == 'stop2') {
          return 'Complete Job';
        }
        return 'On the Way';
      } else if (status === 'Completed') {
        return 'Completed';
      } else if (status === 'Canceled') {
        return 'Canceled';
      } else {
        return 'On the Way';
      }
    }
  };

  // componentWillUnmount() {
  //   this.removeLocationUpdates();
  // }

  confirmDelivery = () => {
    this.setState({
      completionModal: false,
    });
  };

  render() {
    const {
      componentId,
      latitude,
      longitude,
      item,
      isOrderStatusUpdating,
      currentSelectedOrder,
      theme,
    } = this.props;

    const {dropPoints} = item;
    const {completionModal} = this.state;
    return (
      <>
        <StartOrderComponent
          logout={this.logout}
          componentId={componentId}
          startTracking={this.startTracking}
          stopTracking={this.stopTracking}
          latitude={latitude}
          longitude={longitude}
          // latitude={30.314675}
          // longitude={78.025198}
          destination={dropPoints}
          selectedOrder={item}
          manageOrderStatus={this.manageOrderStatus}
          manageOrderCurrentStatus={this.manageOrderCurrentStatus}
          manageOrderCurrentStatusText={this.manageOrderCurrentStatusText}
          isOrderStatusUpdating={isOrderStatusUpdating}
          currentSelectedOrder={currentSelectedOrder}
          theme={theme}
        />
        <OrderCompletion
          visibility={completionModal}
          confirmDelivery={this.confirmDelivery}
          selectedOrder={item}
          componentId={componentId}
          latitude={latitude}
          longitude={longitude}
        />
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    userData: state.authReducer.loginData,
    currentSelectedOrder: state.serviceRequestReducer.currentSelectedOrder,
    isOrderStatusUpdating: state.serviceRequestReducer.isOrderStatusUpdating,
    theme: state.themeReducer.theme,
  };
}

export default connect(mapStateToProps, {
  logout,
  updateUserLiveLocation,
  updateSelectedOrderStatus,
  tggleAvailability,
  openPaymentSucessModal,
  updateUserCurrentLocation,
  customOrderStatus,
})(StartDeliveryContainer);

const Styles = StyleSheet.create({});
