import React, {useState, useCallback, useMemo, useEffect} from 'react';
import {ActivityIndicator, Alert, LayoutAnimation} from 'react-native';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CameraRoll, {
  Album,
  PhotoIdentifier,
} from '@react-native-community/cameraroll';
import {launchCamera} from 'react-native-image-picker';
import SafeAreaView from 'react-native-safe-area-view';
import {SharedElement} from 'react-navigation-shared-element';
// Local Components
import ImageGrid from '~/Components/Container/ImageSelectOneScreen/ImageGrid';
import AlbumList from '~/Components/Container/ImageSelectOneScreen/AlbumList';
import NavigationHeader from '~/Components/Container/ImageSelectOneScreen/NavigationHeader';
import SelectedList from '~/Components/Container/ImageSelectScreen/SelectedList';
import AnimatedModal from '~/Components/Presentational/AnimatedModal';

const ContainerView = Styled(
  (SafeAreaView as unknown) as new () => SafeAreaView,
)`
flex: 1;
background: #FFFFFF;
`;

const ContentView = Styled.View`
flex: 1;
justify-content: center;
align-items: center;
background: #FFFFFF;
`;

const ModaContentlText = Styled.Text`
font-family: NanumSquare;
font-style: normal;
font-weight: bold;
font-size: 14px;
line-height: 20px;
color: #131F3C;
text-align: center;
`;
interface Props {
  navigation: any;
  route: any;
}

interface AlbumInfo {
  title: string;
  type: number;
  photos: any;
  page_info: any;
}

interface Image {
  /** Only set if the `include` parameter contains `filename`. */
  filename: string | null;
  uri: string;
  base64: string;
  /** Only set if the `include` parameter contains `imageSize`. */
  height: number;
  /** Only set if the `include` parameter contains `imageSize`. */
  width: number;
  /** Only set if the `include` parameter contains `fileSize`. */
  fileSize: number | null;
  /**
   * Only set if the `include` parameter contains `playableDuration`.
   * Will be null for images.
   */
  playableDuration?: number | null;
}

interface CameraResponse {
  didCancel: boolean;
  errorCode: number;
  errorMessage: string;
  base64: string;
  uri: string;
  width: number;
  height: number;
  fileSize: number;
  type: string;
  fileName: string;
}

const ImageSelectScreen = ({navigation, route}: Props) => {
  const [albumImages, setAlbumImages] = useState<AlbumInfo[]>([]);
  const [albumInfos, setAlbumInfos] = useState<Album[]>([]);
  const [recentlyAdded, setRecentlyAdded] = useState<AlbumInfo>();

  const [showAlbumList, setShowAlbumList] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState('');
  const [uselessAlbums, setUselessAlbums] = useState([
    '파노라마',
    '최근 삭제된 항목',
    '고속 연사 촬영',
    '움직이는 항목',
    'Live Photo',
    'Live Photo',
  ]);

  useEffect(() => {
    CameraRoll.getPhotos({
      first: 89,
      groupTypes: 'init',
      groupName: 'init',
    }).then((photos) => {
      setSelectedAlbum(photos.edges[0].node.group_name);
      const result = {
        title: photos.edges[0].node.group_name,
        type: 2,
        photos: photos.edges,
        page_info: photos.page_info,
      };
      console.log('rec', photos.edges[0].node.image);
      setRecentlyAdded(result);
    });

    CameraRoll.getAlbums({
      assetType: 'Photos',
    }).then((albumInfos: Album[]) => {
      const filteredAlbums: Album[] = albumInfos.filter(
        (album) => !uselessAlbums.includes(album.title),
      );

      setAlbumInfos(filteredAlbums);

      fetchGalleryData(filteredAlbums);
    });
  }, []);

  const fetchGalleryData = useCallback(async (filteredAlbums) => {
    const albums: AlbumInfo[] = await Promise.all(
      filteredAlbums.map(async (item: any) => {
        console.log(item);
        if (item.type === 2) {
          //smart album
          const photos = await CameraRoll.getPhotos({
            first: 29,
            groupTypes: 'All',
            groupName: item.title,
          });
          return {
            title: item.title,
            type: item.type,
            photos: photos.edges,
            page_info: photos.page_info,
          };
        } else {
          const photos = await CameraRoll.getPhotos({
            first: 29,
            groupTypes: 'Album',
            groupName: item.title,
          });
          return {
            title: item.title,
            type: item.type,
            photos: photos.edges,
            page_info: photos.page_info,
          };
        }
      }),
    );
    setAlbumImages(albums);
  }, []);

  const toggleAlbumList = useCallback(
    () => setShowAlbumList((prev) => !prev),
    [],
  );

  const goBack = useCallback(() => navigation.goBack(), [navigation]);

  const navigateToCamera = useCallback(() => {
    launchCamera({includeBase64: true}, (response: CameraResponse) => {
      if (!response.didCancel) {
        const capturedImage: Image = {
          filename: response.fileName,
          fileSize: response.fileSize,
          width: response.width,
          height: response.height,
          uri: response.uri,
          base64: response.base64,
        };
      }
    });
  }, []);

  const moveToFullImage = useCallback((item) => {
    navigation.navigate('FullImageScreen', {
      image: item,
      requestType: route.params.requestType,
    });
  }, []);

  return (
    <ContainerView>
      <SharedElement id="header">
        <NavigationHeader
          visible={showAlbumList}
          selectedAlbum={selectedAlbum}
          toggleAlbumList={toggleAlbumList}
          goBack={goBack}
        />
      </SharedElement>
      <ContentView>
        <ActivityIndicator />
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

        {albumImages?.map((item) => (
          <ImageGrid
            key={item.title}
            selectedAlbum={selectedAlbum}
            images={item.photos}
            title={item.title}
            type={item.type}
            page_info={item.page_info}
            navigateToCamera={navigateToCamera}
            moveToFullImage={moveToFullImage}
          />
        ))}
        {recentlyAdded ? (
          <ImageGrid
            key={recentlyAdded.title}
            selectedAlbum={selectedAlbum}
            images={recentlyAdded.photos}
            title={recentlyAdded.title}
            type={recentlyAdded.type}
            page_info={recentlyAdded.page_info}
            navigateToCamera={navigateToCamera}
            moveToFullImage={moveToFullImage}
          />
        ) : null}
      </ContentView>
    </ContainerView>
  );
};

export default ImageSelectScreen;
