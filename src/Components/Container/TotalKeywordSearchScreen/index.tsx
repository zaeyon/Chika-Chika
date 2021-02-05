import React, {useEffect, useState, useRef} from 'react';
import {TouchableWithoutFeedback, FlatList} from 'react-native';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SafeAreaView from 'react-native-safe-area-view';

//Local components
import AutoCompletedTotalKeywordFlatList from '~/Components/Presentational/TotalKeywordSearchScreen/AutoCompletedTotalKeywordFlatList';
import TotalSearchResultTabView from '~/Components/Presentational/TotalKeywordSearchScreen/TotalSearchResultTabView';

// Routes
import GETAllTagSearch from '~/Routes/Search/GETAllTagSearch';
import DELETESearchRecord from '~/Routes/Search/DELETESearchRecord';
import GETTotalSearch from '~/Routes/Search/GETTotalSearch';

import {useSelector} from 'react-redux';


const ContainerView = Styled(
  (SafeAreaView as unknown) as new () => SafeAreaView,
)`
flex: 1;
background: white;
`;


const HeaderContentView = Styled.View`
width: ${wp('100%')}px;
height: ${hp('7%')}px;
align-items: center;
flex-direction: row;
background-color: #ffffff;
border-bottom-width: 0.5px;
border-color: #00D1FF;
`;
const BackIconTouchableWithoutFeedback = Styled(
  TouchableWithoutFeedback as new () => TouchableWithoutFeedback,
)`
`;

const BackIconView = Styled.View`
padding: 17px 10px 0px 16px;
height: ${hp('7%')}px;
`;

const BackIconImage = Styled.Image`
width: ${wp('6.4%')}px;
height: ${wp('6.4%')}px;
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
line-height: 24px;
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
  const [autoCompletedKeywordArr, setAutoCompletedKeywordArr] = useState([]);
  const [isVisibleAutoCompletedKeyword, setIsVisibleAutoCompletedKeyword] = useState<boolean>(true);
  const [searchResultArray, setSearchResultArray] = useState<Array<any>>([]);

  const [reviewSearchResultArray, setReviewSearchResultArray] = useState<Array<any>>(TEST_REVIEW_DATA);

  const [totalSearchOrder, setTotalSearchOrder] = useState<string>("createdAt");
  const [communitySearchOrder, setCommunitySearchOrder] = useState<string>("createdAt");
  const [reviewSearchOrder, setReviewSearchOrder] = useState<string>("createdAt");
  const [dentalSearchOrder, setDentalSearchOrder] = useState<string>("createdAt");
  const [eventSearchOrder, setEventSearchOrder] = useState<string>("createdAt");

  const currentUser = useSelector((state: any) => state.currentUser);
  const jwtToken = currentUser.jwtToken;
  const hometown = currentUser.hometown;

  const searchRecordArray = useSelector((state: any) => state.currentUser).searchRecordArray;
  


  const searchInputRef = useRef<any>();

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

            } else {
              console.log("GETAllTagSearch response", response)
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

  const deleteAllSearchRecord = () => {

    const searchId = 'all';
    const category = 'keyword';

    DELETESearchRecord({jwtToken, searchId, category})
    .then((response) => {
      console.log("DELETESearchRecord response", response);
    })
    .catch((error) => {
      console.log("DELETESearchRecord error", error);
    })
  }

  const deleteSingleSearchRecord = (id: number, category: string) => {

    const searchId = id;

    DELETESearchRecord({jwtToken, searchId, category})
    .then((response) => {
      console.log("DELETESearchRecord response", response)
    })
    .catch((error) => {
      console.log("DELETESearchRecord error", error);
    })
  }

  const searchTotalKeyword = (keyword: string) => {
    if(query.trim() === "") {

    } else {
      searchInputRef.current.blur();
      setIsVisibleAutoCompletedKeyword(false);
      setQuery(keyword);

    }
  }

  const onFocusSearchKeywordInput = () => {
    if(!isVisibleAutoCompletedKeyword) {
      setIsVisibleAutoCompletedKeyword(true);
    }
  }

  const changeSearchOrder = (value: string, type: string) => {
    if(type === "total") {
      if(value !== totalSearchOrder) {
        setTotalSearchOrder(value);
      }
    } else if(type === "community") {
      if(value !== communitySearchOrder) {
        setCommunitySearchOrder(value);
      }
    } else if(type === "review") {
      if(value !== reviewSearchOrder) {
        setReviewSearchOrder(value);
      }
    } else if(type === "dental") {
      if(value !== dentalSearchOrder) {
        setDentalSearchOrder(value);
      }
    } else if(type === "event") {
      if(value !== eventSearchOrder) {
        setEventSearchOrder(value);
      }
    }
  }

  const clearTextInput = () => {
    setQuery("");
    searchInputRef.current.clear();
    searchInputRef.current.focus();
  }

  return (
    <ContainerView forceInset={{top: 'always'}}>
      <HeaderContentView>
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
          returnKeyType={"search"}
          autoCapitalize={"none"}
          placeholder="검색어를 입력해주세요."
          placeholderTextColor="#E2E6ED"
          selectionColor="#131F3C"
          value={query}
          onChangeText={(text) => {
            setQuery(text);
          }}
          autoCorrect={false}
          autoFocus={true}
          onSubmitEditing={() => searchTotalKeyword(query)}
          onFocus={() => onFocusSearchKeywordInput()}
          />
          {query.length > 0 && (
          <TouchableWithoutFeedback onPress={() => clearTextInput()}>
          <ClearTextButtonContainer>
            <ClearTextIcon
            source={require('~/Assets/Images/Search/ic_clearText.png')}/>
          </ClearTextButtonContainer>
          </TouchableWithoutFeedback>
          )}
        </SearchInputConatinerView>
      </HeaderContentView>
      {isVisibleAutoCompletedKeyword && (
      <AutoCompletedTotalKeywordFlatList
        searchRecordArray={searchRecordArray}
        query={query}
        setQuery={setQuery}
        autoCompletedKeywordArr={autoCompletedKeywordArr}
        deleteAllSearchRecord={deleteAllSearchRecord}
        deleteSingleSearchRecord={deleteSingleSearchRecord}
        searchTotalKeyword={searchTotalKeyword}
      />
      )}
      {!isVisibleAutoCompletedKeyword && (
        <TotalSearchResultTabView
        searchResultArray={searchResultArray}
        reviewSearchResultArray={reviewSearchResultArray}
        totalSearchOrder={totalSearchOrder}
        communitySearchOrder={communitySearchOrder}
        reviewSearchOrder={reviewSearchOrder}
        dentalSearchOrder={dentalSearchOrder}
        eventSearchOrder={eventSearchOrder}
        changeSearchOrder={changeSearchOrder}/>
      )}
    </ContainerView>
  );
};

export default TotalKeywordSearchScreen;


const TEST_REVIEW_DATA = [
  {
      "id": 2,
      "starRate_cost": 5,
      "starRate_treatment": 4,
      "starRate_service": 4,
      "certifiedBill": true,
      "hits": 0,
      "treatmentDate": "2020-12-07",
      "totalCost": null,
      "createdAt": "2020-12-07T03:21:08.000Z",
      "updatedAt": "2020-12-07T03:21:08.000Z",
      "deletedAt": null,
      "userId": "fb0617b0-33c0-11eb-92de-e3fb3b4e0264",
      "dentalClinicId": 43,
      "createdDiff(second)": 352,
      "reviewCommentsNum": 0,
      "reviewLikeNum": 0,
      "viewerLikedReview": 0,
      "viewerScrapedReview": 0,
      "reviewViewNum": 1,
      "reviewDescriptions": "1 2",
      "user": {
          "nickname": "jiwon11",
          "profileImg": ""
      },
      "review_contents": [
          {
              "id": 2,
              "img_url": "https://chikachika-review-images.s3.ap-northeast-2.amazonaws.com/original/1607311267788DBAEB47D-A6A0-45E1-B09D-8B97190FC36E.heic",
              "index": 1,
              "img_before_after": "before",
              "img_width": null,
              "img_height": null
          },
          {
              "id": 1,
              "img_url": "https://chikachika-review-images.s3.ap-northeast-2.amazonaws.com/original/16073112678366055861E-DB4B-4018-95AA-B9F585C2687B.png",
              "index": 2,
              "img_before_after": "after",
              "img_width": 4288,
              "img_height": 2848
          }
      ],
      "dental_clinic": {
          "id": 43,
          "name": "시그마치과병원"
      },
      "TreatmentItems": [
          {
              "name": "복합레진",
              "review_treatment_item": {
                  "cost": 30000
              }
          },
          {
              "name": "임플란트",
              "review_treatment_item": {
                  "cost": 20000
              }
          }
      ]
  },
]

