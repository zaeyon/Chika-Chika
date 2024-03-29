import React, {useState, useCallback, useEffect, useRef, useMemo} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {TouchableWithoutFeedback, TouchableHighlight, InteractionManager} from 'react-native';
import Styled from 'styled-components/native';
import {hasNotch} from '~/method/deviceInfo';
import SafeAreaView from 'react-native-safe-area-view';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import GETUserReservations from '~/Routes/User/GETUserReservations';

import NaverMapView, {Marker} from 'react-native-nmap';
import NavigationHeader from '~/Components/Presentational/NavigationHeader';
import TouchBlockIndicatorCover from '~/Components/Presentational/TouchBlockIndicatorCover';
import DentalCarouselItem from '~/Components/Presentational/NearDentalMap/DentalCarouselItem';
import DentalListItem from '~/Components/Presentational/DentalListItem';

import callDentalPhoneNumber from '~/method/callDentalPhoneNumber';

import {useSelector, useDispatch} from 'react-redux';
import allActions from '~/actions';

const Container = Styled.View`
flex: 1;
background-color: #ffffff;
`;

const ContentView = Styled.View`
flex: 1;
`;

const MapContainerView = Styled.View`
flex: 1;
`;
const CarouselContainerView = Styled.View`
position: absolute;
bottom: 16px;
`;

const CarouselFlatList = Styled.FlatList`

`;

const CarouselItemContainerView = Styled.View`
width: ${wp('100%')}px;
align-items: center;
margin-left: -28px;
`;

const ButtonContainerView = Styled.View``;

const ClinicListContainerView = Styled.View`
position: absolute;
width: 100%;
height: 100%;
background: #FFFFFF;

`;

const ClinicFlatList = Styled.FlatList``;

const ViewMapButton = Styled.View`
position: absolute;
bottom: 20px;
right: 16px;
flex-direction: row;
padding: 10px 16px 10px 16px;
border-radius: 100px;
background-color: #131F3C;
`;

const ViewDentalListButton = Styled.View`
border-width: 1px;
border-color: #9AA2A9;
flex-direction: row;
padding: 9px 15px;
background-color: #FFFFFF;
border-radius: 100px;
margin: 0px auto 8px 16px;
`;

const ViewDentalListText = Styled.Text`
margin-left: 4px;
font-size: 16px;
line-height: 20px;
color: #131F3C;
`;

const ViewDentalListIcon = Styled.Image`
width: ${wp('5.3%')}px;
height: ${wp('5.3%')}px;
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

const MyLocationTrackingButton = Styled.View`
elevation: 2;
z-index: 2;
width: 37px;
height: 37px;
border-radius: 3px;
background-color: #ffffff;
align-items: center;
justify-content: center;
box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.3);
`;

const TargetIcon = Styled.Image`
width: ${wp('4.266%')}px;
height: ${wp('4.266%')}px;
tint-color: #131F3C;
`;

interface Props {
  navigation: any;
  route: {
    params: Params;
  };
}

interface Params {
  title: string;
  clinics: any;
}
const DetailMapScreen = ({navigation, route}: Props) => {
  const dispatch = useDispatch();
  const jwtToken = useSelector((state: any) => state.currentUser.jwtToken);

  const mapRef = useRef();
  const carouselRef = useRef();
  const [clinicListVisible, setClinicListVisible] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [mapInitialized, setMapInitialized] = useState(false);
  const [focusedClinic, setFocusedClinic] = useState();
  const focusedIndex = useRef(0);
  const [clinics, setClinics] = useState(route.params.clinics)
  const [currentDay, setCurrentDay] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const task = InteractionManager.runAfterInteractions(() => {
        setInitialized(true);
        setMapInitialized(true);
        mapRef.current && mapRef.current?.setLocationTrackingMode(2);
        mapRef.current && mapRef.current?.animateToCoordinate({
          latitude: (Math.max(...clinics.map((item) => item.geographLat)) + Math.min(...clinics.map((item) => item.geographLat))) / 2,
          longitude: (Math.max(...clinics.map((item) => item.geographLong)) + Math.min(...clinics.map((item) => item.geographLong))) / 2,
          zoom: Math.max(Math.max(...clinics.map((item) => item.geographLat)) - Math.min(...clinics.map((item) => item.geographLat)), Math.max(...clinics.map((item) => item.geographLong)) + Math.min(...clinics.map((item) => item.geographLong))) / 23,
        });
      });
  
      return () => task.cancel();
    }, [clinics])
  );

  useEffect(() => {
    setFocusedClinic(clinics[0]);
    // route.params.getClinics((response: any) => {
    //   setClinics(response);
    //   setFocusedClinic(response[0]);
    // });
    return () => {
      mapRef.current && mapRef.current?.setLocationTrackingMode(0);
    }
  }, []);

  const goBack = useCallback(() => {
    navigation.goBack();
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

  const moveToDentalDetail = useCallback((dentalId: number) => {
    navigation.navigate('DentalDetailScreen', {
      dentalId: dentalId,
    });
  }, []);

  const onMarkerPressed = useCallback((index: number) => {
    setFocusedClinic(clinics[index])
    carouselRef.current.scrollToIndex({
      index,
      animated: false,
    })
  }, [clinics])

  const renderMarkers = useCallback(() => {
    return clinics.map((item, index) => (
      <Marker
        isHideCollidedSymbols={true}
        isHideCollidedCaptions={true}
        coordinate={{
          latitude: parseFloat(item.geographLat),
          longitude: parseFloat(item.geographLong),
        }} // improvise
        onClick={() => onMarkerPressed(index)}
        caption={{
          text: item.originalName, // improvise
        }}
        zIndex={focusedClinic?.id === item.id ? 1 : 0}
        image={
          focusedClinic?.id === item.id
            ? require('~/Assets/Images/Map/ic_marker_focus.png')
            : require('~/Assets/Images/Map/ic_marker_unfocus.png')
        }
      />
    ));
  }, [clinics, focusedClinic, onMarkerPressed]);

  const renderCarouselItem = useCallback(
    ({item, index}: any) => {
      const isLunchTime = item.lunchTimeNow == 1 ? true : false;
      const isOpen = item.conclustionNow == 1 ? true : false;
      const rating = item.reviewAVGStarRate
        ? item.reviewAVGStarRate
        : '평가없음';

      const splitedAddressArray = item.address.split(' ');

      const deletedAddress =
        splitedAddressArray[0] +
        ' ' +
        splitedAddressArray[1] +
        ' ' +
        splitedAddressArray[2] +
        ' ' +
        splitedAddressArray[3];

      let todayStartTime = '';
      let todayEndTime = '';

      if (currentDay === 0) {
        todayStartTime = item.Sun_Consulation_start_time?.slice(0, 5);
        todayEndTime = item.Sun_Consulation_end_time?.slice(0, 5);
      } else if (currentDay === 1) {
        todayStartTime = item.Mon_Consulation_start_time?.slice(0, 5);
        todayEndTime = item.Mon_Consulation_end_time?.slice(0, 5);
      } else if (currentDay === 2) {
        todayStartTime = item.Tus_Consulation_start_time?.slice(0, 5);
        todayEndTime = item.Tus_Consulation_end_time?.slice(0, 5);
      } else if (currentDay === 3) {
        todayStartTime = item.Wed_Consulation_start_time?.slice(0, 5);
        todayEndTime = item.Wed_Consulation_end_time?.slice(0, 5);
      } else if (currentDay === 4) {
        todayStartTime = item.Thu_Consulation_start_time?.slice(0, 5);
        todayEndTime = item.Thu_Consulation_end_time?.slice(0, 5);
      } else if (currentDay === 5) {
        todayStartTime = item.Fri_Consulation_start_time?.slice(0, 5);
        todayEndTime = item.Fri_Consulation_end_time?.slice(0, 5);
      } else if (currentDay === 6) {
        todayStartTime = item.Sat_Consulation_start_time?.slice(0, 5);
        todayEndTime = item.Sat_Consulation_end_time?.slice(0, 5);
      }

      return (
        <TouchableWithoutFeedback onPress={() => moveToDentalDetail(item.id)}>
          <CarouselItemContainerView>
            <DentalCarouselItem
              dentalObj={item}
              isOpen={isOpen}
              isLunchTime={isLunchTime}
              rating={rating}
              reviewCount={item.reviewNum}
              name={item.originalName}
              address={deletedAddress}
              lunchTime={item.lunchTime}
              openTime={todayStartTime}
              closeTime={todayEndTime}
              clickDentalCallReservation={clickDentalCallReservation}
            />
          </CarouselItemContainerView>
        </TouchableWithoutFeedback>
      );
    },
    [currentDay, moveToDentalDetail, clickDentalCallReservation],
  );

  const renderDentalItem = useCallback(
    ({item, index}: any) => {
      const isLunchTime = item.lunchTimeNow == 1 ? true : false;
      const isOpen = item.conclustionNow == 1 ? true : false;
      const rating = item.reviewAVGStarRate
        ? item.reviewAVGStarRate
        : '평가없음';

      let todayStartTime = '';
      let todayEndTime = '';

      if (currentDay === 0) {
        todayStartTime = item.Sun_Consulation_start_time?.slice(0, 5);
        todayEndTime = item.Sun_Consulation_end_time?.slice(0, 5);
      } else if (currentDay === 1) {
        todayStartTime = item.Mon_Consulation_start_time?.slice(0, 5);
        todayEndTime = item.Mon_Consulation_end_time?.slice(0, 5);
      } else if (currentDay === 2) {
        todayStartTime = item.Tus_Consulation_start_time?.slice(0, 5);
        todayEndTime = item.Tus_Consulation_end_time?.slice(0, 5);
      } else if (currentDay === 3) {
        todayStartTime = item.Wed_Consulation_start_time?.slice(0, 5);
        todayEndTime = item.Wed_Consulation_end_time?.slice(0, 5);
      } else if (currentDay === 4) {
        todayStartTime = item.Thu_Consulation_start_time?.slice(0, 5);
        todayEndTime = item.Thu_Consulation_end_time?.slice(0, 5);
      } else if (currentDay === 5) {
        todayStartTime = item.Fri_Consulation_start_time?.slice(0, 5);
        todayEndTime = item.Fri_Consulation_end_time?.slice(0, 5);
      } else if (currentDay === 6) {
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
    },
    [currentDay],
  );




  return (
    <Container>
      <NavigationHeader
        headerLeftProps={{type: 'arrow', onPress: goBack}}
        headerTitle={route.params?.title || '지도 보기'}
      />
  {initialized ? 
        <ContentView>
          <MapContainerView>
            <TouchableHighlight
              style={{
                position: 'absolute',
                top: hp('50%') - (hasNotch() ? hp('31%') : hp('29%')),
                zIndex: 3,
                right: 16,
                borderRadius: 3}}
              activeOpacity={0.85}
              onPress={() => mapRef.current.setLocationTrackingMode(2)}>
              <MyLocationTrackingButton>
                <TargetIcon
                  source={require('~/Assets/Images/Map/ic_target.png')}
                />
              </MyLocationTrackingButton>
            </TouchableHighlight>
            <NaverMapView
              ref={mapRef}
              showsMyLocationButton={false}
              zoomControl={true}
              center={{
                latitude: (Math.max(...clinics.map((item) => item.geographLat)) + Math.min(...clinics.map((item) => item.geographLat))) / 2,
                longitude: (Math.max(...clinics.map((item) => item.geographLong)) + Math.min(...clinics.map((item) => item.geographLong))) / 2,
                zoom: Math.max(Math.max(...clinics.map((item) => item.geographLat)) - Math.min(...clinics.map((item) => item.geographLat)), Math.max(...clinics.map((item) => item.geographLong)) + Math.min(...clinics.map((item) => item.geographLong))) / 23,
              }}
              style={{flex: 1}}

              compass={false}>
              {renderMarkers()}
            </NaverMapView>
          </MapContainerView>
          <CarouselContainerView  pointerEvents="box-none">
              <TouchableWithoutFeedback 
              onPress={() => setClinicListVisible((prev) => !prev)}>
            <ViewDentalListButton >
              <ViewDentalListIcon
                source={require('~/Assets/Images/Map/ic_viewDentalList.png')}
              />
              <ViewDentalListText>{'목록보기'}</ViewDentalListText>
            </ViewDentalListButton>
            </TouchableWithoutFeedback>
            <CarouselFlatList
              ref={carouselRef}
              horizontal
              viewabilityConfig={{
                itemVisiblePercentThreshold: 50
              }}
              showsHorizontalScrollIndicator={false}
              data={clinics}
              renderItem={renderCarouselItem}
              keyExtractor={(item) => String(item.id)}
              contentContainerStyle={{
                paddingLeft: 28,
                paddingBottom: hasNotch() ? hp('5%') : 0,
              }}
              onMomentumScrollEnd={(e) => {
                setFocusedClinic(clinics[Math.round(e.nativeEvent.contentOffset.x / (wp('100%') - 28))])
              }}
              snapToInterval={wp('100%') - 28}
              getItemLayout={(data, index) => ({
                length: wp('100%') - 28,
                offset: (wp('100%') - 28)* index,
                index
              })}
              decelerationRate="fast"
            />
          </CarouselContainerView>
          <ClinicListContainerView style={{
            zIndex: clinicListVisible ? 0 : -1,
          }}>
              <ClinicFlatList
                data={clinics}
                renderItem={renderDentalItem}
                keyExtractor={(item) => String(item.id)}
              />
              <TouchableWithoutFeedback
                onPress={() => setClinicListVisible((prev) => !prev)}>
                <ViewMapButton>
                  <ViewMapIcon
                    source={require('~/Assets/Images/Map/ic_viewDentalMap.png')}
                  />
                  <ViewMapText>{'지도보기'}</ViewMapText>
                </ViewMapButton>
              </TouchableWithoutFeedback>
            </ClinicListContainerView>
        </ContentView> : null}
        <TouchBlockIndicatorCover loading={!mapInitialized}/>
    </Container>
  );
};

export default DetailMapScreen;
