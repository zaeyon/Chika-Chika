import React from 'react';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {View} from 'react-native';

const Container = Styled.View`
padding-top: 16px;
padding-left: ${wp('5%')}px;
padding-right: ${wp('14%')}px;
padding-bottom: 16px;
background-color: #ffffff;
flex-direction: row;
align-items: center;
`;

const CircleContainer = Styled.View`
width: ${wp('14.9%')}px;
height: ${wp('14.9%')}px;
border-width: ${wp('1%')}px;
border-radius: ${wp('7.5%')}px;
border-color: #E2E6ED;
justify-content: center;
align-items: center;
`;

const FirstCircleProgressLayer = Styled.View`
width: ${wp('14.9%')}px;
height: ${wp('14.9%')}px;
position: absolute;
border-width: ${wp('1%')}px;
border-left-color: transparent;
border-bottom-color: transparent;
border-right-color: #00D1FF;
border-top-color: #00D1FF;
border-radius: ${wp('7.5%')}px;
`;

const SecondCircleProgressLayer = Styled.View`
width: ${wp('14.9%')}px;
height: ${wp('14.9%')}px;
position: absolute;
border-width: ${wp('1%')}px;
border-radius: ${wp('7.5%')}px;
border-left-color: transparent;
border-bottom-color: transparent;
border-right-color: #00D1FF;
border-top-color: #00D1FF;
`;

const CircleOffsetLayer = Styled.View`
width: ${wp('14.9%')}px;
height: ${wp('14.9%')}px;
border-width: ${wp('1%')}px;
border-radius: ${wp('7.5%')}px;
border-left-color: transparent;
border-bottom-color: transparent;
border-right-color: #E2E6ED;
border-top-color: #E2E6ED;
`;

const AvgRatingContainer = Styled.View`
flex-direction: row;
align-items: center;
`;

const RatingStarIcon = Styled.Image`
margin-left: 8px;
width: ${wp('3.2%')}px;
height: ${wp('3.2%')}px;
`;

const AvgRatingText = Styled.Text`
font-weight: 800;
font-size: 18px;
color: #000000;

`;

const RatingListContainer = Styled.View`
margin-left: 16px;
flex-direction: row;
align-items:center;
`;

const RatingItemContainer = Styled.View`
flex-direction: row;
align-items: center;
`;

const RatingTypeText = Styled.Text`
font-weight: 800;
font-size: 14px;
line-height: 24px;
color: #000000;

`;

const RatingValueText = Styled.Text`
margin-left: 2px;
font-weight: 400;
font-size: 14px;
line-height: 24px;
color: #000000;
`;

const RatingItemDivider = Styled.View`
margin-left: 8px;
margin-right: 8px;
width: 1px;
height: ${hp('1.23%')}px;
background-color: #E2E6ED;
border-radius: 100px;
`;

const StarListContainer = Styled.View`
flex-direction: row;
align-items: center;
`;

const RatingCircleProgress = ({rating}: any) => {
  const FirstBaseDegrees = -135;
  const SecondBaseDegrees = 45;

  const percent = (rating / 5) * 100;
  let firstRotateBy = 0;
  let secondRotateBy = 45;

  if (percent > 50) {
    firstRotateBy = 45;
    secondRotateBy = SecondBaseDegrees + (percent - 50) * 3.6;
  } else if (percent <= 50) {
    firstRotateBy = FirstBaseDegrees + percent * 3.6;
  }

  return (
    <CircleContainer>
      <FirstCircleProgressLayer
        style={{
          transform: [{rotateZ: `${firstRotateBy}deg`}],
        }}
      />
      {percent > 50 && (
        <SecondCircleProgressLayer
          style={{
            transform: [{rotateZ: `${secondRotateBy}deg`}],
          }}
        />
      )}
      {percent <= 50 && (
        <CircleOffsetLayer
          style={{
            transform: [{rotateZ: '-135deg'}],
          }}
        />
      )}
      <AvgRatingContainer>
        <AvgRatingText>{rating.toFixed(1)}</AvgRatingText>
      </AvgRatingContainer>
    </CircleContainer>
  );
};

const RatingStarList = ({ratingValue, ratingImage, interval}: any) => {
  let isInteger = false;
  let tmpArray = [0, 0, 0, 0, 0];

  if (ratingValue % 1 !== 0) {
    for (var i = 0; i < Math.round(ratingValue); i++) {
      if (i === Math.round(ratingValue) - 1) {
        tmpArray[i] = 0.5;
      } else {
        tmpArray[i] = 1;
      }
    }
  } else if (ratingValue % 1 === 0) {
    for (var i = 0; i < ratingValue; i++) {
      tmpArray[i] = 1;
    }
  }

  return (
    <StarListContainer>
      {tmpArray.map((item, index) => {
        if (item === 0) {
          return (
            <RatingImage
              style={[{tintColor: '#CCD1DD'}, index !== 0 && {marginLeft: 4}]}
              source={require('~/Assets/Images/Indicator/ic_ratingStar.png')}
            />
          );
        } else if (item === 1) {
          return (
            <RatingImage
              style={index !== 0 && {marginLeft: 4}}
              source={require('~/Assets/Images/Indicator/ic_ratingStar.png')}
            />
          );
        } else if (item === 0.5) {
          return (
            <RatingImage
              style={index !== 0 && {marginLeft: 4}}
              source={require('~/Assets/Images/Indicator/ic_ratingStar.png')}
            />
          );
        } else {
          return <View style={{width: 0, height: 0}} />;
        }
      })}
      <RatingValueText style={{marginTop: 2, marginLeft: 8}}>
        {ratingValue.toFixed(1)}
      </RatingValueText>
    </StarListContainer>
  );
};

interface Props {
  avgRating: number;
  priceRating: number;
  serviceRating: number;
  treatRating: number;
  type: string;
}

const RatingReport = ({
  avgRating,
  priceRating,
  serviceRating,
  treatRating,
  type,
}: Props) => {
  return (
    <Container style={type === 'review' && {paddingTop: 16}}>
      <RatingCircleProgress rating={avgRating} />
      <RatingListContainer>
        <RatingItemContainer>
          <RatingTypeText>{'진료'}</RatingTypeText>
          <RatingStarIcon
            source={require('~/Assets/Images/Indicator/rating/ic_ratingStar_10.png')}
          />
          <RatingValueText>{treatRating.toFixed(1)}</RatingValueText>
        </RatingItemContainer>
        <RatingItemDivider />
        <RatingItemContainer>
          <RatingTypeText>{'서비스'}</RatingTypeText>
          <RatingStarIcon
            source={require('~/Assets/Images/Indicator/rating/ic_ratingStar_10.png')}
          />
          <RatingValueText>{serviceRating.toFixed(1)}</RatingValueText>
        </RatingItemContainer>
        <RatingItemDivider />
        <RatingItemContainer>
          <RatingTypeText>{'가격'}</RatingTypeText>
          <RatingStarIcon
            source={require('~/Assets/Images/Indicator/rating/ic_ratingStar_10.png')}
          />
          <RatingValueText>{priceRating.toFixed(1)}</RatingValueText>
        </RatingItemContainer>
      </RatingListContainer>
    </Container>
  );
};

export default RatingReport;
