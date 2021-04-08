import React, {useState, useEffect, useRef} from 'react';
import Styled from 'styled-components/native';
import {
  TouchableWithoutFeedback,
  FlatList,
  Platform,
  PermissionsAndroid,
  Alert,
  ActivityIndicator,
  Keyboard
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
import ToastMessage from '~/Components/Presentational/ToastMessage';
import TouchBlockIndicatorCover from '~/Components/Presentational/TouchBlockIndicatorCover';

// Route
import GETAroundCities from '~/Routes/Search/GETAroundCities';

// Async Storage
import {storeUserInfo} from '~/storage/currentUser';

// Route
import POSTRegister from '~/Routes/Auth/POSTRegister';
import POSTSocialRegister from '~/Routes/Auth/POSTSocialRegister';
import POSTReviewUpload from '~/Routes/Review/POSTReviewUpload';
import GETCitySearch from '~/Routes/Search/GETCitySearch';
import POSTUserHometown from '~/Routes/User/POSTUserHometown';
import POSTMainHometownChange from '~/Routes/User/POSTMainHometownChange';
import PUTUserHometown from '~/Routes/User/PUTUserHometown';

const Container = Styled.View`
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
z-index: 10;
`;

const LoadingCitiesContainer = Styled.View`
flex: 1;
background-color: #ffffff;
align-items: center;
justify-content: center;
padding-bottom: ${hp('9.8%')}px;
`;

const ModalTitleText = Styled.Text`
font-style: normal;
font-weight: bold;
font-size: 14px;
line-height: 20px;
color: #131F3C;
`;

const HeaderSearchInput = Styled.TextInput`
flex: 1;
padding-bottom: 3px;
font-weight: 400;
font-size: 21px;
color: #131F3C;
`;

const SearchInputContainer = Styled.View`
flex: 1;
`;

const ClearTextButtonContainer = Styled.View`
position: absolute;
right: 0px;
justify-content: center;
align-items: center;
height: ${hp('7%')}px;
padding-left: 16px;
padding-right: 0px;
padding-bottom: 8px;
`;

const ClearTextIcon = Styled.Image`
width: ${wp('5.3%')}px;
height: ${wp('5.3%')}px;
`;

const NoDataContainer = Styled.ScrollView`
height: ${hp('60%')};
`;

const NoDataImage = Styled.Image`
width: ${wp('21.6%')}px;
height: ${wp('21.6%')}px;
`;

const NoDataText = Styled.Text`
font-weight: 400;
font-size: 16px;
line-height: 24px;
color: #9AA2A9;
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

let inputValue = '';
var offset = 0;
var limit = 25;

const HometownSearchScreen = ({navigation, route}: Props) => {

  const selectedHometown = useSelector(
    (state: any) =>
      state.currentUser.hometown[0]
  );
  const [loadingFindAroundCites, setLoadingFindAroundCites] = useState<boolean>(
    false,
  );

  const [loadingAddCity, setLoadingAddCity] = useState<boolean>(false);
  const [cityArray, setCityArray] = useState<Array<CityData>>([]);
  const [loadingSignUp, setLoadingSignUp] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>('');
  const [isAroundCities, setIsAroundCities] = useState<boolean>(true);
  const [modalDescripText, setModalDescripText] = useState<string>(
    '현재 위치를 불러 올 수 없습니다.',
  );
  //const [inputValue, setInputValue] = useState<string>("");
  const jwtToken = useSelector((state: any) => state.currentUser).jwtToken;

  const provider = route.params?.provider;

  const searchInputRef = useRef<any>();
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
          ToastMessage.show('현재 위치를 불러올 수 없습니다 ㅠㅠ');
        },
        {enableHighAccuracy: false, timeout: 5000, maximumAge: 5000},
      );
    }
  }, []);

  const dispatch = useDispatch();

  const selectHometownItem = (item: any) => {
    Keyboard.dismiss();
    
    if (route.params?.requestType === 'add') {
      addSubHometown(item);
    } else if (route.params?.requestType === 'revise') {
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
          getAroundCities(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          setLoadingFindAroundCites(false);
          console.log('사용자 현재 위치 불러오기 실패 error', error);
          ToastMessage.show('현재 위치를 불러올 수 없습니다 ㅠㅠ');
        },
        {enableHighAccuracy: false, timeout: 5000, maximumAge: 5000},
      );
    }
  }

  const moveToTermsOfServiceAgreeByLocal = (hometown: any) => {
    Keyboard.dismiss();
    //setLoadingSignUp(true);

    const certifiedPhoneNumber = route.params.certifiedPhoneNumber;
    const provider = route.params.provider;
    const fcmToken = route.params.fcmToken;
    const phoneNumber = route.params.userPhoneNumber;
    const nickname = route.params.nickname;
    const cityId = hometown.id;

    navigation.navigate("TermsAgreeScreen", {
      certifiedPhoneNumber: route.params?.certifiedPhoneNumber,
      provider: route.params?.provider,
      fcmToken: route.params?.fcmToken,
      phoneNumber: route.params?.phoneNumber,
      nickname: route.params?.nickname,
      cityId: hometown.id,
    })
  };

  const moveToTermsOfServiceAgreeBySocial = (hometown: any) => {
    console.log('signUpSocial hometown', hometown);
    Keyboard.dismiss();
    //setLoadingSignUp(true);

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


    navigation.navigate("TermsAgreeScreen", {
      certifiedPhoneNumber: route.params?.certifiedPhoneNumber,
      birthdate: route.params?.birthdate,
      profileImg: route.params?.profileImg,
      provider: route.params?.provider,
      fcmToken: route.params?.fcmToken,
      phoneNumber: route.params?.phoneNumber,
      nickname: route.params?.nickname,
      email: route.params?.email,
      socialId: route.params?.socialId,
      cityId: hometown.id,
    })
  };

  const getAroundCities = (latitude: number, longitude: number) => {
    GETAroundCities({latitude, longitude})
      .then((response: any) => {
        setLoadingFindAroundCites(false);
        console.log('GETAroundCities response', response);

        let tmpCityArray = response.intersectCities;
        tmpCityArray.unshift(response.currentCity);

        setCityArray(tmpCityArray);
      })
      .catch((error) => {
        setLoadingFindAroundCites(false);
        console.log('GETAroundCities error', error);
      });
  };

  const addMainHometown = (item: any) => {
    setLoadingAddCity(true);
    POSTMainHometownChange({jwtToken, cityId: item.id}).then((response: any) => {
      console.log("POSTMainHometownChange response", response);
      if (response.statusText === 'Accepted') {
        setLoadingAddCity(false);

        const hometownObj = {
          UsersCities: {
            now: true,
          },

          emdName: item.emdName,
          id: item.id,
          fullCityName: item.fullCityName,
          sido: item.sido,
          sigungu: item.sigungu,
        };

        dispatch(allActions.userActions.setHometown([hometownObj]));
        navigation.goBack();
      }
    }).catch((error) => {
      setLoadingAddCity(false);
      console.log('POSTMainUserHometownChange error', error);
        Alert.alert("거주지 설정 실패", "다시 시도해 주세요");
      
    });
  }
  const addSubHometown = (item: any) => {
    setLoadingAddCity(true);
    console.log('addSubHometown, item', item);
    const cityId = item.id;

    POSTUserHometown({jwtToken, cityId})
      .then((response: any) => {
        console.log('POSTUserHometown response', response);
        if (response.statusText === 'Accepted') {
          setLoadingAddCity(false);

          const hometownObj = {
            UsersCities: {
              now: false,
            },
            emdName: item.emdName,
            id: item.id,
            fullCityName: item.fullCityName,
            sido: item.sido,
            sigungu: item.sigungu,
          };

          dispatch(allActions.userActions.setHometown([hometownObj]));
          navigation.goBack();
        }
      })
      .catch((error) => {
        setLoadingAddCity(false);
        console.log('POSTUserHometown error', error);

        if (error.data.message === '이미 설정한 거주지입니다.') {
          
          Alert.alert("이미 설정한 동네입니다.");
        }
      });
  };

  const reviseHometown = (item: any) => {
    setLoadingAddCity(true);
    const preCityId = selectedHometown.id;
    const cityId = item.id;

    PUTUserHometown({jwtToken, preCityId, cityId})
      .then((response) => {
        console.log('PUTUserHometown response', response);
        setLoadingAddCity(false);

        const hometownArr = [
          {
            UsersCities: {
              now: true,
            },
            emdName: item.emdName,
            id: item.id,
            fullCityName: item.fullCityName,
            sido: item.sido,
            sigungu: item.sigungu,
          },
        ];

        dispatch(allActions.userActions.setHometown(hometownArr));
        navigation.goBack();
      })
      .catch((error) => {
        console.log('PUTUserHometown error', error);
        setLoadingAddCity(false);
      });
  };


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
        console.log('GETCitySearch inputValue', inputValue);

        if (keyword === inputValue) {
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
    console.log('입력 끝');
  };


  const clearTextInput = () => {
    setInputText("");
    setCityArray([]);
    searchInputRef.current.clear();
    searchInputRef.current.focus();
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
  };

  const renderSearchInput = () => {
    return (
      <SearchInputContainer>
      <HeaderSearchInput
        ref={searchInputRef}
        value={inputText}
        selectionColor={"#131F3C"}
        autoCapitalize={'none'}
        placeholder={'동,읍,면을 검색해보세요.'}
        placeholderTextColor={'#E2E6ED'}
        onChangeText={onChangeHometownInput}
        onEndEditing={onEndEditingHometownInput}
        returnKeyType={'search'}
      />
      {inputText.length > 0 && (
          <TouchableWithoutFeedback onPress={() => clearTextInput()}>
          <ClearTextButtonContainer>
            <ClearTextIcon
            source={require('~/Assets/Images/Search/ic_clearText.png')}/>
          </ClearTextButtonContainer>
          </TouchableWithoutFeedback>
      )}
      </SearchInputContainer>
    );
  };

  return (
    <Container>
      <NavigationHeader
        headerLeftProps={{type: 'arrow', onPress: goBack}}
        headerCenterProps={{
          type: 'searchInput',
          renderSearchInput: renderSearchInput,
        }}
        headerRightProps={{type: 'search'}}
      />
      <BodyContainer>
        <FindAroundCitesContainer>
          <TouchableWithoutFeedback onPress={() => findAroundCites()}>
            <FindAroundCitesButton>
              <FindAroundCitesText>{'현재위치로 찾기'}</FindAroundCitesText>
            </FindAroundCitesButton>
          </TouchableWithoutFeedback>
        </FindAroundCitesContainer>
        <HometownListHeaderContainer>
          {!isAroundCities && (
            <ListLabelText>{`'${inputText}'`}</ListLabelText>
          )}
          {isAroundCities && <ListLabelText>{`근처 동네`}</ListLabelText>}
        </HometownListHeaderContainer>
        {loadingFindAroundCites && (
          <LoadingCitiesContainer>
            <ActivityIndicator />
          </LoadingCitiesContainer>
        )}
        {!loadingFindAroundCites && cityArray.length > 0 && (
          <HometownListContainer>
            <FlatList
              keyboardShouldPersistTaps={'always'}
              keyboardDismissMode={"on-drag"}
              contentContainerStyle={{paddingBottom: hp('16%')}}
              showsVerticalScrollIndicator={false}
              data={cityArray}
              renderItem={renderHometownItem}
              keyExtractor={(item, index) => `${index}`}
            />
          </HometownListContainer>
        )}
        {!loadingFindAroundCites && cityArray.length === 0 && (
          <NoDataContainer
          keyboardDismissMode={"on-drag"}
          contentContainerStyle={{backgroundColor: "#ffffff", alignItems: 'center', justifyContent: 'center', height: hp('50%')}}>
            <NoDataImage
            source={require('~/Assets/Images/ic_noData.png')}/>
            <NoDataText>{"검색결과가 없습니다."}</NoDataText>
          </NoDataContainer>
        )}
      </BodyContainer>
      {(loadingSignUp || loadingAddCity) && (
        <IndicatorContainer>
          <ActivityIndicator color={'#ffffff'} />
        </IndicatorContainer>
      )}
    </Container>
  );
};

export default HometownSearchScreen;
