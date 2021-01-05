import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import SafeAreaView from 'react-native-safe-area-view';
import {
  TouchableWithoutFeedback,
  FlatList,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {isIphoneX} from 'react-native-iphone-x-helper';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useIsFocused} from '@react-navigation/native';

// Local Component
import TimerTabScreen from '~/Components/Container/TeethCareScreen/TimerTabScreen';
import AITabScreen from '~/Components/Container/TeethCareScreen/AITabScreen';
import ReportTabScreen from '~/Components/Container/TeethCareScreen/ReportTabScreen';
import SymptomSlidingUpPanel from '~/Components/Presentational/TeethCareScreen/SymptomSlidingUpPanel';

const Container = Styled.View`
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
background-color: #ffffff;
`;

const TimerTabContainer = Styled.View`
flex: 1;
background-color: #ffffff;
`;

const AITabContainer = Styled.View`
flex: 1;
background-color: #ffffff;
`;

const ReportTabContainer = Styled.View`
flex: 1;
background-color: #ffffff;
`;

const SlidingUpPanelContainer = Styled.View`
`;

interface Props {
  navigation: any;
  route: any;
}

const TeethCareScreen = ({navigation, route}: Props) => {
  const [currentTab, setCurrentTab] = useState<string>('timer');
  const [isFocusedTimerTab, setIsFocusedTimerTab] = useState<boolean>(true);
  const [isFocusedAITab, setIsFocusedAITab] = useState<boolean>(false);
  const [isFocusedReportTab, setIsFocusedReportTab] = useState<boolean>(false);

  const TeethCareTab = createMaterialTopTabNavigator();

  const focusOnTimerTab = () => {
    setCurrentTab('timer');
  };

  const focusOnAITab = () => {
    setCurrentTab('ai');
  };

  const focusOnReportTab = () => {
    setCurrentTab('report');
  };

  const TimerTab = () => {
    const isFocused = useIsFocused();
    console.log('TimerTab isFocused', isFocused);
    if (isFocused) {
      setCurrentTab('timer');
    }

    return (
      <TimerTabContainer>
        <TimerTabScreen navigation={navigation} route={route} />
      </TimerTabContainer>
    );
  };

  const AITab = () => {
    const isFocused = useIsFocused();
    console.log('AITab isFocused', isFocused);
    if (isFocused) {
      setCurrentTab('ai');
    }

    return (
      <AITabContainer>
        <AITabScreen navigation={navigation} route={route} />
      </AITabContainer>
    );
  };

  const ReportTab = () => {
    const isFocused = useIsFocused();
    console.log('AITab is Focused', isFocused);
    if (isFocused) {
      setCurrentTab('report');
    }

    return (
      <ReportTabContainer>
        <ReportTabScreen navigation={navigation} route={route} />
      </ReportTabContainer>
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaStyle} forceInset={{top: 'always'}}>
      <Container>
        <BodyContainer>
          <TeethCareTab.Navigator
            tabBarOptions={{
              labelStyle: {fontSize: 18, fontWeight: '700', color: '#000000'},
              tabStyle: {width: 75},
              indicatorStyle: {backgroundColor: '#000000', height: 2.5},
            }}>
            <TeethCareTab.Screen name="타이머" component={TimerTab} />
            <TeethCareTab.Screen name="AI" component={AITab} />
            <TeethCareTab.Screen name="리포트" component={ReportTab} />
          </TeethCareTab.Navigator>
        </BodyContainer>
        {currentTab === 'timer' && (
          <SymptomSlidingUpPanel navigation={navigation} route={route} />
        )}
      </Container>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default TeethCareScreen;
