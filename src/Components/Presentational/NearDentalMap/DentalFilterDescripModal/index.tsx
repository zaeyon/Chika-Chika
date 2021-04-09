import React from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, Modal} from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Container = Styled.View`
width: ${wp('100%')}px;
background-color: #c3c3c3;
padding: 30px 16px 32px 16px;
border-top-left-radius: 24px;
border-top-right-radius: 24px;
align-items: center;
justify-content: center;
`;

const LabelText = Styled.Text`
font-size: 18px;
font-weight: 800;
line-height: 24px;
color: #000000;
`;

const DescripText = Styled.Text`
margin-top: 16px;
font-size: 14px;
font-weight: 400;
line-height: 24px;
color: #000000;
`;

const CancelIconContainer = Styled.View`
position: absolute;
top: 0px;
right: 0px;
padding-top: 24px;
padding-right: 24px;
`;

const CancelIcon = Styled.Image`
width: ${wp('6.4%')}px;
height: ${wp('6.4%')}px;
`;

const DontLookAgainButton = Styled.View`
margin-top: 17px;
width: ${wp('82.9%')}px;
height: ${wp('10.66%')}px;
border-radius: 100px;
background-color: #FFFFFF;
border-width: 1px;
border-color: #E2E6ED;
align-items: center;
justify-content: center;
`;

const DontLookAgainText = Styled.Text`
font-weight: 800;
color: #E2E6ED;
line-height: 16px;
font-size: 14px;
`;

interface Props {
    label: string,
    description: string,
    clickDontLookAgain: (filterType: string) => void,
    modalVisible: boolean,
}

const DentalFilterDescripModal = ({label, description, modalVisible}: Props) => {
    return (
        <Modal
        animationType={"fade"}
        visible={modalVisible}
        transparent={false}>
        <Container>
            <LabelText>{label}</LabelText>
            <DescripText>{description}</DescripText>
            <DontLookAgainButton>
                <DontLookAgainText>{"다시 보지 않기"}</DontLookAgainText>
            </DontLookAgainButton>
        </Container>
        </Modal>
    )
}

export default DentalFilterDescripModal

