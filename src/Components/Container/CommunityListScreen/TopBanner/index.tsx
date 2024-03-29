import React, {useState, useCallback} from 'react';
import {Image, TouchableWithoutFeedback} from 'react-native';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ContianerView = Styled.View`
width: ${wp('100%')}px;
height: 112px;
background: #F0F6FC;
align-items: center;
margin-top: 8px;
`;

interface Props {
  type: string;
  moveToBannerDetail: () => void,
}

const images = {
  question: require('~/Assets/Images/Banner/review_starbucks_spring.png'),
  freetalk: require('~/Assets/Images/Banner/review_starbucks_spring.png'),
};

const TopBanner = ({type, moveToBannerDetail}: Props) => {
  return (
    <TouchableWithoutFeedback onPress={() => moveToBannerDetail()}>
    <ContianerView>
      <Image
        source={images[type]}
        style={{
          width: '100%',
          height: '100%',
          resizeMode: 'cover',
        }}
      />
    </ContianerView>
    </TouchableWithoutFeedback>
  );
};

export default TopBanner;
