import React, {useMemo, useCallback, useEffect, useState} from 'react';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  Text,
  View,
  Image,
  LayoutAnimation,
} from 'react-native';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ContainerView = Styled.View`
width: ${wp('100%')}px;
height: auto;
padding-top: 24px;
background: #FFFFFF;
`;

const BodyContainerView = Styled.View`
display: flex;
width: 100%;
padding: 0px 16px;
`;

const ProfileContainerView = Styled.View`
width: 100%;
height: auto;
margin-right: auto;
flex-direction: row;
align-items: center;
padding: 8px 0px;
`;

const HashTagContainerView = Styled.View`
width: 100%;
height: auto;
padding: 0px 16px;
flex-direction: row;
flex-wrap: wrap;
margin-top: 4px;
`;

const HashTagIconView = Styled(TouchableOpacity as new () => TouchableOpacity)`
width: auto;
height: auto;
flex-direction: row;
align-items: center;
margin: 4px 8px 4px 0px;
padding: 8px;
border: 1px solid #C4C4C4;
border-radius: 4px;
background-color: #C4C4C4;
color: '#rgb(0, 0, 0)'
`;
const HashTagIconText = Styled.Text`
font-family: NanumSquare;
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 16px;
`;
// View => Image when ready
const ProfileImage = Styled.Image<{source: any}>`
width: 44px;
height: 44px;
background-color: grey;
border-radius: 22px;
`;
// width, height ++ 4px
const ProfileContentView = Styled.View`
width: auto;
height: auto;
padding-left: 8px;
`;
const ProfileNameText = Styled.Text`
font-family: NanumSquareR;
font-style: normal;
font-weight: bold;
font-size: 15px;
line-height: 17px;
margin-bottom: 4px;
`;
// font-size, line-height ++ 1px
const ProfileDescriptionText = Styled.Text`
font-family: NanumSquareR;
font-style: normal;
font-weight: normal;
font-size: 13px;
line-height: 15px;
color: #979797;
`;
// font-size, line-height ++ 1px
const ContentView = Styled.View`
width: 100%;
height: auto;
background: white;
margin: 8px 0px;
`;

const ContentText = Styled.Text`
font-family: NanumSquareR;
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 24px;
`;

const ImageContainerView = Styled.View`
margin-top: 4px;
margin-right: auto;
width: 100%;
height: auto;
`;
const ImageFlatList = Styled(FlatList as new () => FlatList)`
width: 100%;
height: auto;
`;
const ImageView = Styled.Image<{isFirst: number; source: any}>`
width: 130px;
height: 130px;
background-color: grey;
border-radius: 4px;
margin-right: 5px;
margin-left: ${(props) => (props.isFirst ? '0px' : '16px')}
`;
const SocialInfoContainerView = Styled.View`
width: ${wp('100%')}px;
height: 57px;
align-items: center;
flex-direction: row;
margin-top: 4px;
border-bottom-width: 1px;
border-color: #ECECEC;
`;
const SocialInfoView = Styled.View`
flex-direction: row;
display: flex;
height: 24px;
align-items: center;
padding: 0px;
justify-content: space-between;
`;
const SocialInfoText = Styled.Text`
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 16px;
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
    user,
    Clinics,
    GeneralTags,
    SymptomItems,
    TreatmentItems,
    community_imgs,
  } = data;

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

  const formatHashTag = (text: string, index: number) => {
    return (
      <TouchableWithoutFeedback key={text + index}>
        <HashTagText>{'#' + text}</HashTagText>
      </TouchableWithoutFeedback>
    );
  };
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
        key={'TouchableImage' + index}
        onPress={() => {
          moveToCommunityDetail(id, type);
        }}>
        <ImageView
          isFirst={index}
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
              renderItem={renderImage}
            />
          </ImageContainerView>
        ) : null}
        <HashTagContainerView>
          {Clinics.map((item: any) => (
            <HashTagIconView key={String(item.id)}>
              <HashTagIconText>{'#' + item.name}</HashTagIconText>
            </HashTagIconView>
          ))}
          {GeneralTags.map((item: any) => (
            <HashTagIconView key={String(item.id)}>
              <HashTagIconText>{'#' + item.name}</HashTagIconText>
            </HashTagIconView>
          ))}
          {SymptomItems.map((item: any) => (
            <HashTagIconView key={String(item.id)}>
              <HashTagIconText>{'#' + item.name}</HashTagIconText>
            </HashTagIconView>
          ))}
          {TreatmentItems.map((item: any) => (
            <HashTagIconView key={String(item.id)}>
              <HashTagIconText>{'#' + item.name}</HashTagIconText>
            </HashTagIconView>
          ))}
        </HashTagContainerView>

        <SocialInfoContainerView>
          <TouchableOpacity
            style={{
              marginHorizontal: 16,
            }}
            onPress={() => {
              toggleSocialLike(id, viewerLikeCommunityPost, type);
            }}>
            <SocialInfoView>
              <Image
                style={{
                  tintColor: viewerLikeCommunityPost ? '#FF5656' : '#c3c3c3',
                }}
                source={require('~/Assets/Images/Review/ic_like_inline.png')}
              />
              <SocialInfoText>{postLikeNum}</SocialInfoText>
            </SocialInfoView>
          </TouchableOpacity>

          <SocialInfoView>
            <Image
              source={require('~/Assets/Images/Review/ic_comment_inline.png')}
            />
            <SocialInfoText>{postCommentsNum}</SocialInfoText>
          </SocialInfoView>

          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 16,
            }}
            onPress={() => {
              toggleSocialScrap();
            }}>
            <SocialInfoView>
              <Image
                source={require('~/Assets/Images/Review/ic_scrap_inline.png')}
              />
            </SocialInfoView>
          </TouchableOpacity>
        </SocialInfoContainerView>
      </ContainerView>
    </TouchableWithoutFeedback>
  );
};

export default React.memo(PostItem);
