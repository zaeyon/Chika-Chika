import React, {useState, useEffect, useCallback} from 'react';
import Styled from 'styled-components/native';
import {LayoutAnimation} from 'react-native';
//Local Component

// Redux
import {useSelector, useDispatch} from 'react-redux';
import allActions from '~/actions';
// Method
// Routes
import GETUserLikedPosts from '~/Routes/User/GETUserLikedPosts';
import POSTSocialLike from '~/Routes/Community/social/POSTSocialLike';
import DELETESocialLike from '~/Routes/Community/social/DELETESocialLike';
import CommunityPostList from '~/Components/Presentational/CommunityPostList';

const ContainerView = Styled.View`
         flex: 1;
         background-color: #FFFFFF;
        `;
interface Props {
  navigation: any;
  route: any;
}

const LikedCommunityPostScreen = ({navigation, route}: Props) => {
  const limit = 10;
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [isEndReached, setIsEndReached] = useState(false);

  const currentUser = useSelector((state: any) => state.currentUser);
  const jwtToken = currentUser.jwtToken;

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
      const form = {
        type: 'Community',
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
      setPageIndex(0);
      setIsRefreshing(false);
    });
  }, []);

  const onEndReached = useCallback(
    (info: any) => {
      if (!isEndReached && postData.length > 9) {
        setIsEndReached(true);
        const newPageIndex = pageIndex + 1;

        const form = {
          type: 'community',
          limit: limit,
          offset: newPageIndex * limit,
        };
        setPageIndex((prev: any) => prev + 1);
        fetchLikedPosts(form, (response: any) => {
          const data = {
            type: 'Community',
            posts: [...postData, ...response],
          };
          dispatch(allActions.communityActions.setPosts(data));
          setIsEndReached(false);
        });
      }
    },
    [isEndReached, pageIndex, postData],
  );

  const moveToCommunityDetail = useCallback(
    (postId: number, postType: string) => {
      navigation.navigate('CommunityDetailScreen', {
        id: postId,
        type: postType,
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

  const toggleSocialScrap = useCallback(() => {}, []);

  useEffect(() => {
    const form = {
      type: 'community',
      limit,
      offset: 0,
    };
    fetchLikedPosts(form, (response: any) => {
      const form = {
        type: 'Community',
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
      fetchLikedPosts(form, (response: any) => {
        const form = {
          type: 'Community',
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

export default LikedCommunityPostScreen;
