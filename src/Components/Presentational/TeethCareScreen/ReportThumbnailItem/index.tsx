import React from 'react';
import Styled from 'styled-components/native';
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Container = Styled.View`
width: ${wp('44%')}px;
height: ${wp('61%')}px;
border-radius: 12px;
background-color:#ffffff;
padding: 24px 24px 24px 24px;
`;

const TitleText = Styled.Text`
font-size: 16px;
color: #595959;
`;

const ReportExpressContainer = Styled.View`
padding-top: 20px;
padding-bottom: 20px;
align-items: center;
justify-content: center;
`;

const ReportCircle = Styled.View`
width: ${wp('20%')}px;
height: ${wp('20%')}px;
border-width: 1px;
border-color: #c4c4c4;
border-radius: 100px;
`;

const ValueContainer = Styled.View`
flex-direction: row;
align-items: flex-end;
`;

const RecentRecordContainer = Styled.View`
`;

const ValueText = Styled.Text`
font-weight: 700;
font-size: 20px;
color: #595959;
`;

const DescripText = Styled.Text`
margin-left: 3px;
font-weight: 400;
font-size: 14px;
color: #595959;
margin-bottom: 3px;
`;

const RecentRecordText = Styled.Text`
margin-top: 8px;
font-weight: 400;
font-size: 14px;
color: #595959;
`;

interface Props {
  title: string;
  value: string;
  description?: string;
  recentRecord: string;
  type: string;
  navigation: any;
  route: any;
}

const ReportThumbnailItem = ({
  title,
  value,
  description,
  recentRecord,
  type,
  navigation,
  route,
}: Props) => {
  const moveToDetailReport = () => {
    console.log('moveToDetailReport type', type);
    if (type === 'timer') {
      console.log('타이머 리포트 상세 보기');
      navigation.navigate('TimerReportScreen');
    } else if (type === 'brushDetrition') {
      navigation.navigate('BrushDetritionReportScreen');
    } else if (type === 'symptom') {
      navigation.navigate('SymptomReportScreen');
    } else if (type === 'ai') {
      navigation.navigate('AIReportScreen');
    }
    //console.log("타이머 리포트 상세 보기ㅋㅋ")
  };

  return (
    <TouchableWithoutFeedback onPress={() => moveToDetailReport()}>
      <Container style={styles.shadow}>
        <TitleText>{title}</TitleText>
        <ReportExpressContainer>
          <ReportCircle />
        </ReportExpressContainer>
        <ValueContainer>
          <ValueText>{value}</ValueText>
          <DescripText>{description}</DescripText>
        </ValueContainer>
        <RecentRecordContainer>
          <RecentRecordText>{recentRecord}</RecentRecordText>
        </RecentRecordContainer>
      </Container>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
});

export default ReportThumbnailItem;
