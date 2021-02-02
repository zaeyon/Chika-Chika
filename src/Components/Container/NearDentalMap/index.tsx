import React, {
  useEffect,
  useState,
  useRef,
  createRef,
  useMemo,
  useCallback,
  memo,
} from 'react';
import Styled from 'styled-components/native';
import {
  TouchableWithoutFeedback,
  TouchableHighlight,
  PermissionsAndroid,
  Platform,
  ScrollView,
  FlatList,
  StyleSheet,
  Keyboard,
  PanResponder,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Picker} from '@react-native-picker/picker';
import {useSelector, useDispatch} from 'react-redux';
import allActions from '~/actions';

import NaverMapView, {Circle, Marker} from 'react-native-nmap';
import {isIphoneX} from 'react-native-iphone-x-helper';
import Geolocation from 'react-native-geolocation-service';
import DeviceInfo from 'react-native-device-info';
import getStateBarHeight, { getStatusBarHeight } from 'react-native-status-bar-height';
import Carousel from 'react-native-snap-carousel';
import ActionSheet from 'react-native-actionsheet';
import Modal from 'react-native-modal';

// Local Component
import DentalCarouselList from '~/Components/Presentational/NearDentalMap/DentalCarouselList';
import TouchBloackIndicatorCover from '~/Components/Presentational/TouchBlockIndicatorCover';
import DentalList from '~/Components/Presentational/DentalList';

// Route
import GETAroundDental from '~/Routes/Dental/GETAroundDental';
import GETDentalTotalSearch from '~/Routes/Search/GETDentalTotalSearch';


const Container = Styled.View`
flex: 1;
`;

const HeaderBar = Styled.View`
 width: ${wp('100%')}px;
 padding-top: 5px;
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
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
width: ${wp('100%')}px;
height: ${hp('100%')}px;
position: absolute;
top: ${wp('11.7%')}px;
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

const SearchPlaceHolderText = Styled.Text`
margin-left: 12px;
font-size: 16px;
color: #979797;
`;

const SearchText = Styled.Text`
margin-left: 12px;
font-size: 16px;
color: #000000;
`;

const SearchTextInput = Styled.TextInput`
`;

const SelectedDentalContainer = Styled.View`
position: absolute;
bottom: 0;
width: ${wp('100%')}px;
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
width: ${wp('87.2%')}px;
height: ${wp('41.6%')}px;
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
width: ${wp('25%')}px;
height: ${wp('25%')}px;
`;

const DentalImage = Styled.Image`
width: ${wp('25%')}px;
height: ${wp('25%')}px;
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
padding-top: ${getStatusBarHeight()}
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

const ViewDentalListButton = Styled.View`
padding: 13px;
background-color: #eeeeee;
`;

const ViewDentalListText = Styled.Text`
font-size: 16px;
`;

const NaverMapContainer = Styled.View`
`;

interface Props {
  navigation: any;
  route: any;
}

interface Coord {
  latitude: number;
  longitude: number;
}

const TEST_COORDINATE = {
  latitude: 37.566515657875435,
  longitude: 126.9781164904998,
};

let offset = 0;
let limit = 20;
let sort = 'distance';
let isNearDentalList = true;

const bottomTabheight = DeviceInfo.hasNotch() ? hp('10.59%') : hp('7.2%');

const mapHeight = hp('100%') - bottomTabheight;
  
const NearDentalMap = ({navigation, route}: Props) => {
  console.log('NearDentalMap route', route.params?.isOpenDentalList);
  const [currentLocation, setCurrentLocation] = useState<Coord>(
    TEST_COORDINATE,
  );
  const [cameraLocation, setCameraLocation] = useState<Coord>(TEST_COORDINATE);

  //const [loadingGetDental, setLoadingGetDental] = useState<boolean>(true);

  const [visibleTimeFilterModal, setVisibleTimeFilterModal] = useState<boolean>(
    false,
  );
  const [visibleDayFilterModal, setVisibleDayFilterModal] = useState<boolean>(
    false,
  );

  const [isOpenDentalList, setIsOpenDentalList] = useState<boolean>(false);
  //const [nearDentalList, setNearDentalList] = useState<Array<any>>(TEST_NEAR_DENTAL_DATA);
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState<number>(0);

  const [hourPickerValue, setHourPickerValue] = useState<number>(1);
  const [minutePickerValue, setMinutePickerValue] = useState<string>('00');
  const [timeSlotPickerValue, setTimeSlotPickerValue] = useState<string>(
    '오전',
  );

  const [changeDentalList, setChangeDentalList] = useState<boolean>(false);
  const [changeDayFilter, setChangeDayFilter] = useState<boolean>(false);

  const [isVisibleCarouselList, setIsVisibleCarouselList] = useState<boolean>(
    true,
  );

  const [selectedDentalIndex, setSelectedDentalIndex] = useState<number>(0);

  const mapRef = useRef<any>(null);
  const dentalCarouselRef = useRef<any>(null);
  const timeTextInputRef = useRef<any>(null);
  const curCameraLocation = useRef<any>(TEST_COORDINATE);
  const timeFilterActionSheet = createRef<any>();
  const dispatch = useDispatch();

  const currentUser = useSelector((state: any) => state.currentUser);

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
  const mapLocation = dentalMapRedux.mapLocation;
  const mapZoom = dentalMapRedux.mapZoom;

  const searchedKeyword = dentalMapRedux.searchedKeyword;
  const searchedDentalArr = dentalMapRedux.searchedDentalArr;
  const loadingGetDental = dentalMapRedux.loadingGetDental;

  const jwtToken = currentUser.jwtToken;
  const todayIndex = new Date().getDay();

  /*
    const panResponder = React.useRef(
        PanResponder.create({
          // Ask to be the responder:
          onStartShouldSetPanResponder: (evt, gestureState) => true,
          onStartShouldSetPanResponderCapture: (evt, gestureState) =>
            true,
          onMoveShouldSetPanResponder: (evt, gestureState) => true,
          onMoveShouldSetPanResponderCapture: (evt, gestureState) =>
            true,
    
          onPanResponderGrant: (evt, gestureState) => {
          },
          onPanResponderMove: (evt, gestureState) => {
          },
          onPanResponderTerminationRequest: (evt, gestureState) =>
            true,
          onPanResponderRelease: (evt, gestureState) => {
            console.log("onPanResponderRelease gestureState", gestureState);
          },
          onPanResponderTerminate: (evt, gestureState) => {
            // Another component has become the responder, so this gesture
            // should be cancelled
            console.log("onPanResponderTreminate gestureState", gestureState);
          },
          onShouldBlockNativeResponder: (evt, gestureState) => {
            // Returns whether this component should block native components from becoming the JS
            // responder. Returns true by default. Is currently only supported on android.
            return true;
          }
        })
      ).current;
      */

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
    if (route.params?.offset || route.params?.limit) {
      console.log(
        'offset, limit 존재',
        route.params?.offset,
        route.params?.limit,
      );
      if (route.params.offset === 0) {
        offset = 0;
        limit = 20;
      } else if (route.params.offset > 0) {
        offset = 0;
        limit = route.params?.offset;
      }
    }

    if (searchedKeyword.length > 0) {
      isNearDentalList = false;
    }

    sort = 'accuracy';
  }, [route.params?.offset, route.params?.limit, searchedKeyword]);

  useEffect(() => {
    getNearDental();
  }, []);

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
            coordinate: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
            zoom: 16,
          };

          dispatch(allActions.dentalMapActions.setMapLocation(location));

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
              //setLoadingGetDental(false);
              dispatch(allActions.dentalMapActions.setLoadingGetDental(false));
              dispatch(
                allActions.dentalMapActions.setSearchedDentalArr(response),
              );
            })
            .catch((error) => {
              console.log('GETAroundDental error', error);
              dispatch(allActions.dentalMapActions.setLoadingGetDental(false));
            });

          return position;
        },
        (error) => {
          console.log(
            '사용자 현재 위치 불러오기 실패',
            error.code,
            error.message,
          );
          dispatch(allActions.dentalMapActions.setLoadingGetDental(false));

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

                    */

          const lat = position.coords.latitude;
          const long = position.coords.longitude;

          const location = {
            coordinate: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
            zoom: 16,
          };

          dispatch(allActions.dentalMapActions.setMapLocation(location));

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
              console.log('GETAroundDental response.length', response.length);
              dispatch(allActions.dentalMapActions.setLoadingGetDental(false));
              //const slicedDentalList = response.slice(0, 70);
              //slicedDentalList[0].selected = true;
              //setNearDentalList(response);
              dispatch(
                allActions.dentalMapActions.setSearchedDentalArr(response),
              );
              //setSelectedDentalId(response[0].id)
            })
            .catch((error) => {
              console.log('GETAroundDental error', error);
              dispatch(allActions.dentalMapActions.setLoadingGetDental(false));
            });

          return position;
        },
        (error) => {
          console.log('사용자 현재 위치 불러오기 실패', error);
          dispatch(allActions.dentalMapActions.setLoadingGetDental(false));

          return false;
        },
        {enableHighAccuracy: false, timeout: 10000, maximumAge: 10000},
      );
    }
  }

  const getNearDental = () => {
    const lat = currentLocation.latitude;
    const long = currentLocation.longitude;
    const sort = 'd';
    dispatch(allActions.dentalMapActions.setLoadingGetDental(true));
    setSelectedDentalIndex(0);
    dentalCarouselRef.current?.snapToItem(0);

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
        dispatch(allActions.dentalMapActions.setLoadingGetDental(false));
        //const slicedDentalList = response.slice(0, 70);
        //slicedDentalList[0].selected = true;
        //setNearDentalList(response);
        //dispatch(allActions.dentalMapActions.setNearDentalList(response));
        dispatch(allActions.dentalMapActions.setSearchedDentalArr(response));

        setChangeDentalList(!changeDentalList);
      })
      .catch((error) => {
        console.log('GETAroundDental error', error);
        dispatch(allActions.dentalMapActions.setLoadingGetDental(false));
      });
  };

  const filterNearDental = (
    tmpDayFilter: any,
    tmpTimeFilter: string,
    tmpParkingFilter: string,
    tmpHolidayFilter: boolean,
  ) => {
    const lat = currentLocation.latitude;
    const long = currentLocation.longitude;
    const sort = 'd';
    const timeFilter = tmpTimeFilter;
    const dayFilter = tmpDayFilter;
    const parkingFilter = tmpParkingFilter;
    const holidayFilter = tmpHolidayFilter;

    dispatch(allActions.dentalMapActions.setLoadingGetDental(true));
    setSelectedDentalIndex(0);
    dentalCarouselRef.current?.snapToItem(0);

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
        console.log('GETAroundDental response in NearDentalMap', response);
        dispatch(allActions.dentalMapActions.setLoadingGetDental(false));
        //const slicedDentalList = response.slice(0, 70);
        //slicedDentalList[0].selected = true;
        //setNearDentalList(response);
        //dispatch(allActions.dentalMapActions.setNearDentalList(response));
        dispatch(allActions.dentalMapActions.setSearchedDentalArr(response));
        setChangeDentalList(!changeDentalList);
      })
      .catch((error) => {
        console.log('GETAroundDental error', error);
        dispatch(allActions.dentalMapActions.setLoadingGetDental(false));
      });
  };

  const filterSearchedDental = (
    query: string,
    tmpDayFilter: any,
    tmpTimeFilter: string,
    tmpParkingFilter: string,
    tmpHolidayFilter: boolean,
  ) => {
    dispatch(allActions.dentalMapActions.setLoadingGetDental(true));
    const lat = currentLocation.latitude;
    const long = currentLocation.longitude;

    const dayFilter = tmpDayFilter;
    const timeFilter = tmpTimeFilter;
    const parkingFilter = tmpParkingFilter;
    const holidayFilter = tmpHolidayFilter;

    GETDentalTotalSearch({
      jwtToken,
      offset,
      limit,
      lat,
      long,
      query,
      sort,
      dayFilter,
      timeFilter,
      holidayFilter,
      parkingFilter,
    })
      .then((response: any) => {
        dispatch(allActions.dentalMapActions.setLoadingGetDental(false));
        console.log('GETDentalTotalSearch response', response);

        if (response.length > 0) {
          dispatch(allActions.dentalMapActions.setSearchedDentalArr(response));
        } else {
          dispatch(allActions.dentalMapActions.setSearchedDentalArr([]));
        }
      })
      .catch((error: any) => {
        dispatch(allActions.dentalMapActions.setLoadingGetDental(false));
        console.log('GETDentalTotalSearch error', error);
      });
  };

  const goBack = () => {
    navigation.goBack();
  };

  const focusSearchInput = () => {
    navigation.navigate('DentalTotalSearchScreen', {
      currentLocation: currentLocation,
      requestType: 'search',
    });
  };

  const clickDentalMarker = (selectedIndex: number) => {
    if (!isVisibleCarouselList) {
      setIsVisibleCarouselList(true);
    }

    setSelectedDentalIndex(selectedIndex);

    dentalCarouselRef.current?.snapToItem(selectedIndex, false);
  };

  const onMapClick = () => {
    if (isVisibleCarouselList) {
      setSelectedDentalIndex(-1);
      setIsVisibleCarouselList(false);
    }
  };

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

  const moveToDentalDetail = (dentalId: number) => {
    navigation.navigate('DentalClinicStack', {
      screen: 'DentalDetailScreen',
      params: {
        dentalId: dentalId,
      },
    });
  };

  const moveToDentalList = () => {
    navigation.navigate('DentalTotalSearchScreen', {
      currentLocation: currentLocation,
      requestType: 'dentalList',
    });
  };

  const clickMyLocationTrackingButton = () => {
    mapRef.current.setLocationTrackingMode(2);
  };

  const onSnapToDentalCarouselItem = useCallback((selectedIndex: number) => {
    console.log('onSnapToDentalCarouselItem index', selectedIndex);
    setSelectedDentalIndex(selectedIndex);
  }, []);

  const onMapCameraChange = (event: any) => {
    console.log('onMapCameraChange event', event);
  };

  const changeHolidayFilter = () => {
    console.log('changeHolidayFilter holidayFilter', holidayFilter);
    if (isNearDentalList) {
      filterNearDental(dayFilter, timeFilter, parkingFilter, !holidayFilter);
    } else {
      filterSearchedDental(
        searchedKeyword,
        dayFilter,
        timeFilter,
        parkingFilter,
        !holidayFilter,
      );
    }

    dispatch(allActions.dentalFilterActions.setHolidayFilter(!holidayFilter));
  };

  const changeParkingFilter = () => {
    if (parkingFilter === 'y') {
      if (isNearDentalList) {
        filterNearDental(dayFilter, timeFilter, 'n', holidayFilter);
      } else {
        filterSearchedDental(
          searchedKeyword,
          dayFilter,
          timeFilter,
          'n',
          holidayFilter,
        );
      }

      dispatch(allActions.dentalFilterActions.setParkingFilter('n'));
    } else if (parkingFilter === 'n') {
      if (isNearDentalList) {
        filterNearDental(dayFilter, timeFilter, 'y', holidayFilter);
      } else {
        filterSearchedDental(
          searchedKeyword,
          dayFilter,
          timeFilter,
          'y',
          holidayFilter,
        );
      }

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

    if (JSON.stringify(tmpDayFilter) !== JSON.stringify(dayFilter)) {
      dispatch(allActions.dentalFilterActions.setDayFilter(tmpDayFilter));
      dispatch(
        allActions.dentalFilterActions.setSelectedDayList(tmpSelectedDayList),
      );

      if (isNearDentalList) {
        filterNearDental(
          tmpDayFilter,
          timeFilter,
          parkingFilter,
          holidayFilter,
        );
      } else {
        filterSearchedDental(
          searchedKeyword,
          tmpDayFilter,
          timeFilter,
          parkingFilter,
          holidayFilter,
        );
      }
    }
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

      if (timeFilter !== formattedTime) {
        dispatch(allActions.dentalFilterActions.setTimeFilter(formattedTime));

        if (isNearDentalList) {
          filterNearDental(
            dayFilter,
            formattedTime,
            parkingFilter,
            holidayFilter,
          );
        } else {
          filterSearchedDental(
            searchedKeyword,
            dayFilter,
            formattedTime,
            parkingFilter,
            holidayFilter,
          );
        }
      }
    } else if (timeSlotPickerValue == '오후') {
      const formattedTime =
        Number(hourPickerValue) + 12 + ':' + minutePickerValue + ':00';

      if (timeFilter !== formattedTime) {
        dispatch(allActions.dentalFilterActions.setTimeFilter(formattedTime));

        if (isNearDentalList) {
          filterNearDental(
            dayFilter,
            formattedTime,
            parkingFilter,
            holidayFilter,
          );
        } else {
          filterSearchedDental(
            searchedKeyword,
            dayFilter,
            formattedTime,
            parkingFilter,
            holidayFilter,
          );
        }
      }
    }
  };

  const onPressTimeFilterActionSheet = (index: number) => {
    if (index === 1) {
      setVisibleTimeFilterModal(true);
    } else if (index === 2) {
      dispatch(allActions.dentalFilterActions.setTimeFilter(''));
    }
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
      <Container>
        <MapContainer>
          <NaverMapContainer>
            <NaverMapView
              ref={mapRef}
              compass={false}
              style={{
                width: wp('100%'),
                height: hp('100%') - bottomTabheight,
              }}
              showsMyLocationButton={false}
              center={{...mapLocation, zoom: mapZoom}}
              onMapClick={(event: any) => onMapClick()}
              onCameraChange={(event: any) => onMapCameraChange(event)}
              zoomControl={true}>
              {searchedDentalArr.map((item: any, index: number) => {
                return (
                  <Marker
                    key={index}
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
          </NaverMapContainer>
          <MapHeaderContainer>
          <HeaderBar>
          <TouchableWithoutFeedback onPress={() => moveToDentalList()}>
            <ViewDentalListButton>
              <ViewDentalListText>{'목록'}</ViewDentalListText>
            </ViewDentalListButton>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => focusSearchInput()}>
            <SearchInputContainer style={{marginLeft: 8}}>
              <SearchIcon
                source={require('~/Assets/Images/Search/ic_search.png')}
              />
              {searchedKeyword === '' && (
                <SearchPlaceHolderText>
                  {'병원, 지역을 검색해 보세요.'}
                </SearchPlaceHolderText>
              )}
              {searchedKeyword.length > 0 && (
                <SearchText>{searchedKeyword}</SearchText>
              )}
            </SearchInputContainer>
          </TouchableWithoutFeedback>
          </HeaderBar>
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
                      {'일요일･공휴일 진료'}
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
          <MapInsetBottomShadow style={styles.insetShadow} />
          <DentalCarouselList
            searchedDentalArr={searchedDentalArr}
            moveToDentalDetail={moveToDentalDetail}
            onSnapToDentalCarouselItem={onSnapToDentalCarouselItem}
            todayIndex={todayIndex}
            selectedDentalIndex={selectedDentalIndex}
            dentalCarouselRef={dentalCarouselRef}
          />
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
