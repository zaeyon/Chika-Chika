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
import CallDetectorManager from 'react-native-call-detection';

// Local Components
import DentalCollapsibleTabView from '~/Components/Presentational/DentalDetailScreen/DentalCollapsibleTabView';
import DentalBottomBar from '~/Components/Presentational/DentalDetailScreen/DentalBottomBar';
import ReviewItem from '~/Components/Presentational/ReviewItem';
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

let dentalObj: object;
let offset = 0;
let limit = 10;

const DentalDetailScreen = ({navigation, route}: Props) => {
  console.log('DentalDetailScreen dentalId', route.params?.dentalId);
  const [dentalDetailInfo, setDentalDetailInfo] = useState<any>();
  const [dentalReviewArray, setDentalReviewArray] = useState<Array<any>>([]);
  const [dentalImageArray, setDentalImageArray] = useState<Array<any>>([]);
  const [loadingGetDentalDetail, setLoadingGetDentalDetail] = useState<boolean>(
    true,
  );
  const [isNoDentalImage, setIsNoDentalImage] = useState<boolean>(false);
  const [isCurUserScrap, setIsCurUserScrap] = useState<boolean>(false);

  const jwtToken = useSelector((state: any) => state.currentUser.jwtToken);
  const dentalId = route.params?.dentalId;

  const dispatch = useDispatch();

  useEffect(() => {
    if (route.params?.dentalId) {
      getDentalDetail();
      getCurUserScrap();
      getDentalReview();
    }
  }, []);

  useEffect(() => {
    if (route.params?.infoEditRequest) {
      ToastMessage.show('수정 요청이 완료되었습니다:)');
      navigation.setParams({infoEditRequest: false});
    }
  }, [route.params?.infoEditRequest]);

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
        setLoadingGetDentalDetail(false);

        dentalObj = {
          id: route.params?.dentalId,
          name: response.clinicInfoHeader.name,
          originalName: response.clinicInfoHeader.originalName,
          address: response.clinicInfoHeader.address,
        };
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
      .then((response) => {
        console.log('GETDentalReview response', response);
        setDentalReviewArray(response);
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

    navigation.navigate('ReviewUploadStackScreen', {
      screen: 'ReviewMetaDataScreen',
      params: {
        dentalObj: dentalObj,
      },
    });
  };

  const moveToDentalLocationMap = () => {
    navigation.navigate('DentalLocationMapScreen', {
      coordinate: {
        latitude: 37.566515657875435,
        longitude: 126.9781164904998,
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

const styles = StyleSheet.create({
  certificationIconShadow: {
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowRadius: 16,
    shadowOpacity: 0.05,
  },
});

export default DentalDetailScreen;

const TEST_DENTAL_DETAIL_DATA = {
  clinicInfoHeader: {
    name: '아너스치과교정과치과의원(강서구-화곡동)',
    address:
      '서울특별시 강서구 강서로 242 3층 307호 (화곡동, 강서힐스테이트상가)',
    telNumber: '02-2602-7222',
    website: 'http://www.honorsdental.com',
    launchDate: '2014-10-14',
    reviewNum: 15,
    conclustionNow: 0,
    lunchTimeNow: 0,
    reviewAVGStarRate: 3.6,
  },
  clinicInfoBody: {
    description: '',
    treatmentTime: {
      weekday: {
        weekdayReceiptNotice: '',
        weekdayLunchTimeNotice: '',
        mon: {
          treatmentTime: ['00:00:00', '00:00:00'],
          lunchTime: ['00:00:00', '00:00:00'],
        },
        tus: {
          treatmentTime: ['00:00:00', '00:00:00'],
          lunchTime: ['00:00:00', '00:00:00'],
        },
        wed: {
          treatmentTime: ['00:00:00', '00:00:00'],
          lunchTime: ['00:00:00', '00:00:00'],
        },
        thu: {
          treatmentTime: ['00:00:00', '00:00:00'],
          lunchTime: ['00:00:00', '00:00:00'],
        },
        fri: {
          treatmentTime: ['00:00:00', '00:00:00'],
          lunchTime: ['00:00:00', '00:00:00'],
        },
      },
      sat: {
        weekendReceiptNotice: '',
        weekendLunchTimeNotice: '',
        weekend_non_consulation_notice: '',
        sat: {
          treatmentTime: ['00:00:00', '00:00:00'],
          lunchTime: ['00:00:00', '00:00:00'],
        },
      },
      sunAndHoliday: {
        weekend_non_consulation_notice: '',
        treatmentTime: [null, null],
      },
    },
    treatmentSubject: [
      {
        name: '치과교정과',
        Clinic_subject: {
          SpecialistDentist_NUM: 1,
          choiceTreatmentDentist_NUM: 0,
        },
      },
    ],
    SpecialTreatment: [
      {
        name: '측두하악관절 자극요법',
      },
      {
        name: '소아야간진료(20시 이후)',
      },
    ],
    dentistInfo: {
      specialistDentist: 1,
      generalDentist: 0,
      resident: 0,
      intern: 1,
    },
    parkingInfo: {
      parkingAllowNum: 0,
      parkingCost: '',
      parkingNotice: '',
    },
    location: {
      address:
        '서울특별시 강서구 강서로 242 3층 307호 (화곡동, 강서힐스테이트상가)',
    },
  },
};
