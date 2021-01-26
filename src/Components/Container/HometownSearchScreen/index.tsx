import React, {useState, useEffect, useRef} from 'react';
import Styled from 'styled-components/native';
import {
  TouchableWithoutFeedback,
  FlatList,
  Platform,
  PermissionsAndroid,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import allActions from '~/actions';
import axios from 'axios';
import Geolocation from 'react-native-geolocation-service';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';

// Local Component
import NavigationHeader from '~/Components/Presentational/NavigationHeader';
import AnimatedModal from '~/Components/Presentational/AnimatedModal';
import ToastMessage from '~/Components/Presentational/ToastMessage';

// Route
import GETAroundCities from '~/Routes/Search/GETAroundCiteis';

// Async Storage
import {storeUserInfo} from '~/storage/currentUser';

// Route
import POSTRegister from '~/Routes/Auth/POSTRegister';
import POSTSocialRegister from '~/Routes/Auth/POSTSocialRegister';
import POSTReviewUpload from '~/Routes/Review/POSTReviewUpload';
import GETCitySearch from '~/Routes/Search/GETCitySearch';
import POSTUserHometown from '~/Routes/User/POSTUserHometown';
import PUTUserHometown from '~/Routes/User/PUTUserHometown';

const Container = Styled.SafeAreaView`
flex: 1;
background-color: #ffffff;
`;

const HeaderLeftContainer = Styled.View`
`;

const HeaderBackIcon = Styled.Image`
width: ${wp('6.4%')}px;
height: ${wp('6.4%')}px;
`;

const HeaderEmptyContainer = Styled.View`
width: ${wp('6.4%')}px;
height: ${wp('6.4%')}px;
`;

const BodyContainer = Styled.View`
flex: 1;
background-color: #ffffff;
`;

const HometownInputContainer = Styled.View`
width: ${wp('100%')}px;
height: ${hp('7%')}px;
border-bottom-width: 1px;
border-color: #eeeeee;
align-items: center;
justify-content: center;
flex-direction: row;
`;

const HometownTextInputContainer = Styled.View`
flex-direction: row;
align-items: center;
`;

const SearchIcon = Styled.Image`
width: ${wp('6.4%')}px;
height: ${wp('6.4%')}px;
`;

const HometownTextInput = Styled.TextInput`
margin-left: 12px;
width: ${wp('81.6%')}px;
font-size: 16px;
`;

const FindAroundCitesContainer = Styled.View`
padding-top: 16px;
padding-left: 16px;
padding-right: 16px;
flex-direction: row;
`;

const FindAroundCitesButton = Styled.View`
flex: 1;
padding-top: 11px;
padding-bottom: 11px;
background-color: #00D1FF;
flex-direction: row;
align-items: center;
justify-content: center;
border-radius: 4px;
`;


const TargetIcon = Styled.Image`
width: ${wp('4.26%')}px;
height: ${wp('4.26%')}px;
`;

const FindAroundCitesText = Styled.Text`
font-family: NanumSquare;
font-weight: 800;
font-size: 14px;
line-height: 24px;
color: #ffffff;
`;

const HometownListContainer = Styled.View`
padding-left: 16px;
padding-right: 16px;
`;

const HometownListHeaderContainer = Styled.View`
flex-direction: row;
padding-top: 24px;
padding-bottom: 12px;
background-color: #ffffff;
padding-left: 16px;
padding-right: 16px;
`;

const ListLabelText = Styled.Text`
font-family: NanumSquare;
font-weight: 700;
font-size: 13px;
line-height: 24px;
color: #000000;
`;

const HometownItemContainer = Styled.View`
padding-top: 12px;
padding-bottom: 12px;
flex-direction: row;
align-items: center;
border-bottom-width: 1px;
border-color: #eeeeee;
`;

const HometownNameText = Styled.Text`
font-family: NanumSquare;
line-height: 24px;
font-weight: 400;
font-size: 14px;
color: #000000;
`;

const IndicatorContainer = Styled.View`
position: absolute;
width: ${wp('100%')}px;
height: ${hp('100%')}px;
background-color: #00000040;
align-items: center;
justify-content: center;
`;

const LoadingCitiesContainer = Styled.View`
flex: 1;
background-color: #ffffff;
align-items: center;
justify-content: center;
padding-bottom: ${hp('9.8%')}px;
`;


const ModalTitleText = Styled.Text`
font-family: NanumSquare;
font-style: normal;
font-weight: bold;
font-size: 14px;
line-height: 20px;
color: #131F3C;
`;


const HeaderSearchInput = Styled.TextInput`
flex: 1;
background-color: #ffffff;
font-family: NanumSquare;
padding-bottom: 3px;
font-weight: 400;
font-size: 16px;
color: #131F3C;
`;


interface Props {
  navigation: any;
  route: any;
}

interface CityData {
  id: number;
  sido: string;
  sigungu: string;
  emdName: string;
  fullCityName: string;
  relativeAddress: string;
}

const NMAP_CLIENT_ID = 'htnc7h3vi5';
const NMAP_CLIENT_SECRET = '6uL7bf7tRgcDr9a3IS70fiufg647gVXxlTVoctIO';

let inputValue = "";
var offset = 0;
var limit = 25;

const HometownSearchScreen = ({navigation, route}: Props) => {
  const [loadingFindAroundCites, setLoadingFindAroundCites] = useState<boolean>(false);
  const [loadingAddCity, setLoadingAddCity] = useState<boolean>(false);
  const [cityArray, setCityArray] = useState<Array<CityData>>([]);
  const [loadingSignUp, setLoadingSignUp] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>("");
  const [isAroundCities, setIsAroundCities] = useState<boolean>(true);
  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);
  const [modalDescripText, setModalDescripText] = useState<string>("현재 위치를 불러 올 수 없습니다.");
  //const [inputValue, setInputValue] = useState<string>("");
  const jwtToken = useSelector((state: any) => state.currentUser).jwtToken;

  const provider = route.params?.provider;
  var curLocationHometown = '';

  useEffect(() => {
    if (route.params?.provider) {
      console.log('route.params.phoneNumber', route.params.phoneNumber);
      console.log(
        'route.params.certifiedPhoneNumber',
        route.params.certifiedPhoneNumber,
      );

      console.log('route.params.provider', route.params.provider);
      console.log('route.params.fcmToken', route.params.fcmToken);
      console.log('route.params.nickname', route.params.nickname);
    }
  }, [route.params?.provider]);
 
  useEffect(() => {
    setLoadingFindAroundCites(true);
    var hasLocationPermission;

    if (Platform.OS == 'android') {
      const permission = PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;
      hasLocationPermission = PermissionsAndroid.check(permission);
    } else if (Platform.OS == 'ios') {
      hasLocationPermission = true;
    }

    if (hasLocationPermission) {
      Geolocation.getCurrentPosition(
        (position) => {
          console.log('사용자 현재 위치 position', position);
          getAroundCities(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          setLoadingFindAroundCites(false);
          console.log('사용자 현재 위치 불러오기 실패 error', error);
          ToastMessage.show("현재 위치를 불러올 수 없습니다 ㅠㅠ")
        },
        {enableHighAccuracy: false, timeout: 10000, maximumAge: 10000},
      );
    }

  }, [])

  const dispatch = useDispatch();

  const selectHometownItem = (item: any) => {
    if(route.params?.requestType === "signUp") {
      if (provider === 'local') {
        signUp(item);
      } else {
        signUpSocial(item);
      }
    } else if(route.params?.requestType === "add") {
        addSubHometown(item);
    } else if(route.params?.requestType === "revise") {
        reviseHometown(item);
    }
  };

  async function findAroundCites() {
    setIsAroundCities(true); 
    setLoadingFindAroundCites(true);
    var hasLocationPermission;

    if (Platform.OS == 'android') {
      const permission = PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;
      hasLocationPermission = await PermissionsAndroid.check(permission);
    } else if (Platform.OS == 'ios') {
      hasLocationPermission = true;
    }

    if (hasLocationPermission) {
      Geolocation.getCurrentPosition(
        (position) => {
          console.log('사용자 현재 위치 position', position);

         
        },
        (error) => {
          setLoadingFindAroundCites(false);
          console.log('사용자 현재 위치 불러오기 실패 error', error);
          ToastMessage.show("현재 위치를 불러올 수 없습니다 ㅠㅠ")
        },
        {enableHighAccuracy: false, timeout: 10000, maximumAge: 10000},
      );
    }
  }

  const signUp = (hometown: any) => {
    setLoadingSignUp(true);

    const certifiedPhoneNumber = route.params.certifiedPhoneNumber;
    const provider = route.params.provider;
    const fcmToken = route.params.fcmToken;
    const phoneNumber = route.params.userPhoneNumber;
    const nickname = route.params.nickname;
    const cityId = hometown.id;

    POSTRegister({
      certifiedPhoneNumber,
      provider,
      fcmToken,
      phoneNumber,
      nickname,
      cityId,
    })
      .then((response: any) => {
        setLoadingSignUp(false);
        console.log("POSTRegister (response)", typeof(response))
        console.log('POSTRegister response', response);
        console.log("POSTRegister response.user", response.user);
        console.log("POSTRegister response.user.userId", response.user.userId);

        const profile = {
          id: response.user.userId,
          nickname: response.user.userNickname,
          profileImg: response.user.userProfileImg,
          phoneNumber,
          birthdate: response.user.userBirthdate,
          gender: response.user.userGender,
          provider,
          Residences: response.user.userResidences,
        };
        const userInfo = {
          jwtToken: response.token,
          profile,
        };

        storeUserInfo(response.token);
        dispatch(allActions.userActions.setUser(userInfo));
        dispatch(allActions.userActions.setHometown(response.user.userResidences));
      })
      .catch((error) => {
        setLoadingSignUp(false);
        console.log('POSTRegister error', error);
      });
  };

  const signUpSocial = (hometown: any) => {
    console.log('signUpSocial hometown', hometown);
    setLoadingSignUp(true);

    const certifiedPhoneNumber = route.params.certifiedPhoneNumber;
    const birthdate = route.params.birthdate;
    const profileImg = route.params.profileImg;
    const nickname = route.params.nickname;
    const phoneNumber = route.params.phoneNumber;
    const fcmToken = route.params.fcmToken;
    const email = route.params.email;
    const provider = route.params.provider;
    const socialId = route.params.socialId;
    const cityId = hometown.id;

    POSTSocialRegister({
      certifiedPhoneNumber,
      birthdate,
      profileImg,
      nickname,
      phoneNumber,
      fcmToken,
      email,
      provider,
      socialId,
      cityId,
    })
      .then((response: any) => {
        setLoadingSignUp(false);
        console.log('POSTSocialRegister response', response);

        const profile = {
          id: response.user.userId,
          nickname: response.user.userNickname,
          profileImg: response.user.userProfileImg,
          phoneNumber,
          birthdate,
          gender: '',
          provider,
          Residences: response.user.userResidences,
        };
        const userInfo = {
          jwtToken: response.token,
          profile,
        };

        storeUserInfo(response.token);
        dispatch(allActions.userActions.setUser(userInfo));
        dispatch(allActions.userActions.setHometown(response.user.userResidences));
      })
      .catch((error: any) => {
        setLoadingSignUp(false);
        console.log('POSTSocialRegister error', error);
      });
  };

  const getAroundCities = (latitude: number, longitude: number) => {
    GETAroundCities({latitude, longitude})
    .then((response: any) => {
      setLoadingFindAroundCites(false);
      console.log("GETAroundCities response", response);

      let tmpCityArray = response.intersectCities;
      tmpCityArray.unshift(response.currentCity);

      setCityArray(tmpCityArray);
    })
    .catch((error) => {
      setLoadingFindAroundCites(false);
      console.log("GETAroundCities error", error); 
    })
  }

  const addSubHometown = (item: any) => {
    setLoadingAddCity(true);
    console.log("addSubHometown, item", item);
    const cityId = item.id;
    
    POSTUserHometown({jwtToken, cityId})
    .then((response: any) => {
      console.log("POSTUserHometown response", response);
      if(response.statusText === "Accepted") {
        setLoadingAddCity(false);

        const hometownObj = {
          UsersCities: {
            now: false
          },
          emdName: item.emdName,
          id: item.id,
          fullCityName: item.fullCityName,
          sido: item.sido,
          sigungu: item.sigungu
        }

        dispatch(allActions.userActions.addHometown(hometownObj));
        navigation.goBack();
      } 
    })
    .catch((error) => {
      setLoadingAddCity(false);
      console.log("POSTUserHometown error", error);

      if(error.data.message === "이미 설정한 거주지입니다.") {
        setIsVisibleModal(true);
        setModalDescripText("이미 설정된 동네입니다.")
      }
    })
  }

  const reviseHometown = (item: any) => {
    setLoadingAddCity(true);
    const preCityId = route.params?.preCityId;
    const cityId = item.id;

    PUTUserHometown({jwtToken, preCityId, cityId})
    .then((response) => {
      console.log("PUTUserHometown response", response);
      setLoadingAddCity(false);

      const hometownArr = [{
        UsersCities: {
          now: true
        },
        emdName: item.emdName,
        id: item.id,
        fullCityName: item.fullCityName,
        sido: item.sido,
        sigungu: item.sigungu
      }]

      dispatch(allActions.userActions.setHometown(hometownArr));
      navigation.goBack();
    })
    .catch((error) => {
      console.log("PUTUserHometown error", error);
      setLoadingAddCity(false);
    })
  }

  const cancelModal = () => {
    setIsVisibleModal(false);
  }

  const getAuthCompletedCityList = (
    keyword: string,
    offset: number,
    limit: number,
  ) => {
    GETCitySearch({keyword, offset, limit})
      .then((response: any) => {
        console.log('GETCitySearch response', response);
        console.log('GETCitySearch response.length', response.length);
        console.log('GETCitySearch keyword', keyword);
        console.log("GETCitySearch inputValue", inputValue);
        
        if(keyword === inputValue) {
          setCityArray(response);
        }
      })
      .catch((error) => {
        console.log('GETCitySearch error', error);
      });
  };

  const onChangeHometownInput = (text: string) => {
    setIsAroundCities(false);
    inputValue = text;
    setInputText(text);
    if (text.length > 0) {
      getAuthCompletedCityList(text, offset, limit);
    
    }
  };

  const onEndEditingHometownInput = () => {
    console.log("입력 끝");
  }

  const renderHometownItem = ({item, index}: any) => {
    //console.log('renderHometownItem item', item);

    return (
      <TouchableWithoutFeedback onPress={() => selectHometownItem(item)}>
        <HometownItemContainer>
          <HometownNameText>{item.fullCityName}</HometownNameText>
        </HometownItemContainer>
      </TouchableWithoutFeedback>
    );
  };

  const goBack = () => {
    navigation.goBack();
  } 

  const renderSearchInput = () => {
    return (
      <HeaderSearchInput
      autoCapitalize={"none"}
      placeholder={"동명(읍, 면)으로 검색(ex. 이의동)"}
      placeholderTextColor={"#9AA2A9"}
      clearButtonMode={"while-editing"}
      onChangeText={onChangeHometownInput}
      onEndEditing={onEndEditingHometownInput}
      returnKeyType={"search"}
      />
    )
  }

  return (
    <Container>
      <NavigationHeader
        headerLeftProps={{type: "arrow", onPress: goBack}}
        headerCenterProps={{type: "searchInput", renderSearchInput: renderSearchInput}}
        headerRightProps={{type: "search"}}
      />
      <BodyContainer>
        <FindAroundCitesContainer>
        <TouchableWithoutFeedback onPress={() => findAroundCites()}>
          <FindAroundCitesButton>
            <FindAroundCitesText>
              {"현재위치로 찾기"}
            </FindAroundCitesText>
          </FindAroundCitesButton>
        </TouchableWithoutFeedback>
        </FindAroundCitesContainer>
          <HometownListHeaderContainer>
            {inputText.length > 0 && (
              <ListLabelText>{`'${inputText}'`}</ListLabelText>
            )}
            {isAroundCities && (
              <ListLabelText>{`근처 동네`}</ListLabelText>
            )}
          </HometownListHeaderContainer>
          {loadingFindAroundCites && (
          <LoadingCitiesContainer>
            <ActivityIndicator/>
          </LoadingCitiesContainer>
          )}
          {!loadingFindAroundCites && (
          <HometownListContainer>
          <KeyboardAwareFlatList
          keyboardShouldPersistTaps={"always"}
          contentContainerStyle={{paddingBottom: hp('16%')}}
          showsVerticalScrollIndicator={false}
          data={cityArray}
          renderItem={renderHometownItem}
          />
          </HometownListContainer>
          )}
      </BodyContainer>
      <AnimatedModal
            visible={isVisibleModal}
            buttons={[
            {
            title: '확인',
            style: {fontWeight: "400"},
            onPress: cancelModal,
            },
            ]}>
            <ModalTitleText>{modalDescripText}</ModalTitleText>
            </AnimatedModal>
      {(loadingSignUp || loadingAddCity) && (
        <IndicatorContainer>
          <ActivityIndicator color={'#ffffff'} />
        </IndicatorContainer>
      )}
    </Container>
  );
};

export default HometownSearchScreen;
