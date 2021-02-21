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
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Picker} from '@react-native-picker/picker';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';
import {useSelector, useDispatch} from 'react-redux';
import allActions from '~/actions';
import AboveKeyboard from 'react-native-above-keyboard';
import ActionSheet from 'react-native-actionsheet';
import Modal from 'react-native-modal';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import DeviceInfo from 'react-native-device-info';

import {isIphoneX} from 'react-native-iphone-x-helper';

// Local Component
import DentalListItem from '~/Components/Presentational/DentalListItem';
import TouchBlockIndicatorCover from '~/Components/Presentational/TouchBlockIndicatorCover';
import AutoCompletedKeywordFlatList from '~/Components/Presentational/DentalTotalSearchScreen/AutoCompletedKeywordFlatList';
import DentalSearchResultList from '~/Components/Presentational/DentalTotalSearchScreen/DentalSearchResultList';
import {callDentalPhoneNumber} from '~/method/callDentalPhoneNumber';

// Route
import GETDentalTotalSearch from '~/Routes/Search/GETDentalTotalSearch';
import GETAroundDental from '~/Routes/Dental/GETAroundDental';
import GETDentalKeywordAutoComplete from '~/Routes/Search/GETDentalKeywordAutoComplete';
import DELETESearchRecord from '~/Routes/Search/DELETESearchRecord';
import GETSearchRecord from '~/Routes/Search/GETSearchRecord';

const Container = Styled.View`
flex: 1;
background-color: #ffffff;
padding-top: ${getStatusBarHeight()}px;
`;

const HeaderBar = Styled.View`
width: ${wp('100%')}px;
 height: ${wp('14.1%') + getStatusBarHeight()}px;
 margin-top: ${-getStatusBarHeight()}px;
 padding-top: ${getStatusBarHeight()}px;
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
padding-right: 16px;
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
padding: 0px 10px 0px 16px;
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
border-width: 0.5px;
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
background-color: #ffffff;
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
position: absolute;
right: 0px;
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
flex: 1;
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

let offset = 0;
let limit = 20;
let sort = 'accuracy';

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

  const [query, setQuery] = useState<string>('');

  const timeFilterActionSheet = createRef<any>();
  const searchInputRef = createRef<any>();

  const currentLocation = useSelector((state: any) => state.currentUser)
    .currentLocation;
  const dispatch = useDispatch();
  const jwtToken = useSelector((state: any) => state.currentUser.jwtToken);

  const todayIndex = new Date().getDay();

  const long = route.params?.currentMapLongitude;
  const lat = route.params?.currentMapLatitude;

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

  // 병원 지도 관련 redux state
  const dentalMapRedux = useSelector((state: any) => state.dentalMap);
  const searchedKeyword = dentalMapRedux.searchedKeyword;
  const searchedDentalArray = dentalMapRedux.searchedDentalArray;
  const autoCompletedKeywordArr = dentalMapRedux.autoCompletedKeywordArr;

  const dentalSearchRecordArray = useSelector((state: any) => state.currentUser).dentalSearchRecordArray;

  const isNearDentalList = useRef<boolean>(route.params?.isNearDentalList);
  const noMoreDentalData = useRef<boolean>(false);

  const keywordRef = useRef<any>();

  useEffect(() => {
    return () => {
      dispatch(allActions.dentalMapActions.setAutoCompletedKeywordArr([]));
    };
  }, []);

  const goBack = () => {
    navigation.goBack();
  };

  const moveToDentalMap = () => {
    console.log('moveToDentalMap searchedDentalArray', searchedDentalArray);

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
      offset: offset,
      limit: limit,
      searchedDentalLocation: searchedDentalLocation,
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
      dispatch(allActions.dentalMapActions.setAutoCompletedKeywordArr([]));
    } else {
      autoCompleteKeyword(text);
    }
  };

  const onSubmitSearchInput = (keyword: string) => {
    console.log('onSubmitSearchInput keyword', keyword);

    if (keyword.trim() !== '') {
      setIsFocusedSearchInput(false);
      searchDental(keyword);
    }
  };

  const autoCompleteKeyword = (query: string) => {
    GETDentalKeywordAutoComplete({jwtToken, query})
      .then((response: any) => {
        console.log('GETDentalKeywordAutoComplete response', response);

        if (query === inputingText) {
          dispatch(
            allActions.dentalMapActions.setAutoCompletedKeywordArr(response),
          );
        } else {
        }
      })
      .catch((error) => {
        console.log('GETDentalKeywordAutoComplete error', error);
      });
  };

  const searchDental = (query: string, category: string) => {
    setLoadingSearchDental(true);
    GETDentalTotalSearch({
      jwtToken,
      offset,
      limit,
      lat,
      long,
      category,
      query,
      sort,
      dayFilter,
      timeFilter,
      holidayFilter,
      parkingFilter,
    })
      .then((response: any) => {
        console.log('GETDentalTotalSearch response', response);
        setLoadingSearchDental(false);

        if (response.length > 0) {
          dispatch(
            allActions.dentalMapActions.setSearchedDentalArray(response),
          );
          isNearDentalList.current = false;
          if(response.length < 20) {
            noMoreDentalData.current = true;
          }
        } else {
          dispatch(allActions.dentalMapActions.setSearchedDentalArray([]));
        }

        setTimeout(() => {
          getSearchRecord()
        }, 100)
      })
      .catch((error: any) => {
        setLoadingSearchDental(false);
        console.log('GETDentalTotalSearch error', error);
      });
  };

  const getSearchRecord = () => {
    GETSearchRecord({jwtToken})
      .then(async (response: any) => {
        console.log("GETSearchRecord response", response);
        dispatch(allActions.userActions.setSearchRecord(response));

        const getDentalSearchRecord = async (searchRecordArray: any) => {
          let tmpDentalSearchRecordArray = new Array();
          await searchRecordArray.forEach((item: any, index: number) => {
            if(item.category === 'clinic' || item.category === 'city') {
              return tmpDentalSearchRecordArray.push(item);
            }
          })

          return tmpDentalSearchRecordArray
        } 

        const tmpDentalSearchRecordArray = await getDentalSearchRecord(response);
        console.log("GETSearchRecord tmpDentalSearchRecordArray", tmpDentalSearchRecordArray);
        dispatch(allActions.userActions.setDentalSearchRecord(tmpDentalSearchRecordArray));
        
      })
      .catch((error) => {
        console.log('GETSearchRecord error', error);
      });
  }

  const filterDental = (
    query: string,
    tmpDayFilter: any,
    tmpTimeFilter: string,
    tmpHolidayFilter: boolean,
    tmpParkingFilter: string,
  ) => {
    setLoadingSearchDental(true);

    const dayFilter = tmpDayFilter;
    const timeFilter = tmpTimeFilter;
    const parkingFilter = tmpParkingFilter;
    const holidayFilter = tmpHolidayFilter;
    const category = keywordRef?.current?.category;

    GETDentalTotalSearch({
      jwtToken,
      offset,
      limit,
      lat,
      long,
      category,
      query,
      sort,
      dayFilter,
      timeFilter,
      holidayFilter,
      parkingFilter,
    })
      .then((response: any) => {
        console.log('filterDental 실행');
        setLoadingSearchDental(false);
        console.log('GETDentalTotalSearch response', response);

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

  const getNearDental = () => {
    const sort = 'd';
    GETAroundDental({
      jwtToken,
      lat,
      long,
      sort,
      timeFilter,
      dayFilter,
      holidayFilter,
      parkingFilter,
    })
      .then((response: any) => {
        console.log(
          'GETAroundDental response in DentalTotalSearchScreen',
          response,
        );
        setRefreshingDentalFlat(false);
        dispatch(allActions.dentalMapActions.setSearchedDentalArray(response));
      })
      .catch((error) => {
        console.log('GETAroundDental error', error);
        setRefreshingDentalFlat(false);
      });
  };

  const filterNearDental = (
    tmpDayFilter: any,
    tmpTimeFilter: string,
    tmpHolidayFilter: boolean,
    tmpParkingFilter: string,
  ) => {
    setLoadingSearchDental(true);

    const sort = 'd';
    const timeFilter = tmpTimeFilter;
    const dayFilter = tmpDayFilter;
    const parkingFilter = tmpParkingFilter;
    const holidayFilter = tmpHolidayFilter;

    GETAroundDental({
      jwtToken,
      lat,
      long,
      sort,
      timeFilter,
      dayFilter,
      holidayFilter,
      parkingFilter,
    })
      .then((response) => {
        console.log(
          'GETAroundDental response in DentalTotalSearchScreen',
          response,
        );
        setLoadingSearchDental(false);
        dispatch(allActions.dentalMapActions.setSearchedDentalArray(response));
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
    dispatch(allActions.dentalFilterActions.setHolidayFilter(!holidayFilter));

    if (isNearDentalList.current) {
      filterNearDental(dayFilter, timeFilter, !holidayFilter, parkingFilter);
    } else {
      filterDental(query, dayFilter, timeFilter, !holidayFilter, parkingFilter);
    }
  };

  const changeParkingFilter = () => {
    if (parkingFilter === 'y') {
      dispatch(allActions.dentalFilterActions.setParkingFilter('n'));

      if (isNearDentalList.current) {
        filterNearDental(dayFilter, timeFilter, holidayFilter, 'n');
      } else {
        filterDental(query, dayFilter, timeFilter, holidayFilter, 'n');
      }
    } else if (parkingFilter === 'n') {
      dispatch(allActions.dentalFilterActions.setParkingFilter('y'));
      if (isNearDentalList.current) {
        filterNearDental(dayFilter, timeFilter, holidayFilter, 'y');
      } else {
        filterDental(query, dayFilter, timeFilter, holidayFilter, 'y');
      }
    }
  };

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
    if (selectedDayList.length > 0) {
      const tmpDayFilter = new Array([]);

      dispatch(allActions.dentalFilterActions.initializeDayList());
      dispatch(allActions.dentalFilterActions.setSelectedDayList([]));

      if (isNearDentalList.current) {
        filterNearDental(
          tmpDayFilter,
          timeFilter,
          holidayFilter,
          parkingFilter,
        );
      } else {
        filterDental(
          query,
          tmpDayFilter,
          timeFilter,
          holidayFilter,
          parkingFilter,
        );
      }
    }

    setVisibleDayFilterModal(false);
  };

  const registerDayFilter = () => {
    var tmpDayList = dayList;

    var tmpSelectedDayList = new Array();
    var tmpDayFilter = new Array();

    tmpDayList.forEach((item: any, index: number) => {
      if (item.selected) {
        tmpDayFilter.push(item.value);
        tmpSelectedDayList.push(item);
      }
    });

    if (JSON.stringify(tmpDayFilter) !== JSON.stringify(dayFilter)) {
      dispatch(allActions.dentalFilterActions.setDayFilter(tmpDayFilter));
      dispatch(
        allActions.dentalFilterActions.setSelectedDayList(tmpSelectedDayList),
      );
      offset = 0;

      if (isNearDentalList.current) {
        filterNearDental(
          tmpDayFilter,
          timeFilter,
          holidayFilter,
          parkingFilter,
        );
      } else {
        filterDental(
          query,
          tmpDayFilter,
          timeFilter,
          holidayFilter,
          parkingFilter,
        );
      }
    }

    setVisibleDayFilterModal(false);
  };

  const cancelTimeFilter = () => {
    setVisibleTimeFilterModal(false);
  };

  const deleteAllSearchRecord = () => {
    const searchId = 'all';
    dispatch(allActions.userActions.setDentalSearchRecord([]));
    dispatch(allActions.userActions.setSearchRecord([]));

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
    dispatch(allActions.userActions.deleteSearchRecord(id));

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
        );
      } else {
        filterDental(
          query,
          dayFilter,
          tmpTimeFilter,
          holidayFilter,
          parkingFilter,
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
        dispatch(allActions.dentalFilterActions.setTimeFilter(formattedTime));

        if (isNearDentalList.current) {
          filterNearDental(
            dayFilter,
            formattedTime,
            holidayFilter,
            parkingFilter,
          );
        } else {
          filterDental(
            query,
            dayFilter,
            formattedTime,
            holidayFilter,
            parkingFilter,
          );
        }
      }
    } else if (timeSlotPickerValue == '오후') {
      const formattedTime =
        Number(hourPickerValue) + 12 + ':' + minutePickerValue + ':00';
      dispatch(allActions.dentalFilterActions.setTimeFilter(formattedTime));

      if (timeFilter !== formattedTime) {
        dispatch(allActions.dentalFilterActions.setTimeFilter(formattedTime));

        if (isNearDentalList.current) {
          filterNearDental(
            dayFilter,
            formattedTime,
            holidayFilter,
            parkingFilter,
          );
        } else {
          filterDental(
            query,
            dayFilter,
            formattedTime,
            holidayFilter,
            parkingFilter,
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
    if (
      !noMoreDentalData.current &&
      !loadingMoreDental &&
      !isNearDentalList.current
    ) {
      setLoadingMoreDental(true);
      offset = offset + 20;
      getMoreDentalList();
    }
  };

  const getMoreDentalList = () => {
    console.log('getMoreDentalList inputedKeyword', inputedKeyword);

    const category = keywordRef?.current?.category;

    GETDentalTotalSearch({
      jwtToken,
      offset,
      limit,
      lat,
      long,
      category,
      query,
      sort,
      dayFilter,
      timeFilter,
      holidayFilter,
      parkingFilter,
    })
      .then((response: any) => {
        console.log('병원 더불러오기 GETDentalTotalSearch response', response);
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

  const onRefreshDentalFlat = () => {
    setRefreshingDentalFlat(true);
    offset = 0;
    const category = keywordRef?.current?.category;

    if (isNearDentalList.current) {
      const sort = 'd';
      GETAroundDental({
        jwtToken,
        lat,
        long,
        sort,
        timeFilter,
        dayFilter,
        holidayFilter,
        parkingFilter,
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
        offset,
        limit,
        lat,
        long,
        category,
        query,
        sort,
        dayFilter,
        timeFilter,
        holidayFilter,
        parkingFilter,
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

  const selectAutoCompletedKeyword = (keyword: string, category: string) => {
    console.log('selectAutoCompletedKeyword keyword', keyword);
    console.log('selectAutoCompletedKeyword category', category);

    Keyboard.dismiss();

    setIsFocusedSearchInput(false);
    setQuery(keyword);
    searchDental(keyword, category);

    keywordRef.current = {
      name: keyword,
      category: category,
    };
  };

  const clearTextInput = () => {
    setQuery('');
    searchInputRef.current.clear();
    searchInputRef.current.focus();
  };

  const clickDentalCallReservation = (phoneNumber: number, dentalId: number) => {
    callDentalPhoneNumber(phoneNumber, jwtToken, dentalId);
  }

  const renderFooterIndicator = () => {
    if (loadingMoreDental) {
      return (
        <FooterIndicatorContainer>
          <ActivityIndicator />
        </FooterIndicatorContainer>
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
        address={item.address}
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
            goBack();
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
            source={require('~/Assets/Images/Search/ic_clearText.png')}/>
          </ClearTextButtonContainer>
          </TouchableWithoutFeedback>
          )}
        </SearchInputContainer>
      </HeaderBar>
      <BodyContainer>
        <SearchResultContainer
          style={!isFocusedSearchInput ? {zIndex: 1} : {zIndex: 0, opacity: 0}}>
          <FilterListContainer
            style={[
              {backgroundColor: '#ffffff'},
              styles.dentalFilterListShadow,
            ]}>
            <ScrollView
              contentContainerStyle={[{paddingTop: 12, paddingBottom: 12}]}
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {selectedDayList.length === 0 && (
                <TouchableWithoutFeedback onPress={() => clickDayFilter()}>
                  <FilterItemContainer style={[{marginLeft: 16}]}>
                    <FilterItemText>{'방문일'}</FilterItemText>
                  </FilterItemContainer>
                </TouchableWithoutFeedback>
              )}
              {selectedDayList.length === 1 && (
                <TouchableWithoutFeedback onPress={() => clickDayFilter()}>
                  <FilterItemContainer
                    style={[
                      {
                        marginLeft: 16,
                        backgroundColor: '#ffffff',
                        borderColor: '#9AA2A9',
                      },
                    ]}>
                    <FilterItemText style={{color: '#4E525D'}}>
                      {selectedDayList[0].day + '요일'}
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
                        backgroundColor: '#ffffff',
                        borderColor: '#9AA2A9',
                      },
                    ]}>
                    {selectedDayList.map((item: any, index: number) => {
                      if (index === 0) {
                        return (
                          <FilterItemText
                            key={index}
                            style={{color: '#4E525D'}}>
                            {item.day + '요일'}
                          </FilterItemText>
                        );
                      } else {
                        return (
                          <FilterItemText
                            key={index}
                            style={{color: '#4E525D'}}>
                            {', ' + item.day + '요일'}
                          </FilterItemText>
                        );
                      }
                    })}
                  </FilterItemContainer>
                </TouchableWithoutFeedback>
              )}
              <TouchableWithoutFeedback onPress={() => clickTimeFilter()}>
                <FilterItemContainer
                  style={[
                    {marginLeft: 8},
                    timeFilter !== '' && {
                      backgroundColor: '#ffffff',
                      borderColor: '#9AA2A9',
                    },
                  ]}>
                  <FilterItemText
                    style={timeFilter !== '' && {color: '#4E525D'}}>
                    {timeFilter ? timeFilter.slice(0, 5) : '방문시간'}
                  </FilterItemText>
                </FilterItemContainer>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => changeHolidayFilter()}>
                <FilterItemContainer
                  style={[
                    {marginLeft: 8},
                    holidayFilter && {
                      backgroundColor: '#ffffff',
                      borderColor: '#9AA2A9',
                    },
                  ]}>
                  <FilterItemText style={holidayFilter && {color: '#4E525D'}}>
                    {'일요일･공휴일 진료'}
                  </FilterItemText>
                </FilterItemContainer>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => changeParkingFilter()}>
                <FilterItemContainer
                  style={[
                    {marginLeft: 8, marginRight: 16},
                    parkingFilter === 'y' && {
                      backgroundColor: '#ffffff',
                      borderColor: '#9AA2A9',
                    },
                  ]}>
                  <FilterItemText
                    style={parkingFilter === 'y' && {color: '#4E525D'}}>
                    {'주차가능'}
                  </FilterItemText>
                </FilterItemContainer>
              </TouchableWithoutFeedback>
            </ScrollView>
          </FilterListContainer>
          <DentalListContainer>
            {searchedDentalArray.length > 0 && (
              <FlatList
              contentContainerStyle={{backgroundColor: "#F5F7F9", paddingBottom: DeviceInfo.hasNotch() ? hp('6.8%') : hp('7.5%')}}
                refreshing={refreshingDentalFlat}
                onRefresh={onRefreshDentalFlat}
                showsVerticalScrollIndicator={false}
                data={searchedDentalArray}
                renderItem={renderDentalItem}
                onEndReached={onEndReachedDentalFlat}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderFooterIndicator}
              />
            )}
            {searchedDentalArray.length === 0 && !loadingSearchDental && (
              <NoSearchedDentalContainer>
                <NoDataImage
                source={require('~/Assets/Images/ic_noData.png')}/>
                <NoDataText>
                  {'검색결과가 없습니다.'}
                </NoDataText>
              </NoSearchedDentalContainer>
            )}
            {loadingSearchDental && (
              <LoadingSearchContainer>
                <ActivityIndicator />
              </LoadingSearchContainer>
            )}
          </DentalListContainer>
        </SearchResultContainer>
        <AutoCompletedKeywordContainer
          style={isFocusedSearchInput ? {zIndex: 1} : {zIndex: 0, opacity: 0}}>
          <AutoCompletedKeywordFlatList
          deleteAllSearchRecord={deleteAllSearchRecord}
          deleteSingleSearchRecord={deleteSingleSearchRecord}
          searchRecordArray={dentalSearchRecordArray}
          searchTotalKeyword={selectAutoCompletedKeyword}
          query={query}
          autoCompletedKeywordArr={autoCompletedKeywordArr}/>
        </AutoCompletedKeywordContainer>
      </BodyContainer>
      <Modal
        isVisible={visibleDayFilterModal}
        style={styles.dayFilterModalView}
        onBackdropPress={() => cancelDayFilter()}
        swipeDirection={['down']}
        onSwipeComplete={() => setVisibleDayFilterModal(false)}
        backdropOpacity={0.25}>
        <DetailFilterModalContainer>
          <DetailFilterHeaderContainer>
            <DetailFilterTitleText>{'방문일 설정'}</DetailFilterTitleText>
          </DetailFilterHeaderContainer>
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
          </DetailFilterListContainer>
          <DetailFilterFooterContainer>
            <TouchableWithoutFeedback onPress={() => initializeDayFilter()}>
              <InitializeFilterContainer>
                <InitializeFilterText>{'방문일 초기화'}</InitializeFilterText>
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
