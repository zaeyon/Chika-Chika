import React, {useEffect, useState, useRef} from 'react';
import Styled from 'styled-components/native';
import {
    TouchableWithoutFeedback,
    FlatList
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {isIphoneX} from 'react-native-iphone-x-helper'

// Local Component
import DentalListItem from '~/Components/Presentational/DentalListItem'

const Container = Styled.SafeAreaView`
flex: 1;
background-color: #ffffff;
`;

const HeaderBar = Styled.View`
 width: ${wp('100%')}px;
 height: ${wp('11.7%')}px;
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
 background-color:#ffffff;
 padding-left: 16px;
 padding-right: 16px;
`;

const HeaderLeftContainer = Styled.View`
padding: 7px 15px 13px 16px;
align-items: center;
justify-content: center;
`;

const HeaderBackIcon = Styled.Image`
 width: ${wp('6.4%')}px;
 height: ${wp('6.4%')}px;
`;

const HeaderTitleText = Styled.Text`
font-weight: 600;
font-size: 18px;
color: #1D1E1F;
`;

const HeaderRightContainer = Styled.View`
padding: 7px 16px 13px 15px;
 align-items: center;
 justify-content: center;
 flex-direction: row;
`;

const HeaderFilterIcon = Styled.Image`
width: ${wp('6.4%')};
height: ${wp('6.4%')};
`;

const HeaderEmptyContainer = Styled.View`
 width: ${wp('6.4%')}px;
 height: ${wp('6.4%')}px;
`;

const BodyContainer = Styled.View`
 flex: 1;
 background-color: #ffffff;
`;

const LoadingContainer = Styled.View`
width: ${wp('100%')};
height: ${hp('100%')};
position: absolute;
top: ${wp('11.7%')};
align-items: center;
justify-content: center;
`;

const SearchInputContainer = Styled.View`
width: 307px;
height: 35px;
background-color: #ededed;
justify-content: center;
padding-left: 20px;
`;

const SearchTextInput = Styled.TextInput`

`;



const TEST_DENTAL_LIST = [
    {
        name: "연세자연치과의원",
        address: "종로구 세종대로"
    },
    {
        name: "연세정인치과의원",
        address: "종로구 세문안로",
    },
    {
        name: "더스퀘워치과의원",
        address: "종로구 종로"
    },
    {
        name: "연세자연치과의원",
        address: "종로구 세종대로"
    },
    {
        name: "연세정인치과의원",
        address: "종로구 세문안로",
    },
    {
        name: "더스퀘워치과의원",
        address: "종로구 종로"
    }
]

interface Props {
    navigation: any,
    route: any,
}

const DentalClinicListScreen = ({navigation, route}: Props) => {
    const [dentalList, setDentalList] = useState<Array<object>>(TEST_DENTAL_LIST);
  
    const goBack = () => {
        navigation.goBack();
    }

    const renderDentalItem = ({item, index}) => {
        return (
            <DentalListItem
            name={item.name}
            address={item.address}/>
        )
    }

    return (
        <Container>
            <HeaderBar>
                <SearchInputContainer>
                    <SearchTextInput
                    editable={true}
                    placeholder={"병원, 지역검색"}/>
                </SearchInputContainer>
                <HeaderFilterIcon
                    source={require('~/Assets/Images/HeaderBar/ic_filter.png')}/>
            </HeaderBar>
            <BodyContainer>
                <FlatList
                showsVerticalScrollIndicator={false}
                data={dentalList}
                renderItem={renderDentalItem}/>
            </BodyContainer>
        </Container>
    )
}

export default DentalClinicListScreen;