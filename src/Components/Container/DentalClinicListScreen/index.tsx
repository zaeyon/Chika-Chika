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

import {isIphoneX} from 'react-native-iphone-x-helper'

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
width: 307px;
height: 35px;
background-color: #ededed;
justify-content: center;
padding-left: 20px;
`;

const SearchTextInput = Styled.TextInput`

`;

interface Props {
    navigation: any,
    route: any,
}

const DentalClinicListScreen = ({navigation, route}: Props) => {
  
    const goBack = () => {
        navigation.goBack();
    }

    return (
        <Container>
            <HeaderBar>
                <SearchInputContainer>
                    <SearchTextInput
                    placeholder={"병원, 지역검색"}/>
                </SearchInputContainer>
                <HeaderFilterIcon
                    source={require('~/Assets/Images/HeaderBar/ic_filter.png')}/>
            </HeaderBar>
            <BodyContainer>
            </BodyContainer>
        </Container>
    )
}

export default DentalClinicListScreen;