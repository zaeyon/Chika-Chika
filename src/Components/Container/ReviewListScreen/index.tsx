import React, {useState, useEffect} from 'react';
import SafeAreaView from 'react-native-safe-area-view';
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
import {isIphoneX} from 'react-native-iphone-x-helper';
import {useSelector, useDispatch} from 'react-redux';
import allActions from '~/actions';

// Local Component
import ReviewItem from '~/Components/Presentational/ReviewItem';
import ReviewList from '~/Components/Presentational/ReviewList';

// Route
import GETReviewList from '~/Routes/Review/GETReviewList';

const Container = Styled.View`
 flex: 1;
 background-color: #FFFFFF;
`;

const HeaderBar = Styled.View`
 width: ${wp('100%')}px;
 height: ${wp('11.7%')}px;
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
 background-color:#ffffff;
`;

const HeaderLeftContainer = Styled.View`
padding: 7px 16px 13px 15px;
 align-items: center;
 justify-content: center;
 flex-direction: row;
`;

const HeaderBackIcon = Styled.Image`
width: ${wp('6.4%')}px;
height: %{wp('6.4%)}px;
`;

const HeaderTitleText = Styled.Text`
 
`;

const HeaderRightContainer = Styled.View`
padding: 7px 16px 13px 15px;
 align-items: center;
 justify-content: center;
 flex-direction: row;
`;

const HeaderEmptyContainer = Styled.View`
width: ${wp('6.4%')}px;
height: ${wp('6.4%')}px;
`;

const BodyContainer = Styled.View`
padding-top: 32px;
background-color: #ffffff;
align-items: center;
`;

const ReviewContainer = Styled.View`
`;

const ReviewListContainer = Styled.View`
flex: 1;
`;

const ReviewHeaderContainer = Styled.View`
width: ${wp('87.2%')}
flex-direction: row;
align-items: center;
justify-content: space-between;
`;

const ReviewLabelText = Styled.Text`
font-weight: 700;
font-size: 16px;
color: #000000;
`;

const MoreViewContainer = Styled.View`
align-items: center;
justify-content: center;
padding: 5px;
`;

const MoreViewText = Styled.Text`
font-size: 16px;
font-weight: 400;
color: #000000;
`;

const ReviewItemContainer = Styled.View`
margin-top: 8px;
width: ${wp('87.2%')}px;
height: ${wp('40%')}px;
border-radius: 8px;
border-width: 1px;
border-color: #c4c4c4;
`;

const HospitalContainer = Styled.View`
`;

const HospitalListContainer = Styled.View`
`;

const HospitalHeaderContainer = Styled.View`
width: ${wp('87.2%')}
flex-direction: row;
align-items: center;
justify-content: space-between;
`;

const HospitalLabelText = Styled.Text`
font-weight: 700;
font-size: 16px;
color: #000000;
`;

const HospitalItemContainer = Styled.View`
margin-top: 8px;
width: ${wp('87.2%')}px;
height: ${wp('40%')}px;
border-radius: 8px;
border-width: 1px;
border-color: #c4c4c4;
`;

const ReviewUploadButton = Styled.View`
width: ${wp('87.2%')}px;
height: ${wp('24.416%')}px;
border-radius: 8px;
border-width: 1px;
border-color: #C4C4C4;
align-items: center;
justify-content: center;
`;

const ReviewUploadText = Styled.Text`
font-weight: 700;
color: #000000;
font-size: 18px;
`;

const ToothCareButton = Styled.View`
width: ${wp('87.2%')}px;
height: ${wp('24.416%')}px;
border-radius: 8px;
border-width: 1px;
border-color: #C4C4C4;
align-items: center;
justify-content: center;
`;

const ToothCareText = Styled.Text`
font-weight: 700;
color: #000000;
font-size: 18px;
`;

const IndicatorContainer = Styled.View`
flex: 1;
background-color: #ffffff;
align-items: center;
justify-content: center;
`;

const EndReachedIndicatorContainer = Styled.View`
height: ${hp('9%')}px;
background-color: #ffffff;
align-items: center;
justify-content: center;
`;

const TEST_REVIEW_DATA = [
  {
    TreatmentItems: [
      {name: '복합레진', review_treatment_item: {cost: 30000}},
      {name: '임플란트', review_treatment_item: {cost: 20000}},
    ],
    certifiedBill: true,
    treatmentDate: '2020-12-17',
    createdAt: '2020-12-17T12:30:46.000Z',
    deletedAt: null,
    dentalClinicId: 43,
    dental_clinic: {
      id: 43,
      name: '시그마치과병원',
    },
    hits: 0,
    id: 15,
    reviewCommentsNum: 0,
    reviewDescriptions: '1 2',
    reviewLikeNum: 0,
    reviewViewNum: 0,
    review_contents: [
      {
        id: 14,
        img_before_after: null,
        img_url:
          'https://s3-ap-northeast-2.amazonaws.com/chikachika-review-images/original%2F1607935712984D535E140-94A0-4647-8F0F-A60EF688F976.JPG',
        index: 1,
      },
    ],
    starRate_cost: 5,
    starRate_service: 4,
    starRate_treatment: 4,
    updatedAt: '2020-12-17T12:30:46.000Z',
    user: {
      nickname: 'jiwon11',
      profileImg: '',
    },
    userId: 'fb0617b0-33c0-11eb-92de-e3fb3b4e0264',
    viewerLikedReview: 0,
  },
  {
    TreatmentItems: [[Object]],
    certifiedBill: false,
    treatmentDate: '2020-12-14',
    createdAt: '2020-12-14T08:48:37.000Z',
    deletedAt: null,
    dentalClinicId: 2697,
    dental_clinic: {
      id: 2697,
      name: '아너스치과교정과치과의원(강서구-화곡동)',
    },
    hits: 0,
    id: 14,
    reviewCommentsNum: 0,
    reviewDescriptions: '충cnd',
    reviewLikeNum: 0,
    reviewViewNum: 0,
    review_contents: [[Object]],
    starRate_cost: 4.5,
    starRate_service: 3.5,
    starRate_treatment: 3,
    updatedAt: '2020-12-14T08:48:37.000Z',
    user: {
      nickname: 'jiwon11',
      profileImg: '',
    },
    userId: 'fb0617b0-33c0-11eb-92de-e3fb3b4e0264',
    viewerLikedReview: 0,
  },
  {
    TreatmentItems: [[Object]],
    certifiedBill: false,
    treatmentDate: '2020-12-14',
    createdAt: '2020-12-14T08:10:38.000Z',
    deletedAt: null,
    dentalClinicId: 4409,
    dental_clinic: {
      id: 4409,
      name: '충무로치과의원',
    },
    hits: 0,
    id: 13,
    reviewCommentsNum: 0,
    reviewDescriptions: null,
    reviewLikeNum: 0,
    reviewViewNum: 0,
    review_contents: [[Object]],
    starRate_cost: 4,
    starRate_service: 3.5,
    starRate_treatment: 3,
    updatedAt: '2020-12-14T08:10:38.000Z',
    user: {
      nickname: 'jiwon11',
      profileImg: '',
    },
    userId: 'fb0617b0-33c0-11eb-92de-e3fb3b4e0264',
    viewerLikedReview: 0,
  },
  {
    TreatmentItems: [[Object]],
    certifiedBill: false,
    treatmentDate: '2020-12-14',
    createdAt: '2020-12-14T08:10:10.000Z',
    deletedAt: null,
    dentalClinicId: 75,
    dental_clinic: {
      id: 75,
      name: 'Dr.서치과의원',
    },
    hits: 0,
    id: 12,
    reviewCommentsNum: 0,
    reviewDescriptions: null,
    reviewLikeNum: 0,
    reviewViewNum: 0,
    review_contents: [[Object]],
    starRate_cost: 3,
    starRate_service: 3,
    starRate_treatment: 4,
    updatedAt: '2020-12-14T08:10:10.000Z',
    user: {
      nickname: 'jiwon11',
      profileImg: '',
    },
    userId: 'fb0617b0-33c0-11eb-92de-e3fb3b4e0264',
    viewerLikedReview: 0,
  },
];

interface Props {
  navigation: any;
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

var offset = 0;
var limit = 10;
let noMoreReviewData = false;

const ReviewListScreen = ({navigation}: Props) => {
  //const [reviewList, setReviewList] = useState<Array<ReviewData>>([]);
  const [loadingReviewList, setLoadingReviewList] = useState<boolean>(true);
  const [loadingMoreReview, setLoadingMoreReview] = useState<boolean>(false);
  const [order, setOrder] = useState<string>('createdAt');
  const [refreshingReviewList, setRefreshingReviewList] = useState<boolean>(
    false,
  );
  const [changingReviewList, setChangingReviewList] = useState<boolean>(false);

  const dispatch = useDispatch();
  const currentUser = useSelector((state: any) => state.currentUser);
  const reviewList = useSelector((state: any) => state.reviewList);
  const jwtToken = currentUser.jwtToken;

  useEffect(() => {
    offset = 0;
    getInitialReviewList();
  }, []);

  const getInitialReviewList = () => {
    offset = 0;

    GETReviewList({jwtToken, order, offset, limit})
      .then((response: any) => {
        console.log('GETReviewList response', response);
        //console.log("offset", offset);

        setLoadingReviewList(false);
        setRefreshingReviewList(false);
        setChangingReviewList(!changingReviewList);
        //setReviewList(response);
        dispatch(allActions.reviewListActions.setMainReviewList(response));
      })
      .catch((error) => {
        setLoadingMoreReview(false);
        console.log('GETReviewList error', error);
      });
  };

  const getMoreReviewList = () => {
    GETReviewList({jwtToken, order, offset, limit})
      .then((response: any) => {
        console.log('GETReviewList response', response);
        console.log('offset', offset);
        setLoadingMoreReview(false);
        if (response.length > 0) {
          noMoreReviewData = false;
          /*
              setReviewList((prevState) => {
                return [...prevState, ...response]
              });
              */

          dispatch(
            allActions.reviewListActions.setMainReviewList(
              reviewList.mainReviewList.concat(response),
            ),
          );
        } else {
          noMoreReviewData = true;
        }
        setLoadingReviewList(false);
        setRefreshingReviewList(false);
      })
      .catch((error) => {
        setLoadingMoreReview(false);
        console.log('GETReviewList error', error);
      });
  };

  const goBack = () => {
    navigation.goBack();
  };

  const onRefreshReviewList = () => {
    offset = 0;
    setRefreshingReviewList(true);
    getInitialReviewList();
  };

  const onEndReachedReviewList = () => {
    if (!noMoreReviewData && !loadingMoreReview) {
      setLoadingMoreReview(true);
      offset = offset + 10;
      getMoreReviewList();
    }
  };

  const moveToWriterProfile = () => {
    navigation.navigate('AnotherProfileStackScreen', {
      screen: 'AnotherProfileScreen',
    });
  };

  const moveToDentalDetail = (dentalId: number) => {
    navigation.navigate('DentalClinicStack', {
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
  };

  return (
    <Container as={SafeAreaView} forceInset={{top: 'always'}}>
      <HeaderBar>
        <TouchableWithoutFeedback onPress={() => goBack()}>
          <HeaderLeftContainer>
            <HeaderBackIcon
              source={require('~/Assets/Images/HeaderBar/ic_back.png')}
            />
          </HeaderLeftContainer>
        </TouchableWithoutFeedback>
        <HeaderTitleText>Review List</HeaderTitleText>
        <HeaderRightContainer>
          <HeaderEmptyContainer></HeaderEmptyContainer>
        </HeaderRightContainer>
      </HeaderBar>
      {!loadingReviewList && (
        <ReviewListContainer>
          <ReviewList
            loadingMoreReview={loadingMoreReview}
            refreshingReviewList={refreshingReviewList}
            onRefreshReviewList={onRefreshReviewList}
            reviewList={reviewList.mainReviewList}
            moveToReviewDetail={moveToReviewDetail}
            moveToWriterProfile={moveToWriterProfile}
            onEndReachedReviewList={onEndReachedReviewList}
            moveToDentalDetail={moveToDentalDetail}
          />
        </ReviewListContainer>
      )}
      {loadingReviewList && (
        <IndicatorContainer>
          <ActivityIndicator />
        </IndicatorContainer>
      )}
    </Container>
  );
};

export default ReviewListScreen;
