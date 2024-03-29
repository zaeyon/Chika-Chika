import React, {useRef, useEffect, useCallback, useState} from 'react';
import Styled from 'styled-components/native';
import SafeAreaView from 'react-native-safe-area-view';
import {Animated, Image, Platform} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {hasNotch} from '~/method/deviceInfo'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import messaging from '@react-native-firebase/messaging';

// Routes
import GETCommunityPosts from '~/Routes/Community/showPosts/GETCommunityPosts';
// Local Component
import QuestionTabScreen from './QuestionTabScreen';
import GeneralTabScreen from './GeneralTabScreen';
// Redux
import {useSelector, useDispatch} from 'react-redux';
import allActions from '~/actions';

const ContainerView = Styled.View`
 flex: 1;
 background: white;
`;

const HeaderContainerView = Styled.View`
width: ${wp('100%')}px;
flex-direction: row;
padding: 20px 16px 15px 16px;
background: #FFFFFF;
z-index: 2;
border-bottom-width: 1px;
border-color: #F5F7F9;
`;

const HeaderTitleView = Styled.View`
justify-content: center;
`;

const HeaderTitleText = Styled.Text`
font-style: normal;
font-weight: bold;
font-size: 20px;
line-height: 24px;
color: #131F3C;
`;

const HeaderLocationText = Styled.Text`
font-style: normal;
font-weight: bold;
font-size: 14px;
line-height: 32px;
color: #8C8C8C;
`;

const HeaderIconContainerView = Styled.View`
width: auto
height: auto;
flex-direction: row;
margin-left: auto;
`;

const HeaderIconTouchableOpacity = Styled.TouchableOpacity`
width: 30px;
height: 30px;
margin-left: 16px;
border-radius: 15px;
justify-content: center;
align-items: center;
`;
const BodyContainerView = Styled.View`
flex: 1;
`;

interface Props {
  navigation: any;
  route: any;
}

const CommunityListScreen = ({navigation, route}: Props) => {
  const CommunityTopTab = createMaterialTopTabNavigator();

  const dispatch = useDispatch();

  const currentUser = useSelector((state: any) => state.currentUser);

  const hometown = currentUser.hometown;
  const jwtToken = currentUser.jwtToken;

  const [onMessage, setOnMessage] = useState(false);
  const alertScale = useRef(new Animated.Value(0)).current;

  const moveToTotalKeywordSearch = useCallback(() => {
    navigation.navigate('TotalKeywordSearchStackScreen', {
      screen: 'TotalKeywordSearchScreen',
    });
  }, []);

  const moveToNotificationList = useCallback(() => {
    navigation.navigate('NotificationStackScreen', {
      screen: 'NotificationListScreen',
    });
  }, []);

  const moveToCreatePost = useCallback(() => {
    navigation.navigate('CommunityPostUploadStackScreen', {
      data: {
        id: -1,
      },
    });
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      setOnMessage(true);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (onMessage) {
      Animated.timing(alertScale, {
        toValue: 1,
        duration: 100,

        useNativeDriver: true,
      }).start(() => {
        Animated.timing(alertScale, {
          toValue: 0,
          duration: 100,

          useNativeDriver: true,
        }).start();
      });
    }
  }, [onMessage]);


  return (
    <ContainerView as={SafeAreaView} forceInset={{top: 'always'}}>
      <HeaderContainerView>
        <HeaderTitleView>
          <HeaderTitleText>{'커뮤니티'}</HeaderTitleText>
        </HeaderTitleView>
        <HeaderIconContainerView>
          <HeaderIconTouchableOpacity onPress={moveToTotalKeywordSearch}>
            <Image source={require('~/Assets/Images/TopTab/ic/search.png')} />
          </HeaderIconTouchableOpacity>
          <HeaderIconTouchableOpacity
            onPress={() => {
              setOnMessage(false);
              moveToNotificationList();
            }}>
            <Animated.Image
              style={{
                transform: [
                  {
                    rotate: alertScale.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '15deg'],
                      extrapolate: 'clamp',
                    }),
                  },
                  {
                    scale: alertScale.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.15],
                      extrapolate: 'clamp',
                    }),
                  },
                ],
              }}
              source={
                onMessage
                  ? require('~/Assets/Images/TopTab/ic/alarm/focus.png')
                  : require('~/Assets/Images/TopTab/ic/alarm/unfocus.png')
              }
            />
          </HeaderIconTouchableOpacity>
          <HeaderIconTouchableOpacity onPress={() => moveToCreatePost()}>
            <Image
              source={require('~/Assets/Images/TopTab/ic/write/black.png')}
            />
          </HeaderIconTouchableOpacity>
        </HeaderIconContainerView>
      </HeaderContainerView>
      <BodyContainerView>
        <CommunityTopTab.Navigator
          style={{
            flex: 1,
          }}
          tabBar={() => null}
          tabBarOptions={{
            tabStyle: {
              height: hp('7.7%'),
            },
            activeTintColor: '#131F3C',
            inactiveTintColor: '#9AA2A9',
            labelStyle: {
              fontFamily: 'NanumSquareR',
              fontWeight: 'bold',
              fontSize: 16,
              lineHeight: 24,
            },
            indicatorStyle: {
              backgroundColor: '#00D1FF',
              height: 3,
              borderRadius: 100,
            },
            indicatorContainerStyle: {
              borderBottomColor: '#E2E6ED',
              borderBottomWidth: 1,
            },
          }}>
          <CommunityTopTab.Screen name="질문방" component={QuestionTabScreen} />
        </CommunityTopTab.Navigator>
      </BodyContainerView>
    </ContainerView>
  );
};

export default CommunityListScreen;
