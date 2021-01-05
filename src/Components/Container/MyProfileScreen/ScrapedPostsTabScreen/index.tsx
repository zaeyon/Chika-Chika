import React, {useState, useEffect, useCallback} from 'react';
import Styled from 'styled-components/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import SafeAreaView from 'react-native-safe-area-view';
//Local Component
import NavigationHeader from '~/Components/Presentational/NavigationHeader';
import ScrapedReviewScreen from '~/Components/Container/MyProfileScreen/ScrapedPostsTabScreen/ScrapedReviewScreen';
import ScrapedCommunityPostScreen from '~/Components/Container/MyProfileScreen/ScrapedPostsTabScreen/ScrapedCommunityPostScreen';

const ContainerView = Styled(
  (SafeAreaView as unknown) as new () => SafeAreaView,
)`
 flex: 1;
 background-color: #FFFFFF;
`;

interface Props {
  navigation: any;
  route: any;
}

const ScrapedPostsTabScreen = ({navigation, route}: Props) => {
  const Tab = createMaterialTopTabNavigator();

  const headerLeftAction = () => {
    navigation.goBack();
  };
  return (
    <ContainerView>
      <NavigationHeader
        headerLeftProps={{
          onPress: headerLeftAction,
          text: 'arrow',
        }}
        headerTitle="스크랩한 글"
      />
      <Tab.Navigator
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
        <Tab.Screen name="후기글" component={ScrapedReviewScreen} />
        <Tab.Screen name="수다글" component={ScrapedCommunityPostScreen} />
      </Tab.Navigator>
    </ContainerView>
  );
};

export default ScrapedPostsTabScreen;
