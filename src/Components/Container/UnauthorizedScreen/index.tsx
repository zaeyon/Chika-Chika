import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Container = Styled.View`
  width: ${wp('100%')}px;
  height: ${hp('100%')}px;
  background-color: #0075ff;
  flex: 1;
`;

const LogoContainer = Styled.View`
 flex: 3.5;
`;

const SocialContainer = Styled.View`
 flex: 1.5;
 align-items: center;
 justify-content: center;
`;

const LocalContainer = Styled.View`
 flex: 0.7;
 align-items: center;
 padding-top: 27px;
 padding-left: 20px;
 padding-right: 20px;
`;

const LocalLoginContainer = Styled.View`
 align-items: center;
 justify-content: center;
`;

const LocalLoginText = Styled.Text`
 color: #ffffff;
 font-size: 16px;
 font-weight: bold;
`;

const LocalSignUpContainer = Styled.View`
flex: 1;
align-items: center;
justify-content: center;
`;

const LocalSignUpText = Styled.Text`
 color: #000000;
 font-size: 16px;
`;

const KakaoLoginButton = Styled.View`
width: ${wp('91.46%')};
height: ${wp('14.93%')};
border-radius: 8px;
background-color: #FFE600;
align-items: center;
justify-content: center;
`;

const KakaoLoginText = Styled.Text`
font-weight: bold;
font-size: 16px;
color: #000000;
`;

const GoogleLoginButton = Styled.View`
margin-top: 16px;
width: ${wp('91.46%')};
height: ${wp('14.93%')};
border-radius: 8px;
background-color: #F4F4F4;

align-items: center;
justify-content: center;
`;

const GoogleLoginText = Styled.Text`
font-weight: bold;
font-size: 16px;
color: #000000;
`;

const AppleLoginButton = Styled.View`
margin-top: 16px;
width: ${wp('91.46%')};
height: ${wp('14.93%')};
border-radius: 8px;
background-color: #000000;
align-items: center;
justify-content: center;
`;

const AppleLoginText = Styled.Text`
font-weight: bold;
font-size: 16px;
color: #ffffff;
`;


interface Props {
    navigation: any,
    route: any,
}

const UnauthorizedScreen = ({navigation, route}: Props) => {

    const moveToLocalLogin = () => {
        navigation.navigate("LoginScreen")
    }

    const moveToLocalSignUp = () => {
        navigation.navigate("VerifyPhoneNumberScreen")
    }

    return (
        <Container>
            <LogoContainer>
            </LogoContainer>
            <SocialContainer>
             <KakaoLoginButton>
                 <KakaoLoginText>카카오로 로그인</KakaoLoginText>
             </KakaoLoginButton>
             <GoogleLoginButton>
                 <GoogleLoginText>구글로 로그인</GoogleLoginText>
             </GoogleLoginButton>
             <AppleLoginButton>
                 <AppleLoginText>Apple로 로그인</AppleLoginText>
             </AppleLoginButton>
            </SocialContainer>
            <LocalContainer>
              <TouchableWithoutFeedback onPress={() => moveToLocalLogin()}>
                <LocalLoginContainer>
                <LocalLoginText>전화번호로 로그인 / 회원가입</LocalLoginText>
                </LocalLoginContainer>
              </TouchableWithoutFeedback>
            </LocalContainer>
        </Container>
    )
}

export default UnauthorizedScreen;