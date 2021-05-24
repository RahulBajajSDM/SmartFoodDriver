/* eslint-disable module-resolver/use-alias */
import {Dimensions} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {manageAuthStackOptions} from './stackConfig';
const {width, height} = Dimensions.get('window');
import * as AppImages from 'assets';
import {storeObj} from 'store/setup';
export const goToAuth = () =>
  Navigation.setRoot({
    root: {
      stack: {
        id: 'Auth',
        children: [
          {
            component: {
              name: 'SignIn',
              passProps: {
                text: 'AuthModule',
              },
              options: manageAuthStackOptions(),
            },
          },
        ],
      },
    },
  });

export const goHome = async () =>
  Navigation.setRoot({
    root: {
      bottomTabs: {
        id: 'BOTTOM_TABS_LAYOUT',
        options: {
          bottomTabs: {
            visible: true,
            animate: false,
            titleDisplayMode: 'alwaysShow',
          },
        },
        children: [
          {
            stack: {
              id: 'HOME_TAB',
              children: [
                {
                  component: {
                    id: 'HOME_SCREEN',
                    name: 'HomeContainer',
                  },
                },
              ],
              options: {
                bottomTab: {
                  icon: require('../../assets/home2/home.png'),
                  selectedIcon: require('../../assets/home_selected/home_selected.png'),
                  text: 'Home',
                  textColor: '#B4B4B4',
                  selectedTextColor: '#F01716',
                },
                topBar: {visible: false, height: 0},
                statusBar: {
                  backgroundColor: '#F8F8F8',
                  style: 'dark',
                },
              },
            },
          },
          {
            stack: {
              id: 'CHAT_TAB',
              children: [
                {
                  component: {
                    id: 'CHAT_CONTAINER',
                    name: 'ChatContainer',
                  },
                },
              ],
              options: {
                bottomTab: {
                  icon: require('../../assets/chat/chat.png'),
                  selectedIcon: require('../../assets/chat_selected/chat_selected.png'),
                  text: 'Chat',
                  textColor: '#B4B4B4',
                  selectedTextColor: '#F01716',
                  titleDisplayMode: 'alwaysShow',
                },
                topBar: {visible: false, height: 0},
                statusBar: {
                  backgroundColor: '#F8F8F8',
                  style: 'dark',
                },
              },
            },
          },
          {
            stack: {
              id: 'HISTORY_TAB',
              children: [
                {
                  component: {
                    id: 'HISTORY_CONTAINER',
                    name: 'HistoryContainer',
                  },
                },
              ],
              options: {
                bottomTab: {
                  icon: require('../../assets/history/history.png'),
                  selectedIcon: require('../../assets/history_selected/history_selected.png'),
                  text: 'History',
                  textColor: '#B4B4B4',
                  selectedTextColor: '#F01716',
                },
                topBar: {visible: false, height: 0},
                statusBar: {
                  backgroundColor: '#F8F8F8',
                  style: 'dark',
                },
              },
            },
          },
          {
            stack: {
              id: 'PROFILE_TAB',
              children: [
                {
                  component: {
                    id: 'PROFILE_CONTAINER',
                    name: 'ProfileContainer',
                  },
                },
              ],
              options: {
                bottomTab: {
                  icon: require('../../assets/user/user.png'),
                  selectedIcon: require('../../assets/user_selected/user_selected.png'),
                  text: 'Profile',
                  textColor: '#B4B4B4',
                  selectedTextColor: '#F01716',
                },
                topBar: {visible: false, height: 0},
                statusBar: {
                  backgroundColor: '#F8F8F8',
                  style: 'dark',
                },
              },
            },
          },
        ],
      },
    },
  });
