import React, {useState} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Container = Styled.View`
 padding-top: 24px;
 padding-left: 16px;
 padding-right: 16px;
 padding-bottom: 10px;
 flex: 1;
 width: ${wp('100')}
 background-color: #FFFFFF;
 flex-direction: column;
 border-bottom-width: 1px;
 border-color: #E5E5E5;
`;

const ProfileContainer = Styled.View`
 flex-direction: row;
 align-items: center;
`;

const ProfileLeftContainer = Styled.View`
 flex-direction: row;
 align-items: center;
 background-color: #ffffff;
`;

const ProfileImage = Styled.Image`
 width: ${wp('12.8')}px;
 height: ${wp('12.8%')}px;
 border-radius: 40px;
`;

const NicknameCreatedAtContainer = Styled.View`
 margin-left: 6px;
`;

const NicknameText = Styled.Text`
 font-size: 14px;
 color: #000000;
`;

const CreatedAtText = Styled.Text`
 margin-top: 2px;
 font-size: 12px;
 color: #888888;
`;

const ImageListContainer = Styled.View`
margin-top: 8px;
flex-direction: row;
`;

const FirstImage = Styled.Image`
 width: ${wp('45%')};
 height: ${wp('45%')};
 border-top-left-radius: 8px;
`;

const SecondImage = Styled.Image`
margin-left: 5px;
width: ${wp('45%')};
height: ${wp('45%')};
border-top-right-radius: 8px;
`;

const InfoContainer = Styled.View`
`;

const TagListContainer = Styled.View`
margin-top: 13px;
`;

const TagText = Styled.Text`
font-weight: bold;
font-size: 17px;
color: #267DFF;
`;

const DateRatingContainer = Styled.View`
margin-top: 6px;
 flex-direction: row;
 align-items: center;
`;

const InfoLabelBackground = Styled.View`
padding-top: 6px;
padding-bottom: 4px;
padding-left: 8px;
padding-right: 8px;
flex-direction: row;
border-radius: 4px;
border-width: 1px;
border-color: #F6F6F6;
`;

const InfoLabelText = Styled.Text`
color: #777777;
font-size: 10px;
`;

const InfoValueText = Styled.Text`
margin-top: 2px;
margin-left: 4px;
font-size: 14px;
color: #777777;
`;

const DescripContainer = Styled.View`
margin-top: 16px;
`;

const DescripText = Styled.Text`
 font-size: 14px;
 color: #000000;
`;

const MoreViewText = Styled.Text`
 margin-top: 4px;
 color: #888888;
`;

const SocialInfoContainer = Styled.View`
 margin-top: 16px;
 flex-direction: row;
 align-items: center;
`;

const SocialLabelText = Styled.Text`
font-size: 12px;
color: #888888;
`;

const SocialValueText = Styled.Text`
font-size: 12px;
color: #888888;
margin-left: 4px;
`;

const ActionContainer = Styled.View`
margin-top: 16px;
flex-direction: row;
justify-content: space-between;
align-items: center;
`;

const LikeScrapContainer = Styled.View`
 flex-direction: row;
 align-items: center;
`;

const LikeIcon = Styled.Image`
 width: ${wp('6.4%')};
 height: ${wp('6.4%')};
`;

const LikeValueText = Styled.Text`
 margin-left: 4px;
 color: #56575C;
 font-size: 16px;
`;

const ScrapIcon = Styled.Image`
margin-left: 8px;
 width: ${wp('6.4%')};
 height: ${wp('6.4%')};
`;

const GetTreatInfoButton = Styled.View`
 width: ${wp('54%')};
 height: ${wp('10.33%')};
 background-color: #267DFF;
 border-radius: 4px;
 align-items: center;
 justify-content: center;
`;

const GetTreatInfoText = Styled.Text`
 font-weight: 700;
 font-size: 14px;
 color: #FFFFFF;
`;

const RatingStarIcon = Styled.Image`
 width: ${wp('3.2%')};
 height: ${wp('3.2%')};
`;

interface Props {
    navigation: any,
    profileImageUri: string,
    nickname: string,
    createdAt: string,
    imageArray: Array<any>,
    tagArray: Array<string>,
    date: string,
    rating: number,
    description: string,
    viewCount: number,
    treatInfoCount: number,
    likeCount: number,
} 

const ReviewItem = ({navigation, profileImageUri, nickname, createdAt, imageArray, tagArray, date, rating, description, viewCount, treatInfoCount, likeCount}: Props) => {

    const moveToReviewDetail = () => {
        navigation.navigate("ReviewStackScreen", {
           screen: "ReviewDetailScreen"
        });
    }

    const moveToAnotherProfile = () => {
        navigation.navigate("AnotherProfileStackScreen", {
            screen: "AnotherProfileScreen"
        })
    }

    return (
        <TouchableWithoutFeedback onPress={() => moveToReviewDetail()}>
        <Container>
            <ProfileContainer>
                <TouchableWithoutFeedback onPress={() => moveToAnotherProfile()}>
                <ProfileLeftContainer>
                <ProfileImage
                source={{uri:profileImageUri}}/>
                <NicknameCreatedAtContainer>
                    <NicknameText>{nickname}</NicknameText>
                    <CreatedAtText>{createdAt}</CreatedAtText>
                </NicknameCreatedAtContainer>
                </ProfileLeftContainer>
                </TouchableWithoutFeedback>
                </ProfileContainer>
                <InfoContainer>
                <ImageListContainer>
                    {imageArray[0] && (
                        <FirstImage
                        source={{uri:imageArray[0].uri}}/>
                    )}
                    {imageArray[1] && (
                        <SecondImage
                        source={{uri:imageArray[1].uri}}/>
                    )}
                </ImageListContainer>
                    <TagListContainer>
                        <TagText>{"#" + tagArray[0]}
                        {tagArray[1] && (
                        <TagText>{" #" + tagArray[1]}</TagText>
                        )}
                        </TagText>
                    </TagListContainer>
                    <DateRatingContainer>
                        <InfoLabelBackground>
                            <InfoLabelText>날짜</InfoLabelText>
                        </InfoLabelBackground>
                        <InfoValueText>{date}</InfoValueText>
                        <InfoLabelBackground style={{marginLeft: 12}}>
                            <InfoLabelText>만족도</InfoLabelText>
                        </InfoLabelBackground>
                        <RatingStarIcon
                            style={{marginLeft: 4}}
                            source={require('~/Assets/Images/Review/ic_newStar.png')}/>
                        <InfoValueText>{rating}</InfoValueText>
                    </DateRatingContainer>
                    <DescripContainer>
                        <DescripText>{description}</DescripText>
                    </DescripContainer>
                    <MoreViewText>더보기</MoreViewText>
                    <SocialInfoContainer>
                        <SocialLabelText>조회</SocialLabelText>
                        <SocialValueText>{viewCount}</SocialValueText>
                        <SocialLabelText
                        style={{marginLeft: 15}}>정보받기</SocialLabelText>
                        <SocialValueText>{treatInfoCount}</SocialValueText>
                    </SocialInfoContainer>
                </InfoContainer>
                <ActionContainer>
                    <LikeScrapContainer>
                        <LikeIcon
                        source={require('~/Assets/Images/Review/ic_like_outline.png')}/>
                        <LikeValueText>{likeCount}</LikeValueText>
                        <ScrapIcon
                        source={require('~/Assets/Images/Review/ic_scrap_outline.png')}/>
                    </LikeScrapContainer>
                        <GetTreatInfoButton>
                            <GetTreatInfoText>시술 정보받기</GetTreatInfoText>
                        </GetTreatInfoButton>
                </ActionContainer>
        </Container>
        </TouchableWithoutFeedback>
    )
}

export default ReviewItem




