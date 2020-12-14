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

const SavedHospitalItemContinerView = Styled.View`
width: auto;
height: ${hp('24.02%')}px;
margin: 16px;
padding: 24px;
border-radius: 8px;
background: white;
`;

const SavedHospitalItemContentView = Styled.View`
width: 100%
height: ${hp('6.25%')}px;
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
font-weight: bold;
font-size: 20px;
line-height: 24px;
color: #595959;
`;

const SavedHospitalItemDetailView = Styled.View`
width: 100%;
height: auto;
flex-direction: row;
align-items: center;
`;

const SavedHospitalItemDateText = Styled.Text`
font-size: 16px;
line-height: 19px;
margin-right: 16px;
color: #7A7A7A;
`;
const SavedHospitalItemTimeText = Styled.Text`
font-size: 16px;
line-height: 19px;
color: #7A7A7A;
`;

const SavedHospitalButtonContainerView = Styled.View`
width: 100%;
flex: 1;
flex-direction: row;
`;

const ReservationTouchableOpacity = Styled(
  TouchableOpacity as new () => TouchableOpacity,
)`
width: 100%;
height: auto;
border: 1px solid #C4C4C4;
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

interface Props {
  navigation: any;
  route: any;
  hospitals: any;
}

const SavedHospitalScreen = ({navigation, route, hospitals}: Props) => {
  const renderSavedHospitalItemView = ({item, index}: any) => {
    return (
      <SavedHospitalItemContinerView>
        <SavedHospitalItemContentView>
          <SavedHospitalItemTitleView>
            <SavedHospitalItemTitleText>예쁜이치과</SavedHospitalItemTitleText>
            <InfoIconView>
              <InfoIconImage
                style={{
                  resizeMode: 'contain',
                }}
                source={require('~/Assets/Images/Social/ic_vertical_more.png')}
              />
            </InfoIconView>
          </SavedHospitalItemTitleView>
          <SavedHospitalItemDetailView>
            <SavedHospitalItemDateText>20.12.1.화</SavedHospitalItemDateText>
            <SavedHospitalItemTimeText>오후 3:00</SavedHospitalItemTimeText>
          </SavedHospitalItemDetailView>
        </SavedHospitalItemContentView>
        <Line />
        <SavedHospitalButtonContainerView>
          <ReservationTouchableOpacity>
            <ReservationText>예약하기</ReservationText>
          </ReservationTouchableOpacity>
        </SavedHospitalButtonContainerView>
      </SavedHospitalItemContinerView>
    );
  };

  return (
    <ContainerView>
      <FlatList
        data={hospitals}
        keyExtractor={(item) => item.id}
        renderItem={renderSavedHospitalItemView}
      />
    </ContainerView>
  );
};
export default SavedHospitalScreen;
