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
  imageUri: string;
  scrolling: boolean;
}

const PinchableImage = ({
  currentIndex,
  index,
  setScrollEnabled,
  dragY,
  setHeaderVisible,
  imageUri,
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

  const contentRef = useRef();

  const [isMaxZoom, setIsMaxZoom] = useState(false);
  const [isMinZoom, setIsMinZoom] = useState(false);

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
      setTravelEnabled(false);
      setSwipeDownEnabled(true);
    }
  }, [currentIndex, index]);

  useEffect(() => {
    const range = ((lastScale - 1) * (wp('100%') / 2)) / lastScale;
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
          const range = (hp('100%') - getStatusBarHeight() * 2 - 112) / 3;
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
      }
    },
    [baseX, moveX, lastScale],
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
      listener: (e) => {
        if (lastScale * e.nativeEvent.scale > 3) {
          setIsMaxZoom((prev) => {
            if (!prev) {
              ReactNativeHapticFeedback.trigger('impactMedium', {
                enableVibrateFallback: false,
                ignoreAndroidSystemSettings: false,
              });
            }
            return true;
          });
        } else if (lastScale * e.nativeEvent.scale < 1) {
          setIsMinZoom((prev) => {
            if (!prev) {
              ReactNativeHapticFeedback.trigger('impactMedium', {
                enableVibrateFallback: false,
                ignoreAndroidSystemSettings: false,
              });
            }
            return true;
          });
        }
      },
    }),
    [pinchScale, lastScale],
  );

  const onPinchHandlerStateChange = useCallback(
    ({nativeEvent}) => {
      if (nativeEvent.oldState === State.ACTIVE) {
        setLastScale((prev) => {
          const newScale = prev * nativeEvent.scale;
          console.log(newScale * wp('100%'), 'and', wp('100%'));
          if (newScale < 1) {
            Animated.timing(pinchScale, {
              toValue: 1 / prev,
              duration: 200,
              easing: Easing.ease,
              useNativeDriver: true,
            }).start(() => {
              pinchScale.setValue(1);
              baseScale.setValue(1);
              setTravelEnabled(false);
              setSwipeDownEnabled(true);
              setIsMinZoom(false);
            });
            Animated.timing(baseX, {
              toValue: 0,
              duration: 200,
              easing: Easing.ease,
              useNativeDriver: true,
            }).start(() => setLastX(0));
            Animated.timing(baseY, {
              toValue: 0,
              duration: 200,
              easing: Easing.ease,
              useNativeDriver: true,
            }).start(() => setLastY(0));
            return 1;
          } else if (newScale > 3) {
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
              setIsMaxZoom(false);
            });
            return 3;
          } else {
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
                    {
                      translateY: translateY.interpolate({
                        inputRange: [
                          -(hp('100%') - getStatusBarHeight() * 2 - 112),
                          -(hp('100%') - getStatusBarHeight() * 2 - 112) / 3,
                          (hp('100%') - getStatusBarHeight() * 2 - 112) / 3,
                          hp('100%') - getStatusBarHeight() * 2 - 112,
                        ],
                        outputRange: [
                          -(hp('100%') - getStatusBarHeight() * 2 - 112) / 3,
                          -(hp('100%') - getStatusBarHeight() * 2 - 112) / 3,
                          (hp('100%') - getStatusBarHeight() * 2 - 112) / 3,
                          (hp('100%') - getStatusBarHeight() * 2 - 112) / 3,
                        ],
                      }),
                    },
                  ],
                }}>
                <FastImage
                  key={'image' + currentIndex}
                  onLayout={(e) => console.log(e.nativeEvent.layout)}
                  style={{
                    width: wp('100%'),
                    height: '100%',
                    maxHeight: hp('100%') - getStatusBarHeight() * 2 - 112,
                  }}
                  source={{
                    uri: imageUri,
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
