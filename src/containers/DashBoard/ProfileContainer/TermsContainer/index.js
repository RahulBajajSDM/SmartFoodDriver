/* eslint-disable module-resolver/use-alias */
import {logout} from 'actions/authActions';
import React, {Component, lazy} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Constants from 'constants';
import _ from 'lodash';
const TermsComponent = lazy(() =>
  import('../../../../components/Dashboard/Profile/Terms'),
);

class Terms extends Component {
  constructor(props) {
    super(props);
    this.state = {isLoading: true};
  }

  render() {
    const {
      componentId,
      userData,
      pageType,
      theme,
      gettingTerms,
      allTerms,
    } = this.props;
    return (
      <TermsComponent
        componentId={componentId}
        userData={userData}
        pageType={pageType}
        theme={theme}
        gettingTerms={gettingTerms}
        allTerms={allTerms}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    userData: state.authReducer.loginData,
    theme: state.themeReducer.theme,
    gettingTerms: state.appConfigReducer.gettingTerms,
    allTerms: state.appConfigReducer.allTerms,
  };
}

export default connect(mapStateToProps, {})(Terms);

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
