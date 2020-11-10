import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, FlatList} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { NavigationContainer } from '@react-navigation/native';

const Container = Styled.SafeAreaView`
 flex: 1;
 background-color: #FFFFFF;
`;

const HeaderBar = Styled.View`
 width: ${wp('100%')}px;
 height: ${wp('13.8%')}px;
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
 background-color:#ffffff;
 border-bottom-width: 0.6px;
 border-color: #ECECEE;
`;


const HeaderLeftContainer = Styled.View`
padding: 14px 0px 13px 15px;
 align-items: center;
 justify-content: center;
 flex-direction: row;
`;

const HeaderCancelIcon = Styled.Image`
width: ${wp('6.4%')};
height: ${wp('6.4%')};
`;

const HeaderTitleText = Styled.Text`
font-size: 18px;
color: #000000;
font-weight: bold
`;

const HeaderRightContainer = Styled.View`
padding: 14px 16px 13px 16px;
 align-items: center;
 justify-content: center;
 flex-direction: row;
`;

const HeaderSearchText = Styled.Text`
font-weight: 300;
font-size: 16px;
color: #000000;
`;

const HeaderEmptyContainer = Styled.View`
width: ${wp('6.4%')};
height: ${wp('6.4%')};
`;

const BodyContainer = Styled.View`
align-items: center;
padding-top: 10px;
`;

const TakePhotoText = Styled.Text`
`;

const GalleryText = Styled.Text`
margin-top: 30px;
`;

const MetaDataItemContainer = Styled.View`
width: ${wp('91.46%')};
height: ${wp('12.799%')};
background-color: #F0F6FC;
border-radius: 8px;
justify-content: center;
padding-left: 12px;
padding-right: 12px;
`;

const MetaDataText = Styled.Text`
font-weight: 300
font-size: 16px;
color: #0075FF
`;

const FooterContainer = Styled.View`
position: absolute;
bottom: 53px;

`;

const FinishButton = Styled.View`
width: ${wp('91.46%')};
height: ${wp('12.799%')};
border-radius: 8px;
background-color: #0075FF;
align-items: center;
justify-content: center;
`;

const FinishText = Styled.Text`
font-weight: bold;
font-size: 16px;
color: #ffffff;
`;

const SearchInputContainer = Styled.View`
width: ${wp('71.73%')};
height: ${wp('10.666%')};
border-radius: 8px;
background-color: #F6F7F8;
flex-direction: row;
align-items: center;
padding-left: 12px;
`;

const SearchIcon = Styled.Image`
width: ${wp('4.2%')};
height: ${wp('4.2%')};
`;

const SearchTextInput = Styled.TextInput`
margin-left: 8px;
width: ${wp('65%')};
font-weight: 300;
font-size: 16px;
`;

const DentalClinicListContainer = Styled.View`
`;

const DentalClinicItemContainer = Styled.View`
width: ${wp('100%')}
padding-left: 20px;
padding-top: 13px;
padding-right: 13px;
padding-bottom: 20px;
`;

const DentalClinicNameText = Styled.Text`
font-weight: 300;
font-size: 16px;
color: #000000;
`;

const DentalClinicAddressText = Styled.Text`
font-weight: 300;
font-size: 13px;
color: #9a9a9a;
`;


const DENTALCLINIC_TEST_DATA = [
    {
        name: "연세 좋은 이웃 치과의원",
        address: "서울특별시 동대문구 왕산로 193 193 4층 (청량리동)"
    },
    {
        name: "재미있는 치과의원",
        address: "서울특별시 중구 을지로 3가 홍원빌딩"
    },
    {
        name: "아름다운 치과의원",
        address: "서울특별시 동대문구 왕산로 193 193 5층 (청량리동)"
    }
]

interface Props {
    navigation: any,
    route: any,
}

const DentalClinicSearchScreen = ({navigation, route}: Props) => {
    
    const goBack = () => {
        navigation.goBack();
    }

    const onPressDentalClinicItem = (name: string, address: string) => {
        navigation.navigate("ReviewMetaDataScreen",{
            dentalClinicName: name,
            dentalClinicAddress: address,
        })

    }

    const renderDentalClinicItem = ({item, index}: any) => {
        return (
            <TouchableWithoutFeedback onPress={() => onPressDentalClinicItem(item.name, item.address)}>
            <DentalClinicItemContainer>
                <DentalClinicNameText>{item.name}</DentalClinicNameText>
                <DentalClinicAddressText>{item.address}</DentalClinicAddressText>
            </DentalClinicItemContainer>
            </TouchableWithoutFeedback>
        )
    }

    return (
        <Container>
            <HeaderBar>
               <TouchableWithoutFeedback onPress={() => goBack()}>
                <HeaderLeftContainer>
                    <HeaderCancelIcon
                    source={require('~/Assets/Images/HeaderBar/ic_X.png')}/>
                </HeaderLeftContainer>
                </TouchableWithoutFeedback>
                <SearchInputContainer>
                    <SearchIcon
                    source={require('~/Assets/Images/HeaderBar/ic_search.png')}/>
                    <SearchTextInput
                    placeholder={"병원 검색"}
                    placeholderTextColor={"#ABA5A5"}/>

                </SearchInputContainer>

                <HeaderRightContainer>
                    <HeaderSearchText>검색</HeaderSearchText>
                </HeaderRightContainer>
            </HeaderBar>
            <BodyContainer>
                <DentalClinicListContainer>
                    <FlatList
                    data={DENTALCLINIC_TEST_DATA}
                    renderItem={renderDentalClinicItem}/>
                </DentalClinicListContainer>
            </BodyContainer>
        </Container>
    )
}

export default DentalClinicSearchScreen


