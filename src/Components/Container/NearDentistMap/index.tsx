import React from 'react';
import Styled from 'styled-components/native';
import {
    TouchableWithoutFeedback
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import NaverMapView, {Circle, Marker, Path, Polyline, Polygon} from "react-native-nmap";

const Container = Styled.SafeAreaView`
flex: 1;
background-color: #ffffff;
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
padding: 7px 15px 13px 16px;
align-items: center;
justify-content: center;
`;

const HeaderBackIcon = Styled.Image`
 width: ${wp('6.4%')}px;
 height: ${wp('6.4%')}px;
`;

const HeaderTitleText = Styled.Text`
font-weight: 600;
font-size: 18px;
color: #1D1E1F;
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

const MapContainer = Styled.View`
 flex: 1;
`;

interface Props {
    navigation: any,
    route: any,
}


const P0 = {latitude: 37.564362, longitude: 126.977011};
const P1 = {latitude: 37.565051, longitude: 126.978567};
const P2 = {latitude: 37.565383, longitude: 126.976292};

const TEST_MARKER_LIST = [
    {latitude: 37.564362, longitude: 126.977011}, 
    {latitude: 37.565051, longitude: 126.978567},
    {latitude: 37.565383, longitude: 126.976292}
]

const NearDentistMap = ({navigation, route}: Props) => {
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
                <HeaderTitleText>
                    내 주변 치과
                </HeaderTitleText>
                <HeaderRightContainer>
                    <HeaderEmptyContainer>
                    </HeaderEmptyContainer>
                </HeaderRightContainer>
            </HeaderBar>
            <MapContainer>
                <NaverMapView
                compass={false}
                style={{width: '100%', height: '100%'}}
                showsMyLocationButton={true}
                center={{...P0, zoom: 16}}
                onTouch={(e:any) => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
                onCameraChange={(e:any) => console.warn('onCameraChange', JSON.stringify(e))}
                onMapClick={(e:any) => console.warn('onMapClick', JSON.stringify(e))}>
                {TEST_MARKER_LIST.map((item, index) => {
                    return (
                        <Marker
                        coordinate={item}/>
                    )
                })}
                </NaverMapView>
            </MapContainer>
        </Container>
    )
}

export default NearDentistMap;
