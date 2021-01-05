import React, {useState, useEffect, useRef} from 'react';
import Styled from 'styled-components/native';
import SafeAreaView from 'react-native-safe-area-view';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
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

// Routes
import GETCommunityPosts from '~/Routes/Community/showPosts/GETCommunityPosts';
// Local Component
import HomeTabScreen from './HomeTabScreen';
import QuestionTabScreen from './QuestionTabScreen';
import GeneralTabScreen from './GeneralTabScreen';
// Redux
import {useSelector, useDispatch} from 'react-redux';
import allActions from '~/actions';

const ContainerView = Styled(
  (SafeAreaView as unknown) as new () => SafeAreaView,
)`
 flex: 1;
 background: white;
`;

const HeaderContainerView = Styled.View`
width: ${wp('100%')}px;
height: ${hp('8.25%') + getStatusBarHeight()}px;
flex-direction: row;
margin-top: ${-getStatusBarHeight()}px;
padding: ${getStatusBarHeight()}px 16px 0px 16px;
align-items: center;
background: white;
z-index: 2;
`;

const HeaderNicknameText = Styled.Text`
font-family: NanumSquareR;
font-style: normal;
font-weight: bold;
font-size: 20px;
line-height: 32px;
margin-right: 8px;
`;

const HeaderLocationText = Styled.Text`
font-family: NanumSquareR;
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

const HeaderIconTouchableOpacity = Styled(
  TouchableOpacity as new () => TouchableOpacity,
)`
width: 30px;
height: 30px;
margin-left: 16px;
background: grey;
border-radius: 15px;
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
  const jwtToken = currentUser.jwtToken;

  const moveToKeywordSearch = () => {
    navigation.navigate('KeywordSearchStackScreen', {
      screen: 'KeywordSearchScreen',
    });
  };

  useEffect(() => {
    const questionform = {
      type: 'Question',
      limit: 10,
      offset: 0,
      order: 'createdAt',
    };
    const freetalkform = {
      type: 'FreeTalk',
      limit: 10,
      offset: 0,
      order: 'createdAt',
    };
    GETCommunityPosts(jwtToken, questionform).then((response: any) => {
      const data = {
        type: 'Question',
        posts: response,
      };
      dispatch(allActions.communityActions.setPosts(data));
      console.log('res', response.length);
    });
    GETCommunityPosts(jwtToken, freetalkform).then((response: any) => {
      const data = {
        type: 'FreeTalk',
        posts: response,
      };
      dispatch(allActions.communityActions.setPosts(data));
      console.log('res', response.length);
    });
  }, []);

  return (
    <ContainerView forceInset={{top: 'always'}}>
      <HeaderContainerView>
        <HeaderNicknameText>{'커뮤니티'}</HeaderNicknameText>
        <HeaderLocationText>
          {/* {this.props.currentUser.location} */ '광교동'}
        </HeaderLocationText>
        <HeaderIconContainerView>
          <HeaderIconTouchableOpacity onPress={moveToKeywordSearch} />
          <HeaderIconTouchableOpacity />
        </HeaderIconContainerView>
      </HeaderContainerView>
      <BodyContainerView>
        <CommunityTopTab.Navigator
          style={{
            flex: 1,
          }}
          tabBarOptions={{
            activeTintColor: '#2998FF',
            inactiveTintColor: '#848484',
            labelStyle: {
              fontFamily: 'NanumSquareR',
              fontWeight: 'bold',
              fontSize: 14,
              lineHeight: 16,
            },
            indicatorStyle: {
              backgroundColor: '#2998FF',
              height: 3,
            },
            indicatorContainerStyle: {
              borderBottomColor: '#C4C4C4',
              borderBottomWidth: 1,
            },
          }}>
          <CommunityTopTab.Screen
            name="전체"
            component={HomeTabScreen}
            initialParams={{jwtToken: jwtToken}}
          />
          <CommunityTopTab.Screen
            name="질문"
            component={QuestionTabScreen}
            initialParams={{jwtToken: jwtToken}}
          />
          <CommunityTopTab.Screen
            name="자유"
            component={GeneralTabScreen}
            initialParams={{jwtToken: jwtToken}}
          />
        </CommunityTopTab.Navigator>
      </BodyContainerView>
    </ContainerView>
  );
};

const styles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default CommunityListScreen;
