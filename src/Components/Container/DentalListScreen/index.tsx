import React, {useEffect, useState, useRef, createRef} from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import Styled from 'styled-components/native';
import {
    TouchableWithoutFeedback,
    FlatList,
    ScrollView,
    Keyboard,
    StyleSheet,
    Picker
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

import {isIphoneX} from 'react-native-iphone-x-helper'

// Local Component
import DentalListItem from '~/Components/Presentational/DentalListItem'

// Route
import GETDentalMainSearch from '~/Routes/Search/GETDentalMainSearch';
import GETAroundDental from '~/Routes/Dental/GETAroundDental';

const Container = Styled.SafeAreaView`
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

const HeaderLeftContainer = Styled.View`
padding: 10px 15px 10px 16px;
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
background-color: #ffffff;
padding: 13px 16px 13px 15px;
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

const BodyContainer = Styled.View`
 flex: 1;
 background-color: #ffffff;
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

const SearchIcon = Styled.Image`
width: ${wp("6.4%")}px;
height: ${wp('6.4%')}px;
`;

const SearchTextInput = Styled.TextInput`
flex: 1;
padding-left: 12px;
font-size: 16px;
color: #000000;
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
padding: 9px 11px 9px 11px;
border-radius: 100px;
background-color: #ffffff;
align-items: center;
justify-content: center;
border-width: 1px;
`;

const ViewMapText = Styled.Text`
font-size: 16px
font-weight: 400;
color: #000000;
`;


const FilterListContainer = Styled.View`
width: ${wp('100%')};
height: ${hp('6.6%')}px;
flex-direction: row;
align-items: center;
padding-top: 7px
padding-bottom: 7px;
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

const TimePickerLabelText = Styled.Text`
font-size: 20px;
color: #000000;
`;


const TEST_DENTAL_LIST = [
    {
        name: "연세자연치과의원",
        address: "종로구 세종대로"
    },
    {
        name: "연세정인치과의원",
        address: "종로구 세문안로",
    },
    {
        name: "더스퀘워치과의원",
        address: "종로구 종로"
    },
    {
        name: "연세자연치과의원",
        address: "종로구 세종대로"
    },
    {
        name: "연세정인치과의원",
        address: "종로구 세문안로",
    },
    {
        name: "더스퀘워치과의원",
        address: "종로구 종로"
    }
]

interface Props {
    navigation: any,
    route: any,
}

const DentalListScreen = ({navigation, route}: Props) => {
    const nearDentalList = useSelector((state: any) => state.dentalList).nearDentalList
    const [dentalList, setDentalList] = useState<Array<object>>(nearDentalList);
    const [visibleTimeFilterModal, setVisibleTimeFilterModal] = useState<boolean>(false);
    const [visibleDayFilterModal, setVisibleDayFilterModal] = useState<boolean>(false);
    const [bottomPadding, setBottomPadding] = useState<number>(40);
    const [sort, setSort] = useState<string>("d");
    const [hourPickerValue, setHourPickerValue] = useState<number>(1);
    const [minutePickerValue, setMinutePickerValue] = useState<string>("00");
    const [timeSlotPickerValue, setTimeSlotPickerValue] = useState<string>("오전");
    const [loadingGetDental, setLoadingGetDental] = useState<boolean>(false);
    const [changeDentalList, setChangeDentalList] = useState<boolean>(false);
  
    const timeFilterActionSheet = createRef<any>();
    const currentUser = useSelector((state: any) => state.currentUser);
    const currentLocation = useSelector((state: any) => state.currentUser).currentLocation;
    const dispatch = useDispatch();
    const jwtToken = currentUser.user.jwtToken;
    const todayIndex = new Date().getDay();

    // 방문일 설정 redux state
    const dayList = useSelector((state: any) => state.dentalFilter).dayList;
    const selectedDayList = useSelector((state: any) => state.dentalFilter).selectedDayList;
    const dayFilter = useSelector((state: any) => state.dentalFilter).dayFilter;

    // 방문시간 설정 redux state
    const timeFilter = useSelector((state: any) => state.dentalFilter).timeFilter;

    // 공휴일진료 설정 redux state
    const holidayFilter = useSelector((state: any) => state.dentalFilter).holidayFilter; 

    // 주차가능 설정 redux state
    const parkingFilter = useSelector((state: any) => state.dentalFilter).parkingFilter;


    useEffect(() => {
        Keyboard.addListener("keyboardWillShow", onKeyboardWillShow);
        Keyboard.addListener("keyboardWillHide", onKeyboardWillHide);

        return () => {
            Keyboard.removeListener("keyboardWillShow", onKeyboardWillShow);
            Keyboard.removeListener("keyboardWillHide", onKeyboardWillHide);
        }
    }, [])
    
    useEffect(() => {
        getNearDental();
        
    }, [dayFilter, timeFilter, holidayFilter, parkingFilter])

    const onKeyboardWillShow = () => {
        setBottomPadding(20);
    }
  
    const onKeyboardWillHide = () => {
        setBottomPadding(40);
    }


    const goBack = () => {
        navigation.goBack();
    }


    const moveToMap = () => {
        navigation.navigate("NearDentalMap")
    }

    const onSubmitSearchInput = (keyword: string) => {
        console.log("onSubmitSearchInput keyword", keyword);
        searchDental(keyword)
    }

    const searchDental = (query: string) => {

        const long = route.params?.currentLocation.longitude;
        const lat = route.params?.currentLocation.latitude;

        GETDentalMainSearch({jwtToken, query, long, lat})
        .then((response: any) => {
            console.log("GETDentalMainSearch response", response)
        })
        .catch((error: any) => {
            console.log("GETDentalMainSearch error", error);
        })
    }

    const clickDayFilter = () => {
        setVisibleDayFilterModal(true);
    }

    const selectDayFilterItem = (day: object, index: number) => {
        dispatch(allActions.dentalFilterActions.selectDayItem(index))
    }

    const getNearDental = () => {
        const lat = currentLocation.latitude;
        const long = currentLocation.longitude;
        setLoadingGetDental(true);

        GETAroundDental({jwtToken, lat, long, sort, timeFilter, dayFilter, parkingFilter})
        .then((response: any) => {
            setLoadingGetDental(false);
            console.log("GETAroundDentalSearch response", response);
            console.log("nearDentalList", nearDentalList);
            //const slicedDentalList = response.slice(0, 70);
            //slicedDentalList[0].selected = true;
            //setNearDentalList(response);
            dispatch(allActions.dentalListActions.setNearDentalList(response));
            setChangeDentalList(!changeDentalList)
        })
        .catch((error) => {
            setLoadingGetDental(false);
        })
    }


    const clickTimeFilter = () => {
        if(timeFilter === "") {
            setVisibleTimeFilterModal(true);
        } else {
            timeFilterActionSheet.current.show();
        }
    }


    const onPressTimeFilterActionSheet = (index: number) => {
        if(index === 1) {
            setVisibleTimeFilterModal(true)
        } else if(index === 2) {
            dispatch(allActions.dentalFilterActions.setTimeFilter(""));
        }
    }

    const changeHolidayFilter = () => {
    }

    const changeParkingFilter = () => {
        if(parkingFilter === "y") {
            dispatch(allActions.dentalFilterActions.setParkingFilter("n"))
        } else if(parkingFilter === "n") {
            dispatch(allActions.dentalFilterActions.setParkingFilter("y"))
        }
    }

    const cancelDayFilter = () => {

        console.log("cancelDayFilter selectedDayFilter", selectDayFilterItem);
        console.log("cancelDayFilter dayList", dayList);
        var tmpDayList = dayList;
        var tmpSelectedDayList = selectedDayList;

        var preDayList = tmpDayList.map(function(item: any, index: number) {
            if(tmpSelectedDayList.includes(item)) {
                console.log("item", item)
                item.selected = true
                return item
            } else {
                item.selected= false
                return item
            }
        })

        //setDayFilterList(preDayList);
        dispatch(allActions.dentalFilterActions.setDayList(preDayList));
        //setSelectedDayFilter(preDayFilterList);
        setVisibleDayFilterModal(false);
    }

    const registerDayFilter = () => {
        var tmpDayList = dayList;

        var tmpSelectedDayList = new Array();
        var tmpDayFilter = new Array();

        tmpDayList.forEach((item: any, index: number) => {
            if(item.selected) {
                tmpDayFilter.push(item.value)
                tmpSelectedDayList.push(item)
            }
        })

        console.log("tmpSelectedDayList", tmpSelectedDayList);
        
        dispatch(allActions.dentalFilterActions.setDayFilter(tmpDayFilter));
        dispatch(allActions.dentalFilterActions.setSelectedDayList(tmpSelectedDayList));

        setVisibleDayFilterModal(false);
    }

    const cancelTimeFilter = () => {
        setVisibleTimeFilterModal(false);
    }

    const onValueChangeHourPicker = (itemValue: any, itemIndex: number) => {
        console.log("onValueChangeHourPicker itemValue, itemIndex", itemValue, itemIndex);
        setHourPickerValue(itemValue)

    }


    const onValueChangeMinutePicker = (itemValue: any, itemIndex: number) => {
        console.log("onValueChangeMinutePicker itemValue, itemIndex", itemValue, itemIndex);
        setMinutePickerValue(itemValue)
    }


    const onValueChangeTimeSlotPicker = (itemValue: any, itemIndex: number) => {
        console.log("onValueChangeTimeSlorPicker itemValue, itemIndex", itemValue, itemIndex);
        setTimeSlotPickerValue(itemValue)
    }

    const registerTimeFilter = () => {
        setVisibleTimeFilterModal(false);
        if(timeSlotPickerValue === "오전") {
            const formattedHourPickerValue = hourPickerValue < 10 ? ('0' + hourPickerValue) : (hourPickerValue);
            const formattedTime = formattedHourPickerValue + ':' + minutePickerValue + ":00"
            dispatch(allActions.dentalFilterActions.setTimeFilter(formattedTime));
        } else if(timeSlotPickerValue == "오후") {
            const formattedTime = (Number(hourPickerValue) + 12) + ":" + minutePickerValue + ":00"
            dispatch(allActions.dentalFilterActions.setTimeFilter(formattedTime));
        }
    }

    const moveToDentalDetail = (dentalId: number) => {
        navigation.navigate("DentalClinicStack", {
            screen: "DentalDetailScreen",
        })
    }

    const renderDentalItem = ({item, index}: any) => {

        const isLunchTime = item.lunchTimeNow == 1 ? true : false;
        const isOpen = item.conclustionNow == 1 ? true : false;
        const rating = item.reviewAVGStarRate ? item.reviewAVGStarRate : "평가없음";
        
        let todayStartTime = ""
        let todayEndTime = ""

        if(todayIndex === 0) {
            todayStartTime = item.Sun_Consulation_start_time?.slice(0, 5);
            todayEndTime = item.Sun_Consulation_end_time?.slice(0, 5);
        } else if(todayIndex === 1) {
            todayStartTime = item.Mon_Consulation_start_time?.slice(0, 5);
            todayEndTime = item.Mon_Consulation_end_time?.slice(0, 5);
        } else if(todayIndex === 2) {
            todayStartTime = item.Tus_Consulation_start_time?.slice(0, 5);
            todayEndTime = item.Tus_Consulation_end_time?.slice(0, 5);
        } else if(todayIndex === 3) {
            todayStartTime = item.Wed_Consulation_start_time?.slice(0, 5);
            todayEndTime = item.Wed_Consulation_end_time?.slice(0, 5);
        } else if(todayIndex === 4) {
            todayStartTime = item.Thu_Consulation_start_time?.slice(0, 5);
            todayEndTime = item.Thu_Consulation_end_time?.slice(0, 5);
        } else if(todayIndex === 5) {
            todayStartTime = item.Fri_Consulation_start_time?.slice(0, 5);
            todayEndTime = item.Fri_Consulation_end_time?.slice(0, 5);
        } else if(todayIndex === 6) {
            todayStartTime = item.Sat_Consulation_start_time?.slice(0, 5);
            todayEndTime = item.Sat_Consulation_end_time?.slice(0, 5);
        }
        return (
            <DentalListItem
            isOpen={isOpen}
            isLunchTime={isLunchTime}
            name={item.name}
            address={item.address}
            rating={rating}
            reviewCount={item.reviewNum}
            lunchTime={item.lunchTime}
            openTime={todayStartTime}
            closeTime={todayEndTime}
            moveToDentalDetail={moveToDentalDetail}
            />
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
        <SafeAreaView style={styles.safeAreaStyle} forceInset={{top: 'always'}}> 
        <Container>
            <HeaderBar>
                <SearchInputContainer>
                    <SearchIcon
                    source={require('~/Assets/Images/Search/ic_search.png')}/>
                    <SearchTextInput
                    autoFocus={true}
                    placeholder={"병원, 지역을 검색해 보세요."}
                    placeholderTextColor={"#979797"}
                    onSubmitEditing={(event: any) => onSubmitSearchInput(event.nativeEvent.text)}/>
                </SearchInputContainer>
            </HeaderBar>
            <BodyContainer>
                <FilterListContainer>
                <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                        {selectedDayList.indexOf("전체") !== -1 && (
                        <TouchableWithoutFeedback onPress={() => clickDayFilter()}>
                        <FilterItemContainer style={{marginLeft: 16, backgroundColor: "#2998FF"}}>
                            <FilterItemText style={{color: "#ffffff"}}>{"전체"}</FilterItemText>
                        </FilterItemContainer>
                        </TouchableWithoutFeedback>
                        )}
                        {selectedDayList.length === 0 && (
                        <TouchableWithoutFeedback onPress={() => clickDayFilter()}>
                        <FilterItemContainer style={{marginLeft: 16}}>
                            <FilterItemText>{"방문일"}</FilterItemText>
                        </FilterItemContainer>
                        </TouchableWithoutFeedback>
                        )}
                        {selectedDayList.length === 1 && selectedDayList.indexOf("전체") === -1 && (
                        <TouchableWithoutFeedback onPress={() => clickDayFilter()}>
                        <FilterItemContainer style={{marginLeft: 16, backgroundColor: "#2998FF"}}>
                            <FilterItemText style={{color: "#ffffff"}}>{selectedDayList[0].day + "요일"}</FilterItemText>
                        </FilterItemContainer>
                        </TouchableWithoutFeedback>
                        )}
                        {selectedDayList.length > 1 && selectedDayList.indexOf("전체") === -1 && (
                        <TouchableWithoutFeedback onPress={() => clickDayFilter()}>
                        <FilterItemContainer style={{marginLeft: 16, backgroundColor: "#2998FF"}}>
                        {selectedDayList.map((item: any, index: number) => {
                        if(index === 0) {
                            return (
                                <FilterItemText style={{color: "#ffffff"}}>{item.day + "요일"}</FilterItemText>
                            )
                        } else {
                            return (
                                <FilterItemText style={{color: "#ffffff"}}>{", " + item.day + "요일"}</FilterItemText>
                            )
                        }
                        })}
                        </FilterItemContainer>
                        </TouchableWithoutFeedback>
                        )}
                    <TouchableWithoutFeedback onPress={() => clickTimeFilter()}>
                    <FilterItemContainer style={[{marginLeft: 12}, (timeFilter !== "") && {backgroundColor: "#2998FF"}]}>
                        <FilterItemText
                        style={(timeFilter !== "") && {color: "#ffffff"}}>{timeFilter ? timeFilter.slice(0, 5) : "방문시간"}</FilterItemText>
                    </FilterItemContainer>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => changeHolidayFilter()}>
                    <FilterItemContainer style={[{marginLeft: 12}, holidayFilter && {backgroundColor: "#2998FF"}]}>
                        <FilterItemText style={holidayFilter && {color: "#FFFFFF"}}>{"일요일･공휴일 휴진"}</FilterItemText>
                    </FilterItemContainer>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => changeParkingFilter()}>
                    <FilterItemContainer style={[{marginLeft: 12, marginRight: 16}, (parkingFilter === "y") && {backgroundColor: "#2998FF"}]}>
                        <FilterItemText style={(parkingFilter === "y") && {color: "#FFFFFF"}}>{"주차가능"}</FilterItemText>
                    </FilterItemContainer>
                    </TouchableWithoutFeedback>
                </ScrollView>
                </FilterListContainer>
                <KeyboardAwareFlatList
                showsVerticalScrollIndicator={false}
                data={nearDentalList}
                renderItem={renderDentalItem}/>
            </BodyContainer>
                <AboveKeyboardContainer style={{paddingBottom: bottomPadding}}>
                <AboveKeyboard>
                <MapButtonContainer>
                <TouchableWithoutFeedback onPress={() => moveToMap()}>
                <ViewMapButton>
                    <ViewMapText>{"지도로보기"}</ViewMapText>
                </ViewMapButton>
                </TouchableWithoutFeedback>
                </MapButtonContainer>
                </AboveKeyboard>
                </AboveKeyboardContainer>
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
                    data={dayList}
                    keyExtractor={(item, index) => `${index}`}
                    numColumns={5}
                    renderItem={renderDayFilterItem}/>
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
                        <DetailFilterCancelText>{"취소"}</DetailFilterCancelText>
                    </DetailFilterHeaderLeftContainer>
                    </TouchableWithoutFeedback>
                    <DetailFilterTitleText>{"방문시간 설정"}</DetailFilterTitleText>
                    <TouchableWithoutFeedback onPress={() => registerTimeFilter()}>
                    <DetailFilterHeaderRightContainer>
                        <DetailFilterRegisterText>{"저장"}</DetailFilterRegisterText>
                    </DetailFilterHeaderRightContainer>
                    </TouchableWithoutFeedback>
                </DetailFilterHeaderContainer>
                <TimeFilterModalContainer>
                    <TimePickerContainer>
                    <Picker
                    selectedValue={hourPickerValue}
                    onValueChange={(itemValue, itemIndex) => onValueChangeHourPicker(itemValue, itemIndex)}
                    style={{width: wp('26%'), height: hp("26%")}}>
                        <Picker.Item label={"1"} value="1"/>
                        <Picker.Item label={"2"} value="2"/>
                        <Picker.Item label={"3"} value="3"/>
                        <Picker.Item label={"4"} value="4"/>
                        <Picker.Item label={"5"} value="5"/>
                        <Picker.Item label={"6"} value="6"/>
                        <Picker.Item label={"7"} value="7"/>
                        <Picker.Item label={"8"} value="8"/>
                        <Picker.Item label={"9"} value="9"/>
                        <Picker.Item label={"10"} value="10"/>
                        <Picker.Item label={"11"} value="11"/>
                        <Picker.Item label={"12"} value="12"/>
                    </Picker>
                    <TimePickerLabelText>{"시"}</TimePickerLabelText>
                    <Picker
                    style={{width: wp('26%'), height: hp("26%")}}
                    onValueChange={(itemValue, itemIndex) => onValueChangeMinutePicker(itemValue, itemIndex)}
                    selectedValue={minutePickerValue}>
                        <Picker.Item label={"00"} value="00"/>
                        <Picker.Item label={"15"} value="15"/>
                        <Picker.Item label={"30"} value="30"/>
                        <Picker.Item label={"45"} value="45"/>
                    </Picker>
                    <TimePickerLabelText>{"분"}</TimePickerLabelText>
                    <Picker
                    style={{width: wp('26%'), height: hp("26%")}}
                    onValueChange={(itemValue, itemIndex) => onValueChangeTimeSlotPicker(itemValue, itemIndex)}
                    selectedValue={timeSlotPickerValue}>
                        <Picker.Item label={"오전"} value="오전"/>
                        <Picker.Item label={"오후"} value="오후"/>
                    </Picker>
                    </TimePickerContainer>
                </TimeFilterModalContainer>
            </DetailFilterModalContainer>
            </Modal>
            <ActionSheet
            ref={timeFilterActionSheet}
            options={["취소", "수정하기", "삭제하기"]}
            cancelButtonIndex={0}
            destructiveButtonIndex={2}
            onPress={(index: any) => onPressTimeFilterActionSheet(index)}
            />
            </Container>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeAreaStyle: {
        flex: 1,
        backgroundColor: "#ffffff"
    },
    dayFilterModalView: {
        justifyContent: "flex-end",
        margin: 0,
    },
    timeFilterModalView: {
        justifyContent: "flex-end",
        margin: 0,
    },
})

export default DentalListScreen;