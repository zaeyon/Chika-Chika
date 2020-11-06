import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { NavigationContainer } from '@react-navigation/native';

const Container = Styled.SafeAreaView`
 flex: 1;
 background-color: #FFFFFF;
`;

const HeaderBar = Styled.View`
 width: ${wp('100%')}px;
 height: ${wp('13.8%')}px;
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

const HeaderBackIcon = Styled.Image`
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

const BodyContainer = Styled.View`
flex: 1;
align-items: center;
justify-content: center;
`;

const TakePhotoText = Styled.Text`
`;

const GalleryText = Styled.Text`
margin-top: 30px;
`;

interface Props {
    navigation: any,
    route: any,
}

const ReviewMetaDataScreen = ({navigation, route}: Props) => {

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
                <HeaderTitleText>작성</HeaderTitleText>
                <HeaderRightContainer>
                </HeaderRightContainer>
            </HeaderBar>
            <BodyContainer>
            </BodyContainer>
        </Container>
    )
}

export default ReviewMetaDataScreen


