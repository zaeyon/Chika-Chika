import React from 'react';
import {
  TouchableWithoutFeedback,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ContinaerView = Styled.View`
flex: 1;
background: white;
padding-bottom: ${hp('5.5%')}px;
`;
const HeaderContentView = Styled.View`
width: ${wp('100%')}px;
height: ${hp('8.128%')}px
align-items: center;
flex-direction: row;
padding: 0px 16px 0px 0px;
border-bottom-width: 1px;
border-color: #EEEEEE;
`;
const BackIconTouchableOpacity = Styled(
  TouchableOpacity as new () => TouchableOpacity,
)`
padding: 0px 16px 0px 16px;
height: 40px;
`;

const BackIconView = Styled.View`
width: 12px;
height: 100%;
`;

const BackIconImage = Styled.Image`
height: 100%;
`;

const SearchInputConatinerView = Styled.View`
flex: 1;
height: ${hp('4.926%')}px;
background: #F2F2F2;
border-radius: 4px;
padding: 8px;
flex-direction: row;
align-items: center;
`;
const SearchTextInput = Styled.TextInput`
flex: 1;
font-size: 16px;
line-height: 19px;
`;

const SearchIcon = Styled.Image`
width: ${wp('6.4%')}px;
height: ${wp('6.4%')}px;
margin-right: 8px;
`;

const BodyContentView = Styled.View`
flex: 1;
background: white;
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

interface Props {
  navigation: any;
  route: any;
  query: string;
  setQuery: any;
  searchResults: any;
}

const KeywordSearch = ({
  navigation,
  route,
  query,
  setQuery,
  searchResults,
}: Props) => {
  const renderResultItem = ({item, index}: any) => (
    <TouchableHighlight
      activeOpacity={1}
      underlayColor="#EEEEEE"
      onPress={() => {}}>
      <SearchResultItemView>
        <SearchResultItemTitleText>{item.name}</SearchResultItemTitleText>
      </SearchResultItemView>
    </TouchableHighlight>
  );

  return (
    <ContinaerView>
      <HeaderContentView>
        <BackIconTouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <BackIconView>
            <BackIconImage
              style={{
                resizeMode: 'contain',
              }}
              source={require('~/Assets/Images/Arrow/ic_leftArrow.png')}
            />
          </BackIconView>
        </BackIconTouchableOpacity>
        <SearchInputConatinerView>
          <SearchIcon
            source={require('~/Assets/Images/Search/ic_search.png')}
          />
          <SearchTextInput
            placeholder="병원, 지역을 검색해 보세요."
            placeholderTextColor="#979797"
            clearButtonMode="always"
            value={query}
            onChangeText={(text) => {
              setQuery(text);
            }}
            autoCorrect={false}
            autoFocus={true}
          />
        </SearchInputConatinerView>
      </HeaderContentView>
      <BodyContentView>
        <SearchResultFlatList
          alwaysBounceVertical={false}
          keyboardDismissMode="on-drag"
          data={searchResults}
          keyExtractor={(item) => item.name}
          renderItem={renderResultItem}
        />
      </BodyContentView>
    </ContinaerView>
  );
};

export default React.memo(KeywordSearch);
