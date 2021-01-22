import React, {useState, useEffect, useRef, useCallback} from 'react';
import Styled from 'styled-components/native';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Modal,
  Animated,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ModalContainerView = Styled.View`
flex: 1;
background: #00000070;
align-items: center;
justify-content: center;
`;

const ModalContentView = Styled.View`
width: ${wp('70%')}px;
height: auto;
padding-top: 26px;
align-items: center;
justify-content: center;
background: #FFFFFF;
border-radius: 16px;
overflow: hidden;
`;

const ModalButtonContainerView = Styled.View`
width: 100%;
height: 48px;
background: #C4C4C4;
flex-direction: row;
margin-top: 22px;
`;

const ModalButtonItemView = Styled.TouchableHighlight`
flex: 1;
height: 100%;
background: #FFFFFF;
align-items: center;
justify-content: center;
border-top-width: 1px;
border-color: #C4C4C4;
`;

const ModalButtonText = Styled.Text<{color: string | undefined}>`
font-family: NanumSquare;
font-style: normal;
font-weight: bold;
font-size: 16px;
line-height: 24px;
color: ${(props) => props.color || '#2998FF'};
`;

interface Props {
  visible: boolean;
  buttons: Button[];
  children: React.ReactNode;
}

interface Button {
  title: string;
  onPress: (preCityId?: any) => void;
  color?: string;
  style?: any;
}

const AnimatedModal = ({visible, buttons, children}: Props) => {
  const modalScale = useRef(new Animated.Value(1.2)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(modalScale, {
        toValue: 1,
        friction: 20,
        tension: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const renderButtons = useCallback((item: Button, index: number) => {
    if (buttons.length < 2) {
      return (
        <ModalButtonItemView
          activeOpacity={1}
          underlayColor="#DDDDDD"
          onPress={() => {
            item.onPress();
          }}>
          <ModalButtonText
          style={item.style}
          color={item.color}>{item.title}</ModalButtonText>
        </ModalButtonItemView>
      );
    } else {
      return (
        <ModalButtonItemView
          activeOpacity={1}
          underlayColor="#DDDDDD"
          onPress={() => {
            item.onPress();
          }}
          style={
            index === 0
              ? {
                  marginRight: 0.5,
                }
              : {
                  marginLeft: 0.5,
                }
          }>
          <ModalButtonText 
          style={item.style}
          color={item.color}>{item.title}</ModalButtonText>
        </ModalButtonItemView>
      );
    }
  }, []);
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <ModalContainerView>
        <ModalContentView
          as={Animated.View}
          style={{
            transform: [{scale: modalScale}],
          }}>
          {children}
          <ModalButtonContainerView>
            {buttons.map(renderButtons)}
          </ModalButtonContainerView>
        </ModalContentView>
      </ModalContainerView>
    </Modal>
  );
};

export default React.memo(AnimatedModal);
