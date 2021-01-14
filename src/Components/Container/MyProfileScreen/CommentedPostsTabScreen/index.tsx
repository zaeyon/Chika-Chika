import React, {useState, useEffect, useCallback} from 'react';
import Styled from 'styled-components/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import SafeAreaView from 'react-native-safe-area-view';
//Local Component
import NavigationHeader from '~/Components/Presentational/NavigationHeader';
import CommentedCommunityPostScreen from '~/Components/Container/MyProfileScreen/CommentedPostsTabScreen/CommentedCommunityPostScreen';
import CommentedReviewScreen from '~/Components/Container/MyProfileScreen/CommentedPostsTabScreen/CommentedReviewScreen';

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

const CommentedPostsTabScreen = ({navigation, route}: Props) => {
  const Tab = createMaterialTopTabNavigator();

  const headerLeftAction = () => {
    navigation.goBack();
  };

  return (
    <ContainerView>
      <NavigationHeader
        headerLeftProps={{
          onPress: headerLeftAction,
          type: 'arrow',
        }}
        headerTitle="내가 댓글단 글"
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
        <Tab.Screen name="후기글" component={CommentedReviewScreen} />
        <Tab.Screen name="수다글" component={CommentedCommunityPostScreen} />
      </Tab.Navigator>
    </ContainerView>
  );
};

export default CommentedPostsTabScreen;
