import React, {useState, useCallback, useMemo, useEffect} from 'react';
import {
  ActivityIndicator,
  Image,
  TouchableWithoutFeedback,
  LayoutAnimation,
} from 'react-native';
import Styled from 'styled-components/native';
import ImageResizer from 'react-native-image-resizer';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ContainerView = Styled.View`
width:  ${wp('100%') / 3}px;
height: ${wp('100%') / 3}px;
justify-content: center;
align-items: center;
background: #FFFFFF
`;

const SelectedImageContainerView = Styled.View`
width:  ${wp('100%') / 3 - 2}px;
height: ${wp('100%') / 3 - 2}px;
border-color: #00D1FF;
border-width: 3px;
position: absolute;
background: rgba(0, 0, 0, 0.4);
z-index: 1;
`;

const UnSelectedImageContainerView = Styled.View`
width:  ${wp('100%') / 3 - 2}px;
height: ${wp('100%') / 3 - 2}px;
position: absolute;
z-index: 1;
`;

const SelectedOrderView = Styled.View`
position: absolute;
background: #00D1FF;
width: 24px;
height: 24px;
padding-top: 1px;
justify-content: center;
align-items: center;
top: 5px;
right: 5px;
border-radius: 100px;
`;

const SelectedOrderText = Styled.Text`
font-family: NanumSquare;
font-style: normal;
font-weight: 800;
font-size: 11px;
text-align: center;
color: #FFFFFF;
`;

const UnSelectedOrderView = Styled.View`
position: absolute;
background: #131F3C80;
width: 24px;
height: 24px;
border: 2px #FFFFFF;
padding-top: 1px;
justify-content: center;
align-items: center;
top: 8px;
right: 8px;
border-radius: 100px;
opacity: 0.4;
`;

interface Props {
  image: any;
  index: number;
  selectImage: (image: any) => void;
  unSelectImage: (image: any) => void;
}

const ImageItem = ({image, index, selectImage, unSelectImage}: Props) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (index > -1) {
          unSelectImage(image);
        } else {
          selectImage(image);
        }
      }}>
      <ContainerView>
        {index > -1 ? (
          <SelectedImageContainerView>
            <SelectedOrderView>
              <SelectedOrderText>{index + 1}</SelectedOrderText>
            </SelectedOrderView>
          </SelectedImageContainerView>
        ) : (
          <UnSelectedImageContainerView>
            <UnSelectedOrderView />
          </UnSelectedImageContainerView>
        )}
        <Image
          style={{width: (wp('100%') - 6) / 3, height: (wp('100%') - 6) / 3}}
          source={{uri: `data:image/png;base64,${image.base64}`}}
        />
      </ContainerView>
    </TouchableWithoutFeedback>
  );
};

export default React.memo(ImageItem);
