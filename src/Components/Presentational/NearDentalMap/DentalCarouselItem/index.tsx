import React from 'react';
import Styled from 'styled-components/native';
import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import RatingStarList from '~/Components/Presentational/RatingStarList';

const Container = Styled.View`
width: ${wp('91.46%')}px;
padding: 16px;
flex-direction: row;
justify-content: space-between;
background-color: #ffffff;
border-radius: 8px;
border-width: 1px;
border-color: #E2E6ED;
`;

const DentalImageContainer = Styled.View`
width: ${wp('25%')}px;
height: ${wp('25%')}px;
`;

const DentalImage = Styled.Image`
width: ${wp('25%')}px;
height: ${wp('25%')}px;
`;

const HeaderContainer = Styled.View`
flex-direction: row;
align-items: center;
`;

const OpenStatusContainer = Styled.View`
background-color: #ffffff;
margin-left: 4px;
border-radius: 100px;
border-width: 1px;
border-color: #00D1FF;
padding: 2px 6px 2px 6px;
`;

const CurrentStatusContainer = Styled.View`
flex-direction: row;
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
font-size: 11px;
line-height: 18px;
font-weight: 400;
color: #00D1FF;
`;

const ReviewRatingContainer = Styled.View`
margin-top: 8px;
flex-direction: row;
align-items: center;
`;


const DentalInfoContainer = Styled.View`
flex-direction: column;
`;

const DentalNameText = Styled.Text`
font-weight: 600;
color: #131F3C;
font-size: 18px;
line-height: 24px;
`;

const DentalAddressText = Styled.Text`
font-weight: 400;
font-size: 14px;
color: #4E525D;
line-height: 16px;
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

const CallContainer = Styled.View`
`;

const CallButtonImage = Styled.Image`
width: ${wp('13.86%')}px;
height: ${wp('13.86%')}px;
`;

const FooterContainer = Styled.View`
margin-top: 9px;
flex-direction: row;
align-items: center;
`;

const VerticalDivider = Styled.View`
margin-left: 4px;
margin-right: 4px;
width: 0.5px;
height: ${hp('0.98%')}px;
background-color: #E2E6ED;
`;

const DistanceText = Styled.Text`
font-weight: 400;
color: #00D1FF;
font-size: 14px;
line-height: 18px;
`;





interface Props {
  dentalObj: any,
  isOpen: boolean;
  isLunchTime: boolean;
  rating: number;
  reviewCount: number;
  name: string;
  address: string;
  lunchTime: string;
  openTime: string;
  closeTime: string;
}

const DentalCarouselItem = ({
  dentalObj,
  isOpen,
  isLunchTime,
  rating,
  reviewCount,
  name,
  address,
  lunchTime,
  openTime,
  closeTime,
}: Props) => {

  const distance = Math.round(dentalObj['distance(km)'] * 1000);

  return (
    <Container
    style={styles.containerShadow}>
    <DentalInfoContainer>
      <HeaderContainer>
      <DentalNameText>{name}</DentalNameText>
        <CurrentStatusContainer>
          {(dentalObj.confidentTOL === 1) && isLunchTime && (
          <OpenStatusContainer
            style={{borderColor: '#00D1FF'}}>
            <CurrentStatusText
              style={{color: '#00D1FF'}}>
              {'점심시간'}
            </CurrentStatusText>
          </OpenStatusContainer>
          )}
          {(dentalObj.confidentConsulationTime === 1) && !isLunchTime && (
          <OpenStatusContainer
            style={
              isOpen
                ? {borderColor: '#00D1FF'}
                : {borderColor: '#9AA2A9'}
            }>
            <CurrentStatusText
              style={isOpen ? {color: '#00D1FF'} : {color: '#9AA2A9'}}>
              {'진료중'}
            </CurrentStatusText>
          </OpenStatusContainer>
          )}
        </CurrentStatusContainer>
      </HeaderContainer>
        <ReviewRatingContainer>
          <RatingStarList
          ratingValue={reviewCount > 0 ? (rating.toFixed(1)) : (0)}
          reviewCount={reviewCount}/>
        </ReviewRatingContainer>
      <FooterContainer>
      <DentalAddressText>{address}</DentalAddressText>
      <VerticalDivider/>
      <DistanceText>{distance + "m"}</DistanceText>

      </FooterContainer>
    </DentalInfoContainer>
    <CallContainer>
      <CallButtonImage
      source={require('~/Assets/Images/Dental/ic_call.png')}/>
    </CallContainer>
    </Container>
  );
};

const styles = StyleSheet.create({
  containerShadow: {
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  }


})

export default DentalCarouselItem;
