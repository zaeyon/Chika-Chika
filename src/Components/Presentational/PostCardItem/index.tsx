import React, {useCallback} from 'react';
import {TouchableWithoutFeedback, FlatList} from 'react-native';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ContainerView = Styled.View`
width: ${wp('76%')}px;
height: 100%;
margin-right: 16px;
padding: 16px;
background: #FFFFFF;
border: 0.5px solid #E2E6ED;
box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.05);
border-radius: 8px;
`;

const ProfileContainerView = Styled.View`
width: 100%;
flex-direction: row;
align-items: center;
margin-bottom: 12px;
`;
const ProfileImage = Styled.Image<{source: any}>`
width: ${wp('8.8%')}px;
height: ${wp('8.8%')}px;
background-color: grey;
border-width: 0.5px
border-color: #E2E6ED;
border-radius: 12px;
margin-right: 8px;
`;
const ProfileNameText = Styled.Text`
font-family: NanumSquareR;
font-style: normal;
font-weight: bold;
font-size: 14px;
`;

const ProfileSplitView = Styled.View`
width: 2px;
height: 2px;
background: #9AA2A9;
border-radius: 2px;
margin: 0px 6px;
`;
// font-size, line-height ++ 1px
const ProfileDescriptionText = Styled.Text`
font-family: NanumSquareR;
font-style: normal;
font-weight: bold;
font-size: 14px;
color: #9AA2A9;
`;

const ContentView = Styled.View`
width: 100%;
height: auto;
background: #FFFFFF;
`;

const ContentText = Styled.Text`
font-family: NanumSquareR;
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 24px;
`;

const HashTagText = Styled.Text`
  color: #0075FF;
`;

const SocialInfoContainerView = Styled.View`
width: 100%;
flex-direction: row;
margin-top: auto;
background: #FFFFFF;
`;

const SocialInfoText = Styled.Text`
font-family: NanumSquare;
font-style: normal;
font-weight: normal;
font-size: 12px;
line-height: 16px;
color: #9AA2A9;
margin-right: 12px;
`;

const PostCardItem = ({
  postData,
  moveToCommunityDetail,
  moveToAnotherProfile,
}: any) => {
  const {
    id,
    type,
    user,
    updatedAt,
    createdAt,
    description,
    postLikeNum,
    postCommentsNum,
  } = postData;

  const formatElapsedDate = useCallback((elapsedTime: number) => {
    if (elapsedTime / (24 * 3600 * 1000) > 1) {
      return formatDate(updatedAt);
    }
    if (elapsedTime / (24 * 3600 * 1000) >= 1) {
      // in days
      const day = Math.floor(elapsedTime / (24 * 3600 * 1000));
      return `${day}일 전`;
    } else if (elapsedTime / (3600 * 1000) >= 1) {
      // in hours
      const hour = Math.floor(elapsedTime / (3600 * 1000));
      return `${hour}시간 전`;
    } else if (elapsedTime / (60 * 1000) >= 1) {
      // in minutes
      const minute = Math.floor(elapsedTime / (60 * 1000));
      return `${minute}분 전`;
    } else {
      // in seconds
      const second = Math.floor(elapsedTime / 1000);
      return `${second}초 전`;
    }
  }, []);

  const formatDate = useCallback((date: string) => {
    const tmpDate = new Date(date);
    let year = tmpDate.getFullYear(),
      month = String(tmpDate.getMonth() + 1),
      day = String(tmpDate.getDay());
    month = Number(month) >= 10 ? month : '0' + month;
    day = Number(day) >= 10 ? day : '0' + day;
    return year + '년 ' + month + '월 ' + day + '일';
  }, []);

  const formatHashTag = useCallback((text: string, index: number) => {
    return (
      <TouchableWithoutFeedback key={text + index}>
        <HashTagText>{'#' + text}</HashTagText>
      </TouchableWithoutFeedback>
    );
  }, []);

  const formatDescription = useCallback((oldDescription: string) => {
    let formattedDescription: any[] = [];
    const lines = oldDescription.split(/\r\n|\r|\n/);
    for (let line of lines) {
      let formattedLine = [];
      const words = line.split(' ');
      for (let word of words) {
        if (
          word.charAt(0) === '{' &&
          word.charAt(1) === '{' &&
          word.charAt(word.length - 1) === '}' &&
          word.charAt(word.length - 2) === '}'
        ) {
          //isTag
          const formattedHashTag = formatHashTag(
            word.slice(2, word.length - 2),
            formattedLine.length,
          );
          formattedLine.push(formattedHashTag);
        } else {
          formattedLine.push(word);
        }
        if (words.indexOf(word) !== words.length - 1) {
          formattedLine.push(' ');
        }
      }
      if (lines.indexOf(line) !== lines.length - 1) {
        formattedDescription = formattedDescription.concat(
          formattedLine,
          '\r\n',
        );
      } else {
        formattedDescription = formattedDescription.concat(formattedLine);
      }
    }
    return formattedDescription;
    // let description = oldDescription.replace(/{{/gi, '#');
    // description = description.replace(/}}/gi, '');
    // return description;
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => moveToCommunityDetail(id, type)}>
      <ContainerView>
        <ProfileContainerView>
          <ProfileImage
            source={
              user.profileImg
                ? {url: user.profileImg, cache: 'force-cache'}
                : require('~/Assets/Images/appIcon_chika.png')
            }
          />
          <ProfileNameText>{user.nickname}</ProfileNameText>
          <ProfileSplitView />
          <ProfileDescriptionText>
            {formatElapsedDate(postData['createdDiff(second)'] * 1000) +
              (updatedAt !== createdAt ? ' ･ 수정됨' : '')}
          </ProfileDescriptionText>
        </ProfileContainerView>
        <ContentView>
          <ContentText numberOfLines={3}>
            {formatDescription(description)}
          </ContentText>
        </ContentView>
        <SocialInfoContainerView>
          <SocialInfoText>{`좋아요 ${postLikeNum}개`}</SocialInfoText>
          <SocialInfoText>{`댓글 ${postCommentsNum}개`}</SocialInfoText>
        </SocialInfoContainerView>
      </ContainerView>
    </TouchableWithoutFeedback>
  );
};

export default React.memo(PostCardItem);
