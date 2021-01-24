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
width: ${wp('100%')}px;
height: ${hp('100%') - wp('28.2%')}px;
z-index: -1;
`;

interface Props {
  navigation: any;
  route: any;
}
const FullImageScreen = ({navigation, route}: Props) => {
  return (
    <ContainerView as={SafeAreaView}>
      <SharedElement
        id="header"
        style={{
          position: 'absolute',
          top: getStatusBarHeight(),
        }}>
        <NavigationHeader
          headerLeftProps={{
            type: 'arrow',
            onPress: () => navigation.goBack(),
          }}
          headerRightProps={{
            type: 'text',
            text: '확인',
            onPress: () =>
              navigation.navigate(route.params.requestType, {
                selectedImage: route.params.image,
              }),
          }}
        />
      </SharedElement>
      <FullImage
        style={{
          position: 'absolute',
          resizeMode: 'cover',
        }}
        source={{
          uri: route?.params?.image.uri,
          cache: 'force-cache',
        }}
      />
    </ContainerView>
  );
};

export default FullImageScreen;
