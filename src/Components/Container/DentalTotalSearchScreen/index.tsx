import React, {useEffect, useState, useRef, createRef} from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import Styled from 'styled-components/native';
import {
  TouchableWithoutFeedback,
  FlatList,
  ScrollView,
  Keyboard,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Picker} from '@react-native-picker/picker';
import {useSelector, useDispatch} from 'react-redux';
import allActions from '~/actions';
import Modal from 'react-native-modal';

import {isIphoneX} from 'react-native-iphone-x-helper';

// Local Component
import DentalListItem from '~/Components/Presentational/DentalListItem';
import TouchBlockIndicatorCover from '~/Components/Presentational/TouchBlockIndicatorCover';
import AutoCompletedKeywordFlatList from '~/Components/Presentational/AutoCompletedKeywordFlatList';
import DentalSearchResultList from '~/Components/Presentational/DentalTotalSearchScreen/DentalSearchResultList';
import callDentalPhoneNumber from '~/method/callDentalPhoneNumber';

// Route
import GETDentalTotalSearch from '~/Routes/Search/GETDentalTotalSearch';
import GETAroundDental from '~/Routes/Dental/GETAroundDental';
import GETDentalKeywordAutoComplete from '~/Routes/Search/GETDentalKeywordAutoComplete';
import DELETESearchRecord from '~/Routes/Search/DELETESearchRecord';
import GETSearchRecord from '~/Routes/Search/GETSearchRecord';
import GETUserReservations from '~/Routes/User/GETUserReservations';
import {hasNotch, getStatusBarHeight} from '~/method/deviceInfo'

const Container = Styled.View`
flex: 1;
background-color: #ffffff;
`;

const HeaderBar = Styled.View`
width: ${wp('100%')}px;
 padding-top: ${Platform.OS === 'ios' ? getStatusBarHeight() : 0}px;
 flex-direction: row;
 justify-content: space-between;
 border-bottom-width: 0.5px;
 border-color: #E2E6ED;
 background-color: #ffffff;
 border-bottom-width: 1px;
  border-color: #00D1FF;
 z-index: 3;
`;

const BodyContainer = Styled.View`
 flex: 1;
 background-color: #F5F7F9;
`;

const LoadingContainer = Styled.View`
width: ${wp('100%')}px;
height: ${hp('100%')}px;
position: absolute;
top: ${wp('11.7%')}px;
align-items: center;
justify-content: center;
`;

const SearchInputContainer = Styled.View`
flex: 1;
background: #ffffff;
flex-direction: row;
align-items: center;
`;

const SearchIcon = Styled.Image`
width: ${wp('6.4%')}px;
height: ${wp('6.4%')}px;
`;

const SearchTextInput = Styled.TextInput`
flex: 1;
font-weight: 700;
font-size: 21px;
color: #131F3C;
`;

const BackIconTouchableWithoutFeedback = Styled(
  TouchableWithoutFeedback as new () => TouchableWithoutFeedback,
)`
`;

const BackIconView = Styled.View`
padding: 17px 10px 16px 16px;
align-items: center;
justify-content: center;
`;

const BackIconImage = Styled.Image`
width: ${wp('6.4%')}px;
height: ${wp('6.4%')}px;
`;

const ViewMapButton = Styled.View`
position: absolute;
bottom: ${hp('7%')}px;
right: 16px;
flex-direction: row;
padding: 10px 16px 10px 16px;
border-radius: 100px;
background-color: #131F3C;
`;

const ViewMapIcon = Styled.Image`
width: ${wp('5.3%')}px;
height: ${wp('5.3%')}px;
`;

const ViewMapText = Styled.Text`
margin-left: 4px;
font-size: 16px
font-weight: 400;
line-height: 20px;
color: #ffffff;
`;

const FilterListContainer = Styled.View`
width: ${wp('100%')}px;
z-index: 1;
flex-direction: row;
align-items: center;
background-color: #000000;
`;

const FilterItemContainer = Styled.View`
padding: 8px 12px 8px 12px;
border-radius: 100px;
background-color: #F5F7F9;
flex-direction: row;
align-items: center;
border-width: 1px;
border-color: #E2E6ED;
`;

const FilterItemText = Styled.Text`
color: #9AA2A9;
font-size: 14px;
line-height: 19px;
font-weight: 400;
`;

const DetailFilterModalContainer = Styled.View`
width: ${wp('100%')}px;
background-color: #ffffff;
border-top-left-radius: 20px;
border-top-right-radius: 20px;
position: absolute;
bottom: 0;
`;

const DetailFilterListContainer = Styled.View`
background-color: #F5F7F9;
padding-top: 0px;
flex-direction: column;
flex: 1;
`;

const DetailFilterHeaderContainer = Styled.View`
flex-direction: row;
padding-top: 16px;
padding-bottom: 16px;
padding-left: 16px;
align-items: center;
border-bottom-width: 1px;
border-color: #F5F7F9;
`;

const DetailFilterTitleText = Styled.Text`
font-weight: bold;
font-size: 16px;
color: #000000;
`;

const TimeFilterModalContainer = Styled.View`
`;

const TimePickerContainer = Styled.View`
align-items: center;
padding-left: 25px;
padding-right: 25px;
justify-content: space-between;
flex-direction: row;
border-bottom-width: 1px;
border-color: #F5F7F9;
`;

const DetailFilterItemContainer = Styled.View`
padding: 8px 12px;
border-radius: 100px;
background-color: #ffffff;
`;

const DetailFilterItemText = Styled.Text`
font-weight: 400;
font-size: 14px;
line-height: 19px;
color: #9AA2A9;
`;

const TimePickerLabelText = Styled.Text`
font-size: 20px;
color: #000000;
`;

const FooterIndicatorContainer = Styled.View`
height: ${hp('9%')}px;
align-items: center;
justify-content: center;
`;

const NoSearchedDentalContainer = Styled.View`
width: ${wp('100%')}px;
height: ${hp('70%')}px;
align-items: center;
justify-content: center;
`;

const NoSearchedDentalText = Styled.Text`
`;

const SearchResultContainer = Styled.View`
background-color: #F5F7F9;
position: absolute;
top: 0;
bottom: 0;
`;

const AutoCompletedKeywordContainer = Styled.View`
width: ${wp('100%')}px;
position: absolute;
top: 0;
bottom: 0;
`;

const AutoCompletedKeywordItemContainer = Styled.View`
padding: 25px;
flex-direction: row;
align-items: center;
border-bottom-width: 1px;
border-color: #c3c3c3;
`;

const AutoCompletedKeywordText = Styled.Text`
`;

const ViewDentalMapButton = Styled.View`
padding: 13px;
background-color: #eeeeee;
`;

const ViewDentalMapText = Styled.Text`
font-size: 16px;
`;

const ClearTextButtonContainer = Styled.View`
justify-content: center;
height: ${hp('7%')}px;
padding-left: 16px;
padding-right: 16px;
`;

const ClearTextIcon = Styled.Image`
width: ${wp('5.3%')}px;
height: ${wp('5.3%')}px;
`;

const DetailFilterFooterContainer = Styled.View`
padding-top: 16px;
padding-left: 0px;
padding-right: 16px;
padding-bottom: 32px;
flex-direction: row;
align-items: center;
justify-content: space-between;
`;

const InitializeFilterContainer = Styled.View`
flex-direction: row;
align-items: center;
padding-top: 8px;
padding-bottom: 8px;
padding-left: 16px;
padding-right: 16px;
`;

const InitializeFilterText = Styled.Text`
font-weight: 400;
font-size: 12px;
line-height: 16px;
color: #9AA2A9;
`;

const InitializeFilterIcon = Styled.Image`
margin-left: 4px;
width: ${wp('2.66%')}px;
height: ${wp('2.66%')}px;
`;

const RegisterFilterButton = Styled.View`
width: ${wp('55.46%')}px;
align-items: center;
border-radius: 4px;
background-color: #131F3C;
padding-top: 12px;
padding-bottom: 12px;
`;

const RegisterFilterText = Styled.Text`
font-weight: 700;
font-size: 14px;
line-height: 24px;
color: #ffffff;
`;

const LoadingSearchContainer = Styled.View`
width: ${wp('100%')}px;
height: ${hp('60%')}px;
position: absolute;
flex: 1;
zIndex: 2;
align-items: center;
justify-content: center;
`;

const DentalListContainer = Styled.View`
`;

const NoDataImage = Styled.Image`
width: ${wp('21.6%')}px;
height: ${wp('21.6%')}px;
`;

const NoDataText = Styled.Text`
margin-top: 12px;
font-weight: 400;
font-size: 16px;
line-height: 24px;
color: #9AA2A9;
`;

const NoMoreNearDentalContainer = Styled.View`
padding-top: 20px;
padding-bottom: 70px;
align-items: center;
`;

const NoMoreNearDentalText = Styled.Text`
font-weight: 400;
font-size: 14px;
color: #9AA2A9;
`;

const VisitDateFilterModalSubLabelContainer = Styled.View`
background-color: #FFFFFF;
padding: 8px 0px 8px 16px;
`;

const ModalSubLabelText = Styled.Text`
font-weight: 400;
font-size: 14px;
line-height: 19px;
color: #000000;
`;

const TEST_DENTAL_LIST = [
  {
    name: '연세자연치과의원',
    address: '종로구 세종대로',
  },
  {
    name: '연세정인치과의원',
    address: '종로구 세문안로',
  },
  {
    name: '더스퀘워치과의원',
    address: '종로구 종로',
  },
  {
    name: '연세자연치과의원',
    address: '종로구 세종대로',
  },
  {
    name: '연세정인치과의원',
    address: '종로구 세문안로',
  },
  {
    name: '더스퀘워치과의원',
    address: '종로구 종로',
  },
];

interface Props {
  navigation: any;
  route: any;
}

//let offset = 0;
//let limit = 20;
let sort = 'distance';

let inputedKeyword = '';
let inputingText = '';

const DentalTotalSearchScreen = ({navigation, route}: Props) => {
  const [visibleTimeFilterModal, setVisibleTimeFilterModal] = useState<boolean>(
    false,
  );
  const [visibleDayFilterModal, setVisibleDayFilterModal] = useState<boolean>(
    false,
  );
  const [bottomPadding, setBottomPadding] = useState<number>(40);
  const [hourPickerValue, setHourPickerValue] = useState<number>(1);
  const [minutePickerValue, setMinutePickerValue] = useState<string>('00');
  const [timeSlotPickerValue, setTimeSlotPickerValue] = useState<string>(
    '오전',
  );

  const [loadingSearchDental, setLoadingSearchDental] = useState<boolean>(
    false,
  );
  const [loadingMoreDental, setLoadingMoreDental] = useState<boolean>(false);
  const [refreshingDentalFlat, setRefreshingDentalFlat] = useState<boolean>(
    false,
  );

  const [isFocusedSearchInput, setIsFocusedSearchInput] = useState<boolean>(
    route.params?.requestType === 'search' ? true : false,
  );

  const [noMoreNearDental, setNoMoreNearDental] = useState<boolean>(false);

  const [query, setQuery] = useState<string>(
    route.params?.query ? route.params?.query : '',
  );

  const searchQueryRef = useRef<string>('');

  const timeFilterActionSheet = createRef<any>();
  const searchInputRef = createRef<any>();

  const currentUserLocation = useSelector(
    (state: any) => state.currentUser.currentUserLocation,
  );
  const currentMapLocation = {
    latitude: route.params?.currentMapLatitude,
    longitude: route.params?.currentMapLongitude,
  };

  const dispatch = useDispatch();
  const jwtToken = useSelector((state: any) => state.currentUser.jwtToken);

  const todayIndex = new Date().getDay();

  const lat = currentUserLocation.latitude;
  const long = currentUserLocation.longitude;

  const mapLat = currentMapLocation.latitude;
  const mapLong = currentMapLocation.longitude;

  const limitRef = useRef<number>(15);
  const offsetRef = useRef<number>(0);

  // 방문일 설정 redux state
  const dayList = useSelector((state: any) => state.dentalFilter).dayList;
  const selectedDayList = useSelector((state: any) => state.dentalFilter)
    .selectedDayList;
  const dayFilter = useSelector((state: any) => state.dentalFilter).dayFilter;

  // 방문시간 설정 redux state
  const timeFilter = useSelector((state: any) => state.dentalFilter).timeFilter;

  // 공휴일진료 설정 redux state
  const holidayFilter = useSelector((state: any) => state.dentalFilter)
    .holidayFilter;

  // 주차가능 설정 redux state
  const parkingFilter = useSelector((state: any) => state.dentalFilter)
    .parkingFilter;

  const specialistFilter = useSelector((state: any) => state.dentalFilter).specialistFilter;

  const goodDentalFilter = useSelector((state: any) => state.dentalFilter).goodDentalFilter;

  const nightCareFilter = useSelector((state: any) => state.dentalFilter.nightCareFilter);

  // 병원 지도 관련 redux state
  const searchedKeyword = useSelector(
    (state: any) => state.dentalMap.searchedKeyword,
  );
  const searchedDentalArray = useSelector(
    (state: any) => state.dentalMap.searchedDentalArray,
  );
  const autoCompletedKeywordArray = useSelector(
    (state: any) => state.dentalMap.autoCompletedKeywordArray,
  );

  const dentalSearchRecordArray = useSelector((state: any) => state.currentUser)
    .dentalSearchRecordArray;

  const isNearDentalList = useRef<boolean>(route.params?.isNearDentalList);
  const noMoreDentalData = useRef<boolean>(false);

  const keywordRef = useRef<any>();
  const searchedDentalFlatListRef = useRef<any>();

  // useEffect(() => {
  //   async function fetchData() {
  //     const incompleteKorean = /[ㄱ-ㅎ|ㅏ-ㅣ]/;
  //     if (!incompleteKorean.test(query)) {
  //       if (query !== '') {
  //         const response: any = await GETDentalKeywordAutoComplete({jwtToken, query});
  //         setQuery((prev) => {
  //           if (prev !== inputingText) {
  //             console.log('diff');
  //           } else {
  //             console.log('GETDentalKeywordAutoComplete response', response);
  //             setAutoCompletedKeywordArray(response);
  //           }
  //           return prev;
  //         });
  //       } else {
  //         setAutoCompletedKeywordArray([]);
  //       }
  //     }
  //   }
  //   fetchData();
  // }, [query])

  useEffect(() => {
    if (searchedKeyword) {
      setQuery(searchedKeyword);
      inputingText = searchedKeyword;
      //getAutoCompleteKeyword(searchedKeyword)
    }
  }, [searchedKeyword]);

  const goBack = () => {
    navigation.goBack();
  };

  const moveToDentalMap = () => {
    let searchedDentalLocation;

    if (searchedDentalArray[0]) {
      searchedDentalLocation = {
        coordinate: {
          latitude: Number(searchedDentalArray[0].geographLat),
          longitude: Number(searchedDentalArray[0].geographLong),
        },
        zoom: 13,
      };

      dispatch(
        allActions.dentalMapActions.setMapLocation(searchedDentalLocation),
      );
    }

    navigation.navigate('NearDentalMap', {
      isNearDentalList: isNearDentalList.current,
      offset: offsetRef.current,
      limit: limitRef.current,
      searchedDentalLocation: searchedDentalLocation,
      category: keywordRef?.current?.category,
    });

    setTimeout(() => {
      dispatch(allActions.dentalMapActions.setSearchedKeyword(query));
      dispatch(
        allActions.dentalMapActions.setNearDentalArray(searchedDentalArray),
      );
    }, 10);
  };

  const onChangeSearchInput = (text: string) => {
    inputingText = text;
    setQuery(text);

    if (text.trim() === '') {
      dispatch(allActions.dentalMapActions.setAutoCompletedKeywordArray([]));
    } else {
      getAutoCompleteKeyword(text);
    }
  };

  const onSubmitSearchInput = (keyword: string) => {
    console.log('onSubmitSearchInput keyword', keyword);

    if (keyword.trim() !== '') {
      searchQueryRef.current = keyword;
      setIsFocusedSearchInput(false);
      searchDental(query, 'text');
    }
  };

  const getAutoCompleteKeyword = (query: string) => {
    GETDentalKeywordAutoComplete({jwtToken, query})
      .then((response: any) => {
        console.log('GETDentalKeywordAutoComplete response', response);
        if (query === inputingText) {
          dispatch(
            allActions.dentalMapActions.setAutoCompletedKeywordArray(response),
          );
        } else {
        }
      })
      .catch((error) => {
        console.log('GETDentalKeywordAutoComplete error', error);
      });
  };

  const searchDental = (
    query: string,
    category: string,
  ) => {
    setLoadingSearchDental(true);

    const offset = offsetRef.current;
    const limit = limitRef.current;

    GETDentalTotalSearch({
      jwtToken,
      query,
      offset,
      limit,
      lat,
      long,
      category,
      sort,
      dayFilter,
      timeFilter,
      holidayFilter,
      parkingFilter,
      specialistFilter,
      goodDentalFilter,
      nightCareFilter,
    })
      .then((response: any) => {
        console.log("GETDentalTotalSearch response", response);
        setLoadingSearchDental(false);
        dispatch(allActions.dentalMapActions.setSearchedKeyword(query));

        if (response.length > 0) {
          dispatch(
            allActions.dentalMapActions.setSearchedDentalArray(response),
          );
          isNearDentalList.current = false;
          if (response.length < 15) {
            noMoreDentalData.current = true;
          }
        } else {
          dispatch(allActions.dentalMapActions.setSearchedDentalArray([]));
        }

        setTimeout(() => {
          getSearchRecord();
        }, 100);
      })
      .catch((error: any) => {
        setLoadingSearchDental(false);
        dispatch(allActions.dentalMapActions.setSearchedKeyword(query));
        console.log('GETDentalTotalSearch error', error);
      });
  };

  const getSearchRecord = () => {
    GETSearchRecord({jwtToken})
      .then(async (response: any) => {
        console.log('GETSearchRecord response', response);
        dispatch(allActions.userActions.setDentalSearchRecord(response));
      })
      .catch((error) => {
        console.log('GETSearchRecord error', error);
      });
  };

  const filterDental = (
    query: string,
    tmpDayFilter: any,
    tmpTimeFilter: string,
    tmpHolidayFilter: boolean,
    tmpParkingFilter: string,
    tmpSpecialistFilter: string,
    tmpGoodDentalFilter: string,
    tmpNightCareFilter: string,
  ) => {
    setLoadingSearchDental(true);


    const dayFilter = tmpDayFilter;
    const timeFilter = tmpTimeFilter;
    const parkingFilter = tmpParkingFilter;
    const holidayFilter = tmpHolidayFilter;
    const category = keywordRef?.current?.category;

    const specialistFilter = tmpSpecialistFilter;
    const goodDentalFilter = tmpGoodDentalFilter;
    const nightCareFilter = tmpNightCareFilter;

    const offset = offsetRef.current;
    const limit = limitRef.current;

    GETDentalTotalSearch({
      jwtToken,
      query,
      offset,
      limit,
      lat,
      long,
      category,
      sort,
      dayFilter,
      timeFilter,
      holidayFilter,
      parkingFilter,
      specialistFilter,
      goodDentalFilter,
      nightCareFilter,
    })
      .then((response: any) => {
        console.log('filterDental 실행');
        setLoadingSearchDental(false);
        console.log('GETDentalTotalSearch response', response);
        //searchedDentalFlatListRef.current.scrollToIndex({animated: false, index: 0})

        if (response.length > 0) {
          dispatch(
            allActions.dentalMapActions.setSearchedDentalArray(response),
          );

          isNearDentalList.current = false;
        } else {
          dispatch(allActions.dentalMapActions.setSearchedDentalArray([]));
        }
      })
      .catch((error: any) => {
        setLoadingSearchDental(false);
        console.log('GETDentalTotalSearch error', error);
      });
  };

  const filterNearDental = (
    tmpDayFilter: any,
    tmpTimeFilter: string,
    tmpHolidayFilter: boolean,
    tmpParkingFilter: string,
    tmpSpecialistFilter: string,
    tmpGoodDentalFilter: string,
    tmpNightCareFilter: string,
  ) => {
    setLoadingSearchDental(true);

    const sort = 'd';
    const timeFilter = tmpTimeFilter;
    const dayFilter = tmpDayFilter;
    const parkingFilter = tmpParkingFilter;
    const holidayFilter = tmpHolidayFilter;

    const specialistFilter = tmpSpecialistFilter;
    const goodDentalFilter = tmpGoodDentalFilter;
    const nightCareFilter = tmpNightCareFilter;

    const offset = offsetRef.current;
    const limit = limitRef.current;

    GETAroundDental({
      jwtToken,
      lat,
      long,
      sort,
      timeFilter,
      dayFilter,
      holidayFilter,
      parkingFilter,
      specialistFilter,
      goodDentalFilter,
      nightCareFilter,
      mapLat,
      mapLong,
      offset,
      limit,
    })
      .then((response) => {
        console.log(
          'GETAroundDental response in DentalTotalSearchScreen',
          response,
        );
        setLoadingSearchDental(false);
        dispatch(allActions.dentalMapActions.setSearchedDentalArray(response));
        searchedDentalFlatListRef.current.scrollToIndex({animated: false, index: 0})
      })
      .catch((error) => {
        console.log('GETAroundDental error', error);
        setLoadingSearchDental(false);
      });
  };

  const clickDayFilter = () => {
    setVisibleDayFilterModal(true);
  };

  const selectDayFilterItem = (day: object, index: number) => {
    dispatch(allActions.dentalFilterActions.selectDayItem(index));
  };

  const clickTimeFilter = () => {
    setVisibleTimeFilterModal(true);
  };

  const changeHolidayFilter = () => {
    offsetRef.current = 0;
    dispatch(allActions.dentalFilterActions.setHolidayFilter(!holidayFilter));

    if (isNearDentalList.current) {
      filterNearDental(dayFilter, timeFilter, !holidayFilter, parkingFilter, specialistFilter, goodDentalFilter, nightCareFilter);
    } else {
      filterDental(query, dayFilter, timeFilter, !holidayFilter, parkingFilter, specialistFilter, goodDentalFilter, nightCareFilter);
    }
  };

  const changeParkingFilter = () => {
    offsetRef.current = 0;
    if (parkingFilter === 'y') {
      dispatch(allActions.dentalFilterActions.setParkingFilter('n'));

      if (isNearDentalList.current) {
        filterNearDental(dayFilter, timeFilter, holidayFilter, 'n', specialistFilter, goodDentalFilter, nightCareFilter);
      } else {
        filterDental(query, dayFilter, timeFilter, holidayFilter, 'n', specialistFilter, goodDentalFilter, nightCareFilter);
      }
    } else if (parkingFilter === 'n') {
      dispatch(allActions.dentalFilterActions.setParkingFilter('y'));
      if (isNearDentalList.current) {
        filterNearDental(dayFilter, timeFilter, holidayFilter, 'y', specialistFilter, goodDentalFilter, nightCareFilter);
      } else {
        filterDental(query, dayFilter, timeFilter, holidayFilter, 'y', specialistFilter, goodDentalFilter, nightCareFilter);
      }
    }
  };

  const changeSpecialistFilter = () => {
    offsetRef.current = 0;
    if(specialistFilter === 't') {
      dispatch(allActions.dentalFilterActions.setSpecialistFilter('f'));
      
      if (isNearDentalList.current) {
        filterNearDental(dayFilter, timeFilter, holidayFilter, parkingFilter, 'f', goodDentalFilter, nightCareFilter);
      } else {
        filterDental(query, dayFilter, timeFilter, holidayFilter, parkingFilter, 'f', goodDentalFilter, nightCareFilter);
      }
    } else {
      dispatch(allActions.dentalFilterActions.setSpecialistFilter('t'));
      
      if (isNearDentalList.current) {
        filterNearDental(dayFilter, timeFilter, holidayFilter, parkingFilter, 't', goodDentalFilter, nightCareFilter);
      } else {
        filterDental(query, dayFilter, timeFilter, holidayFilter, parkingFilter, 't', goodDentalFilter, nightCareFilter);
      }
    }
  }

  const changeGoodDentalFilter = () => {
    offsetRef.current = 0;
    if(goodDentalFilter === 't') {
      dispatch(allActions.dentalFilterActions.setGoodDentalFilter('f'));
      
      if (isNearDentalList.current) {
        filterNearDental(dayFilter, timeFilter, holidayFilter, parkingFilter, specialistFilter, 'f', nightCareFilter);
      } else {
        filterDental(query, dayFilter, timeFilter, holidayFilter, parkingFilter, specialistFilter, 'f', nightCareFilter);
      }

    } else {
      dispatch(allActions.dentalFilterActions.setGoodDentalFilter('t'));
      
      if (isNearDentalList.current) {
        filterNearDental(dayFilter, timeFilter, holidayFilter, parkingFilter, specialistFilter, 't', nightCareFilter);
      } else {
        filterDental(query, dayFilter, timeFilter, holidayFilter, parkingFilter, specialistFilter, 't', nightCareFilter);
      }
    }
  }

  const changeNightCareFilter = () => {
    offsetRef.current = 0;
    if(nightCareFilter === 't') {
      dispatch(allActions.dentalFilterActions.setNightCareFilter('f'));

      if (isNearDentalList.current) {
        filterNearDental(dayFilter, timeFilter, holidayFilter, parkingFilter, specialistFilter, goodDentalFilter, 'f');
      } else {
        filterDental(query, dayFilter, timeFilter, holidayFilter, parkingFilter, specialistFilter, goodDentalFilter, 'f');
      }
    } else {
      dispatch(allActions.dentalFilterActions.setNightCareFilter('t'));
      
      if (isNearDentalList.current) {
        filterNearDental(dayFilter, timeFilter, holidayFilter, parkingFilter, specialistFilter, goodDentalFilter, 't');
      } else {
        filterDental(query, dayFilter, timeFilter, holidayFilter, parkingFilter, specialistFilter, goodDentalFilter, 't');
      }
    }
  }

  const cancelDayFilter = () => {
    console.log('cancelDayFilter selectedDayFilter', selectDayFilterItem);
    console.log('cancelDayFilter dayList', dayList);
    var tmpDayList = dayList;
    var tmpSelectedDayList = selectedDayList;

    var preDayList = tmpDayList.map(function (item: any, index: number) {
      if (tmpSelectedDayList.includes(item)) {
        console.log('item', item);
        item.selected = true;
        return item;
      } else {
        item.selected = false;
        return item;
      }
    });

    //setDayFilterList(preDayList);
    dispatch(allActions.dentalFilterActions.setDayList(preDayList));
    //setSelectedDayFilter(preDayFilterList);
    setVisibleDayFilterModal(false);
  };

  const initializeDayFilter = () => {
    const tmpDayFilter = new Array([]);
    const tmpTimeFilter = '';
  
    dispatch(allActions.dentalFilterActions.setTimeFilter(''));
    dispatch(allActions.dentalFilterActions.initializeDayList());
    dispatch(allActions.dentalFilterActions.setSelectedDayList([]));

    if (isNearDentalList.current) {
      filterNearDental(
        tmpDayFilter,
        tmpTimeFilter,
        parkingFilter,
        holidayFilter,
        specialistFilter,
        goodDentalFilter,
        nightCareFilter,
      );
    } else {
      filterDental(
        searchedKeyword,
        tmpDayFilter,
        tmpTimeFilter,
        parkingFilter,
        holidayFilter,
        specialistFilter,
        goodDentalFilter,
        nightCareFilter,
      );
    }
  setVisibleDayFilterModal(false);
  };

  const registerDayFilter = () => {



    // var tmpDayList = dayList;
    // var tmpSelectedDayList = new Array();
    // var tmpDayFilter = new Array();

    // tmpDayList.forEach((item: any, index: number) => {
    //   if (item.selected) {
    //     tmpDayFilter.push(item.value);
    //     tmpSelectedDayList.push(item);
    //   }
    // });

    // if (JSON.stringify(tmpDayFilter) !== JSON.stringify(dayFilter)) {
    //   dispatch(allActions.dentalFilterActions.setDayFilter(tmpDayFilter));
    //   dispatch(allActions.dentalFilterActions.setSelectedDayList(tmpSelectedDayList));

    //   offsetRef.current = 0;

    //   if (isNearDentalList.current) {
    //     filterNearDental(
    //       tmpDayFilter,
    //       timeFilter,
    //       holidayFilter,
    //       parkingFilter,
    //       specialistFilter,
    //       goodDentalFilter,
    //       nightCareFilter
    //     );
    //   } else {
    //     filterDental(
    //       query,
    //       tmpDayFilter,
    //       timeFilter,
    //       holidayFilter,
    //       parkingFilter,
    //       specialistFilter,
    //       goodDentalFilter,
    //       nightCareFilter
    //     );
    //   }
    // }

    // setVisibleDayFilterModal(false);

    setVisibleDayFilterModal(false);

    if (timeSlotPickerValue === '오전') {
      const formattedHourPickerValue =
        hourPickerValue < 10 ? '0' + hourPickerValue : hourPickerValue;
      const formattedTime =
        formattedHourPickerValue + ':' + minutePickerValue + ':00';

      var tmpDayList = dayList;
      var tmpSelectedDayList = new Array();
      var tmpDayFilter = new Array();

      tmpDayList.forEach((item: any, index: number) => {
        if (item.selected) {
          tmpDayFilter.push(item.value);
          tmpSelectedDayList.push(item);
        }
      });


        if(JSON.stringify(tmpDayFilter) !== JSON.stringify(dayFilter) || timeFilter !== formattedTime) {

        dispatch(allActions.dentalFilterActions.setTimeFilter(formattedTime));
        dispatch(allActions.dentalFilterActions.setDayFilter(tmpDayList));
        dispatch(allActions.dentalFilterActions.setSelectedDayList(tmpSelectedDayList));

        console.log("tmpSelectedDayList", tmpSelectedDayList);
        if(tmpSelectedDayList.length === 0) {
          const currentDate = new Date();
          const weekArray = new Array('sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat');
          
          if (isNearDentalList.current) {
            filterNearDental(
              [weekArray[currentDate.getDay()]],
              formattedTime,
              parkingFilter,
              holidayFilter,
              specialistFilter,
              goodDentalFilter,
              nightCareFilter,
            );
          } else {
            filterDental(
              searchedKeyword,
              [weekArray[currentDate.getDay()]],
              formattedTime,
              parkingFilter,
              holidayFilter,
              specialistFilter,
              goodDentalFilter,
              nightCareFilter,
            );
          }
        } else {
          if (isNearDentalList.current) {
            filterNearDental(
              tmpDayFilter,
              formattedTime,
              parkingFilter,
              holidayFilter,
              specialistFilter,
              goodDentalFilter,
              nightCareFilter,
            );
          } else {
            filterDental(
              searchedKeyword,
              tmpDayFilter,
              formattedTime,
              parkingFilter,
              holidayFilter,
              specialistFilter,
              goodDentalFilter,
              nightCareFilter,
            );
          }
        }
        }
    } else if (timeSlotPickerValue == '오후') {

      const formattedTime =
        Number(hourPickerValue) + 12 + ':' + minutePickerValue + ':00';

        
        var tmpDayList = dayList;
        var tmpSelectedDayList = new Array();
        var tmpDayFilter = new Array();

        tmpDayList.forEach((item: any, index: number) => {
          if (item.selected) {
            tmpDayFilter.push(item.value);
            tmpSelectedDayList.push(item);
          }
        });

      if (JSON.stringify(tmpDayFilter) !== JSON.stringify(dayFilter) || timeFilter !== formattedTime) {

        dispatch(allActions.dentalFilterActions.setTimeFilter(formattedTime));
        dispatch(allActions.dentalFilterActions.setDayFilter(tmpDayList));
        dispatch(allActions.dentalFilterActions.setSelectedDayList(tmpSelectedDayList));

        if(tmpSelectedDayList.length === 0) {
          console.log("tmpSelectedDayList", tmpSelectedDayList);
          const currentDate = new Date();
          const weekArray = new Array('sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat');
        

        if (isNearDentalList.current) {
          filterNearDental(
            [weekArray[currentDate.getDay()]],
            formattedTime,
            parkingFilter,
            holidayFilter,
            specialistFilter,
            goodDentalFilter,
            nightCareFilter,
          );
        } else {
          filterDental(
            searchedKeyword,
            [weekArray[currentDate.getDay()]],
            formattedTime,
            parkingFilter,
            holidayFilter,
            specialistFilter,
            goodDentalFilter,
            nightCareFilter,
          );
        }
      } else {
        if (isNearDentalList.current) {
          filterNearDental(
            tmpDayFilter,
            formattedTime,
            parkingFilter,
            holidayFilter,
            specialistFilter,
            goodDentalFilter,
            nightCareFilter,
          );
        } else {
          filterDental(
            searchedKeyword,
            tmpDayFilter,
            formattedTime,
            parkingFilter,
            holidayFilter,
            specialistFilter,
            goodDentalFilter,
            nightCareFilter,
          );
        }
      }
    }
  }
    
  };

  const cancelTimeFilter = () => {
    setVisibleTimeFilterModal(false);
  };

  const deleteAllSearchRecord = () => {
    dispatch(allActions.userActions.setDentalSearchRecord([]));
    const searchId = 'all';

    DELETESearchRecord({jwtToken, searchId})
      .then((response) => {
        console.log('DELETESearchRecord response', response);
      })
      .catch((error) => {
        console.log('DELETESearchRecord error', error);
      });
  };

  const deleteSingleSearchRecord = (id: number, category: string) => {
    const searchId = id;
    dispatch(allActions.userActions.deleteDentalSearchRecord(id));

    DELETESearchRecord({jwtToken, searchId})
      .then((response) => {
        console.log('DELETESearchRecord response', response);
      })
      .catch((error) => {
        console.log('DELETESearchRecord error', error);
      });
  };

  const onValueChangeHourPicker = (itemValue: any, itemIndex: number) => {
    console.log(
      'onValueChangeHourPicker itemValue, itemIndex',
      itemValue,
      itemIndex,
    );
    setHourPickerValue(itemValue);
  };

  const onValueChangeMinutePicker = (itemValue: any, itemIndex: number) => {
    console.log(
      'onValueChangeMinutePicker itemValue, itemIndex',
      itemValue,
      itemIndex,
    );
    setMinutePickerValue(itemValue);
  };

  const onValueChangeTimeSlotPicker = (itemValue: any, itemIndex: number) => {
    console.log(
      'onValueChangeTimeSlorPicker itemValue, itemIndex',
      itemValue,
      itemIndex,
    );
    setTimeSlotPickerValue(itemValue);
  };

  const initializeTimeFilter = () => {
    if (timeFilter !== '') {
      dispatch(allActions.dentalFilterActions.setTimeFilter(''));

      const tmpTimeFilter = '';

      if (isNearDentalList.current) {
        filterNearDental(
          dayFilter,
          tmpTimeFilter,
          holidayFilter,
          parkingFilter,
          specialistFilter,
          goodDentalFilter,
          nightCareFilter
        );
      } else {
        filterDental(
          query,
          dayFilter,
          tmpTimeFilter,
          holidayFilter,
          parkingFilter,
          specialistFilter,
          goodDentalFilter,
          nightCareFilter
        );
      }
    }
    setVisibleTimeFilterModal(false);
  };

  const registerTimeFilter = () => {
    setVisibleTimeFilterModal(false);
    if (timeSlotPickerValue === '오전') {
      const formattedHourPickerValue =
        hourPickerValue < 10 ? '0' + hourPickerValue : hourPickerValue;
      const formattedTime =
        formattedHourPickerValue + ':' + minutePickerValue + ':00';

      if (timeFilter !== formattedTime) {
        offsetRef.current = 0;
        dispatch(allActions.dentalFilterActions.setTimeFilter(formattedTime));

        if (isNearDentalList.current) {
          filterNearDental(
            dayFilter,
            formattedTime,
            holidayFilter,
            parkingFilter,
            specialistFilter,
            goodDentalFilter,
            nightCareFilter
          );
        } else {
          filterDental(
            query,
            dayFilter,
            formattedTime,
            holidayFilter,
            parkingFilter,
            specialistFilter,
            goodDentalFilter,
            nightCareFilter
          );
        }
      }
    } else if (timeSlotPickerValue == '오후') {
      const formattedTime =
        Number(hourPickerValue) + 12 + ':' + minutePickerValue + ':00';
      dispatch(allActions.dentalFilterActions.setTimeFilter(formattedTime));

      if (timeFilter !== formattedTime) {
        offsetRef.current = 0;
        dispatch(allActions.dentalFilterActions.setTimeFilter(formattedTime));

        if (isNearDentalList.current) {
          filterNearDental(
            dayFilter,
            formattedTime,
            holidayFilter,
            parkingFilter,
            specialistFilter,
            goodDentalFilter,
            nightCareFilter
          );
        } else {
          filterDental(
            query,
            dayFilter,
            formattedTime,
            holidayFilter,
            parkingFilter,
            specialistFilter,
            goodDentalFilter,
            nightCareFilter
          );
        }
      }
    }
  };

  const moveToDentalDetail = (dentalId: number) => {
    navigation.navigate('DentalDetailScreen', {
      dentalId: dentalId,
    });
  };

  const onEndReachedDentalFlat = () => {
    console.log(
      'onEndReachedDentalFlat noMoreDentalData.current',
      noMoreDentalData.current,
    );
    console.log('onEndReachedDentalFlat loadingMoreDental', loadingMoreDental);
    if (
      !noMoreDentalData.current &&
      !loadingMoreDental &&
      !loadingSearchDental
    ) {
      setLoadingMoreDental(true);
      offsetRef.current = offsetRef.current + 15;

      if (!isNearDentalList.current) {
        getMoreDentalList();
      } else {
        getMoreNearDentalList();
      }
    }
  };

  const getMoreDentalList = () => {
    console.log('getMoreDentalList inputedKeyword', inputedKeyword);

    const category = keywordRef?.current?.category;

    const offset = offsetRef.current;
    const limit = limitRef.current;

    const query = searchQueryRef.current;

    GETDentalTotalSearch({
      jwtToken,
      query,
      offset,
      limit,
      lat,
      long,
      category,
      sort,
      dayFilter,
      timeFilter,
      holidayFilter,
      parkingFilter,
      specialistFilter,
      goodDentalFilter,
      nightCareFilter
    })
      .then((response: any) => {
        console.log(
          '검색된 병원 더불러오기 GETDentalTotalSearch response',
          response,
        );
        setLoadingMoreDental(false);

        if (response.length > 0) {
          noMoreDentalData.current = false;
          dispatch(
            allActions.dentalMapActions.addSearchedDentalArray(response),
          );
        } else if (response.length === 0) {
          noMoreDentalData.current = true;
        }

        isNearDentalList.current = false;
      })
      .catch((error: any) => {
        setLoadingMoreDental(false);
        console.log('GETDentalTotalSearch error', error);
      });
  };

  const getMoreNearDentalList = () => {
    console.log('getMoreNearDentalList offsetRef.current', offsetRef.current);

    const offset = offsetRef.current;
    const limit = limitRef.current;

    GETAroundDental({
      jwtToken,
      offset,
      limit,
      lat,
      long,
      sort,
      dayFilter,
      timeFilter,
      holidayFilter,
      parkingFilter,
      specialistFilter,
      goodDentalFilter,
      nightCareFilter,
      mapLat,
      mapLong,
    })
      .then((response: any) => {
        console.log('주변 병원 더불러오기 GETAroundDental response', response);
        console.log('주변 병원 더불러오기 GETAroundDental offset', offset);
        setLoadingMoreDental(false);

        if (response.length > 0) {
          noMoreDentalData.current = false;
          dispatch(
            allActions.dentalMapActions.addSearchedDentalArray(response),
          );
        } else if (response.length === 0) {
          noMoreDentalData.current = true;
          setNoMoreNearDental(true);
        }
      })
      .catch((error: any) => {
        setLoadingMoreDental(false);
        console.log('GETDentalTotalSearch error', error);
      });
  };

  const onRefreshDentalFlat = () => {
    setRefreshingDentalFlat(true);
    offsetRef.current = 0;
    noMoreDentalData.current = false;

    const offset = offsetRef.current;
    const limit = limitRef.current;
    const mapLat = route.params?.currentMapLatitude;
    const mapLong = route.params?.currentMapLongitude;
    const category = keywordRef?.current?.category;

    const query = searchQueryRef.current;

    if (isNearDentalList.current) {
      const sort = 'd';
      GETAroundDental({
        jwtToken,
        offset,
        limit,
        lat,
        long,
        sort,
        timeFilter,
        dayFilter,
        holidayFilter,
        parkingFilter,
        specialistFilter,
        goodDentalFilter,
        nightCareFilter,
        mapLat,
        mapLong,
      })
        .then((response: any) => {
          console.log('GETAroundDental response in NearDentalMap', response);
          setRefreshingDentalFlat(false);
          dispatch(
            allActions.dentalMapActions.setSearchedDentalArray(response),
          );
        })
        .catch((error) => {
          console.log('GETAroundDental error', error);
          setRefreshingDentalFlat(false);
        });
    } else {
      GETDentalTotalSearch({
        jwtToken,
        query,
        offset,
        limit,
        lat,
        long,
        category,
        sort,
        dayFilter,
        timeFilter,
        holidayFilter,
        parkingFilter,
        specialistFilter,
        goodDentalFilter,
        nightCareFilter
      })
        .then((response: any) => {
          console.log('GETDentalTotalSearch response', response);
          setRefreshingDentalFlat(false);
          if (response.length > 0) {
            dispatch(
              allActions.dentalMapActions.setSearchedDentalArray(response),
            );

            isNearDentalList.current = false;
          } else {
            dispatch(allActions.dentalMapActions.setSearchedDentalArray([]));
          }
        })
        .catch((error: any) => {
          setLoadingSearchDental(false);
          console.log('GETDentalTotalSearch error', error);
        });
    }
  };

  const onFocusSearchInput = () => {
    setIsFocusedSearchInput(true);
  };

  const pressBackground = () => {
    Keyboard.dismiss();
  };

  const searchTotalKeyword = ({
    query,
    category,
  }: {
    query: string;
    category: string;
  }) => {

    isNearDentalList.current = false;
    offsetRef.current = 0;
    Keyboard.dismiss();
    setIsFocusedSearchInput(false);
    searchQueryRef.current = query;
    inputingText = query;

    getAutoCompleteKeyword(query);
    setQuery(query);
    searchDental(query, category);

    keywordRef.current = {
      name: query,
      category: category,
    };
  };

  const clearTextInput = () => {
    setQuery('');
    searchInputRef.current.clear();
    searchInputRef.current.focus();
  };

  const clickDentalCallReservation = (
    phoneNumber: number,
    dentalId: number,
  ) => {
    callDentalPhoneNumber(phoneNumber, jwtToken, dentalId, () => {
      GETUserReservations({jwtToken}).then((response: any) => {
        dispatch(allActions.userActions.setReservations(response));
      });
    });
  };

  const renderFooterIndicator = () => {
    if (loadingMoreDental) {
      return (
        <FooterIndicatorContainer>
          <ActivityIndicator />
        </FooterIndicatorContainer>
      );
    } else if (noMoreNearDental) {
      return (
        <NoMoreNearDentalContainer>
          <NoMoreNearDentalText>
            {'주변 2km안에 치과를 전부 불러왔습니다.'}
          </NoMoreNearDentalText>
        </NoMoreNearDentalContainer>
      );
    } else {
      return (
        <FooterIndicatorContainer
          style={{height: 10, backgroundColor: '#F5F7F9'}}
        />
      );
    }
  };

  const renderDentalItem = ({item, index}: any) => {
    const isLunchTime = item.lunchTimeNow == 1 ? true : false;
    const isOpen = item.conclustionNow == 1 ? true : false;
    const rating = item.reviewAVGStarRate ? item.reviewAVGStarRate : '평가없음';

    let todayStartTime = '';
    let todayEndTime = '';

    if (todayIndex === 0) {
      todayStartTime = item.Sun_Consulation_start_time?.slice(0, 5);
      todayEndTime = item.Sun_Consulation_end_time?.slice(0, 5);
    } else if (todayIndex === 1) {
      todayStartTime = item.Mon_Consulation_start_time?.slice(0, 5);
      todayEndTime = item.Mon_Consulation_end_time?.slice(0, 5);
    } else if (todayIndex === 2) {
      todayStartTime = item.Tus_Consulation_start_time?.slice(0, 5);
      todayEndTime = item.Tus_Consulation_end_time?.slice(0, 5);
    } else if (todayIndex === 3) {
      todayStartTime = item.Wed_Consulation_start_time?.slice(0, 5);
      todayEndTime = item.Wed_Consulation_end_time?.slice(0, 5);
    } else if (todayIndex === 4) {
      todayStartTime = item.Thu_Consulation_start_time?.slice(0, 5);
      todayEndTime = item.Thu_Consulation_end_time?.slice(0, 5);
    } else if (todayIndex === 5) {
      todayStartTime = item.Fri_Consulation_start_time?.slice(0, 5);
      todayEndTime = item.Fri_Consulation_end_time?.slice(0, 5);
    } else if (todayIndex === 6) {
      todayStartTime = item.Sat_Consulation_start_time?.slice(0, 5);
      todayEndTime = item.Sat_Consulation_end_time?.slice(0, 5);
    }
    return (
      <DentalListItem
        dentalObj={item}
        dentalId={item.id}
        isOpen={isOpen}
        isLunchTime={isLunchTime}
        name={item.originalName}
        address={item.modifiedAddress}
        rating={rating}
        reviewCount={item.reviewNum}
        lunchTime={item.lunchTime}
        openTime={todayStartTime}
        closeTime={todayEndTime}
        moveToDentalDetail={moveToDentalDetail}
        clickDentalCallReservation={clickDentalCallReservation}
      />
    );
  };

  const renderDayFilterItem = ({item, index}: any) => {
    if (index < 7) {
      return (
        <TouchableWithoutFeedback
          onPress={() => selectDayFilterItem(item, index)}>
          <DetailFilterItemContainer
            style={[
              item.selected
                ? {backgroundColor: '#00D1FF'}
                : {backgroundColor: '#ffffff'},
              styles.detailFilterItemShadow,
            ]}>
            <DetailFilterItemText
              style={item.selected ? {color: '#FFFFFF'} : {color: '#9AA2A9'}}>
              {item.day + '요일'}
            </DetailFilterItemText>
          </DetailFilterItemContainer>
        </TouchableWithoutFeedback>
      );
    } else if (index >= 7) {
      return (
        <DetailFilterItemContainer style={{opacity: 0}}>
          <DetailFilterItemText>{item.day}</DetailFilterItemText>
        </DetailFilterItemContainer>
      );
    } else {
      return <DetailFilterItemContainer />;
    }
  };

  return (
    <Container>
      <HeaderBar>
        <BackIconTouchableWithoutFeedback
          onPress={() => {
            moveToDentalMap()
          }}>
          <BackIconView>
            <BackIconImage
              source={require('~/Assets/Images/Search/ic_back.png')}
            />
          </BackIconView>
        </BackIconTouchableWithoutFeedback>
        <SearchInputContainer>
          <SearchTextInput
            value={query}
            ref={searchInputRef}
            autoFocus={route.params?.requestType === 'search' ? true : false}
            autoCapitalize={'none'}
            defaultValue={searchedKeyword}
            placeholder={'병원, 지역을 검색해 보세요.'}
            placeholderTextColor={'#E2E6ED'}
            selectionColor="#131F3C"
            autoCorrect={false}
            onChangeText={(text: string) => onChangeSearchInput(text)}
            onSubmitEditing={(event: any) =>
              onSubmitSearchInput(event.nativeEvent.text)
            }
            onFocus={() => onFocusSearchInput()}
            returnKeyType={'search'}
          />
          {query?.length > 0 && (
            <TouchableWithoutFeedback onPress={() => clearTextInput()}>
              <ClearTextButtonContainer>
                <ClearTextIcon
                  source={require('~/Assets/Images/Search/ic_clearText.png')}
                />
              </ClearTextButtonContainer>
            </TouchableWithoutFeedback>
          )}
        </SearchInputContainer>
      </HeaderBar>
      <BodyContainer>
        {!isFocusedSearchInput && (
          <SearchResultContainer>
            <FilterListContainer
              style={[
                {backgroundColor: '#ffffff'},
                styles.dentalFilterListShadow,
              ]}>
              <ScrollView
                contentContainerStyle={[{paddingTop: 12, paddingBottom: 12}]}
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {selectedDayList.length === 0 && timeFilter === "" && (
                <TouchableWithoutFeedback onPress={() => clickDayFilter()}>
                  <FilterItemContainer
                    style={[{marginLeft: 16}]}>
                    <FilterItemText>{'방문일자'}</FilterItemText>
                  </FilterItemContainer>
                </TouchableWithoutFeedback>
                )}
                {selectedDayList.length === 1 && (
                <TouchableWithoutFeedback onPress={() => clickDayFilter()}>
                  <FilterItemContainer
                    style={[
                      {
                        marginLeft: 16,
                        backgroundColor: '#00D1FF',
                        borderColor: '#00D1FF',
                      },
                    ]}>
                    <FilterItemText style={{color: '#ffffff'}}>
                      {selectedDayList[0].day + '요일 ' + timeFilter.slice(0, 5)}
                    </FilterItemText>
                  </FilterItemContainer>
                </TouchableWithoutFeedback>
              )}
              {selectedDayList.length > 1 && (
                <TouchableWithoutFeedback onPress={() => clickDayFilter()}>
                  <FilterItemContainer
                    style={[
                      {
                        marginLeft: 16,
                        backgroundColor: '#00D1FF',
                        borderColor: '#00D1FF',
                      },
                    ]}>
                    {selectedDayList.map((item: any, index: number) => {
                      if (index === 0) {
                        return (
                          <FilterItemText
                            key={index}
                            style={{color: '#ffffff'}}>
                            {item.day}
                          </FilterItemText>
                        );
                      } else if(index === selectedDayList.length - 1) {
                        return (
                          <FilterItemText
                            key={index}
                            style={{color: '#ffffff'}}>
                            {', ' + item.day}
                          </FilterItemText>
                        );
                      } else {
                        return (
                          <FilterItemText
                          key={index}
                          style={{color: "#ffffff"}}>
                            {', ' + item.day}
                          </FilterItemText>
                        )
                      }
                    })}
                    <FilterItemText
                    style={{color: "#ffffff"}}>
                      {" " + timeFilter.slice(0, 5)}
                    </FilterItemText>
                  </FilterItemContainer>
                </TouchableWithoutFeedback>
              )}
              {selectedDayList.length === 0 && timeFilter !== "" && (
                <TouchableWithoutFeedback onPress={() => clickDayFilter()}>
                <FilterItemContainer
                  style={[
                    {
                      marginLeft: 16,
                      backgroundColor: '#00D1FF',
                      borderColor: '#00D1FF',
                    },
                  ]}>
                  <FilterItemText style={{color: '#ffffff'}}>
                    {'오늘 ' + timeFilter.slice(0, 5)}
                  </FilterItemText>
                </FilterItemContainer>
              </TouchableWithoutFeedback>
              )}
                <TouchableWithoutFeedback onPress={() => changeSpecialistFilter()}>
                <FilterItemContainer
                  style={[
                    {marginLeft: 8},
                    specialistFilter === 't' && {
                      backgroundColor: '#00D1FF',
                      borderColor: '#00D1FF',
                    },
                  ]}>
                  <FilterItemText
                    style={specialistFilter === 't' && {color: '#ffffff'}}>
                    {'교정 전문의'}
                  </FilterItemText>
                </FilterItemContainer>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => changeNightCareFilter()}>
                <FilterItemContainer
                  style={[
                    {marginLeft: 8},
                    nightCareFilter === 't' && {
                      backgroundColor: '#00D1FF',
                      borderColor: '#00D1FF',
                    },
                  ]}>
                  <FilterItemText
                    style={nightCareFilter === 't' && {color: '#ffffff'}}>
                    {'야간 진료'}
                  </FilterItemText>
                </FilterItemContainer>
              </TouchableWithoutFeedback>
                {/* <TouchableWithoutFeedback onPress={() => clickTimeFilter()}>
                  <FilterItemContainer
                    style={[
                      {marginLeft: 8},
                      timeFilter !== '' && {
                        backgroundColor: '#ffffff',
                        borderColor: '#131F3C',
                      },
                    ]}>
                    <FilterItemText
                      style={timeFilter !== '' && {color: '#131F3C'}}>
                      {timeFilter ? timeFilter.slice(0, 5) : '방문시간'}
                    </FilterItemText>
                  </FilterItemContainer>
                </TouchableWithoutFeedback> */}
                <TouchableWithoutFeedback onPress={() => changeHolidayFilter()}>
                  <FilterItemContainer
                    style={[
                      {marginLeft: 8},
                      holidayFilter && {
                        backgroundColor: '#00D1FF',
                        borderColor: '#00D1FF',
                      },
                    ]}>
                    <FilterItemText style={holidayFilter && {color: '#ffffff'}}>
                      {'일요일･공휴일 진료'}
                    </FilterItemText>
                  </FilterItemContainer>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => changeGoodDentalFilter()}>
                <FilterItemContainer
                  style={[
                    {marginLeft: 8},
                    goodDentalFilter === 't' && {
                      backgroundColor: '#00D1FF',
                      borderColor: '#00D1FF',
                    }
                  ]}>
                  <FilterItemText
                    style={goodDentalFilter === 't' && {color: '#ffffff'}}>
                    {'좋은 치과 캠페인'}
                  </FilterItemText>
                </FilterItemContainer>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => changeParkingFilter()}>
                  <FilterItemContainer
                    style={[
                      {marginLeft: 8, marginRight: 16},
                      parkingFilter === 'y' && {
                        backgroundColor: '#00D1FF',
                        borderColor: '#00D1FF',
                      },
                    ]}>
                    <FilterItemText
                      style={parkingFilter === 'y' && {color: '#ffffff'}}>
                      {'주차가능'}
                    </FilterItemText>
                  </FilterItemContainer>
                </TouchableWithoutFeedback>
              </ScrollView>
            </FilterListContainer>
            <DentalListContainer>
              {searchedDentalArray.length > 0 && (
                <FlatList
                  ref={searchedDentalFlatListRef}
                  contentContainerStyle={{
                    backgroundColor: '#F5F7F9',
                    paddingBottom: hasNotch()
                      ? hp('6.8%')
                      : hp('7.5%'),
                  }}
                  refreshing={refreshingDentalFlat}
                  onRefresh={onRefreshDentalFlat}
                  showsVerticalScrollIndicator={false}
                  data={searchedDentalArray}
                  renderItem={renderDentalItem}
                  onEndReached={onEndReachedDentalFlat}
                  onEndReachedThreshold={1}
                  ListFooterComponent={renderFooterIndicator}
                  keyExtractor={(item, index) => `${index}`}
                />
              )}
              {searchedDentalArray.length === 0 && !loadingSearchDental && (
                <NoSearchedDentalContainer>
                  <NoDataImage
                    source={require('~/Assets/Images/ic_noData.png')}
                  />
                  <NoDataText>{'검색결과가 없습니다.'}</NoDataText>
                </NoSearchedDentalContainer>
              )}
              {loadingSearchDental && (
                <LoadingSearchContainer>
                  <ActivityIndicator />
                </LoadingSearchContainer>
              )}
            </DentalListContainer>
          </SearchResultContainer>
        )}
        {isFocusedSearchInput && (
          <AutoCompletedKeywordFlatList
            inputQuery={query}
            deleteAllSearchRecord={deleteAllSearchRecord}
            deleteSingleSearchRecord={deleteSingleSearchRecord}
            searchRecordArray={dentalSearchRecordArray}
            searchTotalKeyword={searchTotalKeyword}
            autoCompletedKeywordArr={autoCompletedKeywordArray}
          />
        )}
      </BodyContainer>
      <Modal
        isVisible={visibleDayFilterModal}
        style={styles.dayFilterModalView}
        onBackdropPress={() => cancelDayFilter()}
        backdropOpacity={0.25}>
        <DetailFilterModalContainer>
          <DetailFilterHeaderContainer>
            <DetailFilterTitleText>{'방문일자 설정'}</DetailFilterTitleText>
          </DetailFilterHeaderContainer>
          <VisitDateFilterModalSubLabelContainer>
            <ModalSubLabelText>{"방문요일 선택"}</ModalSubLabelText>
          </VisitDateFilterModalSubLabelContainer>
          <DetailFilterListContainer>
            <FlatList
              contentContainerStyle={{
                paddingBottom: 16,
                paddingLeft: 16,
                paddingRight: 16,
              }}
              columnWrapperStyle={{
                justifyContent: 'space-between',
                paddingTop: 16,
              }}
              data={dayList}
              keyExtractor={(item, index) => `${index}`}
              numColumns={5}
              renderItem={renderDayFilterItem}
            />
            <VisitDateFilterModalSubLabelContainer>
              <ModalSubLabelText>{"방문시간 선택"}</ModalSubLabelText>
            </VisitDateFilterModalSubLabelContainer>
            <TimePickerContainer>
              <Picker
                itemStyle={{
                  fontSize: 20,
                  fontWeight: '700',
                  lineHeight: 24,
                  color: '#131F3C',
                }}
                style={{width: wp('20%'), height: hp('26%')}}
                onValueChange={(itemValue, itemIndex) =>
                  onValueChangeTimeSlotPicker(itemValue, itemIndex)
                }
                selectedValue={timeSlotPickerValue}>
                <Picker.Item label={'오전'} value="오전" />
                <Picker.Item label={'오후'} value="오후" />
              </Picker>
              <Picker
                itemStyle={{
                  fontSize: 20,
                  fontWeight: '700',
                  lineHeight: 24,
                  color: '#131F3C',
                }}
                selectedValue={hourPickerValue}
                onValueChange={(itemValue, itemIndex) =>
                  onValueChangeHourPicker(itemValue, itemIndex)
                }
                style={{width: wp('20%'), height: hp('26%')}}>
                <Picker.Item label={'1'} value="1" />
                <Picker.Item label={'2'} value="2" />
                <Picker.Item label={'3'} value="3" />
                <Picker.Item label={'4'} value="4" />
                <Picker.Item label={'5'} value="5" />
                <Picker.Item label={'6'} value="6" />
                <Picker.Item label={'7'} value="7" />
                <Picker.Item label={'8'} value="8" />
                <Picker.Item label={'9'} value="9" />
                <Picker.Item label={'10'} value="10" />
                <Picker.Item label={'11'} value="11" />
                <Picker.Item label={'12'} value="12" />
              </Picker>
              <TimePickerLabelText>{':'}</TimePickerLabelText>
              <Picker
                itemStyle={{
                  fontSize: 20,
                  fontWeight: '700',
                  lineHeight: 24,
                  color: '#131F3C',
                }}
                style={{width: wp('20%'), height: hp('26%')}}
                onValueChange={(itemValue, itemIndex) =>
                  onValueChangeMinutePicker(itemValue, itemIndex)
                }
                selectedValue={minutePickerValue}>
                <Picker.Item label={'00'} value="00" />
                <Picker.Item label={'15'} value="15" />
                <Picker.Item label={'30'} value="30" />
                <Picker.Item label={'45'} value="45" />
              </Picker>
            </TimePickerContainer>
          </DetailFilterListContainer>
          <DetailFilterFooterContainer>
            <TouchableWithoutFeedback onPress={() => initializeDayFilter()}>
              <InitializeFilterContainer>
                <InitializeFilterText>{'방문일자 초기화'}</InitializeFilterText>
                <InitializeFilterIcon
                  source={require('~/Assets/Images/Map/ic_initialize.png')}
                />
              </InitializeFilterContainer>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => registerDayFilter()}>
              <RegisterFilterButton>
                <RegisterFilterText>{'적용하기'}</RegisterFilterText>
              </RegisterFilterButton>
            </TouchableWithoutFeedback>
          </DetailFilterFooterContainer>
        </DetailFilterModalContainer>
      </Modal>
      <Modal
        isVisible={visibleTimeFilterModal}
        style={styles.timeFilterModalView}
        onBackdropPress={() => cancelTimeFilter()}
        backdropOpacity={0.25}>
        <DetailFilterModalContainer>
          <DetailFilterHeaderContainer>
            <DetailFilterTitleText>{'방문시간 설정'}</DetailFilterTitleText>
          </DetailFilterHeaderContainer>
          <TimeFilterModalContainer>
            <TimePickerContainer>
              <Picker
                itemStyle={{
                  fontSize: 20,
                  fontWeight: '700',
                  lineHeight: 24,
                  color: '#131F3C',
                }}
                style={{width: wp('20%'), height: hp('26%')}}
                onValueChange={(itemValue, itemIndex) =>
                  onValueChangeTimeSlotPicker(itemValue, itemIndex)
                }
                selectedValue={timeSlotPickerValue}>
                <Picker.Item label={'오전'} value="오전" key={1} />
                <Picker.Item label={'오후'} value="오후" key={2} />
              </Picker>
              <Picker
                itemStyle={{
                  fontSize: 20,
                  fontWeight: '700',
                  lineHeight: 24,
                  color: '#131F3C',
                }}
                selectedValue={hourPickerValue}
                onValueChange={(itemValue, itemIndex) =>
                  onValueChangeHourPicker(itemValue, itemIndex)
                }
                style={{width: wp('20%'), height: hp('26%')}}>
                <Picker.Item label={'1'} value="1" key={1} />
                <Picker.Item label={'2'} value="2" key={2} />
                <Picker.Item label={'3'} value="3" key={3} />
                <Picker.Item label={'4'} value="4" key={4} />
                <Picker.Item label={'5'} value="5" key={5} />
                <Picker.Item label={'6'} value="6" key={6} />
                <Picker.Item label={'7'} value="7" key={7} />
                <Picker.Item label={'8'} value="8" key={8} />
                <Picker.Item label={'9'} value="9" key={9} />
                <Picker.Item label={'10'} value="10" key={10} />
                <Picker.Item label={'11'} value="11" key={11} />
                <Picker.Item label={'12'} value="12" key={12} />
              </Picker>
              <TimePickerLabelText>{':'}</TimePickerLabelText>
              <Picker
                itemStyle={{
                  fontSize: 20,
                  fontWeight: '700',
                  lineHeight: 24,
                  color: '#131F3C',
                }}
                style={{width: wp('20%'), height: hp('26%')}}
                onValueChange={(itemValue, itemIndex) =>
                  onValueChangeMinutePicker(itemValue, itemIndex)
                }
                selectedValue={minutePickerValue}>
                <Picker.Item label={'00'} value="00" key={1} />
                <Picker.Item label={'15'} value="15" key={2} />
                <Picker.Item label={'30'} value="30" key={3} />
                <Picker.Item label={'45'} value="45" key={4} />
              </Picker>
            </TimePickerContainer>
            <DetailFilterFooterContainer>
              <TouchableWithoutFeedback onPress={() => initializeTimeFilter()}>
                <InitializeFilterContainer>
                  <InitializeFilterText>
                    {'방문시간 초기화'}
                  </InitializeFilterText>
                  <InitializeFilterIcon
                    source={require('~/Assets/Images/Map/ic_initialize.png')}
                  />
                </InitializeFilterContainer>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => registerTimeFilter()}>
                <RegisterFilterButton>
                  <RegisterFilterText>{'적용하기'}</RegisterFilterText>
                </RegisterFilterButton>
              </TouchableWithoutFeedback>
            </DetailFilterFooterContainer>
          </TimeFilterModalContainer>
        </DetailFilterModalContainer>
      </Modal>
      {!isFocusedSearchInput && (
        <TouchableWithoutFeedback onPress={() => moveToDentalMap()}>
          <ViewMapButton>
            <ViewMapIcon
              source={require('~/Assets/Images/Map/ic_viewDentalMap.png')}
            />
            <ViewMapText>{'지도보기'}</ViewMapText>
          </ViewMapButton>
        </TouchableWithoutFeedback>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  dayFilterModalView: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  timeFilterModalView: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  detailFilterItemShadow: {
    shadowOffset: {
      width: 0.5,
      height: 1.5,
    },
    shadowRadius: 1,
    shadowOpacity: 0.2,
  },
  dentalFilterListShadow: {
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowRadius: 8,
    shadowOpacity: 0.03,
  },
});

export default DentalTotalSearchScreen;
