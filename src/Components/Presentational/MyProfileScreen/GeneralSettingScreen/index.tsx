import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, TouchableOpacity, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ContainerView = Styled.View`
flex: 1;
background: white;
`;

const UserSettingView = Styled.View`
width: ${wp('100%')}px;
height: auto;
background: white;
padding: ${hp((26.5 / 812) * 100)}px 0px;
`;

const ContentTouchableOpacity = Styled(
  TouchableOpacity as new () => TouchableOpacity,
)`
width: 100%;
height: ${hp('6.89%')}px;
flex-direction: row;
align-items: center;
padding: 16px;
margin-bottom: 4px;
`;

const ContentTitleText = Styled.Text`
font-weight: bold;
font-size: 16px;
line-height: 24px;
`;

const ContentText = Styled.Text`
font-size: 16px;
line-height: 24px;
color: #7A7A7A;
`;

const ArrowIconView = Styled.View`
width: 7px;
height: 12px;
margin-left: auto;

`;

const ArrowIconImage = Styled.Image`
width: 100%;
height: 100%;
`;

const Line = Styled.View`
margin: 0px 16px;
height: 1px;
background: #EEEEEE;
`;
interface Props {
  navigation: any;
  route: any;
}
const GeneralSettingScreen = ({navigation, route}: Props) => {
  return (
    <ContainerView>
      <UserSettingView>
        <ContentTouchableOpacity>
          <ContentTitleText>개인정보보호정책</ContentTitleText>
          <ArrowIconView>
            <ArrowIconImage
              style={{
                resizeMode: 'contain',
              }}
              source={require('~/Assets/Images/Arrow/ic_rightArrow.png')}
            />
          </ArrowIconView>
        </ContentTouchableOpacity>
        <ContentTouchableOpacity>
          <ContentTitleText>약관 및 이용동의</ContentTitleText>
          <ArrowIconView>
            <ArrowIconImage
              style={{
                resizeMode: 'contain',
              }}
              source={require('~/Assets/Images/Arrow/ic_rightArrow.png')}
            />
          </ArrowIconView>
        </ContentTouchableOpacity>
      </UserSettingView>
      <Line />
      <UserSettingView>
        <ContentTouchableOpacity>
          <ContentTitleText>로그아웃</ContentTitleText>
          <ContentText
            style={{
              marginLeft: 'auto',
            }}>
            회원탈퇴
          </ContentText>
        </ContentTouchableOpacity>
      </UserSettingView>
    </ContainerView>
  );
};
export default GeneralSettingScreen;
