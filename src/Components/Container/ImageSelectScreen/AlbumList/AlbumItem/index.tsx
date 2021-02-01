import React, {useState, useCallback, useMemo, useEffect} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import Styled from 'styled-components/native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ContainerView = Styled.View`
width: ${wp('100%')}px;
padding: 16px;
flex-direction: row;
background: #FFFFFF
`;

const ThumbnailImage = Styled.Image`
width: 67px;
height: 67px;
margin-right: 12px;
`;

const ContentView = Styled.View`
`;
const TitleText = Styled.Text`

font-style: normal;
font-weight: bold;
font-size: 16px;
line-height: 24px;

`;

const DescriptionText = Styled.Text`

font-style: normal;
font-weight: normal;
font-size: 13px;
line-height: 20px;
color: #9AA2A9;
margin-top: 4px;
`;
interface Props {
  album: any;
  changeSelectedAlbum: (title: string) => void;
}

const AlbumItem = ({album, changeSelectedAlbum}: Props) => {
  return (
    <TouchableHighlight onPress={() => changeSelectedAlbum(album.title)}>
      <ContainerView>
        <ThumbnailImage source={{uri: album.thumbnail}} />
        <ContentView>
          <TitleText>{album.title}</TitleText>
          <DescriptionText>{album.count}</DescriptionText>
        </ContentView>
      </ContainerView>
    </TouchableHighlight>
  );
};

export default React.memo(AlbumItem);
