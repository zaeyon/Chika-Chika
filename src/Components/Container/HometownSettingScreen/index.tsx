import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {
    TouchableWithoutFeedback,
    FlatList,
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import NavigationHeader from '~/Components/Presentational/NavigationHeader';

const Container = Styled.SafeAreaView`
flex: 1;
background-color: #ffffff;
`;


const HeaderLeftContainer = Styled.View`
`;

const HeaderBackIcon = Styled.Image`
width: ${wp('6.4%')}px;
height: ${wp('6.4%')}px;
`;

const HeaderEmptyContainer = Styled.View`
width: ${wp('6.4%')}px;
height: ${wp('6.4%')}px;
`;

const BodyContainer = Styled.View`
flex: 1;
background-color: #ffffff;
`;

const HometownInputContainer = Styled.View`
width: ${wp('100%')}px;
height: ${hp('7%')}px;
align-items: center;
justify-content: center;
flex-direction: row;
`;

const HometownTextInputContainer = Styled.View`
flex-direction: row;
align-items: center;
`;

const SearchIcon = Styled.Image`
width: ${wp('6.4%')}px;
height: ${wp('6.4%')}px;
`;

const HometownTextInput = Styled.TextInput`
margin-left: 12px;
width: ${wp('81.6%')}px;
font-size: 16px;
`;

const SettingCurrentLocationButton = Styled.View`
width: ${wp('100%')}px;
height: ${hp('6.8%')}px;
background-color: #2998FF;
flex-direction: row;
align-items: center;
justify-content: center;
`;

const TargetIcon = Styled.Image`
width: ${wp('4.26%')}px;
height: ${wp('4.26%')}px;
`;

const SettingCurrentLocationText = Styled.Text`
margin-left: 4px;
font-weight: 400;
font-size: 14px;
color: #ffffff;
`;

interface Props {
    navigation: any,
    route: any,
}

const HometownSettingScreen = ({navigation, route}: Props) => {

    return (
        <Container>
            <NavigationHeader
            renderHeaderLeftContainer={() => {
                return (
                    <HeaderBackIcon
                    source={require('~/Assets/Images/HeaderBar/ic_back.png')}/>
                )
            }}
            renderHeaderRightContanier={() => {
                return (
                    <HeaderEmptyContainer/>
                )
            }}
            headerTitle={"마을 설정"}
            />
            <BodyContainer>
                <HometownInputContainer>
                    <HometownTextInputContainer>
                        <SearchIcon
                        style={{tintColor:"#979797"}}
                        source={require('~/Assets/Images/Search/ic_search.png')}/>
                        <HometownTextInput
                        autoFocus={false}
                        placeholder={"동명(읍, 면)으로 검색 (ex 서초동)"}
                        placeholderTextColor={"#979797"}
                        />
                    </HometownTextInputContainer>
                </HometownInputContainer>
                <SettingCurrentLocationButton>
                    <TargetIcon
                    source={require('~/Assets/Images/Map/ic_target_white.png')}/>
                    <SettingCurrentLocationText>현재 내 위치로 설정</SettingCurrentLocationText>
                </SettingCurrentLocationButton>

            </BodyContainer>

        </Container>

    )

}

export default HometownSettingScreen;

