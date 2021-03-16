import React, {useRef} from 'react';
import Styled from 'styled-components/native';
import {hasNotch} from '~/method/deviceInfo'
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
            center={{...route.params.coordinate, zoom: 16}}
            style={{flex: 1, marginBottom: hasNotch() ? hp('10.59%') : hp('7.2%')}}
            minZoomLevel={6}
            compass={false}
            showsMyLocationButton={true}
            >
                <Marker
                    coordinate={route.params.coordinate}
                    isHideCollidedSymbols={true}
                    caption={{
                        text: route.params.dentalObj?.originalName
                    }}
                    image={require('~/Assets/Images/Dental/marker_detail.png')}
                />
            </NaverMapView>
        </Container>
    )
}

export default DentalLocationMapScreen

