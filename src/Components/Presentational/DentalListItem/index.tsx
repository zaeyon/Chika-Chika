import React, {useCallback} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Local Components
import RatingStarList from '~/Components/Presentational/RatingStarList';

const Container = Styled.View`
width: ${wp('100%')}px;
background-color: #ffffff;
border-bottom-width: 8px;
border-color: #F5F7F9;
`;

const BodyContainer = Styled.View`
flex-direction: row;
justify-content: space-between;
padding: 16px 16px 8px 16px;
`;

const HeaderContainer = Styled.View`
flex-direction: row;
align-items: center;
`;

const DentalInfoContainer = Styled.View`
flex-direction: column;
`;

const DentalImageContainer = Styled.View`
`;

const DentalNameText = Styled.Text`
max-width: ${wp('50%')}px;
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

const CurrentStatusContainer = Styled.View`
flex-direction: row;
`;

const OpenStatusContainer = Styled.View`
background-color: #ffffff;
margin-left: 4px;
border-radius: 100px;
border-width: 1px;
border-color: #00D1FF;
padding: 2px 6px 2px 6px;
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

const CallContainer = Styled.View`
flex-direction: row;
`;

const CallButtonContainer = Styled.View`
padding: 8px 16px 16px 16px;
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

const DentalImage = Styled.Image`
width: ${wp('20.26%')}px;
height: ${wp('20.26%')}px;
border-radius: 8px;
background-color: #c4c4c4;
`;

const CallButtonImage = Styled.Image`
width: ${wp('8.533%')}px;
height: ${wp('8.533%')}px;
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

interface Prop {
  dentalObj: any;
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
  clickDentalCallReservation: (phoneNumber: number, dentalId: number) => void;
}

const DentalListItem = ({
  dentalObj,
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
  clickDentalCallReservation,
}: Prop) => {
  const formatDistance = useCallback((distance: number) => {
    if (distance >= 1) {
      return `${distance}km`;
    } else if (distance >= 0) {
      return `${distance * 1000}m`;
    } else {
      return `알수없음`;
    }
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => moveToDentalDetail(dentalId)}>
      <Container>
        <BodyContainer>
          <DentalInfoContainer>
            <HeaderContainer>
              <DentalNameText>{name}</DentalNameText>
              <CurrentStatusContainer>
                {dentalObj.confidentTOL === 1 && isLunchTime && (
                  <OpenStatusContainer style={{borderColor: '#00D1FF'}}>
                    <CurrentStatusText style={{color: '#00D1FF'}}>
                      {'점심시간'}
                    </CurrentStatusText>
                  </OpenStatusContainer>
                )}
                {dentalObj.confidentConsulationTime === 1 && !isLunchTime && (
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
                ratingValue={reviewCount > 0 ? rating.toFixed(1) : 0}
                reviewCount={reviewCount}
              />
            </ReviewRatingContainer>
            <FooterContainer>
              <DentalAddressText>{address}</DentalAddressText>
              <VerticalDivider />
              <DistanceText>
                {formatDistance(dentalObj['distance(km)'])}
              </DistanceText>
            </FooterContainer>
          </DentalInfoContainer>
          {dentalObj.dentalClinicProfileImgs[0] && (
            <DentalImageContainer>
              <DentalImage
                source={{uri: dentalObj.dentalClinicProfileImgs[0]}}
              />
            </DentalImageContainer>
          )}
        </BodyContainer>
        <CallContainer>
          <TouchableWithoutFeedback
            onPress={() =>
              clickDentalCallReservation(dentalObj.telNumber, dentalId)
            }>
            <CallButtonContainer>
              <CallButtonImage
                source={require('~/Assets/Images/Dental/ic_call_list.png')}
              />
            </CallButtonContainer>
          </TouchableWithoutFeedback>
        </CallContainer>
      </Container>
    </TouchableWithoutFeedback>
  );
};

function isEqualItem(prevItem: any, nextItem: any) {
  return prevItem.dentalId === nextItem.dentalId;
}

const MemoizedDentalListItem = React.memo(DentalListItem, isEqualItem);

export default MemoizedDentalListItem;
