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
 align-items: center;
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
height: ${wp('13.8%')}px;
padding: 0px 16px 0px 16px;
 align-items: center;
 justify-content: center;
 flex-direction: row;
`;

const HeaderBackIcon = Styled.Image`
width: ${wp('6.4%')};
height: ${wp('6.4%')};
`;

const HeaderTitleText = Styled.Text`
font-size: 18px;
color: #000000;
font-weight: bold
`;

const HeaderRightContainer = Styled.View`
height: ${wp('13.8%')}px;
padding: 0px 16px 0px 16px;
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

const TreatListContainer = Styled.View`
padding-top: 7px;
`;

const TreatItemContainer = Styled.View`
width: ${wp('100%')};
padding-top: 12px;
padding-left: 16px;
padding-right: 16px;
padding-bottom: 12px;
flex-direction: row;
align-items: center;
justify-content: space-between;
`;

const SelectedTreatContainer = Styled.View`
padding-top: 16px;
padding-bottom: 8px;
padding-left: 16px;
padding-right: 16px;
flex-direction: row;
flex-wrap: wrap;
`;

const DividerContainer = Styled.View`
width: ${wp('100%')};
height: ${wp('4.26%')};
background-color: #f6f7f8
`;

const TreatItemNameText = Styled.Text`
font-weight: 300;
font-size: 16px;
`;

const TreatItemAddContainer = Styled.View`
padding: 10px 0px 10px 10px;
`;

const TreatItemAddText = Styled.Text`
color: #0075FF;
font-weight: 300;
font-size: 16px;
`;

const SelectedTreatItemBackground = Styled.View`
margin-bottom: 8px;
padding-left: 14px;
padding-right: 14px;
padding-top: 0px;
padding-bottom: 0px;
background-color: #F0F6FC;
border-radius: 100px;
flex-direction: row;
align-items: center;
`;

const SelectedTreatItemText = Styled.Text`
color: #0075FF;
font-weight: 300;
font-size: 16px;
`;

const TreatItemDeleteIcon = Styled.Image`
margin-left: 7px;
width: ${wp('4.8%')};
height: ${wp('4.8%')};
`;

const DeleteContainer = Styled.View`
padding-top: 7px;
padding-bottom: 7px; 
`;

const TEST_TREAT_DATA = [
    {
        name: "임플란트"
    },
    {
        name: "치아부식"
    },
    {
        name: "충치"
    }
]


interface Props {
    navigation: any,
    route: any,
}

const TreatSearchScreen = ({navigation, route}: Props) => {

    const [selectedTreatList, setSelectedTreatList] = useState<Array<Object>>([])
    const [onChangeSelectedTreatList, setOnChangeSelectedTreatList] = useState<boolean>(false);

    useEffect(() => {
        if(route.params?.selectedTreatList) {
            setSelectedTreatList(route.params?.selectedTreatList);
        }
        
    }, [route.params?.selectedTreatList])

    const selectTreatItem = (treat: object) => {
        var tmpSelectedTreatList = selectedTreatList
        tmpSelectedTreatList.push(treat)
        setSelectedTreatList(tmpSelectedTreatList)
        setOnChangeSelectedTreatList(!onChangeSelectedTreatList)
    }

    const deleteTreatItem = (treat: object) => {

        var tmpSelectedTreatList = selectedTreatList
        var deleteIndex = tmpSelectedTreatList.indexOf(treat)
        
        tmpSelectedTreatList.splice(deleteIndex, 1)
        setSelectedTreatList(tmpSelectedTreatList);
        setOnChangeSelectedTreatList(!onChangeSelectedTreatList)
    }
    
    const onPressFinishButton = () => {
        if(route.params?.requestPage === "metadata") {
            navigation.navigate("DetailPriceScreen", {
                selectedTreatList: selectedTreatList,
                dentalClinic: route.params?.dentalClinic,
                treatDate: route.params?.treatDate,
                treatPrice: route.params?.treatPrice,
            });
        } else if(route.params?.requestPage === "content") {
            navigation.navigate("ReviewContentScreen", {
                selectedTreatList: selectedTreatList,
            })
        }
    }

    const goBack = () => {
        navigation.goBack();
    }

    const renderTreatItem = ({item, index}: any) => {
        return (
            <TreatItemContainer>
                <TreatItemNameText>{"# " + item.name}</TreatItemNameText>
                <TouchableWithoutFeedback onPress={() => selectTreatItem(item)}>
                <TreatItemAddContainer>
                    <TreatItemAddText>추가</TreatItemAddText>
                </TreatItemAddContainer>
                </TouchableWithoutFeedback>
            </TreatItemContainer>
        )
    }


    return (
        <Container>
            <HeaderBar>
               <TouchableWithoutFeedback onPress={() => goBack()}>
                <HeaderLeftContainer>
                    <HeaderBackIcon
                    source={require('~/Assets/Images/HeaderBar/ic_back.png')}/>
                </HeaderLeftContainer>
                </TouchableWithoutFeedback>
                <SearchInputContainer>
                    <SearchIcon
                    source={require('~/Assets/Images/HeaderBar/ic_search.png')}/>
                    <SearchTextInput
                    placeholder={"진료 및 치료 종류"}
                    placeholderTextColor={"#ABA5A5"}/>
                </SearchInputContainer>
                <HeaderRightContainer>
                    <HeaderSearchText>검색</HeaderSearchText>
                </HeaderRightContainer>
            </HeaderBar>
            <BodyContainer>
                <SelectedTreatContainer>
                    {selectedTreatList.map((item, index) => {
                        return (
                            <SelectedTreatItemBackground style={{marginRight: 8}}>
                                <SelectedTreatItemText>
                                    {"# " + item.name}
                                </SelectedTreatItemText>
                                <TouchableWithoutFeedback onPress={() => deleteTreatItem(item)}>
                                <DeleteContainer>
                                <TreatItemDeleteIcon
                                source={require('~/Assets/Images/Upload/ic_delete.png')}/>
                                </DeleteContainer>
                                </TouchableWithoutFeedback>
                            </SelectedTreatItemBackground>
                        )
                    })}
                </SelectedTreatContainer>
                <DividerContainer/>
                <TreatListContainer>
                    <FlatList
                    data={TEST_TREAT_DATA}
                    renderItem={renderTreatItem}/>
                </TreatListContainer>
            </BodyContainer>
            <FooterContainer>
            <TouchableWithoutFeedback onPress={() => onPressFinishButton()}>
            <FinishButton>
                <FinishText>확인</FinishText>
            </FinishButton>
            </TouchableWithoutFeedback>
            </FooterContainer>
        </Container>
    )
}

export default TreatSearchScreen

/*
<FlatList
showsHorizontalScrollIndicator={false}
horizontal={true}
data={selectedTreatList}
renderItem={renderSelectedItem}/>
*/

