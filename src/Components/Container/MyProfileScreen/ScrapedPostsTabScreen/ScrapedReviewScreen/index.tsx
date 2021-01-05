import React, {useState, useEffect, useCallback} from 'react';
import Styled from 'styled-components/native';
import {LayoutAnimation} from 'react-native';
//Local Component
import ReviewList from '~/Components/Presentational/ReviewList';
// Redux
import {useSelector, useDispatch} from 'react-redux';
import allActions from '~/actions';
// Method
// Routes
import GETUserScrapedPosts from '~/Routes/User/GETUserScrapedPosts';

const ContainerView = Styled.View`
         flex: 1;
         background-color: #FFFFFF;
        `;
interface Props {
  navigation: any;
  route: any;
}

const ScrapedReviewScreen = ({navigation, route}: Props) => {
  const limit = 10;
  const [isDataFinish, setIsDataFinish] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isEndReached, setIsEndReached] = useState(false);

  const currentUser = useSelector((state: any) => state.currentUser);
  const jwtToken = currentUser.jwtToken;

  const postData = useSelector((state: any) => state.reviewList.ScrapedReviews);
  const dispatch = useDispatch();

  const fetchScrapedPosts = useCallback(
    (form: any, callback: any) => {
      GETUserScrapedPosts(jwtToken, form).then((response: any) => {
        callback(response);
      });
    },
    [jwtToken],
  );

  const onRefresh = useCallback(() => {
    console.log('refresh');
    const form = {
      type: 'review',
      limit: limit,
      offset: 0,
    };
    setIsRefreshing(true);
    fetchScrapedPosts(form, (response: any) => {
      setIsDataFinish(false);
      if (
        JSON.stringify(response).replace(
          /"createdDiff\(second\)\"\:\d*\,/gi,
          '',
        ) !==
        JSON.stringify(postData).replace(
          /"createdDiff\(second\)\"\:\d*\,/gi,
          '',
        )
      ) {
        console.log('commented post diff');
        LayoutAnimation.configureNext(
          LayoutAnimation.create(300, 'easeInEaseOut', 'opacity'),
        );
        dispatch(allActions.reviewListActions.setScrapedReviews(response));
      }

      setIsRefreshing(false);
    });
  }, []);

  const onEndReached = useCallback(() => {
    if (!isEndReached && postData.length > 9) {
      setIsEndReached(true);
      const pageIndex = Math.floor(postData.length / 10);

      const form = {
        type: 'review',
        limit: limit,
        offset: pageIndex * limit,
      };
      fetchScrapedPosts(form, (response: any) => {
        if (response.length === 0) {
          setIsDataFinish(true);
        }
        const posts = [...postData, ...response];
        dispatch(allActions.reviewListActions.setScrapedReviews(posts));
        setIsEndReached(false);
      });
    }
  }, [isEndReached, postData]);

  const moveToAnotherProfile = useCallback(() => {
    navigation.navigate('AnotherProfileScreen');
  }, []);

  const moveToWriterProfile = () => {
    navigation.navigate('AnotherProfileStackScreen', {
      screen: 'AnotherProfileScreen',
    });
  };

  const moveToDentalDetail = () => {
    navigation.navigate('DentalClinicStack', {
      screen: 'DentalDetailScreen',
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
      type: 'review',
      limit,
      offset: 0,
    };
    fetchScrapedPosts(form, (response: any) => {
      dispatch(allActions.reviewListActions.setScrapedReviews(response));
    });

    return function cleanup() {
      const form = {
        type: 'review',
        limit,
        offset: 0,
      };
      fetchScrapedPosts(form, (response: any) => {
        dispatch(allActions.reviewListActions.setScrapedReviews(response));
      });
    };
  }, []);

  return (
    <ContainerView>
      <ReviewList
        reviewList={postData}
        loadingMoreReview={isEndReached}
        onEndReachedReviewList={onEndReached}
        refreshingReviewList={isRefreshing}
        onRefreshReviewList={onRefresh}
        moveToReviewDetail={moveToReviewDetail}
        moveToWriterProfile={moveToWriterProfile}
        moveToDentalDetail={moveToDentalDetail}
      />
    </ContainerView>
  );
};

export default ScrapedReviewScreen;
