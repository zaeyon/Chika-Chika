import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, FlatList, ScrollView} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {isIphoneX} from 'react-native-iphone-x-helper';
import {useSelector, useDispatch} from 'react-redux';
import DeviceInfo from 'react-native-device-info'

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

const HeaderTitleText = Styled.Text`
 
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

const BodyContainer = Styled.View`
padding-top: 32px;
background-color: #ffffff;
align-items: center;
padding-bottom: ${DeviceInfo.hasNotch() ? hp('6%') : hp('14%')}px;
`;

const ReviewContainer = Styled.View`
`;

const ReviewListContainer = Styled.View`
`;

const ReviewHeaderContainer = Styled.View`
width: ${wp('87.2%')}px;
flex-direction: row;
align-items: center;
justify-content: space-between;
`;

const ReviewLabelText = Styled.Text`
font-weight: 700;
font-size: 16px;
color: #000000;
`;

const MoreViewContainer = Styled.View`
align-items: center;
justify-content: center;
padding: 5px;
`;

const MoreViewText = Styled.Text`
font-size: 16px;
font-weight: 400;
color: #000000;
`;

const ReviewItemContainer = Styled.View`
margin-top: 8px;
width: ${wp('87.2%')}px;
height: ${wp('40%')}px;
border-radius: 8px;
border-width: 1px;
border-color: #c4c4c4;
`;


const HospitalContainer = Styled.View`
`;

const HospitalListContainer = Styled.View`
`;

const HospitalHeaderContainer = Styled.View`
width: ${wp('87.2%')}px;
flex-direction: row;
align-items: center;
justify-content: space-between;
`;

const HospitalLabelText = Styled.Text`
font-weight: 700;
font-size: 16px;
color: #000000;
`;

const HospitalItemContainer = Styled.View`
margin-top: 8px;
width: ${wp('87.2%')}px;
height: ${wp('40%')}px;
border-radius: 8px;
border-width: 1px;
border-color: #c4c4c4;
`;

const ReviewUploadButton = Styled.View`
width: ${wp('87.2%')}px;
height: ${wp('24.416%')}px;
border-radius: 8px;
border-width: 1px;
border-color: #C4C4C4;
align-items: center;
justify-content: center;
`;

const ReviewUploadText = Styled.Text`
font-weight: 700;
color: #000000;
font-size: 18px;
`;


const ToothCareButton = Styled.View`
width: ${wp('87.2%')}px;
height: ${wp('24.416%')}px;
border-radius: 8px;
border-width: 1px;
border-color: #C4C4C4;
align-items: center;
justify-content: center;
`;

const ToothCareText = Styled.Text`
font-weight: 700;
color: #000000;
font-size: 18px;
`;

interface Props {
    navigation: any,
}

const HomeScreen = ({navigation}: Props) => {
    const currentUser = useSelector((state: any) => state.currentUser);
    console.log("현재 로그인된 사용자 정보 currentUser", currentUser);

    const moveToReviewList = () => {
        navigation.navigate("ReviewStackScreen", {
            screen: "ReviewListScreen"
        });
    }

    const moveToReviewUpload = () => {
        navigation.navigate("ReviewUploadStackScreen", {
            screen: "ReceiptRegisterScreen"
        });
    }

    return (
        <Container>
            <HeaderBar>
                <HeaderLeftContainer>
                    <HeaderEmptyContainer>
                    </HeaderEmptyContainer>
                </HeaderLeftContainer>
                <HeaderTitleText>Home</HeaderTitleText>
                <HeaderRightContainer>
                    <HeaderEmptyContainer>
                    </HeaderEmptyContainer>
                </HeaderRightContainer>
            </HeaderBar>
            <ScrollView showsVerticalScrollIndicator={false}>
            <BodyContainer>
                <ReviewContainer>
                    <ReviewHeaderContainer>
                        <ReviewLabelText>인기 리뷰 TEST</ReviewLabelText>
                        <TouchableWithoutFeedback onPress={() => moveToReviewList()}>
                        <MoreViewContainer>
                            <MoreViewText>더보기</MoreViewText>
                        </MoreViewContainer>
                        </TouchableWithoutFeedback>
                    </ReviewHeaderContainer>
                    <ReviewListContainer>
                        <ReviewItemContainer>
                        </ReviewItemContainer>
                    </ReviewListContainer>
                </ReviewContainer>
                <HospitalContainer style={{marginTop: 24}}>
                    <HospitalHeaderContainer>
                        <HospitalLabelText>인기 병원</HospitalLabelText>
                        <MoreViewContainer>
                            <MoreViewText>더보기</MoreViewText>
                        </MoreViewContainer>
                    </HospitalHeaderContainer>
                    <HospitalListContainer>
                        <HospitalItemContainer>
                        </HospitalItemContainer>
                    </HospitalListContainer>
                </HospitalContainer>
                <TouchableWithoutFeedback onPress={() => moveToReviewUpload()}>
                <ReviewUploadButton style={{marginTop: 50}}>
                    <ReviewUploadText>
                        리뷰 작성하기
                    </ReviewUploadText>
                </ReviewUploadButton>
                </TouchableWithoutFeedback>
                <ToothCareButton style={{marginTop: 20}}>
                    <ToothCareText>
                        치아 관리하러 가기 
                    </ToothCareText>
                </ToothCareButton>
            </BodyContainer>
            </ScrollView>
        </Container>
    )
}

export default HomeScreen


