import React, {useState, useEffect, useRef, useCallback} from 'react';
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

const ContainerView = Styled.View`
position: absolute;
left: 0px;
width: 100%;
flex: 1;
box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);
`;
const HashTagItemFlatList = Styled.FlatList`
width: 100%
background: #FFFFFF
`;

const ActivityIndicatorContianerView = Styled.View`
width: 100%;
height: 50px;

align-items: center;
justify-content: center;
`;

const HashTagItemView = Styled.View`
width: 100%;
height: ${hp('7.39%')}px;
border-bottom-width: 0.5px;
border-color: #E2E6ED;
flex-direction: row;
align-items: center;
padding: 0px 16px;
`;

const HashTagItemIconImage = Styled.Image`
width: 32px;
height: 32px;
margin-bottom: 1px;
margin-right: 4px;
`;

const HashTagItemNameText = Styled.Text`
margin-right: 4px;

font-style: normal;
font-weight: bold;
font-size: 16px;
`;

const HashTagItemLocationText = Styled.Text`

font-style: normal;
font-weight: bold;
font-size: 12px;
line-height: 16px;
color: #9AA2A9;
`;

const HashTagCategoryView = Styled.TouchableOpacity`
padding: 0px 16px;
border-radius: 100px;
border: 0.5px #E5E5E5;
margin: 0px 4px;
`;

const HashTagCategoryText = Styled.Text`
margin: auto 0px;
font-size: 16px;
line-height: 28px;
`;

interface Props {
  suggestionList: Tag[];
  searchQuery: any;
  completeCurrentHashTag: any;
  isLoading: boolean;
}

interface Tag {
  id: number;
  name: string | undefined;
  category: string;
  postNum: number;
  address: string | undefined;
  sido: string | undefined;
  sigungu: string | undefined;
  emdName: string | undefined;
  adCity: string | undefined;
  fullCityName: string | undefined;
  relativeAddress: string | undefined;
}

interface IconDictionary {
  [key: string]: string | undefined;
  city: any;
  clinic: any;
  symptom: any;
  treatment: any;
  general: any;
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
  const [iconDic, SetIconDic] = useState<IconDictionary>({
    city: require('~/Assets/Images/Community/communitylist/location.png'),
    clinic: require('~/Assets/Images/Community/communitylist/hospital.png'),
    symptom: require('~/Assets/Images/Community/communitylist/symptom.png'),
    treatment: require('~/Assets/Images/Community/communitylist/treatment.png'),
    general: require('~/Assets/Images/Community/communitylist/common.png'),
  });
  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', _keyboardWillShow);
    Keyboard.addListener('keyboardWillHide', _keyboardWillHide);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardWillShow', _keyboardWillShow);
      Keyboard.removeListener('keyboardWillHide', _keyboardWillHide);
    };
  }, []);

  const _keyboardWillShow = useCallback((e: any) => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        200,
        LayoutAnimation.Types.keyboard,
        LayoutAnimation.Properties.opacity,
      ),
    );
    setBottomSpace(e.endCoordinates.height - getBottomSpace());
  }, []);

  const _keyboardWillHide = useCallback((e: any) => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(200, LayoutAnimation.Types.keyboard, 'opacity'),
    );
    setBottomSpace(0);
  }, []);

  const renderHashTagItemView = useCallback(
    ({item, index}: {item: Tag; index: number}) => {
      if (
        item.category === 'city' &&
        item.fullCityName?.includes(searchQuery)
      ) {
        return (
          <TouchableHighlight
            activeOpacity={1}
            underlayColor="#EEEEEE"
            onPress={() => {
              completeCurrentHashTag(item.fullCityName);
            }}>
            <HashTagItemView style={{borderTopWidth: index === 0 ? 0.5 : 0}}>
              <HashTagItemIconImage source={iconDic[item.category]} />
              <HashTagItemNameText>
                <HashTagItemNameText
                  style={{
                    color: '#00D1FF',
                  }}>
                  {searchQuery}
                </HashTagItemNameText>
                {item.fullCityName?.slice(searchQuery.length)}
              </HashTagItemNameText>
              <HashTagItemLocationText>
                {item.sido + ' ' + item.sigungu + ' ' + item.adCity}
              </HashTagItemLocationText>
            </HashTagItemView>
          </TouchableHighlight>
        );
      } else if (item.category !== 'city' && item.name?.includes(searchQuery)) {
        return (
          <TouchableHighlight
            activeOpacity={1}
            underlayColor="#EEEEEE"
            onPress={() => {
              completeCurrentHashTag(item.name);
            }}>
            <HashTagItemView style={{borderTopWidth: index === 0 ? 0.5 : 0}}>
              <HashTagItemIconImage source={iconDic[item.category]} />
              <HashTagItemNameText>
                <HashTagItemNameText
                  style={{
                    color: '#00D1FF',
                  }}>
                  {searchQuery}
                </HashTagItemNameText>
                {item.name?.slice(searchQuery.length)}
              </HashTagItemNameText>
              <HashTagItemLocationText>
                {item.address?.split(' ').slice(0, 2).join(' ')}
              </HashTagItemLocationText>
            </HashTagItemView>
          </TouchableHighlight>
        );
      }
    },
    [searchQuery, iconDic],
  );
  return (
    <ContainerView
      style={{
        bottom: bottomSpace,
      }}>
      {isLoading && searchQuery !== '' ? (
        <ActivityIndicatorContianerView>
          <ActivityIndicator size="small" />
        </ActivityIndicatorContianerView>
      ) : (
        <HashTagItemFlatList
          keyboardShouldPersistTaps={'handled'}
          alwaysBounceVertical={false}
          style={{
            height: Math.min(3, suggestionList.length) * hp('7.39%'),
          }}
          data={suggestionList}
          renderItem={renderHashTagItemView}
        />
      )}
    </ContainerView>
  );
};

export default SuggestionBarView;
