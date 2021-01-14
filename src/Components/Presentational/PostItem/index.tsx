import React, {useMemo, useCallback, useRef, useState} from 'react';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  Image,
  Animated,
  Easing,
} from 'react-native';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ContainerView = Styled.View`
width: ${wp('100%')}px;
height: auto;
margin-bottom: 8px;
background: #FFFFFF;
`;

const BodyContainerView = Styled.View`
display: flex;
width: 100%;
padding: 9px 16px 0px 16px;
`;

const ProfileContainerView = Styled.View`
width: auto;
height: auto;
margin-right: auto;
flex-direction: row;
align-items: center;
padding: 12px 0px;
`;

const HashTagContainerView = Styled.View`
width: 100%;
height: auto;
padding: 0px 16px;
flex-direction: row;
`;

const HashTagIconView = Styled(TouchableOpacity as new () => TouchableOpacity)`
width: auto;
height: auto;
flex-direction: row;
align-items: center;
margin: 8px 8px 0px 0px;
padding: 4px 12px;
border-radius: 100px;
background-color: #F5F7F9;
`;
const HashTagIconText = Styled.Text`
font-family: NanumSquare;
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 24px;
text-align: center;
color: #9AA2A9;
`;
// View => Image when ready
const ProfileImage = Styled.Image<{source: any}>`
width: ${wp('8.8%')}px;
height: ${wp('8.8%')}px;
background-color: grey;
border-width: 0.5px
border-color: #E2E6ED;
border-radius: 12px;
`;
// width, height ++ 4px
const ProfileContentView = Styled.View`
width: auto;
height: auto;
flex-direction: row;
align-items: center;
padding-left: 8px;
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
// font-size, line-height ++ 1px
const ContentView = Styled.View`
width: 100%;
height: auto;
background: white;
margin: 4px;
`;

const ContentText = Styled.Text`
font-family: NanumSquareR;
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 24px;
`;

const ImageContainerView = Styled.View`
margin: 12px 16px 0px 16px;
width: auto;
height: auto;
`;
const ImageFlatList = Styled(FlatList as new () => FlatList)`
width: 100%;
height: auto;
overflow: visible;
`;
const ImageView = Styled.Image<{source: any}>`
width: 120px;
height: 120px;
background-color: grey;
border-radius: 8px;
margin: 0px 4px;
`;
const SocialInfoContainerView = Styled.View`
width: auto;
height: 60px;
align-items: center;
flex-direction: row;
padding: 0px 16px;
`;

const SocialInfoContentView = Styled.View`
min-width: 64px;
`;

const SocialInfoView = Styled.View`
width: auto;
height: 44px;
margin-right: auto;
padding: 0px 4px;
flex-direction: row;
align-items: center;
`;
const SocialInfoText = Styled.Text`
font-family: NanumSquare;
font-style: normal;
font-weight: bold;
font-size: 14px;
line-height: 24px;
margin-left: 4px;
`;
const HashTagText = Styled.Text`
  color: #0075FF;
`;
interface Props {
  data: any;
  moveToCommunityDetail: any;
  moveToAnotherProfile: any;
  toggleSocialLike: any;
  toggleSocialScrap: any;
}

const PostItem = ({
  data,
  moveToCommunityDetail,
  moveToAnotherProfile,
  toggleSocialLike,
  toggleSocialScrap,
}: Props) => {
  const {
    id,
    type,
    createdAt,
    updatedAt,
    description,
    postLikeNum,
    postCommentsNum,
    viewerLikeCommunityPost,
    viewerScrapCommunityPost,
    user,
    Clinics,
    GeneralTags,
    SymptomItems,
    TreatmentItems,
    CityTags,
    community_imgs,
  } = data;

  const likeButtonScale = useRef(new Animated.Value(1)).current;
  const scrapButtonScale = useRef(new Animated.Value(1)).current;

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

  const memoDescription = useMemo(() => formatDescription(description), [
    description,
  ]);

  const renderImage = useCallback(
    ({item, index}: any) => (
      <TouchableWithoutFeedback
        onPress={() => {
          moveToCommunityDetail(id, type);
        }}>
        <ImageView
          key={'image' + index}
          source={{
            url: item.img_url,
            cache: 'force-cache',
          }}
        />
      </TouchableWithoutFeedback>
    ),
    [],
  );

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        moveToCommunityDetail(id, type);
      }}>
      <ContainerView>
        <BodyContainerView>
          <TouchableWithoutFeedback
            onPress={() => {
              moveToAnotherProfile();
            }}>
            <ProfileContainerView>
              <ProfileImage
                source={
                  user.profileImg
                    ? {
                        uri: user.profileImg,
                        cache: 'force-cache',
                      }
                    : require('~/Assets/Images/appIcon_chika.png')
                }
              />
              <ProfileContentView>
                <ProfileNameText>{user.nickname}</ProfileNameText>
                <ProfileSplitView />
                <ProfileDescriptionText>
                  {formatElapsedDate(data['createdDiff(second)'] * 1000) +
                    (updatedAt !== createdAt ? ' ･ 수정됨' : '')}
                </ProfileDescriptionText>
              </ProfileContentView>
            </ProfileContainerView>
          </TouchableWithoutFeedback>

          <ContentView>
            <ContentText numberOfLines={2}>{memoDescription}</ContentText>
          </ContentView>
        </BodyContainerView>

        {community_imgs.length > 0 ? (
          <ImageContainerView>
            <ImageFlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              alwaysBounceHorizontal={false}
              data={community_imgs}
              keyExtractor={(item) => String(item.id)}
              snapToInterval={128}
              renderItem={renderImage}
            />
          </ImageContainerView>
        ) : null}
        <HashTagContainerView>
          {Clinics.map((item: any) => (
            <HashTagIconView key={String(item.id)}>
              <HashTagIconText>{item.name}</HashTagIconText>
            </HashTagIconView>
          ))}
          {GeneralTags.map((item: any) => (
            <HashTagIconView key={String(item.id)}>
              <HashTagIconText>{item.name}</HashTagIconText>
            </HashTagIconView>
          ))}
          {SymptomItems.map((item: any) => (
            <HashTagIconView key={String(item.id)}>
              <HashTagIconText>{item.name}</HashTagIconText>
            </HashTagIconView>
          ))}
          {TreatmentItems.map((item: any) => (
            <HashTagIconView key={String(item.id)}>
              <HashTagIconText>{item.name}</HashTagIconText>
            </HashTagIconView>
          ))}
          {CityTags.map((item: any) => (
            <HashTagIconView key={String(item.id)}>
              <HashTagIconText>{item.fullCityName}</HashTagIconText>
            </HashTagIconView>
          ))}
        </HashTagContainerView>

        <SocialInfoContainerView>
          <SocialInfoContentView>
            <TouchableWithoutFeedback
              onPress={() => {
                toggleSocialLike(id, viewerLikeCommunityPost, type);
                likeButtonScale.setValue(0.8);
                Animated.spring(likeButtonScale, {
                  toValue: 1,
                  friction: 8,
                  tension: 300,
                  useNativeDriver: true,
                }).start();
              }}>
              <SocialInfoView>
                <Animated.Image
                  style={{
                    width: 18,
                    height: 18,
                    transform: [{scale: likeButtonScale}],
                  }}
                  source={
                    viewerLikeCommunityPost
                      ? require('~/Assets/Images/Social/ic/like/focus.png')
                      : require('~/Assets/Images/Social/ic/like/unfocus.png')
                  }
                />
                <SocialInfoText>{postLikeNum}</SocialInfoText>
              </SocialInfoView>
            </TouchableWithoutFeedback>
          </SocialInfoContentView>
          <SocialInfoContentView>
            <TouchableWithoutFeedback>
              <SocialInfoView>
                <Image
                  style={{
                    width: 18,
                    height: 18,
                  }}
                  source={require('~/Assets/Images/Social/ic/comment/unfocus.png')}
                />
                <SocialInfoText>{postCommentsNum}</SocialInfoText>
              </SocialInfoView>
            </TouchableWithoutFeedback>
          </SocialInfoContentView>

          <TouchableWithoutFeedback
            onPress={() => {
              toggleSocialScrap(id, viewerScrapCommunityPost, type);
              scrapButtonScale.setValue(0.8);
              Animated.spring(scrapButtonScale, {
                toValue: 1,
                friction: 8,
                tension: 300,
                useNativeDriver: true,
              }).start();
            }}>
            <SocialInfoView style={{marginLeft: 'auto', marginRight: 0}}>
              <Animated.Image
                style={{
                  width: 18,
                  height: 18,
                  transform: [{scale: scrapButtonScale}],
                }}
                source={
                  viewerScrapCommunityPost
                    ? require('~/Assets/Images/Social/ic/bookmark/focus.png')
                    : require('~/Assets/Images/Social/ic/bookmark/unfocus.png')
                }
              />
              <SocialInfoText>{'저장하기'}</SocialInfoText>
            </SocialInfoView>
          </TouchableWithoutFeedback>
        </SocialInfoContainerView>
      </ContainerView>
    </TouchableWithoutFeedback>
  );
};

export default React.memo(PostItem);
