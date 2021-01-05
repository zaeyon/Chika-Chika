import React, {useState, useEffect, useCallback} from 'react';
import Styled from 'styled-components/native';
import {LayoutAnimation} from 'react-native';
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
        `;
interface Props {
  navigation: any;
  route: any;
}

const CommentedCommunityPostScreen = ({navigation, route}: Props) => {
  const limit = 10;
  const [isDataFinish, setIsDataFinish] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isEndReached, setIsEndReached] = useState(false);

  const currentUser = useSelector((state: any) => state.currentUser);
  const jwtToken = currentUser.jwtToken;

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
      if (
        JSON.stringify(response).replace(
          /"createdDiff\(second\)\"\:\d*\,/gi,
          '',
        ) !==
        JSON.stringify(postData).replace(
          /"createdDiff\(second\)\"\:\d*\,/gi,
          '',
        )
      ) {
        console.log('liked post diff');
        LayoutAnimation.configureNext(
          LayoutAnimation.create(300, 'easeInEaseOut', 'opacity'),
        );
        dispatch(allActions.communityActions.setPosts(form));
      }
      setIsRefreshing(false);
    });
  }, []);

  const onEndReached = useCallback(
    (info: any) => {
      if (!isEndReached && postData.length > 9) {
        setIsEndReached(true);
        const pageIndex = Math.floor(postData.length / 10);

        const form = {
          type: 'community',
          limit: limit,
          offset: pageIndex * limit,
        };
        fetchCommentedPosts(form, (response: any) => {
          if (response.length === 0) {
            setIsDataFinish(true);
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
      if (
        postData &&
        JSON.stringify(response).replace(
          /"createdDiff\(second\)\"\:\d*\,/gi,
          '',
        ) !==
          JSON.stringify(postData).replace(
            /"createdDiff\(second\)\"\:\d*\,/gi,
            '',
          )
      ) {
        console.log('liked post diff');
        LayoutAnimation.configureNext(
          LayoutAnimation.create(300, 'easeInEaseOut', 'opacity'),
        );
        dispatch(allActions.communityActions.setPosts(form));
      }
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

  return (
    <ContainerView>
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
      />
    </ContainerView>
  );
};

export default CommentedCommunityPostScreen;
