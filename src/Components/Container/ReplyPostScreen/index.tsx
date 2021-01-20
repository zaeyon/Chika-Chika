import React, {useState, useRef, useEffect} from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
    KeyboardAvoidingView,
    FlatList,
    Keyboard
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import allActions from '~/actions';
import {KeyboardAwareScrollView, KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';
import { CommonActions } from '@react-navigation/native';

// local components
import NavigationHeader from '~/Components/Presentational/NavigationHeader';
import CommentItem from '~/Components/Presentational/CommentItem';
import ReplyItem from '~/Components/Presentational/ReplyItem';
import CommentPostBottomBar from '~/Components/Presentational/ReviewCommentListScreen/CommentPostBottomBar';
import TouchBlockIndicatorCover from '~/Components/Presentational/TouchBlockIndicatorCover';
import POSTReply from '~/Routes/Comment/POSTReply';

const Container = Styled.SafeAreaView`
flex: 1;
background-color: #ffffff;
`;

const BodyContainer = Styled.View`
flex: 1;
background-color: #ffffff;
`;

const CommentItemContainer = Styled.View`
flex: 1;
background-color: #ffffff;
`;


const ReplyItemContainer = Styled.View`
flex: 1;
background-color: #ffffff;
`;

const BottomBarContainer = Styled.View`
background-color: #ffffff;
position: absolute;
bottom: 0;
width: ${wp('100%')}px;
`;

interface Props {
    navigation: any,
    route: any,
}

const ReplyPostScreen = ({navigation, route}: Props) => {
    const [loadingReplyPost, setLoadingReplyPost] = useState<boolean>(false);
    console.log("ReplyPostScreen route.params?.commentObj", route.params?.commentObj)
    console.log("ReplyPostScreen targetUserNickname", route.params.targetUserNickname);
    if(route.params?.replyObj) {
        console.log("ReplyPostScreen route.params?.replyObj", route.params.replyObj);
    }
    const jwtToken = useSelector((state: any) => state.currentUser).jwtToken;
    const dispatch = useDispatch();
    const commentItem = route.params?.commentObj
    const reviewId = route.params?.reviewId;
    const commentInputRef = useRef();


    useEffect(() => {
        if(route.params?.request === "ReviewDetailScreen") {
            navigation.dispatch((state: any) => {
                console.log("state.routes[state.routes.length - 2]", state.routes[state.routes.length - 2]);
    
                    const reviewCommentListRoutes = {
                        name: "ReviewCommentListScreen",
                        params: {reviewId: reviewId},
                    }

                    let routes = state.routes.slice(0, state.routes.length);
                    routes.splice(routes.length - 1, 0, reviewCommentListRoutes)

                    console.log("변경된 routes", routes);

                    
                    return CommonActions.reset({
                        ...state,
                        routes,
                        index: routes.length - 1,
                    })
            });
        }
    }, [])

        

    const goBack = () => {
        navigation.goBack()
    }


    const renderReplyItem = ({item, index}: any) => {
        return (
            <ReplyItemContainer>
            <ReplyItem
            replyObj={item}
            isVisibleReplyButton={false}
            userId={item.user.id}
            commentId={item.id}
            profileImage={item.user.profileImg}
            nickname={item.user.nickname}
            description={item.description}
            createdDate={item.createdAt}
            replys={item.Replys}
            clickReply={() => 0}
            />
            </ReplyItemContainer>
        )
    }
    
    const postCommentReply = (description: string) => {
        Keyboard.dismiss();
        setLoadingReplyPost(true);

        const commentId = commentItem.id;
        const type = 'review';
        const targetUser = route.params.targetUserNickname;
        const postId = reviewId;
    
        POSTReply({jwtToken, commentId, type, description, targetUser, postId})
        .then((response: any) => {
            console.log("POSTReply response", response);
            setLoadingReplyPost(false);
            dispatch(allActions.commentListActions.setCommentList(response.comments.reverse()));
            dispatch(allActions.commentListActions.setCommentCount(response.commentsNum.commentsNum));
            //setCommentArray(response.reverse());
            //setChangeCommentArray(!changeCommentArray);
            //setInputType("comment")
            //isClickReply = false;
            navigation.navigate("ReviewCommentListScreen");
        })
        .catch((error) => {
            console.log("POSTReply error", error);
            setLoadingReplyPost(false);
        })
    }

    return (
        <Container>
            <NavigationHeader
            headerTitle={"답글작성"}
            headerLeftProps={{type: 'arrow', onPress: () => goBack()}}
            headerRightProps={{type: 'empty', onPress: () => 0}}/>
            <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: (commentInputRef?.current?.isFocused() ? hp('5%') : hp('9%')), paddingTop: 12}}>
            <CommentItemContainer>
                <CommentItem
                isVisibleReplyButton={false}
                commentObj={commentItem}
                userId={commentItem.user.id}
                commentId={commentItem.id}
                profileImage={commentItem.user.profileImg}
                nickname={commentItem.user.nickname}
                description={commentItem.description}
                createdDate={commentItem.createdAt}
                replys={commentItem.Replys}
                clickReply={() => 0}/>
                {commentItem.Replys[0] && (
                    <FlatList
                    data={commentItem.Replys}
                    renderItem={renderReplyItem}/>
                )}
            </CommentItemContainer>
            </KeyboardAwareScrollView>
            <KeyboardAvoidingView behavior={"position"}>
            <BottomBarContainer>
                <CommentPostBottomBar
                requestScreen={"ReplyPostScreen"}
                cancelReplyInput={() => 0}
                replyTargetNickname={""}
                commentInputRef={commentInputRef}
                inputType={""}
                postReviewComment={postCommentReply}/>
            </BottomBarContainer>
            </KeyboardAvoidingView>
            {loadingReplyPost && (
                <TouchBlockIndicatorCover
                loading={loadingReplyPost}/>
            )}
        </Container>
    )
}

export default ReplyPostScreen;