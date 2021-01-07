import React from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DentalDetailScreen from '~/Components/Container/DentalDetailScreen';

const Container = Styled.View`
width: ${wp('100%')}px;
height: ${hp('12.3%')}px;
background-color: #ffffff;
border-top-width: 1px;
border-color: #F5F7F9;
flex-direction: row;
padding-top: ${hp('1.847%')}px;
padding-left: ${wp('4.26%')}px;
padding-right: ${wp('4.26%')}px;
justify-content: space-between;
position: absolute;
bottom: 0;
`;

const ScrapButton = Styled.View`
width: ${wp('12.8%')}px;
height: ${wp('12.8%')}px;
align-items: center;
justify-content: center;
border-radius: 8px;
border-width: 1px;
border-color: #F5F7F9;
`;

const ScrapImage = Styled.Image`
width: ${wp('6.4%')}px;
height: ${wp('6.4%')}px;
`;

const ReserveButton = Styled.View`
width: ${wp('76.5%')}px;
height: ${wp('12.8%')}px;
border-radius: 8px;
background-color: #2998FF;
align-items: center;
justify-content: center;
`;

const ReserveText = Styled.Text`
font-weight: 800;
font-size: 16px;
color: #ffffff;
`;

const DentalBottomBar = ({}) => {

    return (
        <Container>
            <ScrapButton>
                <ScrapImage
                source={require('~/Assets/Images/Indicator/ic_scrap_unfocus.png')}/>
            </ScrapButton>
            <ReserveButton>
                <ReserveText>
                    {"예약하기"}
                </ReserveText>
            </ReserveButton>
        </Container>
    )
}

export default DentalBottomBar;






