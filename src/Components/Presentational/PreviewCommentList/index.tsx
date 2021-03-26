import React, {useState, useEffect, useCallback, useRef} from 'react';
import Styled from 'styled-components/native';
import {
  TouchableWithoutFeedback,
  FlatList,
  ActivityIndicator,
  LayoutAnimation,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ActionSheet from 'react-native-actionsheet';
import CommentItem from '~/Components/Presentational/CommentItem';
import ReplyItem from '~/Components/Presentational/ReplyItem';

// Routes
import DELETEComment from '~/Routes/Comment/DELETEComment'

import {useSelector, useDispatch} from 'react-redux';
import allActions from '~/actions';

const Container = Styled.View`
`;

const HeaderContainer = Styled.View`
padding: 16px 16px 12px 16px;
flex-direction: row;
`;

const HeaderCommentCountText = Styled.Text`
font-size: 15px;
line-height: 24px;
color: #000000;
font-weight: bold;
`;

const CommentListContainer = Styled.View`
padding-top: 5px;
padding-bottom: 8px;
border-color: #F5F7F9;
`;

const ViewTotalCommentContainer = Styled.View`
align-items: center;
flex-direction: row;
align-items: center;
`;

const NoCommentContainer = Styled.View`
width: ${wp('100%')}px;
padding-top: 50px;
padding-bottom: 90px;
background-color: #ffffff;
align-items: center;
`;

const NoCommentText = Styled.Text`
font-size: 14px;
color: #9AA2A9;
`;

const ListFooterText = Styled.Text`
font-weight: normal;
font-size: 15px;
line-height: 24px;
align-self: center;
padding: 12px;

`;

const ViewTotalCommentIcon = Styled.Image`
margin-left: 4px;
width: ${wp('4.266%')}px;
height: ${wp('4.266%')}px;
`;

const ActivityIndicatorContianerView = Styled.View`
margin-top: 150px;
justify-content: center;
`;
interface Props {
  jwtToken: string;
  isLoading: boolean;
  commentList: Array<any>;
  navigation: any;
  profile: any;
  postId: string;
  postType: string;
  commentsNum: any;
}

const PreviewCommentList = ({
  jwtToken,
  isLoading,
  profile,
  commentList,
  navigation,
  postId,
  postType,
  commentsNum,
}: Props) => {
  const dispatch = useDispatch();
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

  const [selectedCommentId, setSelectedCommentId] = useState<number>(-1); //for action sheet

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
  }, [commentList]);

  useEffect(() => {
    if(!isLoading) {
      LayoutAnimation.configureNext(
        LayoutAnimation.create(200, 'easeInEaseOut', 'opacity'),
      );
    }
  }, [isLoading])
  const renderCommentItem = useCallback(({item, index}: any) => {
    console.log(item.user)
    return (
      <>
        <CommentItem
          index={index}
          commentObj={item}
          isVisibleReplyButton={true}
          clickReply={clickReply}
          userId={item.user?.id}
          profileImage={item.user?.profileImg}
          img_thumbNail={item.user?.img_thumbNail}
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
        img_thumbNail={item.user?.img_thumbNail}
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
          return;
      }
    },
    [ownCommentActionSheetOptions, jwtToken, postType, postId],
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
      if (userId === profile.id) {
        ownCommentActionSheetRef.current.show();
      } else {
        otherCommentActionSheetRef.current.show();
      }
    },
    [profile],
  );

  const moveToAnotherProfile = useCallback(
    (userId: string, nickname: string, profileImageUri: string, img_thumbNail: string) => {
      navigation.navigate('AnotherProfileStackScreen', {
        targetUser: {
          userId,
          nickname,
          profileImageUri,
          img_thumbNail,
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

  const renderFooterContent = useCallback(() => {
    if (commentList.length > 10) {
      return (
        <TouchableWithoutFeedback onPress={() => moveToCommentList()}>
          <ListFooterText>
            {`${commentList.length - 10}개 댓글 더보기`}
          </ListFooterText>
        </TouchableWithoutFeedback>
      );
    } else {
      return <></>;
    }
  }, [commentList]);

  return (
    <Container>
      <HeaderContainer>
        <TouchableWithoutFeedback onPress={() => moveToCommentList()}>
          <ViewTotalCommentContainer>
            <HeaderCommentCountText>{`댓글 ${commentList ? commentList.length : 
              ( commentsNum > 99) ? '99+' :
             String(commentsNum)
            }`}</HeaderCommentCountText>
            <ViewTotalCommentIcon
              source={require('~/Assets/Images/Arrow/ic_viewTotalComments.png')}
            />
          </ViewTotalCommentContainer>
        </TouchableWithoutFeedback>
      </HeaderContainer>
      {isLoading ? (
        <ActivityIndicatorContianerView>
          <ActivityIndicator />
        </ActivityIndicatorContianerView>
      ) : commentList.length > 0 ? (
        <CommentListContainer>
          <FlatList
            data={previewCommentList}
            CellRendererComponent={renderCommentItem}
            keyExtractor={(item) => `${item.id}`}
            ListFooterComponent={renderFooterContent}
          />
        </CommentListContainer>
      ) : (
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
