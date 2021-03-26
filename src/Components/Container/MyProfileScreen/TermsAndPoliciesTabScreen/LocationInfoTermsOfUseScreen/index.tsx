import React from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import NavigationHeader from '~/Components/Presentational/NavigationHeader';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {WebView} from 'react-native-webview';

const Container = Styled.View`
flex: 1;
background-color: #FFFFFF;
`;

const BodyContainer = Styled.View`
flex: 1;
background-color: #F5F7F9;
`;

const DescripTextContainer = Styled.View`
background-color: #FFFFFF;
`;

interface Props {
    navigation: any,
    route: any,
}

const LocationInfoTermsOfUseScreen = ({navigation, route}: Props) => {

    const goBack = () => {
        navigation.goBack();
    }

    return (
        <Container>
            <NavigationHeader
            headerLeftProps={{type: 'arrow', onPress: goBack}}
            headerTitle={"위치정보 이용약관"}
            />
            <BodyContainer>
                <WebView
                source={{uri: "https://www.notion.so/hoody/ca2581f45e2e439fbc8f13f4f848c24c"}}/>
            </BodyContainer>
        </Container>
    )
}

export default LocationInfoTermsOfUseScreen;