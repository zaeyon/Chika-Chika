import React, {useEffect, useState} from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SafeAreaView from 'react-native-safe-area-view';
//Local components
import KeywordSearch from '~/Components/Presentational/KeywordSearch';
// Routes
import GETAllTagSearch from '~/Routes/Search/GETAllTagSearch';
import {useSelector} from 'react-redux';

const ContainerView = Styled(
  (SafeAreaView as unknown) as new () => SafeAreaView,
)`
flex: 1;
background: white;
`;

interface Props {
  navigation: any;
  route: any;
}

const KeywordSearchScreen = ({navigation, route}: Props) => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const currentUser = useSelector((state: any) => state.currentUser);
  const jwtToken = currentUser.jwtToken;

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
              setSearchResults(response);
            }
            return prev;
          });
        } else {
          setSearchResults([]);
        }
      }
    }
    fetchData();
  }, [query]);

  return (
    <ContainerView forceInset={{top: 'always'}}>
      <KeywordSearch
        navigation={navigation}
        route={route}
        query={query}
        setQuery={setQuery}
        searchResults={searchResults}
      />
    </ContainerView>
  );
};

export default KeywordSearchScreen;
