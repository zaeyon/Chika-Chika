import React, {useMemo, useCallback, useEffect, useState} from 'react';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  Text,
  View,
  Image,
} from 'react-native';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SharedElement} from 'react-navigation-shared-element';
import FastImage from 'react-native-fast-image';

const ContainerView = Styled.View`
width: ${wp('100%')}px;
height: auto;
padding-top: 22px;
padding-bottom: 16px;
background-color: #FFFFFF;
border-bottom-width: 1px;
border-color: #E2E6ED;
`;

const BodyContainerView = Styled.View`
display: flex;
width: 100%;
padding: 0px 16px;

`;

const ProfileContainerView = Styled.View`
width: auto;
height: auto;
margin-right: auto;
flex-direction: row;
align-items: center;
margin-bottom: 8px;
`;

const HashTagContainerView = Styled.View`
width: 100%;
height: auto;
padding: 0px 16px;
flex-direction: row;
flex-wrap: wrap;
margin: 4px 0px;
`;

const HashTagIconView = Styled(TouchableOpacity as new () => TouchableOpacity)`
width: auto;
height: auto;
flex-direction: row;
align-items: center;
margin: 4px 8px 4px 0px;
padding: 8px;
border: 1px  #C4C4C4;
border-radius: 4px;
background-color: #C4C4C4;
color: '#rgb(0, 0, 0)'
`;
const HashTagIconText = Styled.Text`
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 16px;
`;

const ProfileImage = Styled.Image<{source: any}>`
width: 40px;
height: 40px;
background-color: #C4C4C4;
border-width: 0.5px;
border-color: #9AA2A9;
border-radius: 100px;
`;

const ProfileContentView = Styled.View`
width: auto;
height: auto;
padding-left: 8px;
`;
const ProfileNameText = Styled.Text`
font-style: normal;
font-weight: 600;
font-size: 15px;
line-height: 16px;
margin-bottom: 2px;
color: #131F3C;
`;

const ProfileDescriptionText = Styled.Text`
font-style: normal;
font-weight: normal;

font-size: 13px;
color: #9AA2A9;
`;

const ContentView = Styled.View`
width: 100%;
height: auto;
background: white;
margin: 8px 0px;
`;

const ContentText = Styled.Text`
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 24px;
color: #131F3C;
`;

const ImageContainerView = Styled.View`
width: auto;
height: auto;
margin: 8px 0px;
`;
const ImageFlatList = Styled.FlatList`
width: 100%;
height: auto;
overflow: visible;
`;

const ImageSeperatorView = Styled.View`
width: 4px;
height: 100%;
`;

const SocialInfoContainerView = Styled.View`
width: ${wp('100%')}px;
height: 56px;
align-items: center;
flex-direction: row;
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
  color: #00D1FF;
`;

interface Props {
  moveToAnotherProfile: any;
  moveToImageDetail: any;
  data: any;
}

const PostContent = ({
  data,
  moveToImageDetail,
  moveToAnotherProfile,
}: Props) => {
  const {
    userId,
    user,
    createdAt,
    updatedAt,
    description,
    Clinics,
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
      return `${hour}시간전`;
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
          console.log(`item.${item.img_url}`);
          moveToImageDetail(community_imgs, item.img_url);
        }}>
        {/* <ImageView
            isFirst={index}
            key={'image' + index}
            style={{
              resizeMode: 'cover',
            }}
            source={{
              url: item.img_url,
              cache: 'force-cache',
            }}
          /> */}
        <FastImage
          key={'image' + index}
          style={{
            width: 124,
            height: 124,
            backgroundColor: '#F5F7F9',
            borderRadius: 8,
          }}
          source={{
            uri: item.img_url,
            priority: FastImage.priority.normal,
            cache: FastImage.cacheControl.immutable,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </TouchableWithoutFeedback>
    ),
    [community_imgs],
  );

  return (
    <ContainerView>
      <BodyContainerView>
        <TouchableWithoutFeedback
          onPress={() => {
            moveToAnotherProfile(userId, user.nickname, user.img_thumbNail);
          }}>
          <ProfileContainerView>
            <ProfileImage
              source={{
                url: user.img_thumbNail,
                cache: 'force-cache',
              }}
            />
            <ProfileContentView>
              <SharedElement id="1">
                <ProfileNameText>{user.nickname}</ProfileNameText>
              </SharedElement>
              <ProfileDescriptionText>
                {formatElapsedDate(data['createdDiff(second)'] * 1000) +
                  (updatedAt !== createdAt ? ' ･ 수정됨' : '')}
              </ProfileDescriptionText>
            </ProfileContentView>
          </ProfileContainerView>
        </TouchableWithoutFeedback>

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
        <ContentView>
          <ContentText>{memoDescription}</ContentText>
        </ContentView>
      </BodyContainerView>

      {/* <HashTagContainerView>
        {Clinics.map((item, index) => (
          <HashTagIconView>
            <HashTagIconText>{'#' + item}</HashTagIconText>
          </HashTagIconView>
        ))}
      </HashTagContainerView> */}
    </ContainerView>
  );
};

export default React.memo(PostContent);
