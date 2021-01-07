import React from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TouchableWithoutFeedback} from 'react-native';

const Container = Styled.View`
border-top-width: 1px;
border-bottom-width: 1px;
border-color: #E2E6ED;
padding: 23px 16px 24px 17px;
justify-content: space-between;
`;

const DentalImageContainer = Styled.View`
`;

const BodyContainer = Styled.View`
margin-top: 20px;
flex-direction: row;
align-items: center;
`;

const DentalIntroText = Styled.Text`
font-weight: 700;
font-size: 14px;
color: #9AA2A9;
font-family: NanumSquare;
`;

const DentalImage = Styled.Image`
width: ${wp('14.93%')}px;
height: ${wp('14.93%')}px;
border-width: 1px;
border-color: #c4c4c4;
border-radius: 20px;
`;

const DentalInfoContainer = Styled.View`
width: ${wp('64%')}px;
margin-left: 17px;
padding-bottom: 7px;
`;

const DentalNameText = Styled.Text`
font-weight: 800;
font-size: 18px;
color: #131F3C;
font-family: NanumSquare;
`;

const DentalDescripText = Styled.Text`
margin-top: 5px;
font-weight: 400;
font-size: 16px;
color: #000000;
`;

const DentalAddressText = Styled.Text`
margin-top: 10px;
font-weight: 400;
font-size: 12px;
color: #9AA2A9;
`;

const RightArrowContainer = Styled.View`
`;

const RightArrowIcon = Styled.Image`
width: ${wp('6.4%')}px;
height: ${wp('6.4%')}px;
`;

interface Props {
    dentalInfo: any,
    name: string,
    address: string,
    dentalId: number,
    moveToDentalDetail: (dentalId: number) => void,
}

const DentalInfomation = ({dentalInfo, moveToDentalDetail}: Props) => {
    console.log("DentalInformation dentalInfo", dentalInfo);
    return (
        <TouchableWithoutFeedback onPress={() => moveToDentalDetail(dentalInfo.id)}>
        <Container>
            <DentalIntroText>{"교정을 전문으로 하는 병원이에요!"}</DentalIntroText>
            <BodyContainer>
            <DentalImageContainer>
                <DentalImage/>
            </DentalImageContainer>
            <DentalInfoContainer>
                <DentalNameText>{dentalInfo.name}</DentalNameText>
                <DentalAddressText>{dentalInfo.address}</DentalAddressText>
            </DentalInfoContainer>
            <RightArrowContainer>
            <RightArrowIcon
            source={require('~/Assets/Images/Arrow/ic_rightArrow.png')}/>
            </RightArrowContainer>
            </BodyContainer>
        </Container>
        </TouchableWithoutFeedback>
    )
}

export default DentalInfomation

