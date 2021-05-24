/* eslint-disable module-resolver/use-alias */
import * as Types from 'constants/actionsTypes';
import API from 'constants/urls';
import RestClient from 'helpers/RestClient';
import idx from 'idx';
import Toast from 'react-native-simple-toast';

export function getOrderHistory(data) {
  return async (dispatch, getState) => {
    let userId = idx(
      getState(),
      (_) => _.authReducer.loginData.driverDetails._id,
    );
    if (data.page_no == 1) {
      dispatch({type: Types.GET_ORDER_HISTORY_REQUEST});
    }
    try {
      const response = await RestClient.getCall(
        `${API.GET_COMPLETED_JOBS}perPage=10&page=1&filter=&sortBy=receiptId&orderBy=asc&driverId=${userId}&status=Finalized`,
      );
      if (response) {
        if (data.page_no === 1) {
          dispatch({
            type: Types.GET_ORDER_HISTORY_SUCCESS,
            payload: idx(response, (_) => _.data.finalResult),
          });
        } else {
          dispatch({
            type: Types.GET_ORDER_HISTORY_APPEND_LISTING_SUCCESS,
            payload: idx(response, (_) => _.data.finalResult),
            page_no: data.page_no,
          });
        }
      } else {
        dispatch({type: Types.GET_ORDER_HISTORY_FAIL});
      }
    } catch (error) {}
  };
}
