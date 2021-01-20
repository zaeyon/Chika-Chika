import React, {useState, useCallback, useMemo, useEffect} from 'react';
import {
  FlatList,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CameraRoll from '@react-native-community/cameraroll';
// Local Component
import ImageItem from '~/Components/Container/ImageSelectScreen/ImageGrid/ImageItem';
const ContainerView = Styled.View`
width: ${wp('100% ')}px;
height: 100%;
justify-content: center;
position: absolute;
background: #FFFFFF;
`;

const ActivityContainer = Styled.View`
padding: 16px;
`;

const ListHeaderImage = Styled.Image`
width:  ${wp('100%') / 3}px;
height:  ${wp('100%') / 3}px;
`;
interface Props {
  selectedAlbum: string;
  selectedImages: Image[];
  images: any;
  title: string;
  type: number;
  page_info: any;
  selectImage: (image: any) => void;
  unSelectImage: (image: any) => void;
  navigateToCamera: () => void;
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

const ImageGrid = ({
  selectedAlbum,
  selectedImages,
  images,
  title,
  type,
  page_info,
  selectImage,
  unSelectImage,
  navigateToCamera,
}: Props) => {
  const [albumData, setAlbumData] = useState(images);
  const [pageInfo, setPageInfo] = useState(page_info);
  const [isEndReached, setIsEndReached] = useState(false);

  useEffect(() => setAlbumData(images), [images]);
  useEffect(() => setPageInfo(page_info), [page_info]);

  const renderImage = useCallback(
    ({item, index}) => {
      if (index === 0) {
        return renderListHeader();
      }
      const targetIndex = selectedImages.findIndex(
        (selectedImage) => selectedImage.uri === item.node.image.uri,
      );
      return (
        <ImageItem
          image={item.node.image}
          index={targetIndex}
          selectImage={selectImage}
          unSelectImage={unSelectImage}
        />
      );
    },
    [selectedImages],
  );

  const onEndReached = useCallback(() => {
    setIsEndReached(true);
    if (pageInfo?.has_next_page) {
      CameraRoll.getPhotos({
        first: 90,
        after: pageInfo.end_cursor,
        groupTypes: type === 2 ? 'All' : 'Album',
        groupName: title,
      }).then((photos) => {
        setPageInfo(photos.page_info);
        setAlbumData([...albumData, ...photos.edges]);
        setIsEndReached(false);
      });
    }
  }, [albumData, pageInfo, type, title]);

  const renderListHeader = useCallback(
    () => (
      <TouchableWithoutFeedback onPress={() => navigateToCamera()}>
        <ListHeaderImage
          source={require('~/Assets/Images/Camera/Master/community/btn/camera.png')}
        />
      </TouchableWithoutFeedback>
    ),
    [],
  );

  const renderListFooter = useCallback(
    () =>
      isEndReached && pageInfo?.has_next_page ? (
        <ActivityContainer>
          <ActivityIndicator />
        </ActivityContainer>
      ) : null,
    [isEndReached, pageInfo],
  );

  return (
    <ContainerView style={{height: selectedAlbum === title ? '100%' : 0}}>
      <FlatList
        alwaysBounceVertical={false}
        keyExtractor={(item, index) => item.filename + String(index)}
        numColumns={3}
        data={[0, ...albumData]}
        renderItem={renderImage}
        onEndReachedThreshold={0.5}
        onEndReached={onEndReached}
        ListFooterComponent={renderListFooter}
      />
    </ContainerView>
  );
};

export default React.memo(ImageGrid);
