import React, {useEffect, useState, useRef, createRef} from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import Styled from 'styled-components/native';
import {
  TouchableWithoutFeedback,
  FlatList,
  ScrollView,
  Keyboard,
  StyleSheet,
  Picker,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';
import {useSelector, useDispatch} from 'react-redux';
import allActions from '~/actions';
import AboveKeyboard from 'react-native-above-keyboard';
import ActionSheet from 'react-native-actionsheet';
import Modal from 'react-native-modal';
import {getStatusBarHeight} from 'react-native-status-bar-height';

import {isIphoneX} from 'react-native-iphone-x-helper';

// Local Component
import DentalListItem from '~/Components/Presentational/DentalListItem';
import TouchBlockIndicatorCover from '~/Components/Presentational/TouchBlockIndicatorCover';
import AutoCompletedKeywordFlatList from '~/Components/Presentational/AutoCompletedKeywordFlatList';
import DentalSearchResultList from '~/Components/Presentational/DentalTotalSearchScreen/DentalSearchResultList';

// Route
import GETDentalTotalSearch from '~/Routes/Search/GETDentalTotalSearch';
import GETAroundDental from '~/Routes/Dental/GETAroundDental';
import GETDentalKeywordAutoComplete from '~/Routes/Search/GETDentalKeywordAutoComplete';

const Container = Styled.View`
flex: 1;
background-color: #ffffff;
padding-top: ${getStatusBarHeight()}px;
`;

const HeaderBar = Styled.View`
width: ${wp('100%')}px;
height: ${hp('7%')}px;
align-items: center;
flex-direction: row;
background-color: #ffffff;
border-bottom-width: 0.5px;
border-color: #00D1FF;
`;

const BodyContainer = Styled.View`
 flex: 1;
 background-color: #ffffff;
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
line-height: 24px;
color: #131F3C;
`;

const BackIconTouchableWithoutFeedback = Styled(
  TouchableWithoutFeedback as new () => TouchableWithoutFeedback,
)`
`;

const BackIconView = Styled.View`
padding: 17px 10px 0px 16px;
height: ${hp('7%')}px;
`;

const BackIconImage = Styled.Image`
width: ${wp('6.4%')}px;
height: ${wp('6.4%')}px;
`;
const AboveKeyboardContainer = Styled.View`
width: ${wp('100%')}px;
position: absolute;
bottom: 0;
padding-top: 10px;
padding-bottom: 10px;
`;

const MapButtonContainer = Styled.View`
width: ${wp('100%')}px;
align-items: center;
justify-content: center;
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

const DetailFilterHeaderLeftContainer = Styled.View`
padding-top: ${hp('3.2%')}px;
padding-bottom: ${hp('3.2%')}px;
padding-left: ${wp('6.4%')}px;
padding-right: ${wp('6.4%')}px;
align-items: center;
justify-content: center;
`;

const DetailFilterHeaderRightContainer = Styled.View`
padding-top: ${hp('3.2%')}px;
padding-bottom: ${hp('3.2%')}px;
padding-left: ${wp('6.4%')}px;
padding-right: ${wp('6.4%')}px;
align-items: center;
justify-content: center;
`;

const DetailFilterTitleText = Styled.Text`
font-weight: bold;
font-size: 16px;
color: #000000;
`;

const DetailFilterCancelText = Styled.Text`
font-weight: 400;
font-size: 16px;
color: #000000;
`;

const DetailFilterRegisterText = Styled.Text`
font-weight: 400;
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
flex: 1;
flex-direction: row;
align-items: center;
justify-content: center;
background-color: #ffffff;
`;

const NoSearchedDentalText = Styled.Text`
`;

const SearchResultContainer = Styled.View`
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

let isNearDentalList = true;
let noMoreDentalData = false;
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

  const [loadingMoreDental, setLoadingMoreDental] = useState<boolean>(false);
  const [refreshingDentalFlat, setRefreshingDentalFlat] = useState<boolean>(
    false,
  );
  const [changeDentalList, setChangeDentalList] = useState<boolean>(false);
  const [isFocusedSearchInput, setIsFocusedSearchInput] = useState<boolean>(
    route.params?.requestType === 'search' ? true : false,
  );

  const [query, setQuery] = useState<string>("");

  const timeFilterActionSheet = createRef<any>();
  const searchInputRef = createRef<any>();
  const currentUser = useSelector((state: any) => state.currentUser);
  const currentLocation = useSelector((state: any) => state.currentUser)
    .currentLocation;
  const dispatch = useDispatch();
  const jwtToken = currentUser.jwtToken;
  const todayIndex = new Date().getDay();

  const long = route.params?.currentLocation.longitude;
  const lat = route.params?.currentLocation.latitude;

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
  const loadingGetDental = dentalMapRedux.loadingGetDental;
  const autoCompletedKeywordArr = dentalMapRedux.autoCompletedKeywordArr;

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
    navigation.navigate('NearDentalMap', {
      isNearDentalList: isNearDentalList,
      offset: offset,
      limit: limit,
    });
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
    setIsFocusedSearchInput(false);
    console.log('onSubmitSearchInput keyword', keyword);
    dispatch(allActions.dentalMapActions.setSearchedKeyword(keyword));
    searchDental(keyword);
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
    dispatch(allActions.dentalMapActions.setLoadingGetDental(true));

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
      parkingFilter,
    })
      .then((response: any) => {
        dispatch(allActions.dentalMapActions.setLoadingGetDental(false));
        console.log('GETDentalTotalSearch response', response);
        if (response.length > 0) {
          const firstDentalLocation = {
            coordinate: {
              latitude: Number(response[0].geographLat),
              longitude: Number(response[0].geographLong),
            },
            zoom: 13,
          };

          dispatch(allActions.dentalMapActions.setSearchedKeyword(query));
          //dispatch(allActions.dentalMapActions.setNearDentalList(response));
          dispatch(allActions.dentalMapActions.setSearchedDentalArr(response));
          dispatch(
            allActions.dentalMapActions.setMapLocation(firstDentalLocation),
          );

          isNearDentalList = false;
        } else {
          dispatch(allActions.dentalMapActions.setSearchedKeyword(query));
          dispatch(allActions.dentalMapActions.setNearDentalList([]));
        }
      })
      .catch((error: any) => {
        dispatch(allActions.dentalMapActions.setLoadingGetDental(false));
        console.log('GETDentalTotalSearch error', error);
      });
  };

  const filterDental = (
    query: string,
    tmpDayFilter: any,
    tmpTimeFilter: string,
    tmpParkingFilter: string,
    tmpHolidayFilter: boolean,
  ) => {
    dispatch(allActions.dentalMapActions.setLoadingGetDental(true));

    const dayFilter = tmpDayFilter;
    const timeFilter = tmpTimeFilter;
    const parkingFilter = tmpParkingFilter;
    const holidayFilter = tmpHolidayFilter;
    const category = keywordRef.current.category;

    GETDentalTotalSearch({
      jwtToken,
      offset,
      limit,
      lat,
      long,
      query,
      category,
      sort,
      dayFilter,
      timeFilter,
      parkingFilter,
      holidayFilter,
    })
      .then((response: any) => {
        dispatch(allActions.dentalMapActions.setLoadingGetDental(false));
        console.log('GETDentalTotalSearch response', response);

        if (response.length > 0) {
          const firstDentalLocation = {
            coordinate: {
              latitude: Number(response[0].geographLat),
              longitude: Number(response[0].geographLong),
            },
            zoom: 13,
          };

          dispatch(allActions.dentalMapActions.setSearchedKeyword(query));
          //dispatch(allActions.dentalMapActions.setNearDentalList(response));
          dispatch(allActions.dentalMapActions.setSearchedDentalArr(response));
          dispatch(
            allActions.dentalMapActions.setMapLocation(firstDentalLocation),
          );

          isNearDentalList = false;
        } else {
          dispatch(allActions.dentalMapActions.setSearchedKeyword(query));
          dispatch(allActions.dentalMapActions.setNearDentalList([]));
        }
      })
      .catch((error: any) => {
        dispatch(allActions.dentalMapActions.setLoadingGetDental(false));
        console.log('GETDentalTotalSearch error', error);
      });
  };

  const clickDayFilter = () => {
    setVisibleDayFilterModal(true);
  };

  const selectDayFilterItem = (day: object, index: number) => {
    dispatch(allActions.dentalFilterActions.selectDayItem(index));
  };

  const clickTimeFilter = () => {
    if (timeFilter === '') {
      setVisibleTimeFilterModal(true);
    } else {
      timeFilterActionSheet.current.show();
    }
  };

  const onPressTimeFilterActionSheet = (index: number) => {
    if (index === 1) {
      setVisibleTimeFilterModal(true);
    } else if (index === 2) {
      dispatch(allActions.dentalFilterActions.setTimeFilter(''));
      filterDental(
        searchedKeyword,
        dayFilter,
        '',
        parkingFilter,
        holidayFilter,
      );
    }
  };

  const changeHolidayFilter = () => {
    filterDental(
      searchedKeyword,
      dayFilter,
      timeFilter,
      parkingFilter,
      !holidayFilter,
    );
    dispatch(allActions.dentalFilterActions.setHolidayFilter(!holidayFilter));
  };

  const changeParkingFilter = () => {
    if (parkingFilter === 'y') {
      filterDental(searchedKeyword, dayFilter, timeFilter, 'y', holidayFilter);
      dispatch(allActions.dentalFilterActions.setParkingFilter('n'));
    } else if (parkingFilter === 'n') {
      filterDental(searchedKeyword, dayFilter, timeFilter, 'y', holidayFilter);
      dispatch(allActions.dentalFilterActions.setParkingFilter('y'));
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

      
        filterDental(
          searchedKeyword,
          tmpDayFilter,
          timeFilter,
          parkingFilter,
          holidayFilter,
        );
    }

    setVisibleDayFilterModal(false);
  }

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

      filterDental(
        searchedKeyword,
        tmpDayFilter,
        timeFilter,
        parkingFilter,
        holidayFilter,
      );
    }

    setVisibleDayFilterModal(false);
  };

  const cancelTimeFilter = () => {
    setVisibleTimeFilterModal(false);
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

    if(timeFilter !== '') {
      dispatch(allActions.dentalFilterActions.setTimeFilter(''));

      const tmpTimeFilter = "";

      filterDental(
        searchedKeyword,
        dayFilter,
        tmpTimeFilter,
        parkingFilter,
        holidayFilter,
      )

    }
    setVisibleTimeFilterModal(false);
  }

  const registerTimeFilter = () => {
    setVisibleTimeFilterModal(false);
    if (timeSlotPickerValue === '오전') {
      const formattedHourPickerValue =
        hourPickerValue < 10 ? '0' + hourPickerValue : hourPickerValue;
      const formattedTime =
        formattedHourPickerValue + ':' + minutePickerValue + ':00';

      if (timeFilter !== formattedTime) {
        dispatch(allActions.dentalFilterActions.setTimeFilter(formattedTime));
        filterDental(
          searchedKeyword,
          dayFilter,
          formattedTime,
          parkingFilter,
          holidayFilter,
        );
      }
    } else if (timeSlotPickerValue == '오후') {
      const formattedTime =
        Number(hourPickerValue) + 12 + ':' + minutePickerValue + ':00';
      dispatch(allActions.dentalFilterActions.setTimeFilter(formattedTime));

      if (timeFilter !== formattedTime) {
        dispatch(allActions.dentalFilterActions.setTimeFilter(formattedTime));
        filterDental(
          searchedKeyword,
          dayFilter,
          formattedTime,
          parkingFilter,
          holidayFilter,
        );
      }
    }
  };

  const moveToDentalDetail = (dentalId: number) => {
    navigation.navigate('DentalClinicStack', {
      screen: 'DentalDetailScreen',
      params: {
        dentalId: dentalId,
      },
    });
  };

  const onEndReachedDentalFlat = () => {
    if (!noMoreDentalData && !loadingMoreDental) {
      setLoadingMoreDental(true);
      offset = offset + 20;
      getMoreDentalList();
    }
  };

  const getMoreDentalList = () => {
    console.log('getMoreDentalList inputedKeyword', inputedKeyword);
    const query = searchedKeyword;
    const category = keywordRef.current.category;

    GETDentalTotalSearch({
      jwtToken,
      offset,
      limit,
      lat,
      long,
      query,
      category,
      sort,
      dayFilter,
      timeFilter,
      parkingFilter,
    })
      .then((response: any) => {
        console.log('병원 더불러오기 GETDentalTotalSearch response', response);
        setLoadingMoreDental(false);

        if (response.length > 0) {
          noMoreDentalData = false;

          const firstDentalLocation = {
            coordinate: {
              latitude: Number(response[0].geographLat),
              longitude: Number(response[0].geographLong),
            },
            zoom: 13,
          };

          dispatch(
            allActions.dentalMapActions.setSearchedDentalArr(
              searchedDentalArr.concat(response),
            ),
          );
          dispatch(
            allActions.dentalMapActions.setMapLocation(firstDentalLocation),
          );
        } else if (response.length === 0) {
          noMoreDentalData = true;
        }
        isNearDentalList = false;
      })
      .catch((error: any) => {
        setLoadingMoreDental(false);
        console.log('GETDentalTotalSearch error', error);
      });
  };

  const onRefreshDentalFlat = () => {
    setRefreshingDentalFlat(true);
    setRefreshingDentalFlat(false);
  };

  const onFocusSearchInput = () => {
    setIsFocusedSearchInput(true);
  };

  const pressBackground = () => {
    Keyboard.dismiss();
  };

  const selectAutoCompletedKeyword = (keyword: string, category: string) => {
    Keyboard.dismiss();
    setIsFocusedSearchInput(false);
    setQuery(keyword);
    searchDental(keyword, category);

    keywordRef.current = {
      name: keyword,
      category: category,
    }
  };

  const clearTextInput = () => {
    setQuery("");
    searchInputRef.current.clear();
    searchInputRef.current.focus();
  }

  const renderFooterIndicator = () => {
    if (loadingMoreDental) {
      return (
        <FooterIndicatorContainer>
          <ActivityIndicator />
        </FooterIndicatorContainer>
      );
    } else {
      return <FooterIndicatorContainer style={{height: 10}} />;
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
      />
    );
  };

  const renderDayFilterItem = ({item, index}: any) => {
    if (index < 7) {
      return (
        <TouchableWithoutFeedback
          onPress={() => selectDayFilterItem(item, index)}>
          <DetailFilterItemContainer
            style={
              [item.selected
                ? {backgroundColor: '#00D1FF'}
                : {backgroundColor: '#ffffff'},
              styles.detailFilterItemShadow]
            }>
            <DetailFilterItemText
            style={
              item.selected
              ? {color: "#FFFFFF"}
              : {color: "#9AA2A9"}
            }>{item.day + '요일'}</DetailFilterItemText>
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
            navigation.goBack();
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
          {query.length > 0 && (
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
        {searchedDentalArray.length > 0 && (
        <SearchResultContainer
        style={!isFocusedSearchInput ? {zIndex: 1} : {zIndex: 0, opacity: 0}}>
          <FilterListContainer
          style={[{backgroundColor: "#ffffff"}, styles.dentalFilterListShadow]}>
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
                      style={[{marginLeft: 16, backgroundColor: '#ffffff', borderColor: "#9AA2A9"}]}>
                      <FilterItemText style={{color: '#4E525D'}}>
                        {selectedDayList[0].day + '요일'}
                      </FilterItemText>
                    </FilterItemContainer>
                  </TouchableWithoutFeedback>
                )}
              {selectedDayList.length > 1 && (
                  <TouchableWithoutFeedback onPress={() => clickDayFilter()}>
                    <FilterItemContainer
                      style={[{marginLeft: 16, backgroundColor: '#ffffff', borderColor: "#9AA2A9"}]}>
                      {selectedDayList.map((item: any, index: number) => {
                        if (index === 0) {
                          return (
                            <FilterItemText style={{color: '#4E525D'}}>
                              {item.day + '요일'}
                            </FilterItemText>
                          );
                        } else {
                          return (
                            <FilterItemText style={{color: '#4E525D'}}>
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
                    timeFilter !== '' && {backgroundColor: '#ffffff', borderColor: "#9AA2A9"},
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
                    holidayFilter && {backgroundColor: '#ffffff', borderColor: "#9AA2A9"},
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
                    parkingFilter === 'y' && {backgroundColor: '#ffffff', borderColor: '#9AA2A9'},
                  ]}>
                  <FilterItemText
                    style={parkingFilter === 'y' && {color: '#4E525D'}}>
                    {'주차가능'}
                  </FilterItemText>
                </FilterItemContainer>
              </TouchableWithoutFeedback>
            </ScrollView>
          </FilterListContainer>
            {searchedDentalArray.length > 0 && (
              <FlatList
              contentContainerStyle={{marginTop: 10}}
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
            {searchedDentalArray.length === 0 && (
              <NoSearchedDentalContainer>
                <NoSearchedDentalText>
                  {'검색된 병원이 없습니다 ㅠㅠ'}
                </NoSearchedDentalText>
              </NoSearchedDentalContainer>
            )}
        </SearchResultContainer>
        )}
        <AutoCompletedKeywordContainer
        style={isFocusedSearchInput ? {zIndex : 1} : {zIndex: 0, opacity: 0}}>
          <AutoCompletedKeywordFlatList
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
                <InitializeFilterText>{"방문일 초기화"}</InitializeFilterText>
                <InitializeFilterIcon
                source={require('~/Assets/Images/Map/ic_initialize.png')}/>
              </InitializeFilterContainer>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => registerDayFilter()}>
              <RegisterFilterButton>
                <RegisterFilterText>{"적용하기"}</RegisterFilterText>
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
                  itemStyle={{fontSize: 20, fontWeight: "700", lineHeight: 24, color: "#131F3C"}}
                  style={{width: wp('20%'), height: hp('26%')}}
                  onValueChange={(itemValue, itemIndex) =>
                    onValueChangeTimeSlotPicker(itemValue, itemIndex)
                  }
                  selectedValue={timeSlotPickerValue}>
                  <Picker.Item label={'오전'} value="오전" />
                  <Picker.Item label={'오후'} value="오후" />
                </Picker>
                <Picker
                  itemStyle={{fontSize: 20, fontWeight: "700", lineHeight: 24, color: "#131F3C"}}
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
                  itemStyle={{fontSize: 20, fontWeight: "700", lineHeight: 24, color: "#131F3C"}}
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
              <DetailFilterFooterContainer>
                <TouchableWithoutFeedback onPress={() => initializeTimeFilter()}>
                <InitializeFilterContainer>
                  <InitializeFilterText>{"방문시간 초기화"}</InitializeFilterText>
                  <InitializeFilterIcon
                  source={require('~/Assets/Images/Map/ic_initialize.png')}/>
                </InitializeFilterContainer>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => registerTimeFilter()}>
                <RegisterFilterButton>
                  <RegisterFilterText>{"적용하기"}</RegisterFilterText>
                </RegisterFilterButton>
                </TouchableWithoutFeedback>
              </DetailFilterFooterContainer>
              </TimeFilterModalContainer>
          </DetailFilterModalContainer>
        </Modal>
      <ActionSheet
        ref={timeFilterActionSheet}
        options={['취소', '수정하기', '삭제하기']}
        cancelButtonIndex={0}
        destructiveButtonIndex={2}
        onPress={(index: any) => onPressTimeFilterActionSheet(index)}
      />
      {loadingGetDental && (
        <TouchBlockIndicatorCover loading={loadingGetDental} />
      )}
      {!isFocusedSearchInput && (
      <TouchableWithoutFeedback onPress={() => moveToDentalMap()}>
      <ViewMapButton>
        <ViewMapIcon
        source={require('~/Assets/Images/Map/ic_viewDentalMap.png')}/>
        <ViewMapText>{"지도보기"}</ViewMapText>
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
  }
});

export default DentalTotalSearchScreen;


/*

        <TouchableWithoutFeedback onPress={() => moveToDentalMap()}>
          <ViewDentalMapButton>
            <ViewDentalMapText>{'지도'}</ViewDentalMapText>
          </ViewDentalMapButton>
        </TouchableWithoutFeedback>
*/


/*

    <Container>
      <HeaderBar>
        <BackIconTouchableWithoutFeedback
          onPress={() => {
            navigation.goBack();
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
          {query.length > 0 && (
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
        style={!isFocusedSearchInput ? {zIndex: 1} : {zIndex: 0}}>
          <FilterListContainer
          style={[{backgroundColor: "#ffffff"}, styles.dentalFilterListShadow]}>
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
                      style={[{marginLeft: 16, backgroundColor: '#ffffff', borderColor: "#9AA2A9"}]}>
                      <FilterItemText style={{color: '#4E525D'}}>
                        {selectedDayList[0].day + '요일'}
                      </FilterItemText>
                    </FilterItemContainer>
                  </TouchableWithoutFeedback>
                )}
              {selectedDayList.length > 1 && (
                  <TouchableWithoutFeedback onPress={() => clickDayFilter()}>
                    <FilterItemContainer
                      style={[{marginLeft: 16, backgroundColor: '#ffffff', borderColor: "#9AA2A9"}]}>
                      {selectedDayList.map((item: any, index: number) => {
                        if (index === 0) {
                          return (
                            <FilterItemText style={{color: '#4E525D'}}>
                              {item.day + '요일'}
                            </FilterItemText>
                          );
                        } else {
                          return (
                            <FilterItemText style={{color: '#4E525D'}}>
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
                    timeFilter !== '' && {backgroundColor: '#ffffff', borderColor: "#9AA2A9"},
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
                    holidayFilter && {backgroundColor: '#ffffff', borderColor: "#9AA2A9"},
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
                    parkingFilter === 'y' && {backgroundColor: '#ffffff', borderColor: '#9AA2A9'},
                  ]}>
                  <FilterItemText
                    style={parkingFilter === 'y' && {color: '#4E525D'}}>
                    {'주차가능'}
                  </FilterItemText>
                </FilterItemContainer>
              </TouchableWithoutFeedback>
            </ScrollView>
          </FilterListContainer>
            {searchedDentalArr.length > 0 && (
              <FlatList
              contentContainerStyle={{marginTop: 10}}
                refreshing={refreshingDentalFlat}
                onRefresh={onRefreshDentalFlat}
                showsVerticalScrollIndicator={false}
                data={searchedDentalArr}
                renderItem={renderDentalItem}
                onEndReached={onEndReachedDentalFlat}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderFooterIndicator}
              />
            )}
            {searchedDentalArr.length === 0 && (
              <NoSearchedDentalContainer>
                <NoSearchedDentalText>
                  {'검색된 병원이 없습니다 ㅠㅠ'}
                </NoSearchedDentalText>
              </NoSearchedDentalContainer>
            )}
        </SearchResultContainer>
        <AutoCompletedKeywordContainer
        style={isFocusedSearchInput ? {zIndex : 1} : {zIndex: 0}}>
          <AutoCompletedKeywordFlatList
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
                <InitializeFilterText>{"방문일 초기화"}</InitializeFilterText>
                <InitializeFilterIcon
                source={require('~/Assets/Images/Map/ic_initialize.png')}/>
              </InitializeFilterContainer>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => registerDayFilter()}>
              <RegisterFilterButton>
                <RegisterFilterText>{"적용하기"}</RegisterFilterText>
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
                  itemStyle={{fontSize: 20, fontWeight: "700", lineHeight: 24, color: "#131F3C"}}
                  style={{width: wp('20%'), height: hp('26%')}}
                  onValueChange={(itemValue, itemIndex) =>
                    onValueChangeTimeSlotPicker(itemValue, itemIndex)
                  }
                  selectedValue={timeSlotPickerValue}>
                  <Picker.Item label={'오전'} value="오전" />
                  <Picker.Item label={'오후'} value="오후" />
                </Picker>
                <Picker
                  itemStyle={{fontSize: 20, fontWeight: "700", lineHeight: 24, color: "#131F3C"}}
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
                  itemStyle={{fontSize: 20, fontWeight: "700", lineHeight: 24, color: "#131F3C"}}
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
              <DetailFilterFooterContainer>
                <TouchableWithoutFeedback onPress={() => initializeTimeFilter()}>
                <InitializeFilterContainer>
                  <InitializeFilterText>{"방문시간 초기화"}</InitializeFilterText>
                  <InitializeFilterIcon
                  source={require('~/Assets/Images/Map/ic_initialize.png')}/>
                </InitializeFilterContainer>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => registerTimeFilter()}>
                <RegisterFilterButton>
                  <RegisterFilterText>{"적용하기"}</RegisterFilterText>
                </RegisterFilterButton>
                </TouchableWithoutFeedback>
              </DetailFilterFooterContainer>
              </TimeFilterModalContainer>
          </DetailFilterModalContainer>
        </Modal>
      <ActionSheet
        ref={timeFilterActionSheet}
        options={['취소', '수정하기', '삭제하기']}
        cancelButtonIndex={0}
        destructiveButtonIndex={2}
        onPress={(index: any) => onPressTimeFilterActionSheet(index)}
      />
      {loadingGetDental && (
        <TouchBlockIndicatorCover loading={loadingGetDental} />
      )}
      <TouchableWithoutFeedback onPress={() => moveToDentalMap()}>
      <ViewMapButton>
        <ViewMapIcon
        source={require('~/Assets/Images/Map/ic_viewDentalMap.png')}/>
        <ViewMapText>{"지도보기"}</ViewMapText>
      </ViewMapButton>
      </TouchableWithoutFeedback>
    </Container>
*/