/* eslint-disable module-resolver/use-alias */
import * as Types from '../../constants/actionsTypes';

const INITIAL_STATE = {
  isLoading: false,
  orderHistory: [],
  pageNo: 1,
};

function historyReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_ORDER_HISTORY_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
      });
    case Types.GET_ORDER_HISTORY_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        orderHistory: action.payload,
      });

    case Types.GET_ORDER_HISTORY_APPEND_LISTING_SUCCESS:
      return Object.assign({}, state, {
        orderHistory: [...state.orderHistory, ...action.payload],
        pageNo: action.page_no,
        isLoading: false,
      });

    case Types.GET_ORDER_HISTORY_FAIL:
      return Object.assign({}, state, {
        isLoading: false,
      });

    case Types.LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
}
export default historyReducer;
