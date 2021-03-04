import React, {useState, useCallback} from 'react';
import {Image} from 'react-native';
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
}

const images = {
  question: require('~/Assets/Images/Home/banner_1.png'),
  freetalk: require('~/Assets/Images/Home/banner_1.png'),
};

const TopBanner = ({type}: Props) => {
  return (
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
  );
};

export default TopBanner;
