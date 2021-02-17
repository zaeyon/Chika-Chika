import React, {useEffect, useState, useCallback} from 'react';
import {TouchableOpacity, ImageBackground, LayoutAnimation} from 'react-native';
import Styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ContainerView = Styled.View`
width: 100%;
padding: 16px 16px 8px 16px;
margin-bottom: 16px;
`;

const ContentTitleText = Styled.Text`
font-weight: bold;
font-size: 14px;
line-height: 24px;
color: #131F3C;
margin-bottom: 16px;
`;

const TagFilterContainerView = Styled.View`
flex-direction: row;
margin-bottom: 16px;
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

const ReviewThumbnailContainerView = Styled.View`
width: 100%;
height: auto;
flex-direction: row;
flex-wrap: wrap;
`;

const ReviewThumbnailText = Styled.Text`
font-weight: 500;
font-size: 14px;
line-height: 24px;
color: #FFFFFF;
position: absolute;
left: 12px;
bottom: 12px;
`;

interface Props {
  selectedHometown: string;
  tagFilterItems: any;
  reviewData: any;
}

const HomeReviewContent = ({
  selectedHometown,
  tagFilterItems,
  reviewData,
}: Props) => {
  const [selectedTagFilterItem, setSelectedTagFilterItem] = useState('충치');

  const renderTagFilter = useCallback(
    () => (
      <TagFilterContainerView>
        {tagFilterItems.map((item) => (
          <TouchableOpacity onPress={() => setSelectedTagFilterItem(item.name)}>
            {selectedTagFilterItem === item.name ? (
              <TagFilterSelectedContentView>
                <TagFilterSelectedContentText>
                  {`#${item.name}`}
                </TagFilterSelectedContentText>
              </TagFilterSelectedContentView>
            ) : (
              <TagFilterContentView>
                <TagFilterContentText>{`#${item.name}`}</TagFilterContentText>
              </TagFilterContentView>
            )}
          </TouchableOpacity>
        ))}
      </TagFilterContainerView>
    ),
    [tagFilterItems, selectedTagFilterItem],
  );

  const renderReviewThumbnail = useCallback(() => {
    const selectedReviewData = reviewData.find(
      (item) => item.name === selectedTagFilterItem,
    );
    return (
      selectedReviewData &&
      selectedReviewData.data.map((item: any, index: number) => {
        console.log(item);
        return (
          <ImageBackground
            style={{
              width:
                ((wp('100%') - 40) / 3) * (index === 0 || index === 3 ? 2 : 1),
              height: (wp('100%') - 40) / 3,
              marginBottom: 8,
              marginRight: index === 0 || index === 2 ? 8 : 0,
            }}
            imageStyle={{borderRadius: 12}}
            source={{
              uri: item.review_contents[0] ? item.review_contents[0].img_url : "",
              cache: 'force-cache',
            }}>
            <LinearGradient
              colors={['#FFFFFF00', '#FFFFFF00', '#00000050', '#000000']}
              style={{
                flex: 1,

                borderRadius: 12,
              }}
            />
            <ReviewThumbnailText numberOfLines={1}>
              {item.reviewDescriptions}
            </ReviewThumbnailText>
          </ImageBackground>
        );
      })
    );
  }, [reviewData, selectedTagFilterItem]);

  return (
    <ContainerView>
      <ContentTitleText>{`👀 최근 올라온 ${selectedHometown} 치과 후기`}</ContentTitleText>
      {renderTagFilter()}
      <ReviewThumbnailContainerView>
        {renderReviewThumbnail()}
      </ReviewThumbnailContainerView>
    </ContainerView>
  );
};

export default HomeReviewContent;
