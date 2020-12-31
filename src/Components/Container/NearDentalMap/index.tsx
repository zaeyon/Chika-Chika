import React, {useEffect, useState, useRef, createRef} from 'react';
import Styled from 'styled-components/native';
import SafeAreaView from 'react-native-safe-area-view';
import {
  TouchableWithoutFeedback,
  TouchableHighlight,
  PermissionsAndroid,
  Platform,
  ScrollView,
  FlatList,
  StyleSheet,
  Keyboard,
  Picker,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector, useDispatch} from 'react-redux';
import allActions from '~/actions';
import NaverMapView, {Circle, Marker} from 'react-native-nmap';
import {isIphoneX} from 'react-native-iphone-x-helper';
import Geolocation from 'react-native-geolocation-service';
import DeviceInfo from 'react-native-device-info';
import Carousel from 'react-native-snap-carousel';
import ActionSheet from 'react-native-actionsheet';
import Modal from 'react-native-modal';
// Local Component
import DentalCarouselItem from '~/Components/Presentational/NearDentalMap/DentalCarouselItem';
import TouchBloackIndicatorCover from '~/Components/Presentational/TouchBlockIndicatorCover';
import DentalList from '~/Components/Presentational/DentalList';
// Route
import GETAroundDental from '~/Routes/Dental/GETAroundDental';
const mapHeight =
  hp('100%') - (wp('11.7%') - (isIphoneX() ? wp('21%') : wp('15%')));
const Container = Styled.View`
flex: 1;
background-color: #ffffff;
`;
const HeaderBar = Styled.View`
width: ${wp('100%')}px;
height: ${wp('16.8%')}px;
flex-direction: row;
align-items: center;
justify-content: space-between;
background-color:#ffffff;
padding-left: 16px;
padding-right: 16px;
border-bottom-width: 2px;
border-color: #eeeeee;
`;
const MapContainer = Styled.View`
`;
const DentalListContainer = Styled.View`
margin-top: ${hp('6.6%')}px;
`;
const LoadingContainer = Styled.View`
width: ${wp('100%')};
height: ${hp('100%')};
position: absolute;
top: ${wp('11.7%')};
align-items: center;
justify-content: center;
`;
const SearchInputContainer = Styled.View`
flex-direction: row;
flex: 1;
height: ${wp('10.66%')}px;
background-color: #ededed;
align-items: center;
padding-left: 10px;
border-radius: 4px;
`;
const SearchText = Styled.Text`
margin-left: 12px;
font-size: 16px;
color: #979797;
`;
const SearchTextInput = Styled.TextInput`
`;
const SelectedDentalContainer = Styled.View`
position: absolute;
bottom: 0;
width: ${wp('100%')};
padding-bottom: 16px;
align-items: center;
`;
const DentalCarouselListContainer = Styled.View`
position: absolute;
padding-bottom: ${DeviceInfo.hasNotch() ? hp('3.5%') : hp('4%')}px;
bottom: 0;
align-items: center;
`;
const DentalCarouselItemContainer = Styled.View`
`;
const SelectedDentalItemContainer = Styled.View`
width: ${wp('87.2%')};
height: ${wp('41.6%')};
background-color: #ffffff;
border-width: 1px;
border-color: #c4c4c4;
padding-top: 20px;
padding-bottom: 20px;
padding-left: 16px;
padding-right: 16px;
flex-direction: row;
align-items: center;
`;
const DentalImageContainer = Styled.View`
width: ${wp('25%')};
height: ${wp('25%')};
`;
const DentalImage = Styled.Image`
width: ${wp('25%')};
height: ${wp('25%')};
`;
const DentalInfoContainer = Styled.View`
margin-left: 16px;
flex-direction: column;
`;
const DentalInfoItemContainer = Styled.View`
flex-direction: row;
align-items: center;
`;
const DentalInfoLabelText = Styled.Text`
color: #000000;
font-weight: bold;
font-size: 14px;
`;
const DentalInfoValueText = Styled.Text`
margin-left: 8px;
color: #000000;
font-size: 14px;
`;
const FilterListContainer = Styled.View`
width: ${wp('100%')}px;
height: ${hp('6.6%')}px;
flex-direction: row;
align-items: center;
background-color: #ffffff;
`;
const FilterItemContainer = Styled.View`
padding: 9px 11px 9px 11px;
border-radius: 100px;
background-color: #ffffff;
flex-direction: row;
align-items: center;
border-width: 1px;
border-color: #c4c4c4;
`;
const FilterItemText = Styled.Text`
color: #000000;
font-size: 14px;
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
padding-top: 12px;
padding-bottom: 27px;
padding-left: 16px;
padding-right: 16px;
flex-direction: column;
flex: 1;
`;
const DetailFilterRowContainer = Styled.View`
flex-direction: row;
flex: 1;
align-items: center;
justify-content: flex-start;
padding-left: ${wp('1%')}px;
`;
const DetailFilterItemContainer = Styled.View`
width: ${wp('16.2%')}px;
height: ${wp('9%')}px;
align-items: center;
justify-content: center;
border-radius: 100px;
background-color: #ffffff;
border-width: 1px;
border-color: #c4c4c4;
`;
const SearchIcon = Styled.Image`
width: ${wp('6.4%')}px;
height: ${wp('6.4%')}px;
`;
const MyLocationTrackingContainer = Styled.View`
padding-top: 16px;
padding-right: 16px;
`;
const MyLocationTrackingButton = Styled.View`
width: ${wp('8.8%')}px;
height: ${wp('8.8%')}px;
border-radius: 8px;
background-color: #ffffff;
border-width: 0.5px;
border-color: #c4c4c4;
align-items: center;
justify-content: center;
`;
const TargetIcon = Styled.Image`
width: ${wp('4.53%')}px;
height: ${wp('4.53%')}px;
`;
const MapHeaderContainer = Styled.View`
position: absolute;
top: 0;
align-items: flex-end;
`;
const DetailFilterHeaderContainer = Styled.View`
flex-direction: row;
align-items: center;
justify-content: space-between;
border-bottom-width: 1px;
border-color: #ececec;
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
justify-content: center;
flex-direction: row;
`;
const MapInsetBottomShadow = Styled.View`
width: ${wp('100%')}px;
height: ${hp('16.8%')}px;
position: absolute;
bottom: 0;
margin-bottom: -${hp('16.8%')}px;
background-color: #000000;
align-self: center;
`;
const CarouselIndexText = Styled.Text`
font-weight: 700;
font-size: 12px;
color: #ffffff;
`;
const CarouselIndexContainer = Styled.View`
padding-top: 8px;
`;
const TimePickerLabelText = Styled.Text`
font-size: 20px;
color: #000000;
`;
interface Props {
  navigation: any;
  route: any;
}
interface Coord {
  latitude: number;
  longitude: number;
}
const TEST_NEAR_DENTAL_DATA = [
  {
    index: 1,
    name: '연세웃는아이치과의원',
    rating: 3.1,
    reviewCount: 3,
    isOpen: true,
    isLauchTime: true,
    address: '경기 안양시 동안구 경수대로 428',
    lunchTime: '12:30~13:20',
    openTime: '12:30~12:30',
    geographLat: 37.2944,
    geographLong: 127.04547,
    selected: true,
  },
  {
    index: 2,
    name: '오케이치과의원',
    rating: 3.5,
    reviewCount: 12,
    isOpen: false,
    isLauchTime: true,
    address: '경기도 의왕시 오전동 206',
    lunchTime: '12:30~13:20',
    openTime: '12:30~12:30',
    geographLat: 37.29404,
    geographLong: 127.04458,
    selected: false,
  },
  {
    index: 3,
    name: '굿모닝치과의원',
    rating: 4,
    reviewCount: 20,
    isOpen: false,
    isLauchTime: false,
    address: '경기도 의왕시 모락로 16',
    lunchTime: '12:30~13:20',
    openTime: '12:30~12:30',
    geographLat: 37.2937,
    geographLong: 127.04638,
    selected: false,
  },
];
const TEST_COORDINATE = {
  latitude: 37.566515657875435,
  longitude: 126.9781164904998,
};
const NearDentalMap = ({navigation, route}: Props) => {
  console.log('NearDentalMap route', route.params?.isOpenDentalList);
  const [currentLocation, setCurrentLocation] = useState<Coord>(
    TEST_COORDINATE,
  );
  const [cameraLocation, setCameraLocation] = useState<Coord>(TEST_COORDINATE);
  const [loadingGetDental, setLoadingGetDental] = useState<boolean>(true);
  const [visibleTimeFilterModal, setVisibleTimeFilterModal] = useState<boolean>(
    false,
  );
  const [visibleDayFilterModal, setVisibleDayFilterModal] = useState<boolean>(
    false,
  );
  const [isOpenDentalList, setIsOpenDentalList] = useState<boolean>(false);
  //const [nearDentalList, setNearDentalList] = useState<Array<any>>(TEST_NEAR_DENTAL_DATA);
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState<number>(0);
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);
  const [hourPickerValue, setHourPickerValue] = useState<number>(1);
  const [minutePickerValue, setMinutePickerValue] = useState<string>('00');
  const [timeSlotPickerValue, setTimeSlotPickerValue] = useState<string>(
    '오전',
  );
  const [sort, setSort] = useState<string>('d');
  const [changeDentalList, setChangeDentalList] = useState<boolean>(false);
  const [changeDayFilter, setChangeDayFilter] = useState<boolean>(false);
  const [selectedDentalIndex, setSelectedDentalIndex] = useState<number>(0);
  const mapRef = useRef<any>(null);
  const dentalCarouselRef = useRef<any>(null);
  const timeTextInputRef = useRef<any>(null);
  const timeFilterActionSheet = createRef<any>();
  const dispatch = useDispatch();
  const currentUser = useSelector((state: any) => state.currentUser);
  const nearDentalList = useSelector((state: any) => state.dentalList)
    .nearDentalList;
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
  const jwtToken = currentUser.jwtToken;
  const todayIndex = new Date().getDay();
  useEffect(() => {
    //mapRef.current.setLocationTrackingMode(2)
    const getInitialNearDental = async () => {
      if (Platform.OS == 'android') {
        getAndroidInitialNearDental();
      } else if (Platform.OS == 'ios') {
        getIosInitialNearDental();
      }
    };
    getInitialNearDental();
  }, []);
  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', onKeyboardWillShow);
    return () => {
      Keyboard.removeListener('keyboardWillShow', onKeyboardWillShow);
    };
  }, []);
  useEffect(() => {
    getNearDental();
  }, [dayFilter, timeFilter, holidayFilter, parkingFilter]);
  const onKeyboardWillShow = (event: any) => {
    console.log('event', event.endCoordinates.height);
    setKeyboardHeight(event.endCoordinates.height);
  };

  async function getAndroidInitialNearDental() {
    const permission = PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;
    const hasLocationPermission = await PermissionsAndroid.check(permission);
    if (hasLocationPermission) {
      Geolocation.getCurrentPosition(
        (position) => {
          console.log('사용자 현재 위치 position', position);

          /*
                 setCurrentLocation({
                     latitude: position.coords.latitude,
                     longitude: position.coords.longitude,
                 })
                 */
          const lat = position.coords.latitude;
          const long = position.coords.longitude;
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          dispatch(allActions.userActions.setCurrentLocation(location));

          GETAroundDental({
            jwtToken,
            lat,
            long,
            sort,
            timeFilter,
            dayFilter,
            parkingFilter,
          })
            .then((response) => {
              setLoadingGetDental(false);
            })
            .catch((error) => {
              console.log('GETAroundDental error', error);
              setLoadingGetDental(false);
            });
          return position;
        },
        (error) => {
          console.log(
            '사용자 현재 위치 불러오기 실패',
            error.code,
            error.message,
          );
          setLoadingGetDental(false);
          return false;
        },
        {enableHighAccuracy: false, timeout: 10000, maximumAge: 10000},
      );
    } else {
      const status = await PermissionsAndroid.request(permission);
      return status === 'granted';
    }
  }
  async function getIosInitialNearDental() {
    const hasLocationPermission = true;
    if (hasLocationPermission) {
      Geolocation.getCurrentPosition(
        (position) => {
          console.log('사용자 현재 위치 position', position);
          /*
                   setCurrentLocation({
                       latitude: position.coords.latitude,
                       longitude: position.coords.longitude,
                   })
​
                   */
          const lat = position.coords.latitude;
          const long = position.coords.longitude;
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          dispatch(allActions.userActions.setCurrentLocation(location));
          GETAroundDental({
            jwtToken,
            lat,
            long,
            sort,
            timeFilter,
            dayFilter,
            parkingFilter,
          })
            .then((response: any) => {
              console.log('GETAroundDental response.length', response.length);
              setLoadingGetDental(false);
              //const slicedDentalList = response.slice(0, 70);
              //slicedDentalList[0].selected = true;
              //setNearDentalList(response);
              dispatch(
                allActions.dentalListActions.setNearDentalList(response),
              );
              setSelectedDentalId(response[0].id);
            })
            .catch((error) => {
              console.log('GETAroundDental error', error);
              setLoadingGetDental(false);
            });
          return position;
        },
        (error) => {
          console.log('사용자 현재 위치 불러오기 실패', error);
          setLoadingGetDental(false);
          return false;
        },
        {enableHighAccuracy: false, timeout: 10000, maximumAge: 10000},
      );
    }
  }
  const getNearDental = () => {
    const lat = currentLocation.latitude;
    const long = currentLocation.longitude;
    setLoadingGetDental(true);
    GETAroundDental({
      jwtToken,
      lat,
      long,
      sort,
      timeFilter,
      dayFilter,
      parkingFilter,
    })
      .then((response: any) => {
        setLoadingGetDental(false);
        //const slicedDentalList = response.slice(0, 70);
        //slicedDentalList[0].selected = true;
        //setNearDentalList(response);
        dispatch(allActions.dentalListActions.setNearDentalList(response));
        setChangeDentalList(!changeDentalList);
      })
      .catch((error) => {
        setLoadingGetDental(false);
      });
  };

  const goBack = () => {
    navigation.goBack();
  };
  const openDentalList = () => {
    navigation.navigate('DentalListScreen', {
      currentLocation: currentLocation,
    });
  };
  const clickDentalMarker = (selectedIndex: number) => {
    setSelectedDentalIndex(selectedIndex);
    dentalCarouselRef.current.snapToItem(selectedIndex);
  };
  const clickMapBackground = () => {};
  const clickDayFilter = () => {
    setVisibleDayFilterModal(true);
  };
  const clickTimeFilter = () => {
    if (timeFilter === '') {
      setVisibleTimeFilterModal(true);
    } else {
      timeFilterActionSheet.current.show();
    }
  };
  const moveToDentalDetail = () => {
    navigation.navigate('DentalClinicStack', {
      screen: 'DentalDetailScreen',
    });
  };
  const clickMyLocationTrackingButton = () => {
    mapRef.current.setLocationTrackingMode(2);
  };
  const onSnapToDentalCarouselItem = (selectedIndex: number) => {
    console.log('onSnapToDentalCarouselItem index', selectedIndex);
    //mapRef.current.animateToCoordinate(nearDentalList[index].location);
    setSelectedDentalIndex(selectedIndex);
  };
  const changeHolidayFilter = () => {};
  const changeParkingFilter = () => {
    if (parkingFilter === 'y') {
      dispatch(allActions.dentalFilterActions.setParkingFilter('n'));
    } else if (parkingFilter === 'n') {
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
    console.log('tmpSelectedDayList', tmpSelectedDayList);

    dispatch(allActions.dentalFilterActions.setDayFilter(tmpDayFilter));
    dispatch(
      allActions.dentalFilterActions.setSelectedDayList(tmpSelectedDayList),
    );
    setVisibleDayFilterModal(false);
  };
  const selectDayFilterItem = (day: object, index: number) => {
    dispatch(allActions.dentalFilterActions.selectDayItem(index));
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
  const cancelTimeFilter = () => {
    setVisibleTimeFilterModal(false);
  };
  const registerTimeFilter = () => {
    setVisibleTimeFilterModal(false);
    if (timeSlotPickerValue === '오전') {
      const formattedHourPickerValue =
        hourPickerValue < 10 ? '0' + hourPickerValue : hourPickerValue;
      const formattedTime =
        formattedHourPickerValue + ':' + minutePickerValue + ':00';
      dispatch(allActions.dentalFilterActions.setTimeFilter(formattedTime));
    } else if (timeSlotPickerValue == '오후') {
      const formattedTime =
        Number(hourPickerValue) + 12 + ':' + minutePickerValue + ':00';
      dispatch(allActions.dentalFilterActions.setTimeFilter(formattedTime));
    }
  };
  const onPressTimeFilterActionSheet = (index: number) => {
    if (index === 1) {
      setVisibleTimeFilterModal(true);
    } else if (index === 2) {
      dispatch(allActions.dentalFilterActions.setTimeFilter(''));
    }
  };
  const renderCarouselItem = ({item, index}: any) => {
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
      <TouchableWithoutFeedback onPress={() => moveToDentalDetail()}>
        <DentalCarouselItemContainer>
          <DentalCarouselItem
            isOpen={isOpen}
            isLunchTime={isLunchTime}
            rating={rating}
            reviewCount={item.reviewNum}
            name={item.name}
            address={item.address}
            lunchTime={item.lunchTime}
            openTime={todayStartTime}
            closeTime={todayEndTime}
          />
        </DentalCarouselItemContainer>
      </TouchableWithoutFeedback>
    );
  };
  const renderDayFilterItem = ({item, index}: any) => {
    if (index < 7) {
      return (
        <TouchableWithoutFeedback
          onPress={() => selectDayFilterItem(item, index)}>
          <DetailFilterItemContainer
            style={
              item.selected
                ? {backgroundColor: '#c4c4c4'}
                : {backgroundColor: '#ffffff'}
            }>
            <FilterItemText>{item.day + '요일'}</FilterItemText>
          </DetailFilterItemContainer>
        </TouchableWithoutFeedback>
      );
    } else if (index === 7) {
      return (
        <TouchableWithoutFeedback
          onPress={() => selectDayFilterItem(item, index)}>
          <DetailFilterItemContainer
            style={
              item.selected
                ? {backgroundColor: '#c4c4c4'}
                : {backgroundColor: '#ffffff'}
            }>
            <FilterItemText>{item.day}</FilterItemText>
          </DetailFilterItemContainer>
        </TouchableWithoutFeedback>
      );
    } else if (index > 7) {
      return (
        <DetailFilterItemContainer style={{opacity: 0}}>
          <FilterItemText>{item.day}</FilterItemText>
        </DetailFilterItemContainer>
      );
    } else {
      return <DetailFilterItemContainer />;
    }
  };
  return (
    <SafeAreaView style={styles.safeAreaStyle} forceInset={{top: 'always'}}>
      <Container>
        <HeaderBar>
          <TouchableWithoutFeedback onPress={() => openDentalList()}>
            <SearchInputContainer>
              <SearchIcon
                source={require('~/Assets/Images/Search/ic_search.png')}
              />
              <SearchText>{'병원, 지역을 검색해 보세요.'}</SearchText>
            </SearchInputContainer>
          </TouchableWithoutFeedback>
        </HeaderBar>
        <MapContainer>
          <NaverMapView
            ref={mapRef}
            compass={false}
            style={{
              width: '100%',
              height:
                hp('100%') - (DeviceInfo.hasNotch() ? wp('44%') : wp('38%')),
            }}
            showsMyLocationButton={false}
            center={{...cameraLocation, zoom: 16}}
            onMapClick={(e: any) => clickMapBackground()}
            zoomControl={true}>
            {nearDentalList.map((item, index) => {
              return (
                <Marker
                  coordinate={{
                    latitude: Number(item.geographLat),
                    longitude: Number(item.geographLong),
                  }}
                  onClick={() => clickDentalMarker(index)}
                  image={
                    index == selectedDentalIndex
                      ? require('~/Assets/Images/Map/ic_dentalMarker_selected.png')
                      : require('~/Assets/Images/Map/ic_dentalMarker_unselected.png')
                  }
                />
              );
            })}
          </NaverMapView>
          <MapHeaderContainer>
            <FilterListContainer>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {selectedDayList.indexOf('전체') !== -1 && (
                  <TouchableWithoutFeedback onPress={() => clickDayFilter()}>
                    <FilterItemContainer
                      style={{marginLeft: 16, backgroundColor: '#2998FF'}}>
                      <FilterItemText style={{color: '#ffffff'}}>
                        {'전체'}
                      </FilterItemText>
                    </FilterItemContainer>
                  </TouchableWithoutFeedback>
                )}
                {selectedDayList.length === 0 && (
                  <TouchableWithoutFeedback onPress={() => clickDayFilter()}>
                    <FilterItemContainer style={{marginLeft: 16}}>
                      <FilterItemText>{'방문일'}</FilterItemText>
                    </FilterItemContainer>
                  </TouchableWithoutFeedback>
                )}
                {selectedDayList.length === 1 &&
                  selectedDayList.indexOf('전체') === -1 && (
                    <TouchableWithoutFeedback onPress={() => clickDayFilter()}>
                      <FilterItemContainer
                        style={{marginLeft: 16, backgroundColor: '#2998FF'}}>
                        <FilterItemText style={{color: '#ffffff'}}>
                          {selectedDayList[0].day + '요일'}
                        </FilterItemText>
                      </FilterItemContainer>
                    </TouchableWithoutFeedback>
                  )}
                {selectedDayList.length > 1 &&
                  selectedDayList.indexOf('전체') === -1 && (
                    <TouchableWithoutFeedback onPress={() => clickDayFilter()}>
                      <FilterItemContainer
                        style={{marginLeft: 16, backgroundColor: '#2998FF'}}>
                        {selectedDayList.map((item, index) => {
                          if (index === 0) {
                            return (
                              <FilterItemText style={{color: '#ffffff'}}>
                                {item.day + '요일'}
                              </FilterItemText>
                            );
                          } else {
                            return (
                              <FilterItemText style={{color: '#ffffff'}}>
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
                      {marginLeft: 12},
                      timeFilter !== '' && {backgroundColor: '#2998FF'},
                    ]}>
                    <FilterItemText
                      style={timeFilter !== '' && {color: '#ffffff'}}>
                      {timeFilter ? timeFilter.slice(0, 5) : '방문시간'}
                    </FilterItemText>
                  </FilterItemContainer>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => changeHolidayFilter()}>
                  <FilterItemContainer
                    style={[
                      {marginLeft: 12},
                      holidayFilter && {backgroundColor: '#2998FF'},
                    ]}>
                    <FilterItemText style={holidayFilter && {color: '#FFFFFF'}}>
                      {'일요일･공휴일 휴진'}
                    </FilterItemText>
                  </FilterItemContainer>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => changeParkingFilter()}>
                  <FilterItemContainer
                    style={[
                      {marginLeft: 12, marginRight: 16},
                      parkingFilter === 'y' && {backgroundColor: '#2998FF'},
                    ]}>
                    <FilterItemText
                      style={parkingFilter === 'y' && {color: '#FFFFFF'}}>
                      {'주차가능'}
                    </FilterItemText>
                  </FilterItemContainer>
                </TouchableWithoutFeedback>
              </ScrollView>
            </FilterListContainer>
            <MyLocationTrackingContainer>
              <TouchableHighlight
                style={{borderRadius: 8}}
                activeOpacity={0.85}
                onPress={() => clickMyLocationTrackingButton()}>
                <MyLocationTrackingButton style={styles.myLocationButtonShadow}>
                  <TargetIcon
                    source={require('~/Assets/Images/Map/ic_target.png')}
                  />
                </MyLocationTrackingButton>
              </TouchableHighlight>
            </MyLocationTrackingContainer>
          </MapHeaderContainer>
          {/*
               <DentalCarouselListContainer>
                   <FlatList
                   {...dentalPanResponder.panHandlers}
                   ref={dentalFlatListRef}
                   onScrollEndDrag={(event: any) => onScrollEndDragDentalCarousel(event)}
                   showsHorizontalScrollIndicator={false}
                   data={nearDentalList}
                   renderItem={renderCarouselItem}
                   horizontal={true}/>
               </DentalCarouselListContainer>
               */}
          <MapInsetBottomShadow style={styles.insetShadow} />
          <DentalCarouselListContainer>
            <Carousel
              contentContainerCustomStyle={{justifyContent: 'center'}}
              inactiveSlideOpacity={1}
              inactiveSlideScale={0.93}
              inactiveSlideShift={0}
              onSnapToItem={(index) => onSnapToDentalCarouselItem(index)}
              ref={dentalCarouselRef}
              data={nearDentalList}
              renderItem={renderCarouselItem}
              sliderWidth={wp('100%')}
              itemWidth={wp('87.2%')}
            />
            <CarouselIndexContainer>
              <CarouselIndexText style={styles.carouselIndexShadow}>
                {selectedDentalIndex + 1 + ' / ' + nearDentalList.length}
              </CarouselIndexText>
            </CarouselIndexContainer>
          </DentalCarouselListContainer>
        </MapContainer>
        <Modal
          isVisible={visibleDayFilterModal}
          style={styles.dayFilterModalView}
          onBackdropPress={() => cancelDayFilter()}
          swipeDirection={['down']}
          onSwipeComplete={() => setVisibleDayFilterModal(false)}
          backdropOpacity={0.25}>
          <DetailFilterModalContainer>
            <DetailFilterHeaderContainer>
              <TouchableWithoutFeedback onPress={() => cancelDayFilter()}>
                <DetailFilterHeaderLeftContainer>
                  <DetailFilterCancelText>{'취소'}</DetailFilterCancelText>
                </DetailFilterHeaderLeftContainer>
              </TouchableWithoutFeedback>
              <DetailFilterTitleText>{'방문일 설정'}</DetailFilterTitleText>
              <TouchableWithoutFeedback onPress={() => registerDayFilter()}>
                <DetailFilterHeaderRightContainer>
                  <DetailFilterRegisterText>{'저장'}</DetailFilterRegisterText>
                </DetailFilterHeaderRightContainer>
              </TouchableWithoutFeedback>
            </DetailFilterHeaderContainer>
            <DetailFilterListContainer>
              <FlatList
                columnWrapperStyle={{
                  justifyContent: 'space-between',
                  marginTop: 12,
                }}
                data={dayList}
                keyExtractor={(item, index) => `${index}`}
                numColumns={5}
                renderItem={renderDayFilterItem}
              />
            </DetailFilterListContainer>
          </DetailFilterModalContainer>
        </Modal>
        <Modal
          isVisible={visibleTimeFilterModal}
          style={styles.timeFilterModalView}
          onBackdropPress={() => cancelTimeFilter()}
          backdropOpacity={0.25}>
          <DetailFilterModalContainer>
            <DetailFilterHeaderContainer>
              <TouchableWithoutFeedback onPress={() => cancelTimeFilter()}>
                <DetailFilterHeaderLeftContainer>
                  <DetailFilterCancelText>{'취소'}</DetailFilterCancelText>
                </DetailFilterHeaderLeftContainer>
              </TouchableWithoutFeedback>
              <DetailFilterTitleText>{'방문시간 설정'}</DetailFilterTitleText>
              <TouchableWithoutFeedback onPress={() => registerTimeFilter()}>
                <DetailFilterHeaderRightContainer>
                  <DetailFilterRegisterText>{'저장'}</DetailFilterRegisterText>
                </DetailFilterHeaderRightContainer>
              </TouchableWithoutFeedback>
            </DetailFilterHeaderContainer>
            <TimeFilterModalContainer>
              <TimePickerContainer>
                <Picker
                  selectedValue={hourPickerValue}
                  onValueChange={(itemValue, itemIndex) =>
                    onValueChangeHourPicker(itemValue, itemIndex)
                  }
                  style={{width: wp('26%'), height: hp('26%')}}>
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
                <TimePickerLabelText>{'시'}</TimePickerLabelText>
                <Picker
                  style={{width: wp('26%'), height: hp('26%')}}
                  onValueChange={(itemValue, itemIndex) =>
                    onValueChangeMinutePicker(itemValue, itemIndex)
                  }
                  selectedValue={minutePickerValue}>
                  <Picker.Item label={'00'} value="00" />
                  <Picker.Item label={'15'} value="15" />
                  <Picker.Item label={'30'} value="30" />
                  <Picker.Item label={'45'} value="45" />
                </Picker>
                <TimePickerLabelText>{'분'}</TimePickerLabelText>
                <Picker
                  style={{width: wp('26%'), height: hp('26%')}}
                  onValueChange={(itemValue, itemIndex) =>
                    onValueChangeTimeSlotPicker(itemValue, itemIndex)
                  }
                  selectedValue={timeSlotPickerValue}>
                  <Picker.Item label={'오전'} value="오전" />
                  <Picker.Item label={'오후'} value="오후" />
                </Picker>
              </TimePickerContainer>
            </TimeFilterModalContainer>
          </DetailFilterModalContainer>
        </Modal>
        <TouchBloackIndicatorCover loading={loadingGetDental} />
        <ActionSheet
          ref={timeFilterActionSheet}
          options={['취소', '수정하기', '삭제하기']}
          cancelButtonIndex={0}
          destructiveButtonIndex={2}
          onPress={(index: any) => onPressTimeFilterActionSheet(index)}
        />
      </Container>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  myLocationButtonShadow: {
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 4,
    shadowOpacity: 0.15,
  },
  dayFilterModalView: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  timeFilterModalView: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  insetShadow: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 100,
    shadowOpacity: 0.4,
  },
  carouselIndexShadow: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 6,
    shadowOpacity: 0.5,
  },
  safeAreaStyle: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
export default NearDentalMap;
/*
<DentalListSlidingUpPanel
navigation={navigation}
route={route}
/>
*/
