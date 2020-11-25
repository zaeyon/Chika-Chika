import React, {useEffect, useState, useRef} from 'react';
import Styled from 'styled-components/native';
import {
    TouchableWithoutFeedback,
    PermissionsAndroid,
    Platform,
    ActivityIndicator,
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import NaverMapView, {Circle, Marker, Path, Polyline, Polygon} from "react-native-nmap";
import {isIphoneX} from 'react-native-iphone-x-helper'
import Geolocation from 'react-native-geolocation-service';

// Local Component
import SelectedDentalItem from '~/Components/Presentational/NearDentalMap/SelectedDentalItem';

const mapHeight = hp('100%') - (wp('11.7%') - (isIphoneX() ? wp("21%") : wp("15%")))

const Container = Styled.SafeAreaView`
flex: 1;
background-color: #ffffff;
`;

const HeaderBar = Styled.View`
 width: ${wp('100%')}px;
 height: ${wp('13.8%')}px;
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
 background-color:#ffffff;
 padding-left: 16px;
 padding-right: 16px;
`;

const HeaderLeftContainer = Styled.View`
padding: 7px 15px 13px 16px;
align-items: center;
justify-content: center;
`;

const HeaderBackIcon = Styled.Image`
 width: ${wp('6.4%')}px;
 height: ${wp('6.4%')}px;
`;

const HeaderTitleText = Styled.Text`
font-weight: 600;
font-size: 18px;
color: #1D1E1F;
`;

const HeaderRightContainer = Styled.View`
padding: 7px 16px 13px 15px;
 align-items: center;
 justify-content: center;
 flex-direction: row;
`;

const HeaderFilterIcon = Styled.Image`
width: ${wp('6.4%')};
height: ${wp('6.4%')};
`;

const HeaderEmptyContainer = Styled.View`
 width: ${wp('6.4%')}px;
 height: ${wp('6.4%')}px;
`;

const HeaderFilterContainer = Styled.View`
height: ${wp('13.8%')}px;
align-items: center;
justify-content: center;
padding-left: 3px;
padding-right: 3px;
`;

const MapContainer = Styled.View`
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
width: 307px;
height: 35px;
background-color: #ededed;
justify-content: center;
padding-left: 20px;
`;

const SearchText = Styled.Text`
font-size: 15px;
color: #c3c3c3;
`;

const SearchTextInput = Styled.TextInput`
`; 

const DentalContainer = Styled.View`
position: absolute;
bottom: 0;
width: ${wp('100%')};
padding-bottom: 16px;
align-items: center;
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
flex-direction: row;
align-items: center;
padding-top: 9px
padding-bottom: 9px;
padding-left: 16px;
padding-right: 16px;
position: absolute;
top: 0
background-color: #ffffff;
width: ${wp('100%')}
`;

const FilterItemContainer = Styled.View`
padding: 9px 11px 9px 11px;
border-radius: 100px;
background-color: #c4c4c4;
`;

const FilterItemText = Styled.Text`
color: #000000;
font-size: 14px;
`;


interface Props {
    navigation: any,
    route: any,
}

interface Coord {
    latitude: number;
    longitude: number;
}


const P0 = {latitude: 37.564362, longitude: 126.977011};
const P1 = {latitude: 37.565051, longitude: 126.978567};
const P2 = {latitude: 37.565383, longitude: 126.976292};

const TEST_MARKER_LIST = [
    {latitude: 37.564362, longitude: 126.977011}, 
    {latitude: 37.565051, longitude: 126.978567},
    {latitude: 37.565383, longitude: 126.976292}
]

const NearDentalMap = ({navigation, route}: Props) => {
    const [currentLocation, setCurrentLocation] = useState<Coord>({latitude: 37.564362, longitude: 126.977011});
    const [loading, setLoading] = useState<boolean>(true);
    const [visibleSelectedDentalItem, setVisibleSelectedDentalItem] = useState<boolean>(false)
    const [visibleFilterList, setVisibleFilterList] = useState<boolean>(false)
    const mapRef = useRef(null);

    /*

    async function hasAndroidPermission() {
        const permission = PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;
        const hasLocationPermission = await PermissionsAndroid.check(permission);
        if(hasLocationPermission) {
            
            Geolocation.getCurrentPosition(
                (position) => {
                  console.log("사용자 현재 위치 position", position);
                  setCurrentLocation({
                      latitude: position.coords.latitude,
                      longitude: position.coords.longitude,
                  })
                  setLoading(false);
                },
                (error) => {
                  console.log("사용자 현재 위치 불러오기 실패", error.code, error.message);
                  setLoading(false);
                },
                { enableHighAccuracy: false, timeout: 10000, maximumAge: 10000 }
            );
            
        } else {
            const status = await PermissionsAndroid.request(permission)
            return status === 'granted';
        }
    }

    function hasIosPermission() {
        const hasLocationPermission = true;
        if(hasLocationPermission) {
            Geolocation.getCurrentPosition(
                (position) => {
                    console.log("사용자 현재 위치 position", position)
                    setCurrentLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    })
                    setLoading(false);
                },
                (error) => {
                    console.log("사용자 현재 위치 불러오기 실패", error)
                    setLoading(false);
                },
                {enableHighAccuracy: false, timeout: 10000, maximumAge: 10000}
            )
        }
    }
    */

    useEffect(() => {
        //mapRef.current.setLocationTrackingMode(2)
        /*
        if(Platform.OS == 'android') {
            hasAndroidPermission()
        } else if(Platform.OS == 'ios') {
            hasIosPermission()
        }
        */
    }, [])



    const goBack = () => {
        navigation.goBack();
    }

    const moveToSearchDental = () => {
        navigation.navigate("DentalClinicListScreen")
    }

    const clickDentalMarker = () => {
        setVisibleSelectedDentalItem(true);
    }

    const clickMapBackground = () => {
        setVisibleSelectedDentalItem(false)
    }
    
    const clickFilterIcon = () => {
        setVisibleFilterList(!visibleFilterList)
    }

    return (
        <Container>
            <HeaderBar>
                <TouchableWithoutFeedback onPress={() => moveToSearchDental()}>
                <SearchInputContainer>
                    <SearchText>{"병원,지역 검색"}</SearchText>
                </SearchInputContainer>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => clickFilterIcon()}>
                <HeaderFilterContainer>
                    <HeaderFilterIcon
                    source={require('~/Assets/Images/HeaderBar/ic_filter.png')}/>
                </HeaderFilterContainer>
                </TouchableWithoutFeedback>
            </HeaderBar>
            <MapContainer>
                <NaverMapView
                ref={mapRef}
                compass={false}
                style={{width: '100%', height: hp('100%') - (isIphoneX() ? wp('44%') : wp('38%'))}}
                showsMyLocationButton={!visibleSelectedDentalItem}
                center={{...currentLocation, zoom: 16}}
                onMapClick={(e:any) => clickMapBackground()}>
                {TEST_MARKER_LIST.map((item, index) => {
                    return (
                        <Marker
                        coordinate={item}
                        onClick={clickDentalMarker}/>
                    )
                })}
                </NaverMapView>
                {visibleFilterList && (
                <FilterListContainer>
                    <FilterItemContainer>
                        <FilterItemText>{"요일"}</FilterItemText>
                    </FilterItemContainer>
                    <FilterItemContainer style={{marginLeft: 12}}>
                        <FilterItemText>{"주차가능"}</FilterItemText>
                    </FilterItemContainer>
                    <FilterItemContainer style={{marginLeft: 12}}>
                        <FilterItemText>{"일요일･공휴일 휴진"}</FilterItemText>
                    </FilterItemContainer>
                    <FilterItemContainer style={{marginLeft: 12}}>
                        <FilterItemText>{"시간"}</FilterItemText>
                    </FilterItemContainer>
                </FilterListContainer>
                )}
                {visibleSelectedDentalItem && (
                    <DentalContainer>
                        <SelectedDentalItem/>
                    </DentalContainer>
                )}
            </MapContainer>
        </Container>
    )
}

export default NearDentalMap;

// hp('100%') - (wp('11.7%') - (isIphoneX() ? wp("21%") : wp("15%")))