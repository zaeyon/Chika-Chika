import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//local-components
import NavigationHeader from '~/Components/Presentational/NavigationHeader';
import ActivityOfCommunityScreen from '~/Components/Presentational/MyProfileScreen/ActivityHistoryScreen/ActivityOfCommunityScreen';
import ActivityOfReviewScreen from '~/Components/Presentational/MyProfileScreen/ActivityHistoryScreen/ActivityOfReviewScreen';
import ActivityOfQuestionScreen from '~/Components/Presentational/MyProfileScreen/ActivityHistoryScreen/ActivityOfQuestionScreen';

const ContainerView = Styled.SafeAreaView`
 flex: 1;
 background-color: #FFFFFF;
`;
interface Props {
  navigation: any;
  route: any;
}

const ActivityHistoryTabScreen = ({navigation, route}: Props) => {
  const ActivityTopTab = createMaterialTopTabNavigator();
  const headerLeftAction = () => {
    navigation.goBack();
  };

  return (
    <ContainerView>
      <NavigationHeader
        headerLeftProps={{
          onPress: headerLeftAction,
          text: 'arrow',
        }}
        headerTitle="활동기록"
      />
      <ActivityTopTab.Navigator
        style={{
          flex: 1,
        }}
        tabBarOptions={{
          style: {},
          labelStyle: {},
          tabStyle: {},
          indicatorContainerStyle: {},
          indicatorStyle: {
            backgroundColor: '#000000',
            height: 2.5,
          },
        }}>
        <ActivityTopTab.Screen
          name="수다"
          component={ActivityOfCommunityScreen}
        />
        <ActivityTopTab.Screen name="리뷰" component={ActivityOfReviewScreen} />
        <ActivityTopTab.Screen
          name="질문"
          component={ActivityOfQuestionScreen}
        />
      </ActivityTopTab.Navigator>
    </ContainerView>
  );
};

export default ActivityHistoryTabScreen;
