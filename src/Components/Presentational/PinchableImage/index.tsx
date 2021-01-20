import React, {useCallback, useState, useRef, useEffect} from 'react';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TouchableWithoutFeedback, Animated, Easing} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import FastImage from 'react-native-fast-image';
import {
  PanGestureHandler,
  PinchGestureHandler,
  TapGestureHandler,
  State,
} from 'react-native-gesture-handler';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

const ContentView = Styled.View`
width: ${wp('100%')}px;
height: ${hp('100%')}px;
justify-content: center;

`;

interface Props {
  currentIndex: number;
  index: number;
  setScrollEnabled: (callback: any) => void;
  dragY: Animated.Value;
  setHeaderVisible: (callback: any) => void;
  image: any;
}

const PinchableImage = ({
  currentIndex,
  index,
  setScrollEnabled,
  dragY,
  setHeaderVisible,
  image,
}: Props) => {
  const [lastScale, setLastScale] = useState(1);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  const [pinchEnabled, setPinchEnabled] = useState(true);
  const [travelEnabled, setTravelEnabled] = useState(false);
  const [swipeDownEnabled, setSwipeDownEnabled] = useState(true);

  const baseScale = useRef(new Animated.Value(1)).current;
  const pinchScale = useRef(new Animated.Value(1)).current;
  const scale = useRef(Animated.multiply(baseScale, pinchScale)).current;

  const moveX = useRef(new Animated.Value(0)).current;
  const baseX = useRef(new Animated.Value(0)).current;
  const translateX = useRef(Animated.add(moveX, baseX)).current;
  const moveY = useRef(new Animated.Value(0)).current;
  const baseY = useRef(new Animated.Value(0)).current;
  const translateY = useRef(Animated.add(moveY, baseY)).current;

  useEffect(() => {
    if (currentIndex !== index) {
      baseScale.setValue(1);
      pinchScale.setValue(1);
      moveX.setValue(0);
      baseX.setValue(0);
      moveY.setValue(0);
      baseY.setValue(0);
      setLastScale(1);
      setLastX(0);
      setLastY(0);
      setPinchEnabled(true);
      setTravelEnabled(false);
      setSwipeDownEnabled(true);
    }
  }, [currentIndex, index]);

  useEffect(() => {
    if (lastScale === 1) {
      setScrollEnabled(true);
      setTravelEnabled(false);
    } else {
      setScrollEnabled(false);
      setTravelEnabled(true);
    }
  }, [lastScale]);

  const onHorizontalPanGestureEvent = useCallback(
    Animated.event(
      [{nativeEvent: {translationX: moveX, translationY: moveY}}],
      {
        useNativeDriver: true,
      },
    ),
    [moveX, moveY],
  );

  const onHorizontalPanHandlerStateChange = useCallback(
    ({nativeEvent}) => {
      console.log('hori');
      if (nativeEvent.oldState === State.ACTIVE) {
        setLastX((prev) => {
          const newX = prev + nativeEvent.translationX;
          const range = ((lastScale - 1) * (wp('100%') / 2)) / lastScale;
          console.log(newX);
          if (newX > range || newX < -range) {
            baseX.setValue(newX > range ? range : -range);
            moveX.setValue(0);
            return newX > range ? range : -range;
          } else {
            baseX.setValue(newX);
            moveX.setValue(0);
            return newX;
          }
        });
        setLastY((prev) => {
          const newY = prev + nativeEvent.translationY;
          const range =
            (((image.img_height * wp('100%')) / image.img_width >
            hp('100%') - getStatusBarHeight() * 2 - 112
              ? hp('100%') - getStatusBarHeight() * 2 - 112
              : (image.img_height * wp('100%')) / image.img_width) *
              lastScale -
              (hp('100%') - getStatusBarHeight() * 2 - 112)) /
            2 /
            lastScale;

          if (newY > range || newY < -range) {
            console.log('out!!');
            baseY.setValue(newY > range ? range : -range);
            moveY.setValue(0);
            return newY > range ? range : -range;
          } else {
            baseY.setValue(newY);
            moveY.setValue(0);
            return newY;
          }
        });
      }
    },
    [baseX, moveX, baseY, moveY, lastScale, image],
  );

  const onVerticalPanGestureEvent = useCallback(
    Animated.event([{nativeEvent: {translationY: dragY}}], {
      useNativeDriver: true,
    }),
    [dragY],
  );
  const onVerticalPanHandlerStateChange = useCallback(
    ({nativeEvent}) => {
      if (nativeEvent.oldState === State.ACTIVE) {
        if (nativeEvent.velocityY > 500) {
          Animated.spring(dragY, {
            toValue: hp('100%'),
            velocity: nativeEvent.velocityY,
            friction: 7,
            tension: 33,
            useNativeDriver: true,
          }).start();
        } else {
          Animated.spring(dragY, {
            toValue: 0,
            velocity: nativeEvent.velocityY,
            friction: 7,
            tension: 33,
            useNativeDriver: true,
          }).start();
        }
      }
    },
    [dragY],
  );

  const onPinchGestureEvent = useCallback(
    Animated.event([{nativeEvent: {scale: pinchScale}}], {
      useNativeDriver: true,
    }),
    [pinchScale],
  );

  const onPinchHandlerStateChange = useCallback(
    ({nativeEvent}) => {
      if (nativeEvent.oldState === State.ACTIVE) {
        setLastScale((prev) => {
          const newScale = prev * nativeEvent.scale;
          if (newScale < 1) {
            ReactNativeHapticFeedback.trigger('impactMedium', {
              enableVibrateFallback: false,
              ignoreAndroidSystemSettings: false,
            });

            Animated.timing(pinchScale, {
              toValue: 1 / prev,
              duration: 100,
              easing: Easing.ease,
              useNativeDriver: true,
            }).start(() => {
              pinchScale.setValue(1);
              baseScale.setValue(1);
              setTravelEnabled(false);
              setSwipeDownEnabled(true);
            });
            Animated.timing(baseX, {
              toValue: 0,
              duration: 100,
              easing: Easing.ease,
              useNativeDriver: true,
            }).start(() => {
              setLastX(0);
              baseX.setValue(0);
              moveX.setValue(0);
            });
            Animated.timing(baseY, {
              toValue: 0,
              duration: 100,
              easing: Easing.ease,
              useNativeDriver: true,
            }).start(() => {
              setLastY(0);
              baseY.setValue(0);
              moveY.setValue(0);
            });
            return 1;
          } else if (newScale > 3) {
            ReactNativeHapticFeedback.trigger('impactMedium', {
              enableVibrateFallback: false,
              ignoreAndroidSystemSettings: false,
            });
            Animated.timing(pinchScale, {
              toValue: 3 / prev,
              duration: 100,
              easing: Easing.ease,
              useNativeDriver: true,
            }).start(() => {
              pinchScale.setValue(1);
              baseScale.setValue(3);
              setTravelEnabled(true);
              setSwipeDownEnabled(false);
            });
            return 3;
          } else {
            console.log('gigi');
            baseScale.setValue(newScale);
            pinchScale.setValue(1);
            setTravelEnabled(true);
            setSwipeDownEnabled(false);
            return newScale;
          }
        });
      } else if (nativeEvent.oldState === State.BEGAN) {
        console.log('start');
      }
    },
    [pinchScale, baseScale],
  );

  return (
    <PanGestureHandler
      activeOffsetY={[-30, 30]}
      enabled={swipeDownEnabled}
      shouldCancelWhenOutside={true}
      onGestureEvent={onVerticalPanGestureEvent}
      onHandlerStateChange={onVerticalPanHandlerStateChange}
      maxPointers={2}>
      <ContentView
        as={Animated.View}
        style={{
          transform: [
            {
              translateY: dragY.interpolate({
                inputRange: [-hp('100%'), 0, hp('100%')],
                outputRange: [0, 0, hp('100%')],
                extrapolate: 'clamp',
              }),
            },
          ],
        }}>
        <PinchGestureHandler
          enabled={pinchEnabled}
          onGestureEvent={onPinchGestureEvent}
          onHandlerStateChange={onPinchHandlerStateChange}>
          <ContentView
            as={Animated.View}
            style={{
              transform: [
                {
                  scale: scale.interpolate({
                    inputRange: [0, 1, 3, 100],
                    outputRange: [0.4, 1, 3, 100],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            }}>
            <PanGestureHandler
              enabled={travelEnabled}
              maxPointers={1}
              activeOffsetX={[-1, 1]}
              activeOffsetY={[-1, 1]}
              onGestureEvent={onHorizontalPanGestureEvent}
              onHandlerStateChange={onHorizontalPanHandlerStateChange}>
              <ContentView
                as={Animated.View}
                style={{
                  transform: [
                    {
                      scale: dragY.interpolate({
                        inputRange: [-hp('100%'), 0, hp('100%')],
                        outputRange: [1, 1, 0.7],
                        extrapolate: 'clamp',
                      }),
                    },
                    {
                      translateX: translateX.interpolate({
                        inputRange: [
                          -wp('100%'),
                          -((lastScale - 1) * (wp('100%') / 2)) / lastScale,
                          ((lastScale - 1) * (wp('100%') / 2)) / lastScale,
                          wp('100%'),
                        ],
                        outputRange: [
                          -((lastScale - 1) * (wp('100%') / 2)) / lastScale,

                          -((lastScale - 1) * (wp('100%') / 2)) / lastScale,
                          ((lastScale - 1) * (wp('100%') / 2)) / lastScale,
                          ((lastScale - 1) * (wp('100%') / 2)) / lastScale,
                        ],
                        extrapolate: 'clamp',
                      }),
                    },
                    ((image.img_height * wp('100%')) / image.img_width >
                    hp('100%') - getStatusBarHeight() * 2 - 112
                      ? hp('100%') - getStatusBarHeight() * 2 - 112
                      : (image.img_height * wp('100%')) / image.img_width) *
                      lastScale >
                    hp('100%') - getStatusBarHeight() * 2 - 112
                      ? {
                          translateY: translateY.interpolate({
                            inputRange: [
                              -hp('100%'),
                              -(
                                ((image.img_height * wp('100%')) /
                                  image.img_width >
                                hp('100%') - getStatusBarHeight() * 2 - 112
                                  ? hp('100%') - getStatusBarHeight() * 2 - 112
                                  : (image.img_height * wp('100%')) /
                                    image.img_width) *
                                  lastScale -
                                (hp('100%') - getStatusBarHeight() * 2 - 112)
                              ) /
                                2 /
                                lastScale,
                              0,
                              (((image.img_height * wp('100%')) /
                                image.img_width >
                              hp('100%') - getStatusBarHeight() * 2 - 112
                                ? hp('100%') - getStatusBarHeight() * 2 - 112
                                : (image.img_height * wp('100%')) /
                                  image.img_width) *
                                lastScale -
                                (hp('100%') - getStatusBarHeight() * 2 - 112)) /
                                2 /
                                lastScale,
                              hp('100%'),
                            ],
                            outputRange: [
                              -(
                                ((image.img_height * wp('100%')) /
                                  image.img_width >
                                hp('100%') - getStatusBarHeight() * 2 - 112
                                  ? hp('100%') - getStatusBarHeight() * 2 - 112
                                  : (image.img_height * wp('100%')) /
                                    image.img_width) *
                                  lastScale -
                                (hp('100%') - getStatusBarHeight() * 2 - 112)
                              ) /
                                2 /
                                lastScale,
                              -(
                                ((image.img_height * wp('100%')) /
                                  image.img_width >
                                hp('100%') - getStatusBarHeight() * 2 - 112
                                  ? hp('100%') - getStatusBarHeight() * 2 - 112
                                  : (image.img_height * wp('100%')) /
                                    image.img_width) *
                                  lastScale -
                                (hp('100%') - getStatusBarHeight() * 2 - 112)
                              ) /
                                2 /
                                lastScale,
                              0,
                              (((image.img_height * wp('100%')) /
                                image.img_width >
                              hp('100%') - getStatusBarHeight() * 2 - 112
                                ? hp('100%') - getStatusBarHeight() * 2 - 112
                                : (image.img_height * wp('100%')) /
                                  image.img_width) *
                                lastScale -
                                (hp('100%') - getStatusBarHeight() * 2 - 112)) /
                                2 /
                                lastScale,
                              (((image.img_height * wp('100%')) /
                                image.img_width >
                              hp('100%') - getStatusBarHeight() * 2 - 112
                                ? hp('100%') - getStatusBarHeight() * 2 - 112
                                : (image.img_height * wp('100%')) /
                                  image.img_width) *
                                lastScale -
                                (hp('100%') - getStatusBarHeight() * 2 - 112)) /
                                2 /
                                lastScale,
                            ],
                            extrapolate: 'clamp',
                          }),
                        }
                      : {
                          translateY: 0,
                        },
                  ],
                }}>
                <FastImage
                  key={'image' + currentIndex}
                  style={{
                    width: wp('100%'),
                    height: image.img_height
                      ? (image.img_height * wp('100%')) / image.img_width
                      : '100%',
                    maxHeight: hp('100%') - getStatusBarHeight() * 2 - 112,
                  }}
                  source={{
                    uri: image.img_url,
                    priority:
                      index === currentIndex
                        ? FastImage.priority.high
                        : FastImage.priority.normal,
                    cache: FastImage.cacheControl.immutable,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                />
              </ContentView>
            </PanGestureHandler>
          </ContentView>
        </PinchGestureHandler>
      </ContentView>
    </PanGestureHandler>
  );
};

export default PinchableImage;
