import React, {useEffect, useState, useRef, useCallback} from 'react';
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
 padding-left: 18px;
 padding-right: 0px;
 flex-direction: row;
 background-color: #ffffff;
`;

const ProfileImageContainer = Styled.View`
padding: 0px 8px 16px 8px;
margin-bottom: auto;
`;

const CommentRightContainer = Styled.View`
flex: 1;
`;

const HeaderContainer = Styled.View`
background: #FFFFFF;
align-items: center;
flex-direction: row;
justify-content: space-between;
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
padding-right: 85px;
`;

const FooterContainer = Styled.View`
padding-left: 8px;
 flex-direction: row;
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
 
 color: #131F3C
`;

const CommentDescripText = Styled.Text`
font-weight: 400;
font-size: 14px;
line-height: 24px;

color: #131F3C;
`;

const CreateAtText = Styled.Text`
font-weight: 400;

font-size: 12px;
line-height: 16px;
 color: #9AA2A9;
`;

const ReplyText = Styled.Text`
font-weight: 800;

line-height: 16px;
font-size: 12px;
 color: #9AA2A9;
`;

const ReplyContainer = Styled.View`
flex-direction: row;
align-items: center;
padding-top: 8px;
padding-bottom: 8px;
`;

const ReportText = Styled.Text`
font-size: 14px;
font-weight: 600;
color: #979797;
`;

const HeaderLeftContainer = Styled.View`
`;

const MoreViewContainer = Styled.TouchableOpacity`
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
  index: number;
  commentObj: any;
  commentId: any;
  userId: any;
  profileImage: string;
  nickname: string;
  description: string;
  createdDate: string;
  clickReply: any;
  isVisibleReplyButton: boolean;
  openCommentActionSheet: (
    userId: string,
    nickname: string,
    commentId: number,
  ) => void;
  moveToAnotherProfile: (
    userId: string,
    nickname: string,
    profileImageUri: string,
  ) => void;
}

const CommentItem = ({
  index,
  commentObj,
  userId,
  commentId,
  profileImage,
  nickname,
  description,
  createdDate,
  clickReply,
  openCommentActionSheet,
  isVisibleReplyButton,
  moveToAnotherProfile,
}: Props) => {
  const currentUser = useSelector((state: any) => state.currentUser);
  const userProfile = currentUser.profile;
  const containerRef: any = useRef();
  const [positionY, setPositionY] = useState(0);

  const getDateFormat = useCallback((createdAt: string) => {
    const currentYear = new Date(Date.now()).getFullYear();

    const [date, time] = createdAt.split(' ');
    const [year, month, day] = date.split('-');

    if (String(currentYear) === year) {
      return parseInt(month) + '월 ' + parseInt(day) + '일';
    } else {
      return year + '년 ' + parseInt(month) + '월 ' + parseInt(day) + '일';
    }
  }, []);

  const getElapsedTime = useCallback((createdDiff: string) => {
    let elapsedTimeText = '';

    const elapsedMin = commentObj['createdDiff(second)'] / 60;
    const elapsedHour = commentObj['createdDiff(second)'] / 3600;
    const elapsedDay = commentObj['createdDiff(second)'] / 86400;

    if (elapsedMin < 1) {
      elapsedTimeText = '방금 전';
      return elapsedTimeText;
    } else if (1 <= elapsedMin && elapsedHour < 1) {
      elapsedTimeText = `${Math.floor(elapsedMin)}분 전`;
      return elapsedTimeText;
    } else if (1 <= elapsedHour && elapsedDay < 1) {
      elapsedTimeText = `${Math.floor(elapsedHour)}시간 전`;
      return elapsedTimeText;
    } else if (elapsedDay >= 1) {
      elapsedTimeText = getDateFormat(createdDate);
      return elapsedTimeText;
    }
  }, []);

  return (
    <Container
      onLayout={() => {
        containerRef.current &&
          containerRef.current.measure((fx, fy, width, height, px, py) => {
            console.log('comment', description, fx, fy, width, height, px, py);
            setPositionY(fy);
          });
      }}
      ref={containerRef}>
      <TouchableWithoutFeedback
        onPress={() => moveToAnotherProfile(userId, nickname, profileImage)}>
        <ProfileImageContainer>
          <ProfileImage
            source={{
              uri: profileImage
                ? profileImage
                : 'https://pickk.one/images/defaultProfile.jpg',
            }}
          />
        </ProfileImageContainer>
      </TouchableWithoutFeedback>
      <CommentRightContainer>
        <HeaderContainer>
          <TouchableWithoutFeedback
            onPress={() =>
              moveToAnotherProfile(userId, nickname, profileImage)
            }>
            <HeaderLeftContainer>
              <NicknameText>{nickname}</NicknameText>
            </HeaderLeftContainer>
          </TouchableWithoutFeedback>
          <MoreViewContainer
            onPress={() => openCommentActionSheet(userId, nickname, commentId)}>
            <MoreViewIcon
              source={require('~/Assets/Images/Comment/ic_moreView.png')}
            />
          </MoreViewContainer>
        </HeaderContainer>
        <BodyContainer>
          <CommentDescripText>{description}</CommentDescripText>
        </BodyContainer>
        <FooterContainer>
          <CreateAtText>
            {getElapsedTime(commentObj['createdDiff(second)'])}
          </CreateAtText>
          {isVisibleReplyButton && (
            <TouchableWithoutFeedback
              onPress={() =>
                clickReply(commentObj, nickname, index, positionY)
              }>
              <ReplyContainer>
                <PointDivider />
                <ReplyText>{'답글달기'}</ReplyText>
              </ReplyContainer>
            </TouchableWithoutFeedback>
          )}
        </FooterContainer>
      </CommentRightContainer>
    </Container>
  );
};

export default CommentItem;
