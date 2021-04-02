import React, {useCallback, useState, useRef, useEffect} from 'react';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TouchableWithoutFeedback, Animated, Easing, Image} from 'react-native';
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
  lastIndex: number;
  setScrollEnabled: (callback: any) => void;
  dragY: Animated.Value;
  setHeaderVisible: (callback: any) => void;
  image: any;
  scrollRef: any;
}

const PinchableImage = ({
  currentIndex,
  index,
  lastIndex,
  setScrollEnabled,
  dragY,
  setHeaderVisible,
  image,
  scrollRef,
}: Props) => {
  const IMG_WIDTH = image.img_width || image.width;
  const IMG_HEIGHT = image.img_height || image.height;

  const [lastScale, setLastScale] = useState(1);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  const [isZooming, setIsZooming] = useState(false);

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

  const pinchRef = useRef();
  const panRef = useRef();
  const swipeRef = useRef();
  const doubleTapRef = useRef();

  console.log(image)
  useEffect(() => {
    if (currentIndex !== index) {
      console.log('init', index);
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
        listener: (e: any) => {
          const newX = lastX + e.nativeEvent.translationX;
          const rangeX = ((lastScale - 1) * (wp('100%') / 2)) / lastScale;

          if (newX > rangeX || newX < -rangeX) {
            scrollRef.current.scrollToOffset({
              offset:
                currentIndex * wp('100%') -
                (newX > rangeX ? newX - rangeX : newX + rangeX),
              animated: false,
            });
          } else {
          }
        },
      },
    ),
    [moveX, moveY, lastX, lastScale, currentIndex],
  );

  const onHorizontalPanHandlerStateChange = useCallback(
    ({nativeEvent}) => {
      if (nativeEvent.oldState === State.ACTIVE) {
        setLastX((prev) => {
          const newX = prev + nativeEvent.translationX;
          const range = ((lastScale - 1) * (wp('100%') / 2)) / lastScale;

          if (newX > range) {
            if (
              currentIndex !== 0 &&
              ((Math.abs(nativeEvent.velocityX) > 1200 &&
                Math.abs(newX > range ? newX - range : newX + range) > 50) ||
                Math.abs(newX > range ? newX - range : newX + range) >
                  wp('100%') / 9)
            ) {
              setPinchEnabled(false);
              scrollRef.current.scrollToIndex({
                index: newX > range ? currentIndex - 1 : currentIndex + 1,
                animated: true,
              });
            } else {
              scrollRef.current.scrollToIndex({
                index: currentIndex,
                animated: true,
              });
            }
            baseX.setValue(newX > range ? range : -range);
            moveX.setValue(0);
            return newX > range ? range : -range;
          } else if (newX < -range) {
            if (
              currentIndex !== lastIndex &&
              ((Math.abs(nativeEvent.velocityX) > 1200 &&
                Math.abs(newX > range ? newX - range : newX + range) > 50) ||
                Math.abs(newX > range ? newX - range : newX + range) >
                  wp('100%') / 9)
            ) {
              setPinchEnabled(false);
              scrollRef.current.scrollToIndex({
                index: newX > range ? currentIndex - 1 : currentIndex + 1,
                animated: true,
              });
            } else {
              scrollRef.current.scrollToIndex({
                index: currentIndex,
                animated: true,
              });
            }
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
            (((IMG_HEIGHT * wp('100%')) / IMG_WIDTH >
            hp('100%') - getStatusBarHeight() * 2 - 112
              ? hp('100%') - getStatusBarHeight() * 2 - 112
              : (IMG_HEIGHT * wp('100%')) / IMG_WIDTH) *
              lastScale -
              (hp('100%') - getStatusBarHeight() * 2 - 112)) /
            2 /
            lastScale;

          if (newY > range || newY < -range) {
            baseY.setValue(newY > range ? range : -range);
            moveY.setValue(0);
            return newY > range ? range : -range;
          } else {
            baseY.setValue(newY);
            moveY.setValue(0);
            return newY;
          }
        });
      } else if (nativeEvent.oldState === State.BEGAN) {
      }
    },
    [baseX, moveX, baseY, moveY, lastScale, image, currentIndex, lastIndex],
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
        console.log(nativeEvent.translationY);
        if (nativeEvent.translationY > 0) {
          if (nativeEvent.velocityY > 500) {
            Animated.spring(dragY, {
              toValue: hp('100%'),
              velocity: nativeEvent.velocityY,
              friction: 7,
              tension: 33,
              useNativeDriver: true,
            }).start();
          } else {
            Animated.timing(dragY, {
              toValue: 0,
              duration: 200,
              useNativeDriver: true,
            }).start();
          }
        }
      }
    },
    [dragY, swipeDownEnabled],
  );

  const onPinchGestureEvent = useCallback(
    Animated.event(
      [
        {
          nativeEvent: {
            scale: pinchScale,
            // focalX: pinchFocal.x,
            // focalY: pinchFocal.y,
          },
        },
      ],
      {
        useNativeDriver: true,
      },
    ),
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
            setPinchEnabled(false);
            // setPrevFocal({
            //   x: 0,
            //   y: 0,
            // });
            Animated.spring(pinchScale, {
              toValue: 1 / prev,
              friction: 20,
              tension: 158,

              useNativeDriver: true,
            }).start(() => {
              pinchScale.setValue(1);
              baseScale.setValue(1);
              setTravelEnabled(false);
              setSwipeDownEnabled(true);
              setPinchEnabled(true);
            });

            setLastX(0);
            baseX.setValue(0);
            moveX.setValue(0);

            setLastY(0);
            baseY.setValue(0);
            moveY.setValue(0);

            return 1;
          } else if (newScale > 4) {
            ReactNativeHapticFeedback.trigger('impactMedium', {
              enableVibrateFallback: false,
              ignoreAndroidSystemSettings: false,
            });
            Animated.timing(pinchScale, {
              toValue: 4 / prev,
              duration: 100,
              easing: Easing.ease,
              useNativeDriver: true,
            }).start(() => {
              pinchScale.setValue(1);
              baseScale.setValue(4);
              setTravelEnabled(true);
              setSwipeDownEnabled(false);
            });
            return 4;
          } else {
            baseScale.setValue(newScale);
            pinchScale.setValue(1);
            setLastX((prevX) => {
              const lastScale = prev * nativeEvent.scale;
              const range = ((lastScale - 1) * (wp('100%') / 2)) / lastScale;
              if (range < prevX) {
                moveX.setValue(0);
                baseX.setValue(range);
                return range;
              } else if (prevX < -range) {
                moveX.setValue(0);
                baseX.setValue(-range);
                return -range;
              } else {
                return prevX;
              }
            });

            // if (nativeEvent.scale > 1) {
            //   setFocal((prevFocalValue) => {
            //     setPrevFocal((prevFocaled) => ({
            //       x:
            //         ((prevFocalValue.x - prevFocaled.x) *
            //           (nativeEvent.scale - 1)) /
            //           2 +
            //         prevFocaled.x,
            //       y:
            //         ((prevFocalValue.y - prevFocaled.y) *
            //           (nativeEvent.scale - 1)) /
            //           2 +
            //         prevFocaled.y,
            //     }));
            //
            //       x: (prevFocalValue.x * nativeEvent.scale) / 3,
            //       y: (prevFocalValue.y * nativeEvent.scale) / 3,
            //     });
            //     return prevFocalValue;
            //   });
            // } else {
            //   setPrevFocal((prevFocaled) => ({
            //     x: prevFocaled.x * nativeEvent.scale,
            //     y: prevFocaled.y * nativeEvent.scale,
            //   }));
            // }
            setTravelEnabled(true);
            setSwipeDownEnabled(false);
            return newScale;
          }
        });
      } else if (nativeEvent.oldState === State.BEGAN) {
      }
    },
    [pinchScale, baseScale, lastScale],
  );

  const onTapGestureEvent = useCallback(({nativeEvent}) => {}, []);

  const onTapHandlerStateChange = useCallback(({nativeEvent}) => {
    if(nativeEvent.oldState === State.ACTIVE){
      setHeaderVisible(prev => !prev)
    }
  }, [setHeaderVisible]);

  const onDoubleTapGestureEvent = useCallback(({nativeEvent}) => {}, []);
  const onDoubleTapHandlerStateChange = useCallback(
    ({nativeEvent}) => {
      if (nativeEvent.oldState === State.ACTIVE) {
        if (!isZooming) {
          setIsZooming(true);
          setPinchEnabled(false);
          setLastScale((prev) => {
            if (prev === 1) {
              setSwipeDownEnabled(false);
              Animated.spring(pinchScale, {
                toValue: 4,
                friction: 100,
                tension: 508,
                useNativeDriver: true,
              }).start(() => {
                pinchScale.setValue(1);
                baseScale.setValue(4);
                setTravelEnabled(true);
                setPinchEnabled(true);
                setIsZooming(false);
              });
              return 4;
            } else {
              Animated.spring(baseScale, {
                toValue: 1,
                friction: 100,
                tension: 508,
                useNativeDriver: true,
              }).start(() => {
                pinchScale.setValue(1);
                baseScale.setValue(1);
                setTravelEnabled(false);
                setPinchEnabled(true);
                setSwipeDownEnabled(true);
                setIsZooming(false);
              });
              Animated.spring(baseX, {
                toValue: 0,
                friction: 17,
                tension: 108,
                useNativeDriver: true,
              }).start(() => {
                setLastX(0);
                baseX.setValue(0);
                moveX.setValue(0);
              });
              Animated.spring(baseY, {
                toValue: 0,
                friction: 17,
                tension: 108,
                useNativeDriver: true,
              }).start(() => {
                setLastY(0);
                baseY.setValue(0);
                moveY.setValue(0);
              });
              return 1;
            }
          });
        }
      }
    },
    [isZooming],
  );
  return (
    <PanGestureHandler
      ref={swipeRef}
      activeOffsetY={[-30, 30]}
      enabled={swipeDownEnabled}
      shouldCancelWhenOutside={true}
      onGestureEvent={onVerticalPanGestureEvent}
      onHandlerStateChange={onVerticalPanHandlerStateChange}
      maxPointers={1}>
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
          ref={pinchRef}
          simultaneousHandlers={panRef}
          enabled={pinchEnabled}
          onGestureEvent={onPinchGestureEvent}
          onHandlerStateChange={onPinchHandlerStateChange}>
          <ContentView
            as={Animated.View}
            style={{
              transform: [
                {
                  scale: scale.interpolate({
                    inputRange: [0, 1, 4, 100],
                    outputRange: [0.4, 1, 4, 100],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            }}>
            <PanGestureHandler
              ref={panRef}
              simultaneousHandlers={swipeDownEnabled ? swipeRef : []}
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
                    ((IMG_HEIGHT * wp('100%')) / IMG_WIDTH >
                    hp('100%') - getStatusBarHeight() * 2 - 112
                      ? hp('100%') - getStatusBarHeight() * 2 - 112
                      : (IMG_HEIGHT * wp('100%')) / IMG_WIDTH) *
                      lastScale >
                    hp('100%') - getStatusBarHeight() * 2 - 112
                      ? {
                          translateY: translateY.interpolate({
                            inputRange: [
                              -hp('100%'),
                              -(
                                ((IMG_HEIGHT * wp('100%')) /
                                  IMG_WIDTH >
                                hp('100%') - getStatusBarHeight() * 2 - 112
                                  ? hp('100%') - getStatusBarHeight() * 2 - 112
                                  : (IMG_HEIGHT * wp('100%')) /
                                    IMG_WIDTH) *
                                  lastScale -
                                (hp('100%') - getStatusBarHeight() * 2 - 112)
                              ) /
                                2 /
                                lastScale,
                              0,
                              (((IMG_HEIGHT * wp('100%')) /
                                IMG_WIDTH >
                              hp('100%') - getStatusBarHeight() * 2 - 112
                                ? hp('100%') - getStatusBarHeight() * 2 - 112
                                : (IMG_HEIGHT * wp('100%')) /
                                  IMG_WIDTH) *
                                lastScale -
                                (hp('100%') - getStatusBarHeight() * 2 - 112)) /
                                2 /
                                lastScale,
                              hp('100%'),
                            ],
                            outputRange: [
                              -(
                                ((IMG_HEIGHT * wp('100%')) /
                                  IMG_WIDTH >
                                hp('100%') - getStatusBarHeight() * 2 - 112
                                  ? hp('100%') - getStatusBarHeight() * 2 - 112
                                  : (IMG_HEIGHT * wp('100%')) /
                                    IMG_WIDTH) *
                                  lastScale -
                                (hp('100%') - getStatusBarHeight() * 2 - 112)
                              ) /
                                2 /
                                lastScale,
                              -(
                                ((IMG_HEIGHT * wp('100%')) /
                                  IMG_WIDTH >
                                hp('100%') - getStatusBarHeight() * 2 - 112
                                  ? hp('100%') - getStatusBarHeight() * 2 - 112
                                  : (IMG_HEIGHT * wp('100%')) /
                                    IMG_WIDTH) *
                                  lastScale -
                                (hp('100%') - getStatusBarHeight() * 2 - 112)
                              ) /
                                2 /
                                lastScale,
                              0,
                              (((IMG_HEIGHT * wp('100%')) /
                                IMG_WIDTH >
                              hp('100%') - getStatusBarHeight() * 2 - 112
                                ? hp('100%') - getStatusBarHeight() * 2 - 112
                                : (IMG_HEIGHT * wp('100%')) /
                                  IMG_WIDTH) *
                                lastScale -
                                (hp('100%') - getStatusBarHeight() * 2 - 112)) /
                                2 /
                                lastScale,
                              (((IMG_HEIGHT * wp('100%')) /
                                IMG_WIDTH >
                              hp('100%') - getStatusBarHeight() * 2 - 112
                                ? hp('100%') - getStatusBarHeight() * 2 - 112
                                : (IMG_HEIGHT * wp('100%')) /
                                  IMG_WIDTH) *
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
                  <TapGestureHandler
                  onGestureEvent={onTapGestureEvent}
                  onHandlerStateChange={onTapHandlerStateChange}
                  >
                  <ContentView as={Animated.View}>
                    {image.img_url ? 
                    <FastImage
                      key={'image' + currentIndex}
                      style={{
                        width: wp('100%'),
                        height: IMG_HEIGHT
                          ? (IMG_HEIGHT * wp('100%')) / IMG_WIDTH
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
                    /> :
                    <Image
                    key={'image' + currentIndex}
                    style={{
                      width: wp('100%'),
                      height: IMG_WIDTH
                        ? (IMG_HEIGHT * wp('100%')) / IMG_WIDTH
                        : '100%',
                      maxHeight: hp('100%') - getStatusBarHeight() * 2 - 112,
                      resizeMode: 'contain'
                    }}
                    source={{
                      uri: image.uri,
                      cache: 'force-cache',
                    }}
                    /> }
                  </ContentView>
                </TapGestureHandler>
              </ContentView>
            </PanGestureHandler>
          </ContentView>
        </PinchGestureHandler>
      </ContentView>
    </PanGestureHandler>
  );
};

export default PinchableImage;
