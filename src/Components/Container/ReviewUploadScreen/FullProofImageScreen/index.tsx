import React from 'react';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'; 
import {View, TouchableWithoutFeedback, Image} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const Container = Styled.View`
background-color: #000000;
padding-top: ${getStatusBarHeight()}
flex: 1;
`;

const HeaderContainerView = Styled.View`
width: ${wp('100%')}px;
height: auto;
position: absolute;
top: ${getStatusBarHeight()}
z-index: 1;
flex-direction: row;
align-items: center;
background-color: #00000030;
`;

const HeaderCancelView = Styled.View`
padding: 16px 16px 16px 16px;
`;
const HeaderCancelImage = Styled.Image`
width: ${wp('6.4%')}px;
height: ${wp('6.4%')}px;
`;

const FooterContainer = Styled.View`
width: ${wp('100%')}px;
position: absolute;
bottom: 0px;
background-color: #00000030;
z-index: 1;
align-items: center;
`;

const DeleteContainer = Styled.View`
padding-top: 25px;
padding-bottom: 25px;
padding-left: 20px;
padding-right: 20px;
`;

const DeleteText = Styled.Text`
font-weight: 300;
font-size: 20px;
color: #FF001F;
`;

const ProofImageContainer = Styled.View`
`;

const ProofImage = Styled.Image`
resize-mode: contain;
flex: 1;
`;

interface Props {
  navigation: any,
  route: any,
}


const FullProofImageScreen = ({navigation, route}: Props) => {


const images = [
  {
    url: route.params?.selectedProofImage.uri
  }
]

  const goBack = () => {
    navigation.goBack();
  }

  return (
    <Container>
      <HeaderContainerView>
        <TouchableWithoutFeedback onPress={() => goBack()}>
        <HeaderCancelView>
          <HeaderCancelImage
          source={require('~/Assets/Images/TopTab/ic/white.png')}
          />
        </HeaderCancelView>
        </TouchableWithoutFeedback>
      </HeaderContainerView>
      <ProofImage
      source={{uri: route.params?.selectedProofImage.uri, cache: 'force-cache'}}/>
    </Container>
  )
}

export default FullProofImageScreen;