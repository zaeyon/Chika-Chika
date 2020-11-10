import React, {useState, useEffect, useRef} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, Keyboard} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DateTimePicker from '@react-native-community/datetimepicker';


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
padding: 7px 16px 13px 15px;
 align-items: center;
 justify-content: center;
 flex-direction: row;
`;

const HeaderBackIcon = Styled.Image`
width: ${wp('6.4%')};
height: ${wp('6.4%')};
`;

const HeaderTitleText = Styled.Text`
font-size: 18px;
color: #000000;
font-weight: bold
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
width: ${wp('91.46%')};
height: ${wp('12.799%')};
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
position: absolute;
bottom: 53px;

`;

const FinishButton = Styled.View`
width: ${wp('91.46%')};
height: ${wp('12.799%')};
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
width: ${wp('100%')};
position: absolute;
bottom: 0;
background-color: #D5D8DD;
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

const PriceTextInput = Styled.TextInput`
width: ${wp('85.46%')};
font-size: 16px;
color: #F0F6FC;
`;

const DisplayPriceText = Styled.Text`
font-size: 16px;
color: #0075FF;
`;

const DisplayPriceContainer = Styled.View`
position: absolute;
width: ${wp('91.46%')};
height: ${wp('12.799%')};
justify-content: center;
padding-left: 12px;
`;

interface Props {
    navigation: any,
    route: any,
}

const ReviewMetaDataScreen = ({navigation, route}: Props) => {
    
    const [dentalClinicName, setDentalClinicName] = useState<string>("")
    const [dentalClinicAddress, setDentalClinicAddress] = useState<string>("")
    const [treatDate, setTreatDate] = useState<string>("")
    const [treatPrice, setTreatPrice] = useState<string>("")

    const [date, setDate] = useState(new Date());
    const [displayDate , setDisplayDate] = useState<string>("")
    const [displayPrice, setDisplayPrice] = useState<any>();
    const [onFocusDentalClinicName, setOnFocusDentalClinicName] = useState<boolean>(false)
    const [onFocusTreatDate, setOnFocusTreatDate] = useState<boolean>(false);
    const [onFocusTreatPrice, setOnFocusTreatPrice] = useState<boolean>(false);

    const priceInputRef = useRef<any>()

    useEffect(() => {
        if(route.params?.dentalClinicName || route.params?.dentalCLinicAddress) {
            setDentalClinicName(route.params?.dentalClinicName)
        }
    }, [route.params?.dentalClinicName, route.params?.dentalClinicAddress])

    const goBack = () => {
        navigation.goBack();
    }

    const moveToDentalClinicSearch = () => {
        navigation.navigate("DentalClinicSearchScreen");
        setOnFocusDentalClinicName(true)
        setOnFocusTreatDate(false)
        setOnFocusTreatPrice(false)

        priceInputRef.current.blur()
    }

    const onPressTreatDate = () => {
        setOnFocusTreatDate(!onFocusTreatDate)
        setOnFocusDentalClinicName(false)
        setOnFocusTreatPrice(false)

        priceInputRef.current.blur()
    }

    const onPressTreatPrice = () => {
        setOnFocusTreatDate(false)
        setOnFocusDentalClinicName(false)
        setOnFocusTreatPrice(!onFocusTreatPrice)

        if(priceInputRef.current.isFocused()) priceInputRef.current.blur()
        else priceInputRef.current.focus()
    }

    const convertDisplayDate = (date: any) => {
        var tmpDate = new Date(date),
            month = '' + (tmpDate.getMonth() + 1),
            day = '' + tmpDate.getDate(),
            year = '' + tmpDate.getFullYear()

            if(month.length < 2) month = "0" + month;
            if(day.length < 2) day = "0" + day;

            return year + "년" + " " + month + "월" + " " + day + "일"
    }


  const onChangeDatePicker = (event: any, date: any) => {
    setDate(date)
  }

  const applyTreatDate = () => {
    console.log("date", date);
    setDisplayDate(convertDisplayDate(date))
    setOnFocusTreatDate(false)
  }

  const onFocusPriceInput = () => {
      setOnFocusTreatPrice(true)
  }

  const onPressBackground = () => {
    Keyboard.dismiss()
    setOnFocusTreatPrice(false)
    setOnFocusTreatDate(false)
    setOnFocusDentalClinicName(false)
  }

  const onChangePriceInput = (text: number) => {
    
      setDisplayPrice(Number(text).toLocaleString() + "원") 
      setTreatPrice(text)
  }

  const onPressFinishButton = () => {
      navigation.navigate("TreatSearchScreen");
  }


    return (
        <TouchableWithoutFeedback onPress={() => onPressBackground()}>
        <Container>
            <HeaderBar>
               <TouchableWithoutFeedback onPress={() => goBack()}>
                <HeaderLeftContainer>
                    <HeaderBackIcon
                    source={require('~/Assets/Images/HeaderBar/ic_back.png')}/>
                </HeaderLeftContainer>
                </TouchableWithoutFeedback>
                <HeaderTitleText>정보확인</HeaderTitleText>
                <HeaderRightContainer>
                    <HeaderEmptyContainer>
                    </HeaderEmptyContainer>
                </HeaderRightContainer>
            </HeaderBar>
            <BodyContainer>
                <TouchableWithoutFeedback onPress={() => moveToDentalClinicSearch()}>
                <MetaDataItemContainer style={onFocusDentalClinicName && {borderWidth: 1, borderColor: "#0075FF"}}>
                <MetaDataText>{dentalClinicName}</MetaDataText>
                </MetaDataItemContainer>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => onPressTreatDate()}>
                <MetaDataItemContainer style={[{marginTop: 16}, onFocusTreatDate && {borderWidth: 1, borderColor: "#0075FF"}]}>
                <MetaDataText>{displayDate}</MetaDataText>
                </MetaDataItemContainer>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => onPressTreatPrice()}>
                <MetaDataItemContainer style={[{marginTop: 16}, onFocusTreatPrice && {borderWidth: 1, borderColor: "#0075FF"}]}>
                    <PriceTextInput
                    ref={priceInputRef}
                    value={treatPrice}
                    autoCapitalize={"none"}
                    keyboardType={"numeric"}
                    onFocus={() => onFocusPriceInput()}
                    onChangeText={(text:string) => onChangePriceInput(text)}
                    caretHidden={true}
                    />
                    <DisplayPriceContainer>
                    <DisplayPriceText>{displayPrice}</DisplayPriceText>
                    </DisplayPriceContainer>
                </MetaDataItemContainer>
                </TouchableWithoutFeedback>
            </BodyContainer>
            <FooterContainer>
            <TouchableWithoutFeedback onPress={() => onPressFinishButton()}>
            <FinishButton>
                <FinishText>확인</FinishText>
            </FinishButton>
            </TouchableWithoutFeedback>
            </FooterContainer>
            {onFocusTreatDate &&  (
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
                    style={{flex:1}}
                    testID="datePicker"
                    value={date}
                    onChange={(event,date) => onChangeDatePicker(event,date)}
                    mode={'date'}
                    display='spinner'
                    is24Hour={true}
                    maximumDate={new Date()}
                    />
            </DateModalContainer>
      )}
        </Container>
        </TouchableWithoutFeedback>
    )
}

export default ReviewMetaDataScreen


