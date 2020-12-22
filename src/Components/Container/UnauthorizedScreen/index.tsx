import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, Alert, ActivityIndicator} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import KakaoLogins, {KAKAO_AUTH_TYPES} from '@react-native-seoul/kakao-login';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';

import {
  appleAuth
} from '@invertase/react-native-apple-authentication';

// route
import POSTLogin from '~/Routes/Auth/POSTLogin';
import POSTRegister from '~/Routes/Auth/POSTRegister';
import POSTSocialUserCheck from '~/Routes/Auth/POSTSocialUserCheck';

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
 flex: 1;
 align-items: center;
 padding-left: 20px;
 padding-right: 20px;
 justify-content: center;
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

const IndicatorContainer = Styled.View`
position: absolute;
width: ${wp('100%')}px;
height: ${hp('100%')}px;
background-color: #00000040;
align-items: center;
justify-content: center;
`;


interface Props {
    navigation: any,
    route: any,
}

const UnauthorizedScreen = ({navigation, route}: Props) => {
    const [loadingSocial, setLoadingSocial] = useState<boolean>(false);

    GoogleSignin.configure();

    const moveToLocalLogin = () => {
        navigation.navigate("LoginScreen")
    }

    const moveToLocalSignUp = () => {
        navigation.navigate("VerifyPhoneNumberScreen")
    }

    const loginWithKakao = () => {
        if(!KakaoLogins) {
            console.log("카카오 모듈 연결안됨")
        } else {
            setLoadingSocial(true);
            console.log("카카오 로그인 시도")
            KakaoLogins.login([KAKAO_AUTH_TYPES.Talk, KAKAO_AUTH_TYPES.Account])
            .then(result => {
                console.log("카카오 로그인 성공 result", result)
                KakaoLogins.getProfile()
                .then((profile: any) => {
                    console.log("카카오 계정 프로필 불러오기 성공 profile", profile)
                    progressSocialLogin("kakao", profile.email);
                })
                .catch(error => {
                    setLoadingSocial(false);
                    console.log("카카오 계정 프로필 불러오기 실패 error", error)
                })
            })
            .catch(error => {
                setLoadingSocial(false);
                console.log("카카오 로그인 실패 error", error)
            })
        }
    }

    const loginWithGoogle = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log("구글 로그인 성공 userInfo", userInfo);
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
              } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
              } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
              } else {
                // some other error happened
              }
        }
    }

    async function loginWithApple() {
      // performs login request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
    
      // get current authentication state for user
      // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.

      const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
    
      // use credentialState response to ensure the user is authenticated
      if (credentialState === appleAuth.State.AUTHORIZED) {
        console.log("Apple Login Success credentialState", credentialState);
        console.log("appleAuthRequestResponse", appleAuthRequestResponse);
        Alert.alert("로그인성공");
      }
    }

    const progressSocialLogin = (provider: string, email: string, phoneNumber?: string) => {
      POSTSocialUserCheck(provider, email)
      .then((response: any) => {
        console.log("POSTSocialUserCheck response", response)
        setLoadingSocial(false);
        if(response.status === 200) {
          console.log("등록된 소셜 계정 존재");

        }
      })
      .catch((error) => {
        setLoadingSocial(false);
        console.log("POSTSocialUserCheck error", error);
        if(error.status === 401) {
          console.log("등록된 소셜 계정 없음");
          navigation.navigate("HometownSettingScreen", {
            certifiedPhoneNumber: phoneNumber ? true : false,
            provider: provider,
            fcmToken: null,
            userPhoneNumber: phoneNumber ? phoneNumber : null,
            nickname: "TEST" + String(Date.now()),
          });
        }
      })
    }




  

    return (
        <Container>
            <LogoContainer>
            </LogoContainer>
            <SocialContainer>
              <TouchableWithoutFeedback onPress={() => loginWithKakao()}>
              <KakaoLoginButton>
                <KakaoLoginText>카카오로 로그인</KakaoLoginText>
              </KakaoLoginButton>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => loginWithGoogle()}>
              <GoogleLoginButton>
                <GoogleLoginText>구글로 로그인</GoogleLoginText>
              </GoogleLoginButton>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => loginWithApple()}>
              <AppleLoginButton>
                <AppleLoginText>Apple로 로그인</AppleLoginText>
              </AppleLoginButton>
              </TouchableWithoutFeedback>
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