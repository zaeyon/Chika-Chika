import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, FlatList} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import {isIphoneX} from 'react-native-iphone-x-helper';

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
 background-color: #ffffff;
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

const HeaderEmptyView = Styled.View`
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

interface Props {
    navigation: any,
    route: any,
}

const ReviewDetailScreen = ({navigation, route}: Props) => {

    const goBack = () => {
        navigation.goBack()
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
                <HeaderTitleText>리뷰 상세 화면</HeaderTitleText>
                <HeaderRightContainer>
                    <HeaderEmptyView/>
                </HeaderRightContainer>
            </HeaderBar>
        </Container>
    )
}

export default ReviewDetailScreen;


