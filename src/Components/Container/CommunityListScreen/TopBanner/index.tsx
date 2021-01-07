import React, {useState, useCallback} from 'react';
import {Image} from 'react-native';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ContianerView = Styled.View`
width: ${wp('100%')}px;
height: ${wp('50%')}px;
background: #F0F6FC;
align-items: center;
margin-bottom: 8px;
`;

interface Props {
  type: string;
}

const images = {
  question: require('~/Assets/Images/dunkirk_banner.jpg'),
  freetalk: require('~/Assets/Images/kingdom_banner.jpg'),
};

const TopBanner = ({type}: Props) => {
  return (
    <ContianerView>
      <Image
        source={images[type]}
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </ContianerView>
  );
};

export default TopBanner;
