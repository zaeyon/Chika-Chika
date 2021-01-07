import React, {useState, useEffect, useRef} from 'react';
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
import {useSelector} from 'react-redux';

// Local Component
import DentalCollapsibleTabView from '~/Components/Presentational/DentalDetailScreen/DentalCollapsibleTabView';
import DentalBottomBar from '~/Components/Presentational/DentalDetailScreen/DentalBottomBar';
import ReviewItem from '~/Components/Presentational/ReviewItem';
import {callPhoneNumber} from '~/method/callPhoneNumber';

// Route
import GETDentalDetail from '~/Routes/Dental/GETDentalDetail';


const Container = Styled.View`
 flex: 1;
`;


const DentalTabContainer = Styled.View`
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
  console.log("DentalDetailScreen dentalId", route.params?.dentalId);
  const [dentalDetailInfo, setDentalDetailInfo] = useState<any>(TEST_DENTAL_DETAIL_DATA);
  const [loadingGetDentalDetail, setLoadingGetDentalDetail] = useState<boolean>(true);

  const currentUser = useSelector((state: any) => state.currentUser);
  const jwtToken = currentUser.jwtToken;
  const dentalId = route.params?.dentalId;

  useEffect(() => {
    if(route.params?.dentalId) {
      getDentalDetail()
    }
  }, [route.params?.dentalId])

  const getDentalDetail = () => {
    GETDentalDetail({jwtToken, dentalId})
    .then((response) => {
      console.log("GETDentalDetail response", response)
      setDentalDetailInfo(response)
      setLoadingGetDentalDetail(false);
    })
    .catch((error) => {
      console.log("GETDentalDetail error", error);
      setLoadingGetDentalDetail(false); 
    })
  }

  const moveToDentalInfoEdit = () => {
    navigation.navigate('DentalInfoEditRequestScreen');
  };

  const goBack = () => {
    navigation.goBack()
  }
    
    return (
        <Container>
          {!loadingGetDentalDetail && (
          <DentalTabContainer>
            <DentalCollapsibleTabView
            dentalDetailInfo={dentalDetailInfo}
            goBack={goBack}
            />
            <DentalBottomBar/>
          </DentalTabContainer>
          )}
          {loadingGetDentalDetail && (
          <IndicatorContainer>
            <ActivityIndicator/>
          </IndicatorContainer>
          )}
        </Container>
    )
}

const styles = StyleSheet.create({
    certificationIconShadow: {
        shadowOffset: {
            height: 0,
            width: 0,
        },
        shadowRadius: 16,
        shadowOpacity: 0.05,
        
    }
})

export default DentalDetailScreen


const TEST_DENTAL_DETAIL_DATA = {
  
  "clinicInfoHeader": {
      "name": "아너스치과교정과치과의원(강서구-화곡동)",
      "address": "서울특별시 강서구 강서로 242 3층 307호 (화곡동, 강서힐스테이트상가)",
      "telNumber": "02-2602-7222",
      "website": "http://www.honorsdental.com",
      "launchDate": "2014-10-14",
      "reviewNum": 15,
      "conclustionNow": 0,
      "lunchTimeNow": 0,
      "reviewAVGStarRate": 3.6
  },
  "clinicInfoBody": {
      "description": "",
      "treatmentTime": {
          "weekday": {
              "weekdayReceiptNotice": "",
              "weekdayLunchTimeNotice": "",
              "mon": {
                  "treatmentTime": [
                      "00:00:00",
                      "00:00:00"
                  ],
                  "lunchTime": [
                      "00:00:00",
                      "00:00:00"
                  ]
              },
              "tus": {
                  "treatmentTime": [
                      "00:00:00",
                      "00:00:00"
                  ],
                  "lunchTime": [
                      "00:00:00",
                      "00:00:00"
                  ]
              },
              "wed": {
                  "treatmentTime": [
                      "00:00:00",
                      "00:00:00"
                  ],
                  "lunchTime": [
                      "00:00:00",
                      "00:00:00"
                  ]
              },
              "thu": {
                  "treatmentTime": [
                      "00:00:00",
                      "00:00:00"
                  ],
                  "lunchTime": [
                      "00:00:00",
                      "00:00:00"
                  ]
              },
              "fri": {
                  "treatmentTime": [
                      "00:00:00",
                      "00:00:00"
                  ],
                  "lunchTime": [
                      "00:00:00",
                      "00:00:00"
                  ]
              }
          },
          "sat": {
              "weekendReceiptNotice": "",
              "weekendLunchTimeNotice": "",
              "weekend_non_consulation_notice": "",
              "sat": {
                  "treatmentTime": [
                      "00:00:00",
                      "00:00:00"
                  ],
                  "lunchTime": [
                      "00:00:00",
                      "00:00:00"
                  ]
              }
          },
          "sunAndHoliday": {
              "weekend_non_consulation_notice": "",
              "treatmentTime": [
                  null,
                  null
              ]
          }
      },
      "treatmentSubject": [
          {
              "name": "치과교정과",
              "Clinic_subject": {
                  "SpecialistDentist_NUM": 1,
                  "choiceTreatmentDentist_NUM": 0
              }
          }
      ],
      "SpecialTreatment": [
          {
              "name": "측두하악관절 자극요법"
          },
          {
              "name": "소아야간진료(20시 이후)"
          }
      ],
      "dentistInfo": {
          "specialistDentist": 1,
          "generalDentist": 0,
          "resident": 0,
          "intern": 1
      },
      "parkingInfo": {
          "parkingAllowNum": 0,
          "parkingCost": "",
          "parkingNotice": ""
      },
      "location": {
          "address": "서울특별시 강서구 강서로 242 3층 307호 (화곡동, 강서힐스테이트상가)"
      }
  },
}
