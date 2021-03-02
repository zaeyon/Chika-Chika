import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {
  TouchableWithoutFeedback,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {isIphoneX, getBottomSpace} from 'react-native-iphone-x-helper';

const HeaderConatinerView = Styled.View`
width: ${wp('100%')}px;
height: 40px;
padding: 0px 16px;
margin-top: ${isIphoneX() ? 10 : 20}px;
flex-direction: row;
`;

const HeaderContentView = Styled.View`
width: auto;
height: 100%;
flex-direction: row;
margin-left: auto;
`;
const HeaderContentText = Styled.Text`

font-style: normal;
font-weight: bold;
font-size: 18px;
line-height: 40px;

`;

interface Props {
  navigation: any;
  onPressEditPost: any;
  onPressDeletePost: any;
}

const PostInformation = ({
  navigation,
  onPressEditPost,
  onPressDeletePost,
}: Props) => {
  return (
    <HeaderConatinerView>
      <TouchableOpacity
        style={{justifyContent: 'center', width: 18}}
        onPress={() => {
          navigation.goBack();
        }}>
        <Image
          style={{
            height: 18,
          }}
          source={require('~/Assets/Images/HeaderBar/ic_back.png')}
        />
      </TouchableOpacity>
      <HeaderContentText>수다방</HeaderContentText>
      <HeaderContentView>
        <TouchableOpacity onPress={() => onPressEditPost()}>
          <HeaderContentText
            style={{
              textAlignVertical: 'center',
            }}>
            수정
          </HeaderContentText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onPressDeletePost()}>
          <HeaderContentText
            style={{
              textAlignVertical: 'center',
              marginLeft: 8,
            }}>
            삭제
          </HeaderContentText>
        </TouchableOpacity>
        <TouchableOpacity>
          <HeaderContentText
            style={{
              textAlignVertical: 'center',
              marginLeft: 8,
            }}>
            신고
          </HeaderContentText>
        </TouchableOpacity>
        {/* <TouchableOpacity>
          <HeaderContentText
            style={{
              textAlignVertical: 'center',
              marginLeft: 8,
            }}>
            공유
          </HeaderContentText>
        </TouchableOpacity> */}
      </HeaderContentView>
    </HeaderConatinerView>
  );
};

export default PostInformation;
