import React, {
  useState,
  useEffect,
  useRef,
  createRef,
  useCallback,
} from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import Styled from 'styled-components/native';
import {
  TouchableWithoutFeedback,
  FlatList,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  View,
  ActivityIndicator,
  RefreshControl,
  Alert,
  StyleSheet,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector, useDispatch} from 'react-redux';
import allActions from '~/actions';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ActionSheet from 'react-native-actionsheet';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import axios from 'axios';

// Local Component
import ReviewInformation from '~/Components/Presentational/ReviewDetailScreen/ReviewInformation';
import ReviewContent from '~/Components/Presentational/ReviewDetailScreen/ReviewContent';
import PreviewCommentList from '~/Components/Presentational/PreviewCommentList';
import ReviewBottomBar from '~/Components/Presentational/ReviewDetailScreen/ReviewBottomBar';
import NavigationHeader from '~/Components/Presentational/NavigationHeader';
import TreatmentList from '~/Components/Presentational/ReviewDetailScreen/TreatmentList';
import ReviewMetaInfo from '~/Components/Presentational/ReviewDetailScreen/ReviewMetaInfo';
import WriterInfo from '~/Components/Presentational/ReviewDetailScreen/WriterInfo';

// Route
import GETReviewDetail from '~/Routes/Review/GETReviewDetail';
import POSTReply from '~/Routes/Comment/POSTReply';
import DELETEReview from '~/Routes/Review/DELETEReview';
import POSTReviewLike from '~/Routes/Review/POSTReviewLike';
import DELETEReviewLike from '~/Routes/Review/DELETEReviewLike';
import POSTReviewScrap from '~/Routes/Review/POSTReviewScrap';
import DELETEReviewScrap from '~/Routes/Review/DELETEReviewScrap';
import DELETEComment from '~/Routes/Comment/DELETEComment';
import GETCommentList from '~/Routes/Comment/GETCommentList';

const Container = Styled.View`
 flex: 1;
 background-color: #FFFFFF;
`;

const BodyContainer = Styled.View`
flex: 1;
background-color: #ffffff;
`;

const ScrollViewContainer = Styled.View`
`;

const BottomBarContainer = Styled.View`
position: absolute;
bottom: 0;
width: ${wp('100%')}px;
`;

const TreatmentListContainer = Styled.View`
`;

const ReviewContentContainer = Styled.View`

`;

const CommentListContainer = Styled.View`
padding-bottom: 35px;
`;

const MetaInfoContainer = Styled.View`
padding-top: 20px;
padding-left: 16px;
padding-right: 16px;
padding-bottom: 20px;
border-bottom-width: 8px;
border-color: #F5F7F9;
`;

const IndicatorContainer = Styled.View`
width: ${wp('100%')}px;
padding-top: ${hp('30%')}px;
background-color: #ffffff
align-items: center;
justify-content: center;
flex: 1;
`;

const TransIndicatorContainer = Styled.View`
position: absolute;
width: ${wp('100%')}px;
height: ${hp('100%')}px;
background-color: #00000040;
align-items: center;
justify-content: center;
`;

const MoreViewModalContainer = Styled.View`
position: absolute;
top: ${getStatusBarHeight() + hp('6.5%') - hp('1.23%')}px;
right: ${wp('4.26')}px;
background-color: #ffffff;
border-width: 1px;
border-color: #E2E6ED;
border-radius: 12px;
z-index: 3;
`;

const MoreViewItemContainer = Styled.View`
padding-top: ${hp('1.477%')}px;
padding-bottom: ${hp('1.477%')}px;
padding-left: ${wp('4.26%')}px;
padding-right: ${wp('18.13%')}px;
border-bottom-width: 1px;
border-color: #E2E6ED;
`;

const MoreViewItemLabelText = Styled.Text`
font-size: 16px;
font-weight: 700;
color: #000000;
`;

const WriterInfoContainer = Styled.View`
`;

const ModalContentText = Styled.Text`
text-align: center;
font-weight: 400;
font-size: 14px;
line-height: 20px;
color: #131F3C;
`;

interface Props {
  navigation: any;
  route: any;
}

interface WriterObj {
  nickname: string;
  profileImage: string;
  userId: string;
}

interface DentalObj {
  name: string;
  address: string;
  id: any;
}

interface RatingObj {
  avgRating: number;
  serviceRating: number;
  treatRating: number;
  priceRating: number;
}

interface metaInfoObj {
  dentalObj: DentalObj;
  ratingObj: RatingObj;
  treatmentDateObj: any;
  totalPriceObj: any;
}

let selectedCommentId: number;
let startTime: any;
let endTime: any;

const ReviewDetailScreen = ({navigation, route}: Props) => {
  const userProfile = useSelector((state: any) => state.currentUser.profile);
  const [paragraphArray, setParagraphArray] = useState<Array<any>>([]);

  const [isCurUserLike, setIsCurUserLike] = useState<boolean>(
    route.params?.isCurUserLike,
  );
  const [isCurUserScrap, setIsCurUserScrap] = useState<boolean>(
    route.params?.isCurUserScrap,
  );
  const [likeCount, setLikeCount] = useState<number>(route.params?.likeCount);

  const [viewCount, setViewCount] = useState<number>(0);

  const [isCommentInputFocused, setIsCommentInputFocused] = useState<boolean>(
    false,
  );
  const [paddingBottom, setPaddingBottom] = useState<number>(hp('8%'));

  const [loadingReviewDetail, setLoadingReviewDetail] = useState<boolean>(true);
  const [loadingCommentPost, setLoadingCommentPost] = useState<boolean>(false);
  const [refreshingReviewDetail, setRefreshingReviewDetail] = useState<boolean>(
    false,
  );

  const [metaInfoObj, setMetaInfoObj] = useState<MetaInfoObj>({
    dentalObj: {
      address: "", 
      id: 0,
      name: "",
      originalName: "",
      profileImages: []
    },
    ratingObj: route.params?.ratingObj,
    totalPriceObj: {},
    treatmentDateObj: {},
  });

  const [treatmentDate, setTreatmentDate] = useState<any>({});
  const [treatmentArray, setTreatmentArray] = useState<Array<object>>([]);
  const [rating, setRating] = useState<RatingObj>(route.params?.ratingObj);
  const [totalPrice, setTotalPrice] = useState<object>({});
  const [detailPriceList, setDetailPriceList] = useState<Array<object>>([]);

  const [previewCommentArray, setPreviewCommentArray] = useState<Array<any>>(
    [],
  );

  // 화면에 표시되는 정보
  const [paragraphArrayDisplay, setParagraphArrayDisplay] = useState<
    Array<any>
  >([]);
  const [treatmentArrayDisplay, setTreatmentArrayDisplay] = useState<
    Array<any>
  >(route.params?.treatmentArray);
  const [treatmentDateDisplay, setTreatmentDateDisplay] = useState<String>(
    route.params?.treatmentDate,
  );
  const [elapsedTime, setElapsedTime] = useState<string>(
    route.params?.elapsedTime,
  );
  const [isVisibleOwnMoreViewModal, setIsVisibleOwnMoreViewModal] = useState<
    boolean
  >(false);
  const [
    isVisibleOtherMoreViewModal,
    setIsVisibleOtherMoreViewModal,
  ] = useState<boolean>(false);
  const [isOwnReview, setIsOwnReview] = useState<boolean>(route.params?.writer?.userId === userProfile?.id);

  const [isCertifiedReceipt, setIsCertifiedReceipt] = useState<boolean>(false);
  const [changeCommentArray, setChangeCommentArray] = useState<boolean>(false);

  const [writerObj, setWriterObj] = useState<WriterObj>(route.params?.writer);

  const [imageArray, setImageArray] = useState<Array<any>>(
    route.params?.imageArray,
  );

  const scrollViewRef = useRef<any>();
  const reviewScrollViewRef = useRef<any>(null);

  const ownCommentActionSheetRef = createRef<any>();
  const otherCommentActionSheetRef = createRef<any>();

  const dispatch = useDispatch();
  const reviewList = useSelector((state: any) => state.reviewList);

  const commentState = useSelector((state: any) => state.commentList);
  const commentArray = commentState.commentList;
  const commentCount = commentState.commentCount;

  const jwtToken = useSelector((state: any) => state.currentUser.jwtToken);

  const reviewId = route.params?.reviewId;

  const createdDate = route.params?.createdAt;
  const isVisibleElapsedTime = route.params?.visibleElapsedTime;

  //const imageArray = route.params?.imageArray;
  //const isOwnReview = route.params?.writer?.userId === userProfile?.id;

  // console.log('route.params?.reviewId', route.params?.reviewId);
  // console.log('route.params?.imageArray', route.params?.imageArray);
  // console.log('route.params?.writer', route.params?.writer);
  // console.log('route.params?.writer.userId', route.params?.writer?.userId);
  // console.log('userProfile.id', userProfile?.id);
  // console.log('route.params?.ratingObj', route.params?.ratingObj);
  // console.log('route.params?.dentalObj', route.params?.dentalObj);
  // console.log('route.params?.treatmentDate', route.params?.treatmentDate);
  // console.log('route.params?.elapsedTime', route.params?.elapsedTime);

  useEffect(() => {
    startTime = new Date();
    getReviewDetail();
    getReviewCommentList();
  }, []);

  useEffect(() => {
    console.log("route.params?.type", route.params?.type);
    console.log("route.params?.category", route.params?.category);
    if(route.params?.type === "Notification" && route.params?.category === "comment") {
      navigation.navigate("CommentListScreen", {
        postId: route.params.reviewId,
        postType: 'review',
        commentActionType: 'comment',
        commentId: route.params?.commentId,
      })
    }
  }, [route.params?.type])

  useEffect(() => {
    console.log('리뷰수정 취소', route.params?.isCancelRevise);
    if (route.params?.isCancelRevise) {
      reviewScrollViewRef.current.scrollTo({x: 0, y: 0, animated: false});
      route.params.isCancelRevise = !route.params.isCancelRevise;
    }
  }, [route.params?.isCancelRevise]);

  useEffect(() => {
    if (route.params?.isRevised) {
      route.params.isRevised = !route.params.isRevised;
      reviewScrollViewRef.current.scrollTo({x: 0, y: 0, animated: false});

      const tmpTreatmentDate = new Date(
        route.params?.treatmentDateObj.treatDate,
      );
      const splitedTreatmentDate = route.params?.treatmentDateObj.displayTreatDate.split(
        '-',
      );

      const tmpDisplayTreatDate =
        splitedTreatmentDate[0] +
        '.' +
        splitedTreatmentDate[1] +
        '.' +
        splitedTreatmentDate[2];

      const tmpTreatmentDateObj = {
        displayTreatmentDate: tmpDisplayTreatDate,
        treatmentDate: tmpTreatmentDate,
      };

      const tmpTreatPriceObj = {
        displayTreatPrice: route.params.totalPrice.toLocaleString() + '원',
        treatPrice: route.params.totalPrice,
      };

      async function getRevisedImageArray() {
        let tmpImageArray = await getImageArray(route.params.paragraphArray);
        console.log('getRevisedImageArray tmpImageArray', tmpImageArray);
        setImageArray(tmpImageArray);
      }

      const tmpDentalObj = route.params.dentalObj;
      tmpDentalObj.profileImages = [];

      getRevisedImageArray();
      setParagraphArrayDisplay(route.params.paragraphArray);
      setTreatmentArrayDisplay(route.params.treatmentArray);

      const tmpMetaInfoObj = {
        dentalObj: tmpDentalObj,
        ratingObj: route.params.ratingObj,
        totalPriceObj: tmpTreatPriceObj,
        treatmentDateObj: tmpTreatmentDateObj,
      };

      setMetaInfoObj(tmpMetaInfoObj);
    }
  }, [
    route.params?.isRevised,
    route.params?.paragraphArray,
    route.params?.treatmentArray,
    route.params?.ratingObj,
    route.params?.dentalObj,
  ]);

  // useEffect(() => {

  //   let tmpCommentArray = commentArray.slice();
  //   let remainingCount = 20;

  //   if(commentCount > 10) {

  //     for(var i = 0; i < tmpCommentArray.length; i++) {
  //       remainingCount = remainingCount - (1 + tmpCommentArray[i].Replys.length);

  //       if(remainingCount <= 0) {
  //         const deletedCommentArray = tmpCommentArray.slice(0, i+1);
  //         const tmpReplyArray = tmpCommentArray[i].Replys;
  //         const deletedReplyArray = tmpReplyArray.slice(0, (tmpReplyArray.length - Math.abs(remainingCount)));

  //         deletedCommentArray[i].Replys = deletedReplyArray;

  //         setPreviewCommentArray(deletedCommentArray);

  //         break
  //       }
  //     }
  //   } else {
  //     setPreviewCommentArray(tmpCommentArray);
  //   }
  // }, [commentArray])

  useEffect(() => {
    const id = reviewId;
    const type = 'review';
    GETCommentList({jwtToken, type, id})
      .then((response: any) => {
        console.log('GETCommentList response', response);
        //setCommentArray(response.reverse())
        //dispatch(allActions.commentListActions.setCommentList(response.comments.reverse()));
        //dispatch(allActions.commentListActions.setCommentCount(response.commentsNum.commentsNum));

        let tmpCommentArray = response.comments.reverse().slice();
        let remainingCount = 10;

        if (commentCount > 10) {
          for (var i = 0; i < tmpCommentArray.length; i++) {
            remainingCount =
              remainingCount - (1 + tmpCommentArray[i].Replys.length);

            if (remainingCount <= 0) {
              const deletedCommentArray = tmpCommentArray.slice(0, i + 1);
              const tmpReplyArray = tmpCommentArray[i].Replys;
              const deletedReplyArray = tmpReplyArray.slice(
                0,
                tmpReplyArray.length - Math.abs(remainingCount),
              );

              deletedCommentArray[i].Replys = deletedReplyArray;

              setPreviewCommentArray(deletedCommentArray);

              break;
            }
          }
        } else {
          setPreviewCommentArray(tmpCommentArray);
        }
      })
      .catch((error: any) => {
        console.log('GETCommentList error', error);
      });
  }, [commentArray]);

  const formatDate = useCallback((createdAt: string) => {
    const currentYear = new Date(Date.now()).getFullYear();

    const [date, time] = createdAt.split(' ');
    const [year, month, day] = date.split('-');

    if (String(currentYear) === year) {
      return parseInt(month) + '월 ' + parseInt(day) + '일';
    } else {
      return year + '년 ' + parseInt(month) + '월 ' + parseInt(day) + '일';
    }
  }, []);

  const getReviewDetail = () => {
    GETReviewDetail(jwtToken, reviewId)
      .then((response: any) => {
        console.log('GETReviewDetail response', response);
        setLoadingReviewDetail(false);
        setRefreshingReviewDetail(false);

        console.log(
          'GETReviewDetail response.reviewBody.certifiedBill',
          response.reviewBody.certifiedBill,
        );
        setIsCertifiedReceipt(response.reviewBody.certifiedBill);

        console.log("response.reviewBody.user.userId", response.reviewBody.userId);
        console.log("userProfile.id", userProfile.id);

        if(response.reviewBody.userId === userProfile.id) {
          setIsOwnReview(true);
        } else {
          setIsOwnReview(false);
        }

        const tmpWriterObj = {
          nickname: response.reviewBody.user.nickname,
          profileImage: response.reviewBody.user.profileImg,
          userId: response.reviewBody.userId,
        };

        setWriterObj(tmpWriterObj);

        let elapsedTimeText = '';
        let visibleElapsedTime = false;

        const elapsedMin = response.reviewBody['createdDiff(second)'] / 60;
        const elapsedHour = response.reviewBody['createdDiff(second)'] / 3600;
        const elapsedDay = response.reviewBody['createdDiff(second)'] / 86400;

        if (elapsedMin < 1) {
          elapsedTimeText = '방금 전';
          setElapsedTime(elapsedTimeText);
        } else if (1 <= elapsedMin && elapsedHour < 1) {
          elapsedTimeText = `${Math.floor(elapsedMin)}분 전`;
          setElapsedTime(elapsedTimeText);
        } else if (1 <= elapsedHour && elapsedDay < 1) {
          elapsedTimeText = `${Math.floor(elapsedHour)}시간 전`;
          setElapsedTime(elapsedTimeText);
        } else if (elapsedDay >= 1) {
          setElapsedTime(formatDate(response.reviewBody.createdAt));
        }

        // 현재 사용자의 리뷰일때 리뷰 수정용 데이터 변환 작업
        if (response.reviewBody.userId === userProfile.id) {
          const tmpTreatmentArray = response.reviewBody.TreatmentItems.map(
            (item: any, index: number) => {
              let tmpTreatmentObj;
              if (item.review_treatment_item.cost !== null) {
                tmpTreatmentObj = {
                  name: item.name,
                  price: item.review_treatment_item.cost,
                  displayPrice:
                    Number(item.review_treatment_item.cost).toLocaleString() +
                    '원',
                  id: item.id,
                };
              } else {
                tmpTreatmentObj = {
                  name: item.name,
                  id: item.id,
                };
              }

              return tmpTreatmentObj;
            },
          );

          const tmpDetailPriceList = new Array();

          response.reviewBody.TreatmentItems.forEach(
            (item: any, index: number) => {
              if (item.review_treatment_item.cost !== null) {
                tmpDetailPriceList.push(item);
              }
            },
          );

          setTimeout(() => {
            setDetailPriceList(tmpDetailPriceList);
            setTreatmentArray(tmpTreatmentArray);
          }, 10);
        }

        let tmpImageArray = new Array();

        const tmpParagraphArray = response.reviewBody.review_contents.map(
          (item: any, index: number) => {
            let paraObj = new Object();

            if (item.img_url) {
              tmpImageArray.push(item);
              console.log('리뷰 이미지 문단 item', item);
              paraObj = {
                id: item.id,
                index: item.index,
                image: {
                  uri: item.img_url,
                  name: item.img_name,
                  size: item.img_size,
                  mimeType: item.mime_type,
                  width: item.img_width,
                  height: item.img_height,
                },
                description: item.description,
                order: item.img_before_after,
                isPreExis: true,
              };

              return paraObj;
            } else {
              paraObj = {
                id: item.id,
                index: item.index,
                description: item.description,
              };
            }

            return paraObj;
          },
        );

        // 글 작성자 정보
        const userObj = {
          nickname: response.reviewBody.user.nickname,
          profileImage: response.reviewBody.user.profileImg,
          userId: response.reviewBody.userId,
        };

        const dentalObj = {
          name: response.reviewBody.dental_clinic.name,
          originalName: response.reviewBody.dental_clinic.originalName,
          address: response.reviewBody.dental_clinic.address,
          id: response.reviewBody.dentalClinicId,
          profileImages: response.reviewBody.dental_clinic.dentalClinicProfileImgs,
        };

        if (response.viewerLikeReview) {
          setIsCurUserLike(true);
        } else {
          setIsCurUserLike(false);
        }

        const tmpRatingObj = {
          avgRating: response.reviewBody.AVGStarRate,
          serviceRating: response.reviewBody.starRate_service,
          priceRating: response.reviewBody.starRate_cost,
          treatmentRating: response.reviewBody.starRate_treatment,
        };

        const tmpTreatPriceObj = {
          displayTreatPrice:
            response.reviewBody.totalCost.toLocaleString() + '원',
          treatPrice: response.reviewBody.totalCost,
        };

        const tmpTreatmentDate = new Date(response.reviewBody.treatmentDate);
        const splitedTreatmentDate = response.reviewBody.treatmentDate.split(
          '-',
        );
        const tmpDisplayTreatDate =
          splitedTreatmentDate[0] +
          '.' +
          splitedTreatmentDate[1] +
          '.' +
          splitedTreatmentDate[2];

        const treatmentDateObj = {
          displayTreatmentDate: tmpDisplayTreatDate,
          treatmentDate: tmpTreatmentDate,
        };

        const tmpMetaInfoObj = {
          dentalObj: dentalObj,
          ratingObj: tmpRatingObj,
          totalPriceObj: tmpTreatPriceObj,
          treatmentDateObj: treatmentDateObj,
        };

        setImageArray(tmpImageArray);
        setLikeCount(response.reviewLikeNum);
        setViewCount(response.reviewViewerNum);
        setParagraphArray(tmpParagraphArray);
        setParagraphArrayDisplay(response.reviewBody.review_contents);
        setMetaInfoObj(tmpMetaInfoObj);
      })
      .catch((error) => {
        console.log('GETReviewDetail error', error);
        setLoadingReviewDetail(false);
      });
  };

  const getReviewCommentList = () => {
    const id = reviewId;
    const type = 'review';
    GETCommentList({jwtToken, type, id})
      .then((response: any) => {
        console.log('GETCommentList response', response);
        //setCommentArray(response.reverse())
        dispatch(
          allActions.commentListActions.setCommentList(response.comments),
        );
        dispatch(
          allActions.commentListActions.setCommentCount(response.commentsNum),
        );

        // let tmpCommentArray = response.comments.reverse().slice();
        // let remainingCount = 10;

        // if(commentCount > 10) {

        //   for(var i = 0; i < tmpCommentArray.length; i++) {
        //     remainingCount = remainingCount - (1 + tmpCommentArray[i].Replys.length);

        //   if(remainingCount <= 0) {
        //     const deletedCommentArray = tmpCommentArray.slice(0, i+1);
        //     const tmpReplyArray = tmpCommentArray[i].Replys;
        //     const deletedReplyArray = tmpReplyArray.slice(0, (tmpReplyArray.length - Math.abs(remainingCount)));

        //     deletedCommentArray[i].Replys = deletedReplyArray;

        //     setPreviewCommentArray(deletedCommentArray);

        //     break
        //     }
        //   }
        // } else {
        //   setPreviewCommentArray(tmpCommentArray);
        // }
      })
      .catch((error: any) => {
        console.log('GETCommentList error', error);
      });
  };

  const moveToAnotherProfile = useCallback(
    (userId: string, nickname: string, profileImageUri: string) => {
      navigation.navigate('AnotherProfileStackScreen', {
        targetUser: {
          userId,
          nickname,
          profileImageUri,
        },
      });
    },
    [],
  );

  const getImageArray = async (paragraphArray: Array<any>) => {
    let tmpImageArray = new Array();
    paragraphArray.forEach((item: any, index: number) => {
      if (item.img_url) {
        tmpImageArray.push(item);
      }
    });

    return tmpImageArray;
  };

  const moveToFullImages = (imageUri: string) => {
    console.log('moveToFullImages imageArray', imageArray);

    if (isVisibleOtherMoreViewModal) {
      setIsVisibleOtherMoreViewModal(false);
    } else if (isVisibleOwnMoreViewModal) {
      setIsVisibleOwnMoreViewModal(false);
    } else {
      var index = imageArray.findIndex(
        (image: any) => image.img_url === imageUri,
      );

      navigation.navigate('ImageDetailScreen', {
        imageArray: imageArray,
        imageIndex: index,
      });
    }
  };

  const moveToDentalDetail = (dentalId: number) => {
    navigation.navigate('DentalClinicStack', {
      screen: 'DentalDetailScreen',
      params: {
        dentalId: metaInfoObj.dentalObj.id,
      },
    });
  };

  const moveToCommentList = (request: string) => {
    navigation.navigate('CommentListScreen', {
      postId: reviewId,
      postType: 'review',
    });
  };

  const goBack = () => {
    navigation.goBack();
  };

  const clickMoreView = () => {
    if (isOwnReview) {
      console.log('clickMoreView isOwnReview', isOwnReview);
      setIsVisibleOwnMoreViewModal(!isVisibleOwnMoreViewModal);
    } else {
      console.log('clickMoreView isOwnReview', isOwnReview);
      setIsVisibleOtherMoreViewModal(!isVisibleOtherMoreViewModal);
    }
  };

  const clickCommentIcon = (request: string) => {
    //setIsCommentInputFocused(true);
    moveToCommentList(request);
  };

  const onRefreshReviewDetail = () => {
    setRefreshingReviewDetail(true);
    getReviewDetail();
    getReviewCommentList();
  };

  const clickReviseReview = () => {
    setIsVisibleOwnMoreViewModal(false);

    const submitParagraphArray = paragraphArray;
    console.log('submitParagraphArray', submitParagraphArray);

    navigation.navigate('ReviewUploadStack', {
      screen: 'ReviewMetaDataScreen',
      params: {
        requestType: 'revise',
        paragraphArray: submitParagraphArray,
        dentalObj: {
          originalName: metaInfoObj.dentalObj.originalName,
          address: metaInfoObj.dentalObj.address,
          id: metaInfoObj.dentalObj.id,
        },
        treatmentDateObj: {
          displayTreatmentDate:
            metaInfoObj.treatmentDateObj.displayTreatmentDate,
          treatmentDate: metaInfoObj.treatmentDateObj.treatmentDate,
        },
        selectedTreatmentArray: treatmentArray,
        ratingObj: {
          avgRating: metaInfoObj.ratingObj.avgRating,
          priceRating: metaInfoObj.ratingObj.priceRating,
          serviceRating: metaInfoObj.ratingObj.serviceRating,
          treatmentRating: metaInfoObj.ratingObj.treatmentRating,
        },
        totalPriceObj: metaInfoObj.totalPriceObj,
        reviewId: reviewId,
        treatPrice: totalPrice,
      },
    });
  };

  const clickDeleteReview = () => {
    setIsVisibleOwnMoreViewModal(false);
    Alert.alert('정말 리뷰를 삭제하실건가요?', '', [
      {
        text: '확인',
        onPress: () => deleteReview(),
      },
      {
        text: '취소',
        onPress: () => 0,
        style: 'cancel',
      },
    ]);
  };

  const clickAccuseReview = () => {
    setIsVisibleOtherMoreViewModal(false);
    setIsVisibleOwnMoreViewModal(false);
    navigation.navigate('AccuseScreen', {
      targetType: 'review',
      targetId: reviewId,
    });
  };

  const deleteReview = () => {
    DELETEReview({jwtToken, reviewId})
      .then((response) => {
        console.log('DELTEReview response', response);
        const tmpReviewList = reviewList.mainReviewList;
        const deleteIndex = tmpReviewList.findIndex(
          (item: any, index: number) => {
            if (item.id === reviewId) {
              return true;
            }
          },
        );

        console.log('deleteIndex', deleteIndex);
        tmpReviewList.splice(deleteIndex, 1);

        dispatch(allActions.reviewListActions.deleteReview(reviewId));
        navigation.goBack();
      })
      .catch((error) => {
        console.log('DELETEReview error', error);
      });
  };

  const clickReviewLike = () => {
    dispatch(allActions.reviewListActions.toggleReviewLike(reviewId));
    if (isCurUserLike) {
      deleteReviewLike();
    } else {
      postReviewLike();
    }
  };

  const postReviewLike = () => {
    setIsCurUserLike(true);
    setLikeCount((prevState) => prevState + 1);
    POSTReviewLike({jwtToken, reviewId})
      .then((response) => {
        console.log('POSTReviewLike response', response);
      })
      .catch((error) => {
        console.log('POSTReviewLike error', error);
      });
  };

  const deleteReviewLike = () => {
    setIsCurUserLike(false);
    setLikeCount((prevState) => prevState - 1);
    DELETEReviewLike({jwtToken, reviewId})
      .then((response) => {
        console.log('DELETEReviewLike response', response);
      })
      .catch((error) => {
        console.log('DELETEReviewLike error', error);
      });
  };

  const clickReviewScrap = () => {
    dispatch(allActions.reviewListActions.toggleReviewScrap(reviewId));
    if (isCurUserScrap) {
      deleteReviewScrap();
    } else {
      postReviewScrap();
    }
  };

  const postReviewScrap = () => {
    setIsCurUserScrap(true);
    POSTReviewScrap({jwtToken, reviewId})
      .then((response) => {
        console.log('POSTReviewScrap response', response);
      })
      .catch((error) => {
        console.log('POSTReviewScrap error', error);
      });
  };

  const deleteReviewScrap = () => {
    setIsCurUserScrap(false);
    DELETEReviewScrap({jwtToken, reviewId})
      .then((response) => {
        console.log('DELETEReviewScrap response', response);
      })
      .catch((error) => {
        console.log('DELETEReviewScrap error', error);
      });
  };

  const deleteReviewComment = () => {
    const commentId = selectedCommentId;
    const type = 'review';

    DELETEComment({jwtToken, commentId, type, reviewId})
      .then((response: any) => {
        console.log('DELETEComment response', response);
        dispatch(
          allActions.commentListActions.setCommentList(response.comments),
        );
        dispatch(
          allActions.commentListActions.setCommentCount(response.commentsNum),
        );
      })
      .catch((error) => {
        console.log('DELETEComment error', error);
      });
  };

  const openCommentActionSheet = (
    userId: string,
    nickname: string,
    commentId: number,
  ) => {
    selectedCommentId = commentId;

    if (userId === userProfile?.id) {
      ownCommentActionSheetRef.current.show();
    } else {
      otherCommentActionSheetRef.current.show();
    }
  };

  const onPressOwnCommentActionSheet = (index: number) => {
    if (index === 1) {
      Alert.alert('삭제되면 복구가 불가능합니다.\n정말 삭제하시겠습니까?', "", [
        {
          text: '취소',
          style: 'cancel',
          onPress: () => 0,
        },
        {
          text: '삭제',
          style: 'destructive',
          onPress: () => deleteReviewComment(),
        }
      ])
    }
  };

  const onPressOtherCommentActionSheet = (index: number) => {
    if (index === 1) {
    }
  };

  const clickReply = (commentObj: any, targetUserNickname: string) => {
    //console.log("clickReply userNickname, id", userNickname, id);
    // setInputType("reply");
    // commentInputRef.current.focus();
    // replyTargetId = id;
    // isClickReply = true;
    // replyTargetNickname.current = userNickname;

    navigation.navigate('ReplyPostScreen', {
      commentObj: commentObj,
      targetUserNickname: targetUserNickname,
      postId: reviewId,
      request: 'ReviewDetailScreen',
    });
  };

  const clickReplyOfReply = (commentObj: any, targetUserNickname: string) => {
    navigation.navigate('ReplyPostScreen', {
      commentObj: commentObj,
      targetUserNickname: targetUserNickname,
      postId: reviewId,
      request: 'ReviewDetailScreen',
    });
  };

  const pressBackground = () => {
    if (isOwnReview) {
      if (isVisibleOwnMoreViewModal) {
        setIsVisibleOwnMoreViewModal(false);
      }
    } else {
      if (isVisibleOtherMoreViewModal) {
        setIsVisibleOtherMoreViewModal(false);
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => pressBackground()}>
      <Container as={SafeAreaView} forceInset={{top: 'always'}}>
        <NavigationHeader
          headerLeftProps={{type: 'arrow', onPress: goBack, text: '리얼리뷰'}}
          headerRightProps={{type: 'viewMore', onPress: clickMoreView}}
        />
        <ScrollView
          ref={reviewScrollViewRef}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshingReviewDetail}
              onRefresh={onRefreshReviewDetail}
            />
          }>
          <TouchableWithoutFeedback onPress={() => pressBackground()}>
            <ScrollViewContainer>
              {!loadingReviewDetail && (
                <BodyContainer style={{paddingBottom: paddingBottom}}>
                  <WriterInfoContainer>
                    <WriterInfo
                      moveToAnotherProfile={moveToAnotherProfile}
                      writerObj={writerObj}
                      elapsedTime={elapsedTime}
                      isVisibleElapsedTime={isVisibleElapsedTime}
                      createdDate={createdDate}
                    />
                  </WriterInfoContainer>
                  <TreatmentListContainer>
                    <TreatmentList treatmentArray={treatmentArrayDisplay} />
                  </TreatmentListContainer>
                  <ReviewContentContainer>
                    <ReviewContent
                      moveToFullImages={moveToFullImages}
                      paragraphArray={paragraphArrayDisplay}
                    />
                  </ReviewContentContainer>
                  <MetaInfoContainer>
                    <ReviewMetaInfo
                      metaInfoObj={metaInfoObj}
                      moveToDentalDetail={moveToDentalDetail}
                      isCertifiedReceipt={isCertifiedReceipt}
                    />
                  </MetaInfoContainer>
                  <CommentListContainer>
                    <PreviewCommentList
                      navigation={navigation}
                      commentList={commentArray}
                      commentsNum={commentCount}
                      profile={userProfile}
                      postId={reviewId}
                      postType="review"
                    />
                  </CommentListContainer>
                </BodyContainer>
              )}
              {loadingReviewDetail && (
                <IndicatorContainer>
                  <ActivityIndicator />
                </IndicatorContainer>
              )}
            </ScrollViewContainer>
          </TouchableWithoutFeedback>
        </ScrollView>
        <KeyboardAvoidingView behavior={'position'}>
          <BottomBarContainer>
            <ReviewBottomBar
              moveToDentalDetail={moveToDentalDetail}
              isCurUserLike={isCurUserLike}
              isCurUserScrap={isCurUserScrap}
              clickReviewLike={clickReviewLike}
              clickReviewScrap={clickReviewScrap}
              clickCommentIcon={clickCommentIcon}
              likeCount={likeCount}
              commentCount={commentCount}
            />
          </BottomBarContainer>
        </KeyboardAvoidingView>
        {loadingCommentPost && (
          <TransIndicatorContainer>
            <ActivityIndicator color={'#ffffff'} />
          </TransIndicatorContainer>
        )}
        {isVisibleOwnMoreViewModal && (
          <MoreViewModalContainer style={styles.moreViewModalShadow}>
            <TouchableWithoutFeedback onPress={() => clickReviseReview()}>
              <MoreViewItemContainer>
                <MoreViewItemLabelText>{'수정'}</MoreViewItemLabelText>
              </MoreViewItemContainer>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => clickDeleteReview()}>
              <MoreViewItemContainer>
                <MoreViewItemLabelText>{'삭제'}</MoreViewItemLabelText>
              </MoreViewItemContainer>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => clickAccuseReview()}>
              <MoreViewItemContainer>
                <MoreViewItemLabelText>{'신고'}</MoreViewItemLabelText>
              </MoreViewItemContainer>
            </TouchableWithoutFeedback>
            {/* <MoreViewItemContainer style={{borderBottomWidth: 0}}>
              <MoreViewItemLabelText>{'공유'}</MoreViewItemLabelText>
            </MoreViewItemContainer> */}
          </MoreViewModalContainer>
        )}
        {isVisibleOtherMoreViewModal && (
          <MoreViewModalContainer style={styles.moreViewModalShadow}>
            <TouchableWithoutFeedback onPress={() => clickAccuseReview()}>
              <MoreViewItemContainer>
                <MoreViewItemLabelText>{'신고'}</MoreViewItemLabelText>
              </MoreViewItemContainer>
            </TouchableWithoutFeedback>
            {/* <MoreViewItemContainer style={{borderBottomWidth: 0}}>
              <MoreViewItemLabelText>{'공유'}</MoreViewItemLabelText>
            </MoreViewItemContainer> */}
          </MoreViewModalContainer>
        )}
        <ActionSheet
          ref={ownCommentActionSheetRef}
          options={['닫기', '삭제하기']}
          cancelButtonIndex={0}
          onPress={(index: any) => onPressOwnCommentActionSheet(index)}
        />
        <ActionSheet
          ref={otherCommentActionSheetRef}
          options={['닫기', '신고하기']}
          cancelButtonIndex={0}
          onPress={(index: any) => onPressOtherCommentActionSheet(index)}
        />
      </Container>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  moreViewModalShadow: {
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 5,
    shadowOpacity: 0.1,
  },
});

export default ReviewDetailScreen;

const TEST_REVIEW_DETAIL_DATA = {
  reviewBody: {
    id: 96,
    starRate_cost: 4.5,
    starRate_treatment: 4,
    starRate_service: 4,
    certifiedBill: false,
    hits: 0,
    treatmentDate: '2021-01-18',
    totalCost: 5000,
    createdAt: '2021-01-18T06:53:38.000Z',
    updatedAt: '2021-01-18T06:53:38.000Z',
    deletedAt: null,
    userId: 'b788c700-53c1-11eb-9b16-f3588bcc5518',
    dentalClinicId: 12940,
    'createdDiff(second)': 92488,
    reviewCommentsNum: 10,
    user: {
      nickname: 'TEST1610337687498',
      profileImg:
        'https://lh4.googleusercontent.com/-kw57sImI58s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnxW3c4REx4hKLoQSLZsq2f3ELP0g/s120/photo.jpg',
    },
    dental_clinic: {
      name: '아가페치과의원(광주북구-매곡동)',
      address: '광주광역시 북구 서하로 119 2층 (매곡동, 우리빌딩)',
      originalName: '아가페치과의원',
    },
    review_contents: [
      {
        id: 340,
        img_url:
          'https://s3-ap-northeast-2.amazonaws.com/chikachika-review-images/original%2F16109528174092A14055F-D29C-497F-AADD-C08D3F9CA89F.JPG',
        img_name: null,
        mime_type: null,
        img_size: 552792,
        description: null,
        index: 1,
        img_before_after: 'before',
        img_width: null,
        img_height: null,
        createdAt: '2021-01-18T06:53:38.000Z',
        updatedAt: '2021-01-18T06:53:38.000Z',
        deletedAt: null,
        reviewId: 96,
      },
      {
        id: 341,
        img_url:
          'https://s3-ap-northeast-2.amazonaws.com/chikachika-review-images/original%2F161095281746696CD431D-0715-45E8-B6A9-E102684382FA.JPG',
        img_name: null,
        mime_type: null,
        img_size: 794234,
        description: null,
        index: 2,
        img_before_after: 'before',
        img_width: null,
        img_height: null,
        createdAt: '2021-01-18T06:53:38.000Z',
        updatedAt: '2021-01-18T06:53:38.000Z',
        deletedAt: null,
        reviewId: 96,
      },
    ],
    TreatmentItems: [
      {
        id: 1,
        name: '충치',
        review_treatment_item: {
          cost: null,
          index: 1,
        },
      },
    ],
  },
  reviewViewerNum: 1,
  reviewComments: [
    {
      id: 194,
      description: 'ㅋㅋㅋㅋ',
      createdAt: '2021-01-18T06:53:51.000Z',
      updatedAt: '2021-01-18T06:53:51.000Z',
      userId: 'b788c700-53c1-11eb-9b16-f3588bcc5518',
      'createdDiff(second)': 92475,
      user: {
        id: 'b788c700-53c1-11eb-9b16-f3588bcc5518',
        nickname: 'TEST1610337687498',
        profileImg:
          'https://lh4.googleusercontent.com/-kw57sImI58s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnxW3c4REx4hKLoQSLZsq2f3ELP0g/s120/photo.jpg',
      },
      Replys: [
        {
          id: 195,
          description: '답글',
          createdAt: '2021-01-18T06:54:06.000Z',
          updatedAt: '2021-01-18T06:54:06.000Z',
          userId: 'b788c700-53c1-11eb-9b16-f3588bcc5518',
          'createdDiff(second)': 92475,
          user: {
            id: 'b788c700-53c1-11eb-9b16-f3588bcc5518',
            nickname: 'TEST1610337687498',
            profileImg:
              'https://lh4.googleusercontent.com/-kw57sImI58s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnxW3c4REx4hKLoQSLZsq2f3ELP0g/s120/photo.jpg',
          },
          Review_reply: {
            targetUserId: 'b788c700-53c1-11eb-9b16-f3588bcc5518',
            createdAt: '2021-01-18T06:54:06.000Z',
            updatedAt: '2021-01-18T06:54:06.000Z',
            commentId: 194,
            ReplyId: 195,
          },
        },
        {
          id: 204,
          description: 'ㅋㅋㅋㅋㅋㅋ',
          createdAt: '2021-01-18T10:49:56.000Z',
          updatedAt: '2021-01-18T10:49:56.000Z',
          userId: '14458000-50d4-11eb-8e1a-356dcefef8e2',
          'createdDiff(second)': 92475,
          user: {
            id: '14458000-50d4-11eb-8e1a-356dcefef8e2',
            nickname: 'TEST1610015727051',
            profileImg:
              'https://s3-ap-northeast-2.amazonaws.com/chikachika-review-images/original%2F1610443721792ED7AC36B-A150-4C38-BB8C-B6D696F4F2ED.JPG',
          },
          Review_reply: {
            targetUserId: 'b788c700-53c1-11eb-9b16-f3588bcc5518',
            createdAt: '2021-01-18T10:49:56.000Z',
            updatedAt: '2021-01-18T10:49:56.000Z',
            commentId: 194,
            ReplyId: 204,
          },
        },
        {
          id: 217,
          description: 'asdadasdasda',
          createdAt: '2021-01-18T13:00:23.000Z',
          updatedAt: '2021-01-18T13:00:23.000Z',
          userId: '14458000-50d4-11eb-8e1a-356dcefef8e2',
          'createdDiff(second)': 92475,
          user: {
            id: '14458000-50d4-11eb-8e1a-356dcefef8e2',
            nickname: 'TEST1610015727051',
            profileImg:
              'https://s3-ap-northeast-2.amazonaws.com/chikachika-review-images/original%2F1610443721792ED7AC36B-A150-4C38-BB8C-B6D696F4F2ED.JPG',
          },
          Review_reply: {
            targetUserId: 'b788c700-53c1-11eb-9b16-f3588bcc5518',
            createdAt: '2021-01-18T13:00:23.000Z',
            updatedAt: '2021-01-18T13:00:23.000Z',
            commentId: 194,
            ReplyId: 217,
          },
        },
        {
          id: 221,
          description: 'ekqrmf답글',
          createdAt: '2021-01-18T13:23:07.000Z',
          updatedAt: '2021-01-18T13:23:07.000Z',
          userId: '14458000-50d4-11eb-8e1a-356dcefef8e2',
          'createdDiff(second)': 92475,
          user: {
            id: '14458000-50d4-11eb-8e1a-356dcefef8e2',
            nickname: 'TEST1610015727051',
            profileImg:
              'https://s3-ap-northeast-2.amazonaws.com/chikachika-review-images/original%2F1610443721792ED7AC36B-A150-4C38-BB8C-B6D696F4F2ED.JPG',
          },
          Review_reply: {
            targetUserId: 'b788c700-53c1-11eb-9b16-f3588bcc5518',
            createdAt: '2021-01-18T13:23:07.000Z',
            updatedAt: '2021-01-18T13:23:07.000Z',
            commentId: 194,
            ReplyId: 221,
          },
        },
        {
          id: 222,
          description: 'ㅋㅋㅋ',
          createdAt: '2021-01-18T13:23:12.000Z',
          updatedAt: '2021-01-18T13:23:12.000Z',
          userId: '14458000-50d4-11eb-8e1a-356dcefef8e2',
          'createdDiff(second)': 92475,
          user: {
            id: '14458000-50d4-11eb-8e1a-356dcefef8e2',
            nickname: 'TEST1610015727051',
            profileImg:
              'https://s3-ap-northeast-2.amazonaws.com/chikachika-review-images/original%2F1610443721792ED7AC36B-A150-4C38-BB8C-B6D696F4F2ED.JPG',
          },
          Review_reply: {
            targetUserId: '14458000-50d4-11eb-8e1a-356dcefef8e2',
            createdAt: '2021-01-18T13:23:12.000Z',
            updatedAt: '2021-01-18T13:23:12.000Z',
            commentId: 194,
            ReplyId: 222,
          },
        },
        {
          id: 237,
          description: 'ddddddd',
          createdAt: '2021-01-19T02:05:37.000Z',
          updatedAt: '2021-01-19T02:05:37.000Z',
          userId: '14458000-50d4-11eb-8e1a-356dcefef8e2',
          'createdDiff(second)': 92475,
          user: {
            id: '14458000-50d4-11eb-8e1a-356dcefef8e2',
            nickname: 'TEST1610015727051',
            profileImg:
              'https://s3-ap-northeast-2.amazonaws.com/chikachika-review-images/original%2F1610443721792ED7AC36B-A150-4C38-BB8C-B6D696F4F2ED.JPG',
          },
          Review_reply: {
            targetUserId: '14458000-50d4-11eb-8e1a-356dcefef8e2',
            createdAt: '2021-01-19T02:05:37.000Z',
            updatedAt: '2021-01-19T02:05:37.000Z',
            commentId: 194,
            ReplyId: 237,
          },
        },
        {
          id: 238,
          description: 'dddddddd',
          createdAt: '2021-01-19T02:09:02.000Z',
          updatedAt: '2021-01-19T02:09:02.000Z',
          userId: '14458000-50d4-11eb-8e1a-356dcefef8e2',
          'createdDiff(second)': 92475,
          user: {
            id: '14458000-50d4-11eb-8e1a-356dcefef8e2',
            nickname: 'TEST1610015727051',
            profileImg:
              'https://s3-ap-northeast-2.amazonaws.com/chikachika-review-images/original%2F1610443721792ED7AC36B-A150-4C38-BB8C-B6D696F4F2ED.JPG',
          },
          Review_reply: {
            targetUserId: '14458000-50d4-11eb-8e1a-356dcefef8e2',
            createdAt: '2021-01-19T02:09:02.000Z',
            updatedAt: '2021-01-19T02:09:02.000Z',
            commentId: 194,
            ReplyId: 238,
          },
        },
        {
          id: 239,
          description: '우앙',
          createdAt: '2021-01-19T02:25:52.000Z',
          updatedAt: '2021-01-19T02:25:52.000Z',
          userId: '14458000-50d4-11eb-8e1a-356dcefef8e2',
          'createdDiff(second)': 92475,
          user: {
            id: '14458000-50d4-11eb-8e1a-356dcefef8e2',
            nickname: 'TEST1610015727051',
            profileImg:
              'https://s3-ap-northeast-2.amazonaws.com/chikachika-review-images/original%2F1610443721792ED7AC36B-A150-4C38-BB8C-B6D696F4F2ED.JPG',
          },
          Review_reply: {
            targetUserId: '14458000-50d4-11eb-8e1a-356dcefef8e2',
            createdAt: '2021-01-19T02:25:52.000Z',
            updatedAt: '2021-01-19T02:25:52.000Z',
            commentId: 194,
            ReplyId: 239,
          },
        },
        {
          id: 240,
          description: '우앙',
          createdAt: '2021-01-19T02:26:03.000Z',
          updatedAt: '2021-01-19T02:26:03.000Z',
          userId: '14458000-50d4-11eb-8e1a-356dcefef8e2',
          'createdDiff(second)': 92475,
          user: {
            id: '14458000-50d4-11eb-8e1a-356dcefef8e2',
            nickname: 'TEST1610015727051',
            profileImg:
              'https://s3-ap-northeast-2.amazonaws.com/chikachika-review-images/original%2F1610443721792ED7AC36B-A150-4C38-BB8C-B6D696F4F2ED.JPG',
          },
          Review_reply: {
            targetUserId: '14458000-50d4-11eb-8e1a-356dcefef8e2',
            createdAt: '2021-01-19T02:26:03.000Z',
            updatedAt: '2021-01-19T02:26:03.000Z',
            commentId: 194,
            ReplyId: 240,
          },
        },
      ],
    },
  ],
  reviewLikeNum: 0,
  viewerLikeReview: false,
  viewerScrapReview: false,
};
