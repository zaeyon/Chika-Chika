import React, {useMemo, useEffect, useCallback, useRef, useState} from 'react';
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
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

const ContainerView = Styled.View`
width: ${wp('100%')}px;
height: auto;
margin-bottom: 8px;
background: #FFFFFF;
`;

const BodyContainerView = Styled.View`
display: flex;
width: 100%;
padding: 16px 16px 0px 16px;
`;

const ProfileContainerView = Styled.View`
width: auto;
height: auto;
margin-right: auto;
flex-direction: row;
align-items: center;
padding: 8px 0px 6px 0px;
`;

const HashTagContainerView = Styled.View`
width: 100%;
height: auto;
padding-left: 2px;
margin: 6px 0px;
flex-direction: row;
`;

const HashTagIconView = Styled.TouchableOpacity`
width: auto;
height: auto;
flex-direction: row;
align-items: center;
padding: 6px 10px;
margin-right: 8px;
border-radius: 4px;
background-color: #F5F7F9;
`;
const HashTagIconText = Styled.Text`
font-style: normal;
font-weight: 500;
font-size: 13px;
line-height: 16px;
text-align: center;
color: #4E525D;
`;
// View => Image when ready
const ProfileImage = Styled.Image<{source: any}>`
width: ${wp('7.46')}px;
 height: ${wp('7.46%')}px;
background-color: grey;
border-width: 0.5px
border-color: #E2E6ED;
border-radius: 100px;
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
font-style: normal;
font-weight: 600;
font-size: 15px;
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
font-size: 13px;
color: #9AA2A9;

`;
// font-size, line-height ++ 1px
const ContentView = Styled.View`
width: 100%;
height: auto;
margin: 6px 2px;
`;

const ContentText = Styled.Text`
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 24px;
`;

const ImageContainerView = Styled.View`
width: auto;
height: auto;
margin: 6px 0px;
`;
const ImageFlatList = Styled.FlatList`
width: 100%;
height: auto;
overflow: visible;
`;
const ImageView = Styled.Image<{source: any}>`
width: 124px;
height: 124px;
background-color: #F5F7F9;
border-radius: 8px;
border-color: #F5F7F9;
border-width: 1px;
`;

const ImageSeperatorView = Styled.View`
width: 4px;
height: 100%;
`;
const SocialInfoContainerView = Styled.View`
width: auto;

align-items: center;
flex-direction: row;
margin-top: 6px;
padding: 6px 16px;
`;
const SocialInfoContentView = Styled.View`
min-width: 60px;
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
font-style: normal;
font-weight: normal;
font-size: 13px;
line-height: 16px;
margin-left: 4px;
color: #000000;
`;
const HashTagHighlightText = Styled.Text`
  color: #00D1FF;
`;

const HashTagText = Styled.Text`
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 16px;
color: #9AA2A9;
margin-right: 4px;
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
    userId,
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

  const [isLiked, setIsLiked] = useState(viewerLikeCommunityPost);
  const [isScraped, setIsScraped] = useState(viewerScrapCommunityPost);

  useEffect(() => {
    setIsLiked(viewerLikeCommunityPost);
    setIsScraped(viewerScrapCommunityPost);
  }, [viewerLikeCommunityPost, viewerScrapCommunityPost]);

  const formatElapsedDate = useCallback(
    (elapsedTime: number, createdAt: string) => {
      if (elapsedTime / (24 * 3600 * 1000) > 1) {
        return formatDate(createdAt);
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
    },
    [],
  );

  const formatDate = useCallback((createdAt: string) => {
    const currentYear = new Date(Date.now()).getFullYear();

    const [date, time] = createdAt.split(' ');
    const [year, month, day] = date.split('-');

    if (String(currentYear) === year) {
      return parseInt(month) + '월 ' + parseInt(day) + '일';
    } else {
      return year + '년 ' + parseInt(month) + '월 ' + parseInt(day) + '일';
    }
  }, []);

  const formatHashTag = useCallback((text: string, index: number) => {
    return (
      <TouchableWithoutFeedback key={text + index}>
        <HashTagHighlightText>{'#' + text}</HashTagHighlightText>
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
          console.log(item);
        }}>
        <ImageView
          key={'image' + index}
          source={{
            url: item.img_thumbNail,
            cache: 'force-cache',
          }}
        />
      </TouchableWithoutFeedback>
    ),
    [],
  );

  const renderHashTag = useCallback(() => {
    if (
      Clinics.length +
        GeneralTags.length +
        SymptomItems.length +
        TreatmentItems.length +
        CityTags.length ===
      0
    ) {
      return null;
    } else {
      const renderItem = (item: any) => (
        <HashTagIconView key={String(item.id)}>
          <HashTagText>{'#'}</HashTagText>
          <HashTagIconText>{item.name || item.emdName}</HashTagIconText>
        </HashTagIconView>
      );

      const result = [
        Clinics,
        GeneralTags,
        SymptomItems,
        TreatmentItems,
        CityTags,
      ].map((item) => item.map(renderItem));
      return <HashTagContainerView>{result}</HashTagContainerView>;
    }
  }, [Clinics, GeneralTags, SymptomItems, TreatmentItems, CityTags]);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        moveToCommunityDetail(id, type);
      }}>
      <ContainerView>
        <BodyContainerView>
          <TouchableWithoutFeedback
            onPress={() => {
              moveToAnotherProfile(userId, user?.nickname, user?.img_thumbNail);
            }}>
            <ProfileContainerView>
              <ProfileImage
                source={
                  user.img_thumbNail
                    ? {
                        uri: user.img_thumbNail,
                        cache: 'force-cache',
                      }
                    : user.profileImg
                    ? {
                        uri: user.profileImg,
                        cache: 'force-cache',
                      }
                    : require('~/Assets/Images/appIcon_chika.png')
                }
              />
              <ProfileContentView>
                <ProfileNameText>{user?.nickname}</ProfileNameText>
                <ProfileDescriptionText>
                  {formatElapsedDate(
                    data['createdDiff(second)'] * 1000,
                    createdAt,
                  ) + (updatedAt !== createdAt ? ' ･ 수정됨' : '')}
                </ProfileDescriptionText>
              </ProfileContentView>
            </ProfileContainerView>
          </TouchableWithoutFeedback>

          {renderHashTag()}
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
                ItemSeparatorComponent={() => <ImageSeperatorView />}
              />
            </ImageContainerView>
          ) : null}
          {description ? (
            <ContentView>
              <ContentText numberOfLines={2}>{memoDescription}</ContentText>
            </ContentView>
          ) : null}
        </BodyContainerView>

        <SocialInfoContainerView>
          <SocialInfoContentView>
            <TouchableWithoutFeedback
              onPress={() => {
                toggleSocialLike(id, viewerLikeCommunityPost, type);
                setIsLiked((prev) => !prev);
                if (!viewerLikeCommunityPost) {
                  ReactNativeHapticFeedback.trigger('impactLight');
                }
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
                    width: 24,
                    height: 24,
                    transform: [{scale: likeButtonScale}],
                  }}
                  source={
                    isLiked
                      ? require('~/Assets/Images/Community/bottomBar/like/focus.png')
                      : require('~/Assets/Images/Community/bottomBar/like/unfocus.png')
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
                    width: 24,
                    height: 24,
                  }}
                  source={require('~/Assets/Images/Community/bottomBar/comment.png')}
                />
                <SocialInfoText>{postCommentsNum}</SocialInfoText>
              </SocialInfoView>
            </TouchableWithoutFeedback>
          </SocialInfoContentView>

          <TouchableWithoutFeedback
            onPress={() => {
              toggleSocialScrap(id, viewerScrapCommunityPost, type);
              setIsScraped((prev) => !prev);
              if (!viewerScrapCommunityPost) {
                ReactNativeHapticFeedback.trigger('impactLight');
              }
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
                  width: 24,
                  height: 24,
                  transform: [{scale: scrapButtonScale}],
                }}
                source={
                  isScraped
                    ? require('~/Assets/Images/Community/bottomBar/scrap/focus.png')
                    : require('~/Assets/Images/Community/bottomBar/scrap/unfocus.png')
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
