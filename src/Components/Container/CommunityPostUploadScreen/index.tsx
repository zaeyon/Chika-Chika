import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, TouchableOpacity, FlatList, View, Text} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {isIphoneX, getBottomSpace} from 'react-native-iphone-x-helper';
// Local Component
import CommunityCreatePostScreen from '~/Components/Presentational/CommunityCreatePostScreen'


const ContainerView = Styled.SafeAreaView`
 flex: 1;
 background-color: white;
`;

const BodyContainerView = Styled.View`
flex: 1;
`;

interface Props {
    navigation: any,
    route: any,
}
const CommunityPostUploadScreen = ({navigation, route}: Props) => {
    return (
        <ContainerView>
            <CommunityCreatePostScreen navigation={navigation} selectedTreatList={route.params?.selectedTreatList} selectedImages={route.params?.selectedImages}/>
        </ContainerView>
    )
}

export default CommunityPostUploadScreen
