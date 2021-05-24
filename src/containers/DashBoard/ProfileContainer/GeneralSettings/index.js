/* eslint-disable module-resolver/use-alias */
import {updateNotification} from 'actions/appConfigActions';
import {setTheme} from 'config/theme/actions';
import Constants from 'constants';
import React, {Component, lazy} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {goHome} from 'config/navigation';

const GeneralSettingComponent = lazy(() =>
  import('components/Dashboard/Profile/GeneralSettings'),
);

class GeneralSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {isLoading: true};
  }

  updateNotification = (data) => {
    const {updateNotification} = this.props;
    updateNotification(data);
  };

  manageThemeSelection = (theme) => {
    this.props.onSelectTheme(theme);
    goHome();
  };

  render() {
    const {componentId, userData, notificationStatus, theme} = this.props;
    return (
      <GeneralSettingComponent
        componentId={componentId}
        userData={userData}
        notificationStatus={notificationStatus}
        updateNotification={this.updateNotification}
        manageThemeSelection={this.manageThemeSelection}
        theme={theme}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    userData: state.authReducer.loginData,
    notificationStatus: state.appConfigReducer.notificationStatus,
    theme: state.themeReducer.theme,
  };
}

export default connect(mapStateToProps, {
  updateNotification,
  onSelectTheme: setTheme,
})(GeneralSettings);

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
