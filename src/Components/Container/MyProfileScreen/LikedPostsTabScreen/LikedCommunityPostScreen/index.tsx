import React, {useState, useEffect, useCallback} from 'react';
import Styled from 'styled-components/native';
import {ActivityIndicator, LayoutAnimation} from 'react-native';
//Local Component

// Redux
import {useSelector, useDispatch} from 'react-redux';
import allActions from '~/actions';
// Method
// Routes
import GETUserLikedPosts from '~/Routes/User/GETUserLikedPosts';
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
interface Props {
  navigation: any;
  route: any;
}

const LikedCommunityPostScreen = ({navigation, route}: Props) => {
  const limit = 10;
  const [isInitializing, setIsInitializing] = useState(true);
  const [isDataFinish, setIsDataFinish] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isEndReached, setIsEndReached] = useState(false);

  const jwtToken = useSelector((state: any) => state.currentUser.jwtToken);

  const postData = useSelector(
    (state: any) => state.communityPostList.LikedCommunityPosts,
  );

  const dispatch = useDispatch();

  const fetchLikedPosts = useCallback(
    (form: any, callback: any) => {
      GETUserLikedPosts(jwtToken, form).then((response: any) => {
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
    fetchLikedPosts(form, (response: any) => {
      setIsDataFinish(false);
      const form = {
        type: 'Liked',
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
      if (!isEndReached && !isDataFinish) {
        setIsEndReached(true);
        const pageIndex = Math.floor(postData.length / 10) + 1;

        const form = {
          type: 'community',
          limit: limit,
          offset: pageIndex * limit,
        };
        fetchLikedPosts(form, (response: any) => {
          if (response.length === 0) {
            setIsDataFinish(true);
            setIsEndReached(false);
            return;
          }
          const data = {
            type: 'Liked',
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
          type: 'Liked',
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
    fetchLikedPosts(form, (response: any) => {
      const form = {
        type: 'Liked',
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
        setIsInitializing(false);
        dispatch(allActions.communityActions.setPosts(form));
      }
    });

    return function cleanup() {
      const form = {
        type: 'community',
        limit,
        offset: 0,
      };
      fetchLikedPosts(form, (response: any) => {
        const form = {
          type: 'Liked',
          posts: response,
        };
        dispatch(allActions.communityActions.setPosts(form));
      });
    };
  }, []);

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
        />
      )}
    </ContainerView>
  );
};

export default LikedCommunityPostScreen;
