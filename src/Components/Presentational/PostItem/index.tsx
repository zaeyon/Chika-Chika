import React, {useMemo, useCallback, useEffect} from 'react';
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

const ContainerView = Styled.View`
width: ${wp('100%')};
height: auto;
padding-top: 24px;
background-color: white

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

`;

const HashTagContainerView = Styled.View`
width: 100%;
height: 24px;
margin-top: 16px;
background-color: white;

`;

const HashTagFlatList = Styled(FlatList as new () => FlatList)`
width: 100%;
height: auto;
`;

const HashTagIconView = Styled.View`
display: flex;
flex-direction: row;
align-items: center;
padding: 2px 13px;
height: 24px;
border: 1px solid #C4C4C4;
border-radius: 4px;
background-color: white;
color: '#rgb(0, 0, 0)'
margin-right: 8px;
`;
const HashTagIconText = Styled.Text`
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 20px;
`;
// View => Image when ready
const ProfileImage = Styled.Image<{source: any}>`
width: 44px;
height: 44px;
background-color: grey;
border-radius: 22px;
`;
const ProfileNameText = Styled.Text`
font-size: 14px;
margin: 0px 8px;
line-height: 24px;
background-color: white;
font-style: normal;
font-weight: bold;
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
`;

const ImageContainerView = Styled.View`
margin: 8px 0px;
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
margin-right: 16px;
margin-left: ${(props) => (props.isFirst ? '0px' : '16px')}
`;
const SocialInfoContainerView = Styled.View`
width: ${wp('100%')};
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
  color: #0075FF;
`;
interface Props {
  mode: string;
  navigation: any;
  data: any;
}

const PostItem = ({mode, data, navigation}: Props) => {
  const {user, createdAt, description, postLikeNum, postCommentsNum} = data;
  const tagList = ['임플란트', '충치'];
  const mediaFiles = data.community_imgs;
  const proComments = [
    '안녕하세요 전윤정님. 저희 치과를 이용해주셔서 감사합니다. 어쩌구저쩌구 어쩌구저쩌구',
  ];
  const formatHashTag = (text: string) => {
    return (
      <TouchableWithoutFeedback>
        <HashTagText>{'#' + text}</HashTagText>
      </TouchableWithoutFeedback>
    );
  };
  const formatDescription = (oldDescription: string) => {
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
  };
  const moveToCommunityDetail = () => {
    navigation.navigate('CommunityDetailScreen', {data: data});
  };

  const moveToAnotherProfile = () => {
    navigation.navigate('AnotherProfileStackScreen', {
      screen: 'AnotherProfileScreen',
    });
  };

  const moveToFullImages = (imageUri: string) => {
    let index = mediaFiles.findIndex(
      (image: any) => image.img_url === imageUri,
    );

    let imageUri_arr = mediaFiles.map((image: any) => {
      return image.img_url;
    });
    console.log(mediaFiles);
    console.log('선택한 사진의 mediaFiles index', index);

    navigation.navigate('FullImagesScreen', {
      imagesUrl_arr: imageUri_arr,
      imageIndex: index,
    });
  };
  const toggleSocialLike = () => {
    return;
  };

  const toggleSocialScrap = () => {};

  const memoDescription = useMemo(() => formatDescription(description), [
    description,
  ]);

  const renderImagesCallback = useCallback(
    ({item, index}) => (
      <TouchableWithoutFeedback
        key={'TouchableImage' + index}
        onPress={() => {
          mode === 'Detail'
            ? moveToFullImages(item.img_url)
            : moveToCommunityDetail();
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
    [mediaFiles],
  );

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        moveToCommunityDetail();
      }}>
      <ContainerView
        style={{
          height: 'auto',
        }}>
        <BodyContainerView>
          <TouchableWithoutFeedback
            onPress={() => {
              moveToAnotherProfile();
            }}>
            <ProfileContainerView>
              <ProfileImage
                source={{
                  url: user.profileImage,
                  cache: 'force-cache',
                }}
              />

              <ProfileNameText>{user.nickname}</ProfileNameText>
            </ProfileContainerView>
          </TouchableWithoutFeedback>
          <HashTagContainerView>
            <HashTagFlatList
              horizontal={true}
              data={tagList}
              keyExtractor={(item) => item}
              renderItem={({item, index}) => (
                <HashTagIconView key={'hashtag' + index}>
                  <HashTagIconText>{'#' + item}</HashTagIconText>
                </HashTagIconView>
              )}
            />
          </HashTagContainerView>
          <ContentView>
            {mode === 'Detail' ? (
              <ContentText>{formatDescription(description)}</ContentText>
            ) : (
              <ContentText numberOfLines={2}>{memoDescription}</ContentText>
            )}
          </ContentView>
        </BodyContainerView>

        {mediaFiles.length > 0 ? (
          <ImageContainerView>
            <ImageFlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              alwaysBounceHorizontal={false}
              data={mediaFiles}
              keyExtractor={(item) => item.id}
              renderItem={renderImagesCallback}></ImageFlatList>
          </ImageContainerView>
        ) : null}
        {mode === 'Detail' ? null : (
          <SocialInfoContainerView>
            <TouchableOpacity
              style={{
                marginHorizontal: 16,
              }}
              onPress={() => {
                toggleSocialLike();
              }}>
              <SocialInfoView>
                <Image
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
                <SocialInfoText>스크랩하기</SocialInfoText>
              </SocialInfoView>
            </TouchableOpacity>
          </SocialInfoContainerView>
        )}
      </ContainerView>
    </TouchableWithoutFeedback>
  );
};

export default PostItem;
