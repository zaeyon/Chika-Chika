import React from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const Container = Styled.View`
`;

const RatingStarListContainer = Styled.View`
flex-direction: row;
align-items: center;
`;

const RatingStarIcon = Styled.Image`
margin-right: 2px;
width: ${wp('4.266%')}px;
height: ${wp('4.266%')}px;
`;

interface Props {
    ratingValue: number
}

const RatingStarList = ({ratingValue}: Props) => {

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
            <RatingStarListContainer>
            {ratingArray.map((item, index) => {
                if(item == 10) {
                    return (
                        <RatingStarIcon
                        source={require('~/Assets/Images/Indicator/rating/ic_ratingStar_10.png')}/>
                    )
                } else if(item == 9) {
                    return (
                        <RatingStarIcon
                        source={require('~/Assets/Images/Indicator/rating/ic_ratingStar_9.png')}/>
                    )
                } else if(item == 8) {
                    return (
                        <RatingStarIcon
                        source={require('~/Assets/Images/Indicator/rating/ic_ratingStar_8.png')}/>
                    )
                } else if(item == 7) {
                    return (
                        <RatingStarIcon
                        source={require('~/Assets/Images/Indicator/rating/ic_ratingStar_7.png')}/>
                    )
                } else if(item == 6) {
                    return (
                        <RatingStarIcon
                        source={require('~/Assets/Images/Indicator/rating/ic_ratingStar_6.png')}/>
                    )
                } else if(item == 5) {
                    return (
                        <RatingStarIcon
                        source={require('~/Assets/Images/Indicator/rating/ic_ratingStar_5.png')}/>
                    )
                } else if(item == 4) {
                    return (
                        <RatingStarIcon
                        source={require('~/Assets/Images/Indicator/rating/ic_ratingStar_4.png')}/>
                    )
                } else if(item == 3) {
                    return (
                        <RatingStarIcon
                        source={require('~/Assets/Images/Indicator/rating/ic_ratingStar_3.png')}/>
                    )
                } else if(item == 2) {
                    return (
                        <RatingStarIcon
                        source={require('~/Assets/Images/Indicator/rating/ic_ratingStar_2.png')}/>
                    )
                } else if(item == 1) {
                    return (
                        <RatingStarIcon
                        source={require('~/Assets/Images/Indicator/rating/ic_ratingStar_1.png')}/>
                    )
                } else if(item == 0) {
                    return (
                        <RatingStarIcon
                        source={require('~/Assets/Images/Indicator/rating/ic_ratingStar_0.png')}/>
                    )
                }
            })
            }
            </RatingStarListContainer>
        </Container>
    )
}

export default RatingStarList;
