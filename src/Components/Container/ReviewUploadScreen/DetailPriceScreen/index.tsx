import React, {useState, useEffect, useRef} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, Keyboard, FlatList} from 'react-native';
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
width: ${wp('6.4%')};
height: ${wp('6.4%')};
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

const HeaderSkipContainer = Styled.View`
position: absolute;
right: 0px;
padding: 14px 16px 13px 15px;
`;

const HeaderEmptyContainer = Styled.View`
width: ${wp('6.4%')};
height: ${wp('6.4%')};
`;

const BodyContainer = Styled.View`
align-items: center;
padding-top: 31px;
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
width: ${wp('100%')}px;
position: absolute;
bottom: 53px;
`;

const FinishButtonContainer = Styled.View`
width: ${wp('100%')}px;
align-items: center;
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

const SkipText = Styled.Text`
font-size: 16px;
color: #797979;
`;

const DetailPriceItemContainer = Styled.View`
width: ${wp('88%')};
flex-direction: row;
align-items: center;
justify-content: space-between;
margin-bottom: 16px;
`;

const DetailPriceLabelText = Styled.Text`
font-size: 16px; 
color: #000000;
`;

const DetailPriceInputContainer = Styled.View`
width: ${wp('69.6%')};
height: ${wp('11.2%')};
justify-content: center;
padding-left: 12px;
background-color: #f6f7f8;
border-radius: 8px;
`;

const DetailPriceInput = Styled.TextInput`
width: ${wp('69.6%')};
height: ${wp('11.2%')};
font-size: 16px;
color: #ffffff00;
`;

const DisplayDetailPriceText = Styled.Text`
position: absolute;
left: 12px;
font-size: 16px;
color: #0075FF;
`;

interface Props {
    navigation: any,
    route: any,
}

const DetailPriceScreen = ({navigation, route}: Props) => {
    
    const [treatPrice, setTreatPrice] = useState<string>("")
    const [displayPrice, setDisplayPrice] = useState<any>();
    const [onFocusTreatPrice, setOnFocusTreatPrice] = useState<boolean>(false);
    const [selectedTreatList, setSelectedTreatList] = useState<Array<object>>([]);
    const [changeDetailPriceList, setChangeDetailPriceList] = useState<boolean>(false);
    const priceInputRef = useRef<any>()    
    const [buttonBottomPadding, setButtonBottomPadding] = useState<number>(53);


    for (var i = 0; i < route.params.selectedTreatList.length; i++) {
        route.params.selectedTreatList[i].inputRef = useRef()
    }

    useEffect(() => {
        if(route.params?.selectedTreatList) {
            console.log("route.params.selectedTreatList", route.params?.selectedTreatList);
            
            setSelectedTreatList(route.params?.selectedTreatList);
            //setDetailPriceList(route.params?.selectedTreatList);
        }
    }, [route.params?.selectedTreatList])

    
    const goBack = () => {
        navigation.goBack();
    }

    const onPressTreatPrice = () => {
        setOnFocusTreatPrice(!onFocusTreatPrice)

        if(priceInputRef.current.isFocused()) priceInputRef.current.blur()
        else priceInputRef.current.focus()
    }

  const onFocusPriceInput = () => {
      setOnFocusTreatPrice(true)
  }

  const onPressBackground = () => {

    var tmpSelectedTreatList = selectedTreatList;
    for (var i = 0; i < tmpSelectedTreatList.length; i++) {
        tmpSelectedTreatList[i].focused = false
    }

    setSelectedTreatList(tmpSelectedTreatList);
    setChangeDetailPriceList(!changeDetailPriceList)


    Keyboard.dismiss()
  }

  const onFocusDetailPriceInput = (index: number) => {
      var tmpSelectedTreatList = selectedTreatList
      
      tmpSelectedTreatList[index].focused = true

      for (var i = 0; i < tmpSelectedTreatList.length; i++) {
          if(i !== index) {
              tmpSelectedTreatList[i].focused = false
          }
      }

      setSelectedTreatList(tmpSelectedTreatList);
      setChangeDetailPriceList(!changeDetailPriceList);

      console.log("tmpDetailPriceList", tmpSelectedTreatList);
      
  }

  const onSubmitDetailPriceInput = (index: number) => {
      var tmpSelectedTreatList = selectedTreatList
      
      tmpSelectedTreatList[index].focused = false
      setSelectedTreatList(tmpSelectedTreatList);
      setChangeDetailPriceList(!changeDetailPriceList)

    }

  const onChangeDetailPriceInput = (text: string, index: number) => {
      if(text.length > 0) {
        console.log("text", text)
        console.log("index", index);
        console.log("detailPriceList", selectedTreatList);
  
        var tmpSelectedTreatList = selectedTreatList;
  
        tmpSelectedTreatList[index].displayPrice = (Number(text).toLocaleString() + "원")
        tmpSelectedTreatList[index].price = text
        setSelectedTreatList(tmpSelectedTreatList)
        setChangeDetailPriceList(!changeDetailPriceList)        
      }
  }

  
  const onPressFinishButton = () => {
      let isDetailPrice = false
      let detailPriceList = new Array()

      selectedTreatList.map((item, index) => {
          console.log("item", item);
          if(item.price) {
              detailPriceList.push(item);
          }
      })

      if(route.params?.requestPage === "treat") {
        navigation.navigate("RatingScreen", {
            selectedTreatList: selectedTreatList,
            dentalClinic: route.params?.dentalClinic,
            treatDate: route.params?.treatDate,
            treatPrice: route.params?.treatPrice,
            detailPriceList: detailPriceList,
            isDetailPrice: isDetailPrice,
            requestPage: "detailPrice",
            requestType: route.params?.requestType,
        });
      } else if(route.params?.requestPage === "content") {
        navigation.navigate("ContentPostScreen", {
            treatPrice: route.params?.treatPrice,
            isDetailPrice: isDetailPrice,
            detailPriceList: detailPriceList,
            requestType: route.params?.requestType,
        });
      }
  }

  const skipDetailPrice = () => {
    navigation.navigate("RatingScreen", {
        selectedTreatList: route.params?.selectedTreatList,
        dentalClinic: route.params?.dentalClinic,
        treatDate: route.params?.treatDate,
        treatPrice: route.params?.treatPrice,
        detailPriceList: [],
        requestPage: "detailPrice",
        requestType: route.params?.requestType,
    });
  }

  const onClickDetailPriceItem = (item: object, index: number) => {
      item.inputRef.current.focus()
  }

  const renderSelectedTreatList = ({item, index}: any) => {
      console.log("item", item);
      return (
        <TouchableWithoutFeedback onPress={() => onClickDetailPriceItem(item, index)}>
        <DetailPriceItemContainer>
            <DetailPriceLabelText>{item.name}</DetailPriceLabelText>
                <DetailPriceInputContainer style={[item.displayPrice && {backgroundColor: "#F0F6FC"}, item.focused && {borderWidth: 1, borderColor:"#0075FF", backgroundColor: "#ffffff"}]}>
                    <DetailPriceInput
                    ref={item.inputRef}
                    caretHidden={true}
                    keyboardType={"number-pad"}
                    autoFocus={false}
                    placeholder={item.displayPrice ? "" : "비용 입력"}
                    placeholderTextColor={"#949494"}
                    onFocus={() => onFocusDetailPriceInput(index)}
                    onSubmitEditing={() => onSubmitDetailPriceInput(index)}
                    onChangeText={(text: String) => onChangeDetailPriceInput(text, index)}/>
                    <DisplayDetailPriceText>{item.displayPrice}</DisplayDetailPriceText>
                </DetailPriceInputContainer>
        </DetailPriceItemContainer>
        </TouchableWithoutFeedback>
      )
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
                <HeaderTitleText>상세비용</HeaderTitleText>
                <HeaderRightContainer>
                    <HeaderEmptyContainer/>
                    <TouchableWithoutFeedback onPress={() => skipDetailPrice()}>
                    <HeaderSkipContainer>
                    <SkipText>건너뛰기</SkipText>
                    </HeaderSkipContainer>
                    </TouchableWithoutFeedback>
                </HeaderRightContainer>
            </HeaderBar>
            <BodyContainer>
                <FlatList
                data={selectedTreatList}
                renderItem={renderSelectedTreatList}/>
            </BodyContainer>
            <FooterContainer style={{bottom: buttonBottomPadding}}>
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
        </Container>
        </TouchableWithoutFeedback>
    )
}

export default DetailPriceScreen


