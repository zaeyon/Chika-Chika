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
    keyword,
    searchQuery,
    category,
    tagId,
  }: {
    keyword: string;
    category: string;
    searchQuery?: string;
    tagId: string;
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
  console.log("AutoCompletedTotalKeywordFlatList autoCompletedKeywordArr", autoCompletedKeywordArr);
  const renderSearchRecordItem = ({item, index}: any) => {
    console.log("renderSearchRecordItem item", item);
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
    return (
      <TouchableHighlight
        underlayColor="#F5F7F9"
        style={{
          backgroundColor: '#FFFFFF',
        }}
        onPress={() =>
          searchTotalKeyword({
            keyword: item.inputQuery,
            searchQuery: item.searchQuery,
            category: item.category,
            tagId: item.id,
          })
        }>
        <SearchRecordItemContainer>
          <SearchRecordContentView>
            <RepresentIcon source={renderIcon(item.category)} />
            <AutoCompletedKeywordText>{item.inputQuery}</AutoCompletedKeywordText>
            {item.category === 'city' && (
            <AutoCompletedKeywordDescriptionView>
              <AutoCompletedKeywordDescriptionText>{item.searchQuery}</AutoCompletedKeywordDescriptionText>
            </AutoCompletedKeywordDescriptionView>
            )}
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
      if (item.category === 'clinic') {
        const splitedItemName = item.originalName.split('');
        const splitedQuery = inputQuery.split('');
        const startIndex = item.originalName.indexOf(inputQuery);
        const endIndex = startIndex + (inputQuery.length - 1);

        return (
          <TouchableHighlight
            underlayColor="#F5F7F9"
            style={{
              backgroundColor: '#FFFFFF',
            }}
            onPress={() =>
              searchTotalKeyword({
                keyword: item.originalName,
                searchQuery: item.originalName,
                category: item.category,
                tagId: item.id,
              })
            }>
            <AutoCompletedKeywordItemContainer>
              <RepresentIcon
                source={require('~/Assets/Images/Search/ic_dentalKeyword.png')}
              />
              {splitedItemName.map((item: any, index: number) => {
                if (
                  startIndex <= index &&
                  index <= endIndex &&
                  startIndex !== -1
                ) {
                  return (
                    <AutoCompletedKeywordText
                      style={{color: '#00D1FF'}}
                      key={item + String(index)}>
                      {item}
                    </AutoCompletedKeywordText>
                  );
                } else {
                  return (
                    <AutoCompletedKeywordText key={item + String(index)}>
                      {item}
                    </AutoCompletedKeywordText>
                  );
                }
              })}
              <AutoCompletedKeywordDescriptionView>
                <AutoCompletedKeywordDescriptionText numberOfLines={1}>
                  {item.local}
                </AutoCompletedKeywordDescriptionText>
              </AutoCompletedKeywordDescriptionView>
            </AutoCompletedKeywordItemContainer>
          </TouchableHighlight>
        );
      } else if (item.category === 'city') {
        const splitedItemName = item.name.split('');
        const startIndex = item.name.indexOf(inputQuery);
        const endIndex = startIndex + (inputQuery.length - 1);

        const splitedAddress = item.fullAddress.split('');
        const addressStartIndex = item.fullAddress.indexOf(inputQuery);
        const addressEndIndex = addressStartIndex + (inputQuery.length - 1);

        return (
          <TouchableHighlight
            underlayColor="#F5F7F9"
            style={{
              backgroundColor: '#FFFFFF',
            }}
            onPress={() =>
              searchTotalKeyword({
                keyword: item.name,
                searchQuery: item.fullAddress,
                category: item.category,
                tagId: -1,
              })
            }>
            <AutoCompletedKeywordItemContainer>
              <RepresentIcon
                source={require('~/Assets/Images/Search/ic_locationKeyword.png')}
              />
              {splitedItemName.map((item: any, index: number) => {
                if (
                  startIndex <= index &&
                  index <= endIndex &&
                  startIndex !== -1
                ) {
                  return (
                    <AutoCompletedKeywordText
                      style={{color: '#00D1FF'}}
                      key={item + String(index)}>
                      {item}
                    </AutoCompletedKeywordText>
                  );
                } else {
                  return (
                    <AutoCompletedKeywordText key={item + String(index)}>
                      {item}
                    </AutoCompletedKeywordText>
                  );
                }
              })}
              <AutoCompletedKeywordDescriptionView>
                {splitedAddress.map((item: any, index: number) => {
                  if (
                    addressStartIndex <= index &&
                    index <= addressEndIndex &&
                    addressStartIndex !== -1
                  ) {
                    return (
                      <AutoCompletedKeywordDescriptionText
                        style={{color: '#00D1FF'}}
                        key={item + String(index)}>
                        {item}
                      </AutoCompletedKeywordDescriptionText>
                    );
                  } else {
                    return (
                      <AutoCompletedKeywordDescriptionText
                        key={item + String(index)}>
                        {item}
                      </AutoCompletedKeywordDescriptionText>
                    );
                  }
                })}
              </AutoCompletedKeywordDescriptionView>
            </AutoCompletedKeywordItemContainer>
          </TouchableHighlight>
        );
      } else if (item.category === 'treatment') {
        const splitedItemName = item.name.split('');
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
                keyword: item.name,
                category: item.category,
                tagId: item.id,
              })
            }>
            <AutoCompletedKeywordItemContainer>
              <RepresentIcon
                source={require('~/Assets/Images/Search/ic_treatmentKeyword.png')}
              />
              {splitedItemName.map((item: any, index: number) => {
                if (
                  startIndex <= index &&
                  index <= endIndex &&
                  startIndex !== -1
                ) {
                  return (
                    <AutoCompletedKeywordText
                      style={{color: '#00D1FF'}}
                      key={item + String(index)}>
                      {item}
                    </AutoCompletedKeywordText>
                  );
                } else {
                  return (
                    <AutoCompletedKeywordText key={item + String(index)}>
                      {item}
                    </AutoCompletedKeywordText>
                  );
                }
              })}
            </AutoCompletedKeywordItemContainer>
          </TouchableHighlight>
        );
      } else if (item.category === 'symptom') {
        const splitedItemName = item.name.split('');
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
                keyword: item.name,
                category: item.category,
                tagId: item.id,
              })
            }>
            <AutoCompletedKeywordItemContainer>
              <RepresentIcon
                source={require('~/Assets/Images/Search/ic_symptomKeyword.png')}
              />
              {splitedItemName.map((item: any, index: number) => {
                if (
                  startIndex <= index &&
                  index <= endIndex &&
                  startIndex !== -1
                ) {
                  return (
                    <AutoCompletedKeywordText
                      style={{color: '#00D1FF'}}
                      key={item + String(index)}>
                      {item}
                    </AutoCompletedKeywordText>
                  );
                } else {
                  return (
                    <AutoCompletedKeywordText key={item + String(index)}>
                      {item}
                    </AutoCompletedKeywordText>
                  );
                }
              })}
            </AutoCompletedKeywordItemContainer>
          </TouchableHighlight>
        );
      } else if (item.category === 'general') {
        const splitedItemName = item.name.split('');
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
                keyword: item.name,
                category: item.category,
                tagId: item.id,
              })
            }>
            <AutoCompletedKeywordItemContainer>
              <RepresentIcon
                source={require('~/Assets/Images/Search/ic_generalKeyword.png')}
              />
              {splitedItemName.map((item: any, index: number) => {
                if (
                  startIndex <= index &&
                  index <= endIndex &&
                  startIndex !== -1
                ) {
                  return (
                    <AutoCompletedKeywordText
                      style={{color: '#00D1FF'}}
                      key={item + String(index)}>
                      {item}
                    </AutoCompletedKeywordText>
                  );
                } else {
                  return (
                    <AutoCompletedKeywordText key={item + String(index)}>
                      {item}
                    </AutoCompletedKeywordText>
                  );
                }
              })}
            </AutoCompletedKeywordItemContainer>
          </TouchableHighlight>
        );
      } else {
        return (
          <View
            style={{
              width: 0,
              height: 0,
            }}
          />
        );
      }
    },
    [inputQuery],
  );

  // const renderFrequentTerms = useCallback(() => (

  // ), [])

  const renderListHeader = useCallback(() => {}, []);

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
          ListHeaderComponent={renderListHeader()}
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="on-drag"
          data={autoCompletedKeywordArr}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderResultItem}
        />
      )}
    </ContinaerView>
  );
};

export default React.memo(AutoCompletedTotalKeywordFlatList);
