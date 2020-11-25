import React from 'react';
import {TouchableWithoutFeedback, FlatList, Text, View, Image,} from 'react-native';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ContainerView = Styled.View`
width: ${wp('100%')};
padding-top: 16px;
background-color: white
`;

const BodyContainerView = Styled.View`
display: flex;
width: 100%;
padding: 0px 16px;

`

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

`

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
`
const HashTagText = Styled.Text`
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 20px;
`
// View => Image when ready
const ProfileImage = Styled.Image<{source: any}>`
width: 44px;
height: 44px;
background-color: grey;
border-radius: 22px;
`
const ProfileNameText = Styled.Text`
font-size: 14px;
margin: 0px 8px;
line-height: 24px;
background-color: white;
font-style: normal;
font-weight: bold;
`
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
margin-left: 1px;
background-color: white;
padding: 0px 16px;
`
const ImageFlatList = Styled(FlatList as new () => FlatList)`
width: 100%;
height: auto;
`
const ImageView = Styled.Image<{isFirst: number, source: any}>`
width: 130px;
height: 130px;
background-color: grey;
border-radius: 4px;
margin-left: ${props => props.isFirst ? "8px" : "0px"}
`
const SocialInfoContainer = Styled.View`
position: absolute;
left: 0px;
bottom: 0px;
width: ${wp('100%')};
height: 56px;

align-items: center;
flex-direction: row;
`
const SocialInfoView = Styled.View`
flex-direction: row;
display: flex;
height: 24px;
align-items: center;
padding: 0px;
margin-left: 16px;
justify-content: space-between;
`
const SocialInfoText = Styled.Text`
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 16px;
margin-left: 4px;
`
interface Props {
    key: any
    mode: string
    navigation: any
    data: any
}

const PostItem = ({key, mode, data, navigation}: Props) => {
    console.log(data)
const {user, category, createdAt, tagList, mediaFiles, paragraph, likes, comments} = data

  const moveToCommunityDetail = () => {
    navigation.navigate("CommunityDetailScreen", {data: data});
  }

  const moveToAnotherProfile = () => {
      navigation.navigate("AnotherProfileStackScreen", {
          screen: "AnotherProfileScreen"
      })
  }

    return (
        <ContainerView
            style={{
                height: mode === 'Detail' ? 290 : 362
            }}>
          <TouchableWithoutFeedback onPress={() => {
              moveToCommunityDetail();
            }}>
          <BodyContainerView>
          <TouchableWithoutFeedback onPress={() => {
              moveToAnotherProfile();
            }}>
            <ProfileContainerView>
                <ProfileImage source={{
                    url: user.profile_image
                    }}/>

                <ProfileNameText>
                    {user.nickname}
                </ProfileNameText>
            </ProfileContainerView>
            </TouchableWithoutFeedback>
            <HashTagContainerView>
            <HashTagFlatList
            horizontal={true}
            data={tagList}
            renderItem={ ({item, index}) => (
                <HashTagView>
                    <HashTagText>

                    {'#'+item}
                    </HashTagText>
                    </HashTagView>
    )
            }/>
            </HashTagContainerView>
            <ContentView>
                <ContentText numberOfLines={2}>
                    {paragraph}
            </ContentText>
            </ContentView>
            </BodyContainerView>
            </TouchableWithoutFeedback>
            <ImageContainerView>
                <ImageFlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={mediaFiles}
                renderItem={({item, index}) => (
                    <ImageView isFirst={index} key={index} source={{
                        url: item.image_uri
                    }}/>
                )}>
                    
                </ImageFlatList>
            </ImageContainerView>
            {mode === 'Detail' ? null : 
            <TouchableWithoutFeedback onPress={() => {
                moveToCommunityDetail();
              }}>
            <SocialInfoContainer>
                    <SocialInfoView>
                        <Image source={require('~/Assets/Images/Review/ic_like_inline.png')}/>
                        <SocialInfoText>
                            {likes.length}
                        </SocialInfoText>
                    </SocialInfoView>
                    <SocialInfoView>
                        <Image source={require('~/Assets/Images/Review/ic_comment_inline.png')}/>
                        <SocialInfoText>
                            {comments.length}
                        </SocialInfoText>
                    </SocialInfoView>
                    <SocialInfoView
                        style={{
                            position: 'absolute',
                            right: 16,
                        }}>
                        <SocialInfoText>
                            스크랩하기
                        </SocialInfoText>
                    </SocialInfoView>
            </SocialInfoContainer>
            </TouchableWithoutFeedback>
            }
        </ContainerView>
    )
}

export default PostItem




