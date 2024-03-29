import React, {useCallback, useRef} from 'react';
import {TouchableWithoutFeedback, Animated} from 'react-native';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ContainerView = Styled.View`
width: ${wp('79%')}px;
height: 152px;
margin-right: 16px;
padding: 16px;
background: #FFFFFF;
box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
border-radius: 8px;
`;
// border: 0.5px #E2E6ED;

const ProfileContainerView = Styled.View`
width: 100%;
flex-direction: row;
align-items: center;
margin-bottom: 12px;
`;
const ProfileImage = Styled.Image<{source: any}>`
width: 28px;
height: 28px;
background-color: grey;
border-width: 0.5px
border-color: #E2E6ED;
border-radius: 100px;
margin-right: 8px;
`;
const ProfileNameText = Styled.Text`
line-height: 16px;
font-style: normal;
font-weight: 600;
font-size: 13.5px;
margin-right: 4px;
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
font-style: normal;
font-weight: normal;
font-size: 13.5px;
line-height: 16px;
color: #9AA2A9;
`;

const ContentView = Styled.View`
width: 100%;
height: auto;
margin-bottom: 16px;
background: #FFFFFF;
`;

const ContentText = Styled.Text`
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 24px;
`;

const HashTagText = Styled.Text`
  color: #00D1FF;
`;

const SocialInfoContainerView = Styled.View`
width: 100%;
flex-direction: row;
margin-top: auto;
background: #FFFFFF;
`;

const SocialInfoText = Styled.Text`
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
  const viewScale = useRef(new Animated.Value(1)).current;

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

  const formatDate = useCallback((updatedAt: string) => {
    // const tmpDate = new Date(date);
    // console.log(tmpDate);
    const currentYear = new Date(Date.now()).getFullYear();
    // let year = tmpDate.getFullYear(),
    //   month = String(tmpDate.getMonth() + 1),
    //   day = String(tmpDate.getDay());
    const [date, time] = updatedAt.split(' ');
    const [year, month, day] = date.split('-');
    // month = Number(month) >= 10 ? month : '0' + month;
    // day = Number(day) >= 10 ? day : '0' + day;
    if (String(currentYear) === year) {
      return parseInt(month) + '월 ' + parseInt(day) + '일';
    } else {
      return year + '년 ' + parseInt(month) + '월 ' + parseInt(day) + '일';
    }
  }, []);

  const formatHashTag = useCallback((text: string, index: number) => {
    return <HashTagText key={text + index}>{'#' + text}</HashTagText>;
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
    <TouchableWithoutFeedback
      onPressIn={() => {
        Animated.spring(viewScale, {
          toValue: 0.95,
          friction: 9,
          tension: 78,
          useNativeDriver: true,
        }).start();
      }}
      onPressOut={() => {
        Animated.spring(viewScale, {
          toValue: 1,
          friction: 9,
          tension: 78,
          useNativeDriver: true,
        }).start();
      }}
      onPress={() => moveToCommunityDetail(id, type)}>
      <ContainerView
        as={Animated.View}
        style={{
          transform: [
            {
              scale: viewScale,
            },
          ],
        }}>
        <ProfileContainerView>
          <ProfileImage
            source={
              user.img_thumbNail
                ? {
                    url: user.img_thumbNail,
                    cache: 'force-cache',
                  }
                : user.profileImg
                ? {
                    url: user.profileImg,
                    cache: 'force-cache',
                  }
                : require('~/Assets/Images/MyPage/default_profileImg.png')
            }
          />
          <ProfileNameText>{user.nickname}</ProfileNameText>
          <ProfileDescriptionText>
            {formatElapsedDate(postData['createdDiff(second)'] * 1000) +
              (updatedAt !== createdAt ? ' ･ 수정됨' : '')}
          </ProfileDescriptionText>
        </ProfileContainerView>
        <ContentView>
          <ContentText numberOfLines={2}>
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
