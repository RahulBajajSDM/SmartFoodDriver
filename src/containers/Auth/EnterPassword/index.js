/* eslint-disable module-resolver/use-alias */
import {pushToParticularScreen} from 'actions/appActions/AppActions';
import {manageComponentStats} from 'actions/componentStats';
import * as Validator from 'helpers/combinedValidators';
import React, {Component, lazy} from 'react';
import Toast from 'react-native-simple-toast';
import {connect} from 'react-redux';
import {ThemeContext} from 'hoc/withRedux';
import {setPassword} from 'actions/authActions';

const EnterPasswordComponent = lazy(() =>
  import('components/Auth/EnterPassword'),
);
class EnterPassword extends Component {
  // Assign a contextType to read the current theme context.
  // React will find the closest theme Provider above and use its value.
  // In this example, the current theme is "dark".
  static contextType = ThemeContext;

  constructor(props) {
    super(props);
    this.state = {};
  }

  goToNext = (value) => {
    const {user_id, setPassword} = this.props;
    let enableSubmission = Validator.ResetPasswordValidation(value);
    if (enableSubmission) {
      setPassword({password: value.password, user_id: user_id});
    }
  };

  render() {
    const {componentId, loading, theme} = this.props;
    return (
      <EnterPasswordComponent
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
  pushToParticularScreen,
  setPassword,
})(EnterPassword);
