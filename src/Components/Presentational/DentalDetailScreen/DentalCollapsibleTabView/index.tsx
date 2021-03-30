import React, {useState, useEffect, useRef, useCallback} from 'react';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Animated,
  PanResponder,
  Platform,
  TouchableOpacity,
  Alert,
  StatusBar,
  TouchableWithoutFeedback,
  FlatList,
  Linking,
} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
// import DeviceInfo from 'react-native-device-info';
import {hasNotch, getStatusBarHeight} from '~/method/deviceInfo'

// Local Component
import ReviewList from '~/Components/Presentational/ReviewList';
import ShowingRating from '~/Components/Presentational/ShowingRating';
import RatingReport from '~/Components/Presentational/RatingReport';
import WeeklyTreatmentTimeInfo from '~/Components/Presentational/DentalDetailScreen/WeeklyTreatmentTimeInfo'
import RatingStarList from '~/Components/Presentational/RatingStarList';
import DentalEvaluation from '~/Components/Presentational/DentalEvaluation';

const ratingStarImage = require('~/Assets/Images/Indicator/ic_ratingStar.png');
const Container = Styled.View`
 flex: 1;
 background-color: #ffffff;
`;

const CollapsibleContainer = Styled.View`
flex: 1;
width: ${wp('100%')}px;
align-items: center;
border-bottom-width: 1px;
border-color: #E2E6ED;
`;

const HeaderBar = Styled.View`
 position: absolute;
 padding-top: ${hasNotch() ? getStatusBarHeight() : 0}px;
 width: ${wp('100%')}px;
 height: ${getStatusBarHeight() + hp('8%')}px;
 flex-direction: row;
 align-items: center;
`;

const HeaderLeftContainer = Styled.View`
padding: 8px 0px 8px 15px;
 align-items: center;
 justify-content: center;
 flex-direction: row;
`;

const HeaderBackIcon = Styled.Image`
width: ${wp('6.4%')}px;
height: ${wp('6.4%')}px;
`;

const HeaderTitleText = Styled.Text`
font-weight: 700;
font-size: 20px;
line-height: 24px;
color: #131F3C;
`;

const CoverImageContainer = Styled.View`
width: ${wp('100%')}px;
height: ${hasNotch() ? hp('26') : hp('28')}px;
background-color: #F5F7F9;
`;

const CoverImage = Styled.Image`
width: ${wp('100%')}px;
height: ${hasNotch() ? hp('26') : hp('28')}px;
`;

const RepresentingKeywordContainer = Styled.View`
width: ${wp('100%')}px;
padding: 24px 16px 12px 16px;
flex-direction: row;
align-items: center;
`;

const RepresentingKeywordItemContainer = Styled.View`
border-radius: 100px;
padding: 8px 12px 
background-color: #6CC9A8;
align-items: center;
justify-content: center;
`;

const RepresentingKeywordText = Styled.Text`
font-size: 12px;
font-weight: 800;
color: #ffffff;
`;

const BasicInfoContainer = Styled.View`
position: absolute;
bottom: 0px;
width: ${wp('100%')}px;
border-top-left-radius: 24px;
border-top-right-radius: 24px;
background-color: #ffffff;
padding-top: 26px;
padding-bottom: 23px;
padding-left: 16px;
padding-right: 16px;
`;

const BasicInfoItemDivider = Styled.View`
width: ${wp('91.46%')}px;
height: 1px;
background-color: #f0f0f0;
`;

const BasicInfoItemContainer = Styled.View`
width: ${wp('100%')}px;
padding-top: 16px;
padding-bottom: 16px;
flex-direction: row;
align-items: center;
`;

const BasicInfoLabelText = Styled.Text`
color: #000000;
font-weight: 400;
font-size: 14px;
`;

const BasicInfoLabelDivider = Styled.View`
margin-left: 8px;
margin-right: 8px;
width: 1px;
height: ${hp('0.98%')}px;
background-color: #e5e5e5;
`;

const BasicInfoValueText = Styled.Text`
color: #000000;
font-weight: bold;
font-size: 14px;
`;

const DentalNameText = Styled.Text`
font-weight: 800;
font-size: 22px;
color: #000000;
line-height: 24px;
`;

const AvgRatingText = Styled.Text`
margin-left: 4px;
font-weight: bold;
color: #131F3C;
font-size: 14px;
`;

const DentalAddressText = Styled.Text`
font-weight: 700;
color: #4E525D;
font-size: 16px;
line-height: 24px;
`;

const DetailInfoTabContainer = Styled.View`
background-color: #F5F7F9;
`;

const DetailAddressText = Styled.Text`
margin-top: 12px;

font-weight: 800;
font-size: 18px;
line-height: 24px;
color: #131F3C;
`;

const CertificationIcon = Styled.View`
background-color: #ffffff;
position: absolute;
bottom: -${wp('6.4%')}px;
right: 16;
width: ${wp('12.8%')}px;
height: ${wp('12.8%')}px;
border-radius: 100px;
`;

const DetailInfoTypeContainer = Styled.View`
height: ${hasNotch() ? hp('10.83%') : hp('12.8%')}px;
background-color: #ffffff;
padding: 24px 16px;
flex-direction: row;
align-items: center;
border-bottom-width: 1px;
border-color: #F5F7F9;
`;

const DetailInfoTypeItemContainer = Styled.View`
padding: 10px 16px 10px 16px;
background-color: #F5F7F9;
align-items: center;
justify-content: center;
border-radius: 100px;
`;

const DetailInfoTypeText = Styled.Text`
font-weight: 700;
font-size: 14px;
color: #282D3C;
`;


const DetailInfoIntroKeywordContainer = Styled.View`
background-color: #ffffff;
border-bottom-width: 16px;
border-color: #F5F7F9; 
`;

const DetailInfoItemContainer = Styled.View`
background-color: #ffffff;
padding: 24px 16px;
border-bottom-width: 16px;
border-color: #F5F7F9; 
`;

const DetailInfoLabelText = Styled.Text`
font-weight: 800;
font-size: 14px;
line-height: 24px;
color: #9AA2A9;
`;

const DetailInfoDescripText = Styled.Text`
margin-top: 10px;
font-weight: 400; 
font-size: 14px;
line-height: 24px;
color: #000000;
`;

const PostReviewContainer = Styled.View`
margin-top: 8px;
background-color: #ffffff;
padding: 18px 16px 18px 16px;
flex-direction: row;
align-items: center;
justify-content: space-between;
border-top-width: 0.5px;
border-bottom-width: 0.5px;
border-color: #E2E6ED;
`;

const PostReviewDescipText = Styled.Text`
font-weight: 400;
font-size: 16px;
color: #131F3C;
line-height: 24px;
`;

const PostReviewButton = Styled.View`
background-color: #ffffff;
padding: 6px 12px 6px 12px;
border-radius: 100px;
border-width: 1px;
border-color: #E2E6ED;
flex-direction: row;
align-items: center;
`;

const PostReviewEmojiIcon = Styled.Image`
width: ${wp('4.26%')}px;
height: ${wp('4.26%')}px;
`;

const PostReviewText = Styled.Text`
margin-left: 4px;
font-size: 14px;
font-weight: 700;
line-height: 24px;
color: #131F3C;
`;

const RatingReportContainer = Styled.View`
margin-top: 8px;
border-top-width: 0.5px;
border-bottom-width: 0.5px;
border-color: #E2E6ED;
`;


const ReviewListContainer = Styled.View`
margin-top: 8px;
border-top-width: 0.5px;
border-color: #E2E6ED;
`;


const ReviewInfoContainer = Styled.View`
`;


const DentalStaticMapImage = Styled.Image`
margin-top: 16px;
width: ${wp('91.46%')}px;
height: ${wp('53.329%')}px;
border-radius: 8px;
border-width: 1px;
border-color: #E2E6ED;
`;

const RequestReviseInfoContainer = Styled.View`
padding-top: 22px;
padding-left: 16px;
padding-right: 0px;
align-self: flex-start;
`;

const RequestReviseInfoTextContainer = Styled.View`
width: 109px;
padding-bottom: 1px;
border-bottom-width: 1px;
padding-bottom: 1px;
`;

const RequestReviseInfoText = Styled.Text`
width: 120px;
font-weight: bold;
font-size: 14px;
line-height: 24px;
color: #131F3C;
`;

const CopyrightDescipContainer = Styled.View`
margin-top: 16px;
padding-left: 16px;
padding-right: 16px;
`;

const CopyrightDescipText = Styled.Text`
font-weight: 400;
color: #9AA2A9;
font-size: 12px;
line-height: 24px;
`;

const WeeklyTreatmentTimeInfoContainer = Styled.View`
margin-top: 16px;
`;

const AddressContainer = Styled.View`
margin-top: 9px;
flex-direction: row;
align-items: center;
`;

const AddressMarkerIcon = Styled.Image`
width: ${wp('4.266%')}px;
height: ${wp('4.266%')}px;
`;

const DentistInfoListContainer = Styled.View`
`;

const ReviewTabContainer = Styled.View`
`;


const NoReviewContainer = Styled.View`
width: ${wp('100%')}px;
align-items: center;
padding-top: ${hp('1.9%')}px;
`;

const PostNoReviewCardContainer = Styled.View`
width: ${wp('91.46%')}px;
height: ${wp('52%')}px;
background-color: #ffffff;
border-radius: 12px;
align-items: center;
justify-content: center;
`;

const NoReviewEmoji = Styled.Image`
width: ${wp('5.6%')}px;
height: ${wp('5.6%')}px;
`;

const NoReviewText = Styled.Text`
margin-top: 8px;
line-height: 24px;
font-weight: 700; 
font-size: 16px;
color: #131F3C;
`;

const PostNoReviewContainer = Styled.View`
flex-direction: row;
align-items: center;
`;

const PostNoReviewButton = Styled.View`
margin-top: 12px;
padding-top: 12px;
padding-bottom: 12px;
padding-left: 20px;
padding-right: 20px;
border-radius: 100px;
border-width: 1px;
border-color: #E2E6ED;
`;

const PostNoReviewText = Styled.Text`
color: #00D1FF;
font-weight: 700;
font-size: 16px;
line-height: 24px;
`;

const PostNoReviewArrowIcon = Styled.Image`
margin-left: 2px;
width: ${wp('3.2%')}px;
height: ${wp('3.2%')}px;
`;


const RatingContainer = Styled.View`
margin-top: 11px;
flex-direction: row;
align-items: center;
`;

const EvaluationContainer = Styled.View`
margin-top: 11px;
flex-direction: row;
align-items: center;
`;

const RecommendIcon = Styled.Image`
width: ${wp('5%')}px;
height: ${wp('5%')}px;
`;

const RecommendCountText = Styled.Text`
margin-left: 3.5px;
font-weight: 700;
font-size: 14px;
line-height: 18px;
color: #00D1FF;
`;

const VerticalDividerBar = Styled.View`
margin-left: 4px;
margin-right: 4px;
width: 0.9px;
height: ${hp('1.1%')}px;
background-color: #E2E6ED;
`;

const ReviewCountText = Styled.Text`
font-weight: 400;
font-size: 14px;
line-height: 18px;
color: #9AA2A9;
`;

const RatingStarListContainer = Styled.View`
margin-top: 11px;
flex-direction: row;
align-items: center;
`;

const RatingStarIcon = Styled.Image`
width: ${wp('4.266%')}px;
height: ${wp('4.266%')}px;
`;

const IntroKeywordListContainer = Styled.View`
flex-direction: row
align-items: center;
`;

const IntroKeywordItemContainer = Styled.View`
background-color: #ffffff;
border-radius: 100px;
border-width: 0.5px;
border-color: #E2E6ED;
padding: 4px 12px 4px 5px;
flex-direction: row;
align-items: center;
`;

const IntroKeywordIcon = Styled.Image`
width: ${wp('7.46%')}px;
height: ${wp('7.46%')}px;
`;

const IntroKeywordText = Styled.Text`
margin-left: 4px;
font-weight: 700;
font-size: 14px;
line-height: 24px;
color: #4E525D;
`;

const ScrollTopContainer = Styled.View`
border-radius: 100px;
width: ${wp('9.6%')}px;
height: ${wp('9.6%')}px;
`;

const ScrollTopShadow = Styled.View`
position: absolute;
border-radius: 100px;
width: ${wp('8%')}px;
height: ${wp('8%')}px;
`;

const DentalEvaluationContainer = Styled.View`
margin-top: 11px;
`;


let isReachedTop = false;

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const tabBarHeight = hasNotch() ?  hp('6.77%') : hp("8.5%");
const collapsibleViewHeight = hasNotch() ? hp('38.54%') : hp('45.5%');
const detailInfoTypeHeight = hasNotch() ? hp('10.83%') : hp('15%');
const headerHeight = getStatusBarHeight() + hp('8%');
const SafeStatusBar = Platform.select({
  ios: 44,
  android: StatusBar.currentHeight,
});

interface Props {
  navigation: any,
  goBack: () => void,
  dentalDetailInfo: any,
  dentalImageArray: Array<any>,
  moveToReviewUpload: () => void,
  moveToDentalLocationMap: () => void,
  moveToDentalInfoEdit: () => void,
  moveToAnotherProfile: (userId: string, nickname: string, profileImageUri: string) => void,moveToReviewDetail: (
    reviewId: number,
    writer: object,
    createdAt: string,
    treatmentArray: Array<object>,
    ratingObj: Object,
    treatmentDate: string,
    imageArray: Array<object>,
    isCurUserLike: boolean,
    likeCount: number,
    commentCount: number,
    isCurUserScrap: boolean,
    dentalObj: object,
    visibleElapsedTime: boolean,
    elapsedTime: string,
  ) => void;
  dentalReviewArray: Array<any>,
  isNoDentalImage: boolean,
}

const DentalCollapsibleTabView = ({navigation, goBack, dentalDetailInfo, dentalImageArray, moveToReviewUpload, moveToDentalLocationMap, moveToDentalInfoEdit, dentalReviewArray, moveToAnotherProfile, moveToReviewDetail, isNoDentalImage}: Props) => {
  console.log("DentalCollapsibleTabView dentalDetailInfo", dentalDetailInfo);
  console.log("DentalCollapsibleTabView dentalReviewArray", dentalReviewArray);

  const [tabIndex, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'detailInfo', title: '상세 정보'},
    {key: 'review', title: '리뷰'},
  ]);
  const [isVisibleScrollTop, setIsVisibleScrollTop] = useState<boolean>(false);

  // ref
  const scrollTopScale = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;
  const tabScrollX = useRef(new Animated.Value(0)).current;
  const headerScrollY = useRef(new Animated.Value(0)).current;
  const listRefArr = useRef([]);
  const listOffset = useRef({});
  const isListGliding = useRef(false);
  const headerScrollStart = useRef(0);
  const _tabIndex = useRef(0);
  const isChangingInfoTypeIndex = useRef<boolean>(false);

  const headerOpacity = scrollY.interpolate({
    inputRange: [hp('18%'), hp('28%')],
    outputRange: [0, 1.4],
    extrapolate: 'clamp',
  });

  const backIconColor = scrollY.interpolate({
    inputRange: [hp('18%'), hp('28%')],
    outputRange: ["rgb(255,255,255)", "rgb(19,31,60)"],
  })

  const formatTreatmentSubjectList = useCallback(() => {
  
      console.log("formatTreatmentSubjectList 함수 실행");

      const treatmentList = dentalDetailInfo.clinicInfoBody.treatmentSubject;
      let treatmentSubjectList = new Array();
      for(var i = 0; i < treatmentList.length ; i++) {
        treatmentSubjectList.push(treatmentList[i].name)
      }
  
      return treatmentSubjectList;

    }, [dentalDetailInfo]);

  const formatSpecialistTreatmentSubjectList = (treatmentList: any) => {

    let treatmentSubjectList = new Array();
    for(var i = 0; i < treatmentList.length ; i++) {
      
      if(treatmentList[i].Clinic_subject.SpecialistDentist_NUM > 0) {
        treatmentSubjectList.push(treatmentList[i].name)
      }
    }

    return treatmentSubjectList;
   }

   const formatSpecialTreatmentSubjectList = (specialTreatmentArr: any) => {

    let tmpArray = new Array();
    for(var i = 0; i < specialTreatmentArr.length; i++) {
      tmpArray.push(specialTreatmentArr[i].name)
    }

    return tmpArray;
   }

  const basicInfo = dentalDetailInfo?.clinicInfoHeader;
  const introduction = dentalDetailInfo.clinicInfoBody.description;
  const treatmentTimeInfo = dentalDetailInfo.clinicInfoBody.treatmentTime;
  const locationInfo = dentalDetailInfo.clinicInfoBody.location;
  const treatmentSubjectInfoArr = formatTreatmentSubjectList()
  const specialistTreatmentSubjectInfoArr = formatSpecialistTreatmentSubjectList(dentalDetailInfo.clinicInfoBody.treatmentSubject)
  const specialTreatmentInfoArr = formatSpecialTreatmentSubjectList(dentalDetailInfo.clinicInfoBody.SpecialTreatment);
  const dentistInfo = dentalDetailInfo.clinicInfoBody.dentistInfo;
  const parkingInfo = dentalDetailInfo.clinicInfoBody.parkingInfo;

  const todayIndex = new Date().getDay();
  

   console.log("진료과목 정보 treatmentSubjectInfoArr", treatmentSubjectInfoArr);
   console.log("특별진려과목 정보 specialTreatmentInfo", specialTreatmentInfoArr);
   console.log("진료시간 treatmentTimeInfo", treatmentTimeInfo);
   console.log("진료시간 treatmentTimeInfo.weekday.thu", treatmentTimeInfo.weekday.thu);

   const getCuttedAddress = (fullAddress: string) => {
     const splitedAddress = fullAddress.split(" ");

     return splitedAddress[0] + " " + splitedAddress[1] + " " + splitedAddress[2] + " " + splitedAddress[3];
   }

   const introKeywordArray = new Array();

   if(basicInfo?.launchDate) {

    const tmpLaunchDate = {
      launchDate: basicInfo.launchDate,
      type: "launchDate",
    }
     introKeywordArray.push(tmpLaunchDate)
   }

   if(basicInfo?.dentalTransparent === true) {
     const tmpDentalTransparent = {
       type: 'dentalTransparent'
     }
     introKeywordArray.push(tmpDentalTransparent)
   }

   if(basicInfo?.specialistDentist > 0) {
     const tmpSpecialistDentist = {
       type: 'specialistDentist',
       specialistDentist: dentistInfo.specialistDentist,
     }
     introKeywordArray.push(tmpSpecialistDentist);
   }

  /**
   * PanResponder for header
   */
  const collapsibleViewPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,
      onStartShouldSetPanResponder: (evt, gestureState) => {
        headerScrollY.stopAnimation();
        syncScrollOffset();
        return false;
      },

      onMoveShouldSetPanResponder: (evt, gestureState) => {
        headerScrollY.stopAnimation();
        return Math.abs(gestureState.dy) > 5;
      },

      onPanResponderRelease: (evt, gestureState) => {
        syncScrollOffset();
        if (Math.abs(gestureState.vy) < 0.2) {
          return;
        }
        headerScrollY.setValue(scrollY._value);
        Animated.decay(headerScrollY, {
          velocity: -gestureState.vy,
          useNativeDriver: true,
        }).start(() => {
          syncScrollOffset();
        });
      },
      onPanResponderMove: (evt, gestureState) => {
        listRefArr.current.forEach((item) => {
          if (item.key !== routes[_tabIndex.current].key) {
            return;
          }
          if (item.value) {
            item.value.scrollTo({
              y: -gestureState.dy + headerScrollStart.current,
              animated: false,
            });
          }
        });
      },
      onShouldBlockNativeResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        headerScrollStart.current = scrollY._value;
      },
    }),
  ).current;

  /**
   * PanResponder for list in tab scene
   */
  const tabPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,
      onStartShouldSetPanResponder: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        headerScrollY.stopAnimation();
        return false;
      },
      onShouldBlockNativeResponder: () => false,
      onPanResponderGrant: (evt, gestureState) => {
        headerScrollY.stopAnimation();
      },
      onPanResponderMove: Animated.event([
        null,
        {
          moveX: tabScrollX,
        },
      ]),
    }),
  ).current;

  /**
   * effect
   */
  useEffect(() => {
    scrollY.addListener(({value}) => {
      const curRoute = routes[tabIndex].key;
      listOffset.current[curRoute] = value;
    });

    headerScrollY.addListener(({value}) => {
      listRefArr.current.forEach((item) => {
        if (item.key !== routes[tabIndex].key) {
          return;
        }
        if (value > collapsibleViewHeight || value < 0) {
          headerScrollY.stopAnimation();
          syncScrollOffset();
        }
        if (item.value && value <= collapsibleViewHeight) {
          item.value.scrollTo({
            y: value,
            animated: false,
          });
        }
      });
    });
    return () => {
      scrollY.removeAllListeners();
      headerScrollY.removeAllListeners();
    };
  }, [routes, tabIndex]);

  /**
   *  helper functions
   */
  const syncScrollOffset = () => {
    const curRouteKey = routes[_tabIndex.current].key;

    listRefArr.current.forEach((item) => {
      if (item.key !== curRouteKey) {
        if (scrollY._value < collapsibleViewHeight && scrollY._value >= 0) {
          if (item.value) {
            item.value.scrollTo({
              y: scrollY._value,
              animated: false,
            });
            listOffset.current[item.key] = scrollY._value;
          }
        } else if (scrollY._value >= collapsibleViewHeight) {
          if (
            listOffset.current[item.key] < collapsibleViewHeight ||
            listOffset.current[item.key] == null
          ) {
            if (item.value) {
              item.value.scrollTo({
                y: collapsibleViewHeight,
                animated: false,
              });
              listOffset.current[item.key] = collapsibleViewHeight;
            }
          }
        }
      }
    });
  };

  const onMomentumScrollBegin = () => {
    isListGliding.current = true;
  };

  const onMomentumScrollEnd = () => {
    isListGliding.current = false;
    syncScrollOffset();
  };

  const onScrollEndDrag = () => {
    syncScrollOffset();
  };

  const getEstablishedElapsedYear = useCallback(
    (establishedDate) => {
      const splitedDate = establishedDate.split('-');
      const currentYear = new Date().getFullYear();

      return currentYear - Number(splitedDate[0]);
    },
    [dentalDetailInfo?.clinicInfoHeader?.launchDate],
  );

  const openDentalWebsite = async (url: string) => {
    // TEST용 url
    //url = "http://www.marudental.com/?gclid=CjwKCAiAudD_BRBXEiwAudakX8qynWvVNaNUSpXQkh2FPPsbeTaGd-RK18o5fA5hpbmencfiqp7rcBoCkwAQAvD_BwE"

    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert('병원의 웹사이트로 이동 할 수 없습니다.');
    }
  };

  const scrollToTop = () => {
    listRefArr.current[0].value.scrollTo({
      y: 0,
      animated: true,
    })
    listRefArr.current[1].value.scrollTo({
      y: 0,
      animated: true,
    })
  }

  /**
   * render Helper
   */
  const renderCollapsibleView = () => {
    const y = scrollY.interpolate({
      inputRange: [0, collapsibleViewHeight],
      outputRange: [0, -collapsibleViewHeight],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        {...collapsibleViewPanResponder.panHandlers}
        style={[styles.collapsibleView, {transform: [{translateY: y}]}]}>
        <CollapsibleContainer>
            <CoverImageContainer>

                <CoverImage
                source={
                  isNoDentalImage
                  ? require('~/Assets/Images/Dental/noDentalImage.png')
                  : {uri: dentalImageArray[0].img_url}}/>
            </CoverImageContainer>
            <BasicInfoContainer style={styles.basicInfoShadow}>
                <DentalNameText>{basicInfo?.originalName}</DentalNameText>
                <AddressContainer>
                <AddressMarkerIcon
                source={require('~/Assets/Images/Dental/ic_addressMarker.png')}/>
                <DentalAddressText>{getCuttedAddress(basicInfo.address)}</DentalAddressText>
                </AddressContainer>
                {/* <RatingContainer>
                  <RatingStarList
                  reviewCount={basicInfo?.reviewNum}
                  ratingValue={basicInfo?.reviewAVGStarRate?.all?.toFixed(1)}/>
                </RatingContainer> */}
                <DentalEvaluationContainer>
                <DentalEvaluation
                recommendCount={basicInfo?.recommendNum}
                reviewCount={basicInfo?.reviewNum}/>
                </DentalEvaluationContainer>
            </BasicInfoContainer>
            </CollapsibleContainer>
      </Animated.View>
    );
  };

  const renderLabel = ({route, focused}) => {
    return (
      <Text style={[styles.label, {color: focused ? '#131F3C' : '#9AA2A9'}]}>
        {route.title}
      </Text>
    );
  };

  const renderScene = ({route}) => {
    const focused = route.key === routes[tabIndex].key;
    let numCols;
    let data;
    let renderTabScene;
    switch (route.key) {
      case 'detailInfo':

        const renderIntroKeywordArray = ({item, index}: any) => {
          if(item.type === "launchDate") {
            return (
                <IntroKeywordItemContainer style={[styles.introKeywordShadow, , {marginRight: 8}]}>
                  <IntroKeywordIcon
                  source={require('~/Assets/Images/Dental/ic_establish.png')}/>
                  <IntroKeywordText>
                    {`설립 ${getEstablishedElapsedYear(item.launchDate)}년차`}
                  </IntroKeywordText>
                </IntroKeywordItemContainer>
            )
          } else if(item.type === 'dentalTransparent') {
            return (
                <IntroKeywordItemContainer style={[styles.introKeywordShadow]}>
                  <IntroKeywordIcon
                  source={require('~/Assets/Images/Dental/ic_goodHospital.png')}/>
                  <IntroKeywordText>
                  {'우리동네좋은치과 지정'}
                  </IntroKeywordText>
                </IntroKeywordItemContainer>
            )
          } else if(item.type === 'specialistDentist') {
            return (
              <IntroKeywordItemContainer  style={styles.introKeywordShadow}>
                <IntroKeywordIcon
                source={require('~/Assets/Images/Dental/ic_doctor.png')}/>
                <IntroKeywordText>
                  {`전문의 ${item.specialistDentist}명`}
                </IntroKeywordText>
              </IntroKeywordItemContainer>
            )
          } else {
            return (
              <View/>
            )
          }
        }

        return (
          <Animated.ScrollView
            {...tabPanResponder.panHandlers}
            ref={(ref) => {
              if (ref) {
                const found = listRefArr.current.find(
                  (e) => e.key === route.key,
                );
                if (!found) {
                  listRefArr.current.push({
                    key: route.key,
                    value: ref,
                  });
                }
              }
            }}
            scrollEventThrottle={16}
            onScroll={
              focused
                ? Animated.event(
                    [
                      {
                        nativeEvent: {
                          contentOffset: {
                            y: scrollY,
                          },
                        },
                      },
                    ],
                    {
                      useNativeDriver: true,
                      listener: event => {
                        if(scrollY._value > (collapsibleViewHeight - headerHeight) && !isVisibleScrollTop) {
                          setIsVisibleScrollTop(true)
                          scrollTopScale.setValue(0.7);
                          Animated.spring(scrollTopScale, {
                            toValue: 1,
                            friction: 6,
                            tension: 400,
                            useNativeDriver: true,
                          }).start();
                        } else if(scrollY._value < (collapsibleViewHeight - headerHeight) && isVisibleScrollTop) {
                          setIsVisibleScrollTop(false)
                          //scrollTopScale.setValue(0);
                          Animated.timing(scrollTopScale, {
                            toValue: 0,
                            duration: 70,
                            useNativeDriver: true,
                          }).start();

                        }
                      }
                    },
                  )
                : null
            }
            onMomentumScrollBegin={onMomentumScrollBegin}
            onScrollEndDrag={onScrollEndDrag}
            onMomentumScrollEnd={onMomentumScrollEnd}
            contentContainerStyle={{
              paddingTop: collapsibleViewHeight + tabBarHeight,
              backgroundColor: '#F5F7F9',
              paddingBottom: hp('17%'),
            }}
            keyboardShouldPersistTaps={"always"}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            ><DetailInfoTabContainer>
            <DetailInfoIntroKeywordContainer>
              <DetailInfoLabelText
              style={{paddingTop: 24, paddingLeft: 16, paddingRight: 16}}>{"병원 소개"}</DetailInfoLabelText>
              <IntroKeywordListContainer>
                <FlatList
                contentContainerStyle={{paddingTop: 12, paddingLeft: 16, paddingRight: 16, paddingBottom: 24}}
                data={introKeywordArray}
                renderItem={renderIntroKeywordArray}
                keyExtractor={(item: any, index: number) => `${index}`}
                numColumns={2}/>
              </IntroKeywordListContainer>
            </DetailInfoIntroKeywordContainer>
            <DetailInfoItemContainer>
              <DetailInfoLabelText>{"진료 시간"}</DetailInfoLabelText>
              <WeeklyTreatmentTimeInfoContainer>
              <WeeklyTreatmentTimeInfo
              todayIndex={todayIndex}
              treatmentTimeInfo={treatmentTimeInfo}/>
              </WeeklyTreatmentTimeInfoContainer>
            </DetailInfoItemContainer>
            <DetailInfoItemContainer>
              <DetailInfoLabelText>{"위치 정보"}</DetailInfoLabelText>
              <DetailAddressText>{locationInfo.address.length > 0 ? locationInfo.address : "-"}</DetailAddressText>
              <TouchableWithoutFeedback onPress={() => moveToDentalLocationMap()}>
              <DentalStaticMapImage
              source={{uri: locationInfo.clinicStaticMap}}/>
              </TouchableWithoutFeedback>
            </DetailInfoItemContainer>
            <DetailInfoItemContainer>
              <DetailInfoLabelText>{"진료 과목"}</DetailInfoLabelText>
              {treatmentSubjectInfoArr.length > 0 && (
                <DetailInfoDescripText>{treatmentSubjectInfoArr.join(", ")}</DetailInfoDescripText>
              )}
              {treatmentSubjectInfoArr.length === 0 && (
                <DetailInfoDescripText>{"-"}</DetailInfoDescripText>
              )}
            </DetailInfoItemContainer>
            <DetailInfoItemContainer>
              <DetailInfoLabelText>{"특수 진료 장비"}</DetailInfoLabelText>
              <DetailInfoDescripText>{"-"}</DetailInfoDescripText>
            </DetailInfoItemContainer>
            <DetailInfoItemContainer>
              <DetailInfoLabelText>{"전문 및 특수 진료 항목"}</DetailInfoLabelText>
              {specialTreatmentInfoArr.length > 0 && (
                  <DetailInfoDescripText>{specialTreatmentInfoArr.join(". ")}</DetailInfoDescripText>
              )}
              {specialTreatmentInfoArr.length === 0 && (
                  <DetailInfoDescripText>{"-"}</DetailInfoDescripText>
              )}
            </DetailInfoItemContainer>
              <DetailInfoItemContainer>
                <DetailInfoLabelText>{'의사 정보'}</DetailInfoLabelText>
                <DentistInfoListContainer>
                  {dentistInfo.specialListDentist > 0 && (
                    <DetailInfoDescripText>{`전문의 ${dentistInfo.specialistDentist}명(${specialistTreatmentSubjectInfoArr.join(", ")})`}</DetailInfoDescripText>
                  )}
                  {dentistInfo.generalDentist > 0 && (
                    <DetailInfoDescripText>{`일반의 ${dentistInfo.generalDentist}명`}</DetailInfoDescripText>
                  )}
                  {(dentistInfo.generalDentist == 0 && dentistInfo.specialistDentist == 0) && (
                    <DetailInfoDescripText>{'-'}</DetailInfoDescripText>
                  )}
                  {/* {dentistInfo.resident !== null && (
                    <DetailInfoDescripText>{`레지던트 ${dentistInfo.resident}명`}</DetailInfoDescripText>
                  )}
                  {dentistInfo.intern !== null && (
                    <DetailInfoDescripText>{`인턴 ${dentistInfo.intern}명`}</DetailInfoDescripText>
                  )} */}
                </DentistInfoListContainer>
              </DetailInfoItemContainer>
              <DetailInfoItemContainer style={{borderWidth: 0}}>
                <DetailInfoLabelText>{'주차 정보'}</DetailInfoLabelText>
                {parkingInfo.parkingAllowNum === 0 &&
                  parkingInfo.parkingCost === '' &&
                  parkingInfo.parkingNotice === '' && (
                    <DetailInfoDescripText>{'-'}</DetailInfoDescripText>
                  )}
                {parkingInfo.parkingAllowNum > 0 && (
                  <DetailInfoDescripText>{`주차 가능 차수 ${parkingInfo.parkingAllowNum}대`}</DetailInfoDescripText>
                )}
                {(parkingInfo.parkingCost !== '' && parkingInfo.parkingCost !== 'N' && parkingInfo.parkingCost >= 0) && (
                  <DetailInfoDescripText>{`주차 비용 ${parkingInfo.parkingCost}원`}</DetailInfoDescripText>
                )}
                {parkingInfo.parkingNotice !== '' && parkingInfo.parkingNotice !== 'nan' && (
                  <DetailInfoDescripText style={{marginTop: 3}}>{`${parkingInfo.parkingNotice}`}</DetailInfoDescripText>
                )}
              </DetailInfoItemContainer>
              <RequestReviseInfoContainer>
                <TouchableWithoutFeedback onPress={() => moveToDentalInfoEdit()}>
                <RequestReviseInfoTextContainer>
                  <RequestReviseInfoText>
                    {'정보 수정 요청하기'}
                  </RequestReviseInfoText>
                </RequestReviseInfoTextContainer>
                </TouchableWithoutFeedback>
              </RequestReviseInfoContainer>
              <CopyrightDescipContainer>
                <CopyrightDescipText>
                  병원정보는 건강보험심사평가원의 의료 빅데이터 및 해당 병원이
                  제공한 정보를 기반으로 작성되었습니다. 본 컨텐츠의 저작권은
                  제공처에 있으며, 저작권법의 보호를 받습니다.
                </CopyrightDescipText>
              </CopyrightDescipContainer>
            </DetailInfoTabContainer>
          </Animated.ScrollView>
        );
      case 'review':
        return (
          <Animated.ScrollView
            {...tabPanResponder.panHandlers}
            ref={(ref) => {
              if (ref) {
                const found = listRefArr.current.find(
                  (e) => e.key === route.key,
                );
                if (!found) {
                  listRefArr.current.push({
                    key: route.key,
                    value: ref,
                  });
                }
              }
            }}
            scrollEventThrottle={16}
            onScroll={
              focused
                ? Animated.event(
                    [{nativeEvent: {contentOffset: {y: scrollY}}}],
                    {
                      useNativeDriver: true,
                      listener: event => {
                        if(scrollY._value > (collapsibleViewHeight - headerHeight) && !isVisibleScrollTop) {
                          setIsVisibleScrollTop(true)
                          scrollTopScale.setValue(0.7);
                          Animated.spring(scrollTopScale, {
                            toValue: 1,
                            friction: 6,
                            tension: 400,
                            useNativeDriver: true,
                          }).start();
                        } else if(scrollY._value < (collapsibleViewHeight - headerHeight) && isVisibleScrollTop) {
                          setIsVisibleScrollTop(false)
                          //scrollTopScale.setValue(0);
                          Animated.timing(scrollTopScale, {
                            toValue: 0,
                            duration: 70,
                            useNativeDriver: true,
                          }).start();

                        }
                      }
                    },
                  )
                : null
            }
            keyboardShouldPersistTaps={"always"}
            onMomentumScrollBegin={onMomentumScrollBegin}
            onScrollEndDrag={onScrollEndDrag}
            onMomentumScrollEnd={onMomentumScrollEnd}
            ListHeaderComponent={() => <View style={{height: 10}} />}
            contentContainerStyle={{
              paddingTop: collapsibleViewHeight + tabBarHeight,
              backgroundColor: '#F5F7F9',
              paddingBottom: hp('17%'),
            }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <ReviewTabContainer>
              {dentalReviewArray?.length > 0 && (
                <ReviewInfoContainer>
                  <PostReviewContainer>
                    <PostReviewDescipText>
                      병원의 리뷰를 작성하고 {`\n`}아메리카노 기프티콘을 받아가세요!
                    </PostReviewDescipText>
                    <TouchableWithoutFeedback onPress={() => moveToReviewUpload()}>
                    <PostReviewButton>
                      <PostReviewEmojiIcon
                      source={require('~/Assets/Images/Emoji/em_post.png')}/>
                      <PostReviewText>
                        리뷰참여
                      </PostReviewText>
                    </PostReviewButton>
                    </TouchableWithoutFeedback>
                  </PostReviewContainer>
                  {dentalDetailInfo.clinicInfoHeader.reviewAVGStarRate.all && (
                    <RatingReportContainer>
                      <RatingReport
                        avgRating={
                          dentalDetailInfo.clinicInfoHeader.reviewAVGStarRate
                            .all
                        }
                        priceRating={
                          dentalDetailInfo.clinicInfoHeader.reviewAVGStarRate
                            .cost
                        }
                        serviceRating={
                          dentalDetailInfo.clinicInfoHeader.reviewAVGStarRate
                            .service
                        }
                        treatRating={
                          dentalDetailInfo.clinicInfoHeader.reviewAVGStarRate
                            .treatment
                        }
                      />
                    </RatingReportContainer>
                  )}
                  <ReviewListContainer>
                  <ReviewList
                  navigation={navigation}
                  reviewList={dentalReviewArray}/>
                  </ReviewListContainer>
                  <RequestReviseInfoContainer>
                  <TouchableWithoutFeedback onPress={() => moveToDentalInfoEdit()}>
                  <RequestReviseInfoTextContainer>
                  <RequestReviseInfoText>
                    {'정보 수정 요청하기'}
                  </RequestReviseInfoText>
                </RequestReviseInfoTextContainer>
                </TouchableWithoutFeedback>
              </RequestReviseInfoContainer>
              <CopyrightDescipContainer>
                <CopyrightDescipText>
                  병원정보는 건강보험심사평가원의 의료 빅데이터 및 해당 병원이
                  제공한 정보를 기반으로 작성되었습니다. 본 컨텐츠의 저작권은
                  제공처에 있으며, 저작권법의 보호를 받습니다.
                </CopyrightDescipText>
              </CopyrightDescipContainer>
                </ReviewInfoContainer>
              )}
              {dentalReviewArray?.length === 0 && (
                <NoReviewContainer
                  style={{
                    minHeight: hp('100%') - (headerHeight + tabBarHeight),
                  }}>
                    <PostNoReviewCardContainer style={styles.postReviewCardShadow}>
                      <NoReviewEmoji
                      source={require('~/Assets/Images/Emoji/em_crying.png')}/>
                      <NoReviewText>{"아직은 리뷰가 없네요."}</NoReviewText>
                      <TouchableWithoutFeedback onPress={() => moveToReviewUpload()}>
                      <PostNoReviewButton>
                        <PostNoReviewContainer>
                        <PostNoReviewText>
                          {"첫번째 리뷰"}
                          <PostNoReviewText
                          style={{color: "#131F3C"}}
                          >{" 남기러 가기"}</PostNoReviewText>
                        </PostNoReviewText>
                        <PostNoReviewArrowIcon
                        source={require('~/Assets/Images/Arrow/ic_postReviewArrow.png')}/>
                        </PostNoReviewContainer>
                      </PostNoReviewButton>
                      </TouchableWithoutFeedback>
                    </PostNoReviewCardContainer>
              <RequestReviseInfoContainer>
                <TouchableWithoutFeedback onPress={() => moveToDentalInfoEdit()}>
                <RequestReviseInfoTextContainer>
                  <RequestReviseInfoText>
                    {'정보 수정 요청하기'}
                  </RequestReviseInfoText>
                </RequestReviseInfoTextContainer>
                </TouchableWithoutFeedback>
              </RequestReviseInfoContainer>
              <CopyrightDescipContainer>
                <CopyrightDescipText>
                  병원정보는 건강보험심사평가원의 의료 빅데이터 및 해당 병원이
                  제공한 정보를 기반으로 작성되었습니다. 본 컨텐츠의 저작권은
                  제공처에 있으며, 저작권법의 보호를 받습니다.
                </CopyrightDescipText>
              </CopyrightDescipContainer>
                </NoReviewContainer>
              )}
            </ReviewTabContainer>
          </Animated.ScrollView>
        );
        break;
      default:
        return null;
    }
  };

  const renderTabBar = (props) => {
    const y = scrollY.interpolate({
      inputRange: [0, collapsibleViewHeight - headerHeight],
      outputRange: [collapsibleViewHeight, headerHeight],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        style={{
          top: 0,
          zIndex: 1,
          position: 'absolute',
          transform: [{translateY: y}],
          width: '100%',
        }}>

        <TabBar
          {...props}
          onTabPress={({route, preventDefault}) => {
            if (isListGliding.current) {
              preventDefault();
            }
          }}
          inactiveColor={{fontColor: '#9AA2A9'}}
          style={styles.tab}
          renderLabel={renderLabel}
          indicatorContainerStyle={styles.indicatorContainer}
          indicatorStyle={styles.indicator}
        />
      </Animated.View>
    );
  };

  const renderTabView = () => {
    return (
      <TabView
        onIndexChange={(id) => {
          _tabIndex.current = id;
          setIndex(id);
        }}
        navigationState={{index: tabIndex, routes}}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        initialLayout={{
          height: 0,
          width: windowWidth,
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      {renderTabView()}
      {renderCollapsibleView()}
      <HeaderBar>
      <Animated.View
      style={[styles.header, {opacity: headerOpacity}]}>
          <HeaderTitleText>{dentalDetailInfo?.clinicInfoHeader?.originalName}</HeaderTitleText>
      </Animated.View>
        <TouchableWithoutFeedback onPress={() => goBack()}>
          <HeaderLeftContainer>
            <Animated.Image
              source={require('~/Assets/Images/HeaderBar/ic_back.png')}
            />
          </HeaderLeftContainer>
        </TouchableWithoutFeedback>
      </HeaderBar>
        <TouchableWithoutFeedback onPress={() => scrollToTop()}>
        <ScrollTopContainer style={styles.scrollTopButton}>
        {isVisibleScrollTop && (
        <ScrollTopShadow
        style={styles.scrollTopShadow}/>
        )}
        <Animated.Image
        style={[{
          borderRadius: 100,
          backgroundColor: "#FFFFFF",
          transform: [{scale: scrollTopScale}]
        }]}
        source={require('~/Assets/Images/Dental/ic_scrollTop.png')}/>
        
        </ScrollTopContainer>
        </TouchableWithoutFeedback>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  collapsibleView: {
    width: '100%',
    height: collapsibleViewHeight,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  header: {
    position: 'absolute',
    paddingTop: hasNotch() ? getStatusBarHeight() : 0,
    width: wp('100%'),
    height: getStatusBarHeight() + hp('8%'),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingLeft: wp('10.6%'),
  },
  label: {fontSize: 16, color: '#131F3C', fontWeight: '700'},
  tab: {
    elevation: 0,
    shadowOpacity: 0,
    backgroundColor: '#ffffff',
    height: tabBarHeight,
    justifyContent: 'center',
    alignContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#F0F0F0',
  },
  indicatorContainer: {
    width: wp('100%'),
    backgroundColor: '#ffffff',
  },
  indicator: {
    backgroundColor: '#00D1FF',
    height: 2,
  },
  introKeywordShadow: {
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.06,
    shadowRadius: 5,
  },
  basicInfoShadow: {
    shadowOffset: {
      width: 0,
      height: -20,
    },
    shadowRadius: 15,
    shadowOpacity: 0.15,
  },
  scrollTopButton: {
    borderRadius: 100,
    position: "absolute",
    bottom: hp('15.27%'),
    right: 16,
    width: wp('9.6%'),
    height: wp('9.6%'),
  },
  scrollTopShadow: {
    backgroundColor: "#ffffff",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 10,
    shadowOpacity: 0.07,
  },
  postReviewCardShadow: {
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 10,
    shadowOpacity: 0.08,
  }
});

export default DentalCollapsibleTabView;


/*
<BasicInfoItemDivider
            style={{marginTop: 24}}/>
            <BasicInfoItemContainer>
                <BasicInfoLabelText>{"설립"}</BasicInfoLabelText>
                <BasicInfoLabelDivider/>
                <BasicInfoValueText>{`${getEstablishedElapsedYear(dentalDetailInfo?.clinicInfoHeader?.launchDate)}년`}</BasicInfoValueText>
            </BasicInfoItemContainer>
            <BasicInfoItemDivider/>
            {dentalDetailInfo.clinicInfoHeader.website.length > 0 && (
            <BasicInfoItemContainer>
                <BasicInfoLabelText>{"홈페이지"}</BasicInfoLabelText>
                <BasicInfoLabelDivider/>
                <TouchableWithoutFeedback onPress={() => openDentalWebsite(dentalDetailInfo.clinicInfoHeader.website)}>
                <BasicInfoValueText>{"바로가기"}</BasicInfoValueText>
                </TouchableWithoutFeedback>
            </BasicInfoItemContainer>
            )}
*/