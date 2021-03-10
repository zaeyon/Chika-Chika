import React, {useState, useEffect, useCallback} from 'react';
import Styled from 'styled-components/native';
import {
  TouchableWithoutFeedback,
  FlatList,
  LayoutAnimation,
  PermissionsAndroid,
  Platform,
  UIManager,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector, useDispatch} from 'react-redux';
import allActions from '~/actions';
import callDentalPhoneNumber from '~/method/callDentalPhoneNumber';
import Geolocation from 'react-native-geolocation-service';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

// Local Components
import DentalListItem from '~/Components/Presentational/DentalListItem';
import GETUserReservations from '~/Routes/User/GETUserReservations';

// Routes

const ActivityIndicatorContianerView = Styled.View`
width: ${wp('100%')}px;
height: auto;
align-items: center;
padding: 10px 0px;
`;

const ContainerView = Styled.View`
flex: 1;
background-color: #F5F7F9;
`;

const FilterContainer = Styled.View`

margin: 8px 0px;
background-color: #ffffff;
flex-direction: row;
align-items: center;
justify-content: space-between;
`;

const OrderFilterContainer = Styled.View`
padding: 10px 16px;
flex-direction: row;
align-items: center;
`;

const OrderFilterItemContainer = Styled.View`
background-color: #ffffff;
border-radius: 100px;
border-width: 1px;
border-color: #E2E6ED;
padding: 6px 16px;
`;

const OrderFilterText = Styled.Text`
font-weight: 400;
font-size: 14px;
line-height: 23px;
color: #131F3C;
`;

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface Props {
  fetchSearchResult: any;
  navigation: any;
  renderHeaderComponent: any;
}

const ClinicRoute = ({
  fetchSearchResult,
  navigation,
  renderHeaderComponent,
}: Props) => {
  const type = 'SearchResult';
  const limit = 10;
  const orderList = [
    {name: '거리순', data: 'distance'},
    {name: '정확도순', data: 'accuracy'},
  ];
  const [initialize, setInitialize] = useState(true);
  const [floatVisible, setFloatVisible] = useState(false);
  const [isDataFinish, setIsDataFinish] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const [isEndReached, setIsEndReached] = useState(false);
  const [region, setRegion] = useState('all');
  const [order, setOrder] = useState('distance');

  const [clinics, setClinics] = useState([]);

  const dispatch = useDispatch();

  const jwtToken = useSelector((state: any) => state.currentUser.jwtToken);
  const hometown = useSelector((state: any) => state.currentUser.hometown);
  const [selectedHometown, setSelectedHometown] = useState({
    emdName: '전국',
    id: -1,
  });

  useEffect(() => {
    console.log('clinic request');
    setRegion(selectedHometown.id === -1 ? 'all' : 'residence');

    getUserCurrentLocation(({lat, long}: any) => {
      const form = {
        lat,
        long,
        pathType: 'clinic',
        region: selectedHometown.id === -1 ? 'all' : 'residence',
        cityId: String(selectedHometown.id),
        order: 'distance',
        offset: 0,
        limit: 10,
      };
      fetchSearchResult(form, (response: any) => {
        setInitialize(false);
        console.log('clinics', response);
        LayoutAnimation.configureNext(
          LayoutAnimation.create(100, 'easeInEaseOut', 'opacity'),
        );
        setClinics(response);
      });
    });
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setIsDataFinish(false);
    getUserCurrentLocation(({lat, long}: any) => {
      const form = {
        lat,
        long,
        pathType: 'clinic',
        region: selectedHometown.id === -1 ? 'all' : 'residence',
        cityId: String(selectedHometown.id),
        order,
        offset: 0,
        limit: 10,
      };
      fetchSearchResult(form, (response: any) => {
        console.log('clinics', response);
        LayoutAnimation.configureNext(
          LayoutAnimation.create(300, 'easeInEaseOut', 'opacity'),
        );
        setClinics(response);
        setRefreshing(false);
      });
    });
  }, [order, selectedHometown]);

  const onEndReached = useCallback(
    (info: any) => {
      if (isDataFinish || !clinics.length || clinics.length % limit !== 0) {
        return;
      }
      if (!isEndReached) {
        setIsEndReached(true);
        const pageIndex = Math.floor(clinics.length / 10);

        getUserCurrentLocation(({lat, long}: any) => {
          const form = {
            lat,
            long,
            pathType: 'clinic',
            region: selectedHometown.id === -1 ? 'all' : 'residence',
            cityId: String(selectedHometown.id),
            order,
            offset: pageIndex * limit,
            limit,
          };

          fetchSearchResult(form, (response: any) => {
            if (response.length === 0) {
              setIsDataFinish(true);
            }
            setClinics((prev) => [...prev, ...response]);
            setIsEndReached(false);
          });
        });
      }
    },
    [
      isEndReached,
      clinics,
      order,
      limit,
      jwtToken,
      region,
      selectedHometown,
      fetchSearchResult,
    ],
  );

  const getUserCurrentLocation = useCallback(async (callback: any) => {
    if (Platform.OS == 'android') {
      const permission = PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;
      const hasLocationPermission = await PermissionsAndroid.check(permission);
      if (hasLocationPermission) {
        Geolocation.getCurrentPosition((position) => {
          console.log('사용자 현재 위치 position', position);

          const lat = position.coords.latitude;
          const long = position.coords.longitude;
          callback({lat, long});
        });
      }
    } else if (Platform.OS == 'ios') {
      Geolocation.getCurrentPosition((position) => {
        console.log('사용자 현재 위치 position', position);

        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        callback({lat, long});
      });
    }
  }, []);

  const moveToDentalDetail = useCallback((dentalId: number) => {
    navigation.navigate('DentalDetailScreen', {
      dentalId: dentalId,
    });
  }, []);

  const clickDentalCallReservation = useCallback(
    (phoneNumber: number, dentalId: number) => {
      callDentalPhoneNumber(phoneNumber, jwtToken, dentalId, () => {
        GETUserReservations({jwtToken}).then((response: any) => {
          dispatch(allActions.userActions.setReservations(response));
        });
      });
    },
    [jwtToken],
  );

  const renderClinicItem = useCallback(({item}) => {
    const isLunchTime = item.lunchTimeNow == 1 ? true : false;
    const isOpen = item.conclustionNow == 1 ? true : false;
    const rating = item.reviewAVGStarRate ? item.reviewAVGStarRate : '평가없음';

    const todayIndex = new Date().getDay();
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
  }, []);

  const onFiltering = useCallback(
    (order: string) => {
      setOrder(order);
      getUserCurrentLocation(({lat, long}: any) => {
        const form = {
          lat,
          long,
          pathType: 'clinic',
          region: selectedHometown.id === -1 ? 'all' : 'residence',
          cityId: String(selectedHometown.id),
          order,
          offset: 0,
          limit: 10,
        };
        fetchSearchResult(form, (response: any) => {
          setIsDataFinish(false);
          console.log('clinics', response);

          setClinics(response);
        });
      });
    },
    [selectedHometown, getUserCurrentLocation, fetchSearchResult],
  );

  return (
    <ContainerView>
      <FlatList
        data={clinics}
        renderItem={renderClinicItem}
        keyExtractor={(item: any) => String(item.id)}
        ListHeaderComponent={
          renderHeaderComponent &&
          renderHeaderComponent({
            order,
            orderList,
            selectedHometown,
            floatAvailable: false,
            onFiltering,
            setFloatVisible,
            isEmpty: clinics.length === 0,
            initialize,
          })
        }
        ListFooterComponent={
          isEndReached ? (
            <ActivityIndicatorContianerView>
              <ActivityIndicator />
            </ActivityIndicatorContianerView>
          ) : null
        }
        scrollEventThrottle={16}
        onEndReached={onEndReached}
        onEndReachedThreshold={2}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            enabled={refreshing}
          />
        }
      />
    </ContainerView>
  );
};

export default React.memo(ClinicRoute);
