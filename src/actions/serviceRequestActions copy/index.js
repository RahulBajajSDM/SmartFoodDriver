/* eslint-disable module-resolver/use-alias */
import * as Types from './node_modules/constants/actionsTypes';
import API from './node_modules/constants/urls';
import RestClient from './node_modules/helpers/RestClient';
import idx from 'idx';
import Toast from 'react-native-simple-toast';

export const openServiceRequestModal = (data) => {
  return (dispatch, getState) => {
    if (!getState().serviceRequestReducer.isOpened) {
      dispatch({type: Types.OPEN_SERVICE_REQUEST_MODEL, payload: data});
    }
  };
};

export const closeServiceRequestModal = () => {
  return (dispatch, getState) => {
    if (getState().serviceRequestReducer.isOpened) {
      dispatch({type: Types.CLOSE_SERVICE_REQUEST_MODEL});
    }
  };
};

export const openPaymentSucessModal = (data) => {
  return (dispatch, getState) => {
    if (!getState().serviceRequestReducer.isPaymentSuccesState) {
      dispatch({type: Types.OPEN_PAYMENT_SUCCESS_MODEL, payload: data});
    }
  };
};

export const closePaymentSucessModal = () => {
  return (dispatch, getState) => {
    if (getState().serviceRequestReducer.isPaymentSuccesState) {
      dispatch({type: Types.CLOSE_PAYMENT_SUCCESS_MODEL});
    }
  };
};

export function acceptRequest(requestData) {
  return async (dispatch) => {
    try {
      const response = await RestClient.putCall(
        API.ACCEPT_REQUEST,
        requestData,
      );
      if (response) {
        dispatch({type: Types.ACCEPT_SUCCESS});
        dispatch(getActiveJobs({page_no: 1}));
      } else {
        dispatch({type: Types.ACCEPT_FAIL});
      }
    } catch (error) {
      dispatch({type: Types.ACCEPT_FAIL});
    }
  };
}

export function tggleAvailability(requestData) {
  return async (dispatch) => {
    try {
      const response = await RestClient.putCall(
        API.TOGGLE_REQUEST,
        requestData,
      );
      if (response) {
        dispatch({
          type: Types.TOGGLE_SUCCESS,
          payload: response.data,
          isActive: requestData.isActive,
        });
        Toast.show('Your availability status is updated successfully!');
      } else {
        dispatch({type: Types.TOGGLE_FAIL});
      }
    } catch (error) {
      dispatch({type: Types.TOGGLE_FAIL});
    }
  };
}

export function getActiveJobs(data) {
  return async (dispatch, getState) => {
    let userId = idx(
      getState(),
      (_) => _.authReducer.loginData.driverDetails._id,
    );
    if (data.page_no == 1) {
      dispatch({type: Types.GET_ACTIVE_JOB_REQUEST});
    }
    try {
      const response = await RestClient.getCall(
        `${API.GET_ACTIVE_JOBS}perPage=10&page=1&filter=&sortBy=receiptId&orderBy=asc&driverId=${userId}&status=Active`,
      );
      if (response) {
        if (data.page_no == 1) {
          dispatch({
            type: Types.GET_ACTIVE_JOB_SUCCESS,
            payload: idx(response, (_) => _.data.data),
          });
        } else {
          dispatch({
            type: Types.GET_ACTIVE_JOB_APPEND_LISTING_SUCCESS,
            payload: idx(response, (_) => _.data.data),
            page_no: data.page_no,
          });
        }
      } else {
        dispatch({type: Types.GET_ACTIVE_JOB_FAIL});
      }
    } catch (error) {}
  };
}

export function getDeliveredJobs(data) {
  return async (dispatch, getState) => {
    let userId = idx(
      getState(),
      (_) => _.authReducer.loginData.driverDetails._id,
    );
    if (data.page_no == 1) {
      dispatch({type: Types.GET_COMPLETED_JOB_REQUEST});
    }
    try {
      const response = await RestClient.getCall(
        `${API.GET_COMPLETED_JOBS}perPage=10&page=1&filter=&sortBy=receiptId&orderBy=asc&driverId=${userId}&status=Completed`,
      );
      if (response) {
        if (data.page_no == 1) {
          dispatch({
            type: Types.GET_COMPLETED_JOB_SUCCESS,
            payload: idx(response, (_) => _.data.data),
          });
        } else {
          dispatch({
            type: Types.GET_COMPLETED_JOB_APPEND_LISTING_SUCCESS,
            payload: idx(response, (_) => _.data.data),
            page_no: data.page_no,
          });
        }
      } else {
        dispatch({type: Types.GET_COMPLETED_JOB_FAIL});
      }
    } catch (error) {}
  };
}

export function getTodayJobs(data) {
  return async (dispatch, getState) => {
    let userId = idx(
      getState(),
      (_) => _.authReducer.loginData.driverDetails._id,
    );
    if (data.page_no == 1) {
      dispatch({type: Types.GET_TODAY_JOB_REQUEST});
    }
    try {
      const response = await RestClient.getCall(
        `${API.GET_COMPLETED_JOBS}perPage=10&page=1&filter=&sortBy=receiptId&orderBy=asc&driverId=${userId}&status=Approved&date=today`,
      );
      if (response) {
        if (data.page_no == 1) {
          dispatch({
            type: Types.GET_TODAY_JOB_SUCCESS,
            payload: idx(response, (_) => _.data.data),
          });
        } else {
          dispatch({
            type: Types.GET_TODAY_JOB_APPEND_LISTING_SUCCESS,
            payload: idx(response, (_) => _.data.data),
            page_no: data.page_no,
          });
        }
      } else {
        dispatch({type: Types.GET_TODAY_JOB_FAIL});
      }
    } catch (error) {}
  };
}

export function getCanceledJobs(data) {
  return async (dispatch, getState) => {
    let userId = idx(
      getState(),
      (_) => _.authReducer.loginData.driverDetails._id,
    );
    if (data.page_no == 1) {
      dispatch({type: Types.GET_CANCELED_JOB_REQUEST});
    }
    try {
      const response = await RestClient.getCall(
        `${API.GET_COMPLETED_JOBS}perPage=10&page=1&filter=&sortBy=receiptId&orderBy=asc&driverId=${userId}&status=Canceled`,
      );
      if (response) {
        if (data.page_no == 1) {
          dispatch({
            type: Types.GET_CANCELED_JOB_SUCCESS,
            payload: idx(response, (_) => _.data.data),
          });
        } else {
          dispatch({
            type: Types.GET_CANCELED_JOB_APPEND_LISTING_SUCCESS,
            payload: idx(response, (_) => _.data.data),
            page_no: data.page_no,
          });
        }
      } else {
        dispatch({type: Types.GET_CANCELED_JOB_FAIL});
      }
    } catch (error) {}
  };
}

export function updateSelectedOrderStatus(requestData) {
  return async (dispatch) => {
    dispatch({type: Types.UPDATE_ORDER_STATUS_REQUEST});
    try {
      const response = await RestClient.postCall(
        API.UPDATE_ORDER_STATUS,
        requestData,
      );
      if (response) {
        dispatch({
          type: Types.UPDATE_ORDER_STATUS_SUCCESS,
          payload: response.data,
        });
      } else {
        dispatch({type: Types.UPDATE_ORDER_STATUS_FAIL});
      }
    } catch (error) {
      dispatch({type: Types.UPDATE_ORDER_STATUS_FAIL});
    }
  };
}

export function manageSelectedOrder(data) {
  return async (dispatch, getState) => {
    dispatch({type: Types.CURRENT_SELECTED_ORDER, payload: data});
  };
}
