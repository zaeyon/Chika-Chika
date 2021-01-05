import React from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Container = Styled.View`
flex-direction: row;
`;

const RatingImage = Styled.Image`
`;

interface Props {
    ratingValue: number,
    ratingImage: any,
    interval: number
}

const ShowingRating = ({ratingValue, ratingImage, interval}: Props) => {

    let isInteger = false;
    let tmpArray = [0, 0, 0, 0, 0]

    if(ratingValue % 1 !== 0) {
        
        for(var i = 0; i < Math.round(ratingValue); i++) {
            if(i === Math.round(ratingValue) - 1) {
                tmpArray[i] = 0.5
            } else {
                tmpArray[i] = 1
            }
        }
        
    } else if(ratingValue % 1 === 0) {
        
        for(var i = 0; i < ratingValue; i++) {
            tmpArray[i] = 1
        }
    }


    return (
        <Container>
            {tmpArray.map((item, index) => {
                if(item === 0) {
                    return (
                        <RatingImage
                        style={[{tintColor: "#CCD1DD"}, index !== 0 && {marginLeft: 4}]}
                        source={require('~/Assets/Images/Indicator/ic_ratingStar.png')}/>
                    )
                } else if(item === 1) {
                    return (
                        <RatingImage
                        style={index !== 0 && {marginLeft: 4}}
                        source={require('~/Assets/Images/Indicator/ic_ratingStar.png')}/>
                    )
                } else if(item === 0.5) {
                    return (
                        <RatingImage
                        style={index !== 0 && {marginLeft: 4}}
                        source={require('~/Assets/Images/Indicator/ic_ratingStar.png')}/>
                    )
                } 
            })}
        </Container>
    )
}

export default ShowingRating