import React, {useState, useEffect, useRef} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, Keyboard} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DateTimePicker from '@react-native-community/datetimepicker';
import AboveKeyboard from 'react-native-above-keyboard';

const Container = Styled.SafeAreaView`
 flex: 1;
 background-color: #FFFFFF;
 align-items: center;
`;

const HeaderBar = Styled.View`
 width: ${wp('100%')}px;
 height: ${wp('13.8%')}px;
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
 background-color:#ffffff;
 border-bottom-width: 0.6px;
 border-color: #ECECEE;
`;

const HeaderLeftContainer = Styled.View`
height: ${wp('13.8%')}px;
padding: 0px 16px 0px 16px;
 align-items: center;
 justify-content: center;
 flex-direction: row;
`;

const HeaderBackIcon = Styled.Image`
width: ${wp('6.4%')}px;
height: ${wp('6.4%')}px;
`;

const HeaderTitleText = Styled.Text`
margin-top: 5px;
font-size: 18px;
color: #000000;
font-weight: bold
`;

const HeaderRightContainer = Styled.View`
height: ${wp('13.8%')}px;
padding: 0px 16px 0px 16px;
 align-items: center;
 justify-content: center;
 flex-direction: row;
`;

const HeaderEmptyContainer = Styled.View`
width: ${wp('6.4%')}px;
height: ${wp('6.4%')}px;
`;

const BodyContainer = Styled.View`
align-items: center;
padding-top: 39px;
`;

const TakePhotoText = Styled.Text`
`;

const GalleryText = Styled.Text`
margin-top: 30px;
`;

const MetaDataItemContainer = Styled.View`
width: ${wp('91.46%')}px;
height: ${wp('12.799%')}px;
background-color: #F0F6FC;
border-radius: 8px;
justify-content: center;
padding-left: 12px;
padding-right: 12px;
`;

const MetaDataText = Styled.Text`
font-weight: 300
font-size: 16px;
color: #0075FF
`;

const FooterContainer = Styled.View`
width: ${wp('100%')}px;
position: absolute;
bottom: 53px;
`;

const FinishButtonContainer = Styled.View`
width: ${wp('100%')}px;
align-items: center;
`;

const FinishButton = Styled.View`
width: ${wp('91.46%')}px;
height: ${wp('12.799%')}px;
border-radius: 8px;
background-color: #0075FF;
align-items: center;
justify-content: center;
`;

const FinishText = Styled.Text`
font-weight: bold;
font-size: 16px;
color: #ffffff;
`;

const DateModalContainer = Styled.View`
width: ${wp('100%')}px;
position: absolute;
bottom: 0;
background-color: #D5D8DD;
`;

const ModalHeaderContainer = Styled.View`
 border-width: 0.6px;
 border-color: #ECECEE;
 width: ${wp('100%')}px;
 height: ${wp('12.5%')}px;
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

const PriceTextInput = Styled.TextInput`
width: ${wp('85.46%')}px;
font-size: 16px;
color: #F0F6FC;
`;

const DisplayPriceText = Styled.Text`
font-size: 16px;
color: #0075FF;
`;

const DisplayPriceContainer = Styled.View`
position: absolute;
width: ${wp('91.46%')}px;
height: ${wp('12.799%')}px;
justify-content: center;
padding-left: 12px;
`;

interface Props {
  navigation: any;
  route: any;
}

type dentalData = {
  name: string;
  address: string;
  id: number;
};

const ReviewMetaDataScreen = ({navigation, route}: Props) => {
  const [treatDate, setTreatDate] = useState<any>('');
  const [treatPrice, setTreatPrice] = useState<string>('');
  const [dentalClinic, setDentalClinic] = useState<object>({});

  const [date, setDate] = useState(new Date());
  const [displayDate, setDisplayDate] = useState<string>('');
  const [displayPrice, setDisplayPrice] = useState<any>();
  const [onFocusDentalClinicName, setOnFocusDentalClinicName] = useState<
    boolean
  >(false);
  const [onFocusTreatDate, setOnFocusTreatDate] = useState<boolean>(false);
  const [onFocusTreatPrice, setOnFocusTreatPrice] = useState<boolean>(false);
  const [buttonBottomPadding, setButtonBottomPadding] = useState<number>(53);

  const priceInputRef = useRef<any>();

  /*
    useEffect(() => {
        if(route.params?.selectedTreatList) {
            setSelectedTreatList(route.params?.selectedTreatList);
        }
        
    }, [route.params?.selectedTreatList])
    */

  useEffect(() => {
    if (route.params?.dentalClinic) {
      setDentalClinic(route.params?.dentalClinic);
    }
  }, [route.params?.dentalClinic]);

  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', onKeyboardWillShow);
    Keyboard.addListener('keyboardWillHide', onKeyboardWillHide);

    return () => {
      Keyboard.removeListener('keyboardWillShow', onKeyboardWillShow);
      Keyboard.removeListener('keyboardWillHide', onKeyboardWillHide);
    };
  }, []);

  const onKeyboardWillShow = () => {
    setButtonBottomPadding(20);
  };

  const onKeyboardWillHide = () => {
    setButtonBottomPadding(53);
  };

  const goBack = () => {
    navigation.goBack();
  };

  const moveToDentalClinicSearch = () => {
    navigation.navigate('DentalNameSearchScreen', {
      requestPage: 'metadata',
    });
    setOnFocusDentalClinicName(true);
    setOnFocusTreatDate(false);
    setOnFocusTreatPrice(false);

    priceInputRef.current.blur();
  };

  const onPressTreatDate = () => {
    setOnFocusTreatDate(!onFocusTreatDate);
    setOnFocusDentalClinicName(false);
    setOnFocusTreatPrice(false);

    priceInputRef.current.blur();
  };

  const onPressTreatPrice = () => {
    setOnFocusTreatDate(false);
    setOnFocusDentalClinicName(false);
    setOnFocusTreatPrice(!onFocusTreatPrice);

    if (priceInputRef.current.isFocused()) priceInputRef.current.blur();
    else priceInputRef.current.focus();
  };

  const convertDisplayDate = (date: any) => {
    console.log('convertDisplayDate date', date);

    var tmpDate = new Date(date),
      month = '' + (tmpDate.getMonth() + 1),
      day = '' + tmpDate.getDate(),
      year = '' + tmpDate.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    console.log('convertDisplayDate day', day);

    return year + '년' + ' ' + month + '월' + ' ' + day + '일';
  };

  const convertSubmitDate = (date: any) => {
    console.log('convertDisplayDate date', date);

    var tmpDate = new Date(date),
      month = '' + (tmpDate.getMonth() + 1),
      day = '' + tmpDate.getDate(),
      year = '' + tmpDate.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return year + '-' + month + '-' + day;
  };

  const onChangeDatePicker = (event: any, date: any) => {
    setDate(date);
  };

  const applyTreatDate = () => {
    console.log('applyTreatDate date', date);
    setDisplayDate(convertDisplayDate(date));
    setTreatDate(convertSubmitDate(date));
    setOnFocusTreatDate(false);
  };

  const onFocusPriceInput = () => {
    setOnFocusTreatPrice(true);
  };

  const onPressBackground = () => {
    Keyboard.dismiss();
    setOnFocusTreatPrice(false);
    setOnFocusTreatDate(false);
    setOnFocusDentalClinicName(false);
  };

  const onChangePriceInput = (text: number) => {
    setDisplayPrice(Number(text).toLocaleString() + '원');
    setTreatPrice(text);
  };

  const onPressFinishButton = () => {
    navigation.navigate('TreatSearchScreen', {
      dentalClinic: dentalClinic,
      treatDate: {
        displayTreatDate: displayDate,
        treatDate: treatDate,
      },
      treatPrice: {
        displayTreatPrice: displayPrice,
        treatPrice: treatPrice,
      },
      requestPage: 'metadata',
      requestType: route.params?.requestType,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={() => onPressBackground()}>
      <Container>
        <HeaderBar>
          <TouchableWithoutFeedback onPress={() => goBack()}>
            <HeaderLeftContainer>
              <HeaderBackIcon
                source={require('~/Assets/Images/HeaderBar/ic_back.png')}
              />
            </HeaderLeftContainer>
          </TouchableWithoutFeedback>
          <HeaderTitleText>정보확인</HeaderTitleText>
          <HeaderRightContainer>
            <HeaderEmptyContainer></HeaderEmptyContainer>
          </HeaderRightContainer>
        </HeaderBar>
        <BodyContainer>
          <TouchableWithoutFeedback onPress={() => moveToDentalClinicSearch()}>
            <MetaDataItemContainer
              style={
                onFocusDentalClinicName && {
                  borderWidth: 1,
                  borderColor: '#0075FF',
                }
              }>
              <MetaDataText>{dentalClinic.name}</MetaDataText>
            </MetaDataItemContainer>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => onPressTreatDate()}>
            <MetaDataItemContainer
              style={[
                {marginTop: 16},
                onFocusTreatDate && {borderWidth: 1, borderColor: '#0075FF'},
              ]}>
              <MetaDataText>{displayDate}</MetaDataText>
            </MetaDataItemContainer>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => onPressTreatPrice()}>
            <MetaDataItemContainer
              style={[
                {marginTop: 16},
                onFocusTreatPrice && {borderWidth: 1, borderColor: '#0075FF'},
              ]}>
              <PriceTextInput
                ref={priceInputRef}
                value={treatPrice}
                autoCapitalize={'none'}
                keyboardType={'numeric'}
                onFocus={() => onFocusPriceInput()}
                onChangeText={(text: string) => onChangePriceInput(text)}
                caretHidden={true}
              />
              <DisplayPriceContainer>
                <DisplayPriceText>{displayPrice}</DisplayPriceText>
              </DisplayPriceContainer>
            </MetaDataItemContainer>
          </TouchableWithoutFeedback>
        </BodyContainer>

        <FooterContainer>
          <AboveKeyboard>
            <FinishButtonContainer>
              <TouchableWithoutFeedback onPress={() => onPressFinishButton()}>
                <FinishButton>
                  <FinishText>확인</FinishText>
                </FinishButton>
              </TouchableWithoutFeedback>
            </FinishButtonContainer>
          </AboveKeyboard>
        </FooterContainer>
        {onFocusTreatDate && (
          <DateModalContainer>
            <ModalHeaderContainer>
              <TouchableWithoutFeedback onPress={() => applyTreatDate()}>
                <ModalFinishContainer>
                  <ModalFinishText>완료</ModalFinishText>
                </ModalFinishContainer>
              </TouchableWithoutFeedback>
            </ModalHeaderContainer>
            <DateTimePicker
              locale={'ko_KR.UTF-8'}
              style={{flex: 1}}
              testID="datePicker"
              value={date}
              onChange={(event, date) => onChangeDatePicker(event, date)}
              mode={'date'}
              display="spinner"
              is24Hour={true}
              maximumDate={new Date()}
            />
          </DateModalContainer>
        )}
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default ReviewMetaDataScreen;
