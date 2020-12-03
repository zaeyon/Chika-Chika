import React from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Container = Styled.View`
width: ${wp('87.2%')};
height: ${wp('41.6%')};
background-color: #ffffff;
border-width: 1px;
border-color: #c4c4c4;
padding-top: 20px;
padding-bottom: 20px;
padding-left: 16px;
padding-right: 16px;
flex-direction: row;
align-items: center;
`;

const DentalImageContainer = Styled.View`
width: ${wp('25%')};
height: ${wp('25%')};
`;

const DentalImage = Styled.Image`
width: ${wp('25%')};
height: ${wp('25%')};
`;


const DentalInfoContainer = Styled.View`
margin-left: 16px;
flex-direction: column;
`;

const DentalInfoItemContainer = Styled.View`
flex-direction: row;
align-items: center;
`;

const DentalInfoLabelText = Styled.Text`
color: #000000;
font-weight: bold;
font-size: 14px;
`;

const DentalInfoValueText = Styled.Text`
margin-left: 8px;
color: #000000;
font-size: 14px;
`;

const SelectedDentalItem = () => {
    return (
        <Container>
            <DentalImageContainer>
                <DentalImage
                source={{uri:"https://cdn.newswin.co.kr/news/photo/201908/238028_216609_33.png"}}/>
            </DentalImageContainer>
            <DentalInfoContainer>
                <DentalInfoItemContainer>
                    <DentalInfoLabelText>{"병원 이름"}</DentalInfoLabelText>
                    <DentalInfoValueText>{"★ 3.0"}</DentalInfoValueText>
                </DentalInfoItemContainer>
                <DentalInfoItemContainer style={{marginTop: 8}}>
                    <DentalInfoLabelText>{"진료 시간"}</DentalInfoLabelText>
                    <DentalInfoValueText>{"진료중/종료"}</DentalInfoValueText>
                </DentalInfoItemContainer>
                <DentalInfoItemContainer style={{marginTop: 8}}>
                    <DentalInfoLabelText>{"접수 시간"}</DentalInfoLabelText>
                    <DentalInfoValueText>{"접수중/종료"}</DentalInfoValueText>
                </DentalInfoItemContainer>
                <DentalInfoItemContainer style={{marginTop: 8}}>
                    <DentalInfoLabelText>{"점심 시간"}</DentalInfoLabelText>
                    <DentalInfoValueText>{"12:00~13:00"}</DentalInfoValueText>
                </DentalInfoItemContainer>
            </DentalInfoContainer>
        </Container>
    )
}

export default SelectedDentalItem



