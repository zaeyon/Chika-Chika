import React from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Container = Styled.View`
width: ${wp('100%')}px;\
padding: 16px;
background-color: #ffffff;
border-bottom-width: 2px;
border-color: #eeeeee;
`;

const DentalNameText = Styled.Text`
margin-top: 8px;
font-weight: 400;
font-size: 18px;
color: #000000;
`;

const DentalAddressText = Styled.Text`
margin-top: 5px;
font-weight: 400;
color: #979797;
font-size: 12px;
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
margin-top: 8px;
flex-direction: row;
align-items: center;
`;

const ReviewRatingText = Styled.Text`
font-weight: 700;
font-size: 14px;
color: #464646;
`;

const RatingStarIcon = Styled.Image`
width: ${wp('3.2%')}px;
height: ${wp('3.2%')}px;
margin-left: 2px;
`;

const ReviewCountText = Styled.Text`
font-weight: 400;
font-size: 14px;
color: #464646;
`;

const CallAppointmentButton = Styled.View`
margin-top: 19px;
width: ${wp('29.3%')}px;
height: ${wp('11.18%')}px;
background-color: #f2f2f2;
border-radius: 8px;
align-items: center;
justify-content: center; 
`;

const CallAppointmentText = Styled.Text`
font-weight: 400;
font-size: 12px;
color: #000000;
`;

interface Prop {
  dentalId: number;
  isOpen: boolean;
  isLunchTime: boolean;
  rating: number;
  reviewCount: number;
  name: string;
  address: string;
  lunchTime: string;
  openTime: string;
  closeTime: string;
  moveToDentalDetail: (dentalId: number) => void;
}

const DentalListItem = ({
  dentalId,
  name,
  address,
  isOpen,
  isLunchTime,
  rating,
  reviewCount,
  lunchTime,
  openTime,
  closeTime,
  moveToDentalDetail,
}: Prop) => {
  return (
    <TouchableWithoutFeedback onPress={() => moveToDentalDetail(dentalId)}>
      <Container>
        <CurrentStatusContainer>
          <OpenStatusContainer
            style={
              isOpen
                ? {backgroundColor: '#0075FF'}
                : {backgroundColor: '#ffffff'}
            }>
            <CurrentStatusText
              style={isOpen ? {color: '#ffffff'} : {color: '#7a7a7a'}}>
              {'진료중'}
            </CurrentStatusText>
          </OpenStatusContainer>
          <LauchTimeStatusContainer
            style={
              isLunchTime
                ? {backgroundColor: '#0075FF'}
                : {backgroundColor: '#ffffff'}
            }>
            <CurrentStatusText
              style={isLunchTime ? {color: '#ffffff'} : {color: '#7a7a7a'}}>
              {'점심시간'}
            </CurrentStatusText>
          </LauchTimeStatusContainer>
        </CurrentStatusContainer>
        <DentalNameText>{name}</DentalNameText>
        <ReviewRatingContainer>
          <ReviewRatingText>{rating}</ReviewRatingText>
          <RatingStarIcon
            source={require('~/Assets/Images/Indicator/ic_ratingStar.png')}
          />
          <RatingStarIcon
            source={require('~/Assets/Images/Indicator/ic_ratingStar.png')}
          />
          <RatingStarIcon
            source={require('~/Assets/Images/Indicator/ic_ratingStar.png')}
          />
          <RatingStarIcon
            source={require('~/Assets/Images/Indicator/ic_ratingStar.png')}
          />
          <RatingStarIcon
            source={require('~/Assets/Images/Indicator/ic_ratingStar.png')}
          />
          <ReviewCountText
            style={{marginLeft: 4}}>{`리뷰 ${reviewCount}`}</ReviewCountText>
        </ReviewRatingContainer>
        <DentalAddressText>{address}</DentalAddressText>
        <CallAppointmentButton>
          <CallAppointmentText>{'예약전화'}</CallAppointmentText>
        </CallAppointmentButton>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default DentalListItem;
