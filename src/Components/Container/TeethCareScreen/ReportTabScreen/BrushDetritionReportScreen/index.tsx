import React from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TouchableWithoutFeedback} from 'react-native';

const Container = Styled.SafeAreaView`
flex: 1;
background-color: #ffffff;
`;

const HeaderBar = Styled.View`
 width: ${wp('100%')}px;
 height: ${wp('13.8%')}px;
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
 background-color:#ffffff;
 border-bottom-width: 1px;
 border-color: #f0f0f0;
`;

const HeaderLeftContainer = Styled.View`
height: ${wp('13.8%')}px;
padding: 0px 16px 0px 16px;
align-items: center;
justify-content: center;
flex-direction: row;
`;

const HeaderEmptyContainer = Styled.View`
width: ${wp('6.4%')};
height: ${wp('6.4%')};
`;

const HeaderBackIcon = Styled.Image`
width: ${wp('6.4%')};
height: ${wp('6.4%')};
`;

const HeaderTitleText = Styled.Text`
margin-top: 5px;
font-size: 16px;
`;

const HeaderRightContainer = Styled.View`
height: ${wp('13.8%')}px;
padding: 0px 16px 0px 16px;
 align-items: center;
 justify-content: center;
 flex-direction: row;
`;

const HeaderCloseIcon = Styled.Image`
width: ${wp('6.4%')};
height: ${wp('6.4%')};
`;

const BodyContainer = Styled.View`
flex: 1;
`;

const IntroContainer = Styled.View`
padding: 24px 16px 24px 16px;
background-color: #ffffff;
`;

const RecentMeasureContainer = Styled.View`
flex-direction: row;
align-items: center;
justify-content: space-between;
`;

const SeeRecentMeasureButton = Styled.View`
flex-direction: row;
align-items: center;
`;

const RecentMeasureDateText = Styled.Text`
font-weight: 400;
color: #595959;
font-size: 16px;
`;

const RightArrowIcon = Styled.Image`
margin-left: 6px;
width: ${wp('1.07%')};
height: ${wp('2.13%')}
`;

const DetritionStepText = Styled.Text`
margin-top: 8px;
font-weight: 700;
font-size: 24px;
color: #595959;
`;

const ReportDescripText = Styled.Text`
font-weight: 300;
font-size: 16px;
color: #595959;
`;

const InfoIcon = Styled.Image`
width: ${wp('4.26%')};
height: ${wp('4.26%')};
`;

const ReportLabelContainer = Styled.View`
background-color: #fbfbfb;
padding: 24px 16px 16px 16px;
`;

const ReportLabelText = Styled.Text`
font-weight: 700;
font-size: 20px;
color: #595959;
`;

const ReportValueContainer = Styled.View`
padding: 24px 16px 24px 16px;
background-color: #ffffff;
flex-direction: row;
align-items: center;
`;

const ReportValueText = Styled.Text`
font-weight: 700;
font-size: 20px;
color: #595959;
`;



interface Props {
    navigation: any,
    route: any,
}

const BrushDetritionReportScreen = ({navigation, route}: Props) => {

    const goBack = () => {
        navigation.goBack()
    }

    return (
        <Container>
            <HeaderBar>
                <HeaderLeftContainer>
                    <HeaderEmptyContainer/>
                </HeaderLeftContainer>
                <HeaderTitleText>칫솔 마모정도</HeaderTitleText>
                <TouchableWithoutFeedback onPress={() => goBack()}>
                <HeaderRightContainer>
                    <HeaderCloseIcon
                    source={require('~/Assets/Images/HeaderBar/ic_X.png')}/>
                </HeaderRightContainer>
                </TouchableWithoutFeedback>
            </HeaderBar>
            <BodyContainer>
                <IntroContainer>
                    <RecentMeasureContainer>
                        <SeeRecentMeasureButton>
                            <RecentMeasureDateText>{"2020.11.12 측정"}</RecentMeasureDateText>
                            <RightArrowIcon
                            source={require('~/Assets/Images/Arrow/ic_rightArrow.png')}/>
                        </SeeRecentMeasureButton>
                        <InfoIcon
                        source={require('~/Assets/Images/Mark/ic_info.png')}/>
                    </RecentMeasureContainer>
                    <DetritionStepText>{"4단계"}</DetritionStepText>
                    <ReportDescripText style={{
marginTop: 16}}>{"이빨이 위험해요! 빨리 칫솔을 바꿔야겠어요!"}</ReportDescripText>
                </IntroContainer>
                <ReportLabelContainer>
                    <ReportLabelText>{"칫솔 예상 수명"}</ReportLabelText>
                </ReportLabelContainer>
                <ReportValueContainer>
                    <ReportValueText>{"D-24"}</ReportValueText>
                    <ReportDescripText style={{marginLeft: 16}}>{"이빨 잘 닦고 계신거죠?"}</ReportDescripText>
                </ReportValueContainer>
                <ReportLabelContainer>
                    <ReportLabelText>{"마모 진행 예상 속도"}</ReportLabelText>
                </ReportLabelContainer>
            </BodyContainer>
        </Container>
    )
}

export default BrushDetritionReportScreen;