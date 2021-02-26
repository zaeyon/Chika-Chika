import React, {useCallback, useEffect, useRef, useState} from 'react';
import Styled from 'styled-components/native';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  Platform,
  UIManager,
  Animated,
  LayoutAnimation,
  RefreshControl,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import ActionSheet from 'react-native-actionsheet';
// Local Components
import PreviewCommentList from '~/Components/Presentational/PreviewCommentList';
import PostContent from '~/Components/Presentational/CommunityPostDetailScreen/PostContent';
import PostBottomBar from '~/Components/Presentational/CommunityPostDetailScreen/PostBottomBar';
import NavigationHeader from '~/Components/Presentational/NavigationHeader';
// fetch
import GETCommunityPostDetail from '~/Routes/Community/postDetail/GETCommunityPostDetail';
import GETCommunityPostComments from '~/Routes/Community/postDetail/GETCommunityPostComments';
import POSTCommunityPostComment from '~/Routes/Community/postDetail/POSTCommunityPostComment';
import DELETECommunityPost from '~/Routes/Community/deletePost/DELETECommunityPost';
import POSTSocialLike from '~/Routes/Community/social/POSTSocialLike';
import DELETESocialLike from '~/Routes/Community/social/DELETESocialLike';
import POSTSocialScrap from '~/Routes/Community/social/POSTSocialScrap';
import DELETESocialScrap from '~/Routes/Community/social/DELETESocialScrap';
// redux
import {useSelector, useDispatch} from 'react-redux';
import allActions from '~/actions';

const ContainerView = Styled.SafeAreaView`
 flex: 1;
 background-color: white;
 align-items: center;
 justify-content: center;
`;

const BodyContainerScrollView = Styled.ScrollView`
flex: 1;
`;

const ActivityIndicatorContianerView = Styled.View`
width: 100%;
height: 50px;
align-items: center;
justify-content: center;
`;

const BackdropView = Styled.View`
width: ${wp('100%')}px;
height: ${hp('100%')}px;
position: absolute;
background: transparent;
z-index: 11;
`;
const FloatingView = Styled.View`
width: 114px;
height: auto;
position: absolute;
top: ${getStatusBarHeight() + 45}px;
right: 16px;
background: #FFFFFF;
border-width: 1px;
border-color: #E2E6ED;
box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);
border-radius: 12px;
`;

const FloatingContentView = Styled.View`
padding: 12px 16px;
width: 114px;
`;

const FloatingContentText = Styled.Text`
font-style: normal;
font-weight: normal;
font-size: 16px;
line-height: 24px;
color: #000000;
`;

const VerticalPartitionView = Styled.View`
width: 100%;
height: 1px;
background: #E2E6ED;
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
  key: any;
}

const CommunityDetailScreen = ({navigation, route, key}: Props) => {
  const scrollView: any = useRef();
  const scrollY: Animated.Value = useRef(new Animated.Value(0)).current;

  const commentState = useSelector((state: any) => state.commentList);
  const commentArray = commentState.commentList;
  const commentCount = commentState.commentCount;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState(false);
  const [floatingVisible, setFloatingVisible] = useState(false);

  const jwtToken = useSelector((state: any) => state.currentUser.jwtToken);
  const profile = useSelector((state: any) => state.currentUser.profile);

  const postList = useSelector((state: any) => {
    if (route.params.type === 'Question') {
      console.log('Q');
      return state.communityPostList.QuestionPosts;
    } else if (route.params.type === 'FreeTalk') {
      console.log('F');
      return state.communityPostList.FreeTalkPosts;
    } else if (route.params.type === 'MyPosts') {
      console.log('My');
      return state.communityPostList.MyPosts;
    } else if (route.params.type === 'Liked') {
      console.log('Liked');
      return state.communityPostList.LikedCommunityPosts;
    } else if (route.params.type === 'Scraped') {
      console.log('Scraped');
      return state.communityPostList.ScrapedCommunityPosts;
    } else if (route.params.type === 'Commented') {
      console.log('Commented');
      return state.communityPostList.CommentedCommunityPosts;
    } else if (route.params.type === 'Notification') {
      return [];
    }
  });
  const [postData, setPostData] = useState(
    postList?.find((item: any) => item.id === route.params.id),
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const newPostData = postList?.find(
      (item: any) => item.id === route.params.id,
    );
    if (newPostData) {
      console.log('hi');
      setPostData(newPostData);
    }
  }, [postList]);

  useEffect(() => {
    GETCommunityPostDetail(jwtToken, String(route.params.id)).then(
      (response: any) => {
        setPostData(response);
      },
    );

    fetchPostComments(route.params.id);
    if (
      route.params?.type === 'Notification' &&
      route.params?.category === 'comment'
    ) {
      navigation.navigate('CommentListScreen', {
        postId: route.params.id,
        postType: 'community',
        commentActionType: 'comment',
        commentId: route.params?.commentId,
        isLoading,
      });
    }
    return function cleanup() {
      dispatch(allActions.commentListActions.setCommentCount(0));
      dispatch(allActions.commentListActions.setCommentList([]));
    };
  }, []);

  const onPressAccuse = useCallback(() => {
    navigation.navigate('AccuseScreen', {
      targetType: 'community',
      targetId: route.params.id,
    });
  }, [route]);

  const renderFloatingView = useCallback(
    () => (
      <TouchableWithoutFeedback onPress={() => setFloatingVisible(false)}>
        <BackdropView>
          <FloatingView>
            {postData.userId === profile.id ? (
              <>
                <TouchableOpacity
                  onPress={() => {
                    setFloatingVisible(false);
                    onPressDeletePost();
                  }}>
                  <FloatingContentView>
                    <FloatingContentText>{'삭제'}</FloatingContentText>
                  </FloatingContentView>
                </TouchableOpacity>
                <VerticalPartitionView />
                <TouchableOpacity
                  onPress={() => {
                    setFloatingVisible(false);
                    onPressEditPost();
                  }}>
                  <FloatingContentView>
                    <FloatingContentText>{'수정'}</FloatingContentText>
                  </FloatingContentView>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setFloatingVisible(false);
                  onPressAccuse();
                }}>
                <FloatingContentView>
                  <FloatingContentText>{'신고'}</FloatingContentText>
                </FloatingContentView>
              </TouchableOpacity>
            )}
            <VerticalPartitionView />
            <TouchableOpacity onPress={() => console.log('share')}>
              <FloatingContentView>
                <FloatingContentText>{'공유'}</FloatingContentText>
              </FloatingContentView>
            </TouchableOpacity>
          </FloatingView>
        </BackdropView>
      </TouchableWithoutFeedback>
    ),
    [],
  );
  const toggleKeyboardAnimation = useCallback(
    (height: Number) => {
      scrollView &&
        scrollView.current.scrollTo({
          y: (scrollY as any)._value + height,
        });
    },
    [scrollView, scrollY],
  );

  // const uploadComment = useCallback(
  //   (comment: string) => {
  //     POSTCommunityPostComment(jwtToken, postData.id, comment)
  //       .then((response: any) => {
  //         console.log('Created!');
  //         const form = {
  //           type: postData.type,
  //           id: postData.id,
  //         };
  //         dispatch(allActions.communityActions.createComment(form));
  //         setComments(response.comments);
  //       })
  //       .catch((e) => {
  //         console.log(e.body.message);
  //       });
  //   },
  //   [jwtToken, postData],
  // );

  const fetchPostComments = useCallback(
    (postId: string) => {
      console.log('fetch comments', postId);
      GETCommunityPostComments(jwtToken, postId).then((response: any) => {
        setIsLoading(false);
        console.log(response);
        dispatch(
          allActions.commentListActions.setCommentCount(response.commentsNum),
        );
        dispatch(
          allActions.commentListActions.setCommentList(response.comments),
        );
      });
    },
    [jwtToken],
  );

  const onPressEditPost = useCallback(() => {
    navigation.navigate('CommunityPostUploadStackScreen', {
      data: {
        id: postData.id,
        description: deorderDescription(postData.description),
        type: deorderType(postData.type),
        routeType: route.params.type,
      },
    });
  }, [postData]);

  const onPressDeletePost = useCallback(() => {
    Alert.alert('게시글 삭제', '수다방 글을 삭제하시겠습니까?', [
      {
        text: '취소',
        onPress: () => console.log('cancled delete post'),
        style: 'cancel',
      },
      {
        text: '확인',
        onPress: () =>
          DELETECommunityPost(jwtToken, postData.id).then((response) => {
            console.log(response);
            navigation.goBack();
            LayoutAnimation.configureNext(
              LayoutAnimation.create(300, 'easeInEaseOut', 'opacity'),
            );
            dispatch(allActions.communityActions.deletePost(postData.id));
          }),
      },
    ]);
  }, [jwtToken, postData]);

  const deorderDescription = useCallback((oldDescription: string) => {
    const newDescription = oldDescription
      .replace(/{{/gi, '#')
      .replace(/}}/gi, '');
    return newDescription;
  }, []);

  const deorderType = useCallback((oldCategory: string) => {
    if (oldCategory === 'Question') {
      return '질문방';
    } else if (oldCategory === 'FreeTalk') {
      return '수다방';
    }
  }, []);

  const moveToAnotherProfile = useCallback(
    (userId: string, nickname: string, profileImageUri: string) => {
      navigation.navigate('AnotherProfileStackScreen', {
        targetUser: {
          userId,
          nickname,
          profileImageUri,
        },
      });
    },
    [],
  );

  const moveToImageDetail = useCallback((mediaFiles: any, imageUri: string) => {
    console.log(mediaFiles, imageUri);
    let index = mediaFiles.findIndex(
      (image: any) => image.img_url === imageUri,
    );

    let imageUri_arr = mediaFiles.map((image: any) => {
      return image.img_url;
    });
    console.log(mediaFiles);
    console.log('선택한 사진의 mediaFiles index', index);

    navigation.navigate('ImageDetailScreen', {
      imageArray: mediaFiles,
      imageIndex: index,
    });
  }, []);

  const moveToCommentList = useCallback(() => {
    navigation.navigate('CommentListScreen', {
      postId: postData.id,
      postType: 'community',
    });
  }, [postData]);

  const toggleSocialLike = useCallback(
    (postId: number, prevState: number, type: string) => {
      const form = {
        type,
        id: postId,
      };
      dispatch(allActions.communityActions.toggleLike(form));
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
    [],
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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPostComments(String(postData.id));
    GETCommunityPostDetail(jwtToken, String(postData.id)).then(
      (response: any) => {
        console.log(response);
        setRefreshing(false);
        const form = {
          id: postData.id,
          data: response,
        };
        dispatch(allActions.communityActions.editPost(form));
      },
    );
  }, [postData]);

  const formatCategory = useCallback(() => {
    switch (postData?.type) {
      case 'Question':
        return '질문방';
      case 'FreeTalk':
        return '수다방';
    }
  }, [postData]);

  if (postData) {
    return (
      <ContainerView>
        {floatingVisible ? renderFloatingView() : null}
        <NavigationHeader
          headerLeftProps={{
            type: 'arrow',
            text: formatCategory(),
            onPress: () => navigation.goBack(),
          }}
          headerRightProps={{
            type: 'viewMore',
            onPress: () => setFloatingVisible((prev) => !prev),
          }}
        />
        <BodyContainerScrollView
          showsVerticalScrollIndicator={false}
          ref={scrollView}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    y: scrollY,
                  },
                },
              },
            ],
            {useNativeDriver: false},
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <PostContent
            moveToAnotherProfile={moveToAnotherProfile}
            moveToImageDetail={moveToImageDetail}
            data={postData}
          />

          {isLoading ? (
            <ActivityIndicatorContianerView>
              <ActivityIndicator size="small" />
            </ActivityIndicatorContianerView>
          ) : (
            // <PostCommentList commentList={comments} />
            <PreviewCommentList
              commentList={commentArray}
              commentCount={commentCount}
              profile={profile}
              navigation={navigation}
              postId={postData.id}
              postType="community"
            />
          )}
        </BodyContainerScrollView>
        <PostBottomBar
          moveToCommentList={moveToCommentList}
          toggleSocialLike={toggleSocialLike}
          toggleSocialScrap={toggleSocialScrap}
          commentCount={commentCount}
          data={postData}
        />
      </ContainerView>
    );
  } else {
    return (
      <ContainerView>
        <ActivityIndicator />
      </ContainerView>
    );
  }
};

export default CommunityDetailScreen;
