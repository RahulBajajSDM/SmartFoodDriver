/* eslint-disable module-resolver/use-alias */
import Constants from 'constants';
import React, {Component, lazy} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {updateNotification} from 'actions/appConfigActions';
const AppInformation = lazy(() =>
  import('components/Dashboard/Profile/AppInformation'),
);

class AppInformationContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {isLoading: true};
  }

  changeTheme = () => {
    alert('AA');
  };
  updateNotification = (data) => {
    const {updateNotification} = this.props;
    updateNotification(data);
  };

  render() {
    const {componentId, userData, notificationStatus, theme} = this.props;
    return (
      <AppInformation
        componentId={componentId}
        userData={userData}
        changeTheme={this.changeTheme}
        notificationStatus={notificationStatus}
        updateNotification={this.updateNotification}
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
})(AppInformationContainer);

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
