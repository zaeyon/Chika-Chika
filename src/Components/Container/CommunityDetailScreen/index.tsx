import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, FlatList} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {isIphoneX, getBottomSpace} from 'react-native-iphone-x-helper';
// Local Component
import PostInformation from '~/Components/Presentational/PostDetailScreen/PostInformation'
import PostItem from '~/Components/Presentational/PostItem'
import PostCommentList from '~/Components/Presentational/PostDetailScreen/PostCommentList'
const ContainerView = Styled.SafeAreaView`
 flex: 1;
 background-color: white;
 padding-bottom: ${hp('5.5%')};
`;

const BodyContainerView = Styled.ScrollView`
flex: 1;

`;

interface Props {
    navigation: any,
    route: any,
    key: any
    data: any,
}

const CommunityDetailScreen = ({navigation, route}: Props) => {

    const data = route.params.data
   

    return (
        <ContainerView>
            <BodyContainerView>
                <PostInformation
                    navigation={navigation}
                />
            
                <PostItem key={'CommunityDetailScreen'} mode={'Detail'} navigation={navigation} data={data}/>
                <PostCommentList commentList={data.comments}/>
            </BodyContainerView>
        </ContainerView>
    )
}

export default CommunityDetailScreen;


