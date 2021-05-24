/* eslint-disable module-resolver/use-alias */
import {pushToParticularScreen} from 'actions/appActions/AppActions';
import {
  deleteSlot,
  getAllDates,
  getDateSlots,
  getTerms,
  getTodaySchedule,
  getUserReport,
  setSlots,
  updateDriverDetails,
  updatePassword,
  updateSlots,
} from 'actions/appConfigActions';
import {logout} from 'actions/authActions';
import {tggleAvailability} from 'actions/serviceRequestActions';
import {getBackgroundColor} from 'helpers/themeStyles';
import idx from 'idx';
import _ from 'lodash';
import moment from 'moment';
import React, {Component, lazy} from 'react';
import {StyleSheet} from 'react-native';
import {Navigation} from 'react-native-navigation';
import Toast from 'react-native-simple-toast';
import {connect} from 'react-redux';
import Constants from '../../../constants';

const ProfileComponent = lazy(() => import('components/Dashboard/Profile'));

class ProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dateArray: [
        {
          startTime: Number(moment().format('x')),
          endTime: Number(moment().format('x')),
          date: Number(moment().format('x')),
          selectedIndex: 0,
        },
      ],
      savedTimeStamp: null,
      isAlert: true,
      isAvailable: true,
    };
    this.props.getAllDates();
    this.props.getTodaySchedule();
  }

  logout = () => {
    const {logout} = this.props;
    logout();
  };

  goToSettings = _.debounce(() => {
    const {componentId, pushToParticularScreen} = this.props;
    pushToParticularScreen(componentId, 'GeneralSettingsContainer');
  }, 500);

  goToAbout = _.debounce(() => {
    const {componentId, pushToParticularScreen} = this.props;
    pushToParticularScreen(componentId, 'AppInformationContainer');
  }, 500);

  goToHelp = _.debounce(() => {
    const {componentId, pushToParticularScreen} = this.props;
    pushToParticularScreen(componentId, 'BankDetails');
  }, 500);

  gotToTerms = _.debounce((value) => {
    const {getTerms} = this.props;
    let slug =
      value == 0
        ? 'legal'
        : value == 1
        ? 'term-and-condition'
        : ' privacy-policy';
    getTerms(slug);
    const {componentId, pushToParticularScreen, theme} = this.props;
    pushToParticularScreen(componentId, 'Terms', {pageType: value});
  }, 500);

  setSlot = (data) => {
    const {dateArray, savedTimeStamp, isAlert, isAvailable} = this.state;
    const {setSlots, updateSlots, allSlots} = this.props;
    let dateObj = {
      startTime: Number(data.fD || data.fromdateServer || moment().format('x')),
      endTime: Number(data.tD || data.todateServer || moment().format('x')),
      date: data.selected,
      selectedIndex: data.selectedIndex,
      isAlert: data.isAlert,
      isAvailable: data.isAvailable,
    };
    let x = idx(this.props, (_) => _.allSlots.data);

    if (x.find((o) => o._id == idx(data, (_) => _.selectedIndex))) {
      let value = {
        id: data.selectedIndex,
        startTime: Number(data.fD || data.fromdateServer),
        endTime: Number(data.tD || data.todateServer),
        date: data.selected,
        selectedIndex: data.selectedIndex,
        isAlert: data.isAlert,
        isAvailable: data.isAvailable,
      };

      updateSlots(value, savedTimeStamp);
    } else {
      if (
        dateArray.find((o) => {
          o.selectedIndex == idx(data, (_) => _.selectedIndex);
        })
      ) {
        dateArray[idx(data, (_) => _.selectedIndex)].date = data.selected;
        dateArray[idx(data, (_) => _.selectedIndex)].endTime = Number(
          data.tD || data.todateServer || moment().format('x'),
        );
        dateArray[idx(data, (_) => _.selectedIndex)].selectedIndex =
          data.selectedIndex;
        dateArray[idx(data, (_) => _.selectedIndex)].startTime = Number(
          data.fD || data.fromdateServer || moment().format('x'),
        );
        dateArray[idx(data, (_) => _.selectedIndex)].isAlert = data.isAlert;
        dateArray[idx(data, (_) => _.selectedIndex)].isAlert = data.isAvailable;
      } else {
        dateArray[idx(data, (_) => _.selectedIndex)] = dateObj;
      }
    }

    this.setState({a: 1});
  };

  addNewDateSlot = () => {
    const {dateArray} = this.state;
    let prefilledArray = idx(this.props, (_) => _.allSlots.data);
    let dateObj = {
      startTime: Number(moment().format('x')),
      endTime: Number(moment().format('x')),
      date: Number(moment().format('x')),
      selectedIndex: dateArray && dateArray.length + 1,
      isAlert: true,
      isAvailable: true,
    };
    let x = idx(this.props, (_) => _.allSlots.data.length > 0);
    if (x) {
      prefilledArray.push(dateObj);
    } else {
      dateArray.push(dateObj);
    }
    this.setState({a: 1});
  };
  saveTime = () => {
    const {dateArray, savedTimeStamp} = this.state;
    const {setSlots} = this.props;
    setSlots({data: dateArray}, savedTimeStamp);
    console.log(dateArray, 'SAVING SLOTS');
  };

  getDateSlots = (date) => {
    console.log('HEREEEEE');
    const {getDateSlots} = this.props;
    this.setState({
      savedTimeStamp: Number(moment(date).format('x')),
      dateArray: [
        {
          startTime: Number(moment().format('x')),
          endTime: Number(moment().format('x')),
          date: Number(moment().format('x')),
          selectedIndex: 0,
        },
      ],
    });
    getDateSlots(Number(moment(date).format('x')));
  };
  setAvailability = (value, index) => {
    let prefilledArray = idx(this.props, (_) => _.allSlots.data);
    let x = idx(this.props, (_) => _.allSlots.data.length > 0);

    const {dateArray, savedTimeStamp} = this.state;
    // dateArray[index].isAvailable = value == 0 ? true : false;
    // dateArray[index].isAlert = value == 0 ? true : false;
    if (x) {
      prefilledArray[index].isAvailable = value == 0 ? true : false;
      prefilledArray[index].isAlert = value == 0 ? true : false;
    } else {
      dateArray[index].isAvailable = value == 0 ? true : false;
      dateArray[index].isAlert = value == 0 ? true : false;
    }

    this.setState({
      a: 1,
    });
  };

  deleteSlot = (value) => {
    const {deleteSlot} = this.props;
    const {savedTimeStamp} = this.state;
    let data = {id: value && value._id};
    deleteSlot(data, savedTimeStamp);
  };

  saveDriverDetails = (
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
  ) => {
    const {updateDriverDetails} = this.props;

    // let data = {
    //   address: '19/1 Upper west side,kingston',
    //   address2: 'Kigstone',
    //   city: 'Kings',
    //   state: 'KingState',
    //   zip: '123123',
    //   vehicleType: 'bike',
    //   vehicleYear: '2002',
    //   color: 'red',
    //   vehicleNo: '299848723',
    //   licenseNo: '328832323',
    //   insuranceNo: '29384324',
    // };
    // updateDriverDetails(data);
    if (address.length < 5) {
      Toast.show('Please enter a valid address');
    } else if (city.length < 3) {
      Toast.show('Please enter a valid city');
    } else if (state.length < 3) {
      Toast.show('Please enter a valid state');
    } else if (zip.length < 3) {
      Toast.show('Please enter a valid zip');
    } else if (vyear.length < 3) {
      Toast.show('Please enter a valid vehicle year');
    } else if (vcolor.length < 3) {
      Toast.show('Please enter a valid vehicle color');
    } else if (vtype.length < 3) {
      Toast.show('Please enter a valid vehicle type');
    } else if (licenceplate.length < 3) {
      Toast.show('Please enter a valid licence plate number');
    } else if (drivingLicence.length < 3) {
      Toast.show('Please enter a valid licence number');
    } else if (insuranceNumber.length < 3) {
      Toast.show('Please enter a valid insurance number');
    } else {
      let data = {
        address: address,
        address2: address1,
        city: city,
        state: state,
        zip: zip,
        vehicleType: vtype,
        vehicleYear: vyear,
        color: vcolor,
        vehicleNo: licenceplate,
        licenseNo: drivingLicence,
        insuranceNo: insuranceNumber,
      };
      updateDriverDetails(data);
    }
  };

  changePassword = (oldpass, newPass) => {
    const {updatePassword} = this.props;
    if (oldpass.length < 8) {
      Toast.show('Old password must be of 8 or more characters.');
    } else if (newPass.length < 8) {
      Toast.show('Old password must be of 8 or more characters.');
    } else if (newPass == oldpass) {
      Toast.show('Old password and new password does not match .');
    } else {
      let data = {
        oldpassword: oldpass,
        password: newPass,
      };
      updatePassword(data);
    }
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

  filterGraph = (value) => {
    const {getUserReport} = this.props;
    getUserReport(value);
  };

  render() {
    const {
      componentId,
      theme,
      gettingSlots,
      allSlots,
      upcomingSchedule,
      todaysSlot,
      allReports,
      serviceRequestReducer,
      uploadingDetails,
      driverDetails,
      changePassword,
      changingPassword,
    } = this.props;
    const {dateArray} = this.state;
    Navigation.mergeOptions(componentId, {
      bottomTabs: {backgroundColor: getBackgroundColor(theme)},
    });
    let x = idx(this.props, (_) => _.allSlots.data.length > 0)
      ? idx(this.props, (_) => _.allSlots.data)
      : dateArray;

    return (
      <ProfileComponent
        logout={this.logout}
        componentId={componentId}
        goToSettings={this.goToSettings}
        goToAbout={this.goToAbout}
        goToHelp={this.goToHelp}
        gotToTerms={this.gotToTerms}
        setSlots={this.setSlot}
        dateArray={x}
        getDateSlots={this.getDateSlots}
        gettingSlots={gettingSlots}
        allSlots={allSlots && allSlots.data}
        saveTime={this.saveTime}
        addNewDateSlot={this.addNewDateSlot}
        setAvailability={this.setAvailability}
        deleteSlot={this.deleteSlot}
        upcomingSchedule={upcomingSchedule}
        todaysSlot={todaysSlot}
        allReports={allReports}
        serviceRequestReducer={serviceRequestReducer}
        saveDriverDetails={this.saveDriverDetails}
        uploadingDetails={uploadingDetails}
        driverDetails={driverDetails}
        changePassword={this.changePassword}
        changingPassword={changingPassword}
        theme={theme}
        filterGraph={this.filterGraph}
        tggleAvailability={this.tggleAvailability}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    theme: state.themeReducer.theme,
    gettingSlots: state.appConfigReducer.gettingSlots,
    allSlots: state.appConfigReducer.allSlots,
    upcomingSchedule: state.appConfigReducer.upcomingSchedule,
    todaysSlot: state.appConfigReducer.todaysSlot,
    allReports: state.appConfigReducer.allReports,
    serviceRequestReducer: state.serviceRequestReducer,
    uploadingDetails: state.appConfigReducer.uploadingDetails,
    driverDetails: state.appConfigReducer.userDetails,
    changingPassword: state.appConfigReducer.changingPassword,
  };
}

export default connect(mapStateToProps, {
  logout,
  pushToParticularScreen,
  setSlots,
  getDateSlots,
  updateSlots,
  deleteSlot,
  getAllDates,
  getTodaySchedule,
  updateDriverDetails,
  updatePassword,
  getTerms,
  getUserReport,
  tggleAvailability,
})(ProfileContainer);

const Styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
  },
  homeView: {flex: 0.8, justifyContent: 'center', alignItems: 'center'},
  headerTitleContainer: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleTxt: {
    color: Constants.Colors.White,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
