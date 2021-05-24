/* eslint-disable module-resolver/use-alias */
import * as Types from 'constants/actionsTypes';

const INITIAL_STATE = {
  currentLocation: {},
  liveLocation: {},
  loadingNotification: false,
  notificationStatus: null,
  addingBank: false,
  gettingBank: false,
  bankDetails: null,
  gettingSlots: false,
  allSlots: null,
  upcomingSchedule: null,
  gettingAllSlots: false,
  todaysSlot: null,
  gettingTodaysSlots: false,
  gettingReports: false,
  allReports: null,
  uploadingDetails: false,
  changingPassword: false,
  gettingUser: false,
  userDetails: null,
  gettingTerms: false,
  allTerms: null,
};

function appConfigReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.UPDATE_USER_CURRENT_LOCATION:
      return Object.assign({}, state, {
        currentLocation: action.payload,
      });

    case Types.UPDATE_USER_LIVE_LOCATION_REQUEST:
      return Object.assign({}, state, {});

    case Types.UPDATE_USER_LIVE_LOCATION_SUCCESS:
      return Object.assign({}, state, {
        liveLocation: action.payload,
      });

    case Types.UPDATE_USER_LIVE_LOCATION_FAIL:
      return Object.assign({}, state, {});

    case Types.GET_NOTIFICATION_REQUEST:
      return Object.assign({}, state, {
        loadingNotification: true,
      });
    case Types.GET_NOTIFICATION_SUCCESS:
      return Object.assign({}, state, {
        loadingNotification: false,
        notificationStatus: action.payload,
      });
    case Types.GET_NOTIFICATION_FAIL:
      return Object.assign({}, state, {
        loadingNotification: false,
      });

    case Types.ADD_BANK_REQUEST:
      return Object.assign({}, state, {
        addingBank: true,
      });
    case Types.ADD_BANK_SUCCESS:
      return Object.assign({}, state, {
        addingBank: false,
        notificationStatus: action.payload,
      });
    case Types.ADD_BANK_FAIL:
      return Object.assign({}, state, {
        addingBank: false,
      });

    case Types.GET_BANK_REQUEST:
      return Object.assign({}, state, {
        gettingBank: true,
      });
    case Types.GET_BANK_SUCCESS:
      return Object.assign({}, state, {
        gettingBank: false,
        bankDetails: action.payload,
      });
    case Types.GET_BANK_FAIL:
      return Object.assign({}, state, {
        gettingBank: false,
      });

    case Types.GET_SLOTS_REQUEST:
      return Object.assign({}, state, {
        gettingSlots: true,
      });
    case Types.GET_SLOTS_SUCCESS:
      return Object.assign({}, state, {
        gettingSlots: false,
        allSlots: action.payload,
      });
    case Types.GET_SLOTS_FAIL:
      return Object.assign({}, state, {
        gettingSlots: false,
      });

    case Types.GET_ALL_SLOTS_REQUEST:
      return Object.assign({}, state, {
        gettingAllSlots: true,
      });
    case Types.GET_ALL_SLOTS_SUCCESS:
      return Object.assign({}, state, {
        gettingAllSlots: false,
        upcomingSchedule: action.payload,
      });
    case Types.GET_ALL_SLOTS_FAIL:
      return Object.assign({}, state, {
        gettingAllSlots: false,
      });

    case Types.GET_TODAY_SLOTS_REQUEST:
      return Object.assign({}, state, {
        gettingTodaysSlots: true,
      });
    case Types.GET_TODAY_SLOTS_SUCCESS:
      return Object.assign({}, state, {
        gettingTodaysSlots: false,
        todaysSlot: action.payload,
      });
    case Types.GET_TODAY_SLOTS_FAIL:
      return Object.assign({}, state, {
        gettingTodaysSlots: false,
      });

    case Types.GET_REPORT_REQUEST:
      return Object.assign({}, state, {
        gettingReports: true,
      });
    case Types.GET_REPORT_SUCCESS:
      return Object.assign({}, state, {
        gettingReports: false,
        allReports: action.payload,
      });
    case Types.GET_REPORT_FAIL:
      return Object.assign({}, state, {
        gettingReports: false,
      });

    case Types.UPLOAD_DETAILS_REQUEST:
      return Object.assign({}, state, {
        uploadingDetails: true,
      });
    case Types.UPLOAD_DETAILS_SUCCESS:
      return Object.assign({}, state, {
        uploadingDetails: false,
      });
    case Types.UPLOAD_DETAILS_FAIL:
      return Object.assign({}, state, {
        uploadingDetails: false,
      });

    case Types.CHANGE_PASS_REQUEST:
      return Object.assign({}, state, {
        changingPassword: true,
      });
    case Types.CHANGE_PASS_SUCCESS:
      return Object.assign({}, state, {
        changingPassword: false,
      });
    case Types.CHANGE_PASS_FAIL:
      return Object.assign({}, state, {
        changingPassword: false,
      });

    case Types.GET_USER_REQUEST:
      return Object.assign({}, state, {
        gettingUser: true,
      });
    case Types.GET_USER_SUCCESS:
      return Object.assign({}, state, {
        gettingUser: false,
        userDetails: action.payload,
      });
    case Types.GET_USER_FAIL:
      return Object.assign({}, state, {
        gettingUser: false,
      });

    case Types.GET_TERMS_REQUEST:
      return Object.assign({}, state, {
        gettingTerms: true,
      });
    case Types.GET_TERMS_SUCCESS:
      return Object.assign({}, state, {
        gettingTerms: false,
        allTerms: action.payload,
      });
    case Types.GET_TERMS_FAIL:
      return Object.assign({}, state, {
        gettingTerms: false,
      });

    default:
      return state;
  }
}
export default appConfigReducer;
