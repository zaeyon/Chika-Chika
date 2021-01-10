import React, {useState, useCallback, useMemo, useEffect} from 'react';
import {ActivityIndicator, Image, ScrollView} from 'react-native';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CameraRoll from '@react-native-community/cameraroll';
import SafeAreaView from 'react-native-safe-area-view';
// Local Components
import ImageGrid from '~/Components/Container/ImageSelectScreen/ImageGrid';
import AlbumList from '~/Components/Container/ImageSelectScreen/AlbumList';
import NavigationHeader from '~/Components/Container/ImageSelectScreen/NavigationHeader';
const ContainerView = Styled(
  (SafeAreaView as unknown) as new () => SafeAreaView,
)`
flex: 1;
background: #FFFFFF;
`;

const ContentView = Styled.View`
flex: 1;
background: red;
`;
interface Props {
  navigation: any;
  route: any;
}

interface AlbumInfo {
  type: string;
  title: string;
  count: number;
  thumbnail: any;
}

const ImageSelectScreen = ({navigation, route}: Props) => {
  const [albumImages, setAlbumImages] = useState<AlbumInfo[]>([]);
  const [albumInfos, setAlbumInfos] = useState([]);

  const [showAlbumList, setShowAlbumList] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState('최근 항목');
  const [uselessAlbums, setUselessAlbums] = useState([
    '파노라마',
    '최근 삭제된 항목',
    '고속 연사 촬영',
    '움직이는 항목',
    'Live Photo',
    'Live Photo',
  ]);
  useEffect(() => {
    fetchGalleryData();
  }, []);

  const fetchGalleryData = useCallback(async () => {
    const params: any = {
      assetType: 'Photos',
    };
    const albumInfos: any = await CameraRoll.getAlbums(params);

    const filteredAlbums = albumInfos.filter(
      (album) => !uselessAlbums.includes(album.title),
    );

    const albums = await Promise.all(
      filteredAlbums.map(async (item: any, index) => {
        if (item.type === 2) {
          // smartAlbum
          const photos = await CameraRoll.getPhotos({
            first: 100,
            groupTypes: 'All',
            groupName: item.title,
          });
          return {
            title: item.title,
            count: item.count,
            thumbnail: photos.edges[0].node.image,
            photos: photos.edges,
          };
        } else {
          // user album(1)
          const photos = await CameraRoll.getPhotos({
            first: 100,
            groupTypes: 'Album',
            groupName: item.title,
          });
          return {
            title: item.title,
            count: item.count,
            thumbnail: photos.edges[0].node.image,
            photos: photos.edges,
          };
        }
      }),
    );
    setAlbumImages(albums);
    setAlbumInfos(filteredAlbums);
  }, []);

  const toggleAlbumList = useCallback(
    () => setShowAlbumList((prev) => !prev),
    [],
  );

  const goBack = useCallback(() => navigation.goBack(), [navigation]);

  const onSubmit = useCallback(() => console.log('submit'), []);

  return (
    <ContainerView>
      <NavigationHeader
        selectedAlbum={selectedAlbum}
        toggleAlbumList={toggleAlbumList}
        goBack={goBack}
        onSubmit={onSubmit}
      />
      <ContentView>
        <AlbumList
          visible={showAlbumList}
          albums={albumInfos}
          changeSelectedAlbum={(title: string) => {
            setShowAlbumList((prev) => {
              setSelectedAlbum(title);
              return !prev;
            });
          }}
        />
        {/* {albumImages?.map((item) => (
          <ImageGrid
            selectedAlbum={selectedAlbum}
            title={item.title}
            images={item.photos}
          />
        ))} */}
        <ImageGrid
          selectedAlbum={selectedAlbum}
          title={albumImages[1].title}
          images={albumImages[1].photos}
        />
      </ContentView>
    </ContainerView>
  );
};

export default ImageSelectScreen;
