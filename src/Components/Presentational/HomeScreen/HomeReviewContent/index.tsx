import React, {useRef, useState, useCallback, useEffect} from 'react';
import {
  TouchableWithoutFeedback,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import ReviewThumbnail from '~/Components/Presentational/HomeScreen/HomeReviewContent/ReviewThumbnail';

const ContainerView = Styled.View`
width: 100%;
flex: 1;
padding: 21px 0px 8px 0px;
margin-bottom: 16px;
`;

const ContentTitleView = Styled.View`
width: auto;
flex-direction: row;
align-items: center;
margin: 0px 16px;
margin-bottom: 21px;
`;

const ContentTitleText = Styled.Text`
font-style: normal;
font-weight: bold;
font-size: 18px;
line-height: 24px;
color: #131F3C;
`;

const ContentTitleImage = Styled.Image`
margin-left: auto;
margin-right: 12px;
`;

const TagFilterContainerView = Styled.View`
flex-direction: row;
margin: 0px 16px 16px 16px;
`;

const TagFilterSelectedContentView = Styled.View`
border-width: 1px;
border-color: #131F3C;
border-radius: 100px;
padding: 4px 16px;
margin-right: 4px;
`;

const TagFilterSelectedContentText = Styled.Text`
font-weight: 500;
font-size: 14px;
line-height: 24px;
color: #131F3C;
`;

const TagFilterContentView = Styled.View`
background: #F5F7F9;
border-width: 1px;
border-color: #F5F7F9;
border-radius: 100px;
padding: 4px 16px;
margin-right: 4px;
`;

const TagFilterContentText = Styled.Text`
font-weight: 500;
font-size: 14px;
line-height: 24px;
color: #4E525D;
`;

const ReviewThumbnailFlatlist = Styled.FlatList`
width: 100%;
height: auto;
flex-direction: row;
overflow: visible;
`;

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface Props {
  selectedHometown: string;
  tagFilterItems: any;
  reviewData: any;
  moveToReviewDetail: any;
}

const HomeReviewContent = ({
  selectedHometown,
  tagFilterItems,
  reviewData,
  moveToReviewDetail,
}: Props) => {
  const [selectedTagFilterItem, setSelectedTagFilterItem] = useState('스케일링');
  const flatlistRef: any = useRef();

  const renderTagFilter = useCallback(() => {
    return (
      <TagFilterContainerView>
        {tagFilterItems.map((item: any) => (
          <TouchableWithoutFeedback
            key={item.name}
            onPress={() => {
              ReactNativeHapticFeedback.trigger('selection');
              setSelectedTagFilterItem(item.name);
              flatlistRef.current.scrollToOffset({
                offset: 0,
                animated: false,
              });
            }}>
            {selectedTagFilterItem === item.name ? (
              <TagFilterSelectedContentView>
                <TagFilterSelectedContentText>
                  {`${item.name}`}
                </TagFilterSelectedContentText>
              </TagFilterSelectedContentView>
            ) : (
              <TagFilterContentView>
                <TagFilterContentText>{`${item.name}`}</TagFilterContentText>
              </TagFilterContentView>
            )}
          </TouchableWithoutFeedback>
        ))}
      </TagFilterContainerView>
    );
  }, [tagFilterItems, selectedTagFilterItem]);

  const renderReviewThumbnail = useCallback(
    ({item}: any) => (
      <ReviewThumbnail review={item} moveToReviewDetail={moveToReviewDetail} />
    ),
    [],
  );

  return (
    <ContainerView>
      <TouchableWithoutFeedback>
      <ContentTitleView>
        <ContentTitleText>{`최근 올라온 치아교정 리뷰`}</ContentTitleText>
      </ContentTitleView>
      </TouchableWithoutFeedback>
      <ReviewThumbnailFlatlist
        ref={flatlistRef}
        contentContainerStyle={{
          paddingLeft: 16,
        }}
        data={
          reviewData &&
          reviewData.find((data: any) => data.name === selectedTagFilterItem)
            ?.data
        }
        renderItem={renderReviewThumbnail}
        keyExtractor={(item: any) => String(item.id)}
        horizontal
        snapToAlignment="start"
        snapToInterval={wp('79%') + 16}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        
      />
    </ContainerView>
  );
};

export default React.memo(HomeReviewContent);
