import React, {useCallback, useEffect, useRef, useState} from 'react';
import Styled from 'styled-components/native';
import {
  TouchableWithoutFeedback,
  FlatList,
  KeyboardAvoidingView,
  View,
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
// Local Components
import PostInformation from '~/Components/Presentational/CommunityPostDetailScreen/PostInformation';
import PostContent from '~/Components/Presentational/CommunityPostDetailScreen/PostContent';
import DentistComment from '~/Components/Presentational/CommunityPostDetailScreen/DentistComment';
import PostCommentList from '~/Components/Presentational/CommunityPostDetailScreen/PostCommentList';
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
`;

const BodyContainerScrollView = Styled.ScrollView`
flex: 1;
margin-bottom: ${hp('100%') * 0.08}px;

`;

const ActivityIndicatorContianerView = Styled.View`
width: 100%;
height: 50px;

align-items: center;
justify-content: center;
`;

const FloatingView = Styled.View`
width: 114px;
height: 146px;
position: absolute;
top: ${getStatusBarHeight() + 45}px;
right: 16px;
background: #FFFFFF;
border-width: 1px;
border-color: #E2E6ED;
box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);
border-radius: 12px;
z-index: 11;
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

interface Props {
  navigation: any;
  route: any;
  key: any;
}

const CommunityDetailScreen = ({navigation, route, key}: Props) => {
  const scrollView: any = useRef();
  const scrollY: Animated.Value = useRef(new Animated.Value(0)).current;
  const keyboardHeight: Animated.Value = useRef(new Animated.Value(0)).current;
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [formattedDescription, setFormattedDescription] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const currentUser = useSelector((state: any) => state.currentUser);
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
    }
  });
  const [postData, setPostData] = useState(
    postList.find((item: any) => item.id === route.params.id),
  );

  const jwtToken = currentUser.jwtToken;

  const dispatch = useDispatch();

  useEffect(() => {
    const newPostData = postList.find(
      (item: any) => item.id === route.params.id,
    );
    if (newPostData) {
      console.log('hi');
      setPostData(newPostData);
    } else {
      GETCommunityPostDetail(jwtToken, String(route.params.id)).then(
        (response: any) => {
          console.log(response);
        },
      );
    }
  }, [postList]);

  useEffect(() => {
    GETCommunityPostDetail(jwtToken, String(route.params.id)).then(
      (response: any) => {
        setPostData((prev) => {
          if (!prev) {
            return response;
          } else {
            return prev;
          }
        });
      },
    );
    fetchPostComments(route.params.id);
  }, []);

  const renderFloatingView = useCallback(
    () => (
      <FloatingView>
        <TouchableWithoutFeedback onPress={() => onPressDeletePost()}>
          <FloatingContentView>
            <FloatingContentText>{'삭제'}</FloatingContentText>
          </FloatingContentView>
        </TouchableWithoutFeedback>
        <VerticalPartitionView />
        <TouchableWithoutFeedback onPress={() => console.log('report')}>
          <FloatingContentView>
            <FloatingContentText>{'신고'}</FloatingContentText>
          </FloatingContentView>
        </TouchableWithoutFeedback>
        <VerticalPartitionView />
        <TouchableWithoutFeedback onPress={() => console.log('share')}>
          <FloatingContentView>
            <FloatingContentText>{'공유'}</FloatingContentText>
          </FloatingContentView>
        </TouchableWithoutFeedback>
      </FloatingView>
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

  const uploadComment = useCallback(
    (comment: string) => {
      POSTCommunityPostComment(jwtToken, postData.id, comment)
        .then((response: any) => {
          console.log('Created!');
          const form = {
            type: postData.type,
            id: postData.id,
          };
          dispatch(allActions.communityActions.createComment(form));
          setComments(response);
        })
        .catch((e) => {
          console.log(e.body.message);
        });
    },
    [jwtToken, postData],
  );

  const fetchPostComments = useCallback(
    (postId: string) => {
      console.log('fetch comments', postId);
      GETCommunityPostComments(jwtToken, postId).then((response: any) => {
        setIsLoading(false);
        setComments(response);
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

  const moveToAnotherProfile = useCallback(() => {
    navigation.navigate('AnotherProfileScreen');
  }, []);

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
  }, []);

  if (postData) {
    return (
      <ContainerView>
        {renderFloatingView()}
        <NavigationHeader
          headerLeftProps={{
            type: 'arrow',
            text: '수다방',
            onPress: () => navigation.goBack(),
          }}
          headerRightProps={{
            type: 'viewMore',
            onPress: () => console.log('s'),
          }}
        />
        <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
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
            ) : // <PostCommentList commentList={comments} />
            null}
          </BodyContainerScrollView>
        </KeyboardAvoidingView>
        <PostBottomBar
          toggleKeyboardAnimation={toggleKeyboardAnimation}
          uploadComment={uploadComment}
          toggleSocialLike={toggleSocialLike}
          toggleSocialScrap={toggleSocialScrap}
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
