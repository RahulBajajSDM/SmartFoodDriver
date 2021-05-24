import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Image,
} from 'react-native';

import {SwipeListView} from 'react-native-swipe-list-view';
import {RFValue} from 'react-native-responsive-fontsize';
import colors from 'constants/colors';
import * as ChatAssets from './assets';
import Fonts from 'constants/fonts';
import ProfilePicture from 'components/Common/profilePicture';
import {useSelector} from 'react-redux';
import {ActivityIndicator} from 'react-native-paper';
import IconsFa from 'react-native-vector-icons/FontAwesome';

import ImageComponent from 'components/Common/imageComponent';
import idx from 'idx';
import moment from 'moment';
import EmptyComponent from 'components/Common/emptyComponent';
import {SearchBar} from 'react-native-elements';
import {getStyles} from 'helpers/themeStyles';
import socket from 'utils/Socket';
export default function Basic(props) {
  const {
    goToMyChat,
    allInbox,
    loadingChats,
    userData,
    renderChatList,
    deleteChat,
    searchvalue,
    theme,
    muteUser,
    refreshed,
  } = props;
  let defaultStyle = getStyles(theme);
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchToggleValue, setsearchToggleValue] = useState(false);
  const [searchValue, setsearchValue] = useState('');
  const [newRoomId, setNewRoomId] = useState('');

  const loginData = useSelector((state) => state.authReducer.loginData);
  let inbox = idx(allInbox, (_) =>
    _.data.filter((o) =>
      o.members
        .find((x) => x.userId != idx(userData, (_) => _._id))
        .firstname.toLowerCase()
        .includes(searchValue.toLowerCase()),
    ),
  );

  // let filtered =
  //   allInbox &&
  //   allInbox.filter((item) =>
  //     idx(item, (_) =>
  //       _.members[0].firstname
  //         .toLowerCase()
  //         .includes(searchedText && searchedText.toLowerCase()),
  //     ),
  //   );

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  useEffect(() => {
    socket.on('receiveMessage', (data) => {
      setNewRoomId(data.roomId);
      refreshed();
    });
  }, []);

  const onRowDidOpen = (rowKey) => {};

  const openSearchbar = (text) => {
    setsearchValue(text);
    searchvalue(text);
  };
  const renderItem = (data) => {
    let myId = idx(userData, (_) => _._id);
    let anotherUser = idx(
      data,
      (_) => _.item.members.filter((o) => o.userId != myId)[0],
    );
    let thisRoomId = idx(data, (_) => _.item.read);

    return (
      <TouchableOpacity
        onPress={() => goToMyChat(data)}
        style={[
          styles.rowFront,
          {
            backgroundColor: theme == 'dark' ? colors.DarkGray : colors.White,
            borderWidth: 1.5,
            borderColor: theme == 'dark' ? colors.Primary : colors.White,
          },
          thisRoomId == newRoomId ? styles.additionalShadow : {},
        ]}
        underlayColor={'#AAA'}>
        <View
          style={{
            flex: 0.2,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              height: RFValue(40),
              width: RFValue(40),
              borderRadius: RFValue(100),
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1.5,
              borderColor: colors.Primary,
              overflow: 'hidden',
            }}>
            {idx(anotherUser, (_) => _.profile_image) ? (
              <ImageComponent
                styles={{height: RFValue(40), width: RFValue(40)}}
                resizeMode={'contain'}
                uri={idx(anotherUser, (_) => _.profile_image)}
              />
            ) : (
              <IconsFa
                name={'user'}
                size={RFValue(25)}
                color={colors.Primary}
              />
            )}
          </View>
          <View
            style={{
              height: RFValue(12),
              width: RFValue(12),
              borderRadius: RFValue(100),
              backgroundColor: 'green',
              position: 'absolute',
              right: RFValue(10),
              top: RFValue(5),
              borderWidth: 2,
              borderColor: colors.Background,
            }}></View>
        </View>
        <View style={{flex: 0.6, justifyContent: 'center'}}>
          <Text
            style={[
              {
                fontSize: RFValue(13),
                fontFamily: Fonts.Medium,
                color: colors.Grey,
              },
              defaultStyle.blackTextColor,
            ]}>
            {idx(anotherUser, (_) => _.firstname) || 'Admin'}
          </Text>

          <Text
            style={[
              {fontSize: RFValue(12), fontFamily: Fonts.Light},
              defaultStyle.blackTextColor,
            ]}
            numberOfLines={1}>
            {idx(data, (_) => _.item.lastMessage)}
          </Text>
        </View>
        <View style={{flex: 0.2, justifyContent: 'center'}}>
          <Text
            style={[
              {
                fontSize: RFValue(13),
                fontFamily: Fonts.Regular,
                color: colors.Grey,
              },
              defaultStyle.blackTextColor,
            ]}>
            {moment(idx(data, (_) => _.item.lastMessageDate))
              .local()
              .format('hh:mm a')}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderHiddenItem = (data, rowMap) => {
    let myId = idx(userData, (_) => _._id);
    let anotherUser = idx(
      data,
      (_) => _.item.members.filter((o) => o.userId != myId)[0],
    );
    return (
      <View
        style={{
          height: RFValue(75),
          justifyContent: 'flex-end',
          flexDirection: 'row',
          width: '100%',
        }}>
        <TouchableOpacity
          onPress={() => {
            muteUser(data);
            closeRow(rowMap, data.item.key);
          }}
          style={{
            height: RFValue(72),
            width: RFValue(50),
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 1,
            backgroundColor:
              anotherUser && anotherUser.isMute ? colors.Primary : colors.White,
            borderTopLeftRadius: RFValue(10),
            borderBottomLeftRadius: RFValue(10),
          }}>
          <Image
            source={ChatAssets.Bell}
            style={{
              tintColor:
                anotherUser && anotherUser.isMute ? colors.White : colors.Black,
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            closeRow(rowMap, data.item.key), deleteChat(data);
          }}
          style={{
            height: RFValue(72),
            width: RFValue(50),
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.Red,
            borderBottomRightRadius: RFValue(10),
            borderTopRightRadius: RFValue(10),
          }}>
          <Image
            source={ChatAssets.Bin}
            resizeMode="contain"
            style={{tintColor: colors.White}}
          />
        </TouchableOpacity>
      </View>
    );
  };
  if (!loginData) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <View style={[styles.container, defaultStyle.container]}>
      <View style={{flex: 0.14, flexDirection: 'row'}}>
        <View style={{flex: 0.2, justifyContent: 'center'}}>
          {loginData && loginData.profile_image && (
            <ProfilePicture profile_image={loginData.profile_image} />
          )}
        </View>
        <View
          style={{flex: 0.6, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              fontSize: RFValue(24),
              fontFamily: Fonts.Bold,
              color: '#1ECB40',
            }}>
            Chats
          </Text>
        </View>
        <View
          style={{
            flex: 0.2,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              if (searchToggleValue === false) {
                setsearchToggleValue(true);
              } else {
                setsearchToggleValue(false);
              }
            }}>
            <Image source={ChatAssets.Search} resizeMode="contain" />
          </TouchableOpacity>
          {/* <Image source={ChatAssets.Writing} resizeMode="contain" /> */}
        </View>
      </View>
      {searchToggleValue === true ? (
        <View style={[defaultStyle.colorBackground]}>
          <SearchBar
            placeholder="Type Here..."
            containerStyle={[
              {borderTopWidth: 0, borderBottomWidth: 0},
              defaultStyle.colorBackground,
            ]}
            inputContainerStyle={[
              {
                backgroundColor: '#e6e6ed',
                borderWidth: 1.5,
                borderColor: theme == 'dark' ? colors.Primary : colors.White,
                borderBottomWidth: 1.5,
              },
              defaultStyle.colorBackground,
            ]}
            round
            onChangeText={(text) => openSearchbar(text)}
            autoCorrect={false}
            value={searchValue}
          />
        </View>
      ) : null}
      <View
        style={{flex: 0.06, flexDirection: 'row', marginBottom: RFValue(5)}}>
        <TouchableOpacity
          onPress={() => {
            setSelectedTab(0);
            renderChatList(0);
          }}
          style={{
            flex: 0.49,
            borderRadius: RFValue(5),
            backgroundColor: selectedTab == 0 ? '#4C84FF' : colors.White,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: RFValue(15),
              fontFamily: Fonts.Regular,
              color: selectedTab == 0 ? colors.White : colors.Grey,
            }}>
            CUSTOMERS
          </Text>
        </TouchableOpacity>
        <View style={{flex: 0.02}} />
        <TouchableOpacity
          onPress={() => {
            setSelectedTab(1);
            renderChatList(1);
          }}
          style={{
            flex: 0.49,
            borderRadius: RFValue(5),
            backgroundColor: selectedTab == 1 ? '#4C84FF' : colors.White,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: RFValue(15),
              fontFamily: Fonts.Regular,
              color: selectedTab == 1 ? colors.White : colors.Grey,
            }}>
            HELP DESK
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{flex: 0.8}}>
        {loadingChats ? (
          <View
            style={{justifyContent: 'center', alignItems: 'center', flex: 0.9}}>
            <ActivityIndicator />
          </View>
        ) : allInbox && allInbox.data && allInbox.data.length > 0 ? (
          <SwipeListView
            showsVerticalScrollIndicator={false}
            data={allInbox && allInbox.data}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            leftOpenValue={75}
            rightOpenValue={-150}
            previewRowKey={'0'}
            previewOpenValue={-40}
            previewOpenDelay={3000}
            onRowDidOpen={onRowDidOpen}
          />
        ) : (
          <EmptyComponent
            title={'No chats available'}
            icon={'comments'}
            color={colors.Primary}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: RFValue(10),
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: colors.White,
    borderRadius: RFValue(10),
    justifyContent: 'center',
    height: RFValue(77),
    marginBottom: RFValue(10),
    flexDirection: 'row',
  },
  additionalShadow: {
    elevation: 3,
    shadowOffset: {width: 0, height: 7},
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 2.22,
  },

  rowBack: {
    alignItems: 'center',
    height: RFValue(77),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    marginBottom: RFValue(10),
    backgroundColor: 'pink',
    // width: RFValue(100),
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: RFValue(40),
  },
  backRightBtnLeft: {
    backgroundColor: colors.White,
    right: RFValue(40),
    elevation: 1,
    right: RFValue(45),
  },
  backRightBtnRight: {
    // backgroundColor: '#EC3237',

    right: RFValue(18),
    borderTopEndRadius: RFValue(10),
    borderBottomRightRadius: RFValue(10),
    overflow: 'hidden',
  },

  moreRightBtnRight: {
    backgroundColor: colors.Red,
    right: RFValue(85),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 1,
  },
});
