import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, TouchableOpacity, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ContainerView = Styled.View`
flex: 1;
background: #EEEEEE;
`;

const PrivacySettingView = Styled.View`
width: ${wp('100%')}px;
height: auto;
margin-bottom: 12px;
background: white;
`;

const SettingTitleView = Styled.View`
width: 100%;
height: ${hp('6.89%')}px;
margin-bottom: 4px;
padding: 16px 
justify-content: center;
`;

const SettingTitleText = Styled.Text`
font-size: 12px;
line-height: 24px;
color: #7A7A7A;
`;

const UserSettingView = Styled.View`
width: ${wp('100%')}px;
flex: 1;
background: white;
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
width: 91px;
`;

const ContentText = Styled.Text`
font-size: 16px;
line-height: 24px;
color: #7A7A7A;
`;

const VerificatedView = Styled.View`
width: 58px;
height: 24px;
margin-left: auto;
background: #EEEEEE;
border-radius: 4px;
`;

const VerificatedText = Styled.Text`
font-size: 12px;
line-height: 24px;
text-align: center;
color: #7A7A7A;
`;

const ArrowIconView = Styled.View`
width: 7px;
height: 12px;
margin-left: 16px;

`;

const ArrowIconImage = Styled.Image`
width: 100%;
height: 100%;
`;
interface Props {
  navigation: any;
  route: any;
}

const EditProfileScreen = ({navigation, route}: Props) => {
  return (
    <ContainerView>
      <PrivacySettingView>
        <SettingTitleView>
          <SettingTitleText>개인설정</SettingTitleText>
        </SettingTitleView>
        <ContentTouchableOpacity>
          <ContentTitleText>전화번호</ContentTitleText>
          <ContentText>010-1234-1232</ContentText>
        </ContentTouchableOpacity>
        <ContentTouchableOpacity>
          <ContentTitleText>성별</ContentTitleText>
          <ContentText>미등록</ContentText>
        </ContentTouchableOpacity>
        <ContentTouchableOpacity>
          <ContentTitleText>생일</ContentTitleText>
          <ContentText>미등록</ContentText>
        </ContentTouchableOpacity>
      </PrivacySettingView>
      <UserSettingView>
        <SettingTitleView>
          <SettingTitleText>회원설정</SettingTitleText>
        </SettingTitleView>
        <ContentTouchableOpacity>
          <ContentTitleText>연동계정</ContentTitleText>
          <ContentText>카카오 로그인</ContentText>
        </ContentTouchableOpacity>
        <ContentTouchableOpacity>
          <ContentTitleText>본인 인증</ContentTitleText>
          <VerificatedView>
            <VerificatedText>미인증</VerificatedText>
          </VerificatedView>
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
    </ContainerView>
  );
};

export default EditProfileScreen;
