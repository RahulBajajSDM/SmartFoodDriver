/* eslint-disable module-resolver/use-alias */
import {pushToParticularScreen} from 'actions/appActions/AppActions';
import {manageComponentStats} from 'actions/componentStats';
import * as Validator from 'helpers/combinedValidators';
import React, {Component, lazy} from 'react';
import Toast from 'react-native-simple-toast';
import {connect} from 'react-redux';
import {ThemeContext} from 'hoc/withRedux';
import {confirmOTP} from 'actions/authActions';

const EnterOTPComponent = lazy(() => import('components/Auth/EnterOTP'));
class EnterOTP extends Component {
  // Assign a contextType to read the current theme context.
  // React will find the closest theme Provider above and use its value.
  // In this example, the current theme is "dark".
  static contextType = ThemeContext;

  constructor(props) {
    super(props);
    this.state = {};
  }

  goToNext = (code) => {
    const {componentId, confirmOTP, email} = this.props;

    if (code.length == 4) {
      confirmOTP({email: email, otp: code}, componentId);
    } else {
      Toast.show(`OTP must be of 4 characters`);
    }
  };
  render() {
    const {componentId, loading, theme} = this.props;
    return (
      <EnterOTPComponent
        goToNext={this.goToNext}
        componentId={componentId}
        loading={loading}
        theme={theme}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.commonReducer.loader,
    theme: state.themeReducer.theme,
  };
}

export default connect(mapStateToProps, {pushToParticularScreen, confirmOTP})(
  EnterOTP,
);
