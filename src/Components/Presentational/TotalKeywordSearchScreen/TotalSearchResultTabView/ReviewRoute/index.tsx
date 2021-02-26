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
import LocationSelection from '~/Components/Container/CommunityListScreen/FilteringHeader/LocationSelection';

// Local Component
import ReviewList from '~/Components/Presentational/ReviewList';

// Routes
import GETSearchRecord from '~/Routes/Search/GETSearchRecord';

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
  fetchSearchResult: any;
  navigation: any;
  renderHeaderComponent: any;
}

const ReviewRoute = ({
  fetchSearchResult,
  navigation,
  renderHeaderComponent,
}: Props) => {
  const [initialize, setInitialize] = useState(true);
  const [pageIndex, setPageIndex] = useState(1);
  const [loadingReviewList, setLoadingReviewList] = useState<boolean>(true);
  const [loadingMoreReview, setLoadingMoreReview] = useState<boolean>(false);
  const [noMoreReviewData, setNoMoreReviewData] = useState(false);

  const [order, setOrder] = useState<string>('createdAt');
  const [region, setRegion] = useState('all');
  const limit = 10;
  const orderList = [
    {name: '최신순', data: 'createdAt'},
    {name: '인기순', data: 'popular'},
  ];
  const [floatVisible, setFloatVisible] = useState(false);

  const [refreshingReviewList, setRefreshingReviewList] = useState<boolean>(
    false,
  );

  const dispatch = useDispatch();

  const reviewList = useSelector(
    (state: any) => state.reviewList.SearchResultReviews,
  );
  const jwtToken = useSelector((state: any) => state.currentUser.jwtToken);
  const hometown = useSelector((state: any) => state.currentUser.hometown);
  const [selectedHometown, setSelectedHometown] = useState({
    emdName: '전국',
    id: -1,
  });

  useEffect(() => {
    dispatch(allActions.reviewListActions.setSearchResultReviews([]));
    setPageIndex(1);
    setInitialize(true);
    console.log(selectedHometown);
    setOrder('createdAt');

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
      setInitialize(false);
      setNoMoreReviewData(response.length === 0);
      setLoadingMoreReview(false);
      console.log(response);
      GETSearchRecord({jwtToken, isUnified: true}).then((response: any) => {
        console.log('fetch record', response);
        dispatch(allActions.userActions.setSearchRecord(response));
      });
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
    setPageIndex(1);
    fetchSearchResult(form, (response: any) => {
      console.log('GETReviewList response', response);
      //console.log("offset", offset);
      setNoMoreReviewData(response.length === 0);
      setLoadingReviewList(false);
      setRefreshingReviewList(false);
      //setReviewList(response);
      dispatch(allActions.reviewListActions.setSearchResultReviews(response));
    });
  }, [limit, region, order, selectedHometown, fetchSearchResult]);

  const getMoreReviewList = useCallback(() => {
    const form = {
      pathType: 'review',
      region,
      cityId: String(selectedHometown.id),
      order,
      offset: pageIndex * 10,
      limit,
    };

    fetchSearchResult(form, (response: any) => {
      setPageIndex((prev) => prev + 1);
      console.log('GETReviewList response', response.length);

      if (response.length < limit) {
        setNoMoreReviewData(true);
        dispatch(
          allActions.reviewListActions.setSearchResultReviews([
            ...reviewList,
            ...response,
          ]),
        );
      } else {
        setNoMoreReviewData(false);

        dispatch(
          allActions.reviewListActions.setSearchResultReviews([
            ...reviewList,
            ...response,
          ]),
        );
      }
      setLoadingMoreReview(false);
    });
  }, [
    reviewList,
    region,
    selectedHometown,
    order,
    limit,
    fetchSearchResult,
    pageIndex,
  ]);

  const onFiltering = useCallback(
    (searchOrder: string, callback = () => console.log('filtered')) => {
      setOrder(searchOrder);
      setPageIndex(1);
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
        setLoadingMoreReview(false);
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
      <ReviewList
        navigation={navigation}
        loadingMoreReview={loadingMoreReview}
        refreshingReviewList={refreshingReviewList}
        onRefreshReviewList={onRefreshReviewList}
        reviewList={reviewList}
        onEndReachedReviewList={onEndReachedReviewList}
        renderHeaderComponent={() =>
          renderHeaderComponent({
            order,
            orderList,
            selectedHometown,
            onFiltering,
            setFloatVisible,
            floatAvailable: true,
            isEmpty: reviewList.length === 0,
            initialize,
          })
        }
      />

      {floatVisible ? (
        <LocationSelection
          hometown={[{emdName: '전국', id: -1}, ...hometown]}
          selectedHometown={selectedHometown}
          setSelectedHometown={setSelectedHometown}
          setFloatVisible={setFloatVisible}
          moveToHomeTownSetting={moveToHomeTownSetting}
          style={{
            right: 16,
            top: 54,
          }}
        />
      ) : null}
    </ContainerView>
  );
};

export default React.memo(ReviewRoute);
