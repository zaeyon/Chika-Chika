import React, {useEffect} from 'react';
import {
  PermissionsAndroid,
  Platform,
  Alert
} from 'react-native';
import CameraRoll from "@react-native-community/cameraroll";
import styled from 'styled-components/native';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from './reducers';
import Navigator from '~/Navigator'
import messaging from '@react-native-firebase/messaging';
import {SafeAreaProvider} from 'react-native-safe-area-context';

// Async Storage
import {getUserInfo} from '~/storage/currentUser';

const store = createStore(rootReducer)

async function hasAndroidPermission() {
  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(permission);
  return status === 'granted';
}

async function requestMessagingPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

// Waring 경고창 숨기기
console.disableYellowBox = true;

const App = () => {

  useEffect(() => {
    hasAndroidPermission()
    requestMessagingPermission()
  }, [])

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Navigator/>
      </SafeAreaProvider>
    </Provider>
  );
};


export default App;
