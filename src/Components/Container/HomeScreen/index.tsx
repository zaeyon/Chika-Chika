import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import SafeAreaView from 'react-native-safe-area-view';
import {
  TouchableWithoutFeedback,
  FlatList,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Dimensions,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import allActions from '~/actions';

// Firebase
import messaging from '@react-native-firebase/messaging';

//Local Component
import HomeMainScreen from '~/Components/Presentational/HomeScreen';
import RootSiblings from 'react-native-root-siblings';
import ToastMessage from '~/Components/Presentational/ToastMessage';
import {useSelector, useDispatch} from 'react-redux';

import GETSearchRecord from '~/Routes/Search/GETSearchRecord';

const ContainerView = Styled.View`
flex: 1;
background: white;
`;

const ToastButtonListContainer = Styled.View`
flex-direction: row;
align-items: center;
padding: 16px;
`;

const ToastShowButton = Styled.View`
background-color: #c3c3c3;
width: 50px;
height: 50px;
`;

const ToastUpdateButton = Styled.View`
margin-left: 10px;
background-color: #c3c3c3;
width: 50px;
height: 50px;
`;

const ToastHideButton = Styled.View`
margin-left: 10px;
background-color: #c3c3c3;
width: 50px;
height: 50px;
`;

interface Props {
  navigation: any;
  route: any;
}

var id = 0;
var elements = [];

const HomeScreen = ({navigation, route}: Props) => {
  const jwtToken = useSelector((state: any) => state.currentUser).jwtToken;
  const dispatch = useDispatch();

  useEffect(() => {
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
        'data',
        remoteMessage.data,
      );
      switch (remoteMessage.data.targetType) {
        case 'community':
          navigation.navigate('CommunityStackScreen', {
            screen: 'CommunityDetailScreen',
            params: {
              id: remoteMessage.data.targetId,
              type: 'Notification',
            },
          });
          return;
        default:
      }
    });
    GETSearchRecord({jwtToken})
      .then((response: any) => {
        dispatch(allActions.userActions.setSearchRecord(response));
      })
      .catch((error) => {
        console.log('GETSearchRecord error', error);
      });
  }, []);

  const addSibling = () => {
    ToastMessage.show('Toast Message Text in Home Screen');
  };

  return (
    <ContainerView as={SafeAreaView} forceInset={{top: 'always'}}>
      <HomeMainScreen navigation={navigation} route={route} />
    </ContainerView>
  );
};

export default HomeScreen;
