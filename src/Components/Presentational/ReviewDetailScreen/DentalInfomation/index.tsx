import React from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TouchableWithoutFeedback} from 'react-native';

const Container = Styled.View`
padding: 24px 24px 24px 24px;
flex-direction: row;
align-items: center;
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
 
`;

const DentalImage = Styled.Image`
width: ${wp('14.4%')}px;
height: ${wp('14.4%')}px;
border-width: 0.5px;
border-color: #E2E6ED;
border-radius: 100px;
`;

const DentalInfoContainer = Styled.View`
`;

const DentalNameText = Styled.Text`
font-weight: 800;
font-size: 18px;
color: #131F3C;
 
`;

const DentalDescripText = Styled.Text`
margin-top: 5px;
font-weight: 400;
font-size: 16px;
color: #000000;
`;

const DentalAddressContainer = Styled.View`
width: ${wp('65%')}px;
margin-top: 8px;
flex-direction: row;
align-items: center;
`;

const DentalAddressText = Styled.Text`
 
font-weight: 700;
font-size: 13px;
color: #9AA2A9;
`;

const RightArrowContainer = Styled.View`
`;

const RightArrowIcon = Styled.Image`
width: ${wp('6.4%')}px;
height: ${wp('6.4%')}px;
`;

const DentalMarkerIcon = Styled.Image`
width: ${wp('4.26%')}px;
height: ${wp('4.26%')}px;
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

    let splitedAddress = new Array();
    let formattedAddress = "";

    if(dentalInfo.address) {
        splitedAddress = dentalInfo.address.split(" ");
        formattedAddress = splitedAddress[0] + " " + splitedAddress[1] + " " + splitedAddress[2] + " " + splitedAddress[3] + " " + splitedAddress[4]

    }

    return (
        <TouchableWithoutFeedback onPress={() => moveToDentalDetail(dentalInfo.id)}>
        <Container>
            <DentalInfoContainer>
                <DentalNameText>{dentalInfo.originalName}</DentalNameText>
                <DentalAddressContainer>
                <DentalMarkerIcon
                source={require('~/Assets/Images/Review/ic_dentalMarker.png')}/>
                <DentalAddressText>{formattedAddress}</DentalAddressText>
                </DentalAddressContainer>
            </DentalInfoContainer>
            <DentalImageContainer>
                <DentalImage/>
            </DentalImageContainer>
        </Container>
        </TouchableWithoutFeedback>
    )
}

export default DentalInfomation

