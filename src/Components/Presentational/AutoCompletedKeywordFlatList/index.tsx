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
background-color: #ffffff;
min-height: ${hp('100%')}px;
flex: 1;
`;

const BodyContainer = Styled.View`
flex: 1;
background-color: #F5F7F9;
`;


const SearchResultFlatList = Styled(FlatList as new () => FlatList)`
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

const SearchRecordContentView = Styled.View`
flex: 1;
  flex-direction: row;
  align-items: center;
  padding: 16px 12px;
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
  query: string;
  autoCompletedKeywordArr: any;
  deleteAllSearchRecord: () => void;
  deleteSingleSearchRecord: (id: number, category: string) => void;
  searchTotalKeyword: (keyword: string, category: string) => void;
  searchRecordArray: Array<any>;
}

const AutoCompletedKeywordFlatList = ({
  query,
  autoCompletedKeywordArr,
  deleteAllSearchRecord,
  deleteSingleSearchRecord,
  searchTotalKeyword,
  searchRecordArray,
}: Props) => {

  const renderSearchRecordItem = ({item, index}: any) => {

    const renderIcon = (category: string) => {
      switch (category) {
        case 'clinic':
          return require('~/Assets/Images/Search/ic_dentalKeyword.png');
        case 'city':
          return require('~/Assets/Images/Search/ic_locationKeyword.png');
        case 'treatment':
          return require('~/Assets/Images/Search/ic_treatmentKeyword.png');
        case 'symptom':
          return require('~/Assets/Images/Search/ic_symptomKeyword.png');
        case 'general':
          return require('~/Assets/Images/Search/ic_generalKeyword.png');
        default:
          return require('~/Assets/Images/Search/ic/ic_search2.png');
      }
    };

    if(item.category === 'clinic' || item.category === 'city') {
      return (
        <TouchableHighlight
          underlayColor="#F5F7F9"
          style={{
            backgroundColor: '#FFFFFF',
          }}
          onPress={() => searchTotalKeyword(item.query, item.category)}>
          <SearchRecordItemContainer>
            <SearchRecordContentView>
              <RepresentIcon source={renderIcon(item.category)} />
              <AutoCompletedKeywordText>{item.query}</AutoCompletedKeywordText>
            </SearchRecordContentView>
            <TouchableWithoutFeedback
              onPress={() => deleteSingleSearchRecord(item.id, item.category)}>
              <DeleteSearchRecordContainer>
                <DeleteSearchRecordIcon
                  source={require('~/Assets/Images/Search/ic_deleteRecord.png')}
                />
              </DeleteSearchRecordContainer>
            </TouchableWithoutFeedback>
          </SearchRecordItemContainer>
        </TouchableHighlight>
      );
    }
  };

  const renderResultItem = useCallback(
    ({item, index}: any) => {
      

      console.log("자동완성 키워드 렌더링");

      if(item.category === "clinic") {

        const splitedItemName = item.name.split("");
        const splitedQuery = query.split("");
        const startIndex = item.name.indexOf(query);
        const endIndex = startIndex + (query.length - 1);

        return (
          <TouchableWithoutFeedback onPress={() => searchTotalKeyword(item.name, item.category)}>
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

        const splitedItemName  = item.fullName?.split("");
        const startIndex = item.fullName?.indexOf(query);
        const endIndex = startIndex + (query.length - 1);

        return (
          <TouchableWithoutFeedback onPress={() => searchTotalKeyword(item.fullName, item.category)}>
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
          <TouchableWithoutFeedback onPress={() => searchTotalKeyword(item.name, item.category)}>
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
      <BodyContainer>
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
          {searchRecordArray?.length === 0 && (
          <NoRecentKeywordContainer>
            <NoRecentKeywordText>{"💡최근 검색 내역이 없습니다."}</NoRecentKeywordText>
          </NoRecentKeywordContainer>
          )}
          {searchRecordArray?.length > 0 && (
          <SearchRecordListContainer>
            <FlatList
            contentContainerStyle={{paddingBottom: hp('28%')}}
            keyboardShouldPersistTaps={"always"}
            keyboardDismissMode="on-drag"
            showsVerticalScrollIndicator={false}
            bounces={false}
            alwaysBounceVertical={false}
            data={searchRecordArray}
            renderItem={renderSearchRecordItem}
            keyExtractor={(item: any, index: number) => `${index}`}/>
          </SearchRecordListContainer>
          )}
        </RecentKeywordContainer>
        )}
        {query !== "" && (
        <SearchResultFlatList
          keyboardShouldPersistTaps={"handled"}
          showsVerticalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={{backgroundColor: "#ffffff"}}
          alwaysBounceVertical={false}
          keyboardDismissMode="on-drag"
          scrollEnabled={true}
          data={autoCompletedKeywordArr}
          keyExtractor={(item: any, index: number) => `${index}`}
          renderItem={renderResultItem}
        />
        )}
        </BodyContainer>
    </ContinaerView>
  );
};

export default React.memo(AutoCompletedKeywordFlatList);


/*
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
          {searchRecordArray?.length === 0 && (
          <NoRecentKeywordContainer>
            <NoRecentKeywordText>{"💡최근 검색 내역이 없습니다."}</NoRecentKeywordText>
          </NoRecentKeywordContainer>
          )}
          {searchRecordArray?.length > 0 && (
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
          keyboardShouldPersistTaps={"never"}
          showsVerticalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={{backgroundColor: "#ffffff"}}
          alwaysBounceVertical={false}
          keyboardDismissMode="on-drag"
          scrollEnabled={true}
          data={autoCompletedKeywordArr}
          keyExtractor={(item: any, index: number) => item.name + index}
          renderItem={renderResultItem}
        />
        )}
      </BodyContentView>
*/
