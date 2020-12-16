import React, {useEffect, useState} from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
//Local components
import KeywordSearch from '~/Components/Presentational/KeywordSearch';
// Routes
import GETAllTagSearch from '~/Routes/Search/GETAllTagSearch';

const ContainerView = Styled.SafeAreaView`
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

  useEffect(() => {
    async function fetchData() {
      const incompleteKorean = /[ㄱ-ㅎ|ㅏ-ㅣ]/;
      if (!incompleteKorean.test(query)) {
        if (query !== '') {
          const response: any = await GETAllTagSearch(query);
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
    <ContainerView>
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
