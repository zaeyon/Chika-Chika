import React, {useState, useLayoutEffect, useEffect, useRef} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, Keyboard, SafeAreaView, ActivityIndicator} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AboveKeyboard from 'react-native-above-keyboard';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

// Route

const Container = Styled.SafeAreaView`
 flex: 1;
 background-color: #ffffff;
 align-items: center;
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
`;

const BackButtonContainer = Styled.View`
 padding: 7px 15px 13px 16px;
 align-items: center;
 justify-content: center;
`;

const BackButton = Styled.Image`
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

const NextText = Styled.Text`
 font-size: 17px;
 color: #000000;
 margin-right: 13px;
`;

const TextInputLabelText = Styled.Text`
position: absolute;
font-size:14px;
color: #707070;
align-self: flex-start;
`;

const InputContainer = Styled.View`
 align-items: center;
 padding-bottom: 80px;
`;

const LabelInputContainer = Styled.View`
 width: ${wp('85%')}px;
 margin-bottom: 20px;
`;

const Input = Styled.TextInput`
position: relative;
top: 5px;
width: ${wp('85%')}px;
height: 50px;
font-size: 16px;
`;

const InputBottomLine = Styled.View`
position: absolute;
bottom: 6px;
width: ${wp('85%')}px;
height: 0.5px;
background-color: #c3c3c3;
`;

const FinishButtonContainer = Styled.View`
width: ${wp('100%')}px;
padding-left: ${wp('4.2%')}px;
position:absolute;
bottom: 20px;
`;

const FinishButton = Styled.View`
width: ${wp('91.46%')}px;
height: ${wp('13.33%')}px;
border-radius: 10px;
 background-color: #267DFF;
 justify-content: center;
 align-items: center;
`;

const DisabledFinishButton = Styled.View`
width: ${wp('91.46%')}px;
height: ${wp('13.33%')}px;
border-radius: 10px;
 background-color: #ECECEE;
 justify-content: center;
 align-items: center;
`;

const DisabledFinishText = Styled.Text`
font-weight: 600;
font-size: 18px;
color: #8E9199;
`;

const FinishText = Styled.Text`
font-weight: 600;
font-size: 18px;
color: #ffffff;
`;

const UnvalidInputText = Styled.Text`
 margin-left: 10px;
 font-size: 13px;
 position: absolute;
 bottom: -18px;
 color: #FF0000;
`;


const FocusInputText = Styled.Text`
 margin-left: 10px;
 font-size: 13px;
 position: absolute;
 bottom: -18px;
 color: #267DFF;
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
height: ${wp('13.33%')}px;
border-radius: 10px;
background-color: #FAFAFA;
color: #000000;
margin-top: 10px;
padding-left: 10px;
padding-right: 10px;
border-width: 1.5px;
border-color: #FAFAFA;
`;

const LoadingContainer = Styled.View`
 position: absolute;
 width: ${wp('100%')}px;
 height: ${hp('100%')}px;
 align-items: center;
 justify-content: center;
`;

const BodyContainer = Styled.View`
`;

interface Props {
    navigation: any,
    route: any
}

const BasicInputScreen = ({navigation, route}: Props) => {
  const [inputedEmail, setInputedEmail] = useState('');
  const [inputedPassword, setInputedPassword] = useState('');
  const [inputedPasswordSame, setInputedPasswordSame] = useState('');
  const [passwordSame, setPasswordSame] = useState(true);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [emptyEmail, setEmptyEmail] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);
  const [blankEmail, setBlankEmail] = useState(false);
  const [blankPassword, setBlankPassword] = useState(false);
  const [shortPassword, setShortPassword] = useState(false);
  const [passwordHasNum, setPasswordHasNum] = useState(false);
  const [passwordHasAlp, setPasswordHasAlp] = useState(false);

  const [confirmedEmail, setConfirmedEmail] = useState(false);
  const [confirmedPassword, setConfirmedPassword] = useState(false);
  const [confirmedPasswordSame, setConfirmedPasswordSame] = useState(false);

  const [onFocusEmail, setOnFocusEmail] = useState<boolean>(false);
  const [onFocusPassword, setOnFocusPassword] = useState<boolean>(false);
  const [onFocusPasswordConfirm, setOnFocusPasswordConfirm] = useState<boolean>(false);
  const [emailOverlap, setEmailOverlap] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  var emailInputRef = useRef(Object);
  var passwordInputRef = useRef(Object);
  var passwordConfirmInputRef = useRef(Object);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
    Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);
    return (): void => {
      Keyboard.removeListener('keyboardDidShow', onKeyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', onKeyboardDidHide);
    };
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableWithoutFeedback onPress={() => moveToProfileInput()}>
          <NextText>다음</NextText>
        </TouchableWithoutFeedback>
      ),
    });
  }, [navigation]);

  function onKeyboardDidShow(e: any): void {
    setKeyboardHeight(e.endCoordinates.height);
  }

  function onKeyboardDidHide(): void {
    setKeyboardHeight(0);
  }

  const moveToProfileInput = () => {
    //setLoading(true)
    console.log("moveToProfileInput");
    if(!confirmedEmail || !confirmedPassword || inputedPasswordSame === "") {
      console.log("No confirmed input");

    } else {
      if(inputedPassword !== inputedPasswordSame) {
        setPasswordSame(false);
        setLoading(false);
      } else {
        console.log("이메일 중복 검사");
        /*
        GETEmailCheck(inputedEmail)
        .then(function(response) {
          setLoading(false);
          console.log("GETEmailCheck response", response);
          if(response.message === "이미 가입된 이메일입니다.") {
            setEmailOverlap(true);
          } else if(response.message === "가입할 수 있는 이메일입니다.") {
            navigation.navigate('ProfileInput', {
              email: inputedEmail,
              password: inputedPassword,
              nickname: route.params?.inputedNickname,
              birthdate: route.params?.inputedBirthdate,
              gender: route.params?.inputedGender,
            });
    
            emailInputRef.current.blur();
            passwordInputRef.current.blur();
            passwordConfirmInputRef.current.blur();
          }
          })
          .catch(function(error) {
            setLoading(false);
            console.log("GETEmailCheck error", error)
            if(error.status === 403) {
              console.log("이미 사용중인 이메일", error.status);
              //setEmailOverlap(true);
            }
          })
          */
         navigation.navigate("ProfileInputScreen", {
           email: inputedEmail,
           password: inputedPassword,
           nickname: route.params?.inputedNickname,
           birthdate: route.params?.inputedBirthdate,
           gender: route.params?.inputedGender,
         })
      }
    }
  };

  function checkEmail(str: string) {
    var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    var blank_pattern = /[\s]/g;

    if (!str) {
      console.log('값이 없음');
      setEmptyEmail(true);
      setBlankEmail(false);
      setValidEmail(true);
      setConfirmedEmail(false);
    } else if (blank_pattern.test(str) === true) {
      console.log('공백 포함');
      setBlankEmail(true);
      setEmptyEmail(false);
      setValidEmail(false);
      setConfirmedEmail(false);
    } else if (!regExp.test(str)) {
      console.log('올바른 이메일 형식 아님');
      setValidEmail(false);
      setEmptyEmail(false);
      setBlankEmail(false);
      setConfirmedEmail(false);
    } else {
      setValidEmail(true);
      setEmptyEmail(false);
      setBlankEmail(false);
      setConfirmedEmail(true);
    }
  }

  function changingEmail(str: string) {
    var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    var blank_pattern = /[\s]/g;

    setValidEmail(true);
    setEmailOverlap(false);
    setInputedEmail(str);

    if(!str) {
     setConfirmedEmail(false);
    } else if(blank_pattern.test(str) === true) {
      setConfirmedEmail(false);
    } else if(!regExp.test(str)) {
      setConfirmedEmail(false);
    } else {
      setConfirmedEmail(true);
    }
    /*
    setEmptyEmail(false);
    setBlankEmail(false);
    setValidEmail(true);
    setConfirmedEmail(false);
    setInputedEmail(str);
    */
  }

  function checkPassword(str: string) {
    var blank_pattern = /[\s]/g;
    var pattern_num = /[0-9]/; // 숫자
    var pattern_eng = /[a-zA-Z]/; // 문자
    var strArray = str.split('');

    if (!str) {
      console.log('비밀번호값이 없음');
      setEmptyPassword(true);
      setBlankPassword(false);
      setValidPassword(true);
      setConfirmedPassword(false);
    } else if (blank_pattern.test(str) === true) {
      console.log('비밀번호값에 공백 포함');
      setBlankPassword(true);
      setEmptyPassword(false);
      setValidPassword(false);
      setConfirmedPassword(false);
    } else if (strArray.length < 8) {
      console.log('비밀번호 8자리 미만');
      setShortPassword(true);
      setBlankPassword(false);
      setEmptyPassword(false);
      setValidPassword(false);
      setConfirmedPassword(false);
    } else if (pattern_eng.test(str) && pattern_num.test(str)) {
      setValidPassword(true);
      setShortPassword(false);
      setEmptyPassword(false);
      setBlankPassword(false);
      setConfirmedPassword(true);
    } else {
      console.log('비밀번호값에 문자,숫자 미포함');
      setValidPassword(false);
      setShortPassword(false);
      setEmptyPassword(false);
      setBlankPassword(false);
      setConfirmedPassword(false);
    }
  }

  function changingPassword(str: string) {
    if (str === inputedPasswordSame) {
      setPasswordSame(true);
      setConfirmedPasswordSame(true);
    }

    setInputedPassword(str);
    var blank_pattern = /[\s]/g;
    var pattern_num = /[0-9]/; // 숫자
    var pattern_eng = /[a-zA-Z]/; // 문자
    var strArray = str.split('');

    setValidEmail(true);
    if (!str) {
      console.log('비밀번호값이 없음');
      setConfirmedPassword(false);
    } else if (blank_pattern.test(str) === true) {
      console.log('비밀번호값에 공백 포함');
      setConfirmedPassword(false);
    } else if (strArray.length < 8) {
      console.log('비밀번호 8자리 미만');
      setConfirmedPassword(false);
    } else if (pattern_eng.test(str) && pattern_num.test(str)) {
      setConfirmedPassword(true);
    } else {
      console.log('비밀번호값에 문자,숫자 미포함');
      setConfirmedPassword(false);
    }



    /*
    setValidPassword(true);
    setShortPassword(false);
    setEmptyPassword(false);
    setBlankPassword(false);
    setPasswordSame(true);
    setConfirmedPassword(false);
    setInputedPassword(str);
    */
  }

  function checkPasswordSame(str: string) {
    /*
    if (inputedPassword === str) {
      console.log('비밀번호 일치');
      console.log('inputedPasswlrd', inputedPassword);
      console.log('str', str);
      setPasswordSame(true);
      setConfirmedPasswordSame(true);
    } else {
      setPasswordSame(false);
      setConfirmedPasswordSame(false);
      console.log('비밀번호 불일치');
      console.log('inputedPasswlrd', inputedPassword);
      console.log('str', str);
    }
    */
  }

  function changingPasswordSame(str: string) {
    /*
    if (str === inputedPassword) {
      setPasswordSame(true);
      setConfirmedPasswordSame(true);
    } else {
      setPasswordSame(false);
      setConfirmedPasswordSame(false);
    }
    */
   
   setInputedPasswordSame(str); 
   setPasswordSame(true);
  }

  const onFocusEmailInput = () => {
    setOnFocusEmail(true);
  }

  const onUnfocusEmailInput = (text: string) => {
    checkEmail(text)
    setOnFocusEmail(false);
  }

  const onFocusPasswordInput = () => {
    setOnFocusPassword(true);
  }

  const onUnfocusPasswordInput = (text: string) => {
    checkPassword(text);
    setOnFocusPassword(false);
  }

  const onFocusPasswordConfirmInput = () => {
    setOnFocusPasswordConfirm(true);
  }

  const onUnfocusPasswordConfirmInput = (text: string) => {
    checkPasswordSame(text);
    setOnFocusPasswordConfirm(false);
  }

  return (
    <Container>
      <HeaderBar>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <HeaderLeftContainer>
            <BackButtonContainer>
              <BackButton
              source={require('~/Assets/Images/HeaderBar/ic_back.png')}/>
            </BackButtonContainer>
          </HeaderLeftContainer>
        </TouchableWithoutFeedback>
        <HeaderTitleText>회원가입</HeaderTitleText>
        <HeaderRightContainer>
          <HeaderEmptyContainer/>
        </HeaderRightContainer>
      </HeaderBar>
      <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}>
      <InputContainer style={{marginTop: 10}}>
        <ItemContainer>
          <ItemLabelText>이메일</ItemLabelText>
          <ItemTextInput
            ref={emailInputRef}
            style={((emailOverlap || blankEmail || (!validEmail && !blankEmail)) &&  {borderColor:'#FF3B30'}) || (onFocusEmail && {borderColor:'#267DFF'})}
            autoCapitalize="none"
            autoFocus={true}
            onChangeText={(text: string) => changingEmail(text)}
            onSubmitEditing={(text) => onUnfocusEmailInput(text.nativeEvent.text)}
            onEndEditing={(text) => onUnfocusEmailInput(text.nativeEvent.text)}
            onFocus={() => onFocusEmailInput()}
            clearButtonMode={"while-editing"}
          />
          {blankEmail && (
            <UnvalidInputText>공백은 사용할 수 없습니다.</UnvalidInputText>
          )}
          {!validEmail && !blankEmail && (
            <UnvalidInputText>올바른 이메일형식이 아닙니다.</UnvalidInputText>
          )}
          {emailOverlap && (
            <UnvalidInputText>이미 사용중인 이메일입니다.</UnvalidInputText>
          )}
        </ItemContainer>

        <ItemContainer style={{marginTop: 33}}>
          <ItemLabelText>비밀번호</ItemLabelText>
          <ItemTextInput
            ref={passwordInputRef}
            style={((blankPassword || (!validPassword && !blankPassword && !onFocusPassword)) && {borderColor:'#FF3B30'}) || (onFocusPassword && {borderColor: '#267DFF'})}
            autoCapitalize={"none"}
            onChangeText={(text: any) => changingPassword(text)}
            onSubmitEditing={(text: any) => onUnfocusPasswordInput(text.nativeEvent.text)}
            onEndEditing={(text: any) => onUnfocusPasswordInput(text.nativeEvent.text)}
            onFocus={() => onFocusPasswordInput()}
            secureTextEntry={true}
            clearButtonMode={"while-editing"}/>
          {blankPassword && !onFocusPassword && (
            <UnvalidInputText>공백은 사용할 수 없습니다.</UnvalidInputText>
          )}
          {(!validPassword || shortPassword) && !blankPassword && (inputedPassword.length > 0) && (!onFocusPassword) && (
            <UnvalidInputText>영문, 숫자 포함 8자 이상</UnvalidInputText>
          )}
          {onFocusPassword && (
           <FocusInputText>영문, 숫자 포함 8자 이상</FocusInputText>
          )}
        </ItemContainer>
        <ItemContainer style={{marginTop: 33}}>
          <ItemLabelText>비밀번호 확인</ItemLabelText>
          <ItemTextInput
            ref={passwordConfirmInputRef}
            style={((!passwordSame) && {borderColor:'#FF3B30'}) || ((onFocusPasswordConfirm) && {borderColor:'#267DFF'})}
            autoCapitalize={"none"}
            secureTextEntry={true}
            onChangeText={(text:any) => changingPasswordSame(text)}
            onSubmitEditing={(text: any) =>
              onUnfocusPasswordConfirmInput(text.nativeEvent.text)
            }
            onEndEditing={(text: any) =>
              onUnfocusPasswordConfirmInput(text.nativeEvent.text)
            }
            onFocus={() => onFocusPasswordConfirmInput()}
            clearButtonMode={"while-editing"}
          />
          {!passwordSame && (
            <UnvalidInputText>비밀번호가 일치하지 않습니다.</UnvalidInputText>
          )}
        </ItemContainer>
      </InputContainer>
      </KeyboardAwareScrollView>
          <FinishButtonContainer>
          <AboveKeyboard>

        <TouchableWithoutFeedback onPress={() => moveToProfileInput()}>
          <FinishButton style={(!confirmedEmail || !confirmedPassword || inputedPasswordSame === "") && {backgroundColor: '#ECECEE'}}>
            <FinishText style={(!confirmedEmail || !confirmedPassword || inputedPasswordSame === "") && {color: '#8E9199'}}>다음</FinishText>
          </FinishButton>
          </TouchableWithoutFeedback>
          </AboveKeyboard>
          </FinishButtonContainer>
          {loading && (
            <LoadingContainer>
              <ActivityIndicator/>
            </LoadingContainer>
          )}
    </Container>
  );
};

export default BasicInputScreen;
