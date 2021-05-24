/* eslint-disable module-resolver/use-alias */
import {logout} from 'actions/authActions';
import React, {Component, lazy} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Constants from '../../../constants';
import {getOrderHistory} from 'actions/historyActions';
import {getBackgroundColor} from 'helpers/themeStyles';
import {Navigation} from 'react-native-navigation';
import RatingModal from 'components/Modals/ratingModal';

const HistoryComponent = lazy(() => import('components/Dashboard/History'));

class HistoryContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {isLoading: true, ratingModal: false, selectedOrder: null};
    this.fetchOrderHistory();
  }

  fetchOrderHistory = () => {
    this.props.getOrderHistory({
      page_no: 1,
    });
  };

  fetchMoreOrderHistory = () => {
    this.props.getOrderHistory({
      page_no: 1,
    });
  };

  logout = () => {
    const {logout, orderHistory, isLoading} = this.props;
    logout();
  };
  onItemPress = (value) => {
    this.setState({
      ratingModal: true,
      selectedOrder: value.item,
    });
  };
  render() {
    const {componentId, orderHistory, isLoading, theme} = this.props;
    const {ratingModal, selectedOrder} = this.state;
    Navigation.mergeOptions(componentId, {
      bottomTabs: {backgroundColor: getBackgroundColor(theme)},
    });
    return (
      <>
        <HistoryComponent
          logout={this.logout}
          componentId={componentId}
          onItemPress={this.onItemPress}
          fetchOrderHistory={this.fetchMoreOrderHistory}
          orderHistory={orderHistory}
          isLoading={isLoading}
          theme={theme}
        />
        <RatingModal
          visibility={ratingModal}
          giveRating={() => {}}
          closeModal={() => {
            this.setState({ratingModal: false});
          }}
          currentActiveJob={selectedOrder}
          report={() => {}}
          theme={theme}
        />
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoading: state.historyReducer.isLoading,
    orderHistory: state.historyReducer.orderHistory,
    currentLocation: state.appConfigReducer.currentLocation,
    theme: state.themeReducer.theme,
  };
}

export default connect(mapStateToProps, {
  logout,
  getOrderHistory,
})(HistoryContainer);

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
