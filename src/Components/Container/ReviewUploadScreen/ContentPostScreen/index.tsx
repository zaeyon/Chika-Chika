import React, {
  useState,
  useEffect,
  useRef,
  createRef,
  useCallback,
} from 'react';
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
import {BlurView} from '@react-native-community/blur';
import {hasNotch} from '~/method/deviceInfo';

import {uploadImageToS3} from '~/method/uploadImageToS3';

// Local Components
import NavigationHeader from '~/Components/Presentational/NavigationHeader';
import ParagraphItem from '~/Components/Presentational/ReviewUploadScreen/ParagraphItem';
import TouchBlockIndicatorCover from '~/Components/Presentational/TouchBlockIndicatorCover';
import ToastMessage from '~/Components/Presentational/ToastMessage';

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
background-color: #F5F7F9;
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
background-color: #ffffff;
border-width: 1px;
border-color: #f1f1f1;
border-radius: 8px;
padding: 16px;
`;

const EntireParaUnitContainer = Styled.View`
width: ${wp('100%')}px;
padding-bottom: 16px;
padding-left: 16px;
padding-right: 16px;
background-color: #F5F7F9;
`;

const AddImageContainer = Styled.View`
flex-direction: row;
align-items: center;
`;

const AddImageButton = Styled.View`
padding-top: 17px;
padding-bottom: 17px;
border-radius: 8px;
border-width: 1px;
border-color: #E2E6ED;
border-style: dashed;
align-items: center;
justify-content: center;
`;

const AddImageIcon = Styled.Image`
width: ${wp('4.26%')}px;
height: ${wp('4.26%')}px;
`;

const AddImageText = Styled.Text`
margin-left: 3px;
font-weight: 400;
font-size: 14px;
color: #9AA2A9;
`;

const ParaDescripInputContainer = Styled.View`
background-color: #ffffff;
padding-top: 14px;
`;

const ParaDescripInput = Styled.TextInput`
font-weight: 300;
font-size: 14px;
color: #2B2B2B;
`;

const AddNewParaUnitContainer = Styled.View`
position: absolute;
width: ${wp('100%')}px;
height: ${wp('32.47%')}px;
align-items: center;
justify-content: center;

`;

const AddNewParaUnitButton = Styled.Image`
width: ${wp('9.3%')}px;
height: ${wp('9.3%')}px;
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

const DescripModalContainer = Styled.View`
border-top-left-radius: 20px;
border-top-right-radius: 20px;
width: ${wp('100%')}px;
min-height: ${hp('13.54%')}px;
background-color: #ffffff;
padding: 16px;
`;

interface Props {
  navigation: any;
  route: any;
}

var selectedParaIndex: number;

const ContentPostScreen = ({navigation, route}: Props) => {
  const [certifiedBill, setCertifiedBill] = useState<boolean>(false);
  const [loadingUpload, setLoadingUpload] = useState<boolean>(false);
  const [isActivatedUpload, setIsActivatedUpload] = useState<boolean>(false);
  const [isVisibleDescripModal, setIsVisibleDescripModal] = useState<boolean>(
    false,
  );

  const totalPriceInputRef = useRef();
  const scrollViewRef = useRef<any>();
  let descripInputRef = useRef<any>();

  const [selectedImageList, setSelectedImageList] = useState<Array<any>>([]);
  const descriptionStr = useRef<string>('');

  const [paragraphArray, setParagraphArray] = useState<Array<object>>(
    route.params?.paragraphArray,
  );

  const [changeParagraph, setChangeParagraph] = useState<boolean>(false);

  const jwtToken = useSelector((state: any) => state.currentUser.jwtToken);
  let reviewId = route.params?.reviewId;

  const insertedImageActionSheetRef = createRef<any>();
  const paraFlatListRef = useRef<any>();

  useEffect(() => {
    console.log('ContentPostScreen route', route);
  }, [route]);

  useEffect(() => {
    if (route.params.requestType === 'revise') {
      // console.log(
      //   '리뷰 수정 요청 route.params.paragraphArray',
      //   route.params.paragraphArray,
      // );
      // const tmpParagraphArray = route.params.paragraphArray;
      // setParagraphArray(tmpParagraphArray);
      reviewId = route.params?.reviewId;
    }
  }, []);

  useEffect(() => {
    if (route.params?.selectedImages) {
      console.log(
        '리뷰 사진 선택 route.params?.selectedImages',
        route.params?.selectedImages,
      );

      const insertImageToParagraph = async () => {
        let tmpParagraphArray = paragraphArray.slice();

        await route.params.selectedImages.forEach(
          (item: any, index: number) => {
            var paraObj: any;
            if (index == 0) {
              paraObj = tmpParagraphArray[route.params?.startIndex];
              paraObj.image = item;
              paraObj.order = 'before';
              tmpParagraphArray[route.params?.startIndex] = paraObj;
            } else {
              paraObj = {
                index: paragraphArray.length + index,
                image: item,
                description: '',
                order: 'before',
              };
              tmpParagraphArray.push(paraObj);
            }
          },
        );

        setParagraphArray(tmpParagraphArray);
      };

      insertImageToParagraph();
    }
  }, [route.params?.selectedImages]);

  useEffect(() => {
    if (route.params?.selectedImage) {
      let tmpParagraphArray = paragraphArray.slice();

      const paraObj = {
        index: route.params.selectedIndex,
        image: route.params.selectedImage,
        description: paragraphArray[route.params.selectedIndex].description,
        order: paragraphArray[route.params.selectedIndex].order,
      };

      tmpParagraphArray[route.params.selectedIndex] = paraObj;

      setParagraphArray(tmpParagraphArray);
    }
  }, [route.params?.selectedImage]);

  useEffect(() => {
    let descriptions = '';
    let isExistImage: boolean;

    paragraphArray.forEach((item: any, index: number) => {
      if (item.description !== null) {
        if (item.description.length > 0) {
          descriptions = descriptions + item.description;
        }
      }
    });

    if (descriptions.length > 0) {
      setIsActivatedUpload(true);
    } else {
      setIsActivatedUpload(false);
    }
  }, [paragraphArray]);

  const openCamera = () => {
    navigation.navigate('Camera');
  };

  const moveToGallery = () => {
    navigation.navigate('Gallery');
  };

  const onPressBackground = () => {
    Keyboard.dismiss();
  };

  const onPressAddImage = (index: number) => {
    navigation.navigate('ImageSelectStackScreen', {
      screen: 'ImageSelectScreen',
      params: {
        requestScreen: 'ContentPostScreen',
        startIndex: index,
        selectedImages: [],
      },
    });
  };

  const onPressAddPara = () => {
    console.log('onPressAddPara paragraphArray', paragraphArray);
    if (
      paragraphArray[paragraphArray.length - 1].description.trim().length > 0 ||
      paragraphArray[paragraphArray.length - 1].image?.uri
    ) {
      const tmpParagraphArray = paragraphArray.slice();
      const paraObj = {
        index: tmpParagraphArray.length,
        image: null,
        description: '',
      };

      tmpParagraphArray.push(paraObj);
      setParagraphArray(tmpParagraphArray);
    } else {
      ToastMessage.show('더이상 문단을 만들 수 없습니다.');
    }
  };

  const onSubmitParaDescripInput = (
    text: string,
    index: number,
    type: string,
  ) => {
    console.log('submitParaDescrip type', type);
    console.log('inputParaDescrip text', text);

    var tmpParagraphArray = paragraphArray.slice();
    tmpParagraphArray[index].description = text;

    setParagraphArray(tmpParagraphArray);
  };

  const onChangeParaDescripInput = (text: string, index: number) => {
    var tmpParagraphArray = paragraphArray.slice();
    tmpParagraphArray[index].description = text;
    setParagraphArray(tmpParagraphArray);

    descriptionStr.current = descriptionStr.current + text;
  };

  const changeImageOrder = (order: string, index: number) => {
    console.log('changeImageOrder index', index);

    var tmpParagraphArray = paragraphArray.slice();
    tmpParagraphArray[index].order = order;

    setParagraphArray(tmpParagraphArray);
  };

  const onFocusParaDescripInput = (index: number) => {
    console.log('onFocusParaDescripInput index', index);

    paraFlatListRef.current.scrollToIndex({index: index, animated: true});
  };

  const clickUpload = () => {
    console.log("clickUpload")
    console.log("route.params?.requestType", route.params?.requestType);
    if (route.params.requestType === 'post') {
      uploadReview();
    } else if (route.params.requestType === 'revise') {
      reviseReview();
    }
  };

  const goBack = () => {
    console.log("ContentPostScreen goBack");
    navigation.navigate('ReviewMetaDataScreen', {
      paragraphArray: paragraphArray,
    });
  };

  const uploadReview = async () => {
    Keyboard.dismiss();
    setLoadingUpload(true);
    console.log(
      'uploadReview route.params?.dentalObj',
      route.params?.dentalObj,
    );
    console.log(
      'uploadReview route.params?.treatmentArray',
      route.params?.treatmentArray,
    );
    console.log(
      'uploadReview route.params?.ratingObj',
      route.params?.ratingObj,
    );
    console.log(
      'uploadReview route.params?.treatmentDate',
      route.params?.treatmentDate,
    );
    console.log(
      'uploadReview route.params?.totalPrice',
      route.params?.totalPrice,
    );
    console.log(
      'uploadReview route.params?.selectedProofImage',
      route.params?.selectedProofImage,
    );
    console.log(
      'uploadReview route.params?.selectedDentalImages',
      route.params?.selectedDentalImages,
    );
    console.log(
      'uploadReview route.params?.requestType',
      route.params?.requestType,
    );

    // 문단 내용 정보
    const tmpParagraphArray = paragraphArray.slice();

    // 진료 & 질병 항목 정보
    const tmpTreatmentArray = route.params?.treatmentArray;
    const tmpSelectedProofImage = route.params?.selectedProofImage;

    // 별점 정보
    const starRate_cost = route.params?.ratingObj.priceRating;
    const starRate_treatment = route.params?.ratingObj.treatmentRating;
    const starRate_service = route.params?.ratingObj.serviceRating;

    // 병원 정보
    const dentalClinicId = route.params?.dentalObj.id;

    // 진료 날짜 정보
    const treatmentDate = route.params?.treatmentDate;

    // 전체 가격 정보
    const totalPrice = route.params?.totalPrice;

    const formattedParagraphArray = await formatParagraph(tmpParagraphArray);
    const formattedTreatmentArray = await formatTreatment(tmpTreatmentArray);
    let formattedProofImage = {};
    if (tmpSelectedProofImage.uri) {
      formattedProofImage = await formatProofImage(tmpSelectedProofImage);
    }

    console.log('uploadReview formatedParagraph', formattedParagraphArray);
    console.log('uploadReview formatedTreatment', formattedTreatmentArray);

    POSTReviewUpload({
      jwtToken,
      starRate_cost,
      starRate_treatment,
      starRate_service,
      formattedTreatmentArray,
      dentalClinicId,
      formattedParagraphArray,
      formattedProofImage,
      totalPrice,
      treatmentDate,
    })
      .then((response) => {
        setLoadingUpload(false);
        console.log('POSTReviewUpload response', response);
        console.log("route.params?.requestScreen", route.params?.requestScreen)
        if(route.params?.requestScreen === 'DentalDetailScreen') {
          navigation.navigate('DentalDetailScreen', {
            isRefreshReview: true,
            dentalId: dentalClinicId,
          });
        } else {
          navigation.navigate('HomeScreen', {
            isUploadReview: true,
          });
        }
      })
      .catch((error) => {
        setLoadingUpload(false);
        console.log('POSTReviewUpload error', error);
      });
  };

  const reviseReview = async () => {
    Keyboard.dismiss();
    setLoadingUpload(true);

    // 문단 내용 정보
    const tmpParagraphArray = paragraphArray.slice();

    // 진료 & 질병 항목 정보
    const tmpTreatmentArray = route.params?.treatmentArray;

    // 별점 정보
    const starRate_cost = route.params?.ratingObj.priceRating;
    const starRate_treatment = route.params?.ratingObj.treatmentRating;
    const starRate_service = route.params?.ratingObj.serviceRating;

    const tmpSelectedProofImage = route.params?.selectedProofImage;

    // 병원 정보
    const dentalClinicId = route.params?.dentalObj.id;

    // 진료 날짜 정보
    const treatmentDate = route.params?.treatmentDate;

    // 전체 가격 정보
    const totalPrice = route.params?.totalPrice;

    const formattedParagraphArray = await formatParagraph(tmpParagraphArray);
    const formattedTreatmentArray = await formatTreatment(tmpTreatmentArray);
    let formattedProofImage = {};
    if (tmpSelectedProofImage.uri) {
      formattedProofImage = await formatProofImage(tmpSelectedProofImage);
    }
    console.log('reviseReview formatedParagraph', formattedParagraphArray);
    console.log('reviseReview formatedTreatment', formattedTreatmentArray);

    PUTReviewRevise({
      jwtToken,
      reviewId,
      starRate_cost,
      starRate_treatment,
      starRate_service,
      formattedTreatmentArray,
      dentalClinicId,
      formattedParagraphArray,
      formattedProofImage,
      totalPrice,
      treatmentDate,
    })
      .then((response: any) => {
        setLoadingUpload(false);
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
          treatmentRating: response.updateReview.reviewBody.starRate_treatment,
        };

        //console.log('PUTReviewRevise treatDate', treatDate);

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
        setLoadingUpload(false);
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

  const formatProofImage = async (selectedProofImage: any) => {
    const result: any = await uploadImageToS3(
      selectedProofImage,
      'reviewBills',
    );

    const tmpProofImage = {
      location: result.response.location,
      originalname: result.originalName,
      mimetype: result.type,
      size: result.size,
    };

    return tmpProofImage;
  };

  const clickInsertedImage = (index: number) => {
    selectedParaIndex = index;
    insertedImageActionSheetRef.current.show();
  };

  const onPressInsertedImageActionSheet = (index: number) => {
    console.log('onPressInsertedImageActionSheet index', index);

    if (index === 1) {
      navigation.navigate('ImageSelectOneStackScreen', {
        screen: 'ImageSelectOneScreen',
        requestScreen: 'ContentPostScreen',
        selectedIndex: selectedParaIndex,
      });
    } else if (index === 2) {
      let tmpParagraphArray = paragraphArray.slice();
      console.log(
        'tmpParagraphArray[selectedParaIndex]',
        tmpParagraphArray[selectedParaIndex],
      );
      delete tmpParagraphArray[selectedParaIndex].image;
      delete tmpParagraphArray[selectedParaIndex].order;
      delete tmpParagraphArray[selectedParaIndex].isPreExis;

      setParagraphArray(tmpParagraphArray);
    }
  };

  const renderParaUnitItem = ({item, index}: any) => {
    return (
      <ParagraphItem
        item={item}
        index={index}
        clickInsertedImage={clickInsertedImage}
        changeImageOrder={changeImageOrder}
        onSubmitParaDescripInput={onSubmitParaDescripInput}
        onChangeParaDescripInput={onChangeParaDescripInput}
        onFocusParaDescripInput={onFocusParaDescripInput}
        onPressAddImage={onPressAddImage}
        descripInputRef={descripInputRef}
      />
    );
  };

  const renderAddParaUnitItem = useCallback(() => {
    return (
      <TouchableWithoutFeedback onPress={() => onPressAddPara()}>
        <EntireParaUnitContainer>
          <ParaUnitContainer style={[styles.paragraphUnitShadow]}>
            <AddImageButton>
              <AddImageContainer>
                <AddImageIcon
                  style={{borderRadius: 100}}
                  source={require('~/Assets/Images/Upload/ic_addImage.png')}
                />
                <AddImageText>사진 추가하기(선택)</AddImageText>
              </AddImageContainer>
            </AddImageButton>
            <ParaDescripInputContainer>
              <ParaDescripInput
                editable={false}
                multiline={true}
                placeholder={'내용을 입력해 주세요.'}
                placeholderTextColor={'#E2E6ED'}
                autoCapitalize={'none'}
              />
            </ParaDescripInputContainer>
          </ParaUnitContainer>
          <BlurView
            style={styles.blurView}
            blurType="light"
            blurAmount={1.7}
            reducedTransparencyFallbackColor="white"
          />
          <AddNewParaUnitContainer>
            <AddNewParaUnitButton
              source={require('~/Assets/Images/Upload/ic_addPara.png')}
            />
          </AddNewParaUnitContainer>
        </EntireParaUnitContainer>
      </TouchableWithoutFeedback>
    );
  }, [paragraphArray.length]);

  const renderDescripModal = () => {
    return <DescripModalContainer></DescripModalContainer>;
  };

  return (
    <Container>
      <NavigationHeader
        headerLeftProps={{type: 'arrow', onPress: goBack}}
        headerTitle={'리뷰작성'}
        headerRightProps={{
          type: 'text',
          text: route.params?.requestType === 'post' ? '업로드' : '업로드',
          onPress: clickUpload,
        }}
        headerRightDisabled={!isActivatedUpload}
        headerRightActiveColor={'#00D1FF'}
      />
      <BodyContainer>
        <ContentContainer>
          <FlatList
            ref={paraFlatListRef}
            contentContainerStyle={{paddingTop: 16, paddingBottom: hp('36.9%')}}
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
            data={paragraphArray}
            renderItem={renderParaUnitItem}
            ListFooterComponent={renderAddParaUnitItem}
          />
        </ContentContainer>
      </BodyContainer>
      <ActionSheet
        ref={insertedImageActionSheetRef}
        options={['취소', '사진 변경', '사진 삭제']}
        cancelButtonIndex={0}
        destructiveButtonIndex={2}
        onPress={(index: any) => onPressInsertedImageActionSheet(index)}
      />
      {isVisibleDescripModal && renderDescripModal()}
      <TouchBlockIndicatorCover loading={loadingUpload} />
    </Container>
  );
};

export default ContentPostScreen;

const styles = StyleSheet.create({
  paragraphUnitShadow: {
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 10,
    shadowOpacity: 0.09,
  },
  addParaBackgroundBlur: {
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowColor: '#ffffff',
    shadowRadius: 10,
    shadowOpacity: 1,
  },
  blurView: {
    height: wp('32.47%'),
    position: 'absolute',
    top: 0,
    left: 20,
    bottom: 0,
    right: 20,
    opacity: 0.92,
  },
});

