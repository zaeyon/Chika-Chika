import React, {useState, useEffect, useRef} from 'react';
import Styled from 'styled-components/native';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  View,
  Animated,
  Keyboard,
  LayoutAnimation,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {isIphoneX, getBottomSpace} from 'react-native-iphone-x-helper';

const HashTagItemFlatList = Styled(FlatList as new () => FlatList)`
height: 71.4%;
width: 100%

`;

const HashTagCategoryFlatList = Styled(FlatList as new () => FlatList)`
height: 28.6%;
width: 100%;
background: white;
z-index: 2;
`;

const HashTagItemView = Styled(TouchableOpacity as new () => TouchableOpacity)`
padding: 4px 16px;
border-radius: 100px;
border: 0.5px solid #E5E5E5;
margin: 0px 4px;
`;

const HashTagItemText = Styled.Text`

font-size: 16px;
line-height: 28px;

`;

interface Props {
  setSearchMode: any;
}

const HashTagSearchBarView = ({setSearchMode}: Props) => {
  const translateY = useRef(new Animated.Value(-getBottomSpace())).current;
  const [bottomSpace, setBottomSpace] = useState(-(getBottomSpace() + 168));
  const [selectedHashTagCategory, setSelectedHashTagCategory] = useState('');
  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', _keyboardWillShow);
    Keyboard.addListener('keyboardWillHide', _keyboardWillHide);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardWillShow', _keyboardWillShow);
      Keyboard.removeListener('keyboardWillHide', _keyboardWillHide);
    };
  }, []);

  useEffect(() => {
    console.log(selectedHashTagCategory === '' ? 'false' : 'true');
    setSearchMode(selectedHashTagCategory);
  }, [selectedHashTagCategory]);

  const _keyboardWillShow = (e: any) => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(e.duration, LayoutAnimation.Types[e.easing]),
    );
    setBottomSpace(e.endCoordinates.height - getBottomSpace());
  };
  const _keyboardWillHide = (e: any) => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(e.duration, LayoutAnimation.Types[e.easing]),
    );
    setBottomSpace(-(e.endCoordinates.height - getBottomSpace()));
  };

  const renderHashTagCategoryView = ({item, index}) => (
    <HashTagItemView
      onPress={() => {
        setSelectedHashTagCategory(
          selectedHashTagCategory === item ? '' : item,
        );
      }}
      style={{
        backgroundColor: selectedHashTagCategory === item ? '#0075FF' : 'white',
      }}>
      <HashTagItemText
        style={{
          color: selectedHashTagCategory === item ? 'white' : '#494949',
        }}>
        {item}
      </HashTagItemText>
    </HashTagItemView>
  );
  return (
    <View
      style={{
        position: 'absolute',
        bottom: bottomSpace,
        left: 0,
        width: '100%',
        height: 168,
      }}>
      <HashTagItemFlatList />
      <HashTagCategoryFlatList
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={{
          paddingVertical: 6,
          paddingHorizontal: 12,
        }}
        horizontal
        data={['# 병원', '# 치료', '# 짜장면']}
        renderItem={renderHashTagCategoryView}
      />
    </View>
  );
};

export default HashTagSearchBarView;
