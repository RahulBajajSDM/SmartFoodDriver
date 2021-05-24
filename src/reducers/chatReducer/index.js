/* eslint-disable module-resolver/use-alias */
import * as Types from 'constants/actionsTypes';

const INITIAL_STATE = {
  uploadingImage: false,
  chatRoomId: null,
  deletingRoom: false,
  creatingRoom: false,
  gettingInbox: false,
  getingPersonalChats: false,
  personalChats: null,
};

function chatReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.UPLOAD_CHAT_IMG_REQUEST:
      return Object.assign({}, state, {
        uploadingImage: true,
      });
    case Types.UPLOAD_CHAT_IMG_SUCCESS:
      return Object.assign({}, state, {
        uploadingImage: false,
      });
    case Types.UPLOAD_CHAT_IMG_FAIL:
      return Object.assign({}, state, {
        uploadingImage: false,
      });

    case Types.CREATE_CHAT_ROOM_REQUEST:
      return Object.assign({}, state, {
        creatingRoom: true,
      });
    case Types.CREATE_CHAT_ROOM_SUCCESS:
      return Object.assign({}, state, {
        creatingRoom: false,
        chatRoomId: action.payload,
      });
    case Types.CREATE_CHAT_ROOM_FAIL:
      return Object.assign({}, state, {
        creatingRoom: false,
      });

    case Types.DELETE_CHAT_REQUEST:
      return Object.assign({}, state, {
        deletingRoom: true,
      });
    case Types.DELETE_CHAT_SUCCESS:
      return Object.assign({}, state, {
        deletingRoom: false,
      });
    case Types.DELETE_CHAT_FAIL:
      return Object.assign({}, state, {
        deletingRoom: false,
      });

    case Types.GET_INBOX_REQUEST:
      return Object.assign({}, state, {
        gettingInbox: true,
      });

    case Types.GET_INBOX_SUCCESS:
      return Object.assign({}, state, {
        gettingInbox: false,
        allInbox: action.payload,
      });
    case Types.GET_INBOX_FAIL:
      return Object.assign({}, state, {
        gettingInbox: false,
      });

    case Types.GET_CHAT_LIST_REQUEST:
      return Object.assign({}, state, {
        getingPersonalChats: true,
      });
    case Types.GET_CHAT_LIST_SUCCESS:
      return Object.assign({}, state, {
        getingPersonalChats: false,
        personalChats: action.payload,
      });
    case Types.GET_CHAT_LIST_FAIL:
      return Object.assign({}, state, {
        getingPersonalChats: false,
      });

    case Types.LOGOUT:
      return INITIAL_STATE;

    default:
      return state;
  }
}
export default chatReducer;
