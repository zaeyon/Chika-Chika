import React, {useState, useEffect, useRef, useCallback} from 'react';
import Styled from 'styled-components/native';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  LayoutAnimation,
  UIManager,
  Platform,
  Animated,
  KeyboardAvoidingView,
  Keyboard,
  TextInput,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
// import DeviceInfo from 'react-native-device-info';
import {hasNotch} from '~/method/deviceInfo'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  isIphoneX,
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper';
import ActionSheet from 'react-native-actionsheet';
// Local Component
import SuggestionBarView from '~/Components/Presentational/CommunityCreatePostScreen/SuggestionBarView';
import AnimatedModal from '~/Components/Presentational/AnimatedModal';

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
margin-bottom: 8px;
`;

const CategoryContainerView = Styled.View`
width: auto;
margin: 4px 16px 0px 16px;
height: auto;
padding: 16px 0px;
flex-direction: row;
align-items: center;
border-color: #E2E6ED;
border-bottom-width: 1px;
`;

const CategoryTitleText = Styled.Text`
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 24px;
color: #9AA2A9;
margin-right: 12px;
`;

const CategoryContentView = Styled.View`
flex: 1;
flex-direction: row;
`;

const CategoryContentFocusedText = Styled.Text`
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 24px;
color: #FFFFFF;
`;
const CategoryContentText = Styled.Text`
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 24px;
color: #131F3C;
`;

const CategorySelectorView = Styled.View`
width: 59px;
height: 100%;
justify-content: center;
align-items: center;
background: #00D1FF;
border-radius: 100;
position: absolute;
`;

const CategoryItemView = Styled.View`
width: auto;
height: auto;
margin-right: 8px;
padding: 4px 12px;
justify-content: center;
align-items: center;
z-index: 1;
`;

const CategoryItemSelectedView = Styled.View`
width: auto;
height: auto;
margin-right: 8px;
padding: 4px 12px;
justify-content: center;
align-items: center;
z-index: 1;
border-radius: 100;
background: #00D1FF;
`;

const PopupAdviceView = Styled.View`
margin: 16px 16px 0px 16px;
padding: 16px;
background: #F5F7F9;
border-radius: 8px;
`;

const PopupAdviceText = Styled.Text`
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 24px;
color: #131F3C;
`;

const ParagraphTextInput = Styled.TextInput`
width: 100%;
flex: 1;
padding: 0px 24px;
font-size: 16px;
line-height: 24px;
`;

const GalleryContainerView = Styled.View`
width: ${wp('100%')}px;
margin-bottom: ${hasNotch() ? 0 : 16}px;
`;

const GalleryFlatList = Styled.FlatList`
width: ${wp('100%')}px;
`;

const ItemContainerView = Styled.View`
width: 72px;
height: 72px;
margin-right: 8px;
justify-content: flex-end;
overflow: visible;
`;

const ItemImage = Styled.Image`
width: 67px;
height: 67px;
border-width: 0.5px;
border-color: #E2E6ED;
border-radius: 2px;
`;

const DeleteButtonView = Styled.View`
width: 18px;
height: 18px;
align-items: center;
justify-content: center;
position: absolute;
top: 0px;
right: 0px;
z-index: 1;
background: #131F3C80;
border-radius: 100px;
`;
const DeleteButtonImage = Styled.Image`
width: 16px;
height: 16px;
`;

const UploadImageButtonImage = Styled.Image`
margin: 0px 16px;
`;

const DeleteImage = Styled.Image`
width: 16px;
height: 16px;
`;

interface Props {
  navigateToCamera: () => void;
  navigateToGallery: () => void;
  categoryList: any;
  selectedImages: any;
  unSelectImage: (image: any) => void;
  searchMode: any;
  setSearchMode: any;
  searchQuery: any;
  setSearchQuery: any;
  suggestionList: any;
  category: string;
  setCategory: any;
  paragraph: string;
  setParagraph: any;
  wantDentistHelp: boolean;
  setWantDentistHelp: any;
  isPopupShown: any;
  setIsPopupShown: any;
  isLoading: any;
}

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const CommunityCreatePostScreen = ({
  navigateToCamera,
  navigateToGallery,
  categoryList,
  selectedImages,
  unSelectImage,
  searchMode,
  setSearchMode,
  searchQuery,
  setSearchQuery,
  suggestionList,
  category,
  setCategory,
  paragraph,
  setParagraph,
  wantDentistHelp,
  setWantDentistHelp,
  isPopupShown,
  setIsPopupShown,
  isLoading,
}: Props) => {
  const [cursorIndex, setCursorIndex] = useState(0);
  const [currentHashTagInfo, setCurrentHashTagInfo] = useState({
    startIndex: 0,
    endIndex: 0,
  });
  const categoryIndex = useRef(
    new Animated.Value(categoryList.indexOf(category)),
  ).current;
  const textInputRef = useRef() as
    | ((instance: TextInput | null) => void)
    | React.RefObject<TextInput>
    | null
    | undefined;
  const actionSheetRef = useRef() as any;
  const actionSheetItemList = ['취소', '카메라', '앨범'];

  const [isModalVisible, setIsModalVisible] = useState(false);

  const onPressActionSheet = useCallback(
    (index: number) => {
      switch (actionSheetItemList[index]) {
        case '카메라':
          navigateToCamera();
          break;
        case '앨범':
          navigateToGallery();
          break;
      }
    },
    [actionSheetItemList],
  );

  const renderCategories = useCallback(
    (categoryList: any) => {
      return categoryList.map((item: any, index: number) => {
        return (
          <TouchableWithoutFeedback
            key={'category' + index}
            onPress={() => {
              Keyboard.dismiss();
              ReactNativeHapticFeedback.trigger('selection');

              setCategory(categoryList[index]);
            }}>
            {category === categoryList[index] ? (
              <CategoryItemSelectedView>
                <CategoryContentFocusedText>
                  {categoryList[index]}
                </CategoryContentFocusedText>
              </CategoryItemSelectedView>
            ) : (
              <CategoryItemView>
                <CategoryContentText>{categoryList[index]}</CategoryContentText>
              </CategoryItemView>
            )}
          </TouchableWithoutFeedback>
        );
      });
    },
    [categoryIndex, Keyboard, category],
  );

  const completeCurrentHashTag = useCallback(
    (selectedHashTag: any) => {
      setParagraph((prev) => {
        const newParagraph =
          paragraph.charAt(currentHashTagInfo.endIndex) === ' '
            ? paragraph.slice(0, currentHashTagInfo.startIndex + 1) +
              selectedHashTag +
              paragraph.slice(currentHashTagInfo.endIndex)
            : paragraph.slice(0, currentHashTagInfo.startIndex + 1) +
              selectedHashTag +
              ' ' +
              paragraph.slice(currentHashTagInfo.endIndex);
        return newParagraph;
      });
      console.log(
        'at',
        paragraph.charAt(
          currentHashTagInfo.startIndex + 1 + selectedHashTag.length,
        ),
      );
      setTimeout(() => {
        textInputRef.current.setNativeProps({
          selection: {
            start: currentHashTagInfo.startIndex + 2 + selectedHashTag.length,
            end: currentHashTagInfo.startIndex + 2 + selectedHashTag.length,
          },
        });
        setSearchQuery('');
      }, 100);
    },
    [currentHashTagInfo, textInputRef],
  );

  const getCursorInfo = useCallback(
    (index: number, text?: string) => {
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
    },
    [paragraph],
  );

  const renderImageItem = useCallback(
    ({item, index}) => (
      <TouchableWithoutFeedback onPress={() => unSelectImage(item)}>
        <ItemContainerView>
          <DeleteButtonView>
            <DeleteButtonImage
              source={require('~/Assets/Images/TopTab/ic/white.png')}
            />
          </DeleteButtonView>
          <ItemImage
            source={
              item.img_url
                ? {uri: item.img_url} // edit mode s3 image
                : {
                    uri: item.base64
                      ? 'data:image/jpeg;base64,' + item.base64
                      : item.uri,
                  }
            }
          />
        </ItemContainerView>
      </TouchableWithoutFeedback>
    ),
    [],
  );

  const renderListHeader = useCallback(
    () => (
      <TouchableWithoutFeedback
        onPress={() => {
          actionSheetRef.current.show();
        }}>
        <UploadImageButtonImage
          source={require('~Assets/Images/Camera/Master/community/btn/uploadImage.png')}
        />
      </TouchableWithoutFeedback>
    ),
    [],
  );

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <ContainerView>
        <BodyContainerView>
          {/* <CategoryContainerView>
            <CategoryTitleText>카테고리</CategoryTitleText>
            <CategoryContentView>
              {renderCategories(categoryList)}
            </CategoryContentView>
          </CategoryContainerView> */}
          {isPopupShown ? (
            <PopupAdviceView>
              <TouchableOpacity
                style={{
                  flex: 1,
                  position: 'absolute',
                  zIndex: 1,
                  right: 16,
                  top: 16,
                }}
                onPress={() => {
                  LayoutAnimation.configureNext(
                    LayoutAnimation.create(100, 'easeInEaseOut', 'opacity'),
                  );
                  setIsPopupShown(false);
                }}>
                <DeleteImage
                  source={require('~/Assets/Images/TopTab/ic/cancel.png')}
                />
              </TouchableOpacity>
              <PopupAdviceText>
                해시태그로 병원, 증상, 진료항목을 추가해보세요!
              </PopupAdviceText>
              <PopupAdviceText>
                #햇살365치과 #잇몸통증 #잇몸성형
              </PopupAdviceText>
            </PopupAdviceView>
          ) : null}
          <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={
              (hasNotch() ? getBottomSpace() : 16) + 62.5
            }
            style={{
              width: '100%',
              marginTop: 16,
              flex: 1,
            }}>
            <ParagraphTextInput
              ref={textInputRef}
              style={{
                paddingBottom: searchQuery ? hp('7.39%') * 3 : 8,
              }}
              placeholderTextColor="#C4C4C4"
              placeholder={
                category === '질문방'
                  ? '질문방에 올릴 게시물을 작성해주세요.'
                  : '수다방에 올릴 게시물을 작성해주세요.'
              }
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
          </KeyboardAvoidingView>
        </BodyContainerView>
        <GalleryContainerView>
          <GalleryFlatList
            data={selectedImages}
            horizontal
            alwaysBounceHorizontal={false}
            scrollIndicatorInsets={{bottom: -1, left: 13, right: 8}}
            contentContainerStyle={{
              paddingVertical: 8,
            }}
            keyExtractor={(item: any) =>
              'preview' + (item.filename || item.img_filename)
            }
            renderItem={renderImageItem}
            ListHeaderComponent={renderListHeader}
          />
        </GalleryContainerView>

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
