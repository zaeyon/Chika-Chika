import React, {useEffect} from 'react';
import {
  PermissionsAndroid,
  Platform,
} from 'react-native';
import CameraRoll from "@react-native-community/cameraroll";
import styled from 'styled-components/native';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from './reducers';
import Navigator from '~/Navigator'

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
// Waring 경고창 숨기기
console.disableYellowBox = true;

const App = () => {

  useEffect(() => {
    hasAndroidPermission()
  }, [])
  
  return (
    <Provider store={store}>
    <Navigator/>
    </Provider>
  );
};


export default App;
