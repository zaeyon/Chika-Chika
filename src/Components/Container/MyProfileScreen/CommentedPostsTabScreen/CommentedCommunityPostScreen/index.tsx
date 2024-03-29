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
import GETUserCommentedPosts from '~/Routes/User/GETUserCommentedPosts';
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

const CommentedCommunityPostScreen = ({navigation, route}: Props) => {
  const limit = 10;
  const [isInitializing, setIsInitializing] = useState(true);
  const [isDataFinish, setIsDataFinish] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isEndReached, setIsEndReached] = useState(false);

  const jwtToken = useSelector((state: any) => state.currentUser.jwtToken);

  const postData = useSelector(
    (state: any) => state.communityPostList.CommentedCommunityPosts,
  );

  const dispatch = useDispatch();

  const fetchCommentedPosts = useCallback(
    (form: any, callback: any) => {
      GETUserCommentedPosts(jwtToken, form).then((response: any) => {
        callback(response);
      });
    },
    [jwtToken],
  );

  const onRefresh = useCallback(() => {
    console.log('refresh');
    const form = {
      type: 'community',
      limit: limit,
      offset: 0,
    };
    setIsRefreshing(true);
    fetchCommentedPosts(form, (response: any) => {
      setIsDataFinish(false);
      const form = {
        type: 'Commented',
        posts: response,
      };
      // if (
      //   JSON.stringify(response).replace(
      //     /"createdDiff\(second\)\"\:\d*\,/gi,
      //     '',
      //   ) !==
      //   JSON.stringify(postData).replace(
      //     /"createdDiff\(second\)\"\:\d*\,/gi,
      //     '',
      //   )
      // ) {
      console.log('liked post diff');

      dispatch(allActions.communityActions.setPosts(form));
      // }
      setIsRefreshing(false);
    });
  }, []);

  const onEndReached = useCallback(
    (info: any) => {
      if (!isEndReached && !isDataFinish) {
        setIsEndReached(true);
        const pageIndex = Math.floor(postData.length / 10) + 1;

        const form = {
          type: 'community',
          limit: limit,
          offset: pageIndex * limit,
        };
        fetchCommentedPosts(form, (response: any) => {
          if (response.length === 0) {
            setIsDataFinish(true);
            setIsEndReached(false);
            return;
          }
          const data = {
            type: 'Commented',
            posts: [...postData, ...response],
          };
          dispatch(allActions.communityActions.setPosts(data));
          setIsEndReached(false);
        });
      }
    },
    [isEndReached, postData],
  );

  const moveToCommunityDetail = useCallback(
    (postId: number, postType: string) => {
      navigation.navigate('CommunityStackScreen', {
        screen: 'CommunityDetailScreen',
        params: {
          id: postId,
          type: 'Commented',
        },
      });
    },
    [],
  );

  const moveToAnotherProfile = useCallback(() => {
    navigation.navigate('AnotherProfileScreen');
  }, []);

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

  useEffect(() => {
    const form = {
      type: 'community',
      limit,
      offset: 0,
    };
    fetchCommentedPosts(form, (response: any) => {
      const form = {
        type: 'Commented',
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
        type: 'community',
        limit,
        offset: 0,
      };
      fetchCommentedPosts(form, (response: any) => {
        const form = {
          type: 'Commented',
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
          <EmptyContentText>{'댓글 단 수다글이 없습니다.'}</EmptyContentText>
        </EmptyContainerView>
      ) : null,
    [postData],
  );

  return (
    <ContainerView>
      {isInitializing ? (
        <ActivityIndicator />
      ) : (
        <CommunityPostList
          postData={postData}
          isEndReached={isEndReached}
          refreshing={isRefreshing}
          onEndReached={onEndReached}
          onRefresh={onRefresh}
          moveToAnotherProfile={moveToAnotherProfile}
          moveToCommunityDetail={moveToCommunityDetail}
          toggleSocialLike={toggleSocialLike}
          toggleSocialScrap={toggleSocialScrap}
          renderHeaderComponent={renderHeaderComponent}
        />
      )}
    </ContainerView>
  );
};

export default CommentedCommunityPostScreen;
