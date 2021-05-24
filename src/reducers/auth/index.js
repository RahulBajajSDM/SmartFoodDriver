/* eslint-disable module-resolver/use-alias */
import * as Types from '../../constants/actionsTypes';

const INITIAL_STATE = {
  isLoggedIn: false,
  isLoading: false,
  loginData: {},
  notificationData: null,
};

function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.LOGIN_REQUEST:
      return Object.assign({}, state, {isLoggedIn: true});
    case Types.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        loginData: action.payload,
        isLoggedIn: false,
      });
    case Types.LOGIN_FAIL:
      return Object.assign({}, state, {isLoggedIn: false});
    case Types.REGISTER_REQUEST:
      return Object.assign({}, state, {isLoggedIn: true});
    case Types.REGISTER_SUCCESS:
      return Object.assign({}, state, {isLoggedIn: false});
    case Types.REGISTER_FAIL:
      return Object.assign({}, state, {isLoggedIn: false});
    case Types.NOTIFICATION_DETAILS:
      return Object.assign({}, state, {
        notificationData: action.payload,
      });
    case Types.TOGGLE_SUCCESS:
      return Object.assign(
        {},
        state,
        {
          ...state,
          loginData: {...state.loginData, isActive: action.isActive},
        },
        {
          ...state.loginData,
          driverDetails: action.payload,
        },
      );
    case Types.LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
}
export default authReducer;
