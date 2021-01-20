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
 height: ${wp('14.1%')}px;
 flex-direction: row;
 justify-content: space-between;
 border-bottom-width: 1px;
 border-color: #E2E6ED;
 background-color: #ffffff;
`;

const HeaderText = Styled.Text<{disabled: boolean; color: string}>`
font-family: NanumSquare;
font-style: normal;
font-weight: bold;
font-size: 16px;
color: ${(props) => (props.disabled ? '#9AA2A9' : '#00D1FF')};
`;

const HeaderLeftContainer = Styled.View`
min-width: 44px;
height: 100%;
padding: 12px 16px 16px 16px;
align-items: center;
flex-direction: row;
`;

const HeaderLeftText = Styled.Text`
font-family: NanumSquare;
color: #131F3C;
font-size: 18px;
font-weight: 700;
`;

const HeaderTitleContainer = Styled.View`
width: 100%;
position: absolute;
height: 100%;
padding: 16px 16px 16px 16px;
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

const HeaderEmptyContainer = Styled.View`
width: ${wp('6.4%')}px;
height: ${wp('6.4%')}px;
`;

const HeaderIconView = Styled.View`
flex-direction: row;
align-items: center;
`;

const HeaderIcon = Styled.Image`
width: 24px;
height: 24px;
`;

interface HeaderProps {
  onPress?: any;
  text?: string;
  type?: string;
}

interface Props {
  headerLeftProps?: HeaderProps;
  headerRightProps?: HeaderProps;
  headerLeftDisabled?: boolean;
  headerRightDisabled?: boolean;
  headerLeftActiveColor?: string;
  headerRightActiveColor?: string;
  headerTitle: string;
}
const NavigationHeader = ({
  headerLeftProps,
  headerRightProps,
  headerLeftDisabled = false,
  headerRightDisabled = false,
  headerLeftActiveColor = '#000000',
  headerRightActiveColor = '#000000',
  headerTitle,
}: Props) => {
  return (
    <HeaderBar>
      <TouchableWithoutFeedback
        disabled={headerLeftDisabled}
        onPress={() => {
          headerLeftProps?.onPress();
        }}>
        <HeaderLeftContainer>
          {headerLeftProps?.type === 'arrow' ? (
            <HeaderIconView>
              <HeaderIcon
                style={{resizeMode: 'contain'}}
                source={require('~/Assets/Images/HeaderBar/ic_back.png')}
              />
              {headerLeftProps?.text?.length > 0 && (
                <HeaderLeftText>{headerLeftProps.text}</HeaderLeftText>
              )}
            </HeaderIconView>
          ) : (
            <HeaderText
              disabled={headerLeftDisabled}
              color={headerLeftActiveColor}>
              {headerLeftProps?.text}
            </HeaderText>
          )}
        </HeaderLeftContainer>
      </TouchableWithoutFeedback>
      <HeaderTitleContainer>
        <HeaderTitleText>{headerTitle}</HeaderTitleText>
      </HeaderTitleContainer>
      <HeaderRightContainer>
        <TouchableWithoutFeedback
          disabled={headerRightDisabled}
          onPress={() => {
            headerRightProps?.onPress();
          }}>
          {headerRightProps?.type === 'arrow' ? (
            <HeaderIconView>
              <HeaderIcon
                source={require('~/Assets/Images/Arrow/ic_rightArrow.png')}
              />
            </HeaderIconView>
          ) : headerRightProps?.type === 'viewMore' ? (
            <HeaderIconView>
              <HeaderIcon
                source={require('~/Assets/Images/HeaderBar/ic_viewMore.png')}
              />
            </HeaderIconView>
          ) : headerRightProps?.type === 'empty' ? (
            <HeaderEmptyContainer />
          ) : (
            <HeaderText
              disabled={headerRightDisabled}
              color={headerRightActiveColor}>
              {headerRightProps?.text}
            </HeaderText>
          )}
        </TouchableWithoutFeedback>
      </HeaderRightContainer>
    </HeaderBar>
  );
};

export default NavigationHeader;
