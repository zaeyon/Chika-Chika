import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {useState, useEffect, useRef} from 'react';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TouchableWithoutFeedback, FlatList, View} from 'react-native';
import {isIphoneX} from 'react-native-iphone-x-helper';
import SafeAreaView from 'react-native-safe-area-view';
import Animated from 'react-native-reanimated';
import {useSelector} from 'react-redux';
//Local Component
import MyProfile from '~/Components/Presentational/MyProfileScreen';
import BottomSheet from '~/Components/Presentational/BottomSheet';
import SlideUpPanel from '~/Components/Presentational/MyProfileScreen/SlideUpPanel';
//Routes
import GETUserReviewPosts from '~/Routes/Community/showPosts/GETUserReviewPosts';
import GETUserCommunityPosts from '~/Routes/Community/showPosts/GETUserCommunityPost';

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

  const currentUser = useSelector((state: any) => state.currentUser).user;
  const jwtToken = currentUser.jwtToken;
  const userId = currentUser.userId;

  const onRefresh = () => {
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
  };

  const onEndReached = (info: any) => {
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
  };

  const fetchCommunityData = (form: Form, callback: any) => {
    GETUserCommunityPosts(jwtToken, userId, form).then((response) => {
      callback(response);
    });
  };

  const fetchReviewData = (form: Form, callback: any) => {
    GETUserReviewPosts(jwtToken, userId, form).then((response) => {
      callback(response);
    });
  };

  const openModal = () => {
    bottomSheetRef.current && bottomSheetRef.current.open();
  };

  const moveToCommunityDetail = (postData: any) => {
    navigation.navigate('CommunityDetailScreen', {data: postData});
  };

  const moveToAnotherProfile = () => {
    navigation.navigate('AnotherProfileScreen');
  };

  const moveToFullImages = (mediaFiles: any, imageUri: string) => {
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
  };

  const moveToReviewDetail = (
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
  };

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

  const renderBottomSheet = (onSwipe: boolean) => (
    <SlideUpPanel
      navigation={navigation}
      closeBottomSheet={() => bottomSheetRef && bottomSheetRef.current.close()}
      disabled={onSwipe}
    />
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
