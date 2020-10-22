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
import Geolocation from 'react-native-geolocation-service';

const Container = Styled.SafeAreaView`
flex: 1;
background-color: #ffffff;
`;

const HeaderBar = Styled.View`
 width: ${wp('100%')}px;
 height: ${wp('11.7%')}px;
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
 background-color:#ffffff;
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

const HeaderEmptyContainer = Styled.View`
 width: ${wp('6.4%')}px;
 height: ${wp('6.4%')}px;
`;

const MapContainer = Styled.View`
 flex: 1;
`;

const LoadingContainer = Styled.View`
width: ${wp('100%')};
height: ${hp('100%')};
position: absolute;
top: ${wp('11.7%')};
align-items: center;
justify-content: center;
`;

interface Props {
    navigation: any,
    route: any,
}


const P0 = {latitude: 37.564362, longitude: 126.977011};
const P1 = {latitude: 37.565051, longitude: 126.978567};
const P2 = {latitude: 37.565383, longitude: 126.976292};

const TEST_MARKER_LIST = [
    {latitude: 37.564362, longitude: 126.977011}, 
    {latitude: 37.565051, longitude: 126.978567},
    {latitude: 37.565383, longitude: 126.976292}
]

const NearDentistMap = ({navigation, route}: Props) => {
    const [currentLocation, setCurrentLocation] = useState<any>({latitude: 37, longitude: 127});
    const [loading, setLoading] = useState<boolean>(true);
    const mapRef = useRef(null);

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

    useEffect(() => {
        mapRef.current.setLocationTrackingMode(2)
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

    return (
        <Container>
            <HeaderBar>
                <TouchableWithoutFeedback onPress={() => goBack()}>
                <HeaderLeftContainer>
                    <HeaderBackIcon
                    source={require('~/Assets/Images/HeaderBar/ic_back.png')}/>
                </HeaderLeftContainer>
                </TouchableWithoutFeedback>
                <HeaderTitleText>
                    내 주변 치과
                </HeaderTitleText>
                <HeaderRightContainer>
                    <HeaderEmptyContainer>
                    </HeaderEmptyContainer>
                </HeaderRightContainer>
            </HeaderBar>
            <MapContainer>
                <NaverMapView
                ref={mapRef}
                compass={false}
                style={{width: '100%', height: '100%'}}
                showsMyLocationButton={true}
                center={{...currentLocation, zoom: 16}}
                onMapClick={(e:any) => console.warn('onMapClick', JSON.stringify(e))}>
                {TEST_MARKER_LIST.map((item, index) => {
                    return (
                        <Marker
                        coordinate={item}/>
                    )
                })}
                </NaverMapView>
            </MapContainer>
            {/*
            {loading && (
            <LoadingContainer>
                <ActivityIndicator/>
            </LoadingContainer>
            )}
            */}
        </Container>
    )
}

export default NearDentistMap;
