export default {
  SERVER_URL: "http://smartfood.live:6104/",
  IMG_URL: "http://smartfood.live:6104",
  SOCKET_URL: "http://smartfood.live:6104/",
  // SOCKET_URL: 'https://mean.stagingsdei.com:6047',
  // SERVER_URL: 'https://mean.stagingsdei.com:6047/',
  LOGIN: "user/login",
  REGISTER: "user/register",
  FORGOT_PASSWORD: "user/forgot",
  CONFIRM_OTP: "user/verify",
  SET_PASSWORD: "user/reset",
  ACCEPT_REQUEST: "order/driver-request",
  TOGGLE_REQUEST: "order/driver-status",
  GET_ACTIVE_JOBS: "order/orderListing?",
  GET_COMPLETED_JOBS: "order/orderListing?",
  LIVE_TRACKING: "order/live-tracking",
  GET_NOTIFICATION: "notification/getUserNotiSetting",
  UPDATE_NOTIFICATION: "notification/updateUserNotiSettings",
  UPDATE_ORDER_STATUS: "order/update-status",
  LOGOUT: "user/logout",
  SOCKET_REGISTER: "user/socketEvent",
  UPLOAD_CHAT_IMG: "order/upload",
  GET_CHAT_LISTING: "chat/getConversation",
  DELETE_CHAT: "chat/deleteChat",
  GET_INBOX: "chat/getInbox?",
  CREATE_CHAT_ROOM: "chat/createRoom",
  RATE_USER: "rating/rateDriver",
  ADD_BANK: "stripe/addBankAccount",
  GET_BANK: "stripe/getBankAccount",
  SET_SLOT: "availabilty/addAvailabilty",
  GET_SLOTS: "availabilty/listAvailability?page=1&perPage=25&date=",
  UPDATE_SLOT: "availabilty/updateAvailabilty",
  DELETE_SLOT: "availabilty/deleteAvailability",
  GET_ALL_SLOTS: "availabilty/listAvailability?page=1&perPage=25",
  GET_REPORT: "graph/getDriverReport",
  UPDATE_DRIVER: "user/updateDriverInfo",
  GET_USER: "user/findbyid?id=",
  CHANGE_PASSWORD: "user/changepassword",
  DELETE_BANK: "stripe/deleteBankAccount",
  GET_TERMS: "page/getPage/",
  CUSTOM_ACCEPT: "order/driver-custom-request",
  CUSTOM_STATUS_UPDATE: "order/update-custom-status",
  GET_ADMIN_ID: "chat/get-admin-id",
  MUTE_CHAT: "chat/muteChat",
  READ_MESSAGES: "chat/readMessage",
  COMPLETE_JOB: "order/order-otp-verify",
};