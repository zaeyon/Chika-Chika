import React from 'react';
import {TouchableWithoutFeedback, FlatList} from 'react-native';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Container = Styled.View`
width: ${wp('68.2%')}px;
height: ${wp('46.9%')}px;
background-color: #ffffff;
border-radius: 8px;
border-width: 1px;
border-color: #E0E0E0;
padding-top: 16px;
padding-left: 16px;
padding-right: 16px;
padding-bottom: 16px;
`;

const ProfileContainer = Styled.View`
flex-direction: row;
align-items: center;
`;

const ProfileImageContainer = Styled.View`
`;

const ProfileImage = Styled.Image`
width: ${wp('10.6%')};
height: ${wp('10.6%')};
border-radius: 100px;
`;

const ProfileRightContainer = Styled.View`
margin-left: 8px;
`;

const NicknameText = Styled.Text`
font-weight: bold;
font-size: 14px;
color: #000000;
`;

const CategoryCreatedAtContainer = Styled.View`
margin-top: 4px;
flex-direction: row;
align-items: center;
`;

const CategoryText = Styled.Text`
font-size: 12px;
color: #828282;
`;

const CreatedAtText = Styled.Text`
font-size: 12px;
color: #828282;
`;

const TagListContainer = Styled.View`
margin-top: 8px;
padding-right: 10px;
`;

const TagText = Styled.Text`
padding-right: 3px;
font-weight: 400;
font-size: 14px;
color: #267DFF;
`;

const DescripContainer = Styled.View`
margin-top: 8px;
`;

const DescripText = Styled.Text`
color: #000000;
font-size: 14px;
`;

const MoreViewText = Styled.Text`
margin-left: 5px;
font-size: 14px;
color: #BDBDBD;
`;

const TagItemContainer = Styled.View`
width: 20px;
height: 20px;
background-color: #000000;
`;

const SocialInfoContainer = Styled.View`
flex-direction: row;
align-items: center;
`;

const SocialInfoText = Styled.Text`
margin-top: 16px;
margin-right: 10px;
font-size: 12px;
color: #828282;
`;

interface Props {
    profileImageUri: string
    nickname: string
    category: string
    createdAt: string
    tagList: Array<string>
    description: string
    likeCount: number
    commentCount: number
}

const PostCardItem = ({profileImageUri, nickname, category, createdAt, tagList, description, likeCount, commentCount}: Props) => {

    const renderTagItem = ({item, index}: any) => {
        return (
          <TagItemContainer>
            <TagText>ss</TagText>
            </TagItemContainer>
        )
    }

    return (
        <Container>
          <ProfileContainer>
            <ProfileImageContainer>
              <ProfileImage
              source={{uri: profileImageUri}}/>
            </ProfileImageContainer>
            <ProfileRightContainer>
              <NicknameText>
              {nickname}
              </NicknameText>
              <CategoryCreatedAtContainer>
                <CategoryText>{category}</CategoryText>
                <CreatedAtText>{createdAt}</CreatedAtText>
              </CategoryCreatedAtContainer>        
            </ProfileRightContainer>
          </ProfileContainer>
          <TagListContainer>
            <TagText>
              {tagList.map((tag, index) => {
                if(index == 0) {
                  return (
                    <TagText>{"#" + tag}</TagText>
                  )
                } else {
                  return (
                    <TagText>{" #" + tag}</TagText>
                  )
                }
              })}
            </TagText>
          </TagListContainer>
          <DescripContainer>
              <DescripText>
                  {description}
                  <MoreViewText> 더보기</MoreViewText>
              </DescripText>
          </DescripContainer>
          <SocialInfoContainer>
            <SocialInfoText>{"좋아요 " + likeCount + "개"}</SocialInfoText>
            <SocialInfoText>{"댓글 " + commentCount + "개"}</SocialInfoText>
          </SocialInfoContainer>
        </Container>
    )
}

export default PostCardItem




