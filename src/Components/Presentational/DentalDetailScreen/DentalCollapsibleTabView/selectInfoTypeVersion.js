import React, {useState, useEffect, useRef} from 'react';
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
  Alert,
  StatusBar,
  ActivityIndicator,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableWithoutFeedbackBase,
} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import {getStatusBarHeight} from 'react-native-status-bar-height'
import {Rating} from 'react-native-ratings';

// Local Component
import ReviewList from '~/Components/Presentational/ReviewList';
import ShowingRating from '~/Components/Presentational/ShowingRating';
import RatingReport from '~/Components/Presentational/RatingReport';
const ratingStarImage = require('~/Assets/Images/Indicator/ic_starRating.png');
;
const Container = Styled.View`
 flex: 1;
 background-color: #ffffff;
`;

const CollapsibleContainer = Styled.View`
flex: 1;
width: ${wp('100%')}px;
height: ${hp('66.6%')}px;
align-items: center;
background-color: #ffffff;
border-bottom-width: 8px;
border-color: #F5F7F9;
`;

const HeaderBar = Styled.View`
 position: absolute;
 padding-top: ${getStatusBarHeight()}
 width: ${wp('100%')}px;
 height: ${getStatusBarHeight() + hp('8%')}px;
 flex-direction: row;
 align-items: center;
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
font-weight: 700;
font-size: 18px;
color: #000000;
`;

const CoverImageContainer = Styled.View`
width: ${wp('100%')};
height: ${hp('31.5%')};
`;

const CoverImage = Styled.Image`
width: ${wp('100%')};
height: ${hp('31.5%')};
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
font-family: NanumSquare;
`;

const ContentContainer = Styled.View`
flex: 1;
background-color: #ffffff;
`;

const BasicInfoContainer = Styled.View`
width: ${wp('100%')}px;
padding-top: 12px;
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
font-family: NanumSquare;
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
font-family: NanumSquare;
`;

const BasicHeaderContainer = Styled.View`
flex-direction: row;
align-items: center;
justify-content: space-between;
`;

const NameRatingContainer = Styled.View`
flex-direction: row;
align-items:center;
`;

const DentalNameText = Styled.Text`
font-weight: 800;
font-size: 20px;
color: #000000;
font-family: NanumSquare;
`;

const RatingStarIcon = Styled.Image`
`;

const RatingText = Styled.Text`
margin-top: 12px;
font-weight: bold;
color: #000000;
font-size: 14px;
font-family: NanumSquare;
`;

const HomePageLinkText = Styled.Text`
font-weight: 600;
color: #000000;
font-size: 14px;
`;

const BasicBodyContainer = Styled.View`
margin-top: 8px;
`;

const DentalAddressText = Styled.Text`
margin-top: 12px;
color: #979797;
font-size: 14px;
font-family: NanumSquare
`;

const BasicFooterContainer = Styled.View`
margin-top: 8px;
flex-direction: row;
align-items: center;
`;

const TagListContainer = Styled.View`
flex-direction: row;
align-items: center;
`;

const TagText = Styled.Text`
color: #000000;
font-size: 14px;
`;

const DetailInfoContainer = Styled.View`
padding-bottom: ${hp('33%')}px;
background-color: #F5F7F9;
`;

const DentalReviewInfoContainer = Styled.View`
width: ${wp('100%')}px;
height: 1000px;
`;

const IntroContainer = Styled.View`
`;

const EstablishDateContainer = Styled.View`
margin-top: 28px;
`;

const TreatTimeContainer = Styled.View`
margin-top: 28px;
`;

const WeeklyTreatTimeContainer = Styled.View`
margin-top: 16px;
width: ${wp('91.466%')}px;
height: ${wp('75.51%')}px;
background-color: #c3c3c3;
`;

const LocationInfoContainer = Styled.View`
margin-top: 28px;
`;

const LocationMapContainer = Styled.View`
width: ${wp('91.466%')};
height: ${wp('55.836%')};
`;

const LocationMapImage = Styled.Image`
width: ${wp('91.466%')}px;
height: ${wp('55.836%')}px;
background-color: #c3c3c3;
`;

const TreatUniquenessContainer = Styled.View`
margin-top: 28px;
`;

const DentistInfoContainer = Styled.View`
margin-top: 28px;
`;


const InfoValueText = Styled.Text`
margin-top: 12px;
font-weight: 400;
font-size: 14px;
color: #000000;
`;

const FooterContainer = Styled.View`
padding-bottom: ${hp('8%')}px;
`;

const ManageContainer = Styled.View`
flex-direction: row;
align-items: center;
justify-content: space-between;
margin-top: 24px;
padding-left: 10px;
padding-right: 10px;
`;

const ManageText = Styled.Text`
font-weight: 700;
color: #000000;
font-size: 14px;
`;

const EditInfoButton = Styled.View`
align-items: center;
justify-content: center;
width: ${wp('40.53%')}px;
height: ${wp('23.46%')}px;
border-width: 1px;
`;

const MakeDentalAccountButton = Styled.View`
align-items: center;
justify-content: center;
width: ${wp('40.53%')}px;
height: ${wp('23.46%')}px;
border-width: 1px;
`;


const ReserveByPhoneContainer = Styled.View`
margin-top: 24px;
align-items: center;
`;

const ReserveByPhoneButton = Styled.View`
width: ${wp('90.133%')}px;
height: ${wp('14.93%')}px;
border-radius: 8px;
background-color: #c4c4c4;
align-items: center;
justify-content: center;
`;

const SelectInfoTypeContainer = Styled.View`
padding-top: 20px;
padding-bottom: 20px;
flex-direction: row;
align-items: center;
justify-content: center;
`;

const SelectInfoTypeText = Styled.Text`
font-weight: 400;
color: #000000;
font-size: 14px;
`;

const AverageRatingContainer = Styled.View`
padding-left: 16px;
padding-right: 16px;
`;

const RatingItemListContainer = Styled.View`
flex-direction: row;
align-items: center;
justify-content: space-between;
`;

const RatingTitleText = Styled.Text`
font-weight: 400;
font-size: 12px;
color: #000000;
`;

const RatingLabelText = Styled.Text`
font-weight: 700;
font-size: 14px;
color: #000000;
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


const ReviewListContainer = Styled.View`
`;

const DetailInfoTypeContainer = Styled.View`
height: ${hp('10.83%')}px;
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
font-family: NanumSquare
`;

const DetailInfoItemContainer = Styled.View`
background-color: #ffffff;
height: 300px;
padding: 24px 16px;
border-bottom-width: 8px;
border-color: #F5F7F9; 
`;

const DetailInfoLabelText = Styled.Text`
font-weight: 800;
font-size: 14px;
color: #9FA0A2;
font-family: NanumSquare
`;

const DetailInfoDescripText = Styled.Text`
margin-top: 16px;
font-weight: 400; 
font-size: 16px;
color: #000000;
font-family: NanumSquare
`;

const RatingReportContainer = Styled.View`
border-bottom-width: 8px;
border-color: #F5F7F9;
`;

const CircleIndicatorBackground = Styled.View`
width: ${wp('25.6%')}px;
height: ${wp('25.6%')}px;
border-radius: 100px;
background-color: #CCD1DD;
`;

const FirstHalfCircleIndicator = Styled.View`
position: absolute;
right: 0;
width: ${wp('12.8%')}px;
height: ${wp('25.6%')}px;
border-top-right-radius: 100px;
border-bottom-right-radius: 100px;
border-top-left-radius: 1px;
background-color: #3ECB99;
`;

const SecondHalfCircleIndicator = Styled.View`
position: absolute;
left: 0;
width: ${wp('12.8%')}px;
height: ${wp('25.6%')}px;
border-top-right-radius: 1px;
border-top-left-radius: 100px;
border-bottom-left-radius: 100px;
background-color: #3ECB99;
`;

const CircleContainer = Styled.View`
width: ${wp('25.6%')}px;
height: ${wp('25.6%')}px;
border-width: ${wp("1.5%")}px;
border-radius: ${wp('12.8%')}px;
border-color: #CCD1DD;
justify-content: center;
align-items: center;
`;

const FirstCircleProgressLayer = Styled.View`
width: ${wp('25.6%')}px;
height: ${wp('25.6%')}px;
position: absolute;
border-width: ${wp('1.5%')}px;
border-left-color: transparent;
border-bottom-color: transparent;
border-right-color: #3ECB99;
border-top-color: #3ECB99;
border-radius: ${wp('12.8%')}px;
`;

const SecondCircleProgressLayer = Styled.View`
width: ${wp('25.6%')}px;
height: ${wp('25.6%')}px;
position: absolute;
border-width: ${wp('1.5%')}px;
border-radius: ${wp('12.8%')}px;
border-left-color: transparent;
border-bottom-color: transparent;
border-right-color: #3ECB99;
border-top-color: #3ECB99;
`;

const CircleOffsetLayer = Styled.View`
width: ${wp('25.6%')}px;
height: ${wp('25.6%')}px;
border-width: ${wp('1.5%')}px;
border-radius: ${wp('12.8%')}px;
border-left-color: transparent;
border-bottom-color: transparent;
border-right-color: #CCD1DD;
border-top-color: #CCD1DD;
`;

const AvgRatingContainer = Styled.View`
flex-direction: row;
align-items: center;
`;

const RatingStarImage = Styled.Image`
width: ${wp('4.53%')}px;
height: ${wp('4.53%')}px;
`;

const AvgRatingText = Styled.Text`
margin-left: 2px;
font-weight: 700;
font-size: 20px;
color: #000000;
font-family: NanumSquare;
`

const RatingListContainer = Styled.View`
width: ${wp('49.3%')}px;
flex-direction: column;
`;

const RatingItemContainer = Styled.View`
flex-direction: row;
align-items: center;
`;

const RatingTypeText = Styled.Text`
font-weight: 800;
font-size: 14px;
color: #2F2F2F;
font-family: NanumSquare;
`;

const RatingValueText = Styled.Text`
font-weight: 800;
font-size: 14px;
color: #2F2F2F;
font-family: NanumSquare;
`;

const TEST_DENTAL_DETAIL_DATA = {
  coverImage: {
      uri: "http://www.dailydental.co.kr/data/photos/20180729/art_15318134467_8b8044.jpg"
  },
  name: "웃는E치과교정전문의원",
  address: "경기도 수원시 광교중앙로 145",
  tagList: ["임플란트", "소아청소년과"],
  homePage: "http://www.sadh.co.kr/",
  detailInfo: {
      introduction: "안녕하세요. 누구누구입니다. 잘 부탁드립니다.",
      establishDate: "2020.11.09",
      treatTime: "09:00 ~ 18",
      location: {
          latitude: 37.294242,
          longitude: 127.045466,
      },
      park: "불가",
      uniqueness: "특이특이특이",
      dentist: "전문의 1명"
  }
}

const TEST_DENTAL_DATA_ARRAY = [
  {
    type: "병원 정보",
    description: "안녕하세요. 누구누구입니다. 잘 부탁드립니다."
  },
  {
    type: "병원 정보",
    description: "안녕하세요. 누구누구입니다. 잘 부탁드립니다."
  },
  {
    type: "병원 정보",
    description: "안녕하세요. 누구누구입니다. 잘 부탁드립니다."
  },
  {
    type: "병원 정보",
    description: "안녕하세요. 누구누구입니다. 잘 부탁드립니다."
  },
  {
    type: "병원 정보",
    description: "안녕하세요. 누구누구입니다. 잘 부탁드립니다."
  }
]


let isReachedTop = false;

const AnimatedIndicator = Animated.createAnimatedComponent(ActivityIndicator);
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const tabBarHeight = hp('6.89%');
const collapsibleViewHeight = hp('66.6%');
const detailInfoTypeHeight = hp('10.83%');
const headerHeight = getStatusBarHeight() + hp('8%');
const SafeStatusBar = Platform.select({
  ios: 44,
  android: StatusBar.currentHeight,
});

const DetailInfoTabScene = ({
  onGetRef,
  scrollY,
  onScrollEndDrag,
  onMomentumScrollEnd,
  onMomentumScrollBegin,
  setIsContentedHeader,
  lockContentedHeader,
  unlockContentedHeader,
  isContentedHeader,
  reachTop,
  offTop,
  focused,
  tabPanResponder,
  infoTypeArr,
  selectInfoType,
  changeCurInfoTypeIndex,
  curInfoTypeIndex,
  isChangingInfoTypeIndex,
  infoTypeScrollViewRef,
}: any) => {

  const windowHeight = Dimensions.get('window').height;

  return (
    <Animated.ScrollView
      {...tabPanResponder.panHandlers}
      scrollToOverflowEnabled={true}
      ref={onGetRef}
      scrollEventThrottle={1}
      onScroll={focused ? Animated.event([
        {nativeEvent: {contentOffset: {y: scrollY}}}], 
        {
          useNativeDriver: true,
          listener: event => {
              if(scrollY._value > 110) {
                if(!isContentedHeader) {
                  //lockContentedHeader();
                }
                if(scrollY._value >= (collapsibleViewHeight - tabBarHeight - getStatusBarHeight()) && !isReachedTop) {
                  console.log("reachTop")
                  isReachedTop = true;
                } else if(scrollY._value < (collapsibleViewHeight - tabBarHeight - getStatusBarHeight()) && isReachedTop) {
                  isReachedTop = false;
                }
              } else if(scrollY._value <= 110 ) {
                if(isContentedHeader) {
                  //unlockContentedHeader();
                }
              }
              const invisibleScrollHeight = collapsibleViewHeight - tabBarHeight - getStatusBarHeight() - 10;
              
              if(infoTypeArr.current[0] <= scrollY._value && scrollY._value < (infoTypeArr.current[1] + invisibleScrollHeight)) {
                if(curInfoTypeIndex !== 0 && !isChangingInfoTypeIndex.current) {
                  infoTypeScrollViewRef.current.scrollTo({x: 0, animated: true})
                  changeCurInfoTypeIndex(0);
                }
              } else if((infoTypeArr.current[1] + invisibleScrollHeight) <= scrollY._value && scrollY._value < (infoTypeArr.current[2] + invisibleScrollHeight)) {
                if(curInfoTypeIndex !== 1 && !isChangingInfoTypeIndex.current) {
                  changeCurInfoTypeIndex(1);
                }
              } else if((infoTypeArr.current[2] + invisibleScrollHeight) <= scrollY._value && scrollY._value < (infoTypeArr.current[3] + invisibleScrollHeight)) {
                if(curInfoTypeIndex !== 2 && !isChangingInfoTypeIndex.current) {
                  changeCurInfoTypeIndex(2);
                }
              } else if((infoTypeArr.current[3] + invisibleScrollHeight) <= scrollY._value) {
                if(curInfoTypeIndex !== 3 && !isChangingInfoTypeIndex.current) {
                  infoTypeScrollViewRef.current.scrollToEnd({animated: true})
                  changeCurInfoTypeIndex(3);
                }
              }
        }
        },
      ) : null}
      onMomentumScrollBegin={onMomentumScrollBegin}
      onScrollEndDrag={onScrollEndDrag}
      onMomentumScrollEnd={onMomentumScrollEnd}
      contentContainerStyle={{
        width: wp('100%'),
        paddingTop: collapsibleViewHeight + tabBarHeight + detailInfoTypeHeight,
        minHeight: windowHeight - tabBarHeight,
      }}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
        <DetailInfoContainer>
        <DetailInfoItemContainer
        onLayout={(event) => {
          infoTypeArr.current[0] = event.nativeEvent.layout.y
        }}>
          <DetailInfoLabelText>{"병원 소개"}</DetailInfoLabelText>
        </DetailInfoItemContainer>
        <DetailInfoItemContainer>
          <DetailInfoLabelText>{"진료 시간"}</DetailInfoLabelText>
        </DetailInfoItemContainer>
        <DetailInfoItemContainer>
          <DetailInfoLabelText>{"위치 정보"}</DetailInfoLabelText>
        </DetailInfoItemContainer>
        <DetailInfoItemContainer
        onLayout={(event) => {
          infoTypeArr.current[1] = event.nativeEvent.layout.y
        }}>
          <DetailInfoLabelText>{"진료 과목"}</DetailInfoLabelText>
        </DetailInfoItemContainer>
        <DetailInfoItemContainer>
          <DetailInfoLabelText>{"특수 진료 장비"}</DetailInfoLabelText>
        </DetailInfoItemContainer>
        <DetailInfoItemContainer>
          <DetailInfoLabelText>{"전문 및 특수 진료 항목"}</DetailInfoLabelText>
        </DetailInfoItemContainer>
        <DetailInfoItemContainer
        onLayout={(event) => {
          infoTypeArr.current[2] = event.nativeEvent.layout.y
        }}>
          <DetailInfoLabelText>{"의사 정보"}</DetailInfoLabelText>
        </DetailInfoItemContainer>
        <DetailInfoItemContainer
        onLayout={(event) => {
          infoTypeArr.current[3] = event.nativeEvent.layout.y 
        }}
        style={{borderWidth: 0}}>
          <DetailInfoLabelText>{"주차 정보"}</DetailInfoLabelText>
        </DetailInfoItemContainer>
        </DetailInfoContainer>
    </Animated.ScrollView>
  );
};

const ReviewTabScene = ({
  onGetRef,
  scrollY,
  onScrollEndDrag,
  onMomentumScrollEnd,
  onMomentumScrollBegin,
  dentalReviewArray,
  moveToWriterProfile,
  moveToReviewDetail,
  moveToDentalDetail,
  lockContentedHeader,
  unlockContentedHeader,
  isContentedHeader,
  reachTop,
  offTop,
  focused,
  tabPanResponder,
}: any) => {
  const windowHeight = Dimensions.get('window').height;

  return (
    <Animated.ScrollView
    {...tabPanResponder.panHandlers}
      scrollToOverflowEnabled={true}
      ref={onGetRef}
      scrollEventThrottle={1}
      data={TEST_DENTAL_REVIEW_DATA}
      onScroll={focused ? Animated.event([
        {nativeEvent: {contentOffset: {y: scrollY}}}], 
        {
          useNativeDriver: true,
          listener: event => {
              if(scrollY._value > 110) {
                if(!isContentedHeader) {
                  //lockContentedHeader();
                }
                if(scrollY._value >= (collapsibleViewHeight - tabBarHeight - getStatusBarHeight()) && !isReachedTop) {
                  console.log("reachTop")
                  isReachedTop = true
                } else if(scrollY._value < (collapsibleViewHeight - tabBarHeight - getStatusBarHeight()) && isReachedTop) {
                  isReachedTop = false
                }
              } else if(scrollY._value <= 110) {
                if(isContentedHeader) {
                  //unlockContentedHeader();
                }
              }
        }
        },
      ): null}
      onMomentumScrollBegin={onMomentumScrollBegin}
      onScrollEndDrag={onScrollEndDrag}
      onMomentumScrollEnd={onMomentumScrollEnd}
      contentContainerStyle={{
        width: wp("100%"),
        height: 2000,
        paddingTop: collapsibleViewHeight + tabBarHeight,
        minHeight: windowHeight - tabBarHeight,
      }}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
    <RatingReportContainer>
      <RatingReport
      avgRating={3}/>
    </RatingReportContainer>
    <ReviewList
    scrollEnabled={false}
    reviewList={dentalReviewArray}
    moveToDentalDetail={moveToDentalDetail}
    moveToWriterProfile={moveToWriterProfile}
    moveToReviewDetail={moveToReviewDetail}
    />

    </Animated.ScrollView>
  );
};

interface Props {
  goBack: () => void,
}

const DentalCollapsibleView = ({goBack}: Props) => {
  /**
   * stats
   */
  const [tabIndex, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'detailInfo', title: '상세 정보'},
    {key: 'review', title: '리뷰'},
  ]);
  const [canScroll, setCanScroll] = useState(true);
  const [dentalDetailInfo, setDentalDetailInfo] = useState<any>(TEST_DENTAL_DETAIL_DATA)
  const [dentalReviewArray, setDentalReviewArray] = useState<any>(TEST_DENTAL_REVIEW_DATA);
  const [isContentedHeader, setIsContentedHeader] = useState<boolean>(false);
  const [curInfoTypeIndex, setCurInfoTypeIndex] = useState<boolean>(0);

  
  // ref
  const scrollY = useRef(new Animated.Value(0)).current;
  const tabScrollX = useRef(new Animated.Value(0)).current;
  const headerScrollY = useRef(new Animated.Value(0)).current;
  // for capturing header scroll on Android
  const headerMoveScrollY = useRef(new Animated.Value(0)).current;
  const listRefArr = useRef([]);
  const listOffset = useRef({});
  const isListGliding = useRef(false);
  const isChangingInfoTypeIndex = useRef<boolean>(false);
  const headerScrollStart = useRef(0);
  const _tabIndex = useRef(0);

  // detail info의 각각의 항목의 y좌표 배열 ref
  const infoTypeArr = useRef([]);

  // info type scrollview ref
  const infoTypeScrollViewRef = useRef<any>();

  const headerOpacity = scrollY.interpolate({
    inputRange: [hp('18%'), hp('28%')],
    outputRange: [0, 1],
    extrapolate: 'clamp'
  })

  // PanResponder for header  
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
        if(gestureState.dy > 0 && scrollY._value <= 0) {
          return
        } else {
          console.log("getstureState", gestureState)
          listRefArr.current.forEach((item) => {
          if (item.key !== routes[_tabIndex.current].key) {
            return;
          }
          if (item.value) {
            if(gestureState.dy > 0 && scrollY._value <= 0) {
              headerScrollY.stopAnimation()
              return
            } else {
              item.value.scrollTo({
                y: -gestureState.dy + headerScrollStart.current,
                animated: false,
              });
            }
          }
        });

        }
        
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
      onShouldBlockNativeResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        headerScrollY.stopAnimation();
      },
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
        if (value > (collapsibleViewHeight - headerHeight) || value < 0) {
          headerScrollY.stopAnimation();
          syncScrollOffset();
        }
        if (item.value && value <= (collapsibleViewHeight - headerHeight)) {
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
        if (scrollY._value < (collapsibleViewHeight - headerHeight) && scrollY._value >= 0) {
          if (item.value) {
            item.value.scrollTo({
              y: scrollY._value,
              animated: false,
            });
            listOffset.current[item.key] = scrollY._value;
          }
        } else if (scrollY._value >= (collapsibleViewHeight - headerHeight)) {
          if (
            listOffset.current[item.key] < (collapsibleViewHeight - headerHeight) ||
            listOffset.current[item.key] == null
          ) {
            if (item.value) {
              item.value.scrollTo({
                y: (collapsibleViewHeight - headerHeight),
                animated: false,
              });
              listOffset.current[item.key] = (collapsibleViewHeight - headerHeight);
            }
          }
        }
      }
    });
  };

  const selectInfoType = (index: number) => {

    setCurInfoTypeIndex(index);

    isChangingInfoTypeIndex.current = true;

    if(index === 3) {
      infoTypeScrollViewRef.current.scrollToEnd({animated: true})
    }

    if(index === 0) {
      infoTypeScrollViewRef.current.scrollTo({x: 0, animated: true})
    }
    
    listRefArr.current[0].value.scrollTo({
      y: (collapsibleViewHeight - (detailInfoTypeHeight + 16)) + infoTypeArr.current[index]
    })

  }

  const onMomentumScrollBegin = () => {
    isListGliding.current = true;
  };

  const onMomentumScrollEnd = () => {
    isListGliding.current = false;
    syncScrollOffset();
  };

  const onScrollEndDrag = (e) => {
    syncScrollOffset();
  };

  const lockContentedHeader = () => {
    //setIsContentedHeader(true);
  }

  const unlockContentedHeader = () => {
    //setIsContentedHeader(false);
  }

  const changeCurInfoTypeIndex = (index: number) => {
    console.log("changeCurInfoTypeIndex index", index);
    setCurInfoTypeIndex(index);
  }

  const onTabSwipeStart = () => {

  }

  const onTabSwipeEnd = () => {

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
                source={{uri:dentalDetailInfo.coverImage.uri}}/>
                <CertificationIcon
                style={styles.certificationIconShadow}/>
            </CoverImageContainer>
            <RepresentingKeywordContainer>
                <RepresentingKeywordItemContainer>
                    <RepresentingKeywordText>{"진료가능"}</RepresentingKeywordText>
                </RepresentingKeywordItemContainer>
            </RepresentingKeywordContainer>
            <BasicInfoContainer>
                <DentalNameText>{dentalDetailInfo.name}</DentalNameText>
                <DentalAddressText>{dentalDetailInfo.address}</DentalAddressText>
                <RatingText>{"평점 3.0"}</RatingText>
            <BasicInfoItemDivider
            style={{marginTop: 24}}/>
            <BasicInfoItemContainer>
                <BasicInfoLabelText>{"설립"}</BasicInfoLabelText>
                <BasicInfoLabelDivider/>
                <BasicInfoValueText>{"4년"}</BasicInfoValueText>
            </BasicInfoItemContainer>
            <BasicInfoItemDivider/>
            {/* <BasicInfoItemContainer>
                <BasicInfoLabelText>{"홈페이지"}</BasicInfoLabelText>
                <BasicInfoLabelDivider/>
                <BasicInfoValueText>{"바로가기"}</BasicInfoValueText>
            </BasicInfoItemContainer> */}
            </BasicInfoContainer>
            </CollapsibleContainer>
      </Animated.View>
    );
  };

  const renderLabel = ({route, focused}) => {
    return (
      <Text style={[styles.label, {color: focused ? "#2998FF" : "#000000"}]}>
        {route.title}
      </Text>
    );
  };

  const renderScene = ({route}) => {
    console.log("renderScene route", route);
    const focused = route.key === routes[tabIndex].key;
    let numCols;
    let data;
    let renderItem;
    switch (route.key) {
      case 'detailInfo':
        return (
        <DetailInfoTabScene
          selectInfoType={selectInfoType}
          tabPanResponder={tabPanResponder}
          focused={focused}
          scrollY={scrollY}
          isReachedTop={isReachedTop}
          isContentedHeader={isContentedHeader}
          lockContentedHeader={lockContentedHeader}
          unlockContentedHeader={unlockContentedHeader}
          onMomentumScrollBegin={onMomentumScrollBegin}
          onScrollEndDrag={onScrollEndDrag}
          onMomentumScrollEnd={onMomentumScrollEnd}
          infoTypeArr={infoTypeArr}
          infoTypeScrollViewRef={infoTypeScrollViewRef}
          curInfoTypeIndex={curInfoTypeIndex}
          changeCurInfoTypeIndex={changeCurInfoTypeIndex}
          isChangingInfoTypeIndex={isChangingInfoTypeIndex}
          onGetRef={(ref) => {
            if (ref) {
              const found = listRefArr.current.find((e) => e.key === route.key);
              if (!found) {
                console.log("listRefArr.push")
                listRefArr.current.push({
                  key: route.key,
                  value: ref,
                });
              }
            }
          }}
        />
        )
      case 'review':
        return (
          <ReviewTabScene
            tabPanResponder={tabPanResponder}
            focused={focused}
            scrollY={scrollY}
            isReachedTop={isReachedTop}
            isContentedHeader={isContentedHeader}
            lockContentedHeader={lockContentedHeader}
            unlockContentedHeader={unlockContentedHeader}
            dentalReviewArray={dentalReviewArray}
            onMomentumScrollBegin={onMomentumScrollBegin}
            onScrollEndDrag={onScrollEndDrag}
            onMomentumScrollEnd={onMomentumScrollEnd}
            onGetRef={(ref) => {
              if (ref) {
                const found = listRefArr.current.find((e) => e.key === route.key);
                if (!found) {
                  listRefArr.current.push({
                    key: route.key,
                    value: ref,
                  });
                }
              }
            }}
          />
        )
        break;
      default:
        return null;
    }
  };

  const renderTabBar = (props) => {
    console.log("renderTabBar props", props);
    const y = scrollY.interpolate({
      inputRange: [0, collapsibleViewHeight - headerHeight],
      outputRange: [collapsibleViewHeight, (headerHeight)],
      // extrapolate: 'clamp',
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
          inactiveColor={{fontColor: "#000000"}}
          style={styles.tab}
          renderLabel={renderLabel}
          indicatorContainerStyle={styles.indicatorContainer}
          indicatorStyle={styles.indicator}
        />
        {_tabIndex.current === 0 && (
        <Animated.ScrollView
        style={{
          transform: [{translateX: tabScrollX}]
        }}
        ref={infoTypeScrollViewRef}
        style={[{backgroundColor: "#FFFFFF"}]}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
          <DetailInfoTypeContainer
          onLayout={(event) => {
            console.log("항목선택 onLayout", event.nativeEvent.layout)
          }}>
            <TouchableWithoutFeedback onPress={() => selectInfoType(0)}>
            <DetailInfoTypeItemContainer
            style={curInfoTypeIndex === 0 ? {backgroundColor: "#282D3C"} : {backgroundColor: "#F5F7F9"}}>
              <DetailInfoTypeText style={curInfoTypeIndex === 0 ? {color: "#ffffff"} : {color: "#282D3C"}}>{"병원 정보"}</DetailInfoTypeText>
            </DetailInfoTypeItemContainer>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => selectInfoType(1)}>
            <DetailInfoTypeItemContainer
            style={[{marginLeft: 24}, (curInfoTypeIndex === 1 ? {backgroundColor: "#282D3C"} : {backgroundColor: "#F5F7F9"})]}>
              <DetailInfoTypeText style={curInfoTypeIndex === 1 ? {color: "#ffffff"} : {color: "#282D3C"}}>{"진료 정보"}</DetailInfoTypeText>
            </DetailInfoTypeItemContainer>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => selectInfoType(2)}>
            <DetailInfoTypeItemContainer
            style={[{marginLeft: 24}, curInfoTypeIndex === 2 ? {backgroundColor: "#282D3C"} : {backgroundColor: "#F5F7F9"}]}>
              <DetailInfoTypeText style={curInfoTypeIndex === 2 ? {color: "#ffffff"} : {color: "#282D3C"}}>{"의사 정보"}</DetailInfoTypeText>
            </DetailInfoTypeItemContainer>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress ={() => selectInfoType(3)}>
            <DetailInfoTypeItemContainer
            style={[{marginLeft: 24}, curInfoTypeIndex === 3 ? {backgroundColor: "#282D3C"} : {backgroundColor: "#F5F7F9"}]}>
              <DetailInfoTypeText style={curInfoTypeIndex === 3 ? {color: "#ffffff"} : {color: "#282D3C"}}>{"주차 정보"}</DetailInfoTypeText>
            </DetailInfoTypeItemContainer>
            </TouchableWithoutFeedback>
          </DetailInfoTypeContainer>
        </Animated.ScrollView>
        )}
      </Animated.View>
    );
  };

  const renderTabView = () => {
    return (
      <TabView
        onSwipeStart={() => onTabSwipeStart()}
        onSwipeEnd={() => onTabSwipeEnd()}
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
      {/* {enderCustomRefresh()} */}
      <Animated.View
      style={[styles.header, {opacity: headerOpacity}]}>
        <TouchableWithoutFeedback onPress={() => goBack()}>
          <HeaderLeftContainer>
            <HeaderBackIcon
            source={require('~/Assets/Images/HeaderBar/ic_back.png')}/>
          </HeaderLeftContainer>
        </TouchableWithoutFeedback>
          <HeaderTitleText>{"웃는E치과교정전문의"}</HeaderTitleText>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  collapsibleView: {
    height: collapsibleViewHeight,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: '#FFA088',
  },
  header: {
    position: "absolute",
    paddingTop: getStatusBarHeight(),
    width: wp('100%'),
    height: getStatusBarHeight() + hp('8%'),
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF"
  },
  label: {fontSize: 14, color: '#2998FF', fontWeight: '800'},
  tab: {
    elevation: 0,
    shadowOpacity: 0,
    backgroundColor: '#ffffff',
    height: tabBarHeight,
    justifyContent: 'center',
    alignContent: 'center',
    borderBottomWidth: 1,
    borderColor: "#F0F0F0"
  },
  indicatorContainer: {
    width: wp('100%'),
    backgroundColor: '#ffffff'
  },
  indicator: {
    backgroundColor: '#2998FF',
    height: 4,
    width: wp('19%'),
    marginLeft: (wp('50%') - wp('19%')) / 2
  },
});

export default DentalCollapsibleView;


const TEST_DENTAL_REVIEW_DATA = [
  {
    "id": 2,
    "starRate_cost": 5,
    "starRate_treatment": 4,
    "starRate_service": 4,
    "certifiedBill": true,
    "hits": 0,
    "treatmentDate": "2020-12-07",
    "totalCost": null,
    "createdAt": "2020-12-07T03:21:08.000Z",
    "updatedAt": "2020-12-07T03:21:08.000Z",
    "deletedAt": null,
    "userId": "fb0617b0-33c0-11eb-92de-e3fb3b4e0264",
    "dentalClinicId": 43,
    "createdDiff(second)": 352,
    "reviewCommentsNum": 0,
    "reviewLikeNum": 0,
    "viewerLikedReview": 0,
    "viewerScrapedReview": 0,
    "reviewViewNum": 1,
    "reviewDescriptions": "1 2",
    "user": {
        "nickname": "jiwon11",
        "profileImg": ""
    },
    "review_contents": [
        {
            "id": 2,
            "img_url": "https://chikachika-review-images.s3.ap-northeast-2.amazonaws.com/original/1607311267788DBAEB47D-A6A0-45E1-B09D-8B97190FC36E.heic",
            "index": 1,
            "img_before_after": "before"
        },
        {
            "id": 1,
            "img_url": "https://chikachika-review-images.s3.ap-northeast-2.amazonaws.com/original/16073112678366055861E-DB4B-4018-95AA-B9F585C2687B.png",
            "index": 2,
            "img_before_after": "after"
        }
    ],
    "dental_clinic": {
        "id": 43,
        "name": "시그마치과병원"
    },
    "TreatmentItems": [
        {
            "name": "복합레진",
            "review_treatment_item": {
                "cost": 30000
            }
        },
        {
            "name": "임플란트",
            "review_treatment_item": {
                "cost": 20000
            }
        }
    ]
},
{
  "id": 2,
  "starRate_cost": 5,
  "starRate_treatment": 4,
  "starRate_service": 4,
  "certifiedBill": true,
  "hits": 0,
  "treatmentDate": "2020-12-07",
  "totalCost": null,
  "createdAt": "2020-12-07T03:21:08.000Z",
  "updatedAt": "2020-12-07T03:21:08.000Z",
  "deletedAt": null,
  "userId": "fb0617b0-33c0-11eb-92de-e3fb3b4e0264",
  "dentalClinicId": 43,
  "createdDiff(second)": 352,
  "reviewCommentsNum": 0,
  "reviewLikeNum": 0,
  "viewerLikedReview": 0,
  "viewerScrapedReview": 0,
  "reviewViewNum": 1,
  "reviewDescriptions": "1 2",
  "user": {
      "nickname": "jiwon11",
      "profileImg": ""
  },
  "review_contents": [
      {
          "id": 2,
          "img_url": "https://chikachika-review-images.s3.ap-northeast-2.amazonaws.com/original/1607311267788DBAEB47D-A6A0-45E1-B09D-8B97190FC36E.heic",
          "index": 1,
          "img_before_after": "before"
      },
      {
          "id": 1,
          "img_url": "https://chikachika-review-images.s3.ap-northeast-2.amazonaws.com/original/16073112678366055861E-DB4B-4018-95AA-B9F585C2687B.png",
          "index": 2,
          "img_before_after": "after"
      }
  ],
  "dental_clinic": {
      "id": 43,
      "name": "시그마치과병원"
  },
  "TreatmentItems": [
      {
          "name": "복합레진",
          "review_treatment_item": {
              "cost": 30000
          }
      },
      {
          "name": "임플란트",
          "review_treatment_item": {
              "cost": 20000
          }
      }
  ]
},{
  "id": 2,
  "starRate_cost": 5,
  "starRate_treatment": 4,
  "starRate_service": 4,
  "certifiedBill": true,
  "hits": 0,
  "treatmentDate": "2020-12-07",
  "totalCost": null,
  "createdAt": "2020-12-07T03:21:08.000Z",
  "updatedAt": "2020-12-07T03:21:08.000Z",
  "deletedAt": null,
  "userId": "fb0617b0-33c0-11eb-92de-e3fb3b4e0264",
  "dentalClinicId": 43,
  "createdDiff(second)": 352,
  "reviewCommentsNum": 0,
  "reviewLikeNum": 0,
  "viewerLikedReview": 0,
  "viewerScrapedReview": 0,
  "reviewViewNum": 1,
  "reviewDescriptions": "1 2",
  "user": {
      "nickname": "jiwon11",
      "profileImg": ""
  },
  "review_contents": [
      {
          "id": 2,
          "img_url": "https://chikachika-review-images.s3.ap-northeast-2.amazonaws.com/original/1607311267788DBAEB47D-A6A0-45E1-B09D-8B97190FC36E.heic",
          "index": 1,
          "img_before_after": "before"
      },
      {
          "id": 1,
          "img_url": "https://chikachika-review-images.s3.ap-northeast-2.amazonaws.com/original/16073112678366055861E-DB4B-4018-95AA-B9F585C2687B.png",
          "index": 2,
          "img_before_after": "after"
      }
  ],
  "dental_clinic": {
      "id": 43,
      "name": "시그마치과병원"
  },
  "TreatmentItems": [
      {
          "name": "복합레진",
          "review_treatment_item": {
              "cost": 30000
          }
      },
      {
          "name": "임플란트",
          "review_treatment_item": {
              "cost": 20000
          }
      }
  ]
},{
  "id": 2,
  "starRate_cost": 5,
  "starRate_treatment": 4,
  "starRate_service": 4,
  "certifiedBill": true,
  "hits": 0,
  "treatmentDate": "2020-12-07",
  "totalCost": null,
  "createdAt": "2020-12-07T03:21:08.000Z",
  "updatedAt": "2020-12-07T03:21:08.000Z",
  "deletedAt": null,
  "userId": "fb0617b0-33c0-11eb-92de-e3fb3b4e0264",
  "dentalClinicId": 43,
  "createdDiff(second)": 352,
  "reviewCommentsNum": 0,
  "reviewLikeNum": 0,
  "viewerLikedReview": 0,
  "viewerScrapedReview": 0,
  "reviewViewNum": 1,
  "reviewDescriptions": "1 2",
  "user": {
      "nickname": "jiwon11",
      "profileImg": ""
  },
  "review_contents": [
      {
          "id": 2,
          "img_url": "https://chikachika-review-images.s3.ap-northeast-2.amazonaws.com/original/1607311267788DBAEB47D-A6A0-45E1-B09D-8B97190FC36E.heic",
          "index": 1,
          "img_before_after": "before"
      },
      {
          "id": 1,
          "img_url": "https://chikachika-review-images.s3.ap-northeast-2.amazonaws.com/original/16073112678366055861E-DB4B-4018-95AA-B9F585C2687B.png",
          "index": 2,
          "img_before_after": "after"
      }
  ],
  "dental_clinic": {
      "id": 43,
      "name": "시그마치과병원"
  },
  "TreatmentItems": [
      {
          "name": "복합레진",
          "review_treatment_item": {
              "cost": 30000
          }
      },
      {
          "name": "임플란트",
          "review_treatment_item": {
              "cost": 20000
          }
      }
  ]
},{
  "id": 2,
  "starRate_cost": 5,
  "starRate_treatment": 4,
  "starRate_service": 4,
  "certifiedBill": true,
  "hits": 0,
  "treatmentDate": "2020-12-07",
  "totalCost": null,
  "createdAt": "2020-12-07T03:21:08.000Z",
  "updatedAt": "2020-12-07T03:21:08.000Z",
  "deletedAt": null,
  "userId": "fb0617b0-33c0-11eb-92de-e3fb3b4e0264",
  "dentalClinicId": 43,
  "createdDiff(second)": 352,
  "reviewCommentsNum": 0,
  "reviewLikeNum": 0,
  "viewerLikedReview": 0,
  "viewerScrapedReview": 0,
  "reviewViewNum": 1,
  "reviewDescriptions": "1 2",
  "user": {
      "nickname": "jiwon11",
      "profileImg": ""
  },
  "review_contents": [
      {
          "id": 2,
          "img_url": "https://chikachika-review-images.s3.ap-northeast-2.amazonaws.com/original/1607311267788DBAEB47D-A6A0-45E1-B09D-8B97190FC36E.heic",
          "index": 1,
          "img_before_after": "before"
      },
      {
          "id": 1,
          "img_url": "https://chikachika-review-images.s3.ap-northeast-2.amazonaws.com/original/16073112678366055861E-DB4B-4018-95AA-B9F585C2687B.png",
          "index": 2,
          "img_before_after": "after"
      }
  ],
  "dental_clinic": {
      "id": 43,
      "name": "시그마치과병원"
  },
  "TreatmentItems": [
      {
          "name": "복합레진",
          "review_treatment_item": {
              "cost": 30000
          }
      },
      {
          "name": "임플란트",
          "review_treatment_item": {
              "cost": 20000
          }
      }
  ]
},{
  "id": 2,
  "starRate_cost": 5,
  "starRate_treatment": 4,
  "starRate_service": 4,
  "certifiedBill": true,
  "hits": 0,
  "treatmentDate": "2020-12-07",
  "totalCost": null,
  "createdAt": "2020-12-07T03:21:08.000Z",
  "updatedAt": "2020-12-07T03:21:08.000Z",
  "deletedAt": null,
  "userId": "fb0617b0-33c0-11eb-92de-e3fb3b4e0264",
  "dentalClinicId": 43,
  "createdDiff(second)": 352,
  "reviewCommentsNum": 0,
  "reviewLikeNum": 0,
  "viewerLikedReview": 0,
  "viewerScrapedReview": 0,
  "reviewViewNum": 1,
  "reviewDescriptions": "1 2",
  "user": {
      "nickname": "jiwon11",
      "profileImg": ""
  },
  "review_contents": [
      {
          "id": 2,
          "img_url": "https://chikachika-review-images.s3.ap-northeast-2.amazonaws.com/original/1607311267788DBAEB47D-A6A0-45E1-B09D-8B97190FC36E.heic",
          "index": 1,
          "img_before_after": "before"
      },
      {
          "id": 1,
          "img_url": "https://chikachika-review-images.s3.ap-northeast-2.amazonaws.com/original/16073112678366055861E-DB4B-4018-95AA-B9F585C2687B.png",
          "index": 2,
          "img_before_after": "after"
      }
  ],
  "dental_clinic": {
      "id": 43,
      "name": "시그마치과병원"
  },
  "TreatmentItems": [
      {
          "name": "복합레진",
          "review_treatment_item": {
              "cost": 30000
          }
      },
      {
          "name": "임플란트",
          "review_treatment_item": {
              "cost": 20000
          }
      }
  ]
},
]
