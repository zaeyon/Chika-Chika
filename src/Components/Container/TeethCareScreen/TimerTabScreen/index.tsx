import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, FlatList, ScrollView, Text} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {isIphoneX} from 'react-native-iphone-x-helper';

const Container = Styled.SafeAreaView`
 flex: 1;
 background-color: #FFFFFF;
`;

const HeaderBar = Styled.View`
 width: ${wp('100%')}px;
 height: ${wp('11.7%')}px;
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
 background-color:#ffffff;
`;


const HeaderLeftContainer = Styled.View`
padding: 7px 16px 13px 15px;
 align-items: center;
 justify-content: center;
 flex-direction: row;
`;

const HeaderTitleText = Styled.Text`
 
`;

const HeaderRightContainer = Styled.View`
padding: 7px 16px 13px 15px;
 align-items: center;
 justify-content: center;
 flex-direction: row;
`;

const HeaderEmptyContainer = Styled.View`
width: ${wp('6.4%')};
height: ${wp('6.4%')};
`;

const BodyContainer = Styled.View`
flex: 1;
`;

const TimerTabContainer = Styled.View`
flex: 1;
background-color: #ffffff;
`;

const TimerContainer = Styled.View`
width: ${wp('100%')};
height: ${wp('112%')};
background-color: #f8f8f8;
align-items: center;
justify-content: center;
`;

const SlotContainer = Styled.View`

`;

const SlotText = Styled.Text`
font-size: 14px;
font-weight: 700;
color: #595959;
`;

const CircleTimerContainer = Styled.View`
margin-top: 16px;
width: ${wp("61.6%")};
height: ${wp('61.6%')};
border-radius: 300px;
background-color: #ffffff;
border-width: 1px;
border-color: #f0f0f0;
align-items: center;
justify-content: center;
`;

const OperateTimerButton = Styled.View`
margin-top: 16px;
width: ${wp('12%')};
height: ${wp('12%')};
background-color: #eeeeee;
border-radius: 100px;
align-items: center;
justify-content: center;
`;

const RemainingTimeText = Styled.Text`
font-size: 32px;
color: #000000;
`;


interface Props {
    navigation: any,
    route: any,
}

var limitTime = 300;
var timeout: any;

const TimerTabScreen = ({navigation, route}: Props) => {

    const [limitMin, setLimitMin] = useState<number>(Math.floor(limitTime/60));
    const [limitSec, setLimitSec] = useState<any>("0" + limitTime%60);
    const [timerFinished, setTimerFinished] = useState<boolean>(false);
    const [timerState, setTimerState] = useState<string>("stopped")

    const startTimer = () => {
        setTimerState("started")
        timeout = setInterval(() => {
            console.log("양치질 타이머 시작", limitTime)
            setLimitMin(Math.floor(limitTime/60))
            if(String(limitTime%60).length == 1) {
                setLimitSec("0" + String(limitTime%60))
            } else {
                setLimitSec(String(limitTime%60))
            }

            limitTime = limitTime - 1

            if(limitTime < 0) {
                clearInterval(timeout)
                setTimerFinished(true)
            }
        }, 1000)
    }

    const stopTimer = () => {
        clearInterval(timeout)
        setTimerState("stopped")
    }
    

    return (
        <Container>
            <BodyContainer>
                <TimerContainer>
                    <SlotContainer>
                        <SlotText>점심</SlotText>
                    </SlotContainer>
                    <CircleTimerContainer>
                        <RemainingTimeText>
                            {`${limitMin} : ${limitSec}`}
                        </RemainingTimeText> 
                    </CircleTimerContainer>
                    {timerState == "stopped" && (
                    <TouchableWithoutFeedback onPress={() => startTimer()}>
                    <OperateTimerButton>
                        <Text>{"시작"}</Text>
                    </OperateTimerButton>
                    </TouchableWithoutFeedback>
                    )}
                    {timerState == "started" && (
                    <TouchableWithoutFeedback onPress={() => stopTimer()}>
                    <OperateTimerButton>
                        <Text>{"중지"}</Text>
                    </OperateTimerButton>
                    </TouchableWithoutFeedback>
                    )}
                </TimerContainer>
            </BodyContainer>
        </Container>
    )
}

export default TimerTabScreen


