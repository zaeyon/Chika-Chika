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
 justify-content: space-between;
`;

const ProfileLeftContainer = Styled.View`
 flex-direction: row;
 align-items: center;
 background-color: #ffffff;
`;

const ProfileRightContainer = Styled.View`
align-items: center;
justify-content: center;
`;

const ProfileImage = Styled.Image`
 width: ${wp('10.66')}px;
 height: ${wp('10.66%')}px;
 border-radius: 40px;
`;

const NicknameCreatedAtContainer = Styled.View`
 margin-left: 8px;
`;

const NicknameText = Styled.Text`
 font-size: 15px;
 font-weight: 600;
 color: #000000;
`;

const CreatedAtText = Styled.Text`
 margin-top: 2px;
 font-size: 13px;
 color: #a2a2a2;
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
margin-top: 8px;
flex-direction: row;
`;

const TagText = Styled.Text`
font-size: 14px;
color: #000000;
`;

const TagBackground = Styled.View`
padding-left: 12px;
padding-right: 12px;
padding-top: 8px;
padding-bottom: 8px;
background-color: #f1f1f1;
border-radius: 100px;
margin-right: 4px;
`;

const DateRatingContainer = Styled.View`
margin-top: 6px;
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

const InfoItemContainer = Styled.View`
flex-direction: row;
align-items: center;
`;

const InfoLabelText = Styled.Text`
color: #a1a1a1;
font-size: 14px;
`;

const InfoValueText = Styled.Text`
margin-top: 2px;
margin-left: 8px;
font-size: 14px;
color: #a1a1a1;
`;

const DescripContainer = Styled.View`
margin-top: 12px;
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

const ScrapContainer = Styled.View`
align-items: center;
justify-content: center;
`;

const ScrapIcon = Styled.Image`
 width: ${wp('6.4%')};
 height: ${wp('6.4%')};
`;

const CommentIcon = Styled.Image`
margin-left: 16px;
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

const TreatDateContainer = Styled.View`
flex-direction: row;
`;

interface UserData {
    profileImg: string,
    nickname: string
}


interface Props {
    navigation: any,
    writer: UserData,
    createdAt: string,
    imageArray: Array<any>,
    treatmentArray: Array<string>,
    treatmentDate: string,
    rating: number,
    description: string,
    viewCount: number,
    treatInfoCount: number,
    likeCount: number,
    commentCount: number,
} 

const ReviewItem = ({navigation, writer, createdAt, imageArray, treatmentArray, treatmentDate, rating, description, viewCount, treatInfoCount, likeCount, commentCount}: Props) => {

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

    const formatDate = (date: string) => {
        const tmpDate = new Date(date);

        var year = tmpDate.getFullYear() + "",
            month = tmpDate.getMonth() + 1 + "",
            day = tmpDate.getDay() + "";

            month = Number(month) >= 10 ? month : '0' + month;
            day = Number(day) >= 10 ? day : '0' + day;

            return year + "년 " + month + "월 " + day +"일"
    }

    return (
        <TouchableWithoutFeedback onPress={() => moveToReviewDetail()}>
        <Container>
            <ProfileContainer>
                <TouchableWithoutFeedback onPress={() => moveToAnotherProfile()}>
                <ProfileLeftContainer>
                <ProfileImage
                source={{uri:writer.profileImg}}/>
                <NicknameCreatedAtContainer>
                    <NicknameText>{writer.nickname}</NicknameText>
                    <CreatedAtText>{formatDate(createdAt)}</CreatedAtText>
                </NicknameCreatedAtContainer>
                </ProfileLeftContainer>
                </TouchableWithoutFeedback>
                <ProfileRightContainer>
                    <ScrapIcon
                    source={require('~/Assets/Images/Review/ic_scrap_inline.png')}/>
                </ProfileRightContainer>
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
                        <TagBackground>
                        <TagText>{"#" + treatmentArray[0]}</TagText>
                        </TagBackground>
                        {treatmentArray[1] && (
                        <TagBackground>
                        <TagText>{" #" + treatmentArray[1]}</TagText>
                        </TagBackground>
                        )}
                    </TagListContainer>
                    <DateRatingContainer>
                        <InfoItemContainer>
                            <InfoLabelText>날짜</InfoLabelText>
                            <InfoValueText>{treatmentDate}</InfoValueText>
                        </InfoItemContainer>
                        <InfoItemContainer >
                            <InfoLabelText>만족도</InfoLabelText>
                        <RatingStarIcon
                            style={{marginLeft: 4}}
                            source={require('~/Assets/Images/Review/ic_newStar.png')}/>
                        <InfoValueText>{rating}</InfoValueText>
                        </InfoItemContainer>
                    </DateRatingContainer>
                    <DescripContainer>
                        <DescripText>{description}</DescripText>
                    </DescripContainer>
                    <MoreViewText>더보기</MoreViewText>
                </InfoContainer>
                <ActionContainer>
                    <LikeScrapContainer>
                        <LikeIcon
                        source={require('~/Assets/Images/Review/ic_like_inline.png')}/>
                        <LikeValueText>{likeCount}</LikeValueText>
                        <CommentIcon
                        source={require('~/Assets/Images/Review/ic_comment_inline.png')}/>
                        <LikeValueText>{commentCount}</LikeValueText>
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




