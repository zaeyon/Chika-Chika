import React, {useEffect, useState} from 'react';
import Styled from 'styled-components/native';
import {BackHandler, TouchableWithoutFeedback} from 'react-native';
import {SliderBox} from '~/Components/Presentational/ImagesSliderBox';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const Container = Styled.SafeAreaView`
 flex: 1;
 background-color: #000000;
`;

const PullImage = Styled.Image`
flex: 1;
`;


const HeaderContainer = Styled.View`
 width: ${wp('100%')};
 height: ${wp('13.8%')};
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
 width: ${wp('6.4%')};
 height: ${wp('6.4%')};
 tint-color: #ffffff;
`;

const ImagesContainer = Styled.View`
 flex: 1;
 background-color: #000000;
`;

interface Props {
  navigation: any,
  route: any,
}


const FullImagesScreen = ({route, navigation}: Props) => {
  const [images, setImages] = useState([
    'https://source.unsplash.com/1024x768/?nature',
    'https://source.unsplash.com/1024x768/?water',
    'https://source.unsplash.com/1024x768/?girl',
    'https://source.unsplash.com/1024x768/?tree',
  ]);
  const {imagesUrl_arr} = route.params;
  const {imageIndex} = route.params;
  //  const newUrl_arr = imagesUrl_arr.slice(0, imagesUrl_arr.length - 1);
  //  console.log('newUrl_arr : ', newUrl_arr);
  console.log('imageIndex');

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
          source={require('~/Assets/Images/HeaderBar/ic_X.png')}/>
        </LeftContainer>
      </TouchableWithoutFeedback>
      </HeaderContainer>
      <ImagesContainer>
      <SliderBox
        images={imagesUrl_arr}
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
