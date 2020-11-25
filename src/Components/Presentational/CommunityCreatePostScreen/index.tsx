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


const ContainerView = Styled.View`
 flex: 1;
 background-color: white;

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
width: 30%;
height: ${wp('13.8%')}px;
padding: 0px 16px 0px 16px;
 align-items: center;
 flex-direction: row;
`;

const HeaderBackIcon = Styled.Image`
width: ${wp('6.4%')};
height: ${wp('6.4%')};
`;

const HeaderTitleText = Styled.Text`
margin-top: 5px;
font-weight: bold;
font-size: 18px; 
`;

const HeaderRightContainer = Styled.View`
width: 30%;
height: ${wp('13.8%')}px;
padding: 0px 16px 0px 16px;
 align-items: center;
 justify-content: flex-end;
 flex-direction: row;
`;

const HeaderEmptyContainer = Styled.View`
width: ${wp('6.4%')};
height: ${wp('6.4%')};
`;


const BodyContainerView = Styled.ScrollView`
flex: 1;
`;

const CategoryContainerView = Styled.View`
width: 100%;
height: auto;
background-color: red
`
const CategoryContentText = Styled.Text`
font-size: 20px;
line-height: 23px;
`

const TreatSearchView = Styled.View`
`
const TreatSearchText = Styled.Text`
font-size: 20px;
line-height: 23px;
`
const TreatFlatList = Styled(FlatList as new () => FlatList)`
width: 100%;
height: 50px;
background-color: yellow;
`
const TreatItemView = Styled.View`
margin: 0px; 5px;
width: 100px;
`

const TreatItemText = Styled.Text`

`
const ParagraphContentView = Styled.View`
width: 100%;
height: auto;
background-color: grey;
`
const ParagraphTextInput = Styled.TextInput`
width: 100%;
height: auto;
min-height: 160px;
background-color: green;
font-size: 20px;
line-height: 23px;
padding: 10px;
`

const CheckBoxFlatList = Styled(FlatList as new () => FlatList)`
width: 100%;
height: auto;
`
const CheckBoxItemView = Styled.View`
width: 100%;
height: auto;
flex-direction: row
`
const CheckBoxImage = Styled.Image`
width: 30px;
height: 30px;
align-items: center;
justify-content: center;
`
const CheckBoxItemText = Styled.Text`
font-size: 20px
`

const GallerySearchView = Styled.View``
const GallerySerachText = Styled.Text``
const GalleryFlatList = Styled(FlatList as new () => FlatList)`
width: 100%;
height: 200px;
background-color: grey;
`
const GalleryImage = Styled.Image`
width: 200px;
height: 200px;
border-radius: 10px;
`

interface Props {
    navigation: any,
    route: any,
    selectedTreatList: any,
    selectedImages: any,
}


const CommunityCreatePostScreen = ({navigation, route, selectedTreatList, selectedImages}: Props) => {
    const [tagList, setTagList] = useState([]);
    const [imageList, setImageList] = useState([]);
    const [category, setCategory] = useState('');
    const [paragraph, setParagraph] = useState('');
    const [selectedBoxList, setSelectedBoxList] = useState([]);

    useEffect(() => {
        setTagList(selectedTreatList)
    }, [selectedTreatList])

    useEffect(() => {
        setImageList(imageList.concat(selectedImages || []))
    }, [selectedImages])

    const onPressAddTreat = () => {
        navigation.navigate("CommunityTreatSearchScreen", {
            requestPage: "CommunityPostUploadScreen",
          
        })
    }
    const onPressAddImage = () => {
        navigation.navigate("CommunityGallery", {
            requestType: "CommunityPostUploadScreen"
        })
    }
    return (
        <ContainerView>
            <HeaderBar>
               <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                <HeaderLeftContainer>
                    <HeaderBackIcon
                    source={require('~/Assets/Images/HeaderBar/ic_back.png')}/>
                </HeaderLeftContainer>
                </TouchableWithoutFeedback>
                <HeaderTitleText>작성</HeaderTitleText>
                <HeaderRightContainer>
                <HeaderTitleText>올리기</HeaderTitleText>
                </HeaderRightContainer>
            </HeaderBar>
            <BodyContainerView>
            <CategoryContainerView>
            <CategoryContentText>
                    전체
                </CategoryContentText>
                <CategoryContentText>
                    질문
                </CategoryContentText>
                <CategoryContentText>
                    자유수다
                </CategoryContentText>
                <CategoryContentText>
                    FAQ
                </CategoryContentText>
            </CategoryContainerView>
            <TouchableOpacity
            onPress={() => {
                onPressAddTreat();
            }}>
            <TreatSearchView>
                <TreatSearchText>
                    태그 추가
                </TreatSearchText>
            </TreatSearchView>
            </TouchableOpacity>
            <TreatFlatList
            data={tagList}
            horizontal
            renderItem={({item, index}) => (
                <TreatItemView>
                    <TreatItemText>
                        {item.name}
                    </TreatItemText>
                    
                </TreatItemView>
            )}/>
            
            <ParagraphContentView>
            <ParagraphTextInput
            placeholder={'글쓰기'}
            multiline
            scrollEnabled={false}
            value={paragraph}
            onChangeText={(text) => {
                setParagraph(text)
            }}
            >
            
            </ParagraphTextInput>
            </ParagraphContentView>
            <CheckBoxFlatList
            data={[{title: '의사한테 도움받고 싶어요.'}, {title: '가낟라마바사'}, {title: '아자차카타파하'}]}
            renderItem={({item, index}) => (
                <CheckBoxItemView>
                    <TouchableOpacity
                    onPress={() => {
                        console.log(index)
                        console.log(selectedBoxList)
                        if (selectedBoxList.includes(item.title)){
                            const idx = selectedBoxList.indexOf(item.title); 
                            const newSelectedBoxList = selectedBoxList.filter(title => title !== item.title);
                            setSelectedBoxList(newSelectedBoxList)
                        }
                        else {
                            console.log('hi'+selectedBoxList.concat([item.title]))
                            setSelectedBoxList(selectedBoxList.concat([item.title]))
                        }
                    }}>
                        <CheckBoxImage
                        style={{
                            backgroundColor: selectedBoxList.includes(item.title) ? 'red' : 'grey'
                        }}/>
                    </TouchableOpacity>
                    <CheckBoxItemText>
                        {item.title}
                    </CheckBoxItemText>
                </CheckBoxItemView>
            )}
            />
            <TouchableOpacity
            onPress={() => {
                onPressAddImage();
            }}>
            <GallerySearchView>
                <GallerySerachText>
                    사진 추가
                </GallerySerachText>
            </GallerySearchView>
            </TouchableOpacity>
            <GalleryFlatList
            data={imageList}
            horizontal
            indicatorStyle='white'
            renderItem={({item, index}) => (
                <GalleryImage source={{uri: item.uri}}/>
            )}
            />
            </BodyContainerView>
        </ContainerView>
    )
}

export default CommunityCreatePostScreen
