import React, {useState, useEffect, useRef} from 'react';
import Styled from 'styled-components/native';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  View,
  Animated,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {isIphoneX, getBottomSpace} from 'react-native-iphone-x-helper';
import ActionSheet from 'react-native-actionsheet';
// Local Component
import ImageContentView from '~/Components/Presentational/CommunityCreatePostScreen/ImageContentView';
import SuggestionBarView from '~/Components/Presentational/CommunityCreatePostScreen/SuggestionBarView';

const ContainerView = Styled.View`
 flex: 1;
 background-color: white;

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
border: 1px #C4C4C4;
border-radius: 4px;
`;
const CheckBoxItemText = Styled.Text`
font-size: 16px;
line-height: 24px;
`;

const GalleryContainerView = Styled.View`
width: 100%;
flex-direction: row;
align-items: flex-end;
padding-left: 16px;
padding-bottom: 24px;
margin-top: 16px;
margin-bottom: ${hp('11%') - getBottomSpace()}px;
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
  categoryList: any;
  selectedImages: any;
  searchMode: any;
  setSearchMode: any;
  searchQuery: any;
  setSearchQuery: any;
  suggestionList: any;
  category: string;
  setCategory: any;
  imageDataList: any;
  setImageDataList: any;
  paragraph: string;
  setParagraph: any;
  wantDentistHelp: boolean;
  setWantDentistHelp: any;
  isPopupShown: any;
  setIsPopupShown: any;
  isLoading: any;
}

const CommunityCreatePostScreen = ({
  navigation,
  route,
  categoryList,
  selectedImages,
  searchMode,
  setSearchMode,
  searchQuery,
  setSearchQuery,
  suggestionList,
  category,
  setCategory,
  imageDataList,
  setImageDataList,
  paragraph,
  setParagraph,
  wantDentistHelp,
  setWantDentistHelp,
  isPopupShown,
  setIsPopupShown,
  isLoading,
}: Props) => {
  const [imageRenderList, setImageRenderList] = useState<string[]>(
    imageDataList,
  );
  const [cursorIndex, setCursorIndex] = useState(0);
  const [currentHashTagInfo, setCurrentHashTagInfo] = useState({
    startIndex: 0,
    endIndex: 0,
  });
  const categoryIndex = useRef(
    new Animated.Value(categoryList.indexOf(category)),
  ).current;
  const textInputRef = useRef();
  const actionSheetRef = useRef();
  const actionSheetItemList = ['취소', '카메라', '앨범'];

  useEffect(() => {
    let newImages = selectedImages || [];
    let newImageList = imageDataList.concat(newImages.concat());
    setImageRenderList(newImageList);
    setImageDataList(newImageList);
  }, [selectedImages]);

  const DismissKeyboard = ({children}: any) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );
  const onPressActionSheet = (index: number) => {
    switch (actionSheetItemList[index]) {
      case '카메라':
        navigateToCamera();
        break;
      case '앨범':
        navigateToGallery();
        break;
    }
  };
  const deleteImageByFilename = (item: any) => {
    let newImageList = imageDataList
      .concat()
      .filter(
        (image: any) =>
          image.filename !== item.filename ||
          image.img_filename !== item.img_filename,
      );
    setImageDataList(newImageList);
  };

  const navigateToCamera = () => {
    navigation.navigate('CommunityCamera', {
      requestType: 'CommunityPostUploadScreen',
    });
  };
  const navigateToGallery = () => {
    navigation.navigate('CommunityGallery', {
      requestType: 'CommunityPostUploadScreen',
    });
  };

  const renderCategories = (categoryList: any) => {
    return categoryList.map((item: any, index: number) => {
      return (
        <TouchableOpacity
          key={'category' + index}
          onPress={() => {
            Keyboard.dismiss();
            Animated.timing(categoryIndex, {
              toValue: index,
              duration: 100,
              useNativeDriver: false,
            }).start();
            setCategory(categoryList[index]);
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

  const completeCurrentHashTag = (selectedHashTag: any) => {
    const newParagraph =
      paragraph.charAt(currentHashTagInfo.endIndex) === ' '
        ? paragraph.slice(0, currentHashTagInfo.startIndex + 1) +
          selectedHashTag +
          paragraph.slice(currentHashTagInfo.endIndex)
        : paragraph.slice(0, currentHashTagInfo.startIndex + 1) +
          selectedHashTag +
          ' ' +
          paragraph.slice(currentHashTagInfo.endIndex);

    setParagraph(newParagraph);
    setSearchQuery('');
  };

  const getCursorInfo = (index: number, text?: string) => {
    const field = text ? text : paragraph;
    let searchStartIndex = index - 1;
    let searchEndIndex = index - 1;
    let isTag = false;
    while (searchStartIndex >= 0) {
      if (field.charAt(searchStartIndex) == '#') {
        isTag = true;
        while (searchEndIndex < field.length) {
          if (
            field.charAt(searchEndIndex) == ' ' ||
            field.charAt(searchEndIndex) == '\n'
          ) {
            break;
          }
          searchEndIndex += 1;
        }
        break;
      } else if (
        field.charAt(searchStartIndex) == ' ' ||
        field.charAt(searchStartIndex) == '\n'
      ) {
        break;
      }
      searchStartIndex -= 1;
    }

    const cursorInfo = {
      isTag,
      startIndex: searchStartIndex,
      endIndex: searchEndIndex,
    };
    return cursorInfo;
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ContainerView>
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
                        outputRange: [
                          0,
                          wp('16.53') * (categoryList.length - 1),
                        ],
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
              marginTop: 16,
              height: isPopupShown ? hp('69%') : hp('80%'),
            }}>
            <ParagraphTextInput
              style={{
                flex: 1,
                marginBottom: suggestionList.length > 2 ? 5 : 0,
              }}
              ref={textInputRef}
              placeholderTextColor="#C4C4C4"
              placeholder="수다방에 올릴 게시물을 작성해주세요!"
              multiline
              value={paragraph}
              scrollEnabled={true}
              onSelectionChange={(e) => {
                const startIndex = e.nativeEvent.selection.start;
                setCursorIndex(startIndex);
                const cursorInfo = getCursorInfo(startIndex);
                if (cursorInfo.isTag) {
                  const query = paragraph.slice(
                    cursorInfo.startIndex + 1,
                    cursorInfo.endIndex,
                  );
                  setCurrentHashTagInfo({
                    startIndex: cursorInfo.startIndex,
                    endIndex: cursorInfo.endIndex,
                  });
                  setSearchQuery(query);
                  setSearchMode(true);
                  console.log(query);
                } else {
                  setSearchQuery('');
                  setSearchMode(false);
                }
              }}
              onChangeText={(text) => {
                setParagraph(text);
                const cursorInfo = getCursorInfo(cursorIndex, text);
                if (cursorInfo.isTag) {
                  const query = text.slice(
                    cursorInfo.startIndex + 1,
                    cursorInfo.endIndex,
                  );
                  setCurrentHashTagInfo({
                    startIndex: cursorInfo.startIndex,
                    endIndex: cursorInfo.endIndex,
                  });
                  setSearchQuery(query);
                  console.log(query);
                } else {
                  setSearchQuery('');
                }
              }}
              autoCorrect={false}></ParagraphTextInput>
            <GalleryContainerView>
              <GalleryUploadTouchableOpacity
                onPress={() => {
                  actionSheetRef.current.show();
                }}>
                <GalleryStatusImage
                  source={require('~/Assets/Images/Picture/camera.png')}
                />
                <GalleryStatusText>
                  <GalleryStatusText style={{color: '#0075FF'}}>
                    {imageDataList.length}
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
          </KeyboardAvoidingView>
        </BodyContainerView>
        <FooterContainerView>
          <CheckBoxItemView>
            <TouchableOpacity
              style={{
                backgroundColor: wantDentistHelp ? 'red' : 'white',
                marginRight: 8,
              }}
              onPress={() => {
                setWantDentistHelp((prev: any) => !prev);
              }}>
              <CheckBoxImage />
            </TouchableOpacity>
            <CheckBoxItemText>의사에게 물어보기</CheckBoxItemText>
          </CheckBoxItemView>
        </FooterContainerView>
        <SuggestionBarView
          suggestionList={suggestionList}
          searchQuery={searchQuery}
          completeCurrentHashTag={completeCurrentHashTag}
          isLoading={isLoading}
        />
        <ActionSheet
          ref={actionSheetRef}
          options={actionSheetItemList}
          cancelButtonIndex={0}
          onPress={(index: any) => onPressActionSheet(index)}
        />
      </ContainerView>
    </TouchableWithoutFeedback>
  );
};

export default CommunityCreatePostScreen;
