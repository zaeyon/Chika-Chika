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
padding-top: ${getStatusBarHeight()};
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

const PrivacyPolicyScreen = ({navigation, route}: Props) => {

    const goBack = () => {
        navigation.goBack();
    }

    return (
        <Container>
            <NavigationHeader
            headerLeftProps={{type: 'arrow', onPress: goBack}}
            headerTitle={"개인정보 처리방침"}
            />
            <BodyContainer>
                <WebView
                source={{uri: "https://www.notion.so/hoody/c0a7981fb254426e9395297f8c7a8ee4"}}/>
            </BodyContainer>
        </Container>
    )
}

export default PrivacyPolicyScreen;