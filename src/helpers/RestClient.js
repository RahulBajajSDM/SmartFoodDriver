'use strict';

import NetInfo from '@react-native-community/netinfo';
import {create} from 'apisauce';
import API from 'constants/urls';
import idx from 'idx';
import {store} from 'store/setup';

const api = create({
  baseURL: API.SERVER_URL, //TEST_API_URL
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  },
});

class RestClient {
  static isConnected() {
    return new Promise(function (fulfill, reject) {
      NetInfo.fetch().then((isConnected) => {
        if (isConnected) fulfill(isConnected);
        else {
          reject(isConnected);
        }
      });
    });
  }

  static getCall(url) {
    let token = idx(store, (_) => _.getState().authReducer.loginData.token);
    api.setHeader('Authorization', token);
    let context = this;
    return new Promise(function (fulfill, reject) {
      context
        .isConnected()
        .then(() => {
          api.get(API.SERVER_URL + url).then((response) => {
            if (response.status === 401 || response.status === 404) {
              reject(response);
            } else {
              fulfill(response.data);
            }
          });
        })
        .catch((error) => {
          fulfill({
            message:
              'The server is not reachable right now, sorry for inconvenience.',
          });
          console.warn('error', error);
        });
    });
  }

  static postCall(url, params?: {}) {
    let token = idx(store, (_) => _.getState().authReducer.loginData.token);

    api.setHeader('Authorization', token);
    let context = this;
    return new Promise(function (fulfill, reject) {
      context
        .isConnected()
        .then(() => {
          api.post(API.SERVER_URL + url, params).then((response) => {
            console.log('POST REACHED', response);
            if (
              response.status === 401 ||
              response.status === 404 ||
              response.status === 400
            ) {
              reject(idx(response, (_) => _.data.message) || response);
            }
            fulfill(response.data);
          });
        })
        .catch((error) => {
          fulfill({
            message:
              'The server is not reachable right now, sorry for inconvenience.',
          });
        });
    });
  }

  static putCall(url, params?: {}) {
    let token = idx(store, (_) => _.getState().authReducer.loginData.token);

    api.setHeader('Authorization', token);

    let context = this;
    return new Promise(function (fulfill, reject) {
      context
        .isConnected()
        .then(() => {
          api.put(API.SERVER_URL + url, params).then((response) => {
            let statusCode = idx(response, (_) => _.data.statusCode);

            if (statusCode === 401 || statusCode === 404) {
              reject(response);
            } else {
              fulfill(response.data);
            }
          });
        })
        .catch((error) => {
          fulfill({
            message:
              'The server is not reachable right now, sorry for inconvenience.',
          });
        });
    });
  }

  static patchCall(url, params?: {}) {
    let context = this;
    return new Promise(function (fulfill, reject) {
      context
        .isConnected()
        .then(() => {
          api.put(API.SERVER_URL + url, params).then((response) => {
            if (response.status === 401 || response.status === 404) {
              reject(response);
            }
            fulfill(response.data);
          });
        })
        .catch((error) => {
          fulfill({
            message:
              'The server is not reachable right now, sorry for inconvenience.',
          });
          console.warn('eroro', error);
        });
    });
  }

  static deleteRequest(url, data) {
    let token = idx(store, (_) => _.getState().authReducer.loginData.token);

    let context = this;
    return new Promise(function (fulfill, reject) {
      context
        .isConnected()
        .then(() => {
          fetch(`${API.SERVER_URL}${url}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `${token}`,
            },
            body: data ? JSON.stringify(data) : '',
          })
            .then((response) => {
              return response.json();
            })
            .then((responseJson) => {
              let statusCode =
                idx(responseJson, (_) => _.data.statusCode) ||
                idx(responseJson, (_) => _.statusCode);

              if (statusCode == 200) {
                fulfill(responseJson.data);
              } else {
                reject(responseJson);
              }
            })
            .catch((error) => {
              reject(error);
            });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

export default RestClient;
