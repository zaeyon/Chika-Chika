import React, {useState, useCallback, useMemo, useEffect} from 'react';
import {ActivityIndicator, Image, ScrollView} from 'react-native';
import Styled from 'styled-components/native';
import ImageResizer from 'react-native-image-resizer';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

interface Props {
  image: any;
}

const ImageItem = ({image}: Props) => {
  console.log(image);
  return (
    <Image
      style={{width: wp('33%'), height: wp('33%'), margin: wp(`${1 / 6}%`)}}
      source={{uri: 'data:image/jpeg;base64,' + image.baseUri}}
    />
  );
};

export default React.memo(ImageItem);
