import React from 'react';
import Styled from 'styled-components/native';
import {View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Container = Styled.View`
`;

const TodayInfoContainer = Styled.View`
`;

const TodayTitleText = Styled.Text`
font-weight: 800;
font-size: 18px;
color: #131F3C;
`;

const TodayTreatmentTimeText = Styled.Text`
margin-top: 10px;
font-weight: 400;
font-size: 18px;
color: #000000;
`;

const TodayLunchTimeText = Styled.Text`
margin-top: 6px;
font-weight: 400;
font-size: 18px;
color: #9AA2A9;
`;

const RowContainer = Styled.View`
flex: 1;
padding: 16px 0px 16px 0px; 
flex-direction: row;
align-items: center;
justify-content: space-between;
`;

const ItemContainer = Styled.View`
flex: 1;
`;

const WeeklyInfoContainer = Styled.View`
margin-top: 15px;
padding-left: 16px;
padding-right: 16px;
background-color: #f5f7f9;
border-radius: 8px;
flex-direction: column;
`;

const WeekdayText = Styled.Text`
font-weight: 800;
font-size: 14px;
line-height: 24px;
color: #000000;
`;

const WeekendText = Styled.Text`
font-weight: 800;
font-size: 14px;
line-height: 24px;
color: #00D1FF;
`;

const TreatmentTimeText = Styled.Text`
margin-top: 10px;
font-size: 14px;
font-weight: 400;
color: #000000;
`;

const RowDivider = Styled.View`
flex: 1;
height: 1px;
background-color: #E2E6ED;
`;

interface Props {
  todayIndex: number;
  treatmentTimeInfo: any;
}

const WeeklyTreatmentTimeInfo = ({todayIndex, treatmentTimeInfo}: Props) => {
  console.log('WeeklyTreatmentTimeInfo treatmentTimeInfo', treatmentTimeInfo);

  let todayOfTheWeek = '';
  let todayTreatStartTime = '';
  let todayTreatEndTime = '';
  let isExistTodayTreatTime = false;
  let isExistTodayLunchTime = false;

  let todayLunchStartTime = '';
  let todayLunchEndTime = '';

  const monTreatStartTime = treatmentTimeInfo.weekday.mon.treatmentTime[0].slice(
    0,
    5,
  );
  const monTreatEndTime = treatmentTimeInfo.weekday.mon.treatmentTime[1].slice(
    0,
    5,
  );
  const monLunchStartTime = treatmentTimeInfo.weekday.mon.lunchTime[0].slice(
    0,
    5,
  );
  const monLunchEndTime = treatmentTimeInfo.weekday.mon.lunchTime[1].slice(
    0,
    5,
  );
  const isExistMonTreatTime =
    treatmentTimeInfo.weekday.mon.treatmentTime[0] === '00:00:00'
      ? false
      : true;
  const isExistMonLunchTime =
    treatmentTimeInfo.weekday.mon.lunchTime[0] === '00:00:00' ? false : true;

  const tusTreatStartTime = treatmentTimeInfo.weekday.tue.treatmentTime[0].slice(
    0,
    5,
  );
  const tusTreatEndTime = treatmentTimeInfo.weekday.tue.treatmentTime[1].slice(
    0,
    5,
  );
  const tusLunchStartTime = treatmentTimeInfo.weekday.tue.lunchTime[0].slice(
    0,
    5,
  );
  const tusLunchEndTime = treatmentTimeInfo.weekday.tue.lunchTime[1].slice(
    0,
    5,
  );
  const isExistTusTreatTime =
    treatmentTimeInfo.weekday.tue.treatmentTime[0] === '00:00:00'
      ? false
      : true;
  const isExistTusLunchTime =
    treatmentTimeInfo.weekday.tue.lunchTime[0] === '00:00:00' ? false : true;

  const wedTreatStartTime = treatmentTimeInfo.weekday.wed.treatmentTime[0].slice(
    0,
    5,
  );
  const wedTreatEndTime = treatmentTimeInfo.weekday.wed.treatmentTime[1].slice(
    0,
    5,
  );
  const wedLunchStartTime = treatmentTimeInfo.weekday.wed.lunchTime[0].slice(
    0,
    5,
  );
  const wedLunchEndTime = treatmentTimeInfo.weekday.wed.lunchTime[1].slice(
    0,
    5,
  );
  const isExistWedTreatTime =
    treatmentTimeInfo.weekday.wed.treatmentTime[0] === '00:00:00'
      ? false
      : true;
  const isExistWedLunchTime =
    treatmentTimeInfo.weekday.wed.lunchTime[0] === '00:00:00' ? false : true;

  const thuTreatStartTime = treatmentTimeInfo.weekday.thu.treatmentTime[0].slice(
    0,
    5,
  );
  const thuTreatEndTime = treatmentTimeInfo.weekday.thu.treatmentTime[1].slice(
    0,
    5,
  );
  const thuLunchStartTime = treatmentTimeInfo.weekday.thu.lunchTime[0].slice(
    0,
    5,
  );
  const thuLunchEndTime = treatmentTimeInfo.weekday.thu.lunchTime[1].slice(
    0,
    5,
  );
  const isExistThuTreatTime =
    treatmentTimeInfo.weekday.thu.treatmentTime[0] === '00:00:00'
      ? false
      : true;
  const isExistThuLunchTime =
    treatmentTimeInfo.weekday.thu.lunchTime[0] === '00:00:00' ? false : true;

  const friTreatStartTime = treatmentTimeInfo.weekday.fri.treatmentTime[0].slice(
    0,
    5,
  );
  const friTreatEndTime = treatmentTimeInfo.weekday.fri.treatmentTime[1].slice(
    0,
    5,
  );
  const friLunchStartTime = treatmentTimeInfo.weekday.fri.lunchTime[0].slice(
    0,
    5,
  );
  const friLunchEndTime = treatmentTimeInfo.weekday.fri.lunchTime[1].slice(
    0,
    5,
  );
  const isExistFriTreatTime =
    treatmentTimeInfo.weekday.fri.treatmentTime[0] === '00:00:00'
      ? false
      : true;
  const isExistFriLunchTime =
    treatmentTimeInfo.weekday.fri.lunchTime[0] === '00:00:00' ? false : true;

  const satTreatStartTime = treatmentTimeInfo.sat.sat.treatmentTime[0].slice(
    0,
    5,
  );
  const satTreatEndTime = treatmentTimeInfo.sat.sat.treatmentTime[1].slice(
    0,
    5,
  );
  const satLunchStartTime = treatmentTimeInfo.sat.sat.lunchTime[0].slice(0, 5);
  const satLunchEndTime = treatmentTimeInfo.sat.sat.lunchTime[1].slice(0, 5);
  const isExistSatTreatTime =
    treatmentTimeInfo.sat.sat.treatmentTime[0] === '00:00:00' ? false : true;
  const isExistSatLunchTime =
    treatmentTimeInfo.sat.sat.lunchTime[0] === '00:00:00' ? false : true;

  let sunTreatStartTime = '';
  let sunTreatEndTime = '';
  let isExistSunTreatTime = false;
  let isExistSunLunchTime = false;

  if (treatmentTimeInfo.sunAndHoliday.treatmentTime[0] !== null) {
    sunTreatStartTime = treatmentTimeInfo.sunAndHoliday.treatmentTime[0].slice(
      0,
      5,
    );
    sunTreatEndTime = treatmentTimeInfo.sunAndHoliday.treatmentTime[1].slice(
      0,
      5,
    );
    isExistSunTreatTime =
      treatmentTimeInfo.sunAndHoliday.treatmentTime[0] === 'null'
        ? false
        : true;
  } else {
    isExistSunTreatTime = false;
  }

  if (todayIndex === 0) {
    todayOfTheWeek = '일';

    todayTreatStartTime = sunTreatStartTime;
    todayTreatEndTime = sunTreatEndTime;

    isExistTodayTreatTime = isExistSunTreatTime;
    isExistTodayLunchTime = false;
  } else if (todayIndex === 1) {
    todayOfTheWeek = '월';

    todayTreatStartTime = monTreatStartTime;
    todayTreatEndTime = monTreatEndTime;

    todayLunchStartTime = monLunchStartTime;
    todayLunchEndTime = monLunchEndTime;

    isExistTodayTreatTime = isExistTusTreatTime;
    isExistTodayLunchTime =
      treatmentTimeInfo.weekday.mon.lunchTime[0] === '00:00:00' ? false : true;
  } else if (todayIndex === 2) {
    todayOfTheWeek = '화';

    todayTreatStartTime = tusTreatStartTime;
    todayTreatEndTime = tusTreatEndTime;

    todayLunchStartTime = tusLunchStartTime;
    todayLunchEndTime = tusLunchEndTime;

    isExistTodayTreatTime = isExistTusTreatTime;
    isExistTodayLunchTime =
      treatmentTimeInfo.weekday.tue.lunchTime[0] === '00:00:00' ? false : true;
  } else if (todayIndex === 3) {
    todayOfTheWeek = '수';

    todayTreatStartTime = wedTreatStartTime;
    todayTreatEndTime = wedTreatEndTime;

    todayLunchStartTime = wedLunchStartTime;
    todayLunchEndTime = wedLunchEndTime;

    isExistTodayTreatTime = isExistWedTreatTime;
    isExistTodayLunchTime =
      treatmentTimeInfo.weekday.wed.lunchTime[0] === '00:00:00' ? false : true;
  } else if (todayIndex === 4) {
    todayOfTheWeek = '목';

    todayTreatStartTime = thuTreatStartTime;
    todayTreatEndTime = thuTreatEndTime;

    todayLunchStartTime = thuLunchStartTime;
    todayLunchEndTime = thuLunchEndTime;

    isExistTodayTreatTime = isExistThuTreatTime;
    isExistTodayLunchTime =
      treatmentTimeInfo.weekday.thu.lunchTime[0] === '00:00:00' ? false : true;
  } else if (todayIndex === 5) {
    todayOfTheWeek = '금';

    todayTreatStartTime = friTreatStartTime;
    todayTreatEndTime = friTreatEndTime;

    todayLunchStartTime = friLunchStartTime;
    todayLunchEndTime = friLunchEndTime;

    isExistTodayTreatTime = isExistFriTreatTime;
    isExistTodayLunchTime =
      treatmentTimeInfo.weekday.fri.lunchTime[0] === '00:00:00' ? false : true;
  } else if (todayIndex === 6) {
    todayOfTheWeek = '토';

    todayTreatStartTime = satTreatStartTime;
    todayTreatEndTime = satTreatEndTime;

    todayLunchStartTime = satLunchStartTime;
    todayLunchEndTime = satLunchEndTime;

    isExistTodayTreatTime = isExistFriTreatTime;
    isExistTodayLunchTime =
      treatmentTimeInfo.sat.sat.lunchTime[0] === '00:00:00' ? false : true;
  }

  return (
    <Container>
      <TodayInfoContainer>
        <TodayTitleText>{`오늘(${todayOfTheWeek})`}</TodayTitleText>
        <TodayTreatmentTimeText>
          {isExistTodayTreatTime
            ? `진료시간 ${todayTreatStartTime} ~ ${todayTreatEndTime}`
            : '정보 없음'}
        </TodayTreatmentTimeText>
        <TodayLunchTimeText>
          {isExistTodayLunchTime
            ? `점심시간 ${todayLunchStartTime} ~ ${todayLunchEndTime}`
            : '정보 없음'}
        </TodayLunchTimeText>
      </TodayInfoContainer>
      <WeeklyInfoContainer>
        <RowContainer>
          <ItemContainer>
            <WeekdayText>{'월요일'}</WeekdayText>
            <TreatmentTimeText>
              {isExistMonTreatTime === true
                ? `${monTreatStartTime} ~ ${monTreatEndTime}`
                : '정보 없음'}
            </TreatmentTimeText>
          </ItemContainer>
          <ItemContainer>
            <WeekdayText>{'화요일'}</WeekdayText>
            <TreatmentTimeText>
              {isExistTusTreatTime === true
                ? `${tusTreatStartTime} ~ ${tusTreatEndTime}`
                : '정보 없음'}
            </TreatmentTimeText>
          </ItemContainer>
        </RowContainer>
        <RowDivider />
        <RowContainer>
          <ItemContainer>
            <WeekdayText>{'수요일'}</WeekdayText>
            <TreatmentTimeText>
              {isExistWedTreatTime === true
                ? `${wedTreatStartTime} ~ ${wedTreatEndTime}`
                : '정보 없음'}
            </TreatmentTimeText>
          </ItemContainer>
          <ItemContainer>
            <WeekdayText>{'목요일'}</WeekdayText>
            <TreatmentTimeText>
              {isExistThuTreatTime === true
                ? `${thuTreatStartTime} ~ ${thuTreatEndTime}`
                : '정보 없음'}
            </TreatmentTimeText>
          </ItemContainer>
        </RowContainer>
        <RowDivider />
        <RowContainer>
          <ItemContainer>
            <WeekdayText>{'금요일'}</WeekdayText>
            <TreatmentTimeText>
              {isExistFriTreatTime === true
                ? `${friTreatStartTime} ~ ${friTreatEndTime}`
                : '정보 없음'}
            </TreatmentTimeText>
          </ItemContainer>
          <ItemContainer>
            <WeekendText>{'토요일'}</WeekendText>
            <TreatmentTimeText>
              {isExistSatTreatTime === true
                ? `${satTreatStartTime} ~ ${satTreatEndTime}`
                : '정보 없음'}
            </TreatmentTimeText>
          </ItemContainer>
        </RowContainer>
        <RowDivider />
        <RowContainer>
          <ItemContainer>
            <WeekendText style={{color: '#FF004D'}}>{'일요일'}</WeekendText>
            <TreatmentTimeText>
              {isExistSunTreatTime === true
                ? `${sunTreatStartTime} ~ ${sunTreatEndTime}`
                : '정보 없음'}
            </TreatmentTimeText>
          </ItemContainer>
          <ItemContainer>
            <WeekendText style={{color: '#FF004D'}}>{'공휴일'}</WeekendText>
            <TreatmentTimeText>
              {isExistSunTreatTime === true
                ? `${sunTreatStartTime} ~ ${sunTreatEndTime}`
                : '정보 없음'}
            </TreatmentTimeText>
          </ItemContainer>
        </RowContainer>
      </WeeklyInfoContainer>
      {/*
            {treatmentTimeInfo.weekday.weekdayReceiptNotice !== "" && (
                <View style={{paddingTop: 20}}>
                <WeekdayText>{"주중 진료 안내"}</WeekdayText>
                <TreatmentTimeText>{"- " + treatmentTimeInfo.weekday.weekdayReceiptNotice}</TreatmentTimeText>
                </View>
            )}
            {treatmentTimeInfo.sat.weekendReceiptNotice !== "" && (
                <View style={{paddingTop: 20}}>
                <WeekdayText>{"토요일 진료 안내"}</WeekdayText>
                <TreatmentTimeText>{"- " + treatmentTimeInfo.sat.weekendReceiptNotice}</TreatmentTimeText>
                </View>
            )}
            */}

      {treatmentTimeInfo.sunAndHoliday.weekend_non_consulation_notice !== '' &&
        treatmentTimeInfo.sunAndHoliday.weekend_non_consulation_notice !=
          null && (
          <View style={{paddingTop: 20}}>
            <WeekdayText>{'일요일 ∙ 공휴일 진료 안내 사항'}</WeekdayText>
            <TreatmentTimeText>
              {'- ' +
                treatmentTimeInfo.sunAndHoliday.weekend_non_consulation_notice}
            </TreatmentTimeText>
          </View>
        )}
    </Container>
  );
};

export default WeeklyTreatmentTimeInfo;
