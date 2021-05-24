/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable module-resolver/use-alias */
import UserProfileCard from 'components/Dashboard/Home/UserProfileCard';
import Info from 'components/Dashboard/Profile/Settings/SettingBody/info';
import Meter from 'components/Dashboard/Profile/Settings/SettingBody/meter';
import Settings from 'components/Dashboard/Profile/Settings/SettingBody/settings';
import SettingTabs from 'components/Dashboard/Profile/Settings/SettingTabs';
import React, {useState} from 'react';
import {Alert, Dimensions, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useSelector} from 'react-redux';
import TimeSheet from './Settings/SettingBody/timeSheet';
import {getStyles} from 'helpers/themeStyles';

const {height} = Dimensions.get('window');

function Profile(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const authReducer = useSelector((state) => state.authReducer);
  const [selectedOption, setSelectedOption] = useState(1);
  const themeReducer = useSelector((state) => state.themeReducer);

  const {
    logout,
    userData,
    goToSettings,
    goToAbout,
    goToHelp,
    gotToTerms,
    setSlots,
    dateArray,
    getDateSlots,
    gettingSlots,
    allSlots,
    saveTime,
    addNewDateSlot,
    setAvailability,
    deleteSlot,
    upcomingSchedule,
    todaysSlot,
    allReports,
    serviceRequestReducer,
    saveDriverDetails,
    uploadingDetails,
    driverDetails,
    changePassword,
    changingPassword,
    theme,
    filterGraph,
    tggleAvailability,
  } = props;
  let deaultStyles = getStyles(theme);
  const logoutUser = () =>
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('OK Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => logout()},
      ],
      {cancelable: false},
    );

  const renderBody = () => {
    if (selectedOption == 1) {
      return (
        <Meter
          allReports={allReports}
          serviceRequestReducer={serviceRequestReducer}
          deaultStyles={deaultStyles}
          theme={theme}
          filterGraph={filterGraph}
        />
      );
    }
    if (selectedOption == 2) {
      return (
        <Info
          saveDriverDetails={saveDriverDetails}
          uploadingDetails={uploadingDetails}
          driverDetails={driverDetails}
          changePassword={changePassword}
          changingPassword={changingPassword}
          deaultStyles={deaultStyles}
          theme={theme}
        />
      );
    }
    if (selectedOption == 3) {
      return (
        <TimeSheet
          setSlots={setSlots}
          dateArray={dateArray}
          getDateSlots={getDateSlots}
          gettingSlots={gettingSlots}
          allSlots={allSlots}
          saveTime={saveTime}
          addNewDateSlot={addNewDateSlot}
          setAvailability={setAvailability}
          deleteSlot={deleteSlot}
          upcomingSchedule={upcomingSchedule}
          todaysSlot={todaysSlot}
          deaultStyles={deaultStyles}
          theme={theme}
        />
      );
    }
    if (selectedOption == 4) {
      return (
        <Settings
          logoutUser={logoutUser}
          goToSettings={goToSettings}
          goToAbout={goToAbout}
          goToHelp={goToHelp}
          gotToTerms={gotToTerms}
          deaultStyles={deaultStyles}
          theme={theme}
        />
      );
    }
  };

  return (
    <View
      style={[
        {
          flex: 1,
          // paddingHorizontal: RFValue(20),
          backgroundColor: 'white',
        },
        deaultStyles.colorBackground,
      ]}>
      <View
        style={{
          flex: 0.2,
          flexDirection: 'row',
          // paddingHorizontal: RFValue(20),
          backgroundColor: 'white',
        }}>
        <UserProfileCard
          allReports={allReports}
          theme={themeReducer.theme}
          tggleAvailability={tggleAvailability}
        />
      </View>
      <View style={{flex: 0.8}}>
        <View
          style={{
            flex: 0.1,
            paddingHorizontal: RFValue(40),
            flexDirection: 'row',
            position: 'absolute',
            left: 0,
            top: 0,
            zIndex: 9999,
          }}>
          <SettingTabs
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        </View>
        <View
          style={{
            flex: 1,
            marginTop: 20,
            zIndex: 999,
          }}>
          {renderBody()}
        </View>
      </View>
    </View>
  );
}
export default Profile;
