import React, {useState, useEffect, useCallback, useRef} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, FlatList} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ActionSheet from 'react-native-actionsheet';
import CommentItem from '~/Components/Presentational/CommentItem';
import ReplyItem from '~/Components/Presentational/ReplyItem';

const Container = Styled.View`
padding-top: 12px;
`;

const HeaderContainer = Styled.View`
padding-left: 16px;
padding-right: 16px;
flex-direction: row;
`;

const HeaderCommentCountText = Styled.Text`
font-size: 16px;
color: #000000;
font-weight: bold;
`;

const CommentListContainer = Styled.View`
padding-top: 5px;
padding-bottom: 8px;
border-bottom-width: 8px;
border-color: #F5F7F9;
`;

const ViewTotalCommentContainer = Styled.View`
padding-top: 12px;
padding-bottom: 5px;
background-color: #ffffff;
flex-direction: row;
align-items: center;
`;

const NoCommentContainer = Styled.View`
width: ${wp('100%')}px;
align-items: center;
padding-top: 50px;
padding-bottom: 50px;
`;

const NoCommentText = Styled.Text`
font-size: 14px;
color: #9AA2A9;
`;

const ViewTotalCommentIcon = Styled.Image`
margin-left: 4px;
width: ${wp('4.266%')}px;
height: ${wp('4.266%')}px;
`;

interface Props {
  commentList: Array<any>;
  commentCount: number;
  navigation: any;
  currentUser: any;
  postId: string;
  postType: string;
}

const PreviewCommentList = ({
  currentUser,
  commentList,
  commentCount,
  navigation,
  postId,
  postType,
}: Props) => {
  const [previewCommentList, setPreviewCommentList] = useState<Array<any>>([]);
  const [maxCommentNum, setMaxCommentNum] = useState(10);

  const ownCommentActionSheetRef: any = useRef();
  const [
    ownCommentActionSheetOptions,
    setOwnCommentActionSheetOptions,
  ] = useState(['닫기', '삭제하기']);
  const otherCommentActionSheetRef: any = useRef();
  const [
    otherCommentActionSheetOptions,
    setOtherCommentActionSheetOptions,
  ] = useState(['닫기', '신고하기']);

  const [selectedCommentId, setSelectedCommentId] = useState<number>(); //for action sheet

  useEffect(() => {
    console.log('reorder', commentList);
    let reachLimit = false;
    let count = 0;
    for (let i = 0; i < commentList.length; i++) {
      console.log('len', commentList[i].Replys);
      count += 1 + commentList[i].Replys.length;
      console.log(count);
      if (count > maxCommentNum) {
        if (commentList[i].Replys.length === 0) {
          const slicedComments = commentList.slice(0, i).concat();
          setPreviewCommentList(slicedComments);
          reachLimit = true;
          break;
        } else {
          const slicedComments = commentList.slice(0, i + 1).concat();
          slicedComments.splice(i, 1, {
            ...slicedComments[i],
            Replys: slicedComments[i].Replys.slice(0, maxCommentNum - count),
          });
          setPreviewCommentList(slicedComments);
          reachLimit = true;
          break;
        }
      }
    }
    if (!reachLimit) {
      setPreviewCommentList(commentList);
    }
  }, [commentList, maxCommentNum]);

  const renderCommentItem = useCallback(({item, index}: any) => {
    return (
      <>
        <CommentItem
          index={index}
          commentObj={item}
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

  const renderReplyItem = (item: any, index: number, commentItem: any) => {
    return (
      <ReplyItem
        key={String(item.id)}
        index={index}
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
  };

  const onPressOwnCommentActionSheet = useCallback(
    (index: number) => {
      switch (ownCommentActionSheetOptions[index]) {
        case '닫기':
          return;
        case '삭제하기':
          return;
      }
    },
    [ownCommentActionSheetOptions],
  );

  const onPressOtherCommentActionSheet = useCallback(
    (index: number) => {
      switch (otherCommentActionSheetOptions[index]) {
        case '닫기':
          return;
        case '신고하기':
          return;
      }
    },
    [otherCommentActionSheetOptions],
  );

  const openCommentActionSheet = useCallback(
    (userId: string, nickname: string, commentId: number) => {
      setSelectedCommentId(commentId);
      if (userId === currentUser.profile.id) {
        ownCommentActionSheetRef.current.show();
      } else {
        otherCommentActionSheetRef.current.show();
      }
    },
    [currentUser],
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

  const moveToCommentList = useCallback(() => {
    navigation.navigate('CommentListScreen', {
      postId,
      postType,
      commentActionType: 'comment',
    });
  }, [postId, postType]);

  const clickReply = useCallback(
    (
      commentObj: any,
      targetUserNickname: string,
      index: number,
      positionY: number,
    ) => {
      navigation.navigate('CommentListScreen', {
        commentObj: commentObj,
        targetUserNickname: targetUserNickname,
        postId,
        postType,
        commentActionType: 'reply',
        request: 'CommunityDetailScreen',
        index,
        positionY,
      });
    },
    [postId, postType],
  );

  return (
    <Container>
      <HeaderContainer>
        <TouchableWithoutFeedback onPress={() => moveToCommentList()}>
          <ViewTotalCommentContainer>
            <HeaderCommentCountText>{`댓글 ${commentCount}`}</HeaderCommentCountText>
            <ViewTotalCommentIcon
              source={require('~/Assets/Images/Arrow/ic_viewTotalComments.png')}
            />
          </ViewTotalCommentContainer>
        </TouchableWithoutFeedback>
      </HeaderContainer>
      {commentList.length > 0 && (
        <CommentListContainer>
          <FlatList
            data={previewCommentList}
            CellRendererComponent={renderCommentItem}
            keyExtractor={(item) => `${item.id}`}
          />
        </CommentListContainer>
      )}
      {commentList.length === 0 && (
        <NoCommentContainer>
          <NoCommentText>{'등록된 댓글이 없어요!'}</NoCommentText>
        </NoCommentContainer>
      )}
      <ActionSheet
        ref={ownCommentActionSheetRef}
        options={ownCommentActionSheetOptions}
        cancelButtonIndex={0}
        onPress={(index: number) => onPressOwnCommentActionSheet(index)}
      />
      <ActionSheet
        ref={otherCommentActionSheetRef}
        options={otherCommentActionSheetOptions}
        cancelButtonIndex={0}
        onPress={(index: number) => onPressOtherCommentActionSheet(index)}
      />
    </Container>
  );
};

export default PreviewCommentList;
