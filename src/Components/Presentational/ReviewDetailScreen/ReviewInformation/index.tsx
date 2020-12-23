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
background-color: #ececec
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

const TreatmentListContainer = Styled.View`
margin-top: 12px;
flex-direction: row;
`;

const TreatmentText = Styled.Text`
font-size: 20px;
color: #267DFF;
margin-right: 5px;
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
    writer: any,
    createdDate: string,
    treatmentDate: string,
    treatmentArray: Array<any>,
    avgRating: number,
    location: string,
}

const ReviewInformation = ({writer, createdDate, treatmentDate, treatmentArray, avgRating, location}: Props) => {
    console.log("ReviewInformation tretmentArray", treatmentArray);
    return (
        <Container>
            <HeaderContainer>
                {/*
                <ProfileContainer>
                    <ProfileImage
                    source={{uri: writer.profileImage ? writer.profileImage : ""}}/>
                    <NicknameText>{writer.nickname ? writer.nickname : ""}</NicknameText>
                </ProfileContainer>
                */}
                <CreatedAtText>{createdDate}</CreatedAtText>
            </HeaderContainer>
            <TreatmentListContainer>
                {treatmentArray.map((item, index) => {
                    return (
                        <TreatmentText>{item.name}</TreatmentText>
                    )
                })}
            </TreatmentListContainer>
            <MetaInfoContainer>
            <RatingStarIcon
            source={require('~/Assets/Images/Review/ic_newStar.png')}/>
            <RatingText>{avgRating}</RatingText>
            <DividerBar/>
            <LocationDateText>{location +" ∙ " + treatmentDate}</LocationDateText>
            </MetaInfoContainer>
        </Container>
    )
}

export default ReviewInformation;

