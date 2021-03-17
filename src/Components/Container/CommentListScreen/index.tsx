import React, {useState, useRef, useEffect, useCallback} from 'react';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  UIManager,
  Animated,
  ActivityIndicator,
  Alert,
  LayoutAnimation,
} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import ActionSheet from 'react-native-actionsheet';
import allActions from '~/actions';

// local component
import NavigationHeader from '~/Components/Presentational/NavigationHeader';
import CommentPostBottomBar from '~/Components/Presentational/CommentListScreen/CommentPostBottomBar';
import CommentItem from '~/Components/Presentational/CommentItem';
import ReplyItem from '~/Components/Presentational/ReplyItem';
import TouchBlockIndicatorCover from '~/Components/Presentational/TouchBlockIndicatorCover';

// route
import POSTComment from '~/Routes/Comment/POSTComment';
import POSTReply from '~/Routes/Comment/POSTReply';
import DELETEComment from '~/Routes/Comment/DELETEComment';
import GETCommentList from '~/Routes/Comment/GETCommentList';

const Container = Styled.SafeAreaView`
  flex: 1;
  background-color: #ffffff;
  `;

const LoadingContainerView = Styled.View`
flex: 1;
background: #ffffff;
align-items: center;
justify-content: center;
`;
const CommentFlatList = Styled.FlatList`
  flex: 1;
  `;

const NoCommentListContainer = Styled.View`
  flex: 1;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;
  `;

const NoCommentImage = Styled.Image`
  width: ${wp('21.6%')}px;
  height: ${wp('21.6%')}px;
  `;

const NoCommentText = Styled.Text`
  font-weight: 400;
  font-size: 16px;
  color: #9AA2A9;
  line-height: 24px;
  text-align: center;
  `;

const ModalContentText = Styled.Text`
  text-align: center;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #131F3C;
  `;

interface Props {
  navigation: any;
  route: any;
}

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const CommentListScreen = ({navigation, route}: Props) => {
  const [initialScroll, setInitialScroll] = useState(true);
  const [loadingCommentPost, setLoadingCommentPost] = useState<boolean>(false);
  //const [commentArray, setCommentArray] = useState<Array<any>>(route.params?.commentArray);

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [commentActionType, setCommentActionType] = useState<string>(
    route.params?.commentActionType || 'comment',
  );
  const dispatch = useDispatch();
  const [selectedCommentId, setSelectedCommentId] = useState(0);
  const [replyTargetInfo, setReplyTargetInfo] = useState({
    targetUserNickname: '',
    commentId: '',
  });

  const jwtToken = useSelector((state: any) => state.currentUser.jwtToken);
  const userProfile = useSelector((state: any) => state.currentUser.profile);
  const postId = route.params?.postId;
  const postType = route.params?.postType;

  const commentState = useSelector((state: any) => state.commentList);
  const commentArray = commentState.commentList;
  const commentCount = commentState.commentCount;

  const commentFlatListRef = useRef<any>();
  const commentInputRef = useRef<any>();
  const ownCommentActionSheetRef = useRef<any>();
  const otherCommentActionSheetRef = useRef<any>();

  const noCommentYAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (route.params.commentId && commentArray.length > 0) {
      const targetIndex = commentArray.findIndex(
        (item) => item.id == route.params.commentId,
      );
      console.log('target', commentArray, targetIndex, route.params.commentId);
      if (targetIndex > 0) {
        navigation.setParams({commentId: null});
        setTimeout(() => {
          commentFlatListRef?.current?.scrollToIndex({
            index: targetIndex,
          });
        }, 1000);
      }
    }
  }, [commentArray]);

  const clickReply = useCallback(
    (commentObj: any, nickname: string, index: number, relativeY: number) => {
      setCommentActionType('reply');
      setReplyTargetInfo({
        targetUserNickname: nickname,
        commentId: commentObj.id,
      });
      commentInputRef.current.focus();
      setTimeout(() => {
        commentFlatListRef?.current.scrollToIndex({
          index: index,
          viewOffset: -relativeY,
        });
      }, 1000);
    },
    [commentFlatListRef, commentInputRef],
  );

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

  const goBack = useCallback(() => {
    navigation.goBack();
  }, []);

  const openCommentActionSheet = useCallback(
    (userId: string, nickname: string, commentId: number) => {
      setSelectedCommentId(commentId);

      if (userId === userProfile.id) {
        ownCommentActionSheetRef.current.show();
      } else {
        otherCommentActionSheetRef.current.show();
      }
    },
    [userProfile],
  );

  const onRefreshCommentFlat = useCallback(() => {
    setRefreshing(true);
    GETCommentList({jwtToken, type: postType, id: postId})
      .then((response: any) => {
        console.log('GETCommentList response', response);
        setRefreshing(false);
        //setCommentArray(response.reverse())
        dispatch(
          allActions.commentListActions.setCommentList(response.comments),
        );
        dispatch(
          allActions.commentListActions.setCommentCount(response.commentsNum),
        );
      })
      .catch((error) => {
        console.log('GETCommentList error', error);
        setRefreshing(false);
      });
  }, [postType, postId]);

  const postComment = useCallback(
    (description: string) => {
      Keyboard.dismiss();
      setLoadingCommentPost(true);

      POSTComment({jwtToken, id: postId, type: postType, description})
        .then((response: any) => {
          console.log('POSTReviewComment response', response);
          setLoadingCommentPost(false);
          //etCommentArray(response.reverse());
          dispatch(
            allActions.commentListActions.setCommentList(response.comments),
          );
          dispatch(
            allActions.commentListActions.setCommentCount(response.commentsNum),
          );
          //setChangeCommentArray(!changeCommentArray);
        })
        .catch((error) => {
          console.log('POSTReviewComment error', error);
          setLoadingCommentPost(false);
        });
    },
    [postId, postType, commentFlatListRef],
  );

  const postReply = useCallback(
    (description) => {
      Keyboard.dismiss();
      setLoadingCommentPost(true);
      POSTReply({
        jwtToken,
        commentId: replyTargetInfo.commentId,
        postType,
        description,
        targetUserNickname: replyTargetInfo.targetUserNickname,
        postId,
      })
        .then((response: any) => {
          setLoadingCommentPost(false);
          //etCommentArray(response.reverse());
          dispatch(
            allActions.commentListActions.setCommentList(response.comments),
          );
          dispatch(
            allActions.commentListActions.setCommentCount(response.commentsNum),
          );
          setCommentActionType('comment');
          setReplyTargetInfo({
            targetUserNickname: '',
            commentId: '',
          });
          //setChangeCommentArray(!changeCommentArray);
        })
        .catch((error) => {
          console.log('POSTReviewComment error', error);
          setLoadingCommentPost(false);
        });
    },
    [jwtToken, postType, postId, replyTargetInfo, commentFlatListRef],
  );

  

  const onPressOtherCommentActionSheet = useCallback((index: number) => {
    if (index === 1) {
    }
  }, []);

  const clickBackground = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  const onPressOwnCommentActionSheet = useCallback((index: number) => {
    if (index === 1) {
      Alert.alert('선택한 댓글을 삭제하시겠습니까?', '', [
        {
          text: '취소',
          onPress: () => 0,
          style: 'cancel',
        },
        {
          text: '삭제',
          onPress: () => {
            setSelectedCommentId((prev: number) => {
              DELETEComment({jwtToken, commentId: prev, type: postType, id: postId}).then((response: any) => {
                LayoutAnimation.configureNext(
                  LayoutAnimation.create(150, 'easeInEaseOut', 'opacity'),
                );
                dispatch(
                  allActions.commentListActions.setCommentCount(response.commentsNum),
                );
                dispatch(
                  allActions.commentListActions.setCommentList(response.comments),
                );
              })
            })
          },
        },
      ]);
    }
  }, [jwtToken, postType, postId]);

  const onReplyCancel = useCallback(() => {
    setReplyTargetInfo({
      targetUserNickname: '',
      commentId: '',
    });
    setCommentActionType('comment');
  }, []);

  const renderCommentItem = useCallback(({item, index}: any) => {
    return (
      <>
        <CommentItem
          index={index}
          commentObj={item}
          commentId={item.id}
          isVisibleReplyButton={true}
          clickReply={clickReply}
          userId={item.user?.id}
          profileImage={item.user?.profileImg}
          nickname={item.user?.nickname}
          description={item.description}
          createdDate={item.createdAt}
          openCommentActionSheet={openCommentActionSheet}
          moveToAnotherProfile={moveToAnotherProfile}
        />
        {item.Replys &&
          item.Replys.map((replyItem: any) =>
            renderReplyItem(replyItem, index, item),
          )}
      </>
    );
  }, []);

  const renderReplyItem = useCallback(
    (item: any, index: number, commentItem: any) => {
      return (
        <ReplyItem
          index={index}
          key={String(item.id)}
          replyObj={item}
          clickReply={clickReply}
          commentObj={commentItem}
          isVisibleReplyButton={true}
          userId={item.user.id}
          profileImage={item.user.profileImg}
          nickname={item.user.nickname}
          description={item.description}
          createdDate={item.createdAt}
          openCommentActionSheet={openCommentActionSheet}
          moveToAnotherProfile={moveToAnotherProfile}
        />
      );
    },
    [],
  );

  return (
    <Container>
      <NavigationHeader
        headerLeftProps={{type: 'arrow', onPress: goBack}}
        headerTitle={`댓글(${commentCount})`}
      />
      {route.params?.isLoading && commentArray.length === 0 ? (
        <LoadingContainerView>
          <ActivityIndicator />
        </LoadingContainerView>
      ) : (
        <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
          {commentArray.length === 0 && !route.params?.commentId ? (
            <TouchableWithoutFeedback onPress={() => clickBackground()}>
              <NoCommentListContainer>
                <Animated.View
                  style={{
                    backgroundColor: '#ffffff',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingBottom: hp('10%'),
                    transform: [
                      {
                        translateY: noCommentYAnim,
                      },
                    ],
                  }}>
                  <NoCommentImage
                    source={require('~/Assets/Images/Comment/ic_noComment.png')}
                  />
                  <NoCommentText>
                    {'등록된 댓글이 없습니다.\n댓글을 남겨주세요.'}
                  </NoCommentText>
                </Animated.View>
              </NoCommentListContainer>
            </TouchableWithoutFeedback>
          ) : (
            <CommentFlatList
              onLayout={(e) => {
                console.log('list layout', e.nativeEvent.layout);
                if (
                  route.params?.commentActionType === 'reply' &&
                  initialScroll
                ) {
                  console.log('inital scroll');
                  setCommentActionType('reply');
                  setReplyTargetInfo({
                    targetUserNickname: route.params?.targetUserNickname,
                    commentId: route.params?.commentObj.id,
                  });
                  commentInputRef.current.focus();
                  setTimeout(() => {
                    commentFlatListRef?.current.scrollToOffset({
                      offset: route.params?.positionY,
                    });
                  }, 100);
                  setInitialScroll(false);
                }
              }}
              contentContainerStyle={{
                paddingVertical: 12,
              }}
              refreshing={refreshing}
              onRefresh={onRefreshCommentFlat}
              ref={commentFlatListRef}
              showsVerticalScrollIndicator={false}
              data={commentArray}
              keyboardShouldPersistTaps="always"
              renderItem={renderCommentItem}
              keyExtractor={(item: any, index: number) =>
                item.id + String(index)
              }
            />
          )}
          <CommentPostBottomBar
            commentInputRef={commentInputRef}
            commentActionType={commentActionType}
            postComment={postComment}
            postReply={postReply}
            targetUserNickname={replyTargetInfo.targetUserNickname}
            onReplyCancel={onReplyCancel}
          />
        </KeyboardAvoidingView>
      )}
      {loadingCommentPost && (
        <TouchBlockIndicatorCover loading={loadingCommentPost} />
      )}
      <ActionSheet
        ref={ownCommentActionSheetRef}
        options={['닫기', '삭제하기']}
        cancelButtonIndex={0}
        onPress={(index: any) => onPressOwnCommentActionSheet(index)}
      />
      <ActionSheet
        ref={otherCommentActionSheetRef}
        options={['닫기', '신고하기']}
        cancelButtonIndex={0}
        onPress={(index: any) => onPressOtherCommentActionSheet(index)}
      />
    </Container>
  );
};

export default CommentListScreen;
