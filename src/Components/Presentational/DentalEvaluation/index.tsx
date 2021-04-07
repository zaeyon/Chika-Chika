import React from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen'; 


const EvaluationContainer = Styled.View`
flex-direction: row;
align-items: center;
`;

const RecommendIcon = Styled.Image`
width: ${wp('5%')}px;
height: ${wp('5%')}px;
`;

const RecommendCountText = Styled.Text`
margin-left: 3.5px;
font-weight: 700;
font-size: 14px;
line-height: 18px;
color: #00D1FF;
`;

const VerticalDividerBar = Styled.View`
margin-left: 4px;
margin-right: 4px;
width: 0.9px;
height: ${hp('1.1%')}px;
background-color: #E2E6ED;
`;

const ReviewCountText = Styled.Text`
font-weight: 400;
font-size: 14px;
line-height: 18px;
color: #9AA2A9;
`;

interface Props {
    recommendCount: number,
    reviewCount: number
}

const DentalEvaluation = ({recommendCount, reviewCount}: Props) => {

    return (
        <EvaluationContainer>
            <RecommendIcon
            source={require('~/Assets/Images/Dental/ic_recommend.png')}/>
            <RecommendCountText>{`추천 ${recommendCount}`}</RecommendCountText>
            <VerticalDividerBar/>
            <ReviewCountText>{`리뷰 ${reviewCount}`}</ReviewCountText>
        </EvaluationContainer>
    )
}

export default DentalEvaluation;