import React, {useEffect} from 'react';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  TouchableWithoutFeedback,
  TouchableHighlight,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useSelector} from 'react-redux';

import ReplyItem from '~/Components/Presentational/ReplyItem';

const Container = Styled.View`
 width: ${wp('100%')}px;
 margin-bottom: 2px;
 flex-direction: row;
 padding-right: 0px;
`;

const ProfileImageContainer = Styled.View`
width: ${wp('8.5%')}px;
 height: ${wp('8.5%')}px;

margin-top: 15px;
margin-left: 16px;
margin-right: 12px;
 align-items: center;
`;

const CommentRightContainer = Styled.View`
flex: 1;
`;

const HeaderContainer = Styled.View`
background-color: #ffffff;
align-items: center;
flex-direction: row;
justify-content: space-between;
padding-top: 14px;
padding-right: 16px;
`;

const NicknameContentContainer = Styled.View`
padding-top: 5px;
padding-bottom: 0px;
padding-right: 10px;
justify-content: center;
`;

const BodyContainer = Styled.View`
padding-right: 85px;
`;

const FooterContainer = Styled.View`
 flex-direction: row;
 padding-top: 8px;
 padding-bottom: 10px;
 align-items: center;
`;

const ProfileImage = Styled.Image`
 width: 100%;
 height: 100%;
 border-radius: 100px;
 background: grey;
`;

const NicknameText = Styled.Text`
 font-size: 14px;
 font-weight: 800;
 font-family: NanumSquare;
 color: #131F3C
`;

const CommentDescripText = Styled.Text`
font-weight: 400;
font-size: 14px;
margin-top: 5px;
font-family: NanumSquare;
color: #000000;
`;

const CreateAtText = Styled.Text`
margin-top: 4px;
font-weight: 400;
font-family: NanumSquare;
font-size: 12px;
 color: #9AA2A9;
`;

const ReplyText = Styled.Text`
font-weight: 400;
font-family: NanumSquare;
font-size: 12px;
 color: #9AA2A9;
`;

const ReplyContainer = Styled.View`
`;

const ReportText = Styled.Text`
font-size: 14px;
font-weight: 600;
color: #979797;
`;

const HeaderLeftContainer = Styled.View`
`;

const MoreViewContainer = Styled.View`
`;

const MoreViewIcon = Styled.Image`
width: ${wp('6.4%')}px;
height: ${wp('6.4%')}px;
`;

interface Props {
  commentObj: object,
  userId: string;
  commentId: number;
  profileImage: string;
  nickname: string;
  description: string;
  createdDate: string;
  elapsedTime: string;
  isVisibleElapsedTime: boolean;
  replys: Array<Object>;
  clickReply: (commentObj: any, commentId: number) => void;
  isVisibleReplyButton: boolean;
  openCommentActionSheet: (
    userId: string,
    nickname: string,
    commentId: number,
  ) => void;
}

const CommentItem = ({
  commentObj,
  userId,
  commentId,
  profileImage,
  nickname,
  description,
  createdDate,
  elapsedTime,
  replys,
  clickReply,
  openCommentActionSheet,
  isVisibleReplyButton,
}: Props) => {
  const currentUser = useSelector((state: any) => state.currentUser);
  const userProfile = currentUser.profile;

  console.log("commentObj", commentObj);

  function getDateFormat(dateStr: string) {
    const date = new Date(dateStr);
    let year = date.getFullYear();
    let month = 1 + date.getMonth();
    let monthStr = month >= 10 ? month : '0' + month;
    let day = date.getDate();
    let dayStr = day >= 10 ? day : '0' + day;
    return year + '/' + monthStr + '/' + dayStr;
  }

  const moveToUserProfile = () => {
    /*
        if(userProfile?.nickname === nickname) {
            navigation.push("AnotherUserProfileStack", {
                screen: "AnotherUserProfileScreen",
                params: {requestedUserNickname: nickname}
              });
        } else {
            navigation.push("AnotherUserProfileStack", {
              screen: "AnotherUserProfileScreen",
              params: {requestedUserNickname: nickname}
            });
        }
        */
  };

  const onLongPressComment = () => {
    openCommentActionSheet(userId, nickname, commentId);
  };

  return (
    <TouchableWithoutFeedback
      onLongPress={() => onLongPressComment()}
      delayLongPress={300}>
      <Container>
        <TouchableWithoutFeedback onPress={() => moveToUserProfile()}>
          <ProfileImageContainer>
            <ProfileImage source={{uri: profileImage ? profileImage : "https://pickk.one/images/defaultProfile.jpg"}} />
          </ProfileImageContainer>
        </TouchableWithoutFeedback>
        <CommentRightContainer>
          <HeaderContainer>
            <HeaderLeftContainer>
            <NicknameText>{nickname}</NicknameText>
            <CreateAtText>{getDateFormat(createdDate)}</CreateAtText>
            </HeaderLeftContainer>
            <TouchableWithoutFeedback onPress={() => openCommentActionSheet(userId, nickname, commentId)}>
            <MoreViewContainer>
              <MoreViewIcon
              source={require('~/Assets/Images/Comment/ic_moreView.png')}/>
            </MoreViewContainer>
            </TouchableWithoutFeedback>
          </HeaderContainer>
          <BodyContainer>
          <CommentDescripText>{description}</CommentDescripText>
          </BodyContainer>
          <FooterContainer>
            {isVisibleReplyButton && (
            <TouchableWithoutFeedback
              onPress={() => clickReply(commentObj, commentId)}>
              <ReplyContainer>
              <ReplyText>답글달기</ReplyText>
              </ReplyContainer>
            </TouchableWithoutFeedback>
            )}
          </FooterContainer>
        </CommentRightContainer>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default CommentItem;
