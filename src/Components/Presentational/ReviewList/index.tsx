import React, {useState, useEffect, useCallback} from 'react';
import Styled from 'styled-components/native';
import {
  TouchableWithoutFeedback,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';

// Local Component
import ReviewItem from '~/Components/Presentational/ReviewItem';

// Route
import GETReviewList from '~/Routes/Review/GETReviewList';

const Container = Styled.SafeAreaView`
 flex: 1;
`;

const ReviewListContainer = Styled.View`
flex: 1;
`;

const EndReachedIndicatorContainer = Styled.View`
height: ${hp('9%')}px;
align-items: center;
justify-content: center;
`;

interface Props {
  reviewList: Array<ReviewData>;
  refreshingReviewList: boolean;
  onRefreshReviewList: () => void;
  onEndReachedReviewList: () => void;
  loadingMoreReview: boolean;
  navigation: any;
  renderHeaderComponent: any;
}

interface ReviewData {
  id: Number;
  user: Object;
  userId: String;
  TreatmentItems: Array<Object>;
  certifiedBill: Boolean;
  createdAt: String;
  deletedAt: String;
  dentalClinicId: Number;
  dental_clinic: Object;
  hits: Number;
  treatmentDate: String;
  reviewCommentNum: Number;
  reivewLikeNum: Number;
  reviewViewNum: Number;
  review_contents: Array<Object>;
  starRate_cost: Number;
  starRate_service: Number;
  starRate_treatment: Number;
  updatedAt: String;
  viewerLikedReview: Number;
}

const ReviewList = ({
  reviewList,
  refreshingReviewList,
  onRefreshReviewList,
  onEndReachedReviewList,
  loadingMoreReview,
  navigation,
  renderHeaderComponent,
}: Props) => {

  const moveToDentalDetail = useCallback((dentalId: number) => {
    navigation.navigate('DentalClinicStack', {
      screen: 'DentalDetailScreen',
      params: {
        dentalId: dentalId,
      },
    });
  }, []);

  const moveToAnotherProfile = useCallback(
    (userId: string, nickname: string, profileImageUri: string, img_thumbNail: string) => {
      navigation.navigate('AnotherProfileStackScreen', {
        targetUser: {
          userId,
          nickname,
          profileImageUri,
          img_thumbNail,
        },
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
          visibleElapsedTime: visibleElapsedTime,
          elapsedTime: elapsedTime,
        },
      });
    },
    [],
  );

  const renderEndRechedIndicator = useCallback(() => {

      return (
        loadingMoreReview ? 
        <EndReachedIndicatorContainer>
          <ActivityIndicator />
        </EndReachedIndicatorContainer> : null
      );

  }, [loadingMoreReview]);

  const renderReviewItem = useCallback(({item, index}: any) => {
    const ratingObj = {
      avgRating: Number(
        (
          (Number(item.starRate_cost) +
            Number(item.starRate_service) +
            Number(item.starRate_treatment)) /
          3
        ).toFixed(1),
      ),
      priceRating: Number(item.starRate_cost),
      serviceRating: Number(item.starRate_service),
      treatRating: Number(item.starRate_treatment),
    };

    let writer = {};

    if (item.user !== null) {
      writer = {
        nickname: item.user.nickname,
        profileImage: item.user.profileImg,
        userId: item.userId,
      };
    } else {
      writer = {
        nickname: '알수없음',
        profileImage: 'null',
        userId: 'null',
      };
    }

    let elapsedTimeText = '';
    let visibleElapsedTime = false;

    const elapsedMin = item['createdDiff(second)'] / 60;
    const elapsedHour = item['createdDiff(second)'] / 3600;
    const elapsedDay = item['createdDiff(second)'] / 86400;

    if (elapsedMin < 1) {
      elapsedTimeText = '방금 전';
      visibleElapsedTime = true;
    } else if (1 <= elapsedMin && elapsedHour < 1) {
      elapsedTimeText = `${Math.floor(elapsedMin)}분 전`;
      visibleElapsedTime = true;
    } else if (1 <= elapsedHour && elapsedDay < 1) {
      elapsedTimeText = `${Math.floor(elapsedHour)}시간 전`;
      visibleElapsedTime = true;
    } else if (elapsedDay >= 1) {
      visibleElapsedTime = false;
    }

    return (
      <ReviewItem
        reviewId={item.id}
        writer={writer}
        createdAt={item.createdAt}
        elapsedTimeText={elapsedTimeText}
        visibleElapsedTime={visibleElapsedTime}
        treatmentArray={item.TreatmentItems}
        treatmentDate={item.treatmentDate ? item.treatmentDate : ''}
        dentalObj={item.dental_clinic}
        ratingObj={ratingObj}
        viewCount={item.reviewViewNum}
        treatInfoCount={item.getInfo}
        likeCountProp={item.reviewLikeNum}
        commentCount={item.reviewCommentsNum}
        imageArray={item.review_contents}
        descriptions={item.reviewDescriptions ? item.reviewDescriptions : ''}
        moveToReviewDetail={moveToReviewDetail}
        moveToAnotherProfile={moveToAnotherProfile}
        isCurUserLikeProp={item.viewerLikedReview}
        isCurUserScrapProp={item.viewerScrapedReview}
        refreshingReviewList={refreshingReviewList}
        moveToDentalDetail={moveToDentalDetail}
      />
    );
  }, []);

  return (
    <FlatList
      style={{
        width: wp('100%'),
        flex: 1,
      }}
      keyExtractor={(item, index) => `${index}`}
      refreshing={refreshingReviewList}
      onRefresh={onRefreshReviewList}
      horizontal={false}
      showsVerticalScrollIndicator={true}
      data={reviewList}
      renderItem={renderReviewItem}
      onEndReached={onEndReachedReviewList}
      onEndReachedThreshold={0.5}
      ListHeaderComponent={renderHeaderComponent}
      ListFooterComponent={renderEndRechedIndicator}
    />
  );
};

export default ReviewList;
