import React, {useRef, useState} from 'react';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  TouchableWithoutFeedback,
  Animated,
  StyleSheet,
  FlatList,
} from 'react-native';
import Dash from 'react-native-dash';

const Container = Styled.View`
width: ${wp('100%')}px;
background-color: #ffffff;
padding-left: 16px;
padding-right: 16px;
padding-bottom: 16px;
`;

const TotalRunningTimeContainer = Styled.View`
`;

const TimerGraphContainer = Styled.View`
margin-top: 24px;
padding-left: 5px;
flex-direction: row;
`;

const TotalRunningTimeLabelText = Styled.Text`
font-weight: 400;
color: #595959;
font-size: 16px;
`;

const TotalRunningTimeValueText = Styled.Text`
margin-top: 8px;
font-weight: 700;
color: #595959;
font-size: 24px;
`;

const GraphCoordinateAxisContainer = Styled.View`
width: ${wp('81%')}px;
height: ${wp('31.17%')}px;
border-bottom-width: 1px;
border-left-width: 1px;
border-right-width: 1px;
border-color: #eeeeee;
`;

const GraphXAxisContainer = Styled.View`
margin-left: 7px;
`;

const YAxisContainer = Styled.View`
height: ${wp('31.17%')}px;
flex-direction: column;
`;

const YAxisText = Styled.Text`
font-weight: 400;
font-size: 12px;
color: #595959;
`;

const XAxisContainer = Styled.View`
margin-top: 5px;
flex-direction: row;
align-items: center;
`;

const XAxisText = Styled.Text`
font-weight: 400;
font-size: 12px;
color: #595959;
`;

const GraphBarContainer = Styled.View`
position: absolute;
margin-left: 26px;
left: 5px;
`;

const GraphBarItem = Styled.View`
height: 16px;
background-color: #DADADA;
border-top-right-radius: 100px;
border-bottom-right-radius: 100px;
`;

const TEST_TIMER_REPORT_DATA = [
  {
    index: 1,
    runningTime: 300,
  },
  {
    index: 2,
    runningTime: 150,
  },
  {
    index: 3,
    runningTime: 200,
  },
];

const TimerGraph = () => {
  const renderGraphBarItem = ({item, index}: any) => {
    console.log("(wp('10.39%') * index)", wp('10.39%') * index);
    if (index === 0) {
      return (
        <GraphBarItem style={{width: (item.runningTime / 300) * wp('81%')}} />
      );
    } else {
      return (
        <GraphBarItem
          style={{
            width: (item.runningTime / 300) * wp('81%'),
            marginTop: wp('6.5%'),
          }}
        />
      );
    }
  };

  return (
    <Container>
      <TotalRunningTimeContainer>
        <TotalRunningTimeLabelText>{'총 실행 시간'}</TotalRunningTimeLabelText>
        <TotalRunningTimeValueText>{'20분 12초'}</TotalRunningTimeValueText>
      </TotalRunningTimeContainer>
      <TimerGraphContainer>
        <YAxisContainer>
          <YAxisText style={{marginTop: 0}}>1회</YAxisText>
          <YAxisText style={{marginTop: wp('7%')}}>2회</YAxisText>
          <YAxisText style={{marginTop: wp('7%')}}>3회</YAxisText>
        </YAxisContainer>
        <GraphXAxisContainer>
          <GraphCoordinateAxisContainer>
            <Dash
              style={{
                width: 1,
                height: wp('30.6%'),
                flexDirection: 'column',
                position: 'absolute',
                left: wp('26%') + 6,
              }}
              dashGap={2}
              dashLength={3}
              dashThickness={1}
              dashColor={'#c4c4c4'}
            />
            <Dash
              style={{
                width: 1,
                height: wp('30.6%'),
                flexDirection: 'column',
                position: 'absolute',
                left: wp('52%') + 6,
              }}
              dashGap={2}
              dashLength={3}
              dashThickness={1}
              dashColor={'#c4c4c4'}
            />
          </GraphCoordinateAxisContainer>
          <XAxisContainer>
            <XAxisText>0</XAxisText>
            <XAxisText style={{position: 'absolute', left: wp('26%')}}>
              1분
            </XAxisText>
            <XAxisText style={{position: 'absolute', left: wp('52%')}}>
              3분
            </XAxisText>
            <XAxisText style={{position: 'absolute', left: wp('78%')}}>
              5분
            </XAxisText>
          </XAxisContainer>
        </GraphXAxisContainer>
        <GraphBarContainer>
          <FlatList
            data={TEST_TIMER_REPORT_DATA}
            renderItem={renderGraphBarItem}
          />
        </GraphBarContainer>
      </TimerGraphContainer>
    </Container>
  );
};

export default TimerGraph;
