import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, FlatList} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {isIphoneX, getBottomSpace} from 'react-native-iphone-x-helper';

const HeaderConatinerView = Styled.View`
width: ${wp('100%')}px;
height: 40;
padding: 0px 16px;
margin-top: 40px;
flex-direction: row;
`

const HeaderContentView = Styled.View`
display: flex;
flex-direction: row;
margin-left: auto;
`
const HeaderContentText = Styled.Text`
display: flex;
margin-left: 8px;
font-style: normal;
font-weight: bold;
font-size: 18px;
line-height: 40px;

`


interface Props {
    navigation: any
}

const PostInformation = ({navigation}: Props) => {
    return (
        <HeaderConatinerView>
            <HeaderContentText>
                수다방
            </HeaderContentText>
<HeaderContentView>
            <HeaderContentText style={{
                textAlignVertical: 'center'
            }}>
                신고
            </HeaderContentText >

            <HeaderContentText style={{
                textAlignVertical: 'center'
            }}>
                공유
            </HeaderContentText>
            </HeaderContentView>
        </HeaderConatinerView>
    )
}

export default PostInformation
