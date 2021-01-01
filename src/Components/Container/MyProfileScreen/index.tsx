import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {useState, useEffect, useRef, useCallback} from 'react';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TouchableWithoutFeedback, FlatList, View} from 'react-native';
import {isIphoneX} from 'react-native-iphone-x-helper';
import SafeAreaView from 'react-native-safe-area-view';
import Animated from 'react-native-reanimated';
import {useSelector, useDispatch} from 'react-redux';
import allActions from '~/actions';
//Local Component
import MyProfile from '~/Components/Presentational/MyProfileScreen';
import BottomSheet from '~/Components/Presentational/BottomSheet';
import SlideUpPanel from '~/Components/Presentational/MyProfileScreen/SlideUpPanel';
//Routes
import GETUserReviewPosts from '~/Routes/Community/showPosts/GETUserReviewPosts';
import GETUserCommunityPosts from '~/Routes/Community/showPosts/GETUserCommunityPost';
import POSTSocialLike from '~/Routes/Community/social/POSTSocialLike';
import DELETESocialLike from '~/Routes/Community/social/DELETESocialLike';

const ContainerView = Styled(
  (SafeAreaView as unknown) as new () => SafeAreaView,
)`
flex: 1;
background: white;
`;
interface Props {
  navigation: any;
  route: any;
}

interface Form {
  type: string;
  limit: number;
  offset: number;
  order: string;
}

const MyProfileScreen = ({navigation, route}: Props) => {
  const type = 'All';
  const limit = 10;
  const [order, setOrder] = useState('createdAt');
  const [communityPageIndex, setCommunityPageIndex] = useState(0);
  const [isCommunityRefreshing, setIsCommunityRefreshing] = useState(false);
  const [isCommunityEndReached, setIsCommunityEndReached] = useState(false);
  const [reviewPageIndex, setReviewPageIndex] = useState(0);
  const [isReviewRefreshing, setIsReviewRefreshing] = useState(false);
  const [isReviewEndReached, setIsReviewEndReached] = useState(false);

  const bottomSheetRef = useRef<any>();

  const dispatch = useDispatch();
  const reviewData = useSelector((state: any) => state.reviewList.MyReviews);
  const communityPostData = useSelector(
    (state: any) => state.communityPostList.MyPosts,
  );
  const currentUser = useSelector((state: any) => state.currentUser);
  const jwtToken = currentUser.jwtToken;
  const profile = currentUser.profile;
  const userId = profile.id;

  const onReviewRefresh = useCallback(() => {
    const form = {
      type: type,
      limit: limit,
      offset: 0,
      order: order,
    };
    setIsReviewRefreshing(true);
    fetchReviewData(form, (response: any) => {
      dispatch(allActions.reviewListActions.setMyReviews(response));
      setReviewPageIndex(0);
      setIsReviewRefreshing(false);
    });
  }, [jwtToken, order]);

  const onReviewEndReached = useCallback(
    (info: any) => {
      if (!reviewData.length || reviewData.length % limit !== 0) {
        return;
      }
      if (!isReviewEndReached) {
        setIsReviewEndReached(true);
        const newPageIndex = reviewPageIndex + 1;

        const form = {
          type: type,
          limit: limit,
          offset: newPageIndex * limit,
          order: order,
        };
        setReviewPageIndex((prev: any) => prev + 1);
        fetchReviewData(form, (response: any) => {
          dispatch(allActions.reviewListActions.setMyReviews(response));
          setIsReviewEndReached(false);
        });
      }
    },
    [reviewData, isReviewEndReached, reviewPageIndex, order, jwtToken],
  );

  const onCommunityRefresh = useCallback(() => {
    const form = {
      type: type,
      limit: limit,
      offset: 0,
      order: order,
    };
    setIsCommunityRefreshing(true);
    fetchCommunityData(form, (response: any) => {
      const form = {
        type: 'My',
        posts: response,
      };
      dispatch(allActions.communityActions.setPosts(form));
      setCommunityPageIndex(0);
      setIsCommunityRefreshing(false);
    });
  }, [jwtToken, order]);

  const onCommunityEndReached = useCallback(
    (info: any) => {
      if (!communityPostData.length || communityPostData.length % limit !== 0) {
        return;
      }
      if (!isCommunityEndReached) {
        setIsCommunityEndReached(true);
        const newPageIndex = communityPageIndex + 1;

        const form = {
          type: type,
          limit: limit,
          offset: newPageIndex * limit,
          order: order,
        };
        setCommunityPageIndex((prev: any) => prev + 1);
        fetchCommunityData(form, (response: any) => {
          console.log(response.length);
          const form = {
            type: 'My',
            posts: [...communityPostData, ...response],
          };
          dispatch(allActions.communityActions.setPosts(form));
          setIsCommunityEndReached(false);
        });
      }
    },
    [
      communityPostData,
      isCommunityEndReached,
      communityPageIndex,
      order,
      jwtToken,
    ],
  );

  const fetchCommunityData = useCallback(
    (form: Form, callback: any) => {
      GETUserCommunityPosts(jwtToken, userId, form).then((response) => {
        callback(response);
      });
    },
    [jwtToken, userId],
  );

  const fetchReviewData = useCallback(
    (form: Form, callback: any) => {
      GETUserReviewPosts(jwtToken, userId, form).then((response) => {
        callback(response);
      });
    },
    [jwtToken, userId],
  );

  const openModal = useCallback(() => {
    bottomSheetRef.current && bottomSheetRef.current.open();
  }, []);

  const moveToCommunityDetail = useCallback(
    (postId: number, postType: string) => {
      navigation.navigate('CommunityDetailScreen', {
        id: postId,
        type: 'MyPosts',
      });
    },
    [],
  );

  const moveToReviewDetail = useCallback(
    (
      reviewId: number,
      writer: object,
      createdAt: string,
      treatmentArray: Array<object>,
      avgRating: number,
      treatmentDate: string,
      imageArray: Array<object>,
    ) => {
      console.log('moveToReviewDetail reviewId', reviewId);

      navigation.navigate('ReviewDetailScreen', {
        reviewId: reviewId,
        writer: writer,
        createdAt: createdAt,
        treatmentArray: treatmentArray,
        avgRating: avgRating,
        treatmentDate: treatmentDate,
        imageArray: imageArray,
      });
    },
    [],
  );

  const moveToAnotherProfile = useCallback(() => {
    navigation.navigate('AnotherProfileScreen');
  }, []);

  const moveToReservationTabScreen = useCallback(() => {
    navigation.navigate('ReservationTabScreen');
  }, []);

  const moveToSavedHospitalTabScreen = useCallback(() => {
    navigation.navigate('SavedHospitalTabScreen');
  }, []);

  const toggleSocialLike = useCallback(
    (postId: number, prevState: number, type: string) => {
      const form = {
        type,
        id: postId,
      };
      dispatch(allActions.communityActions.toggleLike(form));
      if (prevState) {
        // true
        DELETESocialLike(jwtToken, String(postId)).then((response: any) => {
          if (response.statusText === 'OK') {
          }
        });
      } else {
        POSTSocialLike(jwtToken, String(postId)).then((response: any) => {
          if (response.statusText === 'OK') {
          }
        });
      }
    },
    [],
  );

  const toggleSocialScrap = useCallback(() => {}, []);

  useEffect(() => {
    const form = {
      type: type,
      limit: limit,
      offset: communityPageIndex * limit,
      order: order,
    };
    fetchReviewData(form, (response: any) => {
      dispatch(allActions.reviewListActions.setMyReviews(response));
    });
    fetchCommunityData(form, (response: any) => {
      const form = {
        type: 'My',
        posts: [...communityPostData, ...response],
      };
      dispatch(allActions.communityActions.setPosts(form));
    });
  }, []);

  const renderBottomSheet = useCallback(
    (onSwipe: boolean) => (
      <SlideUpPanel
        navigation={navigation}
        closeBottomSheet={() =>
          bottomSheetRef && bottomSheetRef.current.close()
        }
        disabled={onSwipe}
      />
    ),
    [bottomSheetRef],
  );
  return (
    <ContainerView>
      <MyProfile
        navigation={navigation}
        route={route}
        reviewData={reviewData}
        isReviewRefreshing={isReviewRefreshing}
        onReviewRefresh={onReviewRefresh}
        isReviewEndReached={isReviewEndReached}
        onReviewEndReached={onReviewEndReached}
        communityPostData={communityPostData}
        isCommunityRefreshing={isCommunityRefreshing}
        onCommunityRefresh={onCommunityRefresh}
        isCommunityEndReached={isCommunityEndReached}
        onCommunityEndReached={onCommunityEndReached}
        currentUser={profile}
        openModal={openModal}
        moveToCommunityDetail={moveToCommunityDetail}
        moveToReviewDetail={moveToReviewDetail}
        moveToAnotherProfile={moveToAnotherProfile}
        moveToReservationTabScreen={moveToReservationTabScreen}
        moveToSavedHospitalTabScreen={moveToSavedHospitalTabScreen}
        toggleSocialLike={toggleSocialLike}
        toggleSocialScrap={toggleSocialScrap}
      />
      <BottomSheet
        ref={bottomSheetRef}
        renderContent={renderBottomSheet}
        visibleHeight={hp('55%')}
      />
    </ContainerView>
  );
};

export default MyProfileScreen;
