import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  createRef,
  useCallback,
} from 'react';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  FlatList,
  ActivityIndicator,
  Platform,
  UIManager,
  LayoutAnimation,
  Animated,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';
import {useIsFocused} from '@react-navigation/native';
import ActionSheet from 'react-native-actionsheet';
import allActions from '~/actions';

// local component
import NavigationHeader from '~/Components/Presentational/NavigationHeader';
import CommentPostBottomBar from '~/Components/Presentational/CommentListScreen/CommentPostBottomBar';
import CommentItem from '~/Components/Presentational/CommentItem';
import ReplyItem from '~/Components/Presentational/ReplyItem';
import TouchBlockIndicatorCover from '~/Components/Presentational/TouchBlockIndicatorCover';
import AnimatedModal from '~/Components/Presentational/AnimatedModal';

// route
import POSTComment from '~/Routes/Comment/POSTComment';
import POSTReply from '~/Routes/Comment/POSTReply';
import DELETEComment from '~/Routes/Comment/DELETEComment';
import GETCommentList from '~/Routes/Comment/GETCommentList';

const Container = Styled.SafeAreaView`
flex: 1;
background-color: #ffffff;
`;

const CommentListContainer = Styled.View`
flex: 1;
background-color: #ffffff;
`;

const BottomBarContainer = Styled.View`
background-color: #ffffff;
position: absolute;
bottom: 0;
width: ${wp('100%')}px;
`;

const CommentFlatList = Styled.FlatList`
flex: 1;
margin-bottom: ${hp('100%') * 0.08}px;
`;
const CommentItemContainer = Styled.View`
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
  const [loadingCommentPost, setLoadingCommentPost] = useState<boolean>(false);
  //const [commentArray, setCommentArray] = useState<Array<any>>(route.params?.commentArray);
  const [
    isVisibleCommentDeleteModal,
    setIsVisibleCommentDeleteModal,
  ] = useState<boolean>(false);
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

  const currentUser = useSelector((state: any) => state.currentUser);
  const jwtToken = currentUser.jwtToken;
  const userProfile = currentUser.profile;
  const postId = route.params?.postId;
  const postType = route.params?.postType;

  const commentState = useSelector((state: any) => state.commentList);
  const commentArray = commentState.commentList;
  const commentCount = commentState.commentCount;

  const commentFlatListRef = useRef<any>();
  const commentInputRef = useRef<any>();
  const ownCommentActionSheetRef = createRef<any>();
  const otherCommentActionSheetRef = createRef<any>();

  const replyTargetNickname = useRef<string>();
  const noCommentYAnim = useRef(new Animated.Value(0)).current;
  const scrollY: Animated.Value = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (route.params?.commentActionType === 'reply') {
      setCommentActionType('reply');
      setReplyTargetInfo({
        targetUserNickname: route.params?.targetUserNickname,
        commentId: route.params?.commentObj.id,
      });
      commentInputRef.current.focus();
      commentFlatListRef.current.scrollToOffset({
        offset: route.params?.positionY - 720,
      });
    }
  }, [route.params]);

  const clickReply = useCallback(
    (commentObj: any, nickname: string, positionY: number) => {
      setCommentActionType('reply');
      setReplyTargetInfo({
        targetUserNickname: nickname,
        commentId: commentObj.id,
      });
      console.log('positionY', positionY);
      commentInputRef.current.focus();
      commentFlatListRef.current.scrollToOffset({
        offset: positionY - 320,
      });
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

  const cancelReplyInput = () => {
    setCommentActionType('comment');
  };

  const goBack = () => {
    navigation.goBack();
  };

  const openCommentActionSheet = (
    userId: string,
    nickname: string,
    commentId: number,
  ) => {
    setSelectedCommentId(commentId);

    if (userId === userProfile.id) {
      ownCommentActionSheetRef.current.show();
    } else {
      otherCommentActionSheetRef.current.show();
    }
  };

  const onRefreshCommentFlat = useCallback(() => {
    setRefreshing(true);
    GETCommentList({jwtToken, type: postType, id: postId})
      .then((response: any) => {
        console.log('GETCommentList response', response);
        setRefreshing(false);
        //setCommentArray(response.reverse())
        dispatch(
          allActions.commentListActions.setCommentList(
            response.comments.reverse(),
          ),
        );
        dispatch(
          allActions.commentListActions.setCommentCount(
            response.commentsNum.commentsNum,
          ),
        );
      })
      .catch((error) => {
        console.log('GETCommentList error', error);
        setRefreshing(false);
      });
  }, [postType, postId]);

  const refreshCommentList = useCallback(() => {
    GETCommentList({jwtToken, type: postType, id: postId})
      .then((response: any) => {
        console.log('GETCommentList response', response);
        //setCommentArray(response.reverse())
        dispatch(
          allActions.commentListActions.setCommentList(
            response.comments.reverse(),
          ),
        );
        dispatch(
          allActions.commentListActions.setCommentCount(
            response.commentsNum.commentsNum,
          ),
        );
      })
      .catch((error) => {
        console.log('GETCommentList error', error);
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
            allActions.commentListActions.setCommentList(
              response.comments.reverse(),
            ),
          );
          dispatch(
            allActions.commentListActions.setCommentCount(
              response.commentsNum.commentsNum,
            ),
          );
          //setChangeCommentArray(!changeCommentArray);

          setTimeout(() => {
            commentFlatListRef.current.scrollToEnd();
          }, 10);
        })
        .catch((error) => {
          console.log('POSTReviewComment error', error);
          setLoadingCommentPost(false);
        });
      /*
    if(commentActionType === 'comment') {
        POSTComment({jwtToken, id, type, description})
          .then((response: any) => {
            console.log('POSTReviewComment response', response);
            setLoadingCommentPost(false);
            //etCommentArray(response.reverse());
            dispatch(allActions.commentListActions.setCommentList(response.comments.reverse()));
            dispatch(allActions.commentListActions.setCommentCount(response.commentsNum.commentsNum));
            //setChangeCommentArray(!changeCommentArray);
            
            setTimeout(() => {
                commentFlatListRef.current.scrollToEnd();
            }, 10)
          })
          .catch((error) => {
            console.log('POSTReviewComment error', error);
            setLoadingCommentPost(false);
          });
    } else if(commentActionType === 'reply') {
        const commentId = replyTargetId;
        
        POSTReply({jwtToken, commentId, type, description})
        .then((response: any) => {
            console.log("POSTReply response", response);
            setLoadingCommentPost(false);
            //setCommentArray(response.reverse());
            dispatch(allActions.commentListActions.setCommentList(response.reverse()));
            setChangeCommentArray(!changeCommentArray);
            setCommentActionType("comment")
            isClickReply = false;
        })
        .catch((error) => {
            console.log("POSTReply error", error);
            setLoadingCommentPost(false);
        })
    }
    */
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
            allActions.commentListActions.setCommentList(
              response.comments.reverse(),
            ),
          );
          dispatch(
            allActions.commentListActions.setCommentCount(
              response.commentsNum.commentsNum,
            ),
          );
          //setChangeCommentArray(!changeCommentArray);

          setTimeout(() => {
            commentFlatListRef.current.scrollToEnd();
          }, 10);
        })
        .catch((error) => {
          console.log('POSTReviewComment error', error);
          setLoadingCommentPost(false);
        });
    },
    [jwtToken, postType, postId, replyTargetInfo, commentFlatListRef],
  );

  const onPressOwnCommentActionSheet = (index: number) => {
    if (index === 1) {
      setIsVisibleCommentDeleteModal(true);
    }
  };

  const onPressOtherCommentActionSheet = (index: number) => {
    if (index === 1) {
    }
  };

  const clickBackground = () => {
    Keyboard.dismiss();
  };

  const deleteReviewComment = useCallback(() => {
    DELETEComment({
      jwtToken,
      commentId: selectedCommentId,
      type: postType,
      id: postId,
    })
      .then((response: any) => {
        console.log('DELETEComment response', response);
        dispatch(
          allActions.commentListActions.setCommentList(
            response.comments.reverse(),
          ),
        );
        dispatch(
          allActions.commentListActions.setCommentCount(
            response.commentsNum.commentsNum,
          ),
        );
      })
      .catch((error) => {
        console.log('DELETEComment error', error);
      });
  }, [postId, postType, selectedCommentId]);

  const toggleKeyboardAnimation = useCallback(
    (height: Number) => {
      // commentFlatListRef.current &&
      //   commentFlatListRef.current.scrollToOffset({
      //     offset: (scrollY as any)._value + height,
      //   });
    },
    [commentFlatListRef, scrollY],
  );

  const renderCommentItem = useCallback(({item, index}: any) => {
    return (
      <CommentItemContainer>
        <CommentItem
          commentObj={item}
          isVisibleReplyButton={true}
          clickReply={clickReply}
          userId={item.user?.id}
          commentId={item.id}
          profileImage={item.user?.profileImg}
          nickname={item.user?.nickname}
          description={item.description}
          createdDate={item.createdAt}
          replys={item.Replys}
          openCommentActionSheet={openCommentActionSheet}
          moveToAnotherProfile={moveToAnotherProfile}
        />
        {item.Replys &&
          item.Replys.map((replyItem: any, index: number) =>
            renderReplyItem(replyItem, index, item),
          )}
      </CommentItemContainer>
    );
  }, []);

  const renderReplyItem = useCallback(
    (item: any, index: number, commentItem: any) => {
      return (
        <ReplyItem
          key={String(index)}
          replyObj={item}
          clickReply={clickReply}
          commentObj={commentItem}
          isVisibleReplyButton={true}
          userId={item.user.id}
          commentId={item.id}
          profileImage={item.user.profileImg}
          nickname={item.user.nickname}
          description={item.description}
          createdDate={item.createdAt}
          replys={item.Replys}
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
      {commentArray.length > 0 && (
        <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
          <CommentFlatList
            refreshing={refreshing}
            onRefresh={onRefreshCommentFlat}
            ref={commentFlatListRef}
            showsVerticalScrollIndicator={false}
            data={commentArray}
            renderItem={renderCommentItem}
            keyExtractor={(item: any, index: number) => String(index)}
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
          />
        </KeyboardAvoidingView>
      )}
      {commentArray.length === 0 && (
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
      )}
      <CommentPostBottomBar
        commentInputRef={commentInputRef}
        commentActionType={commentActionType}
        postComment={postComment}
        postReply={postReply}
        targetUserNickname={replyTargetInfo.targetUserNickname}
      />
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
      <AnimatedModal
        visible={isVisibleCommentDeleteModal}
        buttons={[
          {
            title: '취소',
            onPress: () => setIsVisibleCommentDeleteModal(false),
          },
          {
            title: '삭제',
            onPress: () => {
              setIsVisibleCommentDeleteModal(false);
              deleteReviewComment();
            },
          },
        ]}>
        <ModalContentText>
          {'삭제되면 복구가 불가능합니다.\n정말 삭제하시겠습니까?'}
        </ModalContentText>
      </AnimatedModal>
    </Container>
  );
};

export default CommentListScreen;
