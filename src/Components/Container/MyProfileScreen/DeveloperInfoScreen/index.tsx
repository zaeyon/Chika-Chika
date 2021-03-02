import React from 'react'
import SafeAreaView from 'react-native-safe-area-view';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import NavigationHeader from '~/Components/Presentational/NavigationHeader';

const Container = Styled.View`
flex: 1;
background-color: #FFFFFF;
`;

const BodyContainer = Styled.View`
flex: 1;
background-color: #F5F7F9;
`;

const ContentContainer = Styled.View`
padding: 32px 16px 25px 16px;
background-color: #FFFFFF;
`;

const EnterpriseNameText = Styled.Text`
font-weight: 700;
color: #131F3C;
font-size: 16px;
`;

const AddressText = Styled.Text`
margin-top: 6px;
font-weight: 400;
font-size: 13px;
color: #7A7A7A;
`;

const EmailText = Styled.Text`
margin-top: 10px;
font-weight: 400;
font-size: 13px;
color: #7A7A7A;
`;

interface Props {
    navigation: any,
    route: any,
}

const DeveloperInfoScreen = ({navigation, route}: Props) => {

    const goBack = () => {
        navigation.goBack();
    }

    return (
        <Container as={SafeAreaView} forceInset={{top: 'always'}}>
            <NavigationHeader
            headerLeftProps={{type: 'arrow', onPress: goBack}}
            headerTitle={"개발자 정보"}
            />
            <BodyContainer>
                <ContentContainer>
                    <EnterpriseNameText>{"(주)치카치카"}</EnterpriseNameText>
                    <AddressText>{"경기도 수원시 영통구 광교로 145  차세대융합기술연구원 1304호 "}</AddressText>
                </ContentContainer>
            </BodyContainer>
        </Container>
    )
}

export default DeveloperInfoScreen;


