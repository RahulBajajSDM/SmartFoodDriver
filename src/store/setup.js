// @ts-nocheck
import {applyMiddleware, createStore} from 'redux';
import {createLogger} from 'redux-logger';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import array from './array';
import promise from './promise';
import whitelist from './whitelist';
import idx from 'idx';
import {goToAuth, goHome, goToRegister} from '../config/navigation';

export let storeObj = {};
const persistConfig = {
  timeout: 10000,
  whitelist,
  key: 'root',
  storage: AsyncStorage,
};

const middlewares = [];

if (__DEV__) {
  middlewares.push(createLogger());
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  undefined,
  applyMiddleware(...middlewares, ...[thunk, promise, array]),
);

export const persistor = persistStore(store, {}, () => {
  // Session Managemanet check here
  let userLoggedIn = idx(
    store,
    (_) => _.getState().authReducer.loginData.token,
  );
  setTimeout(() => {
    //Session Managemanet check here
    if (userLoggedIn) {
      goHome();
    } else {
      goToAuth();
    }
  }, 1000);
  storeObj = store;
  return store;
});
