import React, {useEffect, useState, useRef, useCallback} from 'react';
import {TouchableWithoutFeedback, Platform} from 'react-native';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SafeAreaView from 'react-native-safe-area-view';

//Local components
import AutoCompletedTotalKeywordFlatList from '~/Components/Presentational/AutoCompletedKeywordFlatList';
import TotalSearchResultTabView from '~/Components/Presentational/TotalKeywordSearchScreen/TotalSearchResultTabView';

// Routes
import GETAllTagSearch from '~/Routes/Search/GETAllTagSearch';
import GETTotalSearch from '~/Routes/Search/GETTotalSearch';
import GETSearchRecord from '~/Routes/Search/GETSearchRecord';
import DELETESearchRecord from '~/Routes/Search/DELETESearchRecord';
import POSTSearchRecord from '~/Routes/Search/POSTSearchRecord';

import {useSelector, useDispatch} from 'react-redux';
import allActions from '~/actions';

import {hasNotch, getStatusBarHeight} from '~/method/deviceInfo';

const ContainerView = Styled.View`
flex: 1;
background: white;
`;

const HeaderBar = Styled.View`
 width: ${wp('100%')}px;
 padding-top: ${Platform.OS === 'ios' ? getStatusBarHeight() : 0}px;
 flex-direction: row;
 justify-content: space-between;
 border-bottom-width: 0.5px;
 border-color: #E2E6ED;
 background-color: #ffffff;
 border-bottom-width: 1px;
  border-color: #00D1FF;
 z-index: 3;
`;

const BodyContent = Styled.View`
flex: 1;
`;

const BackIconTouchableWithoutFeedback = Styled(
  TouchableWithoutFeedback as new () => TouchableWithoutFeedback,
)`
`;

const BackIconView = Styled.View`
padding: 17px 10px 16px 16px;
align-items: center;
justify-content: center;
`;

const BackIconImage = Styled.Image`
`;

const SearchInputConatinerView = Styled.View`
flex: 1;
background: #ffffff;
flex-direction: row;
align-items: center;
`;
const SearchTextInput = Styled.TextInput`
flex: 1;
font-weight: 700;
font-size: 21px;
color: #131F3C;
`;

const ClearTextButtonContainer = Styled.View`
justify-content: center;
height: ${hp('7%')}px;
margin-left: 16px;
padding-right: 16px;
`;

const ClearTextIcon = Styled.Image`
width: ${wp('5.3%')}px;
height: ${wp('5.3%')}px;
`;

interface Props {
  navigation: any;
  route: any;
}

const TotalKeywordSearchScreen = ({navigation, route}: Props) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [autoCompletedKeywordArr, setAutoCompletedKeywordArr] = useState([]);
  const [
    isVisibleAutoCompletedKeyword,
    setIsVisibleAutoCompletedKeyword,
  ] = useState<boolean>(true);

  const dispatch = useDispatch();
  const jwtToken = useSelector((state: any) => state.currentUser.jwtToken);

  const searchRecordArray = useSelector(
    (state: any) => state.currentUser.searchRecordArray,
  );

  const searchInputRef = useRef<any>();

  useEffect(() => {
    if(route?.params?.redirected){
      searchTotalKeyword(route.params.redirectionBody)
      navigation.setParams({
        redirected: false,
        redirectionBody: null,
      })
    }
    GETSearchRecord({jwtToken, isUnified: true})
      .then((response: any) => {
        console.log('GETSearchRecord response', response);
        dispatch(allActions.userActions.setSearchRecord(response));
      })
      .catch((error) => {
        console.log('GETSearchRecord error', error);
      });
  }, []);

  useEffect(() => {
    async function fetchData() {
      const incompleteKorean = /[ㄱ-ㅎ|ㅏ-ㅣ]/;
      if (!incompleteKorean.test(query)) {
        if (query !== '') {
          const response: any = await GETAllTagSearch(
            jwtToken,
            query,
          );
          setQuery((prev) => {
            if (prev !== query) {
              console.log('diff');
            } else {
              console.log('GETAllTagSearch response', response);
              setAutoCompletedKeywordArr(response);
            }
            return prev;
          });
        } else {
          setAutoCompletedKeywordArr([]);
        }
      }
    }
    fetchData();
  }, [query]);

  const fetchSearchResult = useCallback(
    (
      {
        lat,
        long,
        pathType,
        region,
        cityId,
        order,
        offset,
        limit,
      },
      callback = () => console.log('callback'),
    ) => {

      GETTotalSearch({
        lat,
        long,
        jwtToken,
        query,
        pathType,
        limit: String(limit),
        offset: String(offset),
        order,
        region,
        cityId: String(cityId),
        isUnified: true,
      })
        .then((response: any) => {
          console.log("GETTotalSearch response", response);
          
          callback(response);
        })
        .catch((e) => {
          console.log('fetch search result error', e);
          callback([])
        });
    },
    [jwtToken, query],
  );

  const deleteAllSearchRecord = () => {
    const searchId = 'all';
    dispatch(allActions.userActions.setSearchRecord([]));

    DELETESearchRecord({jwtToken, searchId, unified: true})
      .then((response) => {})
      .catch((error) => {
        console.log('DELETESearchRecord error', error);
      });
  };

  const deleteSingleSearchRecord = (id: number, category: string) => {
    const searchId = id;
    dispatch(allActions.userActions.deleteSearchRecord(searchId));
    DELETESearchRecord({jwtToken, searchId})
      .then((response) => {})
      .catch((error) => {
        console.log('DELETESearchRecord error', error);
      });
  };

  const searchTotalKeyword = useCallback(
    ({
      query,
      category,
    }: {
      query: string;
      category: string;
    }) => {
      // if (query.trim() === '') {
      // } else {

      setQuery(query);
      setCategory(category);
      searchInputRef.current.blur();
      setIsVisibleAutoCompletedKeyword(false);
      if (!route?.params?.redirected) {
      POSTSearchRecord({
        jwtToken,
        tagCategory: category,
        query,
      }).then((response: any) => {
        GETSearchRecord({jwtToken, isUnified: true})
          .then((response: any) => {
            console.log('GETSearchRecord response', response);
            dispatch(allActions.userActions.setSearchRecord(response));
          })
          .catch((error) => {
            console.log('GETSearchRecord error', error);
          });
      });
    }
      // }
    },
    [jwtToken, route],
  );

  const onFocusSearchKeywordInput = () => {
    if (!isVisibleAutoCompletedKeyword) {
      setIsVisibleAutoCompletedKeyword(true);
    }
  };

  const clearTextInput = useCallback(() => {
    setQuery('');
    searchInputRef.current.clear();
    searchInputRef.current.focus();
  }, []);

  return (
    <ContainerView>
      <HeaderBar>
        <BackIconTouchableWithoutFeedback
          onPress={() => {
            navigation.goBack();
          }}>
          <BackIconView>
            <BackIconImage
              source={require('~/Assets/Images/Search/ic_back.png')}
            />
          </BackIconView>
        </BackIconTouchableWithoutFeedback>
        <SearchInputConatinerView>
          <SearchTextInput
            ref={searchInputRef}
            returnKeyType={'search'}
            autoCapitalize={'none'}
            placeholder="검색어를 입력해주세요."
            placeholderTextColor="#E2E6ED"
            selectionColor="#131F3C"
            value={query}
            onChangeText={(text) => {
              setQuery(text);
            }}
            autoCorrect={false}
            autoFocus={!(route?.params?.redirected)}
            onSubmitEditing={() => searchTotalKeyword({query, category: 'text'})}
            onFocus={() => onFocusSearchKeywordInput()}
          />
          {query.length > 0 && (
            <TouchableWithoutFeedback onPress={() => clearTextInput()}>
              <ClearTextButtonContainer>
                <ClearTextIcon
                  source={require('~/Assets/Images/Search/ic_clearText.png')}
                />
              </ClearTextButtonContainer>
            </TouchableWithoutFeedback>
          )}
        </SearchInputConatinerView>
      </HeaderBar>
      <BodyContent>
        {isVisibleAutoCompletedKeyword ? (
          <AutoCompletedTotalKeywordFlatList
            searchRecordArray={searchRecordArray}
            inputQuery={query}
            autoCompletedKeywordArr={autoCompletedKeywordArr}
            deleteAllSearchRecord={deleteAllSearchRecord}
            deleteSingleSearchRecord={deleteSingleSearchRecord}
            searchTotalKeyword={searchTotalKeyword}
          />
        ) : (
          <TotalSearchResultTabView
            fetchSearchResult={fetchSearchResult}
            navigation={navigation}
          />
        )}
      </BodyContent>
    </ContainerView>
  );
};

export default TotalKeywordSearchScreen;
