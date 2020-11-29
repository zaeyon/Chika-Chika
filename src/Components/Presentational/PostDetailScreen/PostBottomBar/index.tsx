import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {
  TouchableWithoutFeedback,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {isIphoneX, getBottomSpace} from 'react-native-iphone-x-helper';

const PostBottomBarContainerView = Styled.View`
width: 100%;
height: auto;
`

const PostBottomBar = () => {
    return (
        <PostBottomBarContainerView>
            <PostBottomBarSearchContainerView>
                <SearchTextInput/>
            </PostBottomBarSearchContainerView>
            <PostBottomBarSocialContainerView>
                <SocialContentView>
                </SocialContentView>
                <SocialContentView>
                </SocialContentView>
            </PostBottomBarSocailContainerView>
        </PostBottomBarContainerView>
    )

}

export default PostBottomBar