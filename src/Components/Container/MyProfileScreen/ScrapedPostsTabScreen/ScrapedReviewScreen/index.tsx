import React, {useState, useEffect, useCallback} from 'react';
import Styled from 'styled-components/native';
import {
  ActivityIndicator,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
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
  background-color: #F5F7F9;
  justify-content: center;
  align-items: center;
`;

const EmptyContainerView = Styled.View`
height: 300%;
padding-top: 118px;
align-items: center;
background: #FFFFFF;
`;

const EmptyContentImage = Styled.Image``;

const EmptyContentText = Styled.Text`
margin-top: 12px;
font-weight: normal;
font-size: 16px;
color: #9AA2A9;
`;

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface Props {
  navigation: any;
  route: any;
}

const ScrapedReviewScreen = ({navigation, route}: Props) => {
  const limit = 10;
  const [isInitializing, setIsInitializing] = useState(true);
  const [isDataFinish, setIsDataFinish] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isEndReached, setIsEndReached] = useState(false);

  const jwtToken = useSelector((state: any) => state.currentUser.jwtToken);

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

        dispatch(allActions.reviewListActions.setScrapedReviews(response));
      }

      setIsRefreshing(false);
    });
  }, []);

  const onEndReached = useCallback(() => {
    if (!isEndReached && !isDataFinish) {
      setIsEndReached(true);
      const pageIndex = Math.floor(postData.length / 10) + 1;

      const form = {
        type: 'review',
        limit: limit,
        offset: pageIndex * limit,
      };
      fetchScrapedPosts(form, (response: any) => {
        if (response.length === 0) {
          setIsDataFinish(true);
          setIsEndReached(false);
          return;
        }
        dispatch(
          allActions.reviewListActions.setScrapedReviews([
            ...postData,
            ...response,
          ]),
        );
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
      setIsInitializing(false);
      dispatch(allActions.reviewListActions.setScrapedReviews(response));
    });

    return function cleanup() {
      const form = {
        type: 'review',
        limit,
        offset: 0,
      };
      fetchScrapedPosts(form, (response: any) => {
        LayoutAnimation.configureNext(
          LayoutAnimation.create(300, 'easeInEaseOut', 'opacity'),
        );
        dispatch(allActions.reviewListActions.setScrapedReviews(response));
      });
    };
  }, []);

  const renderHeaderComponent = useCallback(
    () =>
      postData.length === 0 ? (
        <EmptyContainerView>
          <EmptyContentImage
            source={require('~/Assets/Images/Comment/ic_noComment.png')}
          />
          <EmptyContentText>{'스크랩한 후기가 없습니다.'}</EmptyContentText>
        </EmptyContainerView>
      ) : null,
    [postData],
  );

  return (
    <ContainerView>
      {isInitializing ? (
        <ActivityIndicator />
      ) : (
        <ReviewList
          renderHeaderComponent={renderHeaderComponent}
          reviewList={postData}
          loadingMoreReview={isEndReached}
          onEndReachedReviewList={onEndReached}
          refreshingReviewList={isRefreshing}
          onRefreshReviewList={onRefresh}
          moveToReviewDetail={moveToReviewDetail}
          moveToWriterProfile={moveToWriterProfile}
          moveToDentalDetail={moveToDentalDetail}
        />
      )}
    </ContainerView>
  );
};

export default ScrapedReviewScreen;
