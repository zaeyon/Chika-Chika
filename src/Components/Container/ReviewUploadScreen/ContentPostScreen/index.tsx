import React, {useState, useEffect, useRef, createRef} from 'react';
import Styled from 'styled-components/native';
import SafeAreaView from 'react-native-safe-area-view';
import {
  TouchableWithoutFeedback,
  FlatList,
  ScrollView,
  Keyboard,
  StyleSheet,
  Alert,
  View,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {NavigationContainer} from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';
import {useSelector} from 'react-redux';
import ActionSheet from 'react-native-actionsheet';

import {uploadImageToS3} from '~/method/uploadImageToS3';

// route
import POSTReviewUpload from '~/Routes/Review/POSTReviewUpload';
import PUTReviewRevise from '~/Routes/Review/PUTReviewRevise';

const Container = Styled.View`
 flex: 1;
 background-color: #FFFFFF;
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
padding: 0px 16px 0px 15px;
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
font-weight: 700;
font-size: 18px;
color: #000000;
`;

const HeaderRightContainer = Styled.View`
height: ${wp('13.8%')}px;
padding: 0px 16px 0px 15px;
 align-items: center;
 justify-content: center;
 flex-direction: row;
`;

const HeaderEmptyContainer = Styled.View`
width: ${wp('6.4%')}px;
height: ${wp('6.4%')}px;
`;

const HeaderUploadText = Styled.Text`
font-weight: 400;
font-size: 18px;
color: #0075FF;
position: absolute;
right: 16px;
`;

const BodyContainer = Styled.View`
flex: 1;
`;

const TakePhotoText = Styled.Text`
`;

const GalleryText = Styled.Text`
margin-top: 30px;
`;

const MetaInfoContainer = Styled.View`
padding-top: 16px;
padding-bottom: 16px;
`;

const FirstMetaDataListContainer = Styled.View`
flex-direction: row;
align-items: center;
`;

const SecondMetaDataListContainer = Styled.View`
flex-direction: row;
align-items: center;
`;

const ContentContainer = Styled.View`
flex: 1;
background-color: #fbfbfb;
padding-top: 0px;
padding-bottom: 0px;
`;

const MetaInfoItemBackground = Styled.View`
min-width: ${wp('15%')}px;
height: ${hp('3.5%')}px;
padding-left: 16px;
padding-right: 16px;
align-items: center;
background-color: #F0F6FC;
border-radius: 100px;
flex-direction: row;
align-items: center;
justify-content: center;
`;

const MetaInfoItemTextList = Styled.Text`
flex-direction: row;
`;

const MetaInfoItemText = Styled.Text`
font-weight: 300
color: #0075FF;
font-size: 16px;
`;

const RatingStarIcon = Styled.Image`
width: ${wp('3.266%')}px;
height: ${wp('3.266%')}px;
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

const TotalPriceInput = Styled.TextInput`
font-size: 16px;
color: #F0F6FC;
font-weight: 300;
`;

const TotalPriceContainer = Styled.View`
min-width: ${wp('15%')}px;
position: absolute;
align-items: center;
justify-content: center;
`;

const ParaUnitContainer = Styled.View`
width: ${wp('91.4666%')}px;
background-color: #ffffff;
border-width: 1px;
border-color: #f1f1f1;
border-radius: 8px;
padding: 16px;
align-items: center;
justify-content: center;
`;

const EntireParaUnitContainer = Styled.View`
width: ${wp('100%')}px;
padding-top: 10px;
padding-bottom: 10px;
background-color: #fbfbfb;;
align-items: center;
justify-content: center;
`;

const AddImageContainer = Styled.View`
flex-direction: row;
align-items: center;
`;

const AddImageButton = Styled.View`
width: ${wp('82.933%')}px;
height: ${wp('17.06%')}px;
border-radius: 8px;
border-width: 1px;
border-color: #F1F1F1;
align-items: center;
justify-content: center;
`;

const AddImageIcon = Styled.Image`
width: ${wp('4.8%')}px;
height: ${wp('4.8%')}px;
`;

const AddImageText = Styled.Text`
margin-left: 6px;
font-weight: 300;
font-size: 14px;
color: #7A7A7A;
`;

const ParaTextInput = Styled.TextInput`
margin-top: 13px;
width: ${wp('82.933%')}px;
font-weight: 300;
font-size: 14px;
color: #2B2B2B;
`;

const AddNewParaUnitContainer = Styled.View`
position: absolute;

flex: 1;
`;

const AddNewParaUnitButton = Styled.Image`
width: ${wp('10.13%')}px;
height: ${wp('10.13%')}px;
`;

const ParaImage = Styled.Image`
width: ${wp('82.9%')}px;
height: ${wp('71.7%')}px;
border-radius: 8px;
`;

const IndicatorContainer = Styled.View`
position: absolute;
width: ${wp('100%')}px;
height: ${hp('100%')}px;
background-color: #00000030;
align-items: center;
justify-content: center;
`;

const ParaImageContainer = Styled.View`
`;

const SelectOrderContainer = Styled.View`
margin-top: 10px;
flex-direction: row;
align-items: center;

`;

const SelectOrderButton = Styled.View`
padding: 7px 9px 7px 9px;
background-color: #d1d1d1;
align-items: center;
justify-content: center;
border-radius: 100px;
`;

const SelectOrderText = Styled.Text`
font-size: 14px;
color: #ffffff;
font-weight: 300;
`;

interface Props {
  navigation: any;
  route: any;
}

var selectedParaIndex: number;

const ContentPostScreen = ({navigation, route}: Props) => {
  const [dentalClinic, setDentalClinic] = useState<object>({});
  const [treatDate, setTreatDate] = useState<object>({});
  const [treatPrice, setTreatPrice] = useState<object>({});
  const [detailPriceList, setDetailPriceList] = useState<Array<object>>([]);
  const [selectedTreatList, setSelectedTreatList] = useState<Array<object>>([]);
  const [rating, setRating] = useState<object>({});
  const [isDetailPrice, setIsDetailPrice] = useState<boolean>(false);

  const [displayTotalPrice, setDisplayTotalPrice] = useState<string>();
  const [totalPrice, setTotalPrice] = useState<any>();

  const [changeMetaInfo, setChangeMetaInfo] = useState<boolean>(false);
  const [visibleDatePicker, setVisibleDatePicker] = useState<boolean>(false);
  const [changeParagraphList, setChangeParagraphList] = useState<boolean>(
    false,
  );
  const [certifiedBill, setCertifiedBill] = useState<boolean>(false);
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);

  const totalPriceInputRef = useRef();
  const scrollViewRef = useRef<any>();
  let descripInputRef = useRef<any>();

  const [selectedImageList, setSelectedImageList] = useState<Array<any>>([]);

  const [paragraphList, setParagraphList] = useState<Array<object>>([
    {
      index: 1,
      image: null,
      description: null,
    },
  ]);

  const jwtToken = useSelector((state: any) => state.currentUser.jwtToken);
  let reviewId = route.params?.reviewId;

  const insertedImageActionSheetRef = createRef<any>();

  useEffect(() => {
    if (route.params.requestType === 'revise') {
      console.log(
        '리뷰 수정 요청 route.params.paragraphArray',
        route.params.paragraphArray,
      );
      const tmpParagraphArray = route.params.paragraphArray;
      setParagraphList(tmpParagraphArray);
      setTotalPrice(route.params?.totalPrice);
      reviewId = route.params?.reviewId;
    }
  }, []);

  useEffect(() => {
    if (route.params?.dentalClinic) {
      setDentalClinic(route.params?.dentalClinic);
    }
  }, [route.params?.dentalClinic]);

  useEffect(() => {
    if (route.params?.treatDate) {
      setTreatDate(route.params?.treatDate);
    }
  }, [route.params?.treatDate]);

  useEffect(() => {
    if (route.params?.treatPrice) {
      setTreatPrice(route.params?.treatPrice);
      setDisplayTotalPrice(route.params?.treatPrice.displayTreatPrice);
      setTotalPrice(route.params?.treatPrice.treatPrice);
    }
  }, [route.params?.treatPrice]);

  useEffect(() => {
    if (route.params?.selectedTreatList) {
      console.log(
        'route.params.selectedTreatList',
        route.params.selectedTreatList,
      );
      console.log('route.params.detailPriceList', route.params.detailPriceList);
      setSelectedTreatList(route.params?.selectedTreatList);
    }
  }, [route.params?.selectedTreatList]);

  useEffect(() => {
    if (route.params?.rating) {
      console.log('route.params.rating', route.params?.rating);
      setRating(route.params?.rating);
    }
  }, [route.params?.rating]);

  useEffect(() => {
    if (route.params?.isDetailPrice) {
      console.log('route.params.isDetailPrice', route.params?.isDetailPrice);
      setIsDetailPrice(route.params.isDetailPrice);
    }
  }, [route.params?.isDetailPrice]);

  useEffect(() => {
    if (route.params?.detailPriceList) {
      console.log('route.params.detailPriceList', route.params.detailPriceList);
      setDetailPriceList(route.params.detailPriceList);
    }
  }, [route.params?.detailPriceList]);

  useEffect(() => {
    if (route.params?.selectedImages) {
      console.log(
        '리뷰 업로드 route.params.selectedImages',
        route.params.selectedImages,
      );

      route.params.selectedImages.forEach((item: any, index: number) => {
        console.log('선택된 사진 item', item);

        var tmpParagraphList = paragraphList;
        var tmpSelectedImageList = selectedImageList;
        var paraObj: any;

        if (index == 0) {
          paraObj = tmpParagraphList[route.params?.startIndex];
          paraObj.image = item;
          (paraObj.order = 'before'),
            (tmpParagraphList[route.params?.startIndex] = paraObj);
          setChangeParagraphList(!changeParagraphList);
        } else {
          paraObj = {
            index: paragraphList.length + index,
            image: item,
            description: '',
            order: 'before',
          };

          tmpParagraphList.push(paraObj);
        }

        if (index == route.params.selectedImages.length - 1) {
          setParagraphList(tmpParagraphList);
        }
      });
    }
  }, [route.params?.selectedImages]);

  useEffect(() => {
    if (route.params?.changeExistingImage) {
      let tmpParagraphList = paragraphList;

      const paraObj = {
        index: selectedParaIndex,
        image: route.params.selectedImage,
        description: paragraphList[selectedParaIndex].description,
        order: paragraphList[selectedParaIndex].order,
      };

      tmpParagraphList[selectedParaIndex] = paraObj;

      setParagraphList(tmpParagraphList);
      setChangeParagraphList(!changeParagraphList);
      route.params.changeExistingImage = false;
    }
  }, [route.params?.changeExistingImage]);

  const openCamera = () => {
    navigation.navigate('Camera');
  };

  const moveToGallery = () => {
    navigation.navigate('Gallery');
  };

  const moveToDentalClinicSearch = () => {
    navigation.push('DentalNameSearchScreen', {
      requestPage: 'content',
      requestType: route.params?.requestType,
    });
  };

  const onPressTreatDate = () => {
    setVisibleDatePicker(true);
  };

  const onChangeDatePicker = (event: any, date: any) => {
    var tmpTreatDate = treatDate;
    tmpTreatDate.treatDate = date;
    setTreatDate(tmpTreatDate);
  };

  const applyTreatDate = () => {
    console.log('applyTreatDate date', treatDate);
    var tmpTreatDate: any = treatDate;
    tmpTreatDate.dateValue = treatDate.treatDate;
    tmpTreatDate.displayTreatDate = convertDisplayDate(treatDate.treatDate);
    tmpTreatDate.treatDate = convertSubmitDate(treatDate.treatDate);

    setTreatDate(tmpTreatDate);
    setVisibleDatePicker(false);
  };

  const convertDisplayDate = (date: any) => {
    var tmpDate = new Date(date),
      month = '' + (tmpDate.getMonth() + 1),
      day = '' + tmpDate.getDate(),
      year = '' + tmpDate.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

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

  const onPressTreatPrice = () => {
    totalPriceInputRef.current.focus();
  };

  const onChangePriceInput = (text: string) => {
    console.log('text', text);
    console.log('treatPrice', treatPrice);

    if (text.trim() === '') {
      setTotalPrice('');
      setDisplayTotalPrice('');
    } else {
      setTotalPrice(text);
      setDisplayTotalPrice(Number(text).toLocaleString() + '원');
    }
  };

  const moveToTreatSearch = () => {
    navigation.push('TreatSearchScreen', {
      requestPage: 'content',
      selectedTreatList: selectedTreatList,
      requestType: route.params?.requestType,
    });
  };

  const moveToDetailPrice = () => {
    navigation.push('DetailPriceScreen', {
      requestPage: 'content',
      selectedTreatList: selectedTreatList,
      treatPrice: treatPrice,
      requestType: route.params?.requestType,
    });
  };

  const moveToRating = () => {
    navigation.push('RatingScreen', {
      requestPage: 'content',
      inputedRating: rating,
      requestType: route.params?.requestType,
    });
  };

  const onPressBackground = () => {
    Keyboard.dismiss();
  };

  const onPressAddImage = (index: number) => {
    navigation.navigate('ImageSelectScreen', {
      requestType: 'ContentPostScreen',
      startIndex: index,
      selectedImages: [],
    });
  };

  const onPressAddPara = () => {
    var tmpParagraphList = paragraphList;
    var paraObj = {
      index: tmpParagraphList.length,
      image: null,
      description: null,
    };

    tmpParagraphList.push(paraObj);
    setParagraphList(tmpParagraphList);
    setChangeParagraphList(!changeParagraphList);
  };

  const onSubmitParaDescripInput = (
    text: string,
    index: number,
    type: string,
  ) => {
    console.log('submitParaDescrip type', type);
    console.log('inputParaDescrip text', text);

    var tmpParagraphList = paragraphList;
    tmpParagraphList[index].description = text;

    setParagraphList(tmpParagraphList);
    setChangeParagraphList(!changeParagraphList);
  };

  const onChangeParaDescripInput = (text: string, index: number) => {
    var tmpParagraphList = paragraphList;
    tmpParagraphList[index].description = text;

    setParagraphList(tmpParagraphList);
    setChangeParagraphList(!changeParagraphList);
  };

  const changeImageOrder = (order: string, index: number) => {
    console.log('changeImageOrder index', index);

    var tmpParagraphList = paragraphList;
    tmpParagraphList[index].order = order;

    setParagraphList(tmpParagraphList);
    setChangeParagraphList(!changeParagraphList);
  };

  const clickUpload = () => {
    if (route.params.requestType === 'post') {
      uploadReview();
    } else if (route.params.requestType === 'revise') {
      reviseReview();
    }
  };

  const goBack = () => {
    if (route.params?.requestType === 'post') {
      Alert.alert('게시글 작성을 취소하시겠어요?', '', [
        {
          text: '확인',
          onPress: () => {
            navigation.navigate('HomeScreen');
          },
        },
        {
          text: '취소',
          onPress: () => 0,
          style: 'cancel',
        },
      ]);
    } else if (route.params?.requestType === 'revise') {
      Keyboard.dismiss();

      setTimeout(() => {
        navigation.navigate('ReviewDetailScreen', {
          isCancelRevise: true,
        });
      }, 10);
    }
  };

  const uploadReview = async () => {
    Keyboard.dismiss();
    setUploadLoading(true);
    console.log('dentalClinicId', dentalClinic.id);
    console.log('uploadReview totalPrice', totalPrice);

    const tmpParagraphList = paragraphList;
    const tmpTreatmentArray = selectedTreatList;

    const starRate_cost = rating.priceRating;
    const starRate_treatment = rating.treatRating;
    const starRate_service = rating.serviceRating;
    const certified_bill = certifiedBill;
    const dentalClinicId = dentalClinic.id;
    const treatmentDate = treatDate.treatDate;

    const formatedParagraphArray = await formatParagraph(tmpParagraphList);
    const formatedTreatmentArray = await formatTreatment(tmpTreatmentArray);
    console.log('uploadReview formatedParagraph', formatedParagraphArray);
    console.log('uploadReview formatedTreatment', formatedTreatmentArray);

    POSTReviewUpload({
      jwtToken,
      starRate_cost,
      starRate_treatment,
      starRate_service,
      certified_bill,
      formatedTreatmentArray,
      dentalClinicId,
      formatedParagraphArray,
      totalPrice,
      treatmentDate,
    })
      .then((response) => {
        setUploadLoading(false);
        console.log('POSTReviewUpload response', response);
        navigation.navigate('HomeScreen');
      })
      .catch((error) => {
        setUploadLoading(false);
        console.log('POSTReviewUpload error', error);
      });
  };

  const reviseReview = async () => {
    Keyboard.dismiss();
    console.log('reviewRevise reviewId', reviewId);

    setUploadLoading(true);
    const tmpParagraphList = paragraphList;
    const tmpTreatmentArray = selectedTreatList;

    const starRate_cost = rating.priceRating;
    const starRate_treatment = rating.treatRating;
    const starRate_service = rating.serviceRating;
    const certified_bill = certifiedBill;
    const dentalClinicId = dentalClinic.id;
    const treatmentDate = String(treatDate.treatDate);

    const formatedParagraphArray = await formatParagraph(tmpParagraphList);
    const formatedTreatmentArray = await formatTreatment(tmpTreatmentArray);
    console.log('reviseReview formatedParagraph', formatedParagraphArray);
    console.log('reviseReview formatedTreatment', formatedTreatmentArray);

    PUTReviewRevise({
      jwtToken,
      reviewId,
      starRate_cost,
      starRate_treatment,
      starRate_service,
      certified_bill,
      formatedTreatmentArray,
      dentalClinicId,
      formatedParagraphArray,
      totalPrice,
      treatmentDate,
    })
      .then((response: any) => {
        setUploadLoading(false);
        console.log('PUTReviewRevise response', response);
        console.log(
          'PUTReviswRevise response.updateReview.reviewBody.TreatmentItems',
          response.updateReview.reviewBody.TreatmentItems,
        );
        console.log(
          'PUTReviewRevise response.updateReview.reviewBody.dental_clinic',
          response.updateReview.reviewBody.dental_clinic,
        );
        console.log(
          'PUTReviewRevise response.updateReview.reviewBody.review_contents',
          response.updateReview.reviewBody.review_contents,
        );

        const dentalObj = {
          id: response.updateReview.reviewBody.dentalClinicId,
          address: response.updateReview.reviewBody.dental_clinic.address,
          originalName:
            response.updateReview.reviewBody.dental_clinic.originalName,
          name: response.updateReview.reviewBody.dental_clinic.name,
        };

        const tmpRating = {
          avgRating: (
            (response.updateReview.reviewBody.starRate_cost +
              response.updateReview.reviewBody.starRate_service +
              response.updateReview.reviewBody.starRate_treatment) /
            3
          ).toFixed(1),
          serviceRating: response.updateReview.reviewBody.starRate_service,
          priceRating: response.updateReview.reviewBody.starRate_cost,
          treatRating: response.updateReview.reviewBody.starRate_treatment,
        };

        console.log('PUTReviewRevise treatDate', treatDate);

        const treatmentDateObj = {
          treatDate: new Date(response.updateReview.reviewBody.treatmentDate),
          displayTreatDate: response.updateReview.reviewBody.treatmentDate,
        };

        navigation.navigate('ReviewDetailScreen', {
          isRevised: true,
          totalPrice: response.updateReview.reviewBody.totalCost,
          paragraphArray: response.updateReview.reviewBody.review_contents,
          treatmentArray: response.updateReview.reviewBody.TreatmentItems,
          ratingObj: tmpRating,
          dentalObj: dentalObj,
          treatmentDateObj: treatmentDateObj,
        });
      })
      .catch((error) => {
        setUploadLoading(false);
        console.log('PUTReviewRevise error', error);
      });
  };

  const formatParagraph = async (paragraphArray: Array<any>) => {
    const tmpParagraphArray = await Promise.all(
      paragraphArray.map(async (item: any, index: number) => {
        if (item.image) {
          console.log('formatParagraph item', item);

          if (item.isPreExis) {
            console.log('기존에 있던 사진 item', item);
            const paragraphObj = {
              index: item.index,
              location: item.image.uri,
              key: item.id,
              contentType: item.image.mimeType,
              originalName: item.image.name,
              size: item.image.size,
              description: item.description ? item.description : null,
              imgBeforeAfter: item.order,
              width: item.image.width,
              height: item.image.height,
            };

            return paragraphObj;
          } else {
            const result: any = await uploadImageToS3(item.image, 'reviews');

            const paragraphObj = {
              index: index,
              location: result.response.location,
              key: result.response.key,
              contentType: result.type,
              originalName: result.originalName,
              size: result.size,
              description: item.description ? item.description : null,
              imgBeforeAfter: item.order,
              width: result.width,
              height: result.height,
            };

            return paragraphObj;
          }
        } else {
          const paragraphObj = {
            index: index,
            description: item.description ? item.description : null,
            location: null,
            key: null,
            mimeType: null,
            originalName: null,
            size: null,
            imgBeforeAfters: null,
            width: null,
            height: null,
          };

          return paragraphObj;
        }
      }),
    );

    return tmpParagraphArray;
  };

  const formatTreatment = async (treatmentArray: Array<any>) => {
    const tmpTreatmentArray = treatmentArray.map((item: any, index) => {
      if (item.price) {
        const tmpObj = {
          id: item.id,
          cost: item.price,
        };

        return tmpObj;
      } else {
        const tmpObj = {
          id: item.id,
          cost: null,
        };

        return tmpObj;
      }
    });

    return tmpTreatmentArray;
  };

  const clickInsertedImage = (index: number) => {
    selectedParaIndex = index;
    insertedImageActionSheetRef.current.show();
  };

  const onPressInsertedImageActionSheet = (index: number) => {
    console.log('onPressInsertedImageActionSheet index', index);

    if (index === 1) {
      navigation.navigate('GallerySelectOne', {
        requestType: 'reviewImage',
      });
    } else if (index === 2) {
      let tmpParagraphArray = paragraphList;
      console.log(
        'tmpParagraphArray[selectedParaIndex]',
        tmpParagraphArray[selectedParaIndex],
      );
      delete tmpParagraphArray[selectedParaIndex].image;
      delete tmpParagraphArray[selectedParaIndex].order;
      delete tmpParagraphArray[selectedParaIndex].isPreExis;

      setParagraphList(tmpParagraphArray);
      setChangeParagraphList(!changeParagraphList);
    }
  };

  const renderParaUnitItem = ({item, index}: any) => {
    console.log('renderParaUnitItem item', item);

    return (
      <EntireParaUnitContainer>
        <ParaUnitContainer style={styles.paragraphShadow}>
          {item.image && (
            <ParaImageContainer>
              <TouchableWithoutFeedback
                onLongPress={() => clickInsertedImage(index)}
                delayLongPress={300}>
                <ParaImage
                  source={{
                    uri: item.image.uri,
                  }}
                />
              </TouchableWithoutFeedback>
              <SelectOrderContainer>
                <TouchableWithoutFeedback
                  onPress={() => changeImageOrder('before', index)}>
                  <SelectOrderButton
                    style={
                      item.order === 'before'
                        ? {backgroundColor: '#D1D1D1'}
                        : {
                            backgroundColor: '#ffffff',
                            borderWidth: 1,
                            borderColor: '#d1d1d1',
                          }
                    }>
                    <SelectOrderText
                      style={
                        item.order === 'before'
                          ? {color: '#ffffff'}
                          : {color: '#d1d1d1'}
                      }>
                      {'치료전'}
                    </SelectOrderText>
                  </SelectOrderButton>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                  onPress={() => changeImageOrder('after', index)}>
                  <SelectOrderButton
                    style={[
                      {marginLeft: 6},
                      item.order === 'after'
                        ? {backgroundColor: '#D1D1D1'}
                        : {
                            backgroundColor: '#ffffff',
                            borderWidth: 1,
                            borderColor: '#d1d1d1',
                          },
                    ]}>
                    <SelectOrderText
                      style={
                        item.order === 'after'
                          ? {color: '#ffffff'}
                          : {color: '#d1d1d1'}
                      }>
                      {'치료후'}
                    </SelectOrderText>
                  </SelectOrderButton>
                </TouchableWithoutFeedback>
              </SelectOrderContainer>
            </ParaImageContainer>
          )}
          {!item.image && (
            <TouchableWithoutFeedback onPress={() => onPressAddImage(index)}>
              <AddImageButton>
                <AddImageContainer>
                  <AddImageIcon
                    source={require('~/Assets/Images/Upload/ic_addImage.png')}
                  />
                  <AddImageText>사진 추가하기(선택)</AddImageText>
                </AddImageContainer>
              </AddImageButton>
            </TouchableWithoutFeedback>
          )}
          <ParaTextInput
            ref={descripInputRef}
            value={item.description ? item.description : ''}
            multiline={true}
            placeholder={'내용을 입력해 주세요 !'}
            placeholderTextColor={'#BFBFBF'}
            autoCapitalize={'none'}
            onSubmitEditing={(response: any) =>
              onSubmitParaDescripInput(
                response.nativeEvent.text,
                index,
                'submit',
              )
            }
            onEndEditing={(response: any) =>
              onSubmitParaDescripInput(response.nativeEvent.text, index, 'end')
            }
            onChangeText={(text: string) =>
              onChangeParaDescripInput(text, index)
            }
          />
        </ParaUnitContainer>
      </EntireParaUnitContainer>
    );
  };

  const renderAddParaUnitItem = () => {
    return (
      <TouchableWithoutFeedback onPress={() => onPressAddPara()}>
        <EntireParaUnitContainer>
          <ParaUnitContainer
            style={[
              styles.paragraphShadow,
              {opacity: 0.15, shadowOpacity: 0.6},
            ]}>
            <AddImageButton>
              <AddImageContainer>
                <AddImageIcon
                  source={require('~/Assets/Images/Upload/ic_addImage.png')}
                />
                <AddImageText>사진 추가하기(선택)</AddImageText>
              </AddImageContainer>
            </AddImageButton>
            <ParaTextInput
              editable={false}
              multiline={true}
              placeholder={'내용을 입력해 주세요 !'}
              placeholderTextColor={'#BFBFBF'}
              autoCapitalize={'none'}
            />
          </ParaUnitContainer>
          <AddNewParaUnitContainer>
            <AddNewParaUnitButton
              source={require('~/Assets/Images/Upload/ic_addPara.png')}
            />
          </AddNewParaUnitContainer>
        </EntireParaUnitContainer>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <Container as={SafeAreaView} forceInset={{top: 'always'}}>
      <HeaderBar>
        <TouchableWithoutFeedback onPress={() => goBack()}>
          <HeaderLeftContainer>
            <HeaderBackIcon
              source={require('~/Assets/Images/HeaderBar/ic_back.png')}
            />
          </HeaderLeftContainer>
        </TouchableWithoutFeedback>
        <HeaderTitleText>
          {route.params?.requestType === 'post' ? '작성' : '수정'}
        </HeaderTitleText>
        <TouchableWithoutFeedback onPress={() => clickUpload()}>
          <HeaderRightContainer>
            <HeaderEmptyContainer />
            <HeaderUploadText>올리기</HeaderUploadText>
          </HeaderRightContainer>
        </TouchableWithoutFeedback>
      </HeaderBar>
      <BodyContainer>
        <MetaInfoContainer>
          <ScrollView
            ref={scrollViewRef}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            <FirstMetaDataListContainer>
              <TouchableWithoutFeedback
                onPress={() => moveToDentalClinicSearch()}>
                <MetaInfoItemBackground style={[{marginLeft: 16}]}>
                  <MetaInfoItemText>
                    {dentalClinic.name ? dentalClinic.name : '병원'}
                  </MetaInfoItemText>
                </MetaInfoItemBackground>
              </TouchableWithoutFeedback>
              {treatDate.displayTreatDate != '' && (
                <TouchableWithoutFeedback onPress={() => onPressTreatDate()}>
                  <MetaInfoItemBackground style={{marginLeft: 8}}>
                    <MetaInfoItemText>
                      {treatDate.displayTreatDate}
                    </MetaInfoItemText>
                  </MetaInfoItemBackground>
                </TouchableWithoutFeedback>
              )}
              {treatDate.displayTreatDate == '' && (
                <TouchableWithoutFeedback onPress={() => onPressTreatDate()}>
                  <MetaInfoItemBackground
                    style={{marginLeft: 8, backgroundColor: '#F3F3F3'}}>
                    <MetaInfoItemText style={{color: '#BCBCBC'}}>
                      {'날짜'}
                    </MetaInfoItemText>
                  </MetaInfoItemBackground>
                </TouchableWithoutFeedback>
              )}
              <TouchableWithoutFeedback onPress={() => onPressTreatPrice()}>
                <MetaInfoItemBackground
                  style={[
                    {marginLeft: 8, marginRight: 16},
                    !displayTotalPrice && {backgroundColor: '#f3f3f3'},
                  ]}>
                  <TotalPriceInput
                    style={{paddingLeft: 8, paddingRight: 8}}
                    ref={totalPriceInputRef}
                    value={totalPrice}
                    keyboardType={'number-pad'}
                    caretHidden={true}
                    onChangeText={(text: string) => onChangePriceInput(text)}
                  />
                  <TotalPriceContainer>
                    <MetaInfoItemText
                      style={!displayTotalPrice && {color: '#bcbcbc'}}>
                      {displayTotalPrice ? displayTotalPrice : '비용'}
                    </MetaInfoItemText>
                  </TotalPriceContainer>
                </MetaInfoItemBackground>
              </TouchableWithoutFeedback>
            </FirstMetaDataListContainer>
          </ScrollView>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <SecondMetaDataListContainer style={{marginTop: 8}}>
              {selectedTreatList.length === 0 && (
                <TouchableWithoutFeedback onPress={() => moveToTreatSearch()}>
                  <MetaInfoItemBackground
                    style={{marginLeft: 16, backgroundColor: '#f3f3f3'}}>
                    <MetaInfoItemText style={{color: '#bcbcbc'}}>
                      {'진료항목'}
                    </MetaInfoItemText>
                  </MetaInfoItemBackground>
                </TouchableWithoutFeedback>
              )}
              {selectedTreatList.length > 0 && (
                <TouchableWithoutFeedback onPress={() => moveToTreatSearch()}>
                  <MetaInfoItemBackground style={{marginLeft: 16}}>
                    <MetaInfoItemTextList>
                      {selectedTreatList.map((treat: any, index: number) => {
                        if (index === selectedTreatList.length - 1) {
                          return (
                            <MetaInfoItemText>{treat.name}</MetaInfoItemText>
                          );
                        } else {
                          return (
                            <MetaInfoItemText>
                              {treat.name + ','}
                            </MetaInfoItemText>
                          );
                        }
                      })}
                    </MetaInfoItemTextList>
                  </MetaInfoItemBackground>
                </TouchableWithoutFeedback>
              )}
              <TouchableWithoutFeedback onPress={() => moveToRating()}>
                <MetaInfoItemBackground style={{marginLeft: 8}}>
                  <RatingStarIcon
                    source={require('~/Assets/Images/Upload/ic_ratingStar.png')}
                  />
                  <MetaInfoItemText style={{marginLeft: 2}}>
                    {rating.avgRating}
                  </MetaInfoItemText>
                </MetaInfoItemBackground>
              </TouchableWithoutFeedback>
              {detailPriceList.length === 0 && (
                <TouchableWithoutFeedback onPress={() => moveToDetailPrice()}>
                  <MetaInfoItemBackground
                    style={{
                      marginLeft: 8,
                      marginRight: 16,
                      backgroundColor: '#f3f3f3',
                    }}>
                    <MetaInfoItemText style={{color: '#bcbcbc'}}>
                      {'상세비용'}
                    </MetaInfoItemText>
                  </MetaInfoItemBackground>
                </TouchableWithoutFeedback>
              )}
              {detailPriceList.length > 0 && (
                <TouchableWithoutFeedback onPress={() => moveToDetailPrice()}>
                  <MetaInfoItemBackground
                    style={{marginLeft: 8, marginRight: 16}}>
                    <MetaInfoItemText>{'상세비용'}</MetaInfoItemText>
                  </MetaInfoItemBackground>
                </TouchableWithoutFeedback>
              )}
            </SecondMetaDataListContainer>
          </ScrollView>
        </MetaInfoContainer>
        <ContentContainer>
          <KeyboardAwareFlatList
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
            data={paragraphList}
            renderItem={renderParaUnitItem}
            ListFooterComponent={renderAddParaUnitItem}
          />
        </ContentContainer>
      </BodyContainer>
      {visibleDatePicker && (
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
            value={treatDate.treatDate}
            onChange={(event, date) => onChangeDatePicker(event, date)}
            mode={'date'}
            display="spinner"
            is24Hour={true}
            maximumDate={new Date()}
          />
        </DateModalContainer>
      )}
      <ActionSheet
        ref={insertedImageActionSheetRef}
        options={['취소', '사진 변경', '사진 삭제']}
        cancelButtonIndex={0}
        destructiveButtonIndex={2}
        onPress={(index: any) => onPressInsertedImageActionSheet(index)}
      />
      {uploadLoading && (
        <IndicatorContainer>
          <ActivityIndicator color={'#ffffff'} />
        </IndicatorContainer>
      )}
    </Container>
  );
};

export default ContentPostScreen;

const styles = StyleSheet.create({
  paragraphShadow: {
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    shadowOpacity: 0.09,
  },
});

/*
<FlatList
showsHorizontalScrollIndicator={false}
horizontal={true}
data={metaInfoList1}
renderItem={renderFirstMetaInfoItem}/>
<FlatList
style={{marginTop: 8}}
showsHorizontalScrollIndicator={false}
horizontal={true}
data={metaInfoList2}
renderItem={renderSecondMetaInfoItem}/>
*/
