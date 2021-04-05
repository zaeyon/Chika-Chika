import React, {useCallback, useEffect} from 'react';
import {
  TouchableWithoutFeedback,
  FlatList,
  TouchableHighlight,
  LayoutAnimation,
  View,
} from 'react-native';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ContinaerView = Styled.View`
width: ${wp('100%')}px;
height: 100%;
position: absolute;
background-color: #F5F7F9;
z-index: 1;
`;

const SearchResultFlatList = Styled.FlatList`
width: ${wp('100%')}px;
height: 100%;
position: absolute;
background: #F5F7F9;
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

const AutoCompletedKeywordDescriptionView = Styled.View`
margin-left: 8px;
flex-direction: row;
`;

const AutoCompletedKeywordDescriptionText = Styled.Text`
font-weight: normal;
font-size: 12px;
line-height: 16px;
color: #9AA2A9;
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
padding: 16px;
`;

const DeleteSearchRecordIcon = Styled.Image`
width: ${wp('4.26%')}px;
height: ${wp('4.26%')}px;
`;

const ListHeaderContainerView = Styled.View`
width: ${wp('100%')}px;
height: 150px;

margin-top:-150px;
align-items: center;
justify-content: center;
`;

const ListHeaderContentText = Styled.Text`
font-size: 30px;
font-weight: 600;
`;

interface Props {
  inputQuery: string;
  autoCompletedKeywordArr: any;
  deleteAllSearchRecord: () => void;
  deleteSingleSearchRecord: (id: number, category: string) => void;
  searchTotalKeyword: ({
    query,
    category,
  }: {
    query: string;
    category: string;
  }) => void;
  searchRecordArray: Array<any>;
}

const AutoCompletedTotalKeywordFlatList = ({
  inputQuery,
  autoCompletedKeywordArr,
  deleteAllSearchRecord,
  deleteSingleSearchRecord,
  searchTotalKeyword,
  searchRecordArray,
}: Props) => {

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

  const renderSearchRecordItem = ({item, index}: any) => {
    console.log('renderSearchRecordItem item', item);
    
    return (
      <TouchableHighlight
        underlayColor="#F5F7F9"
        style={{
          backgroundColor: '#FFFFFF',
        }}
        onPress={() =>
          searchTotalKeyword({
            query: item.query,
            category: item.category,
          })
        }>
        <SearchRecordItemContainer>
          <SearchRecordContentView>
            <RepresentIcon source={renderIcon(item.category)} />
            <AutoCompletedKeywordText>
              {item.query}
            </AutoCompletedKeywordText>
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
  };

  const renderResultItem = useCallback(
    ({item, index}: any) => {
        const startIndex = item.name.indexOf(inputQuery);
        const endIndex = startIndex + (inputQuery.length - 1);

        return (
          <TouchableHighlight
            underlayColor="#F5F7F9"
            style={{
              backgroundColor: '#FFFFFF',
            }}
            onPress={() =>
              searchTotalKeyword({
                query: item.name,
                category: item.category,
              })
            }>
            <AutoCompletedKeywordItemContainer>
              <RepresentIcon
                source={renderIcon(item.category)}
              />
              {startIndex !== -1 ? (
                <>
                  <AutoCompletedKeywordText key={item.name + String(1)}>
                    {item.name.slice(0, startIndex)}
                  </AutoCompletedKeywordText>
                  <AutoCompletedKeywordText
                    key={item.name + String(2)}
                    style={{color: '#00D1FF'}}>
                    {item.name.slice(startIndex, endIndex + 1)}
                  </AutoCompletedKeywordText>
                  <AutoCompletedKeywordText key={item.name + String(3)}>
                    {item.name.slice(endIndex + 1)}
                  </AutoCompletedKeywordText>
                </>
              ) : (
                <AutoCompletedKeywordText key={item.name + String(1)}>
                  {item.name}
                </AutoCompletedKeywordText>
              )}

            </AutoCompletedKeywordItemContainer>
          </TouchableHighlight>
        ); 
    },
    [inputQuery],
  );

  return (
    <ContinaerView>
      <RecentKeywordContainer>
        <RecentKeywoardHeaderContainer>
          <RecentKeywordLabelContainer>
            <RecentKeywordLabelText>{'최근 검색어'}</RecentKeywordLabelText>
          </RecentKeywordLabelContainer>
          <TouchableWithoutFeedback onPress={() => deleteAllSearchRecord()}>
            <RecentKeywordLabelContainer>
              <RecentKeywordLabelText style={{color: '#9AA2A9'}}>
                {'전체삭제'}
              </RecentKeywordLabelText>
            </RecentKeywordLabelContainer>
          </TouchableWithoutFeedback>
        </RecentKeywoardHeaderContainer>
        {searchRecordArray.length === 0 ? (
          <NoRecentKeywordContainer>
            <NoRecentKeywordText>
              {'💡최근 검색 내역이 없습니다.'}
            </NoRecentKeywordText>
          </NoRecentKeywordContainer>
        ) : (
          <FlatList
            style={{
              backgroundColor: '#F5F7F9',
              height: '100%',
            }}
            keyboardShouldPersistTaps="always"
            keyboardDismissMode="on-drag"
            data={searchRecordArray}
            renderItem={renderSearchRecordItem}
            keyExtractor={(item) => String(item.id)}
          />
        )}
      </RecentKeywordContainer>
      {inputQuery !== '' && (
        <SearchResultFlatList
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="on-drag"
          data={autoCompletedKeywordArr}
          keyExtractor={(item, index) => String(index)}
          renderItem={renderResultItem}
        />
      )}
    </ContinaerView>
  );
};

export default React.memo(AutoCompletedTotalKeywordFlatList);
