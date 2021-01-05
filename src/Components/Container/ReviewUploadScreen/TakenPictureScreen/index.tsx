import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {NavigationContainer} from '@react-navigation/native';

const Container = Styled.SafeAreaView`
 flex: 1;
 background-color: #FFFFFF;
`;

const HeaderBar = Styled.View`
 width: ${wp('100%')}px;
 height: ${wp('13.8%')}px;
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
 background-color:#ffffff;
 border-bottom-width: 0.6px;
 border-color: #ECECEE;
`;

const HeaderLeftContainer = Styled.View`
height: ${wp('13.8%')}px;
padding: 0px 16px 0px 16px;
 align-items: center;
 justify-content: center;
 flex-direction: row;
`;

const HeaderBackIcon = Styled.Image`
width: ${wp('6.4%')}px;
height: ${wp('6.4%')}px;
`;

const HeaderTitleText = Styled.Text`
margin-top: 5px;

 
`;

const HeaderRightContainer = Styled.View`
height: ${wp('13.8%')}px;
padding: 0px 16px 0px 16px;
 align-items: center;
 justify-content: center;
 flex-direction: row;
`;

const BodyContainer = Styled.View`
flex: 1;
align-items: center;
justify-content: center;
`;

const TakePhotoText = Styled.Text`
`;

const GalleryText = Styled.Text`
margin-top: 30px;
`;

const HeaderRegisterText = Styled.Text`
`;

const TakenPictureImage = Styled.Image`

width: ${wp('100%')}px;
height: ${hp('90%')}
`;

interface Props {
  navigation: any;
  route: any;
}

const TakenPictureScreen = ({navigation, route}: Props) => {
  const goBack = () => {
    navigation.goBack();
  };

  const moveToReviewMeta = () => {
    navigation.navigate('ReviewMetaDataScreen');
  };

  return (
    <Container>
      <HeaderBar>
        <TouchableWithoutFeedback onPress={() => goBack()}>
          <HeaderLeftContainer>
            <HeaderBackIcon
              source={require('~/Assets/Images/HeaderBar/ic_back.png')}
            />
          </HeaderLeftContainer>
        </TouchableWithoutFeedback>
        <HeaderTitleText>영수증</HeaderTitleText>
        <TouchableWithoutFeedback onPress={() => moveToReviewMeta()}>
          <HeaderRightContainer>
            <HeaderRegisterText>등록</HeaderRegisterText>
          </HeaderRightContainer>
        </TouchableWithoutFeedback>
      </HeaderBar>
      <BodyContainer>
        <TakenPictureImage source={{uri: route.params.takenPictureUri}} />
      </BodyContainer>
    </Container>
  );
};

export default TakenPictureScreen;
