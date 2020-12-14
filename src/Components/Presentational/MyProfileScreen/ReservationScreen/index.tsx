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
background: #EEEEEE;
`;

const ReservationItemContinerView = Styled.View`
width: auto;
height: ${hp('24.019%')}px;
margin: 18px;
padding: 26px;
border-radius: 8px;
background: white;
`;

const ReservationItemContentView = Styled.View`
width: 100%
height: ${hp('6.25%')}px;
`;

const ReservationItemTitleView = Styled.View`
width: 100%;
height: auto;
flex-direction: row;
align-items: center;
margin-bottom: 8px;
`;

const ReservationItemTitleText = Styled.Text`
font-weight: bold;
font-size: 22px;
line-height: 26px;
color: #595959;
`;

const ReservationItemDetailView = Styled.View`
width: 100%;
height: auto;
flex-direction: row;
align-items: center;
margin-top: auto;
`;

const ReservationItemDateText = Styled.Text`
font-size: 18px;
line-height: 21px;
margin-right: 16px;
color: #7A7A7A;
`;
const ReservationItemTimeText = Styled.Text`
font-size: 18px;
line-height: 21px;
color: #7A7A7A;
`;

const ReservationButtonContainerView = Styled.View`
width: 100%;
flex: 1;
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
font-size: 18px;
line-height: 21px;
color: #595959;
`;
const ReReservationTouchableOpacity = Styled(
  TouchableOpacity as new () => TouchableOpacity,
)`
width: 61.0169%;
height: 100%;
border: 1px solid #C4C4C4;
border-radius: 8px;
background: white;
margin-left: auto;
justify-content: center;
align-items: center;
`;
const ReReservationText = Styled.Text`
font-size: 18px;
line-height: 21px;
color: #595959;
`;

const ArrowIconView = Styled.View`
width: 6px;
height: 10px;
margin-left: 10px;

`;

const ArrowIconImage = Styled.Image`
width: 100%;
height: 100%;
`;
const InfoIconView = Styled.View`
width: 14px;
height: 16px;
margin-left: auto;
`;

const InfoIconImage = Styled.Image`
width: 100%;
height: 100%;
`;

const Line = Styled.View`
margin: 26px 0px;
height: 1px;
background: #EEEEEE;
`;

interface Props {
  navigation: any;
  route: any;
  reservations: any;
}

const ReservationScreen = ({navigation, route, reservations}: Props) => {
  const renderReservationItemView = ({item, index}: any) => {
    return (
      <ReservationItemContinerView>
        <ReservationItemContentView>
          <ReservationItemTitleView>
            <ReservationItemTitleText>예쁜이치과</ReservationItemTitleText>
            <ArrowIconView>
              <ArrowIconImage
                style={{
                  resizeMode: 'contain',
                }}
                source={require('~/Assets/Images/Arrow/ic_rightArrow.png')}
              />
            </ArrowIconView>
            <InfoIconView>
              <InfoIconImage
                style={{
                  resizeMode: 'contain',
                }}
                source={require('~/Assets/Images/Social/ic_vertical_more.png')}
              />
            </InfoIconView>
          </ReservationItemTitleView>
          <ReservationItemDetailView>
            <ReservationItemDateText>20.12.1.화</ReservationItemDateText>
            <ReservationItemTimeText>오후 3:00</ReservationItemTimeText>
          </ReservationItemDetailView>
        </ReservationItemContentView>
        <Line />
        <ReservationButtonContainerView>
          <CreateReviewTouchableOpacity>
            <CreateReviewText>리뷰작성</CreateReviewText>
          </CreateReviewTouchableOpacity>
          <ReReservationTouchableOpacity>
            <ReReservationText>다시예약</ReReservationText>
          </ReReservationTouchableOpacity>
        </ReservationButtonContainerView>
      </ReservationItemContinerView>
    );
  };

  return (
    <ContainerView>
      <FlatList
        data={reservations}
        keyExtractor={(item) => item.id}
        renderItem={renderReservationItemView}
      />
    </ContainerView>
  );
};
export default ReservationScreen;
