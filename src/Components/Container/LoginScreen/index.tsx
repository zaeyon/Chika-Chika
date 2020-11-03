import React, {useEffect, useState, useRef} from 'react';
import Styled from 'styled-components/native';
import {Text, TouchableWithoutFeedback, StyleSheet, Alert, ActivityIndicator} from 'react-native';
import axios from 'axios';
import {resolvePlugin} from '@babel/core';
import {useSelector, useDispatch} from 'react-redux';
import allActions from '~/actions';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AboveKeyboard from 'react-native-above-keyboard';

const Input = Styled.TextInput`
position: relative;
top: 5px;
width: ${wp('80%')}px;
height: 50px;
`;

const Container = Styled.SafeAreaView`
  flex: 1;
  background-color: #FEFFFF;
`;

const HeaderBar = Styled.View`
 width: ${wp('100%')}px;
 height: ${wp('11.7%')}px;
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
 background-color:#ffffff;
`;

const HeaderLeftContainer = Styled.View`
padding: 7px 15px 13px 16px;
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
 padding-top: 16px;
 padding-left: 16px;
 padding-right: 16px;
 flex: 1;
`;

const ItemContainer = Styled.View`
`;

const ItemTextInput = Styled.TextInput`
width: ${wp('91.46%')}px;
color: #000000;
height: 50px;
border-radius: 8px;
background-color: #F0F0F0;
padding-left: 10px;
padding-right: 10px;
border-width: 1.5px;
border-color: #F0F0F0;
font-size: 17px;
`;

const DisabledLoginButton = Styled.View`
width: ${wp('91.46%')}px;
height: 50px;
background-color: #c5c5c5;
border-radius: 8px;
justify-content: center;
align-items: center;
`;

const DisabledLoginText = Styled.Text`
font-weight: bold;
font-size: 16px;
color: #ffffff;
`;


const AbledLoginButton = Styled.View`
width: ${wp('91.46%')}px;
height: 50px;
background-color: #267DFF;
border-radius: 8px;
justify-content: center;
align-items: center;
`;

const AbledLoginText = Styled.Text`
font-weight: bold;
font-size: 16px;
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

const UnvaildInputText = Styled.Text`
 position: absolute;
 bottom: -18;
 left: 5;
 margin-left: 3px;
 margin-top: 5px;
 color: #FF3B30;
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

const VerifyText = Styled.Text`
font-size: 17px;
color: #0075FF;
`;

const TimeLimitText = Styled.Text`
font-size: 17px;
color: #0075FF;
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

const TimeLimitTextContainer = Styled.View`
height: 50px;
position: absolute;
justify-content: center;
padding-right: 10px;
padding-left: 16px;
left: ${wp('73.46%')}px;
`;

const FinishButtonContainer = Styled.View`
width: ${wp('100%')};
padding-left: ${wp('4.2%')};
position:absolute;
bottom: -20px;
background-color : #707070;
`;

interface Props {
    navigation: any,
    route: any,
}

var limitTime = 300;
var timeout: any;

const LoginScreen = ({navigation}: Props) => {
  const [number, setNumber] = useState('');
  const [authCode, setAuthCode] = useState<string>('');
  const [validNumber, setValidNumber] = useState<boolean>(false);
  const [numberInputState, setNumberInputState] = useState<string>("noInput");
  const [numberInputFocus, setNumberInputFocus] = useState<boolean>(false);
  const [authCodeInputFocus, setAuthCodeInputFocus] = useState<boolean>(false);
  const [formattedNumber, setFormattedNumber] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false);

  const [visibleAuthCodeInput, setVisibleAuthCodeInput] = useState<boolean>(false);

  const [limitMin, setLimitMin] = useState<number>(String(limitTime/60));
  const [limitSec, setLimitSec] = useState<string>("0"+String(limitTime%60));

  const currentUser = useSelector((state: any) => state.currentUser);
  const dispatch = useDispatch();

  const numberInputRef = useRef(null);
  const authCodeInputRef = useRef(null);

  let submitingNumber:any;
  let submitingPassword:any;

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
  

  const onChangeNumberInput = (text: string) => {
    /*
    setNumberInputState("inputing");
    setNumber(text);
    var numberArray = text.split("");
    console.log("numberArray", numberArray);

    // inputing number
    if(numberArray.length === 4) {
      numberArray.splice(3, 0, " ", "-", " ");
      console.log("하이픈 추가", numberArray)
      setFormattedNumber(numberArray.join(''))
    } else {
      setFormattedNumber(text)
    }
    */
  }

 const onKeyPressNumberInput = (event: any) => {
   var numberArray = formattedNumber.split("")
   console.log("numberArray", numberArray);
   console.log("event.nativeEvent", event.nativeEvent.key)

   if(numberArray.length === 17 && event.nativeEvent.key !== "Backspace") {
     return
   }

   if(!isNaN(event.nativeEvent.key)) {
    // 입력값 숫자
    numberArray.push(event.nativeEvent.key)
    setFormattedNumber(numberArray.join(''))

    if(numberArray.length === 4) {
      numberArray.splice(3, 0, " ", "-", " ");
      console.log("하이폰 추가", numberArray)
      setFormattedNumber(numberArray.join(''))
    } else if(numberArray.length === 11) {
      numberArray.splice(10, 0, " ", "-", " ");
      console.log("하이폰 추가", numberArray)
      setFormattedNumber(numberArray.join(''))
    }
    
  } else if(event.nativeEvent.key === "Backspace") {
    // 입력값 Backspace 
    
    numberArray.pop()
    setFormattedNumber(numberArray.join(''))

    if(numberArray.length === 13) {
      numberArray.splice(10, 3);
      console.log("하이폰 제거", numberArray)
      setFormattedNumber(numberArray.join(''))
    } else if(numberArray.length === 6) {
      numberArray.splice(3, 3);
      console.log("하이폰 제거", numberArray)
      setFormattedNumber(numberArray.join(''))
    }
  }
}

  const startTimeout = () => {
      timeout = setInterval(function() {
      console.log("시간제한 시작", limitTime)
      setLimitMin((parseInt(String(limitTime/60))))
      if(String(limitTime%60).length == 1) {
        setLimitSec("0"+String(limitTime%60))
      } else {
        setLimitSec(String(limitTime%60))
      }

      limitTime = limitTime - 1


      if(limitTime < 0) {
        clearInterval(timeout);
      }
    }, 1000)
  }



  const onFocusNumberInput = () => {
    setNumberInputFocus(true);
  }

  const onUnfocusNumberInput = (text:string) => {
    setNumberInputFocus(false);
    checkNumber(text);
  }

  const onFocusAuthCodeInput = () => {
    setAuthCodeInputFocus(true);
  }

  const onUnfocusAuthCodeInput = (text:string) => {
    setAuthCodeInputFocus(false);
  }

  const clickLoginButton = () => {
    
    dispatch(
      allActions.userActions.setUser({
          number: submitingNumber,
      })
    )
  }

 const clickSendAuthCode = () => {
   if(formattedNumber.split("").length === 17) {
    var tmpNumber = formattedNumber.split(" - ");
    console.log("tmpNumber", tmpNumber.join(""));
    setNumber(tmpNumber.join(""));
    setVisibleAuthCodeInput(true)
    startTimeout()
   }
 }

 const goBack = () => {
   navigation.goBack()
   clearInterval(timeout)
   
   limitTime = 300;

 }



  return (
    <Container>
      <HeaderBar>
          <TouchableWithoutFeedback onPress={() => goBack()}>
            <HeaderLeftContainer>
          <HeaderBackIcon source={require('~/Assets/Images/HeaderBar/ic_back.png')} />
          </HeaderLeftContainer>
          </TouchableWithoutFeedback>
          <HeaderTitleText>본인인증</HeaderTitleText>
          <HeaderRightContainer>
        <HeaderEmptyContainer/>
        </HeaderRightContainer>
      </HeaderBar>
      <BodyContainer>
        {/*
        <LoginDescipText>
          <LoginDescipText style={{fontWeight:'bold'}}>로그인하고</LoginDescipText>
          {"\n"}맞춤 치과 정보 받기!</LoginDescipText>
        */}
        <ItemContainer style={{marginTop: 0}}>
          <ItemTextInput
          ref={numberInputRef}
          placeholder={" - 없이 번호 입력"}
          placeholderTextColor={"#7e7e7e"}
          style={[(numberInputState === "unvalid" && {borderColor: '#FF3B30'}) || (numberInputFocus && {borderColor:'#267DFF', backgroundColor: '#FFFFFF'})]}
          onChangeText={(text:string) => onChangeNumberInput(text)}
          autoCapitalize={"none"}
          onSubmitEditing={(text) => onUnfocusNumberInput(text.nativeEvent.text)}
          keyboardType={"number-pad"}
          onEndEditing={(text) => onUnfocusNumberInput(text.nativeEvent.text)}
          onFocus={() => onFocusNumberInput()}
          autoFocus={true}
          value={formattedNumber}
          onKeyPress={(event) => onKeyPressNumberInput(event)}
          />
          <TouchableWithoutFeedback onPress={() => clickSendAuthCode()}>
          <VerifyTextContainer style={visibleAuthCodeInput ? {paddingLeft:10}: {paddingLeft: 20}}>
          <VerifyText>{visibleAuthCodeInput ? "재전송" : "인증"}</VerifyText>
          </VerifyTextContainer>
          </TouchableWithoutFeedback>
        </ItemContainer>
        {visibleAuthCodeInput && (
        <ItemContainer style={{marginTop: 16}}>
          <ItemTextInput
          ref={authCodeInputRef}
          style={authCodeInputFocus && {borderColor:'#267DFF', backgroundColor: "#ffffff"}}
          onFocus={() => onFocusAuthCodeInput()}
          onSubmitEditing={(text:any) => onUnfocusAuthCodeInput(text.nativeEvent.text)}
          onEndEditing={(text:any) => onUnfocusAuthCodeInput(text.nativeEvent.text)}
          onChangeText={(text: string) => setAuthCode(text)}
          autoCapitalize={"none"}
          keyboardType={"name-phone-pad"}
          autoFocus={true}
          />
          <TimeLimitTextContainer>
            <TimeLimitText>{limitMin + ":" + limitSec}</TimeLimitText>
          </TimeLimitTextContainer>
        </ItemContainer>
        )}
        <FinishButtonContainer>
          <AboveKeyboard>
        {(number !== "" && authCode !== "") && (
          <TouchableWithoutFeedback onPress={() => clickLoginButton()}>
          <AbledLoginButton>
            <AbledLoginText>로그인</AbledLoginText>
          </AbledLoginButton>
          </TouchableWithoutFeedback>
        )}
        {visibleAuthCodeInput && authCode == "" && (
        <DisabledLoginButton>
          <DisabledLoginText>로그인</DisabledLoginText>
        </DisabledLoginButton>
        )}
        </AboveKeyboard>
        </FinishButtonContainer>
      </BodyContainer>
      {loading && (
        <LoadingContainer>
          <ActivityIndicator
          color={"#FFFFFF"}/>
        </LoadingContainer>
      )}
    </Container>
  );
};

export default LoginScreen;

