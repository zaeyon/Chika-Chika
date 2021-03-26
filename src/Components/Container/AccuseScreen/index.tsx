import React, {useState, useEffect, useRef, memo, useCallback} from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import Styled from 'styled-components/native';
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
// import DeviceInfo from 'react-native-device-info';
import ActionSheet from 'react-native-actionsheet';
import {launchCamera} from 'react-native-image-picker';

// Local Component
import NavigationHeader from '~/Components/Presentational/NavigationHeader';
import {uploadImageToS3} from '~/method/uploadImageToS3';
import TouchBlockIndicatorCover from '~/Components/Presentational/TouchBlockIndicatorCover';
import ToastMessage from '~/Components/Presentational/ToastMessage';
import {hasNotch, getStatusBarHeight} from '~/method/deviceInfo';

// Route
import POSTReport from '~/Routes/Report/POSTReport';

const Container = Styled.View`
background-color: #F5F7F9;
flex: 1;
`;

const BodyContainer = Styled.ScrollView`
flex: 1;
background-color: #F5F7F9;
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

const AccuseDescripInput = Styled.TextInput`
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

interface Props {
  navigation: any;
  route: any;
}

const clinicAccuseTypes = [
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

const postAccuseTypes = [
  '영리목적/홍보성',
  '음란성/선정성',
  '욕설/인신공격',
  '개인정보노출',
  '같은내용 반복게시',
  '기타',
].map((item, index) => ({
  index,
  id: index + 1,
  value: item,
  selected: false,
}));

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
  return prevItem.selected === nextItem.selected && prevItem.id === nextItem.id;
}

const MemoizedSelectInfoTypeItem = memo(SelectInfoTypeItem, isEqualItem);

const SelectInfoTypeList = ({
  accuseTypeArray,
  selectAccuseType,
  selectedType,
}: any) => {
  const renderSeparatorComponent = () => {
    return <View style={{height: 16, backgroundColor: '#ffffff'}} />;
  };

  const renderSelectInfoItem = ({item, index}: any) => (
    <MemoizedSelectInfoTypeItem
      item={item}
      index={index}
      selectInfoType={selectAccuseType}
      selected={selectedType.indexOf(item.value) === -1 ? false : true}
    />
  );

  return (
    <FlatList
      scrollEnabled={false}
      data={accuseTypeArray}
      renderItem={renderSelectInfoItem}
      extraData={selectedType}
      ItemSeparatorComponent={renderSeparatorComponent}
    />
  );
};

const AccuseScreen = ({navigation, route}: Props) => {
  const [accuseTypeArray, setAccuseTypeArray] = useState<Array<any>>(
    route.params.targetType === 'clinic' ? clinicAccuseTypes : postAccuseTypes,
  );
  const [selectedType, setSelectedType] = useState<any>([]);
  const [changeSelected, setChangeSelected] = useState<boolean>(false);
  const [accuseDescrip, setAccuseDescrip] = useState<string>('');
  const [selectedImages, setSelectedImages] = useState<Array<any>>([]);
  const [isEnabledFinish, setIsEnabledFinish] = useState<boolean>(false);

  const [descripY, setDescripY] = useState<number>(0);
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
    if (selectedType.length > 0 && accuseDescrip.length > 0) {
      setIsEnabledFinish(true);
    } else if (selectedType.length === 0 || accuseDescrip.length === 0) {
      setIsEnabledFinish(false);
    }
  }, [selectedType, accuseDescrip]);

  const goBack = () => {
    navigation.goBack();
  };

  const onChangeInfoEditInput = (text: string) => {
    if (accuseDescrip.length < 300) {
      setAccuseDescrip(text);
    }
  };

  const selectAccuseType = (index: number) => {
    let tmpAccuseTypeArray = accuseTypeArray.slice();

    setSelectedType((selectedType: any) => {
      const isSelectedIndex = selectedType.indexOf(
        tmpAccuseTypeArray[index].value,
      );
      const prevSelectedType = selectedType.slice();

      if (isSelectedIndex === -1) {
        prevSelectedType.push(tmpAccuseTypeArray[index].value);
        return prevSelectedType;
      } else {
        prevSelectedType.splice(isSelectedIndex, 1);
        return prevSelectedType;
      }
    });
  };

  const accusePost = () => {
    Keyboard.dismiss();
    setLoading(true);
    POSTReport({
      jwtToken,
      targetType: route.params.targetType,
      targetId: route.params.targetId,
      reason: formatReason(selectedType),
      message: accuseDescrip,
    }).then((response: any) => {
      ToastMessage.show('신고 요청이 완료되었습니다. 감사합니다.');
      navigation.goBack();
    });
  };

  const formatReason = (selectedType: Array<string>) => {
    const tmpReason = selectedType.map((item: any, index: number) => {
      return "'" + item + "'";
    });

    return '[' + tmpReason + ']';
  };

  const onFocusAccuseDescripInput = () => {
    scrollViewRef.current.scrollTo({y: descripY})
  }

  return (
    <Container>
      <NavigationHeader
        headerLeftProps={{type: 'arrow', onPress: goBack}}
        headerRightProps={{type: 'text', text: '완료', onPress: accusePost}}
        headerRightDisabled={selectedType.length === 0 ? true : false}
        headerTitle={'신고하기'}
        headerRightActiveColor={'#00D1FF'}
      />
      <ScrollView
        contentContainerStyle={{paddingBottom: descripY}}
        showsVerticalScrollIndicator={false}
        ref={scrollViewRef}>
        <BodyContainer>
          <InfoContainer>
            <LabelContainer>
              <InfoLabelText>{'신고 사유를 선택해주세요(필수)'}</InfoLabelText>
              <RequiredMark />
            </LabelContainer>
            <HorizontalDividerContainer>
              <HorizontalDivider />
            </HorizontalDividerContainer>
            <SelectInfoTypeListContainer>
              <SelectInfoTypeList
                selectedType={selectedType}
                selectAccuseType={selectAccuseType}
                accuseTypeArray={accuseTypeArray}
              />
            </SelectInfoTypeListContainer>
          </InfoContainer>
          <InfoContainer 
          onLayout={(event) => {
            setDescripY(event.nativeEvent.layout.y)
          }}
          style={{paddingBottom: 24}}>
            <LabelContainer>
              <InfoLabelText>
                {'구체적인 신고 내용을 말씀해주세요(선택)'}
              </InfoLabelText>
              <RequiredMark />
            </LabelContainer>
            <HorizontalDividerContainer>
              <HorizontalDivider />
            </HorizontalDividerContainer>
            <InfoEditInputContainer>
              <AccuseDescripInput
                value={accuseDescrip}
                placeholderTextColor={'#9AA2A9'}
                multiline={true}
                textAlignVertical={'center'}
                onChangeText={(text) => onChangeInfoEditInput(text)}
                autoCapitalize={'none'}
                onFocus={() => onFocusAccuseDescripInput()}
              />
            </InfoEditInputContainer>
            <NumberOfCharacters>{`${accuseDescrip.length}/300`}</NumberOfCharacters>
          </InfoContainer>
        </BodyContainer>
      </ScrollView>
      <TouchBlockIndicatorCover loading={loading} />
    </Container>
  );
};

export default AccuseScreen;
