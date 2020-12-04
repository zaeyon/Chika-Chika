import React from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Container = Styled.View`
width: ${wp('32%')};
height: ${wp('41.6%')};
border-radius: 12px;
border-width: 1px;
border-color: #f0f0f0;
background-color: #ffffff;
align-items: center;
justify-content: center;
`;

const SymptomImage = Styled.View`
width: ${wp('14.9%')};
height: ${wp('14.9%')};
border-radius: 100px;
background-color: #eeeeee
`;

const SymptomNameText = Styled.Text`
margin-top: 12px;
font-weight: 700;
font-size: 16px;
`;

const MeasureText = Styled.Text`
margin-top: 5px;
font-weight: 400;
font-size: 16px;
color: #7a7a7a;
`;

interface Props {
    image?: string,
    name: string,
}

const SymptomItem = ({image, name}: Props) => {
    return (
        <Container>
            <SymptomImage/>
            <SymptomNameText>{name}</SymptomNameText>
            <MeasureText>{"측정하기"}</MeasureText>
        </Container>
    )
}

export default SymptomItem




