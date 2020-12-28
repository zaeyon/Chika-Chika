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
  const [pageIndex, setPageIndex] = useState(0);
  const [reviewPostData, setReviewPostData] = useState([] as any);
  const [communityPostData, setCommunityPostData] = useState([] as any);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isEndReached, setIsEndReached] = useState(false);
  const [onSwipe, setOnSwipe] = useState(false);

  const bottomSheetRef = useRef<any>();

  const dispatch = useDispatch();
  const currentUser = useSelector((state: any) => state.currentUser).user;
  const jwtToken = currentUser.jwtToken;
  const userId = currentUser.id;

  const onRefresh = useCallback(() => {
    const form = {
      type: type,
      limit: limit,
      offset: 0,
      order: order,
    };
    setIsRefreshing(true);
    fetchCommunityData(form, (response: any) => {
      setCommunityPostData(response);
      setPageIndex(0);
      setIsRefreshing(false);
    });
  }, [jwtToken, order]);

  const onEndReached = useCallback(
    (info: any) => {
      if (!isEndReached) {
        setIsEndReached(true);
        const newPageIndex = pageIndex + 1;

        const form = {
          type: type,
          limit: limit,
          offset: newPageIndex * limit,
          order: order,
        };
        setPageIndex((prev: any) => prev + 1);
        fetchCommunityData(form, (response: any) => {
          console.log(response.length);
          setCommunityPostData((prev: any) => {
            return [...prev, ...response];
          });
          setIsEndReached(false);
        });
      }
    },
    [isEndReached, pageIndex, order, jwtToken],
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

  const moveToCommunityDetail = useCallback((postData: any) => {
    navigation.navigate('CommunityDetailScreen', {data: postData});
  }, []);

  const moveToAnotherProfile = useCallback(() => {
    navigation.navigate('AnotherProfileScreen');
  }, []);

  const moveToFullImages = useCallback((mediaFiles: any, imageUri: string) => {
    let index = mediaFiles.findIndex(
      (image: any) => image.img_url === imageUri,
    );

    let imageUri_arr = mediaFiles.map((image: any) => {
      return image.img_url;
    });
    console.log(mediaFiles);
    console.log('선택한 사진의 mediaFiles index', index);

    navigation.navigate('FullImagesScreen', {
      imagesUrl_arr: imageUri_arr,
      imageIndex: index,
    });
  }, []);

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

  const toggleSocialLike = useCallback(
    (postId: number, prevState: number, type: string) => {
      console.log(type);
      const form = {
        type,
        id: postId,
      };
      if (prevState) {
        // true
        DELETESocialLike(jwtToken, String(postId)).then((response: any) => {
          if (response.statusText === 'OK') {
            dispatch(allActions.communityActions.toggleLike(form));
          }
        });
      } else {
        POSTSocialLike(jwtToken, String(postId)).then((response: any) => {
          if (response.statusText === 'OK') {
            dispatch(allActions.communityActions.toggleLike(form));
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
      offset: pageIndex * limit,
      order: order,
    };
    fetchReviewData(form, (response: any) => {
      setReviewPostData(response);
    });
    fetchCommunityData(form, (response: any) => {
      setCommunityPostData(response);
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
        reviewPostData={reviewPostData}
        communityPostData={communityPostData}
        isRefreshing={isRefreshing}
        onRefresh={onRefresh}
        isEndReached={isEndReached}
        onEndReached={onEndReached}
        currentUser={currentUser}
        openModal={openModal}
        moveToCommunityDetail={moveToCommunityDetail}
        moveToReviewDetail={moveToReviewDetail}
        moveToAnotherProfile={moveToAnotherProfile}
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
