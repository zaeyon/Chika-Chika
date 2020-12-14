import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, TouchableOpacity, Switch} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ContainerView = Styled.View`
flex: 1;
background: white;
`;

interface Props {
  navigation: any;
  route: any;
}

const ActivityOfCommunityScreen = ({navigation, route}: Props) => {
  return <ContainerView></ContainerView>;
};

export default ActivityOfCommunityScreen;
