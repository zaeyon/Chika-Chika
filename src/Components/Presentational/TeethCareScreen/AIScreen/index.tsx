import React, {useState} from 'react';
import {
  TouchableWithoutFeedback,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ContainerView = Styled.View`
flex: 1;
background: #F6F6F6;
padding: 12px 16px;
`;

const DiagnosisHistoryContainerView = Styled.View`
width: 100%;
height: auto;
background: white;
margin: 12px 0px;
padding: 24px;
border-radius: 12px;

`;

const DiagnosisHistoryTitleText = Styled.Text`
font-weight: bold;
font-size: 12px;
line-height: 14px;
color: #757575;
margin-bottom: 24px;
`;

const DiagnosisHistoryContentView = Styled.View`
width: 100%;
height: auto;
margin-bottom: 24px;
flex-direction: row;
align-items: center;
`;

const DiagnosisHistoryContentKeyText = Styled.Text`
font-weight: bold;
font-size: 16px;
line-height: 18px;
width: 72px;
margin-right: 12px;
`;

const DiagnosisHistoryContentValueText = Styled.Text`
font-size: 16px;
line-height: 18px;
color: #616161;
`;

const RelativeReviewButtonTouchableHighlight = Styled(
  TouchableHighlight as new () => TouchableHighlight,
)`
width: 100%;
height: auto;
padding: 12px 0px;
border-radius: 4px;
border: 1px #C4C4C4;
align-items: center;
justify-content: center;
`;

const RelativeReviewButtonText = Styled.Text`
font-size: 14px;
line-height: 16px;
`;

const DiagnosisActionButtonTouchableHighlight = Styled(
  TouchableHighlight as new () => TouchableHighlight,
)`
  width: 100%;
  height: auto;
  background: white;
  border-radius: 12px;
  padding: 15px 0px;
  align-items: center;
  justify-content: center;
  `;

const DiagnosisActionButtonText = Styled.Text`
  font-weight: bold;
font-size: 16px;
line-height: 24px;
  `;
interface Props {
  navigation: any;
  route: any;
}

const AIScreen = ({navigation, route}: Props) => {
  const [whiteningRank, setWhiteningRank] = useState<string>('C3');
  const [haveBraces, setHaveBraces] = useState<string>('교정 안 함');
  const [orthodonticScore, setOrthodonticScore] = useState<number>(21);
  const [orthodonticRank, setOrthodonticRank] = useState<number>(70);

  return (
    <ContainerView>
      <DiagnosisHistoryContainerView style={styles.relativeReviewButtonShadow}>
        <DiagnosisHistoryTitleText>
          미백 체험 측정 기록
        </DiagnosisHistoryTitleText>
        <DiagnosisHistoryContentView>
          <DiagnosisHistoryContentKeyText>
            미백 등급
          </DiagnosisHistoryContentKeyText>
          <DiagnosisHistoryContentValueText>
            {whiteningRank}
          </DiagnosisHistoryContentValueText>
        </DiagnosisHistoryContentView>
        <RelativeReviewButtonTouchableHighlight
          activeOpacity={1}
          underlayColor="#EEEEEE"
          onPress={() => {
            console.log('navigate to related reviews');
          }}>
          <RelativeReviewButtonText>
            관련 리뷰 확인하기
          </RelativeReviewButtonText>
        </RelativeReviewButtonTouchableHighlight>
      </DiagnosisHistoryContainerView>
      <DiagnosisHistoryContainerView style={styles.relativeReviewButtonShadow}>
        <DiagnosisHistoryTitleText>
          교정 체험 측정 기록
        </DiagnosisHistoryTitleText>
        <DiagnosisHistoryContentView>
          <DiagnosisHistoryContentKeyText>
            교정 여부
          </DiagnosisHistoryContentKeyText>
          <DiagnosisHistoryContentValueText>
            {haveBraces}
          </DiagnosisHistoryContentValueText>
        </DiagnosisHistoryContentView>
        <DiagnosisHistoryContentView>
          <DiagnosisHistoryContentKeyText>
            교정 점수
          </DiagnosisHistoryContentKeyText>
          <DiagnosisHistoryContentValueText>
            {`${orthodonticScore}점`}
          </DiagnosisHistoryContentValueText>
        </DiagnosisHistoryContentView>
        <DiagnosisHistoryContentView>
          <DiagnosisHistoryContentKeyText>
            교정 등급
          </DiagnosisHistoryContentKeyText>
          <DiagnosisHistoryContentValueText>
            {`${orthodonticRank}%`}
          </DiagnosisHistoryContentValueText>
        </DiagnosisHistoryContentView>
        <RelativeReviewButtonTouchableHighlight
          activeOpacity={1}
          underlayColor="#EEEEEE"
          onPress={() => {
            console.log('navigate to related reviews');
          }}>
          <RelativeReviewButtonText>
            관련 리뷰 확인하기
          </RelativeReviewButtonText>
        </RelativeReviewButtonTouchableHighlight>
      </DiagnosisHistoryContainerView>
      <DiagnosisActionButtonTouchableHighlight
        style={styles.relativeReviewButtonShadow}
        activeOpacity={1}
        underlayColor="#EEEEEE"
        onPress={() => {
          console.log('navigate to diagnosis');
        }}>
        <DiagnosisActionButtonText>측정하기</DiagnosisActionButtonText>
      </DiagnosisActionButtonTouchableHighlight>
    </ContainerView>
  );
};

const styles = StyleSheet.create({
  relativeReviewButtonShadow: {
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 4,
    shadowOpacity: 0.11,
  },
});

export default AIScreen;
