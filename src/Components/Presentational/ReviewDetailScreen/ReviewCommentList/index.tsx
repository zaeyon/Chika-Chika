import React from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, FlatList} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import CommentItem from '~/Components/Presentational/CommentItem';

const Container = Styled.View`
`;

const HeaderContainer = Styled.View`
padding-top: 15px;
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
padding-bottom: 16px;
`;

interface Props {
    commentList: Array<object>,
}

const ReviewCommentList = ({commentList}: Props) => {
    
    const renderCommentItem = ({item, index}: any) => {
        return (
            <CommentItem
            userId={item.userId}
            commentId={item.id}
            profileImage={item.user.profileImg}
            nickname={item.user.nickname}
            description={item.description}
            createdDate={item.createdAt}
            replys={item.Replys}
            />
        )
    }

    return (
        <Container>
            <HeaderContainer>
                <HeaderCommentCountText>{`댓글(${commentList.length})`}</HeaderCommentCountText>
            </HeaderContainer>
            <CommentListContainer>
                <FlatList
                data={commentList}
                renderItem={renderCommentItem}/>
            </CommentListContainer>
        </Container>
    )
}

export default ReviewCommentList




