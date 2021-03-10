import React, {useRef, useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TouchableWithoutFeedback, FlatList, StyleSheet} from 'react-native';
import {isIphoneX} from 'react-native-iphone-x-helper';
// import DeviceInfo from 'react-native-device-info';
import {hasNotch} from '~/method/deviceInfo'

// Local Component
import SlidingUpPanel from '~/Components/Presentational/TeethCareScreen/MeasuredBrushSlidingUpPanel/SlidingUpPanel/SlidingUpPanel';

const Container = Styled.View`
width: ${wp('100%')}px;
height: ${hp('100%')}px;
border-top-left-radius: 25px;
border-top-right-radius: 25px;
background-color: #ffffff;
border-width: 1px;
border-color: #f0f0f0;
align-items: center;
`;

const UpArrowIcon = Styled.Image`
width: ${wp('3.4%')}px;
height: ${wp('1.1%')}px;
`;

const DownArrowIcon = Styled.Image`
width: ${wp('3.4%')}px;
height: ${wp('1.3%')}px;
`;

const PanelHeaderTitleText = Styled.Text`
padding-top: 14px;
font-weight: 400;
color: #595959;
font-size: 16px;
`;

const UnfoldPanelContainer = Styled.View`
width: ${wp('100%')}px;
height: ${wp('19%')}px;
flex-direction: column;
justify-content: center;
align-items: center;
`;

const PanelHeaderContainer = Styled.View`
align-items: center;
margin: 12px 24px 0px 24px;
`;

const BrushDetritionLabelText = Styled.Text`
font-weight: 700;
font-size: 16px;
color: #595959;
`;

const MeasuredDate = Styled.Text`
margin-top: 4px;
font-weight: 400;
font-size: 12px;
color: #595959;
`;

const PanelIntroContainer = Styled.View`
width: ${wp('100%')}
margin-top: ${hasNotch() ? 30 : 10}px;
padding-left: 24px;
padding-right: 24px;
`;

const PanelIntroRowContainer = Styled.View`
flex-direction: row;
align-items: center;
justify-content: space-between;
`;

const InfoIcon = Styled.Image`
width: ${wp('4.266%')}px;
height: ${wp('4.266%')}px;
`;

const DetritionStepContainer = Styled.View`
width: ${wp('87.2%')}px;
margin-top: 13px;
flex-direction: row;
align-items: center;
padding-top: 16px;
padding-bottom: 16px;
padding-left: 24px;
padding-right: 24px;
background-color: #ffffff;
border-radius: 8px;
`;

const DetritionStepValueContainer = Styled.View`
`;

const DetritionStepValueText = Styled.Text`
color: #595959;
font-weight: 300;
font-size: 20px;
`;

const DetritionStepDescripContainer = Styled.View`
margin-left: 16px;
`;

const DetritionStepDescripText = Styled.Text`
font-weight: 300;
font-size: 14px;
color: #595959;
`;

const MeasuredResultRowContainer = Styled.View`
margin-top: 13px;
flex-direction: row;
align-items: center;
`;

const BrushLifespanContainer = Styled.View`
width: ${wp('32%')}px;
align-items: center;
justify-content: center;
background-color: #ffffff;
padding-top: 20px;
padding-bottom: 20px;
border-radius: 12px;

`;

const BrushLifespanImage = Styled.View`
width: ${wp('14.933%')}px;
height: ${wp('14.933%')}px;
border-radius: 100px;
background-color: #eeeeee;
`;

const MeasuredValueText = Styled.Text`
font-size: 16px;
font-weight: 700;
color: #595959;
`;

const MeasuredDescripText = Styled.Text`
font-weight: 400;
font-size: 16px;
color: #7a7a7a;
`;

const HabitContainer = Styled.View`
margin-left: 16px;
width: ${wp('50.9%')}px;
align-items: center;
justify-content: center;
background-color: #ffffff;
padding-top: 20px;
padding-bottom: 20px;
border-radius: 12px;

`;

interface Props {
  navigation: any;
  route: any;
}

const MeasuredBrushSlidingUpPanel = ({navigation, route}: Props) => {
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);

  const panelRef = useRef<any>(null);

  useEffect(() => {
    const obj = {
      toValue: hasNotch() ? hp('55%') : hp('48%'),
      velocity: 1,
    };
    panelRef.current.show(obj);
  }, []);

  const openPanel = () => {
    setIsPanelOpen(true);
  };

  const hidePanel = () => {
    setIsPanelOpen(false);
  };

  return (
    <SlidingUpPanel
      showBackdrop={false}
      backdropOpacity={0}
      ref={panelRef}
      minimumVelocityThreshold={0.1}
      draggableRange={{
        top: hasNotch() ? hp('55%') : hp('48%'),
        bottom: hp('10.59%'),
      }}
      openPanel={openPanel}
      hidePanel={hidePanel}>
      <Container>
        {!isPanelOpen && (
          <PanelHeaderContainer>
            <UpArrowIcon
              source={require('~/Assets/Images/Arrow/ic_upArrow.png')}
            />
            <PanelHeaderTitleText style={{marginTop: 5}}>
              {'내 칫솔 상태 확인하기'}
            </PanelHeaderTitleText>
          </PanelHeaderContainer>
        )}
        {isPanelOpen && (
          <Container>
            <PanelHeaderContainer>
              <DownArrowIcon
                source={require('~/Assets/Images/Arrow/ic_downArrow.png')}
              />
            </PanelHeaderContainer>
            <PanelIntroContainer>
              <PanelIntroRowContainer>
                <BrushDetritionLabelText>
                  {'칫솔 마모정도'}
                </BrushDetritionLabelText>
                <InfoIcon
                  source={require('~/Assets/Images/Mark/ic_info.png')}
                />
              </PanelIntroRowContainer>
              <MeasuredDate>{'2020.11.12 측정'}</MeasuredDate>
            </PanelIntroContainer>
            <DetritionStepContainer style={styles.cardShadow}>
              <DetritionStepValueContainer>
                <DetritionStepValueText>
                  <DetritionStepValueText style={{fontWeight: '700'}}>
                    {'4'}
                  </DetritionStepValueText>
                  {' 단계'}
                </DetritionStepValueText>
              </DetritionStepValueContainer>
              <DetritionStepDescripContainer>
                <DetritionStepDescripText>{`이빨이 위험해요!\n빨리 칫솔을 바꿔야겠어요!`}</DetritionStepDescripText>
              </DetritionStepDescripContainer>
            </DetritionStepContainer>
            <MeasuredResultRowContainer>
              <BrushLifespanContainer style={styles.cardShadow}>
                <BrushLifespanImage />
                <MeasuredValueText style={{marginTop: 11}}>
                  {'칫솔수명'}
                </MeasuredValueText>
                <MeasuredDescripText style={{marginTop: 5}}>
                  {'D-24'}
                </MeasuredDescripText>
              </BrushLifespanContainer>
              <HabitContainer style={styles.cardShadow}>
                <BrushLifespanImage />
                <MeasuredValueText style={{marginTop: 11}}>
                  {'칫솔질 습관'}
                </MeasuredValueText>
                <MeasuredDescripText style={{marginTop: 5}}>
                  {'이빨 잘 닦고 계신거죠?'}
                </MeasuredDescripText>
              </HabitContainer>
            </MeasuredResultRowContainer>
          </Container>
        )}
      </Container>
    </SlidingUpPanel>
  );
};

const styles = StyleSheet.create({
  cardShadow: {
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 5,
    shadowOpacity: 0.08,
  },
});

export default MeasuredBrushSlidingUpPanel;
