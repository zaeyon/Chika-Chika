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
import HomeTabScreen from './HomeTabScreen';
import QuestionTabScreen from './QuestionTabScreen';
import GeneralTabScreen from './GeneralTabScreen';
import FAQTabScreen from './FAQTabScreen';


const ContainerView = Styled.SafeAreaView`
 flex: 1;
 background-color: white;
`;

const HeaderConatinerView = Styled.View`
width: ${wp('100%')}px;
height: 40;
padding-left: 16px;
margin-top: 40px;
`
const HeaderContentText = Styled.Text`
display: flex;
font-style: normal;
font-weight: bold;
font-size: 18px;
line-height: 40px;

`
const BodyContainerView = Styled.View`
flex: 1;
`;

interface Props {
    navigation: any,
    route: any,
}


const CommunityListScreen = ({navigation, route}: Props) => {

    const CommunityTab = createMaterialTopTabNavigator();

    return (
        <ContainerView>
            <HeaderConatinerView>
                <HeaderContentText>
                    수다방
                </HeaderContentText>
            </HeaderConatinerView>
            <BodyContainerView>
                <CommunityTab.Navigator
                    style={{
                        flex: 1,
                    }}
                    tabBarOptions={{
                        style: {
                        },
                        labelStyle: {fontSize: 18, lineHeight: 24, color: "black"},
                        tabStyle: {},
                        indicatorStyle: {backgroundColor: "#000000", height: 2.5}
                    }}>
                        <CommunityTab.Screen name="전체" component={HomeTabScreen}/>
                        <CommunityTab.Screen name="질문" component={QuestionTabScreen}/>
                        <CommunityTab.Screen name="자유수다" component={GeneralTabScreen}/>
                        <CommunityTab.Screen name="FAQ" component={FAQTabScreen}/>
                </CommunityTab.Navigator>
                <TouchableOpacity 
                activeOpacity={0.5}
                onPress={() => {
                    navigation.navigate("CommunityPostUploadStackScreen")
                }}>
                    <View style={{position: 'absolute', right: wp('50%') - 45, bottom: hp('5.6%') + 23, backgroundColor: '#C4C4C4', borderRadius: 100, width: 90, height: 34, padding: 9, justifyContent: 'center', alignItems: 'center'}}>
                        <Text>글 작성하기</Text>
                    </View>
                </TouchableOpacity>
            </BodyContainerView>
        </ContainerView>
    )
}

export default CommunityListScreen;


