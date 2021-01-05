import React from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Container = Styled.View`
width: ${wp('87.2%')}px;
height: ${wp('45%')}px;
background-color: #ffffff;
border-radius: 12px;
border-width: 1px;
border-color: #c4c4c4;
padding: 24px 24px 24px 24px;
`;

const DentalImageContainer = Styled.View`
width: ${wp('25%')};
height: ${wp('25%')};
`;

const DentalImage = Styled.Image`
width: ${wp('25%')};
height: ${wp('25%')};
`;

const HeaderContainer = Styled.View`
flex-direction: row;
align-items: center;
justify-content: space-between;
`;

const CurrentStatusContainer = Styled.View`
flex-direction: row;
align-items: center;
`;

const OpenStatusContainer = Styled.View`
border-radius: 2px;
border-width: 1px;
border-color: #c4c4c4;
padding: 3px 8px 3px 8px;
align-items: center;
justify-content: center;
`;

const LauchTimeStatusContainer = Styled.View`
border-radius: 2px;
border-width: 1px;
border-color: #c4c4c4;
margin-left: 4px;
padding: 3px 8px 3px 8px;
align-items: center;
justify-content: center;
`;

const CurrentStatusText = Styled.Text`
font-size: 12px;
font-weight: 400;
color: #7a7a7a;
`;

const ReviewRatingContainer = Styled.View`
flex-direction: row;
align-items: center;
`;

const RatingContainer = Styled.View`
flex-direction: row;
align-items: center;
`;

const RatingStarIcon = Styled.Image`
width:${wp('3%')}px;
height: ${wp('3%')}px;
margin-bottom: 2px;
`;

const RatingText = Styled.Text`
margin-left: 4px;
font-weight: 400;
font-size: 14px;
color: #7a7a7a;
`;

const DividerBar = Styled.View`
width: 1px;
height: ${hp('1%')}px;
background-color: #c4c4c4;
margin-left: 8px;
margin-right: 8px;
`;

const ReviewText = Styled.Text`
font-weight: 400;
color: #464646;
font-size: 14px;
`;

const DentalInfoContainer = Styled.View`
margin-top: 8px;
flex-direction: column;
`;

const DentalNameText = Styled.Text`
font-weight: 400;
color: #000000;
font-size: 18px;
`;

const DentalAddressText = Styled.Text`
margin-top: 4px;
font-weight: 400;
font-size: 12px;
color: #979797;
`;

const LauchTimeText = Styled.Text`
margin-top: 16px;
font-weight: 400;
font-size: 14px;
color: #000000;
`;

const OpenTimeText = Styled.Text`
margin-top: 4px;
font-weight: 400;
font-size: 14px;
color: #000000;
`;

const DentalInfoItemContainer = Styled.View`
flex-direction: row;
align-items: center;
`;

const DentalInfoLabelText = Styled.Text`
color: #000000;
font-weight: bold;
font-size: 14px;
`;

const DentalInfoValueText = Styled.Text`
margin-left: 8px;
color: #000000;
font-size: 14px;
`;

interface Props {
    isOpen: boolean,
    isLunchTime: boolean,
    rating: number,
    reviewCount: number,
    name: string,
    address: string,
    lunchTime: string,
    openTime: string,
    closeTime: string,
}

const DentalCarouselItem = ({isOpen, isLunchTime, rating, reviewCount, name, address, lunchTime, openTime, closeTime}: Props) => {
    return (
        <Container>
            <HeaderContainer>
                <CurrentStatusContainer>
                    <OpenStatusContainer style={isOpen ? {backgroundColor: "#0075FF"} : {backgroundColor: "#ffffff"}}>
                        <CurrentStatusText style={isOpen ? {color: "#ffffff"} : {color: "#7a7a7a"}}>{"진료중"}</CurrentStatusText>
                    </OpenStatusContainer>
                    <LauchTimeStatusContainer style={isLunchTime ? {backgroundColor: "#0075FF"} : {backgroundColor: "#ffffff"}}>
                        <CurrentStatusText style={isLunchTime ? {color: "#ffffff"} : {color: "#7a7a7a"}}>
                        {"점심시간"}
                        </CurrentStatusText>
                    </LauchTimeStatusContainer>
                </CurrentStatusContainer>
                <ReviewRatingContainer>
                    <RatingContainer>
                    <RatingStarIcon
                    source={require('~/Assets/Images/Indicator/ic_starRating.png')}/>
                    <RatingText>{rating}</RatingText>
                    </RatingContainer>
                    <DividerBar/>
                    <ReviewText>{"리뷰 "  + reviewCount + "개"}</ReviewText>
                </ReviewRatingContainer>
            </HeaderContainer>
            <DentalInfoContainer>
                <DentalNameText>{name}</DentalNameText>
                <DentalAddressText>{address}</DentalAddressText>
                <LauchTimeText>{"점심시간  " + lunchTime}</LauchTimeText>
                <OpenTimeText>{"영업시간  " + openTime + "~" + closeTime}</OpenTimeText>
            </DentalInfoContainer>
        </Container>
    )
}

export default DentalCarouselItem



