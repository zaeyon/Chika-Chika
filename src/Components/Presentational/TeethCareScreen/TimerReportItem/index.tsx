import React from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {StyleSheet} from 'react-native';

const Container = Styled.View`
padding-top: 24px;
padding-bottom: 24px;
align-items: center;
`;

const LabelText = Styled.Text`
font-weight: 400;
font-size: 16px;
color: #595959;
`;

const ValueCardContainer = Styled.View`
margin-top: 8px;
width: ${wp('41.6%')}px;
height: ${wp('23.2%')}px;
border-radius: 8px;
background-color: #ffffff;
border-width: 0.5px;
border-color: #eeeeee;
align-items: center;
justify-content: center;
`;

const ValueText = Styled.Text`
color: #595959;
font-size: 20px;
font-weight: 700;
`;

interface Props {
    style: any,
    label: string,
    value: string
}

const TimerReportItem = ({label, value, style}: Props) => {
    return (
        <Container style={style}>
            <LabelText>{label}</LabelText>
            <ValueCardContainer style={styles.shadow}>
            <ValueText>{value}</ValueText>
            </ValueCardContainer>
        </Container>
    )
}

const styles = StyleSheet.create({
    shadow : {
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 8,
        shadowOpacity: 0.1
    }
})

export default TimerReportItem

