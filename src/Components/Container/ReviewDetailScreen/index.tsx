import React, {useState, useEffect, useRef, createRef} from 'react';
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
import { getStatusBarHeight } from 'react-native-status-bar-height';

// Local Component
import ReviewInformation from '~/Components/Presentational/ReviewDetailScreen/ReviewInformation';
import ReviewContent from '~/Components/Presentational/ReviewDetailScreen/ReviewContent';
import ReviewPreviewCommentList from '~/Components/Presentational/ReviewDetailScreen/ReviewPreviewCommentList';
import ReviewBottomBar from '~/Components/Presentational/ReviewDetailScreen/ReviewBottomBar';
import DentalInfomation from '~/Components/Presentational/ReviewDetailScreen/DentalInfomation';
import DetailMetaInfo from '~/Components/Presentational/ReviewDetailScreen/DetailMetaInfo';
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


const Container = Styled.SafeAreaView`
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

const DentalInfoContainer = Styled.View`
`;

const CommentListContainer = Styled.View`
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
font-family: NanumSquare;
font-size: 16px;
font-weight: 700;
color: #000000;
`;

const WriterInfoContainer = Styled.View`
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

let selectedCommentId: number;
let startTime: any;
let endTime: any;

const ReviewDetailScreen = ({navigation, route}: Props) => {
  const [paragraphArray, setParagraphArray] = useState<Array<any>>([]);
  const [dentalInfo, setDentalInfo] = useState<DentalObj>(
    route.params?.dentalObj,
  );

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

  const [loadingReviewDetail, setLoadingReviewDetail] = useState<boolean>(
    false,
  );
  const [loadingCommentPost, setLoadingCommentPost] = useState<boolean>(false);
  const [refreshingReviewDetail, setRefreshingReviewDetail] = useState<boolean>(
    false,
  );

  const [treatmentDate, setTreatmentDate] = useState<any>({});
  const [treatmentList, setTreatmentList] = useState<Array<object>>([]);
  const [rating, setRating] = useState<RatingObj>(route.params?.ratingObj);
  const [totalPrice, setTotalPrice] = useState<object>({});
  const [detailPriceList, setDetailPriceList] = useState<Array<object>>([]);

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
  const [elapsedTime, setElapsedTime] = useState<string>(route.params?.elapsedTime);
  const [isVisibleOwnMoreViewModal, setIsVisibleOwnMoreViewModal] = useState<boolean>(false);
  const [isVisibleOtherMoreViewModal, setIsVisibleOtherMoreViewModal] = useState<boolean>(false);

  const [isCertifiedReceipt, setIsCertifiedReceipt] = useState<boolean>(false);
  const [changeCommentArray, setChangeCommentArray] = useState<boolean>(false);

  const scrollViewRef = useRef<any>();
  const reviewScrollViewRef = useRef<any>(null);


  const ownCommentActionSheetRef = createRef<any>();
  const otherCommentActionSheetRef = createRef<any>();

  const dispatch = useDispatch();
  const currentUser = useSelector((state: any) => state.currentUser);
  const reviewList = useSelector((state: any) => state.reviewList);

  const commentState = useSelector((state: any) => state.commentList);
  const commentArray = commentState.commentList;
  const commentCount = commentState.commentCount;

  const jwtToken = currentUser.jwtToken;
  const userProfile = currentUser.profile;

  const reviewId = route.params?.reviewId;
  const writerObj = route.params?.writer;

  const createdDate = route.params?.createdAt;
  const isVisibleElapsedTime = route.params?.visibleElapsedTime;
  const imageArray = route.params?.imageArray;
  const isOwnReview = route.params?.writer.userId === userProfile.id;

  console.log('route.params?.reviewId', route.params?.reviewId);
  console.log('route.params?.imageArray', route.params?.imageArray);
  console.log('route.params?.writer', route.params?.writer);
  console.log('route.params?.writer.userId', route.params?.writer.userId);
  console.log('userProfile.id', userProfile.id);
  console.log('route.params?.ratingObj', route.params?.ratingObj);
  console.log('route.params?.dentalObj', route.params?.dentalObj);
  console.log('route.params?.treatmentDate', route.params.treatmentDate);
  console.log("route.params?.elapsedTime", route.params?.elapsedTime);

  useEffect(() => {
    startTime = new Date();
    setLoadingReviewDetail(true);
    getReviewDetail();
    getReviewCommentList();
  }, []);

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
      console.log(
        'route.params?.revisedParagraphArray',
        route.params.paragraphArray,
      );
      console.log("리뷰 수정 route.params.dentalObj", route.params.dentalObj);
      console.log("리뷰 수정 route.params?.treatmentDateObj", route.params.treatmentDateObj);
      console.log("수정전 treatmentDate", treatmentDate);

      const tmpTreatmentDate = new Date(route.params?.treatmentDateObj.treatDate);
      const splitedTreatmentDate = route.params?.treatmentDateObj.displayTreatDate.split(
          '-',
      );

      const tmpDisplayTreatDate =
          splitedTreatmentDate[0] +
          '.' +
          splitedTreatmentDate[1] +
          '.' +
          splitedTreatmentDate[2];

      const treatmentObj = {
          displayTreatDate: tmpDisplayTreatDate,
          treatDate: tmpTreatmentDate,
      };

      const tmpTreatPriceObj = {
        displayTreatPrice: (route.params.totalPrice).toLocaleString() + "원",
        treatPrice: route.params.totalPrice
      }

      setParagraphArrayDisplay(route.params.paragraphArray);
      setTreatmentArrayDisplay(route.params.treatmentArray);
      setTreatmentDate(treatmentObj);
      setRating(route.params.ratingObj);
      setDentalInfo(route.params.dentalObj);
      setTotalPrice(tmpTreatPriceObj);
    }
  }, [
    route.params?.isrRevised,
    route.params?.paragraphArray,
    route.params?.treatmentArray,
    route.params?.ratingObj,
    route.params?.dentalObj,
  ]);

  /*
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardWillShow', _keyboardWillShow);
    Keyboard.addListener('keyboardWillHide', _keyboardWillHide);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardWillHide', _keyboardWillHide);
    };
  }, []);
  */

  const _keyboardWillShow = (e: any) => {
    setPaddingBottom(e.endCoordinates.height + hp('5%'));
  };

  const _keyboardDidShow = (e: any) => {
    //setPaddingBottom(e.endCoordinates.height);
    if (route.params?.isCancelRevise == true) {
      reviewScrollViewRef.current.scrollTo({x: 0, y: 0, animated: false});
    } else {
      reviewScrollViewRef.current.scrollToEnd({animated: true});
    }
  };

  const _keyboardWillHide = () => {
    setPaddingBottom(hp('8%'));
    setIsCommentInputFocused(false);
    setTimeout(() => {
      if (route.params?.isCancelRevise == true) {
        reviewScrollViewRef.current.scrollTo({x: 0, y: 0, animated: false});
      } else {
        reviewScrollViewRef.current.scrollToEnd({animated: true});
      }
    }, 0);
  };



  const getReviewDetail = () => {
    GETReviewDetail(jwtToken, reviewId)
      .then((response: any) => {
        console.log('GETReviewDetail response', response);
        console.log(
          'GETReviewDetail response.reviewBody.TreatmentItems',
          response.reviewBody.TreatmentItems,
        );
        console.log(
          'GETReviewDetail response.reviewBody.review_contents',
          response.reviewBody.review_contents,
        );

        const tmpTreatPriceObj = {
          displayTreatPrice: (response.reviewBody.totalCost).toLocaleString() + "원",
          treatPrice: response.reviewBody.totalCost
        }

        setTotalPrice(tmpTreatPriceObj);
        setLoadingReviewDetail(false);
        setIsCertifiedReceipt(response.reviewBody.certifiedBill);
        setRefreshingReviewDetail(false);
        endTime = new Date();
        console.log("경과 시간", endTime - startTime);

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

          const treatmentObj = {
            displayTreatDate: tmpDisplayTreatDate,
            treatDate: tmpTreatmentDate,
          };

        // 현재 사용자의 리뷰일때 리뷰 수정용 데이터 변환 작업
        if (isOwnReview) {
          const tmpTreatmentList = response.reviewBody.TreatmentItems.map(
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
            setTreatmentList(tmpTreatmentList);
            //setRating(tmpRating);
          }, 10);
        }

        const tmpParagraphArray = response.reviewBody.review_contents.map(
          (item: any, index: number) => {
            let paraObj = new Object();

            if (item.img_url) {
              paraObj = {
                id: item.id,
                index: item.index,
                image: {
                  uri: item.img_url,
                  name: item.img_name,
                  size: item.img_size,
                  mimeType: item.mime_type,
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
        };

        if (response.viewerLikeReview) {
          setIsCurUserLike(true);
        } else {
          setIsCurUserLike(false);
        }

        //setWriterInfo(userObj)
        setTreatmentDate(treatmentObj);
        setLikeCount(response.reviewLikeNum);
        setViewCount(response.reviewViewerNum);
        setParagraphArray(tmpParagraphArray);
        setParagraphArrayDisplay(response.reviewBody.review_contents);
        setDentalInfo(dentalObj);

      })
      .catch((error) => {
        console.log('GETReviewDetail error', error);
        setLoadingReviewDetail(false);
      });
  };

  const getReviewCommentList = () => {
      const id = reviewId;
      const type = 'review'
      GETCommentList({jwtToken, type, id})
      .then((response: any) => {
          console.log("GETCommentList response", response)
          //setCommentArray(response.reverse())
          dispatch(allActions.commentListActions.setCommentList(response.comments.reverse()));
          dispatch(allActions.commentListActions.setCommentCount(response.commentsNum.commentsNum));
      })
      .catch((error: any) => {
          console.log("GETCommentList error", error);
      })
  }

  const moveToFullImages = (imageUri: string) => {
    console.log('moveToFullImages imageArray', imageArray);

    if(isVisibleOtherMoreViewModal) {
      setIsVisibleOtherMoreViewModal(false);
    } else if(isVisibleOwnMoreViewModal) {
      setIsVisibleOwnMoreViewModal(false); 
    } else {
      var index = imageArray.findIndex(
        (image: any) => image.img_url === imageUri,
      );
  
      var tmpImageArray = imageArray.map((image: any) => {
        return image.img_url;
      });
  
      console.log('선택한 사진의 mediaFiles index', index);
  
      navigation.navigate('FullImagesScreen', {
        imageArray: tmpImageArray,
        imageIndex: index,
      });
    }

  };

  const moveToDentalDetail = (dentalId: number) => {
    navigation.navigate('DentalClinicStack', {
      screen: 'DentalDetailScreen',
      params: {
        dentalId: dentalInfo.id,
      }
    })
  }

  const moveToCommentList = (request: string) => {
    navigation.navigate("ReviewCommentListScreen", {
      reviewId: reviewId,
    });
  }

  const goBack = () => {
    navigation.goBack();
  };

  const clickMoreView = () => {
    if(isOwnReview) {
      console.log("clickMoreView isOwnReview", isOwnReview);
      setIsVisibleOwnMoreViewModal(!isVisibleOwnMoreViewModal);
    } else {
      console.log("clickMoreView isOwnReview", isOwnReview);
      setIsVisibleOtherMoreViewModal(!isVisibleOtherMoreViewModal);
    }
  }

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
    console.log('dentalInfo', dentalInfo);
    const submitParagraphArray = paragraphArray;

    navigation.navigate('ReviewUploadStack', {
      screen: 'ContentPostScreen',
      params: {
        requestType: 'revise',
        paragraphArray: submitParagraphArray,
        dentalClinic: {
          name: dentalInfo.name,
          address: dentalInfo.address,
          id: dentalInfo.id,
        },
        treatDate: {
          displayTreatDate: treatmentDate.displayTreatDate,
          treatDate: treatmentDate.treatDate,
        },
        selectedTreatList: treatmentList,
        rating: {
          avgRating: rating.avgRating,
          priceRating: rating.priceRating,
          serviceRating: rating.serviceRating,
          treatRating: rating.treatRating,
        },
        detailPriceList: detailPriceList,
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

        dispatch(allActions.reviewListActions.setMainReviewList(tmpReviewList));
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
        console.log("DELETEComment response", response);
        dispatch(allActions.commentListActions.setCommentList(response.comments.reverse()));
        dispatch(allActions.commentListActions.setCommentCount(response.commentsNum.commentsNum)); 
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

    if (userId === userProfile.id) {
        ownCommentActionSheetRef.current.show();
    } else {
        otherCommentActionSheetRef.current.show();
    }
};

const onPressOwnCommentActionSheet = (index: number) => {
  if (index === 1) {
    deleteReviewComment();
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

      navigation.navigate("ReplyPostScreen", {
          commentObj: commentObj,
          targetUserNickname: targetUserNickname,
          reviewId: reviewId,
          request: "ReviewDetailScreen",
      });
  };

  const clickReplyOfReply = (commentObj: any, targetUserNickname: string) => {
    navigation.navigate("ReplyPostScreen", {
      commentObj: commentObj,
      targetUserNickname: targetUserNickname,
      reviewId: reviewId,
      request: "ReviewDetailScreen",
    })
  }

  const pressBackground = () => {
    if(isOwnReview) {
      if(isVisibleOwnMoreViewModal) {
        setIsVisibleOwnMoreViewModal(false)
      }
    } else {
      if(isVisibleOtherMoreViewModal) {
        setIsVisibleOtherMoreViewModal(false);
      }
    }
  }



  return (
    <TouchableWithoutFeedback onPress={() => pressBackground()}>
    <Container>
      {/*
      <HeaderBar>
        <TouchableWithoutFeedback onPress={() => goBack()}>
          <HeaderLeftContainer>
            <HeaderBackIcon
              source={require('~/Assets/Images/HeaderBar/ic_back.png')}
            />
          </HeaderLeftContainer>
        </TouchableWithoutFeedback>
        <HeaderTitleContainer>
          <NicknameText>{writerInfo.nickname}</NicknameText>
        </HeaderTitleContainer>
        <HeaderRightContainer>
          <HeaderEmptyView />
          {isOwnReview && (
            <View
              style={{position: 'absolute', flexDirection: 'row', right: 10}}>
              <TouchableWithoutFeedback onPress={() => clickReviseReview()}>
                <HeaderTitleText>{'수정'}</HeaderTitleText>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => clickDeleteReview()}>
                <HeaderTitleText style={{marginLeft: 5}}>
                  {'삭제'}
                </HeaderTitleText>
              </TouchableWithoutFeedback>
            </View>
          )}
        </HeaderRightContainer>
      </HeaderBar>
      */}
      <NavigationHeader
      headerLeftProps={{type: "arrow", onPress: goBack, text: "리얼리뷰"}}
      headerRightProps={{type: "viewMore", onPress: clickMoreView}}
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
        <WriterInfoContainer>
        <WriterInfo
        writerObj={writerObj}
        elapsedTime={elapsedTime}
        isVisibleElapsedTime={isVisibleElapsedTime}
        createdDate={createdDate}/>
        </WriterInfoContainer>
        <TreatmentListContainer>
        <TreatmentList
        treatmentArray={treatmentArrayDisplay}
        />
        </TreatmentListContainer>
        {!loadingReviewDetail && (
          <BodyContainer style={{paddingBottom: paddingBottom}}>
            <ReviewContentContainer>
            <ReviewContent
              moveToFullImages={moveToFullImages}
              paragraphArray={paragraphArrayDisplay}
            />
            </ReviewContentContainer>
            <MetaInfoContainer>
              <ReviewMetaInfo
              dentalObj={dentalInfo}
              moveToDentalDetail={moveToDentalDetail}
              certifiedReceipt={isCertifiedReceipt}
              totalPrice={totalPrice.displayTreatPrice}
              ratingObj={rating}
              treatmentDate={treatmentDate.displayTreatDate}/>
            </MetaInfoContainer>
            <CommentListContainer>
              <ReviewPreviewCommentList
                moveToCommentList={moveToCommentList}
                clickReply={clickReply}
                clickReplyOfReply={clickReplyOfReply}
                openCommentActionSheet={openCommentActionSheet}
                commentList={commentArray}
                commentCount={commentCount}
              />
            </CommentListContainer>
          </BodyContainer>
        )}
        {loadingReviewDetail && (
          <IndicatorContainer>
            <ActivityIndicator/>
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
          />
        </BottomBarContainer>
      </KeyboardAvoidingView>
      {loadingCommentPost && (
        <TransIndicatorContainer>
          <ActivityIndicator color={'#ffffff'} />
        </TransIndicatorContainer>
      )}
      {isVisibleOwnMoreViewModal && (
        <MoreViewModalContainer
        style={styles.moreViewModalShadow}>
          <TouchableWithoutFeedback onPress={() => clickReviseReview()}>
          <MoreViewItemContainer>
            <MoreViewItemLabelText>{"수정"}</MoreViewItemLabelText>
          </MoreViewItemContainer>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => clickDeleteReview()}>
          <MoreViewItemContainer>
            <MoreViewItemLabelText>{"삭제"}</MoreViewItemLabelText>
          </MoreViewItemContainer>
          </TouchableWithoutFeedback>
          <MoreViewItemContainer>
            <MoreViewItemLabelText>{"신고"}</MoreViewItemLabelText>
          </MoreViewItemContainer>
          <MoreViewItemContainer style={{borderBottomWidth: 0}}>
            <MoreViewItemLabelText>{"공유"}</MoreViewItemLabelText>
          </MoreViewItemContainer>
        </MoreViewModalContainer>
      )}
      {isVisibleOtherMoreViewModal && (
        <MoreViewModalContainer
        style={styles.moreViewModalShadow}>
          <MoreViewItemContainer>
            <MoreViewItemLabelText>{"신고"}</MoreViewItemLabelText>
          </MoreViewItemContainer>
          <MoreViewItemContainer style={{borderBottomWidth: 0}}>
            <MoreViewItemLabelText>{"공유"}</MoreViewItemLabelText>
          </MoreViewItemContainer>
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
  }
})

export default ReviewDetailScreen;


