import React, {useState, useEffect, useRef} from 'react';
import Styled from 'styled-components/native';
import {
  TouchableWithoutFeedback,
  FlatList,
  ScrollView,
  Keyboard,
  StyleSheet,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import NaverMapView, {Marker} from 'react-native-nmap';
import {NavigationContainer} from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import {FlingGestureHandler} from 'react-native-gesture-handler';

const Container = Styled.SafeAreaView`
 flex: 1;
 background-color: #FFFFFF;
`;

const HeaderBar = Styled.View`
 width: ${wp('100%')}px;
 height: ${wp('13.8%')}px;
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
 background-color:#ffffff;
 border-bottom-width: 0.6px;
 border-color: #ECECEE;
`;

const HeaderLeftContainer = Styled.View`
height: ${wp('13.8%')}px;
padding: 0px 16px 0px 15px;
 align-items: center;
 justify-content: center;
 flex-direction: row;
`;

const HeaderBackIcon = Styled.Image`
width: ${wp('6.4%')}px;
height: ${wp('6.4%')}px;
`;

const HeaderTitleText = Styled.Text`
margin-top: 5px;
font-weight: 700;
font-size: 18px;
color: #000000;
`;

const HeaderRightContainer = Styled.View`
height: ${wp('13.8%')}px;
padding: 0px 16px 0px 15px;
 align-items: center;
 justify-content: center;
 flex-direction: row;
`;

const HeaderEmptyContainer = Styled.View`
width: ${wp('6.4%')}px;
height: ${wp('6.4%')}px;
`;

const BodyContainer = Styled.View`
flex: 1;
background-color: #ffffff;
`;

const MakeDentalAccountButton = Styled.View`
align-items: center;
justify-content: center;
width: ${wp('40.53%')}px;
height: ${wp('23.46%')}px;
border-width: 1px;
`;

const ReserveByPhoneContainer = Styled.View`
margin-top: 24px;
align-items: center;
`;

const RequestButton = Styled.View`
width: ${wp('90.133%')}px;
height: ${wp('14.93%')}px;
border-radius: 8px;
background-color: #c4c4c4;
align-items: center;
justify-content: center;
`;

interface Props {
  navigation: any;
  route: any;
}

const DentalInfoEditRequestScreen = ({navigation, route}: Props) => {
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <Container>
      <HeaderBar>
        <TouchableWithoutFeedback onPress={() => goBack()}>
          <HeaderLeftContainer>
            <HeaderBackIcon
              source={require('~/Assets/Images/HeaderBar/ic_back.png')}
            />
          </HeaderLeftContainer>
        </TouchableWithoutFeedback>
        <HeaderTitleText>{'정보 수정 요청하기'}</HeaderTitleText>
        <HeaderRightContainer>
          <HeaderEmptyContainer></HeaderEmptyContainer>
        </HeaderRightContainer>
      </HeaderBar>
      <BodyContainer></BodyContainer>
    </Container>
  );
};

export default DentalInfoEditRequestScreen;
