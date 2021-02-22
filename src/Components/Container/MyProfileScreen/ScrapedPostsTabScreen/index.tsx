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
        borderDisable={true}
        headerLeftProps={{
          onPress: headerLeftAction,
          type: 'arrow',
        }}
        headerTitle="스크랩한 글"
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
        }}>
        <Tab.Screen name="후기글" component={ScrapedReviewScreen} />
        <Tab.Screen name="수다글" component={ScrapedCommunityPostScreen} />
      </Tab.Navigator>
    </ContainerView>
  );
};

export default ScrapedPostsTabScreen;
