/* eslint-disable module-resolver/use-alias */
import {logout} from 'actions/authActions';
import React, {Component, lazy} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Constants from '../../../constants';
import _ from 'lodash';
const ChatComponent = lazy(() => import('components/Dashboard/Chat'));
import {pop, pushToParticularScreen} from 'actions/appActions/AppActions';
import {
  deleteChat,
  getInbox,
  createChatRoom,
  muteFriend,
} from 'actions/chatAction';
import idx from 'idx';
import {getBackgroundColor} from 'helpers/themeStyles';
import {Navigation} from 'react-native-navigation';
class ChatContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {isLoading: true};
  }

  logout = () => {
    const {logout} = this.props;
    logout();
  };

  goToMyChat = _.debounce((data) => {
    const {componentId, pushToParticularScreen} = this.props;
    pushToParticularScreen(componentId, 'MyChat', {
      chatData: data && data.item,
    });
  }, 500);
  renderChatList = (value) => {
    const {getInbox, createChatRoom, adminChatId} = this.props;
    createChatRoom(
      {
        messageByType: 'driverToAdmin', // userToDriver, userToAdmin , driverToAdmin
        receiverId: adminChatId,
      },
      value,
    );
  };

  deleteChat = (value) => {
    const {deleteChat} = this.props;
    deleteChat({
      roomId: idx(value, (_) => _.item._id),
    });
  };

  muteUser = (data) => {
    const {muteFriend, userData} = this.props;
    let myUserId = idx(userData, (_) => _._id);
    let anotherUser = idx(data, (_) =>
      _.item.members.find((o) => o.userId != myUserId),
    );
    let value = {
      roomId: idx(data, (_) => _.item._id),
      isMute: !(anotherUser && anotherUser.isMute),
    };
    muteFriend(value);
  };

  searchValue = (text) => {
    const {getInbox} = this.props;
    getInbox('userToDriver', text);
  };

  refreshed = () => {
    const {getInbox} = this.props;
    getInbox('userToDriver');
  };
  render() {
    const {
      componentId,
      loadingChats,
      goToMyChat,
      allInbox,
      userData,
      theme,
    } = this.props;
    Navigation.mergeOptions(componentId, {
      bottomTabs: {backgroundColor: getBackgroundColor(theme)},
    });
    return (
      <ChatComponent
        logout={this.logout}
        componentId={componentId}
        goToMyChat={this.goToMyChat}
        allInbox={allInbox}
        loadingChats={loadingChats}
        userData={userData}
        renderChatList={this.renderChatList}
        deleteChat={this.deleteChat}
        searchvalue={this.searchValue}
        theme={theme}
        muteUser={this.muteUser}
        refreshed={this.refreshed}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    loadingChats: state.chatReducer.gettingInbox,
    allInbox: state.chatReducer.allInbox,
    userData: state.authReducer.loginData,
    theme: state.themeReducer.theme,
    adminChatId: state.serviceRequestReducer.adminChatId,
  };
}

export default connect(mapStateToProps, {
  logout,
  pushToParticularScreen,
  deleteChat,
  getInbox,
  createChatRoom,
  muteFriend,
})(ChatContainer);

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
