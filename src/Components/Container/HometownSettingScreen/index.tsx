import React, {useState} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {useSelector} from 'react-redux';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {getStatusBarHeight} from 'react-native-status-bar-height';

// local component
import NavigationHeader from '~/Components/Presentational/NavigationHeader';

// route
import DELETEUserHometown from '~/Routes/User/DELETEUserHometown';

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

const HometownItemContainer = Styled.View`
flex-direction: row;
align-items: center;
width: ${wp('44.26%')}px;
height: ${wp('14.5%')}px;
padding-left: 16px;
border-radius: 4px;
background-color: #00D1FF;
justify-content: space-between;
`;

const HometownEmdNameText = Styled.Text`
font-family: NanumSquare;
line-height: 24px;
font-size: 16px;
font-weight: 800;
color: #ffffff;
`;

const DeleteIconContainer = Styled.View`
justify-content: center;
padding: 0px 16px 0px 20px;
height: ${wp('14.5%')}px;

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

interface HometownObj {
    emdName: string,
    id: number,
    sido: string,
    sigungu: string,
}

interface Props {
    navigation: any,
    route: any,
}

const HometownSettingScreen = ({navigation, route}: Props) => {
    const [mainHometown, setMainHometown] = useState<HometownObj>(route.params?.profile.Residences[0]);
    const [isExistSubHometown, setIsExistSubHometown] = useState<boolean>(route.params?.profile.Residences[1] ? true : false);
    const [subHometown, setSubHometown] = useState<HometownObj>(route.params?.profile.Residences[1] ? route.params?.profile.Residences[1]: null)

    const jwtToken = useSelector((state: any) => state.currentUser).jwtToken;


    console.log("HometownSettingScreen route.params?.profile", route.params?.profile);

    const goBack = () => {
        navigation.goBack();
    }

    const deleteUserHometown = (cityId: number, type: string) => {
        DELETEUserHometown({jwtToken, cityId})
        .then((response) => {
            console.log("DELETEUserHometown response", response)
            if(type === "sub") {
                setSubHometown(null);
                setIsExistSubHometown(false);
            }
        })
        .catch((error) => {
            console.log("DELETEUserHometown error", error);
        })
    }

    const moveToHometownSearch = () => {
        navigation.navigate("HometownSearchScreen", {
            requestType: "addSubHometown",
        });
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
                    <HometownItemContainer>
                        <HometownEmdNameText>{mainHometown.emdName}</HometownEmdNameText>
                        <TouchableWithoutFeedback onPress={() => deleteUserHometown(mainHometown.id, "main")}>
                        <DeleteIconContainer>
                        <DeleteIcon
                        source={require('~/Assets/Images/Hometown/ic_delete.png')}/>
                        </DeleteIconContainer>
                        </TouchableWithoutFeedback>
                    </HometownItemContainer>
                    {!isExistSubHometown && (
                        <TouchableWithoutFeedback onPress={() => moveToHometownSearch()}>
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
                        </TouchableWithoutFeedback>
                    )}
                    {isExistSubHometown && (
                        <HometownItemContainer
                        style={{backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#E2E6ED"}}>
                            <HometownEmdNameText style={{color: "#131F3C"}}>{subHometown.emdName}</HometownEmdNameText>
                            <TouchableWithoutFeedback onPress={() => deleteUserHometown(subHometown.id, "sub")}>
                            <DeleteIconContainer>
                            <DeleteIcon
                            style={{tintColor: "#9AA2A9"}}
                            source={require('~/Assets/Images/Hometown/ic_delete.png')}/>
                            </DeleteIconContainer>
                            </TouchableWithoutFeedback>
                        </HometownItemContainer>
                    )}
                </MyHometownListContainer>
                </MyHometownContainer>
            </BodyContainer>
        </Container>
    )
}

export default HometownSettingScreen;


