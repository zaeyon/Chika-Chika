import React, {useEffect, useState, useRef} from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import Styled from 'styled-components/native';
import {
    TouchableWithoutFeedback,
    FlatList,
    ScrollView,
    Keyboard,
    StyleSheet
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';
import {useSelector} from 'react-redux';
import AboveKeyboard from 'react-native-above-keyboard';

import {isIphoneX} from 'react-native-iphone-x-helper'

// Local Component
import DentalListItem from '~/Components/Presentational/DentalListItem'

// Route
import GETDentalMainSearch from '~/Routes/Search/GETDentalMainSearch';

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
border-width: 1px;
border-color: #c4c4c4;
`;

const FilterItemText = Styled.Text`
color: #000000;
font-size: 14px;
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

const DentalClinicListScreen = ({navigation, route}: Props) => {
    const [dentalList, setDentalList] = useState<Array<object>>(TEST_DENTAL_LIST);
    const [visibleTimeFilterModal, setVisibleTimeFilterModal] = useState<boolean>(false);
    const [visibleDayFilterModal, setVisibleDayFilterModal] = useState<boolean>(false);
    const [selectedDayFilterIndicator, setSelectedDayFilterIndicator] = useState<Array<any>>([]);
    const [bottomPadding, setBottomPadding] = useState<number>(40);

    const currentUser = useSelector((state: any) => state.currentUser);
    const jwtToken = currentUser.user.jwtToken;

    useEffect(() => {
        console.log("route.params?.currentLocation", route.params.currentLocation);
        Keyboard.addListener("keyboardWillShow", onKeyboardDidShow);
        Keyboard.addListener("keyboardDidHide", onKeyboardDidHide);

        return () => {
            Keyboard.removeListener("keyboardWillShow", onKeyboardDidShow);
            Keyboard.removeListener("keyboardDidHide", onKeyboardDidHide);
        }
    }, [])

    const onKeyboardDidShow = () => {
        setBottomPadding(20);
    }
  
    const onKeyboardDidHide = () => {
        setBottomPadding(40);
    }


    const goBack = () => {
        navigation.goBack();
    }

    const renderDentalItem = ({item, index}: any) => {
        return (
            <DentalListItem
            name={item.name}
            address={item.address}
            navigation={navigation}
            route={route}/>
        )
    }

    const moveToMap = () => {
        navigation.navigate("NearDentalMap")
    }

    const clickDayOfWeekFilter = () => {
        setVisibleDayFilterModal(true);
    }

    const clickTimeFilter = () => {
        setVisibleTimeFilterModal(true);
        //timeTextInputRef.current.focus()
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
                    <TouchableWithoutFeedback onPress={() => clickDayOfWeekFilter()}>
                    <FilterItemContainer style={{marginLeft: 16}}>
                        {selectedDayFilterIndicator.indexOf("전체") !== -1 && (
                        <FilterItemText>{"전체"}</FilterItemText>
                        )}
                        {selectedDayFilterIndicator.length === 0 && (
                        <FilterItemText>{"방문일"}</FilterItemText>
                        )}
                        {selectedDayFilterIndicator.length === 1 && selectedDayFilterIndicator.indexOf("전체") === -1 && (
                        <FilterItemText>{selectedDayFilterIndicator[0] + "요일"}</FilterItemText>
                        )}
                        {selectedDayFilterIndicator.length > 1 && selectedDayFilterIndicator.indexOf("전체") === -1 && (
                        <FilterItemText>{selectedDayFilterIndicator.join(",")}</FilterItemText>
                        )}
                    </FilterItemContainer>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => clickTimeFilter()}>
                    <FilterItemContainer style={{marginLeft: 12}}>
                        <FilterItemText>{"방문시간"}</FilterItemText>
                    </FilterItemContainer>
                    </TouchableWithoutFeedback>
                    <FilterItemContainer style={{marginLeft: 12}}>
                        <FilterItemText>{"일요일･공휴일 휴진"}</FilterItemText>
                    </FilterItemContainer>
                    <FilterItemContainer style={{marginLeft: 12, marginRight: 16}}>
                        <FilterItemText>{"주차가능"}</FilterItemText>
                    </FilterItemContainer>
                </ScrollView>
                </FilterListContainer>
                <KeyboardAwareFlatList
                showsVerticalScrollIndicator={false}
                data={dentalList}
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
        </Container>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeAreaStyle: {
        flex: 1,
        backgroundColor: "#ffffff"
    }
})

export default DentalClinicListScreen;