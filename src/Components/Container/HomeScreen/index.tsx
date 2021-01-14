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
//Local Component
import HomeMainScreen from '~/Components/Presentational/HomeScreen';

const ContainerView = Styled.View`
flex: 1;
background: white;
`;

interface Props {
  navigation: any;
  route: any;
}

const HomeScreen = ({navigation, route}: Props) => {
  return (
    <ContainerView as={SafeAreaView} forceInset={{top: 'always'}}>
      <HomeMainScreen navigation={navigation} route={route} />
    </ContainerView>
  );
};

export default HomeScreen;
