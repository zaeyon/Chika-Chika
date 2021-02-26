import React, {useEffect, useState, useRef} from 'react';
import Styled from 'styled-components/native';
import {
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import axios from 'axios';
import {resolvePlugin} from '@babel/core';
import {useSelector, useDispatch} from 'react-redux';
import allActions from '~/actions';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import messaging from '@react-native-firebase/messaging';
import AboveKeyboard from 'react-native-above-keyboard';
//import {getStatusBarHeight} from 'react-native-status-bar-height'
import {getStatusBarHeight} from 'react-native-status-bar-height';
import DeviceInfo from 'react-native-device-info';

// Async Storage
import {storeUserInfo} from '~/storage/currentUser';

// Local Components
import NavigationHeader from '~/Components/Presentational/NavigationHeader';
import createRandomNickname from '~/method/createRandomNickname';

// Route
import POSTSendTokenToPhone from '~/Routes/Auth/POSTSendTokenToPhone';
import POSTVerifyPhoneNumber from '~/Routes/Auth/POSTVerifyPhoneNumber';
import POSTLogin from '~/Routes/Auth/POSTLogin';

const Container = Styled.View`
  padding-top: ${getStatusBarHeight()};
  flex: 1;
  background-color: #FEFFFF;
`;

const HeaderBar = Styled.View`
 width: ${wp('100%')}px;
 height: ${hp('6.5%')}px;
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
 background-color:#ffffff;
`;

const HeaderLeftContainer = Styled.View`
padding: 12px 15px 13px 16px;
align-items: center;
justify-content: center;
background-color: #ffffff;
`;

const HeaderBackIcon = Styled.Image`
 width: ${wp('6.4%')}px;
 height: ${wp('6.4%')}px;
 background-color: #ffffff;
`;

const HeaderTitleText = Styled.Text`
font-weight: 600;
font-size: 18px;
color: #000000;
`;

const HeaderRightContainer = Styled.View`
padding: 7px 16px 13px 15px;
 align-items: center;
 justify-content: center;
 flex-direction: row;
 background-color: #ffffff;
`;

const HeaderEmptyContainer = Styled.View`
 width: ${wp('6.4%')}px;
 height: ${wp('6.4%')}px;
 background-color: #ffffff;
`;

const BodyContainer = Styled.View`
 padding-top: 32px;
 padding-left: 24px;
 padding-right: 24px;
 flex: 1;
`;

const MainLabelText = Styled.Text`
font-size: 24px;
line-height: 24px;
color: #131F3C;
`;

const ItemContainer = Styled.View`
`;

const ItemTextInput = Styled.TextInput`
color: #000000;
height: 50px;
background-color: #ffffff;
padding-right: 10px;
border-bottom-width: 1px;
border-color: #E2E6ED;
font-size: 16px;
line-height: 18px;
`;

const VerifyText = Styled.Text`
color: #9AA2A9;
font-size: 16px;
font-weight: 700;
line-height: 24px;
`;

const TimeLimitText = Styled.Text`
color: #00D1FF;
font-size: 16px;
font-weight: 700;
line-height: 24px;
`;

const VerifyTextContainer = Styled.View`
height: 50px;
position: absolute;
left: ${wp('73.46%')}px;
padding-right: 10px;
padding-left: 20px;
align-items: center;
justify-content: center;
`;

const DisabledLoginButton = Styled.View`
width: ${wp('100%')}px;
height: ${DeviceInfo.hasNotch() ? hp('6.89%') : hp('8.3%')}px;
background-color: #E2E6ED;
justify-content: center;
align-items: center;
`;

const DisabledLoginText = Styled.Text`
font-weight: bold;
font-size: 19px;
color: #ffffff;
`;

const AbledLoginButton = Styled.View`
width: ${wp('100%')}px;
height: ${DeviceInfo.hasNotch() ? hp('6.89%') : hp('8.3%')}px;
background-color: #00D1FF;
justify-content: center;
align-items: center;
`;

const AbledLoginText = Styled.Text`
font-weight: bold;
font-size: 19px;
color: #FFFFFF;
`;

const FindPasswordText = Styled.Text`
font-size: 14px;
color: #50555C;
`;

const FooterContainer = Styled.View`
margin-top: 5px;
width: ${wp('100%')}px;
justify-content: center;
align-items: center;
padding-bottom: 30px;
`;

const InvalidInputText = Styled.Text`
 position: absolute;
 bottom: -23px;
 left: 0px;
 color: #00D1FF;
 font-size: 13px;
`;

const LoadingContainer = Styled.View`
 position: absolute;
 width: ${wp('100%')}px;
 height: ${hp('100%')}px;
 align-items: center;
 justify-content: center;
 background-color: #00000030;
`;

const TimeLimitTextContainer = Styled.View`
height: 50px;
position: absolute;
justify-content: center;
padding-right: 10px;
padding-left: 16px;
left: ${wp('73.46%')}px;
`;

const FinishButtonContainer = Styled.View`
width: ${wp('100%')}px;
position:absolute;
bottom: 0px;
background-color : #707070;
`;

const LoginButtonContainer = Styled.View`
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
  navigation: any;
  route: any;
}

var limitTime = 300;
var timeout: any;

const LoginScreen = ({navigation, route}: Props) => {
  const [number, setNumber] = useState('');
  const [authCode, setAuthCode] = useState<string>('');
  const [validNumber, setValidNumber] = useState<boolean>(false);
  const [invalidPhoneNumber, setInvalidPhoneNumber] = useState<boolean>(false);
  const [invalidAuthCode, setInvalidAuthCode] = useState<boolean>(false);
  const [numberInputState, setNumberInputState] = useState<string>('noInput');
  const [numberInputFocus, setNumberInputFocus] = useState<boolean>(false);
  const [authCodeInputFocus, setAuthCodeInputFocus] = useState<boolean>(false);
  const [isUser, setIsUser] = useState<boolean>(false);
  const [formattedNumber, setFormattedNumber] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingVerify, setLoadingVerify] = useState<boolean>(false);

  const [visibleAuthCodeInput, setVisibleAuthCodeInput] = useState<boolean>(
    false,
  );

  const [limitMin, setLimitMin] = useState<number>(
    parseInt(String(limitTime / 60)),
  );
  const [limitSec, setLimitSec] = useState<string>(
    '0' + String(limitTime % 60),
  );
  const [timeOver, setTimeOver] = useState<boolean>(false);

  const dispatch = useDispatch();

  const numberInputRef = useRef(null);
  const authCodeInputRef = useRef(null);

  let submitingNumber: any;
  let submitingPassword: any;

  function checkNumber(str: string) {
    var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    var blank_pattern = /[\s]/g;
    if (blank_pattern.test(str) === true) {
      console.log('공백 포함');
      setValidNumber(false);
    } else if (!regExp.test(str)) {
      console.log('올바른 이메일 형식 아님');
      setValidNumber(false);
    } else {
      setValidNumber(true);
    }
  }

  const onKeyPressNumberInput = (event: any) => {
    var numberArray = formattedNumber.split('');
    console.log('numberArray', numberArray);
    console.log('event.nativeEvent', event.nativeEvent.key);

    if (numberArray.length === 17 && event.nativeEvent.key !== 'Backspace') {
      return;
    }

    if (!isNaN(event.nativeEvent.key)) {
      // 입력값 숫자
      numberArray.push(event.nativeEvent.key);
      setFormattedNumber(numberArray.join(''));

      if (numberArray.length === 4) {
        numberArray.splice(3, 0, ' ', '-', ' ');
        console.log('하이폰 추가', numberArray);
        setFormattedNumber(numberArray.join(''));
      } else if (numberArray.length === 11) {
        numberArray.splice(10, 0, ' ', '-', ' ');
        console.log('하이폰 추가', numberArray);
        setFormattedNumber(numberArray.join(''));
      }
    } else if (event.nativeEvent.key === 'Backspace') {
      // 입력값 Backspace

      numberArray.pop();
      setFormattedNumber(numberArray.join(''));

      if (numberArray.length === 13) {
        numberArray.splice(10, 3);
        console.log('하이폰 제거', numberArray);
        setFormattedNumber(numberArray.join(''));
      } else if (numberArray.length === 6) {
        numberArray.splice(3, 3);
        console.log('하이폰 제거', numberArray);
        setFormattedNumber(numberArray.join(''));
      }
    }
  };

  const startTimeout = () => {

    limitTime = 300;
    timeout = setInterval(function () {

      limitTime = limitTime - 1;

      setLimitMin(parseInt(String(limitTime / 60)));
      if (String(limitTime % 60).length == 1) {
        setLimitSec('0' + String(limitTime % 60));
      } else {
        setLimitSec(String(limitTime % 60));
      }


      if (limitTime < 0) {
        clearInterval(timeout);
        setTimeOver(true);
      }
    }, 1000);
  };

  const onFocusNumberInput = () => {
    setNumberInputFocus(true);
  };

  const onUnfocusNumberInput = (text: string) => {
    setNumberInputFocus(false);
    checkNumber(text);
  };

  const onFocusAuthCodeInput = () => {
    setAuthCodeInputFocus(true);
  };

  const onUnfocusAuthCodeInput = (text: string) => {
    setAuthCodeInputFocus(false);
  };

  const onChangeAuthCodeInput = (text: string) => {
    setInvalidAuthCode(false);
    setAuthCode(text);
  };

  const clickLoginButton = () => {
    Keyboard.dismiss();
    setLoadingVerify(true);
    console.log('isUser', isUser);
    const fcmToken = route.params?.fcmToken;

    if (isUser) {
      const phoneNumber = String(number);
      login(phoneNumber, authCode);
    } else {
      POSTVerifyPhoneNumber(String(number), String(authCode))
        .then(function (response: any) {
          setLoadingVerify(false);
          clearInterval(timeout);
          console.log('POSTVerifyPhoneNumber response', response);
          console.log('number', number);

          navigation.navigate('HometownSearchScreen', {
            requestType: 'signUp',
            certifiedPhoneNumber: true,
            provider: 'local',
            fcmToken: fcmToken,
            userPhoneNumber: String(number),
            nickname: createRandomNickname(),
            isUser: isUser,
          });
        })
        .catch(function (error) {
          setLoadingVerify(false);
          console.log('POSTVerifyPhoneNumber error', error);
        });
    }
  };

  const clickSendAuthCode = () => {
    if (formattedNumber.split('').length === 17) {
      setInvalidPhoneNumber(false);
      clearInterval(timeout);
      startTimeout();

      var tmpNumber = formattedNumber.split(' - ');
      var phoneNumber = tmpNumber.join('');
      console.log('tmpNumber', tmpNumber.join(''));

      setNumber(tmpNumber.join(''));
      setInvalidAuthCode(false);
      setTimeOver(false);
      setVisibleAuthCodeInput(true);

      POSTSendTokenToPhone(String(phoneNumber))
        .then(function (response: any) {
          console.log('POSTSendTokenToPhone response', response);
          setIsUser(response.exist);
        })
        .catch(function (error) {
          console.log('POSTSendTokenToPhone error', error);
        });
    } else {
      setInvalidPhoneNumber(true);
      clearInterval(timeout);
      Alert.alert('올바른 전화번호를 입력하세요!');
    }
  };

  const login = (submitPhoneNumber: string, submitAuthCode: string) => {
    const phoneNumber = submitPhoneNumber;
    const authCode = submitAuthCode;
    const fcmToken = route.params?.fcmToken;

    POSTLogin({phoneNumber, authCode, fcmToken})
      .then(function (response: any) {
        console.log('POSTLogin response', response);
        console.log("POSTLogin fcmToken", fcmToken);
        console.log('POSTLogin response.user.userResidences', response.user.userResidences)
        if (response.statusText === 'Accepted') {
          setLoadingVerify(false);
          clearInterval(timeout);
          const jwtToken = response.token;
          const profile = {
            phoneNumber: phoneNumber,
            id: response.user.userId,
            nickname: response.user.userNickname,
            profileImg: response.user.userProfileImg,
            img_thumbNail: response.user.img_thumbNail,
            gender: response.user.userGender,
            birthdate: response.user.userBirthdate,
            provider: response.user.userProvider,
            Residences: response.user.userResidences,
          };

          storeUserInfo(jwtToken);
          dispatch(
            allActions.userActions.setUser({
              jwtToken,
              profile,
            }),
          );

          dispatch(
            allActions.userActions.setHometown(response.user.userResidences),
          );
        }
      })
      .catch(function (error: any) {
        setLoadingVerify(false);
        console.log('POSTLogin error', error);
        console.log('error.status', error.status);
        if (error.status == 401) {
          setInvalidAuthCode(true);
        }
      });
  };

  const goBack = () => {
    navigation.goBack();
    clearInterval(timeout);

    limitTime = 300;
  };

  return (
    <Container>
      <HeaderBar>
        <TouchableWithoutFeedback onPress={() => goBack()}>
          <HeaderLeftContainer>
            <HeaderBackIcon
              source={require('~/Assets/Images/HeaderBar/ic_back.png')}
            />
          </HeaderLeftContainer>
        </TouchableWithoutFeedback>
        <HeaderRightContainer>
          <HeaderEmptyContainer />
        </HeaderRightContainer>
      </HeaderBar>
      <BodyContainer>
        <MainLabelText>{'전화번호 인증'}</MainLabelText>
        <ItemContainer style={{marginTop: 20}}>
          <ItemTextInput
            ref={numberInputRef}
            placeholder={'휴대전화 번호'}
            placeholderTextColor={'#9AA2A9'}
            style={[
              (numberInputState === 'invalid' && {borderColor: '#FF3B30'}) ||
                (numberInputFocus && {
                  borderColor: '#00D1FF',
                  backgroundColor: '#FFFFFF',
                }),
            ]}
            selectionColor={'#00D1FF'}
            autoCapitalize={'none'}
            onSubmitEditing={(text) =>
              onUnfocusNumberInput(text.nativeEvent.text)
            }
            keyboardType={'number-pad'}
            onEndEditing={(text) => onUnfocusNumberInput(text.nativeEvent.text)}
            onFocus={() => onFocusNumberInput()}
            autoFocus={true}
            value={formattedNumber}
            onKeyPress={(event) => onKeyPressNumberInput(event)}
          />
          <TouchableWithoutFeedback onPress={() => clickSendAuthCode()}>
            <VerifyTextContainer
              style={
                visibleAuthCodeInput ? {paddingLeft: 10} : {paddingLeft: 20}
              }>
              <VerifyText
              style={formattedNumber.length > 0 && {color: '#00D1FF'}}>
                {visibleAuthCodeInput ? '재전송' : '인증'}
              </VerifyText>
            </VerifyTextContainer>
          </TouchableWithoutFeedback>
        </ItemContainer>
        {visibleAuthCodeInput && (
          <ItemContainer style={{marginTop: 16}}>
            <ItemTextInput
              ref={authCodeInputRef}
              placeholder={'인증번호 입력'}
              placeholderTextColor={'#9AA2A9'}
              style={
                (authCodeInputFocus &&
                  !timeOver &&
                  !invalidAuthCode && {
                    borderColor: '#00D1FF',
                    backgroundColor: '#ffffff',
                  }) ||
                ((timeOver || invalidAuthCode) && {
                  borderColor: '#00D1FF',
                  backgroundColor: '#ffffff',
                })
              }
              selectionColor={'#00D1FF'}
              onFocus={() => onFocusAuthCodeInput()}
              onSubmitEditing={(text: any) =>
                onUnfocusAuthCodeInput(text.nativeEvent.text)
              }
              onEndEditing={(text: any) =>
                onUnfocusAuthCodeInput(text.nativeEvent.text)
              }
              onChangeText={(text: string) => onChangeAuthCodeInput(text)}
              keyboardType={'number-pad'}
              autoCapitalize={'none'}
              autoFocus={true}
            />
            <TimeLimitTextContainer>
              <TimeLimitText>{limitMin + ':' + limitSec}</TimeLimitText>
            </TimeLimitTextContainer>
            {timeOver && (
              <InvalidInputText>
                {'인증 기간이 만료되었습니다.'}
              </InvalidInputText>
            )}
            {invalidAuthCode && (
              <InvalidInputText>
                {'인증번호가 일치하지 않습니다.'}
              </InvalidInputText>
            )}
          </ItemContainer>
        )}
        <FinishButtonContainer>
          <AboveKeyboard>
            <LoginButtonContainer>
              {number !== '' &&
                authCode !== '' &&
                !timeOver &&
                !invalidPhoneNumber && (
                  <TouchableWithoutFeedback onPress={() => clickLoginButton()}>
                    <AbledLoginButton>
                      <AbledLoginText>{"로그인 / 회원가입"}</AbledLoginText>
                    </AbledLoginButton>
                  </TouchableWithoutFeedback>
                )}
              {((authCode == '') ||
                timeOver ||
                invalidPhoneNumber) && (
                <DisabledLoginButton>
                  <DisabledLoginText>{"로그인 / 회원가입"}</DisabledLoginText>
                </DisabledLoginButton>
              )}
            </LoginButtonContainer>
          </AboveKeyboard>
        </FinishButtonContainer>
      </BodyContainer>
      {(loading || loadingVerify) && (
        <LoadingContainer>
          <ActivityIndicator color={'#FFFFFF'} />
        </LoadingContainer>
      )}
    </Container>
  );
};

export default LoginScreen;
