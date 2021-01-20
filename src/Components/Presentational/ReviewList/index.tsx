import React, {useState, useEffect} from 'react';
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
  moveToWriterProfile: (userId: number) => void;
  moveToReviewDetail: (
    reviewId: number,
    writer: object,
    createdAt: string,
    treatmentArray: Array<object>,
    ratingObj: Object,
    treatmentDate: string,
    imageArray: Array<object>,
    isCurUserLike: boolean,
    likeCount: number,
    commentCount: number,
    isCurUserScrap: boolean,
    dentalObj: object,
    visibleElapsedTime: boolean,
    elapsedTime: string,
  ) => void;
  moveToDentalDetail: (dentalId: number) => void;
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
  moveToReviewDetail,
  refreshingReviewList,
  onRefreshReviewList,
  onEndReachedReviewList,
  loadingMoreReview,
  moveToWriterProfile,
  moveToDentalDetail,
}: Props) => {
  const currentUser = useSelector((state: any) => state.currentUser);
  const jwtToken = currentUser.jwtToken;
  const userProfile = currentUser.profile;

  var offset = 0;
  var limit = 10;

  const renderEndRechedIndicator = ({item, index}: any) => {
    console.log(
      'renderEndRechedIndicator loadingMoreReview',
      loadingMoreReview,
    );
    if (loadingMoreReview) {
      return (
        <EndReachedIndicatorContainer>
          <ActivityIndicator />
        </EndReachedIndicatorContainer>
      );
    } else {
      return <EndReachedIndicatorContainer style={{height: 10}} />;
    }
  };

  const renderReviewItem = ({item, index}: any) => {
    console.log("renderReviewItem, item", item);
    console.log("renderReviewItem, item.user", item.user);
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

    let writer = {}

    if(item.user !== null) {
      writer = {
        nickname: item.user.nickname,
        profileImage: item.user.profileImg,
        userId: item.userId,
      };
    } else {
      writer = {
        nickname: "알수없음",
        profileImage: "null",
        userId: "null",
      }
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
        moveToWriterProfile={moveToWriterProfile}
        isCurUserLikeProp={item.viewerLikedReview}
        isCurUserScrapProp={item.viewerScrapedReview}
        refreshingReviewList={refreshingReviewList}
        moveToDentalDetail={moveToDentalDetail}
      />
    );
  };

  return (
    <Container>
      <ReviewListContainer>
        <FlatList

          keyExtractor={(item, index) => `${index}`}
          refreshing={refreshingReviewList}
          onRefresh={onRefreshReviewList}
          horizontal={false}
          showsVerticalScrollIndicator={true}
          data={reviewList}
          renderItem={renderReviewItem}
          onEndReached={onEndReachedReviewList}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderEndRechedIndicator}
        />
      </ReviewListContainer>
    </Container>
  );
};

export default ReviewList;
