import React, {useState, useEffect, useCallback, useRef} from 'react';
import Styled from 'styled-components/native';
import SafeAreaView from 'react-native-safe-area-view';
import {Image, Animated} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import allActions from '~/actions';

// Firebase
import messaging from '@react-native-firebase/messaging';

// Redux
import {useSelector, useDispatch} from 'react-redux';

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
    {name: '충치', category: 'treatment'},
    {name: '교정', category: 'treatment'},
    {name: '임플란트', category: 'treatment'},
  ]);

  const [reviewData, setReviewData] = useState([]);
  const [postData, setPostData] = useState<ReviewData[]>();

  const scrollY = useRef(new Animated.Value(0)).current;

  const currentUser = useSelector((state: any) => state.currentUser);
  const mainHometown = currentUser.hometown;
  const jwtToken = currentUser.jwtToken;
  const hometown = currentUser.hometown;
  const profile = currentUser.profile;

  const dispatch = useDispatch();

  useEffect(() => {
    if (mainHometown) {
      setSelectedHometown(
        mainHometown.find((item) => item.UsersCities?.now === true),
      );
    }
  }, [mainHometown]);

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
      .then(async (response: any) => {
        console.log("GETSearchRecord response", response);
        dispatch(allActions.userActions.setSearchRecord(response));

        const getDentalSearchRecord = async (searchRecordArray: any) => {
          let tmpDentalSearchRecordArray = new Array();
          await searchRecordArray.forEach((item: any, index: number) => {
            if(item.category === 'clinic' || item.category === 'city') {
              return tmpDentalSearchRecordArray.push(item);
            }
          })

          return tmpDentalSearchRecordArray
        } 

        const tmpDentalSearchRecordArray = await getDentalSearchRecord(response);
        console.log("GETSearchRecord tmpDentalSearchRecordArray", tmpDentalSearchRecordArray);
        dispatch(allActions.userActions.setDentalSearchRecord(tmpDentalSearchRecordArray));
        
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
          limit: '4',
          offset: '0',
          order: 'createdAt',
          region: 'residence',
          cityId: String(selectedHometown.id),
        };
        console.log(form);
        const data = await GETTotalSearch(form);
        return {
          name: tagItem.name,
          data,
        };
      }),
    );
    console.log(result);
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
      screen: 'ReceiptRegisterScreen',
      params: {
        requestType: 'post',
      },
    });
  }, []);

  return (
    <ContainerView as={SafeAreaView}>
      <ContentScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: hp('9.1%'),
        }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
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
            useNativeDriver: false,
          },
        )}>
        <HeaderContainerView>
          <HeaderIconContainerView>
            <HeaderIconTouchableOpacity
              onPress={() => moveToTotalKeywordSearch()}>
              <Image source={require('~/Assets/Images/TopTab/ic/search.png')} />
            </HeaderIconTouchableOpacity>
            <HeaderIconTouchableOpacity onPress={() => moveToNotificationList()}>
              <Image
                source={require('~/Assets/Images/TopTab/ic/alarm/focus.png')}
              />
            </HeaderIconTouchableOpacity>
            <HeaderIconTouchableOpacity
              onPress={() => moveToReviewUpload()}>
              <Image
                source={require('~/Assets/Images/TopTab/ic/write/black.png')}
              />
            </HeaderIconTouchableOpacity>
          </HeaderIconContainerView>
        </HeaderContainerView>
        <HomeInfoContent
          scrollY={scrollY}
          selectedHometown={selectedHometown?.emdName}
          localClinicCount={localClinicCount}
          localReviewCount={localReviewCount}
        />
        <PartitionView />
        <HomeReviewContent
          selectedHometown={selectedHometown?.emdName}
          tagFilterItems={tagFilterItems}
          reviewData={reviewData}
        />
        <HomeCommunityContent
          selectedHometown={selectedHometown?.emdName}
          postData={postData}
        />
      </ContentScrollView>
    </ContainerView>
  );
};

export default HomeScreen;
