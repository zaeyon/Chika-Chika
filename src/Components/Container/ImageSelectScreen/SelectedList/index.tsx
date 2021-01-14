import React, {useState, useCallback, useMemo, useEffect} from 'react';
import {ActivityIndicator, TouchableWithoutFeedback} from 'react-native';
import Styled from 'styled-components/native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ContainerView = Styled.View`
width: ${wp('100%')}px;
background #FFFFFF;
`;

const ContentFlatList = Styled.FlatList`
width: ${wp('100%')}px;
height: auto;
`;

const ItemContainerView = Styled.View`
width: 60px;
height: 60px;
margin: 16px 8px 16px 0px;
justify-content: flex-end;
overflow: visible;
`;

const ItemImage = Styled.Image`
width: 55px;
height: 55px;
border: 0.5px #E2E6ED;
border-radius: 2px;
`;

const DeleteButtonView = Styled.View`
width: 18px;
height: 18px;
align-items: center;
justify-content: center;
position: absolute;
top: 0px;
right: 0px;
z-index: 1;
background: #131F3C80;
border-radius: 100px;
`;
const DeleteButtonImage = Styled.Image`
width: 9px;
height: 9px;
`;
interface Props {
  selectedImages: Image[];
  unSelectImage: (image: Image) => void;
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

const SelectedList = ({selectedImages, unSelectImage}: Props) => {
  const renderImageItem = useCallback(
    ({item, index}) => (
      <TouchableWithoutFeedback onPress={() => unSelectImage(item)}>
        <ItemContainerView>
          <DeleteButtonView>
            <DeleteButtonImage
              source={require('~/Assets/Images/TopTab/ic/white.png')}
            />
          </DeleteButtonView>
          <ItemImage
            source={
              item.img_url
                ? {uri: item.img_url} // image from s3
                : {
                    uri: item.base64
                      ? 'data:image/jpeg;base64,' + item.base64
                      : item.uri,
                  }
            }
          />
        </ItemContainerView>
      </TouchableWithoutFeedback>
    ),
    [],
  );
  return (
    <ContainerView>
      <ContentFlatList
        horizontal
        alwaysBounceHorizontal={false}
        contentContainerStyle={{
          paddingLeft: 16,
          paddingRight: 8,
        }}
        scrollIndicatorInsets={{bottom: 1}}
        keyExtractor={(item: any) =>
          'selected' + (item.filename || item.img_filename)
        }
        data={selectedImages}
        renderItem={renderImageItem}
      />
    </ContainerView>
  );
};

export default SelectedList;
