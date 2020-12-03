import React, {useRef, useState} from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TouchableWithoutFeedback, Animated, StyleSheet} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

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
width: ${wp('6.4%')}px;
height: ${wp('6.4%')}px;
`;

const HeaderBackIcon = Styled.Image`
width: ${wp('6.4%')}px;
height: ${wp('6.4%')}px;
`;

const HeaderTitleText = Styled.Text`
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
width: ${wp('6.4%')}px;
height: ${wp('6.4%')}px;
`;

const BodyContainer = Styled.View`
align-items: center;
flex: 1;
`;

const SelectDateUnitContainer = Styled.View`
width: ${wp('91.46%')}px;
height: ${wp('10.66%')}px;
background-color: #F0F0F0;
border-radius: 8px;
padding: 2px;
flex-direction: row
`;

const DateUnitEmptyContainer = Styled.View`
flex: 1;
align-items: center;
justify-content: center;
`;

const SelectDateUnitText = Styled.Text`
font-weight: 400;
font-size: 16px;
color: #595959;
`;

const SelectDateUnitButtonContainer = Styled.View`
width: ${wp('45.73%')}px;
height: ${wp('10.66%')}px;
align-items: center;
justify-content: center;
padding-left: 3px;
`;

const SelectDateUnitButton = Styled.View`
width: ${wp('45.2%')}px;
height: ${wp('9.6%')}px;
border-radius: 6px;
background-color: #ffffff;
`;

const SymptomReportContainer = Styled.View`
padding: 24px 32px 24px 32px;
width:${wp('100%')}px;
`;

const IntroContainer = Styled.View`
flex-direction: row;
align-items: center;
justify-content: space-between;
`;

const CircleChartTitleText = Styled.Text`
font-weight: 700;
font-size: 20px;
color: #595959;
`;

const MoreViewText = Styled.Text`
font-weight: 400;
font-size: 14px;
color: #595959;
`;

const CircleChartContainer = Styled.View`
margin-top: 16px;
align-items: center;
justify-content: center;
`;

const CircleChart = Styled.View`
width: ${wp('69%')}px;
height: ${wp('69%')}px;
border-radius: 200px;
border-width: ${wp('10.1%')}px;
border-color: #c4c4c4;
`;

const SymptomListContainer = Styled.View`
margin-top: 24px;
`;

const SymptomItemContainer = Styled.View`
flex-direction: row;
align-items: center;
justify-content: space-between;
`;

const SymptomColorContainer = Styled.View`
width: ${wp('6.4%')}px;
height: ${wp('6.4%')}px;
border-radius: 8px;
`;

const SymptomNameText = Styled.Text`
margin-left: 8px;
font-weight: 400;
font-size: 16px;
color: #595959;
`;

const SymptomCountText = Styled.Text`
font-weight: 700;
font-size: 16px;
color: #595959;
`;

const SymptomItemNameContainer = Styled.View`
flex-direction: row;
align-items: center;
`;

const SymptomItemCountContainer = Styled.View`
flex-direction: row;
align-items: center;
`;

const TEST_SYMPTOM_DATA = [
    {
        name: "잇몸출혈",
        count: 2,
        identifyColor: "#595959"
    },
    {
        name: "이시림",
        count: 1,
        identifyColor: "#C4C4C4"
    },
    {
        name: "이빨빠짐",
        count: 1,
        identifyColor: "#ECECEE"
    }
]

interface Props {
    navigation: any,
    route: any,
}

const SymptomReportScreen = ({navigation, route}: Props) => {
    const [selectedDateUnit, setSelectedDateUnit] = useState<string>("day");

    const dateUnitAnimValue = useRef(new Animated.ValueXY()).current;

    const selectMonthUnitAnim = Animated.timing(dateUnitAnimValue, {
        toValue: wp('45%'),
        duration: 500,
        useNativeDriver: true,
    })

    const selectDayUnitAnim = Animated.timing(dateUnitAnimValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
    })

    const selectDayUnit = () => {
        if(selectedDateUnit === "month") {
            setSelectedDateUnit("day");
            selectDayUnitAnim.start()
        }
    }

    const selectMonthUnit = () => {
        if(selectedDateUnit === "day") {
            setSelectedDateUnit("month");
            selectMonthUnitAnim.start()
        }
    }

    const goBack = () => {
        navigation.goBack()
    }

    const renderSymptomItem = ({item, index}: any) => {
        return (
            <SymptomItemContainer style={{marginBottom: 16}}>
                <SymptomItemNameContainer>
                    <SymptomColorContainer
                    style={{backgroundColor: item.identifyColor}}/>
                    <SymptomNameText>{item.name}</SymptomNameText>
                </SymptomItemNameContainer>
                <SymptomItemCountContainer>
                    <SymptomCountText>{item.count}</SymptomCountText>
                    <SymptomCountText style={{marginLeft:1}}>{"회"}</SymptomCountText>
                </SymptomItemCountContainer>
            </SymptomItemContainer>
        )
    }

    return (
        <Container>
            <HeaderBar>
                <HeaderLeftContainer>
                    <HeaderEmptyContainer/>
                </HeaderLeftContainer>
                <HeaderTitleText>증상</HeaderTitleText>
                <TouchableWithoutFeedback onPress={() => goBack()}> 
                <HeaderRightContainer>
                    <HeaderCloseIcon
                    source={require('~/Assets/Images/HeaderBar/ic_X.png')}/>
                </HeaderRightContainer>
                </TouchableWithoutFeedback>
            </HeaderBar>
            <BodyContainer>
                <SelectDateUnitContainer>
                    <Animated.View
                    style={{
                        transform: [{translateX: dateUnitAnimValue.x}],position: "absolute"
                    }}>   
                    <SelectDateUnitButtonContainer style={styles.dateUnitButtonShadow}>
                        <SelectDateUnitButton/> 
                    </SelectDateUnitButtonContainer>
                    </Animated.View>
                    <TouchableWithoutFeedback onPress={() => selectDayUnit()}>
                    <DateUnitEmptyContainer>
                        <SelectDateUnitText>일</SelectDateUnitText>
                    </DateUnitEmptyContainer>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => selectMonthUnit()}>
                    <DateUnitEmptyContainer>
                        <SelectDateUnitText>월</SelectDateUnitText>
                    </DateUnitEmptyContainer>
                    </TouchableWithoutFeedback>
                </SelectDateUnitContainer>
                <SymptomReportContainer>
                <IntroContainer>
                    <CircleChartTitleText>{"오늘의 증상"}</CircleChartTitleText>
                    <MoreViewText>{"전체보기"}</MoreViewText>
                </IntroContainer>
                <CircleChartContainer>
                    <CircleChart/>
                </CircleChartContainer>
                <SymptomListContainer>
                <FlatList
                data={TEST_SYMPTOM_DATA}
                renderItem={renderSymptomItem}
                />
                </SymptomListContainer>
                </SymptomReportContainer>
            </BodyContainer>
        </Container>
    )
}

const styles = StyleSheet.create({
    dateUnitButtonShadow: {
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowRadius: 3,
        shadowOpacity: 0.1,
    }
})

export default SymptomReportScreen;