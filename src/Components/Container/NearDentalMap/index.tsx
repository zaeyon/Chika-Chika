import React, {useEffect, useState, useRef} from 'react';
import Styled from 'styled-components/native';
import SafeAreaView from 'react-native-safe-area-view';
import {
    TouchableWithoutFeedback,
    TouchableHighlight,
    TouchableNativeFeedback,
    TouchableOpacity,
    PermissionsAndroid,
    Platform,
    ActivityIndicator,
    ScrollView,
    FlatList,
    PanResponder,
    StyleSheet,
    Keyboard,
    KeyboardAvoidingView,
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';

import NaverMapView, {Circle, Marker, Path, Polyline, Polygon} from "react-native-nmap";
import {isIphoneX} from 'react-native-iphone-x-helper';
import Geolocation from 'react-native-geolocation-service';
import DeviceInfo from 'react-native-device-info';
import Carousel from 'react-native-snap-carousel';
import Modal from 'react-native-modal';

// Local Component
import DentalCarouselItem from '~/Components/Presentational/NearDentalMap/DentalCarouselItem';
import DentalListSlidingUpPanel from '~/Components/Presentational/NearDentalMap/DentalListSlidingUpPanel'
import TouchBloackIndicatorCover from '~/Components/Presentational/TouchBlockIndicatorCover';

// Route
import GETAroundDental from '~/Routes/Dental/GETAroundDental';

const mapHeight = hp('100%') - (wp('11.7%') - (isIphoneX() ? wp("21%") : wp("15%")))

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
padding-bottom: ${DeviceInfo.hasNotch() ? hp('8%') : hp('4%')}px;
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
flex-direction: row;
align-items: center;
padding-top: 7px
padding-bottom: 7px;
background-color: #ffffff;
width: ${wp('100%')};
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
width: ${wp("6.4%")}px;
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

const TimeFilterItemContainer = Styled.View`
padding-top: 32px;
padding-left: 24px;
padding-bottom: 32px;
padding-right: 24px;
align-items: center;
flex-direction: row;
justify-content: space-between;
`;

const TimeFilterLabelText = Styled.Text`
font-weight: 400;
color: #000000;
font-size: 16px;
`;

const TimeFilterInputContainer = Styled.View`
flex-direction: row;
align-items: center;
`;

const SelectAMPMContainer = Styled.View`
flex-direction: row;
align-items: center;
`;

const SelectAMContainer = Styled.View`
padding-left: 8px;
padding-right: 8px;
justify-content: center;
height: ${wp('8.2%')}px;
border-top-left-radius: 8px;
border-bottom-left-radius: 8px;
border-top-width: 1px;
border-bottom-width: 1px;
border-left-width: 1px;
border-color: #c4c4c4;
`;

const SelectPMContainer = Styled.View`
padding-left: 8px;
padding-right: 8px;
justify-content: center;
height: ${wp('8.2%')}px;
border-top-right-radius: 8px;
border-bottom-right-radius: 8px;
border-top-width: 1px;
border-right-width: 1px;
border-bottom-width: 1px;
border-left-width: 1px;
border-color: #c4c4c4;
`;

const SlotText = Styled.Text`
font-size: 12px;
color: #000000;
font-weight: 400;
`;

const TimeTextInputContainer = Styled.View`
width: ${wp('21.3%')}px;
height: ${wp('8.2%')}px;
margin-left: 8px;
padding-top: 4px;
padding-bottom: 4px;
padding-left: 12px;
padding-right: 4px;
border-width: 1px;
border-color: #c4c4c4;
border-radius: 8px;
`;

const TimeTextInput = Styled.TextInput`
font-size: 18px;
font-weight: 400;
color: #000000;
`;

const DeleteTimeFilterButton = Styled.View`
width: ${wp('100%')}px;
height: ${hp('6.89%')}px;
background-color: #f4f4f4;
align-items: center;
justify-content: center;
`;

const DeleteTimeFilterText = Styled.Text`
font-weight: 400;
font-size: 16px;
color: #000000;
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


interface Props {
    navigation: any,
    route: any,
}

interface Coord {
    latitude: number;
    longitude: number;
}

const TEST_NEAR_DENTAL_DATA = [
    {
        index: 1,
        name: "연세웃는아이치과의원",
        rating: 3.1,
        reviewCount: 3,
        isOpen: true,
        isLauchTime: true,
        address: "경기 안양시 동안구 경수대로 428",
        lunchTime: "12:30~13:20",
        openTime: "12:30~12:30",
        location: {
            latitude: 37.29440,
            longitude: 127.04547,
        },
        selected: true,
    },
    {
        index: 2,
        name: "오케이치과의원",
        rating: 3.5,
        reviewCount: 12,
        isOpen: false,
        isLauchTime: true,
        address: "경기도 의왕시 오전동 206",
        lunchTime: "12:30~13:20",
        openTime: "12:30~12:30",
        location: {
            latitude: 37.29404,
            longitude: 127.04458,
        },
        selected: false,
    },
    {
        index: 3,
        name: "굿모닝치과의원",
        rating: 4,
        reviewCount: 20,
        isOpen: false,
        isLauchTime: false,
        address: "경기도 의왕시 모락로 16",
        lunchTime: "12:30~13:20",
        openTime: "12:30~12:30",
        location: {
            latitude: 37.29370,
            longitude: 127.04638,
        },
        selected: false,
    },
]

const NearDentalMap = ({navigation, route}: Props) => {
    const [currentLocation, setCurrentLocation] = useState<Coord>({latitude: 37.564362, longitude: 126.977011});
    const [cameraLocation, setCameraLocation] = useState<Coord>({latitude: 37.564362, longitude: 126.977011});
    const [loadingGetDental, setLoadingGetDental] = useState<boolean>(true);
    const [visibleSelectedDentalItem, setVisibleSelectedDentalItem] = useState<boolean>(false)
    const [visibleDetailFilterList, setVisibleDetailFilterList] = useState<boolean>(false);
    const [visibleTimeFilterModal, setVisibleTimeFilterModal] = useState<boolean>(false);
    const [visibleDayFilterModal, setVisibleDayFilterModal] = useState<boolean>(false);
    const [nearDentalList, setNearDentalList] = useState<Array<any>>(TEST_NEAR_DENTAL_DATA);
    const [currentCarouselIndex, setCurrentCarouselIndex] = useState<number>(0); 
    const [changeDayFilter, setChangeDayFilter] = useState<boolean>(false);
    const [selectedDayFilter, setSelectedDayFilter] = useState<Array<any>>([]);
    const [selectedDayFilterIndicator, setSelectedDayFilterIndicator] = useState<Array<any>>([]);
    const [keyboardHeight, setKeyboardHeight] = useState<number>(0);
    const [selectedTimeType, setSelectedTimeType] = useState<string>("AM");

    const [sort, setSort] = useState<string>("d");
    const [time, setTime] = useState<string>("");
    const [days, setDays] = useState<string>("");
    const [openHoliday, setOpenHoliday] = useState<boolean>(false);
    const [wantParking, setWantParking] = useState<string>("n");
    const [carouselIndex, setCarouselIndex] = useState<number>(0);
    const [dayFilterList, setDayFilterList] = useState<Array<any>>([
        {
            day: "월",
            en: "mon", 
            selected: false
        },
        {
            day: "화",
            en: "tus",
            selected: false
        },
        {
            day: "수",
            en: "wed",
            selected: false
        },
        {
            day: "목",
            en: "thu",
            selected: false
        },
        {
            day: "금",
            en: "fri",
            selected: false
        },
        {
            day: "토",
            en: "sat",
            selected: false
        },
        {
            day: "일",
            en: "sunday",
            selected: false
        },
        {
            day: "전체",
            en: "all",
            selected: false
        },
        {
            day: "null",
            en: "null",
            selected: false
        },
        {
            day: "null",
            en: "null",
            selected: false
        }
    ])

    useEffect(() => {
        mapRef.current.setLocationTrackingMode(2)

        const getInitialNearDental = async () => {
            if(Platform.OS == 'android') {
                getAndroidInitialNearDental()
            } else if(Platform.OS == 'ios') {
                getIosInitialNearDental()
            }
        }

        getInitialNearDental();
    }, [])

    useEffect(() => {
        
        Keyboard.addListener("keyboardWillShow", onKeyboardWillShow);

        return () => {
            Keyboard.removeListener("keyboardWillShow", onKeyboardWillShow);
        }
    }, [])

    const mapRef = useRef<any>(null);
    const dentalFlatListRef = useRef<any>(null); 
    const dentalCarouselRef = useRef<any>(null);
    const timeTextInputRef = useRef<any>(null);
    const currentUser = useSelector((state: any) => state.currentUser);
    const jwtToken = currentUser.user.jwtToken;

    const onKeyboardWillShow = (event: any) => {
        console.log("event", event.endCoordinates.height)
        setKeyboardHeight(event.endCoordinates.height);
    }
    
    async function getAndroidInitialNearDental() {
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

                  const lat = position.coords.latitude;
                    const long = position.coords.longitude;

                    GETAroundDental({jwtToken, lat, long, sort, time, days, wantParking})
                    .then((response) => {
                    console.log("GETAroundDental response", response);
                    setLoadingGetDental(false);
                    })
                    .catch((error) => {
                    console.log("GETAroundDental error", error);
                    setLoadingGetDental(false);
                    })

                  return position;
                },
                (error) => {
                  console.log("사용자 현재 위치 불러오기 실패", error.code, error.message);
                  setLoadingGetDental(false);

                  return false;
                },
                { enableHighAccuracy: false, timeout: 10000, maximumAge: 10000 }
            );
            
        } else {
            const status = await PermissionsAndroid.request(permission)
            return status === 'granted';
        }
    }

    async function getIosInitialNearDental() {
        const hasLocationPermission = true;
        if(hasLocationPermission) {
            Geolocation.getCurrentPosition(
                (position) => {
                    console.log("사용자 현재 위치 position", position)
                    setCurrentLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    })

                    const lat = position.coords.latitude;
                    const long = position.coords.longitude;

                    GETAroundDental({jwtToken, lat, long, sort, time, days, wantParking})
                    .then((response) => {
                    console.log("GETAroundDental response", response);
                    setLoadingGetDental(false);
                    })
                    .catch((error) => {
                    console.log("GETAroundDental error", error);
                    setLoadingGetDental(false);
                    })

                    return position;
                },
                (error) => {
                    console.log("사용자 현재 위치 불러오기 실패", error)
                    setLoadingGetDental(false);

                    return false;
                },
                {enableHighAccuracy: false, timeout: 10000, maximumAge: 10000}
            )
        }
    }

    const getNearDental = () => {
        const lat = currentLocation.latitude;
        const long = currentLocation.longitude;
        GETAroundDental({jwtToken, lat, long, sort, time, days, wantParking})
        .then((response) => {
            console.log("GETAroundDental response", response);
        })
        .catch((error) => {
            console.log("GETAroundDental error", error);
        })
    }
    



    const goBack = () => {
        navigation.goBack();
    }

    const moveToSearchDental = () => {
        navigation.navigate("DentalClinicListScreen", {
            currentLocation: currentLocation
        })
    }

    const clickDentalMarker = (selectedIndex: number) => {
        
        var tmpNearDentalList = nearDentalList;
        tmpNearDentalList.forEach((item, index) => {
            if(index == selectedIndex) {
                tmpNearDentalList[index].selected = true;
            } else {
                tmpNearDentalList[index].selected = false;
            }
        })
        setNearDentalList(nearDentalList);
        setCurrentCarouselIndex(selectedIndex);
        dentalCarouselRef.current.snapToItem(selectedIndex);
        
    }

    const clickMapBackground = () => {
        setVisibleSelectedDentalItem(false)
    }

    const clickBackground = () => {
        Keyboard.dismiss();
        setVisibleTimeFilterModal(false);
    }
    
    const clickDayOfWeekFilter = () => {
        setVisibleDayFilterModal(true);
    }

    const clickTimeFilter = () => {
        setVisibleTimeFilterModal(true);
        //timeTextInputRef.current.focus()
    }

    const clickTimeType = (type: string) => {
        setSelectedTimeType(type);
    }

    const moveToDentalDetail = () => {
        navigation.navigate("DentalClinicStack", {
            screen: "DentalDetailScreen"
        })
    }

    const clickMyLocationTrackingButton = () => {
        mapRef.current.setLocationTrackingMode(2);
    }

    const onSnapToDentalCarouselItem = (selectedIndex: number) => {
        console.log("onSnapToDentalCarouselITem index", selectedIndex);
        //mapRef.current.animateToCoordinate(nearDentalList[index].location);
        var tmpNearDentalList = nearDentalList;
        tmpNearDentalList.forEach((item, index) => {
            if(index == selectedIndex) {
                tmpNearDentalList[index].selected = true;
            } else {
                tmpNearDentalList[index].selected = false;
            }
        })
        setNearDentalList(nearDentalList);
        setCurrentCarouselIndex(selectedIndex);
        //setCameraLocation(nearDentalList[selectedIndex].location)
    }

    const changeHolidayFilter = () => {
    }

    const changeParkingFilter = () => {
    }

    const cancelDayFilter = () => {
        /*
        var tmpDayFilterList = dayFilterList;
        var tmpSelectedDayFilter = new Array();
        var tmpSelectedDayFilterIndicator = new Array();

        tmpDayFilterList.forEach((item, index) => {
            if(item.selected) {
                tmpSelectedDayFilter.push(item)
                tmpSelectedDayFilterIndicator.push(item.day)
            }
        })
        */

        console.log("cancelDayFilter", selectedDayFilter);
        var tmpDayFilterList = dayFilterList;
        var tmpSelectedDayFilter = selectedDayFilter;

        var preDayFilterList = tmpDayFilterList.map(function(item, index) {
            if(tmpSelectedDayFilter.includes(item)) {
                console.log("item", item)
                item.selected = true
                return item
            } else {
                item.selected= false
                return item
            }
        })

        setDayFilterList(preDayFilterList);
        setVisibleDayFilterModal(false);
    }

    const cancelTimeFilter = () => {
        setVisibleTimeFilterModal(false);
    }

    const registerDayFilter = () => {
        var tmpDayFilterList = dayFilterList;
        var tmpSelectedDayFilter = new Array();
        var tmpSelectedDayFilterIndicator = new Array();

        tmpDayFilterList.forEach((item, index) => {
            if(item.selected) {
                tmpSelectedDayFilter.push(item.en)
                tmpSelectedDayFilterIndicator.push(item.day)
            }
        })

        console.log("tmpSelectedDayFilter", tmpSelectedDayFilter); 

        setSelectedDayFilter(tmpSelectedDayFilter);
        setSelectedDayFilterIndicator(tmpSelectedDayFilterIndicator);
        setVisibleDayFilterModal(false);
    }

    const selectDayFilterItem = (day: object, index: number) => {
        var tmpDayFilterList = dayFilterList;

        if(tmpDayFilterList[index].selected === true) {
            tmpDayFilterList[index].selected = false;
            setDayFilterList(tmpDayFilterList);
            setChangeDayFilter(!changeDayFilter);
        } else {
            tmpDayFilterList[index].selected = true;
            setDayFilterList(tmpDayFilterList);
            setChangeDayFilter(!changeDayFilter);
        }
    }


    const renderCarouselItem = ({item, index}: any) => {
        return (
            <TouchableWithoutFeedback onPress={() => moveToDentalDetail()}>
            <DentalCarouselItemContainer>
                <DentalCarouselItem
                isOpen={item.isOpen}
                isLunchTime={item.isLauchTime}
                rating={item.rating}
                reviewCount={item.reviewCount}
                name={item.name}
                address={item.address}
                lunchTime={item.lunchTime}
                openTime={item.openTime}/>
            </DentalCarouselItemContainer>
            </TouchableWithoutFeedback>
        )
    }

    const renderDayFilterItem = ({item, index}: any) => {
        if(index < 7) {
            return (
                <TouchableWithoutFeedback onPress={() => selectDayFilterItem(item, index)}>
                <DetailFilterItemContainer style={item.selected ? {backgroundColor: "#c4c4c4"} : {backgroundColor: "#ffffff"}}>
                    <FilterItemText>{(item.day + "요일")}</FilterItemText>
                </DetailFilterItemContainer>
                </TouchableWithoutFeedback>
            )
        } else if(index === 7) {
            return (
                <TouchableWithoutFeedback onPress={() => selectDayFilterItem(item, index)}>
                <DetailFilterItemContainer style={item.selected ? {backgroundColor: "#c4c4c4"} : {backgroundColor: "#ffffff"}}>
                <FilterItemText>{(item.day)}</FilterItemText>
                </DetailFilterItemContainer>
                </TouchableWithoutFeedback>
        )} else if(index > 7) {
            return (
                <DetailFilterItemContainer style={{opacity: 0}}>
                    <FilterItemText>{item.day}</FilterItemText>
                </DetailFilterItemContainer>
            )
        } else {
            return (
                <DetailFilterItemContainer/>
            )
        }
    }

    return (
        <SafeAreaView style={styles.safeAreaStyle} forceInset={{ top: 'always'}}>
        <Container>
            <HeaderBar>
                <TouchableWithoutFeedback onPress={() => moveToSearchDental()}>
                <SearchInputContainer>
                    <SearchIcon
                    source={require('~/Assets/Images/Search/ic_search.png')}/>
                    <SearchText>{"병원, 지역을 검색해 보세요."}</SearchText>
                </SearchInputContainer>
                </TouchableWithoutFeedback>
            </HeaderBar>
            <MapContainer>
                <NaverMapView
                ref={mapRef}
                compass={false}
                style={{width: '100%', height: hp('100%') - (isIphoneX() ? wp('44%') : wp('38%'))}}
                showsMyLocationButton={false}
                center={{...cameraLocation, zoom: 16}}
                onMapClick={(e:any) => clickMapBackground()}
                zoomControl={false}>
                {nearDentalList.map((item, index) => {
                    return (
                        <Marker
                        coordinate={item.location}
                        onClick={() => clickDentalMarker(index)}
                        image={item.selected ? require('~/Assets/Images/Map/ic_dentalMarker_selected.png') : require('~/Assets/Images/Map/ic_dentalMarker_unselected.png')}/>
                    )
                })}
                </NaverMapView>
                <MapHeaderContainer>
                <FilterListContainer>
                <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                        {selectedDayFilterIndicator.indexOf("전체") !== -1 && (
                        <TouchableWithoutFeedback onPress={() => clickDayOfWeekFilter()}>
                        <FilterItemContainer style={{marginLeft: 16, backgroundColor: "#2998FF"}}>
                            <FilterItemText style={{color: "#ffffff"}}>{"전체"}</FilterItemText>
                        </FilterItemContainer>
                        </TouchableWithoutFeedback>
                        )}
                        {selectedDayFilterIndicator.length === 0 && (
                        <TouchableWithoutFeedback onPress={() => clickDayOfWeekFilter()}>
                        <FilterItemContainer style={{marginLeft: 16}}>
                            <FilterItemText>{"방문일"}</FilterItemText>
                        </FilterItemContainer>
                        </TouchableWithoutFeedback>
                        )}
                        {selectedDayFilterIndicator.length === 1 && selectedDayFilterIndicator.indexOf("전체") === -1 && (
                        <TouchableWithoutFeedback onPress={() => clickDayOfWeekFilter()}>
                        <FilterItemContainer style={{marginLeft: 16, backgroundColor: "#2998FF"}}>
                            <FilterItemText style={{color: "#ffffff"}}>{selectedDayFilterIndicator[0] + "요일"}</FilterItemText>
                        </FilterItemContainer>
                        </TouchableWithoutFeedback>
                        )}
                        {selectedDayFilterIndicator.length > 1 && selectedDayFilterIndicator.indexOf("전체") === -1 && (
                        <TouchableWithoutFeedback onPress={() => clickDayOfWeekFilter()}>
                        <FilterItemContainer style={{marginLeft: 16, backgroundColor: "#2998FF"}}>
                        {selectedDayFilterIndicator.map((item, index) => {
                        if(index === 0) {
                            return (
                                <FilterItemText style={{color: "#ffffff"}}>{item + "요일"}</FilterItemText>
                            )
                        } else {
                            return (
                                <FilterItemText style={{color: "#ffffff"}}>{", " + item + "요일"}</FilterItemText>
                            )
                        }
                        })}
                        </FilterItemContainer>
                        </TouchableWithoutFeedback>
                        )}
                    <TouchableWithoutFeedback onPress={() => clickTimeFilter()}>
                    <FilterItemContainer style={{marginLeft: 12}}>
                        <FilterItemText>{"방문시간"}</FilterItemText>
                    </FilterItemContainer>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => changeHolidayFilter()}>
                    <FilterItemContainer style={[{marginLeft: 12}, openHoliday && {backgroundColor: "#2998FF"}]}>
                        <FilterItemText style={openHoliday && {color: "#FFFFFF"}}>{"일요일･공휴일 휴진"}</FilterItemText>
                    </FilterItemContainer>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => changeParkingFilter()}>
                    <FilterItemContainer style={[{marginLeft: 12, marginRight: 16}, (wantParking === "y") && {backgroundColor: "#2998FF"}]}>
                        <FilterItemText style={(wantParking === "y") && {color: "#FFFFFF"}}>{"주차가능"}</FilterItemText>
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
                    source={require('~/Assets/Images/Map/ic_target.png')}/>
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
                <MapInsetBottomShadow
                style={styles.insetShadow}/>
                <DentalCarouselListContainer>
                    <Carousel
                    contentContainerCustomStyle={{justifyContent: "center"}}
                    inactiveSlideOpacity={1}
                    inactiveSlideScale={0.93}
                    inactiveSlideShift={0}
                    onSnapToItem={(index) => onSnapToDentalCarouselItem(index)}
                    ref={dentalCarouselRef}
                    data={nearDentalList}
                    renderItem={renderCarouselItem}
                    sliderWidth={wp('100%')}
                    itemWidth={wp('87.2%')}/>
                    <CarouselIndexContainer>
                        <CarouselIndexText style={styles.carouselIndexShadow}>{currentCarouselIndex+1 + " / " + nearDentalList.length}
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
                        <DetailFilterCancelText>{"취소"}</DetailFilterCancelText>
                    </DetailFilterHeaderLeftContainer>
                    </TouchableWithoutFeedback>
                    <DetailFilterTitleText>{"방문일 설정"}</DetailFilterTitleText>
                    <TouchableWithoutFeedback onPress={() => registerDayFilter()}>
                    <DetailFilterHeaderRightContainer>
                        <DetailFilterRegisterText>{"저장"}</DetailFilterRegisterText>
                    </DetailFilterHeaderRightContainer>
                    </TouchableWithoutFeedback>
                </DetailFilterHeaderContainer>
                <DetailFilterListContainer>
                    <FlatList
                    columnWrapperStyle={{justifyContent:"space-between", marginTop: 12}}
                    data={dayFilterList}
                    keyExtractor={(item, index) => `${index}`}
                    numColumns={5}
                    renderItem={renderDayFilterItem}/>
                </DetailFilterListContainer>
            </DetailFilterModalContainer>
            </Modal>
            <Modal
            isVisible={visibleTimeFilterModal}
            style={styles.timeFilterModalView && {marginBottom: keyboardHeight, marginLeft: 0}}
            onBackdropPress={() => clickBackground()}
            backdropOpacity={0.25}>
            <DetailFilterModalContainer>
                <DetailFilterHeaderContainer>
                    <DetailFilterHeaderLeftContainer>
                        <DetailFilterCancelText>{"취소"}</DetailFilterCancelText>
                    </DetailFilterHeaderLeftContainer>
                    <DetailFilterTitleText>{"방문시간 설정"}</DetailFilterTitleText>
                    <DetailFilterHeaderRightContainer>
                        <DetailFilterRegisterText>{"저장"}</DetailFilterRegisterText>
                    </DetailFilterHeaderRightContainer>
                </DetailFilterHeaderContainer>
                <TimeFilterModalContainer>
                    <TimeFilterItemContainer>
                        <TimeFilterLabelText>{"시간"}</TimeFilterLabelText>
                        <TimeFilterInputContainer>
                            <SelectAMPMContainer>
                                <TouchableWithoutFeedback onPress={() => clickTimeType("AM")}>
                                <SelectAMContainer style={selectedTimeType === "AM" ? {backgroundColor: "#c3c3c3"} : {backgroundColor: "#ffffff"}}>
                                    <SlotText>{"오전"}</SlotText>
                                </SelectAMContainer>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => clickTimeType("PM")}>
                                <SelectPMContainer style={selectedTimeType === "PM" ? {backgroundColor: "#c3c3c3"} : {backgroundColor: "#ffffff"}}>
                                    <SlotText>{"오후"}</SlotText>
                                </SelectPMContainer>
                                </TouchableWithoutFeedback>
                            </SelectAMPMContainer>
                            <TimeTextInputContainer>
                                <TimeTextInput
                                ref={timeTextInputRef}
                                placeholder={"00:00"}
                                autoFocus={true}
                                keyboardType={"numeric"}
                                caretHidden={true}
                                />
                            </TimeTextInputContainer>
                        </TimeFilterInputContainer>
                    </TimeFilterItemContainer>
                </TimeFilterModalContainer>
                <DeleteTimeFilterButton>
                    <DeleteTimeFilterText>{"삭제"}</DeleteTimeFilterText>
                </DeleteTimeFilterButton>
            </DetailFilterModalContainer>
            </Modal>
            <TouchBloackIndicatorCover
            loading={loadingGetDental}/>
        </Container>
        </SafeAreaView>
    )
}

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
        justifyContent: "flex-end",
        margin: 0,
    },
    timeFilterModalView: {
        justifyContent: "flex-end",
        margin: 0,
    },
    insetShadow: {
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowRadius: 100,
        shadowOpacity: 0.4
    },
    carouselIndexShadow: {
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowRadius: 6,
        shadowOpacity: 0.5
    },
    safeAreaStyle: {
        flex: 1,
        backgroundColor: "#ffffff"
    }
})

export default NearDentalMap;


/*
<DentalListSlidingUpPanel
navigation={navigation}
route={route}
/>
*/