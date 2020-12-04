import React, {useState, useEffect, useRef} from 'react';
import Styled from 'styled-components/native';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  View,
  Animated,
  KeyboardAvoidingView,
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
import NavigationHeader from '~/Components/Presentational/NavigationHeader';

const ContainerView = Styled.View`
 flex: 1;
 background-color: white;

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

const BodyContainerView = Styled.View`
width: 100%;
flex: 1;
`;

const CategoryContainerView = Styled.View`
width: ${wp('100%') - 32}px;
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

const ParagraphTextInput = Styled.TextInput`
width: 100%;
padding: 0px 16px;
margin-top: 16px;
font-size: 16px;
line-height: 28px;
`;

const FooterContainerView = Styled.View`
width: ${wp('100%')}px;
height: ${hp('10.59%') - getBottomSpace()}px;
justify-content: flex-end;
padding: 16px 16px;
border-top-width: 1px;
border-color: #C8C8C8;
`;
const CheckBoxItemView = Styled.View`
margin-left: auto;
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
width: 100%;
height: ${hp('11.82%')}px;
flex-direction: row;
align-items: flex-end;
padding-left: 16px;
padding-bottom: 24px;
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

const GalleryStatusText = Styled.Text`
font-size: 12px;
line-height: 16px;
margin-top: 3px;
color: #C4C4C4;
`;

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
  searchQuery: any;
  setSearchQuery: any;
  setSearchCategory: any;
  suggestionList: any;
}

const CommunityCreatePostScreen = ({
  navigation,
  route,
  selectedTreatList,
  selectedImages,
  searchQuery,
  setSearchQuery,
  setSearchCategory,
  suggestionList,
}: Props) => {
  const [tagList, setTagList] = useState<string[]>([]);
  const [categoryList, setCategoryList] = useState<string[]>([
    '전체',
    '질문',
    '자유',
  ]);
  const [imageRenderList, setImageRenderList] = useState<string[]>([]);
  const [imageDataList, setImageDataList] = useState<string[]>([]);
  const [paragraph, setParagraph] = useState<string>('');
  const [selectedBoxList, setSelectedBoxList] = useState<string[]>([]);
  const [isPopupShown, setIsPopupShown] = useState<boolean>(true);
  const categoryIndex = useRef(new Animated.Value(0)).current;
  const [textInputHeight, setTextInputHeight] = useState(hp('44%'));
  const [searchMode, setSearchMode] = useState('');
  const [startIndex, setStartIndex] = useState(0); //index of #
  const [endIndex, setEndIndex] = useState(0); //index of tag's last word + 1 (' ')
  const [cursorIndex, setCursorIndex] = useState(0);
  const [toggleCreateHashTag, setToggleCreateHashTag] = useState(false);
  const textInput = useRef();

  useEffect(() => {
    setTagList(selectedTreatList);
  }, [selectedTreatList]);

  useEffect(() => {
    console.log('fd');
    setSearchQuery('');
    if (searchMode !== '') {
      setToggleCreateHashTag(true);
      console.log('cursor', cursorIndex);
      setStartIndex(cursorIndex + 1);
      setEndIndex(cursorIndex + 2);
      if (cursorIndex === 0) {
        console.log('first');
        setParagraph(
          paragraph.slice(0, cursorIndex) + '#' + paragraph.slice(cursorIndex),
        );
      } else {
        setParagraph(
          paragraph.slice(0, cursorIndex) + '# ' + paragraph.slice(cursorIndex),
        );
        console.log('bpb', cursorIndex);
        textInput.current.setNativeProps({
          selection: {
            start: cursorIndex - 1,
            end: cursorIndex - 1,
          },
        });
        setCursorIndex(cursorIndex + 1);
      }
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

  const completeCurrentHashTag = (selectedHashTag: any) => {
    console.log(paragraph.slice(0, startIndex));
    console.log(paragraph.slice(endIndex, paragraph.length));
    setParagraph(
      paragraph.slice(0, startIndex) +
        selectedHashTag +
        ' ' +
        paragraph.slice(endIndex, paragraph.length),
    );

    textInput.current.setNativeProps({
      selection: {
        start: endIndex,
        end: endIndex,
      },
    });
    setSearchMode('');
    setSearchQuery('');
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
      <NavigationHeader
        renderHeaderLeftContainer={() => {
          return (
            <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
              <HeaderText>취소</HeaderText>
            </TouchableWithoutFeedback>
          );
        }}
        renderHeaderRightContanier={() => {
          return (
            <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
              <HeaderText>완료</HeaderText>
            </TouchableWithoutFeedback>
          );
        }}
        headerTitle="글쓰기"
      />

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
            height:
              (isPopupShown ? hp('65.1%') : hp('75%')) +
              suggestionList.length * hp('7.39%'),
          }}>
          <ParagraphTextInput
            ref={textInput}
            style={{
              marginBottom: hp('19.5%') + suggestionList.length * hp('7.39%'),
              flex: 1,
            }}
            placeholderTextColor="#C4C4C4"
            placeholder="수다방에 올릴 게시물을 작성해주세요!"
            multiline
            value={paragraph}
            scrollEnabled={true}
            onKeyPress={(e) => {
              if (e.nativeEvent.key === 'Backspace') {
              }
            }}
            onSelectionChange={(event) => {
              console.log(
                'hola',
                startIndex,
                endIndex,
                event.nativeEvent.selection.end,
              );
              if (toggleCreateHashTag) {
                setToggleCreateHashTag(false);
                return;
              }
              if (searchMode !== '') {
                if (
                  event.nativeEvent.selection.end > endIndex ||
                  event.nativeEvent.selection.end < startIndex
                ) {
                  setParagraph(
                    paragraph.slice(0, startIndex - 1) +
                      paragraph.slice(endIndex),
                  );
                  setSearchMode('');
                  if (event.nativeEvent.selection.end < startIndex) {
                    textInput.current.setNativeProps({
                      selection: {
                        start:
                          event.nativeEvent.selection.end +
                          endIndex -
                          startIndex,
                        end:
                          event.nativeEvent.selection.end +
                          endIndex -
                          startIndex,
                      },
                    });
                  }
                }
              }
              setCursorIndex(event.nativeEvent.selection.end);
            }}
            onChangeText={(text) => {
              if (paragraph.length > text.length) {
                if (searchMode === '') {
                  //back-space
                  let searchIndex = cursorIndex - 1;
                  let newParagraph = text;

                  while (searchIndex >= 0) {
                    if (paragraph.charAt(searchIndex) == '#') {
                      newParagraph =
                        paragraph.slice(0, searchIndex) +
                        paragraph.slice(cursorIndex + 1);
                      break;
                    } else if (paragraph.charAt(searchIndex) == ' ') {
                      break;
                    }
                    searchIndex -= 1;
                  }

                  setParagraph(newParagraph);
                } else {
                  if (cursorIndex === startIndex - 1) {
                    setSearchMode('');
                  }
                  setParagraph(text);
                }
              } else {
                setParagraph(text);
              }

              if (searchMode !== '') {
                setSearchQuery(text.slice(startIndex).split(' ')[0]); // #부터 ' '까지 자른 것이 쿼리
                setEndIndex(
                  startIndex + text.slice(startIndex).split(' ')[0].length + 1,
                );
                console.log(
                  'dd',
                  startIndex,
                  endIndex,
                  startIndex + text.slice(startIndex).split(' ')[0].length + 1,
                );
                console.log('cursor', cursorIndex);
              }
            }}
            autoCorrect={false}></ParagraphTextInput>
        </KeyboardAvoidingView>
        <GalleryContainerView
          style={{
            position: 'absolute',
            bottom: -hp('2.6%'),
          }}>
          <GalleryUploadTouchableOpacity
            onPress={() => {
              onPressAddImage();
            }}>
            <GalleryStatusImage
              source={require('~/Assets/Images/Picture/camera.png')}
            />
            <GalleryStatusText>
              <GalleryStatusText style={{color: '#0075FF'}}>
                {imageRenderList.length}
              </GalleryStatusText>
              /5
            </GalleryStatusText>
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
        <CheckBoxItemView>
          <TouchableOpacity onPress={() => {}}>
            <CheckBoxImage />
          </TouchableOpacity>
          <CheckBoxItemText>의사에게 물어보기</CheckBoxItemText>
        </CheckBoxItemView>
      </FooterContainerView>
      <HashTagSearchBarView
        setSearchMode={setSearchMode}
        searchMode={searchMode}
        searchQuery={searchQuery}
        suggestionList={suggestionList}
        completeCurrentHashTag={completeCurrentHashTag}
      />
    </ContainerView>
  );
};

export default CommunityCreatePostScreen;
