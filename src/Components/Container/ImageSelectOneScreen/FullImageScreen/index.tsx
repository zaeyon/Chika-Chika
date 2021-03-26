import React, {useCallback} from 'react';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import NavigationHeader from '~/Components/Presentational/NavigationHeader';
import SafeAreaView from 'react-native-safe-area-view';
import {SharedElement} from 'react-navigation-shared-element';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
const ContainerView = Styled.View`

flex: 1;
justify-content: center;
background: #FFFFFF
`;

const FullImage = Styled.Image`
flex: 1;
z-index: -1;
`;

const FooterContainerView = Styled.View`
width: ${wp('100%')}px;
height: ${hp('8%')}px;
background: #FFFFFF;
`;

interface Props {
  navigation: any;
  route: any;
}
const FullImageScreen = ({navigation, route}: Props) => {


  const moveToRequestScreen = () => {
    console.log("route.params.requestScreen", route.params?.requestScreen);
    if(route.params?.requestScreen === 'ContentPostScreen') {
      navigation.navigate(route.params.requestScreen, {
        selectedImage: route.params.image,
        selectedIndex: route.params.selectedIndex,
      })
    } else if(route.params?.requestScreen === 'ReviewMetaDataScreen_ProofImage') {
      navigation.navigate("BraceReviewMetaDataScreen", {
        selectedProofImage: route.params.image,
      })
    } else {
      navigation.navigate(route.params.requestScreen, {
        selectedImage: route.params.image,
      })
    }
  }

  return (
    <ContainerView>
      <SharedElement id="header" style={{}}>
        <NavigationHeader
          headerLeftProps={{
            type: 'arrow',
            onPress: () => navigation.goBack(),
          }}
          headerRightProps={{
            type: 'text',
            text: '확인',
            onPress: () => moveToRequestScreen()}}
        />
      </SharedElement>
      <FullImage
        style={{
          resizeMode: 'contain',
        }}
        source={{
          uri: route?.params?.image.uri,
          cache: 'force-cache',
        }}
      />
      <FooterContainerView />
    </ContainerView>
  );
};

export default FullImageScreen;
