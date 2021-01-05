import React, {useEffect, useState} from 'react';
import Styled from 'styled-components/native';
import {BackHandler, TouchableWithoutFeedback} from 'react-native';
import {SliderBox} from '~/Components/Presentational/ImagesSliderBox';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ImageViewer from 'react-native-image-zoom-viewer';

const Container = Styled.SafeAreaView`
 flex: 1;
 background-color: #000000;
`;

const PullImage = Styled.Image`
flex: 1;
`;

const HeaderContainer = Styled.View`
 width: ${wp('100%')}px;
 height: ${wp('13.8%')}px;
 flex-direction: row;
 align-items: center;
 justify-content:space-between;
`;

const LeftContainer = Styled.View`
justify-content: center;
align-items: center;
padding-top: 7px;
padding-left: 16px;
padding-bottom: 13px;
`;

const HeaderCancelIcon = Styled.Image`
 width: ${wp('6.4%')}px;
 height: ${wp('6.4%')}px;
 tint-color: #ffffff;
`;

const ImagesContainer = Styled.View`
 flex: 1;
 background-color: #000000;
`;

interface Props {
  navigation: any;
  route: any;
}

const FullImagesScreen = ({route, navigation}: Props) => {
  const {imageArray} = route.params;
  const {imageIndex} = route.params;

  console.log('imageIndex', imageIndex);
  console.log('imageArray', imageArray);

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <Container>
      <HeaderContainer>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <LeftContainer>
            <HeaderCancelIcon
              source={require('~/Assets/Images/HeaderBar/ic_X.png')}
            />
          </LeftContainer>
        </TouchableWithoutFeedback>
      </HeaderContainer>
      <ImagesContainer>
        <SliderBox
          images={imageArray}
          disableOnPress={true}
          resizeMode="contain"
          sliderBoxHeight={hp('88%')}
          imageIndex={imageIndex}
          dotColor="#267DFF"
          inactiveDotColor="#cccccc"
        />
      </ImagesContainer>
    </Container>
  );
};

export default FullImagesScreen;
