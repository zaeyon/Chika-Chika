import React, {useState, useCallback, useMemo, useEffect} from 'react';
import {View, Image, FlatList} from 'react-native';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Local Component
import ImageItem from '~/Components/Container/ImageSelectScreen/ImageGrid/ImageItem';
const ContainerView = Styled.View`
flex: 1;
height: 100%;
position: absolute
background: #FFFFFF;
`;

interface Props {
  selectedAlbum: string;
  title: string;
  images: any;
}

const ImageGrid = ({selectedAlbum, title, images}: Props) => {
  const renderImage = useCallback(
    ({item, index}) => <ImageItem image={item.node.image} />,
    [images],
  );

  return (
    <ContainerView style={{zIndex: selectedAlbum === title ? 1 : 0}}>
      <FlatList numColumns={3} data={images} renderItem={renderImage} />
    </ContainerView>
  );
};

export default React.memo(ImageGrid);
