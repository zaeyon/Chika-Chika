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
import {getStatusBarHeight} from 'react-native-status-bar-height';
import DeviceInfo from 'react-native-device-info';

// Local Component
import ReviewList from '~/Components/Presentational/ReviewList';
import ShowingRating from '~/Components/Presentational/ShowingRating';
import RatingReport from '~/Components/Presentational/RatingReport';
const ratingStarImage = require('~/Assets/Images/Indicator/ic_ratingStar.png');
const Container = Styled.View`
 flex: 1;
 background-color: #ffffff;
`;

const CollapsibleContainer = Styled.View`
flex: 1;
width: ${wp('100%')}px;
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
width: ${wp('100%')}px;
height: ${hp('31.5%')}px;
background-color: #F5F7F9;
`;

const CoverImage = Styled.Image`
width: ${wp('100%')}px;
height: ${hp('31.5%')}px;
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

const DentalNameText = Styled.Text`
font-weight: 800;
font-size: 20px;
color: #000000;
font-family: NanumSquare;
`;

const RatingText = Styled.Text`
margin-top: 12px;
font-weight: bold;
color: #000000;
font-size: 14px;
font-family: NanumSquare;
`;

const DentalAddressText = Styled.Text`
margin-top: 12px;
color: #979797;
font-size: 14px;
font-family: NanumSquare
`;

const DetailInfoTabContainer = Styled.View`
padding-bottom: ${hp('17%')}px;
background-color: #F5F7F9;
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
height: ${DeviceInfo.hasNotch() ? hp('10.83%') : hp('12.8%')}px;
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

const TreatmentHourFilterContainer = Styled.View`
flex-direction: row; 
align-items: center;
`;

const TreatmentHourFilterItemContainer = Styled.View`
flex-direction: row;
align-items: center;
`;

const TreatmentHourFilterText = Styled.Text`
font-weight: 800;
font-size: 16px;
color: #000000;
font-family: NanumSquare;
`;

const DentalStaticMapImage = Styled.Image`
margin-top: 16px;
width: ${wp('91.46%')}px;
height: ${wp('53.329%')}px;
border-radius: 8px;
`;

const RequestReviseInfoContainer = Styled.View`
padding-top: 24px;
padding-left: 13px;
padding-right: 0px;
align-self: flex-start;
`;

const RequestReviseInfoTextContainer = Styled.View`
width: 109;
padding-bottom: 1px;
border-bottom-width: 1px;
padding-bottom: 6px;
`;

const RequestReviseInfoText = Styled.Text`
width: 120px;
font-weight: bold;
font-size: 14px;
color: #000000;
font-family: NanumSquare;
`;

const CopyrightDescipContainer = Styled.View`
margin-top: 16px;
padding-left: 16px;
padding-right: 16px;
`;

const CopyrightDescipText = Styled.Text`
font-weight: 400;
color: #75808B;
font-size: 12px;
font-family: NanumSquare;
line-height: 22;
`;

const DentistInfoListContainer = Styled.View`
`;

const ReviewTabContainer = Styled.View`
`;

const ReviewListContainer = Styled.View`
`;

const NoneReviewContainer = Styled.View`
width: ${wp('100%')}px;
align-items: center;
padding-top: 30px;
`;

const NoneReviewText = Styled.Text`
margin-top: 16px;
font-weight: 400; 
font-size: 16px;
color: #000000;
font-family: NanumSquare
`;

let isReachedTop = false;

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const tabBarHeight = hp('6.89%');
// let collapsibleViewHeight = DeviceInfo.hasNotch() ? hp('69%') : hp('74.5%');
const detailInfoTypeHeight = DeviceInfo.hasNotch() ? hp('10.83%') : hp('15%');
const headerHeight = getStatusBarHeight() + hp('8%');
const SafeStatusBar = Platform.select({
  ios: 44,
  android: StatusBar.currentHeight,
});

interface Props {
  goBack: () => void;
  dentalDetailInfo: any;
}

const DentalCollapsibleTabView = ({goBack, dentalDetailInfo}: Props) => {
  console.log('DentalCollapsibleTabView dentalDetailInfo', dentalDetailInfo);
  const [collapsibleViewHeight, setCollapsibleViewHeight] = useState<number>(
    DeviceInfo.hasNotch() ? hp('68.5%') : hp('76.3%'),
  );
  const [tabIndex, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'detailInfo', title: '상세 정보'},
    {key: 'review', title: '리뷰'},
  ]);

  /**
   * ref
   */
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
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const introduction = dentalDetailInfo.clinicInfoBody.description;
  const treatmentTimeInfo = dentalDetailInfo.clinicInfoBody.treatmentTime;
  const locationInfo = dentalDetailInfo.clinicInfoBody.location;
  const treatmentSubjectInfo = dentalDetailInfo.clinicInfoBody.treatmentSubject;
  const specialTreatmentInfo = dentalDetailInfo.clinicInfoBody.SpecialTreatment;
  const dentistInfo = dentalDetailInfo.clinicInfoBody.dentistInfo;
  const parkingInfo = dentalDetailInfo.clinicInfoBody.parkingInfo;

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
        return true;
      },
      onShouldBlockNativeResponder: () => true,
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
        <CollapsibleContainer
          onLayout={(event) => {
            setCollapsibleViewHeight(event.nativeEvent.layout.height);
          }}>
          <CoverImageContainer>
            <CoverImage source={{uri: ''}} />
            <CertificationIcon style={styles.certificationIconShadow} />
          </CoverImageContainer>
          <RepresentingKeywordContainer>
            <RepresentingKeywordItemContainer>
              <RepresentingKeywordText>{'진료가능'}</RepresentingKeywordText>
            </RepresentingKeywordItemContainer>
          </RepresentingKeywordContainer>
          <BasicInfoContainer>
            <DentalNameText>
              {dentalDetailInfo?.clinicInfoHeader?.name}
            </DentalNameText>
            <DentalAddressText>
              {dentalDetailInfo?.clinicInfoHeader?.address}
            </DentalAddressText>
            <RatingText>
              {dentalDetailInfo?.clinicInfoHeader?.reviewAVGStarRate.all
                ? '평점' +
                  dentalDetailInfo?.clinicInfoHeader?.reviewAVGStarRate.all.toFixed(
                    0,
                  )
                : '평가 없음'}
            </RatingText>
            <BasicInfoItemDivider style={{marginTop: 24}} />
            <BasicInfoItemContainer>
              <BasicInfoLabelText>{'설립'}</BasicInfoLabelText>
              <BasicInfoLabelDivider />
              <BasicInfoValueText>{`${getEstablishedElapsedYear(
                dentalDetailInfo?.clinicInfoHeader?.launchDate,
              )}년`}</BasicInfoValueText>
            </BasicInfoItemContainer>
            <BasicInfoItemDivider />
            {dentalDetailInfo.clinicInfoHeader.website.length > 0 && (
              <BasicInfoItemContainer>
                <BasicInfoLabelText>{'홈페이지'}</BasicInfoLabelText>
                <BasicInfoLabelDivider />
                <TouchableWithoutFeedback
                  onPress={() =>
                    openDentalWebsite(dentalDetailInfo.clinicInfoHeader.website)
                  }>
                  <BasicInfoValueText>{'바로가기'}</BasicInfoValueText>
                </TouchableWithoutFeedback>
              </BasicInfoItemContainer>
            )}
          </BasicInfoContainer>
        </CollapsibleContainer>
      </Animated.View>
    );
  };

  const renderLabel = ({route, focused}) => {
    return (
      <Text style={[styles.label, {color: focused ? '#2998FF' : '#000000'}]}>
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
                    },
                  )
                : null
            }
            onMomentumScrollBegin={onMomentumScrollBegin}
            onScrollEndDrag={onScrollEndDrag}
            onMomentumScrollEnd={onMomentumScrollEnd}
            contentContainerStyle={{
              paddingTop: collapsibleViewHeight + tabBarHeight,
              backgroundColor: '#ffffff',
            }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <DetailInfoTabContainer>
              <DetailInfoItemContainer>
                <DetailInfoLabelText>{'병원 소개'}</DetailInfoLabelText>
                <DetailInfoDescripText>
                  {introduction > 0 ? introduction : '-'}
                </DetailInfoDescripText>
              </DetailInfoItemContainer>
              <DetailInfoItemContainer>
                <DetailInfoLabelText>{'진료 시간'}</DetailInfoLabelText>
              </DetailInfoItemContainer>
              <DetailInfoItemContainer>
                <DetailInfoLabelText>{'위치 정보'}</DetailInfoLabelText>
                <DetailInfoDescripText>
                  {locationInfo.address > 0 ? locationInfo.address : '-'}
                </DetailInfoDescripText>
                <DentalStaticMapImage
                  source={{uri: locationInfo.clinicStaticMap}}
                />
              </DetailInfoItemContainer>
              <DetailInfoItemContainer>
                <DetailInfoLabelText>{'진료 과목'}</DetailInfoLabelText>
              </DetailInfoItemContainer>
              <DetailInfoItemContainer>
                <DetailInfoLabelText>{'특수 진료 장비'}</DetailInfoLabelText>
              </DetailInfoItemContainer>
              <DetailInfoItemContainer>
                <DetailInfoLabelText>
                  {'전문 및 특수 진료 항목'}
                </DetailInfoLabelText>
                {specialTreatmentInfo.length > 0 &&
                  specialTreatmentInfo.map((item: any, index: number) => {
                    return (
                      <DetailInfoDescripText>
                        {index !== specialTreatmentInfo.length - 1
                          ? item.name + ', '
                          : item.name}
                      </DetailInfoDescripText>
                    );
                  })}
                {specialTreatmentInfo.length === 0 && (
                  <DetailInfoDescripText>{'-'}</DetailInfoDescripText>
                )}
              </DetailInfoItemContainer>
              <DetailInfoItemContainer>
                <DetailInfoLabelText>{'의사 정보'}</DetailInfoLabelText>
                <DentistInfoListContainer>
                  {dentistInfo.specialListDentist !== null && (
                    <DetailInfoDescripText>{`전문의 ${dentistInfo.specialistDentist}명`}</DetailInfoDescripText>
                  )}
                  {dentistInfo.generalDentist !== null && (
                    <DetailInfoDescripText>{`일반의 ${dentistInfo.generalDentist}명`}</DetailInfoDescripText>
                  )}
                  {dentistInfo.resident !== null && (
                    <DetailInfoDescripText>{`레지던트 ${dentistInfo.resident}명`}</DetailInfoDescripText>
                  )}
                  {dentistInfo.intern !== null && (
                    <DetailInfoDescripText>{`인턴 ${dentistInfo.intern}명`}</DetailInfoDescripText>
                  )}
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
                  <DetailInfoDescripText>{`주차 가능 영역 ${parkingInfo.parkingAllowNum}대`}</DetailInfoDescripText>
                )}
                {parkingInfo.parkingCost !== '' && (
                  <DetailInfoDescripText>{`주차 비용 ${parkingInfo.parkingCost}원`}</DetailInfoDescripText>
                )}
                {parkingInfo.parkingNotice !== '' && (
                  <DetailInfoDescripText>{`${parkingInfo.parkingNotice}`}</DetailInfoDescripText>
                )}
              </DetailInfoItemContainer>
              <RequestReviseInfoContainer>
                <RequestReviseInfoTextContainer>
                  <RequestReviseInfoText>
                    {'정보 수정 요청하기'}
                  </RequestReviseInfoText>
                </RequestReviseInfoTextContainer>
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
                    },
                  )
                : null
            }
            onMomentumScrollBegin={onMomentumScrollBegin}
            onScrollEndDrag={onScrollEndDrag}
            onMomentumScrollEnd={onMomentumScrollEnd}
            ItemSeparatorComponent={() => <View style={{height: 10}} />}
            ListHeaderComponent={() => <View style={{height: 10}} />}
            contentContainerStyle={{
              paddingTop: collapsibleViewHeight + tabBarHeight,
              backgroundColor: '#ffffff',
            }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <ReviewTabContainer>
              {dentalDetailInfo.reviews.length > 0 && (
                <ReviewListContainer>
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
                  <ReviewList reviewList={dentalDetailInfo.reviews} />
                </ReviewListContainer>
              )}
              {dentalDetailInfo.reviews.length === 0 && (
                <NoneReviewContainer
                  style={{
                    minHeight: hp('100%') - (headerHeight + tabBarHeight),
                  }}>
                  <NoneReviewText>
                    {'해당 병원에 등록된 리뷰가 없어요!'}
                  </NoneReviewText>
                </NoneReviewContainer>
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
          inactiveColor={{fontColor: '#000000'}}
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
        <Animated.View style={[styles.header, {opacity: headerOpacity}]}>
          <HeaderTitleText>
            {dentalDetailInfo?.clinicInfoHeader?.name}
          </HeaderTitleText>
        </Animated.View>
        <TouchableWithoutFeedback onPress={() => goBack()}>
          <HeaderLeftContainer>
            <HeaderBackIcon
              source={require('~/Assets/Images/HeaderBar/ic_back.png')}
            />
          </HeaderLeftContainer>
        </TouchableWithoutFeedback>
      </HeaderBar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  collapsibleView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: '#FFA088',
  },
  header: {
    position: 'absolute',
    paddingTop: getStatusBarHeight(),
    width: wp('100%'),
    height: getStatusBarHeight() + hp('8%'),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingLeft: wp('10.6%'),
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
    borderColor: '#F0F0F0',
  },
  indicatorContainer: {
    width: wp('100%'),
    backgroundColor: '#ffffff',
  },
  indicator: {
    backgroundColor: '#2998FF',
    height: 4,
    width: wp('19%'),
    marginLeft: (wp('50%') - wp('19%')) / 2,
  },
  certificationIconShadow: {
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.05,
    shadowRadius: 16,
  },
});

export default DentalCollapsibleTabView;

const TEST_DENTAL_DETAIL_DATA = {
  clinicInfoHeader: {
    name: '아너스치과교정과치과의원(강서구-화곡동)',
    address:
      '서울특별시 강서구 강서로 242 3층 307호 (화곡동, 강서힐스테이트상가)',
    telNumber: '02-2602-7222',
    website: 'http://www.honorsdental.com',
    launchDate: '2014-10-14',
    reviewNum: 15,
    conclustionNow: 0,
    lunchTimeNow: 0,
    reviewAVGStarRate: 3.6,
  },
  clinicInfoBody: {
    description: '',
    treatmentTime: {
      weekday: {
        weekdayReceiptNotice: '',
        weekdayLunchTimeNotice: '',
        mon: {
          treatmentTime: ['00:00:00', '00:00:00'],
          lunchTime: ['00:00:00', '00:00:00'],
        },
        tus: {
          treatmentTime: ['00:00:00', '00:00:00'],
          lunchTime: ['00:00:00', '00:00:00'],
        },
        wed: {
          treatmentTime: ['00:00:00', '00:00:00'],
          lunchTime: ['00:00:00', '00:00:00'],
        },
        thu: {
          treatmentTime: ['00:00:00', '00:00:00'],
          lunchTime: ['00:00:00', '00:00:00'],
        },
        fri: {
          treatmentTime: ['00:00:00', '00:00:00'],
          lunchTime: ['00:00:00', '00:00:00'],
        },
      },
      sat: {
        weekendReceiptNotice: '',
        weekendLunchTimeNotice: '',
        weekend_non_consulation_notice: '',
        sat: {
          treatmentTime: ['00:00:00', '00:00:00'],
          lunchTime: ['00:00:00', '00:00:00'],
        },
      },
      sunAndHoliday: {
        weekend_non_consulation_notice: '',
        treatmentTime: [null, null],
      },
    },
    treatmentSubject: [
      {
        name: '치과교정과',
        Clinic_subject: {
          SpecialistDentist_NUM: 1,
          choiceTreatmentDentist_NUM: 0,
        },
      },
    ],
    SpecialTreatment: [
      {
        name: '측두하악관절 자극요법',
      },
      {
        name: '소아야간진료(20시 이후)',
      },
    ],
    dentistInfo: {
      specialistDentist: 1,
      generalDentist: 0,
      resident: 0,
      intern: 1,
    },
    parkingInfo: {
      parkingAllowNum: 0,
      parkingCost: '',
      parkingNotice: '',
    },
    location: {
      address:
        '서울특별시 강서구 강서로 242 3층 307호 (화곡동, 강서힐스테이트상가)',
    },
  },
};

const TEST_DENTAL_REVIEW_DATA = [
  {
    id: 2,
    starRate_cost: 5,
    starRate_treatment: 4,
    starRate_service: 4,
    certifiedBill: true,
    hits: 0,
    treatmentDate: '2020-12-07',
    totalCost: null,
    createdAt: '2020-12-07T03:21:08.000Z',
    updatedAt: '2020-12-07T03:21:08.000Z',
    deletedAt: null,
    userId: 'fb0617b0-33c0-11eb-92de-e3fb3b4e0264',
    dentalClinicId: 43,
    'createdDiff(second)': 352,
    reviewCommentsNum: 0,
    reviewLikeNum: 0,
    viewerLikedReview: 0,
    viewerScrapedReview: 0,
    reviewViewNum: 1,
    reviewDescriptions: '1 2',
    user: {
      nickname: 'jiwon11',
      profileImg: '',
    },
    review_contents: [
      {
        id: 2,
        img_url:
          'https://chikachika-review-images.s3.ap-northeast-2.amazonaws.com/original/1607311267788DBAEB47D-A6A0-45E1-B09D-8B97190FC36E.heic',
        index: 1,
        img_before_after: 'before',
      },
      {
        id: 1,
        img_url:
          'https://chikachika-review-images.s3.ap-northeast-2.amazonaws.com/original/16073112678366055861E-DB4B-4018-95AA-B9F585C2687B.png',
        index: 2,
        img_before_after: 'after',
      },
    ],
    dental_clinic: {
      id: 43,
      name: '시그마치과병원',
    },
    TreatmentItems: [
      {
        name: '복합레진',
        review_treatment_item: {
          cost: 30000,
        },
      },
      {
        name: '임플란트',
        review_treatment_item: {
          cost: 20000,
        },
      },
    ],
  },
  {
    id: 2,
    starRate_cost: 5,
    starRate_treatment: 4,
    starRate_service: 4,
    certifiedBill: true,
    hits: 0,
    treatmentDate: '2020-12-07',
    totalCost: null,
    createdAt: '2020-12-07T03:21:08.000Z',
    updatedAt: '2020-12-07T03:21:08.000Z',
    deletedAt: null,
    userId: 'fb0617b0-33c0-11eb-92de-e3fb3b4e0264',
    dentalClinicId: 43,
    'createdDiff(second)': 352,
    reviewCommentsNum: 0,
    reviewLikeNum: 0,
    viewerLikedReview: 0,
    viewerScrapedReview: 0,
    reviewViewNum: 1,
    reviewDescriptions: '1 2',
    user: {
      nickname: 'jiwon11',
      profileImg: '',
    },
    review_contents: [
      {
        id: 2,
        img_url:
          'https://chikachika-review-images.s3.ap-northeast-2.amazonaws.com/original/1607311267788DBAEB47D-A6A0-45E1-B09D-8B97190FC36E.heic',
        index: 1,
        img_before_after: 'before',
      },
      {
        id: 1,
        img_url:
          'https://chikachika-review-images.s3.ap-northeast-2.amazonaws.com/original/16073112678366055861E-DB4B-4018-95AA-B9F585C2687B.png',
        index: 2,
        img_before_after: 'after',
      },
    ],
    dental_clinic: {
      id: 43,
      name: '시그마치과병원',
    },
    TreatmentItems: [
      {
        name: '복합레진',
        review_treatment_item: {
          cost: 30000,
        },
      },
      {
        name: '임플란트',
        review_treatment_item: {
          cost: 20000,
        },
      },
    ],
  },
  {
    id: 2,
    starRate_cost: 5,
    starRate_treatment: 4,
    starRate_service: 4,
    certifiedBill: true,
    hits: 0,
    treatmentDate: '2020-12-07',
    totalCost: null,
    createdAt: '2020-12-07T03:21:08.000Z',
    updatedAt: '2020-12-07T03:21:08.000Z',
    deletedAt: null,
    userId: 'fb0617b0-33c0-11eb-92de-e3fb3b4e0264',
    dentalClinicId: 43,
    'createdDiff(second)': 352,
    reviewCommentsNum: 0,
    reviewLikeNum: 0,
    viewerLikedReview: 0,
    viewerScrapedReview: 0,
    reviewViewNum: 1,
    reviewDescriptions: '1 2',
    user: {
      nickname: 'jiwon11',
      profileImg: '',
    },
    review_contents: [
      {
        id: 2,
        img_url:
          'https://chikachika-review-images.s3.ap-northeast-2.amazonaws.com/original/1607311267788DBAEB47D-A6A0-45E1-B09D-8B97190FC36E.heic',
        index: 1,
        img_before_after: 'before',
      },
      {
        id: 1,
        img_url:
          'https://chikachika-review-images.s3.ap-northeast-2.amazonaws.com/original/16073112678366055861E-DB4B-4018-95AA-B9F585C2687B.png',
        index: 2,
        img_before_after: 'after',
      },
    ],
    dental_clinic: {
      id: 43,
      name: '시그마치과병원',
    },
    TreatmentItems: [
      {
        name: '복합레진',
        review_treatment_item: {
          cost: 30000,
        },
      },
      {
        name: '임플란트',
        review_treatment_item: {
          cost: 20000,
        },
      },
    ],
  },
  {
    id: 2,
    starRate_cost: 5,
    starRate_treatment: 4,
    starRate_service: 4,
    certifiedBill: true,
    hits: 0,
    treatmentDate: '2020-12-07',
    totalCost: null,
    createdAt: '2020-12-07T03:21:08.000Z',
    updatedAt: '2020-12-07T03:21:08.000Z',
    deletedAt: null,
    userId: 'fb0617b0-33c0-11eb-92de-e3fb3b4e0264',
    dentalClinicId: 43,
    'createdDiff(second)': 352,
    reviewCommentsNum: 0,
    reviewLikeNum: 0,
    viewerLikedReview: 0,
    viewerScrapedReview: 0,
    reviewViewNum: 1,
    reviewDescriptions: '1 2',
    user: {
      nickname: 'jiwon11',
      profileImg: '',
    },
    review_contents: [
      {
        id: 2,
        img_url:
          'https://chikachika-review-images.s3.ap-northeast-2.amazonaws.com/original/1607311267788DBAEB47D-A6A0-45E1-B09D-8B97190FC36E.heic',
        index: 1,
        img_before_after: 'before',
      },
      {
        id: 1,
        img_url:
          'https://chikachika-review-images.s3.ap-northeast-2.amazonaws.com/original/16073112678366055861E-DB4B-4018-95AA-B9F585C2687B.png',
        index: 2,
        img_before_after: 'after',
      },
    ],
    dental_clinic: {
      id: 43,
      name: '시그마치과병원',
    },
    TreatmentItems: [
      {
        name: '복합레진',
        review_treatment_item: {
          cost: 30000,
        },
      },
      {
        name: '임플란트',
        review_treatment_item: {
          cost: 20000,
        },
      },
    ],
  },
  {
    id: 2,
    starRate_cost: 5,
    starRate_treatment: 4,
    starRate_service: 4,
    certifiedBill: true,
    hits: 0,
    treatmentDate: '2020-12-07',
    totalCost: null,
    createdAt: '2020-12-07T03:21:08.000Z',
    updatedAt: '2020-12-07T03:21:08.000Z',
    deletedAt: null,
    userId: 'fb0617b0-33c0-11eb-92de-e3fb3b4e0264',
    dentalClinicId: 43,
    'createdDiff(second)': 352,
    reviewCommentsNum: 0,
    reviewLikeNum: 0,
    viewerLikedReview: 0,
    viewerScrapedReview: 0,
    reviewViewNum: 1,
    reviewDescriptions: '1 2',
    user: {
      nickname: 'jiwon11',
      profileImg: '',
    },
    review_contents: [
      {
        id: 2,
        img_url:
          'https://chikachika-review-images.s3.ap-northeast-2.amazonaws.com/original/1607311267788DBAEB47D-A6A0-45E1-B09D-8B97190FC36E.heic',
        index: 1,
        img_before_after: 'before',
      },
      {
        id: 1,
        img_url:
          'https://chikachika-review-images.s3.ap-northeast-2.amazonaws.com/original/16073112678366055861E-DB4B-4018-95AA-B9F585C2687B.png',
        index: 2,
        img_before_after: 'after',
      },
    ],
    dental_clinic: {
      id: 43,
      name: '시그마치과병원',
    },
    TreatmentItems: [
      {
        name: '복합레진',
        review_treatment_item: {
          cost: 30000,
        },
      },
      {
        name: '임플란트',
        review_treatment_item: {
          cost: 20000,
        },
      },
    ],
  },
  {
    id: 2,
    starRate_cost: 5,
    starRate_treatment: 4,
    starRate_service: 4,
    certifiedBill: true,
    hits: 0,
    treatmentDate: '2020-12-07',
    totalCost: null,
    createdAt: '2020-12-07T03:21:08.000Z',
    updatedAt: '2020-12-07T03:21:08.000Z',
    deletedAt: null,
    userId: 'fb0617b0-33c0-11eb-92de-e3fb3b4e0264',
    dentalClinicId: 43,
    'createdDiff(second)': 352,
    reviewCommentsNum: 0,
    reviewLikeNum: 0,
    viewerLikedReview: 0,
    viewerScrapedReview: 0,
    reviewViewNum: 1,
    reviewDescriptions: '1 2',
    user: {
      nickname: 'jiwon11',
      profileImg: '',
    },
    review_contents: [
      {
        id: 2,
        img_url:
          'https://chikachika-review-images.s3.ap-northeast-2.amazonaws.com/original/1607311267788DBAEB47D-A6A0-45E1-B09D-8B97190FC36E.heic',
        index: 1,
        img_before_after: 'before',
      },
      {
        id: 1,
        img_url:
          'https://chikachika-review-images.s3.ap-northeast-2.amazonaws.com/original/16073112678366055861E-DB4B-4018-95AA-B9F585C2687B.png',
        index: 2,
        img_before_after: 'after',
      },
    ],
    dental_clinic: {
      id: 43,
      name: '시그마치과병원',
    },
    TreatmentItems: [
      {
        name: '복합레진',
        review_treatment_item: {
          cost: 30000,
        },
      },
      {
        name: '임플란트',
        review_treatment_item: {
          cost: 20000,
        },
      },
    ],
  },
];
