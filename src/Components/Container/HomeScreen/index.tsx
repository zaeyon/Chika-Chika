import React, {useState, useEffect, useCallback, useRef} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import Styled from 'styled-components/native';
import SafeAreaView from 'react-native-safe-area-view';
import {Image, Animated, TouchableOpacity, RefreshControl, Platform, TouchableWithoutFeedback, LayoutAnimation, PermissionsAndroid, } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// import DeviceInfo from 'react-native-device-info';
import {BoxShadow} from 'react-native-shadow';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import Geolocation from 'react-native-geolocation-service';

// Firebase
import messaging from '@react-native-firebase/messaging';

// Redux
import {useSelector, useDispatch} from 'react-redux';
import allActions from '~/actions';

//Local Component
import HomeInfoContent from '~/Components/Presentational/HomeScreen/HomeInfoContent';
import HomeReviewContent from '~/Components/Presentational/HomeScreen/HomeReviewContent';
import ToastMessage from '~/Components/Presentational/ToastMessage';
import HomeElderClinicContent from '~/Components/Presentational/HomeScreen/HomeElderClinicContent'
import HomeOpenedClinicContent from '~/Components/Presentational/HomeScreen/HomeOpenedClinicContent'

// Routes
import GETSearchRecord from '~/Routes/Search/GETSearchRecord';
import GETCommunityPosts from '~/Routes/Community/showPosts/GETCommunityPosts';
import GETTotalSearch from '~/Routes/Search/GETTotalSearch';
import GETLocalClinicAndReviewCount from '~/Routes/Main/GETLocalClinicAndReviewCount';
import GETLocalClinic from '~/Routes/Main/GETLocalClinic';
import GETUserNotifications from '~/Routes/Notification/GETUserNotifications';
import GETElderClinics from '~/Routes/Dental/GETElderClinics';

import {hasNotch} from '~/method/deviceInfo'
import { getStatusBarHeight } from 'react-native-status-bar-height';

const ContainerView = Styled(
  (SafeAreaView as unknown) as new () => SafeAreaView,
)`
flex: 1;
background: #FFFFFF;
padding-top: ${Platform.OS === 'ios' ? (hasNotch() ? getStatusBarHeight() : 0) : 0};
`;

const HomeLogoImage = Styled.Image``;

const PartitionView = Styled.View`
width: ${wp('100%')}px;
height: 8px;
background: #F5F7F9;
margin-bottom: 16px;
`;

const ContentScrollView = Styled.ScrollView`
flex: 1;
`;

const BodyContainerView = Styled.View`
flex: 1;
background: #F5F7F9;
`

const HeaderContainerView = Styled.View`
width: 100%;
flex-direction: row;
padding: 20px 16px 15px 16px;
background: #FFFFFF;
align-items: center;
z-index: 2;
border-color: #F5F7F9;

`;

const HeaderIconContainerView = Styled.View`
width: auto
height: auto;
flex-direction: row;
margin-left: auto;
`;

const HeaderIconTouchableOpacity = Styled.TouchableOpacity`
width: 30px;
height: 30px;
margin-left: 16px;
border-radius: 15px;
justify-content: center;
align-items: center;
`;

const FloatingButtonView = Styled.View`
position: absolute;
elevation: 2;
align-self: center;
bottom: ${24 + (Platform.OS === 'ios' ? ( hasNotch() ? hp('10.59%') : hp('6.92%')) : hp('6.92%'))}px;
padding: 8px 24px;
background: #131F3C;
box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
border-radius: 100px;
`;

const FloatingButtonText = Styled.Text`
font-weight: bold;
font-size: 16px;
line-height: 24px;
color: #FFFFFF;
`;

const LocationContainerView = Styled.View`
margin: 21px 16px 0px 16px;
flex-direction: row;
align-items: center;
background: #FFFFFF;
padding: 9px 21px;
border-radius: 4px;
box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);
`;

const LocationImage = Styled.Image`
margin-right: 8px;
`;

const LocationText = Styled.Text`
font-style: normal;
font-weight: bold;
font-size: 14px;
line-height: 24px;
color: #000000;
`;

const LocationButtonView = Styled.View`
background: #131F3C;
border-radius: 100px;
padding: 4px 10px;
margin-left: auto;
flex-direction: row;
align-items: center;
height: 100%;
`;

const LocationButtonImage = Styled.Image`
margin-right: 4px;
`;

const LocationButtonText = Styled.Text`
font-weight: 800;
font-size: 12px;
line-height: 24px;
color: #FFFFFF;
`;

interface Props {
  navigation: any;
  route: any;
}

interface ReviewData {
  name: string;
  data: any;
}

const HomeScreen = ({navigation, route}: Props) => {
  const [onMessage, setOnMessage] = useState(false);
  const alertScale = useRef(new Animated.Value(0)).current;

  const [tagFilterItems, setTagFilterItems] = useState([
    {name: '스케일링', category: 'treatment'},
  ]);

  const [reviewData, setReviewData] = useState([]);
  const [postData, setPostData] = useState<ReviewData[]>();
  const [openedClinicData, setOpenedClinicData] = useState([]);
  const [elderClinicData, setElderClinicData] = useState([]);

  const [refreshing, setRefreshing] = useState(false);

  const [isReviewInitialized, setIsReviewInitialized] = useState(false);
  const [isOpenedClinicInitialized, setIsOpenedClinicInitialized] = useState(false);
  const [isElderClinicInitialized, setIsElderClinicInitialized] = useState(false);

  const [prevOffsetY, setPrevOffsetY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('up');
  const floatY = useRef(new Animated.Value(0)).current;

  const jwtToken = useSelector((state: any) => state.currentUser.jwtToken);

  const [isMainHomeChanged, setIsMainHomeChanged] = useState(true);

  const [defaultHometown, setDefaultHometown] = useState({UsersCities: {now: false}, emdName: "압구정동", fullCityName: "서울특별시 강남구 압구정동", id: 824, sido: "서울특별시", sigungu: "강남구"})
  const selectedHometown = useSelector(
    (state: any) =>
      state.currentUser.hometown &&
      state.currentUser.hometown.find((item) => item.UsersCities?.now === true),
  );
  const currentUserLocation = useSelector(
    (state: any) => state.currentUser.currentUserLocation,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (route.params?.isUploadReview) {
      ToastMessage.show('리뷰작성이 완료되었습니다!');
    }
  }, [route.params?.isUploadReview]);

  useFocusEffect(
    useCallback(() => {
      console.log('home focused');
      if (selectedHometown) {
        setIsMainHomeChanged((prev) => {
          if (prev) {
            fetchRecentReviews(selectedHometown);
            fetchOpenedClinics()
            fetchElderClinics()

            // fetchLocalInfo(selectedHometown);
            // fetchRecentCommunityPosts(selectedHometown);
          }
          return false;
        });
      }
    }, [selectedHometown]),
  );

  useEffect(() => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(400, 'easeInEaseOut', 'opacity'),
    );
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      setOnMessage(true);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    Animated.timing(floatY, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    GETUserNotifications({jwtToken})
      .then((response) => {
        console.log('GETUserNotifications response', response);
        dispatch(allActions.userActions.setNotificationArray(response));
      })
      .catch((error) => {
        console.log('GETUserNotifications error', error);
      });
  }, []);

  useEffect(() => {
    setIsMainHomeChanged(true);
  }, [selectedHometown]);

  useEffect(() => {
    if (onMessage) {
      Animated.timing(alertScale, {
        toValue: 1,
        duration: 100,

        useNativeDriver: true,
      }).start(() => {
        Animated.timing(alertScale, {
          toValue: 0,
          duration: 100,

          useNativeDriver: true,
        }).start();
      });
    }
  }, [onMessage]);

  useEffect(() => {
    messaging().onNotificationOpenedApp((remoteMessage: any) => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
        'data',
        remoteMessage.data,
      );
      switch (remoteMessage.data.targetType) {
        case 'community':
          navigation.navigate('CommunityStackScreen', {
            screen: 'CommunityDetailScreen',
            params: {
              id: remoteMessage.data.targetId,
              type: 'Notification',
              category: remoteMessage.data.type,
              commentId: remoteMessage.data.commentId,
            },
          });
          return;
        case 'review':
          navigation.navigate('ReviewStackScreen', {
            screen: 'ReviewDetailScreen',
            params: {
              reviewId: remoteMessage.data.targetId,
              type: 'Notification',
              category: remoteMessage.data.type,
              commentId: remoteMessage.data.commentId,
            },
          });
        default:
      }
    });

    GETSearchRecord({jwtToken, isUnified: true})
      .then((response: any) => {
        console.log('통합검색 검색기록 response', response);
        dispatch(allActions.userActions.setSearchRecord(response));
      })
      .catch((error) => {
        console.log('통합검색 검색기록 error', error);
      });

    GETSearchRecord({jwtToken})
      .then((response: any) => {
        console.log('병원검색 검색기록 response', response);
        dispatch(allActions.userActions.setDentalSearchRecord(response));
      })
      .catch((error) => {
        console.log('병원검색 검색기록 error', error);
      });
  }, []);

  async function getAndroidInitialNearDental() {
    const permission = PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;
    const hasLocationPermission = await PermissionsAndroid.check(permission);
    if (hasLocationPermission) {
      Geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          dispatch(allActions.userActions.setCurrentUserLocation(userLocation));
          return position;
        },
        (error) => {
          ToastMessage.show('현재 위치를 불러오는데 실패했습니다ㅠㅠ');

          // 서울 시청 좌표
          const lat = 37.566515657875435;
          const long = 126.9781164904998;

          return false;
        },
        {enableHighAccuracy: false, timeout: 10000, maximumAge: 10000},
      );
    } else {
      const status = await PermissionsAndroid.request(permission);
      return status === 'granted';
    }
  }

  async function getIosInitialNearDental(callback: any) {
    const hasLocationPermission = true;
    if (hasLocationPermission) {
      return Geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            long: position.coords.longitude,
          };
          dispatch(allActions.userActions.setCurrentUserLocation(userLocation));
          callback(userLocation)
        },
        (error) => {
          ToastMessage.show('현재 위치를 불러오는데 실패했습니다ㅠㅠ');
          // 서울 시청 좌표
          const lat = 37.566515657875435;
          const long = 126.9781164904998;
          const userLocation = {
            lat,
            long
          };
          callback(userLocation)
        },
        {enableHighAccuracy: false, timeout: 10000, maximumAge: 10000},
      );
    }
  }
  
  const fetchLocalInfo = useCallback(
    (selectedHometown, callback = () => console.log('fetchLocalInfo')) => {
      GETLocalClinicAndReviewCount({
        jwtToken,
        cityId: String(selectedHometown?.id),
      }).then((response: any) => {
        callback();
      });
    },
    [jwtToken],
  );

  const fetchRecentReviews = useCallback(
    async (selectedHometown: any) => {
      const form = {
        jwtToken,
        query: '',
        pathType: 'review',
        limit: '10',
        offset: '0',
        order: 'createdAt',
        region: 'residence',
        cityId: String(selectedHometown.id),
        isUnified: false,
      };
      const data = await GETTotalSearch(form);
      setIsReviewInitialized(true);
      setReviewData(data);
    },
    [jwtToken, tagFilterItems],
  );

  const fetchOpenedClinics = useCallback(() => {
    // Call API
    setIsOpenedClinicInitialized(true);
  }, [jwtToken]);

  const fetchElderClinics = useCallback(async () => {
    getIosInitialNearDental((currentLocation: any) => {
      const form = {
        jwtToken,
        limit: 30,
        offset: 0,
        cityId: selectedHometown.id,
        lat: currentLocation.lat,
        long: currentLocation.long
      };
      GETElderClinics(form).then((response: any) => {
        setElderClinicData(response);
        setIsElderClinicInitialized(true);
      })
    })
    
  }, [jwtToken, getIosInitialNearDental]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchLocalInfo(selectedHometown || defaultHometown, () => setRefreshing(false));
    fetchRecentReviews(selectedHometown || defaultHometown);
    fetchOpenedClinics();
    fetchElderClinics();
  }, [
    selectedHometown,
    fetchLocalInfo,
    fetchRecentReviews,
  ]);

  const moveToDetailMap =  useCallback((params: {
    title: string;
    clinics: any;
  }) => {
    navigation.navigate('DetailMapScreen', params)
  }, [])

  const moveToCommunityDetail = useCallback(
    (postId: number, postType: string) => {
      navigation.navigate('CommunityStackScreen', {
        screen: 'CommunityDetailScreen',
        params: {
          id: postId,
          type: postType,
        },
      });
    },
    [],
  );

  const moveToAnotherProfile = useCallback(
    (userId: string, nickname: string, profileImageUri: string) => {
      navigation.navigate('AnotherProfileStackScreen', {
        targetUser: {
          userId,
          nickname,
          profileImageUri,
        },
      });
    },
    [],
  );

  const moveToTotalKeywordSearch = () => {
    console.log('moveToTotalKeywordSearch');
    navigation.navigate('TotalKeywordSearchStackScreen', {
      screen: 'TotalKeywordSearchScreen',
    });
  };

  const moveToNotificationList = () => {
    navigation.navigate('NotificationStackScreen', {
      screen: 'NotificationListScreen',
    });
  };

  const moveToReviewUpload = useCallback(() => {
    
    navigation.navigate('BraceReviewUploadStackScreen', {
      screen: 'BraceReviewMetaDataScreen',
      params: {
        requestType: 'post',
      },
    });
  }, []);

  const moveToReviewDetail = useCallback((reviewId: number) => {
    console.log('moveToReviewDetail reviewId', reviewId);

    navigation.navigate('ReviewStackScreen', {
      screen: 'ReviewDetailScreen',
      params: {
        reviewId: reviewId,
      },
    });
  }, []);

  const moveToHometownSetting = useCallback(() => {
    navigation.navigate('HometownSettingScreen');
  }, []);

  const moveToHometownSearch = useCallback(() => {
    navigation.navigate('HometownSearchScreen', {
      requestType: 'initialize'
    });
  }, [])


  const moveToFilteredDentalMap = useCallback((filterType: string) => {
    if(filterType === "교정 전문의") {
      dispatch(allActions.dentalFilterActions.setHomeDentalFilter("specialist"));
      navigation.navigate("지도")
    } else if(filterType === "좋은 치과") {
      dispatch(allActions.dentalFilterActions.setHomeDentalFilter("goodDental"));
      navigation.navigate("지도")
    } else if(filterType === "야간진료") {
      dispatch(allActions.dentalFilterActions.setHomeDentalFilter("nightCare"));
      navigation.navigate("지도")
    }
  }, [])
  
  return (
    <ContainerView as={SafeAreaView}>
        <HeaderContainerView>
          <HomeLogoImage
            source={require('~/Assets/Images/Logo/ic_home_logo.png')}
          />
          <HeaderIconContainerView>
            <HeaderIconTouchableOpacity
              onPress={() => moveToTotalKeywordSearch()}>
              <Image source={require('~/Assets/Images/TopTab/ic/search.png')} />
            </HeaderIconTouchableOpacity>
            <HeaderIconTouchableOpacity
              onPress={() => {
                setOnMessage(false);
                moveToNotificationList();
              }}>
              <Animated.Image
                style={{
                  transform: [
                    {
                      rotate: alertScale.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '15deg'],
                        extrapolate: 'clamp',
                      }),
                    },
                    {
                      scale: alertScale.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 1.15],
                        extrapolate: 'clamp',
                      }),
                    },
                  ],
                }}
                source={
                  onMessage
                    ? require('~/Assets/Images/TopTab/ic/alarm/focus.png')
                    : require('~/Assets/Images/TopTab/ic/alarm/unfocus.png')
                }
              />
            </HeaderIconTouchableOpacity>
            <HeaderIconTouchableOpacity onPress={() => moveToReviewUpload()}>
              <Image
                source={require('~/Assets/Images/TopTab/ic/write/black.png')}
              />
            </HeaderIconTouchableOpacity>
          </HeaderIconContainerView>
        </HeaderContainerView>
      <ContentScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            enabled={refreshing}
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: hp('6.92%'),
        }}
        scrollEventThrottle={16}
        onScroll={(event) => {
          setPrevOffsetY(event.nativeEvent.contentOffset.y);
          if (prevOffsetY - event.nativeEvent.contentOffset.y >= 5) {
            if (
              scrollDirection === 'down' &&
              event.nativeEvent.contentOffset.y > 0 &&
              event.nativeEvent.contentSize.height -
                event.nativeEvent.layoutMeasurement.height >
                event.nativeEvent.contentOffset.y
            ) {
              Animated.timing(floatY, {
                toValue: 1,
                duration: 150,
                useNativeDriver: true,
              }).start();
              setScrollDirection('up');
            }
          } else if (event.nativeEvent.contentOffset.y - prevOffsetY >= 5) {
            if (
              scrollDirection === 'up' &&
              event.nativeEvent.contentOffset.y > 0
            ) {
              Animated.timing(floatY, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
              }).start();
              setScrollDirection('down');
            }
          }
        }}>
        <HomeInfoContent
        moveToFilteredDentalMap={moveToFilteredDentalMap}/>
      <BodyContainerView>
        <LocationContainerView>
          <LocationImage source={require('~/Assets/Images/Home/ic_location_info.png')}/>
          <LocationText>
            <LocationText style={{
              fontWeight: 'bold'
            }}>
              {"다른지역"}
            </LocationText>
            {"의 치과가 궁금하세요?"}
          </LocationText>
          <TouchableWithoutFeedback onPress={() => selectedHometown ? moveToHometownSetting() : moveToHometownSearch()}>
          <LocationButtonView>
            <LocationButtonImage source={require('~/Assets/Images/Home/ic_location_focus.png')}/>
            <LocationButtonText>
              {selectedHometown?.emdName || defaultHometown?.emdName}
            </LocationButtonText>
          </LocationButtonView>
          </TouchableWithoutFeedback>
        </LocationContainerView>
        <HomeReviewContent
          initialized={isReviewInitialized}
          selectedHometown={selectedHometown?.emdName || defaultHometown?.emdName}
          reviewData={reviewData}
          moveToReviewUpload={moveToReviewUpload}
          moveToReviewDetail={moveToReviewDetail}
        />
        <HomeOpenedClinicContent initialized={isOpenedClinicInitialized} clinics={openedClinicData} moveToDetailMap={moveToDetailMap}/>
        <HomeElderClinicContent initialized={isElderClinicInitialized} clinics={elderClinicData} moveToDetailMap={moveToDetailMap}/>

        </BodyContainerView>
      </ContentScrollView>
      <FloatingButtonView
        as={Animated.View}
        style={{
          transform: [
            {
              translateY: floatY.interpolate({
                inputRange: [0, 1],
                outputRange: [
                  64 + (Platform.OS === 'ios' ? ( hasNotch() ? hp('10.59%') : hp('6.92%')) : hp('6.92%')),
                  0,
                ],
                extrapolate: 'clamp',
              }),
            },
          ],
        }}>
        <TouchableOpacity
          onPress={() => {
            ReactNativeHapticFeedback.trigger('impactLight');
            moveToReviewUpload();
          }}>
          <FloatingButtonText>{'리뷰 작성하기'}</FloatingButtonText>
        </TouchableOpacity>
      </FloatingButtonView>
      
    </ContainerView>
  );
};

export default HomeScreen;
