import React, {useState, useEffect, useRef, useMemo, createRef} from 'react';
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
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';import { useIsFocused } from '@react-navigation/native';
import ActionSheet from 'react-native-actionsheet';
import allActions from '~/actions'; 


// local component
import NavigationHeader from '~/Components/Presentational/NavigationHeader';
import CommentPostBottomBar from '~/Components/Presentational/ReviewCommentListScreen/CommentPostBottomBar';
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
    navigation: any,
    route: any,
}

if(Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

let isClickReply = false;
let replyTargetId: number;
let commentObj: object;

let selectedCommentId: number;

const ReviewCommentListScreen = ({navigation, route}: Props) => {
    const [loadingCommentPost, setLoadingCommentPost] = useState<boolean>(false);
    //const [commentArray, setCommentArray] = useState<Array<any>>(route.params?.commentArray);
    const [changeCommentArray ,setChangeCommentArray] = useState<boolean>(false);
    const [isVisibleCommentDeleteModal, setIsVisibleCommentDeleteModal] = useState<boolean>(false);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [inputType, setInputType] = useState<string>("comment");
    const dispatch = useDispatch();

    const currentUser = useSelector((state: any) => state.currentUser);
    const jwtToken = currentUser.jwtToken;
    const reviewId = route.params?.reviewId;
    const userProfile = currentUser.profile;

    const commentState = useSelector((state: any) => state.commentList);
    const commentArray = commentState.commentList;
    const commentCount = commentState.commentCount;
    

    const commentFlatListRef = useRef<any>();
    const commentInputRef = useRef<any>();
    const ownCommentActionSheetRef = createRef<any>();
    const otherCommentActionSheetRef = createRef<any>();

    const replyTargetNickname = useRef<string>();
    //const inputType = useRef<string>("comment");
    const noCommentYAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if(route.params?.refreshCommentList) {
            refreshCommentList()
            route.params.refreshCommentList = false;
        }
    }, [route.params?.refreshCommentList])

    useEffect(() => {
        console.log("ReviewCommentListScreen route.params?.request", route.params?.request);

        Keyboard.addListener("keyboardWillShow", keyboardWillShow)
        Keyboard.addListener("keyboardWillHide", keyboardWillHide)

        return () => {
            Keyboard.removeListener('keyboardWillShow', keyboardWillShow);
            Keyboard.removeListener('keyboardWillHide', keyboardWillHide);
        }
    }, [])
    
    const cancelReplyInput = () => {
        setInputType("comment");
        isClickReply = false;
    }
    
    const keyboardWillShow = (e: any) => {
        console.log("키보드 열림")
        //commentFlatListRef.current.scrollToEnd();

        if(commentArray.length === 0) {
            Animated.timing(noCommentYAnim, {
                toValue: -(hp('14.778%')),
                duration: 300,
                useNativeDriver: true
            }).start();
        }
    }

    const keyboardWillHide = () => {
       
       if(commentArray.length === 0) {
        Animated.timing(noCommentYAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true
        }).start();
    }
    }
    
    const goBack = () => {
        navigation.goBack();
    }

    const clickReply = (commentObj: any, targetUserNickname: string) => {
        //console.log("clickReply userNickname, id", userNickname, id);
        // setInputType("reply");
        // commentInputRef.current.focus();
        // replyTargetId = id;
        // isClickReply = true;
        // replyTargetNickname.current = userNickname;

        navigation.navigate("ReplyPostScreen", {
            commentObj: commentObj,
            targetUserNickname: targetUserNickname,
            reviewId: reviewId
        });
    }

    const clickReplyOfReply = (commentObj: any, targetUserNickname: string) => {
        navigation.navigate("ReplyPostScreen", {
            commentObj: commentObj,
            targetUserNickname: targetUserNickname,
            reviewId: reviewId,
        })
    }

    
    const openCommentActionSheet = (
        userId: string,
        nickname: string,
        commentId: number,
    ) => {
        selectedCommentId = commentId;

        if (userId === userProfile.id) {
            ownCommentActionSheetRef.current.show();
        } else {
            otherCommentActionSheetRef.current.show();
        }
    };

    const onRefreshCommentFlat = () => {
        setRefreshing(true);
        const id = reviewId;
        const type = 'review'
        GETCommentList({jwtToken, type, id})
        .then((response: any) => {
            console.log("GETCommentList response", response)
            setRefreshing(false)
            //setCommentArray(response.reverse())
        dispatch(allActions.commentListActions.setCommentList(response.comments.reverse()));
        dispatch(allActions.commentListActions.setCommentCount(response.commentsNum.commentsNum));
        })
        .catch((error) => {
            console.log("GETCommentList error", error);
            setRefreshing(false);
        })
    }

    const refreshCommentList = () => {
        const id = reviewId;
        const type = 'review'
        GETCommentList({jwtToken, type, id})
        .then((response: any) => {
            console.log("GETCommentList response", response)
            //setCommentArray(response.reverse())
            dispatch(allActions.commentListActions.setCommentList(response.comments.reverse()));
            dispatch(allActions.commentListActions.setCommentCount(response.commentsNum.commentsNum));
        })
        .catch((error) => {
            console.log("GETCommentList error", error);
        })
    }

    const postReviewComment = (description: string) => {
    Keyboard.dismiss()
    setLoadingCommentPost(true);
    const type = 'review';
    const id = reviewId;

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
    /*
    if(inputType === 'comment') {
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
    } else if(inputType === 'reply') {
        const commentId = replyTargetId;
        
        POSTReply({jwtToken, commentId, type, description})
        .then((response: any) => {
            console.log("POSTReply response", response);
            setLoadingCommentPost(false);
            //setCommentArray(response.reverse());
            dispatch(allActions.commentListActions.setCommentList(response.reverse()));
            setChangeCommentArray(!changeCommentArray);
            setInputType("comment")
            isClickReply = false;
        })
        .catch((error) => {
            console.log("POSTReply error", error);
            setLoadingCommentPost(false);
        })
    }
    */ 
    }

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
  }


  const deleteReviewComment = () => {
    const commentId = selectedCommentId;
    const type = 'review';

    DELETEComment({jwtToken, commentId, type, reviewId})
      .then((response: any) => {
        console.log("DELETEComment response", response);
        dispatch(allActions.commentListActions.setCommentList(response.comments.reverse()));
        dispatch(allActions.commentListActions.setCommentCount(response.commentsNum.commentsNum));   
      })
      .catch((error) => {
        console.log('DELETEComment error', error);
      });
  };


    const renderCommentItem = ({item, index}: any) => {
        commentObj = item

        return (
            <CommentItemContainer>
            <CommentItem
            isVisibleReplyButton={true}
            commentObj={item}
            userId={item.user.id}
            commentId={item.id}
            profileImage={item.user.profileImg}
            nickname={item.user.nickname}
            description={item.description}
            createdDate={item.createdAt}
            replys={item.Replys}
            clickReply={clickReply}
            openCommentActionSheet={openCommentActionSheet}
            />
            {item.Replys[0] && (
                <FlatList
                data={item.Replys}
                renderItem={renderReplyItem}/>
            )}
            </CommentItemContainer>
        )
    }

    const renderReplyItem = ({item, index}: any) => {
        return (
            <ReplyItem
            replyObj={item}
            commentObj={commentObj}
            isVisibleReplyButton={true}
            userId={item.user.id}
            commentId={item.id}
            profileImage={item.user.profileImg}
            nickname={item.user.nickname}
            description={item.description}
            createdDate={item.createdAt}
            replys={item.Replys}
            clickReplyOfReply={clickReplyOfReply}
            openCommentActionSheet={openCommentActionSheet}
            />
        )
    } 



    return (
        <TouchableWithoutFeedback onPress={() => clickBackground()}>
        <Container>
            <NavigationHeader
            headerLeftProps={{type: "arrow", onPress: goBack}}
            headerRightProps={{type: "empty", onPress: () => 0}}
            headerTitle={`댓글(${commentCount})`}
            />
            {commentArray.length > 0 && (
            <CommentListContainer>
                <KeyboardAwareFlatList
                refreshing={refreshing}
                onRefresh={onRefreshCommentFlat}
                ref={commentFlatListRef}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: (commentInputRef?.current?.isFocused() ? hp('5%') : hp('9%')), paddingTop: 12}}
                scrollEnabled={true}
                data={commentArray}
                renderItem={renderCommentItem}
                keyExtractor={(item: object, index: number) => `${index}`}/>
            </CommentListContainer>
            )}
            {commentArray.length === 0 && (
            <NoCommentListContainer>
                <Animated.View
                style={{
                    backgroundColor: "#ffffff",
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingBottom: hp('10%'),
                    transform: [
                        {
                            translateY: noCommentYAnim,
                        }
                    ]
                }}>
                <NoCommentImage
                source={require('~/Assets/Images/Comment/ic_noComment.png')}/>
                <NoCommentText>{"등록된 댓글이 없습니다.\n댓글을 남겨주세요."}</NoCommentText>
                </Animated.View>
            </NoCommentListContainer>
            )}
            <KeyboardAvoidingView behavior={"position"}>
            <BottomBarContainer>
                <CommentPostBottomBar
                requestScreen={"ReviewCommentListScreen"}
                cancelReplyInput={cancelReplyInput}
                replyTargetNickname={replyTargetNickname.current}
                commentInputRef={commentInputRef}
                inputType={inputType}
                postReviewComment={postReviewComment}/>
            </BottomBarContainer>
            </KeyboardAvoidingView>
            {loadingCommentPost && (
                <TouchBlockIndicatorCover
                loading={loadingCommentPost}/>
            )}
            <ActionSheet
            ref={ownCommentActionSheetRef}
            options={['닫기', '삭제하기']}
            cancelButtonIndex={0}
            detructiveButtonIndex={1}
            onPress={(index: any) => onPressOwnCommentActionSheet(index)}
            />
            <ActionSheet
            ref={otherCommentActionSheetRef}
            options={['닫기', '신고하기']}
            cancelButtonIndex={0}
            detructiveButtonIndex={1}
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
        setIsVisibleCommentDeleteModal(false)
        deleteReviewComment();
        },
       },
       ]}>
         <ModalContentText>{'삭제되면 복구가 불가능합니다.\n정말 삭제하시겠습니까?'}</ModalContentText>
       </AnimatedModal>
        </Container>
        </TouchableWithoutFeedback>
    )
}

export default ReviewCommentListScreen;