import React, {useRef} from 'react';
import Styled from 'styled-components/native';
import {
    PanResponder,
} from 'react-native'
import SafeAreaView from 'react-native-safe-area-view';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import NaverMapView, {Marker} from 'react-native-nmap';
import NavigationHeader from '~/Components/Presentational/NavigationHeader';

const Container = Styled.View`
flex: 1;
background-color: #ffffff;
`;

interface Props {
    navigation: any,
    route: any,
}

const DentalLocationMapScreen = ({navigation, route}: Props) => {

    const goBack = () => {
        navigation.goBack();
    }

    return (
        <Container as={SafeAreaView} forceInset={{top: "always"}}>
            <NavigationHeader
            headerLeftProps={{type: "arrow", onPress: goBack}}
            headerTitle={"지도보기"}/>
            <NaverMapView
            style={{width: '100%', height: hp('100%')}}
            compass={false}
            />
        </Container>
    )
}

export default DentalLocationMapScreen

