import React, {useState} from 'react';
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
import {useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

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
    const jwtToken = useSelector((state: any) => state.currentUser).jwtToken;
    const commentItem = route.params?.commentObj

    const goBack = () => {
        navigation.goBack()
    }


    const renderReplyItem = ({item, index}: any) => {
        return (
            <ReplyItem
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
        )
    }
    
    const postCommentReply = (description: string) => {
        Keyboard.dismiss();
        setLoadingReplyPost(true);
        const commentId = commentItem.id;
        const type = 'review';
    
        POSTReply({jwtToken, commentId, type, description})
        .then((response: any) => {
            console.log("POSTReply response", response);
            setLoadingReplyPost(false);
            //setCommentArray(response.reverse());
            //setChangeCommentArray(!changeCommentArray);
            //setInputType("comment")
            //isClickReply = false;
            navigation.navigate("ReviewCommentListScreen", {
                refreshCommentList: true,
            });
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
            <KeyboardAwareScrollView>
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
                cancelReplyInput={() => 0}
                replyTargetNickname={""}
                commentInputRef={null}
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