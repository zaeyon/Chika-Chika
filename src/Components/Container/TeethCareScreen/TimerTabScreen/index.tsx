import React, {useState, useEffect, useRef} from 'react';
import Styled from 'styled-components/native';
import {
  TouchableWithoutFeedback,
  FlatList,
  ScrollView,
  Text,
  Animated,
  Easing,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {isIphoneX} from 'react-native-iphone-x-helper';

// Local Component
import SymptomSlidingUpPanel from '~/Components/Presentational/TeethCareScreen/SymptomSlidingUpPanel';

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
width: ${wp('6.4%')}px;
height: ${wp('6.4%')}px;
`;

const BodyContainer = Styled.View`
flex: 1;
`;

const TimerTabContainer = Styled.View`
flex: 1;
background-color: #ffffff;
`;

const TimerContainer = Styled.View`
width: ${wp('100%')}px;
height: ${wp('112%')}px;
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
width: ${wp('61.6%')}px;
height: ${wp('61.6%')}px;
border-radius: 300px;
background-color: #ffffff;
border-width: 1px;
border-color: #f0f0f0;
align-items: center;
justify-content: center;
`;

const CircleProgressContainer1 = Styled.View`
flex-direction: row;
width: ${wp('61.6%')}px;
height: ${wp('61.6%')}px;
border-radius: ${wp('30.8%')}px;
`;

const CircleProgressContainer2 = Styled.View`
flex-direction: row;

width: ${wp('61.6%')}px;
height: ${wp('61.6%')}px;
border-radius: ${wp('30.8%')}px;
`;

const SemiCircle1 = Styled.View`
width: ${wp('30.8%')}px;
height: ${wp('61.6%')}px;
border-radius: ${wp('30.8%')}px;
border-bottom-right-radius: 1;
border-top-right-radius: 0;
background-color: #eeeeee;
`;

const BehindSemiCircleContainer = Styled.View`
flex-direction: row;
width: ${wp('61.6%')}px;
height: ${wp('61.6%')}px;
position: absolute;

`;

const BehindSemiCircle = Styled.View`
width: ${wp('30.8%')}px;
height: ${wp('61.6%')}px;
border-radius: ${wp('30.8%')}px;
border-bottom-right-radius: 1;
border-top-right-radius: 0;
background-color: #eeeeee;
`;

const SemiCircle2 = Styled.View`
width: ${wp('30.8%')}px;
height: ${wp('61.6%')}px;
border-radius: ${wp('30.8%')}px;
border-bottom-left-radius: 1;
border-top-left-radius: 0;
background-color: red;
`;

const InvisibleSemiCircle1 = Styled.View`
width: ${wp('30.8%')}px;
height: ${wp('61.6%')}px;
border-radius: ${wp('30.8%')}px;
border-bottom-left-radius: 1;
border-top-left-radius: 0;
`;

const InvisibleSemiCircle2 = Styled.View`
width: ${wp('30.8%')}px;
height: ${wp('61.6%')}px;
border-radius: ${wp('30.8%')}px;
border-bottom-left-radius: 1;
border-top-left-radius: 0;
`;

const OperateTimerContainer = Styled.View`
flex-direction: row;
align-items: center;
`;

const OperateTimerButton = Styled.View`
margin-top: 16px;
width: ${wp('12%')}px;
height: ${wp('12%')}px;
background-color: #eeeeee;
border-radius: 100px;
align-items: center;
justify-content: center;
flex-direction: row;
align-items: center;
`;

const RemainingTimeContainer = Styled.View`
width: ${wp('61.6%')}px;
height: ${wp('61.6%')}px;
flex-direction: row;
align-items: center;
justify-content: center;
padding-bottom: 7px;
position: absolute;

`;

const RemainingTimeText = Styled.Text`
font-size: 32px;
color: #000000;
`;

const ShadeSemiCircleContainer1 = Styled.View`
width: ${wp('61.6%')}px;
height: ${wp('61.6%')}px;
flex-direction: row;
align-items: center;
position: absolute;
`;

const ShadeSemiCircle1 = Styled.View`
width: ${wp('30.8%')}px;
height: ${wp('61.6%')}px;
border-radius: ${wp('30.8%')}px;
border-bottom-right-radius: 1;
border-top-right-radius: 0;
background-color: #ffffff;
`;

const ShadeSemiCircleContainer2 = Styled.View`
width: ${wp('61.6%')}px;
height: ${wp('61.6%')}px;
flex-direction: row;
align-items: center;
position: absolute;
justify-content: flex-end;
`;

const ShadeSemiCircle2 = Styled.View`
width: ${wp('30.8%')}px;
height: ${wp('61.6%')}px;
border-radius: ${wp('30.8%')}px;
border-bottom-left-radius: 1;
border-top-left-radius: 0;
background-color: #ffffff;
`;

const MeasureBrushDetritionButton = Styled.View`
width: ${wp('91.46%')}px;
height: ${wp('27.73%')}px;
border-radius: 12px;
border-width: 1px;
border-color: #f0f0f0;
background-color: #ffffff;
align-items: center;
flex-direction: row;
padding-top: 24px;
padding-left: 24px;
padding-bottom: 24px;
padding-right: 24px;
`;

const MeasureBrushDetritionIcon = Styled.View`
width: ${wp('14.9%')}px;
height: ${wp('14.9%')}px;
background-color: #eeeeee;
border-radius: 100px;
`;

const MeasureBrushDetritionTextContainer = Styled.View`
padding-left: 16px;
`;

const MeasureBrushDetritionText = Styled.Text`
font-size: 16px;
`;

const MeasureBrushDetritionContainer = Styled.View`
padding-top: 12px;
padding-bottom: 12px;
width: ${wp('100%')}px;
align-items: center;
`;

interface Props {
  navigation: any;
  route: any;
}

var limitTime = 300;
var progressRadius = 0;
var timeout: any;

const TimerTabScreen = ({navigation, route}: Props) => {
  const [limitMin, setLimitMin] = useState<number>(Math.floor(limitTime / 60));
  const [limitSec, setLimitSec] = useState<any>('0' + (limitTime % 60));
  const [timerFinished, setTimerFinished] = useState<boolean>(false);
  const [timerState, setTimerState] = useState<string>('stopped');
  const [visibleShadeCircle, setVisibleShadeCircle] = useState<boolean>(true);

  const circleProgressValue1 = useRef(new Animated.Value(0)).current;
  const circleProgressValue2 = useRef(new Animated.Value(0)).current;
  const shadeCircleValue = useRef(new Animated.Value(0)).current;

  const circleProgressAni1 = Animated.timing(circleProgressValue1, {
    toValue: 1,
    duration: 150000,
    easing: Easing.linear,
    useNativeDriver: true,
  });

  const circleProgressAni2 = Animated.timing(circleProgressValue2, {
    toValue: 1,
    duration: 150000,
    easing: Easing.linear,
    useNativeDriver: true,
  });

  const shadeCircleAni = Animated.timing(shadeCircleValue, {
    toValue: 1,
    duration: 1,
    useNativeDriver: true,
  });

  const startCircleProgress = () => {
    Animated.sequence([
      circleProgressAni1,
      shadeCircleAni,
      circleProgressAni2,
    ]).start();
  };

  const firstSpin = circleProgressValue1.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const secondSpin = circleProgressValue2.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const shadeHide = shadeCircleValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['1', '0'],
  });

  const moveToBrushDetrition = () => {
    navigation.navigate('BrushDetritionCamera');
  };

  const startTimer = () => {
    startCircleProgress();
    setTimerState('started');
    console.log('양치질 타이머 시작');

    setTimeout(() => {
      setVisibleShadeCircle(false);
    }, 150000);

    timeout = setInterval(() => {
      limitTime = limitTime - 1;
      progressRadius = progressRadius + 1;
      setLimitMin(Math.floor(limitTime / 60));

      if (String(limitTime % 60).length == 1) {
        setLimitSec('0' + String(limitTime % 60));
      } else {
        setLimitSec(String(limitTime % 60));
      }

      console.log('CircleProgressValue1', circleProgressValue1);
      console.log('CircleProgressValue2', circleProgressValue2);

      if (limitTime < 0) {
        clearInterval(timeout);
        setTimerFinished(true);
      }
    }, 1000);
  };

  const stopTimer = () => {
    console.log('양치질 타이머 중단');
    clearInterval(timeout);
    setTimerState('stopped');

    Animated.timing(circleProgressValue1, {
      toValue: 6,
      duration: 300000,
      useNativeDriver: true,
    }).stop();
  };

  const initializeTimer = () => {
    limitTime = 300;

    setLimitMin(Math.floor(limitTime / 60));
    setLimitSec('0' + (limitTime % 60));

    clearInterval(timeout);
    setTimerState('stopped');

    Animated.timing(circleProgressValue1, {
      toValue: 0,
      duration: 0,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Container>
      <BodyContainer>
        <TimerContainer>
          <SlotContainer>
            <SlotText>점심</SlotText>
          </SlotContainer>
          <CircleTimerContainer>
            {/*
                        <ShadeSemiCircleContainer2>
                            <ShadeSemiCircle2/>
                        </ShadeSemiCircleContainer2>  
                        */}
            {/*
                        <Animated.View
                        style={{transform: [{rotate: secondSpin}], position: "absolute"}}>
                            <CircleProgressContainer2>
                                <InvisibleSemiCircle2/>
                                <SemiCircle2/>
                            </CircleProgressContainer2>
                        </Animated.View>
                        <ShadeSemiCircleContainer2>
                            <ShadeSemiCircle2/>
                        </ShadeSemiCircleContainer2>
                        <Animated.View
                        style={{transform: [{rotate: firstSpin}], position: "absolute"}}>
                            <CircleProgressContainer1>
                                <SemiCircle1/>
                                <InvisibleSemiCircle1/>
                            </CircleProgressContainer1>
                        </Animated.View>
                        */}
            <BehindSemiCircleContainer>
              <BehindSemiCircle />
            </BehindSemiCircleContainer>
            {visibleShadeCircle && (
              <ShadeSemiCircleContainer1>
                <ShadeSemiCircle1 />
              </ShadeSemiCircleContainer1>
            )}
            <RemainingTimeContainer>
              <RemainingTimeText>{limitMin}</RemainingTimeText>
              <RemainingTimeText>{' : '}</RemainingTimeText>
              <RemainingTimeText>{limitSec}</RemainingTimeText>
            </RemainingTimeContainer>
          </CircleTimerContainer>
          <OperateTimerContainer>
            {timerState == 'stopped' && (
              <TouchableWithoutFeedback onPress={() => startTimer()}>
                <OperateTimerButton>
                  <Text>{'시작'}</Text>
                </OperateTimerButton>
              </TouchableWithoutFeedback>
            )}
            {timerState == 'started' && (
              <TouchableWithoutFeedback onPress={() => stopTimer()}>
                <OperateTimerButton>
                  <Text>{'중지'}</Text>
                </OperateTimerButton>
              </TouchableWithoutFeedback>
            )}
            <TouchableWithoutFeedback onPress={() => initializeTimer()}>
              <OperateTimerButton style={{marginLeft: 10}}>
                <Text>{'초기화'}</Text>
              </OperateTimerButton>
            </TouchableWithoutFeedback>
          </OperateTimerContainer>
        </TimerContainer>
        <MeasureBrushDetritionContainer>
          <TouchableWithoutFeedback onPress={() => moveToBrushDetrition()}>
            <MeasureBrushDetritionButton>
              <MeasureBrushDetritionIcon />
              <MeasureBrushDetritionTextContainer>
                <MeasureBrushDetritionText>
                  칫솔마모정도
                </MeasureBrushDetritionText>
                <MeasureBrushDetritionText style={{marginTop: 5}}>
                  측정하기
                </MeasureBrushDetritionText>
              </MeasureBrushDetritionTextContainer>
            </MeasureBrushDetritionButton>
          </TouchableWithoutFeedback>
        </MeasureBrushDetritionContainer>
      </BodyContainer>
    </Container>
  );
};

export default TimerTabScreen;
