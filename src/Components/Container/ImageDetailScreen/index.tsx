import React, {useCallback, useState, useRef} from 'react';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TouchableWithoutFeedback, Animated} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {NativeViewGestureHandler} from 'react-native-gesture-handler';
// Local Component
import PinchableImage from '~/Components/Presentational/PinchableImage';

const ContainerView = Styled.View`
flex: 1;
`;

const HeaderConatinerView = Styled.View`
width: ${wp('100%')}px;
height: auto;
position: absolute;
top: ${getStatusBarHeight()}
z-index: 1;
flex-direction: row;
align-items: center;
background: #000000;
`;

const HeaderCancelView = Styled.View`
padding: 16px;
`;
const HeaderCancelImage = Styled.Image`
width: 24px;
height: 24px;
`;

const HeaderIndicatorView = Styled.View`
margin-left: auto;
margin-right: 16px;
`;

const HeaderIndicatorText = Styled.Text`
font-style: normal;
font-weight: 500;
font-size: 18px;
line-height: 20px;
color: #FFFFFF;
`;

const ContentFlatList = Styled.FlatList`
flex: 1;
`;

const ContentView = Styled.View`
width: ${wp('100%')}px;
height: ${hp('100%')}px;
justify-content: center;
overflow: hidden;
`;
const ContentImage = Styled.Image`
width: ${wp('100%')}px;
height: 100%;
`;

const TopMaskView = Styled.View`
width: ${wp('100%')}px;
height: ${getStatusBarHeight() + 53}px;
position: absolute;
top: 0px;
background: #000000;
z-index: 0;
`;

const BottomMaskView = Styled.View`
width: ${wp('100%')}px;
height: ${getStatusBarHeight() + 53}px;
position: absolute;
bottom: 0px;
background: #000000;
`;

const BackgroundView = Styled.View`
width: ${wp('100%')}px;
height: ${hp('100%')}px;
background: #000000;
position: absolute;
bottom: 0px;
z-index: -1;
`;

interface Params {
  imageArray: Image[];
  imageIndex: number;
}

interface Image {
  id?: number;
  img_filename?: string;
  img_index?: number;
  img_mimetype?: string;
  img_originalname?: string;
  img_size?: number;
  img_url: string;
  width: number;
  height: number;
}

interface Props {
  navigation: any;
  route: Params;
}

const ImageDetailScreen = ({navigation, route}: Props) => {
  const [index, setIndex] = useState(route.params.imageIndex);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [back, setBack] = useState(true);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const dragY = useRef(new Animated.Value(0)).current;

  const scrollRef: any = useRef();

  dragY.addListener(({value}) => {
    if (value > hp('80%')) {
      setBack((prev) => {
        if (prev) {
          navigation.goBack();
        }
        return false;
      });
    }
  });

  const renderImageItem = useCallback(
    ({item, itemIndex}) => (
      <PinchableImage
        currentIndex={index}
        index={itemIndex}
        lastIndex={route.params.imageArray.length - 1}
        setScrollEnabled={setScrollEnabled}
        dragY={dragY}
        setHeaderVisible={setHeaderVisible}
        image={item}
        scrollRef={scrollRef}
      />
    ),
    [index, dragY],
  );

  const onScroll = useCallback((e) => {
    setIndex(
      Math.max(Math.round(e.nativeEvent.contentOffset.x / wp('100%')), 0),
    );
  }, []);

  return (
    <ContainerView>
      {headerVisible ? (
        <HeaderConatinerView
          as={Animated.View}
          style={{
            opacity: dragY.interpolate({
              inputRange: [-hp('100%'), 0, 1, hp('100%')],
              outputRange: [1, 1, 0, 0],
              extrapolate: 'clamp',
            }),
          }}>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <HeaderCancelView>
              <HeaderCancelImage
                source={require('~/Assets/Images/TopTab/ic/white.png')}
              />
            </HeaderCancelView>
          </TouchableWithoutFeedback>
          <HeaderIndicatorView>
            <HeaderIndicatorText>{`${index + 1} / ${
              route.params.imageArray.length
            }`}</HeaderIndicatorText>
          </HeaderIndicatorView>
        </HeaderConatinerView>
      ) : null}

      <ContentFlatList
        ref={scrollRef}
        horizontal
        scrollEnabled={scrollEnabled}
        initialScrollIndex={route.params.imageIndex}
        getItemLayout={(data, index) => ({
          length: wp('100%'),
          offset: wp('100%') * index,
          index,
        })}
        onScrollBeginDrag={() => console.log('startss')}
        data={route.params.imageArray}
        onScroll={onScroll}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => 'image-detail-' + String(index)}
        pagingEnabled={true}
        renderItem={renderImageItem}
        contentContainerStyle={{
          justifyContent: 'center',
        }}
      />

      <BackgroundView
        as={Animated.View}
        style={{
          opacity: dragY.interpolate({
            inputRange: [-hp('100%'), 0, hp('100%')],
            outputRange: [1, 1, 0],
            extrapolate: 'clamp',
          }),
        }}
      />
      <TopMaskView
        as={Animated.View}
        style={{
          opacity: dragY.interpolate({
            inputRange: [-hp('100%'), 0, 1, hp('100%')],
            outputRange: [1, 1, 0, 0],
            extrapolate: 'clamp',
          }),
        }}
      />
      <BottomMaskView
        as={Animated.View}
        style={{
          opacity: dragY.interpolate({
            inputRange: [-hp('100%'), 0, 1, hp('100%')],
            outputRange: [1, 1, 0, 0],
            extrapolate: 'clamp',
          }),
        }}
      />
    </ContainerView>
  );
};

export default React.memo(ImageDetailScreen);
