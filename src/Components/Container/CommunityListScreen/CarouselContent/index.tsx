import React, {useCallback} from 'react';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Local Component
import PostCardItem from '~/Components/Presentational/PostCardItem';

const ContainerView = Styled.View`
width: ${wp('100%')}px;
height: ${wp('66%')}px;
padding: 24px 0px;
background: #FFFFFF;
`;

const TitleText = Styled.Text`
font-family: NanumSquare;
font-style: normal;
font-weight: bold;
font-size: 16px;
line-height: 24px;
margin: 0px 0px 16px 24px;
`;

const ContentFlatList = Styled.FlatList`
width: ${wp('100%')}px;
height: auto;
overflow: visible;
padding: 0px 16px;
background: #FFFFFF;
`;

interface Props {
  postData: any;
  titleText: string;
  moveToCommunityDetail: any;
  moveToAnotherProfile: any;
}

const CarouselContent = ({
  postData,
  titleText,
  moveToCommunityDetail,
  moveToAnotherProfile,
}: Props) => {
  const renderPostCardItem = useCallback(
    ({item}: any) => (
      <PostCardItem
        postData={item}
        moveToCommunityDetail={moveToCommunityDetail}
        moveToAnotherProfile={moveToAnotherProfile}
      />
    ),
    [moveToCommunityDetail, moveToAnotherProfile],
  );

  return (
    <ContainerView>
      <TitleText>{titleText}</TitleText>
      <ContentFlatList
        horizontal
        keyExtractor={(item: any) => String(item.id)}
        showsHorizontalScrollIndicator={false}
        snapToInterval={wp('76%') + 16}
        decelerationRate="fast"
        data={postData}
        renderItem={renderPostCardItem}
      />
    </ContainerView>
  );
};

export default React.memo(CarouselContent);
