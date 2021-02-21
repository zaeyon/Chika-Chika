import React, {useState, useEffect, useCallback, useRef} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import Styled from 'styled-components/native';
import SafeAreaView from 'react-native-safe-area-view';
import {Image, Animated, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DeviceInfo from 'react-native-device-info';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

// Firebase
import messaging from '@react-native-firebase/messaging';

// Redux
import {useSelector, useDispatch} from 'react-redux';
import allActions from '~/actions';

//Local Component
import HomeInfoContent from '~/Components/Presentational/HomeScreen/HomeInfoContent';
import HomeClinicContent from '~/Components/Presentational/HomeScreen/HomeClinicContent';
import HomeReviewContent from '~/Components/Presentational/HomeScreen/HomeReviewContent';
import HomeCommunityContent from '~/Components/Presentational/HomeScreen/HomeCommunityContent';
// Routes
import GETSearchRecord from '~/Routes/Search/GETSearchRecord';
import GETCommunityPosts from '~/Routes/Community/showPosts/GETCommunityPosts';
import GETTotalSearch from '~/Routes/Search/GETTotalSearch';
import GETLocalClinicAndReviewCount from '~/Routes/Main/GETLocalClinicAndReviewCount';
import GETLocalClinic from '~/Routes/Main/GETLocalClinic';

const ContainerView = Styled.View`
flex: 1;
background: #FFFFFF;
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

const HeaderContainerView = Styled.View`
width: 100%;
flex-direction: row;
padding: 20px 16px 15px 16px;
background: #FFFFFF;
align-items: center;
z-index: 2;
margin-bottom: 8px;
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
align-self: center;
bottom: ${24 + (DeviceInfo.hasNotch() ? hp('10.59%') : hp('7.2%'))}px;
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

const BannerImage = Styled.Image`

margin-bottom: 16px;
margin: 0px 16px;
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
  const [localClinicCount, setLocalClinicCount] = useState<number>(0);
  const [localReviewCount, setLocalReviewCount] = useState<number>(0);

  const [onMessage, setOnMessage] = useState(false);
  const alertScale = useRef(new Animated.Value(0)).current;

  const [tagFilterItems, setTagFilterItems] = useState([
    {name: '충치', category: 'treatment', id: '1386'},
    {name: '교정', category: 'treatment'},
    {name: '임플란트', category: 'treatment'},
  ]);

  const [reviewData, setReviewData] = useState([]);
  const [postData, setPostData] = useState<ReviewData[]>();
  const [clinicData, setClinicData] = useState([]);

  const [prevOffsetY, setPrevOffsetY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('down');
  const floatY = useRef(new Animated.Value(0)).current;

  const jwtToken = useSelector((state: any) => state.currentUser.jwtToken);

  const [isMainHomeChanged, setIsMainHomeChanged] = useState(true);
  const selectedHometown = useSelector(
    (state: any) =>
      state.currentUser.hometown &&
      state.currentUser.hometown.find((item) => item.UsersCities?.now === true),
  );

  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      if (selectedHometown) {
        setIsMainHomeChanged((prev) => {
          if (prev) {
            fetchRecentCommunityPosts(selectedHometown);
            fetchRecentReviews(selectedHometown);
            fetchLocalInfo(selectedHometown);
            fetchLocalClinics(selectedHometown);
          }
          return false;
        });
      }
    }, [selectedHometown]),
  );

  useEffect(() => {
    if (selectedHometown) {
      fetchRecentCommunityPosts(selectedHometown);
      fetchRecentReviews(selectedHometown);
      fetchLocalInfo(selectedHometown);
    }
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      setOnMessage(true);
    });
    return unsubscribe;
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
            },
          });
          return;
        default:
      }
    });

    GETSearchRecord({jwtToken})
      .then(async (response: any) => {
        console.log('GETSearchRecord response', response);
        dispatch(allActions.userActions.setSearchRecord(response));

        const getDentalSearchRecord = async (searchRecordArray: any) => {
          let tmpDentalSearchRecordArray = new Array();
          await searchRecordArray.forEach((item: any, index: number) => {
            if (item.category === 'clinic' || item.category === 'city') {
              return tmpDentalSearchRecordArray.push(item);
            }
          });

          return tmpDentalSearchRecordArray;
        };

        const tmpDentalSearchRecordArray = await getDentalSearchRecord(
          response,
        );
        console.log(
          'GETSearchRecord tmpDentalSearchRecordArray',
          tmpDentalSearchRecordArray,
        );
        dispatch(
          allActions.userActions.setDentalSearchRecord(
            tmpDentalSearchRecordArray,
          ),
        );
      })
      .catch((error) => {
        console.log('GETSearchRecord error', error);
      });
  }, []);

  const fetchLocalInfo = useCallback(
    (selectedHometown) => {
      GETLocalClinicAndReviewCount({
        jwtToken,
        cityId: String(selectedHometown.id),
      }).then((response: any) => {
        setLocalClinicCount(response.residenceClinicsNum);
        setLocalReviewCount(response.residenceReviewsNum);
      });
    },
    [jwtToken],
  );

  const fetchLocalClinics = useCallback(
    (selectedHometown) => {
      GETLocalClinic({
        jwtToken,
        cityId: String(selectedHometown.id),
        lat: '37.566515657875435',
        long: '126.9781164904998',
      }).then((response: any) => {
        setClinicData(response);
      });
    },
    [jwtToken],
  );

  const fetchRecentReviews = useCallback(
    async (selectedHometown: any) => {
      const result = await Promise.all(
        tagFilterItems.map(async (tagItem) => {
          const form = {
            jwtToken,
            query: tagItem.name,
            category: tagItem.category,
            pathType: 'review',
            tagId: tagItem.id,
            limit: '4',
            offset: '0',
            order: 'createdAt',
            region: 'residence',
            cityId: String(selectedHometown.id),
            isUnified: false,
          };
          const data = await GETTotalSearch(form);
          return {
            name: tagItem.name,
            data,
          };
        }),
      );
      setReviewData(result);
    },
    [jwtToken, tagFilterItems],
  );

  const fetchRecentCommunityPosts = useCallback(
    (selectedHometown) => {
      const form = {
        type: 'All',
        limit: 10,
        offset: 0,
        order: 'createdAt',
        region: 'residence',
      };
      GETCommunityPosts(jwtToken, String(selectedHometown.id), form).then(
        (response: any) => {
          setPostData(response);
        },
      );
    },
    [jwtToken],
  );

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
    navigation.navigate('ReviewUploadStackScreen', {
      screen: 'ReviewGuideScreen',
      params: {
        requestType: 'post',
      },
    });
  }, []);

  const moveToReviewDetail = useCallback(
    (
      reviewId: number,
      writer: object,
      createdAt: string,
      treatmentArray: Array<object>,
      ratingObj: object,
      treatmentDate: string,
      imageArray: Array<object>,
      isCurUserLike: boolean,
      likeCount: number,
      commentCount: number,
      isCurUserScrap: boolean,
      dentalObj: object,
      visibleElapsedTime: boolean,
      elapsedTime: string,
    ) => {
      console.log('moveToReviewDetail reviewId', reviewId);

      navigation.navigate('ReviewStackScreen', {
        screen: 'ReviewDetailScreen',
      });
    },
    [],
  );

  const moveToHomeTownSetting = useCallback(() => {
    navigation.navigate('HometownSettingScreen');
  }, []);

  return (
    <ContainerView as={SafeAreaView}>
      <ContentScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: hp('9.1%'),
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
        <HomeInfoContent
          isMainHomeChanged={isMainHomeChanged}
          selectedHometown={selectedHometown}
          localClinicCount={localClinicCount}
          localReviewCount={localReviewCount}
          moveToHomeTownSetting={moveToHomeTownSetting}
        />
        <PartitionView />

        <HomeReviewContent
          selectedHometown={selectedHometown?.emdName}
          tagFilterItems={tagFilterItems}
          reviewData={reviewData}
          moveToReviewDetail={moveToReviewDetail}
        />
        <HomeCommunityContent
          selectedHometown={selectedHometown?.emdName}
          postData={postData}
          moveToCommunityDetail={moveToCommunityDetail}
          moveToAnotherProfile={moveToAnotherProfile}
        />
        <BannerImage source={require('~/Assets/Images/Home/banner_1.png')} />
      </ContentScrollView>

      <FloatingButtonView
        as={Animated.View}
        style={{
          transform: [
            {
              translateY: floatY.interpolate({
                inputRange: [0, 1],
                outputRange: [
                  64 + (DeviceInfo.hasNotch() ? hp('10.59%') : hp('7.2%')),
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
