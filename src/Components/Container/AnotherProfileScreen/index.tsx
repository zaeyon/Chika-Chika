import React, {useState, useEffect, useCallback} from 'react';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SafeAreaView from 'react-native-safe-area-view';

// Local Component
import NavigationHeader from '~/Components/Presentational/NavigationHeader';
import AnotherProfile from '~/Components/Presentational/AnotherProfileScreen';
// Redux
import {useSelector, useDispatch} from 'react-redux';
import allActions from '~/actions';

// Routes
import GETUserInfoById from '~/Routes/User/GETUserInfoById';
import GETUserReviewPosts from '~/Routes/Community/showPosts/GETUserReviewPosts';
import GETUserCommunityPosts from '~/Routes/Community/showPosts/GETUserCommunityPost';
import POSTSocialLike from '~/Routes/Community/social/POSTSocialLike';
import DELETESocialLike from '~/Routes/Community/social/DELETESocialLike';
import POSTSocialScrap from '~/Routes/Community/social/POSTSocialScrap';
import DELETESocialScrap from '~/Routes/Community/social/DELETESocialScrap';

const ContainerView = Styled.View`
 flex: 1;
 background-color: #FFFFFF;
`;

interface Route {
  params: {
    targetUser: {
      userId: string;
      nickname: string;
      profileImageUri: string;
    };
  };
}
interface Props {
  navigation: any;
  route: Route;
}

interface Form {
  type: string;
  limit: number;
  offset: number;
  order: string;
}

const AnotherProfileScreen = ({navigation, route}: Props) => {
  const [targetUserProfile, setTargetUserProfile] = useState();

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

  const reviewData = useSelector(
    (state: any) => state.reviewList.OpponentReviews,
  );
  const communityPostData = useSelector(
    (state: any) => state.communityPostList.OpponentPosts,
  );

  const dispatch = useDispatch();

  const profile = useSelector((state: any) => state.currentUser.profile);
  const jwtToken = useSelector((state: any) => state.currentUser.jwtToken);

  const fetchUserInfo = useCallback(() => {
    GETUserInfoById(jwtToken, route.params.targetUser.userId).then(
      (response) => {
        setTargetUserProfile(response);
      },
    );
  }, [jwtToken, route]);

  useEffect(() => {
    fetchUserInfo();
    fetchCommunityData(
      {
        type: type,
        limit: limit,
        offset: 0,
        order: order,
      },
      (response: any) => {
        setIsCommunityInitializing((prev) => {
          const form = {
            type: 'Opponent',
            posts: response,
          };
          dispatch(allActions.communityActions.setPosts(form));
          return false;
        });
      },
    );
    fetchReviewData(
      {
        type: type,
        limit: limit,
        offset: 0,
        order: order,
      },
      (response: any) => {
        setIsReviewInitializing((prev) => {
          dispatch(allActions.reviewListActions.setOpponentReviews(response));
          return false;
        });
      },
    );
    return function cleanup() {
      console.log('clean');
      dispatch(
        allActions.communityActions.setPosts({
          type: 'Opponent',
          posts: [],
        }),
      );
      dispatch(allActions.reviewListActions.setOpponentReviews([]));
    };
  }, []);

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
      dispatch(allActions.reviewListActions.setOpponentReviews(response));
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
          dispatch(allActions.reviewListActions.setOpponentReviews(response));
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
        type: 'Opponent',
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
            type: 'Opponent',
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
    (form: Form, callback = (res: any) => console.log(res)) => {
      GETUserCommunityPosts(
        jwtToken,
        route.params.targetUser.userId,
        form,
      ).then((response) => {
        callback(response);
      });
    },
    [jwtToken, route.params.targetUser.userId],
  );

  const fetchReviewData = useCallback(
    (form: Form, callback = (res: any) => console.log(res)) => {
      GETUserReviewPosts(jwtToken, route.params.targetUser.userId, form).then(
        (response) => {
          callback(response);
        },
      );
    },
    [jwtToken, route.params.targetUser.userId],
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
    [jwtToken],
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
    [jwtToken],
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

  const onPressAccuse = useCallback(() => {
    navigation.navigate('AccuseScreen', {
      targetType: 'user',
      targetId: route.params.targetUser.userId,
    });
  }, [route]);

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

  return (
    <ContainerView as={SafeAreaView}>
      <NavigationHeader
        headerLeftProps={{
          type: 'arrow',
          onPress: () => navigation.goBack(),
        }}
        headerRightProps={
          profile.id === route.params.targetUser?.userId
            ? undefined
            : {
                type: 'text',
                text: '신고하기',
                onPress: () => onPressAccuse(),
              }
        }
        headerTitle={route.params.targetUser.nickname}
      />
      <AnotherProfile
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
        targetUser={targetUserProfile}
        targetUserSkeletonData={route.params.targetUser}
        isMyProfile={route.params.targetUser.userId === profile.id}
        moveToCommunityDetail={moveToCommunityDetail}
        moveToAnotherProfile={moveToAnotherProfile}
        moveToReservationTabScreen={moveToReservationTabScreen}
        moveToSavedHospitalTabScreen={moveToSavedHospitalTabScreen}
        toggleSocialLike={toggleSocialLike}
        toggleSocialScrap={toggleSocialScrap}
        moveToReviewDetail={moveToReviewDetail}
        moveToDentalDetail={moveToDentalDetail}
      />
    </ContainerView>
  );
};

export default AnotherProfileScreen;
