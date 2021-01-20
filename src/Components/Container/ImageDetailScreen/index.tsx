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
font-family: NanumSquare;
font-style: normal;
font-weight: bold;
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
  id: number;
  img_filename: string;
  img_index: number;
  img_mimetype: string;
  img_originalname: string;
  img_size: number;
  img_url: string;
  width: number;
  height: number;
}

interface Props {
  navigation: any;
  route: any;
}

const ImageDetailScreen = ({navigation, route}: Props) => {
  const [index, setIndex] = useState(route.params.imageIndex);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [back, setBack] = useState(true);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [scrolling, setScrolling] = useState(false);
  const dragY = useRef(new Animated.Value(0)).current;

  const scrollRef = useRef();
  const pinchRef = useRef();

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
        setScrollEnabled={setScrollEnabled}
        dragY={dragY}
        setHeaderVisible={setHeaderVisible}
        image={item}
      />
    ),
    [index, dragY],
  );

  const onScrollEnd = useCallback((e) => {
    setIndex(
      Math.max(Math.floor(e.nativeEvent.contentOffset.x / wp('100%')), 0),
    );
    setScrolling(false);
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
            <HeaderIndicatorText>{`${index + 1}/${
              route.params.imageArray.length
            }`}</HeaderIndicatorText>
          </HeaderIndicatorView>
        </HeaderConatinerView>
      ) : null}
      <NativeViewGestureHandler onGestureEvent={() => console.log('of')}>
        <ContentFlatList
          horizontal
          disableScrollViewPanResponder={true}
          scrollEnabled={scrollEnabled}
          onMomentumScrollBegin={() => setScrolling(true)}
          initialScrollIndex={route.params.imageIndex}
          getItemLayout={(data, index) => ({
            length: wp('100%'),
            offset: wp('100%') * index,
            index,
          })}
          data={route.params.imageArray}
          onMomentumScrollEnd={onScrollEnd}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => 'image-detail-' + String(index)}
          pagingEnabled={true}
          renderItem={renderImageItem}
          contentContainerStyle={{
            justifyContent: 'center',
          }}
        />
      </NativeViewGestureHandler>
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
