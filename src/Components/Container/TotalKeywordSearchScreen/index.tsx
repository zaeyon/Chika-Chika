import React, {useEffect, useState, useRef, useCallback} from 'react';
import {TouchableWithoutFeedback, LayoutAnimation} from 'react-native';
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

import {useSelector, useDispatch} from 'react-redux';
import allActions from '~/actions';

const ContainerView = Styled(
  (SafeAreaView as unknown) as new () => SafeAreaView,
)`
flex: 1;
background: white;
`;

const HeaderBar = Styled.View`
 width: ${wp('100%')}px;
 height: ${wp('14.1%') + getStatusBarHeight()}px;
 margin-top: ${-getStatusBarHeight()}px;
 padding-top: ${getStatusBarHeight()}px;
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
padding: 0px 10px 0px 16px;
align-items: center;
justify-content: center;
`;

const BackIconImage = Styled.Image`
`;

const SearchInputConatinerView = Styled.View`
flex: 1;
background: #ffffff;
padding-right: 16px;
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
position: absolute;
right: 0px;
justify-content: center;
height: ${hp('7%')}px;
padding-left: 16px;
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
  const [tagId, setTagId] = useState('');
  const [autoCompletedKeywordArr, setAutoCompletedKeywordArr] = useState([]);
  const [
    isVisibleAutoCompletedKeyword,
    setIsVisibleAutoCompletedKeyword,
  ] = useState<boolean>(true);
  const [searchResult, setSearchResult] = useState<Array<any>>([]);
  const [reviewSearchResult, setReviewSearchResult] = useState<Array<any>>(
    TEST_REVIEW_DATA,
  );
  const communitySearchResult = useSelector(
    (state: any) => state.communityPostList.SearchResultPosts,
  );
  const [clinicSearchResult, setClinicSearchResult] = useState([]);
  const [eventSearchResult, setEventSearchResult] = useState([]);

  const dispatch = useDispatch();
  const jwtToken = useSelector((state: any) => state.currentUser.jwtToken);

  const searchRecordArray = useSelector(
    (state: any) => state.currentUser.searchRecordArray,
  );

  const searchInputRef = useRef<any>();

  useEffect(() => {
    GETSearchRecord({jwtToken})
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
            'keywordSearch',
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
        communityType,
        region,
        cityId,
        order,
        offset,
        limit,
      },
      callback = () => console.log('callback'),
    ) => {
      console.log('query:', query);
      if (query === '') {
        console.log('query is empty!', query);
        return;
      } else {
        GETTotalSearch({
          lat,
          long,
          jwtToken,
          query,
          category,
          tagId,
          pathType,
          communityType,
          limit: String(limit),
          offset: String(offset),
          order,
          region,
          cityId: String(cityId),
        })
          .then((response: any) => {
            console.log("GETTotalSearch response", response);
            callback(response);
          })
          .catch((e) => {
            console.log('fetch search result error', e);
          });
      }
    },
    [jwtToken, query, category, tagId],
  );

  const deleteAllSearchRecord = () => {
    const searchId = 'all';

    DELETESearchRecord({jwtToken, searchId})
      .then((response) => {
        GETSearchRecord({jwtToken})
          .then((response: any) => {
            console.log('GETSearchRecord response', response);
            dispatch(allActions.userActions.setSearchRecord(response));
          })
          .catch((error) => {
            console.log('GETSearchRecord error', error);
          });
      })
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
      category,
      tagId,
    }: {
      keyword: string;
      category: string;
      tagId: string;
    }) => {
      // if (query.trim() === '') {
      // } else {
      
      searchInputRef.current.blur();
      setIsVisibleAutoCompletedKeyword((prev) => {
        setQuery(keyword);
        setCategory(category);
        setTagId(tagId);

        return false;
      });
      // }
    },
    [],
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
    <ContainerView forceInset={{top: 'always'}}>
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
            autoFocus={true}
            onSubmitEditing={() => searchInputRef.current.blur()}
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
            navigation={navigation}
            route={route}
            query={query}
            setQuery={setQuery}
            autoCompletedKeywordArr={autoCompletedKeywordArr}
            deleteAllSearchRecord={deleteAllSearchRecord}
            deleteSingleSearchRecord={deleteSingleSearchRecord}
            searchTotalKeyword={searchTotalKeyword}
          />
        ) : (
          <TotalSearchResultTabView
            searchResult={searchResult}
            reviewSearchResult={reviewSearchResult}
            communitySearchResult={communitySearchResult}
            fetchSearchResult={fetchSearchResult}
            navigation={navigation}
          />
        )}
      </BodyContent>
    </ContainerView>
  );
};

export default TotalKeywordSearchScreen;

const TEST_REVIEW_DATA = [
  {
    id: 2,
    starRate_cost: 5,
    starRate_treatment: 4,
    starRate_service: 4,
    certifiedBill: true,
    hits: 0,
    treatmentDate: '2020-12-07',
    totalCost: null,
    createdAt: '2020-12-07T03:21:08.000Z',
    updatedAt: '2020-12-07T03:21:08.000Z',
    deletedAt: null,
    userId: 'fb0617b0-33c0-11eb-92de-e3fb3b4e0264',
    dentalClinicId: 43,
    'createdDiff(second)': 352,
    reviewCommentsNum: 0,
    reviewLikeNum: 0,
    viewerLikedReview: 0,
    viewerScrapedReview: 0,
    reviewViewNum: 1,
    reviewDescriptions: '1 2',
    user: {
      nickname: 'jiwon11',
      profileImg: '',
    },
    review_contents: [
      {
        id: 2,
        img_url:
          'https://chikachika-review-images.s3.ap-northeast-2.amazonaws.com/original/1607311267788DBAEB47D-A6A0-45E1-B09D-8B97190FC36E.heic',
        index: 1,
        img_before_after: 'before',
        img_width: null,
        img_height: null,
      },
      {
        id: 1,
        img_url:
          'https://chikachika-review-images.s3.ap-northeast-2.amazonaws.com/original/16073112678366055861E-DB4B-4018-95AA-B9F585C2687B.png',
        index: 2,
        img_before_after: 'after',
        img_width: 4288,
        img_height: 2848,
      },
    ],
    dental_clinic: {
      id: 43,
      name: '시그마치과병원',
    },
    TreatmentItems: [
      {
        name: '복합레진',
        review_treatment_item: {
          cost: 30000,
        },
      },
      {
        name: '임플란트',
        review_treatment_item: {
          cost: 20000,
        },
      },
    ],
  },
];
