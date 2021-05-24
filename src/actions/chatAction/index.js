/* eslint-disable module-resolver/use-alias */
import * as Types from 'constants/actionsTypes';
import API from 'constants/urls';
import RestClient from 'helpers/RestClient';
import idx from 'idx';
export function uploadChatImage(cardBody, cb) {
  return async (dispatch) => {
    dispatch({type: Types.UPLOAD_CHAT_IMG_REQUEST});
    try {
      const response = await RestClient.postCall(API.UPLOAD_CHAT_IMG, cardBody);
      if (response) {
        cb(response);
        dispatch({type: Types.UPLOAD_CHAT_IMG_SUCCESS});
      } else {
        dispatch({type: Types.UPLOAD_CHAT_IMG_FAIL});
      }
    } catch (error) {
      dispatch({type: Types.UPLOAD_CHAT_IMG_FAIL});
    }
  };
}

export function createChatRoom(chatRoom, value) {
  return async (dispatch) => {
    dispatch({type: Types.CREATE_CHAT_ROOM_REQUEST});
    try {
      const response = await RestClient.postCall(
        API.CREATE_CHAT_ROOM,
        chatRoom,
      );
      if (response) {
        dispatch({type: Types.CREATE_CHAT_ROOM_SUCCESS});
        dispatch(getInbox(value == 0 ? 'userToDriver' : 'driverToAdmin'));
      } else {
        dispatch({type: Types.CREATE_CHAT_ROOM_FAIL});
      }
    } catch (error) {
      dispatch({type: Types.CREATE_CHAT_ROOM_FAIL});
    }
  };
}

export function deleteChat(chatId) {
  return async (dispatch) => {
    dispatch({type: Types.DELETE_CHAT_REQUEST});
    try {
      const response = await RestClient.deleteRequest(`${API.DELETE_CHAT}`, {
        roomId: chatId,
      });
      if (response) {
        dispatch({type: Types.DELETE_CHAT_SUCCESS});
      } else {
        dispatch({type: Types.DELETE_CHAT_FAIL});
      }
    } catch (error) {
      dispatch({type: Types.DELETE_CHAT_FAIL});
    }
  };
}

export function getInbox(value, searchTerm) {
  return async (dispatch) => {
    dispatch({type: Types.GET_INBOX_REQUEST});
    try {
      const response = await RestClient.getCall(
        `${API.GET_INBOX}page=1&perPage=25&type=${value}&search=${searchTerm}`,
      );
      if (response) {
        dispatch({
          type: Types.GET_INBOX_SUCCESS,
          payload: response.data,
        });
      } else {
        dispatch({type: Types.GET_INBOX_FAIL});
      }
    } catch (error) {
      dispatch({type: Types.GET_INBOX_FAIL});
    }
  };
}

export function getChats(data, roomId) {
  return async (dispatch, getState) => {
    let userId = idx(getState(), (_) => _.authReducer.loginData.data._id);

    dispatch({type: Types.GET_CHAT_LIST_REQUEST});
    try {
      const response = await RestClient.getCall(
        `${API.GET_CHAT_LISTING}?roomId=${roomId}&page=1&perPage=50`,
      );
      if (response) {
        let modifiedArray = [];
        idx(response, (_) =>
          _.data.data.map((item, index) => {
            let user = idx(item, (_) => _.senderData[0]._id) != userId;

            let x = {
              _id: item._id,
              text: item.message,
              image: item.media,
              createdAt: item.created_at,
              user: {
                _id: user
                  ? idx(item, (_) => _.senderData[0]._id)
                  : idx(item, (_) => _.receiverData[0]._id),
                name: user
                  ? idx(item, (_) => _.senderData[0].firstname)
                  : idx(item, (_) => _.receiverData[0].firstname),
                avatar: user
                  ? idx(item, (_) => _.senderData[0].profile_image)
                  : idx(item, (_) => _.receiverData[0].profile_image),
              },
            };
            modifiedArray.push(x);
          }),
        );
        dispatch({
          type: Types.GET_CHAT_LIST_SUCCESS,
          payload: modifiedArray,
        });
      } else {
        dispatch({type: Types.GET_CHAT_LIST_FAIL});
      }
    } catch (error) {
      dispatch({type: Types.GET_CHAT_LIST_FAIL});
    }
  };
}

export function muteFriend(data) {
  return async (dispatch) => {
    dispatch({type: Types.MUTE_CHAT_REQUEST});
    try {
      const response = await RestClient.putCall(API.MUTE_CHAT, data);
      if (response) {
        dispatch({type: Types.MUTE_CHAT_SUCCESS, payload: response});
        dispatch(getInbox('userToDriver'));
      } else {
        dispatch({type: Types.MUTE_CHAT_FAIL});
      }
    } catch (error) {
      dispatch({type: Types.MUTE_CHAT_FAIL});
    }
  };
}

export function readMessage(data) {
  return async (dispatch) => {
    dispatch({type: Types.READ_MESSAGE_REQUEST});
    try {
      const response = await RestClient.putCall(API.READ_MESSAGES, data);
      if (response) {
        dispatch({type: Types.READ_MESSAGE_SUCCESS, payload: response});
        dispatch(getInbox('userToDriver'));
      } else {
        dispatch({type: Types.READ_MESSAGE_FAIL});
      }
    } catch (error) {
      dispatch({type: Types.READ_MESSAGE_FAIL});
    }
  };
}
