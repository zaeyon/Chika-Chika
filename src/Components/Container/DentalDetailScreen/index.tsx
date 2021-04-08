import React, {useState, useEffect, useRef, useCallback} from 'react';
import Styled from 'styled-components/native';
import SafeAreaView from 'react-native-safe-area-view';
import {
  TouchableWithoutFeedback,
  FlatList,
  ScrollView,
  Keyboard,
  StyleSheet,
  Alert,
  View,
  ActivityIndicator,
  Linking,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import allActions from '~/actions';
import {useSelector, useDispatch} from 'react-redux';

// Local Components
import DentalCollapsibleTabView from '~/Components/Presentational/DentalDetailScreen/DentalCollapsibleTabView';
import DentalBottomBar from '~/Components/Presentational/DentalDetailScreen/DentalBottomBar';
import ToastMessage from '~/Components/Presentational/ToastMessage';

import callDentalPhoneNumber from '~/method/callDentalPhoneNumber';

// Routes
import GETDentalDetail from '~/Routes/Dental/GETDentalDetail';
import POSTDentalScrap from '~/Routes/Dental/POSTDentalScrap';
import DELETEDentalScrap from '~/Routes/Dental/DELETEDentalScrap';
import GETCurUserScrap from '~/Routes/Dental/GETCurUserScrap';
import GETDentalReview from '~/Routes/Dental/GETDentalReview';
import GETUserSavedHospitals from '~/Routes/User/GETUserSavedHospitals';
import GETUserReservations from '~/Routes/User/GETUserReservations';

const Container = Styled.View`
 flex: 1;
`;

const DentalTabContainer = Styled.View`
background-color: #F5F7F9;
 flex: 1;
`;

const IndicatorContainer = Styled.View`
flex: 1;
background-color: #ffffff;
align-items: center;
justify-content: center;
`;

interface Props {
  navigation: any;
  route: any;
}


const DentalDetailScreen = ({navigation, route}: Props) => {
  const offset = 0;
  const limit = 10;
  const [dentalDetailInfo, setDentalDetailInfo] = useState<any>();
  const [dentalImageArray, setDentalImageArray] = useState<Array<any>>([]);
  const [loadingGetDentalDetail, setLoadingGetDentalDetail] = useState<boolean>(
    true,
  );
  const [isNoDentalImage, setIsNoDentalImage] = useState<boolean>(false);
  const [isCurUserScrap, setIsCurUserScrap] = useState<boolean>(false);

  const jwtToken = useSelector((state: any) => state.currentUser.jwtToken);
  const dentalReviewArray = useSelector((state: any) => state.reviewList.dentalReviewArray);
  const dentalId = route.params?.dentalId;

  const dispatch = useDispatch();


  useEffect(() => {
    if (route.params?.dentalId) {
      getDentalDetail();
      getCurUserScrap();
      getDentalReview();
    }

    return () => {
      dispatch(allActions.reviewListActions.setDentalReviewArray([]));
    }
  }, []);

  useEffect(() => {
    if (route.params?.infoEditRequest) {
      ToastMessage.show('수정 요청이 완료되었습니다:)');
      navigation.setParams({infoEditRequest: false});
    }
  }, [route.params?.infoEditRequest]);

  useEffect(() => {
    if(route.params?.isRefreshReview) {
      ToastMessage.show('해당병원에 리뷰가 작성되었습니다!');
      navigation.setParams({isRefreshReview: false});
      getDentalReview();
    }
  }, [route.params?.isRefreshReview])

  const getDentalDetail = () => {
    GETDentalDetail({jwtToken, dentalId})
      .then((response: any) => {
        console.log('GETDentalDetail response', response);
        console.log(
          'GETDentalDetail response.clinicInfoHeader.clinicProfileImg',
          response.clinicInfoHeader.clinicProfileImg,
        );
        console.log(
          'GETDentalDetail response.clinicInfoHeader.clinicReviewImg',
          response.clinicInfoHeader.clinicReviewImg,
        );
        if (response.clinicInfoHeader.clinicProfileImg.length > 0) {
          const tmpDentalImageArray = response.clinicInfoHeader.clinicProfileImg;
          setDentalImageArray(tmpDentalImageArray);
        } else {
          setIsNoDentalImage(true);
          const tmpDentalImageArray = [
            {
              createdAt: '2021-02-15 13:41:17',
              img_height: 4032,
              img_url: '',
              img_width: 3024,
              index: 1,
            },
          ];

          setDentalImageArray(tmpDentalImageArray);
        }
        setDentalDetailInfo(response);
        console.log(response)
        setLoadingGetDentalDetail(false);
      })
      .catch((error) => {
        console.log('GETDentalDetail error', error);
        setLoadingGetDentalDetail(false);
      });
  };

  const getCurUserScrap = () => {
    GETCurUserScrap({jwtToken, dentalId})
      .then((response: any) => {
        console.log('GETCurUserScrap response', response);
        setIsCurUserScrap(response.scraped);
      })
      .catch((error) => {
        console.log('GETCurUserScrap error', error);
      });
  };

  const getDentalReview = () => {
    GETDentalReview({jwtToken, dentalId, offset, limit})
      .then((response: any) => {
        console.log('GETDentalReview response', response);
        dispatch(allActions.reviewListActions.setDentalReviewArray(response));
      })
      .catch((error) => {
        console.log('GETDentalReview error', error);
      });
  };

  const postDentalScrap = () => {
    setIsCurUserScrap(true);
    POSTDentalScrap({jwtToken, dentalId})
      .then((response) => {
        GETUserSavedHospitals({jwtToken}).then((response: any) => {
          dispatch(allActions.userActions.setSavedHospitals(response));
        });
      })
      .catch((error) => {
        console.log('POSTDentalScrap error', error);
      });
  };

  const deleteDentalScrap = () => {
    setIsCurUserScrap(false);
    DELETEDentalScrap({jwtToken, dentalId})
      .then((response) => {
        console.log('DELETEDentalScrap response', response);
      })
      .catch((error) => {
        console.log('DELETEDentalScrap error', error);
      });
  };

  const moveToDentalInfoEdit = () => {
    const dentalObj = {
      id: dentalId,
      name: dentalDetailInfo.clinicInfoHeader.name,
      originalName: dentalDetailInfo.clinicInfoHeader.originalName,
      address: dentalDetailInfo.clinicInfoHeader.address,
    }
    navigation.navigate('DentalInfoEditRequestScreen', {
      dentalObj: dentalObj,
    });
  };

  const moveToReviewUpload = () => {
    const dentalObj = {
      address: dentalDetailInfo.clinicInfoHeader.address,
      id: dentalId,
      local: dentalDetailInfo.clinicInfoHeader.address,
      name: dentalDetailInfo.clinicInfoHeader.name,
      originalName: dentalDetailInfo.clinicInfoHeader.originalName,
    };

    navigation.navigate('BraceReviewUploadStackScreen', {
      screen: 'BraceReviewMetaDataScreen',
      params: {
        dentalObj: dentalObj,
        requestScreen: 'DentalDetailScreen',
        requestType: 'post',
      },
    });
  };

  const moveToDentalLocationMap = () => {
    navigation.navigate('DentalLocationMapScreen', {
      dentalObj: {
        address: dentalDetailInfo.clinicInfoHeader.address,
        id: dentalId,
        local: dentalDetailInfo.clinicInfoHeader.address,
        name: dentalDetailInfo.clinicInfoHeader.name,
        originalName: dentalDetailInfo.clinicInfoHeader.originalName,
      },
      coordinate: {
        latitude: parseFloat(dentalDetailInfo.clinicInfoHeader.geographLat),
        longitude: parseFloat(dentalDetailInfo.clinicInfoHeader.geographLong),
      },
    });
  };

  const clickDentalCallReservation = () => {
    callDentalPhoneNumber(
      dentalDetailInfo.clinicInfoHeader.telNumber,
      jwtToken,
      dentalId,
      () => {
        GETUserReservations({jwtToken}).then((response: any) => {
          dispatch(allActions.userActions.setReservations(response));
        });
      },
    );
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

    navigation.push('ReviewStackScreen', {
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
        requestScreen: 'DentalDetailScreen',
      },
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

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <Container>
      {!loadingGetDentalDetail && (
        <DentalTabContainer>
          <DentalCollapsibleTabView
            isNoDentalImage={isNoDentalImage}
            navigation={navigation}
            dentalImageArray={dentalImageArray}
            moveToReviewDetail={moveToReviewDetail}
            moveToAnotherProfile={moveToAnotherProfile}
            moveToDentalLocationMap={moveToDentalLocationMap}
            moveToDentalInfoEdit={moveToDentalInfoEdit}
            moveToReviewUpload={moveToReviewUpload}
            dentalDetailInfo={dentalDetailInfo}
            dentalReviewArray={dentalReviewArray}
            goBack={goBack}
          />
          <DentalBottomBar
            clickDentalCallReservation={clickDentalCallReservation}
            isCurUserScrap={isCurUserScrap}
            postDentalScrap={postDentalScrap}
            deleteDentalScrap={deleteDentalScrap}
          />
        </DentalTabContainer>
      )}
      {loadingGetDentalDetail && (
        <IndicatorContainer>
          <ActivityIndicator />
        </IndicatorContainer>
      )}
    </Container>
  );
};


export default DentalDetailScreen;