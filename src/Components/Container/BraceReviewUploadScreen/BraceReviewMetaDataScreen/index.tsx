import React, {useState, useEffect, useRef, useCallback} from 'react';
import Styled from 'styled-components/native';
import SafeAreaView from 'react-native-safe-area-view';
import {TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Animated, Alert} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {hasNotch} from '~/method/deviceInfo'
import ActionSheet from 'react-native-actionsheet';
import {Picker} from '@react-native-picker/picker';
import Modal from 'react-native-modal';

import {launchCamera} from 'react-native-image-picker';
import {check, request, PERMISSIONS, RESULTS, openSettings} from 'react-native-permissions';

// Local Components
import NavigationHeader from '~/Components/Presentational/NavigationHeader';

// route
import GETTreatmentSearch from '~/Routes/Search/GETTreatmentSearch';

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
padding-right: 16px;
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

const TreatmentAndDiseasesContainer = Styled.View`
`;

const TreatmentContainer = Styled.View`
`;

const DiseaseContainer = Styled.View`
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

const RecommendIconContainer = Styled.View`
padding-right: 32px;

justify-content: center;
`;

const RecommendIcon = Styled.Image`
width: ${wp('10.66%')}px;
height: ${wp('10.66%')}px;
`;

const RecommendItemContainer = Styled.View`
background-color: #ffffff;
padding-top: 16px;
padding-bottom: 16px;
padding-left: 16px;
padding-right: 0px;
flex-direction: row;
justify-content: space-between;
`;

const RecommendLeftContainer = Styled.View`
flex-direction: column;
`;

const BraceStepButtonContainer = Styled.View`
flex-direction: row;
flex: 1;
`;

const BraceStepButton = Styled.View`
padding-top: 4px;
padding-bottom: 4px;
flex: 1;
background-color: #FFFFFF;
border-radius: 14.5px;
border-width: 1px;
border-color: #E2E6ED;
align-items: center;
justify-content: center;
`;

const BraceStepText = Styled.Text`
font-weight: 400;
font-size: 14px;
line-height: 24px;
color: #131F3C;
`;

const SubLabelText = Styled.Text`
color: #9AA2A9;
font-weight: 400;
font-size: 11px;
line-height: 16px;
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
  const [diseaseArray, setDiseaseArray] = useState<Array<any>>([]);
  const [ratingObj, setRatingObj] = useState<RatingObj>({
    serviceRating: null,
    treatmentRating: null,
    priceRating: null,
  });

  const [displayPrice, setDisplayPrice] = useState<any>('');

  const [isActivatedNext, setIsActivatedNext] = useState<boolean>(false);
  const [isVisibleDatePicker, setIsVisibleDatePicker] = useState<boolean>(false);
  const [isVisibleBraceStartDatePicker, setIsVisibleBraceStartDatePicker] = useState<boolean>(false);
  const [isVisibleBraceFinishDatePicker, setIsVisibleBraceFinishDatePicker] = useState<boolean>(false);
  const [isFocusedTotalPriceInput, setIsFocusedTotalPriceInput] = useState<boolean>(false);

  const [selectedTreatmentYear, setSelectedTreatmentYear] = useState<any>(`${new Date().getFullYear()}`);
  const [selectedTreatmentMonth, setSelectedTreatmentMonth] = useState<any>(`${new Date().getMonth() + 1}`);
  const [selectedTreatmentDay, setSelectedTreatmentDay] = useState<any>(`${new Date().getDate()}`);

  const [isBraceFinished, setIsBraceFinished] = useState<boolean>(false);

  const [braceStartDateObj, setBraceStartDateObj] = useState<any>({
    display: "",
    value: "",
  });
  const [selectedBraceStartDateYear, setSelectedBraceStartDateYear] = useState<any>(`${new Date().getFullYear()}`);
  const [selectedBraceStartDateMonth, setSelectedBraceStartDateMonth] = useState<any>(`${new Date().getMonth() + 1}`);
  const [selectedBraceStartDateDay, setSelectedBraceStartDateDay] = useState<any>(`${new Date().getDate()}`);


  const [braceFinishDateObj, setBraceFinishDateObj] = useState<any>({
    display: "",
    value: "",
  });
  const [selectedBraceFinishDateYear, setSelectedBraceFinishDateYear] = useState<any>(`${new Date().getFullYear()}`);
  const [selectedBraceFinishDateMonth, setSelectedBraceFinishDateMonth] = useState<any>(`${new Date().getMonth() + 1}`);
  const [selectedBraceFinishDateDay, setSelectedBraceFinishDateDay] = useState<any>(`${new Date().getDate()}`);

  const [selectedProofImage, setSelectedProofImage] = useState<Object>({});
  const [selectedDentalImages, setSelectedDentalImages] = useState<Array<any>>([]);

  const [loadingTakingPicture, setLoadingTakingPicture] = useState<boolean>(false);

  const [braceElapsedDateObj, setBraceElapsedDateObj] = useState<any>({
    displayBraceElapsedDate: '',
    braceElapsedDate: '',
  })

  const [isDentalRecommend, setIsDentalRecommend] = useState<boolean>(false);

  const actionSheetItemList = ['취소', '촬영', '앨범'];

  const scrollY = useRef<number>(0);
  const scrollViewRef = useRef<any>();
  const totalPriceViewRef = useRef<any>();

  const actionSheetRefByProof = useRef() as any;
  const actionSheetRefByDental = useRef() as any;

  const modalContentY = useRef(new Animated.Value(hp('50%'))).current;
  const braceStartDatePickerY = useRef(new Animated.Value(hp('50%'))).current;
  const braceFinishDatePickerY = useRef(new Animated.Value(hp('50%'))).current;

  const allTreatmentAndDiseasesArray = useRef<any>([""]).current;
  
  console.log("ReviewMetaDataScreen route.params?", route);

  useEffect(() => {
    GETTreatmentSearch("")
    .then(function (response: any) {
      console.log("BraceReviewMetaDataScreen GETTreatmentSearch response", response);
      allTreatmentAndDiseasesArray.current = response;
    })
    .catch(function (error: any) {
      console.log("GETTreatmentSearch error", error); 
    })

  }, [])
  
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

      const tmpTreatmentArray = route.params?.selectedTreatmentArray.filter((item: any) => item.category === "treatment");

      const tmpDiseaseArray = route.params?.selectedTreatmentArray.filter((item: any) => item.category === "disease");

      setTreatmentArray(tmpTreatmentArray);
      setDiseaseArray(tmpDiseaseArray);

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
    if(route.params?.bracePeriodObj) {
      console.log("route.params?.bracePeriodObj", route.params?.bracePeriodObj);

      const tmpBraceStartDate = new Date(route.params.bracePeriodObj.startDate);

      const tmpBraceStartYear = tmpBraceStartDate.getFullYear();
      const tmpBraceStartMonth = (tmpBraceStartDate.getMonth() + 1);
      const tmpBraceStartDay = tmpBraceStartDate.getDate();


      const tmpMonth = tmpBraceStartMonth < 10 ? '0' + tmpBraceStartMonth : tmpBraceStartMonth;
      const tmpDay = tmpBraceStartDay < 10 ? '0' + tmpBraceStartDay : tmpBraceStartDay;

      const tmpBraceStartDateObj = {
        display: tmpBraceStartYear + '.' + tmpMonth + "." + tmpDay,
        value: tmpBraceStartDate
      }

      setBraceStartDateObj(tmpBraceStartDateObj)

      if(route.params?.isBraceFinished) {
        const tmpBraceFinishDate = new Date(route.params.bracePeriodObj.finishDate);

        const tmpBraceFinishYear = tmpBraceFinishDate.getFullYear();
        const tmpBraceFinishMonth = (tmpBraceFinishDate.getMonth() + 1);
        const tmpBraceFinishDay = tmpBraceFinishDate.getDate();


      const tmpMonth = tmpBraceFinishMonth < 10 ? '0' + tmpBraceFinishMonth : tmpBraceFinishMonth;
      const tmpDay = tmpBraceFinishDay < 10 ? '0' + tmpBraceFinishDay : tmpBraceFinishDay;

        const tmpBraceFinishDateObj = {
          display: tmpBraceFinishYear + '.' + tmpMonth + "." + tmpDay,
          value: tmpBraceFinishDate
        }

        setBraceFinishDateObj(tmpBraceFinishDateObj)
      }
    }
  }, [route.params?.bracePeriodObj])

  useEffect(() => {
    console.log("route.params?.isBraceFinished", route.params?.isBraceFinished);
    setIsBraceFinished(route.params?.isBraceFinished)
  }, [route.params?.isBraceFinished])

  useEffect(() => {
    if(route.params?.isDentalRecommend == true) {
      setIsDentalRecommend(true)
    } else if(route.params?.isDentalRecommend == false) {
      setIsDentalRecommend(false)
    }
  }, [route.params?.isDentalRecommend])
  
  

  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', _keyboardWillShow);
    Keyboard.addListener("keyboardWillHide", _keyboardWillHide);

    // cleanup function
    return () => {
      Keyboard.removeListener("keyboardWillHide", _keyboardWillHide);
    };
  }, []);

  useEffect(() => {
    if(dentalObj.originalName && braceStartDateObj.display !== '' && braceStartDateObj.value !== '' && treatmentArray.length > 0) {
      if(isBraceFinished) {
        if(braceFinishDateObj.display !== '' && braceFinishDateObj.value !== '') {
          setIsActivatedNext(true)
        } else {
          setIsActivatedNext(false)
        } 
      } else {
        setIsActivatedNext(true)
      }
    } else {
      setIsActivatedNext(false);
    }
  }, [dentalObj, treatmentArray, braceStartDateObj, braceFinishDateObj, isBraceFinished])

  useEffect(() => {
    if(route.params?.totalPriceObj) {
      console.log("route.params?.totalPriceObj", route.params?.totalPriceObj);
      if(route.params?.totalPriceObj.treatPrice == 0) {
        setDisplayPrice('');
        setTotalPrice('');
      } else {
        setDisplayPrice(route.params?.totalPriceObj.displayTreatPrice);
        setTotalPrice(route.params?.totalPriceObj.treatPrice);
      }
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
    const tmpTreatmentArray = treatmentArray.slice();
    const tmpDiseaseArray = diseaseArray.slice();
    const tmpSelectedTreatmentArray = tmpTreatmentArray.concat(tmpDiseaseArray);

    navigation.navigate('TreatSearchScreen', {
      selectedTreatmentArray: tmpSelectedTreatmentArray,
      allTreatmentAndDiseasesArray: allTreatmentAndDiseasesArray.current,
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

  const onPressBraceElapsedDate = () => {
    setIsVisibleBraceElapsedDatePicker(true);
    priceInputRef.current.blur();
    Animated.spring(braceElapsedDatePickerY, {
      toValue: 0,
      friction: 17,
      tension: 68,
      useNativeDriver: true,
    }).start();
  }


  const onPressBraceStartDate = () => {
    setIsVisibleBraceStartDatePicker(true);
    priceInputRef.current.blur();
    Animated.spring(braceStartDatePickerY, {
      toValue: 0,
      friction: 17,
      tension: 68,
      useNativeDriver: true,
    }).start();
  }


  const onPressBraceFinishDate = () => {
    setIsVisibleBraceFinishDatePicker(true);
    priceInputRef.current.blur();
    Animated.spring(braceFinishDatePickerY, {
      toValue: 0,
      friction: 17,
      tension: 68,
      useNativeDriver: true,
    }).start();
  }



  const onPressTotalPrice = () => {

    console.log("onPressTotalPrice scrollY.current", scrollY.current);
    
    if (priceInputRef.current.isFocused()) priceInputRef.current.blur();
    else priceInputRef.current.focus();

    // if(treatmentArray.length === 0) {
    //   if(scrollY.current < hp('6%')) {
    //     scrollViewRef.current.scrollTo({y: hp('25%')})
    //   }
    // } else if(treatmentArray.length > 0) {
    //   if(scrollY.current < hp('8.5%')) {
    //     scrollViewRef.current.scrollTo({y: hp('12%')})
    //   }
    // } else if(treatmentArray.length === 0) {
    //   if(scrollY.current < hp('6.5%')) {
    //     scrollViewRef.current.scrollTo({y: hp('10%')})
    //   }
    // } else if(treatmentArray.length > 0) {
    //   if(scrollY.current < hp('10%')) {
    //     scrollViewRef.current.scrollTo({y: hp('13.5%')})
    //   }
    // }
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
    if(selectedProofImage.uri && !totalPrice) {
      Alert.alert("영수증 인증을 받기위해선 치료 비용정보를 입력하셔야 됩니다!")
    } else {
      console.log("route.params?.paragraphArray", route.params?.paragraphArray);
      navigation.navigate('BraceReviewContentPostScreen', {
        dentalObj,
        treatmentArray,
        diseaseArray,
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
        isDentalRecommend: isDentalRecommend,
        braceStartDate: braceStartDateObj.value,
        braceFinishDate: braceFinishDateObj.value,
      })
    }
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

  const onPressRecommendDental = () => {
    setIsDentalRecommend(!isDentalRecommend);
  }

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

  const cancelBraceStartDateModal = useCallback(() => {
    Animated.timing(braceStartDatePickerY, {
      toValue: hp('50%'),
      duration: 250,
      useNativeDriver: true,
    }).start(() => setIsVisibleBraceStartDatePicker(false));
  }, []);

  const cancelBraceFinishDateModal = useCallback(() => {
    Animated.timing(braceFinishDatePickerY, {
      toValue: hp('50%'),
      duration: 250,
      useNativeDriver: true,
    }).start(() => setIsVisibleBraceFinishDatePicker(false));
  }, [])


  const deleteTreatItem = (treat: object) => {
    var tmpTreatmentArray = treatmentArray.slice();
    var deleteIndex = tmpTreatmentArray.indexOf(treat);

    tmpTreatmentArray.splice(deleteIndex, 1);
    setTreatmentArray(tmpTreatmentArray);
  };


  const deleteDiseaseItem = (disease: object) => {
    var tmpDiseaseArray = diseaseArray.slice();
    var deleteIndex = tmpDiseaseArray.indexOf(disease);

    tmpDiseaseArray.splice(deleteIndex, 1);
    setDiseaseArray(tmpDiseaseArray);
  };

  const initializeBraceStartDate = () => {
    setIsVisibleBraceStartDatePicker(false);
    setBraceStartDateObj({
      display: '',
      value: ''
    });
  }

  const initializeBraceFinishDate = () => {
    setIsVisibleBraceFinishDatePicker(false);
    setBraceFinishDateObj({
      display: '',
      value: '',
    });
  }

  const registerBraceStartDate = () => {

    const tmpMonth = selectedBraceStartDateMonth < 10 ? '0' + selectedBraceStartDateMonth : selectedBraceStartDateMonth;
    const tmpDay = selectedBraceStartDateDay < 10 ? '0' + selectedBraceStartDateDay : selectedBraceStartDateDay;

    const tmpBraceStartDate = {
      display: selectedBraceStartDateYear + '.' + tmpMonth + '.' + tmpDay,
      value: new Date(selectedBraceStartDateYear, selectedBraceStartDateMonth - 1, Number(selectedBraceStartDateDay)),
    }

    console.log("tmpBraceStartDate", tmpBraceStartDate)

    setBraceStartDateObj(tmpBraceStartDate);
    cancelBraceStartDateModal()
  };

  const registerBraceFinishDate = () => {

    const tmpMonth = selectedBraceFinishDateMonth < 10 ? '0' + selectedBraceFinishDateMonth : selectedBraceFinishDateMonth;
    const tmpDay = selectedBraceFinishDateDay < 10 ? '0' + selectedBraceFinishDateDay : selectedBraceFinishDateDay;

    const tmpBraceFinishDate = {
      display: selectedBraceFinishDateYear + '.' + tmpMonth + '.' + tmpDay,
      value: new Date(selectedBraceFinishDateYear, selectedBraceFinishDateMonth - 1, Number(selectedBraceFinishDateDay)),
    }

    setBraceFinishDateObj(tmpBraceFinishDate);
    cancelBraceFinishDateModal();
  }



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

  const changeBraceStep = (isFinished: boolean) => {

    if(isFinished === false) {
      setBraceFinishDateObj({
        display: '',
        value: ''
      });
    }

    if(isBraceFinished !== isFinished) {
      setIsBraceFinished(isFinished);
    }

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


  const onValueChangeStartYearPicker = (yearValue: number) => {
    setSelectedBraceStartDateYear(yearValue);

    const currentDate = new Date(Date.now());
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();

    if(yearValue == currentYear) {
      if(selectedBraceStartDateMonth > currentMonth) {
        setSelectedBraceStartDateMonth(1);
      }

      if(selectedBraceStartDateDay > currentDay) {
        setSelectedBraceStartDateDay(1);
      }
    }
  }

  const onValueChangeStartMonthPicker = (monthValue: number) => {
    setSelectedBraceStartDateMonth(monthValue);

    const currentDate = new Date(Date.now());
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();

    console.log("currentMonth", currentMonth);
    console.log("monthValue", monthValue);

    if(monthValue == currentMonth && selectedBraceStartDateYear == currentYear) {
      console.log("currentDay", currentDay);
      if(selectedBraceStartDateDay > currentDay) {
        setSelectedBraceStartDateDay(1);
      }
    }

  }

  const onValueChangeStartDayPicker = (dayValue: number) => {
    setSelectedBraceStartDateDay(dayValue);
  }


  const onValueChangeFinishYearPicker = (yearValue: number) => {
    setSelectedBraceFinishDateYear(yearValue);

    const currentDate = new Date(Date.now());
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();

    if(yearValue == currentYear) {
      if(selectedBraceFinishDateMonth > currentMonth) {
        setSelectedBraceFinishDateMonth(1);
      }

      if(selectedBraceFinishDateDay > currentDay) {
        setSelectedBraceFinishDateDay(1);
      }
    }
  }

  const onValueChangeFinishMonthPicker = (monthValue: number) => {
    setSelectedBraceFinishDateMonth(monthValue);

    const currentDate = new Date(Date.now());
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();

    console.log("currentMonth", currentMonth);
    console.log("monthValue", monthValue);

    if(monthValue == currentMonth && selectedBraceFinishDateYear == currentYear) {
      console.log("currentDay", currentDay);
      if(selectedBraceFinishDateDay > currentDay) {
        setSelectedBraceFinishDateDay(1);
      }
    }

  }

  const onValueChangeFinishDayPicker = (dayValue: number) => {
    setSelectedBraceFinishDateDay(dayValue);
  }


  const renderBraceStartYearPickerItem = useCallback(() => {
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

  const renderBraceFinishYearPickerItem = useCallback(() => {
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

  const renderBraceStartMonthPickerItem = useCallback(() => {
    const currentDate = new Date(Date.now());
    const result = [];
    if (parseInt(selectedBraceStartDateYear) === currentDate.getFullYear()) {
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
  }, [selectedBraceStartDateYear]);

  const renderBraceFinishMonthPickerItem = useCallback(() => {
    const currentDate = new Date(Date.now());
    const result = [];
    if (parseInt(selectedBraceFinishDateYear) === currentDate.getFullYear()) {
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
  }, [selectedBraceFinishDateYear]);

  const renderBraceStartDayPickerItem = useCallback(() => {
    const currentDate = new Date(Date.now());
    const result = [];
    if (
      parseInt(selectedBraceStartDateYear) === currentDate.getFullYear() &&
      parseInt(selectedBraceStartDateMonth) === currentDate.getMonth() + 1
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
      if (selectedBraceStartDateMonth === '2') {
        if (
          (parseInt(selectedBraceStartDateYear) % 4) +
            (parseInt(selectedBraceStartDateYear) % 100) +
            (parseInt(selectedBraceStartDateYear) % 400) ===
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
        [1, 3, 5, 7, 8, 10, 12].includes(parseInt(selectedBraceStartDateMonth))
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
  }, [selectedBraceStartDateYear, selectedBraceStartDateMonth]);


  const renderBraceFinishDayPickerItem = useCallback(() => {
    const currentDate = new Date(Date.now());
    const result = [];
    if (
      parseInt(selectedBraceFinishDateYear) === currentDate.getFullYear() &&
      parseInt(selectedBraceFinishDateMonth) === currentDate.getMonth() + 1
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
      if (selectedBraceFinishDateMonth === '2') {
        if (
          (parseInt(selectedBraceFinishDateYear) % 4) +
            (parseInt(selectedBraceFinishDateYear) % 100) +
            (parseInt(selectedBraceFinishDateYear) % 400) ===
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
        [1, 3, 5, 7, 8, 10, 12].includes(parseInt(selectedBraceFinishDateMonth))
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
  }, [selectedBraceFinishDateYear, selectedBraceFinishDateMonth]);

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
          console.log("onScroll event.nativeEvent.contentOffset.y", event.nativeEvent.contentOffset.y);
          scrollY.current = event.nativeEvent.contentOffset.y
        }}
        scrollEventThrottle={16}>
          <TouchableWithoutFeedback onPress={() => onPressBackground()}>
          <ScrollViewInnerContainer>
            <TouchableWithoutFeedback onPress={() => moveToProofImageEvent()}>
            <EventBannerImageContainer>
              <EventBannerImage
              source={require('~/Assets/Images/Banner/review_starbucks_spring.png')}/>
            </EventBannerImageContainer>
            </TouchableWithoutFeedback>
          <MetaDataItemContainer
          style={{marginTop: 0}}>
          <MetaDataHeaderContainer>
            <MetaDataLabelContainer>
              <MetaDataLabelText>{"진료인증 자료 첨부하기"}</MetaDataLabelText>
            </MetaDataLabelContainer>
            {/* <RightArrowIconContainer>
              <MetaDataLabelText>{"가이드라인"}</MetaDataLabelText>
              <RightArrowIcon
              source={require('~/Assets/Images/Upload/ic_rightArrow.png')}/>
            </RightArrowIconContainer> */}
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
            {!dentalObj?.originalName && (
              <MetaDataPlaceholderText>{"방문한 병원의 이름을 선택하세요."}</MetaDataPlaceholderText>
            )}
            {dentalObj?.originalName && (
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
            {(treatmentArray.length === 0 && diseaseArray.length === 0) && (
              <MetaDataPlaceholderText>{"질병 및 치료 항목을 선택하세요."}</MetaDataPlaceholderText>
            )}
            <TreatmentAndDiseasesContainer>
            {(diseaseArray.length > 0) && (
            <DiseaseContainer>
            <SubLabelText>{"질병 항목"}</SubLabelText>
            <SelectedTreatContainer>
            {diseaseArray.map((item: any, index: number) => {
              return (
                <SelectedTreatItemBackground 
                key={index}
                style={{marginRight: 8, backgroundColor: "#F5F7F9"}}>
                  <SelectedTreatItemText>
                    {'# ' + item.name}
                  </SelectedTreatItemText>
                  <TouchableWithoutFeedback onPress={() => deleteDiseaseItem(item)}>
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
          </DiseaseContainer>
          )}
          {(treatmentArray.length > 0) && (
            <TreatmentContainer>
            <SubLabelText>{"치료 항목"}</SubLabelText>
            <SelectedTreatContainer>
            {treatmentArray.map((item: any, index: number) => {
              return (
                <SelectedTreatItemBackground 
                key={index}
                style={{marginRight: 8}}>
                  <SelectedTreatItemText>
                    {'# ' + item.name}
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
          </TreatmentContainer>
          )}
          </TreatmentAndDiseasesContainer>
            </MetaDataValueContainer>
          </MetaDataItemContainer>
          </TouchableWithoutFeedback>
          <MetaDataItemContainer
          onLayout={(event) => {
            console.log("전체치료비용 onLayout event.nativeEvent", event.nativeEvent);
          }}>
          <MetaDataHeaderContainer>
          <MetaDataLabelText>{"전체 치료 비용"}</MetaDataLabelText>
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
              {displayPrice !== '' && (
              <DisplayPriceContainer>
                <DisplayPriceText>{displayPrice}</DisplayPriceText>
              </DisplayPriceContainer>
              )}
            </MetaDataValueContainer>
          </TouchableWithoutFeedback>
          </MetaDataItemContainer>
          <MetaDataItemContainer
          style={{marginTop: 8}}>
          <MetaDataHeaderContainer>
          <MetaDataLabelContainer>
            <MetaDataLabelText>{"교정 진행 여부"}</MetaDataLabelText>
            <AsteriskText>{"*"}</AsteriskText>
          </MetaDataLabelContainer>
          </MetaDataHeaderContainer>
            <MetaDataValueContainer>
            <BraceStepButtonContainer>
            <TouchableWithoutFeedback onPress={() => changeBraceStep(false)}>
            <BraceStepButton
            style={!isBraceFinished && {backgroundColor: "#00D1FF", borderColor: "#00D1FF"}}>
            <BraceStepText
            style={!isBraceFinished && {color: "#FFFFFF", fontWeight: '700'}}>{"진행중"}</BraceStepText>
            </BraceStepButton>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => changeBraceStep(true)}>
            <BraceStepButton
            style={[{marginLeft: 7}, isBraceFinished && {backgroundColor: "#00D1FF", borderColor: "#00D1FF"}]}>
            <BraceStepText
            style={isBraceFinished && {color: "#FFFFFF", fontWeight: '700'}}>{"완료"}</BraceStepText>
            </BraceStepButton>
            </TouchableWithoutFeedback>
            </BraceStepButtonContainer>
            </MetaDataValueContainer>
          </MetaDataItemContainer>
          <MetaDataItemContainer>
          <MetaDataHeaderContainer>
          <MetaDataLabelContainer>
            <MetaDataLabelText>{"교정 시작 날짜"}</MetaDataLabelText>
            <AsteriskText>{"*"}</AsteriskText>
          </MetaDataLabelContainer>
          </MetaDataHeaderContainer>
          <TouchableWithoutFeedback onPress={() => onPressBraceStartDate()}>
            <MetaDataValueContainer>
            {braceStartDateObj.display === "" && (
            <MetaDataPlaceholderText>{"교정 시작 날짜를 알려주세요."}</MetaDataPlaceholderText>
            )}
            {braceStartDateObj.display !== "" && (
            <MetaDataText>{braceStartDateObj.display}</MetaDataText>
            )}
            </MetaDataValueContainer>
          </TouchableWithoutFeedback>
          </MetaDataItemContainer>
          {isBraceFinished && (
          <MetaDataItemContainer>
          <MetaDataHeaderContainer>
          <MetaDataLabelContainer>
            <MetaDataLabelText>{"교정 종료 날짜"}</MetaDataLabelText>
            <AsteriskText>{"*"}</AsteriskText>
          </MetaDataLabelContainer>
          </MetaDataHeaderContainer>
          <TouchableWithoutFeedback onPress={() => onPressBraceFinishDate()}>
            <MetaDataValueContainer>
            {braceFinishDateObj.display === "" && (
            <MetaDataPlaceholderText>{"교정 종료 날짜를 알려주세요."}</MetaDataPlaceholderText>
            )}
            {braceFinishDateObj.display !== "" && (
            <MetaDataText>{braceFinishDateObj.display}</MetaDataText>
            )}
            </MetaDataValueContainer>
          </TouchableWithoutFeedback>
          </MetaDataItemContainer>
          )}
          <RecommendItemContainer
          style={{marginTop: 8}}>
            <RecommendLeftContainer>
          <MetaDataHeaderContainer>
            <MetaDataLabelText>{"병원 추천여부"}</MetaDataLabelText>
          </MetaDataHeaderContainer>
          <MetaDataValueContainer
          style={{borderBottomWidth: 0}}>
            <MetaDataPlaceholderText>{"이 병원을 추천해주세요."}</MetaDataPlaceholderText>
          </MetaDataValueContainer>
          </RecommendLeftContainer>
          <TouchableWithoutFeedback onPress={() => onPressRecommendDental()}>
          <RecommendIconContainer>
            <RecommendIcon
            source={
              isDentalRecommend 
              ? require('~/Assets/Images/Upload/ic_recommend_selected.png')
              : require('~/Assets/Images/Upload/ic_recommend_unselected.png')}/>
          </RecommendIconContainer>
          </TouchableWithoutFeedback>
          </RecommendItemContainer>
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
        visible={isVisibleBraceStartDatePicker}
        transparent={true}
        animationType="none">
          <TouchableWithoutFeedback onPress={() => cancelBraceStartDateModal()}>
            <TreatmentDateModalBackground
            as={Animated.View}
            style={{
              opacity: braceStartDatePickerY.interpolate({
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
          transform: [{translateY: braceStartDatePickerY}]
        }}>
            <DetailFilterHeaderContainer>
              <DetailFilterTitleText>{'교정 시작 날짜 설정'}</DetailFilterTitleText>
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
                onValueChange={(itemValue: any) => onValueChangeStartYearPicker(itemValue)}
                selectedValue={selectedBraceStartDateYear}>
                {renderBraceStartYearPickerItem()}
              </Picker>
              <FilterDividingText>{'년'}</FilterDividingText>
              <Picker
                itemStyle={{
                  fontSize: 20,
                  fontWeight: '700',
                  lineHeight: 24,
                  color: '#131F3C',
                }}
                selectedValue={selectedBraceStartDateMonth}
                onValueChange={(itemValue: any) => onValueChangeStartMonthPicker(itemValue)}
                style={{width: wp('20%'), height: '100%'}}>
                {renderBraceStartMonthPickerItem()}
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
                onValueChange={(itemValue: any) => onValueChangeStartDayPicker(itemValue)}
                selectedValue={selectedBraceStartDateDay}>
                {renderBraceStartDayPickerItem()}
              </Picker>
              <FilterDividingText>{'일'}</FilterDividingText>
            </TimePickerContainer>
              <DetailFilterFooterContainer>
                <TouchableWithoutFeedback onPress={() => initializeBraceStartDate()}>
                <InitializeFilterContainer>
                  <InitializeFilterText>{"교정 시작 날짜 초기화"}</InitializeFilterText>
                  <InitializeFilterIcon
                  source={require('~/Assets/Images/Map/ic_initialize.png')}/>
                </InitializeFilterContainer>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => registerBraceStartDate()}>
                <RegisterFilterButton>
                  <RegisterFilterText>{"적용하기"}</RegisterFilterText>
                </RegisterFilterButton>
                </TouchableWithoutFeedback>
              </DetailFilterFooterContainer>
              </TimeFilterModalContainer>
          </TreatmentDateModalContainer>
        </TreatmentDateModal>
        <TreatmentDateModal
        visible={isVisibleBraceFinishDatePicker}
        transparent={true}
        animationType="none">
          <TouchableWithoutFeedback onPress={() => cancelBraceFinishDateModal()}>
            <TreatmentDateModalBackground
            as={Animated.View}
            style={{
              opacity: braceFinishDatePickerY.interpolate({
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
          transform: [{translateY: braceFinishDatePickerY}]
        }}>
            <DetailFilterHeaderContainer>
              <DetailFilterTitleText>{'교정 종료 날짜 설정'}</DetailFilterTitleText>
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
                onValueChange={(itemValue: any) => onValueChangeFinishYearPicker(itemValue)}
                selectedValue={selectedBraceFinishDateYear}>
                {renderBraceFinishYearPickerItem()}
              </Picker>
              <FilterDividingText>{'년'}</FilterDividingText>
              <Picker
                itemStyle={{
                  fontSize: 20,
                  fontWeight: '700',
                  lineHeight: 24,
                  color: '#131F3C',
                }}
                selectedValue={selectedBraceFinishDateMonth}
                onValueChange={(itemValue: any) => onValueChangeFinishMonthPicker(itemValue)}
                style={{width: wp('20%'), height: '100%'}}>
                {renderBraceFinishMonthPickerItem()}
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
                onValueChange={(itemValue: any) => onValueChangeFinishDayPicker(itemValue)}
                selectedValue={selectedBraceFinishDateDay}>
                {renderBraceFinishDayPickerItem()}
              </Picker>
              <FilterDividingText>{'일'}</FilterDividingText>
            </TimePickerContainer>
              <DetailFilterFooterContainer>
                <TouchableWithoutFeedback onPress={() => initializeBraceFinishDate()}>
                <InitializeFilterContainer>
                  <InitializeFilterText>{"교정 종료 날짜 초기화"}</InitializeFilterText>
                  <InitializeFilterIcon
                  source={require('~/Assets/Images/Map/ic_initialize.png')}/>
                </InitializeFilterContainer>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => registerBraceFinishDate()}>
                <RegisterFilterButton>
                  <RegisterFilterText>{"적용하기"}</RegisterFilterText>
                </RegisterFilterButton>
                </TouchableWithoutFeedback>
              </DetailFilterFooterContainer>
              </TimeFilterModalContainer>
          </TreatmentDateModalContainer>
        </TreatmentDateModal>
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


/*
<TreatmentDateModal
visible={isVisibleBraceElapsedDatePicker}
transparent={true}
animationType="none">
  <TouchableWithoutFeedback onPress={() => cancelBraceElapsedDateModal()}>
    <TreatmentDateModalBackground
    as={Animated.View}
    style={{
      opacity: braceElapsedDatePickerY.interpolate({
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
  transform: [{translateY: braceElapsedDatePickerY}]
}}>
    <DetailFilterHeaderContainer>
      <DetailFilterTitleText>{'교정 경과일 설정'}</DetailFilterTitleText>
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
*/



          {/* <TouchableWithoutFeedback onPress={() => moveToRatingScreen()}>
          <MetaDataItemContainer>
          <MetaDataHeaderContainer>
          <MetaDataLabelContainer>
          <MetaDataLabelText>{"병원 만족도"}</MetaDataLabelText>
          <AsteriskText>{"*"}</AsteriskText>
          </MetaDataLabelContainer>
          <RightArrowIconContainer>
            <RightArrowIcon
            source={require('~/Assets/Images/Arrow/ic_rightArrow.png')}/>
          </RightArrowIconContainer>
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
          </TouchableWithoutFeedback> */}
          {/* <MetaDataItemContainer>
          <MetaDataHeaderContainer>
          <MetaDataLabelContainer>
            <MetaDataLabelText>{"방문 일자ㄱ"}</MetaDataLabelText>
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
          </MetaDataItemContainer> */}