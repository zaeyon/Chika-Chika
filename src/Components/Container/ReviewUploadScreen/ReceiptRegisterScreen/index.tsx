import React, {useState, useEffect, createRef} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {NavigationContainer} from '@react-navigation/native';
import ActionSheet from 'react-native-actionsheet';

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
padding: 0px 16px 0px 16px;
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
font-weight: bold;
font-size: 18px; 
`;

const HeaderRightContainer = Styled.View`
height: ${wp('13.8%')}px;
padding: 0px 16px 0px 16px;
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
`;

const TakePhotoText = Styled.Text`
`;

const GalleryText = Styled.Text`
margin-top: 30px;
`;

const ReceiptPromotionContainer = Styled.View`
background-color: #c3c3c3;
flex: 2;
`;

const ReceiptRegisterContainer = Styled.View`
background-color: #ffffff;
flex: 1.5;
align-items: center;
padding-top: 40px;
`;

const ReceiptRegisterButton = Styled.View`
width: ${wp('91.46%')}px;
height: ${wp('14.93%')}px;
border-width: 1px;
border-color: #c4c4c4;
border-radius: 8px;
align-items: center;
justify-content: center;
`;

const ReceiptRegisterText = Styled.Text`
font-size: 18px;
color: #000000;
`;

const SkipContainer = Styled.View`
padding: 20px;
`;

const SkipText = Styled.Text`
margin-top: 50px;
font-size: 18px;
color: #000000;
`;

interface Props {
  navigation: any;
  route: any;
}

const ReceiptRegisterScreen = ({navigation, route}: Props) => {
  const actionSheetRef = createRef();

  const goBack = () => {
    navigation.goBack();
  };

  const onPressReceiptButton = () => {
    actionSheetRef.current.show();
  };

  const onPressActionSheet = (index: number) => {
    if (index === 1) {
      navigation.navigate('ReceiptCamera');
    } else if (index === 2) {
      navigation.navigate('GallerySelectOne', {});
    }
  };

  const onPressSkip = () => {
    navigation.navigate('ReviewMetaDataScreen', {
      requestType: 'post',
    });
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
        <HeaderTitleText>작성</HeaderTitleText>
        <HeaderRightContainer>
          <HeaderEmptyContainer></HeaderEmptyContainer>
        </HeaderRightContainer>
      </HeaderBar>
      <BodyContainer>
        <ReceiptPromotionContainer></ReceiptPromotionContainer>
        <ReceiptRegisterContainer>
          <TouchableWithoutFeedback onPress={() => onPressReceiptButton()}>
            <ReceiptRegisterButton>
              <ReceiptRegisterText>영수증 리뷰 쓰기</ReceiptRegisterText>
            </ReceiptRegisterButton>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => onPressSkip()}>
            <SkipContainer>
              <SkipText>건너뛰기</SkipText>
            </SkipContainer>
          </TouchableWithoutFeedback>
        </ReceiptRegisterContainer>
      </BodyContainer>
      <ActionSheet
        ref={actionSheetRef}
        options={['취소', '카메라', '앨범']}
        cancelButtonIndex={0}
        onPress={(index: any) => onPressActionSheet(index)}
      />
    </Container>
  );
};

export default ReceiptRegisterScreen;
