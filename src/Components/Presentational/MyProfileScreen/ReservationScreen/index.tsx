import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ContainerView = Styled.View`
flex: 1;
background: #F8F8F8;
`;

const ReservationItemContainerView = Styled.View`
width: auto;
margin: 16px;
padding: 24px;
border-radius: 8px;
background: white;
justify-content: space-between;
`;

const ReservationItemContentView = Styled.View`
width: 100%
`;

const ReservationItemTitleView = Styled.View`
width: 100%;
height: auto;
flex-direction: row;
align-items: center;
margin-bottom: 8px;
`;

const ReservationItemTitleText = Styled.Text`
font-family: NanumSquare;
font-style: normal;
font-weight: bold;
font-size: 18px;
line-height: 24px;
`;

const ReservationItemDetailView = Styled.View`
width: 100%;
height: auto;
flex-direction: row;
align-items: center;
margin-top: auto;
`;

const ReservationItemLocationText = Styled.Text`
font-family: NanumSquare;
font-style: normal;
font-weight: bold;
font-size: 14px;
line-height: 16px;
margin-bottom: 8px;
`;

const ReservationItemDateText = Styled.Text`
font-family: NanumSquare;
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 24px;
`;

const ReservationItemTimeText = Styled.Text`
font-family: NanumSquare;
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 24px;
`;

const ReservationButtonContainerView = Styled.View`
width: 100%;
height: ${hp('5.882%')}px;
flex-direction: row;
`;

const CreateReviewTouchableOpacity = Styled(
  TouchableOpacity as new () => TouchableOpacity,
)`
width: 36.27%;
height: 100%;
background: #ECECEE;
border-radius: 8px;
justify-content: center;
align-items: center;
`;
const CreateReviewText = Styled.Text`
font-size: 16px;
line-height: 19px;
color: #595959;
`;
const ReReservationTouchableOpacity = Styled(
  TouchableOpacity as new () => TouchableOpacity,
)`
width: 61.0169%;
height: 100%;
border: 1px #C4C4C4;
border-radius: 8px;
background: white;
margin-left: auto;
justify-content: center;
align-items: center;
`;
const ReReservationText = Styled.Text`
font-size: 16px;
line-height: 19px;
color: #595959;
`;

const ArrowIconView = Styled.View`
width: 4px;
height: 8px;
margin-left: 8px;

`;

const ArrowIconImage = Styled.Image`
width: 100%;
height: 100%;
`;
const InfoIconView = Styled.View`
width: 12px;
height: 14px;
margin-left: auto;
`;

const InfoIconImage = Styled.Image`
width: 100%;
height: 100%;
`;

const Line = Styled.View`
margin: 24px 0px;
height: 1px;
background: #EEEEEE;
`;

const DateTimeDivider = Styled.View`
width: 1px;
height: 8px;
background: #C4C4C4;
margin: 0px 8px;
`;

interface Props {
  navigation: any;
  route: any;
  reservations: any;
}

const ReservationScreen = ({navigation, route, reservations}: Props) => {
  const renderReservationItemView = ({item, index}: any) => {
    return (
      <ReservationItemContainerView>
        <ReservationItemContentView>
          <ReservationItemTitleView>
            <ReservationItemTitleText>{'예쁜이치과'}</ReservationItemTitleText>
            <InfoIconView>
              <InfoIconImage
                style={{
                  resizeMode: 'contain',
                }}
                source={require('~/Assets/Images/Indicator/ic_vertical_more.png')}
              />
            </InfoIconView>
          </ReservationItemTitleView>
          <ReservationItemLocationText>
            {'경기도 수원시 영통구 이의동'}
          </ReservationItemLocationText>
          <ReservationItemDetailView>
            <ReservationItemDateText>{'20.12.1.화'}</ReservationItemDateText>
            <DateTimeDivider />
            <ReservationItemTimeText>{'오후 3:00'}</ReservationItemTimeText>
          </ReservationItemDetailView>
        </ReservationItemContentView>
        <Line />
        <ReservationButtonContainerView>
          <CreateReviewTouchableOpacity>
            <CreateReviewText>{'리뷰작성'}</CreateReviewText>
          </CreateReviewTouchableOpacity>
          <ReReservationTouchableOpacity>
            <ReReservationText>{'다시예약'}</ReReservationText>
          </ReReservationTouchableOpacity>
        </ReservationButtonContainerView>
      </ReservationItemContainerView>
    );
  };

  return (
    <ContainerView>
      <FlatList
        data={reservations}
        keyExtractor={(item) => item.id}
        alwaysBounceVertical={false}
        renderItem={renderReservationItemView}
      />
    </ContainerView>
  );
};
export default ReservationScreen;
