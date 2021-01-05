import React, {useState, useEffect, useRef} from 'react';
import Styled from 'styled-components/native';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  TouchableHighlight,
  FlatList,
  View,
  Animated,
  Keyboard,
  LayoutAnimation,
  UIManager,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {isIphoneX, getBottomSpace} from 'react-native-iphone-x-helper';

const HashTagItemFlatList = Styled(FlatList as new () => FlatList)`
width: 100%
border-top-width: 1px;
border-color: #DADADA;
`;

const ActivityIndicatorContianerView = Styled.View`
width: 100%;
height: 50px;

align-items: center;
justify-content: center;
`;
const HashTagCategoryFlatList = Styled(FlatList as new () => FlatList)`
height: ${hp('5.91%')}px;
width: 100%;
background: white;
z-index: 2;
`;

const HashTagItemView = Styled.View`
width: 100%;
height: ${hp('7.39%')}px;
border-bottom-width: 1px;
border-color: #DADADA;
flex-direction: row;
align-items: center;
padding: 0px 16px;
`;

const HashTagItemIconImage = Styled.Image`
width: 22px;
height: 22px;
margin-right: 8px;
`;

const HashTagItemNameText = Styled.Text`
margin-right: 4px;
font-size: 18px;
line-height: 28px;`;

const HashTagItemLocationText = Styled.Text`
font-size: 14px;
line-height: 28px;
color: #0075FF;
`;

const HashTagCategoryView = Styled(
  TouchableOpacity as new () => TouchableOpacity,
)`
padding: 0px 16px;
border-radius: 100px;
border: 0.5px solid #E5E5E5;
margin: 0px 4px;
`;

const HashTagCategoryText = Styled.Text`
margin: auto 0px;
font-size: 16px;
line-height: 28px;
`;

interface Props {
  suggestionList: any;
  searchQuery: any;
  completeCurrentHashTag: any;
  isLoading: boolean;
}

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const SuggestionBarView = ({
  suggestionList,
  searchQuery,
  completeCurrentHashTag,
  isLoading,
}: Props) => {
  const [bottomSpace, setBottomSpace] = useState(-(getBottomSpace() + 168));

  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', _keyboardWillShow);
    Keyboard.addListener('keyboardWillHide', _keyboardWillHide);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardWillShow', _keyboardWillShow);
      Keyboard.removeListener('keyboardWillHide', _keyboardWillHide);
    };
  }, []);

  const _keyboardWillShow = (e: any) => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        e.duration,
        LayoutAnimation.Types[e.easing],
        LayoutAnimation.Properties.opacity,
      ),
    );
    setBottomSpace(e.endCoordinates.height - getBottomSpace());
  };
  const _keyboardWillHide = (e: any) => {
    setBottomSpace(-(e.endCoordinates.height - getBottomSpace()));
  };

  const renderHashTagItemView = ({item, index}: any) => {
    console.log(item);
    return (
      <TouchableHighlight
        activeOpacity={1}
        underlayColor="#EEEEEE"
        onPress={() => {
          completeCurrentHashTag(
            item.category === 'city' ? item.fullCityName : item.name,
          );
        }}>
        <HashTagItemView>
          <HashTagItemIconImage
            source={require('~/Assets/Images/Category/hospital.png')}
          />
          <HashTagItemNameText>
            <HashTagItemNameText
              style={{
                color: '#0075FF',
              }}>
              {searchQuery}
            </HashTagItemNameText>
            {item.category === 'city'
              ? item.fullCityName?.slice(searchQuery.length)
              : item.name?.slice(searchQuery.length)}
          </HashTagItemNameText>
          <HashTagItemLocationText>
            {item.category === 'city'
              ? item.sido + ' ' + item.sigungu + ' ' + item.adCity
              : item.address?.split(' ').slice(0, 2).join(' ')}
          </HashTagItemLocationText>
        </HashTagItemView>
      </TouchableHighlight>
    );
  };

  return (
    <View
      style={{
        position: 'absolute',
        bottom: bottomSpace,
        left: 0,
        width: '100%',
        flex: 1,
      }}>
      {isLoading && searchQuery !== '' ? (
        <ActivityIndicatorContianerView>
          <ActivityIndicator size="small" />
        </ActivityIndicatorContianerView>
      ) : (
        <HashTagItemFlatList
          keyboardShouldPersistTaps={'handled'}
          style={{
            backgroundColor: 'white',
            height: Math.min(2, suggestionList.length) * hp('7.39%'),
          }}
          data={suggestionList}
          renderItem={renderHashTagItemView}
        />
      )}
    </View>
  );
};

export default SuggestionBarView;
