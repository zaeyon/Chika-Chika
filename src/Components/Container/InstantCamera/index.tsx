import React, {useEffect, useState, useRef} from 'react';
import Styled from 'styled-components/native';
import {Text, TouchableWithoutFeedback} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RNCamera} from 'react-native-camera';

const ContainerView = Styled.View`
flex: 1;
background: white;
`;
interface Props {
  navigation: any;
  route: any;
}
const InstantCamera = ({navigation, route}: Props) => {
  return (
    <ContainerView>
      <RNCamera
        style={{
          width: wp('100%'),
          height: hp('100%'),
        }}
        captureAudio={false}
        type={RNCamera.Constants.Type.front}
      />
    </ContainerView>
  );
};

export default InstantCamera;
