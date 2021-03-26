import React, {useState, useEffect, useRef, useCallback} from 'react';
import Styled from 'styled-components/native';
import SafeAreaView from 'react-native-safe-area-view';
import {TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Animated, Alert} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DateTimePicker from '@react-native-community/datetimepicker';
import AboveKeyboard from 'react-native-above-keyboard';
//import DeviceInfo from 'react-native-device-info';
import {hasNotch} from '~/method/deviceInfo'
import ActionSheet from 'react-native-actionsheet';
import {Picker} from '@react-native-picker/picker';
import Modal from 'react-native-modal';

import {launchCamera} from 'react-native-image-picker';

// Local Components
import NavigationHeader from '~/Components/Presentational/NavigationHeader';

const Container = Styled.View`
 flex: 1;
 background-color: #FFFFFF;
`;


const BodyContainer = Styled.ScrollView`
background-color: #F5F7F9;
padding-bottom: 100px;
`;

const ScrollViewInnerContainer = Styled.View`
background-color: #F5F7F9;
`;

const MetaDataItemContainer = Styled.View`
background-color: #ffffff;
padding-top: 16px;
padding-bottom: 16px;
padding-left: 16px;
padding-right: 0px;
`;

const MetaDataHeaderContainer = Styled.View`
flex-direction: row;
align-items: center;
justify-content: space-between;
`;

const MetaDataLabelContainer = Styled.View`
flex-direction: row;
align-items: center;
`;

const MetaDataLabelText = Styled.Text`
font-weight: 700;
font-size: 14px;
line-height: 24px;
color: #131F3C;
`;


const AsteriskText = Styled.Text`
margin-top: 3px;
margin-left: 2px;
font-weight: 400;
font-size: 15px;
line-height: 24px;
color: #FF001F;
`;

const RightArrowIconContainer = Styled.View`
flex-direction: row;
align-items: center;
padding-right: 16px;
`;


const MetaDataValueContainer = Styled.View`
flex-direction: row;
padding-top: 8px;
padding-bottom: 8px;
background-color: #ffffff;
border-bottom-width: 1px;
border-color: #F5F7F9;
`;

const MetaDataPlaceholderText = Styled.Text`
font-weight: 400;
font-size: 16px;
line-height: 24px;
color: #9AA2A9;
`;

const MetaDataText = Styled.Text`
font-weight: 400
font-size: 16px;
line-height: 24px;
color: #131F3C;
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
 width: ${wp('100%')}px;
 padding-left: 16px;
 background-color: #FAFAFA;
 flex-direction: row;
 justify-content: flex-end;
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
flex: 1;
font-weight: 400;
font-size: 16px;
color: #ffffff;
`;

const DisplayPriceText = Styled.Text`
font-weight: 400;
font-size: 16px;
color: #131F3C;
`;

const DisplayPriceContainer = Styled.View`
top: 8px;
position: absolute;
justify-content: center;
`;

const HighlightLabelBackground = Styled.View`
background-color: #DAECFE90;
`;

const HighlightLabelBackgroundContainer = Styled.View`
position:absolute;
bottom: 4px;
width: ${wp('100%')}px;
height: 10.5px;
background-color: #DAECFE;
`;

const CoverHighlight = Styled.View`
flex: 1;
background-color: #ffffff;
`;

const MetaDataGuideText = Styled.Text`
margin-top: 2px;
font-weight: 400;
font-size: 10px;
line-height: 16px;
color: #9AA2A9;
`;

const SelectImagesContainer = Styled.View`
padding-top: 16px;
background-color: #ffffff;
`;


const GalleryContainerView = Styled.View`
width: ${wp('100%')}px;
margin-bottom: ${hasNotch() ? 0 : 16}px;
`;

const GalleryFlatList = Styled.FlatList`
width: ${wp('100%')}px;
overflow: visible;
`;


const ItemContainerView = Styled.View`
width: ${wp('19.2%')}px;
height: ${wp('19.2%')}px;
margin-right: 8px;
justify-content: flex-end;
overflow: visible;
`;

const ItemImage = Styled.Image`
width: ${wp('17.86%')}px;
height: ${wp('17.86%')}px;
border-width: 0.5px;
border-color: #E2E6ED;
border-radius: 2px;
`;

const DeleteButtonView = Styled.View`
width: ${wp('5.479%')}px;
height: ${wp('5.479%')}px;
align-items: center;
justify-content: center;
position: absolute;
top: 0px;
right: 0px;
z-index: 1;
background: #131F3C80;
border-radius: 100px;
`;

const DeleteButtonImage = Styled.Image`
width: ${wp('4.26%')}px;
height: ${wp('4.26%')}px;
`;

const UploadImageButtonImage = Styled.Image`
width: ${wp('19.2%')}px;
height: ${wp('19.2%')}px;
margin: 0px 16px 0px 0px;
`;

const SelectedDentalItemContainer = Styled.View`
padding: 4px 12px 4px 12px;
border-radius: 100px;
background-color: #F5F7F9;
`;

const SelectedDentalNameText = Styled.Text`
font-weight: 400;
font-size: 14px;
line-height: 24px;
color: #131F3C;
`;


const SelectedTreatContainer = Styled.View`
width: ${wp('100%')}px;
background-color: #ffffff;
padding-top: 8px;
padding-right: 16px;
flex-direction: row;
flex-wrap: wrap;
`;

const SelectedTreatItemBackground = Styled.View`
margin-bottom: 8px;
padding-left: 12px;
padding-top: 4px;
padding-bottom: 4px;
background-color: #ffffff;
border-width: 1px;
border-color: #E2E6ED;
border-radius: 100px;
flex-direction: row;
align-items: center;
`;

const SelectedTreatItemText = Styled.Text`
color: #131F3C;
font-weight: 400;
font-size: 14px;
line-height: 24px;
`;

const DeleteTreatItemContainer = Styled.View`
padding-right: 12px;
padding-left: 4px;
padding-top: 4px;
padding-bottom: 4px;
`;

const TreatItemDeleteIcon = Styled.Image`
padding-left: 4px;
padding-right: 12px;
width: ${wp('4.8%')}px;
height: ${wp('4.8%')}px;
`;

const RatingContainer = Styled.View`
flex-direction: row;
align-items: center;
`;

const RatingItemContainer = Styled.View`
flex-direction: row;
align-items: center;
padding-top: 4px;
padding-left: 12px;
padding-bottom: 4px;
padding-right: 12px;
background-color: #F5F7F9;
border-radius: 100px;
`;

const RatingLabelText = Styled.Text`
font-weight: 400;
font-size: 11px;
line-height: 24px;
color: #9AA2A9;
`;

const RatingHorizontalDivider = Styled.View`
margin-left: 4px;
margin-right: 4px;
width: 1px;
height: ${hp('0.98%')}px;
background-color: #E2E6ED;
`;

const RatingValueText = Styled.Text`
font-weight: 700;
font-size: 14px;
line-height: 24px;
color: #131F3C;
`;

const TotalPriceKeyboardHeader = Styled.View`
flex-direction: row;
justify-content: flex-end;
width: ${wp('100%')}px;
padding-top: 12px;
padding-bottom: 12px;
padding-left: 16px;
padding-right: 16px;
background-color: #FAFAFA;
`;

const TreatmentDateModal = Styled.Modal`
`;

const TreatmentDateModalContainer = Styled.View`
width: ${wp('100%')}px;
background-color: #ffffff;
border-top-left-radius: 20px;
border-top-right-radius: 20px;
position: absolute;
bottom: 0;
`;

const TreatmentDateModalBackground = Styled.View`
background: #000000;
position: absolute;
width: ${wp('100%')}px;
height: ${hp('100%')}px;
`;

const DetailFilterHeaderContainer = Styled.View`
flex-direction: row;
padding-top: 16px;
padding-bottom: 16px;
padding-left: 16px;
align-items: center;
border-bottom-width: 1px;
border-color: #F5F7F9;
`;

const DetailFilterTitleText = Styled.Text`
font-weight: 700;
font-size: 14px;
line-height: 19px;
color: #000000;
`;

const TimeFilterModalContainer = Styled.View`
`;

const TimePickerContainer = Styled.View`
align-items: center;
padding-left: 25px;
padding-right: 25px;
justify-content: space-between;
flex-direction: row;
border-bottom-width: 1px;
border-color: #F5F7F9;
`;

const FilterDividingText = Styled.Text`
font-weight: normal;
font-size: 18px;
line-height: 24px;
color: #131F3C;
`;


const DetailFilterFooterContainer = Styled.View`
padding-top: 16px;
padding-left: 0px;
padding-right: 16px;
padding-bottom: 32px;
flex-direction: row;
align-items: center;
justify-content: space-between;
`;

const InitializeFilterContainer = Styled.View`
flex-direction: row;
align-items: center;
padding-top: 8px;
padding-bottom: 8px;
padding-left: 16px;
padding-right: 16px;
`;

const InitializeFilterText = Styled.Text`
font-weight: 400;
font-size: 12px;
line-height: 16px;
color: #9AA2A9;
`;

const InitializeFilterIcon = Styled.Image`
margin-left: 4px;
width: ${wp('2.66%')}px;
height: ${wp('2.66%')}px;
`;

const RegisterFilterButton = Styled.View`
width: ${wp('55.46%')}px;
align-items: center;
border-radius: 4px;
background-color: #131F3C;
padding-top: 12px;
padding-bottom: 12px;
`;

const RegisterFilterText = Styled.Text`
font-weight: 700;
font-size: 14px;
line-height: 24px;
color: #ffffff;
`;

const SelectProofImageContainer = Styled.View`
background-color: #FAFCFF;
border-radius: 8px;
align-items: center;
`;

const ProofImageEventBannerImage = Styled.Image`
border-top-left-radius: 8px;
border-top-right-radius: 8px;
width: ${wp('91.466%')}px;
height: ${wp('25.599%')}px;
background-color: #c3c3c3;
`;


const SelectProofImageText = Styled.Text`
margin-left: 8px;
font-weight: 700;
font-size: 16px;
line-height: 24px;
color: #131F3C;
`;

const ProofImageItemContainer = Styled.View`
padding: 16px;
background-color: #F5F7F9;
`;

const SelectProofImageButtonContainer = Styled.View`
width: ${wp('91.466%')}px;
height: ${wp('23.46%')}px;
align-items: center;
justify-content: center;
`;

const SelectProofImageButton = Styled.View`
width: ${wp('82.933%')}px;
height: ${wp('14.933%')}px;
flex-direction: row;
border-radius: 8px;
background-color: #FFFFFF;
align-items: center;
justify-content: space-between;
padding-left: 15px;
padding-right: 15px;
`;

const EventTextContainer = Styled.View`
border-radius: 100px;
padding: 6px 10px 6px 10px;
border-width: 1px;
border-color: #00D1FF;
`;

const EventText = Styled.Text`
font-size: 12px;
color: #00D1FF;
`;

const RightArrowIcon = Styled.Image`
margin-left: 7px;
width: ${wp('1.4%')}px;
height: ${wp('2.7%')}px;
`;



const IsExistProofImageIcon = Styled.Image`
width: ${wp('6.4%')}px;
height: ${wp('6.4%')}px;
`;

const SelectProofImageTextContainer = Styled.View`
flex-direction: row;
align-items: center;
`;

const EventBannerImageContainer = Styled.View`
padding-top: 10px;
padding-bottom: 10px;
`;

const EventBannerImage = Styled.Image`
background-color: #c3c3c3;
width: ${wp('100%')}px;
height: ${hp('12.93%')}px;
`;

const UploadProofImage = Styled.Image`
border-radius: 4px;
margin-top: 16px;
width: ${wp('91.2%')}px;
height: ${wp('21%')}px;
`;

const ProofImageDescripText = Styled.Text`
margin-top: 1px;
font-weight: 400;
font-size: 10px;
line-height: 16px;
color: #9AA2A9;
`;


const SelectedProofImageContainer = Styled.View`
border-radius: 4px;
margin-top: 16px;
width: ${wp('91.2%')}px;
height: ${wp('21%')}px;
`;

const SelectedProofImageCover = Styled.View`
position: absolute;
background-color: #131F3C50;
border-radius: 4px;
width: ${wp('91.2%')}px;
height: ${wp('21%')}px;
align-items: center;
justify-content: center;
`;

const SelectedProofImage = Styled.Image`
resize-mode: contain;
width: ${wp('91.2%')}px;
height: ${wp('21%')}px;
`;

const ViewProofImageText = Styled.Text`
font-weight: 700;
font-size: 16px;
line-height: 24px;
color: #FFFFFF;
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

type RatingObj = {
  serviceRating: any;
  priceRating: any;
  treatmentRating: any;
}

const ReviewMetaDataScreen = ({navigation, route}: Props) => {
  const [treatmentDateObj, setTreatmentDateObj] = useState<any>({
    displayTreatmentDate: '',
    treatmentDate: ''
  });

  const [totalPrice, setTotalPrice] = useState<string>('');

  const [dentalObj, setDentalObj] = useState<object>({});
  const [treatmentArray, setTreatmentArray] = useState<Array<any>>([]);
  const [ratingObj, setRatingObj] = useState<RatingObj>({
    serviceRating: null,
    treatmentRating: null,
    priceRating: null,
  });

  const [displayPrice, setDisplayPrice] = useState<any>();

  const [isActivatedNext, setIsActivatedNext] = useState<boolean>(false);
  const [isVisibleDatePicker, setIsVisibleDatePicker] = useState<boolean>(false);
  const [isFocusedTotalPriceInput, setIsFocusedTotalPriceInput] = useState<boolean>(false);

  const [selectedTreatmentYear, setSelectedTreatmentYear] = useState<any>(`${new Date().getFullYear()}`);
  const [selectedTreatmentMonth, setSelectedTreatmentMonth] = useState<any>(`${new Date().getMonth() + 1}`);
  const [selectedTreatmentDay, setSelectedTreatmentDay] = useState<any>(`${new Date().getDate()}`);

  const [selectedProofImage, setSelectedProofImage] = useState<Object>({});
  const [selectedDentalImages, setSelectedDentalImages] = useState<Array<any>>([]);

  const [loadingTakingPicture, setLoadingTakingPicture] = useState<boolean>(false);

  const actionSheetItemList = ['취소', '촬영', '앨범'];

  const scrollY = useRef<number>(0);
  const scrollViewRef = useRef<any>();
  const totalPriceViewRef = useRef<any>();

  const actionSheetRefByProof = useRef() as any;
  const actionSheetRefByDental = useRef() as any;

  const modalContentY = useRef(new Animated.Value(hp('50%'))).current;
  
  console.log("ReviewMetaDataScreen route.params?", route);
  
  useEffect(() => {
    if(route.params?.selectedProofImage) {
      setSelectedProofImage(route.params.selectedProofImage)
      console.log("route.params.selectedProofImage", route.params.selectedProofImage);
    }
  }, [route.params?.selectedProofImage]);

  useEffect(() => {
    if(route.params?.selectedDentalImages) {
      setSelectedDentalImages(route.params.selectedDentalImages)
    }
  }, [route.params?.selectedDentalImages])

  const priceInputRef = useRef<any>();

  useEffect(() => {
    if(route.params?.selectedTreatmentArray) {
      console.log("route.params?.selectedTreatmentArray", route.params?.selectedTreatmentArray);
      setTreatmentArray(route.params?.selectedTreatmentArray);
    }      
  }, [route.params?.selectedTreatmentArray])

  useEffect(() => {
    if (route.params?.dentalObj) {
      console.log("route.params.dentalObj", route.params.dentalObj);
      setDentalObj(route.params?.dentalObj);
    }
  }, [route.params?.dentalObj]);

  useEffect(() => {
    if(route.params?.ratingObj) {
      console.log("route.params?.ratingObj", route.params.ratingObj);
      setRatingObj(route.params?.ratingObj);
    }
  }, [route.params?.ratingObj]);

  useEffect(() => {
    if(route.params?.treatmentDateObj) {
      console.log("route.params?.treatmentDateObj", route.params.treatmentDateObj);
      setTreatmentDateObj(route.params?.treatmentDateObj)
    }
  }, [route.params?.treatmentDateObj])

  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', _keyboardWillShow);
    Keyboard.addListener("keyboardWillHide", _keyboardWillHide);

    // cleanup function
    return () => {
      Keyboard.removeListener("keyboardWillHide", _keyboardWillHide);
    };
  }, []);

  useEffect(() => {
    if(dentalObj.originalName && treatmentArray.length > 0 && ratingObj.serviceRating &&  treatmentDateObj.treatmentDate !== '') {
      setIsActivatedNext(true)
    } else {
      setIsActivatedNext(false);
    }
  }, [dentalObj, treatmentArray, ratingObj, treatmentDateObj])

  useEffect(() => {
    if(route.params?.totalPriceObj) {
      console.log("route.params?.totalPriceObj", route.params?.totalPriceObj);
      setDisplayPrice(route.params?.totalPriceObj.displayTreatPrice);
      setTotalPrice(route.params?.totalPriceObj.treatPrice);
    }
  }, [route.params?.totalPriceObj])

  const _keyboardWillShow = () => {
};

  const _keyboardWillHide = () => {
      setIsFocusedTotalPriceInput(false);
  };

  const unSelectDentalImage = useCallback((image) => {
    setSelectedDentalImages((prev) => {
      const targetIndex = prev.findIndex(
        (item) => item.filename === image.filename,
      );
      const newSelectedDentalImages = prev.concat();
      if (targetIndex >= 0) {
        newSelectedDentalImages.splice(targetIndex, 1);
        return newSelectedDentalImages;
      } else {
        return prev;
      }
    });
  }, []);

  const goBack = () => {
    Alert.alert('리뷰 작성을 취소하시겠어요?', '', [
      {
        text: '아니요',
        style: 'cancel',
        onPress: () => 0,
      },
      {
        text: '예',
        onPress: () => {
          navigation.goBack()
        }
      }
    ])
  };

  const moveToDentalSearch = () => {
    priceInputRef.current.blur();
    if(route.params?.requestScreen === 'DentalDetailScreen') {
      Alert.alert('병원이름은 수정 할 수 없습니다.')
    } else {
      navigation.navigate('DentalNameSearchScreen', {
        requestPage: 'metadata',
      });
    }
  };

  const moveToTreatmentSearch = () => {
    navigation.navigate('TreatSearchScreen', {
      selectedTreatmentArray: treatmentArray
    });
  }

  const moveToRatingScreen = () => {
    navigation.navigate("RatingScreen", {
      ratingObj: ratingObj
    });
  }

  const moveToProofImageEvent = () => {
    navigation.navigate("ProofImageEventScreen");
  }

  const onPressTreatmentDate = () => {
    setIsVisibleDatePicker(true);
    priceInputRef.current.blur();
    Animated.spring(modalContentY, {
      toValue: 0,
      friction: 17,
      tension: 68,
      useNativeDriver: true,
    }).start();
  };

  const onPressTotalPrice = () => {

    if (priceInputRef.current.isFocused()) priceInputRef.current.blur();
    else priceInputRef.current.focus();

    if(treatmentArray.length === 0 && !ratingObj.serviceRating) {
      if(scrollY.current < hp('6%')) {
        scrollViewRef.current.scrollTo({y: hp('8%')})
      }
    } else if(treatmentArray.length > 0 && !ratingObj.serviceRating) {
      if(scrollY.current < hp('8.5%')) {
        scrollViewRef.current.scrollTo({y: hp('12%')})
      }
    } else if(treatmentArray.length === 0 && ratingObj.serviceRating) {
      if(scrollY.current < hp('6.5%')) {
        scrollViewRef.current.scrollTo({y: hp('10%')})
      }
    } else if(treatmentArray.length > 0 && ratingObj.serviceRating) {
      if(scrollY.current < hp('10%')) {
        scrollViewRef.current.scrollTo({y: hp('13.5%')})
      }
    }
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

    return year + '.' + ' ' + month + '.' + ' ' + day + '.';
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


  const onPressBackground = () => {
    console.log("onPressBackground")
    if(isVisibleDatePicker) {
      setIsVisibleDatePicker(false);
    }

    // if(isFocusedTotalPriceInput) {
    //   setIsFocusedTotalPriceInput(false); 
    // }

    Keyboard.dismiss();
  };

  const onChangeTotalPriceInput = (text: string) => {
    if(text.trim() !== "") {
      setTotalPrice(text);
      setDisplayPrice(Number(text).toLocaleString() + '원');
    } else {
      setTotalPrice("");
      setDisplayPrice("");
    }
  };

  const finishTotalPriceInput = () => {
    Keyboard.dismiss();
  }

  const onFocusTotalPriceInput = () => {
      if(treatmentArray.length === 0 && !ratingObj.serviceRating) {
        if(scrollY.current < hp('6%')) {
          scrollViewRef.current.scrollTo({y: hp('8%')})
        }
      } else if(treatmentArray.length > 0 && !ratingObj.serviceRating) {
        if(scrollY.current < hp('8.5%')) {
          scrollViewRef.current.scrollTo({y: hp('12%')})
        }
      } else if(treatmentArray.length === 0 && ratingObj.serviceRating) {
        if(scrollY.current < hp('6.5%')) {
          scrollViewRef.current.scrollTo({y: hp('10%')})
        }
      } else if(treatmentArray.length > 0 && ratingObj.serviceRating) {
        if(scrollY.current < hp('10%')) {
          scrollViewRef.current.scrollTo({y: hp('13.5%')})
        }
      }
  }

  const moveToContentPost = () => {
    console.log("route.params?.paragraphArray", route.params?.paragraphArray);
    navigation.navigate('ContentPostScreen', {
      dentalObj,
      treatmentArray,
      ratingObj,
      treatmentDate: treatmentDateObj.treatmentDate,
      totalPrice,
      selectedProofImage,
      selectedDentalImages,
      requestType: route.params?.requestType,
      requestScreen: route.params?.requestScreen,
      paragraphArray: route.params?.paragraphArray ? route.params?.paragraphArray : [{
        index: 1,
        image: null,
        description: "",
      },],
      reviewId: route.params?.reviewId,
    })
  }

  const moveToFullProofImage = () => {
    navigation.navigate('FullProofImageScreen', {
      imageArray: [selectedProofImage],
      imageIndex: 0,
    })
  }

  const onPressActionSheetByProof = useCallback(
    (index: number) => {
      switch (actionSheetItemList[index]) {
        case '촬영':
          navigateToCameraByProof();
          break;
        case '앨범':
          navigateToGalleryByProof();
          break;
      }
    },
    [actionSheetItemList],
  );

  const onPressActionSheetByDental = useCallback(
    (index: number) => {
      switch (actionSheetItemList[index]) {
        case '촬영':
          navigateToCameraByDental();
          break;
        case '앨범':
          navigateToGalleryByDental();
          break;
      }
    },
    [actionSheetItemList],
  );

  const navigateToCameraByProof = useCallback(() => {
    setLoadingTakingPicture(true);
    launchCamera({includeBase64: true, mediaType: 'photo'}, (response: CameraResponse) => {
      setLoadingTakingPicture(false); 
      if (!response.didCancel) {
        const capturedImage = {
          filename: response.fileName,
          fileSize: response.fileSize,
          width: response.width,
          height: response.height,
          uri: response.uri,
          base64: response.base64,
          camera: true,
        };
        setSelectedProofImage(capturedImage);
      }
    });
  }, []);

  const navigateToGalleryByProof = useCallback(() => {
    navigation.navigate('ImageSelectOneStackScreen', {
      screen: "ImageSelectOneScreen",
      params: {
        requestScreen: 'ReviewMetaDataScreen_ProofImage',
      }
    });
  }, [])


  const navigateToCameraByDental = useCallback(() => {
    launchCamera({includeBase64: true, mediaType: 'photo'}, (response: CameraResponse) => {
      if (!response.didCancel) {
        const capturedImage = {
          filename: response.fileName,
          fileSize: response.fileSize,
          width: response.width,
          height: response.height,
          uri: response.uri,
          base64: response.base64,
          camera: true,
        };
        setSelectedDentalImages((prev) => [...prev, capturedImage]);
      }
    });
  }, []);

  const navigateToGalleryByDental = useCallback(() => {
    navigation.navigate('ImageSelectStackScreen', {
      screen: 'ImageSelectScreen',
      params: {
        requestScreen: 'ReviewMetaDataScreen_DentalImage',
        selectedImages: selectedDentalImages,
      }
    });
  }, [])

  const cancelTreatmentDateModal = useCallback(() => {
    Animated.timing(modalContentY, {
      toValue: hp('50%'),
      duration: 250,
      useNativeDriver: true,
    }).start(() => setIsVisibleDatePicker(false));
  }, []);


  const deleteTreatItem = (treat: object) => {
    var tmpTreatmentArray = treatmentArray.slice();
    var deleteIndex = tmpTreatmentArray.indexOf(treat);

    tmpTreatmentArray.splice(deleteIndex, 1);
    setTreatmentArray(tmpTreatmentArray);
  };

  const initializeTreatmentDate = () => {
    setIsVisibleDatePicker(false);
    setTreatmentDateObj({
      displayTreatmentDate: '',
      treatmentDate: ''
    });
  }

  const registerTreatmentDate = () => {

    const tmpTreatmentDate = {
      displayTreatmentDate: selectedTreatmentYear + '.' + selectedTreatmentMonth + '.' + selectedTreatmentDay,
      treatmentDate: selectedTreatmentYear + '-' + selectedTreatmentMonth + '-' + selectedTreatmentDay
    }

    setTreatmentDateObj(tmpTreatmentDate);
    cancelTreatmentDateModal()
  };

  const moveToSelectProofImage = () => {
    if(selectedProofImage.uri) {
      navigation.navigate("ProofImageGuideScreen", {
        selectedProofImage: selectedProofImage,
      })
    } else {
      navigation.navigate("ProofImageGuideScreen");
    }
  }

  const clickUploadProofImage = () => {
    actionSheetRefByProof.current.show();
  }

  const deleteSelectedProofImage = () => {
    setSelectedProofImage({});
  }

  const renderDentalImageListHeader = useCallback(
    () => (
      <TouchableWithoutFeedback
        onPress={() => {
          actionSheetRefByDental.current.show();
        }}>
        <UploadImageButtonImage
          source={require('~Assets/Images/Camera/Master/community/btn/uploadImage.png')}
        />
      </TouchableWithoutFeedback>
    ),
    [],
  );



  const renderDentalImageItem = useCallback(
    ({item, index}) => (
      <TouchableWithoutFeedback onPress={() => unSelectDentalImage(item)}>
        <ItemContainerView>
          <DeleteButtonView>
            <DeleteButtonImage
              source={require('~/Assets/Images/Picture/ic_delete.png')}
            />
          </DeleteButtonView>
          <ItemImage
            source={
              item.img_url
                ? {uri: item.img_url} // edit mode s3 image
                : {
                    uri: item.base64
                      ? 'data:image/jpeg;base64,' + item.base64
                      : item.uri,
              }
            }
          />
        </ItemContainerView>
      </TouchableWithoutFeedback>
    ),
    [],
  );

  const renderYearPickerItem = useCallback(() => {
    const startYear = 1900;
    const currentYear = new Date(Date.now()).getFullYear();
    const result = [];
    for (let i = 0; i <= currentYear - startYear; i++) {
      result.push(
        <Picker.Item
          key={String(startYear + i)}
          label={String(startYear + i)}
          value={String(startYear + i)}
        />,
      );
    }
    return result;
  }, []);

  const renderMonthPickerItem = useCallback(() => {
    const currentDate = new Date(Date.now());
    const result = [];
    if (parseInt(selectedTreatmentYear) === currentDate.getFullYear()) {
      for (let i = 1; i <= currentDate.getMonth() + 1; i++) {
        result.push(
        <Picker.Item
        key={String(i)}
        label={String(i)}
        value={String(i)} />
        );
      }
    } else {
      for (let i = 1; i <= 12; i++) {
        result.push(
        <Picker.Item
        key={String(i)}
        label={String(i)}
        value={String(i)} />);
      }
    }
    return result;
  }, [selectedTreatmentYear]);

  const renderDayPickerItem = useCallback(() => {
    const currentDate = new Date(Date.now());
    const result = [];
    if (
      parseInt(selectedTreatmentYear) === currentDate.getFullYear() &&
      parseInt(selectedTreatmentMonth) === currentDate.getMonth() + 1
    ) {
      for (let i = 1; i <= currentDate.getDate(); i++) {
        result.push(
        <Picker.Item 
        key={String(i)}
        label={String(i)}
        value={String(i)} />
        );
      }
    } else {
      if (selectedTreatmentMonth === '2') {
        if (
          (parseInt(selectedTreatmentYear) % 4) +
            (parseInt(selectedTreatmentYear) % 100) +
            (parseInt(selectedTreatmentYear) % 400) ===
          0
        ) {
          for (let i = 1; i <= 29; i++) {
            result.push(
            <Picker.Item
            key={String(i)}
            label={String(i)}
            value={String(i)} />
            );
          }
        } else {
          for (let i = 1; i <= 28; i++) {
            result.push(
            <Picker.Item
            key={String(i)}
            label={String(i)}
            value={String(i)} />
            );
          }
        }
      } else if (
        [1, 3, 5, 7, 8, 10, 12].includes(parseInt(selectedTreatmentMonth))
      ) {
        for (let i = 1; i <= 31; i++) {
          result.push(
          <Picker.Item
          key={String(i)}
          label={String(i)}
          value={String(i)} />);
        }
      } else {
        for (let i = 1; i <= 30; i++) {
          result.push(
          <Picker.Item
          key={String(i)}
          label={String(i)}
          value={String(i)}/>);
        }
      }
    }
    return result;
  }, [selectedTreatmentMonth, selectedTreatmentYear]);

  return (
      <Container>
        <NavigationHeader
        headerLeftProps={{type: 'arrow', onPress: goBack}}
        headerTitle={"관련정보"}
        headerRightProps={{type: 'text', text: "다음", onPress: moveToContentPost}}
        headerRightDisabled={!isActivatedNext}
        headerRightActiveColor={"#00D1FF"}/>
        <BodyContainer
        ref={scrollViewRef}
        keyboardDismissMode={'none'}
        bounces={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 100}}
        onScroll={(event: any) => {
          scrollY.current = event.nativeEvent.contentOffset.y
        }}
        scrollEventThrottle={16}
        >
          <TouchableWithoutFeedback onPress={() => onPressBackground()}>
          <ScrollViewInnerContainer>
            <TouchableWithoutFeedback onPress={() => moveToProofImageEvent()}>
            <EventBannerImageContainer>
              <EventBannerImage
              source={require("~/Assets/Images/Banner/banner_review_starbucks2.png")}/>
            </EventBannerImageContainer>
            </TouchableWithoutFeedback>
          <MetaDataItemContainer
          style={{marginTop: 0}}>
          <MetaDataHeaderContainer>
            <MetaDataLabelContainer>
              <MetaDataLabelText>{"진료인증 자료 첨부하기"}</MetaDataLabelText>
            </MetaDataLabelContainer>
            <RightArrowIconContainer>
              <MetaDataLabelText>{"가이드라인"}</MetaDataLabelText>
              <RightArrowIcon
              source={require('~/Assets/Images/Upload/ic_rightArrow.png')}/>
            </RightArrowIconContainer>
          </MetaDataHeaderContainer>
          <ProofImageDescripText>{"종이 영수증, 온라인 영수증, 카드내역 전체화면중 한가지를 첨부해주세요."}</ProofImageDescripText>
          {!selectedProofImage.uri && (
          <TouchableWithoutFeedback onPress={() => clickUploadProofImage()}>
          <UploadProofImage
          source={require('~/Assets/Images/Upload/uploadProofImage.png')}/>
          </TouchableWithoutFeedback>
          )}
          {selectedProofImage.uri && (
          <TouchableWithoutFeedback onPress={() => moveToFullProofImage()}>
          <SelectedProofImageContainer>
          <SelectedProofImage
          source={{uri: selectedProofImage.uri}}/>
          <SelectedProofImageCover>
          <ViewProofImageText>{"사진 상세보기"}</ViewProofImageText>
          </SelectedProofImageCover>
          <TouchableWithoutFeedback onPress={() => deleteSelectedProofImage()}>
          <DeleteButtonView
          style={{
            top: -7.5,
            right: -7.5,
          }}>
            <DeleteButtonImage
              source={require('~/Assets/Images/Picture/ic_delete.png')}
            />
          </DeleteButtonView>
          </TouchableWithoutFeedback>
          </SelectedProofImageContainer>
          </TouchableWithoutFeedback>
          )}
          </MetaDataItemContainer>  
          <TouchableWithoutFeedback onPress={() => moveToDentalSearch()}>
          <MetaDataItemContainer
          style={{marginTop: 8}}>
          <MetaDataHeaderContainer>
            <MetaDataLabelContainer>
              <MetaDataLabelText>{"병원명"}</MetaDataLabelText>
              <AsteriskText>{"*"}</AsteriskText>
            </MetaDataLabelContainer>
            {/* <RightArrowIconContainer>
              <RightArrowIcon
              source={require('~/Assets/Images/Arrow/ic_rightArrow.png')}/>
            </RightArrowIconContainer> */}
          </MetaDataHeaderContainer>
            <MetaDataValueContainer>
            {!dentalObj.originalName && (
              <MetaDataPlaceholderText>{"방문한 병원의 이름을 선택하세요."}</MetaDataPlaceholderText>
            )}
            {dentalObj.originalName && (
              <SelectedDentalItemContainer>
                <SelectedDentalNameText>{dentalObj.originalName}</SelectedDentalNameText>
              </SelectedDentalItemContainer>
            )}
            </MetaDataValueContainer>
          </MetaDataItemContainer>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => moveToTreatmentSearch()}>
          <MetaDataItemContainer>
          <MetaDataHeaderContainer>
            <MetaDataLabelContainer>
              <MetaDataLabelText>{"질병 및 치료 항목"}</MetaDataLabelText>
              <AsteriskText>{"*"}</AsteriskText>
            </MetaDataLabelContainer>
            {/* <RightArrowIconContainer>
              <RightArrowIcon
              source={require('~/Assets/Images/Arrow/ic_rightArrow.png')}/>
            </RightArrowIconContainer> */}
          </MetaDataHeaderContainer>
            <MetaDataValueContainer>
            {treatmentArray.length === 0 && (
              <MetaDataPlaceholderText>{"질병 및 치료 항목을 선택하세요."}</MetaDataPlaceholderText>
            )}
            {treatmentArray.length > 0 && (
            <SelectedTreatContainer>
            {treatmentArray.map((item: any, index: number) => {
              return (
                <SelectedTreatItemBackground 
                key={index}
                style={{marginRight: 8}}>
                  <SelectedTreatItemText>
                    {'# ' + item.usualName}
                  </SelectedTreatItemText>
                  <TouchableWithoutFeedback onPress={() => deleteTreatItem(item)}>
                    <DeleteTreatItemContainer>
                      <TreatItemDeleteIcon
                        source={require('~/Assets/Images/Upload/ic_delete.png')}
                      />
                    </DeleteTreatItemContainer>
                  </TouchableWithoutFeedback>
                </SelectedTreatItemBackground>
              );
          })}
          </SelectedTreatContainer>
            )}
            </MetaDataValueContainer>
          </MetaDataItemContainer>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => moveToRatingScreen()}>
          <MetaDataItemContainer>
          <MetaDataHeaderContainer>
          <MetaDataLabelContainer>
          <MetaDataLabelText>{"병원 만족도"}</MetaDataLabelText>
          <AsteriskText>{"*"}</AsteriskText>
          </MetaDataLabelContainer>
          {/* <RightArrowIconContainer>
            <RightArrowIcon
            source={require('~/Assets/Images/Arrow/ic_rightArrow.png')}/>
          </RightArrowIconContainer> */}
          </MetaDataHeaderContainer>
            <MetaDataValueContainer>
            {!ratingObj.serviceRating && (
              <MetaDataPlaceholderText>{"병원 만족도를 알려주세요."}</MetaDataPlaceholderText>
            )}
            {ratingObj.serviceRating && (
              <RatingContainer>
                <RatingItemContainer
                style={{marginLeft: 0}}>
                  <RatingLabelText>{"진료"}</RatingLabelText>
                  <RatingHorizontalDivider/>
                  <RatingValueText>{ratingObj.treatmentRating.toFixed(1)}</RatingValueText>
                </RatingItemContainer>
                <RatingItemContainer
                style={{marginLeft: 8}}>
                  <RatingLabelText>{"비용"}</RatingLabelText>
                  <RatingHorizontalDivider/>
                  <RatingValueText>{ratingObj.priceRating.toFixed(1)}</RatingValueText>
                </RatingItemContainer>
                <RatingItemContainer
                style={{marginLeft: 8}}>
                  <RatingLabelText>{"서비스"}</RatingLabelText>
                  <RatingHorizontalDivider/>
                  <RatingValueText>{ratingObj.serviceRating.toFixed(1)}</RatingValueText>
                </RatingItemContainer>
              </RatingContainer>
            )}
            </MetaDataValueContainer>
          </MetaDataItemContainer>
          </TouchableWithoutFeedback>
          <MetaDataItemContainer>
          <MetaDataHeaderContainer>
          <MetaDataLabelContainer>
            <MetaDataLabelText>{"방문 일자"}</MetaDataLabelText>
            <AsteriskText>{"*"}</AsteriskText>
          </MetaDataLabelContainer>
          </MetaDataHeaderContainer>
          <TouchableWithoutFeedback onPress={() => onPressTreatmentDate()}>
            <MetaDataValueContainer>
            {treatmentDateObj?.displayTreatmentDate === "" && (
            <MetaDataPlaceholderText>{"방문일을 알려주세요."}</MetaDataPlaceholderText>
            )}
            {treatmentDateObj?.displayTreatmentDate !== "" && (
            <MetaDataText>{treatmentDateObj?.displayTreatmentDate}</MetaDataText>
            )}
            </MetaDataValueContainer>
          </TouchableWithoutFeedback>
          </MetaDataItemContainer>
          <MetaDataItemContainer
          onLayout={(event) => {
            console.log("전체치료비용 onLayout event.nativeEvent", event.nativeEvent);
          }}>
          <MetaDataHeaderContainer>
          <MetaDataLabelText>{"전체 치료 비용(선택)"}</MetaDataLabelText>
          </MetaDataHeaderContainer>
          <TouchableWithoutFeedback onPress={() => onPressTotalPrice()}>
            <MetaDataValueContainer>
              <PriceTextInput
                ref={priceInputRef}
                value={totalPrice}
                placeholder={totalPrice === "" ? "전체 비용을 알려주세요." : ""}
                placeholderTextColor={"#9AA2A9"}
                autoCapitalize={'none'}
                keyboardType={'numeric'}
                onChangeText={(text: string) => onChangeTotalPriceInput(text)}
                onFocus={() => onFocusTotalPriceInput()}
                caretHidden={true}
              />
              <DisplayPriceContainer>
                <DisplayPriceText>{displayPrice}</DisplayPriceText>
              </DisplayPriceContainer>
            </MetaDataValueContainer>
          </TouchableWithoutFeedback>
          </MetaDataItemContainer>
          <MetaDataItemContainer
          style={{marginTop: 8}}>
          <MetaDataHeaderContainer>
            <MetaDataLabelContainer>
              <MetaDataLabelText>{"병원 이미지 첨부하기(선택)"}</MetaDataLabelText>
            </MetaDataLabelContainer>
          </MetaDataHeaderContainer>
          <MetaDataGuideText>{"병원 외부 혹은 내부 이미지를 첨부해주세요."}</MetaDataGuideText>
          <SelectImagesContainer>  
            <GalleryContainerView>
              <GalleryFlatList
              data={selectedDentalImages}
              horizontal
              alwaysBounceHorizontal={false}
              scrollIndicatorInsets={{bottom: -1, left: 13, right: 8}}
              
              keyExtractor={(item: any) =>
                'preview' + (item.filename || item.img_filename)
              }
              renderItem={renderDentalImageItem}
              ListHeaderComponent={renderDentalImageListHeader}
              showsHorizontalScrollIndicator={false}
              />
              </GalleryContainerView>
          </SelectImagesContainer>
          </MetaDataItemContainer>
          </ScrollViewInnerContainer>
          </TouchableWithoutFeedback>
        </BodyContainer>
        <TreatmentDateModal
        visible={isVisibleDatePicker}
        transparent={true}
        animationType="none">
          <TouchableWithoutFeedback onPress={() => cancelTreatmentDateModal()}>
            <TreatmentDateModalBackground
            as={Animated.View}
            style={{
              opacity: modalContentY.interpolate({
                inputRange: [0, hp('50%')],
                outputRange: [0.3, 0],
                extrapolate: 'clamp',
              })
            }}>
            </TreatmentDateModalBackground>
          </TouchableWithoutFeedback>
        <TreatmentDateModalContainer
        as={Animated.View}
        style={{
          transform: [{translateY: modalContentY}]
        }}>
            <DetailFilterHeaderContainer>
              <DetailFilterTitleText>{'방문일 설정'}</DetailFilterTitleText>
            </DetailFilterHeaderContainer>
            <TimeFilterModalContainer>
            <TimePickerContainer>
              <Picker
                itemStyle={{
                  fontSize: 20,
                  fontWeight: '700',
                  lineHeight: 24,
                  color: '#131F3C',
                }}
                style={{width: wp('20%'), height: '100%'}}
                onValueChange={(itemValue: any) => setSelectedTreatmentYear(itemValue)}
                selectedValue={selectedTreatmentYear}>
                {renderYearPickerItem()}
              </Picker>
              <FilterDividingText>{'년'}</FilterDividingText>
              <Picker
                itemStyle={{
                  fontSize: 20,
                  fontWeight: '700',
                  lineHeight: 24,
                  color: '#131F3C',
                }}
                selectedValue={selectedTreatmentMonth}
                onValueChange={(itemValue: any) => setSelectedTreatmentMonth(itemValue)}
                style={{width: wp('20%'), height: '100%'}}>
                {renderMonthPickerItem()}
              </Picker>
              <FilterDividingText>{'월'}</FilterDividingText>
              <Picker
                itemStyle={{
                  fontSize: 20,
                  fontWeight: '700',
                  lineHeight: 24,
                  color: '#131F3C',
                }}
                style={{width: wp('20%'), height: '100%'}}
                onValueChange={(itemValue: any) => setSelectedTreatmentDay(itemValue)}
                selectedValue={selectedTreatmentDay}>
                {renderDayPickerItem()}
              </Picker>
              <FilterDividingText>{'일'}</FilterDividingText>
            </TimePickerContainer>
              <DetailFilterFooterContainer>
                <TouchableWithoutFeedback onPress={() => initializeTreatmentDate()}>
                <InitializeFilterContainer>
                  <InitializeFilterText>{"방문일 초기화"}</InitializeFilterText>
                  <InitializeFilterIcon
                  source={require('~/Assets/Images/Map/ic_initialize.png')}/>
                </InitializeFilterContainer>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => registerTreatmentDate()}>
                <RegisterFilterButton>
                  <RegisterFilterText>{"적용하기"}</RegisterFilterText>
                </RegisterFilterButton>
                </TouchableWithoutFeedback>
              </DetailFilterFooterContainer>
              </TimeFilterModalContainer>
          </TreatmentDateModalContainer>
        </TreatmentDateModal>
        {/* {isFocusedTotalPriceInput && (
          <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ModalHeaderContainer>
              <TouchableWithoutFeedback onPress={() => finishTotalPriceInput()}>
                <ModalFinishContainer>
                  <ModalFinishText>완료</ModalFinishText>
                </ModalFinishContainer>
              </TouchableWithoutFeedback>
            </ModalHeaderContainer>
          </KeyboardAvoidingView>
        )} */}
        <ActionSheet
          ref={actionSheetRefByProof}
          options={actionSheetItemList}
          cancelButtonIndex={0}
          onPress={(index: any) => onPressActionSheetByProof(index)}
        />
        <ActionSheet
          ref={actionSheetRefByDental}
          options={actionSheetItemList}
          cancelButtonIndex={0}
          onPress={(index: any) => onPressActionSheetByDental(index)}
        />
      </Container>
  );
};

const styles = StyleSheet.create({
  treatmentDateModalView: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  proofImageContainerShadow: {
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 5,
    shadowOpacity: 0.1,
  },
})

export default ReviewMetaDataScreen;


/*
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
*/


// <ProofImageItemContainer>
//           <SelectProofImageContainer
//           style={styles.proofImageContainerShadow}>
//             <SelectProofImageButtonContainer>
//             <TouchableWithoutFeedback onPress={() => moveToSelectProofImage()}>
//             <SelectProofImageButton
//             style={styles.proofImageContainerShadow}>
//               <SelectProofImageTextContainer>
//               <EventTextContainer>
//                 <EventText>{"EVENT"}</EventText>
//               </EventTextContainer>
//               <SelectProofImageText>{"진료 인증자료 올리기"}</SelectProofImageText>
//               </SelectProofImageTextContainer>
//               {!selectedProofImage?.uri && (
//               <RightArrowIcon
//               source={require('~/Assets/Images/Arrow/ic_rightArrow.png')}/>
//               )}
//               {selectedProofImage?.uri && (
//               <IsExistProofImageIcon
//               source={require('~/Assets/Images/Upload/ic_isExistProofImage.png')}/>
//               )}
//             </SelectProofImageButton>
//             </TouchableWithoutFeedback>
//             </SelectProofImageButtonContainer>
//           </SelectProofImageContainer>
//           </ProofImageItemContainer>