import React, {useRef, useState, useCallback, useEffect} from 'react';
import {TouchableWithoutFeedback, LayoutAnimation} from 'react-native';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import ReviewThumbnail from '~/Components/Presentational/HomeScreen/HomeReviewContent/ReviewThumbnail';

const ContainerView = Styled.View`
width: 100%;
padding: 16px 0px 8px 0px;
margin-bottom: 16px;
`;

const ContentTitleText = Styled.Text`
margin: 0px 16px;
font-weight: bold;
font-size: 17px;
line-height: 24px;
color: #131F3C;
margin-bottom: 16px;
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
  const [selectedTagFilterItem, setSelectedTagFilterItem] = useState('충치');
  const flatlistRef: any = useRef();

  const renderTagFilter = useCallback(() => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(300, 'easeInEaseOut', 'opacity'),
    );
    return (
      <TagFilterContainerView>
        {tagFilterItems.map((item: any) => (
          <TouchableWithoutFeedback
            key={item.name}
            onPress={() => {
              ReactNativeHapticFeedback.trigger('impactLight');
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
      <ContentTitleText>{`최근 올라온 ${selectedHometown} 치과 후기`}</ContentTitleText>
      {renderTagFilter()}
      <ReviewThumbnailFlatlist
        ref={flatlistRef}
        initialNumToRender={2}
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
        snapToInterval={350 + 16}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        getItemLayout={(data, index) => ({
          length: 350,
          offset: 350 * index,
          index,
        })}
      />
    </ContainerView>
  );
};

export default React.memo(HomeReviewContent);
