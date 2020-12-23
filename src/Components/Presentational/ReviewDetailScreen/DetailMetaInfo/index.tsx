import React from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Container = Styled.View`
width: ${wp('87.2%')}px;
padding: 15px 15px 15px 15px;
border-width: 1px;
border-color: #c4c4c4;
background-color: #ffffff;
`;

const MetaInfoContainer = Styled.View`
`;

const MetaInfoLabelText = Styled.Text`
font-weight: 700;
font-size: 16px;
color: #000000;
`;

const MetaInfoValueText = Styled.Text`
margin-top: 3px;
`;

interface Props {
}

const DetailMetaInfo = ({}) => {
    return (
        <Container>
            <MetaInfoContainer>
                <MetaInfoLabelText>{"가격"}</MetaInfoLabelText>
                <MetaInfoValueText>{"100,000원"}</MetaInfoValueText>
            </MetaInfoContainer>
            <MetaInfoContainer style={{marginTop: 16}}>
                <MetaInfoLabelText>{"만족도"}</MetaInfoLabelText>
                <MetaInfoValueText>{"진료/가격/서비스"}</MetaInfoValueText>
            </MetaInfoContainer>
            <MetaInfoContainer style={{marginTop: 16}}>
                <MetaInfoLabelText>{"진료날짜"}</MetaInfoLabelText>
                <MetaInfoValueText>{"2020.04.04"}</MetaInfoValueText>
            </MetaInfoContainer>
        </Container>
    )
}

export default DetailMetaInfo;