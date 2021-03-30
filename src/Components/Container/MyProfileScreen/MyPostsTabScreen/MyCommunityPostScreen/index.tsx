import React, {useState, useEffect, useCallback} from 'react';
import Styled from 'styled-components/native';
import {
  ActivityIndicator,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
//Local Component

// Redux
import {useSelector, useDispatch} from 'react-redux';
import allActions from '~/actions';
// Method
// Routes
import GETUserCommunityPosts from '~/Routes/Community/showPosts/GETUserCommunityPost';
import POSTSocialLike from '~/Routes/Community/social/POSTSocialLike';
import DELETESocialLike from '~/Routes/Community/social/DELETESocialLike';
import POSTSocialScrap from '~/Routes/Community/social/POSTSocialScrap';
import DELETESocialScrap from '~/Routes/Community/social/DELETESocialScrap';
import CommunityPostList from '~/Components/Presentational/CommunityPostList';

const ContainerView = Styled.View`
  flex: 1;
  background-color: #FFFFFF;
  justify-content: center;
  align-items: center;
`;

const EmptyContainerView = Styled.View`
height: 300%;
padding-top: 118px;
align-items: center;
background: #FFFFFF;
`;

const EmptyContentImage = Styled.Image``;

const EmptyContentText = Styled.Text`
margin-top: 12px;
font-weight: normal;
font-size: 16px;
color: #9AA2A9;
`;

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface Props {
  navigation: any;
  route: any;
}

const MyCommunityPostScreen = ({navigation, route}: Props) => {
  const limit = 10;
  const [order, setOrder] = useState('createdAt')
  const [isInitializing, setIsInitializing] = useState(true);
  const [isDataFinish, setIsDataFinish] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isEndReached, setIsEndReached] = useState(false);
  const profile = useSelector((state: any) => state.currentUser.profile);
  const jwtToken = useSelector((state: any) => state.currentUser.jwtToken);
  
  const postData = useSelector(
    (state: any) => state.communityPostList.MyPosts,
  );

  const dispatch = useDispatch();

  const fetchMyPosts = useCallback(
    (form: any, callback: any) => {
        GETUserCommunityPosts(jwtToken, profile.id, form).then((response: any) => {
        callback(response);
      });
    },
    [jwtToken, profile, route],
  );

  const onRefresh = useCallback(() => {
    console.log('refresh');
    const form = {
      type: 'All',
      limit: limit,
      offset: 0,
      order: order
    };
    setIsRefreshing(true);
    fetchMyPosts(form, (response: any) => {
      setIsDataFinish(false);
      const form = {
        type: 'My',
        posts: response,
      };

      dispatch(allActions.communityActions.setPosts(form));

      setIsRefreshing(false);
    });
  }, [order]);

  const onEndReached = useCallback(
    (info: any) => {
      if (!isEndReached && !isDataFinish) {
        setIsEndReached(true);
        const pageIndex = Math.floor(postData.length / 10) + 1;

        const form = {
          type: 'All',
          limit: limit,
          offset: pageIndex * limit,
          order: order
        };
        fetchMyPosts(form, (response: any) => {
          if (response.length === 0) {
            setIsDataFinish(true);
            setIsEndReached(false);
            return;
          }
          const data = {
            type: 'My',
            posts: [...postData, ...response],
          };
          dispatch(allActions.communityActions.setPosts(data));
          setIsEndReached(false);
        });
      }
    },
    [isEndReached, postData, order],
  );

  const moveToCommunityDetail = useCallback(
    (postId: number, postType: string) => {
      navigation.navigate('CommunityStackScreen', {
        screen: 'CommunityDetailScreen',
        params: {
          id: postId,
          type: 'Liked',
        },
      });
    },
    [],
  );

  const moveToAnotherProfile = useCallback(
    (userId: string, nickname: string, profileImageUri: string, img_thumbNail: string) => {
      navigation.navigate('AnotherProfileStackScreen', {
        targetUser: {
          userId,
          nickname,
          profileImageUri,
          img_thumbNail,
        },
      });
    },
    [],
  );

  const toggleSocialLike = useCallback(
    (postId: number, prevState: number, type: string) => {
      const toggleLikeForm = {
        type,
        id: postId,
      };
      dispatch(allActions.communityActions.toggleLike(toggleLikeForm));
      if (prevState) {
        // true
        DELETESocialLike(jwtToken, String(postId)).then((response: any) => {
          if (response.statusText === 'OK') {
          }
        });
      } else {
        POSTSocialLike(jwtToken, String(postId)).then((response: any) => {
          if (response.statusText === 'OK') {
          }
        });
      }
    },
    [jwtToken],
  );

  const toggleSocialScrap = useCallback(
    (postId: number, prevState: number, type: string) => {
      const form = {
        type,
        id: postId,
      };
      dispatch(allActions.communityActions.toggleScrap(form));
      if (prevState) {
        // true
        DELETESocialScrap(jwtToken, String(postId)).then((response: any) => {
          if (response.statusText === 'OK') {
          }
        });
      } else {
        POSTSocialScrap(jwtToken, String(postId)).then((response: any) => {
          if (response.statusText === 'OK') {
          }
        });
      }
    },
    [],
  );

  const moveToKeywordSearch = useCallback((
    {
      query,
      category,
    }
  ) => {
    navigation.navigate('TotalKeywordSearchStackScreen', {
      screen: 'TotalKeywordSearchScreen',
      params: {
        redirected: true,
        redirectionBody: {
          query,
          category,
        }
      }
    })
  }, []);

  useEffect(() => {
    const form = {
      type: 'All',
      limit,
      offset: 0,
      order: order
    };
    fetchMyPosts(form, (response: any) => {
      const form = {
        type: 'My',
        posts: response,
      };

      console.log('liked post diff');
      LayoutAnimation.configureNext(
        LayoutAnimation.create(300, 'easeInEaseOut', 'opacity'),
      );
      setIsInitializing(false);
      dispatch(allActions.communityActions.setPosts(form));
    });

    return function cleanup() {
      const form = {
        type: 'All',
        limit,
        offset: 0,
        order: order
      };
      fetchMyPosts(form, (response: any) => {
        const form = {
          type: 'My',
          posts: response,
        };
        dispatch(allActions.communityActions.setPosts(form));
      });
    };
  }, []);

  const renderHeaderComponent = useCallback(
    () =>
      postData.length === 0 ? (
        <EmptyContainerView>
          <EmptyContentImage
            source={require('~/Assets/Images/Comment/ic_noComment.png')}
          />
          <EmptyContentText>{'작성한 수다글이 없습니다.'}</EmptyContentText>
        </EmptyContainerView>
      ) : null,
    [postData],
  );

  return (
    <ContainerView>
      
        <CommunityPostList
        initialize={isInitializing}
          postData={postData}
          isEndReached={isEndReached}
          refreshing={isRefreshing}
          onEndReached={onEndReached}
          onRefresh={onRefresh}
          moveToAnotherProfile={moveToAnotherProfile}
          moveToCommunityDetail={moveToCommunityDetail}
          moveToKeywordSearch={moveToKeywordSearch}
          toggleSocialLike={toggleSocialLike}
          toggleSocialScrap={toggleSocialScrap}
          renderHeaderComponent={renderHeaderComponent}
        />
    </ContainerView>
  );
};

export default MyCommunityPostScreen;
