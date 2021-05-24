/* eslint-disable module-resolver/use-alias */
import * as Types from 'constants/actionsTypes';
import RestClient from 'helpers/RestClient';
import API from 'constants/urls';
import {pop, pushToParticularScreen} from 'actions/appActions/AppActions';
import {goToAuth, goHome} from 'config/navigation';
import Toast from 'react-native-simple-toast';
import idx from 'idx';

export function signIn(requestData, componentId) {
  return async (dispatch) => {
    dispatch({type: Types.LOGIN_REQUEST});
    dispatch({type: Types.REQUEST_REQUEST});
    try {
      const response = await RestClient.postCall(API.LOGIN, requestData);
      if (response) {
        dispatch({type: Types.LOGIN_SUCCESS, payload: response.data});
        dispatch({type: Types.REQUEST_SUCCESS});
        Toast.show('Login Success.');
        goHome();
      } else {
        dispatch({type: Types.LOGIN_FAIL});
        dispatch({type: Types.REQUEST_FAIL});
      }
    } catch (error) {
      Toast.show(error);
      dispatch({type: Types.LOGIN_FAIL});
      dispatch({type: Types.REQUEST_FAIL});
    }
  };
}
export function register(requestData, componentId) {
  return async (dispatch) => {
    dispatch({type: Types.REGISTER_REQUEST});
    dispatch({type: Types.REQUEST_REQUEST});
    try {
      const response = await RestClient.postCall(API.REGISTER, requestData);
      if (response) {
        dispatch(pop(componentId));
        dispatch({type: Types.REGISTER_SUCCESS, payload: response});
        dispatch({type: Types.REQUEST_SUCCESS});
      } else {
        Toast.show('Signup successfull. Please login');
        dispatch({type: Types.REGISTER_FAIL});
        dispatch({type: Types.REQUEST_FAIL});
      }
    } catch (error) {
      Toast.show(idx(error, (_) => _.data.message));

      dispatch({type: Types.REGISTER_FAIL});
      dispatch({type: Types.REQUEST_FAIL});
    }
  };
}

export const logout = () => {
  return async (dispatch, getState) => {
    dispatch({type: Types.LOGOUT});
    Toast.show('Logout Success.');
    goToAuth();
  };
};

export function forgotPassword(requestData, componentId) {
  return async (dispatch) => {
    dispatch({type: Types.FORGOT_PASSWORD_REQUEST});
    try {
      const response = await RestClient.postCall(
        API.FORGOT_PASSWORD,
        requestData,
      );
      if (response) {
        dispatch(
          pushToParticularScreen(componentId, 'EnterOTP', {
            email: requestData.email,
          }),
        );
        dispatch({type: Types.FORGOT_PASSWORD_SUCCESS, payload: response});
      } else {
        dispatch({type: Types.FORGOT_PASSWORD_FAIL});
      }
    } catch (error) {
      Toast.show(idx(error, (_) => _.data.message));
      dispatch({type: Types.FORGOT_PASSWORD_FAIL});
    }
  };
}

export function confirmOTP(requestData, componentId) {
  return async (dispatch) => {
    dispatch({type: Types.CONFIRM_OTP_REQUEST});
    try {
      const response = await RestClient.postCall(API.CONFIRM_OTP, requestData);
      if (response) {
        dispatch(
          pushToParticularScreen(componentId, 'EnterPassword', {
            user_id: response.data,
          }),
        );
        dispatch({type: Types.CONFIRM_OTP_SUCCESS, payload: response});
      } else {
        dispatch({type: Types.CONFIRM_OTP_FAIL});
      }
    } catch (error) {
      Toast.show(idx(error, (_) => _.data.message));
      dispatch({type: Types.CONFIRM_OTP_FAIL});
    }
  };
}

export function setPassword(requestData) {
  return async (dispatch) => {
    dispatch({type: Types.SET_PASSWORD_REQUEST});
    try {
      const response = await RestClient.postCall(API.SET_PASSWORD, requestData);
      if (response) {
        Toast.show('Password successfully changed', Toast.LONG);
        goToAuth();
        dispatch({type: Types.SET_PASSWORD_SUCCESS, payload: response});
      } else {
        dispatch({type: Types.SET_PASSWORD_FAIL});
      }
    } catch (error) {
      Toast.show(idx(error, (_) => _.data.message));
      dispatch({type: Types.SET_PASSWORD_FAIL});
    }
  };
}

export const notificationDetails = (data) => {
  return (dispatch, getState) => {
    dispatch({type: Types.NOTIFICATION_DETAILS, payload: data});
  };
};

export function socketRegister() {
  return async (dispatch) => {
    dispatch({type: Types.SOCKET_REGISTER_REQUEST});
    try {
      const response = await RestClient.postCall(API.SOCKET_REGISTER);
      if (response) {
        dispatch({type: Types.SOCKET_REGISTER_SUCCESS});
      } else {
        dispatch({type: Types.SOCKET_REGISTER_FAIL});
      }
    } catch (error) {
      dispatch({type: Types.SOCKET_REGISTER_FAIL});
    }
  };
}
