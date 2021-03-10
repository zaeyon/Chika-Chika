import React, {useState, useRef} from 'react';
import {TouchableWithoutFeedback, Animated} from 'react-native';
import Styled from 'styled-components/native';
import {RNCamera} from 'react-native-camera';
import CameraRoll from '@react-native-community/cameraroll';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {isIphoneX} from 'react-native-iphone-x-helper';
// import DeviceInfo from 'react-native-device-info';
import {hasNotch} from '~/method/deviceInfo'

import MeasuredBrushSlidingUpPanel from '~/Components/Presentational/TeethCareScreen/MeasuredBrushSlidingUpPanel';

const Container = Styled.View`
width: ${wp('100%')}px;
height: ${hp('100%')}px;
`;

const HeaderBar = Styled.View`
position: absolute;
top: ${hasNotch() ? hp('5%') : hp('4%')}
width: ${wp('100%')}px;
height: ${wp('13.8%')}px;
flex-direction: row;
align-items: center;
justify-content: space-between;
`;

const HeaderLeftContainer = Styled.View`
padding: 7px 15px 13px 16px;
height: ${wp('13.8%')}px;
align-items: center;
justify-content: center;
`;

const HeaderEmptyContainer = Styled.View`
width: ${wp('6.4%')}px;
height: ${wp('6.4%')}px;
`;

const HeaderTitleText = Styled.Text`
font-size: 16px;
color: #ffffff;
`;

const HeaderCancelIcon = Styled.Image`
width: ${wp('6.4%')}px;
height: ${wp('6.4%')}px;
tint-color: #ffffff;
`;

const HeaderRightContainer = Styled.View`
padding: 7px 15px 13px 16px;
height: ${wp('13.8%')}px;
align-items: center;
justify-content: center;
`;

const TakenPictureImage = Styled.Image`
width: ${wp('100%')}px;
height: ${hp('100%')}px;
`;

const TakenPictureBackground = Styled.View`
position: absolute;
width: ${wp('100%')}px;
height: ${hp('100%')}px;
background-color: #000000;
opacity: 0.8;
`;

const TakenPictureCover = Styled.View`
width: ${wp('100%')}px;
height: ${hp('100%')}px;
align-items: center;
position: absolute;
`;

const ResultCircle = Styled.View`
width: ${wp('31.2%')}px;
height: ${wp('31.2%')}px;
border-width: 1px;
border-color: #c4c4c4;
border-radius: 100px;
`;

const ResultContainer = Styled.View`
width: ${wp('100%')}px;
padding-top: ${hp('15.28%')}px;
align-items: center;
`;

const ResultTextContainer = Styled.View`
margin-top: 16px;
align-items: center;
`;

const MainResultText = Styled.Text`
font-weight: 700;
font-size: 20px;
color: #ffffff;
`;

const SubResultText = Styled.Text`
margin-top: 5px;
font-weight: 400;
font-size: 14px;
color: #ffffff;
`;

const RemeasureButton = Styled.View`
margin-top: 14px;
padding-top: 9px;
padding-bottom: 9px;
padding-left: 40px;
padding-right: 40px;
background-color: #cccccc60;
border-radius: 100px;
`;

const RemeasureText = Styled.Text`
font-weight: 400;
color: #ffffff;
opacity: 1;
font-size: 14px;
`;

interface Props {
  navigation: any;
  route: any;
}

const MeasuredBrushPictureScreen = ({navigation, route}: Props) => {

  console.log(
    'MeasuredBrushPictureScreen route.params.takenPicture',
    route.params.takenPicture,
  );

  const moveToBrushDetritionCamera = () => {
    navigation.push('BrushDetritionCamera', {
      remeasure: true,
    });
  };

  const goBack = () => {
    navigation.navigate('TeethCareScreen');
  };

  return (
    <Container>
      <TakenPictureImage source={{uri: route.params.takenPicture}} />
      <TakenPictureBackground />
      <TakenPictureCover>
        <ResultContainer>
          <ResultCircle />
          <ResultTextContainer>
            <MainResultText>{'당신의 칫솔 안녕하신가유'}</MainResultText>
            <SubResultText>{'오늘도 오셨군요!'}</SubResultText>
          </ResultTextContainer>
          <TouchableWithoutFeedback
            onPress={() => moveToBrushDetritionCamera()}>
            <RemeasureButton>
              <RemeasureText>{'다시 측정하기'}</RemeasureText>
            </RemeasureButton>
          </TouchableWithoutFeedback>
        </ResultContainer>
        <MeasuredBrushSlidingUpPanel navigation={navigation} route={route} />
      </TakenPictureCover>
      <HeaderBar>
        <HeaderLeftContainer>
          <HeaderEmptyContainer />
        </HeaderLeftContainer>
        <HeaderTitleText>측정하기</HeaderTitleText>
        <TouchableWithoutFeedback onPress={() => goBack()}>
          <HeaderRightContainer>
            <HeaderCancelIcon
              source={require('~/Assets/Images/HeaderBar/ic_X.png')}
            />
          </HeaderRightContainer>
        </TouchableWithoutFeedback>
      </HeaderBar>
    </Container>
  );
};

export default MeasuredBrushPictureScreen;
