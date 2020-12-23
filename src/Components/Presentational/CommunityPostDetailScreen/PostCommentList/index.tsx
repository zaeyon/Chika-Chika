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
  commentList: Array<object>;
}

const ReviewCommentList = ({commentList}: Props) => {
  const renderCommentItem = (item: any, index: number) => {
    return (
      <CommentItem
        commentId={item.id}
        profileImage={item.user.profileImage}
        nickname={item.user.nickname}
        description={item.description}
        createdDate={item.createdAt}
        userId={item.userId}
        replys={item.Replys}
      />
    );
  };

  return (
    <Container>
      <HeaderContainer>
        <HeaderCommentCountText>댓글</HeaderCommentCountText>
      </HeaderContainer>
      <CommentListContainer>
        {commentList.map(renderCommentItem)}
      </CommentListContainer>
    </Container>
  );
};

export default ReviewCommentList;
