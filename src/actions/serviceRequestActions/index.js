/* eslint-disable module-resolver/use-alias */
import * as Types from 'constants/actionsTypes';
import API from 'constants/urls';
import RestClient from 'helpers/RestClient';
import idx from 'idx';
import Toast from 'react-native-simple-toast';
import {createChatRoom} from 'actions/chatAction';

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

export function customAccept(requestData) {
  return async (dispatch) => {
    try {
      const response = await RestClient.putCall(API.CUSTOM_ACCEPT, requestData);
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
  console.log('TOGGLE_REQUEST', requestData);
  return async (dispatch) => {
    try {
      const response = await RestClient.putCall(
        API.TOGGLE_REQUEST,
        requestData,
      );
      if (response) {
        console.log('TOGGLE_SUCCESS', response);

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
      console.log('TOGGLE_FAIL', error);

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
        dispatch(
          createChatRoom(
            {
              messageByType: 'userToDriver', // userToDriver, userToAdmin , driverToAdmin
              receiverId: idx(
                response,
                (_) => _.data.finalResult[0].userId._id,
              ),
            },
            0,
          ),
        );
        if (data.page_no == 1) {
          dispatch({
            type: Types.GET_ACTIVE_JOB_SUCCESS,
            payload: idx(response, (_) => _.data.finalResult),
          });
        } else {
          dispatch({
            type: Types.GET_ACTIVE_JOB_APPEND_LISTING_SUCCESS,
            payload: idx(response, (_) => _.data.finalResult),
            page_no: data.page_no,
          });
        }
      } else {
        dispatch({type: Types.GET_ACTIVE_JOB_FAIL});
      }
    } catch (error) {
      dispatch({type: Types.GET_ACTIVE_JOB_FAIL});

      if (idx(error, (_) => _.data.statusCode) == 401) {
        dispatch(logout(true));
      }
    }
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
            payload: idx(response, (_) => _.data.finalResult),
          });
        } else {
          dispatch({
            type: Types.GET_COMPLETED_JOB_APPEND_LISTING_SUCCESS,
            payload: idx(response, (_) => _.data.finalResult),
            page_no: data.page_no,
          });
        }
      } else {
        dispatch({type: Types.GET_COMPLETED_JOB_FAIL});
      }
    } catch (error) {}
    dispatch({type: Types.GET_COMPLETED_JOB_FAIL});
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
            payload: idx(response, (_) => _.data.finalResult),
          });
        } else {
          dispatch({
            type: Types.GET_TODAY_JOB_APPEND_LISTING_SUCCESS,
            payload: idx(response, (_) => _.data.finalResult),
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
            payload: idx(response, (_) => _.data.finalResult),
          });
        } else {
          dispatch({
            type: Types.GET_CANCELED_JOB_APPEND_LISTING_SUCCESS,
            payload: idx(response, (_) => _.data.finalResult),
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
  console.log('UPDATE_ORDER_STATUS_REQUEST', requestData);
  return async (dispatch) => {
    dispatch({type: Types.UPDATE_ORDER_STATUS_REQUEST});
    try {
      const response = await RestClient.postCall(
        API.UPDATE_ORDER_STATUS,
        requestData,
      );
      console.log('UPDATE_ORDER_STATUS_SUCCESS', response);

      if (response) {
        dispatch({
          type: Types.UPDATE_ORDER_STATUS_SUCCESS,
          payload: response.data,
        });
        dispatch(getActiveJobs({page_no: 1}));
        dispatch(getDeliveredJobs({page_no: 1}));
      } else {
        dispatch({type: Types.UPDATE_ORDER_STATUS_FAIL});
      }
    } catch (error) {
      console.log('UPDATE_ORDER_STATUS_FAIL', error);

      dispatch({type: Types.UPDATE_ORDER_STATUS_FAIL});
    }
  };
}

export function manageSelectedOrder(data) {
  return async (dispatch, getState) => {
    dispatch({type: Types.CURRENT_SELECTED_ORDER, payload: data});
  };
}

export function customOrderStatus(requestData) {
  return async (dispatch) => {
    dispatch({type: Types.UPDATE_ORDER_STATUS_REQUEST});
    try {
      const response = await RestClient.postCall(
        API.CUSTOM_STATUS_UPDATE,
        requestData,
      );
      console.log('UPDATE_ORDER_STATUS_FAIL', response);

      if (response) {
        dispatch({
          type: Types.UPDATE_ORDER_STATUS_SUCCESS,
          payload: response.data,
        });
        dispatch(getActiveJobs({page_no: 1}));
        dispatch(getDeliveredJobs({page_no: 1}));
      } else {
        dispatch({type: Types.UPDATE_ORDER_STATUS_FAIL});
      }
    } catch (error) {
      console.log('UPDATE_ORDER_STATUS_FAIL', error);

      dispatch({type: Types.UPDATE_ORDER_STATUS_FAIL});
    }
  };
}

export function getAdminId() {
  return async (dispatch) => {
    dispatch({type: Types.ADMIN_ID_REQUEST});
    try {
      const response = await RestClient.getCall(`${API.GET_ADMIN_ID}`);
      if (response) {
        dispatch({
          type: Types.ADMIN_ID_SUCCESS,
          payload: response.data,
        });
      } else {
        dispatch({type: Types.ADMIN_ID_FAIL});
      }
    } catch (error) {
      dispatch({type: Types.ADMIN_ID_FAIL});
    }
  };
}

export function jobCompleted(data, cb) {
  console.log(data, 'COMPLETE_JOB_REQUEST');
  return async (dispatch) => {
    dispatch({type: Types.COMPLETE_JOB_REQUEST});
    try {
      const response = await RestClient.postCall(API.COMPLETE_JOB, data);
      console.log('COMPLETE_JOB_FAIL', response);

      if (response) {
        cb(true);
        dispatch({type: Types.COMPLETE_JOB_SUCCESS, payload: response.data});
      } else {
        dispatch({type: Types.COMPLETE_JOB_FAIL});
      }
    } catch (error) {
      console.log('COMPLETE_JOB_FAIL', error);
      dispatch({type: Types.COMPLETE_JOB_FAIL});
    }
  };
}
