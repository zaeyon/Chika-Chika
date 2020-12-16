import React, {useState, useEffect, useRef} from 'react';
import Styled from 'styled-components/native';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  View,
  Text,
  Animated,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  isIphoneX,
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper';

// Local Component
import HomeTabScreen from './HomeTabScreen';
import QuestionTabScreen from './QuestionTabScreen';
import GeneralTabScreen from './GeneralTabScreen';

const ContainerView = Styled.SafeAreaView`
 flex: 1;
 background: white;
`;

const HeaderConatinerView = Styled.View`
width: ${wp('100%')}px;
height: 40;
flex-direction: row;
padding: 0px 16px;
margin-top: ${isIphoneX() ? 10 : 20}px;
background: white;
`;
const HeaderContentText = Styled.Text`
font-style: normal;
font-weight: bold;
font-size: 18px;
line-height: 40px;
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

  const moveToKeywordSearch = () => {
    navigation.navigate('KeywordSearchStackScreen', {
      screen: 'KeywordSearchScreen',
    });
  };

  return (
    <ContainerView>
      <HeaderConatinerView>
        <HeaderContentText>수다방</HeaderContentText>
        <TouchableOpacity
          style={{
            marginLeft: 'auto',
          }}
          onPress={() => moveToKeywordSearch()}>
          <HeaderContentText>검색</HeaderContentText>
        </TouchableOpacity>
      </HeaderConatinerView>
      <BodyContainerView>
        <CommunityTopTab.Navigator
          style={{
            flex: 1,
          }}
          tabBarOptions={{
            style: {
              marginLeft: 4,
              marginTop: 9,
              alignContent: 'center',
              justifyContent: 'center',
            },
            labelStyle: {
              fontSize: 18,
              lineHeight: 24,
              color: 'black',
              margin: 0,
            },
            tabStyle: {
              width: 'auto',
              paddingHorizontal: 12,
              paddingTop: 12,
              paddingBottom: 3,
              height: 41.5,
              justifyContent: 'flex-start',
            },
            indicatorContainerStyle: {
              justifyContent: 'center',
              alignItems: 'center',
            },
            indicatorStyle: {
              backgroundColor: '#000000',

              height: 2.5,
            },
          }}>
          <CommunityTopTab.Screen name="전체" component={HomeTabScreen} />
          <CommunityTopTab.Screen name="질문" component={QuestionTabScreen} />
          <CommunityTopTab.Screen
            name="자유수다"
            component={GeneralTabScreen}
          />
        </CommunityTopTab.Navigator>
      </BodyContainerView>
    </ContainerView>
  );
};

export default CommunityListScreen;
