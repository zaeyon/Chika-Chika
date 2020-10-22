import React from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Container = Styled.View`
padding-top: 20px;
padding-left: 16px;
padding-right: 16px;
padding-bottom: 10px;
border-bottom-width: 1px;
border-color: #E5E5E5;
background-color: #ffffff;
`;

const HeaderContainer = Styled.View`
flex-direction: row;
align-items: center;
`;

const ProfileContainer = Styled.View`
flex-direction: row;
align-items: center;
`;

const ProfileImage = Styled.Image`
width: ${wp('8.5%')};
height: ${wp('8.5%')};
border-radius: 100px;
`;

const NicknameText = Styled.Text`
margin-left: 8px;
font-size: 16px;
color: #000000;
`;

const CreatedAtText = Styled.Text`
margin-left: 8px;
font-size: 16px;
color: #8D8D8D;
`;

const TagListContainer = Styled.View`
margin-top: 12px;
flex-direction: row;
`;

const TagText = Styled.Text`
font-size: 20px;
color: #267DFF;
margin-right: 9px;
font-weight: 600;
`;

const MetaInfoContainer = Styled.View`
flex-direction: row;
align-items: center;
margin-top: 12px;
`;

const RatingStarIcon = Styled.Image`
width: ${wp('3.2%')};
height: ${wp('3.2%')};
`;

const RatingText = Styled.Text`
margin-left: 1px;
color: #777777;
font-size: 13px;
`;

const DividerBar = Styled.View`
margin-left: 8px;
margin-right: 8px;
background-color: #c8c8c8;
width: 1px;
height: 10px;
`;

const LocationDateText = Styled.Text`
color: #9a9a9a;
font-size: 14px;
`;

interface Props {
    user: any,
    createdAt: string,
    tagOne: string,
    tagTwo: string,
    rating: number,
    location: string,
    treat_date: string, 
}

const ReviewInformation = ({user,createdAt, tagOne, tagTwo, rating, location, treat_date}: Props) => {
    return (
        <Container>
            <HeaderContainer>
                <ProfileContainer>
                    <ProfileImage
                    source={{uri: user.profile_image}}/>
                    <NicknameText>{user.nickname}</NicknameText>
                </ProfileContainer>
                <CreatedAtText>{createdAt}</CreatedAtText>
            </HeaderContainer>
            <TagListContainer>
                <TagText>{tagOne}</TagText>
                <TagText>{tagTwo}</TagText>
            </TagListContainer>
            <MetaInfoContainer>
            <RatingStarIcon
            source={require('~/Assets/Images/Review/ic_newStar.png')}/>
            <RatingText>{rating}</RatingText>
            <DividerBar/>
            <LocationDateText>{location +" ∙ " + treat_date}</LocationDateText>
            </MetaInfoContainer>
        </Container>
    )
}

export default ReviewInformation;

