import React, {useState, useEffect, useRef} from 'react';
import Styled from 'styled-components/native';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  View,
  Animated,
  LayoutAnimation,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {isIphoneX, getBottomSpace} from 'react-native-iphone-x-helper';

// Local Component
import ImageContentView from '~/Components/Presentational/CommunityCreatePostScreen/ImageContentView';
import HashTagSearchBarView from '~/Components/Presentational/CommunityCreatePostScreen/HashTagSearchBarView';
const ContainerView = Styled.View`
 flex: 1;
 background-color: white;

`;
const HeaderBar = Styled.View`
 width: ${wp('100%')}px;
 height: ${hp('7.13')}px;
 margin-top: 7px;
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
 background-color: white;
 border-bottom-width: 0.6px;
 border-color: #ECECEE;
`;

const HeaderLeftContainer = Styled.View`
width: 30%;
height: ${wp('13.8%')}px;
padding: 0px 16px;
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

const HeaderText = Styled.Text`
margin-top: 5px;
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

const BodyContainerView = Styled.View`
width: 100%;
flex: 1;
`;

const CategoryContainerView = Styled.View`
width: 100%;
margin: 4px 16px 0px 16px;
height: ${hp('7.13')}px;
flex-direction: row;
align-items: center;
border-bottom-width: 1px;
border-color: #F2F2F2;
`;

const CategoryTitleText = Styled.Text`
font-size: 16px;
line-height: 24px;
margin-right:16px;
`;

const CategoryContentView = Styled.View`
flex: 1;
flex-direction: row;
`;
const CategoryContentText = Styled.Text`
font-size: 14px;
line-height: 24px;
`;

const PopupAdviceView = Styled.View`
margin: 8px 16px 0px 16px;
padding: 12px;
background: #F7F7F7;
border-radius: 8px;
`;

const PopupAdviceText = Styled.Text`
font-size: 14px;
line-height: 24px;`;

const TreatSearchView = Styled.View`
`;
const TreatSearchText = Styled.Text`
font-size: 20px;
line-height: 23px;
`;
const TreatFlatList = Styled(FlatList as new () => FlatList)`
width: 100%;
height: 50px;
background-color: yellow;
`;
const TreatItemView = Styled.View`
margin: 0px; 5px;
width: 100px;
`;

const TreatItemText = Styled.Text`

`;
const ParagraphContentView = Styled.View`
flex: 1;
background-color: grey;
margin-top: 16px;
max-height: ${hp('44%')}px;
`;
const ParagraphTextInput = Styled.TextInput`
width: 100%;
padding: 0px 16px;
font-size: 16px;
line-height: 28px;

`;

const FooterContainerView = Styled.View`
width: ${wp('100%')}px;
height: 56px;

`;
const CheckBoxFlatList = Styled(FlatList as new () => FlatList)`
position: absolute;
bottom: 0px;
width: 100%;
height: auto;
padding: 0px 16px;
border-top-width: 1px;
border-color: #C8C8C8;
`;
const CheckBoxItemView = Styled.View`
width: 100%;
height: auto;
flex-direction: row
`;
const CheckBoxImage = Styled.Image`
width: 24px;
height: 24px;
align-items: center;
justify-content: center;
margin-right: 8px;
border: 1px solid #C4C4C4;
border-radius: 4px;
`;
const CheckBoxItemText = Styled.Text`
font-size: 16px;
line-height: 24px;
`;

const GalleryContainerView = Styled.View`
margin-top: auto;
width: 100%;
height: auto;
padding: 9px 0px 9px 16px;
flex-direction: row;
align-items: flex-end;
margin-bottom: 24px;

`;

const GalleryUploadTouchableOpacity = Styled(
  TouchableOpacity as new () => TouchableOpacity,
)`
width: ${wp('15%')}px;
height: ${wp('15%')}px;
justify-content: center;
align-items: center;
margin-right: 20px;
border: 1px solid #C4C4C4;
border-radius: 4px;
`;

const GalleryStatusImage = Styled.Image`
width: 20px;
height: 20px;
`;

const GalleryStatusText = Styled.Text``;

const GalleryFlatList = Styled(FlatList as new () => FlatList)`
flex: 1;
`;

const GalleryContentView = Styled.View`
width: ${wp('16.8%')}px;
height: ${wp('16.8%')}px;
border-radius: 10px;
justify-content: flex-end;
margin: 0px 4px;
`;

const DeleteImage = Styled.Image`
width: 16px;
height: 16px;
`;

const GalleryContentImage = Styled.Image`
width: ${wp('15%')}px;
height: ${wp('15%')}px;

border-radius: 10px;

`;

interface Props {
  navigation: any;
  route: any;
  selectedTreatList: any;
  selectedImages: any;
  setSearchQuery: any;
  setSearchCategory: any;
}

const CommunityCreatePostScreen = ({
  navigation,
  route,
  selectedTreatList,
  selectedImages,
  setSearchQuery,
  setSearchCategory,
}: Props) => {
  const [tagList, setTagList] = useState<string[]>([]);
  const [categoryList, setCategoryList] = useState<string[]>([
    '전체',
    '질문',
    '자유',
  ]);
  const [imageRenderList, setImageRenderList] = useState<string[]>([]);
  const [imageDataList, setImageDataList] = useState<string[]>([]);
  const [category, setCategory] = useState<string>('');
  const [paragraph, setParagraph] = useState<string>('');
  const [selectedBoxList, setSelectedBoxList] = useState<string[]>([]);
  const [isPopupShown, setIsPopupShown] = useState<boolean>(true);
  const categoryIndex = useRef(new Animated.Value(0)).current;
  const [textInputHeight, setTextInputHeight] = useState(hp('44%'));
  const [searchMode, setSearchMode] = useState('');
  const [startIndex, setStartIndex] = useState(0);
  const [formattedParagraph, setFormattedParagraph] = useState('');
  const [inputHeight, setInputHeight] = useState(20);
  const scrollView = useRef();
  useEffect(() => {
    setTagList(selectedTreatList);
  }, [selectedTreatList]);

  useEffect(() => {
    setSearchQuery('');
    if (searchMode !== '') {
      setStartIndex(paragraph.length);

      console.log(paragraph.length);
    }
    setSearchCategory(searchMode);
  }, [searchMode]);
  useEffect(() => {
    let newImages = selectedImages || [];
    let newImageList = imageDataList.concat(newImages.concat());
    setImageRenderList(newImageList);
    setImageDataList(newImageList);
    console.log(selectedImages);
  }, [selectedImages]);
  useEffect(() => {
    console.log('parargraph' + paragraph);
    console.log('formatted' + formattedParagraph);
  }, [paragraph, formattedParagraph]);
  const deleteImageByFilename = (filename: string) => {
    let newImageList = imageDataList
      .concat()
      .filter((image: any) => image.filename !== filename);
    console.log(newImageList);
    setImageDataList(newImageList);
  };
  const onPressAddTreat = () => {
    navigation.navigate('CommunityTreatSearchScreen', {
      requestPage: 'CommunityPostUploadScreen',
    });
  };
  const onPressAddImage = () => {
    navigation.navigate('CommunityGallery', {
      requestType: 'CommunityPostUploadScreen',
    });
  };

  const handleChangeText = (inputText) => {
    const retLines = inputText.split('\n');
    console.log(retLines);
    const formattedText = [];
    retLines.forEach((retLine) => {
      const words = retLine.split(' ');
      const contentLength = words.length;
      var format = /[ !#@$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\n]/;
      words.forEach((word, index) => {
        if (
          (word.startsWith('@') && !format.test(word.substr(1))) ||
          (word.startsWith('#') && !format.test(word.substr(1)))
        ) {
          const mention = (
            <Text
              key={index}
              style={{
                color: 'blue',
                fontSize: 16,
                lineHeight: 28,
              }}>
              {word}
            </Text>
          );
          if (index !== contentLength - 1) formattedText.push(mention, ' ');
          else formattedText.push(mention);
        } else {
          if (index !== contentLength - 1) return formattedText.push(word, ' ');
          else return formattedText.push(word);
        }
      });
    });

    setParagraph(inputText); // still update your raw text, this will probably go to your api
    setFormattedParagraph(formattedText);
  };
  const renderCategories = (categoryList: any) => {
    return categoryList.map((item: any, index: number) => {
      return (
        <TouchableOpacity
          key={'category' + index}
          onPress={() => {
            Animated.timing(categoryIndex, {
              toValue: index,
              duration: 100,
              useNativeDriver: false,
            }).start();
            console.log(index);
          }}
          style={{
            width: wp('16.53%'),
            height: 'auto',
            paddingVertical: '1.3%',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 100,
            zIndex: 1,
          }}>
          <CategoryContentText>{item}</CategoryContentText>
        </TouchableOpacity>
      );
    });
  };

  return (
    <ContainerView>
      <HeaderBar>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <HeaderLeftContainer>
            <HeaderBackIcon
              source={require('~/Assets/Images/HeaderBar/ic_back.png')}
            />
          </HeaderLeftContainer>
        </TouchableWithoutFeedback>
        <HeaderTitleText>글 작성</HeaderTitleText>
        <HeaderRightContainer>
          <HeaderText>올리기</HeaderText>
        </HeaderRightContainer>
      </HeaderBar>
      <BodyContainerView>
        <CategoryContainerView>
          <CategoryTitleText>카테고리</CategoryTitleText>
          <CategoryContentView>
            {renderCategories(categoryList)}
            <Animated.View
              style={{
                width: wp('16.53'),
                height: 'auto',
                paddingVertical: '1.3%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#C4C4C4',
                borderRadius: 100,
                position: 'absolute',
                transform: [
                  {
                    translateX: categoryIndex.interpolate({
                      inputRange: [0, categoryList.length - 1],
                      outputRange: [0, wp('16.53') * (categoryList.length - 1)],
                      extrapolate: 'clamp',
                    }),
                  },
                ],
              }}>
              <View
                style={{
                  height: 30,
                }}
              />
            </Animated.View>
          </CategoryContentView>
        </CategoryContainerView>
        {isPopupShown ? (
          <PopupAdviceView>
            <TouchableOpacity
              style={{
                flex: 1,
                position: 'absolute',
                zIndex: 1,
                right: 12,
                top: 12,
              }}
              onPress={() => {
                setIsPopupShown(false);
                setTextInputHeight(hp('53.8%'));
              }}>
              <DeleteImage
                source={require('~/Assets/Images/Picture/deleteButton.png')}
              />
            </TouchableOpacity>
            <PopupAdviceText>
              해시태그로 병원, 증상, 진료항목을 추가해보세요!
            </PopupAdviceText>
            <PopupAdviceText
              style={{
                color: '#0075FF',
              }}>
              #햇살365치과 #잇몸통증 #잇몸성형
            </PopupAdviceText>
          </PopupAdviceView>
        ) : null}
        <KeyboardAvoidingView
          behavior="padding"
          style={{
            width: '100%',
            height: isPopupShown ? hp('65.1%') : hp('75%'),
          }}>
          <ParagraphTextInput
            style={{
              marginBottom: hp('19.5%'),
              flex: 1,
            }}
            placeholderTextColor="#C4C4C4"
            placeholder="수다방에 올릴 게시물을 작성해주세요!"
            multiline
            scrollEnabled={true}
            onChangeText={(text) => {
              if (searchMode !== '') {
                setSearchQuery(text.slice(startIndex));
              }
            }}
            autoCorrect={false}></ParagraphTextInput>
        </KeyboardAvoidingView>
        <GalleryContainerView>
          <GalleryUploadTouchableOpacity
            onPress={() => {
              onPressAddImage();
            }}>
            <GalleryStatusImage
              source={require('~/Assets/Images/Picture/camera.png')}
            />
            <GalleryStatusText>{'1/5'}</GalleryStatusText>
          </GalleryUploadTouchableOpacity>
          <GalleryFlatList
            data={imageRenderList}
            horizontal
            indicatorStyle="white"
            keyExtractor={(item) => item.filename}
            renderItem={({item, index}) => (
              <ImageContentView
                item={item}
                index={index}
                deleteImageByFilename={deleteImageByFilename}
              />
            )}
          />
        </GalleryContainerView>
      </BodyContainerView>
      <FooterContainerView>
        <CheckBoxFlatList
          data={[{title: '의사에게 물어보기'}]}
          contentContainerStyle={{
            alignItems: 'flex-end',
            paddingVertical: 16,
          }}
          renderItem={({item, index}) => (
            <CheckBoxItemView>
              <TouchableOpacity
                onPress={() => {
                  console.log(index);
                  console.log(selectedBoxList);
                  if (selectedBoxList.includes(item.title)) {
                    const idx = selectedBoxList.indexOf(item.title);
                    const newSelectedBoxList = selectedBoxList.filter(
                      (title) => title !== item.title,
                    );
                    setSelectedBoxList(newSelectedBoxList);
                  } else {
                    console.log('hi' + selectedBoxList.concat([item.title]));
                    setSelectedBoxList(selectedBoxList.concat([item.title]));
                  }
                }}>
                <CheckBoxImage
                  style={{
                    backgroundColor: selectedBoxList.includes(item.title)
                      ? 'red'
                      : 'white',
                  }}
                />
              </TouchableOpacity>
              <CheckBoxItemText>{item.title}</CheckBoxItemText>
            </CheckBoxItemView>
          )}
        />
      </FooterContainerView>
      <HashTagSearchBarView setSearchMode={setSearchMode} />
    </ContainerView>
  );
};

export default CommunityCreatePostScreen;
