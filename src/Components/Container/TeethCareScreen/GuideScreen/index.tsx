import React from 'react';
import Styled from 'styled-components/native';
import SafeAreaView from 'react-native-safe-area-view';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Container = Styled.View`
flex: 1;
background-color: #ffffff;
align-items: center;
justify-content: center;
`;

const GuideText = Styled.Text`
font-weight: 600;
font-size: 17px;
`;

interface Props {
    navigation: any,
    route: any,
}


const GuideScreen = ({navigation, route}: Props) => {

    return (
    <Container as={SafeAreaView} forceInset={{top: 'always'}}>
        <GuideText>{"추후 업데이트 예정입니다!"}</GuideText>
    </Container>
    )
}

export default GuideScreen;