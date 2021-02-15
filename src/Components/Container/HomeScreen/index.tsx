import React, {useState, useEffect, useCallback, useRef} from 'react';
import Styled from 'styled-components/native';
import SafeAreaView from 'react-native-safe-area-view';
import {Image, Animated, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

// Firebase
import messaging from '@react-native-firebase/messaging';

// Redux
import {useSelector, useDispatch} from 'react-redux';
import allActions from '~/actions';

//Local Component
import HomeInfoContent from '~/Components/Presentational/HomeScreen/HomeInfoContent';
import HomeReviewContent from '~/Components/Presentational/HomeScreen/HomeReviewContent';
import HomeCommunityContent from '~/Components/Presentational/HomeScreen/HomeCommunityContent';
// Routes
import GETSearchRecord from '~/Routes/Search/GETSearchRecord';
import GETCommunityPosts from '~/Routes/Community/showPosts/GETCommunityPosts';
import GETTotalSearch from '~/Routes/Search/GETTotalSearch';

const ContainerView = Styled.View`
flex: 1;
background: #FFFFFF;
`;

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
z-index: 2;
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
bottom: 70px;
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
interface Props {
  navigation: any;
  route: any;
}

interface ReviewData {
  name: string;
  data: any;
}

const HomeScreen = ({navigation, route}: Props) => {
  const [localClinicCount, setLocalClinicCount] = useState<number>(333);
  const [localReviewCount, setLocalReviewCount] = useState<number>(23);
  const [selectedHometown, setSelectedHometown] = useState<any>();

  const [tagFilterItems, setTagFilterItems] = useState([
    {name: '충치', category: 'treatment', id: '1386'},
    {name: '교정', category: 'treatment'},
    {name: '임플란트', category: 'treatment'},
  ]);

  const [reviewData, setReviewData] = useState([]);
  const [postData, setPostData] = useState<ReviewData[]>();

  const [prevOffsetY, setPrevOffsetY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('down');
  const floatY = useRef(new Animated.Value(0)).current;

  const jwtToken = useSelector((state: any) => state.currentUser.jwtToken);
  const profile = useSelector((state: any) => state.currentUser.profile);
  const hometown = useSelector((state: any) => state.currentUser.hometown);

  const dispatch = useDispatch();

  useEffect(() => {
    if (hometown) {
      setSelectedHometown(
        hometown.find((item) => item.UsersCities?.now === true),
      );
    }
  }, [hometown]);

  useEffect(() => {
    if (selectedHometown) {
      fetchRecentCommunityPosts();
      fetchRecentReviews();
    }
  }, [selectedHometown]);

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
      .then((response: any) => {
        dispatch(allActions.userActions.setSearchRecord(response));
      })
      .catch((error) => {
        console.log('GETSearchRecord error', error);
      });
  }, []);

  const fetchRecentReviews = useCallback(async () => {
    const result = await Promise.all(
      tagFilterItems.map(async (tagItem) => {
        const form = {
          jwtToken,
          query: tagItem.name,
          category: tagItem.category,
          pathType: 'review',
          tagId: tagItem.id,
          limit: '10',
          offset: '0',
          order: 'createdAt',
          region: 'residence',
          cityId: String(selectedHometown.id),
        };
        const data = await GETTotalSearch(form);
        return {
          name: tagItem.name,
          data,
        };
      }),
    );
    setReviewData(result);
  }, [jwtToken, selectedHometown, tagFilterItems]);

  const fetchRecentCommunityPosts = useCallback(() => {
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
  }, [jwtToken, selectedHometown]);

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

  const moveToReviewUpload = useCallback(() => {
    navigation.navigate('ReviewUploadStackScreen', {
      screen: 'ReviewMetaDataScreen',
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
          <HeaderIconContainerView>
            <HeaderIconTouchableOpacity
              onPress={() => moveToTotalKeywordSearch()}>
              <Image source={require('~/Assets/Images/TopTab/ic/search.png')} />
            </HeaderIconTouchableOpacity>
            <HeaderIconTouchableOpacity onPress={() => moveToReviewUpload()}>
              <Image
                source={require('~/Assets/Images/TopTab/ic/alarm/focus.png')}
              />
            </HeaderIconTouchableOpacity>
            <HeaderIconTouchableOpacity
              onPress={() =>
                navigation.navigate('CommunityPostUploadStackScreen', {
                  data: {
                    id: -1,
                  },
                })
              }>
              <Image
                source={require('~/Assets/Images/TopTab/ic/write/black.png')}
              />
            </HeaderIconTouchableOpacity>
          </HeaderIconContainerView>
        </HeaderContainerView>
        <HomeInfoContent
          jwtToken={jwtToken}
          hometown={hometown}
          selectedHometown={selectedHometown}
          setSelectedHometown={setSelectedHometown}
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
      </ContentScrollView>

      <FloatingButtonView
        as={Animated.View}
        style={{
          transform: [
            {
              translateY: floatY.interpolate({
                inputRange: [0, 1],
                outputRange: [120, 0],
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
