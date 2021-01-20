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
    clickReply: (commentOb: any, targetUserNickname: string) => void,
    clickReplyOfReply: (commentObj: any, targetUserNickname: string) => void,
    openCommentActionSheet: (userId: string, nickname: string, commentId: number) => void;
    moveToCommentList: (request: string) => void,
    commentCount: number,
}
    
const ReviewPreviewCommentList = ({commentList, clickReply, clickReplyOfReply, openCommentActionSheet, moveToCommentList, commentCount}: Props) => {
    const [isViewTotal, setIsViewTotal] = useState<boolean>(false);
    const [previewCommentList, setPreviewCommentList] = useState<Array<any>>([]);
    console.log("ReviewPreviewCommentList commentList", commentList);
    
    useEffect(() => {

        let tmpCommentList = new Array();
        tmpCommentList = commentList;

        if(commentCount > 7) {
            let remainingCount = 7;
            for (var i = 0; i < commentList.length; i++) {
                console.log("ReviewPreviewCommentList commentList[i].Replys.length", commentList[i].Replys.length);

                remainingCount = remainingCount - (1 + commentList[i].Replys.length);
                console.log("ReviewPreviewCommentList remainingCount", remainingCount);

                if(remainingCount <= 0) {
                     const deletedCommentArr = commentList.slice(0, i+1);
                     const tmpReplyArr = commentList[i].Replys;
                     const deletedReplyArr = tmpReplyArr.slice(0, (tmpReplyArr.length - Math.abs(remainingCount)))
                     console.log("deletedReplyArr", deletedReplyArr);
                    
                     deletedCommentArr[i].Replys = deletedReplyArr;

                     setPreviewCommentList(deletedCommentArr)
                     

                     break
                }
            }
            setIsViewTotal(true);
        } else {
            setPreviewCommentList(commentList);
        }

    }, [commentList])

    const renderCommentItem = ({item, index}: any) => {
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
                    renderItem={renderReplyItem}
                    keyExtractor={item => `${item.id}`}/>
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
        <Container>
            <HeaderContainer>
                <HeaderCommentCountText>{`댓글(${commentCount})`}</HeaderCommentCountText>
            </HeaderContainer>
            {commentList.length > 0 && (
            <CommentListContainer>
                <FlatList
                data={previewCommentList}
                renderItem={renderCommentItem}
                keyExtractor={item => `${item.id}`}/>
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




