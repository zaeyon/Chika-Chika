import React, {useMemo, useState, useCallback} from 'react';
import {TouchableOpacity, ImageBackground, LayoutAnimation} from 'react-native';
import Styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

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
max-width: 80%;
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

  const renderTagFilter = useCallback(
    () => (
      <TagFilterContainerView>
        {tagFilterItems.map((item) => (
          <TouchableOpacity
            key={item.name}
            onPress={() => setSelectedTagFilterItem(item.name)}>
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
    console.log(selectedReviewData);
    return (
      selectedReviewData &&
      selectedReviewData.data.map((item: any, index: number) => {
        return (
          <TouchableWithoutFeedback
            key={String(item.id)}
            onPress={() => moveToReviewDetail()}>
            <ImageBackground
              style={{
                width:
                  ((wp('100%') - 40) / 3) *
                  (index === 0 || index === 3 ? 2 : 1),
                height: (wp('100%') - 40) / 3,
                marginBottom: 8,
                marginRight: index === 0 || index === 2 ? 8 : 0,
              }}
              imageStyle={{borderRadius: 12}}
              source={{
                uri:
                  item.review_contents.length === 0
                    ? 'https://lh3.googleusercontent.com/proxy/7P6PPJNO4uoHy9I9lQ4nnUuWG1Rcgnjp2OE_MldTbVLMEmVjzfGnpw4QWS8evZRdAEqJHMwDYA8KaMndh-wrEydX6McI3bv8HZdiq-xxfTs7b-1Vr8RgLEvSVTrvd94sf4FlgPPi4ADIPB20oDB6qz00gzl-odna5hyi7p9reOLI_F0tfuqxVXbzUZB_GyHLrfj3t3wwtxelJ_xHCU3eRtnGtOP0-zVrDZ2GFxCTTTk5sp1WNTTd2qgCBCMxwT-HX9xLoTtvOdJCATSFMR1gRIJ5zQMdcVbWgO9pEDH4YxU3piMYLOu2JlZeDf6YueS6ptD4'
                    : item.review_contents[0].img_thumbNail &&
                      item.review_contents[0].img_url,
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
          </TouchableWithoutFeedback>
        );
      })
    );
  }, [reviewData, selectedTagFilterItem]);

  const memoTagFilter = useMemo(renderTagFilter, [
    tagFilterItems,
    selectedTagFilterItem,
  ]);
  const memoReviewThumbnail = useMemo(renderReviewThumbnail, [
    reviewData,
    selectedTagFilterItem,
  ]);

  return (
    <ContainerView>
      <ContentTitleText>{`👀 최근 올라온 ${selectedHometown} 치과 후기`}</ContentTitleText>
      {memoTagFilter}
      <ReviewThumbnailContainerView>
        {renderReviewThumbnail()}
      </ReviewThumbnailContainerView>
    </ContainerView>
  );
};

export default React.memo(HomeReviewContent);
