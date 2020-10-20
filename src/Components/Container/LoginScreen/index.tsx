import React, {useEffect, useState} from 'react';
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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

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
`;

const HeaderBackIcon = Styled.Image`
 width: ${wp('6.4%')}px;
 height: ${wp('6.4%')}px;
`;

const HeaderTitleText = Styled.Text`
font-weight: 600;
font-size: 18px;
color: #1D1E1F;
`;

const HeaderRightContainer = Styled.View`
padding: 7px 16px 13px 15px;
 align-items: center;
 justify-content: center;
 flex-direction: row;
`;

const HeaderEmptyContainer = Styled.View`
 width: ${wp('6.4%')}px;
 height: ${wp('6.4%')}px;
`;


const ButtonText = Styled.Text`
 font-size: 20px;
 color: #338EFC;
`;

const FormContainer = Styled.View`
  width: 100%;
`;

const Logo = Styled.Text`
  color: #292929;
  font-size: 40px
  font-weight: bold;
  text-align: center;
  margin-bottom: 40px;
`;

const PasswordReset = Styled.Text`
  width: 100%;
  color: #3796EF;
  text-align: center;
  margin-bottom: 24px;
`;

const SignupText = Styled.Text`
  color: #929292;
  text-align: center;
`;

const SignupLink = Styled.Text`
  color: #3796EF;
`;

const Footer = Styled.View`
  width: 100%;
  border-top-width: 1px;
  border-color: #D3D3D3;
  padding: 8px;
`;

const Copyright = Styled.Text`
  color: #929292;
  text-align: center;
`;

const BodyContainer = Styled.View`
 background-color: #ffffff;
 padding-top: 10px;
 padding-left: 16px;
 padding-right: 16px;
 padding-bottom: 10px;
`;

const ItemContainer = Styled.View`
`;

const ItemLabelText = Styled.Text`
 font-weight: 600;
 font-size: 16px;
 color: #1D1E1F;
`;

const ItemTextInput = Styled.TextInput`
width: ${wp('91.46%')}px;
color: #000000;
height: 50px;
border-radius: 10px;
background-color: #FAFAFA;
margin-top: 10px;
padding-left: 10px;
padding-right: 10px;
border-width: 1.5px;
border-color: #FAFAFA;
`;

const DisabledLoginButton = Styled.View`
margin-top: 37px;
width: ${wp('91.46%')}px;
height: 50px;
background-color: #ECECEE;
border-radius: 10px;
justify-content: center;
align-items: center;
`;

const DisabledLoginText = Styled.Text`
font-weight: 600;
font-size: 18px;
color: #8E9199;
`;


const AbledLoginButton = Styled.View`
margin-top: 37px;
width: ${wp('91.46%')}px;
height: 50px;
background-color: #267DFF;
border-radius: 10px;
justify-content: center;
align-items: center;
`;

const AbledLoginText = Styled.Text`
font-weight: 600;
font-size: 18px;
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

interface Props {
    navigation: any,
    route: any,
}

const LoginScreen = ({navigation}: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validEmail, setValidEmail] = useState<boolean>(false);
  const [emailInputState, setEmailInputState] = useState<string>("noInput");
  const [emailInputFocus, setEmailInputFocus] = useState<boolean>(false);
  const [passwordInputFocus, setPasswordInputFocus] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const currentUser = useSelector((state: any) => state.currentUser);
  const dispatch = useDispatch();
  let submitingEmail:any;
  let submitingPassword:any;

  function checkEmail(str: string) {
    var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    var blank_pattern = /[\s]/g;
    if (blank_pattern.test(str) === true) {
      console.log('공백 포함');
      setValidEmail(false);
    } else if (!regExp.test(str)) {
      console.log('올바른 이메일 형식 아님');
      setValidEmail(false);
    } else {
      setValidEmail(true);
    }
  }

  const onChangeEmailInput = (text: string) => {
    setEmailInputState("inputing");
    setEmail(text);
  }

  const moveToFindPassword = () => {
    navigation.navigate("SettingStack" , {
      screen: 'VerifyEmailScreen'
    });
  }

  const onFocusEmailInput = () => {
    setEmailInputFocus(true);
  }

  const onUnfocusEmailInput = (text:string) => {
    setEmailInputFocus(false);
    checkEmail(text);
  }

  const onFocusPasswordInput = () => {
    setPasswordInputFocus(true);
  }

  const onUnfocusPasswordInput = (text:string) => {
    setPasswordInputFocus(false);
  }

  const clickLoginButton = () => {
    setLoading(true)
    var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    var blank_pattern = /[\s]/g;

    if(blank_pattern.test(email) === true || !regExp.test(email)) {
      console.log("올바른 이메일 형식 아님")
      setEmailInputState("unvalid");
    } else {
    submitingEmail = email;
    submitingPassword = password;
    console.log('로그인 요청!! email', submitingEmail);
    console.log('로그인 요청!! password', submitingPassword);

    dispatch(
      allActions.userActions.setUser({
          email: submitingEmail,
      })
    )
    /*
    Login(submitingEmail, submitingPassword, currentUser.fcmToken)
    .then(function(response) {
      setLoading(false)
      console.log('로그인성공 유저 정보@@', response.data.user);
      console.log("로그인성공 user.id", response.data.user.id);
      console.log("유저스크랩정보", response.data.user.scraps[0].Posts);
      if(response.status === 200) {
        dispatch(
          allActions.userActions.setUser({
            email: submitingEmail,
            profileImage: response.data.user.thumbnailImg,
            nickname: response.data.user.nickname,
            description: response.data.user.description,
            userId: response.data.user.id,
          })
        )
        
        dispatch(
          allActions.userActions.setLikeFeeds(response.data.user.LikePosts)
        )
        dispatch(
          allActions.userActions.setScrapFeeds(response.data.user.scraps[0].Posts)
        )
        
        dispatch(
          allActions.keywordAction.setInputedKeywordList([])
        )
      }
      GETRecentSearch(0, 20)
      .then(function(response) {
        console.log("GETRecentSearch response", response);
        dispatch(
          allActions.searchAction.setUserRecentSearch(response)
        )
      })
      .catch(function(error) {
        console.log("GETRecentSearch error", error);
      })
    })
    .catch(function (error) {
      setLoading(false)
      console.log("error: ", error);
      if(error.data.message === "You are not a member") {
        Alert.alert('등록되지 않은 계정입니다.', '', [
          {
            text: "확인",
            onPress: () => 0,
          },
        ])
      } else if(error.data.message === "Not correct password.") {
        Alert.alert('비밀번호가 일치하지 않습니다.', '', [
          {
            text: "확인",
            onPress: () => 0,
          },
        ])
      }
    })
    */
  };
 }




    

  return (
    <Container>
      <HeaderBar>
        <HeaderLeftContainer>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <HeaderLeftContainer>
          <HeaderBackIcon source={require('~/Assets/Images/HeaderBar/ic_back.png')} />
          </HeaderLeftContainer>
          </TouchableWithoutFeedback>
        </HeaderLeftContainer>
          <HeaderTitleText>이메일로 로그인</HeaderTitleText>
          <HeaderRightContainer>
        <HeaderEmptyContainer/>
        </HeaderRightContainer>
      </HeaderBar>
      <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps={"handled"}>
      <BodyContainer>
        <ItemContainer>
          <ItemLabelText>이메일</ItemLabelText>
          <ItemTextInput
          style={(emailInputState === "unvalid" && {borderColor: '#FF3B30'}) || (emailInputFocus && {borderColor:'#267DFF'})}
          onChangeText={(text:string) => onChangeEmailInput(text)}
          autoCapitalize={"none"}
          onSubmitEditing={(text) => onUnfocusEmailInput(text.nativeEvent.text)}
          onEndEditing={(text) => onUnfocusEmailInput(text.nativeEvent.text)}
          onFocus={() => onFocusEmailInput()}
          />
          {emailInputState === "unvalid" && (    
          <UnvaildInputText>올바른 이메일 형식이 아닙니다.</UnvaildInputText>
          )
          }
        </ItemContainer>
        <ItemContainer style={{marginTop: 30}}>
          <ItemLabelText>비밀번호</ItemLabelText>
          <ItemTextInput
          style={passwordInputFocus && {borderColor:'#267DFF'}}
          onFocus={() => onFocusPasswordInput()}
          onSubmitEditing={(text:any) => onUnfocusPasswordInput(text.nativeEvent.text)}
          onEndEditing={(text:any) => onUnfocusPasswordInput(text.nativeEvent.text)}
          secureTextEntry={true}
          onChangeText={(text: string) => setPassword(text)}
          autoCapitalize={"none"}
          />
        </ItemContainer>
        {(email === "" || password === "") && (
        <DisabledLoginButton>
        <DisabledLoginText>로그인</DisabledLoginText>
      </DisabledLoginButton>
        )}
        {(email !== "" && password !== "") && (
          <TouchableWithoutFeedback onPress={() => clickLoginButton()}>
          <AbledLoginButton>
            <AbledLoginText>로그인</AbledLoginText>
          </AbledLoginButton>
          </TouchableWithoutFeedback>
        )}
      </BodyContainer>
      <FooterContainer>
        <TouchableWithoutFeedback onPress={() => moveToFindPassword()}>
        <FindPasswordText>비밀번호 찾기</FindPasswordText>
        </TouchableWithoutFeedback>
      </FooterContainer>
      </KeyboardAwareScrollView>
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

