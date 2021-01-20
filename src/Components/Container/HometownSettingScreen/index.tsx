import React, {useState} from 'react';
import Styled from 'styled-components/native';
import SafeAreaView from 'react-native-safe-area-view';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {getStatusBarHeight} from 'react-native-status-bar-height';

// local component
import NavigationHeader from '~/Components/Presentational/NavigationHeader';

const Container = Styled.View`
flex: 1;
padding-top: ${getStatusBarHeight()}
background-color: #ffffff;
`;

const BodyContainer = Styled.View`
background-color: #F5F7F9;
flex: 1;
`;

const MyHometownContainer = Styled.View`
background-color: #ffffff;
padding-top: 24px;
padding-left: 16px;
padding-right: 16px;
padding-bottom: 24px;

`;

const MyHometownListContainer = Styled.View`
flex-direction: row;
align-items: center;
justify-content: space-between;
margin-top: 16px;
`;

const HometownSettingGuideContainer = Styled.View`
flex-direction: row;
align-items: center;
background-color: #F5F7F9;
border-radius: 4px;
padding-top: 15px;
padding-left: 16px;
padding-right: 16px;
padding-bottom: 15px;
`;

const GuideIcon = Styled.Image`
width: ${wp('3.73%')}px;
height: ${wp('3.73%')}px;
`;

const HometownSettingGuideText = Styled.Text`
margin-left: 5px;
font-family: NanumSquare;
font-weight: 700;
font-size: 13px;
color: #131F3C;
`;

const HometownContainer = Styled.View`
flex-direction: row;
align-items: center;
width: ${wp('44.26%')}px;
height: ${wp('14.5%')}px;
padding-left: 16px;
padding-right: 16px;
border-radius: 4px;
background-color: #00D1FF;
justify-content: space-between;
`;

const HometownText = Styled.Text`
font-family: NanumSquare;
line-height: 24px;
font-size: 16px;
font-weight: 800;
color: #ffffff;
`;

const DeleteIcon = Styled.Image`
width: ${wp('3.2%')}px;
height: ${wp('3.2%')}px;
`;

const AddHometownButton = Styled.View`
width: ${wp('44.26%')}px;
height: ${wp('14.5%')}px;
border-radius: 4px;
background-color: #ffffff;
align-items: center;
justify-content: center;
border-color: #E2E6ED;
border-style: dashed;
border-width: 1.5px;
`;

const AddHometownIcon = Styled.View`
background-color: #E2E6ED;
width: ${wp('7.46%')}px;
height: ${wp('7.46%')}px;
border-radius: 100px;
align-items: center;
justify-content: center;
`;

const PlusIconContainer = Styled.View`
width: ${wp('3.2%')}px;
height: ${wp('3.2%')}px;
`;

const PlusIconWidthContainer = Styled.View`
justify-content: center;
width: ${wp('3.2%')}px;
height: ${wp('3.2%')}px;
`;

const PlusIconHeightContainer = Styled.View`
position: absolute;
align-items: center;
width: ${wp('3.2%')}px;
height: ${wp('3.2%')}px;
`;

const PlusIconWidth = Styled.View`
width: ${wp('3.2%')}px;
height: 2px;
background-color: #ffffff;
`;

const PlusIconHeight = Styled.View`
height: ${wp('3.2%')}px;
width: 2px;
background-color: #ffffff;
`;

interface Props {
    navigation: any,
    route: any,
}

const HometownSettingScreen = ({navigation, route}: Props) => {
    console.log("HometownSettingScreen route.params?.profile", route.params?.profile);

    const goBack = () => {
        navigation.goBack();
    }

    return (
        <Container>
            <NavigationHeader
            headerLeftProps={{type: "arrow", onPress: goBack}}
            headerTitle={"동네 설정"}/>
            <BodyContainer>
                <MyHometownContainer>
                <HometownSettingGuideContainer>
                    <GuideIcon
                    source={require('~/Assets/Images/Hometown/ic_info.png')}/>
                    <HometownSettingGuideText>{"지역은 최대 두개까지 설정 가능합니다."}</HometownSettingGuideText>
                </HometownSettingGuideContainer>
                <MyHometownListContainer>
                    <HometownContainer>
                        <HometownText>{"이의동"}</HometownText>
                        <DeleteIcon
                        source={require('~/Assets/Images/Hometown/ic_delete.png')}/>
                    </HometownContainer>
                    <AddHometownButton>
                        <AddHometownIcon>
                            <PlusIconContainer>
                                <PlusIconWidthContainer>
                                    <PlusIconWidth/>
                                </PlusIconWidthContainer>
                                <PlusIconHeightContainer>
                                    <PlusIconHeight/>
                                </PlusIconHeightContainer>
                            </PlusIconContainer>
                        </AddHometownIcon>
                    </AddHometownButton>
                </MyHometownListContainer>
                </MyHometownContainer>
            </BodyContainer>
        </Container>
    )

}

export default HometownSettingScreen;


