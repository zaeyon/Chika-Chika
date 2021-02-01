import React, {useCallback} from 'react';
import {
  TouchableWithoutFeedback,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {KeyboardAwareFlatList, KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const ContinaerView = Styled.View`
flex: 1;
background-color: #ffffff;
padding-bottom: ${hp('5.5%')}px;
`;

const BodyContentView = Styled.View`
flex: 1;
`;

const SearchResultFlatList = Styled(FlatList as new () => FlatList)`
flex: 1;
`;

const SearchResultItemView = Styled.View`
width: 100%;
height: 80px;
flex-direction: row;
align-items: center;
padding: 16px;
`;

const SearchResultItemTitleText = Styled.Text`
font-size: 20px;
`;

const RecentKeywordContainer = Styled.View`
background-color: #ffffff;
`;

const RecentKeywoardHeaderContainer = Styled.View`
flex-direction: row;
align-items: center;
justify-content: space-between;
`;

const RecentKeywordLabelContainer = Styled.Text`
padding: 12px 16px 12px 16px;
`;

const RecentKeywordLabelText = Styled.Text`
font-size: 14px;
line-height: 24px;
color: #4E525D;
`;

const RecentKeywordListContainer = Styled.View`
`;

const NoRecentKeywordContainer = Styled.View`
background-color: #ffffff;
align-items: center;
padding-top: 30px;
padding-bottom: 50px;
`;

const NoRecentKeywordText = Styled.Text`
font-size: 14px;
line-height: 24px;
color: #000000;
`;

const RepresentIcon = Styled.Image`
width: ${wp('6.4%')}px;
height: ${wp('6.4%')}px;
margin-right: 4px;
`;

const AutoCompletedKeywordItemContainer = Styled.View`
padding-top: 16px;
padding-bottom: 16px;
padding-left: 12px;
padding-right: 12px;
flex-direction: row;
align-items: center;
border-bottom-width: 0.5px;
border-color: #E2E6ED;
`;

const AutoCompletedKeywordText = Styled.Text`
font-weight: 400;
font-size: 16px;
line-height: 24px;
color: #131F3C;
`;

const SearchRecordListContainer = Styled.View`
`;

const SearchRecordItemContainer = Styled.View`
flex-direction: row;
align-items: center;
border-bottom-width: 0.5px;
border-color: #E2E6ED;
justify-content: space-between;
`;

const DeleteSearchRecordContainer = Styled.View`
padding-top: 16px;
padding-bottom: 16px;
padding-left: 12px;
padding-right: 12px;
`;

const DeleteSearchRecordIcon = Styled.Image`
width: ${wp('4.26%')}px;
height: ${wp('4.26%')}px;
`;

interface Props {
  navigation: any;
  route: any;
  query: string;
  setQuery: any;
  autoCompletedKeywordArr: any;
  deleteAllSearchRecord: () => void;
  deleteSingleSearchRecord: (id: number, category: string) => void;
  searchTotalKeyword: (keyword: string) => void;
  searchRecordArray: Array<any>;
}

const AutoCompletedTotalKeywordFlatList = ({
  navigation,
  route,
  query,
  setQuery,
  autoCompletedKeywordArr,
  deleteAllSearchRecord,
  deleteSingleSearchRecord,
  searchTotalKeyword,
  searchRecordArray,
}: Props) => {

  const renderSearchRecordItem = ({item, index}: any) => {

    if(item.category === "keyword") {
      return (
        <TouchableWithoutFeedback onPress={() => searchTotalKeyword(item.query)}>
        <SearchRecordItemContainer>
          <View
          style={{flexDirection: 'row', alignItems: 'center', paddingTop: 16, paddingBottom: 16, paddingLeft: 12, paddingRight: 12}}>
          <RepresentIcon
          source={require('~/Assets/Images/Search/ic_search2.png')}/>
          <AutoCompletedKeywordText>{item.query}</AutoCompletedKeywordText>
          </View>
          <TouchableWithoutFeedback onPress={() => deleteSingleSearchRecord(item.id, item.category)}>
          <DeleteSearchRecordContainer>
            <DeleteSearchRecordIcon
            source={require('~/Assets/Images/Search/ic_deleteRecord.png')}/>
          </DeleteSearchRecordContainer>
          </TouchableWithoutFeedback>
        </SearchRecordItemContainer>
        </TouchableWithoutFeedback>
      )
    } else {
      return (
        <View
        style={{width: 0, height: 0}}
        />
      )
    }
    
  }

  const renderResultItem = useCallback(
    ({item, index}: any) => { 

      if(item.category === "clinic") {

        const splitedItemName = item.name.split("");
        const splitedQuery = query.split("");
        const startIndex = item.name.indexOf(query);
        const endIndex = startIndex + (query.length - 1);

        return (
          <TouchableWithoutFeedback onPress={() => searchTotalKeyword(item.name)}>
          <AutoCompletedKeywordItemContainer>
            <RepresentIcon
            source={require('~/Assets/Images/Search/ic_dentalKeyword.png')}/>
            {splitedItemName.map((item: any, index: number) => {
              if(startIndex <= index && index <= endIndex && (startIndex !== -1)) {
                return (
                    <AutoCompletedKeywordText
                    style={{color: "#00D1FF"}}>{item}</AutoCompletedKeywordText>
                )
              } else {
                return (
                    <AutoCompletedKeywordText>{item}</AutoCompletedKeywordText>
                )
              }
            }
            )}
          </AutoCompletedKeywordItemContainer>
          </TouchableWithoutFeedback>
        )
      } else if(item.category === "city") {

        const splitedItemName  = item.emdName.split("");
        const startIndex = item.emdName.indexOf(query);
        const endIndex = startIndex + (query.length - 1);

        return (
          <TouchableWithoutFeedback onPress={() => searchTotalKeyword(item.emdName)}>
          <AutoCompletedKeywordItemContainer>
            <RepresentIcon
            source={require('~/Assets/Images/Search/ic_locationKeyword.png')}/>
            {splitedItemName.map((item: any, index: number) => {
              if(startIndex <= index && index <= endIndex && (startIndex !== -1)) {
                return (
                    <AutoCompletedKeywordText
                    style={{color: "#00D1FF"}}>{item}</AutoCompletedKeywordText>
                )
              } else {
                return (
                    <AutoCompletedKeywordText>{item}</AutoCompletedKeywordText>
                )
              }
            }
            )}
          </AutoCompletedKeywordItemContainer>
          </TouchableWithoutFeedback>
        )
      } else if(item.category === "treatment") {

        const splitedItemName = item.name.split("");
        const startIndex = item.name.indexOf(query);
        const endIndex = startIndex + (query.length - 1);

        return (
          <TouchableWithoutFeedback onPress={() => searchTotalKeyword(item.name)}>
          <AutoCompletedKeywordItemContainer>
            <RepresentIcon
            source={require('~/Assets/Images/Search/ic_symptomKeyword.png')}/>
            {splitedItemName.map((item: any, index: number) => {
              if(startIndex <= index && index <= endIndex && (startIndex !== -1)) {
                return (
                    <AutoCompletedKeywordText
                    style={{color: "#00D1FF"}}>{item}</AutoCompletedKeywordText>
                )
              } else {
                return (
                    <AutoCompletedKeywordText>{item}</AutoCompletedKeywordText>
                )
              }
            }
            )}
          </AutoCompletedKeywordItemContainer>
          </TouchableWithoutFeedback>
        )
      } else {

        return (
          <View
          style={{
            width:0,
            height:0,
          }}/>
        )
      }
  }, [query]);

  // const renderFrequentTerms = useCallback(() => (

  // ), [])

  return (
    <ContinaerView>
      <View style={{backgroundColor: "#F5F7F9", flex: 1}}>
      <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{backgroundColor: "#F5F7F9"}}
      keyboardShouldPersistTaps={"always"}
      bounces={false}
      alwaysBounceVertical={false}>
      <BodyContentView>
        {query === "" && (
        <RecentKeywordContainer>
          <RecentKeywoardHeaderContainer>
            <RecentKeywordLabelContainer>
              <RecentKeywordLabelText>{"최근 검색어"}</RecentKeywordLabelText>
            </RecentKeywordLabelContainer>
            <TouchableWithoutFeedback onPress={() => deleteAllSearchRecord()}>
            <RecentKeywordLabelContainer>
              <RecentKeywordLabelText
              style={{color: "#9AA2A9"}}>{"전체삭제"}</RecentKeywordLabelText>
            </RecentKeywordLabelContainer>
            </TouchableWithoutFeedback>
          </RecentKeywoardHeaderContainer>
          {searchRecordArray.length === 0 && (
          <NoRecentKeywordContainer>
            <NoRecentKeywordText>{"💡최근 검색 내역이 없습니다."}</NoRecentKeywordText>
          </NoRecentKeywordContainer>
          )}
          {searchRecordArray.length > 0 && (
          <SearchRecordListContainer>
            <FlatList
            keyboardShouldPersistTaps={"always"}
            showsVerticalScrollIndicator={false}
            bounces={false}
            alwaysBounceVertical={false}
            data={searchRecordArray}
            renderItem={renderSearchRecordItem}/>
          </SearchRecordListContainer>
          )}
        </RecentKeywordContainer>
        )}
        {query !== "" && (
        <SearchResultFlatList
          keyboardShouldPersistTaps={"always"}
          showsVerticalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={{backgroundColor: "#ffffff"}}
          alwaysBounceVertical={false}
          keyboardDismissMode="none"
          scrollEnabled={false}
          data={autoCompletedKeywordArr}
          keyExtractor={(item) => item.name}
          renderItem={renderResultItem}
        />
        )}
      </BodyContentView>
      </KeyboardAwareScrollView>
      </View>
    </ContinaerView>
  );
};

export default React.memo(AutoCompletedTotalKeywordFlatList);
