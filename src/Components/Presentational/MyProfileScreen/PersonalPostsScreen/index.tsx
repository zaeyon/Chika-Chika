import React, {useCallback} from 'react';
import Styled from 'styled-components/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
// Local Component
import CommunityPostList from '~/Components/Presentational/CommunityPostList';
import ReviewList from '~/Components/Presentational/ReviewList';

const ContainerView = Styled.View`
flex: 1;
background: white;
`;

interface Props {
  navigation: any;
  route: any;
  reviewData: any;
  isReviewRefreshing: boolean;
  onReviewRefresh: any;
  isReviewEndReached: boolean;
  onReviewEndReached: any;
  communityPostData: any;
  isPostRefreshing: boolean;
  onPostRefresh: any;
  isPostEndReached: boolean;
  onPostEndReached: any;
  currentUser: User;
  moveToCommunityDetail: any;
  moveToReviewDetail: any;
  moveToAnotherProfile: any;
  toggleSocialLike: any;
  toggleSocialScrap: any;
}

interface User {
  jwtToken: string;
  phoneNumber: string;
  id: string;
  nickname: string;
  profileImage: string;
}

const PersonalPostsScreen = ({
  navigation,
  route,
  reviewData,
  isReviewRefreshing,
  onReviewRefresh,
  isReviewEndReached,
  onReviewEndReached,
  communityPostData,
  isPostRefreshing,
  onPostRefresh,
  isPostEndReached,
  onPostEndReached,
  currentUser,
  moveToCommunityDetail,
  moveToReviewDetail,
  moveToAnotherProfile,
  toggleSocialLike,
  toggleSocialScrap,
}: Props) => {
  return (
    <ContainerView>
      <CommunityPostList
        postData={communityPostData}
        refreshing={isPostRefreshing}
        onRefresh={onPostRefresh}
        isEndReached={isPostEndReached}
        onEndReached={onPostEndReached}
        moveToCommunityDetail={moveToCommunityDetail}
        moveToAnotherProfile={moveToAnotherProfile}
        toggleSocialLike={toggleSocialLike}
        toggleSocialScrap={toggleSocialScrap}
      />
    </ContainerView>
  );
};

export default PersonalPostsScreen;
