/* eslint-disable module-resolver/use-alias */
import * as Types from '../../constants/actionsTypes';

const INITIAL_STATE = {
  isOpened: false,
  isLoading: false,
  requestDetails: null,
  allActiveJobs: [],
  allCompletedJobs: [],
  allCanceledJobs: [],
  allTodayJobs: [],
  activeJobsPage: 1,
  completedJobsPage: 1,
  cancledJobsPage: 1,
  todayJobsPage: 1,
  gettingActiveJobs: false,
  gettingCompletedJobs: false,
  gettingCanceledJobs: false,
  gettingTodayJobs: false,
  isPaymentSuccesState: false,
  currentSelectedOrder: null,
  isOrderStatusUpdating: false,
  adminChatId: '',
  completingJob: false,
};

function serviceRequestReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.OPEN_SERVICE_REQUEST_MODEL:
      return Object.assign({}, state, {
        isOpened: true,
        requestDetails: action.payload,
      });

    case Types.CLOSE_SERVICE_REQUEST_MODEL:
      return Object.assign({}, state, {
        isOpened: false,
        requestDetails: null,
      });

    case Types.OPEN_PAYMENT_SUCCESS_MODEL:
      return Object.assign({}, state, {
        isPaymentSuccesState: true,
      });

    case Types.ADMIN_ID_REQUEST:
      return Object.assign({}, state, {});
    case Types.ADMIN_ID_SUCCESS:
      return Object.assign({}, state, {
        adminChatId: action.payload,
      });
    case Types.ADMIN_ID_FAIL:
      return Object.assign({}, state, {});

    case Types.CLOSE_PAYMENT_SUCCESS_MODEL:
      return Object.assign({}, state, {
        isPaymentSuccesState: false,
      });

    case Types.COMPLETE_JOB_REQUEST:
      return Object.assign({}, state, {
        completingJob: true,
      });
    case Types.COMPLETE_JOB_SUCCESS:
      return Object.assign({}, state, {
        completingJob: false,
      });
    case Types.COMPLETE_JOB_FAIL:
      return Object.assign({}, state, {
        completingJob: false,
      });

    case Types.GET_ACTIVE_JOB_REQUEST:
      return Object.assign({}, state, {
        gettingActiveJobs: true,
        gettingCompletedJobs: false,
        gettingCanceledJobs: false,
      });
    case Types.GET_ACTIVE_JOB_SUCCESS:
      return Object.assign({}, state, {
        gettingActiveJobs: false,
        gettingCompletedJobs: false,
        gettingCanceledJobs: false,
        allActiveJobs: action.payload,
      });

    case Types.GET_ACTIVE_JOB_APPEND_LISTING_SUCCESS:
      return Object.assign({}, state, {
        gettingActiveJobs: false,
        gettingCompletedJobs: false,
        gettingCanceledJobs: false,
        allActiveJobs: [...state.allActiveJobs, ...action.payload],
        activeJobsPage: action.page_no,
      });

    case Types.GET_ACTIVE_JOB_FAIL:
      return Object.assign({}, state, {
        gettingActiveJobs: false,
        gettingCompletedJobs: false,
        gettingCanceledJobs: false,
      });

    case Types.GET_COMPLETED_JOB_REQUEST:
      return Object.assign({}, state, {
        gettingCompletedJobs: true,
      });
    case Types.GET_COMPLETED_JOB_SUCCESS:
      return Object.assign({}, state, {
        gettingActiveJobs: false,
        gettingCompletedJobs: false,
        gettingCanceledJobs: false,
        allCompletedJobs: action.payload,
      });

    case Types.GET_COMPLETED_JOB_APPEND_LISTING_SUCCESS:
      return Object.assign({}, state, {
        gettingActiveJobs: false,
        gettingCompletedJobs: false,
        gettingCanceledJobs: false,
        allCompletedJobs: [...state.allCompletedJobs, ...action.payload],
        completedJobsPage: action.page_no,
      });

    case Types.GET_COMPLETED_JOB_FAIL:
      return Object.assign({}, state, {
        gettingActiveJobs: false,
        gettingCompletedJobs: false,
        gettingCanceledJobs: false,
      });

    case Types.GET_TODAY_JOB_REQUEST:
      return Object.assign({}, state, {
        gettingTodayJobs: true,
      });
    case Types.GET_TODAY_JOB_SUCCESS:
      return Object.assign({}, state, {
        gettingTodayJobs: false,
        gettingActiveJobs: false,
        gettingCompletedJobs: false,
        gettingCanceledJobs: false,
        allTodayJobs: action.payload,
      });

    case Types.GET_TODAY_JOB_APPEND_LISTING_SUCCESS:
      return Object.assign({}, state, {
        gettingTodayJobs: false,
        gettingActiveJobs: false,
        gettingCompletedJobs: false,
        gettingCanceledJobs: false,
        allTodayJobs: [...state.allTodayJobs, ...action.payload],
        todayJobsPage: action.page_no,
      });

    case Types.GET_TODAY_JOB_FAIL:
      return Object.assign({}, state, {
        gettingTodayJobs: false,
        gettingActiveJobs: false,
        gettingCompletedJobs: false,
        gettingCanceledJobs: false,
      });

    case Types.GET_CANCELED_JOB_REQUEST:
      return Object.assign({}, state, {
        gettingCanceledJobs: true,
      });
    case Types.GET_CANCELED_JOB_SUCCESS:
      return Object.assign({}, state, {
        gettingActiveJobs: false,
        gettingCompletedJobs: false,
        gettingCanceledJobs: false,
        allCanceledJobs: action.payload,
      });

    case Types.GET_CANCELED_JOB_APPEND_LISTING_SUCCESS:
      return Object.assign({}, state, {
        gettingActiveJobs: false,
        gettingCompletedJobs: false,
        gettingCanceledJobs: false,
        allCanceledJobs: [...state.allCanceledJobs, ...action.payload],
        cancledJobsPage: action.page_no,
      });

    case Types.GET_CANCELED_JOB_FAIL:
      return Object.assign({}, state, {
        gettingActiveJobs: false,
        gettingCompletedJobs: false,
        gettingCanceledJobs: false,
      });

    case Types.CURRENT_SELECTED_ORDER:
      return Object.assign({}, state, {
        currentSelectedOrder: action.payload,
      });

    case Types.UPDATE_ORDER_STATUS_REQUEST:
      return Object.assign({}, state, {
        isOrderStatusUpdating: true,
      });

    case Types.UPDATE_ORDER_STATUS_SUCCESS:
      return Object.assign({}, state, {
        isOrderStatusUpdating: false,
        currentSelectedOrder: action.payload,
      });

    case Types.UPDATE_ORDER_STATUS_FAIL:
      return Object.assign({}, state, {
        isOrderStatusUpdating: false,
      });

    case Types.LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
}
export default serviceRequestReducer;
