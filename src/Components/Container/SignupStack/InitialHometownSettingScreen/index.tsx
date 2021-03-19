import React, {useState, useEffect, useRef} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, Platform, PermissionsAndroid, ActivityIndicator, FlatList, Keyboard} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import Geolocation from 'react-native-geolocation-service';

import {getStatusBarHeight} from 'react-native-status-bar-height';


// Local Components
import NavigationHeader from '~/Components/Presentational/NavigationHeader';
import ToastMessage from '~/Components/Presentational/ToastMessage';
import {hasNotch} from '~/method/deviceInfo';

// Routes
import GETAroundCities from '~/Routes/Search/GETAroundCities';
import GETCitySearch from '~/Routes/Search/GETCitySearch';

const Container = Styled.View`
flex: 1;
background-color: #FFFFFF;
`;

const BodyContainer = Styled.View`
padding-top: ${hasNotch() ? 32 : 10}px;
padding-left: 24px;
padding-right: 24px;
flex: 1;
`;

const MainTitleText = Styled.Text`
font-size: 24px;
line-height: 24px;
color: #131F3C;
`;

const DescripText = Styled.Text`
margin-top: 6px;
font-weight: 400;
font-size: 16px;
line-height: 24px;
color: #9AA2A9;
`;

const SearchContainer = Styled.View`
margin-top: 17px;
flex-direction: row;
border-bottom-width: 1px;
border-color: #E2E6ED;
justify-content: space-between;
`;

const SearchInputContainer = Styled.View`
flex-direction: row;
align-items: center;
flex: 1;
`;

const SearchIcon = Styled.Image`
width: ${wp('6.4%')}px;
height: ${wp('6.4%')}px;
`;

const SearchTextInput = Styled.TextInput`
flex: 1;
height: 40px;
font-weight: 400;
font-size: 16px;
color: #000000;
margin-left: 8px;
`;

const ClearTextIcon = Styled.Image`
width: ${wp('4.8%')}px;
height: ${wp('4.8%')}px;
`;

const TargetIcon = Styled.Image`
width: ${wp('6.4%')}px;
height: ${wp('6.4%')}px;
`;

const TargetIconContainer = Styled.View`
padding-left: 15px;
padding-right: 0px;
justify-content: center;
`;

const SearchRightContainer = Styled.View`
flex-direction: row;
`;

const CitySearchResultContainer = Styled.View`
flex: 1;
`;

const NearHometownLabelText = Styled.Text`
font-weight: 800;
font-size: 13px;
line-height: 24px;
color: #000000;
`;


const ClearTextButtonContainer = Styled.View`
justify-content: center;
align-items: center;
padding-right: 13px;
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


const HometownListHeaderContainer = Styled.View`
flex-direction: row;
padding-top: 23px;
padding-bottom: 0px;
background-color: #ffffff;
`;

const ListLabelText = Styled.Text`
font-weight: 700;
font-size: 13px;
line-height: 24px;
color: #000000;
`;

const LoadingCitiesContainer = Styled.View`
flex: 1;
background-color: #ffffff;
align-items: center;
justify-content: center;
padding-bottom: ${hp('9.8%')}px;
`;





interface Props {
    navigation: any,
    route: any,
}

const InitialHometownSettingScreen = ({navigation, route}: Props) => {

    const [searchInputValue, setSearchInputValue] = useState<string>("");
    const [searchedCityArray, setSearchedCityArray] = useState<Array<any>>([]); 

    const [loadingFindNearCites, setLoadingFindNearCites] = useState<boolean>(true);

    const [isNearCity, setIsNearCity] = useState<boolean>(true);

    const searchInputRef = useRef<any>();

    const searchInputValueRef = useRef<string>("");
    const offsetRef = useRef<number>(0);
    const limitRef = useRef<number>(25);

    useEffect(() => {
        setLoadingFindNearCites(true);
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
              getNearCities(position.coords.latitude, position.coords.longitude);
            },
            (error) => {
              setLoadingFindNearCites(false);
              console.log('사용자 현재 위치 불러오기 실패 error', error);
              ToastMessage.show('현재 위치를 불러올 수 없습니다 ㅠㅠ');
            },
            {enableHighAccuracy: false, timeout: 5000, maximumAge: 5000},
          );
        }
      }, []);

    const goBack = () => {
        navigation.goBack();
    }

    const onChangeSearchInput = (text: string) => {
        setIsNearCity(false);
        searchInputValueRef.current = text
        setSearchInputValue(text);

        if(text.length > 0) {
            getAuthCompletedCityList(text, offsetRef.current, limitRef.current);
        } else {
            setSearchedCityArray([]);
        }
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
            console.log('GETCitySearch searchInputValueRef.current', searchInputValueRef.current);
    
            if (keyword === searchInputValueRef.current) {
              setSearchedCityArray(response);
            }
          })
          .catch((error) => {
            console.log('GETCitySearch error', error);
          });
      };

    const clearTextInput = () => {
        setSearchInputValue("");
        setSearchedCityArray([]);
        searchInputRef.current.clear();
        searchInputRef.current.focus();
      }

      const getNearCities = (latitude: number, longitude: number) => {
        GETAroundCities({latitude, longitude})
          .then((response: any) => {
            setLoadingFindNearCites(false);
            console.log('GETAroundCities response', response);
    
            let tmpCityArray = response.intersectCities;
            tmpCityArray.unshift(response.currentCity);
    
            setSearchedCityArray(tmpCityArray);
          })
          .catch((error) => {
            setLoadingFindNearCites(false);
            console.log('GETAroundCities error', error);
          });
      };

      const selectCityItem = (item: any) => {
        Keyboard.dismiss();
        if(route.params?.requestType === 'signUp') {
            if(route.params?.provider === 'local') {
                moveToTermsOfServiceAgreeByLocal(item);
            }
        }
      }


  const moveToTermsOfServiceAgreeByLocal = (hometown: any) => {
    Keyboard.dismiss();

    navigation.navigate("TermsAgreeScreen", {
      certifiedPhoneNumber: route.params?.certifiedPhoneNumber,
      provider: route.params?.provider,
      fcmToken: route.params?.fcmToken,
      phoneNumber: route.params?.phoneNumber,
      nickname: route.params?.nickname,
      cityId: hometown.id,
    })
  };

    const renderCityItem = ({item, index}: any) => {
        //console.log('renderHometownItem item', item);
    
        return (
          <TouchableWithoutFeedback onPress={() => selectCityItem(item)}>
            <HometownItemContainer>
              <HometownNameText>{item.fullCityName}</HometownNameText>
            </HometownItemContainer>
          </TouchableWithoutFeedback>
        );
    };

    
    const renderCitiesListHeader = () => {          
        return (
            <HometownListHeaderContainer>
            {!isNearCity && (
                <ListLabelText>{`검색 결과`}</ListLabelText>
            )}
            {isNearCity && (
                <ListLabelText>{`근처 동네`}</ListLabelText>
            )}
            </HometownListHeaderContainer>
            )
    }

    async function findNearCites() {
        setIsNearCity(true);
        setLoadingFindNearCites(true);
        setSearchInputValue("");
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
              getNearCities(position.coords.latitude, position.coords.longitude);
            },
            (error) => {
              setLoadingFindNearCites(false);
              console.log('사용자 현재 위치 불러오기 실패 error', error);
              ToastMessage.show('현재 위치를 불러올 수 없습니다 ㅠㅠ');
            },
            {enableHighAccuracy: false, timeout: 5000, maximumAge: 5000},
          );
        }
    }

    const onCityFlatListBeginDrag = () => {
        if(Platform.OS === 'android' && searchInputRef.current.isFocused()) {
            searchInputRef.current.blur();
        }
    }

    return (
        <Container>
            <NavigationHeader
            headerLeftProps={{type: 'arrow', onPress: goBack}}
            headerTitle={" "}
            borderDisable={true}/>
            <BodyContainer>
                <MainTitleText>{"동네 설정"}</MainTitleText>
                <DescripText>{"지역 맞춤 치과 정보를 위해 동네를 설정해주세요! "}</DescripText>
                <SearchContainer>
                    <SearchInputContainer>
                    <SearchIcon
                    source={require('~/Assets/Images/Search/ic_search2.png')}/>
                    <SearchTextInput
                    ref={searchInputRef}
                    placeholder={"읍 · 면 · 동 검색"}
                    value={searchInputValue}
                    selectionColor={"#00D1FF"}
                    placeholderTextColor={"#9AA2A9"}
                    onChangeText={(text) => onChangeSearchInput(text)}/>
                    </SearchInputContainer>
                    <SearchRightContainer>
                    {/* {searchInputValue.length > 0 && (
                    <TouchableWithoutFeedback onPress={() => clearTextInput()}>
                        <ClearTextButtonContainer>
                            <ClearTextIcon
                          source={require('~/Assets/Images/Search/ic_clearText.png')}/>
                        </ClearTextButtonContainer>
                    </TouchableWithoutFeedback>
                    )} */}
                    <TouchableWithoutFeedback onPress={() => findNearCites()}> 
                    <TargetIconContainer>
                    <TargetIcon
                    source={require('~/Assets/Images/Location/ic_target.png')}/>
                    </TargetIconContainer>
                    </TouchableWithoutFeedback>
                    </SearchRightContainer>
                </SearchContainer>
                <CitySearchResultContainer>
                    {loadingFindNearCites && (
                    <LoadingCitiesContainer>
                        <ActivityIndicator
                        color={"#999999"}/>
                    </LoadingCitiesContainer>
                    )}
                    {!loadingFindNearCites && (
                    <FlatList
                    keyboardShouldPersistTaps={'always'}
                    keyboardDismissMode={'on-drag'}
                    contentContainerStyle={{paddingBottom: Platform.OS === 'android' ? hp('60%') : ('16%'), backgroundColor: "#ffffff"}}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={renderCitiesListHeader}
                    renderItem={renderCityItem}
                    data={searchedCityArray}/>
                    )}
                </CitySearchResultContainer>
            </BodyContainer>
        </Container>
    )
}

export default InitialHometownSettingScreen;

