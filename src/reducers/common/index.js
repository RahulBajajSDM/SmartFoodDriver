/* eslint-disable module-resolver/use-alias */
import * as Types from 'constants/actionsTypes';

const INITIAL_STATE = {loader: false};

function commonReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.REQUEST_REQUEST:
      return Object.assign({}, state, {
        loader: true,
      });
    case Types.REQUEST_SUCCESS:
      return Object.assign({}, state, {
        loader: false,
      });
    case Types.REQUEST_FAIL:
      return Object.assign({}, state, {
        loader: false,
      });

    case Types.FORGOT_PASSWORD_REQUEST:
      return Object.assign({}, state, {
        loader: true,
      });
    case Types.FORGOT_PASSWORD_SUCCESS:
      return Object.assign({}, state, {
        loader: false,
      });
    case Types.FORGOT_PASSWORD_FAIL:
      return Object.assign({}, state, {
        loader: false,
      });

    case Types.CONFIRM_OTP_REQUEST:
      return Object.assign({}, state, {
        loader: true,
      });
    case Types.CONFIRM_OTP_SUCCESS:
      return Object.assign({}, state, {
        loader: false,
      });
    case Types.CONFIRM_OTP_FAIL:
      return Object.assign({}, state, {
        loader: false,
      });

    case Types.SET_PASSWORD_REQUEST:
      return Object.assign({}, state, {
        loader: true,
      });
    case Types.SET_PASSWORD_SUCCESS:
      return Object.assign({}, state, {
        loader: false,
      });
    case Types.SET_PASSWORD_FAIL:
      return Object.assign({}, state, {
        loader: false,
      });

    default:
      return state;
  }
}
export default commonReducer;
