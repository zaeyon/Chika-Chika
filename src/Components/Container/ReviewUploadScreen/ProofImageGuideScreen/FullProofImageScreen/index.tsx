import React from 'react';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'; 
import {View, TouchableWithoutFeedback, Image} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const Container = Styled.View`
background-color: #000000;
padding-top: ${getStatusBarHeight()}
flex: 1;
`;

const HeaderContainerView = Styled.View`
width: ${wp('100%')}px;
height: auto;
position: absolute;
top: ${getStatusBarHeight()}
z-index: 1;
flex-direction: row;
align-items: center;
background-color: #00000030;
`;

const HeaderCancelView = Styled.View`
padding: 0px 16px 16px 16px;
`;
const HeaderCancelImage = Styled.Image`
width: 24px;
height: 24px;
`;

const FooterContainer = Styled.View`
width: ${wp('100%')}px;
position: absolute;
bottom: 0px;
background-color: #00000030;
z-index: 1;
align-items: center;
`;

const DeleteContainer = Styled.View`
padding-top: 25px;
padding-bottom: 25px;
padding-left: 20px;
padding-right: 20px;
`;

const DeleteText = Styled.Text`
font-weight: 300;
font-size: 20px;
color: #FF001F;
`;

interface Props {
  navigation: any,
  route: any,
}


const FullProofImageScreen = ({navigation, route}: Props) => {


const images = [
  {
    url: route.params?.selectedProofImage.uri
  }
]

  const goBack = () => {
    navigation.goBack();
  }

  const renderEmptyContainer = () => {
    return (
      <View/>
    )
  }

  const renderImage = (props) => {
    return (
      <Image
      style={{maxHeight: hp('10%')}}
      {...props}
      />
    )
  }

  const deleteSelectedImage = () => {
    navigation.navigate("ProofImageGuideScreen", {
      isDeletedProofImage: true
    })
  }

  return (
    <Container>
      <HeaderContainerView>
        <TouchableWithoutFeedback onPress={() => goBack()}>
        <HeaderCancelView>
          <HeaderCancelImage
          source={require('~/Assets/Images/TopTab/ic/white.png')}
          />
        </HeaderCancelView>
        </TouchableWithoutFeedback>
      </HeaderContainerView>
      <ImageViewer
      imageUrls={images}
      renderImage={renderImage}
      renderIndicator={renderEmptyContainer}/>
      <FooterContainer>
        <TouchableWithoutFeedback onPress={() => deleteSelectedImage()}>
        <DeleteContainer>
        <DeleteText>{"삭제"}</DeleteText>
        </DeleteContainer>
        </TouchableWithoutFeedback>
      </FooterContainer>
    </Container>
  )
}

export default FullProofImageScreen;