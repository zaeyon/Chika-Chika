import React, {useState, useEffect, useRef, memo, useCallback} from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import Styled from 'styled-components/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  TouchableWithoutFeedback,
  FlatList,
  ScrollView,
  Keyboard,
  StyleSheet,
  Alert,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import ActionSheet from 'react-native-actionsheet';
import {launchCamera} from 'react-native-image-picker';

// Local Component
import NavigationHeader from '~/Components/Presentational/NavigationHeader';
import {uploadImageToS3} from '~/method/uploadImageToS3';
import TouchBlockIndicatorCover from '~/Components/Presentational/TouchBlockIndicatorCover';

// Route
import POSTDentalInfoEdit from '~/Routes/Dental/POSTDentalInfoEdit';

const Container = Styled.View`
flex: 1;
 background-color: #FFFFFF;
`;

const BodyContainer = Styled.ScrollView`
flex: 1;
background-color: #ffffff;
`;

const DentalInfoContainer = Styled.View`
background-color: #ffffff;
padding-top: 24px;
padding-left: 16px;
padding-bottom: 24px;
padding-right: 16px;
`;

const DentalNameText = Styled.Text`
font-weight: 800;
font-size: 20px;
line-height: 24px;
color: #131F3C;
`;

const DentalAddressText = Styled.Text`
margin-top: 4px;
font-weight: 400;
font-size: 14px;
line-height: 24px;
color: #4E525D;
`;

const InfoContainer = Styled.View`
border-top-width: 8px;
border-color: #F5F7F9;
padding: 24px 16px 0px 16px;
background-color: #ffffff;
`;

const InfoLabelText = Styled.Text`
font-weight: 800;
font-size: 16px;
line-height: 24px;
color: #131F3C;
`;

const HorizontalDivider = Styled.View`
background-color: #F5F7F9;
height: 1px;
flex: 1;
`;

const HorizontalDividerContainer = Styled.View`
padding-top: 16px;
padding-bottom: 16px;
flex-direction: row;
`;

const SelectInfoTypeItemContainer = Styled.View`
background-color: #ffffff;
flex-direction: row;
align-items: center;
`;

const SelectCircleBackground = Styled.View`
width: ${wp('4.26%')}px;
height: ${wp('4.26%')}px;
border-radius: 100px;
background-color: #F5F7F9;
border-width: 1px;
border-color: #E2E6ED;
align-items: center;
justify-content: center;
`;

const SelectedCircle = Styled.View`
width: ${wp('2.66%')}px;
height: ${wp('2.66%')}px;
border-radius: 100px;
background-color: #00D1FF;
`;

const SelectInfoTypeValueText = Styled.Text`
font-weight: 400;
font-size: 14px;
line-height: 24px;
margin-left: 12px;
`;

const SelectInfoTypeListContainer = Styled.View`
padding-bottom: 24px;
`;

const RequiredMark = Styled.View`
width: 4px;
height: 4px;
border-radius: 100px;
background-color: #FF004D;
`;

const LabelContainer = Styled.View`
flex-direction: row;
`;

const InfoEditInputContainer = Styled.View`
min-height: ${hp('17.24%')}px;
border-width: 0.5px;
border-color: #E2E6ED;
border-radius: 8px;
padding: 10px 16px 16px 16px;

`;

const InfoEditInput = Styled.TextInput`
width: ${wp('82.933%')}px;
min-height: ${hp('17.24%')}px;
font-size: 12px;
font-weight: 400;
`;

const NumberOfCharacters = Styled.Text`
align-self: flex-end;
margin-top: 8px;
font-weight: 400;
line-height: 16px;
font-size: 12px;
color: #131F3C;
`;

const SelectImagesContainer = Styled.View`
padding-bottom: 150px;
`;

const GalleryContainerView = Styled.View`
width: ${wp('100%')}px;
margin-bottom: ${DeviceInfo.hasNotch() ? 0 : 16}px;
`;

const GalleryFlatList = Styled.FlatList`
width: ${wp('100%')}px;
`;

const ItemContainerView = Styled.View`
width: ${wp('19.2%')}px;
height: ${wp('19.2%')}px;
margin-right: 8px;
justify-content: flex-end;
overflow: visible;
`;

const ItemImage = Styled.Image`
width: ${wp('17.86%')}px;
height: ${wp('17.86%')}px;
border-width: 0.5px;
border-color: #E2E6ED;
border-radius: 2px;
`;

const DeleteButtonView = Styled.View`
width: ${wp('5.479%')}px;
height: ${wp('5.479%')}px;
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
width: ${wp('4.26%')}px;
height: ${wp('4.26%')}px;
`;

const UploadImageButtonImage = Styled.Image`
width: ${wp('19.2%')}px;
height: ${wp('19.2%')}px;
margin: 0px 16px 0px 0px;
`;

const DeleteImage = Styled.Image`
width: 16px;
height: 16px;
`;

interface Props {
  navigation: any;
  route: any;
}

const SELECT_INFO_TYPE_DATA = [
  {
    index: 0,
    id: 1,
    value: '폐업했어요.',
    selected: false,
  },
  {
    index: 1,
    id: 2,
    value: '병원 이름이 틀렸어요/변경됐어요.',
    selected: false,
  },
  {
    index: 2,
    id: 3,
    value: '주소(위치)가 달라요.',
    selected: false,
  },
  {
    index: 3,
    id: 4,
    value: '전화번호가 달라요.',
    selected: false,
  },
  {
    index: 4,
    id: 5,
    value: '진료/영업시간이 달라요.',
    selected: false,
  },
  {
    index: 5,
    id: 6,
    value: '진료과목이 달라요.',
    selected: false,
  },
  {
    index: 6,
    id: 7,
    value: '기타',
    selected: false,
  },
];

const SelectInfoTypeItem = ({item, index, selectInfoType, selected}: any) => {
  console.log('SelectInfoTypeItem', item);

  return (
    <TouchableWithoutFeedback onPress={() => selectInfoType(index)}>
      <SelectInfoTypeItemContainer>
        <SelectCircleBackground>
          {selected && <SelectedCircle />}
        </SelectCircleBackground>
        <SelectInfoTypeValueText>{item.value}</SelectInfoTypeValueText>
      </SelectInfoTypeItemContainer>
    </TouchableWithoutFeedback>
  );
};

function isEqualItem(prevItem: any, nextItem: any) {
  console.log('isEqualITem prevItem, nextItem', prevItem, nextItem);
  return prevItem.selected === nextItem.selected && prevItem.id === nextItem.id;
}

const MemoizedSelectInfoTypeItem = SelectInfoTypeItem;

const SelectInfoTypeList = ({
  infoTypeArray,
  selectInfoType,
  selectedType,
}: any) => {
  const renderSeparatorComponent = () => {
    return <View style={{height: 16, backgroundColor: '#ffffff'}} />;
  };

  const renderSelectInfoItem = ({item, index}: any) => (
    <MemoizedSelectInfoTypeItem
      item={item}
      index={index}
      selectInfoType={selectInfoType}
      selected={selectedType.indexOf(item.value) === -1 ? false : true}
    />
  );

  return (
    <FlatList
      scrollEnabled={false}
      data={infoTypeArray}
      renderItem={renderSelectInfoItem}
      extraData={selectedType}
      ItemSeparatorComponent={renderSeparatorComponent}
    />
  );
};

interface CameraResponse {
  didCancel: boolean;
  errorCode: number;
  errorMessage: string;
  base64: string;
  uri: string;
  width: number;
  height: number;
  fileSize: number;
  type: string;
  fileName: string;
}

const DentalInfoEditRequestScreen = ({navigation, route}: Props) => {
  console.log('DentalInfoEditRequestScreen', route.params?.dentalObj);

  const [infoTypeArray, setInfoTypeArray] = useState<Array<any>>(
    SELECT_INFO_TYPE_DATA,
  );
  const [selectedType, setSelectedType] = useState<any>([]);
  const [changeSelected, setChangeSelected] = useState<boolean>(false);
  const [infoEditDescrip, setInfoEditDescrip] = useState<string>('');
  const [selectedImages, setSelectedImages] = useState<Array<any>>([]);
  const [isEnabledFinish, setIsEnabledFinish] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const scrollViewRef = useRef<any>();

  const actionSheetRef = useRef() as any;
  const actionSheetItemList = ['취소', '카메라', '앨범'];
  const jwtToken = useSelector((state: any) => state.currentUser).jwtToken;

  useEffect(() => {
    if (route.params?.selectedImages) {
      setSelectedImages(route.params.selectedImages);
    }
  }, [route.params?.selectedImages]);

  useEffect(() => {
    console.log('값 바뀜');
    if (selectedType.length > 0 && infoEditDescrip.length > 0) {
      console.log('완료버튼 활성화');
      setIsEnabledFinish(true);
    } else if (selectedType.length === 0 || infoEditDescrip.length === 0) {
      console.log('완료버튼 비활성화');
      setIsEnabledFinish(false);
    }
  }, [selectedType, infoEditDescrip]);

  const goBack = () => {
    navigation.goBack();
  };

  const onChangeInfoEditInput = (text: string) => {
    if (infoEditDescrip.length < 300) {
      setInfoEditDescrip(text);
    }
  };

  const selectInfoType = (index: number) => {
    console.log('selectInfoType index', index);
    let tmpInfoTypeArray = infoTypeArray;

    setChangeSelected(!changeSelected);
    setSelectedType((selectedType: any) => {
      const isSelectedIndex = selectedType.indexOf(infoTypeArray[index].value);
      console.log('isSelectedIndex', isSelectedIndex);
      if (isSelectedIndex === -1) {
        selectedType.push(infoTypeArray[index].value);
        return selectedType;
      } else {
        selectedType.splice(isSelectedIndex, 1);
        return selectedType;
      }
    });
  };

  const unSelectImage = useCallback((image) => {
    setSelectedImages((prev) => {
      const targetIndex = prev.findIndex(
        (item) => item.filename === image.filename,
      );
      const newSelectedImages = prev.concat();
      if (targetIndex >= 0) {
        newSelectedImages.splice(targetIndex, 1);
        return newSelectedImages;
      } else {
        return prev;
      }
    });
  }, []);

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

  const navigateToCamera = useCallback(() => {
    launchCamera({includeBase64: true}, (response: CameraResponse) => {
      if (!response.didCancel) {
        const capturedImage = {
          filename: response.fileName,
          fileSize: response.fileSize,
          width: response.width,
          height: response.height,
          uri: response.uri,
          base64: response.base64,
          camera: true,
        };
        setSelectedImages((prev) => [...prev, capturedImage]);
      }
    });
  }, []);

  const navigateToGallery = useCallback(() => {
    navigation.navigate('ImageSelectScreen', {
      requestType: 'DentalInfoEditRequestScreen',
      selectedImages: selectedImages,
    });
  }, [selectedImages]);

  const finishInfoEdit = async () => {
    setLoading(true);
    console.log(
      'finishInfoEdit route.params?.dentalObj',
      route.params.dentalObj,
    );
    console.log('finishInfoEdit selectedType', selectedType);
    console.log('finishInfoEdit infoEditDescrip', infoEditDescrip);

    const dentalId = route.params?.dentalObj.id;
    const message = infoEditDescrip;
    const images = await formatImageArray(selectedImages);
    const reason = await formatReason(selectedType);

    POSTDentalInfoEdit({jwtToken, dentalId, images, message, reason})
      .then((response: any) => {
        setLoading(false);
        console.log('POSTDentalInfoEdit response', response);
        if (response.statusText === 'OK') {
          navigation.navigate('DentalDetailScreen', {
            infoEditRequest: true,
          });
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log('POSTDentalInfoEdit error', error);
      });
  };

  const formatImageArray = async (selectedImages: Array<any>) => {
    const tmpImageArray = await Promise.all(
      selectedImages.map(async (item: any, index: number) => {
        const result: any = await uploadImageToS3(item, 'clinicReportImgs');
        const imageObj = {
          originalname: result.originalName,
          mimetype: result.type,
          filename: result.originalName,
          size: result.size,
          location: result.response.location,
          width: result.width,
          height: result.height,
        };

        return imageObj;
      }),
    );

    return tmpImageArray;
  };

  const formatReason = async (selectedType: Array<string>) => {
    const tmpReason = selectedType.map((item: any, index: number) => {
      return "'" + item + "'";
    });

    return '[' + tmpReason + ']';
  };

  const renderImageItem = useCallback(
    ({item, index}) => (
      <TouchableWithoutFeedback onPress={() => unSelectImage(item)}>
        <ItemContainerView>
          <DeleteButtonView>
            <DeleteButtonImage
              source={require('~/Assets/Images/Picture/ic_delete.png')}
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
    <Container as={SafeAreaView} forceInset={{top: 'always'}}>
      <NavigationHeader
        headerLeftProps={{type: 'arrow', onPress: goBack}}
        headerRightProps={{type: 'text', text: '완료', onPress: finishInfoEdit}}
        headerRightDisabled={
          selectedType.length > 0 && infoEditDescrip.length > 0 ? false : true
        }
        headerTitle={'정보수정 요청'}
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        ref={scrollViewRef}>
        <BodyContainer>
          <DentalInfoContainer>
            <DentalNameText>{`${route.params?.dentalObj.originalName}`}</DentalNameText>
            <DentalAddressText>{`${route.params?.dentalObj.address}`}</DentalAddressText>
          </DentalInfoContainer>
          <InfoContainer>
            <LabelContainer>
              <InfoLabelText>
                {'수정을 제안할 항목을 선택해주세요. (필수)'}
              </InfoLabelText>
              <RequiredMark />
            </LabelContainer>
            <HorizontalDividerContainer>
              <HorizontalDivider />
            </HorizontalDividerContainer>
            <SelectInfoTypeListContainer>
              <SelectInfoTypeList
                selectedType={selectedType}
                selectInfoType={selectInfoType}
                infoTypeArray={infoTypeArray}
              />
            </SelectInfoTypeListContainer>
          </InfoContainer>
          <InfoContainer style={{paddingBottom: 24}}>
            <LabelContainer>
              <InfoLabelText>
                {'구체적인 수정 내용을 말씀해주세요. (필수)'}
              </InfoLabelText>
              <RequiredMark />
            </LabelContainer>
            <HorizontalDividerContainer>
              <HorizontalDivider />
            </HorizontalDividerContainer>
            <InfoEditInputContainer>
              <InfoEditInput
                value={infoEditDescrip}
                placeholder={
                  '예시) 진료시간이 5시까지인데 6시까지라고 되어있어요.'
                }
                placeholderTextColor={'#9AA2A9'}
                multiline={true}
                textAlignVertical={'center'}
                onChangeText={(text) => onChangeInfoEditInput(text)}
                autoCapitalize={'none'}
              />
            </InfoEditInputContainer>
            <NumberOfCharacters>{`${infoEditDescrip.length}/300`}</NumberOfCharacters>
          </InfoContainer>
          <LabelContainer
            style={{
              paddingTop: 24,
              paddingLeft: 16,
              paddingRight: 16,
              borderTopWidth: 8,
              borderColor: '#F5F7F9',
            }}>
            <InfoLabelText>{'관련 사진을 첨부해주세요. (선택)'}</InfoLabelText>
          </LabelContainer>
          <HorizontalDividerContainer>
            <HorizontalDivider />
          </HorizontalDividerContainer>
          <SelectImagesContainer>
            <GalleryContainerView>
              <GalleryFlatList
                data={selectedImages}
                horizontal
                alwaysBounceHorizontal={false}
                scrollIndicatorInsets={{bottom: -1, left: 13, right: 8}}
                contentContainerStyle={{
                  paddingLeft: 16,
                }}
                keyExtractor={(item: any) =>
                  'preview' + (item.filename || item.img_filename)
                }
                renderItem={renderImageItem}
                ListHeaderComponent={renderListHeader}
                showsHorizontalScrollIndicator={false}
              />
            </GalleryContainerView>
          </SelectImagesContainer>
        </BodyContainer>
      </KeyboardAwareScrollView>
      <ActionSheet
        ref={actionSheetRef}
        options={actionSheetItemList}
        cancelButtonIndex={0}
        onPress={(index: any) => onPressActionSheet(index)}
      />
      <TouchBlockIndicatorCover loading={loading} />
    </Container>
  );
};

export default DentalInfoEditRequestScreen;
