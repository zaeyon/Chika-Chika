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
import {isIphoneX, getBottomSpace} from 'react-native-iphone-x-helper';
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
 padding-bottom: 6px;
 padding-left: 15px;
 padding-right: 15px;
`;

const MapContainer = Styled.View`
`;

const SearchContainer = Styled.View`
flex: 1;
padding-left: 15px;
padding-right: 15px;
padding-bottom: 0px;
`;


const SearchInputContainer = Styled.View`
flex-direction: row;
flex: 1;
background-color: #ffffff;
border-radius: 8px;
border-width: 1px;
border-color: #F5F7F9;
align-items: center;
padding-top: 12px;
padding-bottom: 12px;
padding-left: 16px;
padding-right: 16px;
`;

const SearchPlaceHolderText = Styled.Text`
font-weight: 700;
margin-left: 11px;
font-size: 16px;
line-height: 24px;
color: #9AA2A9;
`;

const SearchText = Styled.Text`
font-weight: 700;
margin-left: 11px;
font-size: 16px;
line-height: 24px;
color: #9AA2A9;
`;

const FilterListContainer = Styled.View`

flex-direction: row;
align-items: center;
`;

const FilterItemContainer = Styled.View`
padding: 8px 12px 8px 12px;
border-radius: 100px;
background-color: #F5F7F9;
flex-direction: row;
border-width: 0.5px;
border-color: #E2E6ED;
`;

const FilterItemText = Styled.Text`
font-weight: 400;
color: #9AA2A9;
font-size: 14px;
line-height: 19px;
`;



const SearchIcon = Styled.Image`
width: ${wp('5.866%')}px;
height: ${wp('5.866%')}px;
`;


const MapHeaderContainer = Styled.View`
width: ${wp('100%')}px;
padding-top: ${getStatusBarHeight() + 5}
position: absolute;
top: 0;
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

const DetailFilterRowContainer = Styled.View`
flex-direction: row;
flex: 1;
align-items: center;
justify-content: flex-start;
padding-left: ${wp('1%')}px;
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
font-weight: 700;
font-size: 14px;
line-height: 19px;
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

const ViewDentalListContainer = Styled.View`
padding-right: 16px;
flex-direction: row;
justify-content: flex-end;
`;

const ViewDentalListButton = Styled.View`
opacity: 0.9;
border-width: 1px;
border-color: #9AA2A9;
flex-direction: row;
padding: 9px 15px 9px 15px;
background-color: #ffffff;
border-radius: 100px;
`;

const ViewDentalListText = Styled.Text`
margin-left: 4px;
font-size: 16px;
line-height: 20px;
color: #131F3C;
`;

const NaverMapContainer = Styled.View`
`;

const MapActionButtonContainer = Styled.View`
flex: 1;
align-items: flex-end;
padding-top: 16px;
padding-right: 16px;
`;

const MyLocationTrackingButton = Styled.View`
margin-top: 16px;
width: ${wp('10.66%')}px;
height: ${wp('10.66%')}px;
border-radius: 4px;
background-color: #ffffff;
border-width: 1px;
border-color: #E2E6ED;
align-items: center;
justify-content: center;
`;

const TargetIcon = Styled.Image`
width: ${wp('4.266%')}px;
height: ${wp('4.266%')}px;
`;


const ZoomInOutButton = Styled.View`
width: ${wp('10.66%')}px;
height: ${wp('21.33%')}px;
background-color: #ffffff;
border-radius: 4px;
border-width: 1px;
border-color: #E2E6ED;
`;

const ZoomInContainer = Styled.View`
width: ${wp('10.66%')}px;
height: ${wp('10.66%')}px;
align-items: center;
justify-content: center;
border-bottom-width: 0.5px;
border-color: #E2E6ED;
`;

const ZoomOutContainer = Styled.View`
width: ${wp('10.66%')}px;
height: ${wp('10.66%')}px;
align-items: center;
justify-content: center;
border-top-width: 0.5px;
border-color: #E2E6ED;
`;

const DentalListContainer = Styled.View`
position: absolute;
bottom: 0;
`;

const ViewDentalListIcon = Styled.Image`
width: ${wp('5.3%')}px;
height: ${wp('5.3%')}px;
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

  const nearDentalArray = dentalMapRedux.nearDentalArray;
  const searchedKeyword = dentalMapRedux.searchedKeyword;
  const loadingGetDental = dentalMapRedux.loadingGetDental;

  const jwtToken = currentUser.jwtToken;
  const todayIndex = new Date().getDay();

  const currentMapLocation = useRef<any>({
     longitude: mapLocation.longitude,
     latitude: mapLocation.latitude,
     zoom: mapZoom,
   });

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
            .then((response: any) => {
              //setLoadingGetDental(false);
              dispatch(allActions.dentalMapActions.setLoadingGetDental(false));
              dispatch(allActions.dentalMapActions.setNearDentalArray(response));
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
              dispatch(allActions.dentalMapActions.setNearDentalArray(response));
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
        //dispatch(allActions.dentalMapActions.setSearchedDentalArr(response));

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
        dispatch(allActions.dentalMapActions.setSearchedDentalArray(response));
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

  const moveToDentalSearch = () => {
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
      setVisibleTimeFilterModal(true);
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
    dispatch(allActions.dentalMapActions.setSearchedDentalArray(nearDentalArray));
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
    currentMapLocation.current = event;
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

  const initializeDayFilter = () => {

    if (selectedDayList.length > 0) {

      const tmpDayFilter = new Array([]);

      dispatch(allActions.dentalFilterActions.initializeDayList());
      dispatch(allActions.dentalFilterActions.setSelectedDayList([]));

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
  }

  const initializeTimeFilter = () => {

    if(timeFilter !== '') {
      dispatch(allActions.dentalFilterActions.setTimeFilter(''));

      const tmpTimeFilter = "";

      if(isNearDentalList) {
        filterNearDental(
          dayFilter,
          tmpTimeFilter,
          parkingFilter,
          holidayFilter,
        );
      } else {
        filterSearchedDental(
          searchedKeyword,
          dayFilter,
          tmpTimeFilter,
          parkingFilter,
          holidayFilter,
        );
      }

    }
    setVisibleTimeFilterModal(false);
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

  const registerDayFilter = () => {
    console.log("dayFilter", dayFilter);
    console.log("selectedDayFilter", selectedDayList);

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
              {nearDentalArray.map((item: any, index: number) => {
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
          <SearchContainer>
          <TouchableWithoutFeedback onPress={() => moveToDentalSearch()}>
            <SearchInputContainer
            style={styles.searchInputShadow}>
              <SearchIcon
                source={require('~/Assets/Images/Search/ic_search.png')}
              />
              {searchedKeyword === '' && (
                <SearchPlaceHolderText>
                  {'지역, 병원을 검색해 보세요.'}
                </SearchPlaceHolderText>
              )}
              {searchedKeyword.length > 0 && (
                <SearchText>{searchedKeyword}</SearchText>
              )}
            </SearchInputContainer>
          </TouchableWithoutFeedback>
          </SearchContainer>
            <FilterListContainer>
              <ScrollView
                contentContainerStyle={{paddingTop: 12, paddingBottom: 12}}
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {selectedDayList.length === 0 && (
                  <TouchableWithoutFeedback onPress={() => clickDayFilter()}>
                    <FilterItemContainer style={[{marginLeft: 16}, styles.filterItemShadow]}>
                      <FilterItemText>{'방문일'}</FilterItemText>
                    </FilterItemContainer>
                  </TouchableWithoutFeedback>
                )}
                {selectedDayList.length === 1 && (
                    <TouchableWithoutFeedback onPress={() => clickDayFilter()}>
                      <FilterItemContainer
                        style={[{marginLeft: 16, backgroundColor: '#ffffff', borderColor: "#9AA2A9"}, styles.filterItemShadow]}>
                        <FilterItemText style={{color: '#4E525D'}}>
                          {selectedDayList[0].day + '요일'}
                        </FilterItemText>
                      </FilterItemContainer>
                    </TouchableWithoutFeedback>
                  )}
                {selectedDayList.length > 1 &&
                  selectedDayList.indexOf('전체') === -1 && (
                    <TouchableWithoutFeedback onPress={() => clickDayFilter()}>
                      <FilterItemContainer
                        style={[{marginLeft: 16, backgroundColor: '#ffffff', borderColor: "#9AA2A9"}, styles.filterItemShadow]}>
                        {selectedDayList.map((item, index) => {
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
                      styles.filterItemShadow
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
                      styles.filterItemShadow,
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
                      styles.filterItemShadow,
                    ]}>
                    <FilterItemText
                      style={parkingFilter === 'y' && {color: '#4E525D'}}>
                      {'주차가능'}
                    </FilterItemText>
                  </FilterItemContainer>
                </TouchableWithoutFeedback>
              </ScrollView>
            </FilterListContainer>
            <MapActionButtonContainer>
              <TouchableHighlight
                style={{borderRadius: 8}}
                activeOpacity={0.85}
                onPress={() => clickMyLocationTrackingButton()}>
                <MyLocationTrackingButton style={styles.mapActionButtonShadow}>
                  <TargetIcon
                    source={require('~/Assets/Images/Map/ic_target.png')}
                  />
                </MyLocationTrackingButton>
              </TouchableHighlight>
            </MapActionButtonContainer>
          </MapHeaderContainer>
          {nearDentalArray.length > 0 && (
          <DentalListContainer>
          <MapInsetBottomShadow style={styles.insetShadow} />
          <ViewDentalListContainer>
          <TouchableWithoutFeedback onPress={() => moveToDentalList()}>
            <ViewDentalListButton>
              <ViewDentalListIcon
              source={require('~/Assets/Images/Map/ic_viewDentalList.png')}/>
              <ViewDentalListText>{'목록보기'}</ViewDentalListText>
            </ViewDentalListButton>
          </TouchableWithoutFeedback>
          </ViewDentalListContainer>
          <DentalCarouselList
            searchedDentalArr={nearDentalArray}
            moveToDentalDetail={moveToDentalDetail}
            onSnapToDentalCarouselItem={onSnapToDentalCarouselItem}
            todayIndex={todayIndex}
            selectedDentalIndex={selectedDentalIndex}
            dentalCarouselRef={dentalCarouselRef}
          />
          </DentalListContainer>
          )}
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
  searchInputShadow: {
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 10,
    shadowOpacity: 0.2,
  },
  filterItemShadow: {
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 6,
    shadowOpacity: 0.2,
  },
  detailFilterItemShadow: {
    shadowOffset: {
      width: 0.5,
      height: 1.5,
    },
    shadowRadius: 1,
    shadowOpacity: 0.2,
  },
  mapActionButtonShadow: {
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 5,
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


/*
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
*/


/*

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
*/

const TEST_NEAR_DENTAL_LIST = [{"Fri_Consulation_end_time": "18:00:00", "Fri_Consulation_start_time": "10:00:00", "accuracyPoint": 2, "address": "서울특별시 중구 세종대로20길 23 516호 (무교동, 원창빌딩)", "conclustionNow": 0, "confidentConsulationTime": 1, "confidentTOL": 1, "distance(km)": 0.09, "geographLat": "37.5671513", "geographLong": "126.9787673", "holiday_treatment_end_time": null, "holiday_treatment_start_time": null, "id": 3913, "local": "서울특별시 중구 무교동", "lunchTimeNow": 0, "originalName": "이치과의원", "reviewAVGStarRate": 3.3, "reviewNum": 1, "telNumber": "02-776-4117", "website": "", "weekday_TOL_end": "14:00:00", "weekday_TOL_start": "12:30:00", "weekend_non_consulation_notice": "전부휴진"}, {"Fri_Consulation_end_time": "00:00:00", "Fri_Consulation_start_time": "00:00:00", "accuracyPoint": 1, "address": "서울특별시 중구 세종대로 124 지하1층 (태평로1가, 프레스센터 아케이드)", "conclustionNow": 0, "confidentConsulationTime": 0, "confidentTOL": 0, "distance(km)": 0.1, "geographLat": "37.5674232", "geographLong": "126.9778908", "holiday_treatment_end_time": null, "holiday_treatment_start_time": null, "id": 4582, "local": "서울특별시 중구 태평로1가", "lunchTimeNow": 0, "originalName": "프레스치과의원", "reviewAVGStarRate": null, "reviewNum": 0, "telNumber": "733-2714", "website": "", "weekday_TOL_end": "00:00:00", "weekday_TOL_start": "00:00:00", "weekend_non_consulation_notice": ""}, {"Fri_Consulation_end_time": "19:00:00", "Fri_Consulation_start_time": "11:00:00", "accuracyPoint": 3, "address": "서울특별시 중구 무교로 15 2층 202호 (무교동, 남강건설회관빌딩)", "conclustionNow": 1, "confidentConsulationTime": 1, "confidentTOL": 1, "distance(km)": 0.11, "geographLat": "37.567289", "geographLong": "126.9789374", "holiday_treatment_end_time": null, "holiday_treatment_start_time": null, "id": 205, "local": "서울특별시 중구 무교동", "lunchTimeNow": 0, "originalName": "강북센트럴치과의원", "reviewAVGStarRate": null, "reviewNum": 0, "telNumber": "02-318-2854", "website": "", "weekday_TOL_end": "14:30:00", "weekday_TOL_start": "13:00:00", "weekend_non_consulation_notice": "일요일 휴진"}, {"Fri_Consulation_end_time": "00:00:00", "Fri_Consulation_start_time": "00:00:00", "accuracyPoint": 1, "address": "서울특별시 중구 무교로 15 9층 906호 (무교동, 남강빌딩)", "conclustionNow": 0, "confidentConsulationTime": 0, "confidentTOL": 0, "distance(km)": 0.11, "geographLat": "37.567289", "geographLong": "126.9789374", "holiday_treatment_end_time": null, "holiday_treatment_start_time": null, "id": 2015, "local": "서울특별시 중구 무교동", "lunchTimeNow": 0, "originalName": "서울세연치과의원", "reviewAVGStarRate": null, "reviewNum": 0, "telNumber": "02-755-0203", "website": "", "weekday_TOL_end": "00:00:00", "weekday_TOL_start": "00:00:00", "weekend_non_consulation_notice": ""}, {"Fri_Consulation_end_time": "00:00:00", "Fri_Consulation_start_time": "00:00:00", "accuracyPoint": 2, "address": "서울특별시 중구 남대문로9길 51 3층 301호 (을지로1가, 효덕빌딩)", "conclustionNow": 0, "confidentConsulationTime": 0, "confidentTOL": 0, "distance(km)": 0.13, "geographLat": "37.5668152", "geographLong": "126.9795087", "holiday_treatment_end_time": null, "holiday_treatment_start_time": null, "id": 4771, "local": "서울특별시 중구 을지로1가", "lunchTimeNow": 0, "originalName": "행복한예인치과의원", "reviewAVGStarRate": null, "reviewNum": 0, "telNumber": "02-756-2829", "website": "http://www.yeindental.co.kr", "weekday_TOL_end": "00:00:00", "weekday_TOL_start": "00:00:00", "weekend_non_consulation_notice": ""}, {"Fri_Consulation_end_time": "18:00:00", "Fri_Consulation_start_time": "09:00:00", "accuracyPoint": 3, "address": "서울특별시 중구 무교로 12 3층 (무교동, 정오빌딩)", "conclustionNow": 0, "confidentConsulationTime": 1, "confidentTOL": 1, "distance(km)": 0.13, "geographLat": "37.5670515", "geographLong": "126.9793882", "holiday_treatment_end_time": null, "holiday_treatment_start_time": null, "id": 2738, "local": "서울특별시 중구 무교동", "lunchTimeNow": 0, "originalName": "아이비치과의원", "reviewAVGStarRate": null, "reviewNum": 0, "telNumber": "02-752-3014", "website": "http://www.implantist.com", "weekday_TOL_end": "14:00:00", "weekday_TOL_start": "13:00:00", "weekend_non_consulation_notice": "휴진"}, {"Fri_Consulation_end_time": "00:00:00", "Fri_Consulation_start_time": "00:00:00", "accuracyPoint": 1, "address": "서울특별시 중구 을지로 16 606호 (을지로1가, 프레지던트호텔)", "conclustionNow": 0, "confidentConsulationTime": 0, "confidentTOL": 0, "distance(km)": 0.15, "geographLat": "37.5656664", "geographLong": "126.9793772", "holiday_treatment_end_time": null, "holiday_treatment_start_time": null, "id": 3851, "local": "서울특별시 중구 을지로1가", "lunchTimeNow": 0, "originalName": "이원철치과의원", "reviewAVGStarRate": null, "reviewNum": 0, "telNumber": "02-779-2277", "website": "", "weekday_TOL_end": "00:00:00", "weekday_TOL_start": "00:00:00", "weekend_non_consulation_notice": ""}, {"Fri_Consulation_end_time": "00:00:00", "Fri_Consulation_start_time": "00:00:00", "accuracyPoint": 1, "address": "서울특별시 중구 세종대로 136 지하1층 (태평로1가, 파이낸스빌딩)", "conclustionNow": 0, "confidentConsulationTime": 0, "confidentTOL": 0, "distance(km)": 0.21, "geographLat": "37.5684246", "geographLong": "126.9782701", "holiday_treatment_end_time": null, "holiday_treatment_start_time": null, "id": 4624, "local": "서울특별시 중구 태평로1가", "lunchTimeNow": 0, "originalName": "하버디안치과의원", "reviewAVGStarRate": null, "reviewNum": 0, "telNumber": "3783-0660", "website": "http://www.harvardian.co.kr/", "weekday_TOL_end": "00:00:00", "weekday_TOL_start": "00:00:00", "weekend_non_consulation_notice": ""}, {"Fri_Consulation_end_time": "00:00:00", "Fri_Consulation_start_time": "00:00:00", "accuracyPoint": 2, "address": "서울특별시 중구 남대문로9길 40 3층 306호 (다동, 센터플레이스)", "conclustionNow": 0, "confidentConsulationTime": 0, "confidentTOL": 0, "distance(km)": 0.21, "geographLat": "37.5670959", "geographLong": "126.9803692", "holiday_treatment_end_time": null, "holiday_treatment_start_time": null, "id": 1679, "local": "서울특별시 중구 다동", "lunchTimeNow": 0, "originalName": "산치과의원", "reviewAVGStarRate": null, "reviewNum": 0, "telNumber": "02-723-0020", "website": "", "weekday_TOL_end": "00:00:00", "weekday_TOL_start": "00:00:00", "weekend_non_consulation_notice": ""}, {"Fri_Consulation_end_time": "00:00:00", "Fri_Consulation_start_time": "00:00:00", "accuracyPoint": 2, "address": "서울특별시 중구 세종대로 93 광학빌딩 800호 (태평로2가)", "conclustionNow": 0, "confidentConsulationTime": 0, "confidentTOL": 0, "distance(km)": 0.24, "geographLat": "37.5647017", "geographLong": "126.9766451", "holiday_treatment_end_time": null, "holiday_treatment_start_time": null, "id": 1501, "local": "서울특별시 중구 태평로2가", "lunchTimeNow": 0, "originalName": "백송치과의원", "reviewAVGStarRate": null, "reviewNum": 0, "telNumber": "752-6663", "website": "", "weekday_TOL_end": "00:00:00", "weekday_TOL_start": "00:00:00", "weekend_non_consulation_notice": ""}, {"Fri_Consulation_end_time": "00:00:00", "Fri_Consulation_start_time": "00:00:00", "accuracyPoint": 1, "address": "서울특별시 중구 무교로 28 시그너스빌딩 2층 202호 (무교동)", "conclustionNow": 0, "confidentConsulationTime": 0, "confidentTOL": 0, "distance(km)": 0.25, "geographLat": "37.5684713", "geographLong": "126.9796007", "holiday_treatment_end_time": null, "holiday_treatment_start_time": null, "id": 363, "local": "서울특별시 중구 무교동", "lunchTimeNow": 0, "originalName": "광화문예치과의원", "reviewAVGStarRate": null, "reviewNum": 0, "telNumber": "318-3633", "website": "", "weekday_TOL_end": "00:00:00", "weekday_TOL_start": "00:00:00", "weekend_non_consulation_notice": ""}, {"Fri_Consulation_end_time": "00:00:00", "Fri_Consulation_start_time": "00:00:00", "accuracyPoint": 2, "address": "서울특별시 중구 세종대로 92 지하1층 (태평로2가, 한화금융센터 태평로)", "conclustionNow": 0, "confidentConsulationTime": 0, "confidentTOL": 0, "distance(km)": 0.26, "geographLat": "37.5642574", "geographLong": "126.9775934", "holiday_treatment_end_time": null, "holiday_treatment_start_time": null, "id": 656, "local": "서울특별시 중구 태평로2가", "lunchTimeNow": 0, "originalName": "남도현프로덴탈치과의원", "reviewAVGStarRate": null, "reviewNum": 0, "telNumber": "02-6366-2875", "website": "", "weekday_TOL_end": "00:00:00", "weekday_TOL_start": "00:00:00", "weekend_non_consulation_notice": ""}, {"Fri_Consulation_end_time": "00:00:00", "Fri_Consulation_start_time": "00:00:00", "accuracyPoint": 2, "address": "서울특별시 중구 세종대로 135-9 3층 (태평로1가)", "conclustionNow": 0, "confidentConsulationTime": 0, "confidentTOL": 0, "distance(km)": 0.3, "geographLat": "37.5688262", "geographLong": "126.9763175", "holiday_treatment_end_time": null, "holiday_treatment_start_time": null, "id": 361, "local": "서울특별시 중구 태평로1가", "lunchTimeNow": 0, "originalName": "광화문선치과의원", "reviewAVGStarRate": null, "reviewNum": 0, "telNumber": "02-734-8272", "website": "", "weekday_TOL_end": "00:00:00", "weekday_TOL_start": "00:00:00", "weekend_non_consulation_notice": ""}, {"Fri_Consulation_end_time": "00:00:00", "Fri_Consulation_start_time": "00:00:00", "accuracyPoint": 2, "address": "서울특별시 중구 세종대로21길 52 1층 (태평로1가)", "conclustionNow": 0, "confidentConsulationTime": 0, "confidentTOL": 0, "distance(km)": 0.3, "geographLat": "37.5687647", "geographLong": "126.9761617", "holiday_treatment_end_time": null, "holiday_treatment_start_time": null, "id": 362, "local": "서울특별시 중구 태평로1가", "lunchTimeNow": 0, "originalName": "광화문연치과의원", "reviewAVGStarRate": null, "reviewNum": 0, "telNumber": "722-8272", "website": "", "weekday_TOL_end": "00:00:00", "weekday_TOL_start": "00:00:00", "weekend_non_consulation_notice": ""}, {"Fri_Consulation_end_time": "00:00:00", "Fri_Consulation_start_time": "00:00:00", "accuracyPoint": 1, "address": "서울특별시 중구 덕수궁길 15 (서소문동, 시청별관 2동 1층)", "conclustionNow": 0, "confidentConsulationTime": 0, "confidentTOL": 0, "distance(km)": 0.31, "geographLat": "37.5645542", "geographLong": "126.9756136", "holiday_treatment_end_time": null, "holiday_treatment_start_time": null, "id": 2283, "local": "서울특별시 중구 서소문동", "lunchTimeNow": 0, "originalName": "서울특별시청치과의원", "reviewAVGStarRate": null, "reviewNum": 0, "telNumber": "02-2133-1827", "website": "", "weekday_TOL_end": "00:00:00", "weekday_TOL_start": "00:00:00", "weekend_non_consulation_notice": ""}, {"Fri_Consulation_end_time": "19:00:00", "Fri_Consulation_start_time": "10:00:00", "accuracyPoint": 4, "address": "서울특별시 중구 세종대로18길 36 201호 (소공동, 동양빌딩)", "conclustionNow": 1, "confidentConsulationTime": 1, "confidentTOL": 1, "distance(km)": 0.32, "geographLat": "37.5637746", "geographLong": "126.9791858", "holiday_treatment_end_time": null, "holiday_treatment_start_time": null, "id": 1335, "local": "서울특별시 중구 소공동", "lunchTimeNow": 0, "originalName": "밀레니엄연세치과의원", "reviewAVGStarRate": null, "reviewNum": 0, "telNumber": "02-773-8863", "website": "", "weekday_TOL_end": "14:00:00", "weekday_TOL_start": "13:00:00", "weekend_non_consulation_notice": "전부휴진"}, {"Fri_Consulation_end_time": "00:00:00", "Fri_Consulation_start_time": "00:00:00", "accuracyPoint": 2, "address": "서울특별시 중구 남대문로9길 12 나전빌딩 3층 302,303호 (다동)", "conclustionNow": 0, "confidentConsulationTime": 0, "confidentTOL": 0, "distance(km)": 0.32, "geographLat": "37.5668624", "geographLong": "126.9817579", "holiday_treatment_end_time": null, "holiday_treatment_start_time": null, "id": 1473, "local": "서울특별시 중구 다동", "lunchTimeNow": 0, "originalName": "밝은미소치과의원", "reviewAVGStarRate": null, "reviewNum": 0, "telNumber": "02-752-2880", "website": "", "weekday_TOL_end": "00:00:00", "weekday_TOL_start": "00:00:00", "weekend_non_consulation_notice": ""}, {"Fri_Consulation_end_time": "00:00:00", "Fri_Consulation_start_time": "00:00:00", "accuracyPoint": 2, "address": "서울특별시 중구 을지로 30 6층 (소공동, 롯데호텔)", "conclustionNow": 0, "confidentConsulationTime": 0, "confidentTOL": 0, "distance(km)": 0.33, "geographLat": "37.5654272", "geographLong": "126.9816208", "holiday_treatment_end_time": null, "holiday_treatment_start_time": null, "id": 1595, "local": "서울특별시 중구 소공동", "lunchTimeNow": 0, "originalName": "뷰티페이스치과의원", "reviewAVGStarRate": null, "reviewNum": 0, "telNumber": "02-753-4002", "website": "http://www.bfdental.kr/", "weekday_TOL_end": "00:00:00", "weekday_TOL_start": "00:00:00", "weekend_non_consulation_notice": ""}, {"Fri_Consulation_end_time": "00:00:00", "Fri_Consulation_start_time": "00:00:00", "accuracyPoint": 1, "address": "서울특별시 중구 을지로 35 8층 (을지로1가, 하나은행)", "conclustionNow": 0, "confidentConsulationTime": 0, "confidentTOL": 0, "distance(km)": 0.33, "geographLat": "37.5664918", "geographLong": "126.9818658", "holiday_treatment_end_time": null, "holiday_treatment_start_time": null, "id": 81, "local": "서울특별시 중구 을지로1가", "lunchTimeNow": 0, "originalName": "KEB하나은행부속치과의원", "reviewAVGStarRate": null, "reviewNum": 0, "telNumber": "2002-2147", "website": "", "weekday_TOL_end": "00:00:00", "weekday_TOL_start": "00:00:00", "weekend_non_consulation_notice": ""}, {"Fri_Consulation_end_time": "00:00:00", "Fri_Consulation_start_time": "00:00:00", "accuracyPoint": 3, "address": "서울특별시 중구 세종대로18길 16 204호 (북창동, 우성빌딩)", "conclustionNow": 0, "confidentConsulationTime": 0, "confidentTOL": 0, "distance(km)": 0.33, "geographLat": "37.5635365", "geographLong": "126.9780269", "holiday_treatment_end_time": null, "holiday_treatment_start_time": null, "id": 3054, "local": "서울특별시 중구 북창동", "lunchTimeNow": 0, "originalName": "연세수치과의원", "reviewAVGStarRate": null, "reviewNum": 0, "telNumber": "02-319-7528", "website": "", "weekday_TOL_end": "00:00:00", "weekday_TOL_start": "00:00:00", "weekend_non_consulation_notice": ""}, {"Fri_Consulation_end_time": "00:00:00", "Fri_Consulation_start_time": "00:00:00", "accuracyPoint": 1, "address": "서울특별시 중구 세종대로16길 23 (북창동)", "conclustionNow": 0, "confidentConsulationTime": 0, "confidentTOL": 0, "distance(km)": 0.35, "geographLat": "37.5633799", "geographLong": "126.978295", "holiday_treatment_end_time": null, "holiday_treatment_start_time": null, "id": 782, "local": "서울특별시 중구 북창동", "lunchTimeNow": 0, "originalName": "닥터노아치과의원", "reviewAVGStarRate": null, "reviewNum": 0, "telNumber": "02-3789-7524", "website": "", "weekday_TOL_end": "00:00:00", "weekday_TOL_start": "00:00:00", "weekend_non_consulation_notice": ""}, {"Fri_Consulation_end_time": "00:00:00", "Fri_Consulation_start_time": "00:00:00", "accuracyPoint": 1, "address": "서울특별시 중구 서소문로 138 300호 (태평로2가, 대한일보빌딩)", "conclustionNow": 0, "confidentConsulationTime": 0, "confidentTOL": 0, "distance(km)": 0.35, "geographLat": "37.5636696", "geographLong": "126.976307", "holiday_treatment_end_time": null, "holiday_treatment_start_time": null, "id": 4716, "local": "서울특별시 중구 태평로2가", "lunchTimeNow": 0, "originalName": "한일치과의원", "reviewAVGStarRate": null, "reviewNum": 0, "telNumber": "02-776-1594", "website": "", "weekday_TOL_end": "00:00:00", "weekday_TOL_start": "00:00:00", "weekend_non_consulation_notice": ""}, {"Fri_Consulation_end_time": "18:00:00", "Fri_Consulation_start_time": "10:00:00", "accuracyPoint": 2, "address": "서울특별시 중구 다동길 46 3층 (다동)", "conclustionNow": 0, "confidentConsulationTime": 1, "confidentTOL": 1, "distance(km)": 0.35, "geographLat": "37.5678421", "geographLong": "126.9817151", "holiday_treatment_end_time": null, "holiday_treatment_start_time": null, "id": 4209, "local": "서울특별시 중구 다동", "lunchTimeNow": 0, "originalName": "종로치과의원", "reviewAVGStarRate": null, "reviewNum": 0, "telNumber": "02-752-2802", "website": "", "weekday_TOL_end": "14:00:00", "weekday_TOL_start": "12:00:00", "weekend_non_consulation_notice": "전부휴진"}, {"Fri_Consulation_end_time": "00:00:00", "Fri_Consulation_start_time": "00:00:00", "accuracyPoint": 1, "address": "서울특별시 중구 다동길 43 지하104호 (다동, 한외빌딩)", "conclustionNow": 0, "confidentConsulationTime": 0, "confidentTOL": 0, "distance(km)": 0.36, "geographLat": "37.5682206", "geographLong": "126.9816321", "holiday_treatment_end_time": null, "holiday_treatment_start_time": null, "id": 540, "local": "서울특별시 중구 다동", "lunchTimeNow": 0, "originalName": "김용호치과의원", "reviewAVGStarRate": null, "reviewNum": 0, "telNumber": "02-757-2275", "website": "", "weekday_TOL_end": "00:00:00", "weekday_TOL_start": "00:00:00", "weekend_non_consulation_notice": "휴진"}, {"Fri_Consulation_end_time": "00:00:00", "Fri_Consulation_start_time": "00:00:00", "accuracyPoint": 1, "address": "서울특별시 종로구 종로 14 지하1층 (서린동)", "conclustionNow": 0, "confidentConsulationTime": 0, "confidentTOL": 0, "distance(km)": 0.37, "geographLat": "37.5698162", "geographLong": "126.9788787", "holiday_treatment_end_time": null, "holiday_treatment_start_time": null, "id": 1764, "local": "서울특별시 종로구 서린동", "lunchTimeNow": 0, "originalName": "서린연세치과의원", "reviewAVGStarRate": null, "reviewNum": 0, "telNumber": "02-720-2840", "website": "", "weekday_TOL_end": "00:00:00", "weekday_TOL_start": "00:00:00", "weekend_non_consulation_notice": ""}, {"Fri_Consulation_end_time": "18:30:00", "Fri_Consulation_start_time": "10:00:00", "accuracyPoint": 3, "address": "서울특별시 중구 서소문로 134 3층 (서소문동, 블루베리빌딩)", "conclustionNow": 1, "confidentConsulationTime": 1, "confidentTOL": 1, "distance(km)": 0.38, "geographLat": "37.5635723", "geographLong": "126.9758925", "holiday_treatment_end_time": null, "holiday_treatment_start_time": null, "id": 4154, "local": "서울특별시 중구 서소문동", "lunchTimeNow": 0, "originalName": "제일치과의원", "reviewAVGStarRate": null, "reviewNum": 0, "telNumber": "02-318-2828", "website": "", "weekday_TOL_end": "14:00:00", "weekday_TOL_start": "13:00:00", "weekend_non_consulation_notice": ""}, {"Fri_Consulation_end_time": "00:00:00", "Fri_Consulation_start_time": "00:00:00", "accuracyPoint": 0, "address": "서울특별시 중구 서소문로 136 3층 302호 (태평로2가)", "conclustionNow": 0, "confidentConsulationTime": 0, "confidentTOL": 0, "distance(km)": 0.38, "geographLat": "37.56356", "geographLong": "126.9760425", "holiday_treatment_end_time": null, "holiday_treatment_start_time": null, "id": 3680, "local": "서울특별시 중구 태평로2가", "lunchTimeNow": 0, "originalName": "의료법인 풍성치과의원", "reviewAVGStarRate": null, "reviewNum": 0, "telNumber": "02-774-2880", "website": "", "weekday_TOL_end": "00:00:00", "weekday_TOL_start": "00:00:00", "weekend_non_consulation_notice": ""}, {"Fri_Consulation_end_time": "00:00:00", "Fri_Consulation_start_time": "00:00:00", "accuracyPoint": 1, "address": "서울특별시 중구 남대문로7길 15 3층 (소공동)", "conclustionNow": 0, "confidentConsulationTime": 0, "confidentTOL": 0, "distance(km)": 0.39, "geographLat": "37.5638092", "geographLong": "126.9809897", "holiday_treatment_end_time": null, "holiday_treatment_start_time": null, "id": 2483, "local": "서울특별시 중구 소공동", "lunchTimeNow": 0, "originalName": "소공치과의원", "reviewAVGStarRate": null, "reviewNum": 0, "telNumber": "02-757-8285", "website": "", "weekday_TOL_end": "00:00:00", "weekday_TOL_start": "00:00:00", "weekend_non_consulation_notice": ""}, {"Fri_Consulation_end_time": "00:00:00", "Fri_Consulation_start_time": "00:00:00", "accuracyPoint": 1, "address": "서울특별시 중구 남대문로7길 13 3층 (소공동)", "conclustionNow": 0, "confidentConsulationTime": 0, "confidentTOL": 0, "distance(km)": 0.4, "geographLat": "37.5638037", "geographLong": "126.9811196", "holiday_treatment_end_time": null, "holiday_treatment_start_time": null, "id": 4124, "local": "서울특별시 중구 소공동", "lunchTimeNow": 0, "originalName": "정치과의원", "reviewAVGStarRate": null, "reviewNum": 0, "telNumber": "02-775-7473", "website": "", "weekday_TOL_end": "00:00:00", "weekday_TOL_start": "00:00:00", "weekend_non_consulation_notice": ""}, {"Fri_Consulation_end_time": "00:00:00", "Fri_Consulation_start_time": "00:00:00", "accuracyPoint": 1, "address": "서울특별시 종로구 종로 22 603호 (서린동, 인주빌딩)", "conclustionNow": 0, "confidentConsulationTime": 0, "confidentTOL": 0, "distance(km)": 0.4, "geographLat": "37.5698831", "geographLong": "126.9797107", "holiday_treatment_end_time": null, "holiday_treatment_start_time": null, "id": 1729, "local": "서울특별시 종로구 서린동", "lunchTimeNow": 0, "originalName": "새서울치과의원", "reviewAVGStarRate": null, "reviewNum": 0, "telNumber": "02-735-2288", "website": "", "weekday_TOL_end": "00:00:00", "weekday_TOL_start": "00:00:00", "weekend_non_consulation_notice": ""}]

