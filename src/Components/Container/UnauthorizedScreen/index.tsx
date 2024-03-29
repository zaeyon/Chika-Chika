import React, {useState, useEffect, Profiler} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, Alert, ActivityIndicator} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import messaging from '@react-native-firebase/messaging';
//import KakaoLogins, {KAKAO_AUTH_TYPES} from '@react-native-seoul/kakao-login';
//import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
//import {appleAuth} from '@invertase/react-native-apple-authentication';
import allActions from '~/actions';
//import DeviceInfo from 'react-native-device-info';
import {hasNotch, getStatusBarHeight} from '~/method/deviceInfo'

import createRandomNickname from '~/method/createRandomNickname';
// route
import GETUserInfo from '~/Routes/Auth/GETUserInfo';
import GETUserReservations from '~/Routes/User/GETUserReservations';
import GETUserSavedHospitals from '~/Routes/User/GETUserSavedHospitals';
import POSTSocialUserCheck from '~/Routes/Auth/POSTSocialUserCheck';

//Async Storage
import {storeUserInfo} from '~/storage/currentUser';

const Container = Styled.View`
  width: ${wp('100%')}px;
  height: ${hp('100%')}px;
  background-color: #08D3FF;
  flex: 1;
`;

const LogoContainer = Styled.View`
padding-top: ${hp('23%')}px;
padding-left: 16px;
 flex: 1;
`;

const CatchPhraseImage = Styled.Image`
width: ${wp('52%')}px;
height: ${wp('7%')}px;
`;

const OnBoardingImageContainer = Styled.View`
flex: 1.72;
justify-content: space-between;
padding-left: 16px;
`;

const OnBoardingImage = Styled.Image`
margin-top: 3px;
width: ${wp('93%')}px;
height: ${wp('67.15%')}px;
`;

const Icon = Styled.Image`
margin-top: 75px;
width: ${wp('24.26%')}px;
height: ${wp('24.26%')}px;
`;

const LogoImage = Styled.Image`
margin-top: 26px;
width: ${wp('44.53%')}px;
height: ${wp('10.399%')}px;
`;

const SocialContainer = Styled.View`
 flex: 1.5;
 align-items: center;
 justify-content: center;
`;

const LocalContainer = Styled.View`
 flex: ${hasNotch() ? 0.763 : 0.5};
 padding-left: 20px;
 padding-right: 20px;
 padding-top: ${hasNotch() ? hp('3%') : hp('5.5%')}px;
`;

const LocalLoginContainer = Styled.View`
background-color: #FFFFFF;
padding-left: 16px;
padding-right: 16px;
`;

const LocalLoginButton = Styled.View`
padding-top: 16px;
padding-bottom: 16px;
background-color: #ffffff;
align-items: center;
border-radius: 8px;
`;

const LocalLoginText = Styled.Text`
font-weight: 700;
 color: #08D3FF;
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

const ServiceIntroContainer = Styled.View`
width: ${wp('100%')}px;
align-items: center;
`;

const ServiceMainIntroText = Styled.Text`
font-weight: 900;
font-size: 20px;
line-height: 27.24px;
color: #000000;
`;

const ServiceSubIntroText = Styled.Text`
margin-top: 12px;
font-size: 16px;
line-height: 24px;
color: #000000;
`;

interface Props {
  navigation: any;
  route: any;
}

const UnauthorizedScreen = ({navigation, route}: Props) => {
  const [loadingSocial, setLoadingSocial] = useState<boolean>(false);
  const [fcmToken, setFcmToken] = useState('');
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
      const fcmToken = await messaging().getToken();
      setFcmToken(fcmToken);
      console.log('getFcmToken fcmToken', fcmToken);
    }
  };

  /*
    const getFcmToken = async () => {
      const fcmToken = await messaging().getToken();
      console.log("getFcmToken", fcmToken);
    }
    */

  // GoogleSignin.configure();

  const moveToLocalLogin = () => {
    navigation.navigate('LoginScreen', {
      fcmToken: fcmToken,
    });
  };


  return (
    <Container>
      <LogoContainer>
        <CatchPhraseImage
        source={require('~/Assets/Images/Logo/txt_catchphrase.png')}/>
        <LogoImage
        style={{tintColor: "#FFFFFF"}}
        source={require('~/Assets/Images/Logo/ic_logo.png')} />
      </LogoContainer>
      <OnBoardingImageContainer>
      </OnBoardingImageContainer>
      <LocalContainer>
        <TouchableWithoutFeedback onPress={() => moveToLocalLogin()}>
            <LocalLoginButton>
            <LocalLoginText>{'번호 인증하고 치과 정보 받기'}</LocalLoginText>
            </LocalLoginButton>
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

/*
<SocialContainer>
<TouchableWithoutFeedback onPress={() => loginWithKakao()}>
  <KakaoLoginButton>
    <SocialIcon
      source={require('~/Assets/Images/Social/ic_kakao.png')}
    />
    <KakaoLoginText>카카오 로그인</KakaoLoginText>
  </KakaoLoginButton>
</TouchableWithoutFeedback>
<TouchableWithoutFeedback onPress={() => loginWithGoogle()}>
  <GoogleLoginButton>
    <SocialIcon
      source={require('~/Assets/Images/Social/ic_google.png')}
    />
    <GoogleLoginText>구글 로그인</GoogleLoginText>
  </GoogleLoginButton>
</TouchableWithoutFeedback>
<TouchableWithoutFeedback onPress={() => loginWithApple()}>
  <AppleLoginButton>
    <SocialIcon
      source={require('~/Assets/Images/Social/ic_apple.png')}
    />
    <AppleLoginText>Apple 로그인</AppleLoginText>
  </AppleLoginButton>
</TouchableWithoutFeedback>
</SocialContainer>
*/



/*
const loginWithKakao = () => {
  if (!KakaoLogins) {
    console.log('카카오 모듈 연결안됨');
  } else {
    setLoadingSocial(true);
    console.log('카카오 로그인 시도');
    KakaoLogins.login([KAKAO_AUTH_TYPES.Talk, KAKAO_AUTH_TYPES.Account])
      .then((result) => {
        console.log('카카오 로그인 성공 result', result);
        if (result.scopes?.includes('profile')) {
          KakaoLogins.getProfile()
            .then((profile: any) => {
              console.log(
                '카카오 계정 프로필 불러오기 성공 profile',
                profile,
              );

              const userProfile = {
                birthdate: `${profile.birthyear}-${profile.birthday}`,
                profileImg: profile.profile_image_url
                  ? profile.profile_image_url
                  : '',
                img_thumbNail: profile.thumb_image_url,
                nickname: createRandomNickname(),
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
        } else {
          KakaoLogins.getProfile().then((profile: any) => {

            const userProfile = {
              nickname: createRandomNickname(),
              socialId: profile.id,
            };
            
            progressSocialLogin('kakao', profile.email, '', userProfile);
          });
        }
      })
      .catch((error) => {
        setLoadingSocial(false);
        Alert.alert('로그인 실패', '다시 시도해주세요');
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
        img_thumbNail: '',
        //nickname: userInfo.user.name ? userInfo.user.name : "",
        nickname: createRandomNickname(),
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

        const userProfile = {
          birthdate: '',
          profileImg: '',
          img_thumbNail: '',
          //nickname: appleAuthRequestResponse.fullName?.givenName ? (appleAuthRequestResponse.fullName.familyName ? (appleAuthRequestResponse.fullName.familyName + appleAuthRequestResponse.fullName.givenName) : appleAuthRequestResponse.fullName.givenName) : ("TEST" + Date.now()),
          nickname: createRandomNickname(),
          socialId: appleAuthRequestResponse.user,
        };

        const email = appleAuthRequestResponse.email
          ? appleAuthRequestResponse.email
          : '';

        progressAppleLogin('apple', email, userProfile);
      }
    } catch {
      console.log('Apple Login Fail appleAuth.State', appleAuth.State);
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
      console.log(
        'POSTSocialUserCheck response.user.userResidences',
        response.user.userResidences,
      );
      if (response.statusText === 'Accepted') {
        console.log('등록된 소셜 계정 존재');

        GETUserInfo(response.token)
          .then((profile: any) => {
            console.log('profile', profile);
            setLoadingSocial(false);

            dispatch(
              allActions.userActions.setUser({
                jwtToken: response.token,
                profile,
              }),
            );
            dispatch(allActions.userActions.setHometown(profile.Residences));
            GETUserReservations({jwtToken: response.token}).then(
              (profile: any) => {
                dispatch(allActions.userActions.setReservations(profile));
              },
            );
            GETUserSavedHospitals({jwtToken: response.token}).then(
              (profile: any) => {
                dispatch(allActions.userActions.setSavedHospitals(profile));
              },
            );
          })
          .catch((error: any) => {
            console.log('get user error', error);
          });

        storeUserInfo(response.token);
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
          img_thumbNail: userProfile.img_thumbNail,
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
  POSTSocialUserCheck(provider, email, fcmToken, userProfile.socialId)
    .then((response: any) => {
      console.log('POSTSocialUserCheck response', response);
      console.log(
        'POSTSocialUserCheck response.user.userResidences',
        response.user.userResidences,
      );
      setLoadingSocial(false);
      if (response.statusText === 'Accepted') {
        console.log('등록된 애플 계정 존재');

        const profile = {
          phoneNumber: response.user.userPhoneNumber,
          id: response.user.userId,
          nickname: response.user.userNickname,
          profileImg: response.user.userProfileImg,
          img_thumbNail: response.user?.img_thumbNail,
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
          img_thumbNail: userProfile.img_thumbNail,
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
*/