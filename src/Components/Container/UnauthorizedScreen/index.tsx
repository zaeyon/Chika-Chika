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
  background-color: #ffffff;
  flex: 1;
`;

const LogoContainer = Styled.View`
 flex: 3.5;
`;

const SocialContainer = Styled.View`
 flex: 2;
`;

const LocalContainer = Styled.View`
 flex: 0.5;
 flex-direction: row;
 justify-content: space-around;
 padding-top: 20px;
 padding-left: 20px;
 padding-right: 20px;
 padding-bottom: 20px;
`;

const LocalLoginContainer = Styled.View`
 flex: 1;
 align-items: center;
 justify-content: center;
`;

const LocalLoginText = Styled.Text`
 color: #000000;
 font-size: 16px;
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

interface Props {
    navigation: any,
    route: any,
}

const UnauthorizedScreen = ({navigation, route}: Props) => {

    const moveToLocalLogin = () => {
        navigation.navigate("LoginScreen")
    }

    const moveToLocalSignUp = () => {
        navigation.navigate("BasicInputScreen")
    }

    return (
        <Container>
            <LogoContainer>
            </LogoContainer>
            <SocialContainer>
            </SocialContainer>
            <LocalContainer>
              <TouchableWithoutFeedback onPress={() => moveToLocalLogin()}>
                <LocalLoginContainer>
                <LocalLoginText>이메일로 로그인</LocalLoginText>
                </LocalLoginContainer>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => moveToLocalSignUp()}>
              <LocalSignUpContainer>
                <LocalSignUpText>회원가입</LocalSignUpText>
                </LocalSignUpContainer>
            </TouchableWithoutFeedback>
            </LocalContainer>
        </Container>
    )
}

export default UnauthorizedScreen;