import React, {useEffect, useState, useRef, useCallback} from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SafeAreaView from 'react-native-safe-area-view';
import {getStatusBarHeight} from 'react-native-status-bar-height';

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

import {hasNotch} from '~/method/deviceInfo';

const ContainerView = Styled.View`
flex: 1;
background: white;
`;

const HeaderBar = Styled.View`
 width: ${wp('100%')}px;
 padding-top: ${hasNotch() ? getStatusBarHeight() : 0}px;
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
  const [inputQuery, setInputQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [tagId, setTagId] = useState('');
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
      if (!incompleteKorean.test(inputQuery)) {
        if (inputQuery !== '') {
          const response: any = await GETAllTagSearch(
            jwtToken,
            inputQuery,
            'keywordSearch',
          );
          setInputQuery((prev) => {
            if (prev !== inputQuery) {
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
  }, [inputQuery]);

  const fetchSearchResult = useCallback(
    (
      {
        lat,
        long,
        pathType,
        communityType,
        region,
        cityId,
        order,
        offset,
        limit,
      },
      callback = () => console.log('callback'),
    ) => {
      console.log('searchQuery:', searchQuery);

      GETTotalSearch({
        lat,
        long,
        jwtToken,
        searchQuery,
        inputQuery,
        category,
        tagId,
        pathType,
        communityType,
        limit: String(limit),
        offset: String(offset),
        order,
        region,
        cityId: String(cityId),
        isUnified: true,
      })
        .then((response: any) => {
          callback(response);
        })
        .catch((e) => {
          console.log('fetch search result error', e);
        });
    },
    [jwtToken, searchQuery, inputQuery, category, tagId, route],
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
      keyword,
      searchQuery = '',
      category,
      tagId,
    }: {
      keyword: string;
      searchQuery?: string;
      category: string;
      tagId: string;
    }) => {
      console.log('keyword', keyword, 'category', category, 'tagId', tagId);
      // if (inputQuery.trim() === '') {
      // } else {

      setInputQuery(keyword);
      setSearchQuery(searchQuery);
      setCategory(category);
      setTagId(tagId);
      searchInputRef.current.blur();
      setIsVisibleAutoCompletedKeyword(false);
      if (!route?.params?.redirected) {
      POSTSearchRecord({
        jwtToken,
        tagCategory: category,
        targetId: category === 'city' ? '' : tagId,
        sq: searchQuery,
        iq: keyword,
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
    if (!isVisibleAutoCompletedKeyword && !route.params.redirected) {
      setIsVisibleAutoCompletedKeyword(true);
    }
  };

  const clearTextInput = useCallback(() => {
    setInputQuery('');
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
            value={inputQuery}
            onChangeText={(text) => {
              setInputQuery(text);
            }}
            autoCorrect={false}
            autoFocus={!(route?.params?.redirected)}
            onSubmitEditing={() => searchInputRef.current.blur()}
            onFocus={() => onFocusSearchKeywordInput()}
          />
          {inputQuery.length > 0 && (
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
            inputQuery={inputQuery}
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
