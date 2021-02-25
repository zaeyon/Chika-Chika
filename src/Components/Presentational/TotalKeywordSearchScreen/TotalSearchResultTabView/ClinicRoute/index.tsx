import React, {useState, useEffect, useCallback} from 'react';
import Styled from 'styled-components/native';
import {
  TouchableWithoutFeedback,
  FlatList,
  LayoutAnimation,
  PermissionsAndroid,
  Platform,
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

// Routes

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
  const [floatVisible, setFloatVisible] = useState(false);
  const [isDataFinish, setIsDataFinish] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const [isEndReached, setIsEndReached] = useState(false);
  const [region, setRegion] = useState('all');
  const [order, setOrder] = useState('createdAt');

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
    setOrder('createdAt');
    setRegion(selectedHometown.id === -1 ? 'all' : 'residence');

    getUserCurrentLocation(({lat, long}) => {
      const form = {
        lat,
        long,
        pathType: 'clinic',
        region: selectedHometown.id === -1 ? 'all' : 'residence',
        cityId: String(selectedHometown.id),
        order: 'createdAt',
        offset: 0,
        limit: 10,
      };
      fetchSearchResult(form, (response: any) => {
        console.log('clinics', response);
        LayoutAnimation.configureNext(
          LayoutAnimation.create(300, 'easeInEaseOut', 'opacity'),
        );
        setClinics(response);
      });
    });
  }, []);

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
      callDentalPhoneNumber(phoneNumber, jwtToken, dentalId);
    },
    [],
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

  const onFiltering = useCallback((order: string) => {}, []);

  const renderClinicHeader = useCallback(
    () => (
      <FilterContainer>
        <OrderFilterContainer>
          <TouchableWithoutFeedback
            onPress={() => {
              ReactNativeHapticFeedback.trigger('impactLight');
              onFiltering('distance');
            }}>
            <OrderFilterItemContainer
              style={order === 'distance' && {borderColor: '#00D1FF'}}>
              <OrderFilterText
                style={order === 'distance' && {color: '#00D1FF'}}>
                {'거리순'}
              </OrderFilterText>
            </OrderFilterItemContainer>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              ReactNativeHapticFeedback.trigger('impactLight');
              onFiltering('accuracy');
            }}>
            <OrderFilterItemContainer
              style={[
                {marginLeft: 6},
                order === 'accuracy' && {borderColor: '#00D1FF'},
              ]}>
              <OrderFilterText
                style={order === 'accuracy' && {color: '#00D1FF'}}>
                {'정확도순'}
              </OrderFilterText>
            </OrderFilterItemContainer>
          </TouchableWithoutFeedback>
        </OrderFilterContainer>
      </FilterContainer>
    ),
    [],
  );

  return (
    <ContainerView>
      <FlatList
        data={clinics}
        renderItem={renderClinicItem}
        keyExtractor={(item: any) => String(item.id)}
        ListHeaderComponent={renderClinicHeader}
      />
    </ContainerView>
  );
};

export default React.memo(ClinicRoute);
