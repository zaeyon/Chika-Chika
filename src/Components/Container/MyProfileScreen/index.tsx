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
import POSTSocialScrap from '~/Routes/Community/social/POSTSocialScrap';
import DELETESocialScrap from '~/Routes/Community/social/DELETESocialScrap';

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
  const [isCommunityInitializing, setIsCommunityInitializing] = useState(true);
  const [isReviewInitializing, setIsReviewInitializing] = useState(true);
  const [isCommunityDataFinish, setIsCommunityDataFinish] = useState(false);
  const [isCommunityRefreshing, setIsCommunityRefreshing] = useState(false);
  const [isCommunityEndReached, setIsCommunityEndReached] = useState(false);
  const [isReviewDataFinish, setIsReviewDataFinish] = useState(false);
  const [isReviewRefreshing, setIsReviewRefreshing] = useState(false);
  const [isReviewEndReached, setIsReviewEndReached] = useState(false);

  const bottomSheetRef = useRef<any>();

  const dispatch = useDispatch();
  const reviewData = useSelector((state: any) => state.reviewList.MyReviews);
  const communityPostData = useSelector(
    (state: any) => state.communityPostList.MyPosts,
  );

  const jwtToken = useSelector((state: any) => state.currentUser.jwtToken);
  const profile = useSelector((state: any) => state.currentUser.profile);
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
      setIsReviewDataFinish(false);
      dispatch(allActions.reviewListActions.setMyReviews(response));
      setIsReviewRefreshing(false);
    });
  }, [jwtToken, order]);

  const onReviewEndReached = useCallback(
    (info: any) => {
      if (
        isReviewDataFinish ||
        !reviewData.length ||
        reviewData.length % limit !== 0
      ) {
        return;
      }
      if (!isReviewEndReached) {
        setIsReviewEndReached(true);
        const pageIndex = Math.floor(reviewData.length / 10);

        const form = {
          type: type,
          limit: limit,
          offset: pageIndex * limit,
          order: order,
        };
        fetchReviewData(form, (response: any) => {
          if (response.length === 0) {
            setIsReviewDataFinish(true);
          }
          dispatch(allActions.reviewListActions.setMyReviews(response));
          setIsReviewEndReached(false);
        });
      }
    },
    [reviewData, isReviewEndReached, order, jwtToken],
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
      console.log(response);
      setIsCommunityDataFinish(false);
      const form = {
        type: 'My',
        posts: response,
      };
      dispatch(allActions.communityActions.setPosts(form));
      setIsCommunityRefreshing(false);
    });
  }, [jwtToken, order]);

  const onCommunityEndReached = useCallback(
    (info: any) => {
      if (
        isCommunityDataFinish ||
        !communityPostData.length ||
        communityPostData.length % limit !== 0
      ) {
        return;
      }
      if (!isCommunityEndReached) {
        setIsCommunityEndReached(true);
        const pageIndex = Math.floor(communityPostData.length / 10);

        const form = {
          type: type,
          limit: limit,
          offset: pageIndex * limit,
          order: order,
        };
        fetchCommunityData(form, (response: any) => {
          console.log(response.length);
          if (response.length === 0) {
            setIsCommunityDataFinish(true);
          }
          const form = {
            type: 'My',
            posts: [...communityPostData, ...response],
          };
          dispatch(allActions.communityActions.setPosts(form));
          setIsCommunityEndReached(false);
        });
      }
    },
    [communityPostData, isCommunityEndReached, order, jwtToken],
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
      navigation.navigate('CommunityStackScreen', {
        screen: 'CommunityDetailScreen',
        params: {
          id: postId,
          type: 'MyPosts',
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

  const toggleSocialScrap = useCallback(
    (postId: number, prevState: number, type: string) => {
      const form = {
        type,
        id: postId,
      };
      dispatch(allActions.communityActions.toggleScrap(form));
      if (prevState) {
        // true
        DELETESocialScrap(jwtToken, String(postId)).then((response: any) => {
          if (response.statusText === 'OK') {
            console.log('delete scrap');
          }
        });
      } else {
        POSTSocialScrap(jwtToken, String(postId)).then((response: any) => {
          if (response.statusText === 'OK') {
            console.log('post scrap');
          }
        });
      }
    },
    [],
  );

  //Review
  const moveToWriterProfile = () => {
    navigation.navigate('AnotherProfileStackScreen', {
      screen: 'AnotherProfileScreen',
    });
  };

  const moveToDentalDetail = (dentalId: number) => {
    navigation.navigate('DentalClinicStackScreen', {
      screen: 'DentalDetailScreen',
      params: {
        dentalId: dentalId,
      },
    });
  };

  const moveToReviewDetail = (
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
  ) => {
    console.log('moveToReviewDetail reviewId', reviewId);

    navigation.navigate('ReviewStackScreen', {
      screen: 'ReviewDetailScreen',
      params: {
        reviewId: reviewId,
        writer: writer,
        createdAt: createdAt,
        treatmentArray: treatmentArray,
        ratingObj: ratingObj,
        treatmentDate: treatmentDate,
        imageArray: imageArray,
        isCurUserLike: isCurUserLike,
        isCurUserScrap: isCurUserScrap,
        likeCount: likeCount,
        commentCount: commentCount,
        dentalObj: dentalObj,
      },
    });
  };
  useEffect(() => {
    const form = {
      type: type,
      limit: limit,
      offset: 0,
      order: order,
    };
    fetchReviewData(form, (response: any) => {
      dispatch(allActions.reviewListActions.setMyReviews(response));
      setIsReviewInitializing(false);
    });
    fetchCommunityData(form, (response: any) => {
      const form = {
        type: 'My',
        posts: [...communityPostData, ...response],
      };
      dispatch(allActions.communityActions.setPosts(form));
      setIsCommunityInitializing(false);
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
        isReviewInitializing={isReviewInitializing}
        isCommunityInitializing={isCommunityInitializing}
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
        moveToAnotherProfile={moveToAnotherProfile}
        moveToReservationTabScreen={moveToReservationTabScreen}
        moveToSavedHospitalTabScreen={moveToSavedHospitalTabScreen}
        toggleSocialLike={toggleSocialLike}
        toggleSocialScrap={toggleSocialScrap}
        moveToReviewDetail={moveToReviewDetail}
        moveToWriterProfile={moveToWriterProfile}
        moveToDentalDetail={moveToDentalDetail}
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
