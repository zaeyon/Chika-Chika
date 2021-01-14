import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, FlatList, Keyboard} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {NavigationContainer} from '@react-navigation/native';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';
import AboveKeyboard from 'react-native-above-keyboard';

// route
import GETTreatmentSearch from '~/Routes/Search/GETTreatmentSearch';

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
width: ${wp('6.4%')}px;
height: ${wp('6.4%')}px;
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
width: ${wp('6.4%')}px;
height: ${wp('6.4%')}px;
`;

const BodyContainer = Styled.View`
`;

const TakePhotoText = Styled.Text`
`;

const GalleryText = Styled.Text`
margin-top: 30px;
`;

const MetaDataItemContainer = Styled.View`
width: ${wp('91.46%')}px;
height: ${wp('12.799%')}px;
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
width: ${wp('100%')}px;
position: absolute;
bottom: 53px;
`;

const FinishButtonContainer = Styled.View`
width: ${wp('100%')}px;
align-items: center;
`;

const FinishButton = Styled.View`
width: ${wp('91.46%')}px;
height: ${wp('12.799%')}px;
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
width: ${wp('71.73%')}px;
height: ${wp('10.666%')}px;
border-radius: 8px;
background-color: #F6F7F8;
flex-direction: row;
align-items: center;
padding-left: 12px;
`;

const SearchIcon = Styled.Image`
width: ${wp('4.2%')}px;
height: ${wp('4.2%')}px;
`;

const SearchTextInput = Styled.TextInput`
margin-left: 8px;
width: ${wp('65%')}px;
font-weight: 300;
font-size: 16px;
`;

const TreatListContainer = Styled.View`
padding-top: 7px;
`;

const TreatItemContainer = Styled.View`
width: ${wp('100%')}px;
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
width: ${wp('100%')}px;
height: ${wp('4.26%')}px;
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
width: ${wp('4.8%')}px;
height: ${wp('4.8%')}px;
`;

const DeleteContainer = Styled.View`
padding-top: 7px;
padding-bottom: 7px; 
`;

interface Props {
  navigation: any;
  route: any;
}

interface Treatment {
  name: string;
  id: number;
}

let inputText = "";

const TreatSearchScreen = ({navigation, route}: Props) => {
  const [selectedTreatList, setSelectedTreatList] = useState<Array<Object>>([]);
  const [onChangeSelectedTreatList, setOnChangeSelectedTreatList] = useState<
    boolean
  >(false);
  const [autoCompletedTreatList, setAutoCompletedTreatList] = useState<
    Array<Treatment>
  >([]);
  const [buttonBottomPadding, setButtonBottomPadding] = useState<number>(53);

  useEffect(() => {
    if (route.params?.selectedTreatList) {
      setSelectedTreatList(route.params?.selectedTreatList);
    }
  }, [route.params?.selectedTreatList]);

  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', onKeyboardWillShow);
    Keyboard.addListener('keyboardWillHide', onKeyboardWillHide);

    return () => {
      Keyboard.removeListener('keyboardWillShow', onKeyboardWillShow);
      Keyboard.removeListener('keyboardWillHide', onKeyboardWillHide);
    };
  }, []);

  const onKeyboardWillShow = () => {
    setButtonBottomPadding(20);
  };

  const onKeyboardWillHide = () => {
    setButtonBottomPadding(53);
  };

  const selectTreatItem = (treat: object, index: number) => {
    var tmpSelectedTreatList = selectedTreatList;
    tmpSelectedTreatList.push(treat);
    setSelectedTreatList(tmpSelectedTreatList);
    setOnChangeSelectedTreatList(!onChangeSelectedTreatList);

    var tmpAutoCompletedTreatList = autoCompletedTreatList;
    tmpAutoCompletedTreatList.splice(index, 1);
    setAutoCompletedTreatList(tmpAutoCompletedTreatList);
  };

  const deleteTreatItem = (treat: object) => {
    var tmpSelectedTreatList = selectedTreatList;
    var deleteIndex = tmpSelectedTreatList.indexOf(treat);

    tmpSelectedTreatList.splice(deleteIndex, 1);
    setSelectedTreatList(tmpSelectedTreatList);
    setOnChangeSelectedTreatList(!onChangeSelectedTreatList);
  };

  const onPressFinishButton = () => {
    if (route.params?.requestPage === 'metadata') {
      navigation.navigate('DetailPriceScreen', {
        selectedTreatList: selectedTreatList,
        dentalClinic: route.params?.dentalClinic,
        treatDate: route.params?.treatDate,
        treatPrice: route.params?.treatPrice,
        keyboardSetting: true,
        requestPage: 'treat',
        requestType: route.params?.requestType,
      });
    } else if (route.params?.requestPage === 'content') {
      console.log('리뷰 내용 작성 화면');
      navigation.navigate('ContentPostScreen', {
        selectedTreatList: selectedTreatList,
        requestType: route.params?.requestType,
      });
    }
  };

  const onChangeTreatInput = (text: string) => {

    inputText = text;

    if(text === "") {

    } else {
      GETTreatmentSearch(text)
      .then(function (response: any) {
        console.log('GETTreatmentSearch response', response);
        // response.forEach((item: any, index: any) => {
        //   console.log('item', item);
        //   console.log('selectedTreatList', selectedTreatList);
        // });

        if(inputText === text) {
          setAutoCompletedTreatList(response);
        }
      })
      .catch(function (error: any) {
        console.log('GETTreatmentSearch error', error);
      });
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  const renderTreatItem = ({item, index}: any) => {
    return (
      <TreatItemContainer>
        <TreatItemNameText>{'# ' + item.name}</TreatItemNameText>
        <TouchableWithoutFeedback onPress={() => selectTreatItem(item, index)}>
          <TreatItemAddContainer>
            <TreatItemAddText>추가</TreatItemAddText>
          </TreatItemAddContainer>
        </TouchableWithoutFeedback>
      </TreatItemContainer>
    );
  };

  return (
    <Container>
      <HeaderBar>
        <TouchableWithoutFeedback onPress={() => goBack()}>
          <HeaderLeftContainer>
            <HeaderBackIcon
              source={require('~/Assets/Images/HeaderBar/ic_back.png')}
            />
          </HeaderLeftContainer>
        </TouchableWithoutFeedback>
        <SearchInputContainer>
          <SearchIcon
            source={require('~/Assets/Images/HeaderBar/ic_search.png')}
          />
          <SearchTextInput
            placeholder={'진료 및 치료 종류'}
            placeholderTextColor={'#ABA5A5'}
            autoCapitalize={'none'}
            autoFocus={true}
            onChangeText={(text: string) => onChangeTreatInput(text)}
          />
        </SearchInputContainer>
        <HeaderRightContainer>
          <HeaderSearchText>검색</HeaderSearchText>
        </HeaderRightContainer>
      </HeaderBar>
      <BodyContainer>
        <SelectedTreatContainer>
          {selectedTreatList.map((item: any, index) => {
            return (
              <SelectedTreatItemBackground style={{marginRight: 8}}>
                <SelectedTreatItemText>
                  {'# ' + item.name}
                </SelectedTreatItemText>
                <TouchableWithoutFeedback onPress={() => deleteTreatItem(item)}>
                  <DeleteContainer>
                    <TreatItemDeleteIcon
                      source={require('~/Assets/Images/Upload/ic_delete.png')}
                    />
                  </DeleteContainer>
                </TouchableWithoutFeedback>
              </SelectedTreatItemBackground>
            );
          })}
        </SelectedTreatContainer>
        <DividerContainer />
        <TreatListContainer>
          <KeyboardAwareFlatList
            keyboardShouldPersistTaps={'always'}
            data={autoCompletedTreatList}
            renderItem={renderTreatItem}
          />
        </TreatListContainer>
      </BodyContainer>
      <FooterContainer style={{bottom: buttonBottomPadding}}>
        <AboveKeyboard>
          <FinishButtonContainer>
            <TouchableWithoutFeedback onPress={() => onPressFinishButton()}>
              <FinishButton>
                <FinishText>확인</FinishText>
              </FinishButton>
            </TouchableWithoutFeedback>
          </FinishButtonContainer>
        </AboveKeyboard>
      </FooterContainer>
    </Container>
  );
};

export default TreatSearchScreen;

/*
<FlatList
showsHorizontalScrollIndicator={false}
horizontal={true}
data={selectedTreatList}
renderItem={renderSelectedItem}/>
*/
