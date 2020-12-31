import React, {useState, useEffect, useCallback} from 'react';
import Styled from 'styled-components/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import SafeAreaView from 'react-native-safe-area-view';
//Local Component
import NavigationHeader from '~/Components/Presentational/NavigationHeader';
import LikedCommunityPostScreen from '~/Components/Container/MyProfileScreen/LikedPostsTabScreen/LikedCommunityPostScreen';
// Redux
import {useSelector, useDispatch} from 'react-redux';
import allActions from '~/actions';
// Method
// Routes
import GETUserLikedPosts from '~/Routes/User/GETUserLikedPosts';
import POSTSocialLike from '~/Routes/Community/social/POSTSocialLike';
import DELETESocialLike from '~/Routes/Community/social/DELETESocialLike';

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

const LikedPostsTabScreen = ({navigation, route}: Props) => {
  const Tab = createMaterialTopTabNavigator();
  const limit = 10;
  const [isReviewRefreshing, setIsReviewRefreshing] = useState(false);
  const [isCommunityRefreshing, setIsCommunityRefreshing] = useState(false);

  const [reviewPageIndex, setReviewPageIndex] = useState(0);
  const [communityPageIndex, setCommunityPageIndex] = useState(0);

  const [isReviewEndReached, setIsReviewEndReached] = useState(false);
  const [isCommunityEndReached, setIsCommunityEndReached] = useState(false);

  const currentUser = useSelector((state: any) => state.currentUser);
  const jwtToken = currentUser.jwtToken;

  const reviewData = useSelector(
    (state: any) => state.communityPostList.LikedReviews,
  );
  const communityPostData = useSelector(
    (state: any) => state.communityPostList.LikedCommunityPosts,
  );

  const dispatch = useDispatch();

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
        headerTitle="좋아요한 글"
      />
      <Tab.Navigator>
        <Tab.Screen name="수다글" component={LikedCommunityPostScreen} />
      </Tab.Navigator>
    </ContainerView>
  );
};

export default LikedPostsTabScreen;
