/* eslint-disable module-resolver/use-alias */
import * as Types from 'constants/actionsTypes';
import RestClient from 'helpers/RestClient';
import API from 'constants/urls';
import Toast from 'react-native-simple-toast';
import {pop} from 'actions/appActions/AppActions';
import moment from 'moment';
import idx from 'idx';
export const updateUserCurrentLocation = (data) => {
  return (dispatch, getState) => {
    dispatch({type: Types.UPDATE_USER_CURRENT_LOCATION, payload: data});
  };
};

export function updateUserLiveLocation(requestData) {
  return async (dispatch) => {
    dispatch({type: Types.UPDATE_USER_LIVE_LOCATION_REQUEST});
    try {
      const response = await RestClient.postCall(
        API.LIVE_TRACKING,
        requestData,
      );
      if (response) {
        dispatch({type: Types.UPDATE_USER_LIVE_LOCATION_SUCCESS});
      } else {
        dispatch({type: Types.UPDATE_USER_LIVE_LOCATION_FAIL});
      }
    } catch (error) {
      dispatch({type: Types.UPDATE_USER_LIVE_LOCATION_FAIL});
    }
  };
}

export function updateNotification(notificationData) {
  return async (dispatch) => {
    dispatch({type: Types.UPDATE_NOTIFICATION_REQUEST});
    try {
      const response = await RestClient.putCall(
        API.UPDATE_NOTIFICATION,
        notificationData,
      );
      if (response) {
        dispatch({type: Types.UPDATE_NOTIFICATION_SUCCESS});
        dispatch(getNotificationStatus());
      } else {
        dispatch({type: Types.UPDATE_NOTIFICATION_FAIL});
      }
    } catch (error) {
      dispatch({type: Types.UPDATE_NOTIFICATION_FAIL});
    }
  };
}

export function getNotificationStatus() {
  return async (dispatch) => {
    dispatch({type: Types.GET_NOTIFICATION_REQUEST});
    try {
      const response = await RestClient.getCall(`${API.GET_NOTIFICATION}`);
      if (response) {
        dispatch({
          type: Types.GET_NOTIFICATION_SUCCESS,
          payload: response.data,
        });
      } else {
        dispatch({type: Types.GET_NOTIFICATION_FAIL});
      }
    } catch (error) {}
    dispatch({type: Types.GET_NOTIFICATION_FAIL});
  };
}

export function addBank(data, componentId) {
  console.log(data, 'bankDatabankDatabankData');

  return async (dispatch) => {
    dispatch({type: Types.ADD_BANK_REQUEST});
    try {
      const response = await RestClient.postCall(`${API.ADD_BANK}`, data);
      if (response) {
        dispatch({
          type: Types.ADD_BANK_SUCCESS,
          payload: response.data,
        });
        dispatch(getBankAccount());
        dispatch(pop(componentId));
      } else {
        dispatch({type: Types.ADD_BANK_FAIL});
      }
    } catch (error) {
      Toast.show(`${error}`);

      dispatch({type: Types.ADD_BANK_FAIL});
    }
  };
}

export function getBankAccount() {
  return async (dispatch) => {
    dispatch({type: Types.GET_BANK_REQUEST});
    try {
      const response = await RestClient.getCall(`${API.GET_BANK}`);
      if (response) {
        dispatch({
          type: Types.GET_BANK_SUCCESS,
          payload: response.data,
        });
      } else {
        dispatch({type: Types.GET_BANK_FAIL});
      }
    } catch (error) {
      dispatch({type: Types.GET_BANK_FAIL});
    }
  };
}

export function setSlots(data, savedTimeStamp) {
  return async (dispatch) => {
    dispatch({type: Types.SET_SLOT_REQUEST});
    try {
      console.log(data, 'SET_SLOT_REQUEST');
      const response = await RestClient.postCall(`${API.SET_SLOT}`, data);
      if (response) {
        dispatch(getDateSlots(savedTimeStamp));
        dispatch({
          type: Types.SET_SLOT_SUCCESS,
          payload: response.data,
        });
      } else {
        dispatch({type: Types.SET_SLOT_FAIL});
      }
    } catch (error) {
      Toast.show(`${error}`);

      dispatch({type: Types.SET_SLOT_FAIL});
    }
  };
}

export function getDateSlots(date) {
  return async (dispatch) => {
    dispatch({type: Types.GET_SLOTS_REQUEST});
    try {
      const response = await RestClient.getCall(`${API.GET_SLOTS}${date}`);
      if (response) {
        console.log(`${API.GET_SLOTS}${date}`, 'GET_SLOTS_REQUEST', response);
        dispatch({
          type: Types.GET_SLOTS_SUCCESS,
          payload: response.data,
        });
      } else {
        dispatch({type: Types.GET_SLOTS_FAIL});
      }
    } catch (error) {
      dispatch({type: Types.GET_SLOTS_FAIL});
    }
  };
}

export function deleteSlot(data, savedTimeStamp) {
  return async (dispatch) => {
    dispatch({type: Types.DELETE_SLOTS_REQUEST});
    try {
      const response = await RestClient.deleteRequest(
        `${API.DELETE_SLOT}`,
        data,
      );
      if (response) {
        dispatch(getDateSlots(savedTimeStamp));

        dispatch({type: Types.DELETE_SLOTS_SUCCESS, payload: response});
      } else {
        dispatch({type: Types.DELETE_SLOTS_FAIL});
      }
    } catch (error) {
      dispatch({type: Types.DELETE_SLOTS_FAIL});
    }
  };
}

export function updateSlots(data, savedTimeStamp) {
  return async (dispatch) => {
    dispatch({type: Types.UPDATE_SLOTS_REQUEST});
    try {
      const response = await RestClient.putCall(API.UPDATE_SLOT, data);
      if (response) {
        dispatch(getDateSlots(savedTimeStamp));

        dispatch({type: Types.UPDATE_SLOTS_SUCCESS});
      } else {
        dispatch({type: Types.UPDATE_SLOTS_FAIL});
      }
    } catch (error) {
      dispatch({type: Types.UPDATE_SLOTS_FAIL});
    }
  };
}

export function getAllDates() {
  return async (dispatch) => {
    dispatch({type: Types.GET_ALL_SLOTS_REQUEST});
    try {
      const response = await RestClient.getCall(`${API.GET_ALL_SLOTS}`);
      if (response) {
        dispatch({
          type: Types.GET_ALL_SLOTS_SUCCESS,
          payload: response.data,
        });
      } else {
        dispatch({type: Types.GET_ALL_SLOTS_FAIL});
      }
    } catch (error) {
      dispatch({type: Types.GET_ALL_SLOTS_FAIL});
    }
  };
}

export function getTodaySchedule() {
  let todayData = moment(moment().format('MM/DD/YYYY'), 'MM/DD/YYYY').valueOf();

  return async (dispatch) => {
    dispatch({type: Types.GET_TODAY_SLOTS_REQUEST});
    try {
      const response = await RestClient.getCall(`${API.GET_SLOTS}${todayData}`);
      if (response) {
        console.log(todayData, 'GET_TODAY_SLOTS_SUCCESS', response);
        dispatch({
          type: Types.GET_TODAY_SLOTS_SUCCESS,
          payload: response.data,
        });
      } else {
        dispatch({type: Types.GET_TODAY_SLOTS_FAIL});
      }
    } catch (error) {
      dispatch({type: Types.GET_TODAY_SLOTS_FAIL});
    }
  };
}

export function getUserReport(value) {
  return async (dispatch, getState) => {
    let userId = idx(getState(), (_) => _.authReducer.loginData._id);

    dispatch({type: Types.GET_REPORT_REQUEST});
    try {
      const response = await RestClient.getCall(
        `${API.GET_REPORT}?driverId=${userId}&filterBy=${value}`,
      );
      if (response) {
        dispatch({
          type: Types.GET_REPORT_SUCCESS,
          payload: response.data,
        });
      } else {
        dispatch({type: Types.GET_REPORT_FAIL});
      }
    } catch (error) {
      dispatch({type: Types.GET_REPORT_FAIL});
    }
  };
}

export function updateDriverDetails(data) {
  return async (dispatch) => {
    dispatch({type: Types.UPLOAD_DETAILS_REQUEST});
    try {
      const response = await RestClient.putCall(API.UPDATE_DRIVER, data);
      if (response) {
        dispatch(geUserDetails());
        dispatch({type: Types.UPLOAD_DETAILS_SUCCESS});
      } else {
        dispatch({type: Types.UPLOAD_DETAILS_FAIL});
      }
    } catch (error) {
      dispatch({type: Types.UPLOAD_DETAILS_FAIL});
    }
  };
}

export function geUserDetails() {
  return async (dispatch, getState) => {
    let userId = idx(getState(), (_) => _.authReducer.loginData._id);
    dispatch({type: Types.GET_USER_REQUEST});
    try {
      const response = await RestClient.getCall(`${API.GET_USER}${userId}`);
      if (response) {
        dispatch({
          type: Types.GET_USER_SUCCESS,
          payload: idx(response, (_) => _.data),
        });
      } else {
        dispatch({type: Types.GET_USER_FAIL});
      }
    } catch (error) {
      dispatch({type: Types.GET_USER_FAIL});
    }
  };
}

export function updatePassword(data) {
  return async (dispatch) => {
    dispatch({type: Types.CHANGE_PASS_REQUEST});
    try {
      const response = await RestClient.postCall(
        `${API.CHANGE_PASSWORD}`,
        data,
      );
      if (response) {
        dispatch({
          type: Types.CHANGE_PASS_SUCCESS,
          payload: response.data,
        });
      } else {
        dispatch({type: Types.CHANGE_PASS_FAIL});
      }
    } catch (error) {
      Toast.show(`${error}`);

      dispatch({type: Types.CHANGE_PASS_FAIL});
    }
  };
}

export function deleteBank(data, savedTimeStamp) {
  return async (dispatch) => {
    dispatch({type: Types.DELETE_BANK_REQUEST});
    try {
      const response = await RestClient.deleteRequest(
        `${API.DELETE_BANK}`,
        data,
      );
      if (response) {
        dispatch(getBankAccount());
        dispatch({type: Types.DELETE_BANK_SUCCESS, payload: response});
      } else {
        dispatch({type: Types.DELETE_BANK_FAIL});
      }
    } catch (error) {
      dispatch({type: Types.DELETE_BANK_FAIL});
    }
  };
}

export function getTerms(slug) {
  return async (dispatch) => {
    dispatch({type: Types.GET_TERMS_REQUEST});
    try {
      const response = await RestClient.getCall(`${API.GET_TERMS}${slug}`);
      if (response) {
        dispatch({
          type: Types.GET_TERMS_SUCCESS,
          payload: response.data,
        });
      } else {
        dispatch({type: Types.GET_TERMS_FAIL});
      }
    } catch (error) {
      dispatch({type: Types.GET_TERMS_FAIL});
    }
  };
}
