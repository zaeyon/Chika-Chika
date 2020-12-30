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
import DeviceInfo from 'react-native-device-info';
import {isIphoneX} from 'react-native-iphone-x-helper'

// Local Component
import DentalListItem from '~/Components/Presentational/DentalListItem'

// Route
import GETDentalMainSearch from '~/Routes/Search/GETDentalMainSearch';

const Container = Styled.View`
height: ${hp('100%') - (DeviceInfo.hasNotch() ? wp('44%') : wp('38%'))}px;
background-color: #ffffff;
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

const BodyContainer = Styled.View`
`;

const ViewMapText = Styled.Text`
font-size: 16px
font-weight: 400;
color: #000000;
`;

interface Props {
    openMap: () => void,
}

const DentalList = ({openMap}: Props) => {
    const nearDentalList = useSelector((state: any) => state.dentalList).nearDentalList
    const [bottomPadding, setBottomPadding] = useState<number>(40);
    
    useEffect(() => {
        Keyboard.addListener("keyboardWillShow", onKeyboardWillShow);
        Keyboard.addListener("keyboardWillHide", onKeyboardWillHide);

        return () => {
            Keyboard.removeListener("keyboardWillShow", onKeyboardWillShow);
            Keyboard.removeListener("keyboardWillHide", onKeyboardWillHide);
        }
    }, [])

    const onKeyboardWillShow = () => {
        setBottomPadding(20);
    }
  
    const onKeyboardWillHide = () => {
        setBottomPadding(40);
    }


    const goBack = () => {
        //navigation.goBack();
    }

    const renderDentalItem = ({item, index}: any) => {
        return (
            <DentalListItem
            name={item.name}
            address={item.address}/>
        )
    }

    const moveToMap = () => {
        //navigation.navigate("NearDentalMap")
    }

    const onSubmitSearchInput = (keyword: string) => {
        console.log("onSubmitSearchInput keyword", keyword);
        //searchDental(keyword)
    }

    /*
    const searchDental = (query: string) => {

        GETDentalMainSearch({jwtToken, query, long, lat})
        .then((response: any) => {
            console.log("GETDentalMainSearch response", response)
        })
        .catch((error: any) => {
            console.log("GETDentalMainSearch error", error);
        })
    }
    */

    return (
        <Container>
            <BodyContainer>
                <KeyboardAwareFlatList
                showsVerticalScrollIndicator={false}
                data={nearDentalList}
                renderItem={renderDentalItem}/>
            </BodyContainer>
            <AboveKeyboardContainer style={{paddingBottom: bottomPadding}}>
                <AboveKeyboard>
                <MapButtonContainer>
                    <TouchableWithoutFeedback onPress={() => openMap()}>
                    <ViewMapButton>
                        <ViewMapText>{"지도로보기"}</ViewMapText>
                    </ViewMapButton>
                    </TouchableWithoutFeedback>
                </MapButtonContainer>
                </AboveKeyboard>
            </AboveKeyboardContainer>
        </Container>
    )
}

const styles = StyleSheet.create({
    safeAreaStyle: {
        flex: 1,
        backgroundColor: "#ffffff"
    }
})

export default DentalList;