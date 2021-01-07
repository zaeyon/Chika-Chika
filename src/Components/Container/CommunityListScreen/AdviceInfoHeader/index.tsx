import React, {useState, useCallback} from 'react';
import {Image} from 'react-native';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ContianerView = Styled.View`
width: ${wp('100%')}px;
height: auto;
padding: 24px 16px;
flex-direction: row;
background: #FFFFFF;
margin-bottom: 8px;
`;

const TitleImage = Styled.Image`
width: 26px;
height: 26px;
border-width: 0.5px;
border-color: #E2E6ED;
border-radius: 8px;
`;

const TitleText = Styled.Text`
font-family: NanumSquare;
font-style: normal;
font-weight: bold;
font-size: 16px;
line-height: 24px;
margin-left: 8px;
`;

const ButtonTouchableOpacity = Styled.TouchableOpacity`
justify-content: center;
align-items: center;
flex-direction: row;
margin-left: auto;
`;

const ButtonText = Styled.Text`
font-family: NanumSquare;
font-style: normal;
font-weight: bold;
font-size: 16px;
line-height: 24px;
color: #00D1FF;
margin-right: 4px;
`;

interface Props {
  profile: any;
}
const AdviceInfoHeader = ({profile}: Props) => {
  return (
    <ContianerView>
      <TitleImage
        source={{
          uri: profile.profileImg,
          cache: 'force-cache',
        }}
      />
      <TitleText>{profile.nickname + '님, 무엇이 궁금하세요?'}</TitleText>
      <ButtonTouchableOpacity>
        <ButtonText>{'질문하기'}</ButtonText>
        <Image source={require('~/Assets/Images/Location/ic/next/mini.png')} />
      </ButtonTouchableOpacity>
    </ContianerView>
  );
};

export default AdviceInfoHeader;
