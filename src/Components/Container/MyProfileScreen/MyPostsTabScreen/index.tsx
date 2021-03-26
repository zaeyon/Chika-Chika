import React, {useState, useEffect, useCallback} from 'react';
import Styled from 'styled-components/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {getStatusBarHeight, getBottomSpace} from 'react-native-iphone-x-helper';
import {hasNotch} from '~/method/deviceInfo'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
//Local Component
import NavigationHeader from '~/Components/Presentational/NavigationHeader';
import MyCommunityPostScreen from '~/Components/Container/MyProfileScreen/MyPostsTabScreen/MyCommunityPostScreen';
import MyReviewScreen from '~/Components/Container/MyProfileScreen/MyPostsTabScreen/MyReviewScreen';

const ContainerView = Styled.View`
 flex: 1;
 background-color: #FFFFFF;
`;
interface Props {
  navigation: any;
  route: any;
}

const MyPostsTabScreen = ({navigation, route}: Props) => {
  const Tab = createMaterialTopTabNavigator();

  const headerLeftAction = () => {
    navigation.goBack();
  };

  return (
    <ContainerView>
      <NavigationHeader
        borderDisable={true}
        headerLeftProps={{
          onPress: headerLeftAction,
          type: 'arrow',
        }}
        headerTitle="작성한 글"
      />
      <Tab.Navigator
        tabBarOptions={{
          style: {
            backgroundColor: '#FFFFFF',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowRadius: 4,
            shadowOpacity: 0.05,
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
          activeTintColor: '#131F3C',
          inactiveTintColor: '#9AA2A9',
          tabStyle: {
            height: 54,
          },
          labelStyle: {
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontSize: 16,
            lineHeight: 24,
          },
          pressOpacity: 1,
        }}>
        <Tab.Screen name="후기글" component={MyReviewScreen} />
        <Tab.Screen name="수다글" component={MyCommunityPostScreen} />
      </Tab.Navigator>
    </ContainerView>
  );
};

export default MyPostsTabScreen;
