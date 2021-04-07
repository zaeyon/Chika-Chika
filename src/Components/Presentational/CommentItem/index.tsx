import React, {useEffect, useState, useRef, useCallback} from 'react';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TouchableWithoutFeedback, Keyboard} from 'react-native';
import {useSelector} from 'react-redux';

import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

const Container = Styled.View`
 width: ${wp('100%')}px;
 padding: 12px 0px 12px 18px;
 background-color: #FFFFFF;
`;

const ProfileImageContainer = Styled.View`
margin-right: 8px;
`;

const HeaderContainer = Styled.View`
align-items: center;
flex-direction: row;
`;
const BodyContainer = Styled.View`
padding-left: 42px;
margin-top: -7px;
`;

const FooterContainer = Styled.View`
padding-left: 42px;
 flex-direction: row;
 align-items: flex-end;
`;

const ProfileImage = Styled.Image`
width: 34px;
height: 34px;
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
font-weight: normal;
font-size: 14px;
line-height: 24px;
color: #131F3C;
`;

const CreateAtText = Styled.Text`
font-weight: normal;
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
padding-top: 4px;
`;

const ReportText = Styled.Text`
font-size: 14px;
font-weight: 600;
color: #979797;
`;


const MoreViewContainer = Styled.TouchableOpacity`
top: 4px;
right: 0px;
position: absolute;
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
  userId: any;
  profileImage: string;
  img_thumbNail: string;
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
    img_thumbNail: string,
  ) => void;
}

const CommentItem = ({
  index,
  commentObj,
  userId,
  profileImage,
  img_thumbNail,
  nickname,
  description,
  createdDate,
  clickReply,
  openCommentActionSheet,
  isVisibleReplyButton,
  moveToAnotherProfile,
}: Props) => {
  const userProfile = useSelector((state: any) => state.currentUser.profile);
  const containerRef: any = useRef();
  const [positionY, setPositionY] = useState(0);

  console.log("CommentItem profileImage", profileImage);
  console.log("CommentItem img_thumbNail", img_thumbNail);

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
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Container
        onLayout={() => {
          containerRef.current &&
            containerRef.current.measure((fx, fy, width, height, px, py) => {
              setPositionY(fy);
            });
        }}
        ref={containerRef}>
          <HeaderContainer>
        <TouchableWithoutFeedback
          onPress={() => moveToAnotherProfile(userId, nickname, profileImage, img_thumbNail)}>
          <ProfileImageContainer>
            <ProfileImage
              source={
              img_thumbNail
              ? {uri: img_thumbNail}
              : require('~/Assets/Images/MyPage/default_profileImg.png')
            }
            />
          </ProfileImageContainer>
        </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() =>
                moveToAnotherProfile(userId, nickname, profileImage, img_thumbNail)
              }>
                <NicknameText>{nickname}</NicknameText>
            </TouchableWithoutFeedback>
            <MoreViewContainer
              onPress={() =>
                openCommentActionSheet(userId, nickname, commentObj.id)
              }>
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
                onPress={() => {
                  ReactNativeHapticFeedback.trigger('selection');
                  clickReply(commentObj, nickname, index, positionY);
                }}>
                <ReplyContainer>
                  <PointDivider />
                  <ReplyText>{'답글달기'}</ReplyText>
                </ReplyContainer>
              </TouchableWithoutFeedback>
            )}
          </FooterContainer>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default CommentItem;
