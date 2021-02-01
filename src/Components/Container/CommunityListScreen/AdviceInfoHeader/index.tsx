import React, {useState, useCallback} from 'react';
import {Image} from 'react-native';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ContianerView = Styled.View`
width: auto;
height: auto;
margin: 0px 8px;
padding: 24px 16px;
flex-direction: row;
align-items: center;
background: #00D1FF;
border-radius: 8px;
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
 
font-style: normal;
font-weight: bold;
font-size: 16px;
line-height: 16px;
color: #FFFFFF;
`;

const ButtonTouchableOpacity = Styled.TouchableOpacity`
justify-content: center;
align-items: center;
flex-direction: row;
margin-left: auto;
`;

const ButtonText = Styled.Text`
 
font-style: normal;
font-weight: normal;
font-size: 16px;
line-height: 24px;
color: #FFFFFF;
`;

const ButtonUnderlineView = Styled.View`
position: absolute;
width: 100%;
height: 1px;
bottom: 0px;
background: #FFFFFF;
`;

interface Props {
  profile: any;
}
const AdviceInfoHeader = ({profile}: Props) => {
  return (
    <ContianerView>
      <TitleText>{'이웃님, 무엇이 궁금하세요?'}</TitleText>
      <ButtonTouchableOpacity>
        <ButtonText>{'질문하기'}</ButtonText>
        <ButtonUnderlineView />
      </ButtonTouchableOpacity>
    </ContianerView>
  );
};

export default AdviceInfoHeader;
