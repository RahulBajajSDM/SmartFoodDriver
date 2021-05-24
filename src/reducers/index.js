// @ts-nocheck
import {combineReducers} from 'redux';
import authReducer from './auth';
import componentStats from './componentStats';
import commonReducer from './common';
import serviceRequestReducer from './serviceRequestReducer';
import appConfigReducer from './appConfigReducer';
import historyReducer from './historyReducer';
import chatReducer from './chatReducer';

import themeReducer from './../config/theme/reducers';
const applicationReducer = combineReducers({
  authReducer,
  componentStats,
  commonReducer,
  serviceRequestReducer,
  appConfigReducer,
  historyReducer,
  chatReducer,
  themeReducer,
});

export default applicationReducer;
