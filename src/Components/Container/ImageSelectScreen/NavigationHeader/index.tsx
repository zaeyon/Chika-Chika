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
  Platform
} from 'react-native';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {getStatusBarHeight} from '~/method/deviceInfo';

const HeaderBar = Styled.View`
 width: ${wp('100%')}px;
 padding-top: ${(Platform.OS === 'ios' ? getStatusBarHeight() : 0)}px;
 flex-direction: row;
 justify-content: space-between;
 border-bottom-width: 0.5px;
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
  selectedImageNum: number;
  selectedAlbum: string;
  goBack: () => void;
  toggleAlbumList: () => void;
  onSubmit: () => void;
}
const NavigationHeader = ({
  visible,
  selectedImageNum,
  selectedAlbum,
  goBack,
  toggleAlbumList,
  onSubmit,
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
            {selectedAlbum ? (
              <Image
                style={{
                  transform: [{rotate: visible ? '180deg' : '0deg'}],
                }}
                source={require('~/Assets/Images/HeaderBar/dropdownVector.png')}
              />
            ) : null}
          </HeaderTitleContentView>
        </TouchableWithoutFeedback>
      </HeaderTitleContainer>
      <TouchableWithoutFeedback
        disabled={selectedImageNum === 0}
        onPress={() => onSubmit()}>
        <HeaderRightContainer>
          <HeaderText
            style={{
              color: selectedImageNum ? '#000000' : '#9AA2A9',
            }}>
            <HeaderText
              style={{color: '#00D1FF'}}>{`(${selectedImageNum}) `}</HeaderText>
            {'업로드'}
          </HeaderText>
        </HeaderRightContainer>
      </TouchableWithoutFeedback>
    </HeaderBar>
  );
};

export default NavigationHeader;
