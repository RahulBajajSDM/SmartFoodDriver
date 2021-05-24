/* eslint-disable module-resolver/use-alias */
import {pushToParticularScreen, pop} from 'actions/appActions/AppActions';
import {manageComponentStats} from 'actions/componentStats';
import {ThemeContext} from 'hoc/withRedux';
import * as Validator from 'helpers/combinedValidators';
import React, {Component, lazy} from 'react';
import Toast from 'react-native-simple-toast';
import {connect} from 'react-redux';
import {register} from '../../../actions/authActions';
import _ from 'lodash';
const RegisterComponent = lazy(() => import('components/Auth/Register'));

class Register extends Component {
  // Assign a contextType to read the current theme context.
  // React will find the closest theme Provider above and use its value.
  // In this example, the current theme is "dark".
  static contextType = ThemeContext;

  constructor(props) {
    super(props);
    this.state = {
      profilePicture: null,
      profileObj: null,
    };
    this.props.manageComponentStats(
      this.props.componentId,
      'Register',
      this.props.componentStats,
    );
  }

  submitLoginForm = (value) => {
    const {register, componentId} = this.props;
    const {profileObj} = this.state;
    let registerForm = new FormData();

    let enableSubmission = Validator.SignUpValidations({...value, profileObj});
    if (enableSubmission && profileObj) {
      registerForm.append('firstname', value.fullName);
      registerForm.append('email', value.email);
      registerForm.append('phone', `+${value.countryCode}${value.phone}`);
      registerForm.append('password', value.password);
      registerForm.append('role', 3);

      registerForm.append(
        'profile_image',
        profileObj && profileObj.uri
          ? {
              uri: profileObj && profileObj.uri,
              type: profileObj && profileObj.type,
              name: 'images.jpg',
            }
          : '',
      );
      register(registerForm, componentId);
    }
  };

  goToSignIn = _.debounce(() => {
    const {componentId, pushToParticularScreen, fromSignIn, pop} = this.props;
    if (fromSignIn) {
      pop(componentId);
    } else {
      pushToParticularScreen(componentId, 'SignIn');
    }
  }, 1000);

  setPhoto = _.debounce((value, response) => {
    this.setState({
      profilePicture: value,
      profileObj: response,
    });
  }, 1000);

  render() {
    const {loading, theme} = this.props;
    const {profilePicture} = this.state;

    return (
      <RegisterComponent
        submitLoginForm={this.submitLoginForm}
        goToSignIn={this.goToSignIn}
        loading={loading}
        setPhoto={this.setPhoto}
        profilePicture={profilePicture}
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

export default connect(mapStateToProps, {
  pushToParticularScreen,
  manageComponentStats,
  register,
  pop,
})(Register);
