/* eslint-disable module-resolver/use-alias */
import {
  pop,
  pushToParticularScreen,
  setRoot,
} from 'actions/appActions/AppActions';
import {manageComponentStats} from 'actions/componentStats';
import * as Validator from 'helpers/combinedValidators';
import React, {Component, lazy} from 'react';
import Toast from 'react-native-simple-toast';
import {connect} from 'react-redux';
import {ThemeContext} from 'hoc/withRedux';
import {forgotPassword} from 'actions/authActions';

const ForgotPasswordComponent = lazy(() =>
  import('components/Auth/ForgotPassword'),
);
class ForgotPassword extends Component {
  // Assign a contextType to read the current theme context.
  // React will find the closest theme Provider above and use its value.
  // In this example, the current theme is "dark".
  static contextType = ThemeContext;

  constructor(props) {
    super(props);
    this.state = {};
    this.props.manageComponentStats(
      this.props.componentId,
      'ForgotPassword',
      this.props.componentStats,
    );
  }

  goToNext = (value) => {
    const {componentId, forgotPassword} = this.props;
    let enableSubmission = Validator.ForgotPasswordValidations(value);
    if (enableSubmission) {
      forgotPassword({email: value.email}, componentId);
    }
  };

  render() {
    const {componentId, loading, theme} = this.props;
    return (
      <ForgotPasswordComponent
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

export default connect(mapStateToProps, {
  pop,
  manageComponentStats,
  pushToParticularScreen,
  forgotPassword,
})(ForgotPassword);
