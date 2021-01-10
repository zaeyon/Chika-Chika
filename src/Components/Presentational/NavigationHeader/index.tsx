import React, {useState, useEffect, useRef} from 'react';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  Text,
  View,
  Image,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const HeaderBar = Styled.View`
 width: ${wp('100%')}px;
 flex-direction: row;
 justify-content: space-between;
 border-bottom-width: 1px;
 border-color: #E2E6ED;
 background-color: #ffffff;
`;

const HeaderText = Styled.Text`
font-family: NanumSquare;
font-style: normal;
font-weight: bold;
font-size: 16px;
color: #9AA2A9;
`;

const HeaderLeftContainer = Styled.View`
min-width: 44px;
height: 100%;
padding: 12px 16px 16px 16px;
align-items: center;
flex-direction: row;
`;

const HeaderTitleContainer = Styled.View`
width: 100%;
position: absolute;
height: 100%;
padding: 12px 16px 16px 16px;
justify-content: center;
align-items: center;
z-index: -1;
`;

const HeaderTitleText = Styled.Text`
font-family: NanumSquare;
font-weight: 700;
font-size: 16px; 
`;

const HeaderRightContainer = Styled.View`
min-width: 44px;
height: 100%;
padding: 12px 16px 16px 16px;
 align-items: center;
 flex-direction: row;
`;

const HeaderIconView = Styled.View`
`;
const HeaderIcon = Styled.Image`
width: ${wp('6.4%')}px;
height: ${wp('6.4%')}px;
`;

interface HeaderProps {
  onPress?: any;
  text: string;
}

interface Props {
  headerLeftProps?: HeaderProps;
  headerRightProps?: HeaderProps;
  headerTitle: string;
}
const NavigationHeader = ({
  headerLeftProps,
  headerRightProps,
  headerTitle,
}: Props) => {
  return (
    <HeaderBar>
      <TouchableWithoutFeedback
        onPress={() => {
          headerLeftProps?.onPress();
        }}>
        <HeaderLeftContainer>
          {headerLeftProps?.text === 'arrow' ? (
            <HeaderIcon
              style={{
                resizeMode: 'contain',
                width: 24,
                height: 24,
              }}
              source={require('~/Assets/Images/HeaderBar/ic_back.png')}
            />
          ) : (
            <HeaderText>{headerLeftProps?.text}</HeaderText>
          )}
        </HeaderLeftContainer>
      </TouchableWithoutFeedback>
      <HeaderTitleContainer>
        <HeaderTitleText>{headerTitle}</HeaderTitleText>
      </HeaderTitleContainer>
      <TouchableWithoutFeedback
        onPress={() => {
          headerRightProps?.onPress();
        }}>
        <HeaderRightContainer>
          {headerRightProps?.text === 'arrow' ? (
            <HeaderIconView>
              <HeaderIcon
                style={{resizeMode: 'contain', width: 24, height: 24}}
                source={require('~/Assets/Images/Arrow/ic_rightArrow.png')}
              />
            </HeaderIconView>
          ) : headerRightProps?.text === 'viewMore' ? (
            <HeaderIconView>
              <HeaderIcon
                style={{resizeMode: 'contain', width: 24, height: 24}}
                source={require('~/Assets/Images/HeaderBar/ic_viewMore.png')}
              />
            </HeaderIconView>
          ) : (
            <HeaderText>{headerRightProps?.text}</HeaderText>
          )}
        </HeaderRightContainer>
      </TouchableWithoutFeedback>
    </HeaderBar>
  );
};

export default NavigationHeader;
