import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import SafeAreaView from 'react-native-safe-area-view';
import {
  TouchableWithoutFeedback,
  FlatList,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Dimensions
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
//Local Component
import HomeMainScreen from '~/Components/Presentational/HomeScreen';
import RootSiblings from 'react-native-root-siblings';
import ToastMessage from '~/Components/Presentational/ToastMessage';

const ContainerView = Styled.View`
flex: 1;
background: white;
`;

const ToastButtonListContainer = Styled.View`
flex-direction: row;
align-items: center;
padding: 16px;
`;


const ToastShowButton = Styled.View`
background-color: #c3c3c3;
width: 50px;
height: 50px;
`;

const ToastUpdateButton = Styled.View`
margin-left: 10px;
background-color: #c3c3c3;
width: 50px;
height: 50px;
`;

const ToastHideButton = Styled.View`
margin-left: 10px;
background-color: #c3c3c3;
width: 50px;
height: 50px;
`;

interface Props {
  navigation: any;
  route: any;
}

var id = 0;
var elements = [];

const HomeScreen = ({navigation, route}: Props) => {
  let sibling: any

  const addSibling = () => {
    ToastMessage.show("Toast Message Text in Home Screen");
  };

  return (
    <ContainerView as={SafeAreaView} forceInset={{top: 'always'}}>
      <HomeMainScreen navigation={navigation} route={route} />
    </ContainerView>
  );
};



export default HomeScreen;
