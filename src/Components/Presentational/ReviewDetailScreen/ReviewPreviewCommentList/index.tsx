import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, FlatList} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import CommentItem from '~/Components/Presentational/CommentItem';
import ReplyItem from '~/Components/Presentational/ReplyItem';

const Container = Styled.View`
padding-bottom: 24px;
padding-top: 24px;
`;

const HeaderContainer = Styled.View`
flex-direction: row;
align-items: center;
justify-content: space-between;
padding-left: 16px;
padding-right: 16px;
`;

const HeaderCommentCountText = Styled.Text`
font-size: 16px;
color: #000000;
font-weight: bold;
`;

const CommentListContainer = Styled.View`
padding-top: 5px;
padding-bottom: 8px;
`;

const ViewTotalCommentText = Styled.Text`
align-self: flex-end;
font-weight: 700;
font-size: 14px;
color: #9AA2A9;
`;

const ViewTotalCommentContainer = Styled.View`
padding-top: 8px;
padding-right: 16px;
padding-left: 16px;
padding-bottom: 8px;
`;

const NoCommentContainer = Styled.View`
width: ${wp('100%')}px;
align-items: center;
padding-top: 50px;
padding-bottom: 50px;
`;

const NoCommentText = Styled.Text`
font-family: NanumSquare;
font-size: 14px;
color: #9AA2A9;
`;

const CommentItemContainer = Styled.View`
`;

let commentObj: object;

interface Props {
    commentList: Array<object>,
    clickReply: () => void,
    openCommentActionSheet: (userId: string, nickname: string, commentId: number) => void;
    moveToCommentList: (request: string) => void,
}

const ReviewPreviewCommentList = ({commentList, clickReply, openCommentActionSheet, moveToCommentList}: Props) => {
    const [isViewTotal, setIsViewTotal] = useState<boolean>(false);
    const [previewCommentList, setPreviewCommentList] = useState<Array<object>>([]);

    useEffect(() => {
        if(commentList.length > 7) {
            const tmpCommentList = commentList.slice(0, 7);
            setIsViewTotal(true);
            setPreviewCommentList(tmpCommentList);
        } else {
            setPreviewCommentList(commentList);
        }

    }, [commentList])

    const renderCommentItem = ({item, index}: any) => {
        console.log("renderCommentItem item", item);
        commentObj = item;

        return (
            <CommentItemContainer>
                <CommentItem
                commentObj={item}
                isVisibleReplyButton={true}
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
            commentObj={commentObj}
            isVisibleReplyButton={true}
            userId={item.user.id}
            commentId={item.id}
            profileImage={item.user.profileImg}
            nickname={item.user.nickname}
            description={item.description}
            createdDate={item.createdAt}
            replys={item.Replys}
            clickReply={clickReply}
            />
        )
    } 

    

    return (
        <Container>
            <HeaderContainer>
                <HeaderCommentCountText>{`댓글(${commentList.length})`}</HeaderCommentCountText>
            </HeaderContainer>
            {commentList.length > 0 && (
            <CommentListContainer>
                <FlatList
                data={previewCommentList}
                renderItem={renderCommentItem}/>
                {isViewTotal && (
                <TouchableWithoutFeedback onPress={() => moveToCommentList("view")}>
                <ViewTotalCommentContainer>
                    <ViewTotalCommentText>{"댓글 모두 보기"}</ViewTotalCommentText>
                </ViewTotalCommentContainer>
                </TouchableWithoutFeedback>
                )}
            </CommentListContainer>
            )}
            {commentList.length === 0 && (
            <NoCommentContainer>
                <NoCommentText>{"등록된 댓글이 없어요!"}</NoCommentText>
            </NoCommentContainer>
            )}
            
        </Container>
    )
}

export default ReviewPreviewCommentList




