/* eslint-disable module-resolver/use-alias */
import {pop, pushToParticularScreen} from 'actions/appActions/AppActions';
import {signIn} from 'actions/authActions';
import {manageComponentStats} from 'actions/componentStats';
import * as Validator from 'helpers/combinedValidators';
import {ThemeContext} from 'hoc/withRedux';
import React, {Component, lazy} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {Platform} from 'react-native';

const SignInComponent = lazy(() => import('components/Auth/SignIn'));
class SignIn extends Component {
  // Assign a contextType to read the current theme context.
  // React will find the closest theme Provider above and use its value.
  // In this example, the current theme is "dark".
  static contextType = ThemeContext;

  constructor(props) {
    super(props);
    this.state = {
      profilePicture: null,
    };
    this.props.manageComponentStats(
      this.props.componentId,
      'Login',
      this.props.componentStats,
    );
  }

  goToSignUp = _.debounce(() => {
    const {componentId, pushToParticularScreen} = this.props;
    pushToParticularScreen(componentId, 'Register', {
      fromSignIn: true,
    });
  }, 1000);

  signIn = (value) => {
    const {signIn, componentId, deviceToken} = this.props;

    let enableSubmission = Validator.LoginValidations(value);
    if (enableSubmission) {
      signIn(
        {
          email: value.email,
          password: value.password,
          role: 3,
          deviceID: Platform.OS,
          deviceToken: deviceToken && deviceToken.fcmToken,
        },
        componentId,
      );
    }
  };

  // Example POST method implementation:
  postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json(); // parses JSON response into native JavaScript objects
  };

  goToForgotPass = _.debounce(() => {
    const {componentId, pushToParticularScreen} = this.props;
    pushToParticularScreen(componentId, 'ForgotPassword');
  }, 1000);

  render() {
    const {loading, theme} = this.props;
    return (
      <SignInComponent
        goToSignUp={this.goToSignUp}
        signIn={this.signIn}
        goToForgotPass={this.goToForgotPass}
        loading={loading}
        theme={theme}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.commonReducer.loader,
    deviceToken: state.authReducer.notificationData,
    theme: state.themeReducer.theme,
  };
}

export default connect(mapStateToProps, {
  pop,
  manageComponentStats,
  pushToParticularScreen,
  signIn,
})(SignIn);
