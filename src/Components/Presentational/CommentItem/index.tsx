import React, {useEffect, useState} from 'react';
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
 padding-top: 10px;
 padding-bottom: 10px;
 padding-left: 18px;
 padding-right: 0px;
 flex-direction: row;
 background-color: #ffffff;
`;

const ProfileImageContainer = Styled.View`
`;

const CommentRightContainer = Styled.View`
flex: 1;
`;

const HeaderContainer = Styled.View`
align-items: center;
flex-direction: row;
justify-content: space-between;
padding-left: 8px;
padding-top: 9px;
`;

const NicknameContentContainer = Styled.View`
padding-top: 5px;
padding-bottom: 0px;
padding-right: 10px;
justify-content: center;
`;

const BodyContainer = Styled.View`
padding-top: 3px;
padding-left: 8px;
padding-right: 85px;
`;

const FooterContainer = Styled.View`
padding-left: 8px;
 flex-direction: row;
 padding-top: 8px;
 align-items: center;
`;

const ProfileImage = Styled.Image`
width: ${wp('9%')}px;
height: ${wp('9%')}px;
 border-radius: 100px;
 background-color: #E2E6ED;
`;

const NicknameText = Styled.Text`
line-height: 16px;
 font-size: 14px;
 font-weight: 800;
 font-family: NanumSquare;
 color: #131F3C
`;

const CommentDescripText = Styled.Text`
font-weight: 400;
font-size: 14px;
line-height: 16px;
font-family: NanumSquare;
color: #131F3C;
`;

const CreateAtText = Styled.Text`
font-weight: 400;
font-family: NanumSquare;
font-size: 12px;
line-height: 16px;
 color: #9AA2A9;
`;

const ReplyText = Styled.Text`
font-weight: 800;
font-family: NanumSquare;
line-height: 16px;
font-size: 12px;
 color: #9AA2A9;
`;

const ReplyContainer = Styled.View`
flex-direction: row;
align-items: center;
`;

const ReportText = Styled.Text`
font-size: 14px;
font-weight: 600;
color: #979797;
`;

const HeaderLeftContainer = Styled.View`
`;

const MoreViewContainer = Styled.View`
background-color: #ffffff;
top: 0px;
right: 0px;
position: absolute;
padding-top: 5px;
padding-bottom: 16px;
padding-right: 16px;
`;

const MoreViewIcon = Styled.Image`
width: ${wp('6.4%')}px;
height: ${wp('6.4%')}px;
`;

const PointDivider = Styled.View`
margin-left: 8px;
margin-right: 8px;
width: 2px;
height: 2px;
border-radius: 4px;
background-color: #9AA2A9;
`;

interface Props {
  commentObj: any,
  userId: any;
  commentId: number;
  profileImage: string;
  nickname: string;
  description: string;
  createdDate: string;
  replys: Array<Object>;
  clickReply: (commentObj: any, nickname: string) => void;
  isVisibleReplyButton: boolean;
  openCommentActionSheet: (
    userId: string,
    nickname: string,
    commentId: number,
  ) => void;
  moveToAnotherProfile: (userId: string, nickname: string, profileImageUri: string) => void,
}

const CommentItem = ({
  commentObj,
  userId,
  commentId,
  profileImage,
  nickname,
  description,
  createdDate,
  replys,
  clickReply,
  openCommentActionSheet,
  isVisibleReplyButton,
  moveToAnotherProfile
}: Props) => {
  const currentUser = useSelector((state: any) => state.currentUser);
  const userProfile = currentUser.profile;

  function getDateFormat(dateStr: string) {
    const date = new Date(dateStr);
    let year = date.getFullYear();
    let month = 1 + date.getMonth();
    let monthStr = month >= 10 ? month : '0' + month;
    let day = date.getDate();
    let dayStr = day >= 10 ? day : '0' + day;
    return year + '.' + monthStr + '.' + dayStr;
  }

  function getElapsedTime(createdDiff: string) {
    let elapsedTimeText = '';

    const elapsedMin = commentObj['createdDiff(second)'] / 60;
    const elapsedHour = commentObj['createdDiff(second)'] / 3600;
    const elapsedDay = commentObj['createdDiff(second)'] / 86400;

    if (elapsedMin < 1) {

      elapsedTimeText = '방금 전';
      return elapsedTimeText

    } else if (1 <= elapsedMin && elapsedHour < 1) {

      elapsedTimeText = `${Math.floor(elapsedMin)}분 전`;
      return elapsedTimeText

    } else if (1 <= elapsedHour && elapsedDay < 1) {

      elapsedTimeText = `${Math.floor(elapsedHour)}시간 전`;
      return elapsedTimeText

    } else if (elapsedDay >= 1) {

      elapsedTimeText = getDateFormat(createdDate);
      return elapsedTimeText
    }
  } 

  return (
      <Container>
        <TouchableWithoutFeedback onPress={() => moveToAnotherProfile(userId, nickname, profileImage)}>
          <ProfileImageContainer>
            <ProfileImage source={{uri: profileImage ? profileImage : "https://pickk.one/images/defaultProfile.jpg"}} />
          </ProfileImageContainer>
        </TouchableWithoutFeedback>
        <CommentRightContainer>
          <HeaderContainer>
            <HeaderLeftContainer>
            <NicknameText>{nickname}</NicknameText>
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
          <CreateAtText>{getElapsedTime(commentObj['createdDiff(second)'])}</CreateAtText>
            {isVisibleReplyButton && (
            <TouchableWithoutFeedback
              onPress={() => clickReply(commentObj, nickname)}>
              <ReplyContainer>
              <PointDivider/>
              <ReplyText>{"답글달기"}</ReplyText>
              </ReplyContainer>
            </TouchableWithoutFeedback>
            )}
          </FooterContainer>
        </CommentRightContainer>
      </Container>
  );
};

export default CommentItem;
