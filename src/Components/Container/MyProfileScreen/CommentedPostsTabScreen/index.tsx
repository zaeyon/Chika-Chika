import React, {useState, useEffect, useCallback} from 'react';
import Styled from 'styled-components/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import SafeAreaView from 'react-native-safe-area-view';
//Local Component
import NavigationHeader from '~/Components/Presentational/NavigationHeader';
import CommentedCommunityPostScreen from '~/Components/Container/MyProfileScreen/CommentedPostsTabScreen/CommentedCommunityPostScreen';
import CommentedReviewScreen from '~/Components/Container/MyProfileScreen/CommentedPostsTabScreen/CommentedReviewScreen';

const ContainerView = Styled.View`
 flex: 1;
 background-color: #FFFFFF;
`;
interface Props {
  navigation: any;
  route: any;
}

const CommentedPostsTabScreen = ({navigation, route}: Props) => {
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
        headerTitle="내가 댓글단 글"
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
        <Tab.Screen name="후기글" component={CommentedReviewScreen} />
        <Tab.Screen name="수다글" component={CommentedCommunityPostScreen} />
      </Tab.Navigator>
    </ContainerView>
  );
};

export default CommentedPostsTabScreen;
