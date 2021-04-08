import React, {useState, useCallback, useMemo, useEffect} from 'react';
import {
  ActivityIndicator,
  Alert,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
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
import {PERMISSIONS, RESULTS, request, check, openSettings} from 'react-native-permissions'
// Local Components
import ImageGrid from '~/Components/Container/ImageSelectScreen/ImageGrid';
import AlbumList from '~/Components/Container/ImageSelectScreen/AlbumList';
import NavigationHeader from '~/Components/Container/ImageSelectScreen/NavigationHeader';
import SelectedList from '~/Components/Container/ImageSelectScreen/SelectedList';
import AnimatedModal from '~/Components/Presentational/AnimatedModal';

const ContainerView = Styled.View`
flex: 1;
background: #ffffff;
`;

const ContentView = Styled.View`
flex: 1;
justify-content: center;
align-items: center;
background: #FFFFFF;
`;

const ModaContentlText = Styled.Text`
font-style: normal;
font-weight: bold;
font-size: 14px;
line-height: 20px;
color: #131F3C;
text-align: center;
`;

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

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

  const [selectedImages, setSelectedImages] = useState<Image[]>(
    route?.params?.selectedImages || [],
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    check(PERMISSIONS.IOS.PHOTO_LIBRARY)
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log('This feature is not available (on this device / in this context)');
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
            break;
          case RESULTS.DENIED:
            console.log('The permission has not been requested / is denied but requestable');
            request(PERMISSIONS.IOS.PHOTO_LIBRARY).then((result) => {
              console.log("PERMISSIONS.IOS.PHOTO_LIBRARY result", result);
              if(result === 'granted') {
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
              } else {
                navigation.goBack();
              }
            });
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
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

            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
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
            break;
          case RESULTS.BLOCKED:
            Alert.alert('사진 권한이 없습니다.', '설정에서 권한을 허용해주세요', [{
              text: '취소',
              style: 'cancel',
              onPress: () => {
                navigation.goBack()
              }
            }, {
              text: '설정',
              onPress: () => {
                openSettings().catch(() => navigation.goBack())
                navigation.goBack()
              }
            }])
            break;
        }
    }).catch((error) => {
      Alert.alert('권환 확인 오류', '다시 시도해주세요.', [{
        text: '확인',
        onPress: () => {
          navigation.goBack()
        }
      }])
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

  const onSubmit = useCallback(() => {
    if (route.params.requestScreen === 'BraceReviewContentPostScreen') {
      navigation.navigate('BraceReviewContentPostScreen', {
        selectedImages,
        startIndex: route.params.startIndex,
      });
    } else if (route.params.requestScreen === 'ReviewMetaDataScreen_DentalImage') {
      navigation.navigate('BraceReviewMetaDataScreen', {
        selectedDentalImages: selectedImages,
      });
    } else {
      navigation.navigate(route.params.requestScreen, {
        selectedImages,
      });
    }
  }, [route, selectedImages]);

  const navigateToCamera = useCallback(() => {
    if (selectedImages.length > 11) {
      alertImageLimit();
      return;
    } else {
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
          console.log(capturedImage);
          setSelectedImages((prev) => [...prev, capturedImage]);
        }
      });
    }
  }, [selectedImages]);

  const selectImage = useCallback((image) => {
    setSelectedImages((prev) => {
      if (prev.length === 0) {
        LayoutAnimation.configureNext(
          LayoutAnimation.create(150, 'easeInEaseOut', 'opacity'),
        );
      } else {
        LayoutAnimation.configureNext(
          LayoutAnimation.create(80, 'easeInEaseOut', 'opacity'),
        );
      }
      if (prev.length > 11) {
        alertImageLimit();
        return prev;
      } else {
        return [...prev, image];
      }
    });
  }, []);

  const unSelectImage = useCallback((image) => {
    setSelectedImages((prev) => {
      if (prev.length === 1) {
        LayoutAnimation.configureNext(
          LayoutAnimation.create(150, 'easeInEaseOut', 'opacity'),
        );
      } else {
      }
      const targetIndex = prev.findIndex((item) => item.uri === image.uri);
      const newSelectedImages = prev.concat();
      console.log(targetIndex);
      if (targetIndex >= 0) {
        newSelectedImages.splice(targetIndex, 1);
        return newSelectedImages;
      } else {
        return prev;
      }
    });
  }, []);

  const alertImageLimit = () => {
    Alert.alert('사진 업로드는 최대\n12개 까지 가능합니다.', '', [
      {
        text: '닫기',
        style: 'cancel',
        onPress: () => 0,
      },
    ])
  }

  return (
    <ContainerView>
      <AnimatedModal
        visible={isModalVisible}
        buttons={[
          {
            title: '닫기',
            onPress: () => setIsModalVisible(false),
          },
        ]}>
        <ModaContentlText>
          {'사진 업로드는 최대\n12개 까지 가능합니다.'}
        </ModaContentlText>
      </AnimatedModal>
      <NavigationHeader
        visible={showAlbumList}
        selectedAlbum={selectedAlbum}
        selectedImageNum={selectedImages.length}
        toggleAlbumList={toggleAlbumList}
        goBack={goBack}
        onSubmit={onSubmit}
      />
      <SelectedList
        selectedImages={selectedImages}
        unSelectImage={unSelectImage}
      />
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
            selectedImages={selectedImages}
            images={item.photos}
            title={item.title}
            type={item.type}
            page_info={item.page_info}
            selectImage={selectImage}
            unSelectImage={unSelectImage}
            navigateToCamera={navigateToCamera}
          />
        ))}
        {recentlyAdded ? (
          <ImageGrid
            key={recentlyAdded.title}
            selectedAlbum={selectedAlbum}
            selectedImages={selectedImages}
            images={recentlyAdded.photos}
            title={recentlyAdded.title}
            type={recentlyAdded.type}
            page_info={recentlyAdded.page_info}
            selectImage={selectImage}
            unSelectImage={unSelectImage}
            navigateToCamera={navigateToCamera}
          />
        ) : null}
      </ContentView>
    </ContainerView>
  );
};

export default ImageSelectScreen;
