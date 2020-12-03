import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Container = Styled.SafeAreaView`
 flex: 1;
 background-color: #FFFFFF;
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
padding: 7px 16px 13px 15px;
 align-items: center;
 justify-content: center;
 flex-direction: row;
`;

const HeaderHamburgerIcon = Styled.Image`
 width: ${wp('6.4%')};
 height: ${wp('6.4%')};
`;

const HeaderTitleText = Styled.Text`
 
`;

const HeaderRightContainer = Styled.View`
padding: 7px 16px 13px 15px;
 align-items: center;
 justify-content: center;
 flex-direction: row;
`;

const ReviewListContainer = Styled.ScrollView`
`;

interface Props {
    navigation: any,
    route: any,
}

const MyProfileScreen = ({navigation, route}: Props) => {

    const moveToSetting = () => {
        navigation.navigate("SettingStackScreen", {
            screen: "SettingScreen"
        })
    }

    return (
        <Container>
            <HeaderBar>
                <TouchableWithoutFeedback onPress={() => moveToSetting()}>
                <HeaderLeftContainer>
                    <HeaderHamburgerIcon
                    source={require('~/Assets/Images/HeaderBar/ic_hamburger.png')}/>
                </HeaderLeftContainer>
                </TouchableWithoutFeedback>
                <HeaderTitleText>My Profile</HeaderTitleText>
                <HeaderRightContainer>
                </HeaderRightContainer>
            </HeaderBar>
            <ReviewListContainer>
            </ReviewListContainer>
        </Container>
    )
}

export default MyProfileScreen


