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
 height: ${hp('6.5%')}px;
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
 border-bottom-width: 1px;
 border-color: #E2E6ED;
 background-color: #ffffff;
`;

const HeaderText = Styled.Text`
font-size: 18px;
`;

const HeaderLeftContainer = Styled.View`
height: ${hp('6.5%')}px;
padding: 16px;
align-items: center;
flex-direction: row;
`;

const HeaderTitleContainer = Styled.View`
height: auto;
justify-content: center;
`;

const HeaderTitleText = Styled.Text`
font-family: NanumSquare;
font-weight: 700;
font-size: 16px; 
`;

const HeaderRightContainer = Styled.View`
height: ${hp('6.5%')}px;
padding: 16px;
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

  console.log("NavigationHeader statusbarHeight", getStatusBarHeight())
  return (
    <HeaderBar>
      <TouchableWithoutFeedback
      onPress={() => {
      headerLeftProps?.onPress();
      }}>
        <HeaderLeftContainer>
        
          {headerLeftProps?.text === 'arrow' ? (
            <HeaderIconView>
              <HeaderIcon
                style={{resizeMode: 'contain'}}
                source={require('~/Assets/Images/HeaderBar/ic_back.png')}
              />
            </HeaderIconView>
          ) : (
            <HeaderText>{headerLeftProps?.text}</HeaderText>
          )}
        </HeaderLeftContainer>
      </TouchableWithoutFeedback>
      <HeaderTitleContainer>
        <HeaderTitleText>{headerTitle}</HeaderTitleText>
      </HeaderTitleContainer>
      <HeaderRightContainer>
        <TouchableWithoutFeedback
          onPress={() => {
            headerRightProps?.onPress();
          }}>
          {headerRightProps?.text === 'arrow' ? (
            <HeaderIconView>
              <HeaderIcon
                source={require('~/Assets/Images/Arrow/ic_rightArrow.png')}
              />
            </HeaderIconView>
          ) :
          (headerRightProps?.text === 'viewMore' ? (
            <HeaderIconView>
              <HeaderIcon
              source={require('~/Assets/Images/HeaderBar/ic_viewMore.png')}/>
            </HeaderIconView>
          ) : (
            <HeaderText>{headerRightProps?.text}</HeaderText>
          ))}
        </TouchableWithoutFeedback>
      </HeaderRightContainer>
    </HeaderBar>
  );
};

export default NavigationHeader;
