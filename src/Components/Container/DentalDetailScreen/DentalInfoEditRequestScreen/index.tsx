import React, {useState, useEffect, useRef} from 'react';
import SafeAreaView from 'react-native-safe-area-view';
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

// local component;
import NavigationHeader from '~/Components/Presentational/NavigationHeader';

const Container = Styled.View`
 flex: 1;
 background-color: #FFFFFF;
`;

const BodyContainer = Styled.View`
flex: 1;
background-color: #ffffff;
`;

const DentalInfoContainer = Styled.View`
padding-top: 24px;
padding-left: 16px;
padding-bottom: 24px;
padding-right: 16px;
`;

const DentalNameText = Styled.Text`
font-family: NanumSquare;
font-weight: 800;
font-size: 20px;
line-height: 24px;
`;

const DentalAddressText = Styled.Text`
font-family: NanumSquare;
font-weight: 400;
font-size: 14px;
line-height: 24px;
color: #4E525D;
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
    <Container as={SafeAreaView} forceInset={{top: 'always'}}>
      <NavigationHeader
      headerLeftProps={{type: "arrow", onPress: goBack}}
      headerRightProps={{type: 'text', text: "다음"}}
      headerTitle={"정보수정 요청"}/>
      <BodyContainer></BodyContainer>
    </Container>
  );
};

export default DentalInfoEditRequestScreen;
