import React from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const Container = Styled.View`
flex-direction: row;
align-items: center;
`;

const RatingStarListContainer = Styled.View`
margin-left: 4px;
flex-direction: row;
align-items: center;
`;

const RatingStarIcon = Styled.Image`
margin-right: 2px;
width: ${wp('4.266%')}px;
height: ${wp('4.266%')}px;
`;

const RatingValueContainer = Styled.View`
flex-direction: row;
align-items: center;
`;

const RatingValueText = Styled.Text`
font-weight: 700;
font-size: 14px;
line-height: 18px;
color: #00D1FF;
`;

const NoRatingValueText = Styled.Text`
font-weight: 700;
font-size: 14px;
line-height: 18px;
color: #9AA2A9;
`;

const VerticalDivider = Styled.View`
margin-left: 4px;
margin-right: 4px;
width: 0.5px;
height: ${hp('0.98%')}px;
background-color: #E2E6ED;
`;

const ReviewCountText = Styled.Text`
font-weight: 400;
font-size: 14px;
line-height: 18px;
color: #9AA2A9;
`;

const ReviewCountContainer = Styled.View`
flex-direction: row;
align-items: center;
`;

interface Props {
    ratingValue: number,
    reviewCount: number,
}

const RatingStarList = ({ratingValue, reviewCount}: Props) => {

    const integerValue = Math.floor(ratingValue);
    const remainderValue = ((ratingValue % 1) * 10);
    let ratingArray = [0, 0, 0, 0, 0];
    ratingArray[integerValue] = Math.round(remainderValue);

    for(var i = 0; i < integerValue; i++) {
        ratingArray[i] = 10;

        console.log("RatingStarList ratingArray", ratingArray)
    }

    return (
        <Container>
            {(reviewCount > 0) && (
            <RatingValueContainer>
                <RatingValueText>{ratingValue}</RatingValueText>
            </RatingValueContainer>
            )}
            {(reviewCount === 0) && (
            <RatingValueContainer>
                <NoRatingValueText>{"평가없음(0)"}</NoRatingValueText>
            </RatingValueContainer>
            )}
            <RatingStarListContainer>
            {ratingArray.map((item, index) => {
                if(item == 10) {
                    return (
                        <RatingStarIcon
                        key={index}
                        source={require('~/Assets/Images/Indicator/rating/ic_ratingStar_10.png')}/>
                    )
                } else if(item == 9) {
                    return (
                        <RatingStarIcon
                        key={index}
                        source={require('~/Assets/Images/Indicator/rating/ic_ratingStar_9.png')}/>
                    )
                } else if(item == 8) {
                    return (
                        <RatingStarIcon
                        key={index}
                        source={require('~/Assets/Images/Indicator/rating/ic_ratingStar_8.png')}/>
                    )
                } else if(item == 7) {
                    return (
                        <RatingStarIcon
                        key={index}
                        source={require('~/Assets/Images/Indicator/rating/ic_ratingStar_7.png')}/>
                    )
                } else if(item == 6) {
                    return (
                        <RatingStarIcon
                        key={index}
                        source={require('~/Assets/Images/Indicator/rating/ic_ratingStar_6.png')}/>
                    )
                } else if(item == 5) {
                    return (
                        <RatingStarIcon
                        key={index}
                        source={require('~/Assets/Images/Indicator/rating/ic_ratingStar_5.png')}/>
                    )
                } else if(item == 4) {
                    return (
                        <RatingStarIcon
                        key={index}
                        source={require('~/Assets/Images/Indicator/rating/ic_ratingStar_4.png')}/>
                    )
                } else if(item == 3) {
                    return (
                        <RatingStarIcon
                        key={index}
                        source={require('~/Assets/Images/Indicator/rating/ic_ratingStar_3.png')}/>
                    )
                } else if(item == 2) {
                    return (
                        <RatingStarIcon
                        key={index}
                        source={require('~/Assets/Images/Indicator/rating/ic_ratingStar_2.png')}/>
                    )
                } else if(item == 1) {
                    return (
                        <RatingStarIcon
                        key={index}
                        source={require('~/Assets/Images/Indicator/rating/ic_ratingStar_1.png')}/>
                    )
                } else if(item == 0) {
                    return (
                        <RatingStarIcon
                        key={index}
                        source={require('~/Assets/Images/Indicator/rating/ic_ratingStar_0.png')}/>
                    )
                }
            })
            }
            </RatingStarListContainer>
            {(reviewCount > 0) && (
            <ReviewCountContainer>
            <VerticalDivider/>
            <ReviewCountText>
                {`리뷰 ${reviewCount}`}
            </ReviewCountText>
            </ReviewCountContainer>
            )}
        </Container>
    )
}

function isEqual(prevItem: any, nextItem: any) {
    return (prevItem.ratingValue === nextItem.ratingBalue && prevItem.reviewCount === nextItem.reviewCount)
}


export default RatingStarList;
