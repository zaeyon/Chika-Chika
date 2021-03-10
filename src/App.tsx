import React, {useEffect} from 'react';
import {PermissionsAndroid, Platform, Alert, Dimensions} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import styled from 'styled-components/native';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from './reducers';
import Navigator from '~/Navigator';
import messaging from '@react-native-firebase/messaging';
import {RootSiblingParent, setSiblingWrapper} from 'react-native-root-siblings';
import SplashScreen from 'react-native-splash-screen';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

// Async Storage
import {getUserInfo} from '~/storage/currentUser';

const store = createStore(rootReducer);
setSiblingWrapper((sibling) => <Provider store={store}>{sibling}</Provider>);

async function checkAndroidPermission() {
  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(permission);
  return status === 'granted';
}

function checkIosPermission() {
  check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
  .then((result) => {
    switch (result) {
      case RESULTS.UNAVAILABLE:
        console.log('This feature is not available (on this device / in this context)');
        break;
      case RESULTS.DENIED:
        console.log('The permission has not been requested / is denied but requestable');
        request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then((result) => {

        });
        break;
      case RESULTS.LIMITED:
        console.log('The permission is limited: some actions are possible');
        break;
      case RESULTS.GRANTED:
        console.log('The permission is granted');
        break;
      case RESULTS.BLOCKED:
        console.log('The permission is denied and not requestable anymore');
        break;
    }
  })
  .catch((error) => {
    console.log("checkIosPermission error", error);
  });
}

const {height, width} = Dimensions.get('window');

// Waring 경고창 숨기기
console.disableYellowBox = true;

const App = () => {
  useEffect(() => {
    console.log("device height", height);
    console.log("device width", width);
    
    if(Platform.OS === 'android') {
      //checkAndroidPermission()
    } else if(Platform.OS === 'ios') {
      checkIosPermission()
    }

  }, [])

  return (
    <RootSiblingParent>
      <Provider store={store}>
          <Navigator />
      </Provider>
    </RootSiblingParent>
  );
};

export default App;
