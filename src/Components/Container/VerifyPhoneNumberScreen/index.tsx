import React from 'react';
import Styled from 'styled-components/native';
import {Text, TouchableWithoutFeedback} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Container = Styled.View`
flex: 1;
background-color: #ffffff;
align-items: center;
justify-content: center;
`;

const NumberInput = Styled.TextInput`
width: ${wp('91.46%')}px;
height: ${wp('14.93%')}px;
background-color: #F0F0F0;
`;

const VerifyButton = Styled.View`
width: 100px;
height: 100px;
background-color: #c3c3c3;
align-items: center;
justify-content: center;
`;

const AuthCodeInput = Styled.View`
width: ${wp('91.46%')}px;
height: ${wp('14.93%')}px;
background-color: #F0F0F0;
`;

interface Props {
  navigation: any;
  route: any;
}

const VerifyPhoneNumberScreen = ({navigation, route}: Props) => {
  const sendAuthCodeSMS = () => {};

  return (
    <Container>
      <NumberInput />
      <TouchableWithoutFeedback onPress={() => sendAuthCodeSMS()}>
        <VerifyButton>
          <Text>인증</Text>
        </VerifyButton>
      </TouchableWithoutFeedback>
    </Container>
  );
};

export default VerifyPhoneNumberScreen;
