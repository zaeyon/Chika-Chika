import React, {useState, useCallback, useMemo, useEffect} from 'react';
import {View, Image, FlatList} from 'react-native';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Local Component
import AlbumItem from '~/Components/Container/ImageSelectOneScreen/AlbumList/AlbumItem';

const ContainerView = Styled.View`
flex: 1;
position: absolute;
height: ${hp('100%')}px;
background: #FFFFFF;
`;

const VerticalLineView = Styled.View`
width: auto;
height: 1px;
margin: 0px 16px;
background: #E2E6ED;
`;

interface Props {
  visible: boolean;
  albums: any;
  changeSelectedAlbum: (title: string) => void;
}

const AlbumList = ({visible, albums, changeSelectedAlbum}: Props) => {
  const renderAlbumItem = useCallback(
    ({item, index}) => (
      <AlbumItem album={item} changeSelectedAlbum={changeSelectedAlbum} />
    ),
    [changeSelectedAlbum],
  );
  const renderSeparator = useCallback(() => <VerticalLineView />, []);

  return (
    <ContainerView
      style={{zIndex: visible ? 3 : 0, height: visible ? '100%' : 0}}>
      <FlatList
        keyExtractor={(item) => item.title}
        data={albums}
        renderItem={renderAlbumItem}
        ItemSeparatorComponent={renderSeparator}
      />
    </ContainerView>
  );
};

export default React.memo(AlbumList);
