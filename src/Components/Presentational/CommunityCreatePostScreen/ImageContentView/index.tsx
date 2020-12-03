import React, {useState, useEffect, useRef} from 'react';
import Styled from 'styled-components/native';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  View,
  Animated,
  ActivityIndicator,
  LayoutAnimation,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {isIphoneX, getBottomSpace} from 'react-native-iphone-x-helper';
import PostContent from '../../CommunityPostDetailScreen/PostContent';
// Local Component

const DeleteImage = Styled.Image`
width: 16px;
height: 16px;
`;

const GalleryContentImage = Styled.Image`
width: ${wp('15%')}px;
height: ${wp('15%')}px;

border-radius: 10px;

`;

interface Props {
  item: any;
  index: number;
  deleteImageByFilename: any;
}

const ImageContentView = ({item, index, deleteImageByFilename}: Props) => {
  const scaleX = useRef(new Animated.Value(wp('16.8%'))).current;
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    scaleX.setValue(wp('16.8%'));
  }, [item]);
  return (
    <Animated.View
      key={'image' + index}
      style={{
        width: scaleX,
        marginVertical: 0,
        marginHorizontal: scaleX.interpolate({
          inputRange: [0, wp('16.8%')],
          outputRange: [0, 4],
        }),
        overflow: 'hidden',
        height: wp('16.8%'),
        borderRadius: 10,
        justifyContent: 'flex-end',
        opacity: scaleX.interpolate({
          inputRange: [0, wp('16.8%')],
          outputRange: [0, 1],
        }),
      }}>
      <TouchableOpacity
        style={{
          flex: 1,
          position: 'absolute',
          zIndex: 1,
          right: 0,
          top: 0,
        }}
        onPress={() => {
          Animated.timing(scaleX, {
            toValue: 0,
            duration: 80,
            useNativeDriver: false,
          }).start(() => {
            deleteImageByFilename(item.filename);
          });
        }}>
        <DeleteImage
          source={require('~/Assets/Images/Picture/deleteButton.png')}
        />
      </TouchableOpacity>

      <GalleryContentImage
        source={{uri: item.uri}}
        onLoadStart={() => {}}
        onLoadEnd={() => {}}
      />
    </Animated.View>
  );
};

export default ImageContentView;
