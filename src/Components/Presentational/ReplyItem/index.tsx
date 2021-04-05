import React, {useEffect, useRef, useState, useCallback} from 'react';
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
 padding: 12px 0px 12px 60px;
 background: #FFFFFF;
`;

const ProfileImageContainer = Styled.View`
margin-right: 8px;
`;

const HeaderContainer = Styled.View`
align-items: center;
flex-direction: row;
`;


const BodyContainer = Styled.View`
padding-left: ${wp('7.46%') + 8}px;
margin-top: -6px;
`;

const FooterContainer = Styled.View`
padding-left: ${wp('7.46%') + 8}px;
flex-direction: row;
align-items: flex-end;
`;

const ProfileImage = Styled.Image`
width: ${wp('7.46%')}px;
height: ${wp('7.46%')}px;
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
line-height: 16px;
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
padding-top: 4px;
align-items: center;
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

const TargetUserText = Styled.Text`
font-size: 14px;
line-height: 24px;
color: #00D1FF;
`;

interface Props {
  index: number;
  replyObj: any;
  commentObj: any;
  userId: any;
  profileImage: string;
  img_thumbNail: string;
  nickname: string;
  description: string;
  createdDate: string;
  clickReply: (
    commentObj: any,
    nickname: string,
    index: number,
    positionY: number,
  ) => void;
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

const ReplyItem = ({
  index,
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
  replyObj,
  commentObj,
}: Props) => {

  console.log('comment', replyObj)
  const userProfile = useSelector((state: any) => state.currentUser.profile);
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

    const elapsedMin = replyObj['createdDiff(second)'] / 60;
    const elapsedHour = replyObj['createdDiff(second)'] / 3600;
    const elapsedDay = replyObj['createdDiff(second)'] / 86400;

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
        ref={containerRef}
        onLayout={(e) => {
          containerRef.current &&
            containerRef.current.measure((fx, fy, width, height, px, py) => {
              console.log('reply', description, fx, fy, width, height, px, py);
              setPositionY(fy);
            });
        }}>
          <HeaderContainer>
        <TouchableWithoutFeedback
          onPress={() => moveToAnotherProfile(userId, nickname, profileImage)}>
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
                moveToAnotherProfile(userId, nickname, profileImage)
              }>
              <HeaderLeftContainer>
                <NicknameText>{nickname}</NicknameText>
              </HeaderLeftContainer>
            </TouchableWithoutFeedback>
            <MoreViewContainer
              onPress={() =>
                openCommentActionSheet(userId, nickname, replyObj.id)
              }>
              <MoreViewIcon
                source={require('~/Assets/Images/Comment/ic_moreView.png')}
              />
            </MoreViewContainer>
          </HeaderContainer>
          <BodyContainer>
            <CommentDescripText>
              <TargetUserText>{`@${replyObj.targetUserNickname} `}</TargetUserText>
              {description}
            </CommentDescripText>
          </BodyContainer>
          <FooterContainer>
            <CreateAtText>
              {getElapsedTime(replyObj['createdDiff(second)'])}
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

export default ReplyItem;
