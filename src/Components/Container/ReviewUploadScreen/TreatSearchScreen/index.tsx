import React, {useState, useEffect, useRef} from 'react';
import Styled from 'styled-components/native';
import SafeAreaView from 'react-native-safe-area-view';
import {
  TouchableWithoutFeedback,
  FlatList,
  Keyboard,
  StyleSheet,
  Alert
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {NavigationContainer} from '@react-navigation/native';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';
import AboveKeyboard from 'react-native-above-keyboard';
//import DeviceInfo from 'react-native-device-info';
import {hasNotch} from '~/method/deviceInfo'

// Local Components
import NavigationHeader from '~/Components/Presentational/NavigationHeader';

// route
import GETTreatmentSearch from '~/Routes/Search/GETTreatmentSearch';

const Container = Styled.View`
 flex: 1;
 background-color: #FFFFFF;
 align-items: center;
`;

const SearchContainer = Styled.View`
 z-index: 1;
 width: ${wp('100%')}px;
 padding: 12px 16px 12px 16px;
 background-color: #F5F7F9;
`;

const BodyContainer = Styled.View`
align-items: center;
padding-bottom: ${hasNotch() ? hp('3%') : hp('14%')}px;
`;

const SearchInputContainer = Styled.View`
border-radius: 8px;
background-color: #ffffff;
flex-direction: row;
align-items: center;
padding: 8px;
`;

const SearchIcon = Styled.Image`
width: ${wp('5.3%')}px;
height: ${wp('5.3%')}px;
`;

const SearchTextInput = Styled.TextInput`
flex: 1;
background-color: #ffffff;
margin-left: 8px;
font-weight: 400;
font-size: 14px;
`;

const TreatListContainer = Styled.View`
`;

const TreatItemContainer = Styled.View`
`;

const SelectedTreatContainer = Styled.View`
width: ${wp('100%')}px;
background-color: #ffffff;
padding-top: 16px;
padding-bottom: 8px;
padding-left: 16px;
padding-right: 16px;
flex-direction: row;
flex-wrap: wrap;
border-bottom-width: 8px;
border-color: #F5F7F9;
`;

const DividerContainer = Styled.View`
width: ${wp('100%')}px;
height: ${wp('4.26%')}px;
background-color: #f6f7f8
`;

const TreatItemNameText = Styled.Text`
font-weight: 400;
font-size: 14px;
line-height: 16px;
`;

const TreatItemAddContainer = Styled.View`
padding: 16px 16px 16px 16px;
background-color: #ffffff;
`;

const TreatItemAddText = Styled.Text`
color: #00D1FF;
font-weight: 400;
font-size: 14px;
`;

const SelectedTreatItemBackground = Styled.View`
margin-bottom: 8px;
padding-left: 12px;
padding-top: 4px;
padding-bottom: 4px;
background-color: #ffffff;
border-width: 1px;
border-color: #E2E6ED;
border-radius: 100px;
flex-direction: row;
align-items: center;
`;

const SelectedTreatItemText = Styled.Text`
color: #131F3C;
font-weight: 400;
font-size: 16px;
line-height: 24px;
`;

const DeleteTreatItemContainer = Styled.View`
padding-right: 12px;
padding-left: 4px;
padding-top: 4px;
padding-bottom: 4px;
`;

const TreatItemDeleteIcon = Styled.Image`
padding-left: 4px;
padding-right: 12px;
width: ${wp('4.8%')}px;
height: ${wp('4.8%')}px;
`;

const DeleteContainer = Styled.View`
padding-top: 7px;
padding-bottom: 7px; 
`;

const TreatBodyContainer = Styled.View`
width: ${wp('100%')}px;
padding-top: 4px;
padding-left: 16px;
padding-right: 0px;
flex-direction: row;
align-items: center;
justify-content: space-between;
background-color: #ffffff;
`;

const HorizontalDividerContainer = Styled.View`
margin-top: 4px;
padding-left: 16px;
padding-right: 16px;
`;

const HorizontalDivider = Styled.View`
height: 1px;
background-color: #F5F7F9;
`;

const TechnicalNameText = Styled.Text`
color: #9AA2A9;
font-weight: 400;
font-size: 13px;
line-height: 16px;
`;

interface Props {
  navigation: any;
  route: any;
}

interface Treatment {
  name: string;
  id: number;
}

let inputText = '';

const TreatSearchScreen = ({navigation, route}: Props) => {
  const [selectedTreatmentArray, setSelectedTreatmentArray] = useState<
    Array<Object>
  >([]);
  const [onChangeSelectedTreatList, setOnChangeSelectedTreatList] = useState<
    boolean
  >(false);
  const [
    autoCompletedTreatmentArray,
    setAutoCompletedTreatmentArray,
  ] = useState<Array<Treatment>>([]);
  const [isActivatedFinish, setIsActivatedFinish] = useState<boolean>(false);

  const treatmentSearchInputRef = useRef<any>();

  useEffect(() => {
    if (route.params?.selectedTreatmentArray) {
      setSelectedTreatmentArray(route.params?.selectedTreatmentArray);
    }
  }, [route.params?.selectedTreatmentArray]);

  useEffect(() => {
    if (selectedTreatmentArray.length > 0 && !isActivatedFinish) {
      setIsActivatedFinish(true);
    } else if (selectedTreatmentArray.length === 0 && isActivatedFinish) {
      setIsActivatedFinish(false);
    }
  }, [selectedTreatmentArray]);

  const selectTreatItem = (treat: object, index: number) => {

    console.log("selectTreatItem treat", treat);
    console.log("selectTreatItem selectedTreatmentArray", selectedTreatmentArray);

    treatmentSearchInputRef.current.clear();
    var tmpSelectedTreatmentArray = selectedTreatmentArray.slice();

    const isExistIndex = tmpSelectedTreatmentArray.findIndex((item, index) => (treat.usualName === item.usualName))

    console.log("selectTreatItem isExistIndex", isExistIndex);

    if(isExistIndex !== -1) {
      Alert.alert('이미 등록된 항목입니다.');
    } else {
      tmpSelectedTreatmentArray.push(treat);
      setSelectedTreatmentArray(tmpSelectedTreatmentArray);
  
      var tmpAutoCompletedTreatmentArray = autoCompletedTreatmentArray.slice();
      tmpAutoCompletedTreatmentArray.splice(index, 1);
      setAutoCompletedTreatmentArray(tmpAutoCompletedTreatmentArray);
    }
  };

  const deleteTreatItem = (treat: object) => {
    var tmpSelectedTreatmentArray = selectedTreatmentArray.slice();
    var deleteIndex = tmpSelectedTreatmentArray.indexOf(treat);

    tmpSelectedTreatmentArray.splice(deleteIndex, 1);
    setSelectedTreatmentArray(tmpSelectedTreatmentArray);
  };

  const onPressFinishButton = () => {
    navigation.navigate('ReviewMetaDataScreen', {
      selectedTreatmentArray: selectedTreatmentArray,
    });
  };

  const onChangeTreatInput = (text: string) => {
    inputText = text;

    if (text === '') {
      setAutoCompletedTreatmentArray([]);
    } else {
      GETTreatmentSearch(text)
        .then(function (response: any) {
          console.log('GETTreatmentSearch response', response);
          // response.forEach((item: any, index: any) => {
          //   console.log('item', item);
          //   console.log('selectedTreatList', selectedTreatList);
          // });

          if (inputText === text) {
            setAutoCompletedTreatmentArray(response);
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
        <TreatBodyContainer>
          <TreatItemNameText>{'# ' + item.usualName}
          <TechnicalNameText>{" " + item.technicalName}</TechnicalNameText>
          </TreatItemNameText>
          <TouchableWithoutFeedback
            onPress={() => selectTreatItem(item, index)}>
            <TreatItemAddContainer>
              <TreatItemAddText>추가</TreatItemAddText>
            </TreatItemAddContainer>
          </TouchableWithoutFeedback>
        </TreatBodyContainer>
        <HorizontalDividerContainer>
          <HorizontalDivider />
        </HorizontalDividerContainer>
      </TreatItemContainer>
    );
  };

  return (
    <Container>
      <NavigationHeader
        headerLeftProps={{type: 'arrow', onPress: goBack}}
        headerTitle={'질병 및 치료 항목'}
        headerRightProps={{
          type: 'text',
          text: '완료',
          onPress: onPressFinishButton,
        }}
        headerRightActiveColor={'#00D1FF'}
        headerRightDisabled={!isActivatedFinish}
      />
      <SearchContainer style={styles.searchInputShadow}>
        <SearchInputContainer>
          <SearchIcon
            style={{tintColor: '#4E525D'}}
            source={require('~/Assets/Images/Search/ic_search.png')}
          />
          <SearchTextInput
            ref={treatmentSearchInputRef}
            selectionColor={'#00D1FF'}
            autoCapitalize={'none'}
            autoFocus={true}
            placeholder={'질병 이름, 치료 항목을 검색하세요.'}
            placeholderTextColor={'#9AA2A9'}
            onChangeText={(text: string) => onChangeTreatInput(text)}
          />
        </SearchInputContainer>
      </SearchContainer>
      <BodyContainer>
        {selectedTreatmentArray.length > 0 && (
          <SelectedTreatContainer>
            {selectedTreatmentArray.map((item: any, index: number) => {
              return (
                <SelectedTreatItemBackground
                  key={index}
                  style={{marginRight: 8}}>
                  <SelectedTreatItemText>
                    {'# ' + item.usualName}
                  </SelectedTreatItemText>
                  <TouchableWithoutFeedback
                    onPress={() => deleteTreatItem(item)}>
                    <DeleteTreatItemContainer>
                      <TreatItemDeleteIcon
                        source={require('~/Assets/Images/Upload/ic_delete.png')}
                      />
                    </DeleteTreatItemContainer>
                  </TouchableWithoutFeedback>
                </SelectedTreatItemBackground>
              );
            })}
          </SelectedTreatContainer>
        )}
        <TreatListContainer>
          <FlatList
            keyboardDismissMode={'on-drag'}
            keyboardShouldPersistTaps={'always'}
            data={autoCompletedTreatmentArray}
            renderItem={renderTreatItem}
          />
        </TreatListContainer>
      </BodyContainer>
    </Container>
  );
};

const styles = StyleSheet.create({
  searchInputShadow: {
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 12,
    shadowOpacity: 0.1,
  },
});

export default TreatSearchScreen;

/*
<FlatList
showsHorizontalScrollIndicator={false}
horizontal={true}
data={selectedTreatList}
renderItem={renderSelectedItem}/>
*/

/*
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
*/
