/* eslint-disable module-resolver/use-alias */
import {pop, pushToParticularScreen} from 'actions/appActions/AppActions';
import {logout} from 'actions/authActions';
import {manageComponentStats} from 'actions/componentStats';
import {Navigation} from 'react-native-navigation';

import {
  closeServiceRequestModal,
  openServiceRequestModal,
  openPaymentSucessModal,
  closePaymentSucessModal,
  tggleAvailability,
  getActiveJobs,
  getDeliveredJobs,
  getCanceledJobs,
  getTodayJobs,
  manageSelectedOrder,
  getAdminId,
} from 'actions/serviceRequestActions';
import React, {Component, lazy} from 'react';
import {
  StyleSheet,
  Platform,
  PermissionsAndroid,
  ToastAndroid,
  Linking,
  Alert,
} from 'react-native';
import {
  updateUserCurrentLocation,
  getNotificationStatus,
  getBankAccount,
  getUserReport,
  geUserDetails,
} from 'actions/appConfigActions';
import {connect} from 'react-redux';
import idx from 'idx';
import Geolocation from 'react-native-geolocation-service';
import appConfig from './../../../../app.json';
import {socketRegister} from 'actions/authActions';
import {getInbox} from 'actions/chatAction';
import {getBackgroundColor} from 'helpers/themeStyles';

const HomeComponent = lazy(() => import('components/Dashboard/Home'));

class HomeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      latitude: 0,
      longitude: 0,
      selectedTab: 'Active',
      forceLocation: true,
      highAccuracy: true,
      showLocationDialog: true,
      significantChanges: false,
      updatesEnabled: false,
      location: {},
    };

    this.props.manageComponentStats(
      this.props.componentId,
      'Home',
      this.props.componentStats,
    );
  }

  componentDidMount = async () => {
    const {
      getNotificationStatus,
      socketRegister,
      getInbox,
      getBankAccount,
      getUserReport,
      geUserDetails,
      getAdminId,
    } = this.props;
    socketRegister();
    this.getLocation();
    this.fetchActiveOrders();
    this.fetchCanceledOrders();
    this.fetchDeliveredOrders();
    this.fetchTodayOrders();
    getNotificationStatus();
    getInbox('userToDriver');
    getBankAccount();
    getUserReport('1y');
    geUserDetails();
    getAdminId();
    this.tggleAvailability(true);
  };

  fetchActiveOrders = () => {
    const {getActiveJobs} = this.props;
    getActiveJobs({
      page_no: 1,
    });
  };

  fetchDeliveredOrders = () => {
    const {getDeliveredJobs} = this.props;
    getDeliveredJobs({
      page_no: 1,
    });
  };

  fetchTodayOrders = () => {
    const {getTodayJobs} = this.props;
    getTodayJobs({
      page_no: 1,
    });
  };

  fetchCanceledOrders = () => {
    const {getCanceledJobs} = this.props;
    getCanceledJobs({
      page_no: 1,
    });
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

  getLocation = async () => {
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
          this.props.updateUserCurrentLocation(position);
        },
        (error) => {
          this.setState({location: error, loading: false});
        },
        {
          enableHighAccuracy: this.state.highAccuracy,
          timeout: 15000,
          maximumAge: 10000,
          distanceFilter: 0,
          forceRequestLocation: this.state.forceLocation,
          showLocationDialog: this.state.showLocationDialog,
        },
      );
    });
  };

  setAccuracy = (value) => this.setState({highAccuracy: value});
  setSignificantChange = (value) => this.setState({significantChanges: value});
  setLocationDialog = (value) => this.setState({showLocationDialog: value});
  setForceLocation = (value) => this.setState({forceLocation: value});

  onItemPress = (item) => {
    const {longitude, latitude} = this.state;
    this.props.manageSelectedOrder(item.item);
    this.props.pushToParticularScreen(
      this.props.componentId,
      'StartDeliveryContainer',
      {longitude, latitude, item: item.item},
    );
  };

  tggleAvailability = (value) => {
    const {tggleAvailability, userData} = this.props;
    const {longitude, latitude} = this.state;
    let data = {
      isActive: value,
      id: idx(userData, (_) => _.driverDetails._id),
    };

    tggleAvailability(data);
  };

  onSelectTab = (data) => {
    this.setState({selectedTab: data});
    if (data === 'Active') {
      this.fetchActiveOrders();
      // this.props.openPaymentSucessModal({});
    } else if (data === 'Delivered') {
      this.fetchDeliveredOrders();
    } else if (data === 'Canceled') {
      this.fetchCanceledOrders();
    } else if (data === 'Today') {
      this.fetchTodayOrders();
    }
  };

  render() {
    const {componentId, serviceRequestReducer, theme, allReports} = this.props;
    const {
      gettingActiveJobs,
      gettingCanceledJobs,
      gettingCompletedJobs,
      gettingTodayJobs,
    } = serviceRequestReducer;
    Navigation.mergeOptions(componentId, {
      bottomTabs: {backgroundColor: getBackgroundColor(theme)},
    });
    return (
      <HomeComponent
        logout={this.logoutUser}
        componentId={componentId}
        onItemPress={this.onItemPress}
        tggleAvailability={this.tggleAvailability}
        selectedTab={this.state.selectedTab}
        onSelectTab={this.onSelectTab}
        isLoading={
          gettingActiveJobs ||
          gettingCanceledJobs ||
          gettingCompletedJobs ||
          gettingTodayJobs
        }
        fetchActiveOrders={this.fetchActiveOrders}
        fetchCanceledOrders={this.fetchCanceledOrders}
        fetchDeliveredOrders={this.fetchDeliveredOrders}
        fetchTodayOrders={this.fetchDeliveredOrders}
        allReports={allReports}
        theme={theme}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    userData: state.authReducer.loginData,
    serviceRequestReducer: state.serviceRequestReducer,
    theme: state.themeReducer.theme,
    allReports: state.appConfigReducer.allReports,
  };
}

export default connect(mapStateToProps, {
  logout,
  pop,
  manageComponentStats,
  pushToParticularScreen,
  openServiceRequestModal,
  openPaymentSucessModal,
  closePaymentSucessModal,
  closeServiceRequestModal,
  tggleAvailability,
  getActiveJobs,
  getDeliveredJobs,
  getCanceledJobs,
  getTodayJobs,
  updateUserCurrentLocation,
  getNotificationStatus,
  manageSelectedOrder,
  socketRegister,
  getInbox,
  getBankAccount,
  getUserReport,
  geUserDetails,
  getAdminId,
})(HomeContainer);

const Styles = StyleSheet.create({});
