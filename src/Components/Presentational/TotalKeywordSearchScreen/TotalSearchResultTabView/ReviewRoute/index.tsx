import React, {useState, useEffect, useCallback} from 'react';
import Styled from 'styled-components/native';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  LayoutAnimation,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector, useDispatch} from 'react-redux';
import allActions from '~/actions';
import CommunityPostList from '~/Components/Presentational/CommunityPostList';
import LocationSelection from '~/Components/Container/CommunityListScreen/LocationInfoHeader/LocationSelection';

// Local Component
import ReviewList from '~/Components/Presentational/ReviewList';

// Routes
import GETReviewList from '~/Routes/Review/GETReviewList';

const ContainerView = Styled.View`
flex: 1;
background: #F5F7F9;
`;

const ActivityContainerView = Styled.View`
flex: 1;
background: #F5F7F9;
align-items: center;
justify-content: center;
`;

interface Props {
  isRequestChanged: boolean;
  fetchSearchResult: any;
  navigation: any;
  renderHeaderComponent: any;
}

const ReviewRoute = ({
  isRequestChanged,
  fetchSearchResult,
  navigation,
  renderHeaderComponent,
}: Props) => {
  const [loadingReviewList, setLoadingReviewList] = useState<boolean>(true);
  const [loadingMoreReview, setLoadingMoreReview] = useState<boolean>(false);
  const [noMoreReviewData, setNoMoreReviewData] = useState(false);

  const [order, setOrder] = useState<string>('createdAt');
  const [region, setRegion] = useState('all');
  const limit = 10;
  const [floatVisible, setFloatVisible] = useState(false);

  const [refreshingReviewList, setRefreshingReviewList] = useState<boolean>(
    false,
  );

  const dispatch = useDispatch();
  const currentUser = useSelector((state: any) => state.currentUser);
  const reviewList = useSelector(
    (state: any) => state.reviewList.SearchResultReviews,
  );
  const hometown = currentUser.hometown;
  const jwtToken = currentUser.jwtToken;
  const [selectedHometown, setSelectedHometown] = useState({
    emdName: '전국',
    id: -1,
  });

  useEffect(() => {
    if (!isRequestChanged) {
      getInitialReviewList();
    }
  }, [isRequestChanged]);

  useEffect(() => {
    setOrder('createdAt');
    setRefreshingReviewList(true);
    setRegion(selectedHometown.id === -1 ? 'all' : 'residence');
    const form = {
      pathType: 'review',
      region: selectedHometown.id === -1 ? 'all' : 'residence',
      cityId: String(selectedHometown.id),
      order: 'createdAt',
      offset: 0,
      limit: 10,
    };

    fetchSearchResult(form, (response: any) => {
      setRefreshingReviewList(false);
      dispatch(allActions.reviewListActions.setSearchResultReviews(response));
    });
  }, [selectedHometown]);

  const getInitialReviewList = useCallback(() => {
    const form = {
      pathType: 'review',
      region,
      cityId: String(selectedHometown.id),
      order,
      offset: 0,
      limit,
    };

    fetchSearchResult(form, (response: any) => {
      console.log('GETReviewList response', response);
      //console.log("offset", offset);

      setLoadingReviewList(false);
      setRefreshingReviewList(false);
      //setReviewList(response);
      dispatch(allActions.reviewListActions.setSearchResultReviews(response));
    });
  }, [limit, region, order, selectedHometown, fetchSearchResult]);

  const getMoreReviewList = useCallback(() => {
    const offset = reviewList.length;
    const form = {
      pathType: 'review',
      region,
      cityId: String(selectedHometown.id),
      order,
      offset,
      limit,
    };

    fetchSearchResult(form, (response: any) => {
      console.log('GETReviewList response', response);
      console.log('offset', offset);
      setLoadingMoreReview(false);
      if (response.length > 0) {
        setNoMoreReviewData(false);
        /*
              setReviewList((prevState) => {
                return [...prevState, ...response]
              });
              */

        dispatch(
          allActions.reviewListActions.setSearchResultReviews([
            ...reviewList,
            ...response,
          ]),
        );
      } else {
        setNoMoreReviewData(true);
      }
      setLoadingReviewList(false);
      setRefreshingReviewList(false);
    });
  }, [reviewList, region, selectedHometown, order, limit, fetchSearchResult]);

  const onFiltering = useCallback(
    (searchOrder: string, callback = () => console.log('filtered')) => {
      setRefreshingReviewList(true);
      setOrder(searchOrder);
      const form = {
        pathType: 'review',
        region,
        cityId: String(selectedHometown.id),
        order: searchOrder,
        offset: 0,
        limit,
      };

      fetchSearchResult(form, (response: any) => {
        setNoMoreReviewData(false);
        setRefreshingReviewList(false);
        dispatch(allActions.reviewListActions.setSearchResultReviews(response));
        callback();
      });
    },
    [jwtToken, region, limit, selectedHometown, fetchSearchResult],
  );
  const onRefreshReviewList = useCallback(() => {
    setRefreshingReviewList(true);
    getInitialReviewList();
  }, [getInitialReviewList]);

  const onEndReachedReviewList = useCallback(() => {
    if (!noMoreReviewData && !loadingMoreReview) {
      setLoadingMoreReview(true);
      getMoreReviewList();
    }
  }, [loadingMoreReview, noMoreReviewData, getMoreReviewList]);

  const moveToHomeTownSetting = useCallback(() => {
    navigation.navigate('HometownSettingScreen');
  }, []);

  return (
    <ContainerView>
      {loadingReviewList ? (
        <ActivityContainerView>
          <ActivityIndicator />
        </ActivityContainerView>
      ) : (
        <ReviewList
          navigation={navigation}
          loadingMoreReview={loadingMoreReview}
          refreshingReviewList={refreshingReviewList}
          onRefreshReviewList={onRefreshReviewList}
          reviewList={reviewList}
          onEndReachedReviewList={onEndReachedReviewList}
          renderHeaderComponent={() =>
            renderHeaderComponent(
              order,
              selectedHometown,
              onFiltering,
              setFloatVisible,
            )
          }
        />
      )}
      {floatVisible ? (
        <LocationSelection
          hometown={[{emdName: '전국', id: -1}, ...hometown]}
          selectedHometown={selectedHometown}
          setSelectedHometown={setSelectedHometown}
          setFloatVisible={setFloatVisible}
          moveToHomeTownSetting={moveToHomeTownSetting}
        />
      ) : null}
    </ContainerView>
  );
};

export default React.memo(ReviewRoute);