import React, {useCallback} from 'react';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {LayoutAnimation} from 'react-native';

// Local Component
import PostCardItem from '~/Components/Presentational/PostCardItem';

const ContainerView = Styled.View`
width: ${wp('100%')}px;
padding: 16px;
background: #FFFFFF;
margin-bottom: 8px;
`;

const TitleText = Styled.Text`
font-style: normal;
font-weight: bold;
font-size: 14px;
line-height: 24px;
margin-bottom: 16px;
`;

const ContentFlatList = Styled.FlatList`
width: ${wp('100%')}px;
height: auto;
overflow: visible;
background: #FFFFFF;
`;

const PostCardSkeletonView = Styled.View`
width: ${wp('79%')}px;
height: 152px;
margin-right: 16px;
padding: 16px;
background: #FFFFFF;
box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
border-radius: 8px;
`;

const ProfileContainerSkeletonView = Styled.View`
width: 100%;
flex-direction: row;
align-items: center;
margin-bottom: 12px;
`;
const ProfileSkeletonImage = Styled.Image<{source: any}>`
width: 28px;
height: 28px;
background-color: #F5F7F9;
border-width: 0.5px
border-color: #E2E6ED;
border-radius: 100px;
margin-right: 8px;
`;
const ProfileNameSkeletonText = Styled.Text`
line-height: 16px;
font-style: normal;
font-weight: 600;
font-size: 13.5px;
margin-right: 4px;
background: #F5F7F9;
color: #F5F7F9;
`;

const ProfileDescriptionSkeletonText = Styled.Text`
font-style: normal;
font-weight: normal;
font-size: 13.5px;
line-height: 16px;
color: #F5F7F9;
background: #F5F7F9;
`;

const PostCardSkeletonContainerView = Styled.View`
flex-direction: row;
`
interface Props {
  initialize: boolean;
  postData: any;
  titleFontSize?: number;
  titleText: string;
  moveToCommunityDetail: any;
  moveToAnotherProfile: any;
}

const CarouselContent = ({
  initialize,
  postData,
  titleFontSize = 14,
  titleText,
  moveToCommunityDetail,
  moveToAnotherProfile,
}: Props) => {
  const renderPostCardItem = useCallback(
    ({item}: any) => {
      return(
      <PostCardItem
        postData={item}
        moveToCommunityDetail={moveToCommunityDetail}
        moveToAnotherProfile={moveToAnotherProfile}
      />
    )},
    [moveToCommunityDetail, moveToAnotherProfile],
  );

  const renderPostCardSkeletonItem = useCallback(() => (
    <PostCardSkeletonContainerView>
    <PostCardSkeletonView key="skeleton1">
      <ProfileContainerSkeletonView>
        <ProfileSkeletonImage/>
        <ProfileNameSkeletonText>
          {"치카치카치"}
        </ProfileNameSkeletonText>
        <ProfileDescriptionSkeletonText>
          {"1일 전"}
        </ProfileDescriptionSkeletonText>
      </ProfileContainerSkeletonView>
    </PostCardSkeletonView>
    <PostCardSkeletonView key="skeleton2">
    <ProfileContainerSkeletonView>
        <ProfileSkeletonImage/>
        <ProfileNameSkeletonText>
          {"치카치카치"}
        </ProfileNameSkeletonText>
        <ProfileDescriptionSkeletonText>
          {"1일 전"}
        </ProfileDescriptionSkeletonText>
      </ProfileContainerSkeletonView>
      </PostCardSkeletonView>
    </PostCardSkeletonContainerView>
  ), [])

  return (
    <ContainerView>
      <TitleText
        style={{
          fontSize: titleFontSize,
        }}>
        {titleText}
      </TitleText>
      <ContentFlatList
        horizontal
        contentContainerStyle={{
          paddingRight: 16,
        }}
        keyExtractor={(item: any) => String(item.id)}
        showsHorizontalScrollIndicator={false}
        snapToInterval={wp('79%') + 16}
        decelerationRate="fast"
        data={initialize ? [{id: 'skeleton1'}, {id: 'skeleton2'}] : postData}
        renderItem={initialize ? renderPostCardSkeletonItem : renderPostCardItem}
      />
    </ContainerView>
  );
};

export default React.memo(CarouselContent);
