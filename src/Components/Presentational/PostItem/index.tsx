import React from 'react';
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
padding-top: 16px;
background-color: white
margin-bottom: 13px;
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
margin-top: 12px;
background-color: white;

`;

const HashTagFlatList = Styled(FlatList as new () => FlatList)`
width: 100%;
height: auto;


`;

const HashTagView = Styled.View`
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
const HashTagText = Styled.Text`
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
height: 48px;
background-color: white;
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
width: 100%;
height: 130px;
background-color: white;

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
position: absolute;
left: 0px;
bottom: 0px;
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
interface Props {
  key: any;
  mode: string;
  navigation: any;
  data: any;
}

const PostItem = ({key, mode, data, navigation}: Props) => {
  const {
    user,
    category,
    createdAt,
    tagList,
    mediaFiles,
    paragraph,
    likes,
    comments,
  } = data;
  const proComments = [
    '안녕하세요 전윤정님. 저희 치과를 이용해주셔서 감사합니다. 어쩌구저쩌구 어쩌구저쩌구',
  ];

  const moveToCommunityDetail = () => {
    navigation.navigate('CommunityDetailScreen', {data: data});
  };

  const moveToAnotherProfile = () => {
    navigation.navigate('AnotherProfileStackScreen', {
      screen: 'AnotherProfileScreen',
    });
  };

  const moveToFullImages = (imageUri: string) => {
    console.log('TEST_REVIEW_DETAIL_DATA.mediaFiles', mediaFiles);
    let index = mediaFiles.findIndex((image) => image.image_uri === imageUri);

    let imageUri_arr = mediaFiles.map((image) => {
      return image.image_uri;
    });

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

  return (
    <ContainerView
      style={{
        height: mode === 'Detail' ? 316 : 362,
      }}>
      <TouchableWithoutFeedback
        onPress={() => {
          moveToCommunityDetail();
        }}>
        <BodyContainerView>
          <TouchableWithoutFeedback
            onPress={() => {
              moveToAnotherProfile();
            }}>
            <ProfileContainerView>
              <ProfileImage
                source={{
                  url: user.profile_image,
                }}
              />

              <ProfileNameText>{user.nickname}</ProfileNameText>
            </ProfileContainerView>
          </TouchableWithoutFeedback>
          <HashTagContainerView>
            <HashTagFlatList
              horizontal={true}
              data={tagList}
              renderItem={({item, index}) => (
                <HashTagView>
                  <HashTagText>{'#' + item}</HashTagText>
                </HashTagView>
              )}
            />
          </HashTagContainerView>
          <ContentView>
            <ContentText numberOfLines={2}>{paragraph}</ContentText>
          </ContentView>
        </BodyContainerView>
      </TouchableWithoutFeedback>
      <ImageContainerView>
        <ImageFlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={mediaFiles}
          renderItem={({item, index}) => (
            <TouchableWithoutFeedback
              onPress={() => {
                mode === 'Detail'
                  ? moveToFullImages(item.image_uri)
                  : moveToCommunityDetail();
              }}>
              <ImageView
                isFirst={index}
                key={index}
                source={{
                  url: item.image_uri,
                }}
              />
            </TouchableWithoutFeedback>
          )}></ImageFlatList>
      </ImageContainerView>
      {mode === 'Detail' ? null : (
        <TouchableWithoutFeedback
          onPress={() => {
            moveToCommunityDetail();
          }}>
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
                <SocialInfoText>{likes.length}</SocialInfoText>
              </SocialInfoView>
            </TouchableOpacity>

            <SocialInfoView>
              <Image
                source={require('~/Assets/Images/Review/ic_comment_inline.png')}
              />
              <SocialInfoText>{comments.length}</SocialInfoText>
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
        </TouchableWithoutFeedback>
      )}
    </ContainerView>
  );
};

export default PostItem;
