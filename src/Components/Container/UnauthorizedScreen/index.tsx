import React, {useState, useEffect, Profiler} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, Alert, ActivityIndicator} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import KakaoLogins, {KAKAO_AUTH_TYPES} from '@react-native-seoul/kakao-login';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import allActions from '~/actions';

import {appleAuth} from '@invertase/react-native-apple-authentication';

// route
import POSTRegister from '~/Routes/Auth/POSTRegister';
import POSTSocialUserCheck from '~/Routes/Auth/POSTSocialUserCheck';

//Async Storage
import {storeUserInfo} from '~/storage/currentUser';
const Container = Styled.View`
  width: ${wp('100%')}px;
  height: ${hp('100%')}px;
  background-color: #F5F7F9;
  flex: 1;
`;

const LogoContainer = Styled.View`
 flex: 3.85;
 padding-left: 32px;
 justify-content: center;
`;

const Icon = Styled.Image`
margin-top: 75px;
width: ${wp('24.26%')}px;
height: ${wp('24.26%')}px;
`;

const LogoImage = Styled.Image`
margin-top: 6px;
width: ${wp('44.53%')}px;
height: ${wp('10.399%')}px;
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
 padding-top: 16px;
`;

const LocalLoginContainer = Styled.View`
padding-top: 16px;
padding-bottom: 16px;
padding-left: 5px;
padding-right: 5px;
 align-items: center;
 justify-content: center;
`;

const LocalLoginText = Styled.Text`
font-weight: 400;
 color: #131F3C;
 font-size: 16px;
 line-height: 24px;

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
width: ${wp('91.46%')}px;
height: ${wp('14.93%')}px;
border-radius: 8px;
background-color: #FFE500;
align-items: center;
justify-content: center;
`;

const SocialIcon = Styled.Image`
position: absolute;
left: 16px;
width: ${wp('6.4%')}px;
height: ${wp('6.4%')}px;
`;

const KakaoLoginText = Styled.Text`
font-weight: 700;
font-size: 16px;
line-height: 24px;
color: #131F3C;
`;

const GoogleLoginButton = Styled.View`
margin-top: 16px;
width: ${wp('91.46%')}px;
height: ${wp('14.93%')}px;
border-radius: 8px;
background-color: #ffffff;

align-items: center;
justify-content: center;
`;

const GoogleLoginText = Styled.Text`
font-weight: 700;
font-size: 16px;
line-height: 24px;
color: #131F3C;
`;

const AppleLoginButton = Styled.View`
margin-top: 16px;
width: ${wp('91.46%')}px;
height: ${wp('14.93%')}px;
border-radius: 8px;
background-color: #131F3C;
align-items: center;
justify-content: center;
`;

const AppleLoginText = Styled.Text`
font-weight: 700;
font-size: 16px;
line-height: 24px;
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

const TextBottomLine = Styled.View`
width: 100px;

`;

interface Props {
  navigation: any;
  route: any;
}

let fcmToken = '';

const UnauthorizedScreen = ({navigation, route}: Props) => {
  const [loadingSocial, setLoadingSocial] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getFcmToken();
  }, []);

  const getFcmToken = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      fcmToken = await messaging().getToken();
      console.log('getFcmToken fcmToken', fcmToken);
    }
  };

  /*
    const getFcmToken = async () => {
      const fcmToken = await messaging().getToken();
      console.log("getFcmToken", fcmToken);
    }
    */

  GoogleSignin.configure();

  const moveToLocalLogin = () => {
    navigation.navigate('LoginScreen', {
      fcmToken: fcmToken,
    });
  };

  const loginWithKakao = () => {
    if (!KakaoLogins) {
      console.log('카카오 모듈 연결안됨');
    } else {
      setLoadingSocial(true);
      console.log('카카오 로그인 시도');
      KakaoLogins.login([KAKAO_AUTH_TYPES.Talk, KAKAO_AUTH_TYPES.Account])
        .then((result) => {
          console.log('카카오 로그인 성공 result', result);
          KakaoLogins.getProfile()
            .then((profile: any) => {
              console.log('카카오 계정 프로필 불러오기 성공 profile', profile);

              const userProfile = {
                birthdate: profile.birthyear
                  ? profile.birthday
                    ? profile.birthyear + profile.birthday
                    : ''
                  : '',
                profileImg: profile.profile_image_url
                  ? profile.profile_image_url
                  : '',
                //nickname: profile.nickname ? profile.nickname : "TEST" + Date.now(),
                nickname: 'TEST' + Date.now(),
                socialId: profile.id,
              };

              const phoneNumber = profile.phone_number
                ? profile.phone_number
                : '';

              progressSocialLogin(
                'kakao',
                profile.email,
                phoneNumber,
                userProfile,
              );
            })
            .catch((error) => {
              setLoadingSocial(false);
              console.log('카카오 계정 프로필 불러오기 실패 error', error);
            });
        })
        .catch((error) => {
          setLoadingSocial(false);
          console.log('카카오 로그인 실패 error', error);
        });
    }
  };

  const loginWithGoogle = async () => {
    try {
      setLoadingSocial(true);
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('구글 로그인 성공 userInfo', userInfo);

      if (userInfo) {
        const userProfile = {
          birthdate: '',
          profileImg: userInfo.user.photo ? userInfo.user.photo : '',
          //nickname: userInfo.user.name ? userInfo.user.name : "",
          nickname: 'TEST' + Date.now(),
          socialId: userInfo.user.id,
        };

        const phoneNumber = '';

        progressSocialLogin(
          'google',
          userInfo.user.email,
          phoneNumber,
          userProfile,
        );
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        setLoadingSocial(false);
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        setLoadingSocial(false);
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        setLoadingSocial(false);
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  async function loginWithApple() {
    console.log('appleAuth.isSupported', appleAuth.isSupported);
    if (appleAuth.isSupported) {
      setLoadingSocial(true);

      try {
        // performs login request
        const appleAuthRequestResponse = await appleAuth.performRequest({
          requestedOperation: appleAuth.Operation.LOGIN,
          requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        });

        // get current authentication state for user
        // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
        const credentialState = await appleAuth.getCredentialStateForUser(
          appleAuthRequestResponse.user,
        );

        // use credentialState response to ensure the user is authenticated
        if (credentialState === appleAuth.State.AUTHORIZED) {
          console.log('Apple Login Success credentialState', credentialState);
          console.log('appleAuthRequestResponse', appleAuthRequestResponse);
        
          Alert.alert('로그인성공');

          const userProfile = {
            birthdate: '',
            profileImg: '',
            //nickname: appleAuthRequestResponse.fullName?.givenName ? (appleAuthRequestResponse.fullName.familyName ? (appleAuthRequestResponse.fullName.familyName + appleAuthRequestResponse.fullName.givenName) : appleAuthRequestResponse.fullName.givenName) : ("TEST" + Date.now()),
            nickname: 'TEST' + Date.now(),
            socialId: appleAuthRequestResponse.identityToken,
          };

          const email = appleAuthRequestResponse.email
            ? appleAuthRequestResponse.email
            : '';

          progressAppleLogin('apple', email, userProfile);
        } 
      } catch {
        console.log("Apple Login Fail appleAuth.State", appleAuth.State)
        setLoadingSocial(false);

      }
    } else {
      Alert.alert('애플로그인을 지원하지 않는 디바이스입니다.');
    }
  }

  const progressSocialLogin = (
    provider: string,
    email: string,
    phoneNumber: string,
    userProfile: any,
  ) => {
    POSTSocialUserCheck(provider, email, fcmToken)
      .then((response: any) => {
        console.log('POSTSocialUserCheck response', response);
        setLoadingSocial(false);
        if (response.statusText === 'Accepted') {
          console.log('등록된 소셜 계정 존재');

          const profile = {
            phoneNumber: phoneNumber,
            id: response.user.userId,
            nickname: response.user.userNickname,
            profileImg: response.user.userProfileImg,
            gender: response.user.userGender,
            birthdate: response.user.userBirthdate,
            provider: response.user.userProvider,
            Residences: response.user.userResidences,
          };

          const userInfo = {
            jwtToken: response.token,
            profile,
          };
          storeUserInfo(response.token);
          dispatch(allActions.userActions.setUser(userInfo));
          dispatch(
            allActions.userActions.setHometown(response.user.userResidences),
          );
        }
      })
      .catch((error) => {
        setLoadingSocial(false);
        console.log('POSTSocialUserCheck error', error);
        if (error.status === 401) {
          console.log('등록된 소셜 계정 없음');
          navigation.navigate('HometownSearchScreen', {
            requestType: 'signUp',
            certifiedPhoneNumber: phoneNumber ? true : false,
            birthdate: userProfile.birthdate,
            profileImg: userProfile.profileImg,
            nickname: userProfile.nickname,
            phoneNumber: phoneNumber,
            fcmToken: fcmToken,
            email: email,
            provider: provider,
            socialId: userProfile.socialId,
          });
        }
      });
  };

  const progressAppleLogin = (
    provider: string,
    email: string,
    userProfile: any,
  ) => {
    POSTSocialUserCheck(provider, userProfile.socialId, fcmToken)
      .then((response: any) => {
        console.log('POSTSocialUserCheck response', response);
        setLoadingSocial(false);
        if (response.statusText === 'Accepted') {
          console.log('등록된 애플 계정 존재');

          const profile = {
            phoneNumber: response.user.userPhoneNumber,
            id: response.user.userId,
            nickname: response.user.userNickname,
            profileImg: response.user.userProfileImg,
            gender: response.user.userGender,
            birthdate: response.user.userBirthdate,
            provider: response.user.userProvider,
            Residences: response.user.userResidences,
          };

          const userInfo = {
            jwtToken: response.token,
            profile,
          };
          storeUserInfo(response.token);
          dispatch(allActions.userActions.setUser(userInfo));
          dispatch(
            allActions.userActions.setHometown(response.user.userResidences),
          );
        }
      })
      .catch((error) => {
        setLoadingSocial(false);
        console.log('POSTSocialUserCheck error', error);
        if (error.status === 401) {
          console.log('등록된 소셜 계정 없음');
          navigation.navigate('HometownSearchScreen', {
            requestType: 'signUp',
            certifiedPhoneNumber: false,
            birthdate: userProfile.birthdate,
            profileImg: userProfile.profileImg,
            nickname: userProfile.nickname,
            phoneNumber: '',
            fcmToken: fcmToken,
            email: email,
            provider: provider,
            socialId: userProfile.socialId,
          });
        }
      });
  };

  return (
    <Container>
      <LogoContainer>
        <Icon
        source={require('~/Assets/Images/Logo/ic_icon.png')}/>
        <LogoImage
        source={require('~/Assets/Images/Logo/ic_logo.png')}/>
      </LogoContainer>
      <SocialContainer>
        <TouchableWithoutFeedback onPress={() => loginWithKakao()}>
          <KakaoLoginButton>
            <SocialIcon
            source={require('~/Assets/Images/Social/ic_kakao.png')}/>
            <KakaoLoginText>카카오로 로그인</KakaoLoginText>
          </KakaoLoginButton>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => loginWithGoogle()}>
          <GoogleLoginButton>
            <SocialIcon
            source={require('~/Assets/Images/Social/ic_google.png')}/>
            <GoogleLoginText>구글로 로그인</GoogleLoginText>
          </GoogleLoginButton>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => loginWithApple()}>
          <AppleLoginButton>
            <SocialIcon
            source={require('~/Assets/Images/Social/ic_apple.png')}/>
            <AppleLoginText>Apple로 로그인</AppleLoginText>
          </AppleLoginButton>
        </TouchableWithoutFeedback>
      </SocialContainer>
      <LocalContainer>
        <TouchableWithoutFeedback onPress={() => moveToLocalLogin()}>
          <LocalLoginContainer>
            <LocalLoginText>전화번호로 <LocalLoginText
            style={{textDecorationLine: 'underline', textDecorationColor: '#131F3C' }}>{"로그인 및 회원가입"}</LocalLoginText></LocalLoginText>
          </LocalLoginContainer>
        </TouchableWithoutFeedback>
      </LocalContainer>
      {loadingSocial && (
        <IndicatorContainer>
          <ActivityIndicator color={'#ffffff'} />
        </IndicatorContainer>
      )}
    </Container>
  );
};

export default UnauthorizedScreen;
