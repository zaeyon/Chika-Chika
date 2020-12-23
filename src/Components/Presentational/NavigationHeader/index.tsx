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

const HeaderBar = Styled.View`
 width: ${wp('100%')}px;
 height: ${hp('8%')}px;
 padding-top: 7px;
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
 background-color: white;
 border-bottom-width: 1px;
 border-color: #eeeeee;
`;

const HeaderText = Styled.Text`
font-size: 18px;
`;

const HeaderLeftContainer = Styled.View`
width: 30%;
height: ${hp('8%')}px;
padding: 0px 16px;
 align-items: center;
 flex-direction: row;
`;

const HeaderTitleContainer = Styled.View`
height: ${wp('13.8%')}px;
justify-content: center;
`;
const HeaderTitleText = Styled.Text`
font-weight: bold;
font-size: 18px; 
`;

const HeaderRightContainer = Styled.View`
width: 30%;
height: ${hp('8%')}px;
padding: 0px 16px 0px 16px;
 align-items: center;
 justify-content: flex-end;
 flex-direction: row;
`;

const HeaderIconView = Styled.View`
flex: 1;
`;
const HeaderIcon = Styled.Image`

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
      <HeaderLeftContainer>
        <TouchableWithoutFeedback
          onPress={() => {
            headerLeftProps?.onPress();
          }}>
          {headerLeftProps?.text === 'arrow' ? (
            <HeaderIconView>
              <HeaderIcon
                style={{resizeMode: 'contain'}}
                source={require('~/Assets/Images/Arrow/ic_leftArrow.png')}
              />
            </HeaderIconView>
          ) : (
            <HeaderText>{headerLeftProps?.text}</HeaderText>
          )}
        </TouchableWithoutFeedback>
      </HeaderLeftContainer>
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
          ) : (
            <HeaderText>{headerRightProps?.text}</HeaderText>
          )}
        </TouchableWithoutFeedback>
      </HeaderRightContainer>
    </HeaderBar>
  );
};

export default NavigationHeader;
