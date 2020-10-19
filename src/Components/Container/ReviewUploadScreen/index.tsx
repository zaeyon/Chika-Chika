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

const ReviewUploadScreen = ({navigation, route}: Props) => {

    const openCamera = () => {
        navigation.navigate("Camera");
    }

    const moveToGallery = () => {
        navigation.navigate("Gallery");
    }

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
                <HeaderTitleText>Review Upload</HeaderTitleText>
                <HeaderRightContainer>
                </HeaderRightContainer>
            </HeaderBar>
            <BodyContainer>
                <TouchableWithoutFeedback onPress={() => openCamera()}>
                <TakePhotoText>사진찍기</TakePhotoText>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => moveToGallery()}>
                <GalleryText>갤러리</GalleryText>
                </TouchableWithoutFeedback>
            </BodyContainer>
        </Container>
    )
}

export default ReviewUploadScreen


