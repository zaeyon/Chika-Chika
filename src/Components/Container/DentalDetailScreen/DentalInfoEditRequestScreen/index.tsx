import React, {useState, useEffect, useRef, memo} from 'react';
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
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// local component;
import NavigationHeader from '~/Components/Presentational/NavigationHeader';

const Container = Styled.View`
flex: 1;
 background-color: #FFFFFF;
`;

const BodyContainer = Styled.View`
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
font-family: NanumSquare;
font-weight: 800;
font-size: 20px;
line-height: 24px;
`;

const DentalAddressText = Styled.Text`
margin-top: 4px;
font-family: NanumSquare;
font-weight: 400;
font-size: 14px;
line-height: 24px;
color: #4E525D;
`;

const SelectInfoTypeContainer = Styled.View`
margin-top: 8px;
padding: 24px 16px 0px 16px;
background-color: #ffffff;
`;

const SelectInfoTypeLabelText = Styled.Text`
font-family: NanumSquare;
font-weight: 700;
font-size: 16px;
line-height: 20px;
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
font-family: NanumSquare;
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


interface Props {
  navigation: any;
  route: any;
}

const SELECT_INFO_TYPE_DATA = [
  {
    index: 0,
    id: 1,
    value: "폐업했어요.",
    selected: false,
  },
  {
    index: 1,
    id: 2,
    value: "병원 이름이 틀렸어요/변경됐어요.",
    selected: false,
  },
  {
    index: 2,
    id: 3,
    value: "주소(위치)가 달라요.",
    selected: false,
  },
  {
    index: 3,
    id: 4,
    value: "전화번호가 달라요.",
    selected: false,
  },
  {
    index: 4,
    id: 5,
    value: "진료/영업시간이 달라요.",
    selected: false,
  },
  {
    index: 5,
    id: 6,
    value: "진료과목이 달라요.",
    selected: false,
  },
  {
    index: 6,
    id: 7,
    value: "기타",
    selected: false,
  },
]

const SelectInfoTypeItem = (({item, index, selectInfoType, selected}: any) => {

  console.log("SelectInfoTypeItem", item);

  return (
    <TouchableWithoutFeedback onPress={() => selectInfoType(index)}>
    <SelectInfoTypeItemContainer>
      <SelectCircleBackground>
        {selected && (
        <SelectedCircle/>
        )}
      </SelectCircleBackground>
      <SelectInfoTypeValueText>{item.value}</SelectInfoTypeValueText>
    </SelectInfoTypeItemContainer>
    </TouchableWithoutFeedback>
  )
})

function isEqualItem(prevItem: any, nextItem: any) {
  console.log("isEqualITem prevItem, nextItem", prevItem, nextItem);
  return prevItem.selected === nextItem.selected;
}

const MemoizedSelectInfoTypeItem = (SelectInfoTypeItem);

const SelectInfoTypeList = ({infoTypeArray, selectInfoType, selectedType}: any) => {

  const renderSeparatorComponent = () => {
    return (
      <View
      style={{height: 16, backgroundColor: "#ffffff"}}
      />
    )
  }

  const renderSelectInfoItem = ({item, index}: any) => (

      <MemoizedSelectInfoTypeItem
      item={item}
      index={index}
      selectInfoType={selectInfoType}
      selected={selectedType.indexOf(item) === -1 ? false : true}
      />
    )
  

  return (
    <FlatList
    scrollEnabled={false}
    data={infoTypeArray}
    renderItem={renderSelectInfoItem}
    extraData={selectedType}
    ItemSeparatorComponent={renderSeparatorComponent}/>
  )
}

const DentalInfoEditRequestScreen = ({navigation, route}: Props) => {
  const [infoTypeArray, setInfoTypeArray] = useState<Array<any>>(SELECT_INFO_TYPE_DATA);
  const [selectedType, setSelectedType] = useState<any>([]);
  const [changeSelected, setChangeSelected] = useState<boolean>(false);


  const goBack = () => {
    navigation.goBack();
  };

  const selectInfoType = (index: number) => {

    console.log("selectInfoType index", index);
    let tmpInfoTypeArray = infoTypeArray;

    
    setChangeSelected(!changeSelected)
    setSelectedType((selectedType: any) => {
      const isSelectedIndex = selectedType.indexOf(infoTypeArray[index]);
      console.log("isSelectedIndex", isSelectedIndex);
      if(isSelectedIndex === -1) {
        selectedType.push(infoTypeArray[index])
        return selectedType
      } else {
        selectedType.splice(isSelectedIndex, 1);
        return selectedType;
      }
    })
  }

  return (
    <Container as={SafeAreaView} forceInset={{top: 'always'}}>
      <NavigationHeader
      headerLeftProps={{type: "arrow", onPress: goBack}}
      headerRightProps={{type: 'text', text: "완료"}}
      headerRightDisabled={true}
      headerTitle={"정보수정 요청"}/>
      <BodyContainer>
        <DentalInfoContainer>
          <DentalNameText>{"광교E편한치과의원"}</DentalNameText>
          <DentalAddressText>{"경기도 수원시 영통구 광교중앙로 145"}</DentalAddressText>
        </DentalInfoContainer>
        <SelectInfoTypeContainer>
          <LabelContainer>
          <SelectInfoTypeLabelText>{"수정을 제안할 항목을 선택해주세요. (필수)"}
          </SelectInfoTypeLabelText>
          <RequiredMark/>
          </LabelContainer>
          <HorizontalDividerContainer>
          <HorizontalDivider/>
          </HorizontalDividerContainer>
          <SelectInfoTypeListContainer>
          <SelectInfoTypeList
          selectedType={selectedType}
          selectInfoType={selectInfoType}
          infoTypeArray={infoTypeArray}/>
          </SelectInfoTypeListContainer>
        </SelectInfoTypeContainer>
      </BodyContainer>
    </Container>
  );
};

export default DentalInfoEditRequestScreen;
