import React, {Component, useRef} from 'react';
import Styled from 'styled-components/native';
import {Animated, Image, TouchableOpacity} from 'react-native';
import RootSiblings from 'react-native-root-siblings';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {isIphoneX, getBottomSpace} from 'react-native-iphone-x-helper';

const Container = Styled.View`
width: ${wp('100%')}px;
position: absolute;
bottom: ${16 + getBottomSpace()}px;
align-items: center;
`;

const ToastMessageBackground = Styled.View`
border-radius: 8px;
background: #00000099;
align-items: center;
flex-direction: row;
padding-right: 4px;
`;

const ToastMessageText = Styled.Text`
margin: 8px 0px 8px 16px;
font-weight: 400;
font-size: 14px;
line-height: 24px;
color: #FFFFFF;
`;

interface Props {
  message: string;
}

class ToastMessage extends Component {
  
  static show = (message: string) => {
    const positionY = new Animated.Value(0);
    Animated.spring(positionY, {
      toValue: 1,
      friction: 17,
      tension: 68,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(positionY, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start(({finished}) => {
          toastMessage.destroy();
        });
      }, 1500);
    });

    console.log('ToastMessage message', message);
    const toastMessage = new RootSiblings(
      (
        <Container>
          <Animated.View
            style={{
              opacity: positionY,
              transform: [
                {
                  translateY: positionY.interpolate({
                    inputRange: [0, 1],
                    outputRange: [100, 0],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            }}>
            <ToastMessageBackground>
              <ToastMessageText>{message}</ToastMessageText>
              <TouchableOpacity
                onPress={() => {
                  Animated.timing(positionY, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                  }).start(({finished}) => {
                    toastMessage.destroy();
                  });
                }}
                style={{
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                }}>
                <Image
                  source={require('~/Assets/Images/Notification/ic_toast_cancel.png')}
                />
              </TouchableOpacity>
            </ToastMessageBackground>
          </Animated.View>
        </Container>
      ),
    );
  };

  render() {
    return null;
  }
}

export default ToastMessage;
