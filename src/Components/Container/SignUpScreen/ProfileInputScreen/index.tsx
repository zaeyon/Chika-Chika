import React, {useState, useLayoutEffect, useEffect, useRef} from 'react';
import Styled from 'styled-components/native';
import {
  TouchableWithoutFeedback,
  View,
  Text,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import allActions from '~/actions';
import AboveKeyboard from 'react-native-above-keyboard';

const Container = Styled.SafeAreaView`
 flex: 1;
 background-color: #ffffff;
 align-items: center;
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
 width: ${wp('85%')};
 height: ${hp('70%')};
 align-items: center;
`;

const LabelInputContainer = Styled.View`
 width: ${wp('85%')};
 margin-bottom: 20px;
`;

const Input = Styled.TextInput`
position: relative;
top: 5px;
width: ${wp('85%')};
height: 50px;
font-size: 16px;
`;

const InputBottomLine = Styled.View`
position: absolute;
bottom: 6px;
width: ${wp('85%')};
height: 0.5px;
background-color: #c3c3c3;
`;

const HeaderBar = Styled.View`
 width: ${wp('100%')};
 height: ${wp('11.7%')};
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
 background-color:#ffffff;
`;

const HeaderTitle = Styled.Text`
font-size: 20px;
margin-top: 5px;
`;


const HeaderLeftContainer = Styled.View`
`;

const BackButtonContainer = Styled.View`
 padding: 7px 15px 13px 16px;
 align-items: center;
 justify-content: center;
`;

const BackButton = Styled.Image`
 width: ${wp('6.4%')};
 height: ${wp('6.4%')};
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
 width: ${wp('6.4%')};
 height: ${wp('6.4%')};
`;


const CloseButton = Styled.Image`
 width: ${wp('6.5%')};
 height: ${wp('6.5%')};
 tint-color: #000000;
`;

const FinishButtonContainer = Styled.View`
width: ${wp('100%')};
padding-left: ${wp('4.2%')};
position:absolute;
bottom: 20px;
`;

const FinishButton = Styled.View`
width: ${wp('91.46%')};
height: ${wp('13.33%')};
border-radius: 10px;
 background-color: #267DFF;
 justify-content: center;
 align-items: center;
`;

const DisabledFinishButton = Styled.View`
width: ${wp('91.46%')};
height: ${wp('13.33%')};
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


const ProfileImage = Styled.Image`
 width: ${wp('25%')};
 height: ${wp('25%')};
 border-radius: 100;
`;


const BirthDateGenderContainer = Styled.View`
width: ${wp('91.46%')};
 flex-direction: row;
 justify-content: space-between;
 align-items: stretch;
`;

const BirthDateContainer = Styled.View`
flex-direction: column;
`;


const GenderContainer = Styled.View`
flex-direction: column;
`;

const BirthDateBackground = Styled.View`
width: ${wp('44%')};
height: ${wp('13.33%')};
border-radius: 10px;
margin-top: 10px;
background-color: #FAFAFA;
justify-content: center;
padding-left: 12px;

border-width: 1.5px;
border-color: #FAFAFA;
`;

const BirthDateText = Styled.Text`
font-size: 16px;
font-weight: 500;
color: #1D1E1F;
`;

const GenderBackground = Styled.View`
width: ${wp('44%')};
height: ${wp('13.33%')};
border-radius: 10px;
margin-top: 10px;
background-color: #FAFAFA;
justify-content: center;
padding-left: 12px;
border-width: 1.5px;
border-color: #FAFAFA;
`;

const GenderText = Styled.Text`
font-size: 16px;
font-weight: 500;
color: #1D1E1F;
`;


const GenderButtonContainer = Styled.View`
 flex-direction: row;
`;

const LabelText = Styled.Text`
font-size: 15px;
color:#9E9E9E;
`;

const GenderButton = Styled.View`
 width: 55px;
 height: 35px;
 margin-right: 6px;
 border-radius: 4px;
 justify-content: center;
 align-items: center;
 border-width: 0.5px;
 border-color: #c3c3c3;
`;

const SelectedGenderButton = Styled.View`
 width: 55px;
 height: 35px;
 margin-right: 6px;
 border-radius: 4px;
 justify-content: center;
 position: absolute;
 align-items: center;
 border-width: 0.5px;
 border-color: #c3c3c3;
 background-color: #23e5d2;
`;

const SelectedGenderText = Styled.Text`
font-size: 18px;
color: #ffffff;
`;

const UnselectedGenderText = Styled.Text`
font-size: 18px;
color: #000000;
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
width: ${wp('91.46%')};
height: ${wp('13.33%')};
border-radius: 10px;
background-color: #FAFAFA;
margin-top: 10px;
padding-left: 10px;
padding-right: 10px;
border-width: 1.5px;
border-color: #FAFAFA;
font-size: 16px;
font-weight: 500;
color: #1D1E1F;
`;

const BirthdateModalContainer = Styled.View`
width: ${wp('100%')};
position: absolute;
bottom: 0;
`;


const IOS14BirthDateModalContainer = Styled.View`
width: ${wp('100%')};
height: ${wp('35%')};
position: absolute;
bottom: 0;
background-color:#fafafa
`;

const ModalHeaderContainer = Styled.View`
 border-width: 0.6px;
 border-color: #ECECEE;
 width: ${wp('100%')};
 height: ${wp('12.5%')};
 background-color: #FAFAFA;
 flex-direction: row;
 justify-content: flex-end;
 align-items: center;
 padding-left: 16px;
`;

const ModalFinishContainer = Styled.View`
padding-top: 12px;
padding-bottom: 12px;
padding-right: 16px
`;

const ModalFinishText = Styled.Text`
 font-size: 16px;
 color: #267DFF;
`;

const GenderModalContainer = Styled.View`
width: ${wp('100%')};
background-color:#FFFFFF;
position: absolute;
bottom: 0;
padding-bottom: 50px;
`;

const GenderModalDescripContainer = Styled.View`
padding-top: 17px;
padding-bottom: 17px;
padding-left: 16px;
padding-right: 16px;
`;

const GenderModalDescripText = Styled.Text`
font-size: 14px;
color: #8E9199;
`;

const RadioTabContainer = Styled.View`
height: ${wp('15%')};
width: ${wp('100%')};
padding-left: 8px;
padding-right: 16px;
background-color: #ffffff;
justify-content: center;
`;

const RadioTabInfoContainer = Styled.View`
height: ${wp('12.5%')};
flex-direction: row;
align-items: center;
justify-content: space-between;
border-bottom-width: 0.6px;
border-color: #ECECEE;
background-color: #ffffff;
`;

const LoadingContainer = Styled.View`
 position: absolute;
 width: ${wp('100%')};
 height: ${hp('100%')};
 align-items: center;
 justify-content: center;
`;

interface Props {
    navigation: any,
    route: any
}



const ProfileInputScreen = ({navigation, route}: Props) => {
  let submitingEmail = route.params!.email || route.params!.socialEmail;
  let submitingPassword: string;
  let submitingSocialId: string;
  let submitingProvider: string;
  let submitingNickname: string;
  let submitingBirthDate: string;
  let submitingGender: string;

  let socialNickname = '';
  let socialGender = '';

  const currentUser = useSelector((state: any) => state.currentUser);
  const dispatch = useDispatch();

  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [profileImage, setProfileImage] = useState(
    'https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png',
  );
  const [inputedNickname, setInputedNickname] = useState('');
  const [birthdate, setBirthdate] = useState(new Date(1998 - 1 - 3));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [inputedGender, setInputedGender] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedMale, setSelectedMale] = useState(false);
  const [selectedFemale, setSelectedFemale] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#ffffff');
  const [selectedColor2, setSelectedColor2] = useState('#ffffff');

  const [validNickname, setValidNickname] = useState(true);
  const [confirmedNickname, setConfirmedNickname] = useState(false);
  const [confirmedBirthDate, setConfirmedBirthDate] = useState(false);
  const [confirmedGender, setConfirmedGender] = useState(false);

  const [socialId, setSocialId] = useState('');
  const [provider, setProvider] = useState('local');

  const [visibleBirthdatePicker, setVisibleBirthdatePicker] = useState<boolean>(false);
  const [visibleBirthdatePickerIOS14, setVisibleBirthdatePickerIOS14] = useState<boolean>(false);
  const [visibleGenderModal, setVisibleGenderModal] = useState<boolean>(false);

  const [formattedBirthdate, setFormattedBirthdate] = useState<string>("");
  const [birthdateIndication, setBirthdateIndication] = useState('');
  const [nicknameInputFocused, setNicknameInputFocused] = useState<boolean>(false);
  const [selectedGenderRadioIndex, setSelectedGenderRadioIndex] = useState<number>(0);

  const [nicknameOverlap, setNicknameOverlap] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [iosVersion, setIosVersion] = useState<number>(parseInt(Platform.Version, 10));


  var radio_props = [
    {label: '여성', value: 0 },
    {label: '남성', value: 1},
    {label: '선택안함', value: 2},
  ];

  const onPressRadioButton = (i: number) => {
    setSelectedGenderRadioIndex(i)
    console.log("selectedRadioIndex", i);
}


  useEffect(() => {
    if (
      route.params!.socialGender === 'MALE' ||
      route.params!.socialGender === 'Male' ||
      route.params!.socialGender === 'male'
    ) {
      console.log('이미 남자');
      selectMale();
    } else if (
      route.params!.socialGender === 'FEMALE' ||
      route.params!.socialGender === 'Female' ||
      route.params!.socialGender === 'female'
    ) {
      selectFemale();
    }
    if (route.params!.socialNickname) {
      submitingNickname = route.params.socialNickname;
      setInputedNickname(route.params.socialNickname);
      setConfirmedNickname(true);
    }
    if (route.params!.socialId) {
      console.log('소셜로그인', route.params.socialId);
      setSocialId(route.params!.socialId);
    }
    if (route.params!.socialProvider) {
      setProvider(route.params.socialProvider);
    }
  }, []);

  if (route.params?.password) {
    submitingPassword = route.params!.password;
  } else {
    console.log('소셜 로그인함', route);
    submitingPassword = null;
    if (route.params?.socialProvider) {
      socialNickname = route.params?.socialNickname;
      //setConfirmedNickname(true);
    }
    socialGender = route.params!.socialGender;
    console.log(route.params.socialGender);
  }

  useEffect(() => {
    if(route.params?.nickname) {
      console.log("route.params.nickname", route.params.nickname);
      setInputedNickname(route.params.nickname);
      checkNickname(route.params.nickname);
      console.log("route.params.gender", route.params.gender);
      setInputedGender(route.params.gender);
      setConfirmedGender(true);
      console.log("route.params.birthdate", route.params.birthdate);
      setBirthdate(route.params.birthdate);
      setBirthdateIndication(formatDate(route.params.birthdate));
      setConfirmedBirthDate(true);
      setFormattedBirthdate(submitFormatDate(route.params.birthdate));
    }
  }, [])

  const selectMale = () => {
    setSelectedFemale(false);
    setSelectedColor2('#ffffff');
    setSelectedColor('#23e5d2');
    setSelectedMale(true);
    setConfirmedGender(true);
    setInputedGender('male');
  };

  const selectFemale = () => {
    setSelectedMale(false);
    setSelectedColor('#ffffff');
    setSelectedColor2('#23e5d2');
    setSelectedFemale(true);
    setConfirmedGender(true);
    setInputedGender('female');
  };

  const notSelectGender = () => {
    setInputedGender('notSelect')
  }

  function checkNickname(nickname: string) {
    console.log('입력된 nickname', nickname);
    var strArray = nickname.split('');
    if (strArray.length >= 2 && strArray.length <= 12) {
      setConfirmedNickname(true);
      setValidNickname(true);
    } else {
      setValidNickname(false);
    }
    submitingNickname = nickname;
  }

  function changingNickname(nickname: string) {
    setValidNickname(true);
    setConfirmedNickname(false);
  }

  function formatDate(date: any) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return year + "년 " + month + "월 " + day + "일";
  }


  function submitFormatDate(date: any) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('/')
  }

  const onChange = (event:any, selectedDate:any) => {
    const currentDate = selectedDate || birthdate;
    setShow(Platform.OS === 'ios');

    let BirthDate = formatDate(selectedDate || birthdate);
    console.log('BirthDate', BirthDate);
    setBirthdate(currentDate);
    setBirthdateIndication(BirthDate.toString());
    setConfirmedBirthDate(true);
    submitingBirthDate = BirthDate.toString();
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showBirthdatePicker = () => {
    setVisibleBirthdatePicker(!visibleBirthdatePicker);
    setVisibleGenderModal(false);
    setNicknameInputFocused(false);
    Keyboard.dismiss();
  };


  const showBirthdatePickerIOS14 = () => {
    setVisibleBirthdatePickerIOS14(!visibleBirthdatePickerIOS14);
    setVisibleGenderModal(false);
    setNicknameInputFocused(false)
    Keyboard.dismiss();
  };

  const showGenderSettingModal = () => {
    setVisibleGenderModal(!visibleGenderModal);
    setVisibleBirthdatePicker(false);
    setNicknameInputFocused(false);
    Keyboard.dismiss();
  }

  const onChangeBirthdatePicker = (event: any, date: any) => {
    setBirthdate(date)
    setNicknameInputFocused(false);
  }

  const applyBirthdate = () => {
    console.log("birthdate", birthdate);
    //setSelectedBirthDate(birthdate);
    setBirthdateIndication(formatDate(birthdate));
    setFormattedBirthdate(submitFormatDate(birthdate));
    setVisibleBirthdatePicker(false);
    setConfirmedBirthDate(true)
  }

  const applyGender = () => {
    if(selectedGenderRadioIndex === 0) {
      setInputedGender('female')
    } else if(selectedGenderRadioIndex === 1) {
      setInputedGender('male')
    } else if(selectedGenderRadioIndex === 2) {
      setInputedGender('notSelect')
    }

    setVisibleGenderModal(false);
    setConfirmedGender(true);
  }

  const onChangeNicknameInput = (text: any) => {
    setInputedNickname(text);
    setNicknameOverlap(false);
    var strArray = text.split('');
    var blank_pattern = /[\s]/g;
    if(blank_pattern.test(text) === true) {
      setConfirmedNickname(false) 
    } else {
      if (strArray.length >= 2 && strArray.length <= 12) {
        setConfirmedNickname(true);
      } else {
        setConfirmedNickname(false);
      }
    }
  }

  const onFocusNicknameInput = () => {
    setNicknameInputFocused(true);
    setVisibleBirthdatePicker(false);
    setVisibleGenderModal(false);
  }

  const onUnfocusNicknameInput = (text:string) => {
    setNicknameInputFocused(false);
    checkNickname(text)
  }

  const navigateGoBack = () => {
    if(route.params?.socialProvider) {
      navigation.goBack();
    } else {
      navigation.navigate("BasicInput", {
        inputedNickname: inputedNickname,
        inputedGender: inputedGender,
        inputedBirthdate: birthdate,
      })
    }
  }

  const signUp = () => {
    //setLoading(true);
    submitingNickname = inputedNickname;
    submitingSocialId = socialId;
    submitingBirthDate = formattedBirthdate;
    submitingProvider = provider;
    submitingGender = inputedGender;
    console.log('가입요청 email', submitingEmail);
    console.log('가입요청 password', submitingPassword);
    console.log('가입요청 nickname', submitingNickname);
    console.log('가입요청 birthDate', submitingBirthDate);
    console.log('가입요청 gender', submitingGender);
    console.log('가입요청 socialId', submitingSocialId);
    console.log('가입요청 provider', submitingProvider);

    dispatch(
      allActions.userActions.setUser({
          email: submitingEmail,
          birthDate: submitingBirthDate,
          gender: submitingGender,
          socialId: submitingSocialId,
          provider: submitingProvider,
          nickname: submitingNickname,
      })
  )

    /*
    SignUp(submitingEmail, submitingPassword, submitingNickname, submitingBirthDate, submitingGender, submitingSocialId, submitingProvider, currentUser.fcmToken)
    .then(function(response) {
      setLoading(false);
      if(response.status === 201) {
      //navigation.navigate("SelectInterestScreen");
      console.log("회원가입 성공", response)


      Alert.alert('회원가입이 완료되었습니다!', '', [
        {
          text: "확인",
          onPress: () => {
            navigation.navigate("SelectInterestScreen", {
              email: submitingEmail,
              birthDate: Date.parse(submitingBirthDate),
              gender: submitingGender,
              socialId: submitingSocialId,
              provider: submitingProvider,
              profileImage: response.data.user.thumbnailImg,
              nickname: response.data.user.nickname,
              userId: response.data.user.id,
            });
          },
        }
      ])
      }

    })
    .catch(function(error) {
      setLoading(false);
      console.log("회원가입 실패", error);
      if(error.data.message == "이미 있는 닉네임입니다.") {
        console.log("이미있는 닉네임")
        setNicknameOverlap(true);
      }
    })
    */
  };


  return (
    <Container>
      <HeaderBar>
        <TouchableWithoutFeedback onPress={() => navigateGoBack()}>
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
      {loading && (
        <LoadingContainer>
          <ActivityIndicator/>
        </LoadingContainer>
      )}
      <InputContainer style={{marginTop: 10}}>
        <ItemContainer>
          <ItemLabelText>닉네임</ItemLabelText>
          <ItemTextInput
            style={(nicknameOverlap || (!validNickname && !nicknameInputFocused)) && {borderColor:'#FF3B30'} || (nicknameInputFocused) && {borderColor:'#267DFF'}}
            autoCapitalize={"none"}
            clearButtonMode={"while-editing"}
            onChangeText={(text: string) => onChangeNicknameInput(text)}
            onSubmitEditing={(text) => onUnfocusNicknameInput(text.nativeEvent.text)}
            onEndEditing={(text) => onUnfocusNicknameInput(text.nativeEvent.text)}
            onFocus={() => onFocusNicknameInput()}
            value={inputedNickname}
          />
          {!validNickname && !nicknameOverlap && <UnvalidInputText>2-12자, 공백 사용 불가</UnvalidInputText>}
          {nicknameInputFocused && !nicknameOverlap && <FocusInputText>2-12자, 공백 사용 불가</FocusInputText>}
          {nicknameOverlap && (
            <UnvalidInputText>이미 사용중인 닉네임입니다.</UnvalidInputText>
          )}
        </ItemContainer>
        <BirthDateGenderContainer style={{marginTop: 33}}>
          <BirthDateContainer>
            <ItemLabelText>생년월일</ItemLabelText>
            <TouchableWithoutFeedback onPress={() => showBirthdatePicker()}>
              <BirthDateBackground style={visibleBirthdatePicker && {borderColor:'#267DFF'}}>
                <BirthDateText>{birthdateIndication}</BirthDateText>
              </BirthDateBackground>
            </TouchableWithoutFeedback>
          </BirthDateContainer>
          <GenderContainer>
            <ItemLabelText>성별</ItemLabelText>
            <TouchableWithoutFeedback onPress={() => showGenderSettingModal()}>
            <GenderBackground style={visibleGenderModal && {borderColor:'#267DFF'}}>
              <GenderText>{inputedGender === "male" ? "남자" : (inputedGender === "female" ? "여자" : (inputedGender === "notSelect" ? "선택안함" : ""))}</GenderText>
            </GenderBackground>
            </TouchableWithoutFeedback>
          </GenderContainer>
        </BirthDateGenderContainer>
      </InputContainer>
      {!visibleBirthdatePicker && (
<FinishButtonContainer>
<AboveKeyboard>
<TouchableWithoutFeedback onPress={() => signUp()}>
<FinishButton 
style={(!confirmedNickname || !confirmedBirthDate || !confirmedGender) &&{backgroundColor:'#ECECEE'}}>
  <FinishText style={(!confirmedNickname || !confirmedBirthDate || !confirmedGender) &&{color:'#8E9199'}}>가입</FinishText>
</FinishButton>
</TouchableWithoutFeedback>
</AboveKeyboard>
</FinishButtonContainer>
      )}
      {visibleBirthdatePicker &&  (
        <BirthdateModalContainer>
          <ModalHeaderContainer>
            <TouchableWithoutFeedback onPress={() => applyBirthdate()}>
            <ModalFinishContainer>
              <ModalFinishText>완료</ModalFinishText>
            </ModalFinishContainer>
            </TouchableWithoutFeedback>
          </ModalHeaderContainer>
          <DateTimePicker
                locale={'ko_KR.UTF-8'}
                style={{flex:1}}
                testID="birthdatePicker"
                value={birthdate}
                onChange={(event,date) => onChangeBirthdatePicker(event,date)}
                mode={'date'}
                display='spinner'
                is24Hour={true}
                maximumDate={new Date()}
              />
        </BirthdateModalContainer>
      )}
      {visibleGenderModal && (
        <GenderModalContainer>
          <ModalHeaderContainer>
            <TouchableWithoutFeedback onPress={() => applyGender()}>
              <ModalFinishContainer>
                <ModalFinishText>완료</ModalFinishText>
              </ModalFinishContainer>
              </TouchableWithoutFeedback>
          </ModalHeaderContainer>
          <GenderModalDescripContainer>
            <GenderModalDescripText>성별 정보는 맞춤형 컨텐츠 제공에 사용됩니다. 
입력한 정보는 [설정]에서 언제든 수정, 관리할 수 있습니다.</GenderModalDescripText>
          </GenderModalDescripContainer>
          <RadioForm>
                            {radio_props.map((obj, i) => (
                            <TouchableWithoutFeedback onPress={() => onPressRadioButton(i)}>
                            <RadioTabContainer>
                            <RadioTabInfoContainer>
                            <RadioButton
                            labelHorizontal={true} 
                            key={i}>
                                <RadioButtonLabel
                                obj={obj}
                                index={i}
                                onPress={() => onPressRadioButton(i)}
                                labelHorizontal={true}
                                labelStyle={{fontSize: 16, color: '#1D1E1F'}}
                                labelWrapStyle={{paddingRight: 200, backgroundColor:'#ffffff'}}/>
                            </RadioButton>
                            <RadioButtonInput
                                obj={obj}
                                index={i}
                                isSelected={selectedGenderRadioIndex === i}
                                onPress={() => onPressRadioButton(i)}
                                borderWidth={1.5}
                                buttonInnerColor={'#267DFF'}
                                buttonOuterColor={selectedGenderRadioIndex === i ? '#267DFF' : '#00000020'}
                                buttonSize={wp('3.73%')}
                                buttonOuterSize={wp('5.86%')}
                                buttonStyle={{}}
                                buttonWrapStyle={{marginLeft: 10}}/>
                            </RadioTabInfoContainer>
                            </RadioTabContainer>
                            </TouchableWithoutFeedback>
                             ))}
                           </RadioForm>

        </GenderModalContainer>
      )}
    </Container>
  );
};

export default ProfileInputScreen;
