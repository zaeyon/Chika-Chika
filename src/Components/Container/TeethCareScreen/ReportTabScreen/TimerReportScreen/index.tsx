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
  ScrollView,
} from 'react-native';
// import DeviceInfo from 'react-native-device-info';
import {hasNotch} from '~/method/deviceInfo'

// Local Component
import TimerGraph from '~/Components/Presentational/TeethCareScreen/TimerGraph';
import TimerReportItem from '~/Components/Presentational/TeethCareScreen/TimerReportItem';

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
width: ${wp('6.4%')}px;
height: ${wp('6.4%')}px;
`;

const BodyContainer = Styled.View`
flex: 1;
padding-bottom: ${hasNotch() ? hp('6%') : hp('14%')}px;
`;

const SelectDateContainer = Styled.View`
padding: 16px 15px 16px 15px;
`;

const SelectDateUnitContainer = Styled.View`
width: ${wp('91.46%')}px;
height: ${wp('10.66%')}px;
background-color: #F0F0F0;
border-radius: 8px;
padding: 2px;
flex-direction: row
align-items: center;
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
width: ${wp('30.48%')}px;
height: ${wp('10.66%')}px;
align-items: center;
justify-content: center;
padding-left: 3px;
`;

const SelectDateUnitButton = Styled.View`
width: ${wp('30%')}px;
height: ${wp('9.6%')}px;
border-radius: 6px;
background-color: #ffffff;
`;

const SelectDateUnitDivider = Styled.View`
width: 1px;
height: ${wp('6.39%')}px;
background-color: #c4c4c4;
`;

const TotalRunningTimeContainer = Styled.View`
width: ${wp('100%')}px;
padding-top: 24px;
padding-bottom: 24px;
padding-left: 16px;
padding-right: 16px;
`;

const TimerGraphContainer = Styled.View`
margin-top: 10px;
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
background-color: #ffffff;
flex-direction: row;
align-items: center;
`;

const ReportValueText = Styled.Text`
font-weight: 700;
font-size: 20px;
color: #595959;
`;

const TEST_AVERAGE_RUNNING_TIME_DATA = [
  {
    unit: '하루',
    value: '4분 24초',
  },
  {
    unit: '한주',
    value: '3분 24초',
  },
  {
    unit: '한달',
    value: '4분 10초',
  },
];

const TEST_AVERAGE_RUNNING_COUNT_DATA = [
  {
    unit: '하루',
    value: '4회',
  },
  {
    unit: '한주',
    value: '16회',
  },
  {
    unit: '한달',
    value: '30회',
  },
];

interface Props {
  navigation: any;
  route: any;
}

const TimerReportScreen = ({navigation, route}: Props) => {
  const [selectedDateUnit, setSelectedDateUnit] = useState<string>('day');
  const [visibleFirstDivider, setVisibleFirstDivider] = useState<boolean>(
    false,
  );
  const [visibleSecondDivider, setVisibleSecondDivider] = useState<boolean>(
    false,
  );

  const dateUnitAnimValue = useRef(new Animated.ValueXY()).current;

  const selectMonthUnitAnim = Animated.timing(dateUnitAnimValue, {
    toValue: wp('60%'),
    duration: 500,
    useNativeDriver: true,
  });

  const selectDayUnitAnim = Animated.timing(dateUnitAnimValue, {
    toValue: 0,
    duration: 500,
    useNativeDriver: true,
  });

  const selectWeekUnitAnim = Animated.timing(dateUnitAnimValue, {
    toValue: wp('30%'),
    duration: 500,
    useNativeDriver: true,
  });

  const selectDayUnit = () => {
    if (selectedDateUnit !== 'day') {
      setSelectedDateUnit('day');
      selectDayUnitAnim.start();
    }
  };

  const selectWeekUnit = () => {
    if (selectedDateUnit !== 'week') {
      setSelectedDateUnit('week');
      selectWeekUnitAnim.start();
    }
  };

  const selectMonthUnit = () => {
    if (selectedDateUnit !== 'month') {
      setSelectedDateUnit('month');
      selectMonthUnitAnim.start();
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  const renderRunningTimeItem = ({item, index}: any) => {
    return (
      <TimerReportItem
        style={[
          {marginLeft: 16},
          index === TEST_AVERAGE_RUNNING_TIME_DATA.length - 1 && {
            marginRight: 16,
          },
        ]}
        label={item.unit}
        value={item.value}
      />
    );
  };

  const renderRunningCountItem = ({item, index}: any) => {
    return (
      <TimerReportItem
        style={[
          {marginLeft: 16},
          index === TEST_AVERAGE_RUNNING_COUNT_DATA.length - 1 && {
            marginRight: 16,
          },
        ]}
        label={item.unit}
        value={item.value}
      />
    );
  };

  return (
    <Container>
      <HeaderBar>
        <HeaderLeftContainer>
          <HeaderEmptyContainer />
        </HeaderLeftContainer>
        <HeaderTitleText>타이머</HeaderTitleText>
        <TouchableWithoutFeedback onPress={() => goBack()}>
          <HeaderRightContainer>
            <HeaderCloseIcon
              source={require('~/Assets/Images/HeaderBar/ic_X.png')}
            />
          </HeaderRightContainer>
        </TouchableWithoutFeedback>
      </HeaderBar>
      <BodyContainer>
        <SelectDateContainer>
          <SelectDateUnitContainer>
            <Animated.View
              style={{
                transform: [{translateX: dateUnitAnimValue.x}],
                position: 'absolute',
              }}>
              <SelectDateUnitButtonContainer
                style={styles.dateUnitButtonShadow}>
                <SelectDateUnitButton />
              </SelectDateUnitButtonContainer>
            </Animated.View>
            <TouchableWithoutFeedback onPress={() => selectDayUnit()}>
              <DateUnitEmptyContainer>
                <SelectDateUnitText>일</SelectDateUnitText>
              </DateUnitEmptyContainer>
            </TouchableWithoutFeedback>
            <SelectDateUnitDivider style={{zIndex: -1}} />
            <TouchableWithoutFeedback onPress={() => selectWeekUnit()}>
              <DateUnitEmptyContainer>
                <SelectDateUnitText>주</SelectDateUnitText>
              </DateUnitEmptyContainer>
            </TouchableWithoutFeedback>
            <SelectDateUnitDivider style={{zIndex: -1}} />
            <TouchableWithoutFeedback onPress={() => selectMonthUnit()}>
              <DateUnitEmptyContainer>
                <SelectDateUnitText>월</SelectDateUnitText>
              </DateUnitEmptyContainer>
            </TouchableWithoutFeedback>
          </SelectDateUnitContainer>
        </SelectDateContainer>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TimerGraphContainer>
            <TimerGraph />
          </TimerGraphContainer>
          <ReportLabelContainer>
            <ReportLabelText>{'평균 실행 시간'}</ReportLabelText>
          </ReportLabelContainer>
          <ReportValueContainer>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              data={TEST_AVERAGE_RUNNING_TIME_DATA}
              renderItem={renderRunningTimeItem}
            />
          </ReportValueContainer>
          <ReportLabelContainer>
            <ReportLabelText>{'평균 실행 횟수'}</ReportLabelText>
          </ReportLabelContainer>
          <ReportValueContainer>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              data={TEST_AVERAGE_RUNNING_COUNT_DATA}
              renderItem={renderRunningCountItem}
            />
          </ReportValueContainer>
        </ScrollView>
      </BodyContainer>
    </Container>
  );
};

const styles = StyleSheet.create({
  dateUnitButtonShadow: {
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 3,
    shadowOpacity: 0.1,
  },
});

export default TimerReportScreen;
