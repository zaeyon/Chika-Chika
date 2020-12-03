import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, FlatList} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {isIphoneX, getBottomSpace} from 'react-native-iphone-x-helper';

import PostItem from '~/Components/Presentational/PostItem'

const PostContent = () => {
    return(
        <></>
    )
}

export default PostContent