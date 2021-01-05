import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, FlatList, ScrollView} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {isIphoneX} from 'react-native-iphone-x-helper';

// Local Component
import ReportThumbnailItem from '~/Components/Presentational/TeethCareScreen/ReportThumbnailItem';

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
background-color: #fbfbfb;
`;

const IntroContainer = Styled.View`
padding-top: 27px;
padding-left: 16px;
padding-bottom: 6px;
padding-right: 16px;
`;

const TodayDateContainer = Styled.View`
flex-direction: row;
align-items: center;
`;

const SunIcon = Styled.Image`
width: ${wp('4.26%')}px;
height: ${wp('4.26%')}px;
`;

const TodayDateText = Styled.Text`
font-weight: 400;
color: #0085FF;
font-size: 14px;
`;

const UserNicknameText = Styled.Text`
margin-top: 8px;
font-weight: 700;
font-size: 20px;
color: #686868;
`;

const IntroText = Styled.Text`
margin-top: 3px;
font-size: 20px;
color: #686868;
`;

const ReportThumbnailListContainer = Styled.View`
padding: 6px 16px 21px 16px;
`;

const ReportThumbnailListRowContainer = Styled.View`
flex-direction: row;
justify-content: space-between;
align-items: center;
`;

interface Props {
  navigation: any;
  route: any;
}

const ReportTabScreen = ({navigation, route}: Props) => {
  const moveToTimerReport = () => {
    console.log('타이머 리포트 보기');
    navigation.navigate('TimerReportScreen');
  };

  const moveToDetailReport = () => {
    console.log('상세 리포트 보기');
  };

  const moveToSymptomReport = () => {
    navigation.navigate('SymptomReportScreen');
  };

  const moveToBrushDetrition = () => {
    navigation.navigate('BrushDetritionScreen');
  };

  const moveToAIReport = () => {
    navigation.navigate('AIReportScreen');
  };

  return (
    <Container>
      <BodyContainer>
        <IntroContainer>
          <TodayDateContainer>
            <SunIcon source={require('~/Assets/Images/Report/ic_sun.png')} />
            <TodayDateText>{'2020년 11월 13일(화)'}</TodayDateText>
          </TodayDateContainer>
          <UserNicknameText>{'익명의 오소리님'}</UserNicknameText>
          <IntroText>{'안녕하세요.'}</IntroText>
        </IntroContainer>
        <ReportThumbnailListContainer>
          <ReportThumbnailListRowContainer>
            <ReportThumbnailItem
              title={'타이머'}
              value={'200회'}
              description={'월간평균'}
              recentRecord={'최근기록 10분전'}
              type={'timer'}
              navigation={navigation}
              route={route}
            />
            <TouchableWithoutFeedback onPress={() => moveToBrushDetrition()}>
              <ReportThumbnailItem
                title={'칫솔 마모정도'}
                value={'1단계'}
                description={'양호'}
                recentRecord={'최근기록 1일전'}
                type={'brushDetrition'}
                navigation={navigation}
                route={route}
              />
            </TouchableWithoutFeedback>
          </ReportThumbnailListRowContainer>
          <ReportThumbnailListRowContainer style={{marginTop: 13}}>
            <TouchableWithoutFeedback onPress={() => moveToSymptomReport()}>
              <ReportThumbnailItem
                title={'치아 증상 체크'}
                value={'질병 없음'}
                recentRecord={'최근기록 1일전'}
                type={'symptom'}
                navigation={navigation}
                route={route}
              />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => moveToAIReport()}>
              <ReportThumbnailItem
                title={'교정∙미백'}
                value={'30점'}
                recentRecord={'최근기록 1일전'}
                type={'ai'}
                navigation={navigation}
                route={route}
              />
            </TouchableWithoutFeedback>
          </ReportThumbnailListRowContainer>
        </ReportThumbnailListContainer>
      </BodyContainer>
    </Container>
  );
};

export default ReportTabScreen;
