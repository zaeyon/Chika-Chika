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
 height: ${wp('14.1%') + getStatusBarHeight()}px;
 margin-top: ${-getStatusBarHeight()}
 padding-top: ${getStatusBarHeight()}
 flex-direction: row;
 justify-content: space-between;
 border-bottom-width: 1px;
 border-color: #E2E6ED;
 background-color: #ffffff;
 z-index: 3;
`;

const HeaderText = Styled.Text`
 
font-style: normal;
font-weight: bold;
font-size: 16px;
`;

const HeaderLeftContainer = Styled.View`
min-width: 44px;
height: 100%;
padding: 12px 16px 17px 16px;
align-items: center;
flex-direction: row;
`;

const HeaderTitleContainer = Styled.View`
width: 100%;
position: absolute;
height: 100%;
top: ${getStatusBarHeight()}
justify-content: center;
align-items: center;
z-index: -1;
`;

const HeaderTitleContentView = Styled.View`
padding: 12px 16px 17px 16px;
align-items: center;
flex-direction: row;
`;
const HeaderTitleText = Styled.Text`
 
font-weight: 700;
font-size: 16px; 
margin-right: 5px;
`;

const HeaderRightContainer = Styled.View`
min-width: 44px;
height: 100%;
padding: 12px 16px 17px 16px;
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
  visible: boolean;
  selectedAlbum: string;
  goBack: () => void;
  toggleAlbumList: () => void;
}
const NavigationHeader = ({
  visible,
  selectedAlbum,
  goBack,
  toggleAlbumList,
}: Props) => {
  return (
    <HeaderBar>
      <TouchableWithoutFeedback onPress={() => goBack()}>
        <HeaderLeftContainer>
          <HeaderIcon
            style={{
              resizeMode: 'contain',
              width: 24,
              height: 24,
            }}
            source={require('~/Assets/Images/HeaderBar/ic_X.png')}
          />
        </HeaderLeftContainer>
      </TouchableWithoutFeedback>
      <HeaderTitleContainer>
        <TouchableWithoutFeedback
          onPress={() => {
            toggleAlbumList();
          }}>
          <HeaderTitleContentView>
            <HeaderTitleText>{selectedAlbum}</HeaderTitleText>
            <Image
              style={{
                transform: [{rotate: visible ? '180deg' : '0deg'}],
              }}
              source={require('~/Assets/Images/HeaderBar/dropdownVector.png')}
            />
          </HeaderTitleContentView>
        </TouchableWithoutFeedback>
      </HeaderTitleContainer>
    </HeaderBar>
  );
};

export default NavigationHeader;
