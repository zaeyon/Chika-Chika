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

const SavedHospitalItemContainerView = Styled.View`
width: auto;
margin: 16px;
padding: 24px;
border-radius: 8px;
background: white;
justify-content: space-between;
`;

const SavedHospitalItemContentView = Styled.View`
width: 100%
background: white;
`;

const SavedHospitalItemTitleView = Styled.View`
width: 100%;
height: auto;
flex-direction: row;
align-items: center;
margin-bottom: 8px;
`;

const SavedHospitalItemTitleText = Styled.Text`
font-style: normal;
font-weight: bold;
font-size: 18px;
line-height: 24px;
`;

const SavedHospitalItemDetailView = Styled.View`
width: 100%;
height: auto;
flex-direction: row;
align-items: center;
`;

const SavedHospitalItemLocationText = Styled.Text`
font-style: normal;
font-weight: bold;
font-size: 14px;
line-height: 16px;
margin-bottom: 8px;
`;

const SavedHospitalItemDateText = Styled.Text`
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 24px;
`;

const SavedHospitalItemTimeText = Styled.Text`
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 24px;
`;

const SavedHospitalButtonContainerView = Styled.View`
width: 100%;
height: ${hp('5.882%')}px;
flex-direction: row;
`;

const ReservationTouchableOpacity = Styled(
  TouchableOpacity as new () => TouchableOpacity,
)`
width: 100%;
height: 100%;
border: 1px #C4C4C4;
border-radius: 8px;
background: white;
justify-content: center;
align-items: center;
`;
const ReservationText = Styled.Text`
font-size: 16px;
line-height: 19px;
color: #595959;
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
  hospitals: any;
}

const SavedHospitalScreen = ({navigation, route, hospitals}: Props) => {
  const renderSavedHospitalItemView = ({item, index}: any) => {
    return (
      <SavedHospitalItemContainerView>
        <SavedHospitalItemContentView>
          <SavedHospitalItemTitleView>
            <SavedHospitalItemTitleText>예쁜이치과</SavedHospitalItemTitleText>
            <InfoIconView>
              <InfoIconImage
                style={{
                  resizeMode: 'contain',
                }}
                source={require('~/Assets/Images/Indicator/ic_vertical_more.png')}
              />
            </InfoIconView>
          </SavedHospitalItemTitleView>
          <SavedHospitalItemLocationText>
            {'경기도 수원시 영통구 이의동'}
          </SavedHospitalItemLocationText>
          <SavedHospitalItemDetailView>
            <SavedHospitalItemDateText>20.12.1.화</SavedHospitalItemDateText>
            <DateTimeDivider />
            <SavedHospitalItemTimeText>오후 3:00</SavedHospitalItemTimeText>
          </SavedHospitalItemDetailView>
        </SavedHospitalItemContentView>
        <Line />
        <SavedHospitalButtonContainerView>
          <ReservationTouchableOpacity>
            <ReservationText>예약하기</ReservationText>
          </ReservationTouchableOpacity>
        </SavedHospitalButtonContainerView>
      </SavedHospitalItemContainerView>
    );
  };

  return (
    <ContainerView>
      <FlatList
        data={hospitals}
        keyExtractor={(item) => item.id}
        alwaysBounceVertical={false}
        renderItem={renderSavedHospitalItemView}
      />
    </ContainerView>
  );
};
export default SavedHospitalScreen;
