import React from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Container = Styled.View`
width: ${wp('87.2%')}px;
height: ${wp('29.3%')}px;
border-width: 1px;
border-color: #c4c4c4;
padding: 20px 16px 20px 16px;
flex-direction: row;
align-items: center;
justify-content: space-between;
`;

const DentalImageContainer = Styled.View`
`;

const DentalProfileContainer = Styled.View`
flex-direction: row;
align-items: center;
`;



const DentalImage = Styled.Image`
width: ${wp('17.3%')}px;
height: ${wp('17.3%')}px;
border-radius: 100px;
background-color: #c4c4c4;
`;

const DentalInfoContainer = Styled.View`
width: ${wp('55%')}px;
margin-left: 10px;
background-color: #ffffff;
`;

const DentalNameText = Styled.Text`
font-weight: bold;
font-size: 16px;
color: #000000;
`;

const DentalDescripText = Styled.Text`
margin-top: 5px;
font-weight: 400;
font-size: 16px;
color: #000000;
`;

const DentalAddressText = Styled.Text`
margin-top: 5px;
font-weight: 400;
font-size: 12px;
color: #000000;
`;

const RightArrowContainer = Styled.View`
`;

const RightArrowIcon = Styled.Image`
width: 5px;
height: 10px;
`;

interface Props {
    dentalInfo: any,
    name: string,
    address: string,
    dentalId: number,
}

const DentalInfomation = ({dentalInfo}: Props) => {
    return (
        <Container>
            <DentalProfileContainer>
            <DentalImageContainer>
                <DentalImage/>
            </DentalImageContainer>
            <DentalInfoContainer>
                <DentalNameText>{"병원이름"}</DentalNameText>
                <DentalDescripText>{dentalInfo.name}</DentalDescripText>
                <DentalAddressText>{dentalInfo.address}</DentalAddressText>
            </DentalInfoContainer>
            </DentalProfileContainer>
            <RightArrowContainer>
            <RightArrowIcon
            source={require('~/Assets/Images/Arrow/ic_rightArrow.png')}/>
            </RightArrowContainer>
        </Container>
    )
}

export default DentalInfomation

