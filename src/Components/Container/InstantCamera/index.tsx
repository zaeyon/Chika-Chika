import React, {useEffect, useState, useRef} from 'react';
import Styled from 'styled-components/native';
import {Text, TouchableWithoutFeedback} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {launchCamera} from 'react-native-image-picker';

const ContainerView = Styled.View`
flex: 1;
background: white;
`;
interface Props {
  navigation: any;
  route: any;
}
const InstantCamera = ({navigation, route}: Props) => {
  useEffect(() => {
    launchCamera({}, (e) => console.log(e));
  }, []);
  return <ContainerView></ContainerView>;
};

export default InstantCamera;
